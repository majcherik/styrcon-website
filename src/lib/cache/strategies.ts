import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { STYRCON_CACHE_PROFILES } from './styrcon-cache-strategies'

/**
 * Cache configuration for different content types
 */
export const CACHE_CONFIGS = {
  // Static content (company info, about page) - cache for 1 hour, stale-while-revalidate for 24 hours
  static: {
    revalidate: 3600, // 1 hour
    tags: ['static']
  },
  // Product data - cache for 30 minutes
  products: {
    revalidate: 1800, // 30 minutes
    tags: ['products']
  },
  // Contact inquiries - no cache
  dynamic: {
    revalidate: 0,
    tags: ['dynamic']
  }
} as const

/**
 * React cache wrapper for memoizing expensive operations within a single request
 * Enhanced with Next.js native fetch caching
 */
export const memoizedFetch = cache(async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    next: {
      revalidate: CACHE_CONFIGS.static.revalidate,
      tags: CACHE_CONFIGS.static.tags
    }
  })

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`)
  }

  return response.json()
})

/**
 * Slovak business optimized fetch for external APIs
 * Uses native Next.js fetch caching with proper tags
 */
export const fetchStyrconData = cache(async (endpoint: string, cacheType: keyof typeof CACHE_CONFIGS = 'products') => {
  const config = CACHE_CONFIGS[cacheType]

  // For demonstration - in real app, this would hit your CMS or external API
  const response = await fetch(`https://api.styrcon.sk/${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'STYRCON-Website/1.0',
    },
    next: {
      revalidate: config.revalidate,
      tags: config.tags
    }
  })

  if (!response.ok) {
    // Fallback to static data if external API fails
    console.warn(`External API failed for ${endpoint}, using fallback data`)
    return getStaticFallbackData(endpoint)
  }

  return response.json()
})

/**
 * Static fallback data for offline resilience
 */
function getStaticFallbackData(endpoint: string) {
  const fallbacks = {
    'products/styrcon': {
      id: 'styrcon',
      name: 'STYRCON',
      description: 'Paropriepustné tepelnoizolačné dosky',
      lastUpdated: new Date().toISOString()
    },
    'products/polytex': {
      id: 'polytex',
      name: 'POLYTEX',
      description: 'Hygienické farby pre zdravé bývanie',
      lastUpdated: new Date().toISOString()
    }
  }

  return fallbacks[endpoint] || { error: 'No fallback available' }
}

/**
 * Cached function for fetching product data with ISR optimization
 */
export const getProductData = unstable_cache(
  async () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📦 STYRCON Product Data Cache:', {
        cacheLifeApplied: false,
        profile: STYRCON_CACHE_PROFILES.productSpecs
      })
    }
    // This would typically fetch from your CMS or database
    // For now, return static data
    return {
      id: 'styrcon',
      name: 'STYRCON',
      description: 'Paropriepustné tepelnoizolačné dosky',
      features: [
        'Nehorľavosť triedy A1',
        'Paropriepustnosť',
        'Tepelná izolácia',
        'Dlhá životnosť'
      ],
      lastUpdated: new Date().toISOString(),
      specifications: {
        fireResistance: 'A1',
        vaporPermeability: '≤ 3',
        thermalConductivity: '0,041 W/mK',
        compressiveStrength: '≥ 150 kPa'
      }
    }
  },
  ['product-data'],
  {
    revalidate: CACHE_CONFIGS.products.revalidate,
    tags: CACHE_CONFIGS.products.tags
  }
)

/**
 * ISR-optimized function for news/articles
 */
export const getNewsArticles = unstable_cache(
  async (limit = 10) => {
    // This would fetch from your CMS
    return {
      articles: [
        {
          id: 'zateplena-tvarnica-styrcon',
          title: 'Zateplená tvárnica STYRCON',
          excerpt: 'Nová generácia tepelnoizolačných dosiek pre murivo',
          publishedAt: new Date().toISOString(),
          slug: 'zateplena-tvarnica-styrcon'
        }
      ],
      total: 1,
      lastUpdated: new Date().toISOString()
    }
  },
  ['news-articles'],
  {
    revalidate: 3600, // 1 hour
    tags: ['news', 'articles']
  }
)

/**
 * ISR for project gallery
 */
export const getProjectGallery = unstable_cache(
  async () => {
    return {
      projects: [
        {
          id: '1',
          title: 'Administratívna budova',
          description: 'Zateplenie pomocou STYRCON dosiek',
          imageUrl: '/images/projects/admin-building.jpg',
          completedAt: '2024'
        },
        {
          id: '2',
          title: 'Rodinný dom',
          description: 'Kompletné zateplenie rodinného domu',
          imageUrl: '/images/projects/family-house.jpg',
          completedAt: '2024'
        }
      ],
      lastUpdated: new Date().toISOString()
    }
  },
  ['project-gallery'],
  {
    revalidate: 7200, // 2 hours
    tags: ['projects', 'gallery']
  }
)

/**
 * Cached function for fetching company information
 */
export const getCompanyInfo = unstable_cache(
  async () => {
    return {
      name: 'E-MA SK s.r.o.',
      description: 'Komerčný partner pre STYRCON produkty na Slovensku',
      contact: {
        email: 'info@e-ma-sk.com',
        phone: '+421 XXX XXX XXX',
        address: 'Jelenec, Slovensko'
      }
    }
  },
  ['company-info'],
  {
    revalidate: CACHE_CONFIGS.static.revalidate,
    tags: CACHE_CONFIGS.static.tags
  }
)

/**
 * Cache revalidation utilities
 */
export async function revalidateProductData() {
  const { revalidateTag } = await import('next/cache')
  revalidateTag('products')
}

export async function revalidateStaticContent() {
  const { revalidateTag } = await import('next/cache')
  revalidateTag('static')
}

/**
 * Cache headers for API responses
 */
export function getCacheHeaders(type: keyof typeof CACHE_CONFIGS) {
  const config = CACHE_CONFIGS[type]

  if (config.revalidate === 0) {
    return {
      'Cache-Control': 'no-store, max-age=0'
    }
  }

  return {
    'Cache-Control': `public, max-age=${config.revalidate}, stale-while-revalidate=${config.revalidate * 24}`
  }
}