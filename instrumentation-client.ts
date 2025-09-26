/**
 * Client-side instrumentation for STYRCON website
 * Provides browser-side monitoring and error tracking
 * Optimized for Slovak thermal insulation business metrics
 */

export async function register() {
  // Only run in browser environment
  if (typeof window !== 'undefined') {
    console.log('🔍 Initializing STYRCON client monitoring...')

    try {
      // Initialize basic Web Vitals tracking
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals')

      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)

      console.log('✅ STYRCON client monitoring initialized')

    } catch (error) {
      console.error('❌ Client monitoring setup failed:', error)
      // Fallback to basic console logging
      console.log('📊 Basic client monitoring active')
    }

    // Track page navigation for Slovak business analytics
    if ('navigation' in window) {
      const navigation = (window as any).navigation
      navigation.addEventListener?.('navigate', (event: any) => {
        console.log('📊 Navigation:', event.destination?.url)
      })
    }

    // Track critical business interactions
    window.addEventListener('load', () => {
      // Track critical Slovak business metrics
      setTimeout(() => {
        const metrics = {
          loadTime: performance.now(),
          userAgent: navigator.userAgent,
          language: navigator.language,
          isSlovakUser: navigator.language.includes('sk'),
          timestamp: new Date().toISOString()
        }
        
        console.log('📊 STYRCON Load Metrics:', metrics)
      }, 1000)
    })

    console.log('🚀 STYRCON Client Instrumentation Active')
  }
}