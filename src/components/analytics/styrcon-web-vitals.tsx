'use client'

import { useReportWebVitals } from 'next/web-vitals'

/**
 * STYRCON Web Vitals Tracker
 * Monitors Core Web Vitals for Slovak thermal insulation business optimization
 */
export function StyrconWebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 STYRCON Web Vital:', {
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        navigationType: metric.navigationType,
        id: metric.id,
      })
    }

    // Track business-specific metrics for Slovak thermal insulation
    const businessMetric = {
      ...metric,
      // Add Slovak market context
      market: 'SK',
      businessSector: 'thermal_insulation',
      brand: 'styrcon',
      timestamp: new Date().toISOString(),
    }

    // Send to analytics service (placeholder for future implementation)
    if (typeof window !== 'undefined') {
      // Store in localStorage for development/debugging
      const vitalsKey = 'styrcon_web_vitals'
      const existingVitals = JSON.parse(localStorage.getItem(vitalsKey) || '[]')
      existingVitals.push(businessMetric)

      // Keep only last 50 entries
      const recentVitals = existingVitals.slice(-50)
      localStorage.setItem(vitalsKey, JSON.stringify(recentVitals))

      // Track Slovak-specific performance patterns
      if (metric.name === 'LCP' && metric.value > 2500) {
        console.warn('🚨 STYRCON: Slow Largest Contentful Paint detected for Slovak users')
      }

      if (metric.name === 'FID' && metric.value > 100) {
        console.warn('⚠️ STYRCON: High First Input Delay may affect thermal insulation inquiry forms')
      }

      if (metric.name === 'CLS' && metric.value > 0.1) {
        console.warn('⚠️ STYRCON: Layout shift detected - may affect product specification viewing')
      }
    }

    // Future: Send to external analytics service
    // Example: sendToAnalytics('web-vitals', businessMetric)
  })

  // This component doesn't render anything
  return null
}