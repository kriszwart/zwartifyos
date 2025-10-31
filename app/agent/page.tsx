"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

function LoadingGlyph() {
  return (
    <div className="quantum-glyph inline-block text-green-400 text-2xl">
      ⚛
    </div>
  )
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={copyCode}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-green-400/10 border border-green-400/30
                   text-green-400 rounded opacity-0 group-hover:opacity-100 transition-opacity
                   hover:bg-green-400/20"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className={className}>
        <code>{children}</code>
      </pre>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div className={`max-w-[85%] ${isUser ? "order-2" : "order-1"}`}>
        {/* Header with role and timestamp */}
        <div className={`flex items-center gap-2 mb-2 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className={`text-xs font-mono uppercase tracking-wider ${isUser ? "text-cyan-400" : "text-green-300"}`}>
            {isUser ? "You" : "Assistant"}
          </span>
          <span className="text-xs text-green-400/40 font-mono">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>

        {/* Message bubble */}
        <div
          className={`relative px-4 py-3 rounded-lg border-2 ${
            isUser
              ? "bg-cyan-400/5 border-cyan-400/30 text-cyan-300"
              : "bg-green-400/5 border-green-400/30 text-green-300"
          }`}
          style={{
            boxShadow: isUser
              ? "0 0 20px rgba(0, 255, 255, 0.1)"
              : "0 0 20px rgba(0, 255, 0, 0.1)",
          }}
        >
          {isUser ? (
            <p className="font-mono text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    const isInline = !match

                    if (isInline) {
                      return (
                        <code className="px-1.5 py-0.5 bg-green-400/10 border border-green-400/20 rounded text-green-300 text-xs font-mono" {...props}>
                          {children}
                        </code>
                      )
                    }

                    return (
                      <CodeBlock className={className}>
                        {String(children).replace(/\n$/, "")}
                      </CodeBlock>
                    )
                  },
                  p({ children }) {
                    return <p className="text-green-300 font-sans mb-3 leading-relaxed">{children}</p>
                  },
                  ul({ children }) {
                    return <ul className="list-disc list-inside space-y-1 text-green-300 mb-3">{children}</ul>
                  },
                  ol({ children }) {
                    return <ol className="list-decimal list-inside space-y-1 text-green-300 mb-3">{children}</ol>
                  },
                  h1({ children }) {
                    return <h1 className="text-xl font-bold text-green-400 mb-3 mt-4">{children}</h1>
                  },
                  h2({ children }) {
                    return <h2 className="text-lg font-bold text-green-400 mb-2 mt-3">{children}</h2>
                  },
                  h3({ children }) {
                    return <h3 className="text-base font-bold text-green-400 mb-2 mt-2">{children}</h3>
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="border-l-4 border-green-400/50 pl-4 italic text-green-300/80 my-3">
                        {children}
                      </blockquote>
                    )
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AgentPage() {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  async function send() {
    if (!input.trim()) return

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage.content }),
      })
      const data = await res.json()

      const assistantMessage: Message = {
        role: "assistant",
        content: data.text || data.error || "No response",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Network error"
      const errorMessage: Message = {
        role: "assistant",
        content: `**Error:** ${errorMsg}`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
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
        <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="text-green-400/50 font-mono text-lg">
                    <LoadingGlyph /> Ready to assist
                  </div>
                  <p className="text-green-400/30 text-sm font-mono">
                    Start a conversation with the agent...
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message, idx) => (
                  <MessageBubble key={idx} message={message} />
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-6">
                    <div className="max-w-[85%]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono uppercase tracking-wider text-green-300">
                          Assistant
                        </span>
                      </div>
                      <div className="px-4 py-3 rounded-lg border-2 bg-green-400/5 border-green-400/30">
                        <div className="flex items-center gap-2 text-green-400">
                          <LoadingGlyph />
                          <span className="font-mono text-sm animate-pulse">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Section - Fixed at bottom */}
          <div className="border-t border-green-400/30 p-4 md:p-6 bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col gap-3">
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
                  className="w-full h-24 bg-black border-2 border-green-400/50 text-green-400
                           font-mono p-4 focus:outline-none focus:border-green-400 focus:shadow-[0_0_20px_rgba(0,255,0,0.3)]
                           placeholder-green-400/30 resize-none rounded-lg
                           caret-green-400"
                  style={{
                    textShadow: "0 0 5px rgba(0, 255, 0, 0.5)",
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400/40 font-mono">
                  {messages.length} messages
                </span>
                <button
                  onClick={send}
                  disabled={isLoading || !input.trim()}
                  className="px-6 py-2 bg-black border-2 border-green-400 text-green-400 font-mono uppercase text-sm
                           hover:bg-green-400 hover:text-black transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed
                           hover:shadow-[0_0_20px_rgba(0,255,0,0.5)] rounded"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <LoadingGlyph /> Processing
                    </span>
                  ) : (
                    "Send →"
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
