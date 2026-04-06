import PageShell, { Section } from '../../components/layout/PageShell'
import { voice, brand } from '../../data/brand'

export default function Voice() {
  return (
    <PageShell
      title="Voice & Tone"
      subtitle="How Spectrea speaks — consistent in character, adaptive in context."
    >
      {/* Voice formula */}
      <Section title="Voice Formula">
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-base font-medium leading-relaxed">{voice.formula}</p>
        </div>
      </Section>

      {/* Personality reminder */}
      <Section title="Voice = Personality in Words">
        <p className="text-sm text-stone-500 mb-4">
          Spectrea's voice is the verbal expression of its personality traits. Every piece of writing should feel:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brand.personality.map(p => (
            <div key={p.trait} className="bg-stone-50 rounded-lg p-3 border border-stone-200 text-center">
              <p className="text-sm font-semibold text-stone-800">{p.trait}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech approach */}
      <Section title="Technical Language">
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h3 className="text-sm font-semibold text-amber-900 mb-1">Approach: {voice.techApproach}</h3>
          <p className="text-sm text-amber-800 leading-relaxed">{voice.techDescription}</p>
          <div className="mt-3 text-xs text-amber-700 space-y-1">
            <p><strong>Do:</strong> "Your knowledge compounds because of the underlying graph architecture."</p>
            <p><strong>Don't:</strong> "Our graph-based RAG pipeline uses vector embeddings for semantic retrieval."</p>
          </div>
        </div>
      </Section>

      {/* Tone spectrum */}
      <Section title="Tone Spectrum">
        <p className="text-sm text-stone-500 mb-4">
          The voice stays consistent. The tone shifts with context:
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-stone-50 border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Context</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Tone</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Example</span>
          </div>
          {voice.toneSpectrum.map(t => (
            <div key={t.context} className="grid grid-cols-3 border-b last:border-b-0 border-stone-100 px-4 py-3">
              <span className="text-sm text-stone-700 font-medium">{t.context}</span>
              <span className="text-sm text-stone-600">{t.tone}</span>
              <span className="text-xs text-stone-500 italic leading-relaxed">{t.example}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Do / Don't examples */}
      <Section title="Voice in Action">
        <div className="space-y-6">
          {voice.toneExamples.map(ex => (
            <div key={ex.context} className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="bg-stone-50 px-5 py-2 border-b border-stone-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{ex.context}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 border-b md:border-b-0 md:border-r border-stone-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B6A010' }}>
                      <span className="text-xs" style={{ color: '#00B6A0' }}>&#10003;</span>
                    </span>
                    <span className="text-xs font-semibold uppercase" style={{ color: '#008775' }}>Spectrea voice</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed">{ex.correct}</p>
                </div>
                <div className="p-5" style={{ backgroundColor: '#F2426008' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2426010' }}>
                      <span className="text-xs" style={{ color: '#F24260' }}>&#10007;</span>
                    </span>
                    <span className="text-xs font-semibold uppercase" style={{ color: '#D63B55' }}>Not this</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{ex.incorrect}</p>
                </div>
              </div>
              <div className="px-5 py-2 bg-stone-50 border-t border-stone-100">
                <p className="text-xs text-stone-400">{ex.why}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulary */}
      <Section title="Vocabulary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Words We Use</h3>
            <div className="flex flex-wrap gap-1.5">
              {voice.alwaysUse.map(word => (
                <span key={word} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: '#00B6A010', color: '#008775' }}>{word}</span>
              ))}
            </div>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Words We Never Use</h3>
            <div className="flex flex-wrap gap-1.5">
              {voice.neverUse.map(word => (
                <span key={word} className="text-xs px-2 py-1 rounded-md line-through" style={{ backgroundColor: '#F2426010', color: '#D63B55', textDecorationColor: '#F2426060' }}>{word}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
