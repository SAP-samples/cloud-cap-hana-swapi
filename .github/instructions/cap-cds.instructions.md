---
description: "Use when creating or modifying CAP CDS models/services/annotations in cap/db or cap/srv. Covers cds-mcp lookup, service split, profile-safe modeling, and migration-safe schema changes."
name: "CAP CDS Modeling Rules"
applyTo: "cap/db/**/*.cds, cap/srv/**/*.cds"
---
# CAP CDS Modeling Rules

- Before changing CDS, resolve definitions with cds-mcp first (entities, fields, services, endpoints).
- Before proposing CDS syntax/API/CLI usage, check CAP docs with cds-mcp first.
- Only read/modify `*.cds` directly when cds-mcp cannot provide required details.

## Structure and placement

- Keep domain model and persistence concerns in `cap/db/`.
- Keep service contracts in `cap/srv/*-service.cds`.
- Keep Fiori annotations in matching `cap/srv/*-fiori.cds` files (do not mix into `*-service.cds`).

## Modeling conventions

- Preserve namespace and managed/cuid patterns already used in `cap/db/schema.cds`.
- Prefer explicit many-to-many junction entities with redirected projections in services.
- Keep value-help and UI annotations consistent with existing `Common.ValueList` and `UI.*` patterns.
- Preserve draft and protocol annotations already defined at service/entity scope unless task explicitly changes behavior.

## Safety checks

- Avoid breaking renames/removals without compatibility notes and migration intent.
- After CDS changes, include follow-up to regenerate artifacts with `npm run build` in `cap/`.
- For HANA deployment flows, remember generated folders may need rebuild after deploy.
