// ============================================================
// Spectrea Brand Data — Single source of truth
// ============================================================

// --- Brand Foundation ---
export const brand = {
  name: 'Spectrea',
  pronunciation: '/spek-TREE-uh/',
  etymology:
    'From "spectra" (Latin: the full range or spectrum). The name evokes the complete range of hidden connections the platform reveals — like a prism separating light into its full spectrum.',
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
      'In an age of information overload and eroding trust, people need more than another tool — they need a way to separate truth from noise, surface insights across boundaries, and build on what they understand. Spectrea is the composable knowledge platform that puts this power in human hands — where every claim is traceable, every insight is inspectable, and understanding compounds with every interaction.',
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
          'In a world of noise and hallucination, every claim in Spectrea has a source. Every action is auditable. Every connection is traceable. Truth isn\'t assumed — it\'s verified and inspectable.',
      },
      {
        theme: 'Compounding Intelligence',
        headline: 'It gets smarter with every interaction.',
        supporting:
          'Every document you upload, every entity you create, every relationship you draw — it all compounds. Your second year is incomparably better than your first.',
      },
      {
        theme: 'Composability',
        headline: 'Build exactly what you need.',
        supporting:
          'Spectrea gives you simple, powerful building blocks. Assemble them into solutions that fit your domain — no consultants, no configuration maze.',
      },
    ],
  },

  // --- Brand Archetype ---
  archetype: 'The Magician' as const,
  archetypeDescription:
    'Transformation — making the impossible possible. Turns complexity into clarity. Reveals hidden patterns. The world is more intelligible because Spectrea exists.',

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
  values: [
    {
      name: 'Human-First',
      principle: 'P4 + P6 + P9',
      description: 'Spectrea serves people, not the other way around. AI assists understanding — it never replaces judgment. The system suggests, you decide. Your knowledge belongs to you.',
      proof: 'Private by default. AI recommendations carry confidence scores, never silent overrides. Every AI action is inspectable and reversible. The full product works without AI (the floor); AI elevates but never gates capability.',
    },
    {
      name: 'Trustworthy Intelligence',
      principle: 'P2 + P5',
      description: 'Every claim is attributed, every action auditable, every connection traceable. Understanding that can\'t be verified isn\'t understanding at all.',
      proof: 'Claims-based knowledge model with full provenance chains. Source attribution, confidence scores, and staleness indicators. Every mutation logged, every AI action recorded with model and rationale.',
    },
    {
      name: 'Compounding Intelligence',
      principle: 'Knowledge Flywheel',
      description: 'The more you use Spectrea, the more it gives back. The graph grows denser, connections surface faster, and insights deepen. Your second year is incomparably better than your first.',
      proof: 'Every document uploaded enriches the graph, providing richer context for all future queries and surfacing connections that would otherwise stay hidden.',
    },
    {
      name: 'Composable by Nature',
      principle: 'P3',
      description: 'Build solutions that fit your world — don\'t reshape your world to fit a tool. Simple, combinable parts assembled into exactly what you need.',
      proof: 'Six primitive layers (Type, Data, Logic, Constraint, Query, Visual) that combine into any solution. Domain specificity emerges from how you compose, not from what we pre-build.',
    },
    {
      name: 'Accessible Power',
      principle: 'P9',
      description: 'Deep capability that meets you where you are. No one excluded by complexity, no one limited by simplicity. The floor is high, the ceiling is infinite.',
      proof: 'Two experience tiers: a complete first-class experience without AI, and an AI-elevated experience that makes composition effortless.',
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
    references: ['Notion', 'Stripe'],
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
      message: 'Six primitive layers. Full provenance. Symmetric APIs. A platform that\'s as transparent and composable as your engineering culture demands.',
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
    { spectrea: 'Trustworthy intelligence — every claim has a source', others: 'Black box — data goes in, answers come out' },
    { spectrea: 'Compounding intelligence — gets smarter with use', others: 'Static tools — same value on day 1 and day 1000' },
    { spectrea: 'Claims with provenance — truth is traceable', others: 'Unverifiable outputs — no way to audit or trust' },
    { spectrea: 'Composable primitives — build exactly what you need', others: 'Fixed features — use what you\'re given' },
    { spectrea: 'Unified substrate — one graph replaces 20+ tools', others: 'Point solutions — another app in the stack' },
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
      weights: { regular: 400, medium: 500 },
      defaultWeight: 400,
      usage: 'Body text, UI labels, descriptions, form labels, tooltips, buttons. Optimized for reading fluency — reduces visual crowding in dense knowledge interfaces.',
    },
    mono: {
      family: 'JetBrains Mono',
      fallback: 'monospace',
      css: "'JetBrains Mono', monospace",
      weights: { regular: 400, medium: 500 },
      defaultWeight: 400,
      usage: 'Code snippets, entity types, provenance chains, data values, confidence scores, technical identifiers.',
    },
  },

  // --- Aspirational & Anti Brands ---
  aspirationalBrands: ['Apple', 'Linear', 'Notion', 'Stripe'],
  antiBrands: ['Salesforce', 'Microsoft 365', 'Jira'],
} as const

