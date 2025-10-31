import { describe, it, expect } from "vitest"
import { helloTool } from "../helloTool"

describe("helloTool", () => {
  it("should have correct name", () => {
    expect(helloTool.name).toBe("hello")
  })

  it("should have description", () => {
    expect(helloTool.description).toBeDefined()
    expect(typeof helloTool.description).toBe("string")
  })

  it("should execute and return greeting", async () => {
    const result = await helloTool.execute()
    expect(result).toBeDefined()
    expect(typeof result).toBe("string")
    expect(result).toContain("Hello")
  })
})
