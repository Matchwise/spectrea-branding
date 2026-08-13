# Hand-off: downstream repos (spectrea, spectrea-web) — updated for v2.13.0

> Written 2026-08-07 at v2.5.0; refreshed 2026-08-10 at v2.10.0; illustration doctrine
> added 2026-08-12 at v2.12.0; internal render tier added 2026-08-13 at v2.13.0. Precondition for sections 1–4:
> spectrea-branding main pushed at v2.10.0 (`11c2326`, deploy live).
>
> **Status 2026-08-11:** step 1's file refresh is DONE — both repos' vendored
> snapshots were byte-copied from `11c2326` (17 files, cmp-verified) and spectrea's
> snapshot README was rewritten to v2.10.0 provenance + facts (Codex critic gate:
> revise 8 → accepted; evidence in `.runs/2026-08-06-brand-review/downstream-repin/`).
> The copies are UNCOMMITTED in the consumer working trees by design — each repo's
> own session commits them and runs the remaining steps below (spectrea's sync-policy
> follow-ups: `/deep-review` of derived docs + a Define-level change for this
> material jump; both repos: the section-2/3 migration checks, e.g. blue input-focus
> styling → the canonical ring).

## 0. New at v2.13.0 — the internal render tier removes fields from the contract

Read this before re-pinning: **v2.13.0 removes keys from `brand-contract.json`.** A
consumer that reads one of them gets `undefined`, not an error.

A public-exposure audit of this repo and the published guide found no credential-class
exposure, but it did find categories of canon that should not sit on a crawler-readable
page: trust/security/compliance masters that have not had a legal read, a competitive
positioning instruction, packaging mechanics, and named anti-brands that are also
integration targets. Rather than reword each sentence, canon gained a render tier.

`internalCanon` in `brand.ts` registers the internal-tier fields. They stay in canon —
one source of truth — but render only to `internal/brand-internal.json` and
`internal/brand-internal.md`, which are **git-ignored and handed off locally**. The
AI-format generator fails the build if an internal field reaches a public artefact, and
CI fails if anything under `internal/` is ever tracked.

### What changed in the files you vendor

| Was | Now |
|---|---|
| `brand-contract.json` → `identity.fullShapeClaim` | gone — internal tier |
| `brand-contract.json` → `guardrails.differentiators` | gone — internal tier |
| `brand-contract.json` → `trustCopy` | replaced by `internalCanon` (the registry: rule + field list) |
| `brand-checklist.md` step 4 quoted the four trust masters | now a STOP that routes to the internal hand-off |
| `brand-agent-rules.md` / `llms.txt` carried the differentiation guardrail and full-shape claim | dropped |
| guide §12 published the four trust masters | replaced by a pointer |
| `/communications/trust` route | retired; `antiBrands` names no longer render (the guide says the pattern instead) |

### How to get the internal fields

Ask for `internal/brand-internal.md` (or `.json`) and copy it in locally. It never
travels through a commit in this repo. **A private consumer repo may hold it; nothing
that compiles into a public build may.** That bites `spectrea-web` specifically: its
build output is a public site, so internal-tier text must not reach a page, a metadata
field, or a client bundle there. Trust and compliance copy on any public page waits for
the counsel read regardless of which repo it lives in.

### Copy sweeps this forces

Canon softened four claims. Sweep your own copy for the old wording, not just the
vendored files:

- **Retention.** "on a published schedule" → "on a stated schedule, published before
  launch" (there is no published schedule yet). A legal-register example that said
  "within 30 days" now says "within the period stated in our retention policy".
- **Export.** The Human-First value proof no longer calls full-fidelity export "a
  first-class guarantee" — it says "with no lock-in". The guarantee wording survives only
  in the internal trust masters, pending counsel.
- **Deployment tiers.** The perimeter "widens by tier" → "is designed to widen by tier",
  and tiers beyond managed cloud are staged targets alongside the attestations.
