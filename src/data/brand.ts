// ============================================================
// Spectrea Brand Data — Single source of truth
// ============================================================

// --- Meta / Governance ---
export const meta = {
  version: '2.14.0',
  lastUpdated: '2026-08-18',
  // Where the derived artefacts are published. A consumer repo vendors copies
  // of them, so every generated file states this origin and how to tell its
  // copy has gone stale (added 2026-08-18); scripts/generate-pdf.mjs asserts
  // its link-rewrite origin against this field rather than keeping a second one.
  publishedAt: 'https://branding.spectrea.com',
  sourceOfTruth:
    'brand.ts is the canonical brand data. The app renders it; the guide (brand-guide.md), llms.txt, the PDF, and generated assets are derived mirrors. On any conflict, brand.ts wins. Capability claims are anchored to the ratified product vision; every buyer-facing capability claim is checked against the product roadmap before it ships. Execution status is tracked there, never here — this file is the brand, not the release note.',
  renderDoctrine:
    'Anything in canon must render somewhere in the guide (ratified 2026-08-06). A canonical field with no rendering surface is a propagation defect: agents must never receive a stricter or newer brand than people. Carve-out (ratified 2026-08-13): the fields REGISTERED IN internalCanon — and only those — render exclusively to the internal-tier artefacts (internal/, git-ignored, handed off locally to the private consumer repos), never to the public site, guide, PDF, contract, or llms.txt. The carve-out is a list of named fields, not a subject-matter rule: the guide is primarily an identity system, and it still carries capability language anchored to the ratified vision (see sourceOfTruth). "Identity, not claims" describes the emphasis, never the file — a sentence that reads as a claim is judged on its own wording, not excused by this doctrine.',
  // One canonical change process (merged 2026-08-09, D25): the guide taught a
  // four-step list carrying the version/regenerate mechanics while the
  // Governance page taught a five-step list without them. Both surfaces now
  // render THIS list. Severity (Governance page) sets each step's depth and
  // approval weight, never which steps happen.
  changeProcess: [
    { step: 'Propose', owner: 'Proposer', detail: 'Document the change, the reason, and the impact — with visual mockups where applicable.' },
    { step: 'Review', owner: 'Lead', detail: 'The relevant lead (Design or Content) reviews and may request revisions; the Brand Lead joins for brand-level changes.' },
    { step: 'Test', owner: 'Design', detail: 'Apply the change in a staging build and verify it across contexts: light/dark, mobile/desktop, print/digital.' },
    { step: 'Ratify & version', owner: 'Brand Lead', detail: 'Brand Lead approves. The change lands in src/data/brand.ts with a meta.version bump; brand decisions also get a ratificationLedger entry.' },
    { step: 'Regenerate & communicate', owner: 'Design + Dev', detail: 'Run npm run generate:all so the guide, contract, agent rules, assets, and PDF follow, then announce in #brand. The durable changelog is the git history of the spectrea-branding repo.' },
  ],
  changelog:
    'Versioned in git — the commit history of the spectrea-branding repo is the durable changelog; notable changes are announced in #brand.',
} as const

// --- Brand Foundation ---
export const brand = {
  name: 'Spectrea',
  pronunciation: '/spek-TREE-uh/',
  etymology:
    'A coinage from "spectrum" (Latin, from specere, "to look"; plural "spectra" — the full range). The name does double duty: (1) the full range — the complete view, the whole picture, everything in one place; (2) revealing — bringing what was hidden into clear view. Together: the spectrum of clarity.',
  tagline: {
    statement: 'We connect the dots.',
    usage: 'The public-facing hook. Appears with the logo, in marketing headlines, and as the one-line summary. Should work at both the product level (connecting data) and the brand level (connecting understanding).',
  },

  // --- Why We Exist ---
  why: {
    statement: 'We live in an information age that\'s paradoxically making us less informed — more data, less truth; more tools, fewer insights; more noise, less action. Spectrea exists to close the gap between having information, truly understanding it, and being able to build on it.',
    usage: 'Internal compass. Answers "why does this company need to exist?" Used in about pages, investor narratives, recruiting, and internal alignment. Rarely changes.',
  },

  mission: {
    statement: 'To make knowledge trustworthy, connected, and actionable — empowering people to build on what came before, so that every insight becomes the foundation for what comes next.',
    usage: 'Present-tense action statement. Answers "what are we doing about it?" Used in website footers, press boilerplates, pitch decks. Updated as strategy evolves.',
  },
  vision: {
    statement: 'A world where anyone can see the full spectrum of what\'s known, trust what they see, and build on it — where understanding compounds across every boundary that used to contain it.',
    usage: 'Future-state outcome. Answers "what does the world look like if we succeed?" Used in investor decks, long-term strategy, recruiting. The north star.',
  },

  // --- Positioning ---
  positioning: {
    for: 'Anyone who works with knowledge',
    category: 'Composable intelligence platform',
    // Category guard (2026-07-03): the noun is user-ratified (VM-F-CAT).
    // badSubstitutions lists the retired noun and the adjacent categories the
    // vision explicitly rejects; derived formats build their rule from this.
    categoryGuard: {
      exactNoun: true,
      badSubstitutions: ['composable knowledge platform', 'knowledge platform', 'knowledge management', 'AI assistant', 'automation tool'],
    },
    // On-ramp posture (decided 2026-07-03; amended 2026-07-19): outcome-first
    // hero with one sanctioned coined whole-product frame ("the operating
    // system for collective intelligence") and the balance doctrine — market
    // terms may label a segment-matched surface when plain language carries
    // the meaning. See ratificationLedger.
    onRamp: {
      posture:
        'Outcome-first hero per the canonical heroOpen rule: the hero leads with the entry job and its outcome, written as a reveal. One coined whole-product frame is sanctioned (ratified 2026-07-19): "the operating system for collective intelligence" — distinct from generic "AI OS", always paired with plain language that carries the meaning. Balance doctrine (ratified 2026-07-19): avoid-list terms are not blacklisted — one may label a segment-matched surface when a plain-language claim carries the meaning in place; never expect it to carry weight with unfamiliar audiences, and never lead a cross-segment hero with it.',
      heroExample:
        'Drop in your docs — get answers that show their sources, and a system that gets sharper every week.',
      adopt: ['permission-aware', 'cited answers', 'grounded answers', 'knowledge graph (exploration surfaces only — the graph stays supporting-cast)'],
      avoid: ['Work AI', 'organizational memory', 'AI workspace', 'AI OS', 'second brain', 'ambient agents', 'bitemporal', 'ontology', 'enterprise graph'],
      // Balance doctrine (ratified 2026-07-19): the avoid list guards against
      // buzzword-led copy, not against the words existing. An industry term may
      // label a segment-matched surface where a plain-language claim carries the
      // meaning in place — but never expect the term to carry weight with
      // audiences who don't know it, and never let it open a cross-segment hero.
      avoidRule:
        'Industry terms are not blacklisted or censored: an avoid-list term may label a segment-matched surface when a plain-language claim carries the meaning in place (e.g. "second brain" on the individuals page). Do not expect the term to carry weight with unfamiliar audiences; balance it, and never lead a cross-segment hero with it.',
      coined: ['per-viewer truth', 'decisions in the graph', 'the operating system for collective intelligence'],
      coinRule:
        'Coin language ONLY for the differentiators no market term names: per-viewer truth, decisions in the graph, and the whole-product frame "the operating system for collective intelligence" (ratified 2026-07-19; pair it with plain language — it must not carry the claim alone). Everywhere else, use the market\'s word where one exists (adopt list) or plain outcome language.',
      // Worked example for the coined whole-product frame (ratified 2026-08-09,
      // D29): every comparable voice rule ships a right/wrong pair; the frame's
      // pairing rule previously existed only as rule statements — never applied.
      osFrameExample: {
        right: 'See everything your organization knows in one connected view — Spectrea is the operating system for collective intelligence: the place where what your team knows connects, compounds, and answers back.',
        wrong: 'Spectrea: the operating system for collective intelligence.',
        why: 'The right version opens on the outcome and pairs the frame with plain language that carries the meaning in the same breath. The wrong version asks the frame to carry the claim alone — forbidden by the coinRule — and leads with it, against the on-ramp\'s outcome-first posture.',
      },
    },
    promise:
      'Turns scattered information into compounding intelligence',
    // Full-shape claim (vision §1, spectrea-vision.md; adopted 2026-07-19):
    // compounding (temporal — each cycle sharpens the next) × collective
    // (cardinality — the org acts as one). Internal north-star, not hero copy.
    fullShapeClaim: {
      statement: 'Compounding collective intelligence',
      usage:
        'The platform\'s full-shape claim per the ratified vision: compounding intelligence is the temporal property, collective intelligence the cardinality property; Spectrea\'s target is both together. Internal north-star and depth-surface language (docs, vision, architecture narratives) — the on-ramp stays outcome-first.',
    },
    brand:
      'In an age of information overload and eroding trust, people need more than another tool — they need a way to separate truth from noise, surface insights across boundaries, and build on what they understand. Spectrea is the composable intelligence platform that puts this power in human hands — where everything you see is transparent, every connection inspectable, and understanding compounds with every interaction.',
    tactical:
      'For anyone who works with knowledge, Spectrea is the composable intelligence platform that turns scattered information into compounding intelligence — unlike fragmented point solutions that silo your knowledge and hide their reasoning.',
  },

  // --- Messaging Hierarchy ---
  messaging: {
    primary: {
      theme: 'Connection',
      headline: 'We connect the dots.',
      supporting:
        'Your knowledge is scattered across dozens of tools. Spectrea brings it together — one connected whole where answers carry their sources and every insight is ready to build on.',
    },
    secondary: [
      {
        theme: 'Trustworthy Intelligence',
        headline: 'Intelligence you can trust.',
        supporting:
          'In a world of noise and hallucination, everything you see in Spectrea is transparent. You can always see where it came from, what changed, and why. Truth isn\'t assumed — it\'s shown.',
      },
      {
        theme: 'Compounding Intelligence',
        headline: 'It gets smarter with every interaction.',
        supporting:
          'Every document you add, every idea you capture, every connection you draw — it all compounds. Your second year is sharper than your first — more context retained, more decisions traceable, more outcomes feeding the next cycle.',
        usageGuardrail:
          'Use "compounding intelligence" only with its defensible mechanism named — provenance, per-viewer access, and the closed loop that feeds outcomes back in. The phrase is contested in-market (noted 2026-07-03); the mechanism, not the slogan, carries the claim.',
      },
      {
        theme: 'Composability',
        headline: 'Build exactly what you need.',
        supporting:
          'Spectrea gives you simple, powerful building blocks. Assemble them into solutions that fit your domain — no consultants, no configuration maze.',
      },
    ],
  },

  // --- Brand Archetypes (three facets, one motion) ---
  // Spectrea is one character whose way of operating always contains three
  // inseparable movements: reveal → ground → equip. The three traditional
  // archetypes (Magician / Sage / Creator) aren't personas for three surfaces;
  // they're facets of a single gesture. Every brand moment — marketing hero,
  // error screen, editor interaction — carries all three. The emphasis shifts
  // with context; the character doesn't.
  //
  // The through-line is already encoded in the tagline ("We connect the dots"
  // = see → trust → build), the strategic claim ("See it whole. Trust what you
  // see. Build on what you find."), and the hero-open gesture (outcome as
  // reveal → ground with a specific → equip the next step). The voice formula
  // states the TEXTURE those movements are written in ("Plain words, real
  // specifics, room to breathe…" — decision 33): ground lives in "real
  // specifics", equip in "checkable", and "room to breathe" is the attention
  // discipline that keeps the reveal legible.
  archetypes: [
    {
      name: 'Reveal',
      facet: 'Magician',
      description:
        'Brings the hidden pattern into view. The moment of seeing what was always there but never noticed — the insight surfacing, the connection clicking. Without reveal, copy is flat; nothing feels discovered.',
    },
    {
      name: 'Ground',
      facet: 'Sage',
      description:
        'Shows the evidence. Makes the reasoning visible. The calm of being able to see exactly how something is true — sources, confidence, traceable logic. Without ground, reveal is hype.',
    },
    {
      name: 'Equip',
      facet: 'Creator',
      description:
        'Hands you the tools to build on what you find. Gives the user agency, stays out of the way. The joy of making something that\'s yours. Without equip, the brand informs but never empowers.',
    },
  ] as const,

  // --- Personality ---
  personality: [
    {
      trait: 'Warm',
      description: 'Respects the person behind every interaction. Designs for how you actually think, not how systems want you to think.',
      guardrail: 'But not soft — warmth doesn\'t mean hand-holding. Trust users to be capable.',
    },
    {
      trait: 'Perceptive',
      description: 'Sees patterns others miss. Surfaces connections — then steps back and lets you decide what to do with them.',
      guardrail: 'But not presumptuous — suggests, never dictates.',
    },
    {
      trait: 'Grounded',
      description: 'Powerful but never pretentious. Substance over style. Earns respect through verifiable results.',
      guardrail: 'But not boring — substance doesn\'t mean plain. It needs spark.',
    },
    {
      trait: 'Adaptive',
      description: 'Meets you where you are. A beginner and an expert use the same system — they just see different depths.',
      guardrail: 'But not shapeless — flexibility doesn\'t mean no opinion. Spectrea has a clear point of view.',
    },
  ],

  // --- Values ---
  // Brand-level values — outcomes the brand stands for. Proofs describe the
  // shape of that outcome at the brand level (what a reader can feel), not
  // specific product mechanisms. Internal product principle codes have been
  // dropped; the values stand on their own.
  values: [
    {
      name: 'Human-First',
      description: 'Spectrea serves people, not the other way around. AI assists understanding — it never replaces judgment. The system suggests, you decide. Your knowledge belongs to you.',
      proof: 'Private by default. AI suggests, never overrides silently. Every AI action is reviewable and reversible. The system works without AI; AI elevates, never gates. Your data is sovereign: full-fidelity export — structure, data, and provenance — with no lock-in. You can always leave with everything.',
    },
    {
      name: 'Trustworthy Intelligence',
      description: 'Everything you see is transparent. Every action is reviewable. Every connection can be followed back to where it came from. Truth is per-viewer: what you see is synthesized from exactly the claims you can access — coexisting perspectives stay attributed, and nothing leaks from views you can\'t see. Understanding that can\'t be verified isn\'t understanding at all.',
      proof: 'Every piece of information is linked to its source. Confidence levels are visible, never hidden. Every change is logged with reasoning. AI actions are always recorded and explainable.',
    },
    {
      name: 'Compounding Intelligence',
      description: 'The more you use Spectrea, the more it gives back. Connections surface faster, context deepens, insights compound. Your second year is sharper than your first — more context retained, more decisions traceable, more outcomes feeding the next cycle.',
      proof: 'Every interaction enriches the system, providing richer context for everything that comes next and surfacing connections that would otherwise stay hidden.',
      usageGuardrail: 'Use "compounding intelligence" only with its defensible mechanism named — provenance, per-viewer access, and the closed loop that feeds outcomes back in. The phrase is contested in-market (noted 2026-07-03); the mechanism, not the slogan, carries the claim.',
    },
    {
      name: 'Composable by Nature',
      description: 'Build solutions that fit your world — don\'t reshape your world to fit a tool. Simple, combinable parts assembled into exactly what you need.',
      proof: 'Composable building blocks that assemble into domain-specific solutions. Specificity emerges from how you combine, not from what\'s pre-built for you.',
    },
    {
      name: 'Accessible Power',
      description: 'Deep capability that meets you where you are. No one excluded by complexity, no one limited by simplicity. The floor is high, and the ceiling rises with you.',
      proof: 'The same system reveals different depths depending on how you use it. Beginners get a clear, complete experience; experts get the depth they need without changing tools.',
    },
  ],

  // --- Anti-Values ---
  antiValues: [
    {
      never: 'Never replaces human judgment',
      because: 'AI assists, suggests, and surfaces — but you decide. Judgment stays yours: automations act only within guardrails you set, and every AI action is recorded, attributed, and reviewable.',
    },
    {
      never: 'Never leaves anyone behind',
      because: 'If someone feels lost or excluded, we failed — not them. Every interaction must be understandable at the user\'s depth.',
    },
    {
      never: 'Never complex or bloated',
      because: 'Simplicity and composability are sacred. If it needs a consultant, we failed.',
    },
    {
      never: 'Never a black box',
      because: 'You can always ask "why?" and get an answer. Every recommendation, every connection, every automated action is inspectable.',
    },
  ],

  // --- Emotional Core ---
  emotionalCore: {
    primary: 'Empowerment',
    primaryDescription: 'Feeling more capable — not because the system decided for you, but because it helped you see clearly and choose wisely.',
    secondary: 'Clarity',
    secondaryDescription: 'Like putting on glasses — everything that was blurry snaps into focus. "Now I can see."',
  },

  // --- Visual Metaphor ---
  // Explicitly CO-PRIMARY (ratified 2026-08-06, decision 6): two metaphors with
  // distinct roles — neither is secondary. When a surface needs a single lead,
  // role decides (art-direction tiebreaker; Darren may refine).
  visualMetaphor: {
    hierarchy: 'co-primary',
    tiebreaker: 'Identity and reveal surfaces (logo moments, brand story, launch) lead with the Prism; product and growth surfaces (features, onboarding, roadmap) lead with the Living Network. Neither metaphor is ever "the secondary".',
    metaphors: [
      {
        name: 'Prism',
        role: 'Identity / reveal',
        description: 'Raw information enters, organized insight exits. The "reveal" moment — hidden structure made visible.',
      },
      {
        name: 'Living Network',
        role: 'Product / growth',
        description: 'A web of connections that grows denser and more intelligent over time. The "growth" story.',
      },
    ],
    combined: 'The prism is Spectrea\'s origin (the name). The network is its promise (it grows with you).',
  },

  // --- Aesthetic Direction ---
  aesthetic: {
    direction: 'Warm + Intelligent',
    description: 'Like a brilliant mentor — approachable yet deep. Rich colors, inviting spacing. Feels human.',
    references: ['Stripe', 'Linear'],
    tradeoff: 'Power over polish. Capability is sacred. Elegance is valued but never at the cost of depth.',
  },

  // --- Audiences ---
  audiences: [
    {
      title: 'Solo Knowledge Workers',
      who: 'Independent researchers, writers, consultants, students — anyone building a personal knowledge practice',
      need: 'A system that compounds from day one, alone — free and full-featured, no team required.',
      message: 'Start free, alone, with the full system. Your knowledge starts compounding with the first document — and when you\'re ready, invite a few collaborators without switching tools.',
    },
    {
      title: 'Business Leaders',
      who: 'CEOs, COOs, Managing Directors',
      need: 'Strategic clarity. See what the organization actually knows — and what it\'s missing.',
      message: 'In a world drowning in data, Spectrea surfaces the intelligence that matters — connected, verified, and compounding with every interaction.',
    },
    {
      title: 'Knowledge Workers',
      who: 'Analysts, researchers, consultants',
      need: 'Find trusted connections across sources. Build on what exists instead of reinventing.',
      message: 'Stop hunting through 12 tools for information you can\'t verify. Spectrea connects your knowledge into one living, trustworthy graph.',
    },
    {
      title: 'Technology Leaders',
      who: 'CTOs, IT Directors, architects',
      need: 'A composable, inspectable, extensible knowledge substrate.',
      message: 'Composable. Transparent. Built on primitives, not opinions. A platform that earns the trust of an engineering culture that asks "why" before adopting anything.',
    },
    {
      title: 'Growing Teams',
      who: 'Startup founders, team leads',
      need: 'Preserve institutional knowledge. Turn tribal knowledge into collective intelligence.',
      message: 'Every conversation, every document, every decision — captured in a graph that compounds. When someone leaves, their insights stay.',
    },
  ],

  // Ratified breadth mechanics (2026-07-03): the individual tier is first-class,
  // not a trial — free is full-featured; paying is about scale, not capability.
  // Split 2026-08-13 (public-exposure audit, A2-F9): the customer-facing promise
  // stays public; the packaging mechanics are internal-tier (internalCanon).
  audienceBreadth:
    'The individual tier is first-class, not a trial — free is full-featured, and value arrives before payment. Paying is about scale, never a crippled core.',
  audienceMechanics:
    'INTERNAL. The designed path: start free alone (full-featured) → invite a few collaborators (bounded invites stay free) → pay when capacity or admin scale demands it. The paid line is capacity and governance administration.',

  // --- Differentiators ---
  // Anchored to the moat (2026-07-03): per-viewer truth, graph-resident
  // decisions with provenance, outcomes feeding the next cycle, one substrate
  // from solo to institution — then the supporting brand qualities.
  differentiators: [
    { spectrea: 'Per-viewer truth — coexisting, attributed perspectives; each viewer sees a synthesis of exactly what they can access', others: 'One forced record — or per-user silos that never combine' },
    { spectrea: 'Decisions live in the graph — choices, doctrines, and commitments carry provenance and stay queryable', others: 'Decisions evaporate into chat scroll and meeting notes' },
    { spectrea: 'Outcomes feed back — what happened sharpens what the system knows next', others: 'Static — same value on day 1 and day 1000' },
    { spectrea: 'One substrate, solo to institution — the same system grows from one person to an organization', others: 'A personal tool you outgrow, or an enterprise platform too heavy to start small' },
    { spectrea: 'Transparent and verifiable — everything you see is shown, and every connection can be followed back', others: 'Black box — data goes in, answers come out' },
    { spectrea: 'Composable — build exactly what you need from simple parts', others: 'Fixed — use what you\'re given' },
    { spectrea: 'Sovereign by default — private, and fully exportable with structure and provenance', others: 'Open by default, hard to leave — data leaks in, value locks in' },
  ],
  differentiatorGuardrail:
    'Never position on retrieval or search quality — it is commoditized across the field. The graph earns its keep through governance, provenance, shared state, and the loop; differentiate on what the substrate makes structural.',

  // --- Typography ---
  typography: {
    heading: {
      family: 'Albert Sans',
      fallback: 'sans-serif',
      css: "'Albert Sans', sans-serif",
      weights: { semibold: 600, bold: 700 },
      defaultWeight: 600,
      usage: 'Page titles, section headings, card titles, nav labels, stat values. The brand\'s typographic signature — distinctive letterforms make Spectrea recognizable.',
    },
    body: {
      family: 'Lexend',
      fallback: "'Inter', sans-serif",
      css: "'Lexend', 'Inter', sans-serif",
      weights: { light: 300, regular: 400, medium: 500, semibold: 600 },
      defaultWeight: 400,
      usage: 'Body text, UI labels, descriptions, form labels, tooltips, buttons. 300 for oversized display numerals, 400 for body, 500 for emphasis (buttons, nav, labels), 600 for overlines and section labels. Optimized for reading fluency — reduces visual crowding in dense knowledge interfaces.',
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: 'monospace',
      css: "'JetBrains Mono', monospace",
      weights: { regular: 400 },
      defaultWeight: 400,
      usage: 'Code snippets, type labels, trace details, data values, confidence scores, technical identifiers.',
    },
    // Moved from guide prose into canon 2026-08-08 (decision 2, hybrid guide
    // generation): sizes and weights are data, so the guide sections that
    // carry them are generated from here.
    minSizes:
      'Body and prose: 16 px preferred, 14 px minimum. Captions and secondary labels: 12 px minimum. 10 px is permitted only for uppercase-tracked overlines, numeric badges, and metadata chips where the letter-spacing and weight restore legibility. Below 10 px is specimen-only (mini-preview UI illustrating another system at small scale) and must never appear in shipped production surfaces.',
    scale: [
      { name: 'Display', px: 48, lineHeight: 1.1, weight: 600, use: 'Hero headlines, landing-page titles' },
      { name: 'H1', px: 36, lineHeight: 1.2, weight: 600, use: 'Page titles' },
      { name: 'H2', px: 30, lineHeight: 1.25, weight: 600, use: 'Major section headings' },
      { name: 'H3', px: 24, lineHeight: 1.3, weight: 600, use: 'Sub-section headings, card titles' },
      { name: 'H4', px: 20, lineHeight: 1.4, weight: 600, use: 'Minor headings, dialog titles' },
      { name: 'H5', px: 18, lineHeight: 1.4, weight: 600, use: 'Sidebar section titles' },
      { name: 'Body LG', px: 18, lineHeight: 1.6, weight: 400, use: 'Lead paragraphs' },
      { name: 'Body', px: 16, lineHeight: 1.6, weight: 400, use: 'Default body text' },
      { name: 'Body SM', px: 14, lineHeight: 1.5, weight: 400, use: 'Secondary text, table cells, form inputs' },
      { name: 'Caption', px: 12, lineHeight: 1.5, weight: 500, use: 'Labels, timestamps, helper text' },
      { name: 'Overline', px: 12, lineHeight: 1.5, weight: 600, use: 'Section labels (uppercase + 0.05em tracking)' },
      { name: 'Code', px: 14, lineHeight: 1.5, weight: 400, use: 'Inline code, data values, type labels (JetBrains Mono)' },
      { name: 'Code SM', px: 12, lineHeight: 1.5, weight: 400, use: 'Trace details, technical metadata (JetBrains Mono)' },
    ],
    responsive: {
      note: 'Desktop (1024+) / Tablet (640–1023) / Mobile (<640)',
      rows: [
        { name: 'Display', desktop: 48, tablet: 36, mobile: 30 },
        { name: 'H1', desktop: 36, tablet: 30, mobile: 24 },
        { name: 'H2', desktop: 30, tablet: 24, mobile: 20 },
        { name: 'H3', desktop: 24, tablet: 20, mobile: 18 },
      ],
      unchanged: 'Body / Body SM: unchanged across breakpoints.',
    },
  },

  // --- Aspirational & Anti Brands ---
  // Aspirational reads as "shares brand qualities Spectrea wants to be felt
  // alongside" (clarity, restraint, considered design). Notion was previously
  // listed but is dropped in v2 because Spectrea explicitly differentiates
  // from Notion (substrate-only positioning).
  // antiBrands is a design device (don't look or sound like this), never a
  // public statement about the named companies — internal-tier since
  // 2026-08-13 (audit A2-F16: two of the three are integration/partner
  // targets). Public surfaces render antiPatternsPublic instead.
  aspirationalBrands: ['Apple', 'Linear', 'Stripe'],
  antiBrands: ['Salesforce', 'Microsoft 365', 'Jira'],
  antiPatternsPublic:
    'Enterprise-suite density and ticket-tracker greyness — the heavy, joyless chrome Spectrea must never feel like.',
} as const

