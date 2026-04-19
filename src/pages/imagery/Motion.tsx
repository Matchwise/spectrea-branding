import { useState, useCallback } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { AnimatedLogo } from '../../components/brand/SpectreaLogo'
import { TbBell, TbChevronDown, TbX } from 'react-icons/tb'

/* ------------------------------------------------------------------ */
/*  Easing SVG curves                                                  */
/* ------------------------------------------------------------------ */

function EasingCurve({ name, d, color = '#4271DF' }: { name: string; d: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="0" y="0" width="80" height="80" rx="8" fill="#F4F4F1" stroke="#E5E7EB" strokeWidth="1" />
        {/* Axes */}
        <line x1="12" y1="68" x2="68" y2="68" stroke="#E5E7EB" strokeWidth="1" />
        <line x1="12" y1="12" x2="12" y2="68" stroke="#E5E7EB" strokeWidth="1" />
        {/* Linear reference */}
        <line x1="12" y1="68" x2="68" y2="12" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2 2" />
        {/* Curve */}
        <path d={d} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-xs font-mono text-stone-500">{name}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Duration demo — animated bars                                      */
/* ------------------------------------------------------------------ */

function DurationDemo() {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const play = useCallback(() => {
    setKey(k => k + 1)
    setPlaying(true)
    setTimeout(() => setPlaying(false), 800)
  }, [])

  const tiers = [
    { name: 'Instant', ms: 100, tw: 'duration-100', color: '#4271DF' },
    { name: 'Quick', ms: 150, tw: 'duration-150', color: '#4271DF' },
    { name: 'Normal', ms: 200, tw: 'duration-200', color: '#00B6A0' },
    { name: 'Slow', ms: 300, tw: 'duration-300', color: '#E19000' },
  ]

  return (
    <div className="border border-stone-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-stone-700">Duration comparison</p>
        <button
          onClick={play}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
          style={{ backgroundColor: '#4271DF' }}
        >
          Play
        </button>
      </div>
      <div className="space-y-3">
        {tiers.map(t => (
          <div key={`${t.name}-${key}`} className="flex items-center gap-3">
            <div className="w-16 flex-shrink-0">
              <span className="text-xs font-semibold text-stone-600">{t.name}</span>
              <p className="text-[10px] font-mono text-stone-400">{t.ms}ms</p>
            </div>
            <div className="flex-1 h-6 bg-stone-100 rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: t.color,
                  width: playing ? '100%' : '0%',
                  transition: `width ${t.ms}ms ease-out`,
                }}
              />
            </div>
            <span className="text-[10px] font-mono text-stone-400 w-20 flex-shrink-0">{t.tw}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Interactive pattern demos                                          */
/* ------------------------------------------------------------------ */

function HoverScaleDemo() {
  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Hover Scale</p>
      <div className="border border-stone-200 rounded-xl p-4 bg-white transition-transform duration-150 ease-out hover:scale-[1.02] cursor-pointer select-none">
        <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Sample card</p>
        <p className="text-xs text-stone-500 mt-1">12 connections · 94% confidence</p>
      </div>
      <span className="text-[10px] font-mono text-stone-400">scale(1.02) · 150ms · ease-out</span>
    </div>
  )
}

function FadeInDemo() {
  const [visible, setVisible] = useState(true)
  const [key, setKey] = useState(0)

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Fade In</p>
      <div className="h-16 flex items-center justify-center">
        <div
          key={key}
          className="bg-brand/10 border border-brand/20 rounded-lg px-4 py-2 flex items-center gap-2"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 200ms ease-out',
          }}
        >
          <TbBell size={16} className="text-brand" />
          <span className="text-xs text-brand font-medium">New connection found</span>
        </div>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => { setKey(k => k + 1); setVisible(true) }, 250) }}
        className="text-[10px] font-mono text-stone-400 hover:text-brand transition-colors cursor-pointer"
      >
        replay · 200ms · ease-out
      </button>
    </div>
  )
}

function SlideDownDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Slide Down</p>
      <div className="w-48">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-stone-200 text-sm text-stone-700 bg-white hover:bg-stone-50 transition-colors"
        >
          <span className="text-xs">Select type</span>
          <TbChevronDown
            size={14}
            className="text-stone-400 transition-transform duration-200"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-200 ease-in-out"
          style={{
            maxHeight: open ? '120px' : '0px',
            opacity: open ? 1 : 0,
          }}
        >
          <div className="mt-1 border border-stone-200 rounded-lg bg-white shadow-md overflow-hidden">
            {['Category A', 'Category B', 'Category C'].map((item, i) => (
              <button key={item} onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-xs text-stone-700 hover:bg-stone-50 transition-colors" style={{ borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <span className="text-[10px] font-mono text-stone-400">maxHeight · 200ms · ease-in-out</span>
    </div>
  )
}

function ScaleUpDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Scale Up (Modal)</p>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors"
        style={{ backgroundColor: '#4271DF' }}
      >
        Open modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-0 bg-black/30 transition-opacity duration-200"
            style={{ animation: 'fadeIn 200ms ease-out' }}
          />
          <div
            className="relative bg-white rounded-xl shadow-xl p-6 w-72"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'scaleUp 200ms ease-out' }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Create</p>
              <button onClick={() => setOpen(false)} className="text-stone-400 hover:text-stone-600 transition-colors">
                <TbX size={16} />
              </button>
            </div>
            <p className="text-xs text-stone-500 mb-4">This modal opened with scale(0.95→1) + fade. 200ms ease-out.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-stone-500 border border-stone-200">Cancel</button>
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 rounded-lg text-xs text-white" style={{ backgroundColor: '#4271DF' }}>Create</button>
            </div>
          </div>
        </div>
      )}
      <span className="text-[10px] font-mono text-stone-400">scale(0.95→1) + fade · 200ms</span>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

function ColorTransitionDemo() {
  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Button States</p>
      <div className="flex gap-3">
        <button className="px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-150 ease-out hover:brightness-90 active:brightness-75" style={{ backgroundColor: '#4271DF' }}>
          Primary
        </button>
        <button className="px-4 py-2 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 transition-all duration-150 ease-out hover:bg-stone-200 active:bg-stone-300">
          Secondary
        </button>
        <button className="px-4 py-2 rounded-lg text-xs font-medium text-stone-500 border border-stone-200 transition-all duration-150 ease-out hover:border-stone-300 hover:bg-stone-50">
          Ghost
        </button>
      </div>
      <span className="text-[10px] font-mono text-stone-400">background-color · 150ms · ease-out</span>
    </div>
  )
}

