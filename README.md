# ZwartifyOS

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v0.1.0-blue)

**ZwartifyOS is an operating system for building intelligent products.**

It fuses local AI coding with cloud AI code review and deploys instantly.

This hybrid workflow means a single human can build complex systems that once required entire teams.

These patterns did not exist together until now.

ZwartifyOS sits at the frontier.

---

## 🚀 The Revolution Statement

ZwartifyOS is not just a template.

It is the beginning of a new method of creation.

It reframes coding from "writing instructions" to "conducting intelligence".

The system does not simply execute what you type.

It co-authors your intent across multiple intelligent layers.

- **Cursor** interprets your edits and creates code locally
- **Claude Code for Web** reviews, improves, commits
- **Claude Agent SDK** lets your agents inspect and expand themselves
- **GitHub** tracks the living evolution
- **Vercel** manifests the result instantly

You think → They weave → Reality updates

One keyboard. Many minds. Infinite worlds.

This is cooperative cognition.

---

## 🌟 Why This Moment Matters

**Cursor + Claude Code for Web + Claude Agent SDK + Vercel is a historic moment for solo builders.**

This combination unlocks something that was effectively impossible until very recently.

**Claude Code for Web** can review, write, patch, and commit code directly into GitHub.

**Cursor** can generate, refactor, and plan code locally.

**Claude Agent SDK** lets your running system create more systems.

ZwartifyOS unifies all of this.

**This is the closest we have ever been to a one-person full-stack AI engineering team.**

### The Convergence

Until late 2024 or early 2025, you could:
- Generate code locally
- Deploy manually
- Prototype with scattered tools

But you could not do the following reliably:
- Have AI plan a full multi-file codebase
- Edit, diff, and commit to GitHub directly from a model
- Build with agent tools that self-extend capability
- Trigger end-to-end deployment from single intention

**This was not possible weeks ago in unified form.**

Only now do Cursor Plan, Claude Code for Web, and the Claude Agent SDK converge.

This is not "AI helping you code"

This is **"AI helping you build systems that build systems"**.

Like giving the apprentice a workshop, then watching it assemble its own apprentices.

---

## 📋 Features & Capabilities

### Core Stack: ACCV

**Agents. Cursor. Claude. Vercel.**

The leap is not in better autocomplete.

It is in model orchestrated code evolution.

- **Cursor** plans and edits
- **Claude** studies and commits
- **SDK agents** introspect and extend
- **GitHub** is the backbone
- **Vercel** is the crystallisation

The system becomes extensible and self improving.

### What You Can Build

• 🤖 **Build WordPress-assistant tool** - Auto-generate CPTs, REST endpoints, React components

• 💼 **Build SaaS admin generator** - Stripe integration, CRUD models, dashboard UI

• 👥 **Build multi-agent collaboration** - Agents that work together

• 🔨 **Auto-build CRUD pages** - Generate complete admin interfaces

• 🔌 **Auto-connect to APIs** - Seamless third-party integrations

• 🚀 **Auto-commit + deploy to Vercel** - End-to-end automation

• 🎭 **Build expert personas** - Domain-specific intelligent assistants

• 🏗️ **Teach agents to scaffold microservices** - System architecture generation

• 🧠 **Build planning and critique loops** - Self-improving workflows

• 🌿 **Branch safety** - Git-aware agent operations

• ⚙️ **CI hooks** - Automated testing and deployment

---

