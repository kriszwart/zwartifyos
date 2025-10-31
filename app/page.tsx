"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const blobRefs = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([])

  useEffect(() => {
    // Mouse follower
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Create floating blobs/daemons
    const blobs: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
    for (let i = 0; i < 5; i++) {
      blobs.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 20 + Math.random() * 30,
      })
    }
    blobRefs.current = blobs

    // Animate blobs
    const animate = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw blobs
      blobRefs.current.forEach((blob) => {
        blob.x += blob.vx
        blob.y += blob.vy

        // Bounce off edges
        if (blob.x < 0 || blob.x > canvas.width) blob.vx *= -1
        if (blob.y < 0 || blob.y > canvas.height) blob.vy *= -1

        // Keep in bounds
        blob.x = Math.max(0, Math.min(canvas.width, blob.x))
        blob.y = Math.max(0, Math.min(canvas.height, blob.y))

        // Draw blob with gradient
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.size)
        gradient.addColorStop(0, "rgba(0, 255, 0, 0.3)")
        gradient.addColorStop(0.5, "rgba(0, 255, 0, 0.1)")
        gradient.addColorStop(1, "rgba(0, 255, 0, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Floating Blobs/Daemons Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Mouse Follower Glow */}
      <div
        className="fixed pointer-events-none z-0 transition-opacity duration-300"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(0, 255, 0, 0.15) 0%, transparent 70%)",
          opacity: mousePosition.x > 0 && mousePosition.y > 0 ? 1 : 0,
        }}
      />

      {/* Floating Angel/Daemon Sprites */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400/20 font-mono text-xl animate-float"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
              filter: "blur(0.5px)",
            }}
          >
            {i % 2 === 0 ? "⟡" : "⚡"}
          </div>
        ))}
      </div>
      
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

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16" style={{ isolation: "isolate" }}>
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
          
          {/* Core Value Statement */}
          <p className="text-lg md:text-xl text-green-300 max-w-3xl mx-auto leading-relaxed mb-4 font-medium">
            Build solo what once took teams. Ship more, faster. Code with AI that continuously learns and improves with every loop—always evolving, never static.
          </p>
          
          {/* Supporting Description */}
          <p className="text-base md:text-lg text-green-300/90 max-w-2xl mx-auto leading-relaxed mb-6">
            Coordinate the ACCV stack: <strong className="text-green-400">A</strong>gents, <strong className="text-green-400">C</strong>ursor, <strong className="text-green-400">C</strong>laude, <strong className="text-green-400">V</strong>ercel. 
            Automated bidirectional sync connects cloud AI reviews to your local codebase seamlessly.
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
