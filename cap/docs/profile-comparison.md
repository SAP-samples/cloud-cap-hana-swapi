# Runtime Profile Comparison

CAP supports multiple database backends via profiles. The same service code runs unchanged — only persistence configuration and model extensions differ.

## Quick Reference

| Feature | `sqlite` (dev) | `hybrid` (HANA + local) | `pg` (PostgreSQL) | `production` (HANA) |
|---------|----------------|------------------------|---------------------|---------------------|
| **Start command** | `npm run sqlite` | `npm run watch` | `npm run pg` | `cds-serve` |
| **Database** | SQLite (local file) | SAP HANA HDI container | PostgreSQL | SAP HANA HDI container |
| **Credentials** | None needed | BTP service binding | `.env` file | BTP service binding |
| **External services** | Mocked | Real (Alert Notification, etc.) | Mocked | Real |
| **Profile CDS loaded** | `db/sqlite/index.cds` | `db/hana/index.cds` | `db/postgres/index.cds` | `db/hana/index.cds` |
| **Schema journal** | Ignored | Active (`@cds.persistence.journal`) | Ignored | Active |
| **Multitenancy** | Not applicable | Optional | Not applicable | Supported |
| **Best for** | Unit tests, fast iteration | Integration testing | PostgreSQL-specific work | BTP deployment |

## What changes between profiles

### Database features

| Feature | SQLite | HANA | PostgreSQL |
|---------|--------|------|-----------|
| UUID generation | CAP generates | HANA native | CAP generates |
| Case sensitivity | Case-insensitive | Case-insensitive | Case-sensitive by default |
| Regex in SQL | Not supported | Not supported | `~` operator |
| Full-text search | Limited | HANA full-text | `tsvector` |
| Schema migrations | Recreate | `@cds.persistence.journal` | Recreate |
| Concurrent access | Single writer | Fully concurrent | Fully concurrent |
| Connection pool | Single file | HDI container | pg pool |

### What stays the same (CAP portability guarantee)

- All CDS entity/service definitions
- All handler code (`before`/`on`/`after`)
- All OData, REST, GraphQL endpoints
- All authorization annotations
- All tests (using SQLite in-memory for speed)

### Profile-specific CDS extensions

**`db/hana/index.cds`** — adds HANA-native features:
```cds
using from '../schema';
// HANA-specific: activate schema evolution journal
// Profile selection: CDS only loads this when profile=hana or profile=hybrid
```

**`db/sqlite/index.cds`** — minimal, just pulls in base schema:
```cds
using from '../schema';
// SQLite has no special extensions needed for this sample
```

**`db/postgres/index.cds`** — PostgreSQL extensions:
```cds
using from '../schema';
// PostgreSQL-specific: adjust any behavior here
```

## Switching profiles

```bash
# Development (SQLite, no external services)
npm run sqlite

# Integration testing with HANA (requires HDI container binding)
npm run watch        # hybrid profile

# PostgreSQL (requires .env with PG credentials)
npm run pg

# Deploy to HANA
npm run hana         # creates HDI container and deploys schema

# Load fixture data (pick the right profile)
npm run load_sqlite  # SQLite
npm run load         # hybrid/HANA
npm run load_pg      # PostgreSQL
```

## Profile configuration in `package.json`

CAP reads profile config from `package.json` under `cds`:

```json
{
  "cds": {
    "requires": {
      "db": "sqlite"
    },
    "[sqlite]": {
      "requires": {
        "db": { "kind": "sqlite", "credentials": { "url": "db.sqlite" } }
      }
    },
    "[hybrid]": {
      "requires": {
        "db": { "kind": "hana" }
      }
    }
  }
}
```

The `[profile]` blocks override the base `requires` when `--profile <name>` is passed.

## Testing across profiles

All automated tests run against **SQLite in-memory** regardless of profile, which means:
- Fast test execution (no external service needed)
- Complete isolation between test runs
- No test data left in a real database

The test runner sets `CDS_ENV=sqlite` and `CDS_REQUIRES_DB_CREDENTIALS_URL=:memory:` before loading CDS.

To verify HANA-specific behavior, you must run integration tests against a real HDI container:
```bash
npm run watch   # start in hybrid mode first
# then run specific integration test scripts
```