// --- Voice & Tone ---
export const voice = {
  // Rewritten 2026-08-10 (decision 33, humanist correction). The old formula
  // ("Clarity of explanation + experiential momentum. Tech earns its place by
  // showing its work.") read as a composition rule — every sentence carried
  // its mechanism — and produced justification-chain bloat. "Checkable" keeps
  // the anti-black-box stance; attentionRule governs where the work is shown.
  formula: 'Plain words, real specifics, room to breathe. Tech earns its place by being checkable — shown once, where the reader looks for it.',
  techApproach: 'Earn the jargon',
  techDescription:
    'Start with the human benefit, then introduce the technical concept. Tech earns its place by being checkable — pointing to the source, the trace, the evidence — not by impressing.',
  // The attention discipline (decision 33): "earn the jargon" is an ADMISSION
  // rule, not a composition rule. Proof by placement, not repetition.
  attentionRule:
    'Show the work once, where the reader looks for it. "Earn the jargon" governs what may enter the copy — not how often it repeats. One claim, one proof per surface: the mechanism lives one step from the claim (the next sentence, a subhead, an expandable) — never welded to every sentence. If two sentences in a row prove the same claim, cut one. The claim—dash—mechanism shape is a tool, not a rhythm.',

  // The 12 brand-evocative privileged words.
  // These read brand-pure (no product knowledge required) and shape the Spectrea voice.
  // Product-flavoured words (provenance, traceable, auditable, attributed) are still
  // allowed when describing what the product does — they just don't do brand voice work.
  alwaysUse: [
    'spectrum',     // the brand's name
    'clarity',      // the brand outcome
    'whole',        // seeing it all in one place
    'see',          // direct, humble brand action
    'reveal',       // bringing the hidden into view
    'illuminate',   // shining light on what was dim
    'surface',      // distinctive verb — bring forward
    'connect',      // the tagline verb
    'compose',      // brand quality (build from parts)
    'compound',     // brand quality (grows over time)
    'alive',        // the living, growing quality
    'transparent',  // brand value
  ],
  neverUse: [
    'AI-powered (overused)', 'next-gen', 'state-of-the-art', 'world-class',
    'breakthrough', 'unprecedented', 'game-changer', 'revolutionary',
    'seamless', 'cutting-edge', 'synergy', 'leverage (as verb)',
    // 2026 AI-hype cluster (added 2026-07-03)
    'agentic', 'AI-first', 'copilot (as generic noun)', '10x',
    'supercharge', 'effortless', 'magical',
  ],

  // Two context shifts within the same voice — folded as compact principles.
  contextShifts: {
    buyer: {
      label: 'On buyer surfaces',
      detail: 'Hero, case studies, pricing — the open lands on the outcome (heroOpen rule); proof carries the grounding: a named customer, a concrete outcome, or a peer-testable claim. Brand vocabulary decorates; it doesn\'t carry the opening.',
    },
    product: {
      label: 'Inside the product',
      detail: 'Warm up one notch. Warmth comes from specificity, not exclamation points — "Read. 12 entities, 18 connections added." beats "Upload complete! 🎉" because the first shows the system paid attention.',
    },
  },

  // The one canonical hero-open (D28 part 1, ratified 2026-08-07): fuses the
  // outcome-first structure (2026-07-03/19) with the character's reveal
  // register. Kept simple and adaptable by design — the satellite texts
  // (contextShifts.buyer, messaging onRamp, character facets) describe steps
  // of this one gesture, never competing openings.
  heroOpen:
    'Open on the outcome, written as a reveal — the moment of new sight. Never open with the mechanism, the pain alone, or a platitude. Ground it next with a specific the reader can check; close by equipping the next step. The gesture adapts to any surface — a problem may set up the reveal, proof may carry the grounding — but the open always lands on the outcome. Exception: graph-native jobs (exploration, visualisation), where the graph is the star and may lead.',

  // Privileged-vocabulary density rule.
  vocabularyDensity:
    'Max two privileged words per paragraph, one "living" / "alive" per page. If a paragraph survives losing every privileged word, the prose is doing its job — if it collapses without them, rewrite.',

  // One register taxonomy (D28 part 2, ratified 2026-08-08): toneExamples IS
  // the tone spectrum. The retired standalone toneSpectrum duplicated four of
  // these entries verbatim under colliding labels; its tone labels moved here.
  registerRule:
    'Two structures, two jobs. toneExamples is the register taxonomy: how a content class sounds — a tone label plus a right/wrong pair and the why. surfacePatterns is the surface spec: what a product surface says. A product surface inherits its register from the nearest content class (System notifications ↔ Error Message; release notes ↔ Feature Announcement).',

  toneExamples: [
    {
      context: 'Marketing / Landing Page',
      tone: 'Bold + Direct',
      // Rewritten per the canonical heroOpen rule (D27, ratified 2026-08-08).
      correct: 'See everything your organization knows in one connected view. Spectrea builds a living graph from your documents — the more you use it, the sharper it gets.',
      incorrect: 'Transform how your team works. Unlock the power of connected knowledge — insights, intelligence, impact.',
      why: 'Bold and direct. The wrong version isn\'t hype — it\'s platitude. "Transform," "unlock," "insights" say nothing specific. The right version opens on the outcome written as a reveal — everything in one connected view — then grounds it with the mechanism as the reason to believe, and the compounding claim keeps its mechanism tie.',
    },
    {
      context: 'Error Message',
      tone: 'Direct + Informative',
      correct: 'Save failed: connection timeout. Your draft is cached locally. Retrying...',
      incorrect: 'Oops! Something went wrong. Please try again later or contact support if the problem persists.',
      why: 'Direct and informative. States what happened, what\'s safe, and what\'s next. No vague apologies.',
    },
    {
      context: 'Feature Announcement',
      tone: 'Concrete + Confident',
      // Retuned 2026-08-10 (decision 33): the old version proved compounding
      // three sentences in a row — attentionRule allows it once.
      correct: 'Connections you never noticed start surfacing. Your second month is better than your first.',
      incorrect: 'We\'re excited to share our latest update — it includes improvements that will help you be more productive.',
      why: 'Shows what the user experiences, not what we built. The wrong version is the bland-SaaS failure mode: agentless, vague, no specifics. The right version names the shift the user will actually notice — once, and trusts the reader.',
    },
    {
      context: 'Documentation',
      tone: 'Precise + Helpful',
      correct: 'To add a new item, open the relevant view and choose "Add". Pick a type from the list, or create one if you need it. The item appears in place immediately.',
      incorrect: 'Ready to add something? Just head over to the right view and hit that "+ Add" button! Pick a type that fits — or make a new one if nothing works. Easy!',
      why: 'Precise and helpful. No forced enthusiasm. Respects the user\'s time and intelligence.',
    },
    {
      context: 'Social Media',
      tone: 'Thoughtful + Engaging',
      correct: 'What if every document you uploaded made your whole system smarter? That\'s not a hypothetical — it\'s how Spectrea works.',
      incorrect: 'Team productivity has never been easier. Learn how Spectrea can transform your workflow.',
      why: 'Thoughtful and engaging. The wrong version is a platitude-plus-CTA — the default failure mode of brand social. The right version leads with an idea and invites the reader to think.',
    },
    {
      context: 'Beginner Documentation',
      tone: 'Plain + Welcoming',
      // Retuned 2026-08-10 (decision 33): dropped the em-dash tail that
      // restated "weaves into the web" in different words.
      correct: 'Think of Spectrea as a web of everything your team knows. Add a document and Spectrea weaves what it learns into the web.',
      incorrect: 'Documents are processed through a 6-phase pipeline: parse, chunk, embed, score, review, and integrate.',
      why: 'Demonstrates the Adaptive personality: meets beginners where they are, using familiar metaphors instead of technical architecture.',
    },
  ],

  // Voice patterns for product and operational surfaces the register taxonomy
  // doesn't cover (added 2026-07-03; relation declared in registerRule). Each
  // pairs a rule with a right/wrong example. Release notes are covered by the
  // Feature Announcement register above.
  surfacePatterns: [
    {
      surface: 'Onboarding',
      rule: 'Orient by doing, not touring. First screens name the one action that creates value and get out of the way. No feature carousels, no "welcome to the future".',
      correct: 'Add your first document. Spectrea reads it and starts connecting it to what you add next.',
      incorrect: 'Welcome to Spectrea! 🎉 Let\'s take a quick tour of all the powerful features that will transform how you work.',
    },
    {
      surface: 'Empty states',
      rule: 'An empty state is an invitation with a promise, not an apology. Name what will appear here and the single step that starts it.',
      correct: 'No connections yet. Add a second document and related ideas start linking up here.',
      incorrect: 'Nothing to see here yet!',
    },
    {
      surface: 'Confirmation dialogs',
      rule: 'State the consequence plainly, in the user\'s terms — what happens, what\'s reversible, what isn\'t. The confirm button names the action, never "OK".',
      correct: 'Delete this source? Its 14 extracted claims stay in the graph but lose their citation. This can\'t be undone.',
      incorrect: 'Are you sure you want to proceed? This action may have consequences. [OK] [Cancel]',
    },
    {
      surface: 'System notifications',
      rule: 'Specificity is the warmth. Report what the system actually did, with numbers where they exist. No celebration, no vagueness.',
      correct: 'Read. 12 entities, 18 connections added.',
      incorrect: 'Upload complete! 🎉 Your document has been processed successfully.',
    },
    {
      surface: 'Settings & security',
      rule: 'Ground leads. Say exactly what a setting does and what changes when it\'s toggled — especially for privacy and access. Plain sentences, no marketing.',
      // Retuned 2026-08-10 (decision 33): the nested clause chain unstacked
      // into plain sentences.
      correct: 'Workspace visibility: private. Only people you invite can see this workspace. The assistant sees only what each viewer can see.',
      incorrect: 'Take control of your data with our industry-leading privacy options!',
    },
    {
      surface: 'Legal & compliance',
      rule: 'Same voice, zero warmth-decoration: precise, complete sentences that a lawyer and a reader both accept. State facts and obligations; never soften a limitation into a benefit.',
      // Timeframe neutralised 2026-08-13 (audit C11): a concrete number in the
      // imitation target propagates as a commitment; the real figure is set
      // with counsel before launch.
      correct: 'You can export your full workspace — structure, data, and provenance — at any time. Deleting your account removes your data from live systems within the period stated in our retention policy.',
      incorrect: 'Don\'t worry — your data is always safe with us, and leaving is a breeze!',
    },
    {
      surface: 'Support replies',
      rule: 'Ground, then equip: confirm what happened (own it plainly if it\'s our fault), state what\'s true now, give the exact next step. Never open with an apology template.',
      correct: 'You\'re right — sync failed for files added between 09:10 and 09:40 UTC. They\'re queued and will finish within the hour; nothing was lost. I\'ll reply here when they\'re through.',
      incorrect: 'We sincerely apologize for any inconvenience this may have caused. Your satisfaction is our top priority.',
    },
  ],
} as const

