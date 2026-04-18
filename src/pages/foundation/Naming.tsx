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

      {/* Etymology — dual reading */}
      <Section title="Etymology">
        <p className="text-sm text-stone-600 leading-relaxed mb-3">
          <strong>Spectrea</strong> is derived from <em>spectra</em> (Latin: the full range or spectrum).
          The name does double duty — two readings that together make it earn its place:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Reading 1 — Spectrum</p>
            <p className="text-sm text-stone-700 leading-relaxed">
              The full range. The complete view. The whole picture, all in one place — instead of fragments scattered across many.
            </p>
          </div>
          <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Reading 2 — Revealing</p>
            <p className="text-sm text-stone-700 leading-relaxed">
              Bringing what was hidden into clear view. The shift from blur to focus — when something you couldn't quite see becomes obvious.
            </p>
          </div>
        </div>
        <p className="text-sm text-stone-500 italic mt-4 leading-relaxed">
          Together: <em>the spectrum of clarity</em> — and the action behind the tagline "We connect the dots."
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
          <p>Always capitalize the <strong>S</strong> in Spectrea — it is a proper noun in running prose.</p>
          <p>The lowercase <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">pectrea</code> wordmark in the lockup is a stylistic treatment, not the typed name. Plain-text contexts (email, contracts, search results, browser tabs) always use sentence-case "Spectrea."</p>
          <p>In URLs and email addresses, use all lowercase: <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea.com</code></p>
          <p>In code references, follow the convention of the codebase (typically <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">spectrea</code> in lowercase).</p>
        </div>
      </Section>

      {/* Feature naming convention — Decision 11 */}
      <Section title="Feature Naming Convention">
        <p className="text-sm text-stone-500 leading-relaxed mb-4">
          Apple-style: Title-case Proper Nouns without brand prefix. Each first-class feature gets its own name and stands on its own — the platform context (Spectrea) is implicit.
        </p>

        <div className="border border-stone-200 rounded-xl overflow-hidden mb-5">
          <div className="grid grid-cols-2 bg-stone-50 border-b border-stone-200">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Feature</div>
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Canonical name</div>
          </div>
          {[
            ['The knowledge graph', 'Knowledge Graph'],
            ['Claims surface', 'Claims View (or Claims)'],
            ['Observation records', 'Observations'],
            ['Source records', 'Sources'],
            ['AI assistant', 'Assistant'],
            ['Multi-perspective view', 'Spectrum View'],
            ['AI-surfaced suggestions', 'Suggestions'],
            ['Provenance trails', 'Traces'],
          ].map(([feature, name]) => (
            <div key={String(name)} className="grid grid-cols-2 border-b last:border-b-0 border-stone-100">
              <div className="px-4 py-2.5 text-sm text-stone-600">{feature}</div>
              <div className="px-4 py-2.5 text-sm font-semibold text-stone-800">{name}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Default</p>
            <p className="text-sm text-stone-700 leading-relaxed">Title-case Proper Noun for first-class features. <em>Knowledge Graph</em>, not <em>knowledge graph</em>.</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">Brand prefix</p>
            <p className="text-sm text-stone-700 leading-relaxed">Reserved for distinct branded surfaces — separately-paid tiers, developer surfaces, installable companions. After deliberate review only.</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">In running prose</p>
            <p className="text-sm text-stone-700 leading-relaxed">Lowercase generic nouns are acceptable when natural ("the assistant suggested"). Canonical name in headers, marketing, and cross-references.</p>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
