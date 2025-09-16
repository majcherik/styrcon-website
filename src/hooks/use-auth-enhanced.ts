'use client'

import { useAuth, useUser, useOrganization } from '@clerk/nextjs'
import { useMemo } from 'react'
import type {
  UseAuthReturn,
  UsePermissionsReturn,
  UseOrganizationReturn,
  AuthContext,
  UserRole,
  Permission
} from '@/types/auth'
import { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin } from '@/lib/rbac'
import type { UserMetadata } from '@/lib/rbac'

/**
 * Enhanced authentication hook with type safety and additional features
 */
export function useAuthEnhanced(): UseAuthReturn {
  const { isSignedIn, isLoaded, userId, signOut: clerkSignOut } = useAuth()
  const { user } = useUser()

  const metadata = useMemo(() => {
    return (user?.publicMetadata as UserMetadata) || {}
  }, [user?.publicMetadata])

  const authContext: AuthContext = useMemo(() => ({
    userId: userId || null,
    user: user || null,
    isSignedIn: !!isSignedIn,
    isLoaded,
    role: metadata.role,
    permissions: metadata.permissions || [],
    organizationId: metadata.organizationId,
  }), [userId, user, isSignedIn, isLoaded, metadata])

  const signOut = async () => {
    try {
      await clerkSignOut()
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const refreshUser = async () => {
    try {
      await user?.reload()
    } catch (error) {
      console.error('Error refreshing user:', error)
      throw error
    }
  }

  return {
    ...authContext,
    signOut,
    refreshUser,
  }
}

/**
 * Permissions hook with type safety
 */
export function usePermissions(): UsePermissionsReturn {
  const { role, permissions } = useAuthEnhanced()

  return useMemo(() => ({
    hasPermission: (permission: Permission) =>
      hasPermission(role, permissions, permission),

    hasAnyPermission: (requiredPermissions: Permission[]) =>
      hasAnyPermission(role, permissions, requiredPermissions),

    hasAllPermissions: (requiredPermissions: Permission[]) =>
      hasAllPermissions(role, permissions, requiredPermissions),

    hasRole: (requiredRole: UserRole) => role === requiredRole,

    isAdmin: isAdmin(role, permissions),
  }), [role, permissions])
}

/**
 * Enhanced organization hook
 */
export function useOrganizationEnhanced(): UseOrganizationReturn {
  const { organization, membership, isLoaded } = useOrganization()

  return useMemo(() => ({
    organization: organization || null,
    membership: membership || null,
    isLoaded,
    isAdmin: membership?.role === 'admin',
    canManageMembers: membership?.role === 'admin',
  }), [organization, membership, isLoaded])
}

/**
 * Hook for checking if user can access a specific feature
 */
export function useFeatureAccess() {
  const { hasPermission, hasRole } = usePermissions()
  const { isAdmin } = usePermissions()

  return useMemo(() => ({
    // Admin features
    canAccessAdmin: isAdmin,
    canManageUsers: hasPermission('user_management'),
    canManageContent: hasPermission('content_management'),
    canViewAnalytics: hasPermission('analytics_view'),
    canManageSystem: hasPermission('system_settings'),

    // User features
    canUploadDocuments: hasPermission('document_upload'),
    canDownloadDocuments: hasPermission('document_download'),
    canModerateComments: hasPermission('comment_moderate'),
    canManageNewsletter: hasPermission('newsletter_manage'),

    // Role checks
    isUser: hasRole('user'),
    isModerator: hasRole('moderator'),
    isViewer: hasRole('viewer'),
  }), [hasPermission, hasRole, isAdmin])
}

/**
 * Hook for user profile management
 */
export function useUserProfile() {
  const { user, refreshUser } = useAuthEnhanced()

  const updateProfile = async (data: {
    firstName?: string
    lastName?: string
  }) => {
    try {
      if (!user) throw new Error('User not found')

      await user.update({
        firstName: data.firstName,
        lastName: data.lastName,
      })

      await refreshUser()
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const updateMetadata = async (metadata: Partial<UserMetadata>) => {
    try {
      if (!user) throw new Error('User not found')

      await user.update({
        publicMetadata: {
          ...user.publicMetadata,
          ...metadata,
        },
      })

      await refreshUser()
    } catch (error) {
      console.error('Error updating metadata:', error)
      throw error
    }
  }

  return {
    user,
    updateProfile,
    updateMetadata,
    refreshUser,
  }
}

/**
 * Hook for authentication state management
 */
export function useAuthState() {
  const { isSignedIn, isLoaded, userId } = useAuthEnhanced()

  const authState = useMemo(() => {
    if (!isLoaded) return 'loading'
    if (isSignedIn && userId) return 'authenticated'
    return 'unauthenticated'
  }, [isSignedIn, isLoaded, userId])

  return {
    authState,
    isLoading: authState === 'loading',
    isAuthenticated: authState === 'authenticated',
    isUnauthenticated: authState === 'unauthenticated',
  }
}

/**
 * Hook for session management
 */
export function useSession() {
  const { user, signOut } = useAuthEnhanced()

  const sessionInfo = useMemo(() => {
    if (!user) return null

    return {
      sessionId: user.id,
      lastSignInAt: user.lastSignInAt,
      createdAt: user.createdAt,
      emailVerified: user.emailAddresses?.[0]?.verification?.status === 'verified',
      hasPassword: user.passwordEnabled,
      hasTwoFactor: user.twoFactorEnabled,
    }
  }, [user])

  const endSession = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error ending session:', error)
      throw error
    }
  }

  return {
    sessionInfo,
    endSession,
    isSessionValid: !!sessionInfo,
  }
}