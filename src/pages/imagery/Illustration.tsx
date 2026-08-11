import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { illustration } from '../../data/brand'

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

/* Exemplars. Each is the render the register named, produced by the DNA block
   in this page — the provenance rule is part of the doctrine: no shipped
   example predates the system it demonstrates. */
const EXEMPLARS: Record<string, { src: string; caption: string }> = {
  hero: { src: './illustrations/example-hero.jpg', caption: 'Detailed and balanced, warm light, Cobalt leading.' },
  spot: { src: './illustrations/example-spot.jpg', caption: 'A few large shapes and one large calm area.' },
  docs: { src: './illustrations/example-docs.jpg', caption: 'One idea in motion — order emerging from scatter.' },
  product: { src: './illustrations/example-product.jpg', caption: 'Named sources beside the answer, with the text the interface needs.' },
}

/* ================================================================== */
/*  Display primitives                                                  */
/* ================================================================== */

function Card({ label, children, darkBg = false }: { label: string; children: React.ReactNode; darkBg?: boolean }) {
  return (
    <div className="flex flex-col rounded-xl border overflow-hidden" style={{ borderColor: darkBg ? '#2E2F35' : '#E7E5E4' }}>
      <div
        className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider"
        style={darkBg
          ? { color: '#B0B0B6', backgroundColor: '#18181C', borderBottom: '1px solid #2E2F35' }
          : { color: '#78716C', backgroundColor: '#FAFAF9', borderBottom: '1px solid #F4F4F1' }
        }
      >
        {label}
      </div>
      <div className={darkBg ? 'bg-ink' : 'bg-white'}>
        {children}
      </div>
    </div>
  )
}

function Tile({ children, label, bg = CLOUD }: { children: React.ReactNode; label: string; bg?: string }) {
  return (
    <div className="flex flex-col">
      <div
        className="rounded-xl p-4 flex items-center justify-center overflow-hidden"
        style={{ background: bg, aspectRatio: '16 / 10' }}
      >
        {children}
      </div>
      <p className="mt-2 text-xs text-slate">{label}</p>
    </div>
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
      <rect x="15" y="25" width="90" height="60" rx="4" fill="#D6D3D1" />
      <circle cx="35" cy="50" r="8" fill="#9ca3af" />
      <path d="M20,80 L45,60 L65,75 L100,50 L100,80 Z" fill="#9ca3af" />
      <text x="60" y="105" textAnchor="middle" fontSize="9" fill={PEWTER}>stock-vibes</text>
    </svg>
  )
}

function AntiOutlined() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-auto">
      <rect width="120" height="120" rx="6" fill={CANVAS} />
      <circle cx="60" cy="60" r="28" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M 32 72 Q 60 48 88 72" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx="42" cy="58" r="3" fill="none" stroke={INK} strokeWidth="1.5" />
      <circle cx="78" cy="58" r="3" fill="none" stroke={INK} strokeWidth="1.5" />
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

/* ================================================================== */
/*  Page                                                                */
/* ================================================================== */

