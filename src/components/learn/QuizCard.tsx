import { useState } from 'react'
import { clsx } from 'clsx'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ErrorBoundary } from './ErrorBoundary'
import { saveQuizResult } from '../../lib/progress'
import type { Language } from '../../types/lesson'

interface Question {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

interface QuizCardProps {
  quizId?: string
  questions: Question[]
  lang: Language
  onComplete?: (score: number) => void
}

function QuizCardInner({ quizId, questions, lang, onComplete }: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  )
  const [submitted, setSubmitted] = useState<boolean[]>(
    Array(questions.length).fill(false)
  )
  const [finished, setFinished] = useState(false)

  const q = questions[currentQ]
  if (!q) return null
  const isLast = currentQ === questions.length - 1
  const isAnswered = submitted[currentQ]
  const selected = selectedAnswers[currentQ]

  const handleSelect = (idx: number) => {
    if (isAnswered) return
    const next = [...selectedAnswers]
    next[currentQ] = idx
    setSelectedAnswers(next)
  }

  const handleSubmitAnswer = () => {
    if (selected === null) return
    const next = [...submitted]
    next[currentQ] = true
    setSubmitted(next)
  }

  const handleNext = () => {
    if (isLast) {
      setFinished(true)
      const correct = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length
      const score = Math.round((correct / questions.length) * 100)
      if (quizId) {
        saveQuizResult(quizId, {
          score,
          completedAt: new Date().toISOString(),
          answers: selectedAnswers as number[],
        })
      }
      onComplete?.(score)
    } else {
      setCurrentQ(prev => prev + 1)
    }
  }

  // Score summary
  if (finished) {
    const correct = questions.filter((q, i) => selectedAnswers[i] === q.correctIndex).length
    const score = Math.round((correct / questions.length) * 100)
    return (
      <Card className="my-6" shadow>
        <div className="text-center py-6">
          <div className={clsx(
            'text-5xl font-bold mb-2',
            score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-500'
          )}>
            {score}%
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {correct}/{questions.length} {lang === 'id' ? 'jawaban benar' : 'correct answers'}
          </p>
          {score >= 70 ? (
            <p className="text-emerald-600 dark:text-emerald-400 font-medium">
              {lang === 'id' ? 'Bagus! Kamu menguasai materi ini.' : 'Great job! You\'ve mastered this material.'}
            </p>
          ) : (
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              {lang === 'id' ? 'Coba review materi dan ulangi quiz.' : 'Review the material and try again.'}
            </p>
          )}

          {/* Review answers */}
          <div className="mt-6 text-left space-y-4">
            {questions.map((q, qi) => {
              const userAnswer = selectedAnswers[qi]
              return (
                <div key={q.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="space-y-1">
                    {q.options.map((opt, oi) => (
                      <div
                        key={oi}
                        className={clsx(
                          'text-xs px-2 py-1 rounded',
                          oi === q.correctIndex && 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300',
                          oi === userAnswer && oi !== q.correctIndex && 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through'
                        )}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                  {q.explanation && (
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 italic">{q.explanation}</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="my-6" shadow>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono" aria-live="polite">
          {currentQ + 1} / {questions.length}
        </span>
        <div className="flex gap-1" aria-hidden="true">
          {questions.map((_, i) => (
            <div
              key={i}
              className={clsx(
                'w-2 h-2 rounded-full',
                i === currentQ && 'bg-blue-500',
                i < currentQ && submitted[i] && selectedAnswers[i] === questions[i]?.correctIndex && 'bg-emerald-500',
                i < currentQ && submitted[i] && selectedAnswers[i] !== questions[i]?.correctIndex && 'bg-red-400',
                i > currentQ && 'bg-slate-300 dark:bg-slate-600'
              )}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <h4 className="text-base font-medium text-slate-900 dark:text-white mb-4">{q.question}</h4>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {q.options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={isAnswered}
            className={clsx(
              'w-full text-left flex items-center gap-3 p-3 rounded-lg border transition-colors text-sm',
              !isAnswered && selected === i && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
              !isAnswered && selected !== i && 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800',
              isAnswered && i === q.correctIndex && 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20',
              isAnswered && selected === i && i !== q.correctIndex && 'border-red-500 bg-red-50 dark:bg-red-900/20',
              isAnswered && i !== q.correctIndex && selected !== i && 'border-slate-200 dark:border-slate-700 opacity-50'
            )}
          >
            <span className={clsx(
              'shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium',
              !isAnswered && selected === i && 'border-blue-500 text-blue-600',
              !isAnswered && selected !== i && 'border-slate-300 dark:border-slate-600 text-slate-400',
              isAnswered && i === q.correctIndex && 'border-emerald-500 text-emerald-600 bg-emerald-100 dark:bg-emerald-900',
              isAnswered && selected === i && i !== q.correctIndex && 'border-red-500 text-red-600'
            )}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-slate-800 dark:text-slate-200">{option}</span>
          </button>
        ))}
      </div>

      {/* Explanation after submit */}
      {isAnswered && q.explanation && (
        <div role="note" className="mb-4 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm text-blue-800 dark:text-blue-200">
          {q.explanation}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {!isAnswered && (
          <Button variant="primary" size="sm" onClick={handleSubmitAnswer} disabled={selected === null}>
            {lang === 'id' ? 'Jawab' : 'Submit'}
          </Button>
        )}
        {isAnswered && (
          <Button variant="primary" size="sm" onClick={handleNext}>
            {isLast ? (lang === 'id' ? 'Lihat Hasil' : 'See Results') : (lang === 'id' ? 'Selanjutnya' : 'Next')}
          </Button>
        )}
      </div>
    </Card>
  )
}

export function QuizCard(props: QuizCardProps) {
  return (
    <ErrorBoundary componentName="QuizCard">
      <QuizCardInner {...props} />
    </ErrorBoundary>
  )
}
