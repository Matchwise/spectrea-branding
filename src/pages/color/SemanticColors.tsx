import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { colorSystem, selectedPalette } from '../../data/brand'

// The three-tier framework renders canon (colorSystem.tiers, decision 30);
// the per-tier application tables below each rule are page-specific detail.
const TIERS = colorSystem.tiers

// Accent-on-Ink contrast figures are computed from the canon hexes — the
// numbers can never disagree with the palette.
const HEX = (name: string) => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const srgbLin = (c: number) => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(i => srgbLin(parseInt(hex.slice(i, i + 2), 16)))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const ON_INK = (name: string) => {
  const r = contrast(HEX(name), HEX('Ink'))
  return `${r >= 10 ? r.toFixed(1) : r.toFixed(2)}:1`
}

const semanticColors = [
  {
    name: 'Primary / Info',
    color: '#4271DF',
    light: '#EDF0F8',
    lightName: 'Cobalt Wash',
    dark: '#1E3A8A',
    usage: 'Primary actions (buttons, links, focus states) and informational alerts (notable updates, system notices). Cobalt serves dual purpose — triggering actions in Tier 1 and communicating noteworthy information in Tier 3.',
    maps: 'Cobalt (hero)',
  },
  {
    name: 'Success / Positive',
    color: '#00B6A0',
    light: '#E6F5F3',
    lightName: 'Teal Mist',
    dark: '#0D5E56',
    usage: 'Success messages, positive trends, completed states, connected status, verified items.',
    maps: 'Teal (spectrum)',
  },
  {
    name: 'Warning / Attention',
    color: '#E19000',
    light: '#F5F0E6',
    lightName: 'Amber Stone',
    dark: '#7C4D04',
    usage: 'Warning alerts, pending states, confidence scores below threshold, approaching limits.',
    maps: 'Amber (spectrum)',
  },
  {
    name: 'Error / Destructive',
    color: '#F24260',
    light: '#FDF0F2',
    lightName: 'Rose Blush',
    dark: '#9F1239',
    usage: 'Error messages, destructive actions, failed states, critical alerts, form validation errors.',
    maps: 'Rose (spectrum)',
  },
  {
    name: 'Neutral',
    color: '#97979E',
    light: '#F4F4F1',
    lightName: 'Cloud',
    dark: '#3A3A40',
    usage: 'Disabled states, borders, dividers, placeholder text. Passive context — present if needed, never demanding attention.',
    maps: 'Pewter (muted)',
  },
]

// Bridge tones — the tinted-wash tier that sits between neutral canvas and full spectrum.
// 5–10% saturation. Derived from each spectrum color.
const bridgeTones = [
  {
    name: 'Cobalt Wash',
    hex: '#EDF0F8',
    source: 'Cobalt',
    when: 'Informational surfaces',
    usage: 'Backgrounds for info alerts and system notices. Selected rows in tables. Subtle hover states on surfaces. Section backgrounds that need to read as "actionable context."',
  },
  {
    name: 'Teal Mist',
    hex: '#E6F5F3',
    source: 'Teal',
    when: 'Positive surfaces',
    usage: 'Success toast backgrounds. Positive callouts (growth metrics, completion panels). Verified-claim badges. Graph-node highlight on hover.',
  },
  {
    name: 'Amber Stone',
    hex: '#F5F0E6',
    source: 'Amber',
    when: 'Warm / attention surfaces',
    usage: 'Warning alert backgrounds. Pending-state panels. Highlighted quotes or featured content. Bookmarked item backgrounds.',
  },
  {
    name: 'Rose Blush',
    hex: '#FDF0F2',
    source: 'Rose',
    when: 'Critical surfaces',
    usage: 'Error message backgrounds. Destructive-action confirmation contexts. Failed-state panels. Critical alert callouts.',
  },
]

