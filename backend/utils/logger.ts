/**
 * Structured Logging System
 * Provides consistent logging across the application
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

export interface LogEntry {
  level: keyof typeof LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: {
    name: string
    message: string
    stack?: string
  }
}

class Logger {
  private minLevel: LogLevel

  constructor() {
    // Set minimum log level from environment or default to INFO
    const envLevel = process.env.LOG_LEVEL?.toUpperCase() as keyof typeof LogLevel
    this.minLevel = envLevel && LogLevel[envLevel] !== undefined
      ? LogLevel[envLevel]
      : LogLevel.INFO
  }

  /**
   * Format log entry as JSON
   */
  private formatLog(entry: LogEntry): string {
    return JSON.stringify(entry, null, process.env.NODE_ENV === "development" ? 2 : 0)
  }

  /**
   * Determine if a log level should be output
   */
  private shouldLog(level: LogLevel): boolean {
    return level >= this.minLevel
  }

  /**
   * Core logging method
   */
  private log(
    level: keyof typeof LogLevel,
    message: string,
    context?: Record<string, any>,
    error?: Error
  ) {
    if (!this.shouldLog(LogLevel[level])) {
      return
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      }),
    }

    const formatted = this.formatLog(entry)

    // Output to appropriate stream
    if (level === "ERROR") {
      console.error(formatted)
    } else if (level === "WARN") {
      console.warn(formatted)
    } else {
      console.log(formatted)
    }
  }

  /**
   * Debug level logging
   * Use for detailed debugging information
   */
  debug(message: string, context?: Record<string, any>) {
    this.log("DEBUG", message, context)
  }

  /**
   * Info level logging
   * Use for general informational messages
   */
  info(message: string, context?: Record<string, any>) {
    this.log("INFO", message, context)
  }

  /**
   * Warning level logging
   * Use for non-critical issues
   */
  warn(message: string, context?: Record<string, any>) {
    this.log("WARN", message, context)
  }

  /**
   * Error level logging
   * Use for errors and exceptions
   */
  error(message: string, error?: Error, context?: Record<string, any>) {
    this.log("ERROR", message, context, error)
  }

  /**
   * Create a child logger with additional context
   */
  child(childContext: Record<string, any>): ChildLogger {
    return new ChildLogger(this, childContext)
  }
}

/**
 * Child logger that adds context to all log entries
 */
class ChildLogger {
  constructor(
    private parent: Logger,
    private context: Record<string, any>
  ) {}

  private mergeContext(additionalContext?: Record<string, any>): Record<string, any> {
    return { ...this.context, ...additionalContext }
  }

  debug(message: string, context?: Record<string, any>) {
    this.parent.debug(message, this.mergeContext(context))
  }

  info(message: string, context?: Record<string, any>) {
    this.parent.info(message, this.mergeContext(context))
  }

  warn(message: string, context?: Record<string, any>) {
    this.parent.warn(message, this.mergeContext(context))
  }

  error(message: string, error?: Error, context?: Record<string, any>) {
    this.parent.error(message, error, this.mergeContext(context))
  }
}

// Export singleton logger instance
export const logger = new Logger()

/**
 * Performance monitoring helper
 */
export class PerformanceMonitor {
  private startTime: number
  private logger: Logger | ChildLogger
  private operation: string

  constructor(operation: string, logger: Logger | ChildLogger = logger) {
    this.operation = operation
    this.logger = logger
    this.startTime = Date.now()
    this.logger.debug(`Started: ${operation}`)
  }

  /**
   * End monitoring and log duration
   */
  end(context?: Record<string, any>) {
    const duration = Date.now() - this.startTime
    this.logger.info(`Completed: ${this.operation}`, {
      ...context,
      durationMs: duration,
    })
    return duration
  }

  /**
   * End with error
   */
  endWithError(error: Error, context?: Record<string, any>) {
    const duration = Date.now() - this.startTime
    this.logger.error(`Failed: ${this.operation}`, error, {
      ...context,
      durationMs: duration,
    })
    return duration
  }
}

/**
 * Helper function to create performance monitor
 */
export function monitorPerformance(operation: string, logger?: Logger | ChildLogger) {
  return new PerformanceMonitor(operation, logger)
}

/**
 * Request logging middleware helper
 */
export interface RequestLog {
  method: string
  url: string
  userAgent?: string
  ip?: string
  duration?: number
  status?: number
  error?: string
}

export function logRequest(log: RequestLog) {
  const { duration, status, error, ...context } = log

  if (error) {
    logger.error(`Request failed: ${log.method} ${log.url}`, undefined, {
      ...context,
      status,
      duration,
      error,
    })
  } else if (status && status >= 400) {
    logger.warn(`Request error: ${log.method} ${log.url}`, {
      ...context,
      status,
      duration,
    })
  } else {
    logger.info(`Request: ${log.method} ${log.url}`, {
      ...context,
      status,
      duration,
    })
  }
}
