#!/usr/bin/env node
// ============================================================
// Spectrea AI-format generator
// Emits machine-consumable brand references DERIVED from src/data/brand.ts
// (and the SPA route list from src/data/navigation.ts). No brand constant is
// re-declared here: the TypeScript sources are transpiled in-memory with the
// TypeScript compiler API and imported, so every emitted value is read from
// the live canon. On any conflict between surfaces, brand.ts wins.
//
// Outputs (all into public/):
//   brand-contract.json   — hard machine constraints
//   brand-checklist.md    — generation-time pre-flight
//   brand-few-shots.md    — contrastive on/off-brand pairs
//   brand-agent-rules.md  — drop-in CLAUDE.md/AGENTS.md block
//   llms.txt              — generated router (source of truth, load order,
//                           SPA-route labeling)
// ============================================================

import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs'
import { join, dirname, basename, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const outDir = join(root, 'public')

/** Transpile a dependency-free .ts data module in-memory and import it. */
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-gen-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const {
  brand, voice, naming, brandTokens, accessibility, logo, graphViz,
  trustCopy, executiveVoice, originStance, meta, selectedPalette,
  colorSystem, components, ratificationLedger, retired, illustration,
  internalCanon,
} = await importTsModule(join(root, 'src', 'data', 'brand.ts'))
const { navigation } = await importTsModule(join(root, 'src', 'data', 'navigation.ts'))

const TODAY = new Date().toISOString().slice(0, 10)
const HEADER = `DO NOT EDIT — generated from src/data/brand.ts by scripts/generate-ai-formats.mjs (${TODAY})`
const MD_HEADER = `<!-- ${HEADER} -->`

// Derived lookups (no string keys beyond structural discovery)
const compoundingValue = brand.values.find(v => 'usageGuardrail' in v)
const listNever = naming.neverNames.join(' · ')
const listNeverUse = voice.neverUse.join(', ')
const paletteLine = selectedPalette.colors.map(c => `${c.name} ${c.hex} (${c.role})`).join(' · ')
const accents = selectedPalette.colors.filter(c => c.role === 'accent')
const neutrals = selectedPalette.colors.filter(c => c.role !== 'accent')
const g = selectedPalette.gradient
const gradientLine = `${g.from} → ${g.via ? g.via + ' → ' : ''}${g.to} at ${g.angle}°`
const lc = logo.constraints
const watermarkPct = `${Math.round(lc.watermarkMaxOpacity * 100)}%`
const fonts = `${brand.typography.heading.family} (headings) · ${brand.typography.body.family} (body) · ${brand.typography.mono.family} (code)`
const cg = brand.positioning.categoryGuard

// Palette-derived contrast figures are COMPUTED from the canon hexes
// (decision 30) — never stored. WCAG 2.x relative luminance.
const srgbLin = c => { const v = c / 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }
const relLum = hex => { const [r, gc, b] = [1, 3, 5].map(i => srgbLin(parseInt(hex.slice(i, i + 2), 16))); return 0.2126 * r + 0.7152 * gc + 0.0722 * b }
const wcagRatio = (a, b) => { const [hi, lo] = [relLum(a), relLum(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05) }
const ratioStr = r => `${r >= 10 ? r.toFixed(1) : r.toFixed(2)}:1`
const paletteHexOf = name => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour missing from canon: ${name}`)
  return c.hex
}
const tokenLadderLine = colorSystem.textHierarchy
  .map(t => {
    const r = wcagRatio(paletteHexOf(t.token), paletteHexOf('Canvas'))
    return `${t.token} ${ratioStr(r)}${r >= 7 ? ' (AAA)' : r >= 4.5 ? ' (AA)' : ' (supplementary only)'}`
  })
  .join(' · ')
const categoryRule = `The category noun is ${cg.exactNoun ? 'exactly ' : ''}"${brand.positioning.category}" (lowercase in running prose) — never a substitute: ${cg.badSubstitutions.map(s => `"${s}"`).join(', ')}.`
const aiNamingLine = `${naming.aiNaming.rule} ${naming.aiNaming.verbRule} Allowed verbs: ${naming.aiNaming.allowedVerbs.join(', ')}. Forbidden verbs: ${naming.aiNaming.forbiddenVerbs.join(', ')}.`

/* ------------------------------------------------------------------ */
/* 1. brand-contract.json — hard machine constraints                   */
/* ------------------------------------------------------------------ */

const contract = {
  _generated: HEADER,
  version: meta.version,
  lastUpdated: meta.lastUpdated,
  sourceOfTruth: meta.sourceOfTruth,
  changeProcess: meta.changeProcess,
  identity: {
    name: brand.name,
    pronunciation: brand.pronunciation,
    tagline: brand.tagline.statement,
    category: brand.positioning.category,
    categoryGuard: brand.positioning.categoryGuard,
    categoryRule,
    promise: brand.positioning.promise,
    // fullShapeClaim is internal-tier (internalCanon, 2026-08-13) — see
    // contract.internalCanon for the registry of withheld fields.
    visualMetaphor: brand.visualMetaphor,
  },
  naming: {
    neverNames: naming.neverNames,
    ai: naming.aiNaming,
    companyProduct: naming.companyProduct,
  },
  vocabulary: {
    formula: voice.formula,
    attentionRule: voice.attentionRule,
    alwaysUse: voice.alwaysUse,
    neverUse: voice.neverUse,
    density: voice.vocabularyDensity,
    heroOpen: voice.heroOpen,
    contextShifts: voice.contextShifts,
    onRamp: brand.positioning.onRamp,
  },
  guardrails: {
    compoundingClaim: compoundingValue?.usageGuardrail ?? null,
    // differentiatorGuardrail is internal-tier (internalCanon, 2026-08-13).
    antiValues: brand.antiValues,
  },
  color: {
    palette: selectedPalette.colors,
    gradient: selectedPalette.gradient,
    gradients: brandTokens.gradients,
    system: colorSystem,
    darkMode: selectedPalette.darkMode,
    washes: brandTokens.washes,
    lifts: brandTokens.lifts,
    accentText: brandTokens.accentText,
  },
  typography: brand.typography,
  tokens: {
    radii: brandTokens.radii,
    spacing: brandTokens.spacing,
    elevation: brandTokens.elevation,
    motion: brandTokens.motion,
    buttonStates: brandTokens.buttonStates,
    focusRing: brandTokens.focusRing,
  },
  components,
  logoConstraints: logo.constraints,
  logoLockup: logo.lockup,
  logoMarkGeometry: logo.markGeometry,
  logoAnimation: logo.animation,
  accessibility,
  graphViz,
  // Decision 36: agents generate imagery too. The DNA block plus the register
  // sentences are the whole instruction set — an agent with the contract can
  // render on-brand without reading the guide.
  illustration,
  // trustCopy is internal-tier (internalCanon, 2026-08-13): the masters are
  // counsel-gated and reach consumers via the internal hand-off, never via
  // this crawler-facing contract. The registry below states what is withheld.
  internalCanon,
  executiveVoice,
  originStance,
  ratificationLedger,
  // Decision 35b: canon's one history-keeping structure. Consumers' agents read
  // the contract, and a migration they cannot see is a migration they re-introduce.
  retired,
}

/* ------------------------------------------------------------------ */
/* 2. brand-checklist.md — generation-time pre-flight                  */
/* ------------------------------------------------------------------ */

const toneLines = voice.toneExamples
  .map(t => `- **${t.context}** → tone: ${t.tone}.`)
  .join('\n')
const surfaceLines = voice.surfacePatterns
  .map(s => `- **${s.surface}** → ${s.rule}`)
  .join('\n')
const antiValueLines = brand.antiValues
  .map(a => `- [ ] ${a.never} — ${a.because}`)
  .join('\n')

const checklist = `${MD_HEADER}
# ${brand.name} brand pre-flight checklist

Run this BEFORE generating any ${brand.name}-branded surface — copy, UI, slide, or image.
Canonical data: src/data/brand.ts (v${meta.version}, ${meta.lastUpdated}). Hard values: /brand-contract.json.

## Step 1 — classify the surface

Pick the closest context; it selects the tone and pattern you must match (examples in /brand-few-shots.md):

${toneLines}
${surfaceLines}
- **Founder/executive surface** (byline, talk, investor letter, interview) → see "Executive voice" below.

## Step 2 — universal checks (every surface)

- [ ] Category: ${categoryRule}
- [ ] The name is "${brand.name}" and never appears as: ${listNever}.
- [ ] None of the never-use words appear: ${listNeverUse}.
- [ ] Voice formula: ${voice.formula}
- [ ] Privileged-word density: ${voice.vocabularyDensity}
- [ ] Attention rule: ${voice.attentionRule}
- [ ] Hero open: ${voice.heroOpen}
- [ ] No totalizing claims — no "incomparably", no "infinite", no unbounded every/always sweeps. Claims stay bounded and mechanism-tied.
- [ ] Compounding claim: ${compoundingValue?.usageGuardrail ?? ''}
- [ ] Buyer surfaces: ${voice.contextShifts.buyer.detail}
- [ ] Product surfaces: ${voice.contextShifts.product.detail}
- [ ] AI naming: ${aiNamingLine}

## Step 3 — anti-values (never violated, any surface)

${antiValueLines}

## Step 4 — trust and legal surfaces

STOP: never author trust, security, or compliance claims freehand, and never place them on a public page without the counsel read. The approved masters (privacy, AI use, retention, enterprise readiness) are internal-tier and counsel-gated — request them through the internal brand hand-off (internal/ artefacts); they are deliberately absent from this site and its machine formats.

## Executive voice

${executiveVoice.rule}

Origin stance: ${originStance.rule}

## Design-surface quick gates

- [ ] Colours come only from the palette: ${paletteLine}.
- [ ] Spectrum accents are semantic, never decorative; the gradient (${gradientLine}) is never used for buttons, text colour, body backgrounds, borders, or small icons.
- [ ] Accessibility floor ${accessibility.floor}: contrast ≥ ${accessibility.contrast.normalText} normal text / ${accessibility.contrast.largeTextAndUI} large+UI. ${accessibility.pewterMatrix.principle} Allowed: ${accessibility.pewterMatrix.allowed.join(', ')}. Denied: ${accessibility.pewterMatrix.denied}
- [ ] Logo: exactly ${lc.dotCount} dots, ${lc.lockupForms} lockup forms, primary dots ${lc.primaryDotColor}, ${lc.container} Clear space: ${lc.clearSpace} Watermark opacity ≤ ${watermarkPct}.
- [ ] Typography: ${fonts}.
`

/* ------------------------------------------------------------------ */
/* 3. brand-few-shots.md — contrastive on/off-brand pairs              */
/* ------------------------------------------------------------------ */

const toneShots = voice.toneExamples
  .map(t => `### ${t.context}

✅ **On-brand:** ${t.correct}

❌ **Off-brand:** ${t.incorrect}

*Why:* ${t.why}`)
  .join('\n\n')

const surfaceShots = voice.surfacePatterns
  .map(s => `### ${s.surface}

*Rule:* ${s.rule}

✅ **On-brand:** ${s.correct}

❌ **Off-brand:** ${s.incorrect}`)
  .join('\n\n')

const fewShots = `${MD_HEADER}
# ${brand.name} few-shots — on-brand vs off-brand

Contrastive pairs derived from the canonical voice data (voice.toneExamples and
voice.surfacePatterns in src/data/brand.ts, v${meta.version}). Use these as few-shot
examples when generating ${brand.name} copy: match the register of the ✅ versions.
Voice formula: ${voice.formula}

## Tone spectrum

${toneShots}

## Surface patterns

${surfaceShots}
`

/* ------------------------------------------------------------------ */
/* 4. brand-agent-rules.md — drop-in CLAUDE.md/AGENTS.md block         */
/* ------------------------------------------------------------------ */

const agentRules = `${MD_HEADER}
# ${brand.name} brand rules — agent drop-in

Copy the block below into a repo's CLAUDE.md / AGENTS.md (or a system prompt)
whenever that repo produces ${brand.name}-branded output. Do not hand-edit the block —
it is regenerated from src/data/brand.ts.

---

## ${brand.name} brand rules (generated ${TODAY}, brand.ts v${meta.version})

- Product: **${brand.name}** (${brand.pronunciation}). Tagline: "${brand.tagline.statement}". Category: **${brand.positioning.category}**. ${categoryRule}
- Company vs product: ${naming.companyProduct.rule}
- Never write the name as: ${listNever}.
- Voice formula: ${voice.formula} ${voice.techDescription}
- Attention rule: ${voice.attentionRule}
- Hero open: ${voice.heroOpen}
- On-ramp: ${brand.positioning.onRamp.posture} Hero example: "${brand.positioning.onRamp.heroExample}" ${brand.positioning.onRamp.coinRule} Adopt: ${brand.positioning.onRamp.adopt.join(' · ')}. Avoid: ${brand.positioning.onRamp.avoid.join(' · ')}.
- Coined-frame worked example — RIGHT: "${brand.positioning.onRamp.osFrameExample.right}" WRONG: "${brand.positioning.onRamp.osFrameExample.wrong}" Why: ${brand.positioning.onRamp.osFrameExample.why}
- Privileged words (max two per paragraph): ${voice.alwaysUse.join(', ')}. ${voice.vocabularyDensity}
- NEVER use these words: ${listNeverUse}.
- AI naming: ${aiNamingLine}
- Compounding claim: ${compoundingValue?.usageGuardrail ?? ''}
- Anti-values: ${brand.antiValues.map(a => a.never).join(' · ')}.
- Buyer surfaces: ${voice.contextShifts.buyer.detail}
- Product surfaces: ${voice.contextShifts.product.detail}
- Colours (only these): ${paletteLine}. Gradient ${gradientLine} — never on buttons, text, borders, or small icons.
- Typefaces: ${fonts}.
- Accessibility floor: ${accessibility.floor}. Contrast ≥ ${accessibility.contrast.normalText} normal text / ${accessibility.contrast.largeTextAndUI} large+UI. On Canvas (computed): ${tokenLadderLine}.
- Logo: exactly ${lc.dotCount} dots; ${lc.lockupForms} lockup forms; primary dots ${lc.primaryDotColor}; ${lc.container} Clear space: ${lc.clearSpace} Watermark ≤ ${watermarkPct} opacity.
- Governance: brand decisions live in the ratification ledger (ratificationLedger in brand.ts; mirrored in /brand-contract.json). A decision recorded only in a consumer repo's AGENTS.md is not canon until it lands in the ledger.
- Full machine data: /brand-contract.json · full guide: /brand-guide.md. Both are derived mirrors of src/data/brand.ts — on any conflict, brand.ts wins.
`

/* ------------------------------------------------------------------ */
/* 5. llms.txt — generated router                                      */
/* ------------------------------------------------------------------ */

const routeLines = navigation
  .map(item => {
    const children = (item.children ?? [])
      .map(c => `  - [${c.label}](${c.path})`)
      .join('\n')
    return `- [${item.label}](${item.path})${children ? '\n' + children : ''}`
  })
  .join('\n')

const llms = `${MD_HEADER}
# ${brand.name} Brand Guide

> ${brand.positioning.category} — ${brand.positioning.promise.toLowerCase()}. This file is a generated ROUTER: it tells an AI tool which brand document to load, and in which order. Every document below derives from the same canonical data.

**Source of truth:** ${meta.sourceOfTruth} (v${meta.version}, ${meta.lastUpdated})

## Load order (for AI tools)

1. [Brand contract (JSON)](/brand-contract.json): hard machine constraints — names, category noun, banned terms, palette hexes, design tokens, logo numerics, guardrails.
2. [Pre-flight checklist](/brand-checklist.md): classify your surface, then run its checks before generating anything.
3. [Few-shots](/brand-few-shots.md): contrastive on/off-brand pairs — match the on-brand register.
4. [Agent rules block](/brand-agent-rules.md): drop-in CLAUDE.md/AGENTS.md block for repos that produce ${brand.name}-branded output.
5. [Full brand guide (Markdown)](/brand-guide.md): the complete narrative system — foundation, voice, naming, logo, colour, gradients, typography, iconography, illustration, motion, components, communications, governance.
6. [Full brand guide (PDF)](/brand-guide.pdf): print/offline mirror of the same content.

## Hard key facts

- **Name:** ${brand.name} (${brand.pronunciation}) — never: ${listNever}.
- **Category:** ${categoryRule}
- **Tagline:** "${brand.tagline.statement}"
- **Promise:** ${brand.positioning.promise}.
- **Voice formula:** ${voice.formula}
- **Attention rule:** ${voice.attentionRule}
- **Never-use words:** ${listNeverUse}.
- **Density:** ${voice.vocabularyDensity}
- **Hero open:** ${voice.heroOpen}
- **On-ramp:** ${brand.positioning.onRamp.posture} Hero example: "${brand.positioning.onRamp.heroExample}"
- **Anti-values:** ${brand.antiValues.map(a => a.never).join(' · ')}.
- **AI naming:** ${aiNamingLine}
- **Compounding claim guardrail:** ${compoundingValue?.usageGuardrail ?? ''}
- **Spectrum accents:** ${accents.map(c => `${c.name} ${c.hex}`).join(' · ')}.
- **Warm Blend neutrals:** ${neutrals.map(c => `${c.name} ${c.hex} (${c.role})`).join(' · ')}.
- **Dark mode tokens:** bg ${selectedPalette.darkMode.bg} · surface ${selectedPalette.darkMode.surface} · text ${selectedPalette.darkMode.text} · muted ${selectedPalette.darkMode.muted} · border ${selectedPalette.darkMode.border}.
- **Gradient:** ${gradientLine} — never for buttons, text colour, body backgrounds, borders, or small icons.
- **Logo constraints:** exactly ${lc.dotCount} dots (radius ${lc.dotRadius}, stroke ${lc.strokeWidth}); ${lc.lockupForms} lockup forms; primary dots ${lc.primaryDotColor}; ${lc.container} Clear space: ${lc.clearSpace} Watermark ≤ ${watermarkPct} opacity. Co-brand: ${lc.coBrand}
- **Typefaces:** ${fonts}.
- **Accessibility floor:** ${accessibility.floor} (contrast ≥ ${accessibility.contrast.normalText} normal / ${accessibility.contrast.largeTextAndUI} large+UI).
- **Personality:** ${brand.personality.map(p => p.trait).join(' · ')} (${brand.personality.length} traits, each with a guardrail).

## Visual assets

Standalone SVGs live in /brand-assets/ (regenerated by "npm run generate:assets"); core files: logo-mark-cool.svg, logo-lockup-gradient.svg, logo-lockup-ink.svg, logo-lockup-white.svg, swatches-spectrum.svg, swatches-neutrals.svg, type-scale.svg.

Generating illustrations: use the DNA block and register sentences at [/illustration-prompt.md](/illustration-prompt.md) (generated from brand.ts — the same doctrine is in this contract under "illustration").

## Live interactive pages (SPA — JavaScript-rendered)

NOTE: the routes below are client-rendered React routes; most AI crawlers cannot execute them. Use the Markdown/JSON documents in the load order above instead — they carry the same canonical content. Routes listed for humans and browser-capable agents:

${routeLines}
`

/* ------------------------------------------------------------------ */
/* Emit + sanity checks                                                */
/* ------------------------------------------------------------------ */

// Illustration prompt (decision 36): COMPOSED FROM CANON. It used to be a
// hand-maintained doc copied verbatim — a second source of truth for the one
// artifact most likely to drift, since every generated image starts from it.
const illustrationPrompt = `${MD_HEADER}

# Spectrea illustration prompt

${illustration.doctrine}

## The DNA block

Fill the four slots; change nothing else.

\`\`\`
${illustration.dnaPrompt}
\`\`\`

${Object.entries(illustration.promptSlots).map(([slot, rule]) => `- **[${slot}]** — ${rule}`).join('\n')}

${illustration.promptNote}

## Registers — pick one sentence for [REGISTER]

${illustration.registers.map(r => `- **${r.id}** (${r.job}) — "${r.sentence}"`).join('\n')}

${illustration.registerDerivation}

## What may vary, and how far

${illustration.ranges.map(r => `- **${r.axis}** — ${r.range} Default: ${r.default} Out of range: ${r.outOfRange} (judged by ${r.judgedBy}${'note' in r && r.note ? `; ${r.note}` : ''})`).join('\n')}

## Media

- **Generated raster** — ${illustration.media.raster}
- **Hand-authored SVG** — ${illustration.media.vector}
- **Choosing** — ${illustration.media.choosing}

## Reference images

${illustration.reference.doctrine}

${illustration.reference.modes.map(m => `- **${m.id}** — ${m.when}: ${m.effect}`).join('\n')}

## Measurement

${illustration.checklist.stance} Reported: ${illustration.checklist.reports.join(' · ')}.

${illustration.checklist.why}

## Never

${illustration.antiPatterns.map(a => `- **${a.never}** — ${a.because}`).join('\n')}
`

const outputs = [
  ['brand-contract.json', JSON.stringify(contract, null, 2) + '\n'],
  ['brand-checklist.md', checklist],
  ['brand-few-shots.md', fewShots],
  ['brand-agent-rules.md', agentRules],
  ['llms.txt', llms],
  ['illustration-prompt.md', illustrationPrompt],
]

const failures = []
if (contract.vocabulary.neverUse.length !== voice.neverUse.length) failures.push('contract neverUse length mismatch')
if (!llms.includes(meta.sourceOfTruth)) failures.push('llms.txt missing sourceOfTruth stanza')
if (!compoundingValue) failures.push('compounding usageGuardrail not found in brand.values')
for (const [name, content] of outputs) {
  if (!content.includes(HEADER)) failures.push(`${name} missing DO-NOT-EDIT header`)
}
// Internal-tier enforcement (internalCanon, 2026-08-13): a public artefact
// carrying an internal field's text is a build defect, not a style. Each
// probe is a distinctive substring of one internal field.
const internalProbes = [
  ['trustCopy.privacy', trustCopy.privacy.slice(0, 60)],
  ['trustCopy.retention', trustCopy.retention.slice(0, 60)],
  ['trustCopy.enterpriseReadiness', trustCopy.enterpriseReadiness.slice(0, 60)],
  ['fullShapeClaim', brand.positioning.fullShapeClaim.statement],
  ['differentiatorGuardrail', brand.differentiatorGuardrail.slice(0, 60)],
  ['audienceMechanics', 'bounded invites stay free'],
  ...brand.antiBrands.map(b => [`antiBrands (${b})`, b]),
]
for (const [name, content] of outputs) {
  for (const [field, probe] of internalProbes) {
    if (content.includes(probe)) failures.push(`${name} leaks internal-tier field ${field}`)
  }
}
if (failures.length) {
  console.error('generate-ai-formats FAILED:\n- ' + failures.join('\n- '))
  process.exit(1)
}

for (const [name, content] of outputs) {
  writeFileSync(join(outDir, name), content)
  console.log(`✓ public/${name} (${content.length.toLocaleString()} chars)`)
}

/* ------------------------------------------------------------------ */
/* Internal tier (internalCanon, ratified 2026-08-13): the registered  */
/* fields render here and nowhere else. internal/ is git-ignored —     */
/* consumers vendor generated files, not brand.ts, so this is how the  */
/* private repos receive the fields, by local hand-off.                */
/* ------------------------------------------------------------------ */

const INTERNAL_HEADER = `DO NOT PUBLISH — internal-tier brand canon (internalCanon, ${meta.version}). Generated from src/data/brand.ts by scripts/generate-ai-formats.mjs (${TODAY}). Hand off locally to consumer repos; never commit to a public tree or paste on a public surface.`

const internalPayload = {
  $header: INTERNAL_HEADER,
  version: meta.version,
  lastUpdated: meta.lastUpdated,
  generated: TODAY,
  registry: { rule: internalCanon.rule, fields: internalCanon.fields },
  trustCopy,
  positioning: { fullShapeClaim: brand.positioning.fullShapeClaim },
  differentiatorGuardrail: brand.differentiatorGuardrail,
  antiBrands: brand.antiBrands,
  audienceMechanics: brand.audienceMechanics,
}

const internalMd = `<!-- ${INTERNAL_HEADER} -->

# Spectrea — internal-tier brand canon

Canon v${meta.version} (${meta.lastUpdated}) · generated ${TODAY}

${internalCanon.rule}

Public surfaces carry the identity system; these fields carry claims, competitive instruction, and packaging mechanics. They are internal-tier because they either need a counsel read before they are said in public, or they are instructions to us rather than statements to a reader.

## Trust & disclosure masters

**Counsel note.** ${trustCopy.counselNote}

### Privacy

${trustCopy.privacy}

### AI use

${trustCopy.aiUse}

### Retention & export

${trustCopy.retention}

### Enterprise readiness

${trustCopy.enterpriseReadiness}

## Full-shape claim

**${brand.positioning.fullShapeClaim.statement}**

${brand.positioning.fullShapeClaim.usage}

## Differentiator guardrail

${brand.differentiatorGuardrail}

## Anti-brands

${brand.antiBrands.map(b => `- ${b}`).join('\n')}

A design device — don't look or sound like this — never a public statement about the named companies. The public surfaces say it as a pattern instead: "${brand.antiPatternsPublic}"

## Audience mechanics

${brand.audienceMechanics}

The public promise is the half that ships: "${brand.audienceBreadth}"
`

const internalDir = join(root, 'internal')
mkdirSync(internalDir, { recursive: true })
for (const [name, content] of [
  ['brand-internal.json', JSON.stringify(internalPayload, null, 2) + '\n'],
  ['brand-internal.md', internalMd],
]) {
  writeFileSync(join(internalDir, name), content)
  console.log(`✓ internal/${name} (${content.length.toLocaleString()} chars) — git-ignored, hand-off only`)
}

/* ------------------------------------------------------------------ */
/* Version sync (D22, ratified 2026-08-09): package.json (and the lock */
/* file's root entries) carry meta.version — the repo has exactly one  */
/* version, canon's. Formatting is preserved by JSON round-trip with   */
/* the files' own 2-space indent and trailing newline.                 */
/* ------------------------------------------------------------------ */

for (const rel of ['package.json', 'package-lock.json']) {
  const path = join(root, rel)
  const pkg = JSON.parse(readFileSync(path, 'utf8'))
  const rootEntry = pkg.packages?.['']
  if (pkg.version !== meta.version || (rootEntry && rootEntry.version !== meta.version)) {
    const from = pkg.version
    pkg.version = meta.version
    if (rootEntry) rootEntry.version = meta.version
    writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n')
    console.log(`✓ ${rel} version ${from} → ${meta.version} (synced to canon)`)
  }
}

console.log(`Done — derived from brand.ts v${meta.version} (${meta.lastUpdated}), generated ${TODAY}.`)
