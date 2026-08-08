#!/usr/bin/env node
// ============================================================
// Spectrea hybrid guide generator (decision 2, ratified 2026-08-06)
//
// public/brand-guide.md is HYBRID: prose is hand-written; data-bearing
// sections (weights, sizes, hexes, ratios, clearspace) are generator-owned.
// Each generated region is fenced with markers:
//
//   <!-- generated:BLOCK-ID -->
//   ...content owned by this script...
//   <!-- /generated:BLOCK-ID -->
//
// This script rewrites ONLY the fenced regions from src/data/brand.ts (the
// canon, imported live via in-memory TypeScript transpile — no value is
// re-declared here). Everything outside the fences is left byte-untouched.
// A hand edit inside a fence is overwritten on the next run — that is the
// point: edit brand.ts, then `npm run generate:guide`.
//
// Run order matters: generate:guide must run BEFORE generate:pdf, because
// the PDF renders from brand-guide.md.
// ============================================================

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, dirname, basename, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const guidePath = join(root, 'public', 'brand-guide.md')

/** Transpile a dependency-free .ts data module in-memory and import it. */
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-guide-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const canon = await importTsModule(join(root, 'src', 'data', 'brand.ts'))
const { meta, brand, voice, brandTokens, accessibility, logo, selectedPalette } = canon

/** Canonical hex for a named palette colour. */
const hexOf = name => {
  const c = selectedPalette.colors.find(x => x.name === name)
  if (!c) throw new Error(`palette colour "${name}" not found in canon`)
  return c.hex
}

/* ---------------------------------------------------------------- */
/* Rendering helpers                                                 */
/* ---------------------------------------------------------------- */

