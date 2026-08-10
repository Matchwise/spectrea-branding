# Hand-off: downstream repos (spectrea, spectrea-web) — updated for v2.9.0

> Written 2026-08-07 at v2.5.0; refreshed 2026-08-10 at v2.9.0. These steps are for
> sessions working IN the consumer repos; nothing here is done yet — no re-pin has
> happened since before v2.5.0. Precondition: spectrea-branding main pushed at v2.9.0
> (deploy republishes all artifacts at https://branding.spectrea.com/).

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

## 2. Contract sections added since the last pin

If your repo reads `brand-contract.json`, these top-level/nested sections are new since
v2.5.0 (the version consumers were last told about):

- `components` (v2.8.0) — canonical component specs: 6 button types with state
  references, sizes, forms, cards, layout (breakpoints, responsive rules, elevation).
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
