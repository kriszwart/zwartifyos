import Link from "next/link"

export default function DocsPage() {
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
        <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <div className="space-y-8 md:space-y-12">
            {/* Intro */}
            <section>
              <p className="text-lg md:text-xl text-green-300 leading-relaxed">
                ZwartifyOS is a full-stack agent template built with Next.js and Claude Agent SDK. 
                It provides a modular foundation for building intelligent applications with a futuristic 
                quantum aesthetic UI, automated tool registry, and agent system.
              </p>
            </section>

            {/* Folder Structure */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Folder Structure
              </h2>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`/app
  /agent
    page.tsx         # Agent interface UI
  /api/agent
    route.ts         # API route handler
  /docs
    page.tsx         # This documentation page
  page.tsx           # Homepage
  globals.css        # Global styles
/backend
  /agents
    agentClient.ts   # Claude SDK client
    mainAgent.ts     # Main agent implementation
  /tools
    index.ts         # Tool registry
    helloTool.ts     # Example tool
/styles
  animations.css     # Custom animations
.env.example        # Environment template
LICENSE             # MIT License
README.md           # Project documentation
VERSION             # Version file`}
              </pre>
            </section>

            {/* Setup Instructions */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Setup Instructions
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                <li>Clone the repository:
                  <pre className="bg-black/50 border border-green-400/30 p-3 rounded font-mono text-sm mt-2">
                    git clone https://github.com/kriszwart/zwartifyos.git
                  </pre>
                </li>
                <li>Copy `.env.example` to `.env.local`:
                  <pre className="bg-black/50 border border-green-400/30 p-3 rounded font-mono text-sm mt-2">
                    cp .env.example .env.local
                  </pre>
                </li>
                <li>Add your `CLAUDE_API_KEY` to `.env.local`:
                  <pre className="bg-black/50 border border-green-400/30 p-3 rounded font-mono text-sm mt-2">
                    CLAUDE_API_KEY=your_api_key_here
                  </pre>
                </li>
                <li>Install dependencies:
                  <pre className="bg-black/50 border border-green-400/30 p-3 rounded font-mono text-sm mt-2">
                    npm install
                  </pre>
                </li>
                <li>Run the development server:
                  <pre className="bg-black/50 border border-green-400/30 p-3 rounded font-mono text-sm mt-2">
                    npm run dev
                  </pre>
                </li>
              </ol>
              <p className="text-green-300 mt-4">
                Open <a href="http://localhost:3000" className="text-green-400 hover:underline">http://localhost:3000</a> to see your application.
              </p>
            </section>

            {/* Agent System */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Agent System
              </h2>
              <p className="text-green-300 mb-4">
                Agents live in the <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/agents/</code> directory.
              </p>
              <p className="text-green-300 mb-4">
                To create a new agent, create a new file in <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/agents/</code> and export an async function that accepts input and returns a result.
              </p>
              <p className="text-green-300 mb-4">Example agent:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export async function myAgent(input: string) {
  try {
    // Load tools
    const tools = await getTools()
    
    // Run agent with input and tools
    const result = await agentClient.run(input, { tools })
    
    // Return response
    return {
      text: result.output_text || "No response generated"
    }
  } catch (error) {
    console.error("Agent error:", error)
    return {
      text: \`Error: \${error instanceof Error ? error.message : "Unknown error"}\`
    }
  }
}`}
              </pre>
            </section>

            {/* Tool Registry */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Tool Registry
              </h2>
              <p className="text-green-300 mb-4">
                Tools automatically register when you add them to <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/</code> and update the import in <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/index.ts</code>.
              </p>
              <p className="text-green-300 mb-4">
                Each tool must export an object with <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">name</code>, <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">description</code>, and <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">execute</code> properties.
              </p>
              <p className="text-green-300 mb-4">Example tool:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`export const myTool = {
  name: "myTool",
  description: "Does something useful",
  execute: async () => {
    // Your tool logic here
    return "Tool result"
  }
}`}
              </pre>
              <p className="text-green-300 mt-4">
                Add the tool import to <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/backend/tools/index.ts</code>:
              </p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto mt-2">
{`const toolModules = [
  import("./helloTool"),
  import("./myTool"),  // Add your tool here
]`}
              </pre>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Skills & Plugins
              </h2>
              <p className="text-green-300 mb-4">
                <strong className="text-green-400">Skills</strong> are reusable capabilities that extend your agent's abilities beyond basic tools. 
                They are provided through <strong className="text-green-400">Plugins</strong>, which can contain skills, custom commands, agents, and hooks.
              </p>
              <p className="text-green-300 mb-4">
                Skills are more advanced than tools—they can contain complex logic, maintain state, and provide specialized capabilities 
                like code generation patterns, data analysis workflows, or custom agent behaviors.
              </p>
              
              <h3 className="text-2xl font-bold mb-3 mt-6 text-green-400">Using Skills with Plugins</h3>
              <p className="text-green-300 mb-4">
                To use Skills in your agent, you need to load a plugin that contains them. Update <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">agentClient.ts</code>:
              </p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`// In agentClient.ts, add plugins to query options:
const queryGenerator = query({
  prompt: input,
  options: {
    model: "claude-3-5-sonnet-20241022",
    plugins: [
      { type: 'local', path: './plugins/my-plugin' }
    ],
    ...(Object.keys(mcpServers).length > 0 && { mcpServers }),
  },
})`}
              </pre>

              <h3 className="text-2xl font-bold mb-3 mt-6 text-green-400">Creating a Plugin with Skills</h3>
              <p className="text-green-300 mb-4">
                Plugins are directories that contain plugin configuration files. Create a plugin structure:
              </p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`/plugins
  /my-plugin
    plugin.json          # Plugin configuration
    skills/
      mySkill.js        # Skill implementation
    commands/
      myCommand.js      # Custom commands
    hooks/
      myHook.js         # Event hooks`}
              </pre>

              <p className="text-green-300 mb-4 mt-4">Example plugin configuration:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`// plugins/my-plugin/plugin.json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Custom plugin with skills",
  "skills": ["mySkill"],
  "commands": ["myCommand"]
}`}
              </pre>

              <p className="text-green-300 mb-4 mt-4">Example skill implementation:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`// plugins/my-plugin/skills/mySkill.js
export const mySkill = {
  name: "mySkill",
  description: "A custom skill that does something advanced",
  execute: async (context, args) => {
    // Skill logic here
    // Can access agent context, maintain state, etc.
    return "Skill result"
  }
}`}
              </pre>

              <h3 className="text-2xl font-bold mb-3 mt-6 text-green-400">Skills vs Tools</h3>
              <div className="bg-black/50 border border-green-400/30 p-4 rounded mt-4">
                <p className="text-green-300 mb-2"><strong className="text-green-400">Tools:</strong></p>
                <ul className="list-disc list-inside text-green-300 ml-4 mb-4 space-y-1">
                  <li>Simple, stateless functions</li>
                  <li>Execute and return results immediately</li>
                  <li>Best for basic operations (API calls, calculations, etc.)</li>
                </ul>
                <p className="text-green-300 mb-2"><strong className="text-green-400">Skills:</strong></p>
                <ul className="list-disc list-inside text-green-300 ml-4 space-y-1">
                  <li>Complex capabilities with state and context</li>
                  <li>Can contain multiple steps or workflows</li>
                  <li>Best for advanced operations (code patterns, analysis workflows, etc.)</li>
                </ul>
              </div>

              <p className="text-green-300 mt-4">
                Learn more about plugins and skills in the{" "}
                <a 
                  href="https://docs.claude.com/en/api/agent-sdk/overview"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  Claude Agent SDK documentation
                </a>.
              </p>
            </section>

            {/* API */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                API
              </h2>
              <p className="text-green-300 mb-4">
                The <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/api/agent</code> endpoint accepts POST requests with JSON payloads.
              </p>
              <p className="text-green-300 mb-4">Request example:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`POST /api/agent
Content-Type: application/json

{
  "input": "Hello, agent!"
}`}
              </pre>
              <p className="text-green-300 mt-4 mb-4">Response example:</p>
              <pre className="bg-black/50 border border-green-400/30 p-4 rounded font-mono text-sm overflow-x-auto">
{`{
  "text": "ZwartifyOS online. You said: Hello, agent!"
}`}
              </pre>
            </section>

            {/* UI */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                UI
              </h2>
              <p className="text-green-300 mb-4">
                To add a page for an agent, create a new route in the <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/app</code> directory following Next.js App Router conventions.
              </p>
              <p className="text-green-300 mb-4">
                Example: <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/app/myagent/page.tsx</code> would be accessible at <code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">/myagent</code>.
              </p>
              <p className="text-green-300 mb-4">
                Learn more about Next.js routing in the{" "}
                <a 
                  href="https://nextjs.org/docs/app/building-your-application/routing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  Next.js App Router documentation
                </a>.
              </p>
            </section>

            {/* Deployment */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Deployment
              </h2>
              <p className="text-green-300 mb-4">Deploy to Vercel:</p>
              <ol className="list-decimal list-inside space-y-3 text-green-300 ml-4">
                <li>Push your code to GitHub</li>
                <li>Import your repository on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">Vercel</a></li>
                <li>Add environment variables in Vercel dashboard:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">CLAUDE_API_KEY</code></li>
                    <li><code className="bg-black/50 px-2 py-1 rounded border border-green-400/30">NEXT_PUBLIC_API_URL</code> (optional)</li>
                  </ul>
                </li>
                <li>Deploy and enjoy!</li>
              </ol>
              <p className="text-green-300 mt-4">
                Learn more in the{" "}
                <a 
                  href="https://nextjs.org/docs/app/building-your-application/deploying"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline"
                >
                  Next.js deployment documentation
                </a>.
              </p>
            </section>

            {/* License */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                License
              </h2>
              <p className="text-green-300">
                ZwartifyOS is licensed under the MIT License.
              </p>
              <p className="text-green-300 mt-2">
                Copyright (c) 2025 Zwartify Design
              </p>
              <p className="text-green-300 mt-4">
                See the <Link href="/LICENSE" className="text-green-400 hover:underline">LICENSE</Link> file for the full license text.
              </p>
            </section>
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
          </footer>
        </main>
      </div>
    </div>
  )
}

