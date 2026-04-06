import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

const semanticColors = [
  {
    name: 'Primary / Interactive',
    color: '#4271DF',
    light: '#EEF2FF',
    dark: '#1E3A8A',
    usage: 'Links, primary buttons, focused inputs, hover accents. Responsive tier — appears during interaction, settles when done.',
    maps: 'Cobalt (hero)',
  },
  {
    name: 'Success / Positive',
    color: '#00B6A0',
    light: '#F0FDFA',
    dark: '#0D5E56',
    usage: 'Success messages, positive trends, completed states, connected status, verified claims.',
    maps: 'Teal (spectrum)',
  },
  {
    name: 'Warning / Attention',
    color: '#E19000',
    light: '#FFFBEB',
    dark: '#7C4D04',
    usage: 'Warning alerts, pending states, confidence scores below threshold, approaching limits.',
    maps: 'Amber (spectrum)',
  },
  {
    name: 'Error / Destructive',
    color: '#F43F5E',
    light: '#FFF1F2',
    dark: '#9F1239',
    usage: 'Error messages, destructive actions, failed states, critical alerts, form validation errors.',
    maps: 'Rose (spectrum)',
  },
  {
    name: 'Neutral / Info',
    color: '#9CA3AF',
    light: '#F9FAFB',
    dark: '#4B5563',
    usage: 'Informational messages, disabled states, borders, dividers, placeholder text.',
    maps: 'Gray (muted)',
  },
]

