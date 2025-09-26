/**
 * Professional OpenTelemetry instrumentation using @vercel/otel
 * Provides production-grade observability for the STYRCON website
 */

import { registerOTel } from '@vercel/otel'

export async function register() {
  // Only run instrumentation in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.ENABLE_INSTRUMENTATION === 'true') {

    console.log('📊 Initializing professional STYRCON monitoring...')

    try {
      // Register Vercel's optimized OpenTelemetry setup
      registerOTel({
        serviceName: 'styrcon-website',

        // Add custom Slovak business context attributes
        attributes: {
          'business.country': 'SK',
          'business.sector': 'construction',
          'business.product': 'thermal_insulation',
          'business.brand': 'styrcon',
          'application.framework': 'nextjs',
          'application.language': 'slovak',
          'application.runtime': process.env.NEXT_RUNTIME || 'nodejs'
        }
      })

      console.log('✅ Professional OpenTelemetry registered successfully')

    } catch (otelError) {
      console.error('❌ OpenTelemetry setup failed:', otelError)
    }

    // Initialize our supplementary monitoring system
    try {
      const { initializeMonitoring } = await import('./src/lib/monitoring/monitoring')
      initializeMonitoring()

      console.log('✅ Supplementary monitoring initialized')
    } catch (monitoringError) {
      console.error('❌ Supplementary monitoring failed:', monitoringError)
    }

    // Log final startup information
    console.log('🚀 STYRCON Professional Monitoring Active')
    console.log(`📊 Environment: ${process.env.NODE_ENV}`)
    console.log(`🔧 Runtime: ${process.env.NEXT_RUNTIME || 'nodejs'}`)
    console.log('🏢 Business Context: Slovak Thermal Insulation')
  } else {
    console.log('ℹ️  Professional monitoring disabled. Set ENABLE_INSTRUMENTATION=true to enable.')
  }
}

// Graceful shutdown handler
if (typeof process !== 'undefined') {
  process.on('SIGTERM', async () => {
    console.log('🛑 STYRCON Website shutting down gracefully...')

    // Cleanup monitoring resources
    if (process.env.NODE_ENV === 'production') {
      const { cleanup } = await import('./src/lib/monitoring/monitoring')
      await cleanup()
    }

    process.exit(0)
  })
}