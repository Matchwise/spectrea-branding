import PageShell, { Section } from '../../components/layout/PageShell'
import { brand, naming, originStance } from '../../data/brand'

const correctUsage = [
  'Spectrea helps organizations connect their knowledge.',
  'Built with Spectrea',
  'Powered by Spectrea',
  'the Spectrea platform',
  'spectrea.com',
]

export default function Naming() {
  return (
    <PageShell
      title="Naming"
      subtitle="How to use the Spectrea name correctly and consistently."
    >
      {/* Pronunciation */}
      <Section title="Pronunciation">
        <div className="bg-cloud rounded-xl p-6 flex items-center gap-6">
          <div>
            <p className="text-3xl font-semibold text-ink tracking-tight">{brand.name}</p>
            <p className="text-lg font-mono text-slate mt-1">{brand.pronunciation}</p>
          </div>
          <div className="text-sm text-iron border-l border-stone-200 pl-6">
            <p><strong>Spek</strong> — as in "spectacle"</p>
            <p><strong>tree</strong> — as in the word "tree"</p>
            <p><strong>uh</strong> — soft, unstressed ending</p>
          </div>
        </div>
      </Section>

      {/* Etymology — dual reading */}
      <Section title="Etymology">
        <p className="text-sm text-iron leading-relaxed mb-3">
          <strong>Spectrea</strong> is a coinage from <em>spectrum</em> (Latin, from <em>specere</em>, "to look"; plural <em>spectra</em> — the full range).
          The name does double duty — two readings that together make it earn its place:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Reading 1 — Spectrum</p>
            <p className="text-sm text-iron leading-relaxed">
              The full range. The complete view. The whole picture, all in one place — instead of fragments scattered across many.
            </p>
          </div>
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Reading 2 — Revealing</p>
            <p className="text-sm text-iron leading-relaxed">
              Bringing what was hidden into clear view. The shift from blur to focus — when something you couldn't quite see becomes obvious.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate italic mt-4 leading-relaxed">
          Together: <em>the spectrum of clarity</em> — and the action behind the tagline "We connect the dots."
        </p>
      </Section>

      {/* Usage Rules */}
      <Section title="Name Usage">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>Correct Usage</h3>
            <ul className="space-y-2">
              {correctUsage.map(ex => (
                <li key={ex} className="text-sm text-iron flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: '#00B6A0' }}>&#10003;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Never (canonical list)</h3>
            <ul className="space-y-2">
              {naming.neverNames.map(ex => (
                <li key={ex} className="text-sm text-slate flex items-start gap-2">
                  <span className="mt-0.5" style={{ color: '#F24260' }}>&#10007;</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* AI naming — the ratified three-register taxonomy, rendered from canon */}
      <Section title="AI Naming — Three Registers">
        <p className="text-sm text-iron leading-relaxed mb-4">{naming.aiNaming.rule}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="border rounded-xl p-5" style={{ borderColor: '#00B6A025', backgroundColor: '#00B6A008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#007D6E' }}>The assistant…</h3>
            <div className="flex flex-wrap gap-2">
              {naming.aiNaming.allowedVerbs.map(v => (
                <span key={v} className="text-xs font-medium text-iron bg-cloud rounded-full px-3 py-1">{v}</span>
              ))}
            </div>
          </div>
          <div className="border rounded-xl p-5" style={{ borderColor: '#F2426025', backgroundColor: '#F2426008' }}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: '#BA3249' }}>Never</h3>
            <div className="flex flex-wrap gap-2">
              {naming.aiNaming.forbiddenVerbs.map(v => (
                <span key={v} className="text-xs font-medium text-slate bg-cloud rounded-full px-3 py-1 line-through">{v}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-slate leading-relaxed">{naming.aiNaming.verbRule}</p>
      </Section>

      {/* Capitalization */}
      <Section title="Capitalization Rules">
        <div className="text-sm text-iron space-y-2">
          <p>Always capitalize the <strong>S</strong> in Spectrea — it is a proper noun in running prose.</p>
          <p>The lowercase <code className="bg-cloud px-1.5 py-0.5 rounded font-mono text-xs">pectrea</code> wordmark in the lockup is a stylistic treatment, not the typed name. Plain-text contexts (email, contracts, search results, browser tabs) always use sentence-case "Spectrea."</p>
          <p>In URLs and email addresses, use all lowercase: <code className="bg-cloud px-1.5 py-0.5 rounded font-mono text-xs">spectrea.com</code></p>
          <p>In code references, follow the convention of the codebase (typically <code className="bg-cloud px-1.5 py-0.5 rounded font-mono text-xs">spectrea</code> in lowercase).</p>
        </div>
      </Section>

      {/* Company vs product — the legal-entity rule */}
      <Section title="Company & Product">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">Legal entity</p>
            <p className="text-lg font-semibold text-ink">{naming.companyProduct.company}</p>
          </div>
          <div className="bg-cloud rounded-xl p-5 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-1">Product &amp; brand</p>
            <p className="text-lg font-semibold text-ink">{naming.companyProduct.product}</p>
          </div>
        </div>
        <p className="text-sm text-iron leading-relaxed mb-3">{naming.companyProduct.rule}</p>
        <p className="text-xs text-slate leading-relaxed">{naming.companyProduct.legacy}</p>
      </Section>

      {/* Origin stance — codified silence */}
      <Section title="Origin">
        <div className="border rounded-xl p-5" style={{ borderColor: '#E1900025', backgroundColor: '#E1900008' }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#A86E00' }}>Codified silence</p>
          <p className="text-sm text-iron leading-relaxed">{originStance.rule}</p>
        </div>
      </Section>

      {/* Feature naming convention — the rule, not the inventory */}
      <Section title="Feature Naming Convention">
        <p className="text-sm text-slate leading-relaxed mb-4">
          Apple-style: Title-case Proper Nouns without brand prefix. Each first-class feature gets its own name and stands on its own — the platform context (Spectrea) is implicit. The rule below applies to whatever Spectrea ships, today or in the future.
        </p>

        <div className="border border-stone-200 rounded-xl overflow-hidden mb-5">
          <div className="grid grid-cols-2 bg-cloud border-b border-stone-200">
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pewter">Pattern</div>
            <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-pewter">Form</div>
          </div>
          {[
            ['Generic noun (in prose)', 'lowercase ("the assistant", "the editor")'],
            ['First-class feature (canonical)', 'Title-Case Proper Noun ("Assistant", "Editor")'],
            ['Multi-word feature', 'Each significant word capitalised ("Spectrum View")'],
            ['Distinct branded surface', '"Spectrea X" — only after deliberate review'],
          ].map(([pattern, form]) => (
            <div key={String(pattern)} className="grid grid-cols-2 border-b last:border-b-0 border-stone-100">
              <div className="px-4 py-2.5 text-sm text-iron">{pattern}</div>
              <div className="px-4 py-2.5 text-sm font-semibold text-ink">{form}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-cloud rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Default</p>
            <p className="text-sm text-iron leading-relaxed">Title-case Proper Noun for first-class features. The capital signals "this is a named thing in Spectrea."</p>
          </div>
          <div className="bg-cloud rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">Brand prefix</p>
            <p className="text-sm text-iron leading-relaxed">Reserved for distinct branded surfaces — separately-paid tiers, developer surfaces, installable companions. After deliberate review only.</p>
          </div>
          <div className="bg-cloud rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-pewter mb-2">In running prose</p>
            <p className="text-sm text-iron leading-relaxed">Lowercase generic nouns are acceptable when natural ("the assistant suggested"). Canonical name in headers, marketing, and cross-references.</p>
          </div>
        </div>
      </Section>
    </PageShell>
  )
}