- **Compounding.** "your second year is measurably sharper" → "sharper". No measurement
  stands behind the adverb.

### Also at v2.13.0

- **Re-vendor `brand-conformance.mjs`** — the rules are baked in at generation time, so
  an old copy enforces old canon (now v2.13.0).
- **Guide links use the hash form.** The app is a HashRouter: link
  `https://branding.spectrea.com/#/foundation/story`, not `/foundation/story`.
- **`public/illustrations/hero-example-composition.png` is deleted** (a retired-era render).
  If you vendored it, drop it.
- **Fonts are self-hosted.** Albert Sans, Lexend, and JetBrains Mono now ship from
  `/fonts` with their OFL 1.1 text, instead of a `fonts.googleapis.com` link. Worth
  copying on any surface that claims privacy as a value — a font CDN link hands every
  visitor's IP to a third party.

## 0. New at v2.12.0 — the illustration doctrine replaces the v4 prompt (decision 36)

This is the one item in this hand-off that **retires a file a consumer already vendors**,
so read it before re-pinning anything else.

`brand-contract.json` gains a top-level `illustration` section, and the way brand imagery
is generated changed shape. The old model was one universal prompt plus an eight-item
pass/fail checklist. The new model is an invariant **DNA block** (~750 characters, four
fill-in slots) plus **one register sentence per job** — hero, spot, docs, product, social,
with a derivation rule for contexts not on that list. The DNA carries the identity and
never varies; the register is the context dial and is never enforced across jobs.

Three consequences that change downstream practice, not just downstream files:

- **Measurements report; they never gate.** A conformance-style scorer rewards a crude
  flat image, so no render is claimed or shipped without a person opening it. If you wire
  image checks into CI, wire them as reports.
- **The media split is a capability split.** Raster owns warmth, light and human presence
  but cannot hit an exact hex. Vector owns exact palette, strict flatness and product
  accuracy. In vector, **tints are lighter solid hexes, never `fill-opacity`** — a
  translucent fill over a coloured ground composites to a colour in no palette (Amber at
  60% over Teal reads olive, and a hue-family checker passes it).
- **A reference image is a content channel, not a style channel.** Same-subject reference
  reproduces the subject rather than restyling it; that is the documented behaviour, not a
  misuse. Three modes are specified in `illustration.reference`.

### What each repo owes

**spectrea** vendors `docs/05-reference/brand/illustration-prompt.md`, and that copy is the
retired **v4** universal prompt. Replace it with `public/illustration-prompt.md` from the
pushed head — that path is now **generated from `src/data/brand.ts`**, so never hand-edit
the vendored copy and never reconcile it by editing prose. `docs/illustration-prompt.md` in
the brand repo (the file the v4 copy came from) has been deleted: it was a second source of
truth for the artefact most likely to drift. Non-canonical per-generator guidance —
Midjourney/SD/Firefly translations, tool commercial-safety, working practice — now lives in
`docs/illustration-production.md`, which is explicitly not canon and is not for vendoring.

**spectrea-web** does not vendor the prompt file, so it needs only the standard re-pin of
its five snapshot files. But it has live hand-authored illustration components
(`src/components/illustrations/`, `src/app/lab/hero-art/`) — those are the **vector** medium
above, and the solid-hex tint rule and the register model both apply to them directly.
Read them against `illustration.registers` and `illustration.media.vector` before the next
commit that touches them.

Both: re-pin to the pushed head carrying v2.12.0 and record that sha. Confirm the sha on
`origin/main` rather than copying one from this document.

Evidence for the doctrine, if a reviewer wants it: `.runs/2026-08-11-art-session/`
(`spec-v7-dna.md`, per-asset `exemplar-provenance.md`, `metrics-shipped.json`,
`verdict-36.md`). Six exemplars ship under `public/illustrations/`.

## 1. Re-pin the vendored brand snapshots

