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
//   node scripts/check-internal-tier.mjs [--verbose]
//
// Scope: every text artefact under public/ and src/ plus index.html and
// README.md. src/data/brand.ts is EXEMPT — canon is the sanctioned home for
// these fields, and the tier removes rendered surfaces, not the source text.
// public/brand-guide.pdf is derived from public/brand-guide.md, which is
// scanned; the PDF carries no text the markdown lacks.
// ============================================================

import { readFileSync, readdirSync, statSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, resolve, relative, extname, basename } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const root = resolve(__dirname, '..')
const verbose = process.argv.includes('--verbose')

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

const { brand, trustCopy, internalCanon } = await importTsModule(join(root, 'src', 'data', 'brand.ts'))

// Case, whitespace, and quote-shape all vary between a canon string and its
// quotation elsewhere; none of them make a leak less of a leak.
const norm = s =>
  s
    .toLowerCase()
    .replace(/[‘’“”]/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()

// One probe per registered field: a distinctive span of it, long enough that a
// match is the field and not an ordinary phrase. Keeping the registry and the
// probe list adjacent means adding a field to internalCanon without a probe
// fails loudly below rather than silently widening what may ship.
const probesByField = {
  trustCopy: [
    trustCopy.privacy.slice(0, 70),
    trustCopy.aiUse.slice(0, 70),
    trustCopy.retention.slice(0, 70),
    trustCopy.enterpriseReadiness.slice(0, 70),
    trustCopy.counselNote.slice(0, 70),
  ],
  'brand.positioning.fullShapeClaim': [
    brand.positioning.fullShapeClaim.statement,
    brand.positioning.fullShapeClaim.usage.slice(0, 70),
  ],
  'brand.differentiatorGuardrail': [brand.differentiatorGuardrail.slice(0, 70)],
  'brand.antiBrands': brand.antiBrands.map(String),
  'brand.audienceMechanics': [brand.audienceMechanics.slice(0, 70)],
}

const missing = internalCanon.fields.filter(f => !probesByField[f])
if (missing.length) {
  console.error(
    `check-internal-tier: internalCanon registers ${missing.join(', ')} with no probe. ` +
      'Add one here — an unprobed field is unenforced.'
  )
  process.exit(1)
}

// antiBrands probes are bare company names, so they only mean "leak" on a
// surface that speaks as the brand. Everywhere else — the pre-rename naming
// analysis, for one — naming a company is just naming a company.
const probes = internalCanon.fields.flatMap(field =>
  probesByField[field].map(text => ({
    field,
    probe: norm(text),
    brandSurfacesOnly: field === 'brand.antiBrands',
  }))
)

// --selftest: prove the gate catches the shape that got past the first
// version of it — the claim quoted mid-sentence, lowercased, inside a ledger
// entry — plus the plain and re-wrapped shapes. A gate nobody has watched fail
// is a gate nobody knows works.
if (process.argv.includes('--selftest')) {
  const claim = brand.positioning.fullShapeClaim.statement
  const cases = [
    ['lowercased mid-sentence in a ledger entry', `Full-shape claim "${claim.toLowerCase()}" adopted from vision.`, true],
    ['verbatim', claim, true],
    ['re-wrapped across lines', claim.replace(' ', '\n    '), true],
    ['trust master, first sentence', trustCopy.retention.slice(0, 70), true],
    ['a sentence that merely shares words', 'Compounding intelligence is collective work.', false],
  ]
  let failed = 0
  for (const [name, sample, shouldCatch] of cases) {
    const haystack = norm(sample)
    const caught = probes.some(p => haystack.includes(p.probe))
    const ok = caught === shouldCatch
    if (!ok) failed++
    console.log(`${ok ? 'ok   ' : 'FAIL '} ${name} — ${caught ? 'caught' : 'not caught'}`)
  }
  console.log(`\n${cases.length} cases · ${failed} failed`)
  process.exit(failed ? 1 : 0)
}

const TEXT_EXT = new Set(['.md', '.txt', '.json', '.mjs', '.js', '.ts', '.tsx', '.css', '.html'])
const EXEMPT = new Set([join(root, 'src', 'data', 'brand.ts')])
const SKIP_DIRS = new Set(['brand-assets', 'fonts', 'illustrations', 'node_modules'])

function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) {
      if (!SKIP_DIRS.has(name)) collect(path, out)
    } else if (TEXT_EXT.has(extname(name)) && !EXEMPT.has(path)) {
      out.push(path)
    }
  }
  return out
}

// Brand surfaces: what ships as Spectrea speaking. docs/ is the historical
// record — scanned too, because a public file quoting a trust master is a leak
// wherever it sits, but exempt from the bare-name probes above.
const brandSurfaces = [
  ...collect(join(root, 'public')),
  ...collect(join(root, 'src')),
  join(root, 'index.html'),
  join(root, 'README.md'),
]
const recordSurfaces = collect(join(root, 'docs'))
const files = [...brandSurfaces, ...recordSurfaces]
const brandSurfaceSet = new Set(brandSurfaces)

const leaks = []
for (const path of files) {
  const text = norm(readFileSync(path, 'utf8'))
  const isBrandSurface = brandSurfaceSet.has(path)
  for (const { field, probe, brandSurfacesOnly } of probes) {
    if (brandSurfacesOnly && !isBrandSurface) continue
    if (text.includes(probe)) leaks.push({ path: relative(root, path), field })
  }
}

if (leaks.length) {
  console.error('INTERNAL-TIER LEAK — these public artefacts carry a field registered in internalCanon:')
  for (const { path, field } of leaks) console.error(`  ${path} — ${field}`)
  console.error('\nFix the source the artefact is generated from (canon, hand prose, or a component), then regenerate.')
  process.exit(1)
}

console.log(
  `Internal-tier gate passed: ${probes.length} probes over ${internalCanon.fields.length} registered fields, ` +
    `${files.length} public text artefacts clean.${verbose ? '\n  ' + internalCanon.fields.join('\n  ') : ''}`
)
