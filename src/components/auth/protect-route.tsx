'use client'

import { Protect } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectRouteProps {
  children: React.ReactNode
  role?: string
  permission?: string
  fallback?: React.ReactNode
  redirectTo?: string
}

/**
 * Enhanced route protection component with role-based access control
 * Uses Clerk's Protect component with custom fallback handling
 */
export function ProtectRoute({
  children,
  role,
  permission,
  fallback,
  redirectTo = '/profil'
}: ProtectRouteProps) {
  const { isSignedIn, sessionClaims } = useAuth()
  const router = useRouter()

  // Custom fallback for unauthorized access
  const DefaultFallback = () => {
    useEffect(() => {
      if (isSignedIn && redirectTo) {
        router.push(redirectTo)
      }
    }, [isSignedIn])

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Nedostatočné oprávnenia
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Nemáte oprávnenie na prístup k tejto stránke
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-500">
              Presmerovávame vás na váš profil...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  // Build condition object for Clerk's Protect component
  const condition = () => {
    if (role) {
      return (has: any) => has({ role })
    }
    if (permission) {
      return (has: any) => has({ permission })
    }
    return undefined
  }

  return (
    <Protect
      condition={condition()}
      fallback={fallback || <DefaultFallback />}
    >
      {children}
    </Protect>
  )
}

