#!/usr/bin/env node
// brand-conformance-ignore-file all — this file IS the rule table: it must name every retired form it teaches the checker to find
// ============================================================
// Spectrea conformance-checker generator
//
// Emits public/brand-conformance.mjs — a zero-dependency checker that consumer
// repos vendor alongside the brand snapshot and run in CI. Rules are read from
// src/data/brand.ts; the engine is scripts/conformance-engine.js. Output is
// header + `const RULES/RULES_META/COMPOUNDING` + engine source, concatenated.
//
// The design rule that matters: canon is prose written for humans, and prose
// does not become enforceable by being pattern-matched optimistically. Several
// canon entries carry a parenthetical, and those parentheticals are not one
// thing — "AI-powered (overused)" states a REASON (always a violation) while
// "leverage (as verb)" states a CONDITION no checker can evaluate. A few
// entries are not mechanically checkable at all. So every entry is classified
// EXPLICITLY below, and an entry this file has not classified is a build
// failure — never a silent pass. When canon grows, this generator stops and
// asks to be taught, which is the only way the checker keeps tracking canon.
// ============================================================

import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join, dirname, basename, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { tmpdir } from 'node:os'
import ts from 'typescript'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

/** Transpile a dependency-free .ts data module in-memory and import it. */
async function importTsModule(tsPath) {
  const source = readFileSync(tsPath, 'utf8')
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    fileName: basename(tsPath),
  })
  const dir = mkdtempSync(join(tmpdir(), 'spectrea-conformance-'))
  const file = join(dir, basename(tsPath).replace(/\.ts$/, '.mjs'))
  writeFileSync(file, outputText)
  try {
    return await import(pathToFileURL(file).href)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

const { brand, voice, naming, meta } = await importTsModule(join(root, 'src', 'data', 'brand.ts'))
const cg = brand.positioning.categoryGuard
const compoundingValue = brand.values.find((v) => 'usageGuardrail' in v)

const fail = (msg) => { throw new Error('[generate-conformance] ' + msg) }

/* ------------------------------------------------------------------ */
/* Classification tables — the taught knowledge                        */
/* ------------------------------------------------------------------ */

// How to read a parenthetical on a vocabulary.neverUse entry.
//   reason    — the parenthetical explains WHY; the phrase is always a violation.
//   condition — the parenthetical narrows WHEN; the checker reports, a human judges.
// Entries with no parenthetical need no row here: they are unconditional.
const NEVER_USE_QUALIFIERS = {
  'AI-powered': 'reason',
  leverage: 'condition',
  copilot: 'condition',
}

// naming.neverNames entries are hand-written prose, each a different shape, so
// each is classified in full. Keys must match canon byte-for-byte.
//   literals      — what to search for.
//   caseSensitive — casing IS the violation (all-caps styling, internal caps).
//   group         — which emitted rule it joins.
//   skip          — not mechanically checkable; requires a stated reason.
//   mergedInto    — canon says it twice; one pattern already covers it.
const NEVER_NAMES = {
  '"SpectreAI" (not the name)': {
    literals: ['SpectreAI'], caseSensitive: false, group: 'name-misspelling',
  },
  '"Spectre" / "Spectra" (different words — not the name)': {
    literals: ['Spectre', 'Spectra'], caseSensitive: false, group: 'name-confusion',
  },
  '"spectra" (missing the e — typo)': {
    mergedInto: 'name-confusion',
    reason: 'The case-insensitive "Spectra" pattern already matches this spelling.',
  },
  '"Spectrea AI" as the lead name (AI is not the brand)': {
    literals: ['Spectrea AI'], caseSensitive: false, group: 'name-conditional',
    condition: 'Only a violation where this leads the name; "Spectrea AI" inside a sentence about the assistant may be fine.',
  },
  '"SPECTREA" (all-caps styling)': {
    literals: ['SPECTREA'], caseSensitive: true, group: 'name-styling',
  },
  '"spectrea" lowercase in headings or prose (lowercase belongs to the logo wordmark treatment only)': {
    skip: true,
    reason: 'Lowercase "spectrea" is correct and unavoidable in package names, domains, import paths, repo names, CSS classes and URLs. A checker cannot tell prose from an identifier, and this rule would fire on nearly every line of a consumer repo. Left to human review.',
  },
  // Case-sensitive on purpose. Mid-sentence "the Spectrea graph" is CORRECT —
  // the article attaches to the following noun — and matching case-insensitively
  // reported that correct form as a violation. Capital "The" narrows to the
  // sentence-initial use, where the naming misuse actually lives. Whether the
  // remaining match is the bare name or a noun phrase is a grammatical judgement,
  // which is why this stays `review`.
  '"The Spectrea" (no article)': {
    literals: ['The Spectrea'], caseSensitive: true, group: 'name-conditional',
    condition: 'The article is wrong only before the BARE name ("The Spectrea is…"). "The Spectrea graph / platform" is correct — there the article belongs to the following noun.',
  },
  // Canon gives one example but states a CLASS. Matching only the example let
  // "SpeCtrea" through. Handled as a family instead: every casing of the name is
  // matched and the three canon sanctions are exempted, so any other casing is
  // caught without needing a literal per variant. `SPECTREA` is exempted here
  // because the all-caps entry above owns it — one finding, not two.
  'Random internal caps ("SpecTrea")': {
    family: 'name-casing', group: 'name-misspelling',
    allowed: ['Spectrea', 'spectrea', 'SPECTREA'],
  },
}

/** Every casing of a word, as a character class per letter. */
const anyCasing = (word) => word.split('').map((c) => '[' + c.toLowerCase() + c.toUpperCase() + ']').join('')

// categoryGuard.badSubstitutions mixes two kinds of entry, and treating them
// alike makes the checker useless: run undifferentiated against the product repo
// it produced 82 errors, 80 of them noise like "AI Assistant Capture Flow".
//   retired — the specific noun canon retired. Any occurrence is a violation.
//   generic — an ordinary category word that is only wrong AS Spectrea's
//             category noun. Spectrea really does have an AI assistant feature,
//             and "what is knowledge management" is a legitimate test query.
// Generic entries become `review`: a human reads a handful of lines and judges.
// That is the honest severity — the checker cannot tell "Spectrea is a business
// knowledge platform" from "tables required for the knowledge platform".
const BAD_SUBSTITUTION_KINDS = {
  'composable knowledge platform': 'retired',
  'knowledge platform': 'generic',
  'knowledge management': 'generic',
  'AI assistant': 'generic',
  'automation tool': 'generic',
}

// Same split for the assistant's forbidden verbs. "handles it for you" is a
// phrasing nobody writes by accident; "takes over" is ordinary English that
// appears in code comments about focus and event handling.
const AI_VERB_KINDS = {
  'handles it for you': 'specific',
  'takes over': 'generic',
}

// Mechanism words that satisfy guardrails.compoundingClaim.
//
// These are an operationalisation of canon prose, not a canon export, so they
// are the one place this generator can silently fork from canon: a reworded
// guardrail that still contained the three asserted words would leave a stale
// vocabulary in place. The defence is EXPECTED_GUARDRAIL below — the guardrail
// text is pinned byte-for-byte, so ANY rewrite fails the build and forces this
// list to be re-derived by a human who has read the new wording.
const MECHANISM_WORDS = ['provenance', 'per-viewer', 'closed loop']
const MECHANISM_EXTRA = ['feeds back', 'feeds outcomes', 'the graph', 'knowledge graph']
const MECHANISM_WINDOW = 400
const EXPECTED_GUARDRAIL =
  'Use "compounding intelligence" only with its defensible mechanism named — ' +
  'provenance, per-viewer access, and the closed loop that feeds outcomes back in. ' +
  'The phrase is contested in-market (noted 2026-07-03); the mechanism, not the ' +
  'slogan, carries the claim.'

// The claim phrase itself is derived from canon rather than typed here: it is
// the quoted subject of the guardrail.
const CLAIM_FROM_GUARDRAIL = /^Use "([^"]+)"/