## 🚀 Quick Start

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/kriszwart/zwartifyos.git
cd zwartifyos
```

2. **Copy environment variables:**
```bash
cp .env.example .env.local
```

3. **Add your API key to `.env.local`:**
```
CLAUDE_API_KEY=your_anthropic_api_key_here
NEXT_PUBLIC_API_URL=  # Optional
```

4. **Install dependencies:**
```bash
npm install
```

5. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development

The development workflow:

1. **Edit code** in Cursor for local generation and refactoring
2. **Test agents** via the `/agent` interface
3. **Review changes** with Claude Code for Web
4. **Deploy** to Vercel automatically on push

---

## 🔗 Claude Code for Web Connection

### Setup Steps

1. **Install Claude Code for Web** browser extension
2. **Connect to your GitHub repository**
3. **Grant permissions** for code review and commits
4. **Use in your workflow:**
   - Open PRs in Claude Code for Web
   - Request code reviews
   - Let Claude commit directly to GitHub
   - Review and merge changes

Claude Code for Web can:
- Review your ZwartifyOS code
- Suggest improvements
- Write patches
- Commit directly to your repository
- Create pull requests

This creates a continuous improvement loop where your system evolves through AI-assisted code reviews.

---

## 🤖 Using Claude Agent SDK

The Claude Agent SDK is integrated into ZwartifyOS:

```typescript
import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export async function myAgent(input: string) {
  const tools = await getTools()
  const result = await agentClient.run(input, { tools })
  return { text: result.output_text }
}
```

The SDK enables:
- **Tool integration** - Agents can use registered tools
- **MCP server support** - Model Context Protocol integration
- **Streaming responses** - Real-time agent interactions
- **Self-extension** - Agents that build more agents

See `/backend/agents/agentClient.ts` for implementation details.

---

## 📚 Examples

### Example 1: WordPress Build Assistant

**Tools:**
- WP JSON REST helper
- Media uploader
- SEO schema generator

**User:** "Build a kitchen portfolio section. Filter by colour and style."

**Agent:**
- Generates CPT schema
- Creates REST endpoints
- Builds grid React components
- Deploys
- Suggests SEO metadata

**Workflow:** Cursor performs local code work → Claude Code for Web commits and refs → Vercel ships

### Example 2: SaaS Boilerplate Generator

**Tools:**
- Stripe helper
- CRUD model creator
- Shadcn UI pack
- Supabase helper

**User:** "Make a subscription product with admin dashboard and event logs."

**Agent:**
- Generates DB schema
- Writes API handlers
- Creates dashboard UI
- Integrates Stripe
- Commits to GitHub
- Deploys

**You simply approve. Reality updates.**

### Example 3: Expert Persona Builder

**Tools:**
- Knowledge embedder
- Memory store
- Persona interpreter

**User:** "Make me an expert on UK probate. Provide templates and calculators."

**Agent:**
- Pulls primary source rules
- Creates calculators
- Wraps persona
- Creates docs route
- Commits to GitHub

**You receive a complete expert in a box, online, within minutes.**

### Example 4: WordPress to React Migration

**User:** "Migrate blog posts from WP to a static Next front end and transform images to WebP. Deploy and hand me RSS output."

**Agent:**
- Reads WP JSON
- Transforms to MDX
- Creates blog route
- Converts images
- Builds RSS
- Commits
- Deploys

**You sip tea. The world rewrites itself.**

---

## 🏗️ Project Structure

```
/app
  /agent
    page.tsx         # Agent interface UI
  /api/agent
    route.ts         # API route handler
  /docs
    page.tsx         # Documentation page
  page.tsx           # Homepage
  globals.css        # Global styles
/backend
  /agents
    agentClient.ts   # Claude SDK client
    mainAgent.ts     # Main agent implementation
    expertAgent.ts   # Example expert persona
  /tools
    index.ts         # Tool registry
    helloTool.ts     # Example tool
    markdownFormatter.ts  # Markdown formatting tool
    screenshotDescription.ts  # Screenshot analysis tool
/styles
  animations.css     # Custom animations
