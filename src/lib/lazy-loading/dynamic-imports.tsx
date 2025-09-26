import React from 'react'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Loading skeleton component
export function LoadingSkeleton({ className = '', height = 'h-64' }: { className?: string; height?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-lg ${height} ${className}`}>
      <div className="flex items-center justify-center h-full">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// Error fallback component
export function ErrorFallback({ error, retry }: { error: Error; retry?: () => void }) {
  return (
    <div className="p-6 text-center border border-red-200 rounded-lg bg-red-50">
      <div className="text-red-600 mb-2">⚠️ Chyba pri načítaní komponentu</div>
      <p className="text-sm text-red-500 mb-4">{error.message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
        >
          Skúsiť znova
        </button>
      )}
    </div>
  )
}

// Server-compatible components (SSR-friendly)
export const LazyStyrexonSystemCarousel = dynamic(
  () => import('@/components/sections/styrexon-system-carousel').then(mod => ({ default: mod.StyrexonSystemCarousel })),
  {
    loading: () => <LoadingSkeleton height="h-80" />,
    ssr: true // Keep SSR for SEO
  }
)

export const LazyProjectGallery = dynamic(
  () => import('@/components/sections/project-gallery-simple').then(mod => ({ default: mod.ProjectGallerySimple })),
  {
    loading: () => <LoadingSkeleton height="h-96" />,
    ssr: true // Gallery should be indexed
  }
)

export const LazyFeaturesAccordionSection = dynamic(
  () => import('@/components/sections/features-accordion-section').then(mod => ({ default: mod.FeaturesAccordionSection })),
  {
    loading: () => <LoadingSkeleton height="h-80" />,
    ssr: true // Accordion content should be indexed
  }
)

// Lazy loading factory function for custom components
export function createLazyComponent<T = {}>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    fallback?: ComponentType
    height?: string
    ssr?: boolean
  } = {}
) {
  const { fallback, height = 'h-64', ssr = true } = options

  return dynamic(importFn, {
    loading: fallback || (() => <LoadingSkeleton height={height} />),
    ssr
  })
}

// Intersection Observer hook for loading components when they come into view
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  if (typeof window === 'undefined') return { ref: null, isVisible: true }

  const { threshold = 0.1, rootMargin = '100px' } = options

  // This would typically use a custom hook implementation
  // For now, returning a simple implementation
  return {
    ref: null,
    isVisible: true
  }
}