/* ------------------------------------------------------------------ */
/* Pattern construction                                                */
/* ------------------------------------------------------------------ */

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const isWordChar = (ch) => /[A-Za-z0-9_]/.test(ch)

/**
 * One phrase → one regex fragment. Interior whitespace matches any run of
 * whitespace so a phrase wrapped across two lines of prose is still caught.
 * Word boundaries are added only where the phrase actually ends in a word
 * character, so "10x" and "AI-powered" behave.
 */
function fragment(phrase) {
  const body = phrase.trim().split(/\s+/).map(escapeRe).join('\\s+')
  const lead = isWordChar(phrase.trim()[0]) ? '\\b' : ''
  const tail = isWordChar(phrase.trim()[phrase.trim().length - 1]) ? '\\b' : ''
  return lead + body + tail
}

/** Longest-first alternation, so overlapping phrases report once, at the longest match. */
function patternFor(phrases, caseSensitive) {
  const ordered = [...phrases].sort((a, b) => b.length - a.length)
  return { source: '(?:' + ordered.map(fragment).join('|') + ')', flags: caseSensitive ? 'g' : 'gi' }
}

/* ------------------------------------------------------------------ */
/* Build the rules                                                     */
/* ------------------------------------------------------------------ */

const rules = []
const notChecked = []
const add = (rule) => { rules.push(rule) }

