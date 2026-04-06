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
        <div className="bg-stone-50 rounded-xl p-6 flex items-center gap-6">
          <div>
            <p className="text-3xl font-semibold text-stone-900 tracking-tight">{brand.name}</p>
            <p className="text-lg font-mono text-stone-500 mt-1">{brand.pronunciation}</p>
          </div>
          <div className="text-sm text-stone-600 border-l border-stone-200 pl-6">
            <p><strong>Spek</strong> — as in "spectacle"</p>
            <p><strong>tree</strong> — as in the word "tree"</p>
            <p><strong>uh</strong> — soft, unstressed ending</p>
          </div>
        </div>
      </Section>

      {/* Etymology */}
      <Section title="Etymology">
        <p className="text-sm text-stone-600 leading-relaxed">
          <strong>Spectrea</strong> is derived from <em>spectra</em> (Latin: the full range or spectrum).
          The name evokes the complete range of hidden connections that the platform reveals —
          like a prism separating light into its full spectrum, Spectrea surfaces the full
          breadth of knowledge within an organization.
        </p>
      </Section>

      {/* Usage Rules */}
      <Section title="Name Usage">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#008775' }}>Correct Usage</h3>
            <ul className="space-y-2">
              {usageExamples.correct.map(ex => (
                <li key={ex} className="text-sm text-stone-700 flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: '#00B6A0' }}>&#10003;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Incorrect Usage</h3>
            <ul className="space-y-2">
              {usageExamples.incorrect.map(ex => (
                <li key={ex} className="text-sm text-stone-500 flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: '#F24260' }}>&#10007;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Capitalization */}
      <Section title="Capitalization Rules">
        <div className="text-sm text-stone-600 space-y-2">
          <p>Always capitalize the <strong>S</strong> in Spectrea — it is a proper noun.</p>
          <p>In URLs and email addresses, use all lowercase: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea.com</code></p>
          <p>In code references, follow the convention of the codebase (typically <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea</code> in lowercase).</p>
        </div>
      </Section>
    </PageShell>
  )
}
