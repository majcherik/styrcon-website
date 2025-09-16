/**
 * Role-Based Access Control (RBAC) utilities
 * Manages user roles, permissions, and access control
 */

export type UserRole = 'admin' | 'moderator' | 'user' | 'viewer'

export type Permission =
  | 'admin_access'
  | 'user_management'
  | 'content_management'
  | 'analytics_view'
  | 'system_settings'
  | 'document_upload'
  | 'document_download'
  | 'comment_moderate'
  | 'newsletter_manage'

/**
 * Role definitions with associated permissions
 */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'admin_access',
    'user_management',
    'content_management',
    'analytics_view',
    'system_settings',
    'document_upload',
    'document_download',
    'comment_moderate',
    'newsletter_manage',
  ],
  moderator: [
    'content_management',
    'analytics_view',
    'document_upload',
    'document_download',
    'comment_moderate',
  ],
  user: [
    'document_download',
    'document_upload',
  ],
  viewer: [
    'document_download',
  ],
}

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

/**
 * Get all permissions for a specific role
 */
export function getRolePermissions(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] ?? []
}

/**
 * Check if user has permission based on role and custom permissions
 */
export function hasPermission(
  userRole: UserRole | undefined,
  userPermissions: Permission[] = [],
  requiredPermission: Permission
): boolean {
  // Check role-based permissions
  if (userRole && roleHasPermission(userRole, requiredPermission)) {
    return true
  }

  // Check custom user permissions
  return userPermissions.includes(requiredPermission)
}

/**
 * Check if user has any of the required permissions
 */
export function hasAnyPermission(
  userRole: UserRole | undefined,
  userPermissions: Permission[] = [],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some(permission =>
    hasPermission(userRole, userPermissions, permission)
  )
}

/**
 * Check if user has all required permissions
 */
export function hasAllPermissions(
  userRole: UserRole | undefined,
  userPermissions: Permission[] = [],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every(permission =>
    hasPermission(userRole, userPermissions, permission)
  )
}

/**
 * Check if user is admin (has admin role or admin_access permission)
 */
export function isAdmin(
  userRole: UserRole | undefined,
  userPermissions: Permission[] = []
): boolean {
  return userRole === 'admin' || userPermissions.includes('admin_access')
}

/**
 * Get user metadata type for type safety
 */
export interface UserMetadata {
  role?: UserRole
  permissions?: Permission[]
  organizationId?: string
  department?: string
  lastPermissionUpdate?: string
}

/**
 * Default metadata for new users
 */
export const DEFAULT_USER_METADATA: UserMetadata = {
  role: 'user',
  permissions: [],
}

/**
 * Validate and sanitize user metadata
 */
export function validateUserMetadata(metadata: any): UserMetadata {
  const validatedMetadata: UserMetadata = {
    role: 'user', // Default role
    permissions: [],
  }

  // Validate role
  if (metadata?.role && Object.keys(ROLE_PERMISSIONS).includes(metadata.role)) {
    validatedMetadata.role = metadata.role as UserRole
  }

  // Validate permissions
  if (Array.isArray(metadata?.permissions)) {
    validatedMetadata.permissions = metadata.permissions.filter((p: string) =>
      Object.values(ROLE_PERMISSIONS).flat().includes(p as Permission)
    )
  }

  // Validate organization ID
  if (typeof metadata?.organizationId === 'string') {
    validatedMetadata.organizationId = metadata.organizationId
  }

  // Validate department
  if (typeof metadata?.department === 'string') {
    validatedMetadata.department = metadata.department
  }

  return validatedMetadata
}

/**
 * Role hierarchy for permission inheritance
 */
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  admin: ['admin', 'moderator', 'user', 'viewer'],
  moderator: ['moderator', 'user', 'viewer'],
  user: ['user', 'viewer'],
  viewer: ['viewer'],
}

/**
 * Check if user role can manage another role
 */
export function canManageRole(managerRole: UserRole, targetRole: UserRole): boolean {
  return ROLE_HIERARCHY[managerRole]?.includes(targetRole) ?? false
}

/**
 * Get available roles that a user can assign to others
 */
export function getAssignableRoles(userRole: UserRole): UserRole[] {
  return ROLE_HIERARCHY[userRole] ?? []
}