// ── 1. Category noun ─────────────────────────────────────────────────
// The escape that motivated this checker: the noun retired 2026-07-03 was
// still in a consumer's site-wide metadata a month later.
if (!Array.isArray(cg.badSubstitutions) || !cg.badSubstitutions.length) {
  fail('categoryGuard.badSubstitutions is empty — the highest-value rule would silently check nothing.')
}
const canonNoun = 'Canon noun: "' + brand.positioning.category + '"' + (cg.exactNoun ? ' (exact — no substitutes).' : '.')
const retiredNouns = []
const genericNouns = []
for (const entry of cg.badSubstitutions) {
  const kind = BAD_SUBSTITUTION_KINDS[entry]
  if (!kind) {
    fail('categoryGuard.badSubstitutions entry is not classified:\n  ' + JSON.stringify(entry) +
      '\nAdd it to BAD_SUBSTITUTION_KINDS as "retired" (the specific noun canon retired — ' +
      'any occurrence is a violation) or "generic" (an ordinary category word only wrong ' +
      'as Spectrea\'s category noun).')
  }
  ;(kind === 'retired' ? retiredNouns : genericNouns).push(entry)
}
if (retiredNouns.length) {
  add({
    id: 'category-noun', severity: 'error',
    patterns: [patternFor(retiredNouns, false)],
    canon: 'brand.positioning.categoryGuard.badSubstitutions',
    note: 'Retired category noun. ' + canonNoun,
  })
}
if (genericNouns.length) {
  add({
    id: 'category-noun-generic', severity: 'review',
    patterns: [patternFor(genericNouns, false)],
    canon: 'brand.positioning.categoryGuard.badSubstitutions',
    note: 'Category word canon forbids as Spectrea\'s noun. ' + canonNoun,
    condition: 'Only a violation where this names what Spectrea IS. As an ordinary noun — a feature, a test fixture, a domain term — it is fine.',
  })
}

// ── 2. Assistant verbs ───────────────────────────────────────────────
const forbiddenVerbs = naming.aiNaming?.forbiddenVerbs ?? []
if (!forbiddenVerbs.length) fail('naming.aiNaming.forbiddenVerbs is empty.')
const verbNote = 'The assistant suggests, surfaces and drafts — it never silently takes over. Allowed: ' +
  (naming.aiNaming?.allowedVerbs ?? []).join(', ') + '.'