function FocusRingDemo() {
  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Focus Ring</p>
      <input
        type="text"
        placeholder="Tab to focus..."
        className="px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white text-stone-700 placeholder:text-pewter transition-all duration-150 ease-out focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 w-48"
      />
      <span className="text-[10px] font-mono text-stone-400">border + ring · 150ms · ease-out</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Signature motion primitives — node arrival / edge formation / spectrum shift */
/* ------------------------------------------------------------------ */

const SPECTRUM_COLORS = ['#4271DF', '#00B6A0', '#E19000', '#F24260'] as const

function SignaturePrimitiveCard({
  label,
  duration,
  trigger,
  spec,
  demo,
}: {
  label: string
  duration: string
  trigger: string
  spec: string
  demo: React.ReactNode
}) {
  return (
    <div className="border border-stone-200 rounded-xl overflow-hidden flex flex-col">
      <div className="bg-stone-50 px-4 py-2 border-b border-stone-200 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">{label}</span>
        <span className="text-[10px] font-mono text-stone-400">{duration}</span>
      </div>
      <div className="bg-canvas h-40 flex items-center justify-center">{demo}</div>
      <div className="px-4 py-3 border-t border-stone-100 space-y-1.5">
        <p className="text-xs"><span className="text-stone-400">Trigger:</span> <span className="text-stone-700">{trigger}</span></p>
        <p className="text-xs text-stone-500 leading-relaxed">{spec}</p>
      </div>
    </div>
  )
}

function NodeArrivalDemo() {
  const [key, setKey] = useState(0)
  const [colorIdx, setColorIdx] = useState(0)
  const play = useCallback(() => {
    setColorIdx(i => (i + 1) % SPECTRUM_COLORS.length)
    setKey(k => k + 1)
  }, [])
  const color = SPECTRUM_COLORS[colorIdx]
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes spectrea-node-arrival {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes spectrea-node-pulse {
          0% { transform: scale(0.4); opacity: 0; }
          50% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
      <div key={`pulse-${key}`} className="absolute" style={{ width: 32, height: 32, borderRadius: '50%', background: color, animation: 'spectrea-node-pulse 600ms cubic-bezier(0.22, 1, 0.36, 1) forwards', animationDelay: '120ms' }} />
      <div key={`node-${key}`} className="relative z-10" style={{ width: 32, height: 32, borderRadius: '50%', background: color, animation: 'spectrea-node-arrival 400ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }} />
      <button onClick={play} className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors font-mono">Play</button>
    </div>
  )
}

function EdgeFormationDemo() {
  const [key, setKey] = useState(0)
  const play = useCallback(() => setKey(k => k + 1), [])
  return (
    <div className="relative w-full h-full">
      <style>{`
        @keyframes spectrea-edge-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg viewBox="0 0 240 100" className="w-full h-full">
        <defs>
          <linearGradient id={`spectrea-edge-gradient-${key}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4271DF" />
            <stop offset="50%" stopColor="#00B6A0" />
            <stop offset="100%" stopColor="#E19000" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="50" r="14" fill="#4271DF" />
        <circle cx="200" cy="50" r="14" fill="#E19000" />
        <path
          key={key}
          d="M 54 50 C 100 20, 140 80, 186 50"
          stroke={`url(#spectrea-edge-gradient-${key})`}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 200,
            strokeDashoffset: 200,
            animation: 'spectrea-edge-draw 300ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        />
      </svg>
      <button onClick={play} className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors font-mono">Play</button>
    </div>
  )
}

function SpectrumShiftDemo() {
  const [key, setKey] = useState(0)
  const play = useCallback(() => setKey(k => k + 1), [])
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <style>{`
        @keyframes spectrea-spectrum-shift {
          0% { background-position: 0% 50%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { background-position: 100% 50%; opacity: 0; }
        }
      `}</style>
      <div className="text-[11px] text-stone-400 font-mono mb-2 absolute top-3 left-3">Spectrum sweep — the brand's signature moment</div>
      <div
        key={key}
        className="w-3/4 rounded-full"
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000, #F24260, #F24260, #E19000, #00B6A0, #4271DF)',
          backgroundSize: '400% 100%',
          animation: 'spectrea-spectrum-shift 600ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
        }}
      />
      <button onClick={play} className="absolute bottom-2 right-2 text-[10px] px-2 py-1 rounded bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors font-mono">Play</button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Motion() {
  return (
    <PageShell
      title="Motion"
      subtitle="How Spectrea moves — purposeful, subtle, natural, and alive. Motion is feedback, not decoration."
    >
      {/* ─── Philosophy ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Motion in Spectrea should feel natural and purposeful. It guides attention, confirms actions, and creates continuity — never decorates or distracts.">
            <span>Motion Philosophy</span>
          </Tooltip>
        </h2>
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Purposeful, Subtle, Natural — and Alive</p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#B0B0B6' }}>
            Every animation must answer: "What does this help the user understand?" If the answer is "nothing," remove it.
            Most interactive motion stays restrained (150–300ms hovers, focus, state changes).
            Three signature primitives below carry the brand's "alive, growing, compounding" claim — used purposefully, not decoratively.
          </p>
        </div>
      </Section>

      {/* ─── Signature Motion Primitives ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Three brand-distinctive motion patterns. Reusable across any Spectrea surface — used at meaningful moments, not decoratively. Each carries one part of the 'alive, growing, compounding' brand claim.">
            <span>Signature Motion Primitives</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          Three reusable motion patterns that carry the brand's <em>alive, growing, compounding</em> claim. They are pattern-level, not surface-specific — apply them anywhere a moment fits the meaning. Standard interactive motion (hovers, focus, state transitions) stays restrained at 150–200ms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SignaturePrimitiveCard
            label="1. Arrival"
            duration="~400ms"
            trigger="When something important enters the frame — a new card, a fresh result, an inserted item."
            spec="Scale from 0 with soft elastic settle, then a brief radial pulse in a brand spectrum colour. Reads as 'something just arrived and is alive.'"
            demo={<NodeArrivalDemo />}
          />
          <SignaturePrimitiveCard
            label="2. Formation"
            duration="~300ms"
            trigger="When two things visibly connect — a line, a link, a relationship being shown."
            spec="A curved stroke draws between two points with the spectrum gradient running along the line, then settles to its resting colour. Echoes the curve in the brand mark."
            demo={<EdgeFormationDemo />}
          />
          <SignaturePrimitiveCard
            label="3. Spectrum sweep"
            duration="~600ms"
            trigger="The brand's signature moment — used sparingly when something meaningful happens that deserves the brand's full voice."
            spec={"A thin gradient strip traverses Cobalt → Teal → Amber → Rose. Spectrea's most distinctive motion. Reserve for moments that matter — overuse dilutes it."}
            demo={<SpectrumShiftDemo />}
          />
        </div>

        <p className="text-xs text-stone-500 mt-4 leading-relaxed">
          Use sparingly. Spectrum sweep in particular is reserved for moments that genuinely matter — restraint is what makes the signature feel like a signature.
        </p>
      </Section>

      {/* ─── Principles ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              principle: 'Guide, don\'t decorate',
              description: 'Animation draws attention to what changed or where to look next. Never exists for its own sake.',
            },
            {
              principle: 'Fast and responsive',
              description: 'Interactions feel instant. Most transitions complete in 150–300ms. Delays make the interface sluggish.',
            },
            {
              principle: 'Reduce, don\'t add',
              description: 'Respect prefers-reduced-motion. All animation is optional. The app works perfectly without it.',
            },
            {
              principle: 'Continuity over spectacle',
              description: 'Transitions maintain context. Users always know where they came from and where they\'re going.',
            },
          ].map(item => (
            <div key={item.principle} className="border border-stone-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-stone-800">{item.principle}</p>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Easing Curves ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Spectrea uses two easing functions. ease-out for entrances (fast start, gentle landing). ease-in-out for layout shifts (smooth acceleration and deceleration).">
            <span>Easing Curves</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <EasingCurve
            name="ease-out"
            d="M 12 68 C 12 30, 30 12, 68 12"
            color="#4271DF"
          />
          <EasingCurve
            name="ease-in-out"
            d="M 12 68 C 12 68, 20 12, 68 12"
            color="#00B6A0"
          />
          <div className="flex flex-col items-center justify-center text-center px-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-800">ease-out</strong> for entrances and responses — fast start, gentle landing. Feels reactive.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed mt-2">
              <strong className="text-stone-800">ease-in-out</strong> for layout changes — smooth acceleration and deceleration. Feels controlled.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── Duration Scale ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every animation uses one of these four durations. Consistent timing creates rhythm.">
            <span>Duration Scale</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            {[
              { name: 'Instant', duration: '100ms', easing: 'ease-out', use: 'Color changes, opacity, icon swaps', tw: 'duration-100' },
              { name: 'Quick', duration: '150ms', easing: 'ease-out', use: 'Button hover, tooltip, focus ring', tw: 'duration-150' },
              { name: 'Normal', duration: '200ms', easing: 'ease-in-out', use: 'Card hover, dropdown, sidebar', tw: 'duration-200' },
              { name: 'Slow', duration: '300ms', easing: 'ease-in-out', use: 'Page transitions, modal, large shifts', tw: 'duration-300' },
            ].map((row, i) => (
              <div key={row.name} className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
                <div className="w-14 flex-shrink-0">
                  <span className="text-sm font-semibold text-stone-700">{row.name}</span>
                </div>
                <div className="w-12 flex-shrink-0">
                  <span className="text-xs font-mono text-brand">{row.duration}</span>
                </div>
                <div className="w-20 flex-shrink-0">
                  <span className="text-xs font-mono text-stone-500">{row.easing}</span>
                </div>
                <span className="text-xs text-stone-600 flex-1">{row.use}</span>
              </div>
            ))}
          </div>
          <DurationDemo />
        </div>
      </Section>

      {/* ─── Live Pattern Demos ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Interactive Demos</h2>
        <p className="text-sm text-stone-600 mb-4">Hover, click, and tab through these to see the motion system in action.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <HoverScaleDemo />
          <FadeInDemo />
          <SlideDownDemo />
          <ScaleUpDemo />
          <ColorTransitionDemo />
          <FocusRingDemo />
        </div>
      </Section>

      {/* ─── Brand Animation ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The logo animation is Spectrea's signature motion. The spectrum stroke draws along the S connecting the dots — the brand story in motion.">
            <span>Signature Animation</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-stone-600 mb-4">The connecting-dots logo animation is the brand's motion signature. Use for loading states, hero animations, and motion assets.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-white p-8 flex items-center justify-center">
              <AnimatedLogo size={160} duration={3} dotColorMode="grey" />
            </div>
            <div className="px-4 py-3 bg-stone-50 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-600">On light</p>
              <p className="text-xs text-stone-400 mt-0.5">Spectrum stroke, grey dots. Default treatment.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-ink p-8 flex items-center justify-center">
              <AnimatedLogo size={160} duration={3} dotColorMode="grey" />
            </div>
            <div className="px-4 py-3 bg-stone-50 border-t border-stone-100">
              <p className="text-xs font-semibold text-stone-600">On dark</p>
              <p className="text-xs text-stone-400 mt-0.5">Spectrum stroke on dark. The gradient is the point — always use spectrum, never monochrome.</p>
            </div>
          </div>
        </div>
        <div className="mt-3 border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Duration', value: '3 seconds', note: 'Full draw + pause + dissolve loop' },
            { prop: 'Easing', value: 'ease-in-out', note: 'Smooth start and finish for the stroke draw' },
            { prop: 'Loop', value: 'Infinite', note: 'Restarts after dissolve. No jarring jump.' },
            { prop: 'Use cases', value: 'Loading, hero, splash', note: 'Never for inline UI — too prominent' },
          ].map((row, i) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < 3 ? '1px solid #F3F4F6' : 'none' }}>
              <span className="text-sm font-medium text-stone-700">{row.prop}</span>
              <span className="text-xs font-mono text-stone-600">{row.value}</span>
              <span className="text-xs text-stone-500">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CSS Reference ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">CSS Reference</h2>
        <div className="bg-ink rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: '#B0B0B6' }}>{'/* Duration tokens */\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--duration-instant: 100ms;\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--duration-quick:   150ms;\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--duration-normal:  200ms;\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--duration-slow:    300ms;\n\n'}</span>
            <span style={{ color: '#B0B0B6' }}>{'/* Easing tokens */\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--ease-out:    cubic-bezier(0, 0, 0.2, 1);\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{'--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n'}</span>
            <span style={{ color: '#B0B0B6' }}>{'/* Common patterns */\n'}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { transition: transform 150ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale:hover'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { transform: scale(1.02); }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.fade-in'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { animation: fadeIn 200ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes fadeIn'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { from { opacity: 0; } }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.scale-up'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { animation: scaleUp 200ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes scaleUp'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { from { opacity: 0; transform: scale(0.95); } }'}</span>
          </pre>
        </div>
      </Section>

      {/* ─── Accessibility ─── */}
      <Section title="Motion Accessibility">
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-stone-700 leading-relaxed mb-3">
            All animations must respect <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">prefers-reduced-motion</code>. When enabled:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Disable all transform animations (scale, translate)',
              'Disable all opacity transitions',
              'Instant state changes (no easing)',
              'Loading spinners may remain (essential feedback)',
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-stone-100">
                <span className="text-xs font-semibold text-stone-400 mt-px">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-xs text-stone-600">{rule}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-ink rounded-lg px-4 py-3">
            <pre className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#B0B0B6' }}>
              <span style={{ color: '#E19000' }}>{'@media'}</span>
              <span style={{ color: '#F4F4F1' }}>{' (prefers-reduced-motion: reduce) {\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'  *, *::before, *::after {\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    animation-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    transition-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'  }\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'}'}</span>
            </pre>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
