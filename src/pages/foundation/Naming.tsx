import PageShell, { Section } from '../../components/layout/PageShell'
import { brand } from '../../data/brand'

const usageExamples = {
  correct: [
    'Spectrea helps organizations connect their knowledge.',
    'Built with Spectrea',
    'Powered by Spectrea',
    'the Spectrea platform',
    'spectrea.com',
  ],
  incorrect: [
    'SPECTREA (all caps in body text)',
    'spectrea (all lowercase in headings)',
    'The Spectrea (unnecessary article)',
    'Spectrea\'s AI-powered... (avoid hype terms)',
    'SpeCTReA (random capitalization)',
  ],
}

export default function Naming() {
  return (
    <PageShell
      title="Naming"
      subtitle="How to use the Spectrea name correctly and consistently."
    >
      {/* Pronunciation */}
      <Section title="Pronunciation">
        <div className="bg-slate-50 rounded-xl p-6 flex items-center gap-6">
          <div>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">{brand.name}</p>
            <p className="text-lg font-mono text-slate-500 mt-1">{brand.pronunciation}</p>
          </div>
          <div className="text-sm text-slate-600 border-l border-slate-200 pl-6">
            <p><strong>Spek</strong> — as in "spectacle"</p>
            <p><strong>tree</strong> — as in the word "tree"</p>
            <p><strong>uh</strong> — soft, unstressed ending</p>
          </div>
        </div>
      </Section>

      {/* Etymology */}
      <Section title="Etymology">
        <p className="text-sm text-slate-600 leading-relaxed">
          <strong>Spectrea</strong> is derived from <em>spectra</em> (Latin: the full range or spectrum).
          The name evokes the complete range of hidden connections that the platform reveals —
          like a prism separating light into its full spectrum, Spectrea surfaces the full
          breadth of knowledge within an organization.
        </p>
      </Section>

      {/* Usage Rules */}
      <Section title="Name Usage">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-emerald-200 bg-emerald-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-emerald-700 mb-3">Correct Usage</h3>
            <ul className="space-y-2">
              {usageExamples.correct.map(ex => (
                <li key={ex} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">&#10003;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-red-200 bg-red-50/30 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-600 mb-3">Incorrect Usage</h3>
            <ul className="space-y-2">
              {usageExamples.incorrect.map(ex => (
                <li key={ex} className="text-sm text-slate-500 flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">&#10007;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Capitalization */}
      <Section title="Capitalization Rules">
        <div className="text-sm text-slate-600 space-y-2">
          <p>Always capitalize the <strong>S</strong> in Spectrea — it is a proper noun.</p>
          <p>In URLs and email addresses, use all lowercase: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea.com</code></p>
          <p>In code references, follow the convention of the codebase (typically <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea</code> in lowercase).</p>
        </div>
      </Section>
    </PageShell>
  )
}