// --- Naming Rules ---
// Canonical never-list plus AI and company/product naming rules. Unifies the
// previously divergent lists in the guide, llms.txt, and the Naming page
// (2026-07-03); those surfaces mirror this list.
export const naming = {
  neverNames: [
    '"SpectreAI" (not the name)',
    '"Spectre" / "Spectra" (different words — not the name)',
    '"spectra" (missing the e — typo)',
    '"Spectrea AI" as the lead name (AI is not the brand)',
    '"SPECTREA" (all-caps styling)',
    '"spectrea" lowercase in headings or prose (lowercase belongs to the logo wordmark treatment only)',
    '"The Spectrea" (no article)',
    'Random internal caps ("SpecTrea")',
  ],
  aiNaming: {
    canonicalNoun: 'the assistant',
    // Three registers, ratified 2026-07-19 (absorbs the spectrea-web local
    // ratification of 2026-07-16 into canon).
    rule: 'Three registers. (1) Homepage/hero narrative: "your AI" is sanctioned to match the hero register. (2) Product and trust surfaces: the AI is "the assistant" — lowercase, generic; as a first-class feature name it is "Assistant" (Title-Case). (3) Technical and architecture writing: "agent" is the umbrella term for an accountable AI actor (delegate or standing agent), per the vision taxonomy — the assistant is the delegate shape\'s product realization. Never "copilot" (generic or name), never "Spectrea AI" as a name.',
    allowedVerbs: ['suggests', 'surfaces', 'drafts'],
    forbiddenVerbs: ['handles it for you', 'takes over'],
    verbRule: 'The assistant suggests, surfaces, and drafts — it never silently "handles it for you" or "takes over". Automations act within guardrails the user sets: the user decides what runs on its own and what checks with you first (ratified 2026-07-19, per the vision\'s governed-autonomy model). Never describe autonomy without naming its guardrail; never use approval-begging framings ("waiting for your yes").',
  },
  companyProduct: {
    company: 'Matchwise Pte. Ltd.',
    product: 'Spectrea',
    rule: 'Matchwise Pte. Ltd. is the legal entity — it appears only where a legal entity is required: contracts, invoices, terms, privacy notices ("Spectrea is a product of Matchwise Pte. Ltd."). Spectrea is the product and brand name on every public surface. Never brand a surface "Matchwise"; never combine the two into one name.',
    legacy: 'Any earlier material using the company name as a product or brand name is superseded; Spectrea is the only product name.',
  },
} as const

// --- Machine-Readable Design Tokens ---
// Canonical numeric/token values that previously lived only in guide prose,
// CSS snippets, and component code. The guide and generated formats mirror
// these; on conflict, this table wins.
export const brandTokens = {
  radii: [
    { token: 'sm', px: 4, tailwind: 'rounded', use: 'Tags, badges, inline code' },
    { token: 'md', px: 6, tailwind: 'rounded-md', use: 'Compact buttons, small controls' },
    { token: 'lg', px: 8, tailwind: 'rounded-lg', use: 'Buttons, inputs, dropdowns' },
    { token: 'xl', px: 12, tailwind: 'rounded-xl', use: 'Cards, panels, modals (default container)' },
    { token: '2xl', px: 16, tailwind: 'rounded-2xl', use: 'Hero sections, large feature cards' },
    { token: 'full', px: 9999, tailwind: 'rounded-full', use: 'Avatars, spectrum tags, toggles' },
  ],
  spacing: {
    baseUnit: 4,
    rule: 'Every spacing value is a multiple of 4 px. Fine inline elements (badges, compact controls) may use 2 px increments (6 px, 10 px); never arbitrary values like 5 px, 7 px, or 15 px.',
    scale: [
      { token: '2xs', px: 4, tailwind: 'p-1', use: 'Tight inline, icon gaps' },
      { token: 'xs', px: 8, tailwind: 'p-2', use: 'Input / badge padding, compact gaps' },
      { token: 'sm', px: 12, tailwind: 'p-3', use: 'Compact card padding, list-item gaps' },
      { token: 'md', px: 16, tailwind: 'p-4', use: 'Default content gap, section padding' },
      { token: 'lg', px: 20, tailwind: 'p-5', use: 'Default card padding, modal padding' },
      { token: 'xl', px: 24, tailwind: 'p-6', use: 'Section spacing, form-field gaps' },
      { token: '2xl', px: 32, tailwind: 'p-8', use: 'Major section breaks' },
      { token: '3xl', px: 48, tailwind: 'p-12', use: 'Page top padding, hero spacing' },
    ],
  },
  elevation: [
    { level: 'Base', zIndex: 0, shadow: 'none', use: 'Page content, cards, sections' },
    { level: 'Raised', zIndex: 10, shadow: 'shadow-sm', use: 'Sticky headers, toolbars' },
    { level: 'Dropdown', zIndex: 20, shadow: 'shadow-md', use: 'Dropdowns, popovers, tooltips' },
    { level: 'Modal', zIndex: 30, shadow: 'shadow-lg', use: 'Modals, dialogs, slide-overs' },
    { level: 'Overlay', zIndex: 40, shadow: 'shadow-xl', use: 'Modal backdrops, full-screen overlays' },
    { level: 'Toast', zIndex: 50, shadow: 'shadow-lg', use: 'Notifications, toasts' },
  ],
  motion: {
    durationsMs: { micro: 100, standard: 150, comfortable: 200, deliberate: 300, arrival: 400, formation: 300, spectrumSweep: 600 },
    easings: {
      easeOut: { css: 'cubic-bezier(0, 0, 0.2, 1)', use: 'Default — things entering or settling' },
      easeInOut: { css: 'cubic-bezier(0.4, 0, 0.2, 1)', use: 'Back-and-forth movements, continuous animations' },
      elasticSettle: { css: 'cubic-bezier(0.34, 1.56, 0.64, 1)', use: 'Arrival primitive — scale-in with soft elastic settle' },
      never: 'linear (feels mechanical) or ease-in alone (feels like something is wrong)',
    },
  },
  // Gradient family (canonized 2026-08-09, D20 closing item, in the shape the
  // 2026-07 audit recommended — AIF-25): the duet definitions, the Balanced
  // Duet's #6FB884 bridge, and the gradient use rules previously lived only in
  // component lerp code, page markup, the asset generator, and guide prose,
  // with no canonical source. Values unchanged. Stop offsets are 0–1 fractions.
  gradients: {
    angleDeg: 135,
    primary: {
      name: 'Brand gradient',
      stops: [
        { hex: '#4271DF', at: 0 },
        { hex: '#00B6A0', at: 0.5 },
        { hex: '#E19000', at: 1 },
      ],
      css: 'linear-gradient(135deg in oklch, #4271DF, #00B6A0, #E19000)',
      fallbackCss: 'linear-gradient(135deg, #4271DF, #00B6A0, #E19000)',
      interpolation: 'OKLCH on modern browsers (Chrome 111+ / Safari 16.2+ / Firefox 117+) with the sRGB fallback on older ones — the OKLCH path keeps chroma high through the middle and avoids the muddy olive zone.',
      use: 'The everyday brand gradient — hero sections, accent bars, marketing headers, dividers, progress indicators.',
    },
    adjacencyRule: 'Two-colour gradients (duets) use ADJACENT spectrum pairs only. Skip pairs (Cobalt→Amber direct, Teal→Rose, Cobalt→Rose) break the continuous-spectrum metaphor and are off-brand.',
    duets: {
      cool: {
        name: 'Cool Duet',
        stops: [
          { hex: '#4271DF', at: 0 },
          { hex: '#00B6A0', at: 1 },
        ],
        use: 'Intelligence + growth. The resting-state duet — data, technical contexts, and the static S mark. Also the lockup mark\'s gradient (LogotypeGradient, mark stroke only; the wordmark stays monotone) — never a general-purpose decorative gradient there.',
      },
      balanced: {
        name: 'Balanced Duet',
        stops: [
          { hex: '#00B6A0', at: 0 },
          { hex: '#6FB884', at: 0.65 },
          { hex: '#E19000', at: 1 },
        ],
        bridgeRule: 'Must include the #6FB884 intermediate at 65% — without it, teal and amber desaturate into muddy olive.',
        use: 'Product/ecosystem moments.',
      },
      warm: {
        name: 'Warm Duet',
        stops: [
          { hex: '#E19000', at: 0 },
          { hex: '#F24260', at: 1 },
        ],
        use: 'Energy + urgency. Marketing, launches, attention moments.',
      },
    },
    fullSpectrumWithRose: {
      name: 'Full spectrum with Rose',
      stops: [
        { hex: '#4271DF', at: 0 },
        { hex: '#00B6A0', at: 0.33 },
        { hex: '#E19000', at: 0.66 },
        { hex: '#F24260', at: 1 },
      ],
      use: 'All four spectrum colours — peak brand expression only (landing-page heroes, launch moments). Use sparingly; reserving it keeps its impact.',
    },
    useFor: ['Logo mark background', 'Hero section accent bars', 'Marketing page headers', 'Loading progress bars', 'Slide deck title dividers', 'Social media profile accents'],
    neverFor: ['Buttons (use solid Cobalt)', 'Text colour (unreadable)', 'Body backgrounds (overwhelming)', 'Borders or outlines (too busy)', 'Small icons or badges', 'Repeated elements (it stops being special)'],
  },
  // Both modes canonical (dark resolved 2026-07-04). Dark keeps the deliberate
  // lighten-on-dark idiom; white text cannot survive lightening (all lightened
  // fills sit at 1.82–2.99:1 with white), so the transient-state rule flips
  // the label to Ink — every hover/active pair below is WCAG-verified.
  buttonStates: {
    light: {
      cobalt: { base: '#4271DF', hover: '#3A63C4', active: '#3255A7' },
      rose: { base: '#F24260', hover: '#D63B55', active: '#BA3249' },
      teal: { base: '#00B6A0', hover: '#009E8A', active: '#008775' },
      amber: { base: '#E19000', hover: '#C58200', active: '#A86E00' },
      secondary: { bg: '#F4F4F1', text: '#18181C' },
    },
    dark: {
      rule: 'On dark surfaces the button lifts toward the light: hover and active fills lighten, and the label flips from White to Ink #18181C while the fill is lightened. Base states keep white text. Ink-on-lightened-fill contrast, verified 2026-07-04 (cobalt re-lightened 2026-08-08, D40 — the old hover #5C87E5 read APCA Lc 40.5, below the 45 spot line; the new ladder puts every dark transient state at APCA parity): cobalt hover 5.94 / active 7.86, rose hover 5.92 / active 7.50, teal hover 8.40 / active 9.63, amber hover 8.34 / active 9.72 — all ≥ 4.5:1 (AA, normal text).',
      cobalt: { base: '#4271DF', hover: '#6E93EC', active: '#8FACF0' },
      rose: { base: '#F24260', hover: '#F56579', active: '#F78892' },
      teal: { base: '#00B6A0', hover: '#20C8B2', active: '#40D4C3' },
      amber: { base: '#E19000', hover: '#ECA41E', active: '#F2B63C' },
      transientText: '#18181C',
      secondary: { bg: '#2E2F35', hover: '#3A3A40', text: '#F4F4F1' },
    },
  },
  // Ratified 2026-08-07: the universal soft ring measured 1.90:1 on Canvas
  // and 1.81:1 on Cloud — below the 3:1 UI floor — so light surfaces switch
  // to the existing Amber active token. Fixed, not exception-listed.
  focusRing: {
    light: '#A86E00',
    dark: 'rgba(225, 144, 0, 0.7)',
    note: 'Amber "attention" ring. Light surfaces: Amber active #A86E00 (4.21:1 on Canvas, 3.89:1 on Cloud). Dark surfaces: alpha-tinted Amber #E19000 (4.00:1 blended on Ink). Every pairing clears the 3:1 UI floor.',
    width: '2px solid',
    offset: '2px',
    // Decision 34 (2026-08-10): the ring is the ONE focus system.
    rule: 'One ring for every focusable — buttons, links, inputs, selects, textareas, and custom controls (.btn-focus / .btn-focus-dark, chosen by rendered surface). The ring is dedicated accessibility chrome — an ephemeral attention-is-here signal outside the colour tiers, never a validation status or decorative accent. Borders never change on focus; validation borders stay visible beneath the ring.',
  },
  washes: {
    // textOn hexes canonized 2026-08-06 (D36): the accent-tinted dark text
    // values for copy sitting ON a light wash previously lived only in page
    // code. On dark washes, text is Cloud #F4F4F1 (no darker variant needed).
    light: [
      { name: 'Cobalt Wash', hex: '#EDF0F8', accent: 'Cobalt', textOn: '#1E3A8A', use: 'Info alert background, selected row' },
      { name: 'Teal Mist', hex: '#E6F5F3', accent: 'Teal', textOn: '#0D5E56', use: 'Success toast, positive trend card' },
      { name: 'Amber Stone', hex: '#F5F0E6', accent: 'Amber', textOn: '#7C4D04', use: 'Warning alert, highlighted callout' },
      { name: 'Rose Blush', hex: '#FDF0F2', accent: 'Rose', textOn: '#9F1239', use: 'Error message, destructive confirmation' },
    ],
    darkTextRule: 'Text on a dark wash is Cloud #F4F4F1; text on a light wash uses that wash\'s textOn value (or Ink) — never the raw accent.',
    dark: [
      { name: 'Cobalt Deep', hex: '#1B2440', accent: 'Cobalt', use: 'Info alert background, selected row (dark)' },
      { name: 'Teal Deep', hex: '#0E2E2A', accent: 'Teal', use: 'Success toast, positive trend card (dark)' },
      { name: 'Amber Deep', hex: '#2E2410', accent: 'Amber', use: 'Warning alert, highlighted callout (dark)' },
      { name: 'Rose Deep', hex: '#2E1218', accent: 'Rose', use: 'Error message, destructive confirmation (dark)' },
    ],
  },
  lifts: [
    { name: 'Cobalt Lift', hex: '#7A9AEF', use: 'Inline links inside dark long-form text blocks' },
    { name: 'Teal Lift', hex: '#3DD3BF', use: 'Coloured body copy on dark surfaces' },
    { name: 'Amber Lift', hex: '#F2AE40', use: 'Coloured body copy on dark surfaces' },
    { name: 'Rose Lift', hex: '#F97587', use: 'Coloured body copy on dark surfaces' },
  ],
  // Accent-coloured TEXT on light surfaces (ratified 2026-08-08, D40): the
  // light-surface sibling of the lifts. Raw accents fail the 4.5:1 text floor
  // on light grounds (the retired teal text tone #008775 measured 4.04–4.45:1);
  // these tones clear it on Canvas, Cloud, white, and the tinted example
  // cards. Raw accents remain correct for fills, dots, borders, and large/UI
  // elements at the 3:1 floor.
  accentText: [
    { name: 'Teal text', hex: '#007D6E', use: 'Success/correct headings, privileged-word chips, positive labels on light surfaces (4.58–5.05:1; APCA Lc 68–74)' },
    { name: 'Rose text', hex: '#BA3249', use: 'Error/incorrect headings and labels on light surfaces (5.24–5.77:1) — names the tone the guide already shipped' },
  ],
} as const

