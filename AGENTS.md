# spectrea-branding — Agent Instructions

Upstream Spectrea brand repository: the brand source of truth plus the deployed brand guide (Vite + React, npm; published via GitHub Pages at https://branding.spectrea.com/#/ — the old matchwise.github.io/spectrea-branding URL 301-redirects here).

## Commands

- `npm run dev` / `npm run build` / `npm run preview`
- `npm run generate:all` — regenerate brand assets, AI formats, and the PDF after any `brand.ts` change (`generate:assets`, `generate:ai`, `generate:pdf` individually)

## Working here

- `src/data/brand.ts` is canonical. Every derived artefact (brand-contract.json, agent rules, assets, PDF) is generated from it — edit `brand.ts`, then regenerate; never hand-edit derived files.
- **This repo and the site are public.** The guide is primarily an identity system, and it does carry capability language anchored to the ratified vision — so wording with legal implications (trust, security, compliance claims) is judged sentence by sentence, and belongs in the internal tier until counsel has read it. Competitive instruction and packaging mechanics are instructions to us, not public copy.
- **Internal tier (`internalCanon` in `brand.ts`).** The fields it registers — those named fields, not a subject area — render only to the git-ignored `internal/` artefacts, handed off locally to consumer repos. `npm run generate:ai` gates its own outputs and `npm run check:internal-tier` gates the repo's public text artefacts and the built bundle; `npm run test:internal-tier` proves the gate still catches what it exists for. Adding or removing a field is a ledger decision, and CI fails if anything under `internal/` is ever tracked.
- Downstream repos (`../spectrea`, `../spectrea-web`) vendor snapshots of this repo's output; a `brand.ts` change is not done until consumers are notified that a new snapshot exists. Internal-tier fields travel by local hand-off of `internal/`, never through a commit.
- Ask before pushing or publishing (Pages deploys from this repo).