const specificVerbs = []
const genericVerbs = []
for (const entry of forbiddenVerbs) {
  const kind = AI_VERB_KINDS[entry]
  if (!kind) {
    fail('naming.aiNaming.forbiddenVerbs entry is not classified:\n  ' + JSON.stringify(entry) +
      '\nAdd it to AI_VERB_KINDS as "specific" (a phrasing nobody writes by accident) ' +
      'or "generic" (ordinary English that also appears outside assistant copy).')
  }
  ;(kind === 'specific' ? specificVerbs : genericVerbs).push(entry)
}
if (specificVerbs.length) {
  add({
    id: 'ai-verbs', severity: 'error',
    patterns: [patternFor(specificVerbs, false)],
    canon: 'naming.aiNaming.forbiddenVerbs / verbRule',
    note: verbNote,
  })
}
if (genericVerbs.length) {
  add({
    id: 'ai-verbs-generic', severity: 'review',
    patterns: [patternFor(genericVerbs, false)],
    canon: 'naming.aiNaming.forbiddenVerbs / verbRule',
    note: verbNote,
    condition: 'Only a violation where this describes what the ASSISTANT does. In code comments about focus, events or control flow it is ordinary English.',
  })
}

// ── 3. Name hygiene ──────────────────────────────────────────────────
const nameGroups = {
  'name-misspelling': { severity: 'error', note: 'Misspelling of the brand name. It is "Spectrea".' },
  'name-confusion': { severity: 'warn', note: 'A different word, not the brand name — check this is not a Spectrea reference.' },
  'name-styling': { severity: 'warn', note: 'All-caps styling of the name is not canonical. Constant and env-var prefixes are the usual false positive.' },
  'name-conditional': { severity: 'review', note: 'Canon forbids this form conditionally — read the condition.' },
}
const nameBuckets = {}
for (const entry of naming.neverNames) {
  const spec = NEVER_NAMES[entry]
  if (!spec) {
    fail('naming.neverNames entry is not classified:\n  ' + JSON.stringify(entry) +
      '\nAdd it to NEVER_NAMES in this file (literals + group, or skip + reason).')
  }
  if (spec.skip) { notChecked.push({ canonEntry: entry, reason: spec.reason }); continue }
  if (spec.mergedInto) { continue }
  const b = (nameBuckets[spec.group] ||= { cs: [], ci: [], byPhrase: {}, family: null, allowed: [] })
  if (spec.family) {
    b.family = { source: '\\b' + anyCasing(brand.identity?.name ?? 'Spectrea') + '\\b', flags: 'g' }
    b.allowed = spec.allowed
    continue
  }
  ;(spec.caseSensitive ? b.cs : b.ci).push(...spec.literals)
  // Conditions attach to the literal that triggered them, so a finding shows the
  // one condition that applies rather than every condition in its rule.
  if (spec.condition) for (const lit of spec.literals) b.byPhrase[lit.toLowerCase()] = spec.condition
}
for (const [group, b] of Object.entries(nameBuckets)) {
  const g = nameGroups[group] ?? fail('unknown neverNames group: ' + group)
  const patterns = []
  if (b.ci.length) patterns.push(patternFor(b.ci, false))
  if (b.cs.length) patterns.push(patternFor(b.cs, true))
  if (b.family) patterns.push(b.family)
  add({
    id: group, severity: g.severity, patterns,
    canon: 'naming.neverNames',
    note: g.note,
    ...(Object.keys(b.byPhrase).length ? { conditionByPhrase: b.byPhrase } : {}),
    ...(b.allowed.length ? { excludeMatches: b.allowed } : {}),
  })
}

// ── 4. Never-use vocabulary ──────────────────────────────────────────
const neverUseAlways = []
const neverUseConditional = []
const neverUseConditionByPhrase = {}
for (const entry of voice.neverUse) {
  const m = /^(.*?)\s*\(([^)]*)\)\s*$/.exec(entry)
  if (!m) { neverUseAlways.push(entry.trim()); continue }
  const [, phrase, qualifier] = m
  const kind = NEVER_USE_QUALIFIERS[phrase.trim()]
  if (!kind) {
    fail('vocabulary.neverUse entry carries a parenthetical this generator cannot interpret:\n  ' +
      JSON.stringify(entry) + '\nAdd "' + phrase.trim() + '" to NEVER_USE_QUALIFIERS as "reason" ' +
      '(the phrase is always a violation) or "condition" (a human must judge each use).')
  }
  if (kind === 'reason') neverUseAlways.push(phrase.trim())
  else {
    neverUseConditional.push(phrase.trim())
    neverUseConditionByPhrase[phrase.trim().toLowerCase()] =
      'Canon bans "' + phrase.trim() + '" ' + qualifier.trim() + ' — other senses are fine.'
  }
}
if (neverUseAlways.length) {
  add({
    id: 'never-use', severity: 'warn',
    patterns: [patternFor(neverUseAlways, false)],
    canon: 'vocabulary.neverUse',
    note: 'Never-use vocabulary. ' + voice.formula,
  })
}
if (neverUseConditional.length) {
  add({
    id: 'never-use-conditional', severity: 'review',
    patterns: [patternFor(neverUseConditional, false)],
    canon: 'vocabulary.neverUse',
    note: 'Canon forbids this word only in a particular sense.',
    conditionByPhrase: neverUseConditionByPhrase,
  })
}

