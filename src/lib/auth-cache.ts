/**
 * Authentication caching and performance optimization utilities
 */

import { cache } from 'react'
import { auth, currentUser } from '@clerk/nextjs/server'
import type { UserMetadata } from '@/lib/rbac'

/**
 * Server-side cache for auth data
 * Uses React's cache function for request-level caching
 */

/**
 * Cached auth function for server components
 * Caches authentication data for the duration of the request
 */
export const getCachedAuth = cache(async () => {
  try {
    return await auth()
  } catch (error) {
    console.error('Error getting cached auth:', error)
    return { userId: null, sessionClaims: null }
  }
})

/**
 * Cached current user function for server components
 * Caches user data for the duration of the request
 */
export const getCachedUser = cache(async () => {
  try {
    return await currentUser()
  } catch (error) {
    console.error('Error getting cached user:', error)
    return null
  }
})

/**
 * Cached user metadata extraction
 */
export const getCachedUserMetadata = cache(async () => {
  try {
    const { sessionClaims } = await getCachedAuth()
    return (sessionClaims?.publicMetadata as UserMetadata) || {}
  } catch (error) {
    console.error('Error getting cached user metadata:', error)
    return {}
  }
})

/**
 * Cached role check for server components
 */
export const getCachedUserRole = cache(async () => {
  try {
    const metadata = await getCachedUserMetadata()
    return metadata.role || 'user'
  } catch (error) {
    console.error('Error getting cached user role:', error)
    return 'user'
  }
})

/**
 * Cached permissions check for server components
 */
export const getCachedUserPermissions = cache(async () => {
  try {
    const metadata = await getCachedUserMetadata()
    return metadata.permissions || []
  } catch (error) {
    console.error('Error getting cached user permissions:', error)
    return []
  }
})

/**
 * Client-side caching utilities
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class ClientCache {
  private cache = new Map<string, CacheEntry<any>>()
  private readonly defaultTTL = 5 * 60 * 1000 // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    const isExpired = Date.now() - entry.timestamp > entry.ttl

    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Global cache instance
export const clientCache = new ClientCache()

// Auto cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    clientCache.cleanup()
  }, 10 * 60 * 1000)
}

/**
 * Cache keys for consistent caching
 */
export const CACHE_KEYS = {
  USER_PROFILE: 'user_profile',
  USER_PERMISSIONS: 'user_permissions',
  USER_ORGANIZATIONS: 'user_organizations',
  FEATURE_FLAGS: 'feature_flags',
} as const

/**
 * Cached API calls for client-side
 */
export class AuthApiCache {
  private static instance: AuthApiCache
  private cache = clientCache

  static getInstance(): AuthApiCache {
    if (!AuthApiCache.instance) {
      AuthApiCache.instance = new AuthApiCache()
    }
    return AuthApiCache.instance
  }

  async getUserProfile(userId: string, forceRefresh = false) {
    const cacheKey = `${CACHE_KEYS.USER_PROFILE}_${userId}`

    if (!forceRefresh) {
      const cached = this.cache.get(cacheKey)
      if (cached) return cached
    }

    try {
      const response = await fetch('/api/user/profile')
      if (!response.ok) throw new Error('Failed to fetch user profile')

      const data = await response.json()

      // Cache for 5 minutes
      this.cache.set(cacheKey, data, 5 * 60 * 1000)

      return data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      throw error
    }
  }

  async getUserPermissions(userId: string, forceRefresh = false) {
    const cacheKey = `${CACHE_KEYS.USER_PERMISSIONS}_${userId}`

    if (!forceRefresh) {
      const cached = this.cache.get(cacheKey)
      if (cached) return cached
    }

    try {
      const response = await fetch('/api/user/permissions')
      if (!response.ok) throw new Error('Failed to fetch user permissions')

      const data = await response.json()

      // Cache for 10 minutes (permissions change less frequently)
      this.cache.set(cacheKey, data, 10 * 60 * 1000)

      return data
    } catch (error) {
      console.error('Error fetching user permissions:', error)
      throw error
    }
  }

  invalidateUserCache(userId: string) {
    this.cache.delete(`${CACHE_KEYS.USER_PROFILE}_${userId}`)
    this.cache.delete(`${CACHE_KEYS.USER_PERMISSIONS}_${userId}`)
    this.cache.delete(`${CACHE_KEYS.USER_ORGANIZATIONS}_${userId}`)
  }

  invalidateAll() {
    this.cache.clear()
  }
}

/**
 * Performance monitoring utilities
 */
export class AuthPerformanceMonitor {
  private static measurements = new Map<string, number[]>()

  static startMeasurement(operation: string): () => void {
    const startTime = performance.now()

    return () => {
      const duration = performance.now() - startTime
      this.recordMeasurement(operation, duration)
    }
  }

  private static recordMeasurement(operation: string, duration: number) {
    if (!this.measurements.has(operation)) {
      this.measurements.set(operation, [])
    }

    const measurements = this.measurements.get(operation)!
    measurements.push(duration)

    // Keep only last 100 measurements
    if (measurements.length > 100) {
      measurements.shift()
    }
  }

  static getPerformanceStats(operation: string) {
    const measurements = this.measurements.get(operation) || []

    if (measurements.length === 0) {
      return null
    }

    const sorted = [...measurements].sort((a, b) => a - b)
    const avg = measurements.reduce((a, b) => a + b, 0) / measurements.length
    const median = sorted[Math.floor(sorted.length / 2)]
    const p95 = sorted[Math.floor(sorted.length * 0.95)]

    return {
      count: measurements.length,
      average: Math.round(avg * 100) / 100,
      median: Math.round(median * 100) / 100,
      p95: Math.round(p95 * 100) / 100,
      min: Math.round(sorted[0] * 100) / 100,
      max: Math.round(sorted[sorted.length - 1] * 100) / 100,
    }
  }

  static getAllStats() {
    const stats: Record<string, any> = {}

    for (const operation of this.measurements.keys()) {
      stats[operation] = this.getPerformanceStats(operation)
    }

    return stats
  }
}

/**
 * Preload authentication data for better performance
 */
export function preloadAuthData() {
  if (typeof window === 'undefined') return

  // Preload critical auth endpoints
  const criticalEndpoints = [
    '/api/user/profile',
    '/api/user/permissions',
  ]

  criticalEndpoints.forEach(endpoint => {
    // Use link preload for critical resources
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'fetch'
    link.href = endpoint
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}