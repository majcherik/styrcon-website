'use client'

import { useEffect } from 'react'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

/**
 * Web Vitals tracking for Slovak STYRCON website performance
 * Monitors Core Web Vitals for optimal user experience
 */
export function WebVitalsTracker() {
  useEffect(() => {
    // Only load in production or when explicitly enabled
    if (process.env.NODE_ENV !== 'production' && process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS !== 'true') {
      return
    }

    const reportWebVitals = (metric: WebVitalsMetric) => {
      // Log for development/debugging
      if (process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS === 'true') {
        console.log('📊 Web Vital:', metric.name, metric.value, metric.rating)
      }

      // Send to analytics in production
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', metric.name, {
          custom_map: {
            metric_id: metric.id,
            metric_value: metric.value,
            metric_delta: metric.delta,
            metric_rating: metric.rating,
          },
          // Slovak business context
          business_country: 'SK',
          business_sector: 'construction',
          product_category: 'thermal_insulation'
        })
      }

      // Custom Slovak business metrics tracking
      trackSlowakBusinessMetrics(metric)
    }

    // Import and use web-vitals library dynamically
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(reportWebVitals)
      getFID(reportWebVitals)
      getFCP(reportWebVitals)
      getLCP(reportWebVitals)
      getTTFB(reportWebVitals)
    }).catch(() => {
      console.warn('Web Vitals library not available')
    })

  }, [])

  return null // This component doesn't render anything
}

/**
 * Track Slovak business-specific performance metrics
 */
function trackSlowakBusinessMetrics(metric: WebVitalsMetric) {
  // Key performance thresholds for Slovak construction industry website
  const businessThresholds = {
    LCP: 2500, // Large Contentful Paint - important for product images
    FID: 100,  // First Input Delay - critical for contact forms
    CLS: 0.1,  // Cumulative Layout Shift - important for professional appearance
    FCP: 1800, // First Contentful Paint - quick initial load
    TTFB: 600  // Time to First Byte - server performance
  }

  const threshold = businessThresholds[metric.name as keyof typeof businessThresholds]

  if (threshold && metric.value > threshold) {
    console.warn(`🚨 Slovak Business Metric Alert: ${metric.name} (${metric.value}) exceeds threshold (${threshold})`)

    // In production, this could send alerts to monitoring system
    if (process.env.NODE_ENV === 'production') {
      // Could integrate with Slovak business monitoring here
    }
  }
}

/**
 * Global type declaration for gtag
 */
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      parameters?: Record<string, any>
    ) => void
  }
}