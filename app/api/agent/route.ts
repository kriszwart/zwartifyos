import { mainAgent } from "../../../backend/agents/mainAgent"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { input } = body

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Invalid input: 'input' must be a non-empty string" },
        { status: 400 }
      )
    }

    const result = await mainAgent(input)
    return NextResponse.json(result)
  } catch (err) {
    console.error("API route error:", err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Agent error" },
      { status: 500 }
    )
  }
}

