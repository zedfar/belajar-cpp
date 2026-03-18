import { Component } from 'react'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(`[ErrorBoundary] ${this.props.componentName ?? 'Component'} crashed:`, error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div
          role="alert"
          className="my-4 p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-sm"
        >
          <p className="font-medium text-red-700 dark:text-red-300 mb-1">
            Komponen gagal dimuat
          </p>
          <p className="text-red-600 dark:text-red-400 text-xs font-mono">
            {this.state.error?.message ?? 'Unknown error'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 text-xs text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Coba lagi
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
