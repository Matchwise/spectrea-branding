import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand } from '../../data/brand'
import { TbX } from 'react-icons/tb'

export default function BrandStory() {
  return (
    <PageShell
      title="Brand Story"
      subtitle="The origin, purpose, and identity of Spectrea — why it exists and what it stands for."
    >
      {/* Etymology */}
      <Section title="Name Origin">
        <div className="bg-gradient-to-r from-brand/5 via-brand-teal/5 to-brand-amber/5 rounded-xl p-6 border border-brand/10">
          <p className="text-3xl font-semibold text-ink tracking-tight">{brand.name}</p>
          <p className="text-sm text-slate font-mono mt-1">{brand.pronunciation}</p>
          <p className="text-sm text-iron mt-3 leading-relaxed">{brand.etymology}</p>
        </div>
      </Section>

      {/* Why We Exist */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={brand.why.usage}>
            <span>Why We Exist</span>
          </Tooltip>
        </h2>
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base leading-relaxed">{brand.why.statement}</p>
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={brand.mission.usage}>
            <span>Mission</span>
          </Tooltip>
        </h2>
        <blockquote className="border-l-4 border-brand pl-5 py-1">
          <p className="text-lg text-iron leading-relaxed">{brand.mission.statement}</p>
        </blockquote>
      </Section>

      {/* Vision */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={brand.vision.usage}>
            <span>Vision</span>
          </Tooltip>
        </h2>
        <blockquote className="pl-5 py-1" style={{ borderLeft: '4px solid #00B6A0' }}>
          <p className="text-lg text-iron leading-relaxed">{brand.vision.statement}</p>
        </blockquote>
      </Section>

      {/* Tagline */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content={brand.tagline.usage}>
            <span>Tagline</span>
          </Tooltip>
        </h2>
        <div className="bg-cloud rounded-xl p-6 border border-stone-200">
          <p className="text-2xl font-semibold text-ink">{brand.tagline.statement}</p>
        </div>
      </Section>

      {/* Emotional Core */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The two emotions every Spectrea interaction should evoke. Use as a filter for UX, copy, and product decisions: 'Does this make users feel empowered and clear?'">
            <span>Emotional Core</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <h3 className="font-semibold text-ink text-lg">{brand.emotionalCore.primary}</h3>
            <p className="text-sm text-iron mt-2 leading-relaxed">{brand.emotionalCore.primaryDescription}</p>
          </div>
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <h3 className="font-semibold text-ink text-lg">{brand.emotionalCore.secondary}</h3>
            <p className="text-sm text-iron mt-2 leading-relaxed">{brand.emotionalCore.secondaryDescription}</p>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The five non-negotiable values that govern product decisions, hiring, partnerships, and communications. Each one is a stance the brand takes — and lives by — across every surface.">
            <span>Core Values</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {brand.values.map((v, i) => (
            <div key={v.name} className="border border-stone-200 rounded-xl p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-semibold text-pewter">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-semibold text-ink">{v.name}</h3>
              </div>
              <p className="text-sm text-iron leading-relaxed mb-2">{v.description}</p>
              <p className="text-xs text-pewter italic">Proof: {v.proof}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Personality */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Four traits that govern how Spectrea behaves in every interaction — from UI micro-copy to investor presentations. Each has a guardrail to prevent the trait from becoming a weakness.">
            <span>Brand Personality</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brand.personality.map(p => (
            <div key={p.trait} className="bg-cloud rounded-xl p-5 border border-stone-200">
              <h3 className="font-semibold text-ink mb-1">{p.trait}</h3>
              <p className="text-sm text-iron leading-relaxed">{p.description}</p>
              <p className="text-xs text-amber-700 bg-amber-50 rounded-md px-2 py-1 mt-3 inline-block">
                {p.guardrail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Anti-values */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="Hard boundaries that define what Spectrea will never become. Use to veto features, designs, or messaging that cross these lines — even if they seem profitable or popular.">
            <span>What Spectrea Will Never Be</span>
          </Tooltip>
        </h2>
        <div className="space-y-3">
          {brand.antiValues.map((av, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: '#F2426008', border: '1px solid #F2426015' }}>
              <span className="mt-0.5 flex-shrink-0" style={{ color: '#F24260' }}>
                <TbX size={16} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{av.never}</p>
                <p className="text-xs text-slate mt-0.5">{av.because}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Archetypes — three facets, one motion */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-2">
          <Tooltip content="Spectrea is one character, not three. The traditional archetypes — Magician, Sage, Creator — operate as inseparable facets of a single gesture: reveal → ground → equip. Every brand moment carries all three; the emphasis shifts with context, the character doesn't.">
            <span>Brand Archetypes</span>
          </Tooltip>
        </h2>
        <p className="text-sm text-iron mb-5 leading-relaxed">
          Three facets, one motion: <strong>reveal → ground → equip</strong>. Spectrea doesn't split into three personas for three surfaces — it's one character whose way of operating always contains all three movements. The emphasis shifts with context; the character doesn't.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {brand.archetypes.map(a => (
            <div key={a.name} className="bg-cloud rounded-xl p-5 border border-stone-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">{a.facet} facet</p>
              <h3 className="text-lg font-semibold text-ink">{a.name}</h3>
              <p className="text-sm text-iron mt-2 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate mt-4 leading-relaxed">
          The through-line is already in the tagline — <em>We connect the dots</em> = see them (reveal) · trust them (ground) · build on them (equip). If any of the three is missing, the copy doesn't sound like Spectrea.
        </p>
        <div className="mt-5 pt-5 border-t border-stone-200">
          <p className="text-xs text-pewter">
            Reference brands: {brand.aspirationalBrands.join(', ')}
          </p>
          <p className="text-xs text-slate mt-1">
            Anti-patterns: {brand.antiBrands.join(', ')}
          </p>
        </div>
      </Section>

      {/* Visual Metaphor */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The two visual metaphors that inform logo design, illustrations, motion design, and imagery. The prism represents the 'reveal' moment (clarity); the network represents 'growth over time' (compounding).">
            <span>Visual Metaphor</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brand.visualMetaphor.metaphors.map(m => (
            <div key={m.name} className="border border-stone-200 rounded-xl p-5">
              <p className="text-[11px] font-semibold text-pewter uppercase tracking-wider mb-1">Co-primary · {m.role}</p>
              <h3 className="font-semibold text-ink mb-1">{m.name}</h3>
              <p className="text-sm text-iron">{m.description}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate mt-3 italic">{brand.visualMetaphor.combined}</p>
        <p className="text-xs text-slate mt-2">{brand.visualMetaphor.tiebreaker}</p>
      </Section>

      {/* Aesthetic Direction */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="The overall visual feeling that guides color, typography, spacing, and imagery choices. Every visual decision should be tested against this direction.">
            <span>Aesthetic Direction</span>
          </Tooltip>
        </h2>
        <div className="bg-cloud rounded-xl p-5 border border-stone-200">
          <h3 className="font-semibold text-ink mb-1">{brand.aesthetic.direction}</h3>
          <p className="text-sm text-iron">{brand.aesthetic.description}</p>
          <p className="text-xs text-slate mt-2">{brand.aesthetic.tradeoff}</p>
        </div>
      </Section>
    </PageShell>
  )
}