Both `spectrea/docs/05-reference/brand/` and `spectrea-web/docs/brand/` vendor generated
artifacts. Refresh every vendored file from the pushed head and record that sha as the
new pin. Sources in `public/`: `brand-guide.md`, `llms.txt`, `brand-contract.json`,
`brand-agent-rules.md` (all GENERATED from `src/data/brand.ts` — never hand-edit a
vendored copy). New generated artifacts consumers may also want to vendor or link:

- `public/spectrea-tokens.css` — every brand token as CSS variables (colour, washes,
  dark surfaces, accent-text tones, button states light+dark, focus ring, font stacks,
  type scale as size/line-height/weight, radii, spacing).
- `public/spectrea-tailwind.config.js` — brand colours + font stacks as `theme.extend`.
- `public/brand-guide.pdf` — print/offline mirror of the guide (CI-built,
  deterministic fonts).
- `public/brand-assets/` — the full asset catalogue now ships PNG exports (1×/2×/4×)
  beside every logo SVG, plus transparent-background White mark/lockup companions
  (`logo-mark-white-transparent.*`, `logo-lockup-white-transparent.*`) alongside the
  plated originals.
- **`public/brand-conformance.mjs` (new 2026-08-11) — vendor this one and run it in CI.**
  See the section below.

## 1a. The conformance checker — new, and the reason it exists

The 2026-08-11 drift scan was hand-written, and it looked for logo geometry, focus
styling and stale pins. It never looked at copy at all. The category noun retired on
2026-07-03 was sitting in spectrea's site-wide metadata, its `(app)` layout, and its
OG image for five weeks, and nothing in either repo could have noticed.

`public/brand-conformance.mjs` is a zero-dependency Node script generated from
`src/data/brand.ts` by `npm run generate:conformance`. Vendor it next to the snapshot
and run it **scoped to the directories you actually ship**:

```
node docs/brand/brand-conformance.mjs src public
```

That is the CI command. Both consumer repos pass it today with zero errors, and over
the three pre-fix files (`git show 081052028^:src/app/layout.tsx` and siblings) it
reports all three retired-noun escapes as errors. It exits 1 on any error, 2 on a
checker error such as an unreadable file — an unreadable file is a hole in coverage,
not a pass.

**Do not start with `--strict`.** It promotes warnings to failures, and both repos
have warnings today that are not brand defects: spectrea has 59, almost all from its
own brand tests enumerating the never-use list, and spectrea-web has 6. Graduate to
`--strict` after annotating those files — the file-level suppression below exists
precisely for that, and it is one line per file rather than one per word.

A whole-repo scan (`node … .`) is an audit, not a CI gate. It completes in about 14
seconds over spectrea's 10,786 scanned files, but it reaches historical documents — sweep
reports, superseded specs, archived audits — which legitimately quote the retired
noun because they are recording its retirement. Worktrees, caches and build output are
skipped automatically.

The brand repo's own root scan is the same story and is expected to report: this repo's
archived audits, review records and the generator's rule tables all name the retired
forms on purpose. `npm run test:conformance` is the check that must stay green there —
32 cases pinning every rule, every suppression form, and every scanner bypass a gate
found while the checker was being built.

What it enforces, by severity:

| Severity | Rules | Fails the build |
|---|---|---|
| error | retired category noun, brand-name misspellings, the specific forbidden assistant phrasing, unjustified suppressions | yes |
| warn | never-use vocabulary, name confusion (Spectre/Spectra), all-caps styling, **compounding claims with no mechanism named in the same block** | only with `--strict` |
| review | category words and verbs that are ordinary English outside brand copy, conditional never-use senses | no — a human reads these |

The severity split is the whole design. Canon's `badSubstitutions` mixes the specific
noun it retired with generic words like "AI assistant" — and Spectrea genuinely has an
AI assistant feature, so a checker that bans the string outright reports 82 findings in
the product repo, 80 of them noise. Generic entries are therefore `review`, not `error`.

