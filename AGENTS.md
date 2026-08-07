# spectrea-branding — Agent Instructions

Upstream Spectrea brand repository: the brand source of truth plus the deployed brand guide (Vite + React, npm; published via GitHub Pages at https://branding.spectrea.com/#/ — the old matchwise.github.io/spectrea-branding URL 301-redirects here).

## Commands

- `npm run dev` / `npm run build` / `npm run preview`
- `npm run generate:all` — regenerate brand assets, AI formats, and the PDF after any `brand.ts` change (`generate:assets`, `generate:ai`, `generate:pdf` individually)

## Working here

- `src/data/brand.ts` is canonical. Every derived artefact (brand-contract.json, agent rules, assets, PDF) is generated from it — edit `brand.ts`, then regenerate; never hand-edit derived files.
- Downstream repos (`../spectrea`, `../spectrea-web`) vendor snapshots of this repo's output; a `brand.ts` change is not done until consumers are notified that a new snapshot exists.
- Ask before pushing or publishing (Pages deploys from this repo).
