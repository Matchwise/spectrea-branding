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
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base font-medium leading-relaxed">{voice.formula}</p>
        </div>
        <p className="text-xs text-stone-500 mt-3 leading-relaxed">
          The formula applies on every surface. Tech doesn't earn its place by impressing or by sleight-of-hand;
          it earns it by <em>showing its work</em> — pointing to the reasoning, the evidence, the source.
          Confidence comes from being able to see how the answer was reached, not from being told to trust it.
        </p>
      </Section>

      {/* Tri-archetype surface mapping */}
      <Section title="One Voice, Three Archetypes by Surface">
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Spectrea splits its archetype across three surface domains. The voice formula stays the same;
          the <strong>emotional register</strong> shifts with the archetype that owns each surface.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {brand.archetypes.map(a => (
            <div key={a.name} className="bg-stone-50 rounded-lg p-4 border border-stone-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">{a.surface}</p>
              <p className="text-sm font-semibold text-stone-800 mb-1">{a.name}</p>
              <p className="text-xs text-stone-500 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Personality reminder */}
      <Section title="Voice = Personality in Words">
        <p className="text-sm text-stone-500 mb-4">
          Spectrea's voice is the verbal expression of its five personality traits. Every piece of writing should feel:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
          <div className="hidden sm:grid grid-cols-3 bg-stone-50 border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Context</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Tone</span>
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Example</span>
          </div>
          {voice.toneSpectrum.map(t => (
            <div key={t.context} className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 sm:gap-y-0 border-b last:border-b-0 border-stone-100 px-4 py-3">
              <span className="text-sm text-stone-700 font-semibold sm:font-medium">{t.context}</span>
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
        <p className="text-sm text-stone-500 mb-4 leading-relaxed">
          Twelve brand-evocative words that <strong>privilege</strong> the Spectrea voice. Each builds the <em>feeling</em> of the brand
          — clarity, aliveness, ownership, the act of seeing — without requiring the reader to know what the product does.
          Generic B2B SaaS words (insights, intelligence, transform, empower, unlock, build, etc.) are still allowed in writing
          but don't do voice work. Product-specific words (provenance, traceable, auditable) are also allowed when describing what
          the product actually does — they're just not what makes Spectrea sound like Spectrea.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Privileged words ({voice.alwaysUse.length})</h3>
            <div className="flex flex-wrap gap-1.5">
              {voice.alwaysUse.map(word => (
                <span key={word} className="text-xs px-2 py-1 rounded-md" style={{ backgroundColor: '#00B6A010', color: '#008775' }}>{word}</span>
              ))}
            </div>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Words we never use</h3>
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
