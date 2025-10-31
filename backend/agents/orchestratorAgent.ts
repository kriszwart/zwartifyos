/**
 * Orchestrator Agent
 * Main agent that uses the orchestration system
 */

import {
  orchestrateSequential,
  orchestrateParallel,
  orchestrateConsensus,
  orchestrateCustom,
  SPECIALIZED_AGENTS,
} from "./orchestrator"

export interface OrchestratorInput {
  task: string
  mode?: "sequential" | "parallel" | "consensus" | "custom"
  agents?: string[] // Which specialized agents to use
}

/**
 * Main orchestrator agent
 * Coordinates multiple specialized agents based on the task
 */
export async function orchestratorAgent(input: string) {
  try {
    // Try to parse input as JSON for structured requests
    let parsedInput: OrchestratorInput
    try {
      parsedInput = JSON.parse(input)
    } catch {
      // If not JSON, treat as simple task with default mode
      parsedInput = {
        task: input,
        mode: "sequential",
        agents: ["researcher", "developer", "reviewer"],
      }
    }

    const { task, mode = "sequential", agents = [] } = parsedInput

    // Default agents if none specified
    const selectedAgents = agents.length > 0 ? agents : ["researcher", "analyst"]

    // Validate agents exist
    for (const agent of selectedAgents) {
      if (!SPECIALIZED_AGENTS[agent]) {
        return {
          text: `Error: Unknown agent "${agent}". Available agents: ${Object.keys(SPECIALIZED_AGENTS).join(", ")}`,
        }
      }
    }

    console.log(`Orchestration mode: ${mode}`)
    console.log(`Agents: ${selectedAgents.join(", ")}`)

    let result

    switch (mode) {
      case "sequential":
        result = await orchestrateSequential(selectedAgents, task)
        break

      case "parallel":
        result = await orchestrateParallel(selectedAgents, task)
        break

      case "consensus":
        result = await orchestrateConsensus(selectedAgents, task)
        break

      case "custom":
        // Example custom workflow
        result = await orchestrateCustom(task, async (agents, runAgent) => {
          // Custom logic: researcher first, then developer only if research succeeds
          const research = await runAgent(agents.researcher, task)

          if (research.toLowerCase().includes("not found") || research.toLowerCase().includes("error")) {
            return `Research failed: ${research}`
          }

          const development = await runAgent(agents.developer, task, research)
          return development
        })
        break

      default:
        return {
          text: `Error: Unknown mode "${mode}". Available modes: sequential, parallel, consensus, custom`,
        }
    }

    if (!result.success) {
      return {
        text: `Orchestration failed: ${result.error}`,
      }
    }

    // Format the output nicely
    const formattedOutput = [
      `# Multi-Agent Orchestration Results`,
      ``,
      `**Mode**: ${mode}`,
      `**Agents**: ${selectedAgents.join(", ")}`,
      ``,
      `## Individual Agent Outputs`,
      ``,
      ...result.results.map(
        (r, i) =>
          `### ${i + 1}. ${r.agent}\n\n${r.output}\n`
      ),
      ``,
      `## Final Output`,
      ``,
      result.finalOutput,
    ].join("\n")

    return {
      text: formattedOutput,
    }
  } catch (error) {
    console.error("Orchestrator agent error:", error)
    return {
      text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

/**
 * Example usage patterns (for documentation):
 *
 * 1. Simple sequential workflow:
 *    { "task": "Build a login system", "mode": "sequential", "agents": ["researcher", "developer", "reviewer"] }
 *
 * 2. Parallel analysis:
 *    { "task": "Analyze this codebase", "mode": "parallel", "agents": ["developer", "analyst", "reviewer"] }
 *
 * 3. Consensus building:
 *    { "task": "Design a scalable architecture", "mode": "consensus", "agents": ["developer", "analyst", "researcher"] }
 *
 * 4. Custom workflow:
 *    { "task": "Complex multi-step task", "mode": "custom", "agents": ["researcher", "developer"] }
 */
