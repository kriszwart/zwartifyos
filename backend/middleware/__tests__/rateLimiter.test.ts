import { describe, it, expect, beforeEach } from "vitest"
import { checkRateLimit, clearRateLimits } from "../rateLimiter"

describe("checkRateLimit", () => {
  beforeEach(() => {
    clearRateLimits()
  })

  it("should allow first request", () => {
    const result = checkRateLimit("test-ip")
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBeGreaterThan(0)
  })

  it("should track multiple requests from same IP", () => {
    const ip = "192.168.1.1"

    const first = checkRateLimit(ip)
    expect(first.allowed).toBe(true)

    const second = checkRateLimit(ip)
    expect(second.allowed).toBe(true)
    expect(second.remaining).toBeLessThan(first.remaining)
  })

  it("should block requests after limit is exceeded", () => {
    const ip = "192.168.1.2"
    const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10)

    // Make max requests
    for (let i = 0; i < maxRequests; i++) {
      const result = checkRateLimit(ip)
      expect(result.allowed).toBe(true)
    }

    // Next request should be blocked
    const blocked = checkRateLimit(ip)
    expect(blocked.allowed).toBe(false)
    expect(blocked.remaining).toBe(0)
  })

  it("should track different IPs separately", () => {
    const ip1 = "192.168.1.1"
    const ip2 = "192.168.1.2"

    const result1 = checkRateLimit(ip1)
    const result2 = checkRateLimit(ip2)

    expect(result1.allowed).toBe(true)
    expect(result2.allowed).toBe(true)
    // Both should have same remaining count as they're independent
    expect(result1.remaining).toBe(result2.remaining)
  })

  it("should provide reset time", () => {
    const result = checkRateLimit("test-ip")
    expect(result.resetTime).toBeGreaterThan(Date.now())
  })

  it("should clear all rate limits", () => {
    const ip = "192.168.1.1"

    checkRateLimit(ip)
    checkRateLimit(ip)

    clearRateLimits()

    const result = checkRateLimit(ip)
    expect(result.remaining).toBe(parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10) - 1)
  })
})
