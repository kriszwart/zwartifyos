/**
 * Multi-Agent Orchestration System
 * Coordinates multiple specialized agents to work together on complex tasks
 */

import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export interface AgentDefinition {
  name: string
  role: string
  systemPrompt: string
  tools?: string[] // Specific tools this agent can use
}

export interface OrchestrationResult {
  success: boolean
  results: Array<{
    agent: string
    output: string
    timestamp: number
  }>
  finalOutput: string
  error?: string
}

/**
 * Predefined specialized agents
 */
export const SPECIALIZED_AGENTS: Record<string, AgentDefinition> = {
  researcher: {
    name: "researcher",
    role: "Research Specialist",
    systemPrompt: "You are a research specialist. Focus on gathering information, analyzing data, and providing comprehensive insights. Be thorough and cite sources when possible.",
  },
  developer: {
    name: "developer",
    role: "Software Developer",
    systemPrompt: "You are a software developer. Focus on writing clean, efficient code, following best practices, and explaining technical concepts clearly.",
  },
  reviewer: {
    name: "reviewer",
    role: "Code Reviewer",
    systemPrompt: "You are a code reviewer. Focus on identifying bugs, security issues, performance problems, and suggesting improvements. Be constructive and specific.",
  },
  writer: {
    name: "writer",
    role: "Technical Writer",
    systemPrompt: "You are a technical writer. Focus on creating clear, concise documentation that is easy to understand. Use proper formatting and examples.",
  },
  analyst: {
    name: "analyst",
    role: "Data Analyst",
    systemPrompt: "You are a data analyst. Focus on interpreting data, finding patterns, and providing actionable insights. Use clear visualizations when appropriate.",
  },
}

/**
 * Run a single specialized agent
 */
async function runAgent(
  agentDef: AgentDefinition,
  input: string,
  context?: string
): Promise<string> {
  try {
    const tools = await getTools()

    // Filter tools if specific tools are defined for this agent
    const agentTools = agentDef.tools
      ? tools.filter(tool => agentDef.tools?.includes(tool.name))
      : tools

    // Combine system prompt, context, and user input
    const fullPrompt = [
      agentDef.systemPrompt,
      context ? `\n\nContext from previous agents:\n${context}` : "",
      `\n\nUser Request:\n${input}`,
    ].join("")

    const result = await agentClient.run(fullPrompt, { tools: agentTools })
    return result.output_text || "No response generated"
  } catch (error) {
    throw new Error(
      `Agent ${agentDef.name} failed: ${error instanceof Error ? error.message : "Unknown error"}`
    )
  }
}

/**
 * Sequential orchestration: Agents work one after another
 * Each agent's output becomes context for the next agent
 */
export async function orchestrateSequential(
  agentNames: string[],
  input: string
): Promise<OrchestrationResult> {
  const results: OrchestrationResult["results"] = []
  let context = ""

  try {
    for (const agentName of agentNames) {
      const agentDef = SPECIALIZED_AGENTS[agentName]

      if (!agentDef) {
        throw new Error(`Unknown agent: ${agentName}`)
      }

      console.log(`Running agent: ${agentDef.role}`)

      const output = await runAgent(agentDef, input, context)

      results.push({
        agent: agentDef.role,
        output,
        timestamp: Date.now(),
      })

      // Add this agent's output to context for next agent
      context += `\n\n[${agentDef.role}]:\n${output}`
    }

    // The final output is from the last agent
    const finalOutput = results[results.length - 1]?.output || "No output generated"

    return {
      success: true,
      results,
      finalOutput,
    }
  } catch (error) {
    return {
      success: false,
      results,
      finalOutput: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Parallel orchestration: All agents work simultaneously
 * Results are combined at the end
 */
export async function orchestrateParallel(
  agentNames: string[],
  input: string
): Promise<OrchestrationResult> {
  try {
    // Run all agents in parallel
    const agentPromises = agentNames.map(async (agentName) => {
      const agentDef = SPECIALIZED_AGENTS[agentName]

      if (!agentDef) {
        throw new Error(`Unknown agent: ${agentName}`)
      }

      console.log(`Starting agent: ${agentDef.role}`)

      const output = await runAgent(agentDef, input)

      return {
        agent: agentDef.role,
        output,
        timestamp: Date.now(),
      }
    })

    const results = await Promise.all(agentPromises)

    // Combine all outputs
    const finalOutput = results
      .map(r => `[${r.agent}]:\n${r.output}`)
      .join("\n\n---\n\n")

    return {
      success: true,
      results,
      finalOutput,
    }
  } catch (error) {
    return {
      success: false,
      results: [],
      finalOutput: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Consensus orchestration: Multiple agents analyze the same input
 * A final "synthesizer" agent combines their perspectives
 */
export async function orchestrateConsensus(
  agentNames: string[],
  input: string
): Promise<OrchestrationResult> {
  try {
    // Step 1: Run all agents in parallel
    const parallelResult = await orchestrateParallel(agentNames, input)

    if (!parallelResult.success) {
      return parallelResult
    }

    // Step 2: Use a synthesizer to combine perspectives
    const synthesizerPrompt = `You are a synthesis specialist. Review the following perspectives from different experts and create a comprehensive, unified response that incorporates the best insights from each.

${parallelResult.finalOutput}

Synthesize these perspectives into a coherent, comprehensive response.`

    const synthesisOutput = await runAgent(
      {
        name: "synthesizer",
        role: "Synthesis Specialist",
        systemPrompt: "You are excellent at combining multiple perspectives into a unified, coherent response.",
      },
      input,
      parallelResult.finalOutput
    )

    return {
      success: true,
      results: [
        ...parallelResult.results,
        {
          agent: "Synthesis Specialist",
          output: synthesisOutput,
          timestamp: Date.now(),
        },
      ],
      finalOutput: synthesisOutput,
    }
  } catch (error) {
    return {
      success: false,
      results: [],
      finalOutput: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Custom workflow: Define your own agent workflow with conditional logic
 */
export async function orchestrateCustom(
  input: string,
  workflow: (agents: typeof SPECIALIZED_AGENTS, runAgent: typeof runAgent) => Promise<string>
): Promise<OrchestrationResult> {
  const results: OrchestrationResult["results"] = []

  try {
    // Custom wrapper to track agent executions
    const trackedRunAgent = async (agentDef: AgentDefinition, agentInput: string, context?: string) => {
      const output = await runAgent(agentDef, agentInput, context)

      results.push({
        agent: agentDef.role,
        output,
        timestamp: Date.now(),
      })

      return output
    }

    const finalOutput = await workflow(SPECIALIZED_AGENTS, trackedRunAgent)

    return {
      success: true,
      results,
      finalOutput,
    }
  } catch (error) {
    return {
      success: false,
      results,
      finalOutput: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