export default function SemanticColors() {
  return (
    <PageShell
      title="Semantic Colors"
      subtitle="How the spectrum maps to functional meaning in the product UI."
    >
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Semantic colors carry consistent meaning across the product. Users learn that teal = good, amber = caution, rose = problem. Never use a semantic color for decoration — it will confuse users.">
            <span>Functional Color Mapping</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-slate mb-6">
          Each spectrum accent maps to a semantic role. Every color carries meaning — consistency builds trust.
        </p>

        <div className="space-y-4">
          {semanticColors.map(sc => (
            <div key={sc.name} className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 h-12">
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.light }}>
                  <span className="text-xs font-mono" style={{ color: sc.color }}>Wash</span>
                </div>
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.color }}>
                  <span className="text-xs font-mono text-white">Accent</span>
                </div>
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.dark }}>
                  <span className="text-xs font-mono text-white">On-wash text</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-ink">{sc.name}</h3>
                  <span className="text-xs font-mono text-pewter bg-cloud px-1.5 py-0.5 rounded">{sc.maps}</span>
                </div>
                <p className="text-xs text-iron">{sc.usage}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-xs font-mono text-pewter">Wash ({sc.lightName}): {sc.light}</span>
                  <span className="text-xs font-mono text-pewter">Accent: {sc.color}</span>
                  <span className="text-xs font-mono text-pewter">On-wash text: {sc.dark}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Usage in context */}
      <Section title="Semantic Colors in Context">
        <div className="border border-stone-200 rounded-xl p-5 space-y-3">
          {/* Success toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#E6F5F3', border: '1px solid #00B6A020' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
            <p className="text-xs" style={{ color: '#0D5E56' }}>Item created successfully with 3 initial connections.</p>
          </div>
          {/* Warning toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#F5F0E6', border: '1px solid #E1900020' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E19000' }} />
            <p className="text-xs" style={{ color: '#7C4D04' }}>Confidence score below threshold (62%). Review recommended.</p>
          </div>
          {/* Error toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#FDF0F2', border: '1px solid #F2426020' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F24260' }} />
            <p className="text-xs" style={{ color: '#9F1239' }}>Save failed: connection timeout. Your draft is cached locally.</p>
          </div>
          {/* Info toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#EDF0F8', border: '1px solid #4271DF20' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4271DF' }} />
            <p className="text-xs" style={{ color: '#1E3A8A' }}>3 new documents queued. Processing will begin shortly.</p>
          </div>
        </div>
      </Section>

      {/* ─── Bridge tier: tinted washes ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Bridge tones are very-low-saturation tints (5–10%) derived from each spectrum color. They sit between the warm neutral canvas and the full spectrum — so color feels like it's emerging from the system rather than painted on top.">
            <span>Bridge Tier — Tinted Washes</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4 leading-relaxed">
          Between the warm neutral canvas and the full spectrum sits a <strong>bridge tier</strong>: very-low-saturation tints (5–10%) that carry just enough color to communicate semantic context without shouting. Use them as surfaces, not as accents. The saturated spectrum color still does the talking — the wash sets the stage.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {bridgeTones.map(t => (
            <div key={t.name} className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="h-20 px-3 py-2 flex items-end" style={{ backgroundColor: t.hex }}>
                <span className="text-xs font-mono text-slate">{t.hex}</span>
              </div>
              <div className="p-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-ink">{t.name}</p>
                  <span className="text-xs font-mono text-pewter">from {t.source}</span>
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#97979E' }}>{t.when}</p>
                <p className="text-xs text-iron leading-relaxed">{t.usage}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="px-4 py-2.5 bg-cloud border-b border-stone-200">
            <p className="text-xs font-semibold text-slate uppercase tracking-wider">When to use a bridge tone</p>
          </div>
          <div className="divide-y divide-stone-100">
            {[
              { use: 'Alert / toast background', rule: 'Always use the bridge tone (not the accent itself). The dot or icon carries the color; the surface carries the context.' },
              { use: 'Selected row or item', rule: 'Use Cobalt Wash (not #F4F4F1) when selection communicates "this is the active/pending one."' },
              { use: 'Callout or highlighted quote', rule: 'Amber Stone for warmth, Teal Mist for growth insights. Never full-saturation fills on body-copy surfaces.' },
              { use: 'Destructive confirmation', rule: 'Rose Blush background for the dialog or confirmation strip. The destructive button itself stays full Rose.' },
              { use: 'Stat card showing a trend', rule: 'Teal Mist for positive trend, Rose Blush for negative, Amber Stone for flat. Optional — only when the trend is the primary message.' },
              { use: 'Hover state on a surface', rule: 'Cobalt Wash at subtle opacity. Distinguishes interactive surfaces without shifting the saturation cliff.' },
              { use: 'Decorative section background', rule: 'Never. Bridge tones always carry semantic meaning. Use Cloud (#F4F4F1) for decoration.' },
            ].map((row, i, arr) => (
              <div key={row.use} className="grid grid-cols-1 sm:grid-cols-12 gap-y-1 sm:gap-y-0 px-4 py-2.5" style={{ borderBottom: i < arr.length - 1 ? undefined : 'none' }}>
                <span className="sm:col-span-4 text-xs font-semibold sm:font-medium text-iron">{row.use}</span>
                <span className="sm:col-span-8 text-xs text-slate leading-relaxed">{row.rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Saturation ladder */}
        <div className="mt-5 border border-stone-200 rounded-xl p-5">
          <p className="text-xs font-semibold text-slate uppercase tracking-wider mb-3">Saturation ladder</p>
          <p className="text-xs text-slate mb-4 leading-relaxed">
            Each semantic color has three levels of emphasis. Reach for the lowest level that does the job — save the saturated accent for the moment that carries meaning.
          </p>
          <div className="space-y-2">
            {[
              { label: 'Info', bg: '#EDF0F8', accent: '#4271DF', dark: '#1E3A8A' },
              { label: 'Success', bg: '#E6F5F3', accent: '#00B6A0', dark: '#0D5E56' },
              { label: 'Warning', bg: '#F5F0E6', accent: '#E19000', dark: '#7C4D04' },
              { label: 'Error', bg: '#FDF0F2', accent: '#F24260', dark: '#9F1239' },
            ].map(row => (
              <div key={row.label} className="grid grid-cols-12 gap-2 items-center">
                <span className="col-span-2 text-xs font-semibold text-iron">{row.label}</span>
                <div className="col-span-10 grid grid-cols-3 gap-2">
                  <div className="flex flex-col rounded-md overflow-hidden">
                    <div className="h-8" style={{ backgroundColor: row.bg }} />
                    <span className="text-xs font-mono text-pewter mt-1">Wash — {row.bg}</span>
                  </div>
                  <div className="flex flex-col rounded-md overflow-hidden">
                    <div className="h-8" style={{ backgroundColor: row.accent }} />
                    <span className="text-xs font-mono text-pewter mt-1">Accent — {row.accent}</span>
                  </div>
                  <div className="flex flex-col rounded-md overflow-hidden">
                    <div className="h-8" style={{ backgroundColor: row.dark }} />
                    <span className="text-xs font-mono text-pewter mt-1">Dark — {row.dark}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate mt-4 leading-relaxed">
            <strong>Rule of thirds:</strong> most semantic surfaces should be <strong>wash</strong>. The accent appears as a dot, icon, or short emphasis — not as a fill. Dark variants are reserved for text and borders <em>on top of</em> the wash.
          </p>
        </div>
      </Section>

      {/* Semantic surfaces on dark */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Dark mode rebuilds the bridge tier on a dark base. Same pairing rule: the surface carries context, the saturated accent carries the color. Accents don't change hex between modes.">
            <span>Semantic Surfaces on Dark</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-4 leading-relaxed">
          On dark surfaces the bridge tier rebuilds at ~8–12% saturation on a dark base. {colorSystem.accentsOnDark} Computed on Ink: Teal {ON_INK('Teal')}, Amber {ON_INK('Amber')}, Rose {ON_INK('Rose')}; Cobalt {ON_INK('Cobalt')}.
        </p>

        <div className="rounded-xl overflow-hidden border border-stone-200">
          <div className="px-4 py-2.5 bg-cloud border-b border-stone-200">
            <p className="text-xs font-semibold text-slate uppercase tracking-wider">Dark saturation ladder</p>
          </div>
          <div className="p-5" style={{ backgroundColor: '#18181C' }}>
            <div className="space-y-2">
              {[
                { label: 'Info', wash: '#1B2440', accent: '#4271DF', name: 'Cobalt Deep' },
                { label: 'Success', wash: '#0E2E2A', accent: '#00B6A0', name: 'Teal Deep' },
                { label: 'Warning', wash: '#2E2410', accent: '#E19000', name: 'Amber Deep' },
                { label: 'Error', wash: '#2E1218', accent: '#F24260', name: 'Rose Deep' },
              ].map(row => (
                <div key={row.label} className="grid grid-cols-12 gap-2 items-center">
                  <span className="col-span-2 text-xs font-semibold" style={{ color: '#F4F4F1' }}>{row.label}</span>
                  <div className="col-span-10 grid grid-cols-2 gap-2">
                    <div className="flex flex-col rounded-md overflow-hidden">
                      <div className="h-8" style={{ backgroundColor: row.wash }} />
                      <span className="text-xs font-mono mt-1" style={{ color: '#B0B0B6' }}>{row.name} — {row.wash}</span>
                    </div>
                    <div className="flex flex-col rounded-md overflow-hidden">
                      <div className="h-8" style={{ backgroundColor: row.accent }} />
                      <span className="text-xs font-mono mt-1" style={{ color: '#B0B0B6' }}>Accent — {row.accent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Example toasts on dark */}
        <div className="mt-4 border border-stone-200 rounded-xl p-5 space-y-3" style={{ backgroundColor: '#18181C' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#B0B0B6' }}>Example: toasts on dark</p>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#0E2E2A', border: '1px solid #00B6A033' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
            <p className="text-xs" style={{ color: '#F4F4F1' }}>Item created successfully with 3 initial connections.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#2E2410', border: '1px solid #E1900033' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E19000' }} />
            <p className="text-xs" style={{ color: '#F4F4F1' }}>Confidence score below threshold (62%). Review recommended.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#2E1218', border: '1px solid #F2426033' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F24260' }} />
            <p className="text-xs" style={{ color: '#F4F4F1' }}>Save failed: connection timeout. Your draft is cached locally.</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#1B2440', border: '1px solid #4271DF33' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4271DF' }} />
            <p className="text-xs" style={{ color: '#F4F4F1' }}>3 new documents queued. Processing will begin shortly.</p>
          </div>
        </div>

        <p className="text-xs text-slate mt-4 leading-relaxed">
          <strong>Rule:</strong> dark washes replace light washes 1:1. Accent dots, borders, and icons stay unchanged. On-dark text on washes is Cloud <code className="font-mono">#F4F4F1</code> — the wash provides enough contrast that a darker text variant isn't needed.
        </p>
      </Section>

      {/* Consistency rule */}
      <Section title="The Consistency Rule">
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-iron leading-relaxed">
            Once a color is assigned a semantic meaning, it must be used consistently. If Teal means "success" in one context and "category label" in another, users lose trust in color as a communication channel. Each semantic color should carry <strong>one meaning</strong> across the entire product.
          </p>
        </div>
      </Section>

      {/* ─── Three-Tier Color Application ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The three-tier system governs when each color appears across all UI elements — buttons, icons, nav, cards, inputs. Each tier answers a different question about why color is present.">
            <span>Three-Tier Color Application</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-5 leading-relaxed">
          Every color in the UI exists for a reason. The three tiers map to three brand personality traits and answer three different questions.
        </p>

        {/* Tier cards */}
        <div className="space-y-4 mb-6">
          {/* Tier 1 */}
          <div className="border-2 border-brand/20 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-brand/5 border-b border-brand/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4271DF' }} />
                <p className="text-sm font-semibold text-ink">Tier {TIERS[0].tier}: {TIERS[0].name}</p>
                <span className="text-xs font-mono text-brand bg-brand/10 px-1.5 py-0.5 rounded">{TIERS[0].carrier} #4271DF</span>
              </div>
              <p className="text-xs text-slate mt-1">Personality: <strong>Perceptive</strong> — the system responds to you</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-iron leading-relaxed mb-3">
                {TIERS[0].rule} This keeps Cobalt rare and powerful.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Primary button', state: 'Default + hover + active', how: 'Cobalt background, darkens on hover/press' },
                  { element: 'Inline link', state: 'Default + hover', how: 'Cobalt text, underline on hover' },
                  { element: 'CTA card / entry point', state: 'Hovered', how: 'Label text → Cobalt. Invites action.' },
                  { element: 'Input focus', state: 'Focused', how: 'Cobalt border + ring. Reverts on blur.' },
                  { element: 'Standalone icon', state: 'Hovered', how: 'Pewter → Cobalt outline. Reverts on leave.' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-1 sm:grid-cols-3 gap-y-0.5 sm:gap-y-0 px-4 py-2" style={{ borderBottom: i < 4 ? '1px solid #F5F5F4' : 'none' }}>
                    <span className="text-xs font-medium text-iron">{row.element}</span>
                    <span className="text-xs text-slate">{row.state}</span>
                    <span className="text-xs text-slate">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="border border-stone-300 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-cloud border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#18181C' }} />
                <p className="text-sm font-semibold text-ink">Tier {TIERS[1].tier}: {TIERS[1].name}</p>
                <span className="text-xs font-mono text-iron bg-stone-200 px-1.5 py-0.5 rounded">{TIERS[1].carrier} #18181C</span>
              </div>
              <p className="text-xs text-slate mt-1">Personality: <strong>Grounded</strong> — confident, understated, persistent</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-iron leading-relaxed mb-3">
                {TIERS[1].rule} The hover state of persistent chrome (sidebar, tabs, breadcrumbs) follows Ink, not Cobalt.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Active nav item', state: 'Current page', how: 'Pewter → Ink text, semibold weight, subtle background' },
                  { element: 'Nav item hover', state: 'Hovered', how: 'Pewter → Ink text, subtle background. Not Cobalt.' },
                  { element: 'Selected tab', state: 'Active tab', how: 'Pewter → Ink text, bottom border or background' },
                  { element: 'Filled icon', state: 'Toggled on', how: 'Pewter outline → Ink filled. Weight signals state.' },
                  { element: 'Active breadcrumb', state: 'Current segment', how: 'Pewter → Ink text, semibold' },
                  { element: 'Selected row', state: 'Selected item', how: 'Subtle Ink/5 background, Ink text' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-1 sm:grid-cols-3 gap-y-0.5 sm:gap-y-0 px-4 py-2" style={{ borderBottom: i < 5 ? '1px solid #F5F5F4' : 'none' }}>
                    <span className="text-xs font-medium text-iron">{row.element}</span>
                    <span className="text-xs text-slate">{row.state}</span>
                    <span className="text-xs text-slate">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-cloud border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4271DF' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E19000' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F24260' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#97979E' }} />
                </div>
                <p className="text-sm font-semibold text-ink">Tier {TIERS[2].tier}: {TIERS[2].name}</p>
                <span className="text-xs font-mono text-slate bg-cloud px-1.5 py-0.5 rounded">{TIERS[2].carrier}</span>
              </div>
              <p className="text-xs text-slate mt-1">Personality: <strong>Trustworthy</strong> — the system communicates clearly</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-iron leading-relaxed mb-3">
                {TIERS[2].rule} Cobalt doubles as the informational semantic color — giving notices visual weight.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Info alert / notice', state: 'Noteworthy update', how: 'Cobalt icon + Cobalt-light background' },
                  { element: 'Success toast/badge', state: 'Positive outcome', how: 'Teal dot/icon + Teal-light background' },
                  { element: 'Warning alert', state: 'Needs attention', how: 'Amber dot/icon + Amber-light background' },
                  { element: 'Error message', state: 'Something failed', how: 'Rose dot/icon + Rose-light background' },
                  { element: 'Destructive button', state: 'Irreversible action', how: 'Rose background, white text' },
                  { element: 'Trend indicator', state: 'Positive/negative change', how: 'Teal for +, Rose for -, Amber for flat' },
                  { element: 'Neutral / disabled', state: 'Passive context', how: 'Pewter text, borders, placeholders. Present if needed.' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-1 sm:grid-cols-3 gap-y-0.5 sm:gap-y-0 px-4 py-2" style={{ borderBottom: i < 6 ? '1px solid #F5F5F4' : 'none' }}>
                    <span className="text-xs font-medium text-iron">{row.element}</span>
                    <span className="text-xs text-slate">{row.state}</span>
                    <span className="text-xs text-slate">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision flowchart */}
        <div className="bg-ink rounded-xl p-6 text-white">
          <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Decision: "What color should this be?"</p>
          <div className="space-y-3 text-xs leading-relaxed">
            {[
              { n: '1.', q: 'Is it an action trigger?', a: '→ Cobalt. Buttons, links, CTAs, input focus. Elements that DO something when clicked.' },
              { n: '2.', q: 'Is it structural UI chrome?', a: '→ Ink. Sidebar nav, tabs, breadcrumbs, filled icons. Elements that show WHERE you are. Hover darkens to Ink, not Cobalt.' },
              { n: '3.', q: 'Is the system communicating status?', a: '→ Cobalt (info), Teal (success), Amber (warning), Rose (error). Never decorative.' },
              { n: '4.', q: 'None of the above?', a: '→ Ink (primary text) or Pewter (muted / disabled / passive). The canvas stays neutral.' },
            ].map(row => (
              <div key={row.n} className="flex gap-3">
                <span className="font-mono w-6 flex-shrink-0" style={{ color: '#B0B0B6' }}>{row.n}</span>
                <p><strong style={{ color: '#F4F4F1' }}>{row.q}</strong> <span style={{ color: '#B0B0B6' }}>{row.a}</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* The hover nuance */}
        <div className="mt-4 bg-cloud rounded-xl p-5 border border-stone-200">
          <p className="text-sm font-semibold text-ink mb-2">The Hover Rule</p>
          <p className="text-xs text-iron leading-relaxed mb-3">
            Not all hovers are equal. The distinction is between elements that <strong>trigger actions</strong> and elements that <strong>navigate within persistent chrome</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg px-4 py-3 border border-brand/15">
              <p className="text-xs font-semibold text-brand mb-1">Cobalt hover</p>
              <p className="text-xs text-iron leading-relaxed">
                Buttons, inline links, CTA cards, standalone icons, entry points. These elements invite the user to <strong>take an action</strong> or <strong>go somewhere new</strong>. Cobalt says "I'm interactive, click me."
              </p>
            </div>
            <div className="bg-white rounded-lg px-4 py-3 border border-stone-200">
              <p className="text-xs font-semibold text-ink mb-1">Ink hover</p>
              <p className="text-xs text-iron leading-relaxed">
                Sidebar nav, tab bars, breadcrumbs, toolbars. These elements are <strong>always visible</strong> and show structural position. Ink hover keeps the chrome calm — Cobalt would make the sidebar feel like a row of CTAs.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
