import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageShell, { Section } from '../../components/layout/PageShell'
import {
  SpectreaFigure,
  SceneCohort, SceneCrowd, ScenePair,
} from '../../components/illustrations/SpectreaFigure'

/* ------------------------------------------------------------------ */
/*  Tokens                                                             */
/* ------------------------------------------------------------------ */

const COBALT = '#4271DF'
const TEAL = '#00B6A0'
const AMBER = '#E19000'
const ROSE = '#F24260'
const INK = '#18181C'
const PEWTER = '#97979E'
const CLOUD = '#F4F4F1'
const CANVAS = '#FDFDFB'
const PAPER = '#FAF8F2'

/* ================================================================== */
/*  ANIMATION DEMOS — Framer Motion + native alternatives               */
/* ================================================================== */

function AnimStrokeDraw({ playKey }: { playKey: number }) {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <defs>
        <linearGradient id={`anim-draw-${playKey}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COBALT} />
          <stop offset="0.5" stopColor={TEAL} />
          <stop offset="1" stopColor={AMBER} />
        </linearGradient>
      </defs>
      <motion.path
        key={playKey}
        d="M25,110 C60,50 120,120 215,25"
        stroke={`url(#anim-draw-${playKey})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle cx="25" cy="110" r="5" fill={COBALT}
        key={`d1-${playKey}`}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 0, duration: 0.4 }} />
      <motion.circle cx="215" cy="25" r="5" fill={AMBER}
        key={`d2-${playKey}`}
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 400 }} />
    </svg>
  )
}

function AnimSpringStagger({ playKey }: { playKey: number }) {
  const dots = Array.from({ length: 16 }, (_, i) => ({
    x: 30 + (i % 8) * 25, y: 40 + Math.floor(i / 8) * 40,
    c: [COBALT, TEAL, AMBER, INK][i % 4],
  }))
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      {dots.map((d, i) => (
        <motion.circle
          key={`${playKey}-${i}`}
          cx={d.x} cy={d.y} r="7" fill={d.c}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.04, type: 'spring', stiffness: 260, damping: 14 }}
        />
      ))}
    </svg>
  )
}

function AnimHover() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.rect
        x="40" y="30" width="60" height="80" fill={COBALT} rx="6"
        whileHover={{ scale: 1.1, y: 25 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
      <motion.rect
        x="140" y="30" width="60" height="80" fill={AMBER} rx="6"
        whileHover={{ scale: 1.1, y: 25 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ originX: 0.5, originY: 0.5 }}
      />
    </svg>
  )
}

function AnimMorph({ toggled }: { toggled: boolean }) {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.path
        d={toggled
          ? 'M 120 25 L 215 120 L 25 120 Z'
          : 'M 60 35 L 180 35 L 180 115 L 60 115 Z'}
        fill={toggled ? AMBER : COBALT}
        animate={{
          d: toggled
            ? 'M 120 25 L 215 120 L 25 120 Z'
            : 'M 60 35 L 180 35 L 180 115 L 60 115 Z',
          fill: toggled ? AMBER : COBALT,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function AnimContinuous() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <motion.g
        style={{ originX: '120px', originY: '70px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2
          const r = 45
          return (
            <circle key={i} cx={120 + Math.cos(a) * r} cy={70 + Math.sin(a) * r}
              r="5" fill={[COBALT, TEAL, AMBER, ROSE][i % 4]} />
          )
        })}
      </motion.g>
      <circle cx="120" cy="70" r="8" fill={INK} />
    </svg>
  )
}

function AnimScroll() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const dots = Array.from({ length: 10 }, (_, i) => ({
    x: 20 + i * 22, y: 70,
  }))
  return (
    <svg ref={ref} viewBox="0 0 240 140" className="w-full h-auto">
      {dots.map((d, i) => (
        <motion.circle
          key={i} cx={d.x} cy={d.y} r="6"
          fill={i < 4 ? COBALT : i < 7 ? TEAL : AMBER}
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
          style={{ cx: d.x, cy: d.y }}
        />
      ))}
    </svg>
  )
}

function AnimCssHover() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <style>{`
        .css-box { transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), fill 300ms; transform-origin: center; transform-box: fill-box; }
        .css-box:hover { transform: scale(1.12) translateY(-6px); }
        .css-box-a:hover { fill: #3A63C4; }
        .css-box-b:hover { fill: #C58200; }
      `}</style>
      <rect className="css-box css-box-a" x="40" y="30" width="60" height="80" fill={COBALT} rx="6" />
      <rect className="css-box css-box-b" x="140" y="30" width="60" height="80" fill={AMBER} rx="6" />
    </svg>
  )
}

function AnimSmil() {
  return (
    <svg viewBox="0 0 240 140" className="w-full h-auto">
      <circle cx="120" cy="70" r="8" fill={AMBER}>
        <animate attributeName="r" values="8;28;8" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="70" r="8" fill={AMBER} />
    </svg>
  )
}

/* ================================================================== */
/*  ANTI-PATTERNS                                                       */
/* ================================================================== */

function AntiCartoon() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <circle cx="60" cy="60" r="35" fill={AMBER} />
      <circle cx="50" cy="52" r="5" fill={INK} />
      <circle cx="70" cy="52" r="5" fill={INK} />
      <path d="M45,72 Q60,85 75,72" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function AntiStock() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <rect width="120" height="120" rx="6" fill={CLOUD} />
      <rect x="15" y="25" width="90" height="60" rx="4" fill="#d1d5db" />
      <circle cx="35" cy="50" r="8" fill="#9ca3af" />
      <path d="M20,80 L45,60 L65,75 L100,50 L100,80 Z" fill="#9ca3af" />
      <text x="60" y="105" textAnchor="middle" fontSize="9" fill={PEWTER}>stock-vibes</text>
    </svg>
  )
}

