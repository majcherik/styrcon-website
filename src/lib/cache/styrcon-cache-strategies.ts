/**
 * STYRCON Cache Strategies
 * Advanced caching optimizations for Slovak thermal insulation business
 */

// Check for cacheLife availability (experimental feature)
let unstable_cacheLife: any = null
try {
  unstable_cacheLife = require('next/cache').unstable_cacheLife
} catch (error) {
  // cacheLife not available in this version
  console.log('ℹ️ cacheLife not available, using standard caching strategies')
}

/**
 * Cache profiles for different content types
 */
export const STYRCON_CACHE_PROFILES = {
  // Static product information - long-term caching
  productSpecs: {
    stale: 86400, // 24 hours client-side
    revalidate: 604800, // 1 week server-side
    expire: 2592000, // 30 days maximum
  },

  // Blog content - moderate caching
  blogContent: {
    stale: 3600, // 1 hour client-side
    revalidate: 21600, // 6 hours server-side
    expire: 604800, // 1 week maximum
  },

  // Contact information - frequent updates
  contactInfo: {
    stale: 1800, // 30 minutes client-side
    revalidate: 7200, // 2 hours server-side
    expire: 86400, // 24 hours maximum
  },

  // Technical documentation - long-term stable
  technicalDocs: {
    stale: 172800, // 48 hours client-side
    revalidate: 604800, // 1 week server-side
    expire: 2592000, // 30 days maximum
  },
}

/**
 * Apply cache life configuration if available
 */
export function applyCacheLife(profileName: keyof typeof STYRCON_CACHE_PROFILES) {
  if (unstable_cacheLife) {
    const profile = STYRCON_CACHE_PROFILES[profileName]
    try {
      return unstable_cacheLife(profile)
    } catch (error) {
      console.warn(`Failed to apply cacheLife for ${profileName}:`, error)
      return null
    }
  }
  return null
}

/**
 * Slovak market optimized cache headers
 */
export function getSlovakCacheHeaders(profileName: keyof typeof STYRCON_CACHE_PROFILES) {
  const profile = STYRCON_CACHE_PROFILES[profileName]

  return {
    'Cache-Control': `public, max-age=${profile.stale}, s-maxage=${profile.revalidate}, stale-while-revalidate=${profile.expire}`,
    'CDN-Cache-Control': `public, max-age=${profile.revalidate}`,
    'Vercel-CDN-Cache-Control': `public, max-age=${profile.revalidate}`,
    'X-Slovak-Cache-Profile': profileName,
    'X-Thermal-Insulation-Cache': 'styrcon',
  }
}

/**
 * Enhanced cache wrapper with Slovak business context
 */
export function createStyrconCache<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  profileName: keyof typeof STYRCON_CACHE_PROFILES,
  tags?: string[]
) {
  return async (...args: T): Promise<R> => {
    // Add Slovak business context to cache keys
    const contextualArgs = [
      ...args,
      'sk-market',
      'thermal-insulation',
      'styrcon'
    ] as T

    try {
      const result = await fn(...contextualArgs)

      // Log cache performance in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 STYRCON Cache: ${profileName} profile applied`, {
          tags,
          profile: STYRCON_CACHE_PROFILES[profileName],
          cacheLifeApplied: false,
        })
      }

      return result
    } catch (error) {
      console.error(`STYRCON Cache error for ${profileName}:`, error)
      throw error
    }
  }
}