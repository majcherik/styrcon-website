/**
 * Service Worker for STYRCON Slovak website
 * Provides offline functionality and caching for better user experience
 * No push notifications - focused on essential PWA features
 */

const CACHE_NAME = 'styrcon-v1'
const STATIC_CACHE_NAME = 'styrcon-static-v1'

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/styrcon-produkt',
  '/kontakt',
  '/galeria',
  '/manifest.json'
]

// Slovak business assets to cache
const BUSINESS_ASSETS = [
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png',
  '/og-image.jpg'
]

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('🔧 STYRCON Service Worker installing...')

  event.waitUntil(
    Promise.all([
      // Cache static files
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        console.log('📦 Caching static files for Slovak business')
        return cache.addAll(STATIC_FILES.concat(BUSINESS_ASSETS))
      }),

      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('✅ STYRCON Service Worker activated')

  event.waitUntil(
    Promise.all([
      // Take control of all pages
      self.clients.claim(),

      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return !cacheName.includes('styrcon-v1') && !cacheName.includes('styrcon-static-v1')
            })
            .map((cacheName) => {
              console.log('🗑️ Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            })
        )
      })
    ])
  )
})

// Development-safe fetch strategies
async function staleWhileRevalidate(request, cacheName = CACHE_NAME) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)

    // Return cached version immediately if available
    if (cachedResponse) {
      // Update cache in background
      fetch(request).then(response => {
        if (response.status === 200) {
          cache.put(request, response.clone())
        }
      }).catch(() => {
        console.log('[SW] Background fetch failed:', request.url)
      })
      return cachedResponse
    }

    // No cache, fetch from network
    const response = await fetch(request)
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response

  } catch (error) {
    console.log('[SW] Background fetch failed:', error)
    throw error
  }
}

async function cacheFirst(request, cacheName = STATIC_CACHE_NAME) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    const response = await fetch(request)
    if (response.status === 200) {
      cache.put(request, response.clone())
    }
    return response

  } catch (error) {
    console.log('[SW] Cache first failed:', error)
    throw error
  }
}

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only handle GET requests
  if (request.method !== 'GET') return

  // Skip development hot-reload requests and API routes
  if (url.pathname.includes('__nextjs') ||
      url.pathname.includes('webpack-hmr') ||
      url.pathname.includes('/api/') ||
      url.search.includes('_rsc=')) {
    return
  }

  // Handle Slovak business pages
  if (url.pathname === '/' ||
      url.pathname.startsWith('/styrcon-produkt') ||
      url.pathname.startsWith('/kontakt') ||
      url.pathname.startsWith('/galeria') ||
      url.pathname.startsWith('/aktuality')) {

    event.respondWith(
      staleWhileRevalidate(request)
        .catch(() => {
          // Fallback for offline access
          return new Response(
            '<h1>Offline</h1><p>Prosím skontrolujte internetové pripojenie.</p>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          )
        })
    )
    return
  }

  // Handle static assets (images, icons, etc.)
  if (request.destination === 'image' ||
      url.pathname.includes('/icon-') ||
      url.pathname.includes('/apple-touch-icon') ||
      url.pathname.includes('/og-image')) {

    event.respondWith(cacheFirst(request))
    return
  }

  // Handle Next.js assets - but skip development chunks
  if (url.pathname.startsWith('/_next/') && !url.pathname.includes('_app-pages-browser_')) {
    event.respondWith(cacheFirst(request))
    return
  }
})

// Message event - handle communication from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

console.log('🏢 STYRCON Slovak Business Service Worker loaded')