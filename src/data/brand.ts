// ============================================================
// Spectrea Brand Data — Single source of truth
// ============================================================

// --- Meta / Governance ---
export const meta = {
  version: '2.5.9',
  lastUpdated: '2026-08-09',
  sourceOfTruth:
    'brand.ts is the canonical brand data. The app renders it; the guide (brand-guide.md), llms.txt, the PDF, and generated assets are derived mirrors. On any conflict, brand.ts wins. Claims are anchored to the ratified product vision (spectrea/docs/00-overview), not to shipped code; execution status lives in spectrea\'s roadmap — check it before placing a capability claim on a buyer-facing surface.',
  renderDoctrine:
    'Anything in canon must render somewhere in the guide (ratified 2026-08-06). A canonical field with no rendering surface is a propagation defect: agents must never receive a stricter or newer brand than people.',
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
          'Every document you add, every idea you capture, every connection you draw — it all compounds. Your second year is measurably sharper than your first — more context retained, more decisions traceable, more outcomes feeding the next cycle.',
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
  // see. Build on what you find."), and the voice formula
  // ("Clarity of explanation + experiential momentum. Tech earns its place by
  // showing its work.").
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
      proof: 'Private by default. AI suggests, never overrides silently. Every AI action is reviewable and reversible. The system works without AI; AI elevates, never gates. Your data is sovereign: full-fidelity export — structure, data, and provenance — is a first-class guarantee. You can always leave with everything.',
    },
    {
      name: 'Trustworthy Intelligence',
      description: 'Everything you see is transparent. Every action is reviewable. Every connection can be followed back to where it came from. Truth is per-viewer: what you see is synthesized from exactly the claims you can access — coexisting perspectives stay attributed, and nothing leaks from views you can\'t see. Understanding that can\'t be verified isn\'t understanding at all.',
      proof: 'Every piece of information is linked to its source. Confidence levels are visible, never hidden. Every change is logged with reasoning. AI actions are always recorded and explainable.',
    },
    {
      name: 'Compounding Intelligence',
      description: 'The more you use Spectrea, the more it gives back. Connections surface faster, context deepens, insights compound. Your second year is measurably sharper than your first — more context retained, more decisions traceable, more outcomes feeding the next cycle.',
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
  audienceBreadth:
    'The designed path: start free alone (full-featured) → invite a few collaborators (bounded invites stay free) → pay when capacity or admin scale demands it. The paid line is capacity and governance administration, never a crippled core — value arrives before payment.',

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
  aspirationalBrands: ['Apple', 'Linear', 'Stripe'],
  antiBrands: ['Salesforce', 'Microsoft 365', 'Jira'],
} as const

