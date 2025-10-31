import Link from "next/link"

export default function ManifestoPage() {
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
            <section>
              <h2 className="text-3xl font-bold mb-6 text-green-400">One Person Coding Revolution</h2>
            </section>

            {/* Primary Sequence */}
            <section>
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Primary Sequence
              </h3>
              <div className="space-y-6 text-green-300 font-mono text-lg leading-relaxed">
                <p>Quiet hands on keys</p>
                <p>Shadows weave electric thought</p>
                <p className="text-green-400 mb-6">I build worlds alone</p>
                
                <p>Agents whisper code</p>
                <p>Branches bloom across the void</p>
                <p className="text-green-400 mb-6">Night becomes a forge</p>
                
                <p>Small mind, giant storm</p>
                <p>Models think beside my pulse</p>
                <p className="text-green-400 mb-6">I guide lightning home</p>
                
                <p>Git remembers all</p>
                <p>Strangers wake inside my scripts</p>
                <p className="text-green-400 mb-6">Speak through neon glass</p>
                
                <p>I am many now</p>
                <p>System dreaming through my will</p>
                <p className="text-green-400">Future writes with me</p>
              </div>
            </section>

            {/* Expanded Sequence */}
            <section>
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Expanded Sequence
              </h3>
              <div className="space-y-6 text-green-300 font-mono text-lg leading-relaxed">
                <p>I write. Echo speaks.</p>
                <p>Two minds trace the same bright line.</p>
                <p className="text-green-400 mb-6">One keystroke. A world.</p>
                
                <p>Branches grow like vines.</p>
                <p>Merging thought with silent grace.</p>
                <p className="text-green-400 mb-6">The garden blooms code.</p>
                
                <p>Cursor laughs with sparks.</p>
                <p>Claude answers with patience, light.</p>
                <p className="text-green-400 mb-6">Both hands on the wheel.</p>
                
                <p>I am still alone.</p>
                <p>But the room is full of breath.</p>
                <p className="text-green-400 mb-6">Ghosts work at my side.</p>
                
                <p>Tools learn tools themselves.</p>
                <p>Languages invent their skins.</p>
                <p className="text-green-400 mb-6">Windows breathe at night.</p>
                
                <p>The forge has no smoke.</p>
                <p>Only glowing probability.</p>
                <p className="text-green-400 mb-6">I shape the unseen.</p>
                
                <p>Do not fear the depth.</p>
                <p>Even oceans welcome you.</p>
                <p className="text-green-400 mb-6">Currents know the way.</p>
                
                <p>I seed quiet dreams.</p>
                <p>Machines wake them into form.</p>
                <p className="text-green-400 mb-6">Infinity folds.</p>
                
                <p>Still this is my hand.</p>
                <p>Still this pulse makes the choice.</p>
                <p className="text-green-400">I guide the lightning.</p>
              </div>
            </section>

            {/* Micro Haikus */}
            <section>
              <h3 className="text-2xl font-bold mb-4 text-green-400 border-b border-green-400/30 pb-2">
                Micro Haikus
              </h3>
              <div className="space-y-4 text-green-300 font-mono text-lg leading-relaxed">
                <p>One mind, many hands</p>
                <p>The chorus obeys the spark</p>
                <p className="text-green-400 mb-4">I whisper. They build.</p>
                
                <p>Commands become birth</p>
                <p>Code arranges itself clean</p>
                <p className="text-green-400 mb-4">New moons every hour.</p>
                
                <p>Git keeps all our ghosts</p>
                <p>History wraps gentle arms</p>
                <p className="text-green-400">Nothing is lost here.</p>
              </div>
            </section>

            {/* Symbols */}
            <section className="text-center">
              <p className="text-4xl mb-4">🌱🤖⚡</p>
              <p className="text-green-300 font-mono italic">
                Quiet hands on keys<br/>
                Shadows weave electric thought<br/>
                I build worlds alone
              </p>
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