// --- Colour System Doctrine ---
// Canonized 2026-08-09 (guide wave 2 §5): the colour-system doctrine that
// previously lived only in guide §5 prose and page code. Hexes are NOT
// re-declared here — entries reference palette colours by NAME
// (selectedPalette.colors is the hex source). Two things are deliberately
// DERIVED by consumers, never stored: OKLCH lightness and WCAG contrast
// ratios are computed from the hexes (the D41 computed-plots precedent), and
// neutral/accent CSS custom-property names follow the tokens file's
// mechanical convention (--color-<name>). The five dark-role vars are the
// one stored exception (darkRoles.rows.cssVar) — their names are not
// mechanically derivable.
export const colorSystem = {
  neutrals: {
    intro: 'A subtle warm tint layered under the spectrum — closes the gap between cold Tailwind grays and the warm accents. Seven tokens, perceptually-uniform in OKLCH L-space from surface to primary text.',
    ladderNote: 'The seven tokens form an OKLCH-even ladder (ΔL ≈ 0.14 through the body range, with tighter pairs at each end: Canvas↔Cloud and Graphite↔Ink). Slate and Iron exist because the body-text hierarchy needs three working tiers (quiet / body / emphasized) and the old five-token palette had a single ~0.43-wide L gap between Pewter and Graphite with nothing in between.',
    // Ladder order surface → primary text; names key into selectedPalette.
    tokens: [
      { name: 'Canvas', roleLabel: 'Background' },
      { name: 'Cloud', roleLabel: 'Elevated surface' },
      { name: 'Pewter', roleLabel: 'Whisper muted' },
      { name: 'Slate', roleLabel: 'Body secondary' },
      { name: 'Iron', roleLabel: 'Emphasized body' },
      { name: 'Graphite', roleLabel: 'Dark UI surface' },
      { name: 'Ink', roleLabel: 'Primary text / dark bg' },
    ],
  },
  accents: [
    { name: 'Cobalt', roleLabel: 'Hero / primary', meaning: 'Intelligence, trust, focus. One primary action per section.' },
    { name: 'Teal', roleLabel: 'Positive / growth', meaning: 'Success, growth, connected status.' },
    { name: 'Amber', roleLabel: 'Attention', meaning: 'Warnings, pending, confidence.' },
    { name: 'Rose', roleLabel: 'Urgency / action', meaning: 'Errors, destructive actions, critical alerts.' },
  ],
  textHierarchy: [
    { tier: 'Primary', token: 'Ink', use: 'Headings, stat values, body emphasis, logo wordmark' },
    { tier: 'Emphasized body', token: 'Iron', use: 'Table headers, field labels, key body sentences' },
    { tier: 'Body secondary', token: 'Slate', use: 'Descriptions, helper text, card sub-labels, secondary prose' },
    { tier: 'Whisper muted', token: 'Pewter', use: 'Supplementary labels only — governed by the Pewter matrix (accessibility.pewterMatrix)' },
  ],
  tailwindMapping: {
    note: 'The app uses Tailwind utility classes; the Warm Blend tokens are exported into the @theme so the brand names are first-class utilities.',
    rows: [
      { tailwind: 'text-stone-900, text-stone-800', token: 'text-ink', note: 'primary' },
      { tailwind: 'text-stone-700, text-stone-600', token: 'text-iron', note: 'emphasized body' },
      { tailwind: 'text-stone-500', token: 'text-slate', note: 'body secondary' },
      { tailwind: 'text-stone-400, text-stone-300', token: 'text-pewter', note: 'whisper — never for informational text' },
      { tailwind: 'bg-stone-50, bg-stone-100', token: 'bg-cloud', note: 'elevated surface' },
      { tailwind: 'bg-stone-800', token: 'bg-ink', note: 'active dark fill (Tier 2 Structural)' },
      { tailwind: 'border-stone-*', token: 'keep as-is', note: 'Tailwind stones are the sanctioned border family' },
      { tailwind: 'bg-stone-200, bg-stone-300', token: 'keep as-is', note: 'hover / active / press backgrounds, skeleton placeholders' },
    ],
  },
  ratio: {
    light: [
      { pct: 60, token: 'Canvas', what: 'page background' },
      { pct: 20, token: 'Cloud', what: 'elevated surfaces: cards, sidebars, dropdowns' },
      { pct: 10, token: 'Ink + Pewter', what: 'text and UI' },
      { pct: 10, token: 'Spectrum accents', what: 'semantic moments only' },
    ],
    darkRule: 'Same 60/20/10/10 discipline, inverted: 60% Ink · 20% Graphite · 10% Cloud + Mist · 10% spectrum (semantic only). The canvas still dominates; colour still earns its place.',
  },
  tiers: [
    // Tier-1 rule amended by decision 34: "input focus" removed from Cobalt's
    // jobs — focus indication is the dedicated ring (brandTokens.focusRing),
    // accessibility chrome outside the tiers.
    { tier: 1, name: 'Responsive', carrier: 'Cobalt', rule: 'Action-oriented elements — things that trigger an operation. Temporary and reactive: present during hover, press, then settles. Primary buttons, links, CTAs, hovered icons. Focus indication is not a Cobalt job — the dedicated focus ring (brandTokens.focusRing) is accessibility chrome outside the tiers.' },
    { tier: 2, name: 'Structural', carrier: 'Ink', rule: 'Persistent state and navigation. Active nav item, selected tab, toggled-on icon, current breadcrumb. Ink keeps the canvas calm while Cobalt stays reserved for action.' },
    { tier: 3, name: 'Semantic', carrier: 'spectrum + Pewter', rule: 'The system communicating status. Info (Cobalt), success (Teal), warning (Amber), error (Rose). Never decorative — every appearance carries meaning.' },
  ],
  lightDefault: 'Spectrea defaults to light. Canvas is the 60% page ground because the Warm Blend system exists to make the spectrum feel inhabited against a warm-tinted white — not to produce a dark-first interface. Marketing, product, and PDF surfaces all ship light-default. Dark is a parallel mode, not the primary register.',
  darkRoles: {
    intro: 'On dark surfaces the role mapping inverts — existing tokens carry more of the weight, with two additions for hierarchy.',
    // darkModeKey indexes selectedPalette.darkMode (the hex source). Mist and
    // Fog are the two dark-only tokens; their light column names the token
    // (or Tailwind family) whose role they take over. The cssVar names are
    // stored (not derived): they mix light-token metaphors (--dark-canvas is
    // the dark Canvas-role) with the dark-only token names — the tokens file
    // and the guide both render these strings.
    rows: [
      { role: 'Page background', light: 'Canvas', dark: 'Ink', darkModeKey: 'bg', cssVar: '--dark-canvas' },
      { role: 'Elevated surface', light: 'Cloud', dark: 'Graphite', darkModeKey: 'surface', cssVar: '--dark-cloud' },
      { role: 'Primary text', light: 'Ink', dark: 'Cloud', darkModeKey: 'text', cssVar: '--dark-ink' },
      { role: 'Muted text', light: 'Pewter', dark: 'Mist', darkModeKey: 'muted', cssVar: '--dark-mist', isNew: true },
      { role: 'Border / divider', light: 'stone-200', dark: 'Fog', darkModeKey: 'border', cssVar: '--dark-fog', isNew: true },
    ],
    // Contrast figures are deliberately absent here — Pewter-on-Ink and
    // Mist-on-Ink ratios are computed from the hexes wherever this renders.
    whyTwoTokens: 'Pewter passes for body text on Ink, but muted text needs to sit above the body hierarchy on dark — Mist is Pewter brightened so secondary still feels secondary without fighting primary text. Fog gives separation without a visible line — lighter than Ink, darker than Graphite, so cards feel edged rather than drawn.',
  },
  accentsOnDark:
    'Accents carry over unchanged — the brand should read as itself on either surface. Three of four accents pass WCAG AA for normal text on Ink; Cobalt is UI-only at this contrast — for coloured text on Ink use Cobalt Lift.',
} as const

// --- Component doctrine ---
// Canonized 2026-08-09 (guide wave 2 §11, decision 31): the component specs
// that lived only in guide §11 prose and the four component pages. Colour and
// state references key into selectedPalette / brandTokens.buttonStates by
// NAME; radius, spacing, and elevation references name their tokens
// (brandTokens.radii / spacing / elevation) — px values resolve from the
// token, never re-declared here. "stone-*" names are the sanctioned Tailwind
// border family (see colorSystem.tailwindMapping); stone-200 is #E7E5E4 —
// two pages previously taught #E5E7EB, which is Tailwind GRAY-200, a drift
// this canonization corrects.
export const components = {
  buttons: {
    // stateKey indexes brandTokens.buttonStates.light/.dark. White labels on
    // the four accent fills ride the ratified exception
    // semantic-button-labels-white (accessibility.exceptionRegistry).
    types: [
      { name: 'Primary', tier: 'Hierarchy', palette: 'Cobalt', stateKey: 'cobalt', label: 'White', role: 'The hero action. One per section.' },
      { name: 'Secondary', tier: 'Hierarchy', stateKey: 'secondary', role: 'Supporting actions.', treatment: 'Cloud-family fill, Ink-family text (light); Graphite-tint fill, Cloud text (dark).' },
      { name: 'Ghost', tier: 'Hierarchy', role: 'Tertiary actions.', treatment: '2 px stone-300 border, transparent fill; label Slate (light) / stone-300 (dark).' },
      { name: 'Destructive', tier: 'Semantic', palette: 'Rose', stateKey: 'rose', label: 'White', role: 'Irreversible actions.' },
      {
        name: 'Confirm', tier: 'Semantic', palette: 'Teal', stateKey: 'teal', label: 'White', role: 'Verify, approve, connect.',
        detail: 'For actions that affirm, verify, or establish positive connections. The outcome is constructive.',
        examples: ['Verify', 'Approve', 'Connect', 'Mark as Trusted'],
      },
      {
        name: 'Caution', tier: 'Semantic', palette: 'Amber', stateKey: 'amber', label: 'White', role: 'Override, merge, proceed.',
        detail: 'For actions that acknowledge a warning or override a safeguard. Reversible but consequential.',
        examples: ['Override', 'Merge', 'Proceed Anyway', 'Dismiss Warning'],
      },
    ],
    rule: 'One Primary button per section maximum. Confirm and Caution are reserved for specific semantic contexts — never as general-purpose actions.',
    sizes: [
      { name: 'Compact', heightPx: 32, padding: 'px-3 py-1.5', fontSizePx: 12, radiusToken: 'md', use: 'Toolbars, tables, dense UI' },
      { name: 'Default', heightPx: 36, padding: 'px-4 py-2', fontSizePx: 14, radiusToken: 'lg', use: 'Most contexts' },
      { name: 'Large', heightPx: 48, padding: 'px-6 py-3', fontSizePx: 16, radiusToken: 'lg', use: 'Standalone CTAs' },
    ],
    font: 'Lexend Medium 500',
    disabled: 'opacity-40, cursor-not-allowed',
    // Light-mode transient direction; the dark direction and its verified
    // figures are brandTokens.buttonStates.dark.rule — render that verbatim.
    lightHoverRule: 'Hover and active darken along the hand-picked ladder — buttons recede into the surface on press.',
  },
  forms: {
    heights: { defaultPx: 36, compactPx: 32 },
    border: '1 px solid stone-200',
    radiusToken: 'lg',
    padding: 'px-3 py-2',
    font: 'Lexend Regular 400, 14 px',
    placeholder: 'Pewter',
    // Rewritten by decision 34: inputs join the canonical ring; the old Cobalt
    // border-flip died with it (its halo measured 1.29:1, and a validation
    // border blocked the flip entirely — focus was invisible during validation).
    focus: 'Canonical focus ring (brandTokens.focusRing) — 2 px Amber ring at 2 px offset, outside the border. The border itself never changes on focus; validation borders stay visible beneath the ring.',
    error: 'Rose border',
    disabledBg: 'Cloud',
  },
  cards: {
    border: '1 px solid stone-200',
    hoverBorder: 'stone-300',
    radiusToken: 'xl',
    paddingToken: 'lg',
    background: 'Canvas',
    surfaceNote: 'Cards sit on the Cloud surface — the Canvas-vs-Cloud contrast gives them "home."',
    elevated: 'shadow-md — floating elements only; hover may lift to shadow-lg',
    gapToken: 'md',
    titleFont: 'Albert Sans 600 (the heading font)',
  },
  layout: {
    sidebar: { widthPx: 256, note: 'Fixed width; collapsible on mobile' },
    topBar: { height: '40–48 px', note: 'Search + user menu' },
    contentArea: { background: 'Cloud', note: 'Fluid, scrollable' },
    breakpoints: [
      { name: 'Mobile', range: '<640 px', cols: 1, use: 'Stacked cards, full-width forms' },
      { name: 'Tablet', range: '640–1023 px', cols: 2, use: 'Side-by-side cards, split views' },
      { name: 'Desktop', range: '1024–1279 px', cols: 3, use: 'Dashboard grids, item listings' },
      { name: 'Wide', range: '1280 px+', cols: 4, use: 'Dense dashboards, data tables' },
    ],
    gridGapToken: 'md',
    contentWidths: [
      { label: 'Max content width', value: '768 px (max-w-3xl)', use: 'Reading-focused pages: docs, settings, forms' },
      { label: 'Max dashboard width', value: 'Full width', use: 'Dashboards and data views use all available space' },
      { label: 'Max prose width', value: '65ch (max-w-prose)', use: 'Long-form text blocks within any page' },
    ],
    elevationRule: 'Z-index values increment by 10 to leave room for intermediate layers. Never use arbitrary z-index values outside this scale.',
    responsiveRules: [
      { rule: 'Sidebar collapses to overlay on mobile', detail: 'Below 1024 px, the sidebar becomes a slide-over panel triggered by the menu button.' },
      { rule: 'Grids collapse to single column', detail: 'Below 640 px, all multi-column grids stack vertically. Cards go full-width.' },
      { rule: 'Tables scroll horizontally', detail: "Don't hide columns. Wrap the table in a horizontal scroll container with a fade edge." },
      { rule: 'Touch targets: 44 px minimum', detail: 'Buttons, links, and interactive elements must be at least 44x44 px on touch devices.' },
      { rule: 'Modals become full-screen on mobile', detail: 'Below 640 px, modals take the full viewport. No side margins, full-height content.' },
      { rule: 'Heading sizes scale down at breakpoints', detail: 'Body text stays at 16 px minimum. Headings reduce proportionally — see Typography for the full responsive scaling table.' },
    ],
  },
} as const

