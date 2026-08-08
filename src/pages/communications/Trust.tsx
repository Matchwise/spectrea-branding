import PageShell, { Section } from '../../components/layout/PageShell'
import { trustCopy } from '../../data/brand'

const masters = [
  { key: 'privacy', label: 'Privacy', text: trustCopy.privacy },
  { key: 'aiUse', label: 'AI Use', text: trustCopy.aiUse },
  { key: 'retention', label: 'Retention & Export', text: trustCopy.retention },
  { key: 'enterpriseReadiness', label: 'Enterprise Readiness', text: trustCopy.enterpriseReadiness },
]

export default function Trust() {
  return (
    <PageShell
      title="Trust & Disclosures"
      subtitle="The approved masters for trust surfaces — privacy, AI use, retention, and enterprise readiness. Copy verbatim; don't paraphrase."
    >
      {/* Counsel note — scope and trigger */}
      <Section>
        <div className="border rounded-xl p-5" style={{ borderColor: '#E1900025', backgroundColor: '#E1900008' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#A86E00' }}>Before external legal use</p>
          <p className="text-sm text-iron leading-relaxed">{trustCopy.counselNote}</p>
        </div>
      </Section>

      {/* The four masters */}
      <Section title="Approved Masters">
        <p className="text-sm text-slate mb-4 leading-relaxed">
          Brand-voiced masters derived from the ratified vision — sovereign data, per-viewer access,
          provenance, and the managed-path no-train target. Trust surfaces align up to these
          present-tense masters; staged commitments (attestations, uptime) are stated as targets, not badges.
        </p>
        <div className="space-y-4">
          {masters.map(m => (
            <div key={m.key} className="border border-stone-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-pewter uppercase tracking-wider">{m.label}</p>
                <span className="text-[10px] font-mono text-pewter bg-cloud px-1.5 py-0.5 rounded">trustCopy.{m.key}</span>
              </div>
              <p className="text-sm text-iron leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