// --- Voice & Tone ---
export const voice = {
  formula: 'Clarity of explanation + experiential momentum. Tech earns its place by showing its work.',
  techApproach: 'Earn the jargon',
  techDescription:
    'Start with the human benefit, then introduce the technical concept. Tech earns its place by showing its work — pointing to the source, the trace, the evidence — not by impressing.',

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
      correct: 'Every document you add now strengthens what the system already knows. Connections you never noticed start surfacing. The whole gets sharper — your second month is better than your first.',
      incorrect: 'We\'re excited to share our latest update — it includes improvements that will help you be more productive.',
      why: 'Shows what the user experiences, not what we built. The wrong version is the bland-SaaS failure mode: agentless, vague, no specifics. The right version names the shift the user will actually notice.',
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
      correct: 'Think of Spectrea as a web of everything your team knows. When you add a document, Spectrea reads it and weaves what it learns into the web — connecting it to things you\'ve already captured.',
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
      correct: 'Workspace visibility: private. Only people you invite can see anything in this workspace — including the assistant, which sees only what each viewer can see.',
      incorrect: 'Take control of your data with our industry-leading privacy options!',
    },
    {
      surface: 'Legal & compliance',
      rule: 'Same voice, zero warmth-decoration: precise, complete sentences that a lawyer and a reader both accept. State facts and obligations; never soften a limitation into a benefit.',
      correct: 'You can export your full workspace — structure, data, and provenance — at any time. Deleting your account removes your data from live systems within 30 days.',
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
    tokens: 'On Canvas: Ink 17.4:1 · Iron 9.21:1 (AAA) · Slate 5.05:1 (AA) · Pewter 2.85:1 (supplementary only).',
    // Corrects the retired "all four accents pass AA on Ink" claim (D10):
    // Cobalt does not.
    accentsOnInk: 'On Ink: Teal 6.91:1, Amber 6.90:1, and Rose 4.82:1 pass AA for normal text; Cobalt is 3.93:1 — large-text and UI only. Use Cobalt Lift #7A9AEF for Cobalt-coloured body text on dark.',
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
// lockup FORM COUNT stays at two pending the open lockup-form decision (BA-10).
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
    nodeHoverFocus: 'Cobalt — Tier 1 responsive: present during hover/focus, then settles.',
    nodeSelected: 'Ink — Tier 2 structural: persistent selection state (Cloud on dark).',
    edgeDefault: 'Neutral (Pewter). A newly formed connection may animate with the Formation motion primitive — spectrum gradient along the stroke, settling to resting neutral.',
    confidence: 'Amber carries confidence/attention. Confidence values render in JetBrains Mono and are never conveyed by colour alone.',
    status: 'Tier 3 semantic: success/connected = Teal · warning/pending = Amber · error/conflict = Rose · info = Cobalt.',
    stale: 'Pewter whisper plus a non-colour cue (icon or label) — never colour alone.',
  },
  note: 'Foundation only. The operational graph-rendering spec is a product design deliverable, not a brand-guide deliverable.',
} as const

// --- Trust & Disclosure Copy ---
// Brand-voiced masters for trust surfaces, derived from the ratified vision
// (sovereign data, per-viewer access, provenance, managed-path no-train
// target). REVIEW WITH COUNSEL before any external legal or contractual use.
export const trustCopy = {
  counselNote: 'These are brand-voice masters, not legal instruments. Review with counsel before external legal use. Trigger (ratified 2026-08-07): before any launch that puts trust, security, or compliance claims on a public page, counsel reads these masters first — the same engagement covers formal trademark clearance of the name.',
  privacy: 'Your knowledge belongs to you. Spectrea is private by default: what you add is visible only to you and the people you explicitly share it with, and the system enforces that per viewer on every surface — including the assistant, which sees only what you can see.',
  aiUse: 'Spectrea uses AI to suggest, surface, and draft — and to run only the automations you set guardrails for: you decide what runs on its own and what checks with you first. Every AI action is recorded, attributed to its sources, and reviewable. On the managed path, your data is not used to train foundation models — a contract we are formalizing, with independent ISO 42001-class attestation as a stated target.',
  retention: 'You stay in control of what Spectrea keeps. Your workspace persists until you delete it; deletion removes your data from live systems on a published schedule. And you can always leave with everything: full-fidelity export — structure, data, and provenance — is a first-class guarantee.',
  enterpriseReadiness: 'Trust in Spectrea is architectural first: per-viewer access control, provenance, and privacy are properties of the substrate, not compliance features added afterwards. Data is sovereign — full-fidelity export is guaranteed, and the deployment perimeter widens by tier from managed cloud to single-tenant/VPC to air-gapped. Formal attestations (SOC 2, ISO 27001, ISO 42001-class AI governance) and uptime/incident commitments are staged targets, stated as such: the architecture is the foundation; the program is what makes it independently verifiable.',
} as const