export default function Illustration() {
  return (
    <PageShell
      title="Illustration"
      subtitle="One invariant prompt block carries the identity; one sentence per job sets the context. Two media split by what each is actually good at. Measurements report — a person looks at every render."
    >
      {/* ─── Doctrine ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COBALT }}>The illustration system</p>
          <h2 className="text-2xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>One DNA, one register sentence.</h2>
          <p className="text-sm mt-3 max-w-2xl leading-relaxed" style={{ color: '#B0B0B6' }}>
            {illustration.doctrine}
          </p>
        </div>
      </Section>

      {/* ─── The DNA block ─── */}
      <Section title="The DNA block">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Every image starts here. Fill the four slots; change nothing else. {illustration.promptNote}
        </p>
        <div className="rounded-xl border border-stone-200 overflow-hidden">
          <pre className="p-5 text-xs leading-relaxed overflow-x-auto font-mono whitespace-pre-wrap" style={{ backgroundColor: PAPER, color: INK }}>
            {illustration.dnaPrompt}
          </pre>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {Object.entries(illustration.promptSlots).map(([slot, rule]) => (
            <div key={slot} className="rounded-xl border border-stone-200 p-4">
              <p className="text-xs font-mono font-semibold mb-1" style={{ color: COBALT }}>[{slot}]</p>
              <p className="text-xs text-iron leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Registers ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The register is the only thing that varies between jobs. It is chosen for the job at hand and never enforced across jobs — a hero and a spot illustration are supposed to look different.">
            <span>Registers</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {illustration.registers.map(reg => {
            const ex = EXEMPLARS[reg.id]
            return (
              <div key={reg.id} className="rounded-xl border border-stone-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: '#4271DF15', color: '#2F58B8' }}>{reg.id}</span>
                      <p className="text-xs text-slate">{reg.job}</p>
                    </div>
                    <p className="text-sm text-ink leading-relaxed italic">“{reg.sentence}”</p>
                    {ex && <p className="text-xs text-slate mt-3 leading-relaxed">{ex.caption}</p>}
                    {!ex && <p className="text-xs text-slate mt-3 leading-relaxed">No exemplar rendered yet — the sentence is canonical, the example follows the first real use.</p>}
                  </div>
                  {ex && (
                    <div className="border-t md:border-t-0 md:border-l border-stone-200" style={{ backgroundColor: PAPER }}>
                      <img src={ex.src} alt={`${reg.id} register example`} className="w-full h-full object-cover block" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 rounded-xl p-5 border" style={{ backgroundColor: '#E1900010', borderColor: '#E1900030' }}>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#7C4D04' }}>A context that is not listed</p>
          <p className="text-xs text-iron leading-relaxed">{illustration.registerDerivation}</p>
        </div>
      </Section>

      {/* ─── Ranges ─── */}
      <Section title="The allowed range">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          What may vary, how far, and where the default sits. Outside the stated bound is a defect, not a variation.
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {illustration.ranges.map((r, i) => (
            <div key={r.axis} className="px-5 py-4" style={{ borderBottom: i < illustration.ranges.length - 1 ? '1px solid #F5F5F4' : 'none' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <p className="text-sm font-semibold text-ink">{r.axis}</p>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                  style={r.judgedBy === 'eye'
                    ? { backgroundColor: '#E1900015', color: '#9A6300' }
                    : { backgroundColor: '#00B6A015', color: '#007362' }}
                >
                  judged by {r.judgedBy}
                </span>
              </div>
              <p className="text-xs text-iron leading-relaxed">{r.range}</p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="text-xs text-slate leading-relaxed"><strong className="text-iron">Default:</strong> {r.default}</p>
                <p className="text-xs text-slate leading-relaxed"><strong style={{ color: '#BA3249' }}>Out of range:</strong> {r.outOfRange}</p>
              </div>
              {'note' in r && r.note && <p className="text-xs text-slate mt-2 leading-relaxed italic">{r.note}</p>}
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Media split ─── */}
      <Section title="Two media, split by capability">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-amber-200 overflow-hidden" style={{ backgroundColor: '#E1900010' }}>
            <img src={EXEMPLARS.product.src} alt="Product illustration, generated raster" className="w-full h-auto block" />
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#7C4D04' }}>Generated raster</p>
              <p className="text-xs text-iron leading-relaxed">{illustration.media.raster}</p>
            </div>
          </div>
          <div className="rounded-xl border border-teal-200 overflow-hidden" style={{ backgroundColor: '#00B6A010' }}>
            <img src="./illustrations/example-product-vector.svg" alt="The same product brief, hand-authored SVG" className="w-full h-auto block" style={{ background: PAPER }} />
            <div className="p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#007362' }}>Hand-authored SVG</p>
              <p className="text-xs text-iron leading-relaxed">{illustration.media.vector}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate mt-4 leading-relaxed">
          <strong className="text-ink">Choosing:</strong> {illustration.media.choosing}
        </p>
      </Section>

      {/* ─── Reference images ─── */}
      <Section title="Reference images">
        <p className="text-sm text-slate mb-4 leading-relaxed">{illustration.reference.doctrine}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {illustration.reference.modes.map(mode => (
            <div key={mode.id} className="rounded-xl border border-stone-200 p-5">
              <p className="text-xs font-mono font-semibold mb-1" style={{ color: COBALT }}>{mode.id}</p>
              <p className="text-sm font-semibold text-ink mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{mode.when}</p>
              <p className="text-xs text-slate leading-relaxed">{mode.effect}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── Checklist: reports, not gates ─── */}
      <Section title="What gets measured">
        <div className="rounded-xl border border-stone-200 p-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: '#00B6A015', color: '#007362' }}>
              {illustration.checklist.stance}
            </span>
            {illustration.checklist.reports.map(rep => (
              <span key={rep} className="text-xs font-mono px-2 py-0.5 rounded bg-cloud text-iron border border-stone-200">{rep}</span>
            ))}
          </div>
          <p className="text-xs text-iron leading-relaxed">{illustration.checklist.why}</p>
        </div>
      </Section>

      {/* ─── Abstract end of the range ─── */}
      <Section title="The abstract end">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          People are not part of the DNA and neither are objects: the two shape families can be the
          subject themselves. This is the far end of the abstraction axis, and the one place a third
          primary at full strength is defensible — the shapes are what the image is about.
        </p>
        <div className="rounded-xl overflow-hidden border border-stone-200">
          <img src="./illustrations/example-abstract.jpg" alt="Abstract composition — geometric facets meeting organic curves" className="w-full h-auto block" style={{ background: PAPER }} />
        </div>
      </Section>

      {/* ─── SUBSTRATE · Graph primitives ─── */}
      <Section title="Substrate · graph primitives">
        <p className="text-sm text-slate mb-5 leading-relaxed">
          The data-viz vocabulary that matches the product schema. Semantic node colours (Cobalt = entity, Teal = observation, Amber = claim, Pewter = ghost). Edge styles (strong / inferred / weak / curved). Trail, confidence, highlight as state encodings.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card label="Node types">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="26" cy="30" r="9" fill={COBALT} />
              <circle cx="60" cy="30" r="9" fill={TEAL} />
              <circle cx="94" cy="30" r="9" fill={AMBER} />
              <circle cx="60" cy="60" r="7" fill={PEWTER} />
              <text x="26" y="80" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill={PEWTER}>entity</text>
              <text x="60" y="80" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill={PEWTER}>observ.</text>
              <text x="94" y="80" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill={PEWTER}>claim</text>
            </svg>
          </Card>
          <Card label="Edge styles">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <line x1="14" y1="22" x2="106" y2="22" stroke={PEWTER} strokeWidth="1.8" strokeLinecap="round" />
              <line x1="14" y1="42" x2="106" y2="42" stroke={PEWTER} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 4" />
              <line x1="14" y1="62" x2="106" y2="62" stroke={PEWTER} strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 4" />
              <path d="M 14 78 C 40 68, 80 88, 106 78" stroke={COBALT} strokeWidth="1.8" fill="none" strokeLinecap="round" />
            </svg>
          </Card>
          <Card label="Cluster">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="60" cy="45" r="10" fill={AMBER} />
              <circle cx="60" cy="45" r="18" fill={AMBER} opacity="0.22" />
              <circle cx="32" cy="26" r="5" fill={COBALT} />
              <circle cx="88" cy="24" r="5" fill={COBALT} />
              <circle cx="36" cy="68" r="5" fill={COBALT} opacity="0.75" />
              <circle cx="86" cy="66" r="5" fill={TEAL} />
              <path d="M 60 45 L 32 26" stroke={PEWTER} strokeWidth="1.2" opacity="0.5" />
              <path d="M 60 45 L 88 24" stroke={PEWTER} strokeWidth="1.2" opacity="0.5" />
              <path d="M 60 45 L 36 68" stroke={PEWTER} strokeWidth="1.2" opacity="0.35" />
              <path d="M 60 45 L 86 66" stroke={PEWTER} strokeWidth="1.2" opacity="0.5" />
            </svg>
          </Card>
          <Card label="Trail">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="16" cy="52" r="3" fill={COBALT} opacity="0.18" />
              <circle cx="34" cy="50" r="3.5" fill={COBALT} opacity="0.38" />
              <circle cx="54" cy="46" r="4" fill={COBALT} opacity="0.6" />
              <circle cx="76" cy="42" r="5" fill={COBALT} opacity="0.82" />
              <circle cx="100" cy="38" r="7" fill={COBALT} />
            </svg>
          </Card>
          <Card label="Confidence">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="22" cy="45" r="9" fill={COBALT} opacity="0.25" />
              <circle cx="50" cy="45" r="9" fill={COBALT} opacity="0.5" />
              <circle cx="78" cy="45" r="9" fill={COBALT} opacity="0.78" />
              <circle cx="106" cy="45" r="9" fill={COBALT} />
            </svg>
          </Card>
          <Card label="Highlight">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="60" cy="45" r="26" fill={AMBER} opacity="0.18" />
              <circle cx="60" cy="45" r="15" fill={AMBER} opacity="0.32" />
              <circle cx="60" cy="45" r="9" fill={AMBER} />
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── SUBSTRATE · In-product state dots ─── */}
      <Section title="Substrate · in-product state moments">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Small schematic illustrations the product uses to communicate state. Each composes from atoms only.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card label="Connection formed">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="22" cy="45" r="6" fill={COBALT} />
              <circle cx="98" cy="45" r="6" fill={AMBER} />
              <path d="M 28 45 C 50 22, 70 68, 92 45" stroke={PEWTER} strokeWidth="1.6" fill="none" opacity="0.6" />
              <circle cx="60" cy="42" r="4" fill={CANVAS} stroke={AMBER} strokeWidth="2" />
            </svg>
          </Card>
          <Card label="Item arrived">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="60" cy="45" r="32" fill={TEAL} opacity="0.10" />
              <circle cx="60" cy="45" r="20" fill={TEAL} opacity="0.20" />
              <circle cx="60" cy="45" r="11" fill={TEAL} />
            </svg>
          </Card>
          <Card label="AI just acted">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <defs>
                <linearGradient id="ai-v7" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COBALT} />
                  <stop offset="33%" stopColor={TEAL} />
                  <stop offset="66%" stopColor={AMBER} />
                  <stop offset="100%" stopColor={ROSE} />
                </linearGradient>
              </defs>
              <rect x="14" y="44" width="92" height="3" rx="1.5" fill="url(#ai-v7)" />
            </svg>
          </Card>
          <Card label="Notification badge">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <rect x="32" y="22" width="56" height="44" rx="6" fill={CLOUD} />
              <circle cx="86" cy="26" r="7" fill={ROSE} />
              <text x="86" y="29" fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="#fff" textAnchor="middle">3</text>
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── SUBSTRATE · Empty / loading ─── */}
      <Section title="Substrate · empty &amp; loading">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card label="Nothing here yet">
            <svg viewBox="0 0 200 90" className="w-full h-24">
              <circle cx="100" cy="40" r="9" fill={COBALT} />
              <circle cx="64" cy="50" r="3" fill={PEWTER} opacity="0.4" />
              <circle cx="136" cy="50" r="3" fill={PEWTER} opacity="0.4" />
              <text x="100" y="80" fontFamily="'JetBrains Mono', monospace" fontSize="9" fill={PEWTER} textAnchor="middle">add your first item</text>
            </svg>
          </Card>
          <Card label="Loading skeleton">
            <svg viewBox="0 0 200 90" className="w-full h-24">
              <rect x="20" y="20" width="120" height="10" rx="5" fill="#EDF0F8" />
              <rect x="20" y="38" width="160" height="6" rx="3" fill={CLOUD} />
              <rect x="20" y="50" width="140" height="6" rx="3" fill={CLOUD} />
              <rect x="20" y="68" width="44" height="14" rx="7" fill="#EDF0F8" />
            </svg>
          </Card>
          <Card label="Searching">
            <svg viewBox="0 0 200 90" className="w-full h-24">
              <circle cx="100" cy="42" r="22" fill="none" stroke={COBALT} strokeWidth="2" opacity="0.5" strokeDasharray="6 4" />
              <circle cx="100" cy="42" r="6" fill={COBALT} />
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── SUBSTRATE · Section dividers ─── */}
      <Section title="Substrate · section dividers">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card label="Spectrum band">
            <svg viewBox="0 0 200 40" className="w-full h-16">
              <defs>
                <linearGradient id="dv-v7" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COBALT} />
                  <stop offset="33%" stopColor={TEAL} />
                  <stop offset="66%" stopColor={AMBER} />
                  <stop offset="100%" stopColor={ROSE} />
                </linearGradient>
              </defs>
              <rect x="0" y="18" width="200" height="4" fill="url(#dv-v7)" />
            </svg>
          </Card>
          <Card label="Dot rule">
            <svg viewBox="0 0 200 40" className="w-full h-16">
              <circle cx="80" cy="20" r="2" fill={PEWTER} />
              <circle cx="92" cy="20" r="2" fill={PEWTER} />
              <circle cx="104" cy="20" r="2" fill={PEWTER} />
              <circle cx="116" cy="20" r="2" fill={PEWTER} />
              <circle cx="128" cy="20" r="2" fill={PEWTER} />
            </svg>
          </Card>
          <Card label="Arc divider">
            <svg viewBox="0 0 200 40" className="w-full h-16">
              <path d="M 20 32 Q 100 10 180 32" stroke={COBALT} strokeWidth="1.4" fill="none" opacity="0.7" strokeLinecap="round" />
            </svg>
          </Card>
        </div>
      </Section>

      {/* ─── SUBSTRATE · Painterly-field backdrop ─── */}
      <Section title="Substrate · painterly-field backdrop">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Reusable atmosphere for any scene that needs warmth behind it. Paper ground plus two overlapping soft radial washes in bridge tones. Never the subject.
        </p>
        <Tile label="Paper + Cobalt Wash (upper-left) + Amber Stone (lower-right)">
          <svg viewBox="0 0 400 200" className="w-full h-auto">
            <defs>
              <radialGradient id="pf-cobalt-page" cx="22%" cy="25%" r="62%">
                <stop offset="0%" stopColor="#D6DEF0" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#EDF0F8" stopOpacity="0.5" />
                <stop offset="100%" stopColor={PAPER} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="pf-amber-page" cx="78%" cy="75%" r="58%">
                <stop offset="0%" stopColor="#EDE0C0" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#F5F0E6" stopOpacity="0.5" />
                <stop offset="100%" stopColor={PAPER} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="200" fill={PAPER} />
            <rect width="400" height="200" fill="url(#pf-cobalt-page)" />
            <rect width="400" height="200" fill="url(#pf-amber-page)" />
          </svg>
        </Tile>
      </Section>

      {/* ─── Anti-patterns ─── */}
      <Section title="Anti-patterns">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Tile label="Mascots / character cartoons" bg="#FEF3F2"><AntiCartoon /></Tile>
          <Tile label="Stock photography" bg="#FEF3F2"><AntiStock /></Tile>
          <Tile label="Outlined / line-art" bg="#FEF3F2"><AntiOutlined /></Tile>
          <Tile label="Off-palette neon" bg="#FEF3F2"><AntiOffPalette /></Tile>
        </div>
        <div className="mt-5 rounded-lg bg-rose-50 border border-rose-100 p-4">
          <ul className="text-sm text-iron space-y-1 list-disc list-inside">
            {illustration.antiPatterns.map(ap => (
              <li key={ap.never}><strong>{ap.never}.</strong> {ap.because}</li>
            ))}
          </ul>
        </div>
      </Section>
    </PageShell>
  )
}
