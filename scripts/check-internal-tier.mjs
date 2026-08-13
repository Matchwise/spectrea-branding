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
// KNOWN LIMIT, stated rather than papered over: public/brand-guide.pdf is not
// text-extracted here (no Node-native extractor without adding a dependency).
// It is covered by construction — generate-pdf.mjs prints exactly one markdown
// file, public/brand-guide.md, plus SVGs it inlines from public/, and all of
// those are scanned. The assertion below fails if that stops being true.
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
  console.log(`\n${cases.length} cases · ${failed} failed · ${probes.length} probes`)
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

// The PDF's coverage is by construction; assert the construction still holds.
const pdfGenerator = readFileSync(join(root, 'scripts', 'generate-pdf.mjs'), 'utf8')
if (!/mdPath\s*=\s*join\(root,\s*'public',\s*'brand-guide\.md'\)/.test(pdfGenerator)) {
  console.error(
    'check-internal-tier: generate-pdf.mjs no longer prints public/brand-guide.md alone.\n' +
      'The PDF was covered because its only text input was a file this gate scans. Re-establish that, ' +
      'or add real PDF text extraction here.'
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
    'PDF covered by construction via public/brand-guide.md.' +
    (verbose ? '\n  ' + probes.map(p => p.path).join('\n  ') : '')
)
