import { useState, useCallback, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import { Button } from '../ui/Button'
import { runCodeViaProxy, getDisplayOutput } from '../../lib/code-runner'
import type { Language } from '../../types/lesson'

interface CodePlaygroundProps {
  initialCode: string
  lang: Language
  readOnly?: boolean
  showOutput?: boolean
  showStdin?: boolean
  expectedOutput?: string
  onSuccess?: () => void
  height?: number
}

// Lazy CodeMirror hook
function useCodeMirror(
  containerRef: React.RefObject<HTMLDivElement | null>,
  code: string,
  onChange: (v: string) => void,
  readOnly: boolean,
  height: number
) {
  const viewRef = useRef<any>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let view: any = null
    let cancelled = false

    Promise.all([
      import('@codemirror/view'),
      import('@codemirror/state'),
      import('@codemirror/lang-cpp'),
      import('@codemirror/theme-one-dark'),
      import('codemirror'),
    ]).then(([viewMod, stateMod, cppMod, themeMod, setupMod]) => {
      if (cancelled) return

      const { EditorView } = viewMod
      const { EditorState } = stateMod
      const { cpp } = cppMod
      const { oneDark } = themeMod
      const { basicSetup } = setupMod

      const state = EditorState.create({
        doc: code,
        extensions: [
          basicSetup,
          cpp(),
          oneDark,
          EditorView.editable.of(!readOnly),
          EditorView.theme({
            '&': { height: `${height}px`, fontSize: '14px' },
            '.cm-scroller': { overflow: 'auto' },
          }),
          EditorView.updateListener.of(update => {
            if (update.docChanged) {
              onChangeRef.current(update.state.doc.toString())
            }
          }),
        ],
      })

      view = new EditorView({ state, parent: el })
      viewRef.current = view
    }).catch(err => {
      console.warn('CodeMirror failed to load:', err)
      // Fallback: render textarea
      if (!cancelled && el) {
        el.innerHTML = ''
        const ta = document.createElement('textarea')
        ta.value = code
        ta.readOnly = readOnly
        ta.style.cssText = `width:100%;height:${height}px;background:#1e1e1e;color:#d4d4d4;font-family:monospace;font-size:14px;padding:12px;border:none;resize:none;outline:none;`
        ta.addEventListener('input', () => onChangeRef.current(ta.value))
        el.appendChild(ta)
      }
    })

    return () => {
      cancelled = true
      if (view) view.destroy()
      viewRef.current = null
    }
  }, []) // intentionally mount once

  // Sync external code changes (e.g. reset)
  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== code) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: code },
      })
    }
  }, [code])
}

// Icons
function PlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
      <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
    </svg>
  )
}

function ResetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H4.598a.75.75 0 00-.75.75v3.634a.75.75 0 001.5 0v-2.033l.312.311a7 7 0 0011.712-3.138.75.75 0 00-1.06-.179zm-9.624-3.848a5.5 5.5 0 019.201-2.466l.312.311H12.768a.75.75 0 000 1.5h3.634a.75.75 0 00.75-.75V2.537a.75.75 0 00-1.5 0v2.033l-.312-.311A7 7 0 003.628 7.397a.75.75 0 001.06.179z" clipRule="evenodd" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
  )
}