// ── 5. Compounding-claim mechanism guardrail ─────────────────────────
const guardrail = compoundingValue?.usageGuardrail
if (!guardrail) fail('no brand value carries a usageGuardrail — the compounding rule cannot be derived.')
if (guardrail !== EXPECTED_GUARDRAIL) {
  fail('the compounding guardrail has been REWRITTEN in canon.\n\n  canon now says:\n    ' +
    guardrail + '\n\n  this generator was written against:\n    ' + EXPECTED_GUARDRAIL +
    '\n\nMECHANISM_WORDS/MECHANISM_EXTRA are an operationalisation of that exact ' +
    'sentence. Re-derive them from the new wording, then update EXPECTED_GUARDRAIL. ' +
    'Do not simply re-pin the text — the whole point of this gate is that a human ' +
    'reads the rewrite before the checker keeps enforcing the old vocabulary.')
}
const claimMatch = CLAIM_FROM_GUARDRAIL.exec(guardrail)
if (!claimMatch) fail('cannot read the claim phrase out of the guardrail: ' + guardrail)
const compounding = {
  id: 'compounding-mechanism',
  // warn, not review: canon states this guardrail unconditionally, and four real
  // violations in spectrea-web could not be made to fail CI at review severity.
  // The window now stops at a blank line, which is what makes warn defensible.
  severity: 'warn',
  claim: patternFor([claimMatch[1]], false),
  mechanism: patternFor([...MECHANISM_WORDS, ...MECHANISM_EXTRA], false),
  window: MECHANISM_WINDOW,
  canon: 'guardrails.compoundingClaim',
  note: guardrail,
}

/* ------------------------------------------------------------------ */
/* Coverage accounting — prove nothing fell through                    */
/* ------------------------------------------------------------------ */

const accounted =
  cg.badSubstitutions.length + forbiddenVerbs.length +
  naming.neverNames.length + voice.neverUse.length
const namesHandled = naming.neverNames.filter((e) => NEVER_NAMES[e]).length
if (namesHandled !== naming.neverNames.length) fail('neverNames coverage gap (unreachable — guarded above).')

/* ------------------------------------------------------------------ */
/* Emit                                                                */
/* ------------------------------------------------------------------ */

const TODAY = new Date().toISOString().slice(0, 10)
const enginePath = join(__dirname, 'conformance-engine.js')
const engine = readFileSync(enginePath, 'utf8')
const engineCode = engine.replace(/^\s*\/\/.*$/gm, '')
if (/\b(?:const|let|var)\s+RULES\b/.test(engineCode)) {
  fail('conformance-engine.js declares RULES itself — it must receive RULES from the generated preamble.')
}

const skipBlock = notChecked.length
  ? notChecked.map((s) => '//   • ' + s.canonEntry + '\n' +
      s.reason.replace(/(.{1,72})(\s|$)/g, '//       $1\n')).join('//\n')
  : '//   (none — every canon entry above is mechanically checked)\n'

