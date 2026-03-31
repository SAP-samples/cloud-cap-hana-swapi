# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**cloud-cap-hana-swapi** is a learning-focused SAP Cloud Application Programming Model (CAP) sample using the Star Wars universe to demonstrate production patterns — especially many-to-many relationships — across multiple database backends (SAP HANA, SQLite, PostgreSQL).

All implementation code lives under the `cap/` subdirectory. Run all npm commands from within `cap/`.

## Commands

```bash
cd cap

# Local development
npm run sqlite        # Start with SQLite (no external services needed)
npm run watch         # Hybrid dev against SAP HANA Cloud (requires .cdsrc-private.json)
npm run pg            # PostgreSQL profile watch

# Testing
npm test              # Full test suite (model + handler + data conversion, 60s timeout)
npm run test:handler  # Handler/service layer tests only
npm run test:profile  # Fast regression gate — use before committing
npm run test:migration # Data conversion/loading tests

# Build & Deploy
npm run build         # CDS build + generate artifacts (required before HANA deployment)
npm run build_sqlite  # Deploy schema to SQLite
npm run build_pg      # Deploy schema to PostgreSQL
npm run hana          # Deploy to HANA HDI container ("starwars")

# Data loading
npm run load          # Load Star Wars fixture data (hybrid/HANA profile)
npm run load_sqlite   # Load fixture data into SQLite

# Docs generation
npm run openapi       # Generate OpenAPI docs → docs/
npm run asyncapi      # Generate AsyncAPI docs
```

Tests use the Node.js built-in `node:test` runner (not Jest/Mocha). Run a single test file directly:
```bash
node --test cap/test/handler.test.js
```

After any CDS model changes, run `npm run build` in `cap/` to regenerate artifacts.

## Architecture

### Layer Separation

```
cap/db/          Domain model + persistence (*.cds), profile-specific extensions
cap/srv/         Service layer: contracts (*-service.cds), Fiori annotations (*-fiori.cds),
                 authorization (services-auth.cds), runtime handlers (*.js), server config (server.js)
cap/app/         UI frontends (Fiori preview)
cap/test/        Automated tests by layer (model, handler, data migration)
cap/docs/        Generated docs (OpenAPI, AsyncAPI) and learning materials
cap/labs/        Hands-on exercises (lab-01 through lab-05)
```

### Domain Model (`cap/db/schema.cds`)

Six core entities: **Film**, **People**, **Planet**, **Species**, **Starship**, **Vehicle**. Many-to-many relationships use explicit junction entities (`Film2People`, `Film2Planets`, etc.) with redirected projections in services. All entities use `managed` + `cuid` from `@sap/cds/common`.

Profile-specific extensions live in `cap/db/hana/`, `cap/db/sqlite/`, `cap/db/postgres/`. Always check these when making cross-profile changes.

### Service Layer (`cap/srv/`)

Six domain services (one per entity): `StarWarsFilm`, `StarWarsPeople`, `StarWarsPlanet`, `StarWarsSpecies`, `StarWarsStarship`, `StarWarsVehicle`. Protocols: OData v4 (primary), OData v2 (adapter), GraphQL (`/graphql`), REST.

**Critical file separation rule:**
- Service contracts → `*-service.cds`
- Fiori/UI annotations → `*-fiori.cds` (never mix into service contracts)
- Authorization → `services-auth.cds` (centralized; roles: `Viewer`, `Editor`, `Admin`)
- Runtime logic → `*.js` handlers

### Handler Patterns (`cap/srv/*.js`)

```js
module.exports = cds.service.impl(function () {
  this.before(['CREATE', 'UPDATE'], 'Entity', req => { /* validate */ })
  this.on('actionName', 'Entity', req => { /* handle action */ })
  this.after('READ', 'Entity', (results, req) => { /* compute virtual fields */ })
})
```

Use `cds.log()` for operational logging. Use `cds.connect.to()` for service/DB connections. Preserve event naming convention: `Entity.Changed.v1`.

### Database Profiles

| Profile | Command | Use case |
|---------|---------|----------|
| SQLite (default) | `npm run sqlite` | Local dev, no setup |
| PostgreSQL | `npm run pg` | Local PG instance |
| Hybrid/HANA | `npm run watch` | Connects to SAP HANA Cloud; requires `.cdsrc-private.json` |
| Production | CF deployment | SAP HANA Cloud on BTP |

### Messaging & Events

- Production: SAP Event Mesh (`enterprise-messaging`)
- Development/Hybrid: File-based messaging (`file-based-messaging`)
- Persistent outbox queue enabled via `cds.requires.queue: true`

## Key Conventions

- **CDS modeling**: Preserve namespace and `managed`/`cuid` patterns. Prefer explicit many-to-many junction entities. Keep `Common.ValueList` and `UI.*` patterns consistent.
- **Breaking changes**: Avoid renames/removals without migration intent. See `docs/value-help-migration.md` for a past breaking-change example.
- **Data loading**: Use `convertDataLite.js` for SQLite (avoids `SQLITE_BUSY`); use `convertData.js` for HANA (parallel chunk loading).
- **Generated folders**: `cap/gen/` is auto-generated. After HANA deployment, re-run `npm run build` if `gen/srv` is cleared.
- **cds-mcp**: When editing CDS files, resolve entity/field definitions with `cds-mcp` before modifying models, and check CAP docs via `cds-mcp` before proposing CDS syntax or API usage.
