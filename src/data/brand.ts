// ============================================================
// Spectrea Brand Data — Single source of truth
// ============================================================

// --- Brand Foundation ---
export const brand = {
  name: 'Spectrea',
  pronunciation: '/spek-TREE-uh/',
  etymology:
    'From "spectra" (Latin: the full range or spectrum). The name does double duty: (1) the full range — the complete view, the whole picture, everything in one place; (2) revealing — bringing what was hidden into clear view. Together: the spectrum of clarity.',
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
    category: 'Composable knowledge platform',
    promise:
      'Turns scattered information into compounding intelligence',
    brand:
      'In an age of information overload and eroding trust, people need more than another tool — they need a way to separate truth from noise, surface insights across boundaries, and build on what they understand. Spectrea is the composable knowledge platform that puts this power in human hands — where everything you see is transparent, every connection inspectable, and understanding compounds with every interaction.',
    tactical:
      'For anyone who works with knowledge, Spectrea is the composable knowledge platform that turns scattered information into compounding intelligence — unlike fragmented point solutions that silo your knowledge and hide their reasoning.',
  },

  // --- Messaging Hierarchy ---
  messaging: {
    primary: {
      theme: 'Connection',
      headline: 'We connect the dots.',
      supporting:
        'Your knowledge is scattered across dozens of tools. Spectrea brings it together into a single living graph.',
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
          'Every document you add, every idea you capture, every connection you draw — it all compounds. Your second year is incomparably better than your first.',
      },
      {
        theme: 'Composability',
        headline: 'Build exactly what you need.',
        supporting:
          'Spectrea gives you simple, powerful building blocks. Assemble them into solutions that fit your domain — no consultants, no configuration maze.',
      },
    ],
  },

  // --- Brand Archetypes (tri-domain split) ---
  // Each archetype owns one surface domain and shapes the emotional tone there.
  // The visual aesthetic stays consistent across surfaces (see "one register everywhere"
  // in the v2 design spec); only voice and mood change per archetype.
  archetypes: [
    {
      name: 'The Magician',
      surface: 'Marketing',
      description:
        'The moment of seeing what was hidden. The thrill of pattern emerging from chaos. Owns landing pages, launch videos, social, blog headers — wherever the brand surprises and delights.',
    },
    {
      name: 'The Sage',
      surface: 'Trust',
      description:
        'Authority through clarity. The calm of being able to see exactly how something is true. Owns settings, errors, documentation, security pages — wherever trust gets earned by showing the work.',
    },
    {
      name: 'The Creator',
      surface: 'Product',
      description:
        'The joy of making. Building something that\'s yours. Owns the spaces where users compose and create — wherever the brand hands the user the tools and steps back.',
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
      proof: 'Private by default. AI suggests, never overrides silently. Every AI action is reviewable and reversible. The system works without AI; AI elevates, never gates.',
    },
    {
      name: 'Trustworthy Intelligence',
      description: 'Everything you see is transparent. Every action is reviewable. Every connection can be followed back to where it came from. Understanding that can\'t be verified isn\'t understanding at all.',
      proof: 'Every piece of information is linked to its source. Confidence levels are visible, never hidden. Every change is logged with reasoning. AI actions are always recorded and explainable.',
    },
    {
      name: 'Compounding Intelligence',
      description: 'The more you use Spectrea, the more it gives back. Connections surface faster, context deepens, insights compound. Your second year is incomparably better than your first.',
      proof: 'Every interaction enriches the system, providing richer context for everything that comes next and surfacing connections that would otherwise stay hidden.',
    },
    {
      name: 'Composable by Nature',
      description: 'Build solutions that fit your world — don\'t reshape your world to fit a tool. Simple, combinable parts assembled into exactly what you need.',
      proof: 'Composable building blocks that assemble into domain-specific solutions. Specificity emerges from how you combine, not from what\'s pre-built for you.',
    },
    {
      name: 'Accessible Power',
      description: 'Deep capability that meets you where you are. No one excluded by complexity, no one limited by simplicity. The floor is high, the ceiling is infinite.',
      proof: 'The same system reveals different depths depending on how you use it. Beginners get a clear, complete experience; experts get the depth they need without changing tools.',
    },
  ],

  // --- Anti-Values ---
  antiValues: [
    {
      never: 'Never replaces human judgment',
      because: 'AI assists, suggests, and surfaces — but you decide. Spectrea never makes choices on your behalf or acts without your awareness.',
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
  visualMetaphor: {
    primary: 'Prism',
    primaryDescription: 'Raw information enters, organized insight exits. The "reveal" moment — hidden structure made visible.',
    secondary: 'Living Network',
    secondaryDescription: 'A web of connections that grows denser and more intelligent over time. The "growth" story.',
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

  // --- Differentiators ---
  differentiators: [
    { spectrea: 'Transparent — everything you see is shown, not assumed', others: 'Black box — data goes in, answers come out' },
    { spectrea: 'Compounding — gets smarter with use', others: 'Static — same value on day 1 and day 1000' },
    { spectrea: 'Verifiable — every connection can be followed back', others: 'Unverifiable — no way to audit or trust' },
    { spectrea: 'Composable — build exactly what you need from simple parts', others: 'Fixed — use what you\'re given' },
    { spectrea: 'Unified — one place for what was scattered across many', others: 'Fragmented — another app in the stack' },
    { spectrea: 'Private by default — your knowledge stays yours', others: 'Open by default — data leaks across boundaries' },
  ],

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
      usage: 'Body text, UI labels, descriptions, form labels, tooltips, buttons. Optimized for reading fluency — reduces visual crowding in dense knowledge interfaces.',
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: 'monospace',
      css: "'JetBrains Mono', monospace",
      weights: { regular: 400, medium: 500 },
      defaultWeight: 400,
      usage: 'Code snippets, type labels, trace details, data values, confidence scores, technical identifiers.',
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

  toneSpectrum: [
    {
      context: 'Marketing / Homepage',
      tone: 'Bold + Direct',
      example: 'Stop losing knowledge to silos. Spectrea builds a living graph of everything your organization knows. The more you use it, the sharper it gets.',
    },
    {
      context: 'Documentation / Help',
      tone: 'Precise + Helpful',
      example: 'To add a new item, open the relevant view and choose "Add". Pick a type from the list, or create one if you need it. The item appears in place immediately.',
    },
    {
      context: 'Social Media / Community',
      tone: 'Thoughtful + Engaging',
      example: 'What if every document you uploaded made your whole system smarter? That\'s not a hypothetical — it\'s how Spectrea works.',
    },
    {
      context: 'Error Messages / System',
      tone: 'Direct + Informative',
      example: 'Save failed: connection timeout. Your draft is cached locally. Retrying...',
    },
  ],

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
  ],

  toneExamples: [
    {
      context: 'Marketing / Landing Page',
      correct: 'Stop losing knowledge to silos. Spectrea builds a living graph of everything your organization knows. The more you use it, the sharper it gets.',
      incorrect: 'Spectrea is a next-gen, AI-powered knowledge management solution that leverages cutting-edge graph technology to revolutionize how enterprises handle data.',
      why: 'Bold and direct. Leads with the problem, then the solution, then the differentiator. No hype words.',
    },
    {
      context: 'Error Message',
      correct: 'Save failed: connection timeout. Your draft is cached locally. Retrying...',
      incorrect: 'Oops! Something went wrong. Please try again later or contact support if the problem persists.',
      why: 'Direct and informative. States what happened, what\'s safe, and what\'s next. No vague apologies.',
    },
    {
      context: 'Feature Announcement',
      correct: 'Every document you add now strengthens what the system already knows. Connections you never noticed start surfacing. The whole gets sharper — your second month is better than your first.',
      incorrect: 'We are excited to announce the launch of our groundbreaking new feature, a world-class breakthrough in knowledge management technology!',
      why: 'Shows what the user experiences, not what we built. Tech earns its place by showing its work.',
    },
    {
      context: 'Documentation',
      correct: 'To add a new item, open the relevant view and choose "Add". Pick a type from the list, or create one if you need it. The item appears in place immediately.',
      incorrect: 'Ready to add something? Just head over to the right view and hit that "+ Add" button! Pick a type that fits — or make a new one if nothing works. Easy!',
      why: 'Precise and helpful. No forced enthusiasm. Respects the user\'s time and intelligence.',
    },
    {
      context: 'Social Media',
      correct: 'What if every document you uploaded made your whole system smarter? That\'s not a hypothetical — it\'s how Spectrea works.',
      incorrect: 'Big news! Our AI just got even more powerful! Check out our latest update that will blow your mind!',
      why: 'Thoughtful and engaging. Leads with an idea, invites the reader to think. No clickbait.',
    },
    {
      context: 'Beginner Documentation',
      correct: 'Think of Spectrea as a web of everything your team knows. When you add a document, Spectrea reads it and weaves what it learns into the web — connecting it to things you\'ve already captured.',
      incorrect: 'Documents are processed through a 6-phase pipeline: parse, chunk, embed, score, review, and integrate.',
      why: 'Demonstrates the Adaptive personality: meets beginners where they are, using familiar metaphors instead of technical architecture.',
    },
  ],
} as const

// --- Color Palette Options ---
export interface PaletteColor {
  name: string
  hex: string
  role: 'primary' | 'accent' | 'secondary' | 'background' | 'surface' | 'text' | 'muted'
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
    { name: 'Pewter', hex: '#97979E', role: 'muted' },
  ],
  gradient: { from: '#4271DF', via: '#00B6A0', to: '#E19000', angle: 135 },
  darkMode: { bg: '#18181C', surface: '#212226', text: '#F4F4F1', muted: '#6B6B72' },
}

// Historical palette explorations were retired in v2. Spectrea is the chosen
// palette; the prior alternatives (Warm Depth, Deep Spectrum, Living Teal,
// Refined Indigo, Copper & Night, Sage & Coral, Twilight, Warm Blue, Clay,
// Nordic Light) are no longer referenced anywhere in the app or guide.
// `paletteOptions` is kept as an empty stable export so external imports
// degrade gracefully if they ever existed.
export const paletteOptions: PaletteOption[] = []