const header = `// ============================================================
// Spectrea brand conformance checker
// DO NOT EDIT — generated from src/data/brand.ts by
// scripts/generate-conformance.mjs (${TODAY})
//
// Vendor this file next to the brand snapshot and run it in CI, scoped to the
// directories you actually ship:
//     node docs/brand/brand-conformance.mjs src public
//
// Do NOT start with --strict. It promotes warnings to failures, and a repo that
// has never run this will have warnings that are not brand defects (its own
// brand tests enumerating the never-use list, technical comments). Annotate
// those with a file-level suppression first, then turn --strict on.
//
// Enforcing canon v${meta.version}. Re-vendor when you re-pin the snapshot:
// the rules are baked in at generation time, so an old copy enforces old canon.
//
// WHAT THIS CHECKER DOES NOT COVER — read this before trusting a PASS:
//   • Asset geometry (logo paths, mark construction). The vendored snapshot
//     carries no binary assets, so compare those by hash against upstream.
//   • Colour, type-scale and spacing conformance — token-level, not text.
//   • Focus-ring implementation. Canon holds the current values, not the
//     retired ones, so a checker built from canon cannot recognise the old
//     ring it is meant to catch. Migration rules would have to be canonized
//     first (as categoryGuard.badSubstitutions already is for the category noun).
//   • Anything requiring judgement about tone, rhythm or register.
//   • The compounding-claim rule is PROXIMITY, not comprehension: it asks
//     whether a mechanism word appears in the same block as the claim. A
//     mechanism word that happens to be a code identifier — an object key, a
//     variable, a JSON field — satisfies it. Telling prose from identifiers was
//     attempted and abandoned: every adjacency heuristic that caught the
//     identifier case also rejected valid copy ("…grows through provenance:
//     every source stays traceable"), and flagging correct brand writing costs
//     more than an occasional miss.
//   • Non-canonical internal capitalisation is caught as a family (any casing of
//     the name that is not Spectrea / spectrea / SPECTREA — all-caps has its own
//     rule), but "spectrea" lowercase in prose is NOT checked — see below.
//   • A suppression directive counts only inside a comment, and deciding that
//     means reading source. This is a SCANNER, NOT A LEXER — in every file type,
//     including the ones it recognises. For C-family and markup extensions it
//     tracks comments, strings, template literals, regex literals, triple-quoted
//     blocks, script/style bodies, textarea content and Markdown fences; that is
//     best-effort, not grammar-correct, and known constructs it still misreads
//     include raw string literals (C++ R"(…)", Rust r#"…"#) and markup attribute
//     values. Every other file type falls back to a line-shape rule — does the
//     directive's own line open with a comment marker — which by construction
//     cannot see multi-line string constructs such as YAML block scalars, shell
//     and Ruby heredocs, or Python docstrings.
//     This is not a security boundary and never was: anyone who can edit the
//     file can write a genuine comment carrying any reason text, and no checker
//     can judge whether a reason is good. The guarantee offered instead is
//     VISIBILITY — every suppression the run honoured is printed under
//     "Suppressed" in the default output and carried in --json as
//     suppressedDetails, so nothing is silenced without the run saying so.
//     (--quiet reports the count only; use the default output or --json to see
//     which rule was waived where, and why.)
//
// PASS DOES NOT MEAN CLEAN. It means nothing was found at a FAILING severity:
// by default that is errors only, so a PASS can and often does sit alongside
// warnings and reviews that a human still needs to read. Use --strict to make
// warnings fail. This tool is a string checker, never a brand review.
//
// Canon entries deliberately NOT mechanically checked:
${skipBlock}// ============================================================

const RULES_META = ${JSON.stringify({ version: meta.version, generatedFrom: 'src/data/brand.ts', generated: TODAY, canonEntries: accounted }, null, 2)}

const RULES = ${JSON.stringify(rules, null, 2)}

const COMPOUNDING = ${JSON.stringify(compounding, null, 2)}

`

const outPath = join(root, 'public', 'brand-conformance.mjs')
writeFileSync(outPath, header + engine, 'utf8')

const bySeverity = rules.reduce((a, r) => ((a[r.severity] = (a[r.severity] || 0) + 1), a), {})
console.log(
  'brand-conformance.mjs — canon v' + meta.version + ' · ' + rules.length + ' rules + 1 proximity rule (' +
  Object.entries(bySeverity).map(([s, n]) => n + ' ' + s).join(', ') + ') · ' +
  accounted + ' canon entries accounted, ' + notChecked.length + ' deliberately not checked'
)
