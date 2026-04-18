import PageShell, { Section } from '../../components/layout/PageShell'
import Tooltip from '../../components/brand/Tooltip'

const COBALT = '#4271DF'
const TEAL = '#00B6A0'
const AMBER = '#E19000'
const PEWTER = '#97979E'
const INK = '#18181C'

/* ------------------------------------------------------------------ */
/*  Inline graph diagram primitives                                    */
/* ------------------------------------------------------------------ */

function NodeTypesDemo() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full">
      <circle cx="50" cy="60" r="18" fill={COBALT} />
      <text x="50" y="100" textAnchor="middle" fontSize="10" fill={INK} fontFamily="JetBrains Mono">Entity</text>
      <circle cx="130" cy="60" r="14" fill={TEAL} />
      <text x="130" y="100" textAnchor="middle" fontSize="10" fill={INK} fontFamily="JetBrains Mono">Relationship</text>
      <circle cx="210" cy="60" r="14" fill={AMBER} opacity="0.7" />
      <text x="210" y="100" textAnchor="middle" fontSize="10" fill={INK} fontFamily="JetBrains Mono">Uncertain</text>
      <circle cx="290" cy="60" r="12" fill={PEWTER} />
      <text x="290" y="100" textAnchor="middle" fontSize="10" fill={INK} fontFamily="JetBrains Mono">Context</text>
    </svg>
  )
}

function EdgeStylesDemo() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full">
      <g transform="translate(0,0)">
        <line x1="20" y1="30" x2="120" y2="30" stroke={PEWTER} strokeWidth="2" />
        <text x="140" y="34" fontSize="10" fill={INK} fontFamily="JetBrains Mono">solid — confirmed</text>
      </g>
      <g transform="translate(0,30)">
        <line x1="20" y1="30" x2="120" y2="30" stroke={PEWTER} strokeWidth="2" strokeDasharray="6 4" />
        <text x="140" y="34" fontSize="10" fill={INK} fontFamily="JetBrains Mono">dashed — inferred</text>
      </g>
      <g transform="translate(0,60)">
        <line x1="20" y1="30" x2="120" y2="30" stroke={PEWTER} strokeWidth="2" strokeDasharray="2 3" />
        <text x="140" y="34" fontSize="10" fill={INK} fontFamily="JetBrains Mono">dotted — hypothetical</text>
      </g>
    </svg>
  )
}

function ConfidenceDemo() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full">
      {[1, 0.85, 0.7, 0.55].map((opacity, i) => {
        const x = 30 + i * 70
        return (
          <g key={i}>
            <circle cx={x} cy="50" r="18" fill={COBALT} opacity={opacity} />
            <text x={x} y="92" textAnchor="middle" fontSize="10" fill={INK} fontFamily="JetBrains Mono">
              {Math.round(opacity * 100)}%
            </text>
          </g>
        )
      })}
      <text x="160" y="115" textAnchor="middle" fontSize="9" fill={PEWTER}>Opacity = confidence (50–100%)</text>
    </svg>
  )
}

function ProvenanceTrailDemo() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full">
      <path
        d="M 30 60 Q 90 60, 120 50 T 200 40 T 280 30"
        stroke={COBALT}
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <circle cx="30" cy="60" r="6" fill={COBALT} opacity="0.3" />
      <circle cx="120" cy="50" r="7" fill={COBALT} opacity="0.5" />
      <circle cx="200" cy="40" r="9" fill={COBALT} opacity="0.7" />
      <circle cx="280" cy="30" r="14" fill={COBALT} />
      <text x="30" y="90" textAnchor="middle" fontSize="9" fill={PEWTER} fontFamily="JetBrains Mono">source</text>
      <text x="280" y="65" textAnchor="middle" fontSize="9" fill={INK} fontFamily="JetBrains Mono">final claim</text>
    </svg>
  )
}

