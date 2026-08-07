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

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
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
  ratificationLedger,
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
  identity: {
    name: brand.name,
    pronunciation: brand.pronunciation,
    tagline: brand.tagline.statement,
    category: brand.positioning.category,
    categoryGuard: brand.positioning.categoryGuard,
    categoryRule,
    promise: brand.positioning.promise,
    fullShapeClaim: brand.positioning.fullShapeClaim,
    visualMetaphor: brand.visualMetaphor,
  },
  naming: {
    neverNames: naming.neverNames,
    ai: naming.aiNaming,
    companyProduct: naming.companyProduct,
  },
  vocabulary: {
    alwaysUse: voice.alwaysUse,
    neverUse: voice.neverUse,
    density: voice.vocabularyDensity,
    outcomeFirst: voice.outcomeFirst,
    contextShifts: voice.contextShifts,
    onRamp: brand.positioning.onRamp,
  },
  guardrails: {
    compoundingClaim: compoundingValue?.usageGuardrail ?? null,
    differentiators: brand.differentiatorGuardrail,
    antiValues: brand.antiValues,
  },
  color: {
    palette: selectedPalette.colors,
    gradient: selectedPalette.gradient,
    darkMode: selectedPalette.darkMode,
    washes: brandTokens.washes,
    lifts: brandTokens.lifts,
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
  logoConstraints: logo.constraints,
  logoLockup: logo.lockup,
  logoMarkGeometry: logo.markGeometry,
  accessibility,
  graphViz,
  trustCopy,
  executiveVoice,
  originStance,
  ratificationLedger,
}

/* ------------------------------------------------------------------ */
/* 2. brand-checklist.md — generation-time pre-flight                  */
/* ------------------------------------------------------------------ */

const toneLines = voice.toneSpectrum
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
- [ ] Privileged-word density: ${voice.vocabularyDensity}
- [ ] Outcome-first: ${voice.outcomeFirst}
- [ ] No totalizing claims — no "incomparably", no "infinite", no unbounded every/always sweeps. Claims stay bounded and mechanism-tied.
- [ ] Compounding claim: ${compoundingValue?.usageGuardrail ?? ''}
- [ ] Differentiation: ${brand.differentiatorGuardrail}
- [ ] Buyer surfaces: ${voice.contextShifts.buyer.detail}
- [ ] Product surfaces: ${voice.contextShifts.product.detail}
- [ ] AI naming: ${aiNamingLine}

## Step 3 — anti-values (never violated, any surface)

${antiValueLines}

## Step 4 — trust and legal surfaces

Use the approved masters verbatim (they are in /brand-contract.json under "trustCopy"): privacy, AI use, retention, enterprise readiness. ${trustCopy.counselNote}

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
- Outcome-first: ${voice.outcomeFirst}
- On-ramp: ${brand.positioning.onRamp.posture} Hero example: "${brand.positioning.onRamp.heroExample}" ${brand.positioning.onRamp.coinRule} Adopt: ${brand.positioning.onRamp.adopt.join(' · ')}. Avoid: ${brand.positioning.onRamp.avoid.join(' · ')}.
- Privileged words (max two per paragraph): ${voice.alwaysUse.join(', ')}. ${voice.vocabularyDensity}
- NEVER use these words: ${listNeverUse}.
- AI naming: ${aiNamingLine}
- Compounding claim: ${compoundingValue?.usageGuardrail ?? ''}
- Differentiation: ${brand.differentiatorGuardrail}
- Anti-values: ${brand.antiValues.map(a => a.never).join(' · ')}.
- Buyer surfaces: ${voice.contextShifts.buyer.detail}
- Product surfaces: ${voice.contextShifts.product.detail}
- Colours (only these): ${paletteLine}. Gradient ${gradientLine} — never on buttons, text, borders, or small icons.
- Typefaces: ${fonts}.
- Accessibility floor: ${accessibility.floor}. Contrast ≥ ${accessibility.contrast.normalText} normal text / ${accessibility.contrast.largeTextAndUI} large+UI. ${accessibility.contrast.tokens}
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
- **Full-shape claim (internal north-star, not hero copy):** ${brand.positioning.fullShapeClaim.statement}.
- **Voice formula:** ${voice.formula}
- **Never-use words:** ${listNeverUse}.
- **Density:** ${voice.vocabularyDensity}
- **Outcome-first:** ${voice.outcomeFirst}
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

Generating illustrations: use the full prompt template + acceptance checklist at [/illustration-prompt.md](/illustration-prompt.md) (published copy; source is docs/illustration-prompt.md in the repo).

## Live interactive pages (SPA — JavaScript-rendered)

NOTE: the routes below are client-rendered React routes; most AI crawlers cannot execute them. Use the Markdown/JSON documents in the load order above instead — they carry the same canonical content. Routes listed for humans and browser-capable agents:

${routeLines}
`

/* ------------------------------------------------------------------ */
/* Emit + sanity checks                                                */
/* ------------------------------------------------------------------ */

// Illustration prompt: source lives at docs/illustration-prompt.md; publish a
// headered copy so the deployed references (guide, llms, app) are not dead links.
const illustrationPrompt =
  `<!-- DO NOT EDIT — published copy of docs/illustration-prompt.md (the source); edit that file and run npm run generate:ai. ${HEADER} -->\n\n` +
  readFileSync(join(root, 'docs', 'illustration-prompt.md'), 'utf8')

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
if (failures.length) {
  console.error('generate-ai-formats FAILED:\n- ' + failures.join('\n- '))
  process.exit(1)
}

for (const [name, content] of outputs) {
  writeFileSync(join(outDir, name), content)
  console.log(`✓ public/${name} (${content.length.toLocaleString()} chars)`)
}
console.log(`Done — derived from brand.ts v${meta.version} (${meta.lastUpdated}), generated ${TODAY}.`)
