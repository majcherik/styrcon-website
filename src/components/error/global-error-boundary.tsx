'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface GlobalErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorId?: string
}

interface GlobalErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void; errorId?: string }>
}

/**
 * Global error boundary for STYRCON website
 * Slovak thermal insulation business context
 */
export class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    // Generate unique error ID for tracking
    const errorId = `styrcon-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    return {
      hasError: true,
      error,
      errorId,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Enhanced error context for Slovak thermal insulation business
    const errorContext = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo,
      businessMetadata: {
        market: 'Slovak Republic',
        businessSector: 'Thermal Insulation',
        brand: 'STYRCON',
        company: 'E-MA SK s.r.o.',
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        locale: 'sk-SK',
      },
      technicalContext: {
        userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : 'server-side',
        viewport: typeof window !== 'undefined' ? {
          width: window.innerWidth,
          height: window.innerHeight
        } : null,
        url: typeof window !== 'undefined' ? window.location?.href : 'server-side',
        referrer: typeof window !== 'undefined' ? document?.referrer : 'server-side',
      },
      performanceMetrics: typeof window !== 'undefined' && 'performance' in window ? {
        navigationStart: performance.timing?.navigationStart,
        loadEventEnd: performance.timing?.loadEventEnd,
        memoryUsage: (performance as any).memory ? {
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.totalJSHeapSize,
          limit: (performance as any).memory.jsHeapSizeLimit,
        } : null,
      } : null,
    }

    console.error('🚨 STYRCON Global Error Boundary:', errorContext)

    // In production, send to error monitoring service with Slovak business context
    if (process.env.NODE_ENV === 'production') {
      // Example: Analytics or error reporting
      try {
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', 'exception', {
            description: error.message,
            fatal: true,
            custom_map: {
              business_sector: 'thermal_insulation',
              market: 'slovakia',
              error_id: this.state.errorId,
            }
          })
        }
      } catch (analyticsError) {
        console.warn('Failed to send error analytics:', analyticsError)
      }
    }

    this.setState({
      error,
      errorInfo,
    })
  }

  retry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: undefined
    })

    // Reload the page for a fresh start
    if (typeof window !== 'undefined') {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return (
          <FallbackComponent
            error={this.state.error}
            retry={this.retry}
            errorId={this.state.errorId}
          />
        )
      }

      return (
        <StyrconErrorFallback
          error={this.state.error}
          retry={this.retry}
          errorId={this.state.errorId}
        />
      )
    }

    return this.props.children
  }
}

/**
 * STYRCON-branded error fallback component with Slovak language
 */
function StyrconErrorFallback({
  error,
  retry,
  errorId
}: {
  error?: Error
  retry: () => void
  errorId?: string
}) {
  const isNetworkError = error?.message?.toLowerCase().includes('network') ||
                         error?.message?.toLowerCase().includes('fetch') ||
                         error?.message?.toLowerCase().includes('timeout')

  const isChunkError = error?.message?.toLowerCase().includes('chunk') ||
                       error?.message?.toLowerCase().includes('loading')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 text-center">
        <div>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Nastala chyba
          </h1>

          <p className="text-lg text-slate-600 mb-4">
            {isNetworkError && 'Problém s pripojením na internet.'}
            {isChunkError && 'Problém s načítaním stránky.'}
            {!isNetworkError && !isChunkError && 'Vyskytol sa neočakávaný problém.'}
          </p>

          <p className="text-sm text-slate-500">
            Ospravedlňujeme sa za komplikácie. Naša stránka s informáciami o STYRCON tepelnoizolačných doskách je dočasne nedostupná.
          </p>
        </div>

        {/* Error ID for support */}
        {errorId && (
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-3">
            <p className="text-xs text-slate-600">
              ID chyby pre podporu: <code className="font-mono text-slate-800">{errorId}</code>
            </p>
          </div>
        )}

        {/* Development error details */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Chybové hlásenie (development):
            </h3>
            <p className="text-xs text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-600 cursor-pointer">
                  Stack trace
                </summary>
                <pre className="text-xs text-red-700 mt-1 whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          <Button
            onClick={retry}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base flex items-center justify-center gap-2"
            size="lg"
          >
            <RefreshCw className="h-5 w-5" />
            Obnoviť stránku
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              asChild
              className="flex items-center justify-center gap-2"
            >
              <Link href="/">
                <Home className="h-4 w-4" />
                Domovská stránka
              </Link>
            </Button>

            <Button
              variant="outline"
              asChild
              className="flex items-center justify-center gap-2"
            >
              <Link href="/kontakt">
                <Mail className="h-4 w-4" />
                Kontaktovať podporu
              </Link>
            </Button>
          </div>
        </div>

        {/* STYRCON branding */}
        <div className="border-t pt-6 text-center">
          <p className="text-sm text-slate-500">
            <strong className="text-blue-600">STYRCON</strong> tepelnoizolačné dosky
          </p>
          <p className="text-xs text-slate-400 mt-1">
            E-MA SK s.r.o. | Slovensko
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Hook for programmatic error handling
 */
export function useGlobalErrorHandler() {
  const handleError = (error: Error, context?: string) => {
    console.error(`STYRCON Error Handler [${context || 'unknown'}]:`, error)

    // You can trigger error boundary by throwing
    throw error
  }

  const handleAsyncError = (error: Error, context?: string) => {
    console.error(`STYRCON Async Error [${context || 'unknown'}]:`, error)

    // For async errors, you might want to show a toast or notification
    // instead of triggering the error boundary

    // Example: showErrorNotification(error.message)
  }

  return { handleError, handleAsyncError }
}