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
        <p className="text-xs text-slate mt-3 leading-relaxed">
          The formula applies on every surface. Spectrea earns trust by <em>showing its work</em> —
          the reasoning, the evidence, the source — not by claiming magic.
        </p>
      </Section>

      {/* Three facets, one motion */}
      <Section title="Three Facets, One Motion">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Spectrea is one character whose way of operating always contains three inseparable movements:
          <strong> reveal → ground → equip</strong>. These aren't three personas for three surfaces — they're
          facets of a single gesture. Every brand moment carries all three; the <em>emphasis</em> shifts with
          context, the character doesn't.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {brand.archetypes.map(a => (
            <div key={a.name} className="bg-cloud rounded-lg p-4 border border-stone-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">{a.facet} facet</p>
              <p className="text-sm font-semibold text-ink mb-1">{a.name}</p>
              <p className="text-xs text-slate leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-brand/5 rounded-lg px-4 py-3 border border-brand/10">
          <p className="text-xs text-brand leading-relaxed">
            <strong>Rule of three.</strong> If any of the three is missing, the copy doesn't sound like Spectrea.
            Reveal-without-ground is hype. Ground-without-equip is stuffy. Equip-without-reveal is tools without a reason.
            The through-line is already in the tagline — <em>We connect the dots</em> = see them (reveal) · trust them (ground) · build on them (equip).
          </p>
        </div>
      </Section>

      {/* Personality reminder */}
      <Section title="Voice = Personality in Words">
        <p className="text-sm text-slate mb-4">
          Spectrea's voice is the verbal expression of its {brand.personality.length} personality traits. Every piece of writing should feel:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brand.personality.map(p => (
            <div key={p.trait} className="bg-cloud rounded-lg p-3 border border-stone-200 text-center">
              <p className="text-sm font-semibold text-ink">{p.trait}</p>
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
            <p><strong>Do:</strong> "Your understanding compounds — every connection you make strengthens the next one you find."</p>
            <p><strong>Don't:</strong> "Our retrieval pipeline uses vector embeddings to score semantic similarity across the corpus."</p>
          </div>
        </div>
      </Section>

      {/* Tone spectrum */}
      <Section title="Tone Spectrum">
        <p className="text-sm text-slate mb-4">
          The voice stays consistent. The tone shifts with context:
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-3 bg-cloud border-b border-stone-200 px-4 py-2">
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Context</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Tone</span>
            <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Example</span>
          </div>
          {voice.toneSpectrum.map(t => (
            <div key={t.context} className="grid grid-cols-1 sm:grid-cols-3 gap-y-1 sm:gap-y-0 border-b last:border-b-0 border-stone-100 px-4 py-3">
              <span className="text-sm text-iron font-semibold sm:font-medium">{t.context}</span>
              <span className="text-sm text-iron">{t.tone}</span>
              <span className="text-xs text-slate italic leading-relaxed">{t.example}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Do / Don't examples */}
      <Section title="Voice in Action">
        <div className="space-y-6">
          {voice.toneExamples.map(ex => (
            <div key={ex.context} className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="bg-cloud px-5 py-2 border-b border-stone-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate uppercase tracking-wider">{ex.context}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-5 border-b md:border-b-0 md:border-r border-stone-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00B6A010' }}>
                      <span className="text-xs" style={{ color: '#00B6A0' }}>&#10003;</span>
                    </span>
                    <span className="text-xs font-semibold uppercase" style={{ color: '#008775' }}>Spectrea voice</span>
                  </div>
                  <p className="text-sm text-iron leading-relaxed">{ex.correct}</p>
                </div>
                <div className="p-5" style={{ backgroundColor: '#F2426008' }}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2426010' }}>
                      <span className="text-xs" style={{ color: '#F24260' }}>&#10007;</span>
                    </span>
                    <span className="text-xs font-semibold uppercase" style={{ color: '#D63B55' }}>Not this</span>
                  </div>
                  <p className="text-sm text-slate leading-relaxed">{ex.incorrect}</p>
                </div>
              </div>
              <div className="px-5 py-2 bg-cloud border-t border-stone-100">
                <p className="text-xs text-pewter">{ex.why}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-stone-200 rounded-lg p-4 bg-cloud">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-1">{voice.contextShifts.buyer.label}</p>
            <p className="text-sm text-iron leading-relaxed">{voice.contextShifts.buyer.detail}</p>
          </div>
          <div className="border border-stone-200 rounded-lg p-4 bg-cloud">
            <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-1">{voice.contextShifts.product.label}</p>
            <p className="text-sm text-iron leading-relaxed">{voice.contextShifts.product.detail}</p>
          </div>
        </div>
      </Section>

      {/* Vocabulary */}
      <Section title="Vocabulary">
        <p className="text-sm text-slate mb-4 leading-relaxed">
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

        <div className="mt-4 border border-stone-200 rounded-lg p-4 bg-cloud">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-1">Density</p>
          <p className="text-sm text-iron leading-relaxed">{voice.vocabularyDensity}</p>
        </div>
      </Section>

    </PageShell>
  )
}
