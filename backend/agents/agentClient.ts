import { query, tool, createSdkMcpServer } from "@anthropic-ai/claude-agent-sdk"
import { z } from "zod"

// Type definitions for SDK response content
interface TextContent {
  type: "text"
  text: string
}

interface ContentBlock {
  type: string
  text?: string
  [key: string]: unknown
}

// Type for MCP server instances
type McpServer = ReturnType<typeof createSdkMcpServer>

// Create and configure agent client
export const agentClient = {
  /**
   * Run the agent with input and tools
   * @param input - User input/prompt
   * @param options - Options including tools
   * @returns Promise with output text
   */
  async run(input: string, options: { tools?: Array<{ name: string; description: string; execute: (...args: unknown[]) => Promise<unknown> }> } = {}) {
    // Get API key from environment at runtime
    const apiKey = process.env.CLAUDE_API_KEY

    if (!apiKey) {
      throw new Error("CLAUDE_API_KEY environment variable is required")
    }

    // Set API key in environment for SDK to pick up
    process.env.ANTHROPIC_API_KEY = apiKey

    // Convert tools to MCP format if provided
    const mcpServers: Record<string, McpServer> = {}
    if (options.tools && options.tools.length > 0) {
      const mcpTools = options.tools.map((toolDef) =>
        tool(
          toolDef.name,
          toolDef.description,
          {}, // Empty Zod schema - tools don't take parameters in this simple implementation
          async (_args: z.infer<z.ZodObject<{}>>) => {
            const result = await toolDef.execute()
            return {
              content: [
                {
                  type: "text",
                  text: typeof result === "string" ? result : JSON.stringify(result),
                },
              ],
            }
          }
        )
      )

      const mcpServer = createSdkMcpServer({
        name: "zwartify-tools",
        tools: mcpTools,
      })

      mcpServers["zwartify-tools"] = mcpServer
    }

    const queryGenerator = query({
      prompt: input,
      options: {
        model: "claude-3-5-sonnet-20241022",
        ...(Object.keys(mcpServers).length > 0 && { mcpServers }),
      },
    })

    // Collect messages from the async generator
    let outputText = ""
    for await (const message of queryGenerator) {
      // Extract text from assistant messages
      if (message.type === "assistant") {
        // SDKAssistantMessage has a message property with content array
        const content = (message.message?.content || []) as ContentBlock[]
        const textContent = content
          .filter((item): item is TextContent => item.type === "text")
          .map((item) => item.text)
          .join("")
        if (textContent) {
          outputText = textContent
        }
      }
    }

    return {
      output_text: outputText,
    }
  },
}

