import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

/**
 * Server-side authentication utilities using Clerk
 */

/**
 * Require authentication on server side
 * Redirects to sign-in page if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth()

  if (!userId) {
    redirect('/prihlasenie')
  }

  return userId
}


/**
 * Get current user data on server side
 */
export async function getCurrentUser() {
  const user = await currentUser()
  return user
}

/**
 * Check if user has specific role
 */
export async function hasRole(role: string): Promise<boolean> {
  const { sessionClaims } = await auth()
  return (sessionClaims?.publicMetadata as any)?.role === role
}

/**
 * Check if user has specific permission
 */
export async function hasPermission(permission: string): Promise<boolean> {
  const { sessionClaims } = await auth()
  const permissions = (sessionClaims?.publicMetadata as any)?.permissions || []
  return permissions.includes(permission)
}

/**
 * Get user metadata from session
 */
export async function getUserMetadata() {
  const { sessionClaims } = await auth()
  return {
    role: (sessionClaims?.publicMetadata as any)?.role,
    permissions: (sessionClaims?.publicMetadata as any)?.permissions || [],
    organizationId: (sessionClaims?.publicMetadata as any)?.organizationId,
  }
}

/**
 * Server-side auth data for components
 */
export async function getAuthData() {
  const { userId, sessionClaims } = await auth()
  const user = userId ? await currentUser() : null

  return {
    userId,
    user,
    isSignedIn: !!userId,
    metadata: getUserMetadata(),
  }
}