Two things to know before you trust a PASS:

- **It checks strings, not brand quality.** Asset geometry, colour, type and focus
  implementation are all out of scope, and the generated file lists these exclusions in
  its own header. **A PASS does not mean clean** — it means nothing was found at a
  failing severity, which by default is errors only. A PASS routinely sits
  alongside warnings and reviews that still need reading.
- **It cannot catch a retired value that canon no longer holds.** Canon carries the
  current focus ring, not the old one, so a checker built from canon cannot recognise
  the retired ring it would need to flag. The category noun is only checkable because
  canon deliberately keeps its retired forms in `categoryGuard.badSubstitutions`. Any
  other migration rule we want enforced has to be canonized the same way first.

Suppression is available and requires a reason — `brand-conformance-ignore-next-line
<rule> — why` for a line, `brand-conformance-ignore-file <rule> — why` anywhere in a
file. A bare suppression is itself reported as an error, and a directive only counts
inside a comment.

Deciding *that* means reading source, and the checker is a scanner, not a lexer — in
every file type, including the ones it knows. For JavaScript/TypeScript/CSS and markup
it tracks strings, template literals, regex literals, triple-quoted blocks,
`<script>`/`<style>` bodies, `<textarea>` content and Markdown fences, so a directive
in any of those is correctly ignored. That is best-effort, not grammar-correct: raw
string literals (`R"(…)"`, `r#"…"#`) and markup attribute values still fool it. In file
types it does not know it applies a line-shape rule instead — the directive's own line
must open with a comment marker — which by construction cannot see a YAML block scalar,
a heredoc or a Python docstring.

None of this was ever a security boundary: anyone who can edit a file can write a
genuine comment with any reason text, and no checker can judge whether a reason is
good. **So the guarantee is visibility, not prevention — every suppression the run
honoured is printed under `Suppressed` and carried in `--json` as
`suppressedDetails`.** Read that section in CI output; it is where an accidental or
unwarranted waiver shows up. (`--quiet` prints the count only.)

You will want the file-level form in two places:

- **Your own brand tests.** spectrea hard-codes the never-use list across seven test
  files, which is where most of its 59 warnings come from — and that hand-copied list
  is a standing drift risk of its own, since it goes stale silently. Replacing it with
  this checker is the point.
- **Historical documents that quote a retired value.** `docs/05-reference/brand/README.md:20`
  in spectrea cites the commit subject *"Category noun: composable knowledge platform
  -> composable intelligence platform"* — a true string match and a legitimate
  citation, because the document is recording the retirement.

## Real findings the checker surfaced (owner: the consumer repos)

These are live, not historical, and were not caught by the hand-written drift scan:

| Where | Finding |
|---|---|
| `spectrea-web/README.md:3` | Still describes the product with the retired category noun. A live file, outside the `src public` scope the CI command covers. |
| spectrea-web, 4 sites (`src/app/about/page.tsx:28`, `src/app/layout.tsx:42/:48/:55`) | "compounding intelligence" with no mechanism named in the same block — canon's `guardrails.compoundingClaim`. This is the downstream twin of D31, tracked as R11. |

## 2. Contract sections added since the last pin

If your repo reads `brand-contract.json`, these top-level/nested sections are new since
v2.5.0 (the version consumers were last told about):

- `brandTokens.focusRing.rule` + `graphViz.nodeHover`/`nodeFocus` (v2.10.0) — ONE
  focus ring for every focusable (buttons, links, inputs, selects, textareas, custom
  controls): the 2 px Amber ring at 2 px offset, outside the border. The ring is
  accessibility chrome outside the colour tiers — never a validation status; borders
  never change on focus (validation borders stay beneath the ring). Focus is NOT a
  Cobalt job anymore — if your repo styles input focus as a blue border/halo
  (`focus:border-…` or a low-alpha blue ring), replace it with the canonical ring.
  `graphViz.nodeHoverFocus` was split: hover stays Cobalt, keyboard focus is the ring
  — drop any copy of the old combined key.
