import { NextRequest, NextResponse } from 'next/server'
import { healthMonitor, performanceTracker, errorTracker } from '@/lib/monitoring/monitoring'
import { getNodeMetrics } from '@/lib/monitoring/node-instrumentation'
import { getCacheHeaders } from '@/lib/cache/strategies'

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now()

    // Run health checks
    const healthResults = await healthMonitor.runHealthChecks()
    const allHealthy = Object.values(healthResults).every(Boolean)

    // Get performance metrics
    const performanceMetrics = performanceTracker.getAllMetrics()

    // Get error summary
    const errorSummary = errorTracker.getErrorSummary()

    // Get Node.js metrics
    const nodeMetrics = getNodeMetrics()

    const healthData = {
      status: allHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime ? Math.floor(process.uptime()) : null,
      checks: healthResults,
      metrics: {
        performance: performanceMetrics,
        errors: errorSummary,
        node: nodeMetrics
      },
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV,
      responseTime: Date.now() - startTime
    }

    return NextResponse.json(healthData, {
      status: allHealthy ? 200 : 503,
      headers: {
        ...getCacheHeaders('dynamic'),
        'Content-Type': 'application/json'
      }
    })

  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: getCacheHeaders('dynamic')
      }
    )
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}