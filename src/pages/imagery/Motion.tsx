import { useState, useCallback } from 'react'
import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { AnimatedLogo } from '../../components/brand/SpectreaLogo'
import { brandTokens, logo } from '../../data/brand'
import { TbBell, TbChevronDown, TbX } from 'react-icons/tb'

// Every duration and easing on this page is READ from canon (brand.ts
// brandTokens.motion) — the page previously re-declared its own four-tier
// scale, taught two easings, and hand-drew curves that matched neither.
const M = brandTokens.motion.durationsMs
const E = brandTokens.motion.easings
const RING = brandTokens.focusRing

// Even page CHROME on this page reads canon — Tailwind's transition-*
// utilities ship their own default duration/easing, which is exactly the
// kind of shadow value this page exists to eliminate.
const chromeTransition = {
  transition: `background-color ${M.standard}ms ${E.easeOut.css}, border-color ${M.standard}ms ${E.easeOut.css}, color ${M.standard}ms ${E.easeOut.css}`,
}

// The AnimatedLogo loop spec is canon (logo.animation, ratified 2026-08-09,
// decision 27) — deliberately the logo's own spec, outside the UI motion
// tokens. The Signature Animation table renders it.
const ANIM = logo.animation

/* ------------------------------------------------------------------ */
/*  Easing SVG curves — plotted FROM the canonical cubic-bezier values  */
/* ------------------------------------------------------------------ */

// Plot region: x 12→68 (time), y 68→26 (progress 0→1). The progress-1
// line sits at y=26 so elasticSettle's 1.56 overshoot stays inside the
// tile instead of clipping.
const PLOT = { x0: 12, x1: 68, y0: 68, span: 42 }

function bezierPath(css: string): string {
  const nums = css.match(/-?[\d.]+/g)
  if (!nums || nums.length !== 4) return ''
  const [x1, y1, x2, y2] = nums.map(Number)
  const px = (t: number) => PLOT.x0 + (PLOT.x1 - PLOT.x0) * t
  const py = (p: number) => PLOT.y0 - PLOT.span * p
  return `M ${PLOT.x0} ${PLOT.y0} C ${px(x1)} ${py(y1)}, ${px(x2)} ${py(y2)}, ${PLOT.x1} ${py(1)}`
}

