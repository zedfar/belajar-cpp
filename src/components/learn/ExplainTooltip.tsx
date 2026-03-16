import { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import type { Language } from '../../types/lesson'

interface ExplainTooltipProps {
  children: React.ReactNode
  explanation: string
  lang: Language
}

export function ExplainTooltip({ children, explanation }: ExplainTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<'top' | 'bottom'>('top')
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Determine position based on available space
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceAbove = rect.top
      setPosition(spaceAbove < 120 ? 'bottom' : 'top')
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        className="border-b border-dashed border-blue-400 dark:border-blue-500 cursor-help text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors rounded-sm px-0.5"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(prev => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-describedby="explain-tooltip"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(prev => !prev)
          }
        }}
      >
        {children}
      </span>

      {isOpen && (
        <div
          ref={tooltipRef}
          id="explain-tooltip"
          role="tooltip"
          className={clsx(
            'absolute z-50 w-64 px-3 py-2 rounded-lg shadow-lg text-sm',
            'bg-slate-800 dark:bg-slate-700 text-slate-100',
            'border border-slate-600',
            'animate-in fade-in duration-150',
            position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
            position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2'
          )}
        >
          {/* Arrow */}
          <div
            className={clsx(
              'absolute w-2 h-2 bg-slate-800 dark:bg-slate-700 rotate-45 left-1/2 -translate-x-1/2',
              position === 'top' && '-bottom-1 border-b border-r border-slate-600',
              position === 'bottom' && '-top-1 border-t border-l border-slate-600'
            )}
          />
          {explanation}
        </div>
      )}
    </span>
  )
}
