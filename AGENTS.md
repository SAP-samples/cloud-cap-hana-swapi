# Project Guidelines

## Critical CAP Guardrails

- You MUST search for CDS definitions, like entities, fields and services (which include HTTP endpoints) with cds-mcp, only if it fails you MAY read `*.cds` files in the project.
- You MUST search for CAP docs with cds-mcp EVERY TIME you create, modify CDS models or when using APIs or the `cds` CLI from CAP. Do NOT propose, suggest or make any changes without first checking it.

## Architecture

- This repository is a CAP sample with most implementation code under `cap/`.
- Core boundaries:
  - `cap/db/`: CDS domain model and DB-specific model extensions (`hana/`, `sqlite/`)
  - `cap/srv/`: service definitions (`*-service.cds`), handlers (`*.js`), and Fiori annotations (`*-fiori.cds`)
  - `cap/app/`: UI assets and preview app content
  - `cap/docs/`: generated OpenAPI/AsyncAPI artifacts
  - `cap/types/`: generated TypeScript model/service types

## Build and Run

- Run Node-based commands in `cap/`.
- Runtime baseline: Node.js `>=20`.
- Common commands:
  - `npm run build` (CDS build)
  - `npm start` (serve CAP app)
  - `npm run watch` (hybrid profile)
  - `npm run sqlite` / `npm run pg` (DB profile watch)
  - `npm run load` (load fixture data)
  - `npm run hana` (deploy to HANA HDI container)

## Conventions

- Keep service contract and UI annotations separated:
  - service definitions in `*-service.cds`
  - Fiori annotations in matching `*-fiori.cds`
- Keep custom logic in service handlers under `cap/srv/*.js` (for example, event hooks in `people-service.js`).
- CAP profile-specific behavior is configured in `cap/package.json` under `cds.requires` and profile blocks like `[sqlite]` and `[pg]`.

## Known Pitfalls

- After HANA deployment, generated folders may be cleared; re-run `npm run build`.
- SQLite can fail under parallel data loading (`SQLITE_BUSY`); prefer a non-parallel loader path for local SQLite scenarios.
