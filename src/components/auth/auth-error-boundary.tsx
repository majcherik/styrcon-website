'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AuthErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface AuthErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

/**
 * Error boundary specifically for authentication-related errors
 */
export class AuthErrorBoundary extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Auth Error Boundary caught an error:', error, errorInfo)

    // Log to your error reporting service
    // Example: reportError(error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent error={this.state.error} retry={this.retry} />
      }

      return <DefaultErrorFallback error={this.state.error} retry={this.retry} />
    }

    return this.props.children
  }
}

/**
 * Default error fallback component
 */
function DefaultErrorFallback({
  error,
  retry
}: {
  error?: Error
  retry: () => void
}) {
  const isAuthError = error?.message?.toLowerCase().includes('auth') ||
                     error?.message?.toLowerCase().includes('clerk') ||
                     error?.message?.toLowerCase().includes('session')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">
            {isAuthError ? 'Chyba autentifikácie' : 'Nastala chyba'}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isAuthError
              ? 'Vyskytol sa problém s prihlásením. Skúste sa prihlásiť znovu.'
              : 'Nastala neočakávaná chyba. Obnovte stránku alebo to skúste neskôr.'
            }
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Chybové hlásenie (len v development):
            </h3>
            <p className="text-xs text-red-700 font-mono">
              {error.message}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            onClick={retry}
            className="w-full flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Skúsiť znovu
          </Button>

          <Button
            variant="outline"
            asChild
            className="w-full flex items-center justify-center gap-2"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              Späť na domov
            </Link>
          </Button>

          {isAuthError && (
            <Button
              variant="outline"
              asChild
              className="w-full"
            >
              <Link href="/prihlasenie">
                Ísť na prihlásenie
              </Link>
            </Button>
          )}
        </div>

        <div className="text-xs text-slate-500">
          Ak problém pretrváva, kontaktujte našu podporu.
        </div>
      </div>
    </div>
  )
}

/**
 * Hook for handling auth errors in components
 */
export function useAuthErrorHandler() {
  const handleAuthError = (error: Error) => {
    console.error('Auth error:', error)

    // Handle specific auth errors
    if (error.message.includes('session_token_invalid')) {
      // Session expired, redirect to sign in
      window.location.href = '/prihlasenie'
      return
    }

    if (error.message.includes('forbidden')) {
      // Insufficient permissions
      window.location.href = '/profil'
      return
    }

    // For other errors, you might want to show a toast or modal
    // Example: showErrorToast(error.message)
  }

  return { handleAuthError }
}