function StateDemo() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-full">
      <g transform="translate(50,60)">
        <circle r="14" fill={COBALT} />
        <text y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="JetBrains Mono">default</text>
      </g>
      <g transform="translate(120,60)">
        <circle r="16" fill={COBALT} opacity="0.85" />
        <text y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="JetBrains Mono">hover</text>
      </g>
      <g transform="translate(190,60)">
        <circle r="14" fill={COBALT} stroke={INK} strokeWidth="2" />
        <text y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="JetBrains Mono">focused</text>
      </g>
      <g transform="translate(260,60)">
        <circle r="22" fill={COBALT} opacity="0.18" />
        <circle r="14" fill={COBALT} />
        <text y="38" textAnchor="middle" fontSize="9" fill={INK} fontFamily="JetBrains Mono">selected</text>
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DataViz() {
  return (
    <PageShell
      title="Data Visualization"
      subtitle="How the knowledge graph itself should be rendered. The product's hero UI is a graph; this section governs how it looks across product, marketing screenshots, blog diagrams, and brand-guide examples."
    >
      {/* ─── Why this exists ─── */}
      <Section>
        <div className="bg-ink text-white rounded-xl p-6">
          <p className="text-base font-semibold" style={{ fontFamily: "'Albert Sans', sans-serif" }}>The graph IS the brand.</p>
          <p className="text-sm text-stone-400 mt-2 leading-relaxed">
            The brand's central visual idea is a living network — connections that grow denser with every interaction. The product surfaces that idea as a graph the user can see, navigate, and trust.
            That makes graph rendering a brand artefact — not a local engineering choice. The rules below ensure the same node, edge, and confidence vocabulary appears across product UI, marketing screenshots, blog diagrams, and brand-guide examples.
          </p>
        </div>
      </Section>

      {/* ─── Node rendering ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Every node belongs to a category. The category determines colour. Size encodes one signal at a time (centrality OR importance OR degree — pick one).">
            <span>Node rendering</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-canvas border border-stone-200 rounded-xl p-5 h-44 flex items-center justify-center">
            <NodeTypesDemo />
          </div>
          <div className="text-sm text-stone-600 leading-relaxed space-y-2">
            <p><strong style={{ color: COBALT }}>Cobalt</strong> — primary entities (the things the user is reasoning about).</p>
            <p><strong style={{ color: TEAL }}>Teal</strong> — relationships rendered as nodes (when the relationship itself is first-class — meetings, agreements, transactions).</p>
            <p><strong style={{ color: AMBER }}>Amber (70% opacity)</strong> — uncertain or contested claims; uses the hedge marker convention.</p>
            <p><strong style={{ color: PEWTER }}>Pewter</strong> — context or background nodes (less prominent).</p>
            <p className="text-xs text-stone-500 mt-3">Density cap: ~80 nodes per view before clustering kicks in.</p>
          </div>
        </div>
      </Section>

      {/* ─── Edge rendering ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Stroke style encodes relationship category; stroke weight encodes confidence. Default colour is Pewter; spectrum colours are reserved for emphasised relationships.">
            <span>Edge rendering</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-canvas border border-stone-200 rounded-xl p-5 h-44 flex items-center justify-center">
            <EdgeStylesDemo />
          </div>
          <div className="text-sm text-stone-600 leading-relaxed space-y-2">
            <p><strong>Solid stroke</strong> — confirmed relationship with provenance.</p>
            <p><strong>Dashed stroke</strong> — inferred relationship (AI- or rule-derived).</p>
            <p><strong>Dotted stroke</strong> — hypothetical or proposed relationship.</p>
            <p>Default stroke colour is Pewter. Spectrum colours appear only on emphasised edges (selected, hovered, or AI-surfaced).</p>
            <p className="text-xs text-stone-500 mt-3">Stroke weight: 1.5–2.5px. Higher confidence → thicker. Direction (arrow) only when meaningful; bidirectional relationships render without arrows.</p>
          </div>
        </div>
      </Section>

      {/* ─── Confidence encoding ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Confidence is encoded by opacity. 100% = certain claim with strong provenance; 50% = lowest displayed confidence (anything below threshold is hidden).">
            <span>Confidence encoding</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-canvas border border-stone-200 rounded-xl p-5 h-44 flex items-center justify-center">
            <ConfidenceDemo />
          </div>
          <div className="text-sm text-stone-600 leading-relaxed space-y-2">
            <p>Opacity 50–100% maps to confidence 0.5–1.0. Linear ramp.</p>
            <p>Anything below 50% confidence is hidden by default (user can opt to show).</p>
            <p>Combined with the <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs">hedge_marker</code> field in tooltips ("estimated", "preliminary", "hedged", "hypothetical") for richer disclosure.</p>
            <p className="text-xs text-stone-500 mt-3">Never use colour shift for confidence — colour is reserved for category. Opacity is the unambiguous confidence channel.</p>
          </div>
        </div>
      </Section>

      {/* ─── Provenance trails ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Provenance is the trail of dots from earliest source (faint) to final claim (full). The Trail atom from the Dot System.">
            <span>Provenance trails</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-canvas border border-stone-200 rounded-xl p-5 h-44 flex items-center justify-center">
            <ProvenanceTrailDemo />
          </div>
          <div className="text-sm text-stone-600 leading-relaxed space-y-2">
            <p>When the user asks "trace this claim back to its source," the chain renders as a Trail (Dot System atom #4) — a sequence of dots from earliest source (faint, small) to final claim (full opacity, full size).</p>
            <p>Dashes connecting trail dots indicate derivation rather than direct connection.</p>
            <p>Source nodes (the originating documents / observations) get a subtle outline ring on hover.</p>
            <p>Animation: nodes light up sequentially from source to claim — see the <em>Edge formation</em> signature motion primitive on the Motion page.</p>
          </div>
        </div>
      </Section>

      {/* ─── Interactive states ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="Standard interactive states for nodes. Same conventions apply across product UI, marketing screenshots, and brand-guide diagrams.">
            <span>Interactive states</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-canvas border border-stone-200 rounded-xl p-5 h-44 flex items-center justify-center">
            <StateDemo />
          </div>
          <div className="text-sm text-stone-600 leading-relaxed space-y-2">
            <p><strong>Default</strong> — full opacity, category colour.</p>
            <p><strong>Hover</strong> — slight scale-up (×1.1), 85% opacity. Cursor change.</p>
            <p><strong>Focused</strong> — 2px Ink stroke ring (keyboard focus).</p>
            <p><strong>Selected</strong> — outer halo at 18% opacity, inner node unchanged.</p>
            <p className="text-xs text-stone-500 mt-3">Animation timing: 150ms ease-out for hover, instant for selection. See Motion / Duration Scale.</p>
          </div>
        </div>
      </Section>

      {/* ─── Layout & density rules ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">
          <Tooltip content="When to show the full graph, a cluster, or a single-entity focus view. Density rules prevent visual overload.">
            <span>Layout & density</span>
          </Tooltip>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">Full graph</p>
            <p className="text-sm text-stone-700">Up to 80 nodes onscreen. Force-directed layout, pan and zoom enabled.</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">Cluster view</p>
            <p className="text-sm text-stone-700">When density exceeds 80, nodes group into clusters. Click a cluster to expand.</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">Focus view</p>
            <p className="text-sm text-stone-700">Single entity centred, immediate neighbours visible. Used for "explore this entity" surfaces.</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">Background</p>
            <p className="text-sm text-stone-700">Canvas (<code className="font-mono text-xs">#FDFDFB</code>) in light mode; Ink (<code className="font-mono text-xs">#18181C</code>) in dark mode.</p>
          </div>
          <div className="bg-stone-50 rounded-lg p-4 border border-stone-200">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1">Empty state</p>
            <p className="text-sm text-stone-700">Single Cobalt dot centred + ghost hint dots in distance (Pewter at 30% opacity). Room to grow.</p>
          </div>
        </div>
      </Section>

      {/* ─── Cross-product consistency ─── */}
      <Section>
        <h2 className="text-xl font-semibold text-stone-800 mb-2">Cross-product consistency</h2>
        <div className="bg-stone-50 rounded-xl p-5 border border-stone-200">
          <p className="text-sm text-stone-700 leading-relaxed">
            The same node / edge / confidence rendering must appear in:
          </p>
          <ul className="text-sm text-stone-700 mt-3 space-y-1.5 list-disc list-inside">
            <li><strong>Product UI</strong> — the live graph view (`GraphExplorer`, `BubbleNode`, `CompositionNode`)</li>
            <li><strong>Marketing screenshots</strong> — landing page, feature pages, demo videos</li>
            <li><strong>Blog post diagrams</strong> — when explaining concepts that reference the graph</li>
            <li><strong>Brand-guide examples</strong> — this page, the Illustration page's Dot System reference</li>
            <li><strong>Documentation</strong> — concept explanations, tutorial diagrams</li>
            <li><strong>Pitch decks</strong> — investor / customer presentations</li>
          </ul>
          <p className="text-xs text-stone-500 mt-3 leading-relaxed">
            If a graph rendered anywhere else looks different from these rules, it's off-brand. Consistency across surfaces is what makes the graph recognisable as Spectrea — not just <em>a</em> graph.
          </p>
        </div>
      </Section>
    </PageShell>
  )
}
