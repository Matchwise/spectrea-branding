#!/usr/bin/env node
// ============================================================
// Internal-tier leak gate (internalCanon, ratified 2026-08-13)
//
// The generators each guard their own outputs, but a field can reach a public
// surface by a path no single generator owns — quoted inside a ledger entry,
// paraphrased into hand prose in the guide, or typed into a page component.
// That is exactly how it happened: the full-shape claim survived LOWERCASED
// inside a 2026-07-19 ledger entry and rode brand-contract.json onto the site
// (caught by the fix-wave gate, 2026-08-13). So this gate runs LAST, over the
// artefacts as they will actually ship, and normalizes before comparing.
//
//   node scripts/check-internal-tier.mjs [--include-dist] [--selftest] [--verbose]
//
// Scope: every text-bearing artefact under public/ (SVG included — an SVG is
// text and brand-assets/ is full of them), src/, docs/, plus index.html and
// README.md. With --include-dist, the built bundle too: CI runs that pass
// AFTER the build, because a component can reference a canon value that this
// scan exempts at source and put it in the bundle after every earlier gate.
//
// Exempt: src/data/brand.ts — canon is the sanctioned home for these fields,
// and the tier removes rendered surfaces, not the source text.
//
// The PDF is not text-extracted here (no Node-native extractor without a new
// dependency). It does not need to be: generate-pdf.mjs runs these same probes
// over the exact HTML string it hands the renderer, so every printable source
// is checked — including ones a later edit adds. The check below fails if that
// print-time gate is ever unwired.
// ============================================================

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, resolve, relative, extname, basename } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'
import { buildInternalProbes, norm } from './internal-tier-probes.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, '..')
const verbose = process.argv.includes('--verbose')
const includeDist = process.argv.includes('--include-dist')

/** Transpile a dependency-free .ts data module in-memory and import it. */
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-tier-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const canon = await importTsModule(join(root, 'src', 'data', 'brand.ts'))
const { probes, unprobed } = buildInternalProbes(canon)

if (unprobed.length) {
  console.error('check-internal-tier: registered field with nothing to probe:\n  ' + unprobed.join('\n  '))
  console.error('An unprobed field is an unenforced field.')
  process.exit(1)
}

// --selftest: prove the gate catches the shapes it exists for — the claim
// quoted mid-sentence in lowercase inside a ledger entry (how it got past the
// first version), a trust master's opening, a re-wrapped string, and text
// carried in an SVG or a built bundle. A gate nobody has watched fail is a
// gate nobody knows works.
if (process.argv.includes('--selftest')) {
  const { brand, trustCopy } = canon
  const claim = brand.positioning.fullShapeClaim.statement
  const hit = sample => {
    const haystack = norm(sample)
    return probes.some(p => haystack.includes(p.probe))
  }
  const cases = [
    ['lowercased mid-sentence in a ledger entry', `Full-shape claim "${claim.toLowerCase()}" adopted from vision.`, true],
    ['claim verbatim', claim, true],
    ['claim re-wrapped across lines', claim.replace(' ', '\n    '), true],
    ['trustCopy.retention opening', trustCopy.retention.slice(0, 70), true],
    ['trustCopy.aiUse opening', trustCopy.aiUse.slice(0, 70), true],
    ['trustCopy.counselNote opening', trustCopy.counselNote.slice(0, 70), true],
    ['guardrail inside an SVG text node', `<text x="0">${brand.differentiatorGuardrail.slice(0, 80)}</text>`, true],
    ['master inside a minified bundle string', `const a="${trustCopy.privacy.slice(0, 90)}";`, true],
    // The print-time gate reads the assembled HTML, so a text source added to
    // the printed document — a footer, an inlined fragment, an appendix — is
    // checked whether or not anyone remembered to tell this scan about it.
    ['text added to the printed HTML', `<body><div class="footer">${trustCopy.enterpriseReadiness.slice(0, 80)}</div></body>`, true],
    ['a sentence that merely shares words', 'Compounding intelligence is collective work.', false],
    ['the public promise that replaced the mechanics', canon.brand.audienceBreadth, false],
  ]
  let failed = 0
  for (const [name, sample, shouldCatch] of cases) {
    const caught = hit(sample)
    const ok = caught === shouldCatch
    if (!ok) failed++
    console.log(`${ok ? 'ok   ' : 'FAIL '} ${name} — ${caught ? 'caught' : 'not caught'}`)
  }

  // Scoping regression: the historical-doc exemption belongs to antiBrands and
  // to nothing else. Keying it off probe length let "Jira" through and held
  // "Microsoft 365" back, from the same field (gate round 3).
  const exempt = probes.filter(p => p.brandSurfacesOnly)
  const antiBrandProbes = probes.filter(p => p.field === 'brand.antiBrands')
  const scopeOk =
    exempt.length === antiBrandProbes.length &&
    antiBrandProbes.every(p => p.brandSurfacesOnly) &&
    antiBrandProbes.length === brand.antiBrands.length
  if (!scopeOk) failed++
  console.log(
    `${scopeOk ? 'ok   ' : 'FAIL '} docs exemption covers every antiBrand and nothing else — ` +
      `${exempt.length} exempt, ${antiBrandProbes.length} antiBrand probes, ${brand.antiBrands.length} names`
  )

  // The print-time gate must actually be wired into generate-pdf.mjs; without
  // it, the "text added to the printed HTML" case above proves only that the
  // probes work, not that anything runs them on the printed document.
  const pdfSrc = readFileSync(join(root, 'scripts', 'generate-pdf.mjs'), 'utf8')
  const wired = /buildInternalProbes\(/.test(pdfSrc) && /norm\(html\)/.test(pdfSrc)
  if (!wired) failed++
  console.log(`${wired ? 'ok   ' : 'FAIL '} generate-pdf.mjs runs the probes over the HTML it prints`)

  console.log(`\n${cases.length + 2} cases · ${failed} failed · ${probes.length} probes`)
  process.exit(failed ? 1 : 0)
}

// SVG and XML are text: an asset with a <text> node is a public surface.
const TEXT_EXT = new Set([
  '.md', '.txt', '.json', '.mjs', '.js', '.ts', '.tsx', '.css', '.html', '.svg', '.xml',
])
const EXEMPT = new Set([join(root, 'src', 'data', 'brand.ts')])
const SKIP_DIRS = new Set(['node_modules'])

function collect(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(name)) collect(path, out)
    } else if (TEXT_EXT.has(extname(name).toLowerCase()) && !EXEMPT.has(path)) {
      out.push(path)
    }
  }
  return out
}