// Table-cell example text: the guide wraps examples in *"…"*, so inner double
// quotes become single quotes and ASCII ellipses become the typographic one.
const mdExample = s => s.replace(/"/g, "'").replace(/\.\.\./g, '…')
// Trim a canon sentence's trailing period for "value." composition.
const noDot = s => s.replace(/\.$/, '')

/* ---------------------------------------------------------------- */
/* Block renderers — each returns the full text BETWEEN its markers  */
/* ---------------------------------------------------------------- */

const blocks = {
  'version-header': () =>
    `**Version:** ${meta.version} (${meta.lastUpdated}). Canonical data: \`src/data/brand.ts\` — this guide is a hybrid mirror: prose is hand-written; fenced data blocks are generated from canon (\`npm run generate:guide\`).`,

  'version-footer': () =>
    `*\`src/data/brand.ts\` is the canonical brand data (v${meta.version}, ${meta.lastUpdated}). The live app at [branding.spectrea.com](https://branding.spectrea.com/#/) renders it; this document, llms.txt, the PDF, and the generated assets are derived mirrors for offline and LLM-readable use. If surfaces ever disagree, brand.ts wins.*`,

  'tone-registers': () => {
    const rows = voice.toneExamples
      .map(t => `| **${t.context}** · ${t.tone} | *"${mdExample(t.correct)}"* | *"${mdExample(t.incorrect)}"* |`)
      .join('\n')
    return `| Context · Tone | Right | Wrong |\n|---|---|---|\n${rows}`
  },

  'logo-construction': () => {
    const g = logo.markGeometry
    const l = logo.lockup
    const c = logo.constraints
    return [
      `- **Spine:** ${g.segs.length} ${g.continuity}-continuous cubics fitted to the ${brand.typography.heading.family} ${l.wordmarkWeight} S medial axis, with a deliberate shallow storytelling tail. Authoritative coordinates: \`brand.ts\` \`logo.markGeometry\` (record: docs/brand-review-2026-08).`,
      `- **Dots:** ${c.dotCount} dots at i/${c.dotCount - 1} arc fractions of the spine, radius ${c.dotRadius.toFixed(3)} (native units; dot diameter : stroke width stays ${l.dotToStrokeRatio}). Grey (\`${c.primaryDotColor}\`) in the primary treatment.`,
      `- **Stroke:** width ${c.strokeWidth.toFixed(3)} (native units), round linecap. Cool Duet (Cobalt \`${hexOf('Cobalt')}\` → Teal \`${hexOf('Teal')}\`) in the static mark and in the gradient lockup's mark. In the lockup the rendered stroke equals the wordmark's stem: **${l.strokeEm}em**.`,
      `- **Trailing dots:** the last ${c.trailingDots} dots are left visually unconnected — the "about to connect" moment.`,
      `- **Lockup metrics (on ink, never bounding boxes):** mark ink height ${l.markInkHeightEm}em (= the real S glyph's ink), mark→text ink gap ${l.markTextInkGapEm}em (= S right side bearing + ${l.trackingEm}em tracking + p left side bearing), mark ink bottom at baseline + ${g.placement.inkBottomVsBaselineEm}em (the S's baseline overshoot). Wordmark: ${brand.typography.heading.family} **${l.wordmarkWeight}** at every size, ${l.trackingEm}em tracking.`,
      `- **Container:** ${g.viewBox}×${g.viewBox} construction viewBox. ${c.container}`,
      `- **Small sizes:** ${c.smallSizes}`,
    ].join('\n')
  },

  'clear-space': () =>
    `Minimum clear space around the lockup: ${logo.constraints.clearSpace} No other graphic element (text, border, background image) enters the clear-space box.`,

  'accent-states': () => {
    const L = brandTokens.buttonStates.light
    const D = brandTokens.buttonStates.dark
    const cap = k => k[0].toUpperCase() + k.slice(1)
    const accents = ['cobalt', 'teal', 'amber', 'rose']
    const lightLines = accents
      .map(a => `- ${cap(a)}: base \`${L[a].base}\`, hover \`${L[a].hover}\`, active \`${L[a].active}\`.`)
      .join('\n')
    const darkStates = accents
      .map(a => `${cap(a)} hover \`${D[a].hover}\` / active \`${D[a].active}\``)
      .join(' · ')
    return (
      `Hover/active states for each accent (light surfaces — darken on interaction):\n${lightLines}\n\n` +
      `Dark surfaces (resolved 2026-07-04) — same bases, states lighten instead: ${darkStates}. ${D.rule} ` +
      `Dark secondary: bg \`${D.secondary.bg}\`, hover \`${D.secondary.hover}\`, text Cloud \`${D.secondary.text}\`.`
    )
  },

  'washes-light': () => {
    const rows = brandTokens.washes.light
      .map(w => `| ${w.name} | \`${w.hex}\` | ${w.accent} | ${w.use} (text on wash: \`${w.textOn}\`) |`)
      .join('\n')
    return `| Name | Hex | Paired accent | Use |\n|---|---|---|---|\n${rows}\n\n${brandTokens.washes.darkTextRule}`
  },

  'washes-dark': () => {
    const rows = brandTokens.washes.dark
      .map(w => `| ${w.name} | \`${w.hex}\` | ${w.accent} | ${w.use} |`)
      .join('\n')
    return `| Name | Hex | Paired accent | Use |\n|---|---|---|---|\n${rows}`
  },

  lifts: () => {
    const rows = brandTokens.lifts
      .map(l => `| ${l.name} | \`${l.hex}\` | ${l.use}. |`)
      .join('\n')
    return `| Accent | Dark-lift | When |\n|---|---|---|\n${rows}`
  },

  'type-system': () => {
    const t = brand.typography
    return [
      `| Role | Family | Weights | Use |`,
      `|---|---|---|---|`,
      `| Headings | ${t.heading.family} | ${t.heading.weights.semibold} (Semibold — incl. the logo wordmark at every size), ${t.heading.weights.bold} (Bold — hero headlines only) | Page titles, section headings, card titles, stat values |`,
      `| Body | ${t.body.family} | ${Object.values(t.body.weights).join(', ')} | Body text, descriptions, form labels, nav items; ${t.body.weights.semibold} for overlines and small section labels (uppercase/tracked) |`,
      `| Code / metadata | ${t.mono.family} | ${t.mono.weights.regular} | Inline code, data values, entity types, provenance |`,
    ].join('\n')
  },

  'min-sizes': () => `**Minimum sizes.** ${brand.typography.minSizes}`,

  'type-scale': () => {
    const rows = brand.typography.scale
      .map(r => `| ${r.name} | ${r.px} px | ${r.lineHeight} | ${r.weight} | ${r.use} |`)
      .join('\n')
    return `| Size | Value | Line height | Weight | Use |\n|---|---|---|---|---|\n${rows}`
  },

  'responsive-scale': () => {
    const r = brand.typography.responsive
    const rows = r.rows.map(x => `- ${x.name}: ${x.desktop} / ${x.tablet} / ${x.mobile}`).join('\n')
    return `${r.note}:\n${rows}\n- ${r.unchanged.replace(/\.$/, '.')}`
  },

  accessibility: () => {
    const a = accessibility
    const entry = a.exceptionRegistry.entries[0]
    const entryLines = a.exceptionRegistry.entries
      .map(
        e =>
          `  - \`${e.name}\` (ratified ${e.ratified}): ${e.exception} **Measured — WCAG 2.x:** ${e.measured.wcag2x} **APCA:** ${e.measured.apca} **Rationale:** ${e.rationale} **Bounds:** ${e.bounds}`
      )
      .join('\n')
    return [
      `The floor is **${a.floor}** on every shipped surface.`,
      `- ${a.rules[0]}`,
      `- Contrast ratio minimum: ${a.contrast.normalText} for normal text, ${a.contrast.largeTextAndUI} for large/UI. ${noDot(a.contrast.tokens)} — see the Pewter allow/deny matrix in §5.`,
      `- WCAG 2.2 specifics: ${a.wcag22Criteria.map(noDot).join(' · ')}.`,
      `- ${a.rules[1]}`,
      `- ${a.rules[2]}`,
      `- **Measurement doctrine (adopted 2026-08-07):** ${a.measurement}`,
      `- **Exception registry** — deliberate, ratified departures from the floors; a sub-floor usage not listed here is a defect, not a style. ${entry ? `${a.exceptionRegistry.entries.length === 1 ? 'One entry' : `${a.exceptionRegistry.entries.length} entries`}:` : 'No entries.'}`,
      entryLines,
    ]
      .filter(Boolean)
      .join('\n')
  },

  'motion-durations': () => {
    const d = brandTokens.motion.durationsMs
    return [
      `- ${d.micro} ms — micro (hover tints, colour shifts)`,
      `- ${d.standard} ms — standard (UI transitions, dropdowns)`,
      `- ${d.comfortable} ms — comfortable (modals, slide-overs)`,
      `- ${d.deliberate} ms — deliberate (page transitions, choreographed sequences)`,
      `- ${d.arrival} ms — arrival (the Arrival signature primitive)`,
      `- ${d.formation} ms — formation (the Formation signature primitive)`,
      `- ${d.spectrumSweep} ms — spectrumSweep (the Spectrum sweep signature primitive)`,
    ].join('\n')
  },

  'motion-easing': () => {
    const e = brandTokens.motion.easings
    // Easing names derive from the canonical keys (easeOut → ease-out).
    const kebab = k => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
    const desc = k => e[k].use
      .replace(/^Default — /, 'default for ')
      .replace(/^Back/, 'for back')
      .replace(/^Arrival primitive — /, 'the Arrival primitive — ')
    const line = k => `- \`${kebab(k)}\` (\`${e[k].css}\`) — ${desc(k)}.`
    return [line('easeOut'), line('easeInOut'), line('elasticSettle'), `- Never use ${e.never}.`].join('\n')
  },

  'motion-philosophy': () => {
    const d = brandTokens.motion.durationsMs
    return `Purposeful, subtle, natural — and alive. Every animation answers "what does this help the user understand?" — if the answer is "nothing," remove it. Most interactive motion stays restrained (${d.standard}–${d.deliberate}ms hovers, focus, state changes). Three signature primitives below carry the brand's "alive, growing, compounding" claim — used purposefully, not decoratively.`
  },

  'signature-primitives': () => {
    const d = brandTokens.motion.durationsMs
    const e = brandTokens.motion.easings
    return [
      `**1. Arrival (${d.arrival}ms).** When something important enters the frame — a new card, a fresh result, an inserted item. Spec: scale from 0 with soft elastic settle (\`${e.elasticSettle.css}\`), then a brief radial pulse in a brand spectrum colour. Reads as "something just arrived and is alive."`,
      ``,
      `**2. Formation (${d.formation}ms).** When two things visibly connect — a line, a link, a relationship being shown. Spec: a curved stroke draws between two points with the spectrum gradient running along the line (\`stroke-dashoffset\` animation on an SVG path with a linear gradient stroke), then settles to its resting colour. Echoes the Bézier curve in the brand mark.`,
      ``,
      `**3. Spectrum sweep (${d.spectrumSweep}ms).** The brand's signature moment — used sparingly when something meaningful happens that deserves the brand's full voice. Spec: a thin gradient strip (4px tall, ~75% width of its container) traverses Cobalt → Teal → Amber → Rose with \`background-position\` animation across a 4× wide gradient, fading in at 15% and out at 85%. Spectrea's most distinctive motion. Reserve for moments that genuinely matter — overuse dilutes it.`,
    ].join('\n')
  },

  'logo-animation': () => {
    const a = logo.animation
    const p = a.phases
    return [
      `The connecting-dots loop is the logo's OWN canonical spec (\`logo.animation\`) — deliberately outside the UI motion tokens:`,
      `- Loop: ${a.loopSeconds} s, infinite. Phases of the timeline: draw to ${p.drawEnd}, hold to ${p.holdEnd}, dissolve to ${p.dissolveEnd}, then an empty beat until restart. The dissolving edge fades over ${a.trailingFadeFraction * 100}% of the path length.`,
      `- Easing: ${a.easing}`,
      `- Reduced motion: ${a.reducedMotion}`,
      `- Use: ${a.use}`,
    ].join('\n')
  },

  radii: () => {
    const rows = brandTokens.radii
      .map(r => `| ${r.token} | ${r.px} px | \`${r.tailwind}\` | ${r.use} |`)
      .join('\n')
    return `| Token | Value | Tailwind | Use |\n| --- | --- | --- | --- |\n${rows}`
  },

  spacing: () => {
    const s = brandTokens.spacing
    const rows = s.scale
      .map(r => `| ${r.token} | ${r.px} px | \`${r.tailwind}\` | ${r.use} |`)
      .join('\n')
    return `${s.baseUnit} px base unit. ${s.rule}\n\n| Token | Value | Tailwind | Use |\n| --- | --- | --- | --- |\n${rows}`
  },

  elevation: () => {
    const rows = brandTokens.elevation
      .map(e => `| ${e.level} | ${e.zIndex} | ${e.shadow === 'none' ? '—' : `\`${e.shadow}\``} | ${e.use} |`)
      .join('\n')
    return `| Level | z-index | Shadow | Use |\n| --- | --- | --- | --- |\n${rows}`
  },
}

/* ---------------------------------------------------------------- */
/* Marker replacement                                                */
/* ---------------------------------------------------------------- */

let guide = readFileSync(guidePath, 'utf8')
const seen = []

for (const [id, render] of Object.entries(blocks)) {
  const open = `<!-- generated:${id} -->`
  const close = `<!-- /generated:${id} -->`
  const openCount = guide.split(open).length - 1
  const closeCount = guide.split(close).length - 1
  if (openCount !== 1 || closeCount !== 1) {
    console.error(`✗ marker "${id}": expected exactly one open and one close (found ${openCount}/${closeCount})`)
    process.exitCode = 1
    continue
  }
  const start = guide.indexOf(open) + open.length
  const end = guide.indexOf(close)
  if (end < start) {
    console.error(`✗ marker "${id}": close marker precedes open marker`)
    process.exitCode = 1
    continue
  }
  guide = guide.slice(0, start) + '\n' + render() + '\n' + guide.slice(end)
  seen.push(id)
}

if (process.exitCode) {
  console.error('Guide NOT written — fix the markers above.')
  process.exit(process.exitCode)
}

writeFileSync(guidePath, guide)
console.log(`✓ public/brand-guide.md — ${seen.length} generated blocks rewritten from brand.ts v${meta.version} (${meta.lastUpdated})`)