export function CodePlayground({
  initialCode,
  lang,
  readOnly = false,
  showOutput = true,
  showStdin = false,
  expectedOutput,
  onSuccess,
  height = 250,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [execTime, setExecTime] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [matched, setMatched] = useState(false)
  const [stdin, setStdin] = useState('')
  const [stdinOpen, setStdinOpen] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  useCodeMirror(editorRef, code, setCode, readOnly, height)

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'code.cpp'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [code])

  const handleRun = useCallback(async () => {
    setIsRunning(true)
    setOutput(null)
    setMatched(false)
    try {
      const result = await runCodeViaProxy({ code, ...(stdin ? { stdin } : {}) })
      const { text, isError: hasError } = getDisplayOutput(result)
      setOutput(text)
      setIsError(hasError)
      setExecTime(result.time ? `${(parseFloat(result.time) * 1000).toFixed(0)}ms` : null)

      if (!hasError && expectedOutput && text.trim() === expectedOutput.trim()) {
        setMatched(true)
        onSuccess?.()
      }
    } catch {
      setOutput('Tidak dapat terhubung ke server. Coba lagi nanti.')
      setIsError(true)
    } finally {
      setIsRunning(false)
    }
  }, [code, stdin, expectedOutput, onSuccess])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [code])

  const handleReset = useCallback(() => {
    setCode(initialCode)
    setOutput(null)
    setIsError(false)
    setExecTime(null)
    setMatched(false)
  }, [initialCode])

  return (
    <div className="rounded-lg border border-slate-700 overflow-hidden my-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-slate-800 px-3 py-2">
        <span className="text-xs text-slate-400 font-mono">C++</span>
        <div className="flex items-center gap-1.5">
          {!readOnly && (
            <Button
              variant="ghost"
              size="sm"
              icon={<ResetIcon />}
              onClick={handleReset}
              aria-label={lang === 'id' ? 'Reset kode' : 'Reset code'}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            icon={<CopyIcon />}
            onClick={handleCopy}
            aria-label={lang === 'id' ? 'Salin kode' : 'Copy code'}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {copied ? (lang === 'id' ? 'Tersalin!' : 'Copied!') : (lang === 'id' ? 'Salin' : 'Copy')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            icon={<DownloadIcon />}
            onClick={handleDownload}
            aria-label={lang === 'id' ? 'Unduh kode' : 'Download code'}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {lang === 'id' ? 'Unduh' : 'Download'}
          </Button>
          <Button
            variant="success"
            size="sm"
            icon={<PlayIcon />}
            onClick={handleRun}
            loading={isRunning}
            aria-label={lang === 'id' ? 'Jalankan kode' : 'Run code'}
          >
            {isRunning ? (lang === 'id' ? 'Menjalankan...' : 'Running...') : 'Run'}
          </Button>
        </div>
      </div>

      {/* Stdin panel */}
      {showStdin && (
        <div className="border-t border-slate-700">
          <button
            type="button"
            onClick={() => setStdinOpen(prev => !prev)}
            className="flex items-center gap-1.5 w-full px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 transition-colors"
          >
            <span>{stdinOpen ? '\u25BC' : '\u25B6'}</span>
            <span className="font-mono">Input (stdin)</span>
          </button>
          {stdinOpen && (
            <textarea
              value={stdin}
              onChange={e => setStdin(e.target.value)}
              placeholder={lang === 'id' ? 'Masukkan input di sini...' : 'Enter input here...'}
              spellCheck={false}
              className="w-full h-20 p-3 bg-slate-900 text-slate-100 font-mono text-sm resize-none focus:outline-none border-t border-slate-700"
            />
          )}
        </div>
      )}

      {/* Editor + Output */}
      <div className="flex flex-col md:flex-row">
        {/* Editor */}
        <div
          ref={editorRef}
          className={clsx(
            'min-w-0',
            showOutput ? 'w-full md:w-1/2' : 'w-full'
          )}
          style={{ backgroundColor: '#1e1e1e' }}
        />

        {/* Output */}
        {showOutput && (
          <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-slate-700 bg-slate-900 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-700">
              <span className="text-xs text-slate-400 font-mono">Output</span>
              {execTime && (
                <span className="text-xs text-slate-500 font-mono">{execTime}</span>
              )}
            </div>
            <div
              className="p-3 font-mono text-sm overflow-auto flex-1"
              style={{ minHeight: `${Math.max(height - 32, 100)}px` }}
            >
              {output === null ? (
                <span className="text-slate-500 italic">
                  {lang === 'id' ? 'Klik "Run" untuk menjalankan kode...' : 'Click "Run" to execute code...'}
                </span>
              ) : (
                <pre className={clsx(
                  'whitespace-pre-wrap break-words',
                  isError ? 'text-red-400' : 'text-green-300'
                )}>
                  {output}
                </pre>
              )}
              {matched && (
                <div className="mt-3 px-3 py-2 bg-emerald-900/40 border border-emerald-700 rounded text-emerald-300 text-sm">
                  {lang === 'id' ? 'Output sesuai! Jawaban benar.' : 'Output matches! Correct answer.'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
