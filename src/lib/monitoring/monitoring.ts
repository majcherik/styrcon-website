/**
 * Production Monitoring and Observability
 */

import { logger } from '@/lib/logging/logger'

// Performance metrics tracking
export class PerformanceTracker {
  private static instance: PerformanceTracker
  private metrics: Map<string, number[]> = new Map()

  static getInstance(): PerformanceTracker {
    if (!PerformanceTracker.instance) {
      PerformanceTracker.instance = new PerformanceTracker()
    }
    return PerformanceTracker.instance
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, [])
    }

    const values = this.metrics.get(name)!
    values.push(value)

    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift()
    }

    // Log slow operations
    if (name.includes('duration') && value > 1000) {
      logger.warn(`Slow operation detected: ${name}`, { duration: `${value}ms` })
    }
  }

  getMetrics(name: string) {
    const values = this.metrics.get(name) || []
    if (values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    return {
      count: values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)]
    }
  }

  getAllMetrics() {
    const result: Record<string, any> = {}
    for (const [name] of this.metrics) {
      result[name] = this.getMetrics(name)
    }
    return result
  }
}

// Error tracking and reporting
export class ErrorTracker {
  private static instance: ErrorTracker
  private errorCounts: Map<string, number> = new Map()

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }

  recordError(error: Error, context?: Record<string, any>) {
    const errorKey = `${error.name}: ${error.message}`
    const count = this.errorCounts.get(errorKey) || 0
    this.errorCounts.set(errorKey, count + 1)

    // Log error with context
    logger.error('Application error tracked', context, error)

    // In production, you would send to external error tracking service
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(error, context)
    }
  }

  private async sendToErrorService(error: Error, context?: Record<string, any>) {
    // Placeholder for external error service integration
    // e.g., Sentry, Bugsnag, etc.
    console.log('Would send to error service:', {
      error: error.message,
      stack: error.stack,
      context
    })
  }

  getErrorSummary() {
    return Object.fromEntries(this.errorCounts)
  }
}

// Application health monitoring
export class HealthMonitor {
  private static instance: HealthMonitor
  private healthChecks: Map<string, () => Promise<boolean>> = new Map()

  static getInstance(): HealthMonitor {
    if (!HealthMonitor.instance) {
      HealthMonitor.instance = new HealthMonitor()
    }
    return HealthMonitor.instance
  }

  addHealthCheck(name: string, check: () => Promise<boolean>) {
    this.healthChecks.set(name, check)
  }

  async runHealthChecks() {
    const results: Record<string, boolean> = {}

    for (const [name, check] of this.healthChecks) {
      try {
        results[name] = await Promise.race([
          check(),
          new Promise<boolean>((_, reject) =>
            setTimeout(() => reject(new Error('Health check timeout')), 5000)
          )
        ])
      } catch (error) {
        results[name] = false
        logger.error(`Health check failed: ${name}`, {}, error as Error)
      }
    }

    return results
  }
}

// Initialize monitoring system
export function initializeMonitoring() {
  const performanceTracker = PerformanceTracker.getInstance()
  const errorTracker = ErrorTracker.getInstance()
  const healthMonitor = HealthMonitor.getInstance()

  // Set up basic health checks
  healthMonitor.addHealthCheck('database', async () => {
    try {
      // In a real app, you'd check database connectivity
      // For now, just return true
      return true
    } catch {
      return false
    }
  })

  healthMonitor.addHealthCheck('external-services', async () => {
    try {
      // Check external service connectivity
      return true
    } catch {
      return false
    }
  })

  // Set up global error handler
  if (typeof process !== 'undefined') {
    process.on('uncaughtException', (error) => {
      errorTracker.recordError(error, { type: 'uncaughtException' })
      logger.error('Uncaught exception', {}, error)
    })

    process.on('unhandledRejection', (reason) => {
      const error = reason instanceof Error ? reason : new Error(String(reason))
      errorTracker.recordError(error, { type: 'unhandledRejection' })
      logger.error('Unhandled rejection', {}, error)
    })
  }

  // Periodic health monitoring
  if (process.env.NODE_ENV === 'production') {
    setInterval(async () => {
      const health = await healthMonitor.runHealthChecks()
      const allHealthy = Object.values(health).every(Boolean)

      if (!allHealthy) {
        logger.warn('Health check failed', { health })
      } else {
        logger.info('Health check passed', { health })
      }
    }, 60000) // Check every minute
  }

  logger.info('Monitoring system initialized')
}

// Cleanup function for graceful shutdown
export async function cleanup() {
  logger.info('Cleaning up monitoring resources')

  // Get final metrics and error summary
  const performanceTracker = PerformanceTracker.getInstance()
  const errorTracker = ErrorTracker.getInstance()

  const finalMetrics = performanceTracker.getAllMetrics()
  const errorSummary = errorTracker.getErrorSummary()

  logger.info('Final performance metrics', { metrics: finalMetrics })
  logger.info('Final error summary', { errors: errorSummary })
}

// Export singleton instances
export const performanceTracker = PerformanceTracker.getInstance()
export const errorTracker = ErrorTracker.getInstance()
export const healthMonitor = HealthMonitor.getInstance()