# Star Wars CAP Showcase

A learning-focused SAP Cloud Application Programming Model (CAP) sample built on the Star Wars universe. Every feature in this repo exists to demonstrate a **real production pattern** — not just to make it run.

> **Jump to a learning track:** [Beginner](#-beginner-track) · [Intermediate](#-intermediate-track) · [Advanced](#-advanced-track)

---

## Project Structure

| Path | Purpose |
|------|---------|
| `db/schema.cds` | Domain model – entities, types, associations |
| `db/hana/` `db/sqlite/` `db/postgres/` | Profile-specific model extensions |
| `srv/*-service.cds` | Service definitions – projections, actions, functions |
| `srv/*-fiori.cds` | Fiori/UI5 annotations (kept separate from service contracts) |
| `srv/services-auth.cds` | Centralized authorization – `@requires` / `@restrict` |
| `srv/*.js` | Service handlers – `before` / `on` / `after` hooks |
| `test/` | Automated tests by layer (model, service, handler) |
| `docs/` | Architecture, learning path, cheat sheet, pitfalls |
| `labs/` | Hands-on exercises with guided steps |
| `app/` | UI frontends and Fiori Launchpad previews |

## Architecture at a Glance

```
Client (Fiori / REST / GraphQL)
        │
        ▼
┌─────────────────────────────────────┐
│         CAP Service Layer (srv/)    │
│  ┌────────────┐  ┌───────────────┐  │
│  │ *-service  │  │ *-fiori.cds   │  │
│  │   .cds     │  │  (UI annot.)  │  │
│  └────────────┘  └───────────────┘  │
│  ┌─────────────────────────────┐    │
│  │  *.js handler lifecycle     │    │
│  │  before → on → after        │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│         Domain Model (db/)          │
│  schema.cds + profile extensions    │
└─────────────────────────────────────┘
        │
        ▼
┌───────────────────────────────────────────┐
│  Persistence (profile-selected at runtime) │
│  SQLite (dev) · SAP HANA (prod) · PG       │
└───────────────────────────────────────────┘
```

See [docs/cap-architecture.md](docs/cap-architecture.md) for the full annotated diagram.

---

## Learning Tracks

### 🟢 Beginner Track
*Goal: understand CDS modeling and how CAP exposes it automatically.*

| # | Task | Where to look |
|---|------|--------------|
| 1 | Read `db/schema.cds` — find entities, types, associations | [db/schema.cds](db/schema.cds) |
| 2 | Start the app (`npm run sqlite`) and browse `/odata/v4/StarWarsPeople/People` | [people-service.cds](srv/people-service.cds) |
| 3 | Open Swagger UI at `http://localhost:4004/api-docs` | [server.js](srv/server.js) |
| 4 | Understand how `@mandatory`, `@assert.range`, `@assert.format` work | [db/schema.cds](db/schema.cds) |
| 5 | Complete **Lab 01** (add a new entity) | [labs/lab-01-model/](labs/lab-01-model/README.md) |

### 🟡 Intermediate Track
*Goal: understand service handlers, events, and custom operations.*

| # | Task | Where to look |
|---|------|--------------|
| 1 | Trace the full `before → on → after` handler lifecycle for People | [people-service.js](srv/people-service.js) |
| 2 | Call the `rename` bound action via HTTP | [people-service.cds](srv/people-service.cds) |
| 3 | Call the `countByGender` unbound function | [people-service.cds](srv/people-service.cds) |
| 4 | Understand how notifications + domain events are emitted | [people-service.js](srv/people-service.js) |
| 5 | Complete **Lab 03** (add your own hook) | [labs/lab-03-handler/](labs/lab-03-handler/README.md) |

### 🔴 Advanced Track
*Goal: master authorization, testing by layer, and multi-profile deployment.*

| # | Task | Where to look |
|---|------|--------------|
| 1 | Study the role matrix (`Viewer / Editor / Admin`) | [services-auth.cds](srv/services-auth.cds) |
| 2 | Read handler-level tests and understand what each layer tests | [test/handler.test.js](test/handler.test.js) |
| 3 | Compare SQLite vs HANA vs PG behavior | [docs/profile-comparison.md](docs/profile-comparison.md) |
| 4 | Work through common pitfalls | [docs/pitfalls.md](docs/pitfalls.md) |
| 5 | Complete **Lab 04** (add role-based auth) | [labs/lab-04-auth/](labs/lab-04-auth/README.md) |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start with SQLite (no external services needed)
npm run sqlite

# Run all tests
npm run test

# Load Star Wars fixture data (SQLite profile)
npm run load_sqlite
```

Browse to <http://localhost:4004> to see the service index, Swagger UI, and Fiori preview.

---

## Runtime Profiles

| Profile | Command | Database | Use when |
|---------|---------|----------|----------|
| `sqlite` | `npm run sqlite` | SQLite (file) | Local development, no external services |
| `hybrid` | `npm run watch` | SAP HANA HDI | Integrated local dev with HANA |
| `pg` | `npm run pg` | PostgreSQL | PostgreSQL-based environments |
| `production` | `cds-serve` | SAP HANA HDI | BTP production deployment |

See [docs/profile-comparison.md](docs/profile-comparison.md) for a full comparison of what changes between profiles.

---

## CDS Configuration Notes

- `cds.requires.queue: true` — enables the persistent outbox queue for reliable event delivery.
- `cds.requires.middlewares: true` — enables the full CAP middleware chain (CORS, authentication, etc.).
- PostgreSQL credentials are intentionally **not hardcoded**; provide them via `.env` (see `cap/.env`).

---

## Validation Commands

```bash
npm run test               # full model + handler test suite
npm run test:profile       # fast profile-scoping regression gate (use in CI)
npm run test:migration     # data conversion / migration tests
```

---

## Learning Resources

| Resource | Link |
|---------|------|
| CAP Architecture (this repo) | [docs/cap-architecture.md](docs/cap-architecture.md) |
| Learning Path | [docs/learning-path.md](docs/learning-path.md) |
| CAP Cheat Sheet | [docs/cap-cheat-sheet.md](docs/cap-cheat-sheet.md) |
| Profile Comparison | [docs/profile-comparison.md](docs/profile-comparison.md) |
| Common Pitfalls | [docs/pitfalls.md](docs/pitfalls.md) |
| Hands-on Labs | [labs/README.md](labs/README.md) |
| Official CAP Docs | <https://cap.cloud.sap/docs/> |

---

## Upgrade Notes

- **Breaking change**: legacy value-help helper endpoints were removed in favor of `*Values` entities.
  Update using [docs/value-help-migration.md](docs/value-help-migration.md).
