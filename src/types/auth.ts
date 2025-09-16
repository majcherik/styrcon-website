/**
 * TypeScript type definitions for authentication and authorization
 */

import type { User as ClerkUser } from '@clerk/nextjs/server'
import type { UserRole, Permission, UserMetadata } from '@/lib/rbac'

/**
 * Extended user type with our custom metadata
 */
export interface ExtendedUser extends ClerkUser {
  metadata?: UserMetadata
}

/**
 * Session claims type for Clerk
 */
export interface SessionClaims {
  publicMetadata?: UserMetadata
  privateMetadata?: {
    internalNotes?: string
    lastPermissionSync?: string
    securityFlags?: string[]
  }
}

/**
 * Authentication context type
 */
export interface AuthContext {
  userId: string | null
  user: ExtendedUser | null
  isSignedIn: boolean
  isLoaded: boolean
  role?: UserRole
  permissions: Permission[]
  organizationId?: string
}

/**
 * Protected route props
 */
export interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requiredRole?: UserRole
  requiredPermissions?: Permission[]
  fallback?: React.ReactNode
  redirectTo?: string
}

/**
 * Organization types
 */
export interface OrganizationMember {
  id: string
  userId: string
  organizationId: string
  role: 'admin' | 'basic_member'
  publicMetadata?: {
    department?: string
    title?: string
    permissions?: Permission[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface ExtendedOrganization {
  id: string
  name: string
  slug: string
  imageUrl?: string
  membersCount: number
  publicMetadata?: {
    industry?: string
    size?: 'small' | 'medium' | 'large'
    features?: string[]
  }
  createdAt: Date
  updatedAt: Date
}

/**
 * Webhook event types
 */
export interface WebhookEventData {
  id: string
  email_addresses?: Array<{
    email_address: string
    verification?: {
      status: 'verified' | 'unverified'
    }
  }>
  first_name?: string
  last_name?: string
  image_url?: string
  public_metadata?: UserMetadata
  private_metadata?: Record<string, any>
  created_at?: number
  updated_at?: number
}

export interface WebhookEvent {
  type: 'user.created' | 'user.updated' | 'user.deleted' | 'session.created' | 'session.ended' | 'organization.created' | 'organization.updated' | 'organization.deleted' | 'organizationMembership.created' | 'organizationMembership.updated' | 'organizationMembership.deleted'
  data: WebhookEventData
  object: 'event'
  timestamp: number
}

/**
 * API response types
 */
export interface AuthApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UserProfileResponse {
  id: string
  firstName?: string
  lastName?: string
  email: string
  imageUrl?: string
  role: UserRole
  permissions: Permission[]
  organizationId?: string
  createdAt: string
  lastSignInAt?: string
}

export interface UserListResponse {
  users: UserProfileResponse[]
  total: number
  page: number
  limit: number
}

/**
 * Form types for authentication
 */
export interface SignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  acceptTerms: boolean
}

export interface UpdateProfileFormData {
  firstName?: string
  lastName?: string
  currentPassword?: string
  newPassword?: string
  confirmPassword?: string
}

/**
 * Error types
 */
export interface AuthError {
  code: string
  message: string
  field?: string
}

export interface AuthErrorContext {
  operation: 'signIn' | 'signUp' | 'signOut' | 'updateProfile' | 'deleteAccount'
  timestamp: Date
  userAgent?: string
  ipAddress?: string
}

/**
 * Utility types
 */
export type AuthState = 'loading' | 'authenticated' | 'unauthenticated' | 'error'

export type OrganizationRole = 'admin' | 'basic_member'

export type PermissionLevel = 'read' | 'write' | 'admin'

/**
 * Component prop types for authentication
 */
export interface AuthWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
  loadingComponent?: React.ReactNode
}

export interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: UserRole[]
  fallback?: React.ReactNode
}

export interface PermissionGuardProps {
  children: React.ReactNode
  requiredPermissions: Permission[]
  requireAll?: boolean
  fallback?: React.ReactNode
}

/**
 * Hook return types
 */
export interface UseAuthReturn extends AuthContext {
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

export interface UsePermissionsReturn {
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
  hasRole: (role: UserRole) => boolean
  isAdmin: boolean
}

export interface UseOrganizationReturn {
  organization: ExtendedOrganization | null
  membership: OrganizationMember | null
  isLoaded: boolean
  isAdmin: boolean
  canManageMembers: boolean
}

/**
 * Configuration types
 */
export interface AuthConfig {
  signInUrl: string
  signUpUrl: string
  afterSignInUrl: string
  afterSignUpUrl: string
  profileUrl: string
  appearance?: {
    theme?: 'light' | 'dark'
    variables?: Record<string, string>
    elements?: Record<string, string>
  }
}

export interface SecurityConfig {
  enableTwoFactor: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordRequirements: {
    minLength: number
    requireUppercase: boolean
    requireLowercase: boolean
    requireNumbers: boolean
    requireSymbols: boolean
  }
}