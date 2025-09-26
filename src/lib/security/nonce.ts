import { randomBytes } from 'crypto'

/**
 * Generate a cryptographically secure nonce for CSP
 * @returns A base64-encoded nonce string
 */
export function generateNonce(): string {
  return randomBytes(16).toString('base64')
}

/**
 * CSP nonce header key used throughout the application
 */
export const CSP_NONCE_HEADER = 'x-nonce'