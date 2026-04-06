import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Governance() {
  return (
    <PageShell
      title="Governance"
      subtitle="Who owns the brand, how to request changes, and the approval process."
    >
      {/* Brand ownership */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Clear ownership prevents brand drift. These roles ensure someone is accountable for every brand decision.">
            <span>Brand Ownership</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              role: 'Brand Lead',
              responsibility: 'Final approval on all brand changes. Owns the brand guide, color system, and voice guidelines.',
              approves: 'Logo changes, color changes, new brand elements, voice guidelines',
            },
            {
              role: 'Design Lead',
              responsibility: 'Owns the visual implementation. Ensures all UI follows the brand system.',
              approves: 'Component designs, layout patterns, icon additions, typography usage',
            },
            {
              role: 'Content Lead',
              responsibility: 'Owns written communications. Ensures all copy follows voice guidelines.',
              approves: 'Marketing copy, product microcopy, email templates, social media posts',
            },
          ].map(item => (
            <div key={item.role} className="border border-stone-200 rounded-xl p-5">
              <p className="text-sm font-semibold text-stone-900">{item.role}</p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">{item.responsibility}</p>
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-stone-400"><strong>Approves:</strong> {item.approves}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Change process */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Brand changes go through a structured process to prevent inconsistency. Minor updates can be fast-tracked; major changes need full review.">
            <span>Change Process</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="space-y-4">
            {[
              { step: '01', title: 'Propose', description: 'Document the change, the reason, and the impact. Include visual mockups if applicable.', time: 'Proposer' },
              { step: '02', title: 'Review', description: 'Relevant lead reviews the proposal. May request revisions or additional context.', time: 'Lead' },
              { step: '03', title: 'Test', description: 'Apply the change in a staging environment. Verify it works across all contexts (light/dark, mobile/desktop, print/digital).', time: 'Design' },
              { step: '04', title: 'Approve', description: 'Brand Lead gives final approval. Change is documented in the brand guide with a changelog entry.', time: 'Brand Lead' },
              { step: '05', title: 'Implement', description: 'Update the brand guide, design system tokens, and notify all stakeholders of the change.', time: 'Design + Dev' },
            ].map(item => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold" style={{ backgroundColor: '#4271DF' }}>
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-stone-800">{item.title}</p>
                    <span className="text-xs font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">{item.time}</span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Severity levels */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">Change Severity</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { level: 'Minor', color: '#00B6A0', examples: 'Fix a typo, adjust a padding value, update a screenshot', approval: 'Design Lead', turnaround: 'Same day' },
            { level: 'Moderate', color: '#E19000', examples: 'Add a new component, change a secondary color variant, add an icon', approval: 'Design Lead + Brand Lead', turnaround: '1–3 days' },
            { level: 'Major', color: '#F24260', examples: 'Change a primary color, modify the logo, redefine voice guidelines', approval: 'Full brand review', turnaround: '1–2 weeks' },
          ].map((row, i) => (
            <div key={row.level} className="px-4 py-4" style={{ borderBottom: i < 2 ? '1px solid #F3F4F6' : 'none' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                <p className="text-sm font-semibold text-stone-800">{row.level}</p>
              </div>
              <p className="text-xs text-stone-600">{row.examples}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-stone-400"><strong>Approval:</strong> {row.approval}</span>
                <span className="text-xs text-stone-400"><strong>Turnaround:</strong> {row.turnaround}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Common questions */}
      <Section title="Common Questions">
        <div className="space-y-3">
          {[
            { q: 'Can I use a different shade of Cobalt for a specific campaign?', a: 'No. The primary colors are fixed. If you need color variation, use the light/dark semantic variants defined in the Semantic Colors page.' },
            { q: 'Can I create a one-off logo for an event?', a: 'No modified logos. Use the standard lockup or mark-only variant. Add event branding as a separate element with clear visual separation.' },
            { q: 'Can I use a different font for a specific context?', a: 'No. The three-font system (Albert Sans, Lexend, JetBrains Mono) covers all contexts. If you think you need another font, the real question is which existing font to use.' },
            { q: 'What if a partner requires us to use their template?', a: 'Use their template structure but apply Spectrea colors and typography where possible. Always include the Spectrea logo in an approved format.' },
            { q: 'Who do I contact for brand questions?', a: 'Start with the Design Lead for visual questions and the Content Lead for copy questions. Escalate to the Brand Lead if needed.' },
          ].map(item => (
            <div key={item.q} className="border border-stone-200 rounded-xl p-4">
              <p className="text-sm font-medium text-stone-800">{item.q}</p>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
