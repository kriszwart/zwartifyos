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

          {/* Main Value Proposition */}
          <p className="text-2xl md:text-3xl text-green-400 max-w-3xl mx-auto leading-relaxed mb-6 font-semibold">
            The operating system for building intelligent products.
          </p>
          
          {/* Supporting Description */}
          <p className="text-lg md:text-xl text-green-300 max-w-2xl mx-auto leading-relaxed mb-4">
            Coordinate the ACCV stack: <strong className="text-green-400">A</strong>gents, <strong className="text-green-400">C</strong>ursor, <strong className="text-green-400">C</strong>laude, <strong className="text-green-400">V</strong>ercel.
          </p>
          
          <p className="text-base md:text-lg text-green-300/80 max-w-xl mx-auto mb-6">
            Build what took teams. Ship what seemed impossible. Code with intelligence that extends itself.
          </p>
          
          {/* Key Benefits */}
          <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-4 text-sm text-green-400/90 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">⚡</span>
              <span>Automated Workflows</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">🤖</span>
              <span>Self-Extending Agents</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-green-400">🔄</span>
              <span>Bidirectional Sync</span>
            </div>
          </div>

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
              href="https://github.com/kriszwart/zwartifyos"
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
            href="https://github.com/kriszwart/zwartifyos"
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
