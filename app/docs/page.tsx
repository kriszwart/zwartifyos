"use client"

import Link from "next/link"
import { useState } from "react"

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("intro")

  const tabs = [
    { id: "intro", label: "Intro" },
    { id: "agents", label: "Agents" },
    { id: "tools", label: "Tools" },
    { id: "claude", label: "Claude Setup" },
    { id: "deploy", label: "Deploy" },
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none" />

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-green-400/30 p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            ← HOME
          </Link>
          <h1 className="text-2xl font-bold font-mono" style={{ animation: "glitch-slow 4s infinite" }}>
            ZwartifyOS Docs
          </h1>
          <Link
            href="/agent"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            AGENT →
          </Link>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
          {/* Intro Section */}
          <section className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-green-400">
              ZwartifyOS Documentation
            </h2>
            <p className="text-lg text-green-300 leading-relaxed mb-6">
              ZwartifyOS is an operating system for building intelligent products. 
              It coordinates intelligence the way Unix coordinated programs. 
              Each tool is a capability. Each agent is a userland program. Each interaction is a process.
            </p>
            <p className="text-green-300 mb-4">
              <Link href="/docs/manifesto" className="text-green-400 hover:underline">
                Read the Manifesto →
              </Link>
            </p>
          </section>

          {/* Tabs */}
          <div className="border-b border-green-400/30 mb-8">
            <div className="flex space-x-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 font-mono text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-green-400 text-green-400"
                      : "border-transparent text-green-500 hover:text-green-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === "intro" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">How It Works</h3>
                  <p className="text-green-300 mb-4">
                    ZwartifyOS unifies the ACCV stack:
                  </p>
                  <ul className="list-disc list-inside text-green-300 ml-4 space-y-2">
                    <li><strong className="text-green-400">Agents</strong> - Intelligent programs that reason and act</li>
                    <li><strong className="text-green-400">Cursor</strong> - Local AI code generation and refactoring</li>
                    <li><strong className="text-green-400">Claude</strong> - Cloud-based code review and commits</li>
                    <li><strong className="text-green-400">Vercel</strong> - Instant deployment and hosting</li>
                  </ul>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">The OS Metaphor</h3>
                  <p className="text-green-300 mb-4">
                    ZwartifyOS coordinates intelligence the way Unix coordinated programs. 
                    You are root. You spawn processes. The system orchestrates.
                  </p>
                </section>
              </div>
            )}

            {activeTab === "agents" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Creating Agents</h3>
                  <p className="text-green-300 mb-4">
                    Agents live in <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/agents/</code>. 
                    They use the agentClient to interact with Claude and can access registered tools.
                  </p>
                  <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export async function myAgent(input: string) {
  const tools = await getTools()
  const result = await agentClient.run(input, { tools })
  return { text: result.output_text }
}`}
                  </pre>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Example: Expert Agent</h3>
                  <p className="text-green-300 mb-4">
                    See <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">expertAgent.ts</code> for a persona-based agent example.
                  </p>
                </section>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Creating Tools</h3>
                  <p className="text-green-300 mb-4">
                    Tools automatically register when added to <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/</code>.
                  </p>
                  <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`export const myTool = {
  name: "myTool",
  description: "Does something useful",
  execute: async (args?: any) => {
    return "Tool result"
  }
}`}
                  </pre>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Example Tools</h3>
                  <ul className="list-disc list-inside text-green-300 ml-4 space-y-2">
                    <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">markdownFormatter</code> - Formats and cleans markdown</li>
                    <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">screenshotDescription</code> - Analyzes screenshots (demo)</li>
                    <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">helloTool</code> - Simple greeting tool</li>
                  </ul>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Registering Tools</h3>
                  <p className="text-green-300 mb-4">
                    Add tool imports to <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/index.ts</code>:
                  </p>
                  <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`const toolModules = [
  import("./helloTool"),
  import("./markdownFormatter"),
  import("./screenshotDescription"),
  import("./myTool"),
]`}
                  </pre>
                </section>
              </div>
            )}

            {activeTab === "claude" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Claude Code for Web Setup</h3>
                  <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                    <li>Install Claude Code for Web browser extension</li>
                    <li>Connect to your GitHub repository</li>
                    <li>Grant permissions for code review and commits</li>
                    <li>Open PRs in Claude Code for Web</li>
                    <li>Request code reviews and improvements</li>
                    <li>Let Claude commit directly to GitHub</li>
                  </ol>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Workflow</h3>
                  <p className="text-green-300 mb-4">
                    The workflow creates a continuous improvement loop:
                  </p>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                    <ol className="list-decimal list-inside text-green-300 space-y-2">
                      <li>You write code in Cursor</li>
                      <li>Push to GitHub</li>
                      <li>Claude Code for Web reviews</li>
                      <li>Claude suggests improvements</li>
                      <li>Claude commits patches</li>
                      <li>System evolves automatically</li>
                    </ol>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "deploy" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Vercel Deployment</h3>
                  <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                    <li>Push your code to GitHub</li>
                    <li>Import repository on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Vercel</a></li>
                    <li>Add environment variables:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">CLAUDE_API_KEY</code></li>
                        <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">NEXT_PUBLIC_API_URL</code> (optional)</li>
                      </ul>
                    </li>
                    <li>Deploy automatically on every push</li>
                  </ol>
                </section>
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">The ACCV Flow</h3>
                  <p className="text-green-300 mb-4">
                    With ZwartifyOS on Vercel:
                  </p>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                    <p className="text-green-300">
                      <strong className="text-green-400">Agents</strong> work → <strong className="text-green-400">Cursor</strong> codes → 
                      <strong className="text-green-400">Claude</strong> reviews → <strong className="text-green-400">Vercel</strong> deploys
                    </p>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-green-400/30 text-center text-sm text-green-500 opacity-60">
            <a
              href="https://github.com/kriszwart/zwartifyos"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-400 transition-colors"
            >
              GitHub Repository
            </a>
            {" • "}
            <Link href="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
            {" • "}
            <Link href="/agent" className="hover:text-green-400 transition-colors">
              Agent
            </Link>
            {" • "}
            <Link href="/docs/manifesto" className="hover:text-green-400 transition-colors">
              Manifesto
            </Link>
          </footer>
        </main>
      </div>
    </div>
  )
}
