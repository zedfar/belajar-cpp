import { useState, useCallback } from 'react'
import { clsx } from 'clsx'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { CodePlayground } from './CodePlayground'
import { saveExerciseResult, getExerciseResult } from '../../lib/progress'
import type { Language } from '../../types/lesson'

interface ExerciseProps {
  id: string
  title: string
  description: string
  type: 'fill-blank' | 'code-output' | 'multiple-choice' | 'free-code'
  template?: string
  blanks?: string[]
  expectedOutput?: string
  starterCode?: string
  options?: string[]
  correctIndex?: number
  hints?: string[]
  explanation?: string
  lang: Language
}

// ---- Fill-in-the-blank sub-component ----
function FillBlankExercise({
  template,
  blanks,
  lang,
  onCorrect,
  onAttempt,
}: {
  template: string
  blanks: string[]
  lang: Language
  onCorrect: () => void
  onAttempt: () => void
}) {
  const parts = template.split(/\{\{\s*BLANK\s*\}\}/)
  const [answers, setAnswers] = useState<string[]>(Array(blanks.length).fill(''))
  const [results, setResults] = useState<(boolean | null)[]>(Array(blanks.length).fill(null))

  const handleCheck = () => {
    onAttempt()
    const checked = answers.map((a, i) => a.trim() === (blanks[i] ?? '').trim())
    setResults(checked)
    if (checked.every(Boolean)) onCorrect()
  }

  return (
    <div>
      <pre className="bg-slate-800 text-slate-200 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < blanks.length && (
              <input
                type="text"
                value={answers[i]}
                onChange={e => {
                  const next = [...answers]
                  next[i] = e.target.value
                  setAnswers(next)
                }}
                className={clsx(
                  'inline-block mx-1 px-2 py-0.5 rounded border font-mono text-sm w-32 bg-slate-700',
                  results[i] === null && 'border-slate-500 text-white',
                  results[i] === true && 'border-emerald-500 text-emerald-300',
                  results[i] === false && 'border-red-500 text-red-300'
                )}
                placeholder="..."
                aria-label={`Blank ${i + 1}`}
              />
            )}
          </span>
        ))}
      </pre>
      <div className="mt-3">
        <Button variant="primary" size="sm" onClick={handleCheck}>
          {lang === 'id' ? 'Periksa Jawaban' : 'Check Answer'}
        </Button>
      </div>
    </div>
  )
}

// ---- Multiple choice sub-component ----
function MultipleChoiceExercise({
  exerciseId,
  options,
  correctIndex,
  lang,
  onCorrect,
  onAttempt,
}: {
  exerciseId: string
  options: string[]
  correctIndex: number
  lang: Language
  onCorrect: () => void
  onAttempt: () => void
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    onAttempt()
    setSubmitted(true)
    if (selected === correctIndex) onCorrect()
  }

  return (
    <div className="space-y-2">
      {options.map((option, i) => (
        <label
          key={i}
          className={clsx(
            'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
            !submitted && selected === i && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
            !submitted && selected !== i && 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
            submitted && i === correctIndex && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
            submitted && selected === i && i !== correctIndex && 'border-red-500 bg-red-50 dark:bg-red-900/20',
            submitted && i !== correctIndex && selected !== i && 'border-slate-200 dark:border-slate-700 opacity-50'
          )}
        >
          <input
            type="radio"
            name={`mc-${exerciseId}`}
            checked={selected === i}
            onChange={() => !submitted && setSelected(i)}
            disabled={submitted}
            className="accent-blue-600"
          />
          <span className="text-sm text-slate-800 dark:text-slate-200">{option}</span>
        </label>
      ))}
      {!submitted && (
        <Button variant="primary" size="sm" onClick={handleSubmit} disabled={selected === null} className="mt-2">
          {lang === 'id' ? 'Jawab' : 'Submit'}
        </Button>
      )}
    </div>
  )
}

