'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface EnhancedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetchOnHover?: boolean
  analyticsTrack?: boolean
  businessCategory?: 'product' | 'contact' | 'gallery' | 'news' | 'about' | 'documents'
  [key: string]: any
}

/**
 * Enhanced Link component with advanced prefetching strategies
 * Optimized for Slovak STYRCON website performance
 */
export function EnhancedLink({
  href,
  children,
  className,
  prefetchOnHover = true,
  analyticsTrack = false,
  businessCategory,
  ...props
}: EnhancedLinkProps) {
  const router = useRouter()
  const [isPrefetched, setIsPrefetched] = useState(false)

  const handleMouseEnter = () => {
    if (prefetchOnHover && !isPrefetched) {
      // Prefetch the route on hover for instant navigation
      router.prefetch(href)
      setIsPrefetched(true)

      // Track Slovak business navigation patterns
      if (analyticsTrack && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'link_hover_prefetch', {
          link_url: href,
          business_category: businessCategory || 'general',
          business_country: 'SK',
          business_sector: 'thermal_insulation',
          prefetch_strategy: 'hover'
        })
      }
    }
  }

  const handleClick = () => {
    if (analyticsTrack && typeof window !== 'undefined' && window.gtag) {
      // Track Slovak business navigation metrics
      window.gtag('event', 'navigation_click', {
        link_url: href,
        business_category: businessCategory || 'general',
        business_country: 'SK',
        business_sector: 'thermal_insulation',
        click_context: 'enhanced_link'
      })
    }
  }

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  )
}

/**
 * Smart prefetching hook for programmatic route prefetching
 */
export function useSmartPrefetch() {
  const router = useRouter()
  const [prefetchedRoutes] = useState(new Set<string>())

  const prefetchRoute = (route: string) => {
    if (!prefetchedRoutes.has(route)) {
      router.prefetch(route)
      prefetchedRoutes.add(route)
    }
  }

  const prefetchImportantRoutes = () => {
    // Prefetch key Slovak business routes
    const importantRoutes = [
      '/styrcon-produkt',
      '/polytex-produkt',
      '/kontakt',
      '/galeria',
      '/aktuality'
    ]

    importantRoutes.forEach(route => prefetchRoute(route))
  }

  return { prefetchRoute, prefetchImportantRoutes }
}