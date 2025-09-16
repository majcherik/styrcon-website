'use client'

import {
  SignedIn,
  SignedOut,
  ClerkLoaded,
  ClerkLoading,
  RedirectToSignIn
} from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

interface AuthWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
  loadingComponent?: React.ReactNode
}

/**
 * Enhanced auth wrapper component using Clerk control components
 * Provides better loading states and conditional rendering
 */
export function AuthWrapper({
  children,
  fallback,
  requireAuth = false,
  loadingComponent
}: AuthWrapperProps) {
  const DefaultLoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-slate-600 text-sm">Načítavam...</p>
      </div>
    </div>
  )

  const DefaultFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Prihlásenie požadované
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Pre zobrazenie tejto stránky sa musíte prihlásiť
          </p>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-slate-600">Presmerovávame vás na prihlásenie...</p>
      </div>
    </div>
  )

  return (
    <>
      <ClerkLoading>
        {loadingComponent || <DefaultLoadingComponent />}
      </ClerkLoading>

      <ClerkLoaded>
        <SignedIn>
          {children}
        </SignedIn>

        <SignedOut>
          {requireAuth ? (
            <>
              {fallback || <DefaultFallback />}
              <RedirectToSignIn />
            </>
          ) : (
            children
          )}
        </SignedOut>
      </ClerkLoaded>
    </>
  )
}