import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'
import { Logotype, LogotypeGradient } from '../../components/brand/SpectreaLogo'

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
                <Logotype fontSize={11} colorMode="ink" color="#212226" />
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
                <div className="mb-4">
                  <LogotypeGradient fontSize={13} />
                </div>
                <p className="text-sm font-semibold text-stone-900 mb-2" style={{ fontFamily: "'Albert Sans', sans-serif" }}>Your item was added</p>
                <p className="text-xs text-stone-600 leading-relaxed mb-3">"[Item title]" is in. We've already linked it to a few related things you have.</p>
                <button className="px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Open</button>
                <p className="text-xs text-stone-400 mt-4 pt-3 border-t border-stone-100">You received this because you added something to Spectrea.</p>
              </div>
            </div>
          </div>

          {/* Marketing */}
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Marketing / Newsletter</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <div className="p-5" style={{ backgroundColor: '#18181C' }}>
                <div className="mb-4">
                  <LogotypeGradient fontSize={13} />
                </div>
                <p className="text-lg font-semibold mb-2" style={{ color: '#F4F4F1', fontFamily: "'Albert Sans', sans-serif" }}>Your knowledge compounds.</p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: '#97979E' }}>This month: a few quiet improvements that make the everyday faster — plus one new view we're excited about.</p>
              </div>
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #4271DF, #00B6A0, #E19000)' }} />
              <div className="p-5 bg-white">
                <p className="text-xs text-stone-600 leading-relaxed">Every interaction now strengthens what you already have. Connections you might have missed start surfacing on their own...</p>
                <button className="mt-3 px-3 py-1.5 rounded-md text-xs font-medium text-white" style={{ backgroundColor: '#4271DF' }}>Read More</button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Email rules */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="These rules apply to every Spectrea email — transactional, marketing, and internal. Consistency across email builds trust and recognition.">
            <span>Email Guidelines</span>
          </Tooltip>
        </h2>
        <div className="border border-stone-200 rounded-xl overflow-hidden">
          {[
            { rule: 'Subject lines: direct and specific', detail: '"Your item was added" not "Update from Spectrea!"' },
            { rule: 'One CTA per email maximum', detail: 'Don\'t compete for attention. One clear next step.' },
            { rule: 'Gradient bar: top or bottom, never both', detail: 'Transactional: top. Marketing: bottom after hero.' },
            { rule: 'Body font: system sans-serif at 14–16px', detail: 'Custom fonts don\'t render in all email clients.' },
            { rule: 'Max width: 600px', detail: 'Standard email width for cross-client compatibility.' },
            { rule: 'Dark headers for marketing, white for transactional', detail: 'Sets the tone: marketing is bold, transactional is clear.' },
            { rule: 'Always include unsubscribe and plain-text version', detail: 'Legal requirement + accessibility best practice.' },
          ].map((row, i) => (
            <div key={row.rule} className="px-4 py-3" style={{ borderBottom: i < 6 ? '1px solid #F3F4F6' : 'none' }}>
              <p className="text-sm font-medium text-stone-700">{row.rule}</p>
              <p className="text-xs text-stone-500 mt-0.5">{row.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Dos & Don'ts */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-4">
          <Tooltip content="Quick reference for email design decisions. These rules apply to both transactional and marketing emails.">
            <span>Email Dos & Don'ts</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Do</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use direct, specific subject lines</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Include the logo mark + "Spectrea" in every email</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Use Cobalt for the single primary CTA button</li>
              <li className="flex gap-2"><span style={{ color: '#00B6A0' }}>&#10003;</span>Test in multiple email clients before sending</li>
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Don't</h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use exclamation marks in subject lines</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Add multiple CTA buttons competing for attention</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use custom web fonts — they won't render consistently</li>
              <li className="flex gap-2"><span style={{ color: '#F24260' }}>&#10007;</span>Use gradient bars on both top and bottom of the same email</li>
            </ul>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
