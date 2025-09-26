'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Loading skeleton component for client components
export function LoadingSkeleton({ className = '', height = 'h-64' }: { className?: string; height?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${height} ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// Error fallback component for client components with retry logic
export function ErrorFallback({ error, retry }: { error: Error; retry?: () => void }) {
  const handleRetry = () => {
    if (retry) {
      retry()
    } else {
      // If no custom retry, try reloading the page
      window.location.reload()
    }
  }

  return (
    <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
      <div className="text-red-600 mb-2">⚠️ Chyba pri načítaní komponentu</div>
      <p className="text-sm text-red-500 mb-4">
        {error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk')
          ? 'Komponenet sa nepodarilo načítať. Skúste obnoviť stránku.'
          : error.message}
      </p>
      <button
        onClick={handleRetry}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
      >
        Skúsiť znova
      </button>
    </div>
  )
}

// Enhanced retry wrapper for dynamic imports
function createRetryableImport<T>(importFn: () => Promise<T>, maxRetries: number = 3): () => Promise<T> {
  return async (): Promise<T> => {
    let lastError: Error

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await importFn()
      } catch (error) {
        lastError = error as Error
        console.warn(`Import attempt ${attempt} failed:`, error)

        // If this is a chunk loading error, wait before retrying
        if (error instanceof Error && (error.message.includes('ChunkLoadError') || error.message.includes('Loading chunk'))) {
          if (attempt < maxRetries) {
            const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000) // Exponential backoff, max 5s
            console.log(`Retrying in ${delay}ms...`)
            await new Promise(resolve => setTimeout(resolve, delay))
          }
        } else {
          // For non-chunk errors, fail immediately
          throw error
        }
      }
    }

    throw lastError!
  }
}

// Client-side only components (with animations, canvas, video, etc.) - Enhanced with retry logic
export const LazyBeforeAfterSection = dynamic(
  createRetryableImport(() =>
    import('@/components/sections/before-after-section').then(mod => ({ default: mod.BeforeAfterSection }))
  ),
  {
    loading: () => <LoadingSkeleton height="h-96" />,
    ssr: false // This component likely uses client-side interactions
  }
)

export const LazyCanvasScrollSection = dynamic(
  createRetryableImport(() =>
    import('@/components/sections/canvas-scroll-section').then(mod => ({ default: mod.CanvasScrollSection }))
  ),
  {
    loading: () => <LoadingSkeleton height="h-screen" />,
    ssr: false // Canvas animations are client-side only
  }
)

export const LazyScrollVideoHero = dynamic(
  createRetryableImport(() =>
    import('@/components/sections/scroll-video-hero').then(mod => ({ default: mod.ScrollVideoHero }))
  ),
  {
    loading: () => <LoadingSkeleton height="h-screen" />,
    ssr: false // Video components are typically client-side
  }
)

export const LazyFeaturesScrollSection = dynamic(
  createRetryableImport(() =>
    import('@/components/sections/features-scroll-section').then(mod => ({ default: mod.FeaturesScrollSection }))
  ),
  {
    loading: () => <LoadingSkeleton height="h-screen" />,
    ssr: false // Scroll animations are client-side
  }
)

export const LazyArticleTracingBeam = dynamic(
  createRetryableImport(() =>
    import('@/components/sections/article-tracing-beam').then(mod => ({ default: mod.ArticleTracingBeam }))
  ),
  {
    loading: () => <LoadingSkeleton height="h-96" />,
    ssr: false // Tracing beam animations are client-side
  }
)

// Client-side lazy loading factory function with retry support
export function createClientLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    fallback?: ComponentType
    height?: string
    maxRetries?: number
  } = {}
) {
  const { fallback, height = 'h-64', maxRetries = 3 } = options

  return dynamic(createRetryableImport(importFn, maxRetries), {
    loading: fallback || (() => <LoadingSkeleton height={height} />),
    ssr: false // Client components don't use SSR
  })
}