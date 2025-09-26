'use client'

import { useEffect } from 'react'
import { debugClerkInitialization } from '@/lib/clerk/clerk-validation'

/**
 * Development component for Clerk debugging
 * Only renders in development mode
 */
export function ClerkDebugComponent() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Run Clerk debugging after component mounts
      debugClerkInitialization()

      // Monitor for Clerk errors
      const originalError = console.error
      console.error = (...args) => {
        const message = args.join(' ')
        if (message.includes('Clerk') || message.includes('clerk')) {
          console.log('🔍 STYRCON Clerk Error Detected:', message)

          // Additional debugging for Clerk errors
          if (message.includes('Failed to load')) {
            console.log('💡 Suggestion: Check CSP headers and network connectivity')
            console.log('🌐 Ensure these domains are allowed:')
            console.log('  • *.clerk.accounts.dev')
            console.log('  • *.clerk.com')
            console.log('  • api.clerk.com')
          }
        }
        originalError.apply(console, args)
      }

      return () => {
        console.error = originalError
      }
    }
  }, [])

  // This component doesn't render anything in production
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return null // Silent debugging component
}