function AntiOffPalette() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <defs>
        <linearGradient id="a-over" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff00c8" />
          <stop offset="0.5" stopColor="#00e0ff" />
          <stop offset="1" stopColor="#fffc00" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="6" fill="url(#a-over)" />
      <text x="60" y="68" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">VIBES</text>
    </svg>
  )
}

function AntiSkeuomorph() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <defs>
        <radialGradient id="a-skeu" cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#a0a0a0" />
          <stop offset="1" stopColor="#404040" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="45" fill="url(#a-skeu)" stroke="#303030" strokeWidth="2" />
      <circle cx="60" cy="60" r="30" fill="#202020" />
      <circle cx="60" cy="60" r="20" fill="#000" />
      <circle cx="50" cy="50" r="5" fill="#ffffff" opacity="0.5" />
    </svg>
  )
}

/* ================================================================== */
/*  Display primitives                                                  */
/* ================================================================== */

function Tile({ children, label, bg = CLOUD }: { children: React.ReactNode; label: string; bg?: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="rounded-xl p-4 flex items-center justify-center overflow-hidden"
        style={{ background: bg, aspectRatio: '16 / 10' }}
      >
        {children}
      </div>
      <p className="mt-2 text-xs font-mono text-stone-500">{label}</p>
    </div>
  )
}

function Card({ label, children, darkBg = false }: { label: string; children: React.ReactNode; darkBg?: boolean }) {
  return (
    <div className={`flex flex-col rounded-xl border ${darkBg ? 'border-stone-700' : 'border-stone-200'} overflow-hidden`}>
      <div className={`px-3 py-2 text-[10px] font-mono uppercase tracking-wider ${darkBg ? 'text-stone-400 bg-ink border-b border-stone-700' : 'text-stone-500 bg-stone-50 border-b border-stone-100'}`}>
        {label}
      </div>
      <div className={darkBg ? 'bg-ink' : 'bg-white'}>
        {children}
      </div>
    </div>
  )
}

function ChannelPill({ kind }: { kind: 'me' | 'aigen' | 'designer' | 'canva' }) {
  const styles = {
    me: { bg: '#00B6A015', color: '#008775', border: '#00B6A030', label: 'Me' },
    aigen: { bg: '#E1900015', color: '#7C4D04', border: '#E1900030', label: 'AI gen' },
    designer: { bg: '#F2426015', color: '#BA3249', border: '#F2426030', label: 'Designer' },
    canva: { bg: '#4271DF15', color: '#1E3A8A', border: '#4271DF30', label: 'Canva' },
  } as const
  const s = styles[kind]
  return (
    <span className="inline-block px-2 py-0.5 rounded font-mono text-[10px] font-semibold uppercase tracking-wider"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{s.label}</span>
  )
}

