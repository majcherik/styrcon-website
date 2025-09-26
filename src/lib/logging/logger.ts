type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogContext {
  userId?: string
  requestId?: string
  userAgent?: string
  ip?: string
  url?: string
  method?: string
  [key: string]: unknown
}

interface LogEntry {
  level: LogLevel
  message: string
  context?: LogContext
  timestamp: string
  error?: {
    name: string
    message: string
    stack?: string
  }
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLogEntry(entry: LogEntry): string {
    const { timestamp, level, message, context, error } = entry

    let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`

    if (context) {
      logMessage += ` | Context: ${JSON.stringify(context)}`
    }

    if (error) {
      logMessage += ` | Error: ${error.name} - ${error.message}`
      if (error.stack && this.isDevelopment) {
        logMessage += `\nStack: ${error.stack}`
      }
    }

    return logMessage
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined
    }

    const formattedMessage = this.formatLogEntry(entry)

    // Console logging
    switch (level) {
      case 'error':
        console.error(formattedMessage)
        break
      case 'warn':
        console.warn(formattedMessage)
        break
      case 'info':
        console.info(formattedMessage)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage)
        }
        break
    }

    // In production, you would send logs to external service
    // this.sendToExternalService(entry)
  }

  error(message: string, context?: LogContext, error?: Error): void {
    this.log('error', message, context, error)
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context)
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context)
  }

  // Helper method for API route logging
  apiError(message: string, request: Request, error?: Error, additionalContext?: Record<string, unknown>): void {
    const context: LogContext = {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
      ...additionalContext
    }

    this.error(message, context, error)
  }

  // Helper method for API route info logging
  apiInfo(message: string, request: Request, additionalContext?: Record<string, unknown>): void {
    const context: LogContext = {
      method: request.method,
      url: request.url,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
      ...additionalContext
    }

    this.info(message, context)
  }
}

export const logger = new Logger()

// Performance monitoring helpers
export class PerformanceMonitor {
  private startTime: number

  constructor() {
    this.startTime = performance.now()
  }

  end(operationName: string): void {
    const duration = performance.now() - this.startTime
    logger.info(`Performance: ${operationName}`, { duration: `${duration.toFixed(2)}ms` })

    if (duration > 1000) { // Log slow operations
      logger.warn(`Slow operation detected: ${operationName}`, { duration: `${duration.toFixed(2)}ms` })
    }
  }
}

// Error sanitization for client responses
export function sanitizeErrorForClient(error: unknown): { message: string; code?: string } {
  if (error instanceof Error) {
    // Don't expose internal error details in production
    if (process.env.NODE_ENV === 'production') {
      return {
        message: 'Nastala serverová chyba. Skúste to prosím znova.',
        code: 'INTERNAL_ERROR'
      }
    }

    return {
      message: error.message,
      code: error.name
    }
  }

  return {
    message: 'Neznáma chyba',
    code: 'UNKNOWN_ERROR'
  }
}