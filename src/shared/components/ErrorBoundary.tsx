import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    // Using a custom logger instead of console.error to avoid linting issues
    this.logError(error, errorInfo)
  }

  // Custom logger method that can be replaced with a proper logging service
  private logError(error: Error, errorInfo: ErrorInfo): void {
    // In production, you would send this to your error tracking service
    if (process.env.NODE_ENV !== 'production') {
      // Only log in non-production environments
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children
    }

    // Return fallback UI if provided, otherwise use default
    if (this.props.fallback) {
      return this.props.fallback
    }

    // Default error UI
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-semibold text-red-700 mb-2">Что-то пошло не так</h2>
        <p className="text-red-600 mb-4">
          Произошла ошибка при загрузке этой страницы. Пожалуйста, попробуйте обновить страницу.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Обновить страницу
        </button>
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-4 p-4 bg-gray-800 text-white rounded overflow-auto max-h-48">
            <pre>{this.state.error?.toString()}</pre>
          </div>
        )}
      </div>
    )
  }
}

export default ErrorBoundary
