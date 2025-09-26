'use client'

import { useEffect, useState } from 'react'
import { useUser, useAuth } from '@clerk/nextjs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Loader2, Shield } from 'lucide-react'

interface ConnectionStatus {
  clerk: 'loading' | 'connected' | 'error'
  auth: 'loading' | 'authenticated' | 'unauthenticated' | 'error'
  user: 'loading' | 'loaded' | 'none' | 'error'
}

export function ClerkConnectionTest() {
  const { user, isLoaded: userLoaded } = useUser()
  const { isSignedIn, isLoaded: authLoaded } = useAuth()
  const [status, setStatus] = useState<ConnectionStatus>({
    clerk: 'loading',
    auth: 'loading',
    user: 'loading'
  })

  useEffect(() => {
    // Check Clerk initialization
    const checkClerkStatus = () => {
      try {
        if (authLoaded && userLoaded) {
          setStatus(prev => ({
            ...prev,
            clerk: 'connected',
            auth: isSignedIn ? 'authenticated' : 'unauthenticated',
            user: user ? 'loaded' : 'none'
          }))
        }
      } catch (error) {
        console.error('Clerk status check error:', error)
        setStatus(prev => ({
          ...prev,
          clerk: 'error',
          auth: 'error',
          user: 'error'
        }))
      }
    }

    checkClerkStatus()
  }, [authLoaded, userLoaded, isSignedIn, user])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case 'connected':
      case 'authenticated':
      case 'loaded':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'unauthenticated':
      case 'none':
        return <CheckCircle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'authenticated':
      case 'loaded':
        return 'success'
      case 'unauthenticated':
      case 'none':
        return 'secondary'
      case 'error':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (key: string, status: string) => {
    if (key === 'clerk') {
      switch (status) {
        case 'loading': return 'Načítava sa...'
        case 'connected': return 'Pripojené'
        case 'error': return 'Chyba pripojenia'
        default: return 'Neznámy stav'
      }
    }
    if (key === 'auth') {
      switch (status) {
        case 'loading': return 'Kontroluje sa...'
        case 'authenticated': return 'Prihlásený'
        case 'unauthenticated': return 'Neprihlásený'
        case 'error': return 'Chyba autentifikácie'
        default: return 'Neznámy stav'
      }
    }
    if (key === 'user') {
      switch (status) {
        case 'loading': return 'Načítava sa...'
        case 'loaded': return 'Načítané'
        case 'none': return 'Žiadny používateľ'
        case 'error': return 'Chyba načítania'
        default: return 'Neznámy stav'
      }
    }
    return status
  }

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <Card className="p-4 m-4 border border-blue-200 bg-blue-50/50">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="h-5 w-5 text-blue-600" />
        <h3 className="font-medium text-blue-900">Clerk Connection Test</h3>
        <Badge variant="outline" className="text-xs">Development</Badge>
      </div>

      <div className="space-y-2">
        {Object.entries(status).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm font-medium capitalize">
              {key === 'clerk' ? 'Clerk System' : key === 'auth' ? 'Authentication' : 'User Data'}:
            </span>
            <div className="flex items-center gap-2">
              {getStatusIcon(value)}
              <Badge variant={getStatusColor(value) as any} className="text-xs">
                {getStatusText(key, value)}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-700">
            Používateľ: {user.fullName || user.emailAddresses[0]?.emailAddress || 'N/A'}
          </p>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-blue-200">
        <p className="text-xs text-blue-600">
          STYRCON - E-MA SK s.r.o. | Tepelná izolácia
        </p>
      </div>
    </Card>
  )
}