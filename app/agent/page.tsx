"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!text) {
      setDisplayedText("")
      return
    }

    setDisplayedText("")
    let currentIndex = 0

    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(timer)
      }
    }, 20)

    return () => clearInterval(timer)
  }, [text])

  return (
    <span className="font-mono text-green-400">
      {displayedText}
      <span className="animate-pulse">▊</span>
    </span>
  )
}

function LoadingGlyph() {
  return (
    <div className="quantum-glyph inline-block text-green-400 text-2xl">
      ⚛
    </div>
  )
}

export default function AgentPage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [outputHistory, setOutputHistory] = useState<string[]>([])

  async function send() {
    if (!input.trim()) return

    setIsLoading(true)
    setOutput("")

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })
      const data = await res.json()
      
      setOutput(data.text || data.error || "No response")
      setOutputHistory((prev) => [...prev, `> ${input}`, data.text || data.error || "No response"])
      setInput("")
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Network error"
      setOutput(errorMsg)
      setOutputHistory((prev) => [...prev, `> ${input}`, `ERROR: ${errorMsg}`])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Subtle Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
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

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-green-400/30 p-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-green-400 hover:text-green-300 transition-colors font-mono"
          >
            ← BACK
          </Link>
          <h1 className="text-2xl font-bold font-mono" style={{ animation: "glitch-slow 4s infinite" }}>
            ZwartifyOS Agent
          </h1>
          <div className="w-24" /> {/* Spacer */}
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col p-4 md:p-8 gap-6 max-w-6xl mx-auto w-full">
          {/* Input Section */}
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-sm font-mono text-green-300 uppercase tracking-wider">
              Input Terminal
            </label>
            <div className="ripple relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault()
                    send()
                  }
                }}
                placeholder="Type your message... (Cmd/Ctrl + Enter to send)"
                className="w-full h-32 md:h-48 bg-black border-2 border-green-400/50 text-green-400 
                         font-mono p-4 focus:outline-none focus:border-green-400 focus:shadow-[0_0_20px_rgba(0,255,0,0.3)]
                         placeholder-green-400/30 resize-none flicker
                         caret-green-400"
                style={{
                  textShadow: "0 0 5px rgba(0, 255, 0, 0.5)",
                }}
              />
            </div>

            <button
              onClick={send}
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-black border-2 border-green-400 text-green-400 font-mono uppercase
                         hover:bg-green-400 hover:text-black transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <LoadingGlyph /> Processing...
                </span>
              ) : (
                "Send →"
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="flex-1 flex flex-col gap-4">
            <label className="text-sm font-mono text-green-300 uppercase tracking-wider">
              Output Terminal
            </label>
            <div className="bg-black/50 border-2 border-green-400/30 rounded p-4 h-64 md:h-96 overflow-y-auto font-mono text-sm">
              {outputHistory.length === 0 && !output ? (
                <div className="text-green-400/50 italic">
                  Waiting for input...
                </div>
              ) : (
                <div className="space-y-3">
                  {outputHistory.map((entry, idx) => (
                    <div key={idx} className="text-green-400">
                      {entry}
                    </div>
                  ))}
                  {output && (
                    <>
                      <div className="h-px bg-green-400/30 my-2" />
                      <div className="text-green-400">
                        <TypewriterText text={output} />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
