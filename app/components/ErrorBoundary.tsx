"use client"

import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * Error Boundary component to catch React errors gracefully
 * Displays a fallback UI when an error occurs
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI with ZwartifyOS styling
      return (
        <div className="min-h-screen bg-black text-green-400 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="border-2 border-red-500 bg-black p-8 rounded">
              <h1 className="text-3xl font-bold text-red-500 mb-4 font-mono">
                ⚠️ SYSTEM ERROR
              </h1>

              <div className="space-y-4">
                <p className="text-green-300">
                  An unexpected error occurred in the application.
                </p>

                {this.state.error && (
                  <div className="bg-red-950 border border-red-500 p-4 rounded">
                    <p className="font-mono text-sm text-red-300">
                      {this.state.error.toString()}
                    </p>
                  </div>
                )}

                {process.env.NODE_ENV === "development" && this.state.errorInfo && (
                  <details className="cursor-pointer">
                    <summary className="text-green-400 hover:text-green-300 font-mono">
                      Stack Trace (Development Only)
                    </summary>
                    <pre className="mt-2 text-xs text-green-500 overflow-auto bg-black border border-green-400/30 p-4 rounded">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={this.handleReset}
                    className="px-6 py-3 bg-black border-2 border-green-400 text-green-400 font-mono uppercase
                             hover:bg-green-400 hover:text-black transition-all duration-300
                             hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                  >
                    Try Again
                  </button>

                  <a
                    href="/"
                    className="px-6 py-3 bg-black border-2 border-green-400 text-green-400 font-mono uppercase
                             hover:bg-green-400 hover:text-black transition-all duration-300
                             hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] inline-block"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Hook-based error boundary for simpler use cases
 * Note: This is a convenience wrapper, actual error boundaries must be class components
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return setError
}
