# Tool Creation Guide

Learn how to create custom tools for ZwartifyOS agents. Tools extend agent capabilities by providing reusable functions that agents can call.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Tool Structure](#tool-structure)
- [Advanced Examples](#advanced-examples)
- [Best Practices](#best-practices)
- [Testing Tools](#testing-tools)

---

## Overview

Tools in ZwartifyOS are simple TypeScript/JavaScript objects that agents can execute. Each tool has:

1. **Name**: Unique identifier
2. **Description**: Tells the agent what the tool does
3. **Execute function**: The actual tool logic

Tools are automatically discovered and registered from the `/backend/tools/` directory.

---

## Quick Start

### 1. Create Your Tool File

Create a new file in `/backend/tools/`:

```bash
touch backend/tools/myTool.ts
```

### 2. Define Your Tool

```typescript
// backend/tools/myTool.ts

export const myTool = {
  name: "myTool",
  description: "Describes what your tool does - this helps the agent know when to use it",
  execute: async (args?: any) => {
    // Your tool logic here
    return "Tool result"
  }
}
```

### 3. Register Your Tool

Add your tool to `/backend/tools/index.ts`:

```typescript
const toolModules = [
  import("./helloTool"),
  import("./markdownFormatter"),
  import("./screenshotDescription"),
  import("./myTool"),  // Add your tool here
]
```

### 4. Test Your Tool

The agent can now use your tool automatically!

---

## Tool Structure

### Basic Template

```typescript
export const toolName = {
  // Unique identifier (use camelCase)
  name: "toolName",

  // Clear description of what the tool does
  // This is shown to the agent to help it decide when to use this tool
  description: "Brief description of the tool's purpose and when to use it",

  // Async function that performs the tool's action
  execute: async (args?: any) => {
    try {
      // Your tool logic here
      const result = await doSomething(args)
      return result
    } catch (error) {
      // Always handle errors gracefully
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
```

### With TypeScript Types

```typescript
interface ToolArgs {
  input: string
  options?: {
    format?: "json" | "text"
    maxLength?: number
  }
}

export const typedTool = {
  name: "typedTool",
  description: "A tool with proper TypeScript types",
  execute: async (args?: ToolArgs) => {
    // Type-safe implementation
    const { input, options } = args || {}

    if (!input) {
      return "Error: Input is required"
    }

    // Process with options
    const format = options?.format || "text"
    const maxLength = options?.maxLength || 1000

    // Your logic here
    return `Processed: ${input.slice(0, maxLength)}`
  }
}
```

---

## Advanced Examples

### Example 1: API Integration Tool

```typescript
// backend/tools/weatherTool.ts

interface WeatherArgs {
  city: string
}

export const weatherTool = {
  name: "getWeather",
  description: "Fetches current weather for a given city",
  execute: async (args?: WeatherArgs) => {
    try {
      if (!args?.city) {
        return "Error: City name is required"
      }

      const apiKey = process.env.WEATHER_API_KEY
      if (!apiKey) {
        return "Error: Weather API key not configured"
      }

      const response = await fetch(
        `https://api.weather.com/v1/current?city=${encodeURIComponent(args.city)}&key=${apiKey}`
      )

      if (!response.ok) {
        return `Error: Weather API returned ${response.status}`
      }

      const data = await response.json()
      return `Weather in ${args.city}: ${data.temp}°C, ${data.conditions}`
    } catch (error) {
      return `Error fetching weather: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
```

### Example 2: Database Query Tool

```typescript
// backend/tools/databaseTool.ts

interface QueryArgs {
  table: string
  filters?: Record<string, any>
}

export const databaseQueryTool = {
  name: "queryDatabase",
  description: "Queries the database for records. Specify table and optional filters.",
  execute: async (args?: QueryArgs) => {
    try {
      if (!args?.table) {
        return "Error: Table name is required"
      }

      // Example with Prisma
      // const prisma = new PrismaClient()
      // const results = await prisma[args.table].findMany({
      //   where: args.filters
      // })

      // Placeholder response
      return `Query executed on table: ${args.table}`
    } catch (error) {
      return `Database error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
```

### Example 3: File System Tool

```typescript
// backend/tools/fileSystemTool.ts

import fs from "fs/promises"
import path from "path"

interface FileArgs {
  action: "read" | "write" | "list"
  filePath?: string
  content?: string
}

export const fileSystemTool = {
  name: "fileSystem",
  description: "Performs file system operations: read, write, or list files",
  execute: async (args?: FileArgs) => {
    try {
      if (!args?.action) {
        return "Error: Action is required (read, write, or list)"
      }

      const basePath = path.join(process.cwd(), "data")

      switch (args.action) {
        case "read":
          if (!args.filePath) return "Error: filePath required for read"
          const content = await fs.readFile(
            path.join(basePath, args.filePath),
            "utf-8"
          )
          return content

        case "write":
          if (!args.filePath || !args.content) {
            return "Error: filePath and content required for write"
          }
          await fs.writeFile(
            path.join(basePath, args.filePath),
            args.content,
            "utf-8"
          )
          return `File written: ${args.filePath}`

        case "list":
          const files = await fs.readdir(basePath)
          return `Files: ${files.join(", ")}`

        default:
          return `Error: Unknown action: ${args.action}`
      }
    } catch (error) {
      return `File system error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
```

### Example 4: Stripe Integration Tool

```typescript
// backend/tools/stripeTool.ts

interface StripeArgs {
  action: "createCustomer" | "createPayment" | "getCustomer"
  email?: string
  amount?: number
  customerId?: string
}

export const stripeTool = {
  name: "stripe",
  description: "Integrates with Stripe for payments: create customer, create payment, get customer info",
  execute: async (args?: StripeArgs) => {
    try {
      if (!args?.action) {
        return "Error: Action is required"
      }

      const apiKey = process.env.STRIPE_SECRET_KEY
      if (!apiKey) {
        return "Error: Stripe API key not configured"
      }

      // Using Stripe SDK (install with: npm install stripe)
      // const stripe = new Stripe(apiKey)

      switch (args.action) {
        case "createCustomer":
          if (!args.email) return "Error: Email required"
          // const customer = await stripe.customers.create({
          //   email: args.email
          // })
          return `Customer created: ${args.email}`

        case "createPayment":
          if (!args.amount || !args.customerId) {
            return "Error: Amount and customerId required"
          }
          // const paymentIntent = await stripe.paymentIntents.create({
          //   amount: args.amount,
          //   currency: 'usd',
          //   customer: args.customerId
          // })
          return `Payment intent created for $${args.amount / 100}`

        case "getCustomer":
          if (!args.customerId) return "Error: customerId required"
          // const customer = await stripe.customers.retrieve(args.customerId)
          return `Customer: ${args.customerId}`

        default:
          return `Error: Unknown action: ${args.action}`
      }
    } catch (error) {
      return `Stripe error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}
```

---

## Best Practices

### 1. Clear Descriptions

The agent uses descriptions to decide when to call tools. Be specific:

```typescript
// ❌ Bad
description: "Does stuff with data"

// ✅ Good
description: "Fetches user profile data from the database by user ID or email"
```

### 2. Error Handling

Always wrap tool logic in try-catch:

```typescript
execute: async (args?: any) => {
  try {
    // Your logic
    return result
  } catch (error) {
    // Return error message, don't throw
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
  }
}
```

### 3. Input Validation

Validate arguments before processing:

```typescript
execute: async (args?: ToolArgs) => {
  if (!args?.requiredField) {
    return "Error: requiredField is required"
  }

  if (args.optionalField && typeof args.optionalField !== "string") {
    return "Error: optionalField must be a string"
  }

  // Process with validated args
}
```

### 4. Environment Configuration

Use environment variables for sensitive data:

```typescript
execute: async (args?: any) => {
  const apiKey = process.env.MY_API_KEY
  if (!apiKey) {
    return "Error: MY_API_KEY environment variable not set"
  }

  // Use apiKey safely
}
```

### 5. Return Meaningful Results

Return data that's useful to the agent:

```typescript
// ❌ Bad
return "Success"

// ✅ Good
return `Created user ${username} with ID ${userId}. Email sent to ${email}.`
```

### 6. TypeScript Types

Define interfaces for your tool arguments:

```typescript
interface MyToolArgs {
  required: string
  optional?: number
}

export const myTool = {
  name: "myTool",
  description: "...",
  execute: async (args?: MyToolArgs) => {
    // TypeScript will help catch errors
  }
}
```

---

## Testing Tools

### Unit Tests

Create tests for your tools in `backend/tools/__tests__/`:

```typescript
// backend/tools/__tests__/myTool.test.ts

import { describe, it, expect } from "vitest"
import { myTool } from "../myTool"

describe("myTool", () => {
  it("should have correct metadata", () => {
    expect(myTool.name).toBe("myTool")
    expect(myTool.description).toBeDefined()
  })

  it("should execute successfully with valid args", async () => {
    const result = await myTool.execute({ input: "test" })
    expect(result).toBeDefined()
    expect(typeof result).toBe("string")
  })

  it("should handle missing arguments", async () => {
    const result = await myTool.execute()
    expect(result).toContain("Error")
  })

  it("should handle errors gracefully", async () => {
    const result = await myTool.execute({ invalid: "args" })
    expect(result).toContain("Error")
  })
})
```

### Run Tests

```bash
npm test
```

---

## Common Patterns

### Conditional Logic

```typescript
execute: async (args?: any) => {
  if (args?.mode === "simple") {
    return simpleOperation(args)
  } else if (args?.mode === "advanced") {
    return advancedOperation(args)
  } else {
    return "Error: Invalid mode. Use 'simple' or 'advanced'"
  }
}
```

### Async Operations

```typescript
execute: async (args?: any) => {
  const results = await Promise.all([
    fetchData1(args),
    fetchData2(args),
    fetchData3(args)
  ])

  return `Fetched ${results.length} results`
}
```

### Caching

```typescript
const cache = new Map<string, any>()

export const cachedTool = {
  name: "cachedTool",
  description: "Tool with caching",
  execute: async (args?: any) => {
    const cacheKey = JSON.stringify(args)

    if (cache.has(cacheKey)) {
      return `Cached: ${cache.get(cacheKey)}`
    }

    const result = await expensiveOperation(args)
    cache.set(cacheKey, result)
    return result
  }
}
```

---

## Troubleshooting

### Tool Not Appearing

1. Check that you exported the tool: `export const myTool = {...}`
2. Verify it's imported in `/backend/tools/index.ts`
3. Restart the dev server: `npm run dev`

### Agent Not Using Tool

1. Improve the description to be more specific
2. Check that the tool name is unique
3. Ensure the tool returns useful information

### Tool Errors

1. Check console logs for error messages
2. Add more detailed error handling
3. Validate all required arguments
4. Test the tool in isolation first

---

## Next Steps

- Explore existing tools in `/backend/tools/`
- Read the [API Documentation](./API.md)
- Check out [example implementations](../backend/tools/)
- Join discussions on [GitHub](https://github.com/kriszwart/zwartifyos/discussions)

---

**Happy tool building! 🛠️**
