import "@testing-library/jest-dom"
import { expect, afterEach } from "vitest"
import { cleanup } from "@testing-library/react"

// Cleanup after each test
afterEach(() => {
  cleanup()
})

// Mock environment variables for tests
process.env.CLAUDE_API_KEY = "test-api-key"
process.env.NODE_ENV = "test"