// The PDF is gated where it is built, not here: generate-pdf.mjs runs these
// same probes over the exact HTML string it hands Chrome. The previous version
// of this check asserted instead that the generator's markdown input was still
// a file this scan reads — which proved nothing about a SECOND printable
// source being added (gate round 3, 2026-08-13). What remains is a structural
// check that the print-time gate is still wired up.
const pdfGenerator = readFileSync(join(root, 'scripts', 'generate-pdf.mjs'), 'utf8')
const pdfGateWired =
  /from '\.\/internal-tier-probes\.mjs'/.test(pdfGenerator) &&
  /buildInternalProbes\(/.test(pdfGenerator) &&
  /norm\(html\)/.test(pdfGenerator)
if (!pdfGateWired) {
  console.error(
    'check-internal-tier: generate-pdf.mjs no longer runs the internal-tier probes over the HTML it prints.\n' +
      'This scan cannot read a PDF; the printed document is gated at print time. Re-wire it there.'
  )
  process.exit(1)
}

// Brand surfaces: what ships as Spectrea speaking. docs/ is the historical
// record — scanned too, because a public file quoting a trust master is a leak
// wherever it sits, but exempt from the bare-name probes.
const brandSurfaces = [
  ...collect(join(root, 'public')),
  ...collect(join(root, 'src')),
  join(root, 'index.html'),
  join(root, 'README.md'),
  ...(includeDist ? collect(join(root, 'dist')) : []),
]
const recordSurfaces = collect(join(root, 'docs'))
const files = [...brandSurfaces, ...recordSurfaces]
const brandSurfaceSet = new Set(brandSurfaces)

if (includeDist && !existsSync(join(root, 'dist'))) {
  console.error('check-internal-tier: --include-dist was passed but dist/ does not exist. Run npm run build first.')
  process.exit(1)
}

const leaks = []
for (const path of files) {
  const text = norm(readFileSync(path, 'utf8'))
  const isBrandSurface = brandSurfaceSet.has(path)
  for (const { field, path: fieldPath, probe, brandSurfacesOnly } of probes) {
    if (brandSurfacesOnly && !isBrandSurface) continue
    if (text.includes(probe)) leaks.push({ path: relative(root, path), field, fieldPath })
  }
}

if (leaks.length) {
  console.error('INTERNAL-TIER LEAK — these public artefacts carry a field registered in internalCanon:')
  for (const { path, fieldPath } of leaks) console.error(`  ${path} — ${fieldPath}`)
  console.error('\nFix the source the artefact is generated from (canon, hand prose, or a component), then regenerate.')
  process.exit(1)
}

console.log(
  `Internal-tier gate passed: ${probes.length} probes over ${canon.internalCanon.fields.length} registered fields, ` +
    `${files.length} text artefacts clean${includeDist ? ' (dist/ included)' : ''}; ` +
    'the printed guide is gated in generate-pdf.mjs, over the HTML it prints.' +
    (verbose ? '\n  ' + probes.map(p => p.path).join('\n  ') : '')
)
