import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { meta, ratificationLedger, retired, internalCanon } from '../../data/brand'

export default function Governance() {
  return (
    <PageShell
      title="Governance"
      subtitle="Who owns the brand, how to request changes, and the approval process."
    >
      {/* Source of truth — how the brand system actually propagates */}
      <Section title="Source of Truth">
        <div className="bg-ink text-white rounded-xl p-6 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ backgroundColor: '#4271DF30', color: '#7A9AEF' }}>v{meta.version}</span>
            <span className="text-xs" style={{ color: '#B0B0B6' }}>last updated {meta.lastUpdated}</span>
          </div>
          <p className="text-sm leading-relaxed">{meta.sourceOfTruth}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Render doctrine</p>
            <p className="text-sm text-iron leading-relaxed">{meta.renderDoctrine}</p>
          </div>
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Changelog</p>
            <p className="text-sm text-iron leading-relaxed">{meta.changelog}</p>
          </div>
        </div>
        {/* The carve-out named in the render doctrine, shown where the doctrine
            is: a reader who notices a field missing from the guide or the
            machine formats finds the reason on the same page (2026-08-18). */}
        <div className="bg-cloud rounded-xl p-5 border border-stone-200 mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Internal tier</p>
          <p className="text-sm text-iron leading-relaxed">{internalCanon.rule}</p>
          <p className="text-xs font-mono text-pewter mt-3 mb-3 break-words">{internalCanon.fields.join(' · ')}</p>
          <p className="text-sm text-iron leading-relaxed">{internalCanon.consumerRule}</p>
        </div>
      </Section>

      {/* Brand ownership */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
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
              <p className="text-sm font-semibold text-ink">{item.role}</p>
              <p className="text-xs text-iron mt-2 leading-relaxed">{item.responsibility}</p>
              <div className="mt-3 pt-3 border-t border-stone-100">
                <p className="text-xs text-slate"><strong>Approves:</strong> {item.approves}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Change process — one canonical list (meta.changeProcess, merged 2026-08-09) */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">
          <Tooltip content="One canonical change process (meta.changeProcess) — this page and the brand guide's Governance section render the same five steps. Change severity sets each step's depth and approval weight, never which steps happen.">
            <span>Change Process</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="space-y-4">
            {meta.changeProcess.map((item, i) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold bg-brand">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-ink">{item.step}</p>
                    <span className="text-xs font-mono text-pewter bg-cloud px-1.5 py-0.5 rounded">{item.owner}</span>
                  </div>
                  <p className="text-xs text-iron mt-0.5">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate mt-3 leading-relaxed">
          One canonical process (<code className="font-mono">meta.changeProcess</code>) — the brand guide's
          Governance section renders these same five steps. The severity table below sets each step's depth
          and approval weight, never which steps happen.
        </p>
      </Section>

      {/* Severity levels */}
      <Section>
        <h2 className="text-xl font-semibold text-ink mb-4">Change Severity</h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { level: 'Minor', color: '#00B6A0', examples: 'Fix a typo, adjust a padding value, update a screenshot', approval: 'Design Lead', turnaround: 'Same day' },
            { level: 'Moderate', color: '#E19000', examples: 'Add a new component, change a secondary color variant, add an icon', approval: 'Design Lead + Brand Lead', turnaround: '1–3 days' },
            { level: 'Major', color: '#F24260', examples: 'Change a primary color, modify the logo, redefine voice guidelines', approval: 'Full brand review', turnaround: '1–2 weeks' },
          ].map((row, i) => (
            <div key={row.level} className="px-4 py-4" style={{ borderBottom: i < 2 ? '1px solid #F5F5F4' : 'none' }}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                <p className="text-sm font-semibold text-ink">{row.level}</p>
              </div>
              <p className="text-xs text-iron">{row.examples}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-slate"><strong>Approval:</strong> {row.approval}</span>
                <span className="text-xs text-slate"><strong>Turnaround:</strong> {row.turnaround}</span>
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
              <p className="text-sm font-medium text-ink">{item.q}</p>
              <p className="text-xs text-iron mt-1 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Ratification ledger — the durable decision record */}
      <Section title="Ratification Ledger">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          The single durable record of ratified brand decisions. Local per-repo ratifications are absorbed
          here on sight — a decision recorded only in a consumer repo is not canon until it lands in this ledger.
        </p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {ratificationLedger.map((entry, i) => (
            <div key={i} className="px-5 py-4 border-b last:border-b-0 border-stone-100 flex gap-4">
              <span className="text-xs font-mono text-pewter flex-shrink-0 mt-0.5 w-20">{entry.date}</span>
              <p className="text-sm text-iron leading-relaxed">{entry.decision}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Retired values — canon's one history-keeping structure (decision 35b) */}
      <Section title="Retired Values">
        <p className="text-sm text-slate mb-4 leading-relaxed">{retired.note}</p>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {retired.values.map((entry) => (
            <div key={entry.id} className="px-5 py-4 border-b last:border-b-0 border-stone-100">
              <div className="flex flex-wrap items-center gap-3 mb-1.5">
                <code className="text-xs font-mono px-2 py-0.5 rounded bg-cloud text-iron border border-stone-200">{entry.retired}</code>
                <span className="text-xs text-pewter">→</span>
                <code className="text-xs font-mono px-2 py-0.5 rounded bg-cloud text-iron border border-stone-200">{entry.replacedBy}</code>
                <span
                  className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={entry.scope === 'absolute'
                    ? { backgroundColor: '#F2426015', color: '#BA3249' }
                    : { backgroundColor: '#E1900015', color: '#9A6300' }}
                >
                  {entry.scope}
                </span>
              </div>
              <p className="text-xs text-slate leading-relaxed">
                Retired {entry.since} — decision {entry.decision}.
                {'stillValidAs' in entry ? ` Still valid as: ${entry.stillValidAs}` : ''}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
