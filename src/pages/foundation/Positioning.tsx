import PageShell, { Section } from '../../components/layout/PageShell'
import { brand } from '../../data/brand'

export default function Positioning() {
  return (
    <PageShell
      title="Positioning"
      subtitle="How Spectrea connects its purpose to the market."
    >
      {/* Strategic claim — Decision 7 */}
      <Section title="Strategic Claim">
        <div className="text-white rounded-xl p-6" style={{ backgroundColor: '#18181C' }}>
          <p className="text-base leading-relaxed font-medium">
            Spectrea is the spectrum of clarity. Everything you know, in one living view —
            alive with possibility, yours to keep. See it whole. Trust what you see. Build on what you find.
          </p>
        </div>
        <p className="text-xs text-slate mt-3 leading-relaxed">
          The brand's anchor sentence. Reads on its own without product context — anyone can grok the feeling
          (clarity, aliveness, ownership) before they ever learn what Spectrea actually does. The brand stands
          first; the product slots into the brand, not the other way around.
        </p>
      </Section>

      {/* Audience scope — mass appeal */}
      <Section title="Audience Scope">
        <div className="bg-cloud rounded-xl p-6 border border-stone-200">
          <p className="text-sm text-iron leading-relaxed mb-3">
            <strong>Mass-appeal: B2C personal use through enterprise.</strong> The five named personas below
            (Solo Knowledge Workers, Business Leaders, Knowledge Workers, Technology Leaders, Growing Teams)
            are only the named top tier — the solo tier is first-class, not a trial. The brand also has to work
            for a five-person team with no IT department and an enterprise procurement committee.
          </p>
          <p className="text-sm text-iron leading-relaxed mb-3">
            Every artefact must read as <em>credible to enterprise</em> and <em>approachable to individuals</em> simultaneously.
            This is why the brand stakes the <em>spectrum + graph + alive</em> identity rather than picking a tier-specific aesthetic.
          </p>
          <p className="text-sm text-iron leading-relaxed">{brand.audienceBreadth}</p>
        </div>
      </Section>

      {/* Brand Positioning — elevated */}
      <Section title="Brand Positioning">
        <div className="text-white rounded-xl p-6" style={{ backgroundColor: '#18181C' }}>
          <p className="text-base leading-relaxed">{brand.positioning.brand}</p>
        </div>
      </Section>

      {/* Tactical Positioning — for competitive contexts */}
      <Section title="Tactical Positioning">
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <p className="text-xs font-semibold text-pewter uppercase tracking-wider mb-2">For sales, pitch decks, and competitive contexts</p>
          <p className="text-sm text-iron leading-relaxed italic">{brand.positioning.tactical}</p>
        </div>
      </Section>

      {/* Full-shape claim: internal-tier since 2026-08-13 (internalCanon) —
          rendered only in the internal/ artefacts, not on the public guide. */}

      {/* Category */}
      <Section title="Category Definition">
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-iron leading-relaxed">
            Spectrea is a <strong>{brand.positioning.category.toLowerCase()}</strong> — not knowledge management,
            not an AI assistant, not an automation tool, but a substrate those capabilities emerge from. The
            category is named for its outcome: scattered information becomes intelligence you can verify and
            build on. The real competitor isn't Notion or Confluence. It's the fragmented, unverifiable
            information landscape itself — the dozens of disconnected tools and the noise that drowns out signal.
          </p>
          <p className="text-xs text-slate mt-3">
            When compared to specific tools, the key message is: <em>"This isn't a better version of X — it's a fundamentally different kind of thing."</em>
          </p>
        </div>
      </Section>

      {/* Messaging Hierarchy */}
      <Section title="Messaging Hierarchy">
        <p className="text-sm text-slate mb-4">
          Messages are layered. Lead with connection, support with trust, intelligence, composability, and transparency.
        </p>

        {/* Primary */}
        <div className="border-2 border-stone-800 rounded-xl p-5 mb-4">
          <span className="text-xs font-semibold text-pewter uppercase tracking-wider">Primary — Lead With This</span>
          <h3 className="text-xl font-semibold text-ink mt-2">{brand.messaging.primary.headline}</h3>
          <p className="text-sm text-iron mt-2 leading-relaxed">{brand.messaging.primary.supporting}</p>
          <span className="text-xs text-pewter mt-2 inline-block">Theme: {brand.messaging.primary.theme}</span>
        </div>

        {/* Secondary */}
        <div className="grid grid-cols-1 gap-3">
          {brand.messaging.secondary.map((msg, i) => (
            <div key={msg.theme} className="border border-stone-200 rounded-xl p-5">
              <span className="text-xs font-semibold text-pewter uppercase tracking-wider">
                Supporting Message {i + 1}
              </span>
              <h3 className="text-base font-semibold text-ink mt-2">{msg.headline}</h3>
              <p className="text-sm text-iron mt-1 leading-relaxed">{msg.supporting}</p>
              {'usageGuardrail' in msg && (
                <div className="mt-3 rounded-lg px-3 py-2" style={{ backgroundColor: '#E1900010', border: '1px solid #E1900025' }}>
                  <p className="text-xs leading-relaxed" style={{ color: '#A86E00' }}><strong>Guardrail:</strong> {msg.usageGuardrail}</p>
                </div>
              )}
              <span className="text-xs text-pewter mt-2 inline-block">Theme: {msg.theme}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Target Audiences */}
      <Section title="Audience Messaging">
        <p className="text-sm text-slate mb-4">
          Spectrea is for everyone who works with knowledge — but the message adapts to what each audience cares about.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brand.audiences.map(a => (
            <div key={a.title} className="border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-ink mb-0.5">{a.title}</h3>
              <p className="text-xs text-slate mb-3">{a.who}</p>
              <p className="text-xs text-pewter uppercase tracking-wider mb-1">What they need</p>
              <p className="text-sm text-iron mb-3">{a.need}</p>
              <p className="text-xs text-pewter uppercase tracking-wider mb-1">What we say</p>
              <p className="text-sm text-iron italic">{a.message}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Competitive Differentiation */}
      <Section title="Differentiation">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 bg-cloud border-b border-stone-200">
            <div className="px-4 py-2 text-xs font-semibold text-pewter uppercase tracking-wider">Spectrea</div>
            <div className="px-4 py-2 text-xs font-semibold text-pewter uppercase tracking-wider">Traditional Tools</div>
          </div>
          {brand.differentiators.map((d, i) => (
            <div key={i} className="grid grid-cols-2 border-b last:border-b-0 border-stone-100">
              <div className="px-4 py-3 text-sm text-iron flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: '#00B6A0' }}>&#10003;</span>
                {d.spectrea}
              </div>
              <div className="px-4 py-3 text-sm text-slate flex items-start gap-2">
                <span className="text-slate mt-0.5 flex-shrink-0 text-xs">&#10007;</span>
                {d.others}
              </div>
            </div>
          ))}
        </div>
        {/* differentiatorGuardrail: internal-tier since 2026-08-13
            (internalCanon) — competitive instruction, not public copy. */}
      </Section>
    </PageShell>
  )
}