export default function SemanticColors() {
  return (
    <PageShell
      title="Semantic Colors"
      subtitle="How the spectrum maps to functional meaning in the product UI."
    >
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Semantic colors carry consistent meaning across the product. Users learn that teal = good, amber = caution, rose = problem. Never use a semantic color for decoration — it will confuse users.">
            <span>Functional Color Mapping</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-stone-500 mb-6">
          Each spectrum accent maps to a semantic role. Every color carries meaning — consistency builds trust.
        </p>

        <div className="space-y-4">
          {semanticColors.map(sc => (
            <div key={sc.name} className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 h-12">
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.light }}>
                  <span className="text-xs font-mono" style={{ color: sc.color }}>Light</span>
                </div>
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.color }}>
                  <span className="text-xs font-mono text-white">Default</span>
                </div>
                <div className="flex items-center justify-center" style={{ backgroundColor: sc.dark }}>
                  <span className="text-xs font-mono text-white">Dark</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-stone-900">{sc.name}</h3>
                  <span className="text-xs font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{sc.maps}</span>
                </div>
                <p className="text-xs text-stone-600">{sc.usage}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs font-mono text-stone-400">Light: {sc.light}</span>
                  <span className="text-xs font-mono text-stone-400">Default: {sc.color}</span>
                  <span className="text-xs font-mono text-stone-400">Dark: {sc.dark}</span>
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
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#F0FDFA', border: '1px solid #00B6A020' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
            <p className="text-xs" style={{ color: '#0D5E56' }}>Entity "Revenue Model" successfully created with 3 connections.</p>
          </div>
          {/* Warning toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#FFFBEB', border: '1px solid #E1900020' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E19000' }} />
            <p className="text-xs" style={{ color: '#7C4D04' }}>Confidence score below threshold (62%). Review recommended.</p>
          </div>
          {/* Error toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#FFF1F2', border: '1px solid #F43F5E20' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F43F5E' }} />
            <p className="text-xs" style={{ color: '#9F1239' }}>Save failed: connection timeout. Your draft is cached locally.</p>
          </div>
          {/* Info toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#F9FAFB', border: '1px solid #9CA3AF20' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#9CA3AF' }} />
            <p className="text-xs" style={{ color: '#4B5563' }}>3 new documents queued for extraction. Processing will begin shortly.</p>
          </div>
        </div>
      </Section>

      {/* Consistency rule */}
      <Section title="The Consistency Rule">
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-stone-700 leading-relaxed">
            Once a color is assigned a semantic meaning, it must be used consistently. If Teal means "success" in one context and "category label" in another, users lose trust in color as a communication channel. Each semantic color should carry <strong>one meaning</strong> across the entire product.
          </p>
        </div>
      </Section>

      {/* ─── Three-Tier Color Application ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The three-tier system governs when each color appears across all UI elements — buttons, icons, nav, cards, inputs. Each tier answers a different question about why color is present.">
            <span>Three-Tier Color Application</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-stone-600 mb-5 leading-relaxed">
          Every color in the UI exists for a reason. The three tiers map to three brand personality traits and answer three different questions.
        </p>

        {/* Tier cards */}
        <div className="space-y-4 mb-6">
          {/* Tier 1 */}
          <div className="border-2 border-brand/20 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-brand/5 border-b border-brand/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4271DF' }} />
                <p className="text-sm font-semibold text-stone-800">Tier 1: Responsive</p>
                <span className="text-xs font-mono text-brand bg-brand/10 px-1.5 py-0.5 rounded">Cobalt #4271DF</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Personality: <strong>Perceptive</strong> — the system responds to you</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Cobalt appears when the <strong>user interacts</strong>. It's temporary and reactive — present during hover, focus, and press, then settles. This keeps Cobalt rare and powerful.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Primary button', state: 'Default + hover + active', how: 'Cobalt background, darkens on hover/press' },
                  { element: 'Link text', state: 'Default + hover', how: 'Cobalt text, underline on hover' },
                  { element: 'Input focus', state: 'Focused', how: 'Cobalt border + ring. Reverts on blur.' },
                  { element: 'Icon hover', state: 'Hovered', how: 'Gray → Cobalt outline. Reverts on leave.' },
                  { element: 'Card hover', state: 'Hovered', how: 'Border darkens, subtle Cobalt accent if interactive' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-3 px-4 py-2" style={{ borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none' }}>
                    <span className="text-xs font-medium text-stone-700">{row.element}</span>
                    <span className="text-xs text-stone-500">{row.state}</span>
                    <span className="text-xs text-stone-500">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="border border-stone-300 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-stone-100 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#111827' }} />
                <p className="text-sm font-semibold text-stone-800">Tier 2: Structural</p>
                <span className="text-xs font-mono text-stone-600 bg-stone-200 px-1.5 py-0.5 rounded">Ink #111827</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Personality: <strong>Grounded</strong> — confident, understated, persistent</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Ink signals <strong>persistent state</strong>. The current page, the selected tab, the toggled-on icon. These are always visible, so using a neutral tone keeps the canvas calm. Weight and fill change — not color.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Active nav item', state: 'Current page', how: 'Gray → Ink text, semibold weight, subtle background' },
                  { element: 'Selected tab', state: 'Active tab', how: 'Gray → Ink text, bottom border or background' },
                  { element: 'Filled icon', state: 'Toggled on', how: 'Gray outline → Ink filled. Weight signals state.' },
                  { element: 'Active breadcrumb', state: 'Current segment', how: 'Gray → Ink text, semibold' },
                  { element: 'Selected row', state: 'Selected item', how: 'Subtle Ink/5 background, Ink text' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-3 px-4 py-2" style={{ borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none' }}>
                    <span className="text-xs font-medium text-stone-700">{row.element}</span>
                    <span className="text-xs text-stone-500">{row.state}</span>
                    <span className="text-xs text-stone-500">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="border border-stone-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-stone-50 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00B6A0' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E19000' }} />
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F43F5E' }} />
                </div>
                <p className="text-sm font-semibold text-stone-800">Tier 3: Semantic</p>
                <span className="text-xs font-mono text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">Teal / Amber / Rose</span>
              </div>
              <p className="text-xs text-stone-500 mt-1">Personality: <strong>Trustworthy</strong> — the system communicates clearly</p>
            </div>
            <div className="p-5">
              <p className="text-xs text-stone-600 leading-relaxed mb-3">
                Semantic colors appear when the <strong>system communicates status</strong>. Success, warning, error. These colors are never decorative — every appearance carries meaning that users learn to trust.
              </p>
              <div className="border border-stone-200 rounded-lg overflow-hidden">
                {[
                  { element: 'Success toast/badge', state: 'Positive outcome', how: 'Teal dot/icon + Teal-light background' },
                  { element: 'Warning alert', state: 'Needs attention', how: 'Amber dot/icon + Amber-light background' },
                  { element: 'Error message', state: 'Something failed', how: 'Rose dot/icon + Rose-light background' },
                  { element: 'Destructive button', state: 'Irreversible action', how: 'Rose background, white text' },
                  { element: 'Trend indicator', state: 'Positive/negative change', how: 'Teal for +, Rose for -, Amber for flat' },
                ].map((row, i) => (
                  <div key={row.element} className="grid grid-cols-3 px-4 py-2" style={{ borderBottom: i < 4 ? '1px solid #F3F4F6' : 'none' }}>
                    <span className="text-xs font-medium text-stone-700">{row.element}</span>
                    <span className="text-xs text-stone-500">{row.state}</span>
                    <span className="text-xs text-stone-500">{row.how}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decision flowchart */}
        <div className="bg-stone-900 rounded-xl p-6 text-white">
          <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Decision: "What color should this be?"</p>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex gap-3">
              <span className="text-stone-500 font-mono w-6 flex-shrink-0">1.</span>
              <p><strong className="text-stone-300">Is the user interacting right now?</strong> <span className="text-stone-400">→ Cobalt. Hover, focus, press. Temporary.</span></p>
            </div>
            <div className="flex gap-3">
              <span className="text-stone-500 font-mono w-6 flex-shrink-0">2.</span>
              <p><strong className="text-stone-300">Is this a persistent selection or current state?</strong> <span className="text-stone-400">→ Ink. Active page, selected item, toggled on. Weight/fill change, not color.</span></p>
            </div>
            <div className="flex gap-3">
              <span className="text-stone-500 font-mono w-6 flex-shrink-0">3.</span>
              <p><strong className="text-stone-300">Is the system communicating status?</strong> <span className="text-stone-400">→ Teal (success), Amber (warning), Rose (error). Never decorative.</span></p>
            </div>
            <div className="flex gap-3">
              <span className="text-stone-500 font-mono w-6 flex-shrink-0">4.</span>
              <p><strong className="text-stone-300">None of the above?</strong> <span className="text-stone-400">→ Gray (secondary) or Ink (primary). The canvas stays neutral.</span></p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