// --- Accessibility ---
// The floor, pinned (2026-07-03). Most of the content existed in guide prose;
// the version pin, the 2.2-specific criteria, and the Pewter matrix give it
// checkable form.
export const accessibility = {
  floor: 'WCAG 2.2 AA',
  // Measurement doctrine (adopted 2026-08-07, exception round 2/2): the 2.x
  // ratio is what checkers enforce and what the brand publicly claims, but it
  // mis-ranks saturated mid-tone fills — so perception disputes are settled
  // with APCA, and every exception grant records both numbers.
  measurement:
    'Conformance floor: WCAG 2.x relative-luminance ratios (4.5:1 normal text; 3:1 large text and UI) — the metric automated checkers enforce and the level the brand publicly claims. Perceptual adjudicator: APCA-W3 Lc (the WCAG 3 draft model; ≥45 spot text, ≥60 fluent, ≥75 body) — consulted whenever the 2.x formula and trained eyes disagree, because 2.x under-credits light text on saturated mid-tone fills and over-credits dark-on-vivid. Exception grants record both metrics. OKLab/OKLCH lightness deltas may inform design exploration but are not conformance measures.',
  contrast: {
    normalText: '4.5:1',
    largeTextAndUI: '3:1',
    // Palette-derived figures are deliberately absent (decision 30): the
    // on-Canvas token ladder (membership = colorSystem.textHierarchy) and
    // the accents-on-Ink statement (= colorSystem.accentsOnDark, which
    // preserves the D10 correction that Cobalt does not pass AA on Ink)
    // are computed from the hexes wherever they render.
  },
  // Contrast policy (ratified 2026-08-06, decision 8): floors + ratified
  // exceptions. The floors are the defaults everywhere; any deliberate
  // departure must be a named, Darren-ratified entry here. A sub-floor usage
  // not listed in this registry is a defect, not a style.
  exceptionRegistry: {
    rule: 'Each entry names the exception, its measured values under both metrics (see accessibility.measurement), its rationale, and its usage bounds. A sub-floor usage not listed here is a defect, not a style. (The Amber focus-ring candidate was resolved 2026-08-07 as a fix, not an exception — see brandTokens.focusRing.)',
    entries: [
      {
        name: 'semantic-button-labels-white',
        ratified: '2026-08-07',
        exception: 'White #FFFFFF labels on semantic button base fills sit below the WCAG 2.x AA text floor on Rose, Teal, and Amber.',
        measured: {
          wcag2x: 'White on Cobalt 4.51:1 (AA), Rose 3.67:1, Teal 2.56:1, Amber 2.56:1; light-mode hover/active improve to 3.20–7.02:1; dark transient states flip to Ink and pass 5.92–9.72:1.',
          apca: 'White Lc on Cobalt 76.4, Rose 68.4, Teal 54.6, Amber 54.9 (hover/active 64.2–88.9) vs Ink Lc 31.7/39.6/53.0/52.7 — white beats or ties Ink on every fill, and every white pairing clears the APCA spot-text minimum (45) at base state.',
        },
        rationale: 'The WCAG 2.x formula under-credits light text on saturated mid-tone fills and over-credits dark-on-vivid: the nominally compliant Ink-on-Rose swap (4.82:1) would measure APCA Lc 39.6 — perceptually worse than the white it replaced (68.4). White labels are perceptually equal-or-better everywhere and keep one consistent label rule across the semantic set.',
        bounds: 'Semantic action buttons only: short labels, ≥14px Lexend Medium (500), reinforced by action context per the colour-alone rule. Covers light- and dark-surface base states (dark transient states still flip to Ink). Never body text, links, or long-form copy.',
      },
    ],
  },
  wcag22Criteria: [
    'Focus appearance: a visible focus indicator on every interactive element — the Amber focus ring (2 px solid, 2 px offset; Amber active #A86E00 on light surfaces, alpha-tinted Amber on dark) is the standard treatment.',
    'Target size: interactive targets at least 24×24 px, or the equivalent spacing exception.',
    'Dragging alternatives: any drag interaction (graph manipulation included) has a single-pointer, non-dragging alternative.',
  ],
  rules: [
    'Body text minimum 16 px; never lower for primary content.',
    'Never rely on colour alone — pair colour coding with icons, patterns, or labels.',
    'Layout must not break at 200% browser text-zoom.',
  ],
  pewterMatrix: {
    principle: 'Pewter (#97979E, 2.85:1) is a whisper, not a readable tier. Anything that must be read on its own steps up to Slate or Iron.',
    allowed: ['Overlines', 'Timestamps', 'Meta chips', 'Placeholder text', 'Captions whose adjacent context already makes the content obvious'],
    denied: 'Any informational text — body copy, labels carrying meaning, values, errors, anything a reader must be able to read on its own.',
  },
} as const

// --- Logo Constraints (numeric edge cases) ---
// Canonical numerics for rules that previously lived only as prose. The
// lockup FORM COUNT stays at two — ratified 2026-07-03 (BA-10, option b):
// the proposed third form was re-scoped into the gradient family; the
// two-forms rule is intact, not pending.
// Mark geometry + lockup constants ratified 2026-08-06 (decisions 3-5,
// docs/brand-review-2026-08): the spine is fitted to the Albert Sans 600 S
// medial axis with a deliberate shallow storytelling tail (K3′); lockup
// constants are derived from real font metrics, replacing the older
// hard-coded 0.72em / 8-unit / 0.05em set.
export const logo = {
  constraints: {
    dotCount: 10,
    trailingDots: 2, // visually unconnected — the "about to connect" moment
    dotRadius: 3.9607, // native 64-box units; diameter:stroke stays 7:8
    strokeWidth: 9.0531, // native 64-box units
    container: 'Circle when contained — never a squircle.',
    primaryDotColor: '#A3A3A3',
    lockupForms: 2, // Gradient (LogotypeGradient) and Mono (Logotype) — exactly two
    wordmarkTailRule: 'The S-mark-replaces-S treatment (lowercase "pectrea" tail) exists only inside the canonical Logotype / LogotypeGradient components. Everywhere else the wordmark is sentence-case "Spectrea" with the mark as a companion glyph.',
    clearSpace: '0.5× the mark height on all sides.',
    watermarkMaxOpacity: 0.2,
    coBrand: 'Use the ink variants (#3 mark / #4 lockup). Match the partner mark by optical height — scale so perceived heights are equal, not bounding boxes — and align on the marks\' vertical centres.',
    smallSizes: 'No micro-construction (ratified 2026-08-06, decision 11): the standard mark scales down unchanged at every size. Below ~24px the trailing dots read as part of the stroke; that plain-S reading is accepted.',
  },
  // Lockup constants ("B", ratified 2026-08-06, decision 4). Em values are the
  // authority; measured from Albert Sans 600 (capHeight 0.700em, 'l' stem
  // 0.113em, S glyph ink 0.714em). Alignment and gap are measured on stroke
  // ink, never bounding boxes (the leftmost element is a near-invisible dot).
  lockup: {
    wordmarkWeight: 600, // Albert Sans 600 — canonical at every size incl. hero (decision 3)
    trackingEm: 0.02,
    strokeEm: 0.113, // rendered mark stroke = the wordmark's stem weight
    markInkHeightEm: 0.714, // mark ink height = the real S glyph's ink height
    markTextInkGapEm: 0.131, // ink-to-ink: S right side bearing + tracking + p left side bearing
    dotToStrokeRatio: '7:8', // dot diameter : stroke width
  },
  // Mark geometry (K3′, ratified 2026-08-06, decision 5). Authoritative copy:
  // docs/brand-review-2026-08/k3-prime-ratified.json. Three G1-continuous
  // cubics in the native 64-box (frame ML=11 MT=3, scale q=58/714 from the
  // S medial axis); the 10 dots sit at i/9 arc fractions of the full path,
  // first 8 covered by the stroke, trailing 2 visible.
  markGeometry: {
    viewBox: 64,
    continuity: 'G1', // tangent-continuous at both cubic joins
    frame: { ML: 11, MT: 3, q: '58/714' },
    segs: [
      [[44.965, 14.19], [39.3, 3.346], [16.635, 4.294], [16.532, 18.686]],
      [[16.532, 18.686], [16.412, 35.427], [46.367, 26.756], [46.301, 44.482]],
      [[46.301, 44.482], [46.245, 59.74], [26, 58.5], [14.3, 50.3]],
    ],
    dotRule: '10 dots at i/9 arc fractions; stroke length = (7/9)·total − strokeWidth/2 + dotRadius·0.75 + 1.5, so dots 1-8 form the stroke and dots 9-10 stay visible ("about to connect").',
    // VISIBLE ink box in native 64-box units — the stroke's disk envelope over
    // the stroked arc plus all ten dot disks. This is the box the lockup
    // aligns on, never element bounding boxes. Derived jointly with
    // strokeWidth/dotRadius by fixed-point solve so BOTH B constraints hold
    // exactly: stroke renders 0.113em AND visible ink renders 0.714em.
    // (Corrected 2026-08-07 after critic review: the earlier solve measured
    // the full path as if stroked, inflating the box by the unstroked tail.)
    inkExtents: { left: 10.339, right: 50.828, top: 2.338, bottom: 59.54 },
    // Lockup placement on the ink box: mark ink bottom sits at
    // baseline + 0.007em (the S glyph's baseline overshoot); wordmark pen
    // starts at mark-ink-right + 0.0643em (S rsb 0.0443 + tracking 0.02 —
    // the p's own left side bearing 0.067em completes the 0.131em ink gap).
    placement: { inkBottomVsBaselineEm: 0.007, penAdvanceEm: 0.0643 },
  },
  // Signature animation (ratified 2026-08-09, decision 27). The loop is the
  // logo's OWN motion spec — deliberately outside the UI motion tokens
  // (brandTokens.motion): a brand-asset behaviour, not an interface
  // transition. AnimatedLogo and the Motion page read these values;
  // previously the spec lived only in component code (the markGeometry
  // precedent, applied to motion).
  animation: {
    loopSeconds: 3,
    // Normalized boundaries on the loop timeline. Each phase's quadratic
    // ease is part of the spec: the draw eases out, the dissolve eases in —
    // the mark leaves the way it arrived. After dissolveEnd the frame is
    // empty until the loop restarts.
    phases: {
      drawEnd: 0.57, // 0 → drawEnd: stroke draws tip-first, quadratic ease-out
      holdEnd: 0.6, // drawEnd → holdEnd: the completed mark rests
      dissolveEnd: 0.97, // holdEnd → dissolveEnd: stroke releases from the start, quadratic ease-in
    },
    trailingFadeFraction: 0.15, // the dissolving edge fades over this fraction of path length
    easing: 'Quadratic phase ease — the draw eases out, the dissolve eases in. The logo\'s own spec, not one of the UI easing tokens.',
    reducedMotion: 'Under prefers-reduced-motion the loop does not run: the completed mark holds as a static frame.',
    use: 'Loading states, hero moments, splash. Never inline UI — too prominent.',
  },
} as const

// --- Graph Visualization (foundation only) ---
// Colour semantics for graph surfaces, derived from the Tier-3 colour
// framework and the illustration graph vocabulary (node, edge, cluster,
// trail, confidence, highlight). This constrains colour MEANING so interim
// graph work doesn't drift; the full operational rendering spec (sizing,
// layout, density, interaction physics) is routed to a product design cycle.
export const graphViz = {
  semantics: {
    nodeDefault: 'Neutral — structure is quiet (Slate/Pewter strokes, Canvas/Cloud fills on light; inverted on dark). Colour is reserved for meaning.',
    // Split by decision 34: hover stays Cobalt (Tier 1); keyboard focus is the
    // canonical ring, never a second identity.
    nodeHover: 'Cobalt — Tier 1 responsive: present during hover, then settles.',
    nodeFocus: 'Canonical focus ring (brandTokens.focusRing) — the same ring every focusable carries; not a Cobalt state.',
    nodeSelected: 'Ink — Tier 2 structural: persistent selection state (Cloud on dark).',
    edgeDefault: 'Neutral (Pewter). A newly formed connection may animate with the Formation motion primitive — spectrum gradient along the stroke, settling to resting neutral.',
    confidence: 'Amber carries confidence/attention. Confidence values render in JetBrains Mono and are never conveyed by colour alone.',
    status: 'Tier 3 semantic: success/connected = Teal · warning/pending = Amber · error/conflict = Rose · info = Cobalt.',
    stale: 'Pewter whisper plus a non-colour cue (icon or label) — never colour alone.',
  },
  note: 'Foundation only. The operational graph-rendering spec is a product design deliverable, not a brand-guide deliverable.',
} as const