function AnimationDemos() {
  const [drawKey, setDrawKey] = useState(0)
  const [staggerKey, setStaggerKey] = useState(0)
  const [morphToggle, setMorphToggle] = useState(false)

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimDemoCard
        title="Stroke draw"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 }} />`}
        action={<button onClick={() => setDrawKey(k => k + 1)} className="text-xs font-mono text-brand hover:underline">Replay →</button>}
      >
        <AnimStrokeDraw playKey={drawKey} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Spring stagger"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04, type: 'spring' }} />`}
        action={<button onClick={() => setStaggerKey(k => k + 1)} className="text-xs font-mono text-brand hover:underline">Replay →</button>}
      >
        <AnimSpringStagger playKey={staggerKey} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Hover + tap gesture"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.rect whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} />`}
        action={<span className="text-xs font-mono text-stone-400">Hover and click →</span>}
      >
        <AnimHover />
      </AnimDemoCard>

      <AnimDemoCard
        title="Path morph"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.path animate={{ d: toggled ? pathA : pathB }} transition={{ duration: 0.8 }} />`}
        action={<button onClick={() => setMorphToggle(t => !t)} className="text-xs font-mono text-brand hover:underline">Toggle →</button>}
      >
        <AnimMorph toggled={morphToggle} />
      </AnimDemoCard>

      <AnimDemoCard
        title="Continuous loop"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`<motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />`}
        action={<span className="text-xs font-mono text-stone-400">Always running</span>}
      >
        <AnimContinuous />
      </AnimDemoCard>

      <AnimDemoCard
        title="Scroll-triggered"
        lib="Framer Motion"
        libColor={COBALT}
        snippet={`const inView = useInView(ref); animate={inView ? 'visible' : 'hidden'}`}
        action={<span className="text-xs font-mono text-stone-400">Scroll this tile in/out of view</span>}
      >
        <AnimScroll />
      </AnimDemoCard>

      <AnimDemoCard
        title="CSS hover"
        lib="No library"
        libColor={PEWTER}
        snippet={`.box { transition: transform 300ms; } .box:hover { transform: scale(1.12); }`}
        action={<span className="text-xs font-mono text-stone-400">Hover →</span>}
      >
        <AnimCssHover />
      </AnimDemoCard>

      <AnimDemoCard
        title="SVG SMIL"
        lib="Native SVG"
        libColor={PEWTER}
        snippet={`<animate attributeName="r" values="8;28;8" dur="2s" repeatCount="indefinite" />`}
        action={<span className="text-xs font-mono text-stone-400">Native playback</span>}
      >
        <AnimSmil />
      </AnimDemoCard>
    </div>
  )
}

function AnimDemoCard({
  children, title, lib, libColor, snippet, action,
}: { children: React.ReactNode; title: string; lib: string; libColor: string; snippet: string; action: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-stone-200 overflow-hidden">
      <div className="p-4 flex items-center justify-center overflow-hidden bg-cloud" style={{ aspectRatio: '16 / 9' }}>
        {children}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{title}</p>
          <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full shrink-0" style={{ background: libColor + '22', color: libColor }}>{lib}</span>
        </div>
        <pre className="text-[10px] font-mono text-stone-500 mt-2 bg-stone-50 rounded p-2 overflow-x-auto leading-relaxed">{snippet}</pre>
        <div className="mt-2">{action}</div>
      </div>
    </div>
  )
}

/* ================================================================== */
/*  Page                                                                */
/* ================================================================== */

export default function Illustration() {
  return (
    <PageShell
      title="Illustration"
      subtitle="A layered vocabulary (atoms · forms · treatments · palette), the seven craft moves that distinguish system-applied-with-craft from shapes-assembled, and the four production channels that cover every brand surface."
    >
      {/* ─── v3 Manifesto ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>The illustration system · v3</p>
          <h2 className="text-2xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Four layers. Seven moves. Four channels.</h2>
          <p className="text-sm text-stone-400 mt-3 max-w-2xl leading-relaxed">
            The brand mark is 10 dots along a soft Bézier curve — atoms in their purest form. Illustrations extend the same DNA, but a five-atom-only rule reads as primitive at scale.
            v3 adds a <strong className="text-white">form layer</strong> (rectangles, arcs, half-circles) for figures, scenes, and objects; a <strong className="text-white">treatment layer</strong> (filled, outlined, halo, layered) for depth; and a <strong className="text-white">palette &amp; ratio</strong> that keeps everything one family.
          </p>
          <p className="text-sm text-stone-400 mt-3 max-w-2xl leading-relaxed">
            Production is split across <strong className="text-white">four channels</strong> — in-house, AI image-generation, commissioned designer, and Canva — each with a clear scope, so no surface gets malformed output standing in for what it actually needs.
          </p>
        </div>
      </Section>

      {/* ─── LAYER 1 — ATOMS ─── */}
      <Section title="Layer 1 · Atoms">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          The brand DNA. What the mark itself is built from. Every illustration must echo at least one.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <Card label="Dot">
            <svg viewBox="0 0 120 90" className="w-full h-24"><circle cx="60" cy="45" r="22" fill={COBALT}/></svg>
          </Card>
          <Card label="Curve">
            <svg viewBox="0 0 120 90" className="w-full h-24"><path d="M 16 70 C 36 16, 84 16, 104 70" stroke={TEAL} strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
          </Card>
          <Card label="Cluster">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="60" cy="32" r="7" fill={AMBER}/>
              <circle cx="36" cy="50" r="5" fill={AMBER}/>
              <circle cx="84" cy="50" r="5" fill={AMBER}/>
              <circle cx="50" cy="68" r="5" fill={AMBER}/>
              <circle cx="74" cy="68" r="5" fill={AMBER}/>
              <path d="M 60 32 C 50 40, 42 46, 36 50" stroke={AMBER} strokeWidth="1.4" fill="none" opacity="0.6"/>
              <path d="M 60 32 C 70 40, 78 46, 84 50" stroke={AMBER} strokeWidth="1.4" fill="none" opacity="0.6"/>
              <path d="M 36 50 C 42 58, 48 64, 50 68" stroke={AMBER} strokeWidth="1.4" fill="none" opacity="0.6"/>
              <path d="M 84 50 C 80 58, 76 64, 74 68" stroke={AMBER} strokeWidth="1.4" fill="none" opacity="0.6"/>
            </svg>
          </Card>
          <Card label="Trail">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="20" cy="56" r="3" fill={ROSE} opacity="0.18"/>
              <circle cx="36" cy="50" r="3.5" fill={ROSE} opacity="0.32"/>
              <circle cx="54" cy="44" r="4" fill={ROSE} opacity="0.5"/>
              <circle cx="72" cy="40" r="4.5" fill={ROSE} opacity="0.7"/>
              <circle cx="90" cy="36" r="6" fill={ROSE}/>
            </svg>
          </Card>
          <Card label="Field">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs>
                <radialGradient id="atom-field-v3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#EDF0F8"/>
                  <stop offset="100%" stopColor={CANVAS} stopOpacity="0"/>
                </radialGradient>
              </defs>
              <circle cx="60" cy="45" r="42" fill="url(#atom-field-v3)"/>
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── LAYER 2 — FORMS ─── */}
      <Section title="Layer 2 · Forms">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          Geometric shapes that build figurative content — figures, scenes, objects, structures. Always co-occur with atoms in a composition. Never replace them.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card label="Rounded rect"><svg viewBox="0 0 120 90" className="w-full h-24"><rect x="18" y="18" width="84" height="54" rx="12" fill={COBALT}/></svg></Card>
          <Card label="Square"><svg viewBox="0 0 120 90" className="w-full h-24"><rect x="30" y="18" width="60" height="54" fill={TEAL}/></svg></Card>
          <Card label="Triangle"><svg viewBox="0 0 120 90" className="w-full h-24"><polygon points="60,14 108,72 12,72" fill={AMBER}/></svg></Card>
          <Card label="Arc"><svg viewBox="0 0 120 90" className="w-full h-24"><path d="M 18 70 A 42 42 0 0 1 102 70" stroke={ROSE} strokeWidth="4" fill="none" strokeLinecap="round"/></svg></Card>
          <Card label="Half-circle"><svg viewBox="0 0 120 90" className="w-full h-24"><path d="M 30 72 A 30 30 0 0 1 90 72 Z" fill={COBALT}/></svg></Card>
          <Card label="Soft blob"><svg viewBox="0 0 120 90" className="w-full h-24"><path d="M 30 45 C 30 22, 90 18, 90 45 C 90 68, 30 70, 30 45 Z" fill={PEWTER}/></svg></Card>
        </div>
      </Section>

      {/* ─── LAYER 3 — TREATMENTS ─── */}
      <Section title="Layer 3 · Treatments">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          How a shape is rendered. Apply to both atoms and forms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="Filled"><svg viewBox="0 0 120 90" className="w-full h-24"><circle cx="60" cy="45" r="22" fill={COBALT}/></svg></Card>
          <Card label="Outlined (ghost)"><svg viewBox="0 0 120 90" className="w-full h-24"><circle cx="60" cy="45" r="22" fill="none" stroke={COBALT} strokeWidth="2.5"/></svg></Card>
          <Card label="Halo"><svg viewBox="0 0 120 90" className="w-full h-24">
            <defs><radialGradient id="halo-v3"><stop offset="0%" stopColor={AMBER} stopOpacity="0.45"/><stop offset="100%" stopColor={AMBER} stopOpacity="0"/></radialGradient></defs>
            <circle cx="60" cy="45" r="40" fill="url(#halo-v3)"/>
            <circle cx="60" cy="45" r="11" fill={AMBER}/>
          </svg></Card>
          <Card label="Layered"><svg viewBox="0 0 120 90" className="w-full h-24">
            <rect x="28" y="20" width="46" height="46" rx="6" fill={TEAL}/>
            <circle cx="82" cy="30" r="12" fill={AMBER}/>
          </svg></Card>
        </div>
      </Section>

      {/* ─── LAYER 4 — PALETTE & RATIO ─── */}
      <Section title="Layer 4 · Palette & ratio">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          Brand palette only. 60 / 20 / 10 / 10 ratio — Canvas, surface (Cloud), text &amp; UI, spectrum. One spectrum hero per composition; supporting colours at lower opacity. Pewter for ghost / context. Paper <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">#FAF8F2</code> for editorial surfaces.
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
          <div className="h-10 flex">
            <div className="flex-[60]" style={{ backgroundColor: CANVAS, borderRight: '1px solid #ECECE7' }}/>
            <div className="flex-[20]" style={{ backgroundColor: CLOUD }}/>
            <div className="flex-[10]" style={{ backgroundColor: INK }}/>
            <div className="flex-[3]" style={{ backgroundColor: COBALT }}/>
            <div className="flex-[3]" style={{ backgroundColor: TEAL }}/>
            <div className="flex-[2]" style={{ backgroundColor: AMBER }}/>
            <div className="flex-[2]" style={{ backgroundColor: ROSE }}/>
          </div>
          <div className="grid grid-cols-4 px-4 py-3 text-center">
            <div><p className="text-sm font-semibold text-stone-800">60%</p><p className="text-xs text-stone-500">Canvas</p></div>
            <div><p className="text-sm font-semibold text-stone-800">20%</p><p className="text-xs text-stone-500">Cloud surface</p></div>
            <div><p className="text-sm font-semibold text-stone-800">10%</p><p className="text-xs text-stone-500">Ink &amp; Pewter</p></div>
            <div><p className="text-sm font-semibold text-stone-800">10%</p><p className="text-xs text-stone-500">Spectrum accents</p></div>
          </div>
        </div>
      </Section>

      {/* ─── Seven craft moves ─── */}
      <Section title="The seven craft moves">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          Beyond the four layers, these are the techniques that turn a system applied into a composition with craft. Every polished illustration uses several.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="1 · Arc">
            <svg viewBox="0 0 120 90" className="w-full h-24"><path d="M 18 70 A 42 42 0 0 1 102 70" stroke={COBALT} strokeWidth="3" fill="none" strokeLinecap="round"/></svg>
          </Card>
          <Card label="2 · Halo">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs><radialGradient id="h-v3a"><stop offset="0%" stopColor={AMBER} stopOpacity="0.45"/><stop offset="100%" stopColor={AMBER} stopOpacity="0"/></radialGradient></defs>
              <circle cx="60" cy="45" r="38" fill="url(#h-v3a)"/>
              <circle cx="60" cy="45" r="10" fill={AMBER}/>
            </svg>
          </Card>
          <Card label="3 · Painterly Field">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs>
                <radialGradient id="pf1-v3" cx="35%" cy="40%" r="50%"><stop offset="0%" stopColor="#EDF0F8"/><stop offset="100%" stopColor={PAPER} stopOpacity="0"/></radialGradient>
                <radialGradient id="pf2-v3" cx="68%" cy="62%" r="42%"><stop offset="0%" stopColor="#F5F0E6"/><stop offset="100%" stopColor={PAPER} stopOpacity="0"/></radialGradient>
              </defs>
              <rect width="120" height="90" fill={PAPER}/>
              <rect width="120" height="90" fill="url(#pf1-v3)"/>
              <rect width="120" height="90" fill="url(#pf2-v3)"/>
            </svg>
          </Card>
          <Card label="4 · Spectrum Band">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs><linearGradient id="sb-v3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COBALT}/><stop offset="33%" stopColor={TEAL}/>
                <stop offset="66%" stopColor={AMBER}/><stop offset="100%" stopColor={ROSE}/>
              </linearGradient></defs>
              <rect x="12" y="36" width="96" height="18" rx="9" fill="url(#sb-v3)" opacity="0.9"/>
            </svg>
          </Card>
          <Card label="5 · Translucent Plate">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <rect width="120" height="90" fill="#F5F0E6"/>
              <rect x="22" y="14" width="76" height="62" rx="10" fill={PAPER} stroke="#E5DBC5" strokeWidth="0.5" opacity="0.92"/>
              <circle cx="60" cy="45" r="9" fill={COBALT}/>
            </svg>
          </Card>
          <Card label="6 · Keyline Rule">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <line x1="14" y1="18" x2="106" y2="18" stroke={PEWTER} strokeWidth="0.5" opacity="0.6"/>
              <line x1="14" y1="74" x2="106" y2="74" stroke={PEWTER} strokeWidth="0.5" opacity="0.6"/>
              <text x="18" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill={INK}>SECTION</text>
              <text x="102" y="48" fontFamily="ui-monospace, monospace" fontSize="9" fill={PEWTER} textAnchor="end">01</text>
            </svg>
          </Card>
          <Card label="7 · Hand-imperfect">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="34" cy="45" r="11" fill={COBALT}/>
              <ellipse cx="60" cy="45" rx="12" ry="10" fill={COBALT}/>
              <circle cx="86" cy="45" r="11" fill={COBALT}/>
            </svg>
          </Card>
          <Card label="+ Paper grain">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs><filter id="pg-v3"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.32  0 0 0 0 0.27  0 0 0 0.22 0"/></filter></defs>
              <rect width="120" height="90" fill={PAPER}/>
              <rect width="120" height="90" filter="url(#pg-v3)"/>
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── Two paired styles ─── */}
      <Section title="Two paired styles">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          The brand has two illustration jobs. One style can't serve both well. Pair two styles sharing palette, type, paper ground, and the brand-mark curve — but differing in what each is for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="rounded-xl border border-stone-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-stone-200 flex items-center gap-2" style={{ backgroundColor: '#F5F0E6' }}>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500">Style A</span>
              <span className="text-xs font-semibold text-amber-900" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Editorial Geometry</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-stone-700 leading-relaxed mb-3">
                Flat geometric shapes on warm paper, generous white space, serif headline + monospace metadata, single warm focal accent.
              </p>
              <p className="text-xs text-stone-500 mb-3"><strong className="text-stone-700">For:</strong> homepage hero, About / story, blog headers, press, brand-guide section opens.</p>
              <p className="text-xs text-stone-500"><strong className="text-stone-700">References:</strong> <a href="https://press.stripe.com/" target="_blank" className="text-brand hover:underline">Stripe Press</a>, Pelican classics, MIT Press, Fitzcarraldo Editions.</p>
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 overflow-hidden bg-ink">
            <div className="px-5 py-3 border-b border-stone-700 flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Style B</span>
              <span className="text-xs font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif", color: CANVAS }}>Living Graph</span>
            </div>
            <div className="p-5">
              <p className="text-sm text-stone-300 leading-relaxed mb-3">
                Dense node + edge compositions, depth via painterly Fields and halos, atmospheric perspective, focal hierarchy.
              </p>
              <p className="text-xs text-stone-400 mb-3"><strong className="text-stone-200">For:</strong> product feature pages, docs hero, "how it works" diagrams, onboarding, in-product loading + empty states.</p>
              <p className="text-xs text-stone-400"><strong className="text-stone-200">References:</strong> <a href="https://vercel.com/" target="_blank" className="hover:underline" style={{ color: COBALT }}>Vercel</a>, <a href="https://linear.app/" target="_blank" className="hover:underline" style={{ color: COBALT }}>Linear</a>.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Channel allocation matrix ─── */}
      <Section title="Four channels · who produces what">
        <p className="text-sm text-stone-500 mb-3 leading-relaxed">
          Every illustration in the system is allocated to one of four channels. No surface gets low-fidelity SVG standing in for what it actually needs.
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          <ChannelPill kind="me"/> <span className="text-xs text-stone-500">~80% · in-house SVG with render-iterate loop</span>
          <span className="text-stone-300 mx-2">·</span>
          <ChannelPill kind="aigen"/> <span className="text-xs text-stone-500">~15% · AI image-gen via <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-[10px]">docs/illustration-prompt.md</code></span>
          <span className="text-stone-300 mx-2">·</span>
          <ChannelPill kind="designer"/> <span className="text-xs text-stone-500">~5% · commissioned for launch / paid / print</span>
          <span className="text-stone-300 mx-2">·</span>
          <ChannelPill kind="canva"/> <span className="text-xs text-stone-500">Template-driven recurring formats (optional)</span>
        </div>

        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[1fr_110px_2fr] bg-stone-50 border-b border-stone-200 px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-stone-400">
            <div>Surface</div>
            <div>Channel</div>
            <div>Example</div>
          </div>
          {[
            { s: 'Brand-guide vocabulary cards (atoms, forms, treatments)', c: 'me', e: 'Cards on this page. Dot/Curve/Cluster/Trail/Field + seven craft moves.' },
            { s: 'Brand-guide layout & system diagrams', c: 'me', e: '60/20/10/10 ratio, spacing scale, 12-col grid, swatches.' },
            { s: 'Motion primitive demos (static + live)', c: 'me', e: 'Arrival, Formation, Spectrum sweep. React/CSS components on Motion page.' },
            { s: 'Data-viz primitive cards (node/edge/confidence/trail)', c: 'me', e: 'Graph-rendering reference material for the brand guide.' },
            { s: 'Empty states, loading skeletons, searching', c: 'me', e: 'Nothing-here-yet, skeleton pulses, dashed search ring.' },
            { s: 'In-product brand moments (small, schematic)', c: 'me', e: 'Connection-formed, item-arrived, AI-just-acted, notification dots.' },
            { s: 'Section dividers & visual breaks', c: 'me', e: 'Spectrum band, dot rule, arc divider.' },
            { s: 'Brand mark variants & logo system', c: 'me', e: 'Cool duet, mono ink, mono white, full spectrum, animated frames.' },
            { s: 'Comparison diagrams (do/don\'t, before/after)', c: 'me', e: 'Schematic diptychs with simple distinction.' },
            { s: 'Marketing site hero (homepage above fold)', c: 'aigen', e: 'Editorial pictorial scene. Generate via prompt → vectorise → drop into /public/illustrations/.' },
            { s: 'Feature page heroes (product pages)', c: 'aigen', e: '"What it feels like to use this" — atmospheric pictorial.' },
            { s: 'Blog post header art', c: 'aigen', e: 'One-off editorial per article, brand-prompt-driven.' },
            { s: 'Social post imagery (campaigns)', c: 'aigen', e: 'Concept-driven posts. Prompt keeps consistency.' },
            { s: 'About page atmospheric imagery', c: 'aigen', e: 'Scenes evoking team intent without literal photography.' },
            { s: 'Brand launch keynote / hero visual', c: 'designer', e: 'The single defining image. Commission.' },
            { s: 'Conference banner & booth visuals', c: 'designer', e: 'Print-scale custom illustration.' },
            { s: 'Print brand-guide cover & section opens', c: 'designer', e: '3–4 designer-produced plates for the printed artifact.' },
            { s: 'About page main hero illustration', c: 'designer', e: 'AI-gen can be a draft; commission for the final.' },
            { s: 'Custom marketing campaign imagery (paid)', c: 'designer', e: 'Paid media deserves designer-quality production.' },
            { s: 'Photography direction (human imagery)', c: 'designer', e: 'Photographer + art director. About / customer stories / team.' },
            { s: 'Sales presentation decks (template-driven)', c: 'canva', e: 'Requires Spectrea brand kit in Canva; generate via brand_kit_id.' },
            { s: 'One-off social posts (template-driven)', c: 'canva', e: 'Recurring weekly content with brand-kitted templates.' },
            { s: 'Internal flyers, event posters', c: 'canva', e: 'Quick-turn collateral; no custom illustration needed.' },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_110px_2fr] px-4 py-3 border-b border-stone-100 last:border-b-0 items-center">
              <div className="text-sm text-stone-700">{row.s}</div>
              <div><ChannelPill kind={row.c as 'me' | 'aigen' | 'designer' | 'canva'}/></div>
              <div className="text-xs text-stone-500 leading-relaxed">{row.e}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Decision rubric ─── */}
      <Section title="Decision rubric">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          For any new illustration, ask three questions in order:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-stone-200 p-5">
            <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: '#008775' }}>01</p>
            <p className="text-sm font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Is it a system artefact?</p>
            <p className="text-xs text-stone-500 leading-relaxed">Vocabulary card, primitive demo, layout diagram, swatch, in-product moment, dataviz primitive, brand mark variant. → <ChannelPill kind="me"/></p>
          </div>
          <div className="rounded-xl border border-stone-200 p-5">
            <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: '#7C4D04' }}>02</p>
            <p className="text-sm font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Does it need a pictorial subject?</p>
            <p className="text-xs text-stone-500 leading-relaxed">A figure mid-action, a scene with depth, a metaphorical landscape, atmospheric texture. → <ChannelPill kind="aigen"/></p>
          </div>
          <div className="rounded-xl border border-stone-200 p-5">
            <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: '#BA3249' }}>03</p>
            <p className="text-sm font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Does it carry launch / paid / print?</p>
            <p className="text-xs text-stone-500 leading-relaxed">Homepage hero, conference banner, About hero, print cover, paid campaign. → <ChannelPill kind="designer"/></p>
          </div>
        </div>
        <p className="text-xs text-stone-500 mt-4 leading-relaxed">
          <ChannelPill kind="canva"/> is reserved for template-driven recurring formats only (sales decks, predictable social). If "not sure" — default to <ChannelPill kind="me"/>, render through the loop, evaluate honestly. If malformed, escalate.
        </p>
      </Section>

      {/* ─── Data-viz primitive cards (system artefact — Channel 1) ─── */}
      <Section title="Data-viz primitives">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Graph-rendering reference cards. These describe how the product's graph renders consistently with the brand. Channel 1 (Me) — schematic, low-fidelity, system-aware.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="Node types"><svg viewBox="0 0 120 90" className="w-full h-24">
            <circle cx="34" cy="30" r="9" fill={COBALT}/>
            <circle cx="86" cy="30" r="9" fill={TEAL}/>
            <circle cx="34" cy="60" r="9" fill={AMBER} opacity="0.7"/>
            <circle cx="86" cy="60" r="9" fill={PEWTER}/>
          </svg></Card>
          <Card label="Edge styles"><svg viewBox="0 0 120 90" className="w-full h-24">
            <line x1="14" y1="22" x2="106" y2="22" stroke={PEWTER} strokeWidth="1.6"/>
            <line x1="14" y1="44" x2="106" y2="44" stroke={PEWTER} strokeWidth="1.6" strokeDasharray="6 3"/>
            <line x1="14" y1="66" x2="106" y2="66" stroke={PEWTER} strokeWidth="1.6" strokeDasharray="2 3"/>
          </svg></Card>
          <Card label="Confidence (opacity)"><svg viewBox="0 0 120 90" className="w-full h-24">
            <circle cx="22" cy="45" r="9" fill={COBALT} opacity="0.3"/>
            <circle cx="48" cy="45" r="9" fill={COBALT} opacity="0.55"/>
            <circle cx="74" cy="45" r="9" fill={COBALT} opacity="0.78"/>
            <circle cx="100" cy="45" r="9" fill={COBALT}/>
          </svg></Card>
          <Card label="Provenance trail"><svg viewBox="0 0 120 90" className="w-full h-24">
            <circle cx="20" cy="74" r="3" fill={AMBER} opacity="0.3"/>
            <circle cx="40" cy="60" r="3.5" fill={AMBER} opacity="0.5"/>
            <circle cx="60" cy="46" r="4" fill={AMBER} opacity="0.7"/>
            <circle cx="80" cy="30" r="4.5" fill={AMBER} opacity="0.85"/>
            <circle cx="100" cy="14" r="6" fill={AMBER}/>
          </svg></Card>
        </div>
      </Section>

      {/* ─── In-product brand moments ─── */}
      <Section title="In-product brand moments">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Small schematic illustrations the product uses to communicate state. Channel 1 (Me).
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="Connection formed"><svg viewBox="0 0 120 90" className="w-full h-24">
            <circle cx="22" cy="45" r="6" fill={COBALT}/>
            <circle cx="98" cy="45" r="6" fill={AMBER}/>
            <path d="M 28 45 C 50 22, 70 68, 92 45" stroke={PEWTER} strokeWidth="1.6" fill="none" opacity="0.6"/>
            <circle cx="60" cy="42" r="4" fill={CANVAS} stroke={AMBER} strokeWidth="2"/>
          </svg></Card>
          <Card label="Item arrived"><svg viewBox="0 0 120 90" className="w-full h-24">
            <circle cx="60" cy="45" r="32" fill={TEAL} opacity="0.10"/>
            <circle cx="60" cy="45" r="20" fill={TEAL} opacity="0.20"/>
            <circle cx="60" cy="45" r="11" fill={TEAL}/>
          </svg></Card>
          <Card label="AI just acted"><svg viewBox="0 0 120 90" className="w-full h-24">
            <defs><linearGradient id="ai-v3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COBALT}/><stop offset="33%" stopColor={TEAL}/>
              <stop offset="66%" stopColor={AMBER}/><stop offset="100%" stopColor={ROSE}/>
            </linearGradient></defs>
            <rect x="14" y="44" width="92" height="3" rx="1.5" fill="url(#ai-v3)"/>
          </svg></Card>
          <Card label="Notification badge"><svg viewBox="0 0 120 90" className="w-full h-24">
            <rect x="32" y="22" width="56" height="44" rx="6" fill={CLOUD}/>
            <circle cx="86" cy="26" r="7" fill={ROSE}/>
            <text x="86" y="29" fontFamily="ui-monospace,monospace" fontSize="8" fill="#fff" textAnchor="middle">3</text>
          </svg></Card>
        </div>
      </Section>

      {/* ─── Empty / loading states ─── */}
      <Section title="Empty & loading states">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card label="Nothing here yet"><svg viewBox="0 0 200 90" className="w-full h-24">
            <circle cx="100" cy="40" r="9" fill={COBALT}/>
            <circle cx="64" cy="50" r="3" fill={PEWTER} opacity="0.4"/>
            <circle cx="136" cy="50" r="3" fill={PEWTER} opacity="0.4"/>
            <text x="100" y="80" fontFamily="ui-monospace,monospace" fontSize="9" fill={PEWTER} textAnchor="middle">add your first item</text>
          </svg></Card>
          <Card label="Loading skeleton"><svg viewBox="0 0 200 90" className="w-full h-24">
            <rect x="20" y="20" width="120" height="10" rx="5" fill="#EDF0F8"/>
            <rect x="20" y="38" width="160" height="6" rx="3" fill={CLOUD}/>
            <rect x="20" y="50" width="140" height="6" rx="3" fill={CLOUD}/>
            <rect x="20" y="68" width="44" height="14" rx="7" fill="#EDF0F8"/>
          </svg></Card>
          <Card label="Searching"><svg viewBox="0 0 200 90" className="w-full h-24">
            <circle cx="100" cy="42" r="22" fill="none" stroke={COBALT} strokeWidth="2" opacity="0.5" strokeDasharray="6 4"/>
            <circle cx="100" cy="42" r="6" fill={COBALT}/>
          </svg></Card>
        </div>
      </Section>

      {/* ─── Section dividers ─── */}
      <Section title="Section dividers · visual breaks">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card label="Spectrum band"><svg viewBox="0 0 200 40" className="w-full h-16">
            <defs><linearGradient id="dv-v3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={COBALT}/><stop offset="33%" stopColor={TEAL}/>
              <stop offset="66%" stopColor={AMBER}/><stop offset="100%" stopColor={ROSE}/>
            </linearGradient></defs>
            <rect x="0" y="18" width="200" height="4" fill="url(#dv-v3)"/>
          </svg></Card>
          <Card label="Dot rule"><svg viewBox="0 0 200 40" className="w-full h-16">
            <circle cx="80" cy="20" r="2" fill={PEWTER}/>
            <circle cx="92" cy="20" r="2" fill={PEWTER}/>
            <circle cx="104" cy="20" r="2" fill={PEWTER}/>
            <circle cx="116" cy="20" r="2" fill={PEWTER}/>
            <circle cx="128" cy="20" r="2" fill={PEWTER}/>
          </svg></Card>
          <Card label="Arc divider"><svg viewBox="0 0 200 40" className="w-full h-16">
            <path d="M 20 32 Q 100 10 180 32" stroke={COBALT} strokeWidth="1.4" fill="none" opacity="0.7" strokeLinecap="round"/>
          </svg></Card>
        </div>
      </Section>

      {/* ─── Bauhaus figure specialisation (SpectreaFigure) ─── */}
      <Section title="Bauhaus figures · the Form-layer specialisation for human imagery">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          When a composition needs to explicitly depict people, use the <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">SpectreaFigure</code> component. Figures are built from Layer-2 Forms (rounded rectangles for body parts) wrapped in Layer-1 atoms (head Dot, hand Dots, the occasional Trail / Halo). Standing only — pose articulation is out of scope for hand-coded SVG.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Tile label="Single figure"><SpectreaFigure color="cobalt" height={140}/></Tile>
          <Tile label="Pair"><ScenePair/></Tile>
          <Tile label="Cohort (team)"><SceneCohort/></Tile>
          <Tile label="Crowd"><SceneCrowd/></Tile>
        </div>
        <p className="text-xs text-stone-500 mt-3">
          <strong className="text-stone-700">Honest limits:</strong> these figures don't walk, sit, reach, or gesture. For scenes needing pose articulation (a person at a desk reaching for a cup, a conversation with body language), use <ChannelPill kind="aigen"/> via the prompt.
        </p>
      </Section>

      {/* ─── What belongs to other channels ─── */}
      <Section title="What doesn't live on this page">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          These surfaces need other channels. The brand guide doesn't try to stand in for them with low-fidelity SVG.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div className="rounded-xl border border-amber-200 p-5" style={{ backgroundColor: '#E1900008' }}>
            <div className="flex items-center gap-2 mb-3">
              <ChannelPill kind="aigen"/>
              <span className="text-sm font-semibold text-stone-800">Marketing heroes</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Homepage above-fold, feature-page heroes, blog headers, social campaigns, About atmospheric imagery.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              <strong>Workflow:</strong> use the prompt at <code className="bg-amber-50 px-1 py-0.5 rounded font-mono text-[10px]">docs/illustration-prompt.md</code> → generate via Gemini / DALL-E / Firefly → vectorise with Inkscape → drop into <code className="bg-amber-50 px-1 py-0.5 rounded font-mono text-[10px]">/public/illustrations/</code>.
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 p-5" style={{ backgroundColor: '#F2426008' }}>
            <div className="flex items-center gap-2 mb-3">
              <ChannelPill kind="designer"/>
              <span className="text-sm font-semibold text-stone-800">Launch &amp; print</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Brand launch keynote slide, conference banner, print brand-guide cover, About hero, paid-media imagery, photography direction.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              <strong>Workflow:</strong> commission an illustrator briefed with this system. Brand-guide tells the designer what the rules are; the designer produces the heroes.
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 p-5" style={{ backgroundColor: '#4271DF08' }}>
            <div className="flex items-center gap-2 mb-3">
              <ChannelPill kind="canva"/>
              <span className="text-sm font-semibold text-stone-800">Template-driven recurring</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed mb-3">
              Sales decks, one-off social posts, internal flyers. Only worth setting up if the team will use it weekly.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed">
              <strong>Workflow:</strong> set up a Spectrea brand kit in Canva (palette, fonts, logo upload) and call <code className="bg-blue-50 px-1 py-0.5 rounded font-mono text-[10px]">generate-design</code> with <code className="bg-blue-50 px-1 py-0.5 rounded font-mono text-[10px]">brand_kit_id</code>.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── Animation ─── */}
      <Section>
        <div className="border-t border-stone-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-wider text-stone-400">Motion</p>
          <h2 className="text-xl font-semibold text-stone-800 mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Animation techniques — live demos</h2>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            Side-by-side of Framer Motion (<code className="text-xs bg-cloud px-1 py-0.5 rounded">framer-motion@12</code>, installed), native CSS, and SVG SMIL. Click <em>Replay</em> to re-trigger. Hover tiles to test gestures.
          </p>
        </div>
        <AnimationDemos/>
      </Section>

      {/* ─── Shipping stack ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Shipping stack</p>
          <h2 className="text-xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Free, open source, no attribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            <div className="border-l-2 pl-3" style={{ borderColor: TEAL }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: TEAL }}>Procedural · geometric &amp; figure</p>
              <p className="text-sm text-stone-400 mt-1">Inline SVG built from the atoms + Form layer + <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">SpectreaFigure</code> for human imagery.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: COBALT }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: COBALT }}>Animation</p>
              <p className="text-sm text-stone-400 mt-1"><code className="bg-graphite px-1.5 py-0.5 rounded text-xs">framer-motion</code> — MIT, installed. Wraps inline SVG. Respect prefers-reduced-motion.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: AMBER }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: AMBER }}>Data-driven dots</p>
              <p className="text-sm text-stone-400 mt-1"><code className="bg-graphite px-1.5 py-0.5 rounded text-xs">visx</code> — MIT, no attribution. Use when dots come from real data.</p>
            </div>
            <div className="border-l-2 pl-3" style={{ borderColor: ROSE }}>
              <p className="text-xs font-mono uppercase tracking-wider" style={{ color: ROSE }}>Generated · richer scenes</p>
              <p className="text-sm text-stone-400 mt-1">AI image-gen via <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">docs/illustration-prompt.md</code>. Gemini, Bing, Firefly, or Stable Diffusion local.</p>
            </div>
          </div>
          <p className="text-xs font-mono text-stone-500 mt-6">Skipped · unDraw · Storyset · Lordicon · Rive · GSAP MorphSVG · Lottie · Recraft free tier</p>
        </div>
      </Section>

      {/* ─── Anti-patterns ─── */}
      <Section title="Anti-patterns">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tile label="Mascot / character cartoon" bg="#FEF3F2"><AntiCartoon/></Tile>
          <Tile label="Generic stock photography" bg="#FEF3F2"><AntiStock/></Tile>
          <Tile label="Off-palette neon gradients" bg="#FEF3F2"><AntiOffPalette/></Tile>
          <Tile label="Skeuomorphic / photoreal 3D" bg="#FEF3F2"><AntiSkeuomorph/></Tile>
        </div>
        <div className="mt-5 rounded-lg bg-rose-50 border border-rose-100 p-4">
          <ul className="text-sm text-stone-700 space-y-1 list-disc list-inside">
            <li><strong>No mascots.</strong> Spectrea is a mentor, not a pet.</li>
            <li><strong>No stock photography.</strong> For warmth in marketing, use AI-gen via the prompt — not stock.</li>
            <li><strong>No off-palette gradients.</strong> Cobalt → Teal → Amber is the only spectrum.</li>
            <li><strong>No skeuomorphism.</strong> Chrome, glass, bevels belong to other design traditions, not Spectrea.</li>
          </ul>
        </div>
      </Section>
    </PageShell>
  )
}
