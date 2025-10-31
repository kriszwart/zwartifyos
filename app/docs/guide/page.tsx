"use client"

import Link from "next/link"
import { useState } from "react"

export default function UserGuidePage() {
  const [activeTab, setActiveTab] = useState("getting-started")

  const tabs = [
    { id: "getting-started", label: "Getting Started" },
    { id: "using-agents", label: "Using Agents" },
    { id: "workflow", label: "ACCV Workflow" },
    { id: "examples", label: "Examples" },
    { id: "troubleshooting", label: "Troubleshooting" },
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
            href="/docs"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            ← DOCS
          </Link>
          <h1 className="text-2xl font-bold font-mono" style={{ animation: "glitch-slow 4s infinite" }}>
            User Guide
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
          {/* Intro */}
          <section className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-green-400">
              ZwartifyOS User Guide
            </h2>
            <p className="text-lg text-green-300 leading-relaxed mb-4">
              This guide helps you understand and use ZwartifyOS after deployment. 
              Learn how to interact with agents, build tools, and leverage the ACCV workflow 
              to create intelligent systems.
            </p>
            <p className="text-green-300">
              Your deployed site is ready at: <span className="text-green-400 font-mono">https://your-site.vercel.app</span>
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
            {activeTab === "getting-started" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Quick Start</h3>
                  <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                    <li>
                      <strong className="text-green-400">Access Your Site</strong>
                      <p className="ml-6 mt-1 text-sm">Navigate to your deployed Vercel URL</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Visit the Agent Interface</strong>
                      <p className="ml-6 mt-1 text-sm">Click "Launch Agent" or go to <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/agent</code></p>
                    </li>
                    <li>
                      <strong className="text-green-400">Test the Agent</strong>
                      <p className="ml-6 mt-1 text-sm">Type a message and click "Send" to interact</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Review Documentation</strong>
                      <p className="ml-6 mt-1 text-sm">Explore the Docs tab for detailed information</p>
                    </li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">What You Can Do</h3>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-3">
                    <p className="text-green-300">
                      <strong className="text-green-400">🤖 Interact with Agents</strong> - Ask questions, give instructions, receive intelligent responses
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">🔧 Use Tools</strong> - Agents can use registered tools (markdown formatting, screenshot analysis, etc.)
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">📝 Build Custom Tools</strong> - Add your own tools to extend agent capabilities
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">🎭 Create Personas</strong> - Build expert agents with specialized knowledge
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">🔁 Integrate Workflow</strong> - Connect Cursor, Claude Code for Web, and Vercel for full ACCV stack
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Interface Overview</h3>
                  <div className="space-y-4 text-green-300">
                    <div>
                      <strong className="text-green-400">Homepage (/):</strong>
                      <p className="ml-4 mt-1">Landing page with links to Agent, Docs, and GitHub</p>
                    </div>
                    <div>
                      <strong className="text-green-400">Agent Interface (/agent):</strong>
                      <p className="ml-4 mt-1">Interactive terminal for agent communication</p>
                      <ul className="ml-8 mt-2 list-disc space-y-1 text-sm">
                        <li>Input textarea for your messages</li>
                        <li>Output terminal showing agent responses</li>
                        <li>Command/Ctrl + Enter to send</li>
                        <li>History of all interactions</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-green-400">Documentation (/docs):</strong>
                      <p className="ml-4 mt-1">Comprehensive documentation with tabs for different topics</p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "using-agents" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Basic Agent Interaction</h3>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-4">
                    <div>
                      <p className="text-green-300 mb-2"><strong className="text-green-400">1. Enter Your Input</strong></p>
                      <p className="text-green-300 text-sm ml-4">Type your question or instruction in the textarea</p>
                      <pre className="bg-black/70 border border-green-400/30 p-2 rounded font-mono text-sm mt-2">
                        "Help me format this markdown text..."
                      </pre>
                    </div>
                    <div>
                      <p className="text-green-300 mb-2"><strong className="text-green-400">2. Send Your Message</strong></p>
                      <p className="text-green-300 text-sm ml-4">Click "Send" or press Cmd/Ctrl + Enter</p>
                    </div>
                    <div>
                      <p className="text-green-300 mb-2"><strong className="text-green-400">3. View Response</strong></p>
                      <p className="text-green-300 text-sm ml-4">Agent processes your request and displays the response with typewriter animation</p>
                    </div>
                    <div>
                      <p className="text-green-300 mb-2"><strong className="text-green-400">4. Continue Conversation</strong></p>
                      <p className="text-green-300 text-sm ml-4">All messages are logged in the output terminal for context</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Example Queries</h3>
                  <div className="space-y-3">
                    <div className="bg-black/50 border border-green-400/30 p-3 rounded">
                      <p className="text-green-400 font-mono text-sm mb-2">Simple Question:</p>
                      <p className="text-green-300 font-mono text-xs">"What can you help me with?"</p>
                    </div>
                    <div className="bg-black/50 border border-green-400/30 p-3 rounded">
                      <p className="text-green-400 font-mono text-sm mb-2">Tool Usage:</p>
                      <p className="text-green-300 font-mono text-xs">"Format this markdown: # Hello World"</p>
                    </div>
                    <div className="bg-black/50 border border-green-400/30 p-3 rounded">
                      <p className="text-green-400 font-mono text-sm mb-2">Complex Task:</p>
                      <p className="text-green-300 font-mono text-xs">"Help me plan a WordPress portfolio site with filtering"</p>
                    </div>
                    <div className="bg-black/50 border border-green-400/30 p-3 rounded">
                      <p className="text-green-400 font-mono text-sm mb-2">Expert Consultation:</p>
                      <p className="text-green-300 font-mono text-xs">"I need advice on building a SaaS product"</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Available Tools</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <p className="text-green-400 font-bold mb-2">helloTool</p>
                      <p className="text-green-300 text-sm">Simple greeting tool for testing</p>
                    </div>
                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <p className="text-green-400 font-bold mb-2">markdownFormatter</p>
                      <p className="text-green-300 text-sm">Formats and cleans markdown text</p>
                    </div>
                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <p className="text-green-400 font-bold mb-2">screenshotDescription</p>
                      <p className="text-green-300 text-sm">Analyzes screenshots (demo)</p>
                    </div>
                  </div>
                  <p className="text-green-300 text-sm mt-4">
                    Agents automatically use these tools when appropriate. You can add more tools by creating files in <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/</code>
                  </p>
                </section>
              </div>
            )}

            {activeTab === "workflow" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">The ACCV Workflow</h3>
                  <p className="text-green-300 mb-4">
                    ZwartifyOS enables the full <strong className="text-green-400">ACCV</strong> (Agents, Cursor, Claude, Vercel) workflow:
                  </p>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-3">
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 font-bold">1.</span>
                      <div>
                        <p className="text-green-400 font-bold">Cursor (Local)</p>
                        <p className="text-green-300 text-sm">Generate and refactor code locally with AI assistance</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 font-bold">2.</span>
                      <div>
                        <p className="text-green-400 font-bold">GitHub (Storage)</p>
                        <p className="text-green-300 text-sm">Push your code to version control</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 font-bold">3.</span>
                      <div>
                        <p className="text-green-400 font-bold">Claude Code for Web (Review)</p>
                        <p className="text-green-300 text-sm">Open PR in Claude Code for Web, get AI code review and auto-commits</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-green-400 font-bold">4.</span>
                      <div>
                        <p className="text-green-400 font-bold">Vercel (Deploy)</p>
                        <p className="text-green-300 text-sm">Automatic deployment on every push</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Setting Up Claude Code for Web</h3>
                  <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                    <li>
                      <strong className="text-green-400">Install Extension</strong>
                      <p className="ml-6 mt-1 text-sm">Get Claude Code for Web browser extension</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Connect Repository</strong>
                      <p className="ml-6 mt-1 text-sm">Link your GitHub repository to Claude Code for Web</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Create Pull Request</strong>
                      <p className="ml-6 mt-1 text-sm">Open a PR from Cursor changes</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Review with Claude</strong>
                      <p className="ml-6 mt-1 text-sm">Claude analyzes, suggests improvements, and can commit patches</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Merge & Deploy</strong>
                      <p className="ml-6 mt-1 text-sm">Merge PR → Vercel automatically deploys</p>
                    </li>
                  </ol>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Complete Development Cycle</h3>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm">
                    <p className="text-green-400 mb-2"># 1. Local Development</p>
                    <p className="text-green-300">Cursor → Write code locally</p>
                    
                    <p className="text-green-400 mb-2 mt-4"># 2. Version Control</p>
                    <p className="text-green-300">git add . && git commit -m "feature"</p>
                    <p className="text-green-300">git push origin main</p>
                    
                    <p className="text-green-400 mb-2 mt-4"># 3. AI Code Review</p>
                    <p className="text-green-300">Open PR in Claude Code for Web</p>
                    <p className="text-green-300">Claude reviews → suggests → commits</p>
                    
                    <p className="text-green-400 mb-2 mt-4"># 4. Auto-Sync (New!)</p>
                    <p className="text-green-300">npm run sync:watch → Auto-pulls Claude's changes</p>
                    <p className="text-green-300">Changes appear in your local codebase automatically</p>
                    
                    <p className="text-green-400 mb-2 mt-4"># 5. Auto-Deploy</p>
                    <p className="text-green-300">Vercel detects push → builds → deploys</p>
                    <p className="text-green-300">Your site updates instantly</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Auto-Sync Claude's Changes</h3>
                  <p className="text-green-300 mb-4">
                    When Claude Code for Web makes changes via GitHub, automatically sync them back to your local codebase.
                  </p>
                  
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-3">
                    <div>
                      <p className="text-green-400 font-bold mb-2">Automatic Sync (Recommended):</p>
                      <pre className="bg-black/70 border border-green-400/30 p-2 rounded font-mono text-xs mt-2">
                        npm run sync:watch
                      </pre>
                      <p className="text-green-300 text-sm mt-2 ml-4">Runs in background, checks every 30 seconds</p>
                    </div>
                    
                    <div>
                      <p className="text-green-400 font-bold mb-2">Manual Check:</p>
                      <pre className="bg-black/70 border border-green-400/30 p-2 rounded font-mono text-xs mt-2">
                        npm run sync:check
                      </pre>
                      <p className="text-green-300 text-sm mt-2 ml-4">One-time check for pending changes</p>
                    </div>
                    
                    <div>
                      <p className="text-green-400 font-bold mb-2">Pull All Claude Branches:</p>
                      <pre className="bg-black/70 border border-green-400/30 p-2 rounded font-mono text-xs mt-2">
                        npm run sync:pull
                      </pre>
                      <p className="text-green-300 text-sm mt-2 ml-4">Manually sync all claude/* branches</p>
                    </div>
                  </div>

                  <p className="text-green-300 mt-4 text-sm">
                    <strong className="text-green-400">API Endpoint:</strong> Visit <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/api/sync</code> to check sync status
                  </p>
                </section>
              </div>
            )}

            {activeTab === "examples" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Real-World Use Cases</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Example 1: WordPress Portfolio Builder</h4>
                      <p className="text-green-300 text-sm mb-3">
                        Build a complete portfolio system with custom post types and filtering.
                      </p>
                      <div className="bg-black/70 border border-green-400/30 p-3 rounded font-mono text-xs space-y-2">
                        <p className="text-green-400">User Input:</p>
                        <p className="text-green-300">"Build a kitchen portfolio section. Filter by colour and style."</p>
                        <p className="text-green-400 mt-3">Agent Action:</p>
                        <ul className="text-green-300 ml-4 list-disc space-y-1">
                          <li>Generates CPT schema</li>
                          <li>Creates REST endpoints</li>
                          <li>Builds grid React components</li>
                          <li>Suggests SEO metadata</li>
                        </ul>
                        <p className="text-green-400 mt-3">Result:</p>
                        <p className="text-green-300">Complete portfolio system ready for deployment</p>
                      </div>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Example 2: SaaS Admin Generator</h4>
                      <p className="text-green-300 text-sm mb-3">
                        Generate a complete subscription product with admin dashboard.
                      </p>
                      <div className="bg-black/70 border border-green-400/30 p-3 rounded font-mono text-xs space-y-2">
                        <p className="text-green-400">User Input:</p>
                        <p className="text-green-300">"Make a subscription product with admin dashboard and event logs."</p>
                        <p className="text-green-400 mt-3">Agent Action:</p>
                        <ul className="text-green-300 ml-4 list-disc space-y-1">
                          <li>Generates DB schema</li>
                          <li>Writes API handlers</li>
                          <li>Creates dashboard UI</li>
                          <li>Integrates Stripe</li>
                        </ul>
                        <p className="text-green-400 mt-3">Result:</p>
                        <p className="text-green-300">Full SaaS product ready to deploy</p>
                      </div>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Example 3: Expert Persona Builder</h4>
                      <p className="text-green-300 text-sm mb-3">
                        Create a domain-specific expert assistant.
                      </p>
                      <div className="bg-black/70 border border-green-400/30 p-3 rounded font-mono text-xs space-y-2">
                        <p className="text-green-400">User Input:</p>
                        <p className="text-green-300">"Make me an expert on UK probate. Provide templates and calculators."</p>
                        <p className="text-green-400 mt-3">Agent Action:</p>
                        <ul className="text-green-300 ml-4 list-disc space-y-1">
                          <li>Pulls primary source rules</li>
                          <li>Creates calculators</li>
                          <li>Wraps persona</li>
                          <li>Creates docs route</li>
                        </ul>
                        <p className="text-green-400 mt-3">Result:</p>
                        <p className="text-green-300">Complete expert system in a box</p>
                      </div>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Example 4: Migration Assistant</h4>
                      <p className="text-green-300 text-sm mb-3">
                        Migrate content between platforms with transformations.
                      </p>
                      <div className="bg-black/70 border border-green-400/30 p-3 rounded font-mono text-xs space-y-2">
                        <p className="text-green-400">User Input:</p>
                        <p className="text-green-300">"Migrate blog posts from WP to a static Next front end and transform images to WebP."</p>
                        <p className="text-green-400 mt-3">Agent Action:</p>
                        <ul className="text-green-300 ml-4 list-disc space-y-1">
                          <li>Reads WP JSON</li>
                          <li>Transforms to MDX</li>
                          <li>Creates blog route</li>
                          <li>Converts images</li>
                          <li>Builds RSS</li>
                        </ul>
                        <p className="text-green-400 mt-3">Result:</p>
                        <p className="text-green-300">Complete migration with optimized assets</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Building Your Own Examples</h3>
                  <p className="text-green-300 mb-4">
                    To create custom use cases:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-green-300 ml-4">
                    <li>Identify the problem you want to solve</li>
                    <li>Determine which tools you need</li>
                    <li>Create or modify tools in <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/</code></li>
                    <li>Build agents that use those tools</li>
                    <li>Test via the Agent interface</li>
                    <li>Deploy and iterate</li>
                  </ol>
                </section>
              </div>
            )}

            {activeTab === "troubleshooting" && (
              <div className="space-y-6">
                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Common Issues</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Agent Not Responding</h4>
                      <ul className="text-green-300 text-sm ml-4 list-disc space-y-1">
                        <li>Check that <code className="bg-black/70 px-1 rounded">CLAUDE_API_KEY</code> is set in Vercel environment variables</li>
                        <li>Verify the API key is valid and has credits</li>
                        <li>Check browser console for errors</li>
                        <li>Review Vercel function logs</li>
                      </ul>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Tools Not Working</h4>
                      <ul className="text-green-300 text-sm ml-4 list-disc space-y-1">
                        <li>Ensure tools are imported in <code className="bg-black/70 px-1 rounded">/backend/tools/index.ts</code></li>
                        <li>Verify tool structure (name, description, execute)</li>
                        <li>Check that tools are properly exported</li>
                        <li>Review server logs for tool errors</li>
                      </ul>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Deployment Issues</h4>
                      <ul className="text-green-300 text-sm ml-4 list-disc space-y-1">
                        <li>Verify <code className="bg-black/70 px-1 rounded">vercel.json</code> build command</li>
                        <li>Check Vercel build logs for errors</li>
                        <li>Ensure all dependencies are in <code className="bg-black/70 px-1 rounded">package.json</code></li>
                        <li>Verify environment variables are set in Vercel</li>
                      </ul>
                    </div>

                    <div className="bg-black/50 border border-green-400/30 p-4 rounded">
                      <h4 className="text-green-400 font-bold mb-2">Performance</h4>
                      <ul className="text-green-300 text-sm ml-4 list-disc space-y-1">
                        <li>Agent responses may take 5-30 seconds depending on complexity</li>
                        <li>Long responses stream via typewriter effect</li>
                        <li>Check network tab for API response times</li>
                        <li>Consider optimizing tool execution time</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Getting Help</h3>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-3">
                    <p className="text-green-300">
                      <strong className="text-green-400">Documentation:</strong> Review the <Link href="/docs" className="text-green-400 hover:underline">Docs</Link> page for detailed information
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">GitHub:</strong> Check <a href="https://github.com/kriszwart/zwartifyos" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">issues</a> or create a new one
                    </p>
                    <p className="text-green-300">
                      <strong className="text-green-400">Read the Code:</strong> ZwartifyOS is open source - inspect the implementation
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-2xl font-bold mb-4 text-green-400">Best Practices</h3>
                  <div className="bg-black/50 border border-green-400/30 p-4 rounded space-y-2 text-green-300 text-sm">
                    <p>• Start with simple queries to test the system</p>
                    <p>• Build tools incrementally, test each one</p>
                    <p>• Use the Agent interface to iterate quickly</p>
                    <p>• Commit working code frequently</p>
                    <p>• Let Claude Code for Web review before merging</p>
                    <p>• Monitor Vercel logs for production issues</p>
                    <p>• Keep API keys secure, never commit them</p>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-green-400/30 text-center text-sm text-green-500 opacity-60">
            <Link href="/docs" className="hover:text-green-400 transition-colors">
              ← Back to Docs
            </Link>
            {" • "}
            <Link href="/agent" className="hover:text-green-400 transition-colors">
              Agent
            </Link>
            {" • "}
            <Link href="/" className="hover:text-green-400 transition-colors">
              Home
            </Link>
          </footer>
        </main>
      </div>
    </div>
  )
}

