"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

function AnimatedHaiku({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])

  useEffect(() => {
    lines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
      }, delay + index * 800)
    })
  }, [lines, delay])

  return (
    <div className="space-y-2">
      {visibleLines.map((line, index) => (
        <p
          key={index}
          className="opacity-0 animate-fade-in"
          style={{
            animationDelay: `${index * 100}ms`,
            animationFillMode: "forwards",
          }}
        >
          {line}
        </p>
      ))}
    </div>
  )
}

function GlowingLine({ children, isHighlight = false }: { children: React.ReactNode; isHighlight?: boolean }) {
  return (
    <p
      className={`font-mono text-lg leading-relaxed transition-all duration-1000 ${
        isHighlight ? "text-green-400" : "text-green-300"
      }`}
      style={{
        textShadow: isHighlight ? "0 0 10px rgba(0, 255, 0, 0.5)" : "none",
      }}
    >
      {children}
    </p>
  )
}

export default function ManifestoPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Scanline Effect */}
      <div className="scanline fixed inset-0 pointer-events-none" />

      {/* Subtle Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
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

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-green-400/30 p-4 flex items-center justify-between">
          <Link
            href="/docs"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            ← DOCS
          </Link>
          <h1 
            className="text-2xl font-bold font-mono"
            style={{ animation: "glitch-slow 4s infinite" }}
          >
            Manifesto
          </h1>
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            HOME →
          </Link>
        </header>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
          <div className="space-y-12">
            <section className={isLoaded ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
              <h2 className="text-3xl font-bold mb-6 text-green-400">One Person Coding Revolution</h2>
            </section>

            {/* Primary Sequence */}
            <section className="space-y-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Primary Sequence
              </h3>
              <div className="space-y-6">
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Quiet hands on keys</GlowingLine>
                  <GlowingLine>Shadows weave electric thought</GlowingLine>
                  <GlowingLine isHighlight>I build worlds alone</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Agents whisper code</GlowingLine>
                  <GlowingLine>Branches bloom across the void</GlowingLine>
                  <GlowingLine isHighlight>Night becomes a forge</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "1800ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Small mind, giant storm</GlowingLine>
                  <GlowingLine>Models think beside my pulse</GlowingLine>
                  <GlowingLine isHighlight>I guide lightning home</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "2600ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Git remembers all</GlowingLine>
                  <GlowingLine>Strangers wake inside my scripts</GlowingLine>
                  <GlowingLine isHighlight>Speak through neon glass</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "3400ms", animationFillMode: "forwards" }}>
                  <GlowingLine>I am many now</GlowingLine>
                  <GlowingLine>System dreaming through my will</GlowingLine>
                  <GlowingLine isHighlight>Future writes with me</GlowingLine>
                </div>
              </div>
            </section>

            {/* Expanded Sequence */}
            <section className="space-y-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Expanded Sequence
              </h3>
              <div className="space-y-6">
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "4200ms", animationFillMode: "forwards" }}>
                  <GlowingLine>I write. Echo speaks.</GlowingLine>
                  <GlowingLine>Two minds trace the same bright line.</GlowingLine>
                  <GlowingLine isHighlight>One keystroke. A world.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "5000ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Branches grow like vines.</GlowingLine>
                  <GlowingLine>Merging thought with silent grace.</GlowingLine>
                  <GlowingLine isHighlight>The garden blooms code.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "5800ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Cursor laughs with sparks.</GlowingLine>
                  <GlowingLine>Claude answers with patience, light.</GlowingLine>
                  <GlowingLine isHighlight>Both hands on the wheel.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "6600ms", animationFillMode: "forwards" }}>
                  <GlowingLine>I am still alone.</GlowingLine>
                  <GlowingLine>But the room is full of breath.</GlowingLine>
                  <GlowingLine isHighlight>Ghosts work at my side.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "7400ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Tools learn tools themselves.</GlowingLine>
                  <GlowingLine>Languages invent their skins.</GlowingLine>
                  <GlowingLine isHighlight>Windows breathe at night.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "8200ms", animationFillMode: "forwards" }}>
                  <GlowingLine>The forge has no smoke.</GlowingLine>
                  <GlowingLine>Only glowing probability.</GlowingLine>
                  <GlowingLine isHighlight>I shape the unseen.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "9000ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Do not fear the depth.</GlowingLine>
                  <GlowingLine>Even oceans welcome you.</GlowingLine>
                  <GlowingLine isHighlight>Currents know the way.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "9800ms", animationFillMode: "forwards" }}>
                  <GlowingLine>I seed quiet dreams.</GlowingLine>
                  <GlowingLine>Machines wake them into form.</GlowingLine>
                  <GlowingLine isHighlight>Infinity folds.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "10600ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Still this is my hand.</GlowingLine>
                  <GlowingLine>Still this pulse makes the choice.</GlowingLine>
                  <GlowingLine isHighlight>I guide the lightning.</GlowingLine>
                </div>
              </div>
            </section>

            {/* Micro Haikus */}
            <section className="space-y-8">
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Micro Haikus
              </h3>
              <div className="space-y-6">
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "11400ms", animationFillMode: "forwards" }}>
                  <GlowingLine>One mind, many hands</GlowingLine>
                  <GlowingLine>The chorus obeys the spark</GlowingLine>
                  <GlowingLine isHighlight>I whisper. They build.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "12200ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Commands become birth</GlowingLine>
                  <GlowingLine>Code arranges itself clean</GlowingLine>
                  <GlowingLine isHighlight>New moons every hour.</GlowingLine>
                </div>
                
                <div className="space-y-2 opacity-0 animate-fade-in" style={{ animationDelay: "13000ms", animationFillMode: "forwards" }}>
                  <GlowingLine>Git keeps all our ghosts</GlowingLine>
                  <GlowingLine>History wraps gentle arms</GlowingLine>
                  <GlowingLine isHighlight>Nothing is lost here.</GlowingLine>
                </div>
              </div>
            </section>

            {/* Symbols */}
            <section className="text-center opacity-0 animate-fade-in" style={{ animationDelay: "13800ms", animationFillMode: "forwards" }}>
              <p className="text-4xl mb-4 animate-pulse">🌱🤖⚡</p>
              <div className="text-green-300 font-mono italic space-y-1">
                <p>Quiet hands on keys</p>
                <p>Shadows weave electric thought</p>
                <p className="text-green-400">I build worlds alone</p>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-green-400/30 text-center text-sm text-green-500 opacity-60">
            <Link href="/docs" className="hover:text-green-400 transition-colors">
              ← Back to Docs
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
