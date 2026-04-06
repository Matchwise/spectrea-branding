import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

export default function Email() {
  return (
    <PageShell
      title="Email"
      subtitle="Email templates, signatures, and formatting guidelines for Spectrea communications."
    >
      {/* Email signature */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Every team member uses the same signature format. Consistency builds brand recognition across thousands of individual emails.">
            <span>Email Signature</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl p-6">
          <div className="max-w-sm bg-white">
            <div className="border-t-2 border-stone-200 pt-3 mt-2">
              <p className="text-sm font-semibold text-stone-900">Sarah Chen</p>
              <p className="text-xs text-stone-500">Head of Product, Spectrea</p>
              <p className="text-xs text-stone-400 mt-1">sarah@spectrea.com</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' }}>
                  <span className="text-white font-semibold text-xs font-heading" style={{ fontSize: 8 }}>S</span>
                </div>
                <span className="text-xs font-heading font-semibold text-stone-700">Spectrea</span>
                <span className="text-xs text-stone-400">| We connect the dots.</span>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-stone-50 rounded-lg px-4 py-3 border border-stone-100">
            <p className="text-xs text-stone-600">
              <strong>Format:</strong> Name (Semibold) → Title, Company → Email → Logo mark + "Spectrea" + tagline. No phone numbers unless client-facing. No quotes or banners.
            </p>
          </div>
        </div>
      </Section>

      {/* Email template */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Transactional and marketing emails follow different patterns but share the same visual identity — clean, gradient accent, clear hierarchy.">
            <span>Email Template Structure</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transactional */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Transactional</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' }}>
                    <span className="text-white font-semibold font-heading" style={{ fontSize: 9 }}>S</span>
                  </div>
                  <span className="text-xs font-heading font-semibold text-stone-700">Spectrea</span>
                </div>
                <p className="text-sm font-semibold text-stone-900 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Your entity was created</p>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">"Revenue Model" has been added to your knowledge graph with 3 initial connections.</p>
                <button className="px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ backgroundColor: '#4271DF' }}>View Entity</button>
                <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100">You received this because you created an entity in Spectrea.</p>
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Marketing / Newsletter</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="p-5" style={{ backgroundColor: '#111827' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)' }}>
                    <span className="text-white font-semibold font-heading" style={{ fontSize: 9 }}>S</span>
                  </div>
                  <span className="text-xs font-heading font-semibold" style={{ color: '#F9FAFB' }}>Spectrea</span>
                </div>
                <p className="text-lg font-semibold mb-2" style={{ color: '#F9FAFB', fontFamily: "'Albert Sans', sans-serif" }}>Your knowledge compounds.</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#9CA3AF' }}>This month: auto-extraction improvements, 2x faster graph queries, and a new claims dashboard.</p>
              </div>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
              <div className="p-5 bg-white">
                <p className="text-xs text-stone-600 leading-relaxed">Every document you upload now enriches your graph 40% faster. Connections surface automatically...</p>
                <button className="mt-3 px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Read More</button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Email rules */}
      <Section title="Email Guidelines">
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { rule: 'Subject lines: direct and specific', example: '"Your entity was created" not "Update from Spectrea!"' },
            { rule: 'One CTA per email maximum', example: 'Don\'t compete for attention. One clear next step.' },
            { rule: 'Gradient bar: top or bottom, never both', example: 'Transactional: top. Marketing: bottom after hero.' },
            { rule: 'Body font: system sans-serif at 14–16px', example: 'Custom fonts don\'t render in all email clients.' },
            { rule: 'Max width: 600px', example: 'Standard email width for cross-client compatibility.' },
            { rule: 'Dark headers for marketing, white for transactional', example: 'Sets the tone: marketing is bold, transactional is clear.' },
            { rule: 'Always include unsubscribe and plain-text version', example: 'Legal requirement + accessibility best practice.' },
          ].map((row, i) => (
            <div key={row.rule} className="px-4 py-3" style={{ borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none' }}>
              <p className="text-sm text-stone-700">{row.rule}</p>
              <p className="text-xs text-stone-400 mt-0.5 italic">{row.example}</p>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
