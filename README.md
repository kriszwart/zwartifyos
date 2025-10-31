# ZwartifyOS

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-v0.1.0-blue)

A full-stack agent template built with Next.js and Claude Agent SDK. Features a futuristic quantum aesthetic UI with modular tool registry and agent system.

**License**: MIT License - Copyright (c) 2025 Zwartify Design

## Who is this for?

ZwartifyOS is designed for developers who want to build intelligent applications with AI agents. Whether you're creating chatbots, automation tools, or complex agent workflows, ZwartifyOS provides a clean, modular foundation that handles the infrastructure so you can focus on building your agent logic and tools.

## OS Ethos

ZwartifyOS embodies the philosophy of **modularity, simplicity, and extensibility**. The system is built with clear separation of concerns—agents handle reasoning, tools handle actions, and the UI provides an immersive interface. Everything is designed to be easily customizable, from adding new tools to modifying the UI aesthetic. The quantum-inspired design reflects the interconnected, parallel nature of agent systems while maintaining a clean, focused developer experience.

## Quick Links

- [📖 Documentation](/docs) - Full documentation and guides
- [🤖 Agent Interface](/agent) - Interactive agent interface
- [🔗 GitHub Repository](https://github.com/kriszwart/zwartifyos) - Source code

## Getting Started

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/kriszwart/zwartifyos.git
cd zwartifyos
```

2. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

3. Fill in your environment variables in `.env.local`:
- `CLAUDE_API_KEY` - Your Anthropic API key
- `NEXT_PUBLIC_API_URL` - API URL (optional, defaults to local)

### Development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

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
  /tools
    index.ts         # Tool registry
    helloTool.ts     # Example tool
/styles
  animations.css     # Custom animations
.env.example        # Environment template
LICENSE             # MIT License
README.md           # Project documentation
VERSION             # Version file
```

## Adding New Agents

Agents live in the `/backend/agents/` directory. To create a new agent:

1. Create a new file in `/backend/agents/` (e.g., `myAgent.ts`)
2. Import the agent client and tools
3. Export an async function that accepts input and returns a result

Example:

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
    console.error("Agent error:", error)
    return {
      text: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
    }
  }
}
```

## Adding New Tools

Tools automatically register when you add them to `/backend/tools/`. Each tool must export an object with `name`, `description`, and `execute` properties:

```typescript
export const myTool = {
  name: "myTool",
  description: "Does something useful",
  execute: async () => {
    // Your tool logic here
    return "Tool result"
  }
}
```

Then add the import to `/backend/tools/index.ts`:

```typescript
const toolModules = [
  import("./helloTool"),
  import("./myTool"),  // Add your tool here
]
```

## Pages

### Homepage (`/`)

The homepage features a futuristic quantum aesthetic with:
- Dark background with holographic green gradients
- Subtle grid pattern overlay
- Glitch animations and sparkling particle effects
- Links to Agent interface, GitHub, and Documentation
- MIT License footer

### Agent Interface (`/agent`)

The agent page provides an interactive terminal-style interface with:
- Large input textarea with neon green cursor and flicker animations
- Quantum ripple focus effects
- Real-time agent interaction via `/api/agent` endpoint
- Typewriter-style output display
- Loading indicator with rotating quantum glyph
- Terminal log with history
- Reversed-matrix aesthetic with subtle particle background

### Documentation (`/docs`)

Comprehensive documentation covering setup, agent system, tool registry, API usage, and deployment.

## API

The `/api/agent` endpoint accepts POST requests with JSON payloads:

**Request:**
```json
POST /api/agent
Content-Type: application/json

{
  "input": "Hello, agent!"
}
```

**Response:**
```json
{
  "text": "ZwartifyOS online. You said: Hello, agent!"
}
```

## Styling Theme

ZwartifyOS uses a futuristic quantum aesthetic featuring:
- **Color Scheme**: Black base (#000000) with neon green accents (#00ff00)
- **Effects**: Glitch animations, holographic gradients, scanline overlays, particle sparkles
- **Typography**: Monospace fonts for terminal/tech feel
- **Animations**: Lightweight CSS animations (no heavy WebGL)

All styling is implemented with Tailwind CSS classes and custom CSS animations defined in `/styles/animations.css`.

### Customizing the UI

#### Colors

Modify color schemes in `app/globals.css`:
```css
:root {
  --background: #000000;
  --foreground: #00ff00;
}
```

#### Animations

Customize animations in `/styles/animations.css`:
- `glitch` - Text glitch effect
- `holographic` - Holographic gradient animation
- `scanline` - Scanning line overlay
- `typewriter` - Typewriter text reveal
- `ripple` - Quantum ripple focus effect
- `sparkle` - Particle sparkle animation

## Deployment

### Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `CLAUDE_API_KEY`
   - `NEXT_PUBLIC_API_URL` (optional)
4. Deploy!

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) - Claude Agent SDK documentation.

## License

MIT License - Copyright (c) 2025 Zwartify Design

See [LICENSE](./LICENSE) file for full license text.