- `components` (v2.8.0) — canonical component specs: 6 button types with state
  references, sizes, forms, cards, layout (breakpoints, responsive rules, elevation).
  `components.forms.focus` rewritten at v2.10.0 to reference the canonical ring.
- `color.system` (v2.7.0) — neutral ladder roles, accent meanings, text hierarchy,
  Tailwind mapping, usage ratio, dark roles (Mist/Fog), accents-on-dark rule. OKLCH
  lightness and WCAG ratios are COMPUTED from hexes, never stored — do the same.
- `gradients` + `meta.changeProcess` + OS-frame worked example (v2.6.0).
- `logoAnimation` (v2.5.9) — the canonical logo loop (3 s, phase boundaries,
  reduced-motion behaviour).
- `color.accentText` (v2.5.7/8) — Teal text `#007D6E` and Rose text `#BA3249` replace
  the fill hexes AS TEXT; fills unchanged. Dark Cobalt hover/active re-lightened
  (`#6E93EC`/`#8FACF0`).
- Focus ring split light/dark (v2.5.1): solid Amber `#A86E00` on light surfaces, soft
  alpha ring on dark. Measurement doctrine + exception registry (v2.5.2): WCAG 2.x AA
  floor, APCA-W3 adjudicator; the white-button-label grant is the registry's first
  entry.

## 3. Copy-affecting rules ratified since the last pin

- Voice formula rewritten + `voice.attentionRule` added (v2.9.0, humanist correction):
  "Plain words, real specifics, room to breathe. Tech earns its place by being
  checkable — shown once, where the reader looks for it." Show the work ONCE per
  surface, one step from the claim — never welded to every sentence. Downstream copy
  built on the old "showing its work" per-sentence habit should be re-read against the
  attention rule.
- `voice.heroOpen` (v2.5.3) supersedes `outcomeFirst`: open on the outcome written as a
  reveal; the canonical marketing exemplar is now outcome-first ("See everything your
  organization knows in one connected view…").
- `toneExamples` is THE register taxonomy (v2.5.4, tone labels included);
  `toneSpectrum` is retired — drop any downstream copy of it.
- The OS-frame ("the operating system for collective intelligence") has a canonical
  right/wrong worked example (v2.6.0) — the frame never carries a claim alone.
- Buttons: one Primary per section maximum; Confirm/Caution are reserved semantic
  types; borders are Tailwind STONE (stone-200 `#E7E5E4`), not gray — two pages taught
  gray-200 `#E5E7EB` before v2.8.0; check downstream UI for the same drift.

## 4. Still-current facts from the v2.5.0 hand-off

- K3′ mark + metric-true lockup constants (v2.5.0) — if your repo still carries a
  pre-v2.5.0 logo SVG, favicon, or social avatar (old mark: `M 44 12 …`, stroke 8,
  dots r 3.5), it is retired; re-copy from `public/brand-assets/` + `public/favicon.svg`.
- Visual metaphors explicitly CO-PRIMARY (Prism = identity/reveal, Living Network =
  product/growth); "compounding intelligence" stays, always mechanism-tied.
- Cobalt on Ink is 3.93:1 — large-text/UI only. On-wash text hexes are canonical
  (`brandTokens.washes.light[].textOn`).
- Counsel trigger before any public trust/security/compliance claims (same engagement
  covers trademark clearance; knockout search 2026-08-07 clean).
- Etymology is a sourced coinage ("from spectrum, Latin, from specere").
- NO micro-construction at small sizes — the standard mark scales unchanged.

Full decision record: `docs/brand-review-2026-08/ratifications-2026-08-06.md`
(31+ ratifications + audit ledger + critic verdicts).
