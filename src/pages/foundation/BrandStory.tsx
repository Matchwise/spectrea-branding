import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { brand } from '../../data/brand'

export default function BrandStory() {
  return (
    <PageShell
      title="Brand Story"
      subtitle="The origin, purpose, and identity of Spectrea — why it exists and what it stands for."
    >
      {/* Etymology */}
      <Section title="Name Origin">
        <div className="bg-gradient-to-r from-indigo-50 via-teal-50 to-amber-50 rounded-xl p-6 border border-indigo-100/50">
          <p className="text-3xl font-bold text-stone-900 tracking-tight">{brand.name}</p>
          <p className="text-sm text-stone-500 font-mono mt-1">{brand.pronunciation}</p>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">{brand.etymology}</p>
        </div>
      </Section>

      {/* Why We Exist */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content={brand.why.usage}>
            <span>Why We Exist</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-900 text-white rounded-xl p-6">
          <p className="text-base leading-relaxed">{brand.why.statement}</p>
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content={brand.mission.usage}>
            <span>Mission</span>
          </Tooltip>
        </h2>
        <blockquote className="border-l-4 border-indigo-400 pl-5 py-1">
          <p className="text-lg text-stone-700 leading-relaxed italic">{brand.mission.statement}</p>
        </blockquote>
      </Section>

      {/* Vision */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content={brand.vision.usage}>
            <span>Vision</span>
          </Tooltip>
        </h2>
        <blockquote className="border-l-4 border-teal-400 pl-5 py-1">
          <p className="text-lg text-stone-700 leading-relaxed italic">{brand.vision.statement}</p>
        </blockquote>
      </Section>

      {/* Tagline */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content={brand.tagline.usage}>
            <span>Tagline</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
          <p className="text-2xl font-bold text-stone-900 italic">{brand.tagline.statement}</p>
        </div>
      </Section>

      {/* Emotional Core */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The two emotions every Spectrea interaction should evoke. Use as a filter for UX, copy, and product decisions: 'Does this make users feel empowered and clear?'">
            <span>Emotional Core</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <h3 className="font-bold text-stone-900 text-lg">{brand.emotionalCore.primary}</h3>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">{brand.emotionalCore.primaryDescription}</p>
          </div>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <h3 className="font-bold text-stone-900 text-lg">{brand.emotionalCore.secondary}</h3>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">{brand.emotionalCore.secondaryDescription}</p>
          </div>
        </div>
      </Section>

      {/* Core Values */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The five non-negotiable principles that govern product decisions, hiring, partnerships, and communications. Each maps to a pillar of the 'why' (truth, insight, action) and a platform principle.">
            <span>Core Values</span>
          </Tooltip>
        </h2>
        <div className="space-y-4">
          {brand.values.map((v, i) => (
            <div key={v.name} className="border border-stone-200 rounded-xl p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-xs font-bold text-stone-400">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-bold text-stone-900">{v.name}</h3>
                <span className="text-xs font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{v.principle}</span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed mb-2">{v.description}</p>
              <p className="text-xs text-stone-400 italic">Proof: {v.proof}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Personality */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Four traits that govern how Spectrea behaves in every interaction — from UI micro-copy to investor presentations. Each has a guardrail to prevent the trait from becoming a weakness.">
            <span>Brand Personality</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {brand.personality.map(p => (
            <div key={p.trait} className="bg-stone-50 rounded-xl p-5 border border-stone-200">
              <h3 className="font-bold text-stone-900 mb-1">{p.trait}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{p.description}</p>
              <p className="text-xs text-amber-700 bg-amber-50 rounded-md px-2 py-1 mt-3 inline-block">
                {p.guardrail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Anti-values */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Hard boundaries that define what Spectrea will never become. Use to veto features, designs, or messaging that cross these lines — even if they seem profitable or popular.">
            <span>What Spectrea Will Never Be</span>
          </Tooltip>
        </h2>
        <div className="space-y-3">
          {brand.antiValues.map((av, i) => (
            <div key={i} className="flex items-start gap-3 bg-red-50/50 rounded-lg px-4 py-3 border border-red-100">
              <span className="text-red-400 mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-medium text-stone-800">{av.never}</p>
                <p className="text-xs text-stone-500 mt-0.5">{av.because}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Archetype */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The foundational archetype that shapes brand personality, visual identity, and communication style. Use as a gut-check: 'Would The Magician say/do this?'">
            <span>Brand Archetype</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-50 rounded-xl p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-900">{brand.archetype}</h3>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">{brand.archetypeDescription}</p>
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p className="text-xs text-stone-400">
              Reference brands: {brand.aspirationalBrands.join(', ')}
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Anti-patterns: {brand.antiBrands.join(', ')}
            </p>
          </div>
        </div>
      </Section>

      {/* Visual Metaphor */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The two visual metaphors that inform logo design, illustrations, motion design, and imagery. The prism represents the 'reveal' moment (clarity); the network represents 'growth over time' (compounding).">
            <span>Visual Metaphor</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-stone-200 rounded-xl p-5">
            <h3 className="font-bold text-stone-900 mb-1">{brand.visualMetaphor.primary}</h3>
            <p className="text-sm text-stone-600">{brand.visualMetaphor.primaryDescription}</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-5">
            <h3 className="font-bold text-stone-900 mb-1">{brand.visualMetaphor.secondary}</h3>
            <p className="text-sm text-stone-600">{brand.visualMetaphor.secondaryDescription}</p>
          </div>
        </div>
        <p className="text-sm text-stone-500 mt-3 italic">{brand.visualMetaphor.combined}</p>
      </Section>

      {/* Aesthetic Direction */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="The overall visual feeling that guides color, typography, spacing, and imagery choices. Every visual decision should be tested against this direction.">
            <span>Aesthetic Direction</span>
          </Tooltip>
        </h2>
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <h3 className="font-bold text-stone-900 mb-1">{brand.aesthetic.direction}</h3>
          <p className="text-sm text-stone-600">{brand.aesthetic.description}</p>
          <p className="text-xs text-stone-400 mt-2">{brand.aesthetic.tradeoff}</p>
        </div>
      </Section>
    </PageShell>
  )
}
