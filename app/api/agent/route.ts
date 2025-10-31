import { mainAgent } from "../../../backend/agents/mainAgent"
import { NextResponse } from "next/server"
import { validateInput, validateAuthToken } from "../../../backend/utils/validation"
import { checkRateLimit } from "../../../backend/middleware/rateLimiter"

// Helper to get client IP
function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for")
  const realIP = request.headers.get("x-real-ip")
  return forwarded?.split(",")[0] || realIP || "unknown"
}

export async function POST(request: Request) {
  try {
    // 1. Check authentication
    const authHeader = request.headers.get("authorization")
    const token = authHeader?.replace("Bearer ", "") || null

    if (!validateAuthToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing API token" },
        { status: 401 }
      )
    }

    // 2. Check rate limiting
    const clientIP = getClientIP(request)
    const rateLimitResult = checkRateLimit(clientIP)

    if (!rateLimitResult.allowed) {
      const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": process.env.RATE_LIMIT_MAX_REQUESTS || "10",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
            "Retry-After": retryAfter.toString(),
          }
        }
      )
    }

    // 3. Parse and validate input
    const body = await request.json()
    const { input } = body

    const validation = validateInput(input)
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // 4. Process request with timeout
    const timeoutMs = 120000 // 2 minutes
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    try {
      const result = await mainAgent(validation.sanitized!)
      clearTimeout(timeoutId)

      return NextResponse.json(result, {
        headers: {
          "X-RateLimit-Limit": process.env.RATE_LIMIT_MAX_REQUESTS || "10",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
        }
      })
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error && error.name === "AbortError") {
        return NextResponse.json(
          { error: "Request timeout: Agent took too long to respond" },
          { status: 504 }
        )
      }
      throw error
    }
  } catch (err) {
    console.error("API route error:", err)

    // Handle JSON parse errors specifically
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    )
  }
}

