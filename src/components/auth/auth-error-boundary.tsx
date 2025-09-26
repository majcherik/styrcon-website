'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home, Wifi, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getClerkErrorMessage } from '@/lib/clerk/clerk-validation'

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

    // Enhanced error logging for Slovak thermal insulation business
    const enhancedError = {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo,
      businessContext: {
        market: 'SK',
        businessSector: 'thermal_insulation',
        brand: 'styrcon',
        timestamp: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : 'server',
      },
      pageContext: {
        url: typeof window !== 'undefined' ? window.location?.href : 'server',
        referrer: typeof window !== 'undefined' ? document?.referrer : 'server',
      }
    }

    // Log enhanced error for better debugging
    console.error('STYRCON Enhanced Error Context:', enhancedError)

    // In production, you would send this to your error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service with Slovak context
      // reportError(enhancedError)
    }

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

  const isNetworkError = error?.message?.toLowerCase().includes('network') ||
                         error?.message?.toLowerCase().includes('timeout') ||
                         error?.message?.toLowerCase().includes('failed to load')

  const isClerkError = error?.message?.toLowerCase().includes('clerk')

  // Get Slovak error message
  const slovakErrorMessage = error ? getClerkErrorMessage(error.message) : 'Nastala neočakávaná chyba.'

  // Determine icon and styling based on error type
  const getErrorIcon = () => {
    if (isNetworkError) return <Wifi className="mx-auto h-16 w-16 text-orange-500 mb-4" />
    if (isClerkError) return <Shield className="mx-auto h-16 w-16 text-blue-500 mb-4" />
    return <AlertTriangle className="mx-auto h-16 w-16 text-red-500 mb-4" />
  }

  const getErrorTitle = () => {
    if (isNetworkError) return 'Problém s pripojením'
    if (isClerkError) return 'Chyba autentifikačného systému'
    if (isAuthError) return 'Chyba autentifikácie'
    return 'Nastala chyba'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          {getErrorIcon()}
          <h2 className="text-2xl font-bold text-slate-900">
            {getErrorTitle()}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {slovakErrorMessage}
          </p>

          {/* Additional help for specific errors */}
          {isNetworkError && (
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-700">
                Skontrolujte internetové pripojenie a skúste to znovu.
              </p>
            </div>
          )}

          {isClerkError && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                Autentifikačný systém sa načítava. Chvíľku počkajte a skúste to znovu.
              </p>
            </div>
          )}
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

        <div className="border-t pt-6 space-y-2">
          <p className="text-xs text-slate-500">
            Ak problém pretrváva, kontaktujte našu podporu.
          </p>
          <div className="text-center">
            <p className="text-sm font-medium text-blue-600">STYRCON</p>
            <p className="text-xs text-slate-500">E-MA SK s.r.o. | Tepelná izolácia</p>
          </div>
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