// --- Illustration (decision 36, v2.12.0) ---
// Replaces the v4 system (one universal prompt + an 8-item pass/fail
// checklist). Settled empirically in the 2026-08-11 art session: 30+ single-
// render lanes, each a fresh session so no render saw another. Two findings
// drove the shape. Prompt LENGTH is load-bearing — the ~2,900-character v4/v6
// block measurably lost generator attention, and compacting it was the single
// change that moved every metric. And the checklist cannot gate: a crude flat
// image scores perfectly while being incoherent, so numbers report and an eye
// decides.
export const illustration = {
  doctrine:
    'One invariant DNA block plus one register sentence per job. The DNA is the identity and never varies; the register is the context dial, chosen per job and never enforced across jobs. Measurements report, they never gate — a scorer rewards crude flat images, so a person looks at every render before it is claimed or shipped.',

  // The invariant block. [SUBJECT], [REGISTER], [TEXT] and [ASPECT] are filled
  // per job; nothing else varies. ~750 characters with a register line.
  dnaPrompt: `Generate this image directly.

[SUBJECT]
[REGISTER]

Flat editorial illustration in the style of Linear.app and Stripe brand art, slightly warmed.
Filled shapes only. No outlines, no strokes, no line art.

Colours: cobalt blue #4271DF, teal #00B6A0, amber #E19000, rose #F24260, warm off-white background #FAF8F2. One colour dominates; the others support as pale tints. Never all four at full strength.

Warmth comes from palette and light, not from crowding. No grey filler shapes.
Mix soft rounded forms with clean geometric ones.
If people appear, their faces are blank or one dot per eye.

[TEXT]
No isometric view, no 3D, no photorealism, no houseplants.

[ASPECT].`,

  promptSlots: {
    SUBJECT: 'One sentence naming the scene. A subject that must contain no people says so — figures are not part of the DNA.',
    REGISTER: 'One sentence from registers below, or one derived per registerDerivation.',
    TEXT: 'Marketing and editorial subjects: "No text." Product subjects: "Render the interface accurately, with the text it genuinely needs. Never lorem, never gibberish."',
    ASPECT: 'The aspect ratio, e.g. "16:9", "1:1", "1200x630".',
  },

  promptNote:
    'Length is load-bearing. The ~2,900-character predecessor lost generator attention; compacting to ~750 characters was the single change that moved every measured metric. Adding rules to this block costs attention on the rules already in it — a new constraint belongs in a register sentence, not here.',

  registers: [
    {
      id: 'hero',
      job: 'Draws attention; rewards a look',
      sentence: 'A detailed, balanced scene with warm light — rich enough to reward a second look, composed enough to breathe.',
    },
    {
      id: 'spot',
      job: 'Sits beside content; must not compete with it',
      sentence: 'Simple and direct: a few large deliberate shapes and one large calm empty area.',
    },
    {
      id: 'docs',
      job: 'Explains; carries order and motion',
      sentence: 'A clear single idea in motion — order emerging, mid density, nothing decorative.',
    },
    {
      id: 'product',
      job: 'Shows the actual software',
      sentence: 'Render the product accurately; named source documents sit beside the answer.',
    },
    {
      id: 'social',
      job: 'Reads at thumbnail size',
      sentence: 'Bold and immediate at small size; two equal subjects may share the lead colour.',
    },
  ],

  registerDerivation:
    'These five are named presets, not a closed list. A register is one sentence positioning a job on five axes: density, composition, light, text, and subjects. A context with no register gets a sentence composed on those axes; if the context recurs, name the sentence, make its best render the exemplar, and add it here. The DNA never moves — only the sentence does.',

  // Every bound is anchored to a render that demonstrates it. "Default" is what
  // an unregistered job gets and the centre the system returns to.
  ranges: [
    {
      axis: 'Temperature',
      range: 'Cool-leaning (Cobalt-led and spare on the warm ground) to golden-hour (warm light over a dense warm scene). The ground is ALWAYS warm off-white — temperature varies in the shapes and the light, never the ground.',
      default: 'Gentle warmth: warm light present, not golden.',
      outOfRange: 'A cool white or grey ground; blue-grey washes; heat with no cool counterweight.',
      judgedBy: 'eye',
      note: 'No ratio scores this axis: warm-share-of-colour is blind to quantity and ranked a spare image above a dense golden one. Perceived warmth is warm coverage combined with light and density.',
    },
    {
      axis: 'Density',
      range: 'Largest open area from ~12% (richest) to ~76% (sparest).',
      default: 'Set by register — a hero carries detail, a spot carries few large shapes. An unregistered job sits mid.',
      outOfRange: 'Below ~12%: nothing breathes. The retired anchor sat at 5%.',
      judgedBy: 'eye',
      note: 'Density is FELT in shape count and detail, and open-ground percentage tracks it only loosely. In the shipped exemplars the hero measures MORE open ground than the spot (34.7% against 25.1%) while looking plainly denser — a detailed desk with a lamp, books and a poster against a few large shapes and a quiet half-frame. Two samples are not a range; they are enough to show the number cannot define the register. Read it as a drift signal.',
    },
    {
      axis: 'Abstraction',
      range: 'Accurate product scenes to pure geometric abstraction.',
      default: 'Simplified representational — a real scene built from flat shapes.',
      outOfRange: 'Photorealism at one end; literal banned metaphors (networks, nodes, prisms) and decoration with no job at the other.',
      judgedBy: 'eye',
    },
    {
      axis: 'Depth',
      range: 'Vector has no range: strictly flat. Raster runs from pure flat through layered flat (overlap occlusion) to believable perspective where the subject itself needs it.',
      default: 'Layered flat, at most one darker tonal step.',
      outOfRange: 'Isometric projection as a style; slab-edge stacks; gloss; rendered 3D.',
      judgedBy: 'eye',
    },
    {
      axis: 'Saturation',
      range: 'One primary at full strength leads; a second may reach full strength in small accents; three only where shapes themselves are the subject.',
      default: 'Exactly one primary at full strength.',
      outOfRange: 'Four primaries at full strength — the retired anchor.',
      judgedBy: 'report',
    },
    {
      axis: 'Figures',
      range: 'None, one, or two equals (social register only).',
      default: 'Zero or one. Faces are always blank or one dot per eye.',
      outOfRange: 'Crowds, detailed facial features, mascots.',
      judgedBy: 'eye',
    },
  ],

  media: {
    raster:
      'Owns warmth, light and human presence. It cannot hit an exact brand hex — across every raster measured, the closest Cobalt landed at colour distance 33 — so its palette rule is a stated tolerance, never an exactness claim. Depth is permitted while it stays illustration.',
    vector:
      'Owns exact palette, strict flatness and product accuracy: the author types the hex. Tints are lighter SOLID hexes, never fill-opacity — a translucent fill over a coloured ground composites to a colour in no palette (Amber at 60% over Teal reads olive, and a hue-family checker passes it).',
    choosing:
      'Warmth, mood, human presence, marketing scenes → raster. Exact brand colour, schematic product, in-guide primitives, anything that must be edited later → vector.',
  },

  reference: {
    doctrine:
      'A reference image is a CONTENT channel, not a style channel: its pull scales with how compatible its content is with the prompt. The prompt sets the level; the reference narrows variance toward itself.',
    modes: [
      {
        id: 'none',
        when: 'A new composition — the default',
        effect: 'The register sentence alone sets the level, and nothing bleeds in.',
      },
      {
        id: 'cross-subject',
        when: 'A batch that must feel like one campaign',
        effect: 'Style steadies and variance narrows; expect motifs from the reference to echo, which inside one campaign reads as cohesion.',
      },
      {
        id: 'same-subject',
        when: 'A variant of an image that already exists',
        effect: 'The render collapses onto the reference — three of three draws reproduced it object-for-object. Cloning is the feature here and a defect everywhere else.',
      },
    ],
  },

  checklist: {
    stance: 'Report, never gate.',
    reports: [
      'largest open ground area',
      'neutral grey filler share',
      'primaries at full saturation',
      'hero lead ratio',
      'top colours by area, named',
    ],
    why: 'A crude flat image scores perfectly while being incoherent, and a render that broke the warm-ground rule scored best of its round. Numbers describe an image so drift is visible over time; they never decide whether it ships. Every render is opened and looked at before any claim is made about it.',
  },

  antiPatterns: [
    { never: 'Mascots or character cartoons', because: 'Spectrea is a mentor, not a pet.' },
    { never: 'Stock photography', because: 'Warmth comes from the palette and the light in generated scenes, not from stock imagery.' },
    { never: 'Outlines or line art', because: 'Every shape is filled. A stroke that survives a trace is a defect, not a style.' },
    { never: 'Off-palette gradients and neon', because: 'The palette is the identity; a colour outside it is a different brand.' },
    { never: 'Bauhaus limb-figures', because: 'The retired SpectreaFigure illustrated the opposite of the product\'s composability promise.' },
  ],
} as const

// --- Trust & Disclosure Copy ---
// Brand-voiced masters for trust surfaces, derived from the ratified vision
// (sovereign data, per-viewer access, provenance, managed-path no-train
// target). REVIEW WITH COUNSEL before any external legal or contractual use.
// INTERNAL-TIER since 2026-08-13 (internalCanon): the masters no longer render
// on any public surface — they reach consumers via the internal hand-off and
// go to product surfaces only after the counsel read. The privacy and aiUse
// masters are deliberately unchanged pending that read (audit C4/C5).
export const trustCopy = {
  counselNote: 'These are brand-voice masters, not legal instruments. Review with counsel before external legal use. Trigger (ratified 2026-08-07): before any launch that puts trust, security, or compliance claims on a public page, counsel reads these masters first — the same engagement covers formal trademark clearance of the name.',
  privacy: 'Your knowledge belongs to you. Spectrea is private by default: what you add is visible only to you and the people you explicitly share it with, and the system enforces that per viewer on every surface — including the assistant, which sees only what you can see.',
  aiUse: 'Spectrea uses AI to suggest, surface, and draft — and to run only the automations you set guardrails for: you decide what runs on its own and what checks with you first. Every AI action is recorded, attributed to its sources, and reviewable. On the managed path, your data is not used to train foundation models — a contract we are formalizing, with independent ISO 42001-class attestation as a stated target.',
  retention: 'You stay in control of what Spectrea keeps. Your workspace persists until you delete it; deletion removes your data from live systems on a stated schedule, published before launch. And you can always leave with everything: full-fidelity export — structure, data, and provenance — is a first-class guarantee.',
  enterpriseReadiness: 'Trust in Spectrea is architectural first: per-viewer access control, provenance, and privacy are properties of the substrate, not compliance features added afterwards. Data is sovereign — full-fidelity export is guaranteed, and the deployment perimeter is designed to widen by tier from managed cloud to single-tenant/VPC to air-gapped. Tiers beyond managed cloud, formal attestations (SOC 2, ISO 27001, ISO 42001-class AI governance) and uptime/incident commitments are staged targets, stated as such: the architecture is the foundation; the program is what makes it independently verifiable.',
} as const

// --- Internal render tier ---
// Ratified 2026-08-13 (public-exposure audit corrective plan): the public
// guide is primarily an identity system, and it still carries capability
// language anchored to the ratified vision — the tier is a list of NAMED
// fields, never a subject-matter rule. Fields registered here stay
// in canon (single source of truth; consumers receive them via the generated,
// git-ignored internal/ artefacts handed off locally to the private repos)
// but are excluded from every public render: the site, brand-guide.md, the
// PDF, brand-contract.json, llms.txt, few-shots, checklist, and agent rules.
// This is the ratified carve-out to meta.renderDoctrine. NOTE: the field
// values remain readable in this file's public source — the tier removes the
// rendered/crawler surfaces and the first-party-representation reading, not
// the text itself.
export const internalCanon = {
  rule: 'Fields listed here render only to internal/ artefacts. Adding a field is a ledger decision; generators must consult this registry, and a public artefact carrying an internal field is a build defect.',
  // Written FOR the agent in a consumer repo, which sees generated artefacts
  // and never this file. Absence is the whole mechanism, and an unexplained
  // absence invites exactly the wrong repair: filling the hole from an older
  // vendored snapshot or from memory. Rendered verbatim into llms.txt, the
  // agent drop-in block, and the pre-flight checklist so it travels with the
  // files it governs (2026-08-18).
  consumerRule:
    'The internal-tier fields named with this rule are absent from every public artefact by design, not by omission. If you are working from a vendored snapshot, do not reconstruct them from an older snapshot, a cached copy, or memory, and never author replacements freehand — trust, security, and compliance wording is counsel-gated. When a surface genuinely needs one, request the internal brand hand-off (the internal/ artefacts, delivered locally) instead of inventing it.',
  fields: [
    'trustCopy',
    'brand.positioning.fullShapeClaim',
    'brand.differentiatorGuardrail',
    'brand.antiBrands',
    'brand.audienceMechanics',
  ],
} as const