// --- Voice & Tone ---
export const voice = {
  formula: 'Clarity of explanation + experiential momentum. Tech earns its place by explaining the magic.',
  techApproach: 'Earn the jargon',
  techDescription:
    'Start with the human benefit, then introduce the technical concept. The tech earns its place by explaining the magic — not by impressing.',

  toneSpectrum: [
    {
      context: 'Marketing / Homepage',
      tone: 'Bold + Direct',
      example: 'Stop losing knowledge to silos. Spectrea builds a living graph of everything your organization knows. The more you use it, the sharper it gets.',
    },
    {
      context: 'Documentation / Help',
      tone: 'Precise + Helpful',
      example: 'To create a new entity, navigate to the graph view and click "+ Entity." Choose a type from your ontology, or create a new one. The entity appears in your graph immediately.',
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

  alwaysUse: [
    'insights', 'connections', 'intelligence', 'clarity', 'spectrum',
    'discover', 'surface', 'reveal', 'illuminate',
    'empower', 'unlock', 'transform', 'enable', 'compose', 'build',
    'transparent', 'traceable', 'auditable', 'provenance', 'private', 'secure',
    'trustworthy', 'verified', 'attributed', 'sourced', 'grounded',
    'evolve', 'grow', 'compound', 'deepen', 'expand', 'adapt', 'emerge',
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
      correct: 'Every document you upload now automatically enriches your knowledge graph. Connections you never noticed start surfacing. The system gets sharper — your second month is better than your first.',
      incorrect: 'We are excited to announce the launch of our groundbreaking auto-extraction feature, a world-class breakthrough in knowledge management technology!',
      why: 'Shows what the user experiences, not what we built. Tech earns its place by explaining the magic.',
    },
    {
      context: 'Documentation',
      correct: 'To create a new entity, navigate to the graph view and click "+ Entity." Choose a type from your ontology, or create a new one. The entity appears in your graph immediately.',
      incorrect: 'Ready to add something to your graph? Just head over to the graph view and hit that "+ Entity" button! Pick a type that fits — or make a new one if nothing works. Easy!',
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
      correct: 'Think of your knowledge graph as a web of everything your team knows. When you upload a document, Spectrea reads it and adds what it learns to this web — connecting it to things you\'ve already captured.',
      incorrect: 'The knowledge graph ingestion pipeline processes uploaded documents through a 6-phase extraction workflow: parse, chunk, embed, extract, review, and graph integration.',
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
    { name: 'Graphite', hex: '#1F2937', role: 'primary' },
    { name: 'Cobalt', hex: '#3451E0', role: 'accent' },
    { name: 'Teal', hex: '#12B5A3', role: 'accent' },
    { name: 'Amber', hex: '#E58D08', role: 'accent' },
    { name: 'Rose', hex: '#F43F5E', role: 'accent' },
    { name: 'White', hex: '#FFFFFF', role: 'background' },
    { name: 'Snow', hex: '#F9FAFB', role: 'surface' },
    { name: 'Ink', hex: '#111827', role: 'text' },
    { name: 'Gray', hex: '#9CA3AF', role: 'muted' },
  ],
  gradient: { from: '#3451E0', via: '#12B5A3', to: '#E58D08', angle: 135 },
  darkMode: { bg: '#111827', surface: '#1F2937', text: '#F9FAFB', muted: '#6B7280' },
}

// Keep finalists for reference in the explorer
export const paletteFinalists: PaletteOption[] = [selectedPalette]

export const paletteOptions: PaletteOption[] = [
  {
    id: 'warm-depth',
    name: 'Warm Depth',
    story: 'Inspired by rich wood libraries and golden-hour light. Knowledge has weight and warmth here — like opening a book that already knows your name.',
    feeling: 'Inviting, wise, established. A mentor\'s study.',
    colors: [
      { name: 'Ink', hex: '#1C1917', role: 'primary' },
      { name: 'Ember', hex: '#C2410C', role: 'accent' },
      { name: 'Honey', hex: '#D97706', role: 'accent' },
      { name: 'Stone', hex: '#78716C', role: 'secondary' },
      { name: 'Parchment', hex: '#FAFAF9', role: 'background' },
      { name: 'Linen', hex: '#F5F5F4', role: 'surface' },
      { name: 'Charcoal', hex: '#292524', role: 'text' },
      { name: 'Dusk', hex: '#A8A29E', role: 'muted' },
    ],
    gradient: { from: '#C2410C', to: '#D97706', angle: 135 },
    darkMode: { bg: '#1C1917', surface: '#292524', text: '#FAFAF9', muted: '#A8A29E' },
  },
  {
    id: 'deep-spectrum',
    name: 'Deep Spectrum',
    story: 'The brand name made visual. A deep, intelligent base that refracts into prismatic accents — indigo to teal to amber. Knowledge revealing its full range.',
    feeling: 'Multifaceted, intelligent, richly layered. A prism catching light.',
    colors: [
      { name: 'Midnight', hex: '#1E1B4B', role: 'primary' },
      { name: 'Iris', hex: '#6366F1', role: 'accent' },
      { name: 'Teal', hex: '#0D9488', role: 'accent' },
      { name: 'Marigold', hex: '#EAB308', role: 'accent' },
      { name: 'Frost', hex: '#F8FAFC', role: 'background' },
      { name: 'Lavender', hex: '#EEF2FF', role: 'surface' },
      { name: 'Deep Ink', hex: '#1E1B4B', role: 'text' },
      { name: 'Slate', hex: '#94A3B8', role: 'muted' },
    ],
    gradient: { from: '#6366F1', via: '#0D9488', to: '#EAB308', angle: 135 },
    darkMode: { bg: '#0F0D2E', surface: '#1E1B4B', text: '#E2E8F0', muted: '#64748B' },
  },
  {
    id: 'living-teal',
    name: 'Living Teal',
    story: 'The knowledge graph made tangible. Deep teal grounds the intelligence, warm terracotta adds humanity. An ecosystem that feels alive and growing.',
    feeling: 'Organic, evolving, trustworthy. A living system.',
    colors: [
      { name: 'Deep Teal', hex: '#134E4A', role: 'primary' },
      { name: 'Bright Teal', hex: '#14B8A6', role: 'accent' },
      { name: 'Terracotta', hex: '#C2410C', role: 'accent' },
      { name: 'Sage', hex: '#6B7280', role: 'secondary' },
      { name: 'Ivory', hex: '#FFFBEB', role: 'background' },
      { name: 'Cream', hex: '#FEF3C7', role: 'surface' },
      { name: 'Forest', hex: '#0F3D3A', role: 'text' },
      { name: 'Moss', hex: '#9CA3AF', role: 'muted' },
    ],
    gradient: { from: '#134E4A', to: '#14B8A6', angle: 135 },
    darkMode: { bg: '#0A2725', surface: '#134E4A', text: '#ECFDF5', muted: '#6EE7B7' },
  },
  {
    id: 'refined-indigo',
    name: 'Refined Indigo',
    story: 'Intelligence refined to its essence. A sophisticated indigo anchors the brand, warmed by amber moments. Like Stripe meets Notion — premium but human.',
    feeling: 'Sophisticated, warm, trustworthy. A well-tailored suit with an unexpected lining.',
    colors: [
      { name: 'Indigo', hex: '#3730A3', role: 'primary' },
      { name: 'Bright Indigo', hex: '#6366F1', role: 'accent' },
      { name: 'Amber', hex: '#F59E0B', role: 'accent' },
      { name: 'Warm Gray', hex: '#6B7280', role: 'secondary' },
      { name: 'Snow', hex: '#FEFCE8', role: 'background' },
      { name: 'Pearl', hex: '#FEF9C3', role: 'surface' },
      { name: 'Onyx', hex: '#1E1B4B', role: 'text' },
      { name: 'Pewter', hex: '#9CA3AF', role: 'muted' },
    ],
    gradient: { from: '#3730A3', via: '#6366F1', to: '#F59E0B', angle: 135 },
    darkMode: { bg: '#1E1B4B', surface: '#312E81', text: '#EEF2FF', muted: '#818CF8' },
  },
  {
    id: 'copper-night',
    name: 'Copper & Night',
    story: 'Knowledge forged in fire. A dark, contemplative canvas with warm copper highlights — every accent feels earned, intentional. Insights that glow.',
    feeling: 'Premium, considered, authoritative. A dark room with warm light.',
    colors: [
      { name: 'Night', hex: '#18181B', role: 'primary' },
      { name: 'Copper', hex: '#EA580C', role: 'accent' },
      { name: 'Bronze', hex: '#B45309', role: 'accent' },
      { name: 'Zinc', hex: '#71717A', role: 'secondary' },
      { name: 'Warm White', hex: '#FAFAF9', role: 'background' },
      { name: 'Ash', hex: '#F4F4F5', role: 'surface' },
      { name: 'Carbon', hex: '#18181B', role: 'text' },
      { name: 'Steel', hex: '#A1A1AA', role: 'muted' },
    ],
    gradient: { from: '#EA580C', to: '#B45309', angle: 135 },
    darkMode: { bg: '#09090B', surface: '#18181B', text: '#FAFAFA', muted: '#71717A' },
  },
  {
    id: 'sage-coral',
    name: 'Sage & Coral',
    story: 'Nature meets warmth. Muted sage grounds the experience while coral brings energy and humanity. Feels approachable without sacrificing depth.',
    feeling: 'Natural, approachable, modern. A sunlit workspace with plants.',
    colors: [
      { name: 'Sage', hex: '#3F6212', role: 'primary' },
      { name: 'Coral', hex: '#E11D48', role: 'accent' },
      { name: 'Lime', hex: '#84CC16', role: 'accent' },
      { name: 'Olive', hex: '#6B7280', role: 'secondary' },
      { name: 'Cotton', hex: '#FAFAF9', role: 'background' },
      { name: 'Mint', hex: '#F0FDF4', role: 'surface' },
      { name: 'Earth', hex: '#1A2E05', role: 'text' },
      { name: 'Fern', hex: '#9CA3AF', role: 'muted' },
    ],
    gradient: { from: '#3F6212', via: '#84CC16', to: '#E11D48', angle: 135 },
    darkMode: { bg: '#0A1F02', surface: '#1A2E05', text: '#ECFDF5', muted: '#86EFAC' },
  },
  {
    id: 'twilight',
    name: 'Twilight',
    story: 'The hour between day and night — when clarity meets contemplation. Deep purple and rose carry the Magician archetype: transformative, creative, thoughtful.',
    feeling: 'Creative, contemplative, distinctive. A sunset over the city.',
    colors: [
      { name: 'Deep Purple', hex: '#581C87', role: 'primary' },
      { name: 'Rose', hex: '#E11D48', role: 'accent' },
      { name: 'Lavender', hex: '#A78BFA', role: 'accent' },
      { name: 'Mauve', hex: '#78716C', role: 'secondary' },
      { name: 'Blush', hex: '#FDF2F8', role: 'background' },
      { name: 'Petal', hex: '#FAE8FF', role: 'surface' },
      { name: 'Plum', hex: '#3B0764', role: 'text' },
      { name: 'Haze', hex: '#A1A1AA', role: 'muted' },
    ],
    gradient: { from: '#581C87', via: '#A78BFA', to: '#E11D48', angle: 135 },
    darkMode: { bg: '#1E0533', surface: '#3B0764', text: '#F5D0FE', muted: '#C084FC' },
  },
  {
    id: 'warm-blue',
    name: 'Warm Blue',
    story: 'Classic trust blue, done warmly. Avoids the cold corporate feel by pairing with warm neutrals and a golden accent. Professional without being sterile.',
    feeling: 'Trustworthy, professional, human. A warm handshake.',
    colors: [
      { name: 'Ocean', hex: '#1E40AF', role: 'primary' },
      { name: 'Sky', hex: '#3B82F6', role: 'accent' },
      { name: 'Gold', hex: '#D97706', role: 'accent' },
      { name: 'Warm Gray', hex: '#78716C', role: 'secondary' },
      { name: 'Cream', hex: '#FFFBEB', role: 'background' },
      { name: 'Cloud', hex: '#FEF3C7', role: 'surface' },
      { name: 'Navy', hex: '#1E3A5F', role: 'text' },
      { name: 'Fog', hex: '#9CA3AF', role: 'muted' },
    ],
    gradient: { from: '#1E40AF', via: '#3B82F6', to: '#D97706', angle: 135 },
    darkMode: { bg: '#0C1929', surface: '#1E3A5F', text: '#DBEAFE', muted: '#60A5FA' },
  },
  {
    id: 'clay',
    name: 'Clay & Slate',
    story: 'Earthy and honest. Terracotta clay paired with cool slate — the warmth of handmade craft meets the precision of engineered stone. Grounded and real.',
    feeling: 'Honest, tactile, artisan. A pottery studio meets an architect\'s desk.',
    colors: [
      { name: 'Slate', hex: '#334155', role: 'primary' },
      { name: 'Clay', hex: '#DC2626', role: 'accent' },
      { name: 'Sand', hex: '#D97706', role: 'accent' },
      { name: 'Graphite', hex: '#64748B', role: 'secondary' },
      { name: 'Bone', hex: '#FFF7ED', role: 'background' },
      { name: 'Sandstone', hex: '#FFEDD5', role: 'surface' },
      { name: 'Obsidian', hex: '#1E293B', role: 'text' },
      { name: 'Pebble', hex: '#94A3B8', role: 'muted' },
    ],
    gradient: { from: '#DC2626', via: '#D97706', to: '#334155', angle: 135 },
    darkMode: { bg: '#0F172A', surface: '#1E293B', text: '#F1F5F9', muted: '#64748B' },
  },
  {
    id: 'nordic',
    name: 'Nordic Light',
    story: 'Scandinavian clarity. Clean, airy, with deliberate moments of warmth. Intelligence expressed through restraint and precision, softened by golden-hour accents.',
    feeling: 'Clean, calm, intentional. A Helsinki design studio at dawn.',
    colors: [
      { name: 'Charcoal', hex: '#27272A', role: 'primary' },
      { name: 'Arctic Blue', hex: '#0EA5E9', role: 'accent' },
      { name: 'Sunrise', hex: '#F59E0B', role: 'accent' },
      { name: 'Cool Gray', hex: '#71717A', role: 'secondary' },
      { name: 'Snow', hex: '#FAFAFA', role: 'background' },
      { name: 'Frost', hex: '#F4F4F5', role: 'surface' },
      { name: 'Iron', hex: '#18181B', role: 'text' },
      { name: 'Silver', hex: '#A1A1AA', role: 'muted' },
    ],
    gradient: { from: '#0EA5E9', to: '#F59E0B', angle: 135 },
    darkMode: { bg: '#09090B', surface: '#18181B', text: '#FAFAFA', muted: '#71717A' },
  },
]
