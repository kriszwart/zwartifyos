import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export async function mainAgent(input: string) {
  try {
    // Load tools
    const tools = await getTools()

    // Run agent with input and tools
    const result = await agentClient.run(input, { tools })

    // Return response in expected format
    return {
      text: result.output_text || "No response generated",
    }
  } catch (error) {
    console.error("Agent error:", error)
    return {
      text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}