// --- Ratification Ledger ---
// Single ledger for brand decisions (ratified 2026-07-19). Local per-repo
// ratifications are absorbed here on sight; a decision recorded only in a
// consumer repo's AGENTS.md is not canon until it lands in this ledger.
export const ratificationLedger = [
  { date: '2026-07-03', decision: 'D1 lockup third form re-scoped to gradient family; D2 outcome-first on-ramp, no whole-product term; D3 origin: codified silence; D4 neverUse additions + bio + trustCopy masters.' },
  { date: '2026-07-08', decision: 'Claims posture (web, reaffirmed 2026-07-16; absorbed into canon 2026-07-19; controls named 2026-08-13; status wording moved to the internal record 2026-08-13): capability copy speaks the full product vision in present tense, anchored to the ratified vision and gated by two standing controls — the roadmap check at meta.sourceOfTruth before any buyer-facing capability claim, and the counsel trigger at trustCopy.counselNote before trust, security, or compliance claims reach a public page. Within those gates: no "soon" hedging, and no scoping the brand\'s language down to a subset of the vision. Compliance stays a program, not a badge: attestations and uptime/incident commitments are stated as targets, never as achievements.' },
  { date: '2026-07-09', decision: 'Balance doctrine (web vocabulary nuance; generalized 2026-07-19): avoid/never lists guard against buzzword-led copy, not word existence — an industry term may label a segment-matched surface when plain language carries the meaning in place.' },
  { date: '2026-07-16', decision: 'AI naming registers (web; absorbed 2026-07-19): "your AI" on homepage narrative; "the assistant" on product/trust surfaces; automation copy uses the guardrails frame ("what runs on its own, and what checks with you first").' },
  { date: '2026-07-18', decision: 'Vision-anchored branding: brand claims anchor to the ratified vision canon; brand-vs-vision divergences are adjudicated, never auto-conformed to branding. Provenance note added to meta.sourceOfTruth.' },
  { date: '2026-07-19', decision: 'Hero frame "the operating system for collective intelligence" ratified as a coined whole-product frame (D2 amended; pair with plain language). Full-shape claim adopted from vision §1 as internal north-star (the claim text itself is internal-tier since 2026-08-13; it lived quoted here until then). Autonomy absolutes replaced by the guardrails frame (aiNaming.verbRule, trustCopy.aiUse). Trust surfaces align UP to present-tense masters (no "building toward launch" hedging). Buttons stay canonical 8px radius (pill was a web spec error, not a decision).' },
  { date: '2026-07-19', decision: 'Post-wave adjudications: (1) Named-vendor exception — vision-present-tense governs capability copy EXCEPT named third-party integrations, which are stated as current only when live; roadmap framing is allowed for named vendors. (2) Origin silence holds on trust surfaces — the legal-entity/jurisdiction carve-out stays limited to legal instruments (terms, privacy notices); the entity/PDPA line moves off /security. (3) Generator emits fullShapeClaim and ratificationLedger into the machine contract and a governance pointer into the agent-rules drop-in.' },
  { date: '2026-08-06', decision: 'Brand review ratifications (record: docs/brand-review-2026-08): wordmark Albert Sans 600 canonical at every size incl. hero; lockup constants re-derived from font metrics (stroke 0.113em = stem, mark ink 0.714em = S glyph, ink gap 0.131em, dots 7:8); mark geometry K3′ adopted (S-fit spine, deliberate shallow storytelling tail); visual metaphors explicitly co-primary (Prism = identity/reveal, Living Network = product/growth); render-everything propagation doctrine (meta.renderDoctrine); contrast policy = AA/3:1 floors + ratified exception registry; no small-size micro-construction — the mark scales down unchanged.' },
  { date: '2026-08-07', decision: '"Compounding intelligence" stance: DEFEND — the phrase stays, as one of five differentiator beats (persistent memory, provenance, collective intelligence, composability, the closed loop); the mechanism-tie guardrail carries the claim, not the slogan. Trust-copy counsel trigger added (see trustCopy.counselNote). Name hygiene: knockout search clean; etymology restated as a sourced coinage from "spectrum". (Clearance detail moved to the internal record, 2026-08-13.)' },
  { date: '2026-08-07', decision: 'Focus-ring contrast resolved as a FIX, not an exception (exception round 1/2): light-mode ring switches to Amber active #A86E00 (4.21:1 on Canvas, 3.89:1 on Cloud); dark mode keeps rgba(225,144,0,0.7) (4.00:1 blended on Ink). The previous universal soft ring measured 1.90:1/1.81:1 on light surfaces — below the ratified 3:1 UI floor. The exception registry stays empty.' },
  { date: '2026-08-07', decision: 'Sub-AA button labels resolved as the registry\'s first GRANTED exception (exception round 2/2): white #FFFFFF labels stay on all four semantic base fills. Darren challenged the WCAG 2.x ranking on perceptual grounds; APCA-W3 re-measurement confirmed white beats or ties Ink on every fill (Lc 76.4/68.4/54.6/54.9 vs Ink 31.7/39.6/53.0/52.7) — the nominally compliant Ink-on-Rose swap would have been perceptually worse. Measurement doctrine added (accessibility.measurement): WCAG 2.x AA stays the conformance floor; APCA-W3 Lc is the recorded perceptual adjudicator; exception grants log both metrics.' },
  { date: '2026-08-07', decision: 'One canonical hero-open ratified (D28 part 1): voice.heroOpen — "open on the outcome, written as a reveal", kept simple and adaptable per Darren\'s direction. Fuses the ratified outcome-first structure with the character\'s reveal register; the former five competing prescriptions become steps of one gesture (reveal = register of the open, proof = the grounding, entry-job outcome = the on-ramp specialisation, problem = optional setup that must land on the outcome in the same breath). Supersedes voice.outcomeFirst (renamed).' },
  { date: '2026-08-08', decision: 'Marketing exemplar rewritten under the heroOpen rule (D27): the canonical Marketing/Landing Page example — the few-shot AI tools imitate — now opens on the outcome written as a reveal ("See everything your organization knows in one connected view. Spectrea builds a living graph from your documents — the more you use it, the sharper it gets."), replacing the problem-first open ("Stop losing knowledge to silos…"). Its why-note stops teaching problem-first; the compounding claim keeps its mechanism tie; density at the two-privileged-words cap.' },
  { date: '2026-08-08', decision: 'One register taxonomy (D28 part 2): toneSpectrum retired — it duplicated four toneExamples entries verbatim under colliding labels; its tone labels moved into toneExamples (two authored to complete the set: Feature Announcement = Concrete + Confident, Beginner Documentation = Plain + Welcoming). voice.registerRule declares the two remaining structures\' jobs: toneExamples = register taxonomy (how a content class sounds), surfacePatterns = surface spec (what a product surface says; inherits its register from the nearest content class).' },
  { date: '2026-08-08', decision: 'Hybrid guide generation, wave 1 (decision 2 programme item): brand-guide.md gains generator-owned marker blocks — version stamps, tone-register table, logo construction + clear space, accent states, washes (light/dark), lifts, type system/minimum sizes/type scale/responsive (scale data moved INTO brand.typography), accessibility block, motion durations/easings, radii/spacing/elevation — rewritten from canon by scripts/generate-guide.mjs (npm run generate:guide, wired into generate:all before the PDF). Prose outside markers stays hand-written. Deferred to wave 2 (recorded): §5 neutral/accent/Tailwind/dark-role tables (need a canon colour-model expansion: OKLCH ladder, CSS vars, meanings), §6 gradient family, §11 component specs, §14 CSS-token block.' },
  { date: '2026-08-08', decision: 'Render-everything SPA build (decision 7 programme item): every previously agent-only canon export now has a human-visible surface. New Trust & Disclosures page (/communications/trust) renders trustCopy verbatim with the counsel note. Voice & Tone gains Surface Patterns (all 7) and Executive Voice. Naming gains Company & Product and the Origin stance. Positioning gains the Full-Shape Claim, the compounding usageGuardrail (also on Copy & Taglines), and the differentiatorGuardrail. Copy & Taglines renders voice.heroOpen verbatim. Primary Palette gains Contrast Policy & Measurement (accessibility.measurement + exception registry rendered from data); the two hand-written "never white on Teal/Amber" don\'ts now carry the ratified button-label carve-out. Governance renders meta.sourceOfTruth, renderDoctrine, version, and the full ratification ledger. (Historical, annotated 2026-08-18: the Trust & Disclosures page and the full-shape/differentiator/anti-brand renderings named here were removed by the 2026-08-13 internal-tier decision. This entry records what was ratified then; it is not an instruction to rebuild those surfaces.)' },
  { date: '2026-08-08', decision: 'D40/D35 accessibility cluster, wave 1: (1) Tooltip gains a full keyboard path — focusable button affordance at the 24px target size, opens on focus, Escape dismisses, aria-describedby announcement. (2) Palette-tool sliders carry accessible names. (3) Text floors enforced app-wide (~90 sites bumped to the 12px caption floor; the 10px canon carve-outs — uppercase overlines, numeric badges, metadata chips — and specimen mini-previews untouched; four legal 11px uppercase overlines also normalized to 12px for consistency with the app-wide overline idiom). (4) Pewter stepped to Slate wherever it carried meaning (~50 sites), including the Ghost button light-mode label (was Pewter 2.85:1, an interactive label) and the Iconography page, which taught Pewter as the secondary icon tier against pewterMatrix — the taught tier is now Slate, with Pewter reserved for disabled/decorative glyphs. (5) brandTokens.accentText ratified (Darren, Option A): accent-coloured text on light surfaces uses Teal text #007D6E (new; visually near-identical to the retired #008775, which measured 4.04–4.45:1 as text) and Rose text #BA3249 (existing tone, now named); ~30 text sites swept. Button state fills (hover/active) are unchanged — they are fills, not text. Remaining D40 item, deliberately open: the dark-mode Ink-on-lightened-Cobalt hover label (APCA Lc 40.5 despite WCAG 4.5:1+) awaits its own adjudication.' },
  { date: '2026-08-08', decision: 'Dark Cobalt hover re-lightened (D40 closing item, Darren-ratified Option A): the dark transient ladder for Cobalt was the only state below the APCA spot-text line (old hover #5C87E5: WCAG 5.10:1 but APCA Lc 40.5 vs the 45 minimum; every other accent ≥46.7) — the same 2.x formula artefact as the button-label grant, opposite direction (2.x over-credits dark-on-vivid-blue). New ladder lightens one further notch along the existing lift-toward-the-light direction: hover #6E93EC (5.94:1, Lc 46.3 — parity with Rose), active #8FACF0 (7.86:1, Lc 58.1). Base state and all other accents unchanged; the one-rule dark idiom (Ink label on lightened fill) holds; every dark transient state now clears both metrics. Registry entry measured range updated 5.10–9.72 → 5.92–9.72 (consequence of the canon change, not a re-grant). White-label-on-hover alternative rejected (APCA 67.5 but WCAG 3.47 — would need an exception and break the idiom). This closes D40.' },
  { date: '2026-08-09', decision: 'Logo signature animation canonized (D41 closing item, Darren-ratified): logo.animation carries the loop spec — 3 s loop; phase boundaries draw→0.57 (quadratic ease-out), hold→0.60, dissolve→0.97 (quadratic ease-in); 15% trailing fade; reduced-motion = hold the completed frame. Deliberately the logo\'s own spec OUTSIDE the UI motion tokens; AnimatedLogo and the Motion page read it (previously the spec lived only in component code — the markGeometry precedent applied to motion). Same wave, Motion page conformance (D41): the page renders all seven duration tiers and the three easings + never-rule from brandTokens.motion; easing plots computed from the canonical control points; demos animate on canonical curves only; prefers-reduced-motion implemented app-wide (CSS blanket block + rAF-loop media-query check); the focus-ring demo shows the canonical Amber ring.' },
  { date: '2026-08-09', decision: 'Governance sweep (D20/D22/D25/D29, Darren-ratified; v2.6.0 — a new token family plus process doctrine): (1) Gradient family canonized as brandTokens.gradients in the audit-recommended shape (AIF-25): primary incl. the OKLCH recipe, the three duets with the Balanced Duet #6FB884@65% bridge, full-spectrum-with-Rose, the adjacency rule, and the use/never lists — previously the bridge had no canonical source (component lerps, page markup, asset generator, guide prose only). The Gradients page, SpectreaLogo duet ramps, asset generator, and guide §6 now all render canon; the page\'s mislabeled 5-stop "lockup gradient" swatch is corrected to the canonical 2-stop Cool Duet. (2) package.json version generator-synced to meta.version (was 0.1.0 since scaffold). (3) One canonical change process (meta.changeProcess): Propose → Review → Test → Ratify & version → Regenerate & communicate — the guide §13 and the Governance page previously taught divergent four- and five-step lists; both now render this field, cross-referenced. (4) OS-frame worked example (positioning.onRamp.osFrameExample): the sanctioned coined frame gains a right/wrong pair honoring "paired with plain language" / "must not carry the claim alone" — previously the frame appeared only as rule statements, never applied copy. Also mechanical (D20a): the 8 section-parent routes llms.txt links now redirect to each section\'s first page instead of Not-found.' },
  { date: '2026-08-09', decision: 'Colour-model canonization, guide wave 2 §5+§14 (Darren-ratified full scope; v2.7.0): new colorSystem export carries the colour doctrine that lived only in guide §5 prose and page code — the Warm Blend neutral ladder (role labels + ladder rationale; entries key into selectedPalette by NAME, no hex re-declaration), the four accent meanings, the text-hierarchy tiers, the Tailwind→Warm-Blend mapping, the 60/20/10/10 ratio (light rows + dark rule), the Responsive/Structural/Semantic tier framework, the light-default rule, the named dark roles — Mist and Fog existed as shipped hexes (selectedPalette.darkMode) and tokens-file vars but their NAMES and the why-two-tokens rationale had no canonical source — and the accents-on-dark rule. Two value classes are deliberately DERIVED by consumers, never stored: OKLCH lightness and WCAG contrast ratios are computed from the palette hexes (the D41 computed-plots precedent — numbers can never disagree with the hexes), and CSS custom-property names follow the tokens file\'s mechanical convention. Guide §5\'s hand tables became generated blocks and §14\'s abridged hand CSS block now inlines the real generated spectrea-tokens.css (one artifact shown, shipped, and downloaded); the colour pages render colorSystem instead of private copies. Critic-gate deltas folded in the same wave: the computed OKLCH ladder corrected two hand-rounded values (Slate 0.537→0.536, Iron 0.395→0.396); the stored contrast summaries accessibility.contrast.tokens/accentsOnInk were DELETED (their figures now compute at every render site — guide, agent rules, Primary Palette; the on-Ink statement is colorSystem.accentsOnDark, preserving the D10 Cobalt correction); and darkRoles.whyTwoTokens dropped its stored approximate ratios after the critic showed them wrong (stored ~6.3:1/~8.5:1 vs computed 6.10:1/8.20:1 — the doctrine\'s own proof). Guide wave 2 is now closed except §11 component specs (its own wave).' },
  { date: '2026-08-09', decision: 'Component doctrine canonized, guide wave 2 §11 (Darren-ratified full scope; v2.8.0): new components export carries the specs that lived only in guide §11 prose and the four component pages — the six-type button taxonomy (Primary/Secondary/Ghost/Destructive/Confirm/Caution with roles, tiers, semantic details + example labels, and stateKey references into brandTokens.buttonStates), the button rule, three sizes, font/disabled treatment, and the light-hover direction (the dark direction stays buttonStates.dark.rule); the form-field spec; the card spec; and the layout system (sidebar 256 px, top bar, content area, four breakpoints with column counts, content widths, the z-index convention, and six responsive rules incl. the 44 px touch-target floor). References name their tokens — radius/spacing/elevation px resolve from brandTokens, palette colours by name, state hexes from buttonStates — never re-declared. Guide §11 became generated blocks; the four component pages render components (their private copies deleted — Buttons.tsx duplicated the full buttonStates ladders, LayoutPage duplicated spacing/radii/elevation verbatim-with-drift). Drift corrected by canonization: two pages taught the border family as #E5E7EB, which is Tailwind gray-200 — the sanctioned family is stone-200 #E7E5E4. Guide wave 2 is now fully closed.' },
  { date: '2026-08-10', decision: 'Voice humanist correction (Darren-ratified option B of three; v2.9.0): the voice formula read as a composition rule — "showing its work" was being applied per-sentence, welding a mechanism clause onto every claim — producing the justification-chain bloat Darren flagged as un-humanist. Rewritten: "Plain words, real specifics, room to breathe. Tech earns its place by being checkable — shown once, where the reader looks for it." — the anti-black-box stance stays (checkable ≥ shown), the composition pressure goes. New voice.attentionRule canonizes the discipline: "earn the jargon" is an ADMISSION rule, not a composition rule; one claim, one proof per surface; the mechanism lives one step from the claim; the claim—dash—mechanism shape is a tool, not a rhythm. Three canonical examples retuned to comply (Feature Announcement proved compounding three sentences in a row — now once; Beginner Documentation dropped a tail restating its own sentence; Settings unstacked a nested clause chain). The hero exemplar (D27) already passes once-per-surface — a hero carries exactly one claim + one mechanism — and is unchanged. The archetype through-line note re-anchors the reveal→ground→equip triad to the heroOpen gesture; the formula states the texture. techApproach "Earn the jargon" unchanged as the admission rule\'s name.' },
  { date: '2026-08-10', decision: 'One focus system (Darren-ratified conditionally on independent adjudication; v2.10.0): the system carried two focus identities — the ratified Amber ring on buttons (decision 16) and a Cobalt border-flip + soft halo on inputs — so a keyboard journey crossed two indicators, and the input idiom was independently shown broken: the Cobalt halo measures 1.29:1 (invisible) and a Teal/Rose validation border blocks the border-flip entirely, leaving focus invisible exactly when validation is active. A framing-blind Codex adjudication (candidates A Amber-everywhere / B Cobalt-everywhere / C canonized split / D neutral Ink ring / F double ring, all contrast-computed from canon) selected A — least semantic and governance churn; the Amber-warning adjacency is real but managed (a ring is transient and offset-outside, never an on-field border); Cobalt would self-camouflage on the Primary (1.00:1 ring-vs-fill) and overload the selected/checked channel; a neutral Ink ring reuses Ink\'s structural channel and is unnecessarily severe. Ratified: brandTokens.focusRing gains the scope rule (one ring for every focusable; dedicated accessibility chrome outside the colour tiers; borders never change on focus). components.forms.focus rewritten to reference the ring. The tier-1 Responsive rule drops "input focus" from Cobalt\'s jobs — resolving the canon\'s own contradiction (tiers said Cobalt, the token said Amber). Industry note recorded: unifying matches universal practice; the dedicated-focus-colour school (GOV.UK, USWDS) is the accessibility-first camp this lands in. Record: internal run record (framing-blind brief + verbatim adjudication).' },
  { date: '2026-08-11', decision: 'Consumer conformance checking + retired-values register (Darren-ratified; v2.11.0): public/brand-conformance.mjs is a zero-dependency checker generated from brand.ts (scripts/generate-conformance.mjs) that consumer repos vendor beside the snapshot and run in CI — fifteen rules plus a compounding-proximity rule at v2.11.0 (ten before the register landed), severity split so only retired forms error while generic category words stay review (an undifferentiated checker produced 82 findings in the product repo, 80 noise). Canon growth fails the generator build rather than silently escaping the checker; suppression requires a stated reason and every honoured suppression is printed (visibility, not prevention — the comment scanner is best-effort in every file type and says so). Origin: the 2026-08-11 drift scan was hand-written and never looked at copy, so the category noun retired 2026-07-03 sat live in spectrea metadata five weeks. New retired export: canon\'s one history-keeping structure, scope absolute→error / contextual→review with stillValidAs, seeded with five real retirements — a sixth candidate (Pewter as meaning-carrying text) was evaluated and excluded because its hex is a live palette colour and produced 57 legitimate-use findings in one consumer; a register entry must be rarer than its noise. Naive flat lists are wrong regardless — the rgba ring is retired ONLY as the light ring and still canonical in dark. Gate: critic-conformance accepted at round 7 after 25 findings; trail in the internal run record.' },
  { date: '2026-08-11', decision: 'Illustration doctrine v7 (Darren-ratified; v2.12.0): new illustration export replaces the v4 system (one universal prompt + an 8-item pass/fail checklist) with an invariant DNA block plus one register sentence per job — hero/spot/docs/product/social named as presets, not a closed list, with a stated derivation rule (one sentence positioning a job on density, composition, light, text, subjects) so unseen contexts are covered without touching the DNA. Settled empirically in the 2026-08-11 art session: 30+ single-render lanes, each a fresh session so no render saw another, with pre-registered comparison scripts. Four findings drove the shape. (1) Prompt LENGTH is a lever and wording is not: STYLE-line rewording moved nothing at n=5+5 (all ranges overlapped), while compacting ~2,900 characters to ~750 moved every metric — so adding a rule to the DNA now costs attention on the rules already there, and new constraints go in register sentences. (2) A reference image is a CONTENT channel, not a style channel: with a same-subject reference three of three draws reproduced it object-for-object, so the default mode is NO reference and cloning is scoped to deliberate variants. (3) The checklist cannot gate — a crude flat image scores perfectly while incoherent, and the docs candidate that scored best-of-round broke the warm-ground rule — so measurements report and a person looks at every render. (4) Media split by capability: no raster ever landed closer than colour distance 33 from Cobalt while a vector hits it exactly, so exact palette is a vector rule and raster carries a stated tolerance; vector tints must be solid hexes because a translucent fill over colour composites off-palette (Amber 60% over Teal reads olive) and a hue-family checker passes it. Ranges canonized per axis with defaults and out-of-range bounds; temperature is explicitly eye-judged after warm-share-of-colour, a ratio blind to quantity, ranked a spare image above a dense golden one. Two prompt-level defects fixed on Darren\'s eye: the unconditional face line was inviting figures into object-only scenes (now conditional), and density lines that belonged to one context had been written as universals (now the spot register). Record: internal run record (spec-v7-dna + per-asset prompt/run provenance) — the gate caught the first attempt shipping hero and docs exemplars rendered BEFORE the conditional-face amendment, so every shipped example was regenerated under the final block and the claim is now checkable rather than asserted.' },
  { date: '2026-08-13', decision: 'Public-exposure audit corrective wave (Darren-ratified item-by-item; v2.13.0). The audit (five lanes + cross-family critic; zero credential-class findings across the full history) drove one structural decision and a set of wording corrections. Structural: the internal render tier (internalCanon) — the public guide narrows to the identity system, and claim-bearing/strategy fields (trustCopy, fullShapeClaim, differentiatorGuardrail, antiBrands, audienceMechanics) stop rendering to the site, guide, PDF, contract, and llms.txt, reaching consumers via git-ignored internal/ artefacts instead; ratified as a carve-out to renderDoctrine. Wording, each ratified individually: retention master re-tensed to a schedule we will actually publish, replacing a citation to one that did not exist, and the legal few-shot timeframe neutralised to point at the retention policy rather than a fixed number of days; the Human-First value de-guaranteed to a mechanism statement ("with no lock-in") while the trust-master instances await the counsel read; the enterprise deployment-tier ladder brought under the staged-targets hedge; "measurably" dropped from the compounding claim (an establishment-shaped adverb with no measurement behind it); originStance scoped to brand/marketing surfaces; the accessibility floor sentence now names its exception registry; the 2026-07-08 claims-posture entry now names its gating controls; trademark-clearance detail compressed out of the public ledger. The privacy and aiUse masters are deliberately UNCHANGED pending the counsel engagement (four questions drafted in the internal record), which also covers formal trademark clearance and priority-filing timing. The retired pre-canon hero anchor was removed from public/ (orphaned, off-doctrine, third-party watermarked). Posture throughout: repo and site stay public; history is permanent (a public fork shares the object network), so every correction is forward-looking and none pretends to unpublish.' },
  { date: '2026-08-13', decision: 'Deliberate keeps from the same audit, recorded as decisions rather than left as defaults: (1) the candid self-critique corpus (brand-critical-review.md, the audit records, the operational-miss notes) stays public — every miss in it is shown being caught, root-caused, and closed by a mechanism, which is the checkability the brand claims; (2) the naming corpus stays public — it is a gift to others and no longer describes a live name; (3) the AI-operations doctrine stays, with operational exhaust (pane ids, run scaffolding) kept in the git-ignored run directory; (4) the monetization/packaging PROMISE stays on the live site as audienceBreadth while the mechanics move internal-tier — the promise was always intended publicly, and this entry is what makes it a decision instead of an accident; (5) commit identity carrying a personal name and the legal entity stays, per the naming rule that the entity is public record. Each keep was recommended by the lanes that read the material and is revisitable; none is load-bearing on a claim.' },
  { date: '2026-08-13', decision: 'Fix-wave gate correction (Codex critic, changes-required → applied). Three defects in the wave itself: (a) the full-shape claim survived LOWERCASED inside the 2026-07-19 ledger entry and therefore still shipped in brand-contract.json and the rendered Governance page — the internal-tier gate was case-sensitive and scanned only one generator\'s outputs; the entry no longer quotes the claim, and scripts/check-internal-tier.mjs now runs last over every public text artefact with case and whitespace normalised. (b) The root README overstated the tier as "not published here"; corrected — canon is public source, so the tier removes rendered surfaces and the first-party-statement reading, not the words. (c) Two commit messages in this wave overstated: 30a1b25 claimed the internal fields had stopped reaching the contract (the lowercase quote was still there until this entry), and cb7794c described a commit-identity switch that was a local git config change, not part of that diff. Recorded forward rather than rewritten — the history is public and permanent, and a ledger that only records successes is not the checkable one this brand claims to keep.' },
  { date: '2026-08-13', decision: 'Fix-wave gate round 2 (same critic, changes-required → applied). Three more: (a) "the guide carries brand identity, not claims" was overbroad in both AGENTS.md and this renderDoctrine field — the carve-out is a list of NAMED fields, and the guide still carries vision-anchored capability language; both now say so, and a sentence that reads as a claim is judged on its own wording rather than excused by the doctrine. (b) The enforcement was still partial: the early gate carried a hand-written probe list covering three of trustCopy\'s five strings, so aiUse and counselNote were registered but unenforced; both gates now DERIVE probes from the registry (scripts/internal-tier-probes.mjs), the whole-repo gate scans SVG/XML text and, after the build, dist/, and CI runs that pass after npm run build because a component can carry an exempt canon value into the bundle past every earlier gate. (c) Two more commit-message overstatements recorded forward: 3ac1a2a told consumers the generator fails on any internal-field leak before that was true, and ff61bf6 claimed the gate covered "every public text artefact" while excluding SVG, dist, and the PDF. Round 3 then caught this entry\'s own first version doing it again — it claimed the PDF was covered by construction with a gate that would fail if that stopped being true, when the check only asserted the original markdown input still existed and would not have noticed a second printable source, and it described the historical-doc exemption as scoped to company names when the implementation scoped it by string length, which split one field down the middle — the shortest name exempt, the longest not. Both are fixed rather than restated: generate-pdf.mjs now runs the same derived probes over the exact HTML it hands the renderer, so every printable source is checked including ones added later, and the exemption is keyed to the antiBrands field itself, with a registered string too short to probe safely failing the gate instead of quietly inheriting it. The pattern across this wave — a completeness claim written at the moment of intent rather than of verification, three times, each caught by the gate rather than by the author — is the defect worth remembering, not any one sentence.' },
  { date: '2026-08-18', decision: 'Downstream-agent consumability pass (v2.14.0). The consumers of this canon are mostly agents in other repos working from a VENDORED copy, and the artefacts said nothing about where they came from or when a copy had gone stale: every generated file now carries the published origin (meta.publishedAt) plus the freshness test — compare the version field against the live brand-contract.json, then re-vendor the whole set rather than patching one file. The sharper risk was the internal tier read from the outside: an agent re-pinning a newer snapshot watches registered fields disappear with no machine-readable reason, and the natural repair is the wrong one. internalCanon gains a consumerRule addressed to that agent — absent by design, do not reconstruct from an older snapshot or from memory, never author replacements freehand, request the internal hand-off — rendered into llms.txt, the agent drop-in block, and the pre-flight checklist so it travels with the files it governs. Also: llms.txt gained a vendoring stanza naming the file set and the conformance checker that enforces it in a consumer CI, illustration-prompt.md gained the canon stamp the other five artefacts already had, and the 2026-08-08 ledger entry describing the retired Trust & Disclosures page is annotated as historical — it read to an agent as a live instruction to render trust copy verbatim.' },
] as const