function EasingCurve({ name, css, color = '#4271DF' }: { name: string; css: string; color?: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <rect x="0" y="0" width="80" height="80" rx="8" fill="#F4F4F1" stroke="#E7E5E4" strokeWidth="1" />
        {/* Axes + progress-1 line */}
        <line x1="12" y1="68" x2="68" y2="68" stroke="#E7E5E4" strokeWidth="1" />
        <line x1="12" y1="12" x2="12" y2="68" stroke="#E7E5E4" strokeWidth="1" />
        <line x1="12" y1="26" x2="68" y2="26" stroke="#E7E5E4" strokeWidth="1" />
        {/* Linear reference */}
        <line x1="12" y1="68" x2="68" y2="26" stroke="#E7E5E4" strokeWidth="1" strokeDasharray="2 2" />
        {/* The canonical curve, computed from its control points */}
        <path d={bezierPath(css)} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <span className="text-xs font-mono text-slate">{name}</span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Duration demo — animated bars (the four interactive tiers)          */
/* ------------------------------------------------------------------ */

const TIER_COLORS: Record<string, string> = {
  micro: '#4271DF', standard: '#4271DF', comfortable: '#00B6A0', deliberate: '#E19000',
}

function DurationDemo() {
  const [playing, setPlaying] = useState(false)
  const [key, setKey] = useState(0)

  const play = useCallback(() => {
    // Remount the bars at width 0, THEN grow on a later frame — flipping
    // width in the same render as the remount would mount them already at
    // 100% and nothing would transition. Bars hold full until the next play.
    setPlaying(false)
    setKey(k => k + 1)
    requestAnimationFrame(() => requestAnimationFrame(() => setPlaying(true)))
  }, [])

  const tiers = (['micro', 'standard', 'comfortable', 'deliberate'] as const).map(name => ({
    name, ms: M[name], color: TIER_COLORS[name],
  }))

  return (
    <div className="border border-stone-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-iron">Duration comparison</p>
        <button
          onClick={play}
          style={chromeTransition}
          className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand hover:bg-brand-hover active:bg-brand-active btn-focus"
        >
          Play
        </button>
      </div>
      <div className="space-y-3">
        {tiers.map(t => (
          <div key={`${t.name}-${key}`} className="flex items-center gap-3">
            <div className="w-24 flex-shrink-0">
              <span className="text-xs font-semibold text-iron">{t.name}</span>
              <p className="text-xs font-mono text-slate">{t.ms}ms</p>
            </div>
            <div className="flex-1 h-6 bg-cloud rounded-full overflow-hidden relative">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: t.color,
                  width: playing ? '100%' : '0%',
                  transition: `width ${t.ms}ms ${E.easeOut.css}`,
                }}
              />
            </div>
            <span className="text-xs font-mono text-slate w-32 flex-shrink-0">--duration-{t.name}</span>
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
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Hover Scale</p>
      <div
        className="border border-stone-200 rounded-xl p-4 bg-white hover:scale-[1.02] cursor-pointer select-none"
        style={{ transition: `transform ${M.standard}ms ${E.easeOut.css}` }}
      >
        <p className="text-sm font-semibold text-ink" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Sample card</p>
        <p className="text-xs text-slate mt-1">12 connections · 94% confidence</p>
      </div>
      <span className="text-xs font-mono text-slate">scale(1.02) · {M.standard}ms · ease-out</span>
    </div>
  )
}

function FadeInDemo() {
  const [visible, setVisible] = useState(true)
  const [key, setKey] = useState(0)

  const replay = useCallback(() => {
    // Remount hidden, then reveal on a later frame so the opacity 0 → 1
    // transition actually runs — the old version faded OUT and then
    // remounted already visible, never demonstrating a fade-in.
    setKey(k => k + 1)
    setVisible(false)
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
  }, [])

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Fade In</p>
      <div className="h-16 flex items-center justify-center">
        <div
          key={key}
          className="bg-brand/10 border border-brand/20 rounded-lg px-4 py-2 flex items-center gap-2"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity ${M.comfortable}ms ${E.easeOut.css}`,
          }}
        >
          <TbBell size={16} className="text-brand" />
          <span className="text-xs text-brand font-medium">New connection found</span>
        </div>
      </div>
      <button
        onClick={replay}
        style={chromeTransition}
        className="text-xs font-mono text-slate hover:text-brand cursor-pointer btn-focus"
      >
        replay · {M.comfortable}ms · ease-out
      </button>
    </div>
  )
}

function SlideDownDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Slide Down</p>
      <div className="w-48">
        <button
          onClick={() => setOpen(o => !o)}
          style={chromeTransition}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-stone-200 text-sm text-iron bg-white hover:bg-cloud btn-focus"
        >
          <span className="text-xs">Select type</span>
          <TbChevronDown
            size={14}
            className="text-slate"
            // The chevron toggles back and forth — canon's ease-in-out case.
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: `transform ${M.comfortable}ms ${E.easeInOut.css}` }}
          />
        </button>
        <div
          className="overflow-hidden"
          // The panel ENTERS — canon default is ease-out, not ease-in-out.
          style={{
            maxHeight: open ? '120px' : '0px',
            opacity: open ? 1 : 0,
            transition: `max-height ${M.comfortable}ms ${E.easeOut.css}, opacity ${M.comfortable}ms ${E.easeOut.css}`,
          }}
        >
          <div className="mt-1 border border-stone-200 rounded-lg bg-white shadow-md overflow-hidden">
            {['Category A', 'Category B', 'Category C'].map((item, i) => (
              <button key={item} onClick={() => setOpen(false)} className="w-full text-left px-3 py-2 text-xs text-iron hover:bg-cloud btn-focus" style={{ ...chromeTransition, borderBottom: i < 2 ? '1px solid #F5F5F4' : 'none' }}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      <span className="text-xs font-mono text-slate">maxHeight · {M.comfortable}ms · ease-out</span>
    </div>
  )
}

function ScaleUpDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Scale Up (Modal)</p>
      <button
        onClick={() => setOpen(true)}
        style={chromeTransition}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-brand hover:bg-brand-hover active:bg-brand-active btn-focus"
      >
        Open modal
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-0 bg-black/30"
            style={{ animation: `fadeIn ${M.comfortable}ms ${E.easeOut.css}` }}
          />
          <div
            className="relative bg-white rounded-xl shadow-xl p-6 w-72"
            onClick={e => e.stopPropagation()}
            style={{ animation: `scaleUp ${M.comfortable}ms ${E.easeOut.css}` }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-ink" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Create</p>
              <button onClick={() => setOpen(false)} aria-label="Close" style={chromeTransition} className="text-slate hover:text-iron btn-focus">
                <TbX size={16} />
              </button>
            </div>
            <p className="text-xs text-slate mb-4">This modal opened with scale(0.95→1) + fade. {M.comfortable}ms ease-out.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} style={chromeTransition} className="px-3 py-1.5 rounded-lg text-xs text-slate border border-stone-200 btn-focus hover:bg-cloud">Cancel</button>
              <button onClick={() => setOpen(false)} style={chromeTransition} className="px-3 py-1.5 rounded-lg text-xs text-white bg-brand hover:bg-brand-hover active:bg-brand-active btn-focus">Create</button>
            </div>
          </div>
        </div>
      )}
      <span className="text-xs font-mono text-slate">scale(0.95→1) + fade · {M.comfortable}ms · ease-out</span>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  )
}

function ColorTransitionDemo() {
  const btnTransition = { transition: `background-color ${M.standard}ms ${E.easeOut.css}, border-color ${M.standard}ms ${E.easeOut.css}` }
  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Button States</p>
      <div className="flex gap-3">
        <button style={btnTransition} className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-brand hover:bg-brand-hover active:bg-brand-active btn-focus">
          Primary
        </button>
        <button style={btnTransition} className="px-4 py-2 rounded-lg text-xs font-medium text-iron bg-cloud hover:bg-stone-200 active:bg-stone-300 btn-focus">
          Secondary
        </button>
        <button style={btnTransition} className="px-4 py-2 rounded-lg text-xs font-medium text-slate border border-stone-200 hover:border-stone-300 hover:bg-cloud btn-focus">
          Ghost
        </button>
      </div>
      <span className="text-xs font-mono text-slate">background-color · {M.standard}ms · ease-out</span>
    </div>
  )
}

function FocusRingDemo() {
  // The canonical Amber attention ring (brandTokens.focusRing) — this demo
  // previously showed a Cobalt ring that exists nowhere in canon.
  return (
    <div className="border border-stone-200 rounded-xl p-5 flex flex-col items-center gap-3">
      <p className="text-xs font-semibold text-slate uppercase tracking-wider">Focus Ring</p>
      <input
        type="text"
        placeholder="Tab to focus..."
        className="px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white text-iron placeholder:text-pewter btn-focus w-48"
        style={{ transition: `border-color ${M.standard}ms ${E.easeOut.css}` }}
      />
      <span className="text-xs font-mono text-slate">{RING.width} {RING.light} · offset {RING.offset}</span>
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
      <div className="bg-cloud px-4 py-2 border-b border-stone-200 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate">{label}</span>
        <span className="text-xs font-mono text-slate">{duration}</span>
      </div>
      <div className="bg-canvas h-40 flex items-center justify-center">{demo}</div>
      <div className="px-4 py-3 border-t border-stone-100 space-y-1.5">
        <p className="text-xs"><span className="text-slate">Trigger:</span> <span className="text-iron">{trigger}</span></p>
        <p className="text-xs text-slate leading-relaxed">{spec}</p>
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
      {/* The pulse starts 30% into the arrival — a choreography ratio; the timing itself comes from canon. */}
      <div key={`pulse-${key}`} className="absolute" style={{ width: 32, height: 32, borderRadius: '50%', background: color, animation: `spectrea-node-pulse ${M.arrival}ms ${E.easeOut.css} forwards`, animationDelay: `${Math.round(M.arrival * 0.3)}ms` }} />
      <div key={`node-${key}`} className="relative z-10" style={{ width: 32, height: 32, borderRadius: '50%', background: color, animation: `spectrea-node-arrival ${M.arrival}ms ${E.elasticSettle.css} forwards` }} />
      <button onClick={play} style={chromeTransition} className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-cloud text-slate hover:bg-stone-200 font-mono btn-focus">Play</button>
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
            animation: `spectrea-edge-draw ${M.formation}ms ${E.easeOut.css} forwards`,
          }}
        />
      </svg>
      <button onClick={play} style={chromeTransition} className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-cloud text-slate hover:bg-stone-200 font-mono btn-focus">Play</button>
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
      <div className="text-xs text-slate font-mono mb-2 absolute top-3 left-3">Spectrum sweep — the brand's signature moment</div>
      <div
        key={key}
        className="w-3/4 rounded-full"
        style={{
          height: 4,
          background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000, #F24260, #F24260, #E19000, #00B6A0, #4271DF)',
          backgroundSize: '400% 100%',
          // A continuous traverse — canon's ease-in-out case.
          animation: `spectrea-spectrum-shift ${M.spectrumSweep}ms ${E.easeInOut.css} forwards`,
        }}
      />
      <button onClick={play} style={chromeTransition} className="absolute bottom-2 right-2 text-xs px-2 py-1 rounded bg-cloud text-slate hover:bg-stone-200 font-mono btn-focus">Play</button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

// Page-authored usage EXAMPLES per tier (canon binds names and ms; it does
// not bind surfaces to tiers). The three primitive tiers point at their
// primitives, whose ms these are.
const DURATION_USE: Record<string, string> = {
  micro: 'Colour changes, opacity, icon swaps',
  standard: 'Button hover, tooltip, focus ring',
  comfortable: 'Card hover, dropdown, modal, sidebar',
  deliberate: 'Page transitions, large layout shifts',
  arrival: 'Arrival primitive (below)',
  formation: 'Formation primitive (below)',
  spectrumSweep: 'Spectrum sweep primitive (below)',
}

export default function Motion() {
  const easingRows = [
    { name: 'ease-out', css: E.easeOut.css, use: E.easeOut.use, color: '#4271DF' },
    { name: 'ease-in-out', css: E.easeInOut.css, use: E.easeInOut.use, color: '#00B6A0' },
    { name: 'elastic-settle', css: E.elasticSettle.css, use: E.elasticSettle.use, color: '#E19000' },
  ]

  return (
    <PageShell
      title="Motion"
      subtitle="How Spectrea moves — purposeful, subtle, natural, and alive. Motion is feedback, not decoration."
    >
      {/* ─── Philosophy ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Motion in Spectrea should feel natural and purposeful. It guides attention, confirms actions, and creates continuity — never decorates or distracts.">
            <span>Motion Philosophy</span>
          </Tooltip>
        </h2>
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Purposeful, Subtle, Natural — and Alive</p>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#B0B0B6' }}>
            Every animation must answer: "What does this help the user understand?" If the answer is "nothing," remove it.
            Most interactive motion stays restrained ({M.micro}–{M.deliberate}ms hovers, focus, state changes).
            Three signature primitives below carry the brand's "alive, growing, compounding" claim — used purposefully, not decoratively.
          </p>
        </div>
      </Section>

      {/* ─── Signature Motion Primitives ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-2">
          <Tooltip content="Three brand-distinctive motion patterns. Reusable across any Spectrea surface — used at meaningful moments, not decoratively. Each carries one part of the 'alive, growing, compounding' brand claim.">
            <span>Signature Motion Primitives</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-5 leading-relaxed">
          Three reusable motion patterns that carry the brand's <em>alive, growing, compounding</em> claim. They are pattern-level, not surface-specific — apply them anywhere a moment fits the meaning. Standard interactive motion (hovers, focus, state transitions) stays restrained at {M.standard}–{M.comfortable}ms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SignaturePrimitiveCard
            label="1. Arrival"
            duration={`${M.arrival}ms`}
            trigger="When something important enters the frame — a new card, a fresh result, an inserted item."
            spec="Scale from 0 with the elastic-settle easing, then a brief radial pulse in a brand spectrum colour. Reads as 'something just arrived and is alive.'"
            demo={<NodeArrivalDemo />}
          />
          <SignaturePrimitiveCard
            label="2. Formation"
            duration={`${M.formation}ms`}
            trigger="When two things visibly connect — a line, a link, a relationship being shown."
            spec="A curved stroke draws between two points with the spectrum gradient running along the line, then settles to its resting colour. Echoes the curve in the brand mark."
            demo={<EdgeFormationDemo />}
          />
          <SignaturePrimitiveCard
            label="3. Spectrum sweep"
            duration={`${M.spectrumSweep}ms`}
            trigger="The brand's signature moment — used sparingly when something meaningful happens that deserves the brand's full voice."
            spec={"A thin gradient strip traverses Cobalt → Teal → Amber → Rose. Spectrea's most distinctive motion. Reserve for moments that matter — overuse dilutes it."}
            demo={<SpectrumShiftDemo />}
          />
        </div>

        <p className="text-xs text-slate mt-4 leading-relaxed">
          Use sparingly. Spectrum sweep in particular is reserved for moments that genuinely matter — restraint is what makes the signature feel like a signature.
        </p>
      </Section>

      {/* ─── Principles ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              principle: 'Guide, don\'t decorate',
              description: 'Animation draws attention to what changed or where to look next. Never exists for its own sake.',
            },
            {
              principle: 'Fast and responsive',
              description: `Interactions feel instant. Most transitions complete in ${M.standard}–${M.deliberate}ms. Delays make the interface sluggish.`,
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
              <p className="text-sm font-semibold text-ink">{item.principle}</p>
              <p className="text-xs text-iron mt-1 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Easing Curves ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`Spectrea uses three easing functions. ease-out: ${E.easeOut.use}. ease-in-out: ${E.easeInOut.use}. elastic-settle: ${E.elasticSettle.use}. Never: ${E.never}.`}>
            <span>Easing Curves</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-4">
          {easingRows.map(row => (
            <EasingCurve key={row.name} name={row.name} css={row.css} color={row.color} />
          ))}
        </div>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {easingRows.map(row => (
            <div key={row.name} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3" style={{ borderBottom: '1px solid #F5F5F4' }}>
              <span className="text-xs font-mono text-ink w-28 flex-shrink-0">{row.name}</span>
              <span className="text-xs font-mono text-slate w-56 flex-shrink-0">{row.css}</span>
              <span className="text-xs text-iron flex-1">{row.use}</span>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 px-4 py-3 bg-cloud">
            <span className="text-xs font-mono text-ink w-28 flex-shrink-0">never</span>
            <span className="text-xs text-iron flex-1">{E.never}</span>
          </div>
        </div>
      </Section>

      {/* ─── Duration Scale ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={`Every interface animation uses one of these ${Object.keys(M).length} canonical durations — four interactive tiers plus the three signature-primitive timings. The logo's signature loop has its own canonical spec (logo.animation). Consistent timing creates rhythm.`}>
            <span>Duration Scale</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            {Object.entries(M).map(([name, ms], i, arr) => (
              <div key={name} className="flex items-center gap-4 px-4 py-3" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
                <div className="w-28 flex-shrink-0">
                  <span className="text-sm font-semibold text-iron">{name}</span>
                </div>
                <div className="w-14 flex-shrink-0">
                  <span className="text-xs font-mono text-brand">{ms}ms</span>
                </div>
                <span className="text-xs text-iron flex-1">{DURATION_USE[name] ?? '—'}</span>
              </div>
            ))}
          </div>
          <DurationDemo />
        </div>
      </Section>

      {/* ─── Live Pattern Demos ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Interactive Demos</h2>
        <p className="text-sm text-iron mb-4">Hover, click, and tab through these to see the motion system in action.</p>
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
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The logo animation is Spectrea's signature motion. The spectrum stroke draws along the S connecting the dots — the brand story in motion.">
            <span>Signature Animation</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4">The connecting-dots logo animation is the brand's motion signature. {ANIM.use} {ANIM.reducedMotion}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-white p-8 flex items-center justify-center">
              <AnimatedLogo size={160} dotColorMode="grey" />
            </div>
            <div className="px-4 py-3 bg-cloud border-t border-stone-100">
              <p className="text-xs font-semibold text-iron">On light</p>
              <p className="text-xs text-slate mt-0.5">Spectrum stroke, grey dots. Default treatment.</p>
            </div>
          </div>
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="bg-ink p-8 flex items-center justify-center">
              <AnimatedLogo size={160} dotColorMode="grey" />
            </div>
            <div className="px-4 py-3 bg-cloud border-t border-stone-100">
              <p className="text-xs font-semibold text-iron">On dark</p>
              <p className="text-xs text-slate mt-0.5">Spectrum stroke on dark. The gradient is the point — always use spectrum, never monochrome.</p>
            </div>
          </div>
        </div>
        <div className="mt-3 border border-stone-200 rounded-xl overflow-hidden">
          {[
            { prop: 'Duration', value: `${ANIM.loopSeconds} seconds`, note: `Draw to ${ANIM.phases.drawEnd} · hold to ${ANIM.phases.holdEnd} · dissolve to ${ANIM.phases.dissolveEnd} of the loop — canon logo.animation` },
            { prop: 'Easing', value: 'quadratic phase ease', note: ANIM.easing },
            { prop: 'Loop', value: 'Infinite', note: 'Restarts after dissolve. No jarring jump.' },
            { prop: 'Reduced motion', value: 'Static mark', note: ANIM.reducedMotion },
            { prop: 'Use cases', value: '—', note: ANIM.use },
          ].map((row, i, arr) => (
            <div key={row.prop} className="grid grid-cols-3 px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
              <span className="text-sm font-medium text-iron">{row.prop}</span>
              <span className="text-xs font-mono text-iron">{row.value}</span>
              <span className="text-xs text-slate">{row.note}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CSS Reference ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">CSS Reference</h2>
        <div className="bg-ink rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: '#B0B0B6' }}>{'/* Duration tokens — brand.ts motion.durationsMs */\n'}</span>
            {Object.entries(M).map(([name, ms]) => (
              <span key={name} style={{ color: '#F4F4F1' }}>{`--duration-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${ms}ms;\n`}</span>
            ))}
            <span style={{ color: '#B0B0B6' }}>{'\n/* Easing tokens — brand.ts motion.easings */\n'}</span>
            <span style={{ color: '#F4F4F1' }}>{`--ease-out:        ${E.easeOut.css};\n`}</span>
            <span style={{ color: '#F4F4F1' }}>{`--ease-in-out:     ${E.easeInOut.css};\n`}</span>
            <span style={{ color: '#F4F4F1' }}>{`--elastic-settle:  ${E.elasticSettle.css};\n`}</span>
            <span style={{ color: '#B0B0B6' }}>{`/* Never: ${E.never} */\n\n`}</span>
            <span style={{ color: '#B0B0B6' }}>{'/* Common patterns */\n'}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale'}</span>
            <span style={{ color: '#F4F4F1' }}>{` { transition: transform var(--duration-standard) var(--ease-out); }\n`}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale:hover'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { transform: scale(1.02); }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.fade-in'}</span>
            <span style={{ color: '#F4F4F1' }}>{` { animation: fadeIn var(--duration-comfortable) var(--ease-out); }\n`}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes fadeIn'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { from { opacity: 0; } }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.scale-up'}</span>
            <span style={{ color: '#F4F4F1' }}>{` { animation: scaleUp var(--duration-comfortable) var(--ease-out); }\n`}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes scaleUp'}</span>
            <span style={{ color: '#F4F4F1' }}>{' { from { opacity: 0; transform: scale(0.95); } }'}</span>
          </pre>
        </div>
      </Section>

      {/* ─── Accessibility ─── */}
      <Section title="Motion Accessibility">
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-iron leading-relaxed mb-3">
            All animations must respect <code className="bg-cloud px-1 py-0.5 rounded font-mono text-xs">prefers-reduced-motion</code>. This guide implements the rule itself: the block below ships in the app stylesheet, and the rAF-driven logo animation checks the same query in code. When enabled:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Disable all transform animations (scale, translate)',
              'Disable all opacity transitions',
              'Instant state changes (no easing)',
              'Essential feedback (e.g. a loading spinner) may be exempted deliberately — this guide exempts nothing; its blanket rule collapses everything',
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg px-3 py-2 border border-stone-100">
                <span className="text-xs font-semibold text-pewter mt-px">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-xs text-iron">{rule}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-ink rounded-lg px-4 py-3">
            <pre className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#B0B0B6' }}>
              <span style={{ color: '#E19000' }}>{'@media'}</span>
              <span style={{ color: '#F4F4F1' }}>{' (prefers-reduced-motion: reduce) {\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'  *, *::before, *::after {\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    animation-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    animation-delay: 0ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    animation-iteration-count: 1 !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    transition-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'    transition-delay: 0ms !important;\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'  }\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'  html { scroll-behavior: auto !important; }\n'}</span>
              <span style={{ color: '#F4F4F1' }}>{'}'}</span>
            </pre>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
