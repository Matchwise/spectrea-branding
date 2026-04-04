import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

const semanticColors = [
  {
    name: 'Primary / Interactive',
    color: '#3451E0',
    light: '#EEF2FF',
    dark: '#1E3A8A',
    usage: 'Links, primary buttons, focused inputs, active states, selected items, toggle-on states.',
    maps: 'Cobalt (hero)',
  },
  {
    name: 'Success / Positive',
    color: '#12B5A3',
    light: '#F0FDFA',
    dark: '#0D5E56',
    usage: 'Success messages, positive trends, completed states, connected status, verified claims.',
    maps: 'Teal (spectrum)',
  },
  {
    name: 'Warning / Attention',
    color: '#E58D08',
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
                  <h3 className="text-sm font-bold text-stone-900">{sc.name}</h3>
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
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#F0FDFA', border: '1px solid #12B5A320' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#12B5A3' }} />
            <p className="text-xs" style={{ color: '#0D5E56' }}>Entity "Revenue Model" successfully created with 3 connections.</p>
          </div>
          {/* Warning toast */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: '#FFFBEB', border: '1px solid #E58D0820' }}>
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#E58D08' }} />
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
    </PageShell>
  )
}
