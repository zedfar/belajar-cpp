import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  border?: boolean
  shadow?: boolean
}

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
}

export function Card({ children, className, padding = 'md', border = true, shadow = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-slate-900 rounded-lg',
        border && 'border border-slate-200 dark:border-slate-700',
        shadow && 'shadow-md',
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('pb-3 mb-3 border-b border-slate-200 dark:border-slate-700', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx(className)}>{children}</div>
}