// --- Ratification Ledger ---
// Single ledger for brand decisions (ratified 2026-07-19). Local per-repo
// ratifications are absorbed here on sight; a decision recorded only in a
// consumer repo's AGENTS.md is not canon until it lands in this ledger.
export const ratificationLedger = [
  { date: '2026-07-03', decision: 'D1 lockup third form re-scoped to gradient family; D2 outcome-first on-ramp, no whole-product term; D3 origin: codified silence; D4 neverUse additions + bio + trustCopy masters.' },
  { date: '2026-07-08', decision: 'Claims posture (web, reaffirmed 2026-07-16; absorbed into canon 2026-07-19): pre-launch capability copy speaks the full product vision in present tense — anchored to the ratified vision, not shipped code; no shipped-only scoping, no "soon" hedging. Compliance stays a program, not a badge: attestations and uptime/incident commitments remain staged targets, stated as such.' },
  { date: '2026-07-09', decision: 'Balance doctrine (web vocabulary nuance; generalized 2026-07-19): avoid/never lists guard against buzzword-led copy, not word existence — an industry term may label a segment-matched surface when plain language carries the meaning in place.' },
  { date: '2026-07-16', decision: 'AI naming registers (web; absorbed 2026-07-19): "your AI" on homepage narrative; "the assistant" on product/trust surfaces; automation copy uses the guardrails frame ("what runs on its own, and what checks with you first").' },
  { date: '2026-07-18', decision: 'Vision-anchored branding: brand claims anchor to the ratified vision canon; brand-vs-vision divergences are adjudicated, never auto-conformed to branding. Provenance note added to meta.sourceOfTruth.' },
  { date: '2026-07-19', decision: 'Hero frame "the operating system for collective intelligence" ratified as a coined whole-product frame (D2 amended; pair with plain language). Full-shape claim "compounding collective intelligence" adopted from vision §1 as internal north-star. Autonomy absolutes replaced by the guardrails frame (aiNaming.verbRule, trustCopy.aiUse). Trust surfaces align UP to present-tense masters (no "building toward launch" hedging). Buttons stay canonical 8px radius (pill was a web spec error, not a decision).' },
  { date: '2026-07-19', decision: 'Post-wave adjudications: (1) Named-vendor exception — vision-present-tense governs capability copy EXCEPT named third-party integrations, which are stated as current only when live; roadmap framing is allowed for named vendors. (2) Origin silence holds on trust surfaces — the legal-entity/jurisdiction carve-out stays limited to legal instruments (terms, privacy notices); the entity/PDPA line moves off /security. (3) Generator emits fullShapeClaim and ratificationLedger into the machine contract and a governance pointer into the agent-rules drop-in.' },
  { date: '2026-08-06', decision: 'Brand review ratifications (record: docs/brand-review-2026-08): wordmark Albert Sans 600 canonical at every size incl. hero; lockup constants re-derived from font metrics (stroke 0.113em = stem, mark ink 0.714em = S glyph, ink gap 0.131em, dots 7:8); mark geometry K3′ adopted (S-fit spine, deliberate shallow storytelling tail); visual metaphors explicitly co-primary (Prism = identity/reveal, Living Network = product/growth); render-everything propagation doctrine (meta.renderDoctrine); contrast policy = AA/3:1 floors + ratified exception registry; no small-size micro-construction — the mark scales down unchanged.' },
  { date: '2026-08-07', decision: '"Compounding intelligence" stance: DEFEND — the phrase stays, as one of five differentiator beats (persistent memory, provenance, collective intelligence, composability, the closed loop); the mechanism-tie guardrail carries the claim, not the slogan. Trust-copy counsel trigger added (see trustCopy.counselNote). Name hygiene: knockout search clean (no exact-match "Spectrea" collision found; closest neighbours are remote-class SPECTRE marks and crypto-space Spectre AI); formal clearance rides the counsel trigger; etymology restated as a sourced coinage from "spectrum".' },
  { date: '2026-08-07', decision: 'Focus-ring contrast resolved as a FIX, not an exception (exception round 1/2): light-mode ring switches to Amber active #A86E00 (4.21:1 on Canvas, 3.89:1 on Cloud); dark mode keeps rgba(225,144,0,0.7) (4.00:1 blended on Ink). The previous universal soft ring measured 1.90:1/1.81:1 on light surfaces — below the ratified 3:1 UI floor. The exception registry stays empty.' },
  { date: '2026-08-07', decision: 'Sub-AA button labels resolved as the registry\'s first GRANTED exception (exception round 2/2): white #FFFFFF labels stay on all four semantic base fills. Darren challenged the WCAG 2.x ranking on perceptual grounds; APCA-W3 re-measurement confirmed white beats or ties Ink on every fill (Lc 76.4/68.4/54.6/54.9 vs Ink 31.7/39.6/53.0/52.7) — the nominally compliant Ink-on-Rose swap would have been perceptually worse. Measurement doctrine added (accessibility.measurement): WCAG 2.x AA stays the conformance floor; APCA-W3 Lc is the recorded perceptual adjudicator; exception grants log both metrics.' },
  { date: '2026-08-07', decision: 'One canonical hero-open ratified (D28 part 1): voice.heroOpen — "open on the outcome, written as a reveal", kept simple and adaptable per Darren\'s direction. Fuses the ratified outcome-first structure with the character\'s reveal register; the former five competing prescriptions become steps of one gesture (reveal = register of the open, proof = the grounding, entry-job outcome = the on-ramp specialisation, problem = optional setup that must land on the outcome in the same breath). Supersedes voice.outcomeFirst (renamed).' },
  { date: '2026-08-08', decision: 'Marketing exemplar rewritten under the heroOpen rule (D27): the canonical Marketing/Landing Page example — the few-shot AI tools imitate — now opens on the outcome written as a reveal ("See everything your organization knows in one connected view. Spectrea builds a living graph from your documents — the more you use it, the sharper it gets."), replacing the problem-first open ("Stop losing knowledge to silos…"). Its why-note stops teaching problem-first; the compounding claim keeps its mechanism tie; density at the two-privileged-words cap.' },
  { date: '2026-08-08', decision: 'One register taxonomy (D28 part 2): toneSpectrum retired — it duplicated four toneExamples entries verbatim under colliding labels; its tone labels moved into toneExamples (two authored to complete the set: Feature Announcement = Concrete + Confident, Beginner Documentation = Plain + Welcoming). voice.registerRule declares the two remaining structures\' jobs: toneExamples = register taxonomy (how a content class sounds), surfacePatterns = surface spec (what a product surface says; inherits its register from the nearest content class).' },
  { date: '2026-08-08', decision: 'Hybrid guide generation, wave 1 (decision 2 programme item): brand-guide.md gains generator-owned marker blocks — version stamps, tone-register table, logo construction + clear space, accent states, washes (light/dark), lifts, type system/minimum sizes/type scale/responsive (scale data moved INTO brand.typography), accessibility block, motion durations/easings, radii/spacing/elevation — rewritten from canon by scripts/generate-guide.mjs (npm run generate:guide, wired into generate:all before the PDF). Prose outside markers stays hand-written. Deferred to wave 2 (recorded): §5 neutral/accent/Tailwind/dark-role tables (need a canon colour-model expansion: OKLCH ladder, CSS vars, meanings), §6 gradient family, §11 component specs, §14 CSS-token block.' },
  { date: '2026-08-08', decision: 'Render-everything SPA build (decision 7 programme item): every previously agent-only canon export now has a human-visible surface. New Trust & Disclosures page (/communications/trust) renders trustCopy verbatim with the counsel note. Voice & Tone gains Surface Patterns (all 7) and Executive Voice. Naming gains Company & Product and the Origin stance. Positioning gains the Full-Shape Claim, the compounding usageGuardrail (also on Copy & Taglines), and the differentiatorGuardrail. Copy & Taglines renders voice.heroOpen verbatim. Primary Palette gains Contrast Policy & Measurement (accessibility.measurement + exception registry rendered from data); the two hand-written "never white on Teal/Amber" don\'ts now carry the ratified button-label carve-out. Governance renders meta.sourceOfTruth, renderDoctrine, version, and the full ratification ledger.' },
  { date: '2026-08-08', decision: 'D40/D35 accessibility cluster, wave 1: (1) Tooltip gains a full keyboard path — focusable button affordance at the 24px target size, opens on focus, Escape dismisses, aria-describedby announcement. (2) Palette-tool sliders carry accessible names. (3) Text floors enforced app-wide (~90 sites bumped to the 12px caption floor; the 10px canon carve-outs — uppercase overlines, numeric badges, metadata chips — and specimen mini-previews untouched; four legal 11px uppercase overlines also normalized to 12px for consistency with the app-wide overline idiom). (4) Pewter stepped to Slate wherever it carried meaning (~50 sites), including the Ghost button light-mode label (was Pewter 2.85:1, an interactive label) and the Iconography page, which taught Pewter as the secondary icon tier against pewterMatrix — the taught tier is now Slate, with Pewter reserved for disabled/decorative glyphs. (5) brandTokens.accentText ratified (Darren, Option A): accent-coloured text on light surfaces uses Teal text #007D6E (new; visually near-identical to the retired #008775, which measured 4.04–4.45:1 as text) and Rose text #BA3249 (existing tone, now named); ~30 text sites swept. Button state fills (hover/active) are unchanged — they are fills, not text. Remaining D40 item, deliberately open: the dark-mode Ink-on-lightened-Cobalt hover label (APCA Lc 40.5 despite WCAG 4.5:1+) awaits its own adjudication.' },
  { date: '2026-08-08', decision: 'Dark Cobalt hover re-lightened (D40 closing item, Darren-ratified Option A): the dark transient ladder for Cobalt was the only state below the APCA spot-text line (old hover #5C87E5: WCAG 5.10:1 but APCA Lc 40.5 vs the 45 minimum; every other accent ≥46.7) — the same 2.x formula artefact as the button-label grant, opposite direction (2.x over-credits dark-on-vivid-blue). New ladder lightens one further notch along the existing lift-toward-the-light direction: hover #6E93EC (5.94:1, Lc 46.3 — parity with Rose), active #8FACF0 (7.86:1, Lc 58.1). Base state and all other accents unchanged; the one-rule dark idiom (Ink label on lightened fill) holds; every dark transient state now clears both metrics. Registry entry measured range updated 5.10–9.72 → 5.92–9.72 (consequence of the canon change, not a re-grant). White-label-on-hover alternative rejected (APCA 67.5 but WCAG 3.47 — would need an exception and break the idiom). This closes D40.' },
  { date: '2026-08-09', decision: 'Logo signature animation canonized (D41 closing item, Darren-ratified): logo.animation carries the loop spec — 3 s loop; phase boundaries draw→0.57 (quadratic ease-out), hold→0.60, dissolve→0.97 (quadratic ease-in); 15% trailing fade; reduced-motion = hold the completed frame. Deliberately the logo\'s own spec OUTSIDE the UI motion tokens; AnimatedLogo and the Motion page read it (previously the spec lived only in component code — the markGeometry precedent applied to motion). Same wave, Motion page conformance (D41): the page renders all seven duration tiers and the three easings + never-rule from brandTokens.motion; easing plots computed from the canonical control points; demos animate on canonical curves only; prefers-reduced-motion implemented app-wide (CSS blanket block + rAF-loop media-query check); the focus-ring demo shows the canonical Amber ring.' },
] as const

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
  rule: 'The brand stays silent on origin — no origin claims, no locality framing ("engineered in Singapore" or similar), on any surface. Do not originate origin copy. Decided by Darren 2026-07-03; revisit only if a GTM cycle produces buyer evidence that the signal earns something.',
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
  gradient: { from: '#4271DF', via: '#00B6A0', to: '#E19000', angle: 135 },
  darkMode: { bg: '#18181C', surface: '#212226', text: '#F4F4F1', muted: '#B0B0B6', border: '#2E2F35' },
}

// Historical palette explorations were retired in v2. Spectrea is the chosen
// palette; the prior alternatives (Warm Depth, Deep Spectrum, Living Teal,
// Refined Indigo, Copper & Night, Sage & Coral, Twilight, Warm Blue, Clay,
// Nordic Light) are no longer referenced anywhere in the app or guide.
// `paletteOptions` is kept as an empty stable export so external imports
// degrade gracefully if they ever existed.
export const paletteOptions: PaletteOption[] = []
