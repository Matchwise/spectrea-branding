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
        <rect x="0" y="0" width="80" height="80" rx="8" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1" />
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
        <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Revenue Model</p>
        <p className="text-xs text-stone-500 mt-1">12 connections · 94% trust</p>
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
            {['Financial Model', 'Research Paper', 'Organization'].map((item, i) => (
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
              <p className="text-sm font-semibold text-stone-800" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Create Entity</p>
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
        className="px-3 py-2 text-xs border border-stone-200 rounded-lg bg-white text-stone-700 placeholder:text-stone-400 transition-all duration-150 ease-out focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 w-48"
      />
      <span className="text-[10px] font-mono text-stone-400">border + ring · 150ms · ease-out</span>
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
      subtitle="Animation principles, timing, easing, and live demos for Spectrea interfaces."
    >
      {/* ─── Philosophy ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Motion in Spectrea should feel natural and purposeful. It guides attention, confirms actions, and creates continuity — never decorates or distracts.">
            <span>Motion Philosophy</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Purposeful, Subtle, Natural</p>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            Every animation must answer: "What does this help the user understand?" If the answer is "nothing," remove it. Motion should feel like the interface is alive and responsive, not performing.
          </p>
        </div>
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
            <div className="bg-stone-900 p-8 flex items-center justify-center">
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
        <div className="bg-stone-900 rounded-xl p-5 overflow-x-auto">
          <pre className="text-xs leading-relaxed" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <span style={{ color: '#9CA3AF' }}>{'/* Duration tokens */\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--duration-instant: 100ms;\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--duration-quick:   150ms;\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--duration-normal:  200ms;\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--duration-slow:    300ms;\n\n'}</span>
            <span style={{ color: '#9CA3AF' }}>{'/* Easing tokens */\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--ease-out:    cubic-bezier(0, 0, 0.2, 1);\n'}</span>
            <span style={{ color: '#F9FAFB' }}>{'--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\n\n'}</span>
            <span style={{ color: '#9CA3AF' }}>{'/* Common patterns */\n'}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { transition: transform 150ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'.hover-scale:hover'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { transform: scale(1.02); }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.fade-in'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { animation: fadeIn 200ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes fadeIn'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { from { opacity: 0; } }\n\n'}</span>
            <span style={{ color: '#E19000' }}>{'.scale-up'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { animation: scaleUp 200ms var(--ease-out); }\n'}</span>
            <span style={{ color: '#E19000' }}>{'@keyframes scaleUp'}</span>
            <span style={{ color: '#F9FAFB' }}>{' { from { opacity: 0; transform: scale(0.95); } }'}</span>
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
          <div className="mt-3 bg-stone-900 rounded-lg px-4 py-3">
            <pre className="text-xs" style={{ fontFamily: "'JetBrains Mono', monospace", color: '#9CA3AF' }}>
              <span style={{ color: '#E19000' }}>{'@media'}</span>
              <span style={{ color: '#F9FAFB' }}>{' (prefers-reduced-motion: reduce) {\n'}</span>
              <span style={{ color: '#F9FAFB' }}>{'  *, *::before, *::after {\n'}</span>
              <span style={{ color: '#F9FAFB' }}>{'    animation-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F9FAFB' }}>{'    transition-duration: 0.01ms !important;\n'}</span>
              <span style={{ color: '#F9FAFB' }}>{'  }\n'}</span>
              <span style={{ color: '#F9FAFB' }}>{'}'}</span>
            </pre>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