// ---- Main Exercise component ----
export function Exercise(props: ExerciseProps) {
  const {
    id, title, description, type, template, blanks, expectedOutput,
    starterCode, options, correctIndex, hints, explanation, lang
  } = props

  const existing = getExerciseResult(id)
  const [attempts, setAttempts] = useState(existing?.attempts ?? 0)
  const [hintIndex, setHintIndex] = useState(-1)
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(
    existing?.solved ? 'correct' : 'idle'
  )
  const [showExplanation, setShowExplanation] = useState(false)

  const handleCorrect = useCallback(() => {
    setStatus('correct')
    saveExerciseResult(id, {
      solved: true,
      attempts: attempts + 1,
      hintsUsed: hintIndex + 1,
      lastAttempt: new Date().toISOString(),
    })
  }, [id, attempts, hintIndex])

  const handleAttempt = useCallback(() => {
    const next = attempts + 1
    setAttempts(next)
    if (status !== 'correct') setStatus('incorrect')
  }, [attempts, status])

  const showNextHint = () => {
    if (hints && hintIndex < hints.length - 1) {
      setHintIndex(prev => prev + 1)
    }
  }

  return (
    <Card className="my-6" shadow>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <div
            className="text-sm text-slate-600 dark:text-slate-400 mt-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        {status === 'correct' && (
          <span role="status" className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
            {lang === 'id' ? 'Selesai' : 'Solved'}
          </span>
        )}
      </div>

      {/* Exercise body by type */}
      {type === 'fill-blank' && template && blanks && (
        <FillBlankExercise
          template={template}
          blanks={blanks}
          lang={lang}
          onCorrect={handleCorrect}
          onAttempt={handleAttempt}
        />
      )}

      {type === 'multiple-choice' && options && correctIndex !== undefined && (
        <MultipleChoiceExercise
          exerciseId={id}
          options={options}
          correctIndex={correctIndex}
          lang={lang}
          onCorrect={handleCorrect}
          onAttempt={handleAttempt}
        />
      )}

      {type === 'code-output' && (
        <CodePlayground
          initialCode={starterCode ?? ''}
          lang={lang}
          {...(expectedOutput !== undefined ? { expectedOutput } : {})}
          onSuccess={handleCorrect}
          height={200}
        />
      )}

      {type === 'free-code' && (
        <CodePlayground
          initialCode={starterCode ?? ''}
          lang={lang}
          height={200}
        />
      )}

      {/* Hints */}
      {hints && hints.length > 0 && status !== 'correct' && (
        <div className="mt-4">
          {hintIndex >= 0 && (
            <div className="space-y-2 mb-2">
              {hints.slice(0, hintIndex + 1).map((hint, i) => (
                <div key={i} className="px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-sm text-amber-800 dark:text-amber-200">
                  <strong>Hint {i + 1}:</strong> {hint}
                </div>
              ))}
            </div>
          )}
          {hintIndex < hints.length - 1 && (
            <Button variant="ghost" size="sm" onClick={showNextHint}>
              {lang === 'id' ? `Tampilkan Petunjuk (${hintIndex + 2}/${hints.length})` : `Show Hint (${hintIndex + 2}/${hints.length})`}
            </Button>
          )}
        </div>
      )}

      {/* Status + Explanation */}
      {status === 'incorrect' && (
        <div role="alert" className="mt-3 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-700 dark:text-red-300">
          {lang === 'id' ? 'Belum tepat. Coba lagi!' : 'Not quite right. Try again!'}
          {` (${attempts} ${lang === 'id' ? 'percobaan' : attempts === 1 ? 'attempt' : 'attempts'})`}
        </div>
      )}

      {status === 'correct' && explanation && (
        <div className="mt-3">
          {!showExplanation ? (
            <Button variant="ghost" size="sm" onClick={() => setShowExplanation(true)}>
              {lang === 'id' ? 'Lihat Penjelasan' : 'Show Explanation'}
            </Button>
          ) : (
            <div role="note" className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-800 dark:text-blue-200">
              {explanation}
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
