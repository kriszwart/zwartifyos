import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Subtle Sparkles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="max-w-4xl w-full text-center space-y-8">
          {/* Title with Glitch Effect */}
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4"
            style={{
              animation: "glitch 3s infinite",
              textShadow: "0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00",
            }}
          >
            ZwartifyOS
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-green-300 max-w-2xl mx-auto leading-relaxed">
            A full-stack agent template built with Next.js and Claude Agent SDK.
            Build intelligent applications with modular tools and futuristic interfaces.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="/agent"
              className="relative px-8 py-4 bg-black border-2 border-green-400 text-green-400 font-semibold uppercase tracking-wider 
                       hover:bg-green-400 hover:text-black transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] hover:scale-105
                       flicker"
            >
              Launch Agent
            </Link>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-8 py-4 bg-black border-2 border-green-400 text-green-400 font-semibold uppercase tracking-wider 
                       hover:bg-green-400 hover:text-black transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] hover:scale-105
                       flicker"
            >
              GitHub
            </a>
            
            <Link
              href="/docs"
              className="relative px-8 py-4 bg-black border-2 border-green-400 text-green-400 font-semibold uppercase tracking-wider 
                       hover:bg-green-400 hover:text-black transition-all duration-300
                       hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] hover:scale-105
                       flicker"
            >
              Docs
            </Link>
          </div>

          {/* Holographic Accent */}
          <div className="mt-16">
            <div className="holographic-gradient text-4xl font-mono opacity-50">
              &gt; _ SYSTEM_READY
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-6 text-center text-sm text-green-500 opacity-60">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-colors"
          >
            GitHub
          </a>
          {" • "}
          <span>MIT License © 2025 Zwartify Design</span>
        </footer>
      </main>
    </div>
  )
}