// --- Retired Values Register ---
// Decision 35b (Darren-ratified 2026-08-11). Canon is otherwise present-tense;
// this is the one place it keeps history, and it exists to serve the
// conformance checker: a checker generated from current values alone cannot
// recognise the retired value it is meant to catch. The category noun is NOT
// duplicated here — positioning.categoryGuard.badSubstitutions already carries
// it and consumers read that field directly; this register covers everything
// else that has escaped downstream or plausibly could.
//
// `scope` is load-bearing and maps onto checker severities:
//   absolute   — any occurrence is a violation (an error rule).
//   contextual — the string is still canonical in another role; only one use
//                of it was retired, and no string match can tell the two
//                apart. `stillValidAs` states the surviving role, and the
//                checker reports at review severity for a human to judge.
// The generator fails the build on a scope it does not recognise or a
// contextual entry with no stillValidAs — growth is taught, never guessed.
export const retired = {
  note:
    'Values canon no longer holds, recorded so downstream drift is machine-detectable. Seeded only with retirements that escaped downstream or plausibly could; grows when a real migration happens, not by back-filling history.',
  values: [
    {
      id: 'guide-url-github-pages',
      retired: 'matchwise.github.io/spectrea-branding',
      replacedBy: 'branding.spectrea.com',
      since: '2026-08-07',
      decision: 'v2.5.0 hand-off (custom domain)',
      scope: 'absolute',
    },
    {
      id: 'tone-spectrum-citation',
      retired: 'toneSpectrum',
      replacedBy: 'toneExamples (tone field)',
      since: '2026-08-08',
      decision: '20 (v2.5.4)',
      scope: 'absolute',
    },
    {
      id: 'mark-path-pre-k3',
      retired: 'M 44 12',
      replacedBy: 'K3′ markGeometry (logo.markGeometry)',
      since: '2026-08-07',
      decision: '6 (v2.5.0)',
      scope: 'absolute',
    },
    {
      id: 'focus-ring-universal-rgba',
      retired: 'rgba(225, 144, 0, 0.7)',
      replacedBy: '#A86E00 (light) / rgba(225, 144, 0, 0.7) (dark)',
      since: '2026-08-07',
      decision: '16 (v2.5.1), scope rule decision 34 (v2.10.0)',
      scope: 'contextual',
      stillValidAs:
        'The dark-theme focus ring. Only its use as the LIGHT-theme ring was retired, and no string match can tell the two apart.',
    },
    {
      id: 'teal-active-as-text',
      retired: '#008775',
      replacedBy: '#007D6E (brandTokens.accentText.teal)',
      since: '2026-08-08',
      decision: 'accessibility cluster (v2.5.7, accentText Option A)',
      scope: 'contextual',
      stillValidAs:
        'teal.active — a button-state FILL. Only its use as text colour was retired.',
    },
  ],
  // Evaluated and deliberately NOT registered: Pewter #97979E on meaning-carrying
  // text (retired v2.5.7 in favour of Slate). Pewter remains a core palette
  // colour in its muted role, so a contextual entry on its hex reported 57
  // legitimate uses in one consumer — noise that teaches people to stop reading
  // the review tier. A register entry must be rarer than its noise; that
  // migration stays human-reviewed.
} as const

// --- Executive Voice ---
// Founder/exec surfaces speak as practitioners — same voice formula, first
// person (added 2026-07-03).
export const executiveVoice = {
  rule: 'Founder and executive surfaces — bylines, talks, investor letters, interviews, personal social — use the same voice formula in the first person. Speak as a practitioner who builds and uses the product: concrete observations, shown work, named trade-offs. No corporate we-speak, no vision without evidence.',
  example: {
    correct: 'I kept watching decisions we\'d already settled get re-argued three months later, because nobody could find why we\'d decided. That\'s the problem Spectrea started from.',
    incorrect: 'We\'re thrilled to announce the next chapter in our journey to revolutionize how the world works with knowledge.',
    why: 'The right version is a practitioner\'s observation — first person, specific, checkable. The wrong version is corporate we-speak built on a neverUse word.',
  },
} as const

// --- Origin Stance ---
// DECIDED by Darren 2026-07-03: codified silence.
export const originStance = {
  status: 'decided-silence',
  rule: 'The brand stays silent on origin — no origin claims, no locality framing ("engineered in Singapore" or similar), on any brand or marketing surface. Do not originate origin copy. Scope (clarified 2026-08-13): this governs brand and marketing surfaces; the historical archive in docs/ and legal instruments are out of scope — the legal entity is public record regardless, and silence was never secrecy. Decided by Darren 2026-07-03; revisit only if a GTM cycle produces buyer evidence that the signal earns something.',
} as const

// --- Color Palette Options ---
export interface PaletteColor {
  name: string
  hex: string
  role: 'primary' | 'accent' | 'secondary' | 'background' | 'surface' | 'text' | 'muted' | 'body-secondary' | 'body-emphasized'
}

export interface PaletteOption {
  id: string
  name: string
  story: string
  feeling: string
  colors: PaletteColor[]
  gradient: { from: string; via?: string; to: string; angle?: number }
  darkMode: {
    bg: string
    surface: string
    text: string
    muted: string
    border: string
  }
}

// ★ SELECTED PALETTE: Cobalt hero + spectrum accents on neutral canvas
export const selectedPalette: PaletteOption = {
  id: 'spectrea',
  name: 'Spectrea',
  story: 'A clean, neutral canvas with a deep cobalt hero and three spectrum accents. Cobalt leads primary actions with weight and intention. Teal, amber, and rose provide the spectrum — each a building block, a possibility.',
  feeling: 'Intentional, structured, alive with possibility.',
  colors: [
    { name: 'Graphite', hex: '#212226', role: 'primary' },
    { name: 'Cobalt', hex: '#4271DF', role: 'accent' },
    { name: 'Teal', hex: '#00B6A0', role: 'accent' },
    { name: 'Amber', hex: '#E19000', role: 'accent' },
    { name: 'Rose', hex: '#F24260', role: 'accent' },
    { name: 'Canvas', hex: '#FDFDFB', role: 'background' },
    { name: 'Cloud', hex: '#F4F4F1', role: 'surface' },
    { name: 'Ink', hex: '#18181C', role: 'text' },
    { name: 'Iron', hex: '#46464B', role: 'body-emphasized' },
    { name: 'Slate', hex: '#6D6D72', role: 'body-secondary' },
    { name: 'Pewter', hex: '#97979E', role: 'muted' },
  ],
  // Derived view of brandTokens.gradients.primary (the single declaration) —
  // the PaletteOption shape keeps from/via/to for palette-level consumers.
  gradient: {
    from: brandTokens.gradients.primary.stops[0].hex,
    via: brandTokens.gradients.primary.stops[1].hex,
    to: brandTokens.gradients.primary.stops[2].hex,
    angle: brandTokens.gradients.angleDeg,
  },
  darkMode: { bg: '#18181C', surface: '#212226', text: '#F4F4F1', muted: '#B0B0B6', border: '#2E2F35' },
}

// Historical palette explorations were retired in v2. Spectrea is the chosen
// palette; the prior alternatives (Warm Depth, Deep Spectrum, Living Teal,
// Refined Indigo, Copper & Night, Sage & Coral, Twilight, Warm Blue, Clay,
// Nordic Light) are no longer referenced anywhere in the app or guide.
// `paletteOptions` is kept as an empty stable export so external imports
// degrade gracefully if they ever existed.
export const paletteOptions: PaletteOption[] = []