.env.example        # Environment template
LICENSE             # MIT License
README.md           # Project documentation
VERSION             # Version file
```

---

## 🛠️ Building Tools

Tools automatically register when you add them to `/backend/tools/`.

Each tool must export an object with `name`, `description`, and `execute`:

```typescript
export const myTool = {
  name: "myTool",
  description: "Does something useful",
  execute: async (args?: any) => {
    // Your tool logic here
    return "Tool result"
  }
}
```

Then add the import to `/backend/tools/index.ts`:

```typescript
const toolModules = [
  import("./helloTool"),
  import("./markdownFormatter"),
  import("./screenshotDescription"),
  import("./myTool"),  // Add your tool here
]
```

---

## 🤖 Building Agents

Agents live in `/backend/agents/`. To create a new agent:

```typescript
import { agentClient } from "./agentClient"
import { getTools } from "../tools"

export async function myAgent(input: string) {
  try {
    const tools = await getTools()
    const result = await agentClient.run(input, { tools })
    return {
      text: result.output_text || "No response generated"
    }
  } catch (error) {
    return {
      text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    }
  }
}
```

See `expertAgent.ts` for a persona-based example.

---

## 📖 Documentation

- **[📖 Full Documentation](/docs)** - Complete guides and references
- **[🎭 Manifesto](/docs/manifesto)** - The philosophy in haiku
- **[🤖 Agent Interface](/agent)** - Interactive agent testing

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- Core agent system
- Tool registry
- Basic UI
- GitHub integration

### Phase 2: Enhancement (Current)
- Enhanced documentation
- Example tools and agents
- Claude Code for Web workflows
- Manifesto and positioning

### Phase 3: Expansion (Planned)
- Plugin system for Skills
- Multi-agent orchestration
- Advanced tool templates
- CI/CD automation hooks
- Agent memory systems

### Phase 4: Ecosystem (Future)
- Community tool library
- Agent marketplace
- Template gallery
- Integration hub

---

## 🎨 Styling Theme

ZwartifyOS uses a futuristic quantum aesthetic:
- **Color Scheme**: Black base (#000000) with neon green accents (#00ff00)
- **Effects**: Glitch animations, holographic gradients, scanline overlays
- **Typography**: Monospace fonts for terminal/tech feel
- **Animations**: Lightweight CSS animations

See `/styles/animations.css` for custom effects.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variables:
   - `CLAUDE_API_KEY` (required)
   - `NEXT_PUBLIC_API_URL` (optional)
4. Deploy automatically on every push

The ACCV stack means:
- **Agents** work
- **Cursor** codes locally
- **Claude** reviews and commits
- **Vercel** deploys instantly

---

## 💡 Why ZwartifyOS is Special

It is opinionated only where required.

It is agnostic where helpful.

You are not forced into a heavy framework.

Instead you start with:
- Next.js
- Shadcn
- Tailwind
- Agent SDK
- Tool registry

And from there you spawn anything.

**The OS metaphor is intentional.**

ZwartifyOS coordinates intelligence the way Unix coordinated programs.

Each tool is a capability.

Each agent is a userland program.

Each interaction is a process.

**You are root.**

---

## 🌱 Summary

**🤖 Agents learn**  
**⚡ Action is instant**  
**📦 Tools extend**  
**🔁 Code evolves**  
**🔧 Cursor crafts**  
**🔍 Claude reviews**  
**🚀 Vercel deploys**  
**🧠 You direct**  
**🔮 OS emerges**

---

## 📜 The One Person Revelation

You can now:
- Ideate
- Architect
- Build
- Review
- Deploy
- Ship

**Alone. With superhuman fluency.**

Not a lone wolf.

**A lone conductor. With an AI orchestra.**

This is not the future workforce.

**It is the future self.**

---

## 📄 License

MIT License - Copyright (c) 2025 Zwartify Design

See [LICENSE](./LICENSE) file for full license text.

---

## 🔗 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview)
- [Claude Code for Web](https://claude.ai/code)
- [Cursor IDE](https://cursor.sh)

---

**ZwartifyOS. The operating system for building intelligent products.**

**Built with Cursor. Reviewed by Claude. Deployed on Vercel.**

**You are the conductor.**
