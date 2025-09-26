import { headers } from 'next/headers'
import { CSP_NONCE_HEADER } from './nonce'

/**
 * Get the CSP nonce for the current request
 * This should be used in server components and Server Actions
 */
export async function getNonce(): Promise<string | null> {
  const headersList = await headers()
  return headersList.get(CSP_NONCE_HEADER)
}

/**
 * Create script props with nonce for safe inline scripts
 * Usage: <script {...getScriptProps()} dangerouslySetInnerHTML={{ __html: code }} />
 */
export async function getScriptProps(): Promise<{ nonce?: string }> {
  const nonce = await getNonce()
  return nonce ? { nonce } : {}
}

/**
 * Create style props with nonce for safe inline styles
 * Usage: <style {...getStyleProps()} dangerouslySetInnerHTML={{ __html: css }} />
 */
export async function getStyleProps(): Promise<{ nonce?: string }> {
  const nonce = await getNonce()
  return nonce ? { nonce } : {}
}