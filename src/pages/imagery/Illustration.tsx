import PageShell, { Section } from '../../components/layout/PageShell'

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
      <p className="mt-2 text-xs text-stone-500">{label}</p>
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
      <rect x="15" y="25" width="90" height="60" rx="4" fill="#d1d5db" />
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
      subtitle="One universal prompt for every hero scene, a tight set of hand-coded primitives for the schematic work in between. No outlines. Warmth through tints of primaries, never neutrals."
    >
      {/* ─── v4 Manifesto ─── */}
      <Section>
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: COBALT }}>The illustration system · v4</p>
          <h2 className="text-2xl font-semibold mt-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>One prompt, one substrate, one checklist.</h2>
          <p className="text-sm mt-3 max-w-2xl leading-relaxed" style={{ color: '#B0B0B6' }}>
            v4 is a universal, subject-agnostic prompt — one template renders any scene (person at a desk, city skyline, abstract concept, dashboard) in the brand voice. Warmth comes from palette discipline: supporting elements use 20–60% tints of the primaries, never default to neutrals. Subtle depth from a single darker tonal step per rounded object. No outlines anywhere.
          </p>
          <p className="text-sm mt-3 max-w-2xl leading-relaxed" style={{ color: '#B0B0B6' }}>
            For mid- and higher-complexity illustration, use the prompt in <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">docs/illustration-prompt.md</code> with your image generator. For basic primitives — graph vocabulary, section dividers, in-product state dots — use the hand-coded substrate below.
          </p>
        </div>
      </Section>

      {/* ─── Division of labour ─── */}
      <Section title="Two tracks · where to reach for what">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-amber-200 p-5" style={{ backgroundColor: '#E1900010' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#7C4D04' }}>Image-gen via v4 prompt</p>
            <p className="text-sm font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Mid- and higher-complexity scenes</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Marketing heroes, feature-page illustrations, blog headers, About imagery, onboarding scenes, social posts. Any 16:9 composition with a recognisable scene.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mt-2">
              Paste the prompt from <code className="bg-amber-50 px-1 py-0.5 rounded font-mono text-[10px]">docs/illustration-prompt.md</code> into Gemini / Firefly / Imagen, fill the <code className="bg-amber-50 px-1 py-0.5 rounded font-mono text-[10px]">SUBJECT:</code> line, evaluate against the checklist, iterate.
            </p>
          </div>
          <div className="rounded-xl border border-teal-200 p-5" style={{ backgroundColor: '#00B6A010' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: '#007362' }}>Hand-coded SVG</p>
            <p className="text-sm font-semibold text-stone-800 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Basic, simple, direct primitives</p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Graph primitives (node, edge, cluster, trail, confidence, highlight), section dividers, in-product state dots, painterly-field backdrop, small threads and constellations.
            </p>
            <p className="text-xs text-stone-500 leading-relaxed mt-2">
              <strong>Rule of thumb:</strong> if the piece fits in a 120×90 brand-guide vocabulary card, hand-SVG. If it wants to be a 16:9 scene, image-gen.
            </p>
          </div>
        </div>
      </Section>

      {/* ─── Palette ratio + tint discipline ─── */}
      <Section title="Palette & tint discipline">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          60 / 20 / 10 / 10 by visual weight — Canvas &amp; Paper / Cloud surface / Ink &amp; Pewter structure / Spectrum. One hero primary per composition dominates; the other primaries appear as supporting tints or accents. <strong>Supporting elements use 20–60% tints of the primaries, never default to neutrals</strong> — that's the whole fix for "cold / drab."
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden bg-white">
          <div className="h-10 flex">
            <div className="flex-[60]" style={{ backgroundColor: CANVAS, borderRight: '1px solid #ECECE7' }} />
            <div className="flex-[20]" style={{ backgroundColor: CLOUD }} />
            <div className="flex-[10]" style={{ backgroundColor: INK }} />
            <div className="flex-[3]" style={{ backgroundColor: COBALT }} />
            <div className="flex-[3]" style={{ backgroundColor: TEAL }} />
            <div className="flex-[2]" style={{ backgroundColor: AMBER }} />
            <div className="flex-[2]" style={{ backgroundColor: ROSE }} />
          </div>
          <div className="grid grid-cols-4 px-4 py-3 text-center">
            <div><p className="text-sm font-semibold text-stone-800">60%</p><p className="text-xs text-stone-500">Canvas / Paper</p></div>
            <div><p className="text-sm font-semibold text-stone-800">20%</p><p className="text-xs text-stone-500">Cloud surface</p></div>
            <div><p className="text-sm font-semibold text-stone-800">10%</p><p className="text-xs text-stone-500">Ink &amp; Pewter</p></div>
            <div><p className="text-sm font-semibold text-stone-800">10%</p><p className="text-xs text-stone-500">Spectrum accents</p></div>
          </div>
        </div>
      </Section>

      {/* ─── Warmth checklist ─── */}
      <Section title="Warmth + palette checklist">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Evaluate every image-gen output against these. Ship only if all pass.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            ['01', 'Zero outlines', 'Not a single stroke anywhere — figures, objects, edges, or type.'],
            ['02', 'Every element carries colour', 'No element defaults to pure neutral. Background and mid-ground forms use tints of primaries.'],
            ['03', 'One hero primary', 'A single spectrum colour dominates; others as supporting tints or accents.'],
            ['04', 'Subtle depth', 'At least one rounded object has a single darker tonal step on the shadow side. No soft gradients, no drop shadows.'],
            ['05', 'Both modes present', 'Geometric shapes never drop below ~15% of the composition. Organic shapes always present.'],
            ['06', 'Coloured ground', 'Background is a palette neutral or palette gradient — not pure white, not pure grey.'],
            ['07', 'No face detail', 'A face is a suggestion — one dot per eye max, or blank.'],
            ['08', 'Asymmetric balance', 'Rule-of-thirds or diagonal flow. Not centred.'],
          ].map(([n, title, desc]) => (
            <div key={n} className="rounded-xl border border-stone-200 p-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: COBALT }}>{n}</p>
              <p className="text-sm font-semibold text-stone-800 mb-1" style={{ fontFamily: "'Albert Sans', sans-serif" }}>{title}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SUBSTRATE · Graph primitives ─── */}
      <Section title="Substrate · graph primitives">
        <p className="text-sm text-stone-500 mb-5 leading-relaxed">
          The data-viz vocabulary that matches the product schema. Semantic node colours (Cobalt = entity, Teal = observation, Amber = claim, Pewter = ghost). Edge styles (strong / inferred / weak / curved). Trail, confidence, highlight as state encodings.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card label="Node types">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <circle cx="26" cy="30" r="9" fill={COBALT} />
              <circle cx="60" cy="30" r="9" fill={TEAL} />
              <circle cx="94" cy="30" r="9" fill={AMBER} />
              <circle cx="60" cy="60" r="7" fill={PEWTER} />
              <text x="26" y="80" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill={PEWTER}>entity</text>
              <text x="60" y="80" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill={PEWTER}>observ.</text>
              <text x="94" y="80" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" fill={PEWTER}>claim</text>
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
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
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
                <linearGradient id="ai-v4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COBALT} />
                  <stop offset="33%" stopColor={TEAL} />
                  <stop offset="66%" stopColor={AMBER} />
                  <stop offset="100%" stopColor={ROSE} />
                </linearGradient>
              </defs>
              <rect x="14" y="44" width="92" height="3" rx="1.5" fill="url(#ai-v4)" />
            </svg>
          </Card>
          <Card label="Notification badge">
            <svg viewBox="0 0 120 90" className="w-full h-24">
              <rect x="32" y="22" width="56" height="44" rx="6" fill={CLOUD} />
              <circle cx="86" cy="26" r="7" fill={ROSE} />
              <text x="86" y="29" fontFamily="ui-monospace,monospace" fontSize="8" fill="#fff" textAnchor="middle">3</text>
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
              <text x="100" y="80" fontFamily="ui-monospace,monospace" fontSize="9" fill={PEWTER} textAnchor="middle">add your first item</text>
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
                <linearGradient id="dv-v4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={COBALT} />
                  <stop offset="33%" stopColor={TEAL} />
                  <stop offset="66%" stopColor={AMBER} />
                  <stop offset="100%" stopColor={ROSE} />
                </linearGradient>
              </defs>
              <rect x="0" y="18" width="200" height="4" fill="url(#dv-v4)" />
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
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
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

      {/* ─── Hero example ─── */}
      <Section title="Hero example">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Generated from the v4 prompt below via Gemini. Subject: a figure working with a flow of brand shapes. Passes the 8-item checklist — zero outlines, tints of primaries on supporting shapes, one hero primary (Teal) dominant with Cobalt figure and small Amber / Rose accents, no facial detail, subtle tonal step on the organic shapes, palette ground (not pure white, not pure grey), both geometric and organic present, asymmetric.
        </p>
        <div className="rounded-xl overflow-hidden border border-stone-200">
          <img
            src="./illustrations/hero-example-composition.png"
            alt="Hero example generated from the v4 prompt — a figure composing with brand shapes"
            className="w-full h-auto block"
            style={{ background: PAPER }}
          />
        </div>
      </Section>

      {/* ─── Using the v4 prompt ─── */}
      <Section title="Using the v4 prompt for hero illustrations">
        <div className="rounded-xl bg-ink text-white p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: AMBER }}>Workflow</p>
          <ol className="mt-3 space-y-3 text-sm leading-relaxed" style={{ color: '#B0B0B6' }}>
            <li><strong style={{ color: '#F4F4F1' }}>1.</strong> Write your subject — one sentence. It can be literally anything; the prompt doesn't constrain it.</li>
            <li><strong style={{ color: '#F4F4F1' }}>2.</strong> Copy the prompt block from <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">docs/illustration-prompt.md</code>. Paste into Gemini / Firefly / Bing / Imagen / Stable Diffusion.</li>
            <li><strong style={{ color: '#F4F4F1' }}>3.</strong> Generate four variants.</li>
            <li><strong style={{ color: '#F4F4F1' }}>4.</strong> Score each against the 8-item checklist above. If 0 of 4 pass, find the rule the model ignored and tighten that section.</li>
            <li><strong style={{ color: '#F4F4F1' }}>5.</strong> When one lands, save it as the <em>reference image</em> and attach it as a style anchor for every subsequent generation.</li>
            <li><strong style={{ color: '#F4F4F1' }}>6.</strong> Vectorise the raster (Inkscape → Path → Trace Bitmap). Drop the SVG into <code className="bg-graphite px-1.5 py-0.5 rounded text-xs">/public/illustrations/</code>. Any stroke that sneaks in during trace — delete.</li>
          </ol>
          <p className="text-xs mt-5" style={{ color: '#B0B0B6' }}>The prompt is deliberately subject-agnostic. Editorial decisions about <em>what</em> to illustrate belong in content briefs, not in the render prompt.</p>
        </div>
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
          <ul className="text-sm text-stone-700 space-y-1 list-disc list-inside">
            <li><strong>No mascots.</strong> Spectrea is a mentor, not a pet.</li>
            <li><strong>No stock photography.</strong> For warmth in marketing, use image-gen via the v4 prompt.</li>
            <li><strong>No outlines or line art.</strong> All shapes are filled. Any stroke that sneaks in — delete.</li>
            <li><strong>No off-palette gradients.</strong> Brand palette only; tints of primaries for supporting elements.</li>
            <li><strong>No Bauhaus limb-figures.</strong> The retired SpectreaFigure component illustrated the opposite of the product's composability promise — image-gen figures replace it.</li>
          </ul>
        </div>
      </Section>
    </PageShell>
  )
}
