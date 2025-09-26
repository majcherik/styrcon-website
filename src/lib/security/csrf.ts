import { randomBytes, createHash } from 'crypto'
import { NextRequest } from 'next/server'

/**
 * Generate a CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

/**
 * Create a hash of the CSRF token for verification
 */
export function hashCSRFToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

/**
 * Verify CSRF token from request
 */
export function verifyCSRFToken(request: NextRequest, expectedToken: string): boolean {
  // Check for CSRF token in header or body
  const tokenFromHeader = request.headers.get('x-csrf-token')
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')

  // Basic origin validation
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'https://localhost:3000'
  ].filter(Boolean)

  const hasValidOrigin = origin && allowedOrigins.includes(origin)
  const hasValidReferer = referer && allowedOrigins.some(allowed =>
    referer.startsWith(allowed || '')
  )

  // For now, we'll use origin/referer validation as a CSRF protection mechanism
  // In production, you might want to implement double-submit cookies or synchronizer tokens
  return hasValidOrigin || hasValidReferer
}

/**
 * Enhanced request timeout wrapper
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 30000,
  errorMessage: string = 'Request timeout'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    })
  ])
}