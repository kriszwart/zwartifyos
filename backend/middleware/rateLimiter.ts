/**
 * Simple in-memory rate limiter
 * For production, use Redis or a proper rate limiting service
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// Store rate limit data per IP
const rateLimitStore = new Map<string, RateLimitEntry>()

// Configuration
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10)
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10) // 1 minute default

/**
 * Checks if a request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @returns Object with whether request is allowed and remaining count
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    // 1% chance to cleanup
    cleanupExpiredEntries(now)
  }

  // No entry or expired entry - allow and create new
  if (!entry || now > entry.resetTime) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + WINDOW_MS,
    }
    rateLimitStore.set(identifier, newEntry)
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: newEntry.resetTime,
    }
  }

  // Entry exists and not expired
  if (entry.count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    }
  }

  // Increment count
  entry.count++
  return {
    allowed: true,
    remaining: MAX_REQUESTS - entry.count,
    resetTime: entry.resetTime,
  }
}

/**
 * Removes expired entries from the store
 */
function cleanupExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

/**
 * Clears all rate limit data (useful for testing)
 */
export function clearRateLimits() {
  rateLimitStore.clear()
}
