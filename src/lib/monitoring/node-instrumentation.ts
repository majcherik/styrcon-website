/**
 * Node.js specific instrumentation for OpenTelemetry
 * Only runs in Node.js runtime environments
 */

export async function registerNodeInstrumentation() {
  // Only register in Node.js environment
  if (typeof window !== 'undefined') {
    return
  }

  try {
    // In a real production environment, you would install and configure OpenTelemetry:
    // npm install @opentelemetry/auto-instrumentations-node
    // npm install @opentelemetry/exporter-otlp-http
    // npm install @opentelemetry/resources
    // npm install @opentelemetry/semantic-conventions

    // For now, we'll create a lightweight instrumentation setup
    console.log('📊 Node.js instrumentation registered')

    // Measure important Node.js metrics
    if (process.memoryUsage) {
      // Memory monitoring
      const memoryMonitor = setInterval(() => {
        const memUsage = process.memoryUsage()

        // Log memory usage if it's getting high (over 500MB)
        if (memUsage.heapUsed > 500 * 1024 * 1024) {
          console.warn('⚠️  High memory usage detected:', {
            heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + 'MB',
            heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + 'MB',
            external: Math.round(memUsage.external / 1024 / 1024) + 'MB',
            rss: Math.round(memUsage.rss / 1024 / 1024) + 'MB'
          })
        }
      }, 30000) // Check every 30 seconds

      // Clean up on exit
      process.on('exit', () => {
        clearInterval(memoryMonitor)
      })
    }

    // CPU usage monitoring (simplified)
    const startTime = process.hrtime()
    const startUsage = process.cpuUsage()

    setInterval(() => {
      const currentUsage = process.cpuUsage(startUsage)
      const currentTime = process.hrtime(startTime)

      // Calculate CPU usage percentage
      const cpuPercent = (currentUsage.user + currentUsage.system) /
                       (currentTime[0] * 1000000 + currentTime[1] / 1000) * 100

      if (cpuPercent > 80) {
        console.warn('⚠️  High CPU usage detected:', {
          cpuPercent: Math.round(cpuPercent * 100) / 100 + '%'
        })
      }
    }, 60000) // Check every minute

    // Track unhandled errors specific to Node.js
    process.on('warning', (warning) => {
      console.warn('⚠️  Node.js warning:', {
        name: warning.name,
        message: warning.message,
        stack: warning.stack
      })
    })

    // Example of what real OpenTelemetry setup would look like:
    /*
    const { NodeSDK } = await import('@opentelemetry/auto-instrumentations-node');
    const { Resource } = await import('@opentelemetry/resources');
    const { SemanticResourceAttributes } = await import('@opentelemetry/semantic-conventions');

    const sdk = new NodeSDK({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'styrcon-website',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
      }),
    });

    sdk.start();
    */

  } catch (error) {
    console.error('❌ Failed to register Node.js instrumentation:', error)
  }
}

// Export a function to get current Node.js metrics
export function getNodeMetrics() {
  if (typeof window !== 'undefined' || !process.memoryUsage) {
    return null
  }

  const memUsage = process.memoryUsage()
  const uptime = process.uptime()

  return {
    memory: {
      heapUsed: memUsage.heapUsed,
      heapTotal: memUsage.heapTotal,
      external: memUsage.external,
      rss: memUsage.rss
    },
    uptime,
    version: process.version,
    platform: process.platform,
    arch: process.arch
  }
}