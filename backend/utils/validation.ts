/**
 * Input validation and sanitization utilities
 */

// Maximum input length to prevent abuse
const MAX_INPUT_LENGTH = 10000 // 10k characters

// Patterns to detect potential prompt injection attacks
const SUSPICIOUS_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /disregard\s+(all\s+)?previous\s+instructions/i,
  /forget\s+(all\s+)?previous\s+instructions/i,
  /system\s*:\s*you\s+are/i,
  /<\s*script/i, // XSS attempt
  /javascript\s*:/i, // XSS attempt
]

export interface ValidationResult {
  isValid: boolean
  error?: string
  sanitized?: string
}

/**
 * Validates and sanitizes user input
 * @param input - Raw user input
 * @returns Validation result with sanitized input
 */
export function validateInput(input: unknown): ValidationResult {
  // Check type
  if (typeof input !== "string") {
    return {
      isValid: false,
      error: "Input must be a string",
    }
  }

  // Check if empty
  const trimmed = input.trim()
  if (trimmed.length === 0) {
    return {
      isValid: false,
      error: "Input cannot be empty",
    }
  }

  // Check length
  if (trimmed.length > MAX_INPUT_LENGTH) {
    return {
      isValid: false,
      error: `Input exceeds maximum length of ${MAX_INPUT_LENGTH} characters`,
    }
  }

  // Check for suspicious patterns (potential prompt injection)
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isValid: false,
        error: "Input contains suspicious content",
      }
    }
  }

  // Sanitize: remove control characters but keep newlines and tabs
  const sanitized = trimmed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")

  return {
    isValid: true,
    sanitized,
  }
}

/**
 * Validates API authentication token
 * @param token - Bearer token from request
 * @returns Whether token is valid
 */
export function validateAuthToken(token: string | null): boolean {
  const expectedToken = process.env.API_AUTH_TOKEN

  // If no token is configured, skip auth (development mode)
  if (!expectedToken) {
    return true
  }

  // If token is configured, it must match
  return token === expectedToken
}
