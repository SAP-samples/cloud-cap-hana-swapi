# CAP 10 Feature Showcase

This project uses [reCAP 2025](https://cap.cloud.sap) as a live showcase of six CAP 10 capabilities — from production-tier features down to developer-quality-of-life improvements. Each section describes what was installed, what changed, and how to try it.

---

## Feature Ladder

| Tier | Feature | Package / API |
|------|---------|---------------|
| P0 | [MCP Adapter](#1-mcp-adapter) | `@cap-js/mcp@1.1.1` |
| P0 | [AI Core Recommendations](#2-ai-core-recommendations) | `@cap-js/ai@1.0.1` |
| P1 | [Event Queues Scheduling](#3-event-queues-scheduling) | `srv.schedule()` API |
| P1 | [Data Inspector](#4-data-inspector) | `@cap-js/data-inspector@1.0.5` |
| P2 | [cds export](#5-cds-export) | `cds export --to` |
| P2 | [Bypass Drafts + `.affected`](#6-bypass-drafts--affected) | `IsActiveEntity` + `.affected` |

---

## Demo Walkthrough

A sequential path to see all six features in one sitting. Do the one-time setup once, then follow the numbered steps. All links assume the server is running locally at `http://localhost:4004`.

### One-time setup

```bash
cd cap
npm install                 # first time only
npm run build               # generates CDS artifacts + typed models
npm run load_sqlite         # loads Star Wars fixture data into SQLite
```

For the AI Core step (feature 2) you also need the binding once — see [step 2](#step-2-ai-core-recommendations-p0). Everything else works against SQLite with no cloud services.

Then start the server and leave it running:

```bash
npm run sqlite              # serves at http://localhost:4004
```

> For the AI Core demo against real RPT-1, use `npm run watch` (hybrid → SAP HANA + AI Core) instead of `npm run sqlite`. Warm up the RPT-1 deployment before the talk — first inference provisions it and can take a few minutes.

### Landmark URLs (server must be running)

| # | Feature | Open / run |
|---|---------|-----------|
| — | App launchpad | [http://localhost:4004/launchpadPage.html](http://localhost:4004/launchpadPage.html) |
| 1 | MCP tools list (Film) | `curl -X POST http://localhost:4004/mcp/StarWarsFilm -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'` |
| 1 | MCP tools list (Show) | [http://localhost:4004/mcp/StarWarsShow](http://localhost:4004/mcp/StarWarsShow) (POST — see [feature 1](#1-mcp-adapter)) |
| 2 | AI Core recs — Media app | [http://localhost:4004/media/webapp/index.html](http://localhost:4004/media/webapp/index.html) |
| 3 | Scheduling — server log | watch for `[scheduled] - Scheduled featured-show-rotation every 10m` |
| 4 | Data Inspector UI | [http://localhost:4004/data-inspector-ui/](http://localhost:4004/data-inspector-ui/) (login `alice`, no password) |
| 5 | cds export output | `cap/apis/` (see [feature 5](#5-cds-export)) |
| 6 | bypass-drafts + `.affected` | `node --env-file=test/test.env --test test/cap10-features.test.js` |

Other Fiori apps: [Film](http://localhost:4004/film/webapp/index.html) · [People](http://localhost:4004/people/webapp/index.html) · [Show](http://localhost:4004/show/webapp/index.html) · [Viewer (custom app)](http://localhost:4004/viewer/index.html)

### Suggested demo order

1. **MCP (P0)** — In Claude Code, ask a question against the [StarWarsFilm MCP server](#1-mcp-adapter) (e.g. *"which planets appear in the most films?"*). Claude calls `describe` then `query` — no SQL written by you. This is the headline "AI-ready CAP" moment.
2. **AI Core (P0)** — Open the [Media app](http://localhost:4004/media/webapp/index.html), create/edit a record, open the `media_type` / `show_type` / `network` value helps, and point out the RPT-1 recommendations above the standard list.
3. **Scheduling (P1)** — Show the [`srv.schedule()` code](#3-event-queues-scheduling) and the startup log line proving the named singleton task registered over the outbox.
4. **Data Inspector (P1)** — Open the [Data Inspector](http://localhost:4004/data-inspector-ui/), log in as `alice`, and drill into a junction table like `Film2People` to show the many-to-many data live.
5. **cds export (P2)** — Show the committed [`cap/apis/`](#5-cds-export) package — a lossless, publishable client others can `npm add`.
6. **Bypass drafts + `.affected` (P2)** — Run the [test file](#6-bypass-drafts--affected) to show the two API-level improvements green.

---

## 1. MCP Adapter

**What it is:** CAP 10 ships a built-in MCP (Model Context Protocol) adapter that exposes any `@mcp`-annotated service as a tool server consumable by AI agents (Claude Code, VS Code Copilot, etc.). Each service gets its own MCP endpoint with automatically generated `describe`, `query`, and `call_action` tools derived from the CDS model.

**Package:** `@cap-js/mcp@1.1.1`

**Files touched:**
- `cap/package.json` — dependency + `cds.mcp` config block
- `cap/srv/mcp.cds` — new annotation-only file (service contracts untouched)

**Key config in `cap/package.json`:**
```json
{
  "cds": {
    "mcp": {
      "prefix": true,
      "toon_format": true
    }
  }
}
```

`prefix: true` prepends the service name to tool names (e.g. `star-wars-film_query`). `toon_format: true` enables structured output format for LLM consumption.

**`cap/srv/mcp.cds` (verbatim):**
```cds
using { StarWarsShow } from './show-service';
using { StarWarsFilm } from './film-service';

// Expose read-friendly services to MCP-capable agents (e.g. Claude Code).
// Auto-provides describe / query / call_action tools, integrated with CAP
// auth, constraints, and annotations.
//
// The @protocol annotation must include 'mcp' alongside the existing protocols
// (defined in show-service.cds / film-service.cds) so CAP's protocol adapter
// registry mounts the MCP endpoint. The '...' spread preserves existing entries.

annotate StarWarsShow with @protocol: [..., 'mcp'];
annotate StarWarsShow with @mcp;
annotate StarWarsShow with @mcp.instructions:
  'Star Wars shows, episodes, and media. Use describe to explore entities, then query to answer questions about shows, characters, planets, and their relationships.';

annotate StarWarsFilm with @protocol: [..., 'mcp'];
annotate StarWarsFilm with @mcp;
annotate StarWarsFilm with @mcp.instructions:
  'Star Wars films and their many-to-many links to people, planets, species, starships, and vehicles. Use query to answer questions like which planets appear in the most films.';
```

**Non-obvious detail:** `StarWarsShow` and `StarWarsFilm` already declare explicit `@protocol` arrays in their service files. CAP's protocol adapter uses the `@protocol` array exclusively when it is set — `@mcp` alone would not mount the endpoint. The `[..., 'mcp']` CDS spread syntax appends `'mcp'` while preserving all existing protocols. This is why the annotation lives in `mcp.cds` rather than being added to the service files directly.

**Try it:**
```bash
# Start the server
cd cap && npm run sqlite

# Call the MCP tools/list endpoint for StarWarsFilm
curl -s -X POST http://localhost:4004/mcp/StarWarsFilm \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'

# Or for StarWarsShow
curl -s -X POST http://localhost:4004/mcp/StarWarsShow \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Expected: each endpoint returns `star-wars-film_query`, `star-wars-film_describe` (or `star-wars-show_*`). To use the tools from Claude Code, add `http://localhost:4004/mcp/StarWarsFilm` as an MCP server in `.claude/settings.json`.

---

## 2. AI Core Recommendations

**What it is:** The `@cap-js/ai` plugin auto-attaches SAP AI Core RPT-1 (recommendation) inference to any entity field annotated with `@Common.ValueList`. When a user opens a value-help dropdown in a Fiori app, the plugin queries the configured AI Core deployment and injects ranked recommendations above the standard value list. No CDS changes are needed if the annotations already exist.

**Package:** `@cap-js/ai@1.0.1`

**Files touched:**
- `cap/package.json` — `"@cap-js/ai": "1.0.1"` dependency added
- `cap/.cdsrc-private.json` — AI Core binding (git-ignored, not committed)
- `cap/srv/media-fiori.cds` — no changes needed (pre-existing `@Common.ValueList` annotations on `media_type`, `show_type`, `network`)

**How it works:** The three value-help fields on `StarWarsShow.Media` already carry `@Common.ValueList` annotations in `srv/media-fiori.cds`. Installing the plugin is sufficient — it self-registers against those annotations at startup.

**Binding the AI Core service (hybrid profile):**
```bash
# Must specify the CDS service name explicitly
cds bind AICore -2 ai-core-sap-internal
```

Note: `cds bind -2 ai-core-sap-internal` (without `AICore`) fails with `unknown CDS service name` — the service name prefix is required.

**Verify the binding resolves:**
```bash
cds env requires.AICore --profile hybrid
```

Expected output includes `"kind": "AICore-btp"` and the `binding` block with CF org/space/instance.

**Try it:**
```bash
# Hybrid mode (requires .cdsrc-private.json with AICore binding)
cd cap && npm run watch

# Open the Media Fiori app and create/edit a Media record.
# The media_type, show_type, and network fields should show AI recommendations
# above the standard value list when opened.
```

Without an active RPT-1 deployment in AI Core, the plugin degrades gracefully — no recommendations shown, no errors. For local/SQLite dev, the plugin falls back to `AICore-mocked` automatically.

---

## 3. Event Queues Scheduling

**What it is:** CAP 10's Event Queues API adds `srv.schedule(eventName, data).every(interval).as(name)` — a named singleton schedule that fires a service event on a recurring interval via the outbox. The schedule is registered once and deduplicated by name; it survives server restarts because it is persisted in the outbox queue.

**Files touched:**
- `cap/srv/scheduled.js` — new file: pure `pickFeaturedShow()` helper + `register(srv)` function
- `cap/srv/show-service.js` — calls `require('./scheduled').register(this)` inside `cds.service.impl`
- `cap/test/scheduled.test.js` — unit tests for `pickFeaturedShow`

**`cap/srv/scheduled.js` (verbatim):**
```js
'use strict'

const cds = require('@sap/cds')
const LOG = cds.log('scheduled')

/** Deterministically pick one show by seed (round-robin). Pure + exported for unit tests. */
function pickFeaturedShow(shows, seed) {
  if (!shows || shows.length === 0) return undefined
  return shows[seed % shows.length]
}

/** Attach the scheduled featured-show rotation to an existing service instance. */
function register(srv) {
  const { Show } = srv.entities
  const { SELECT } = cds.ql

  // Handle the scheduled event: rotate the featured show and emit a domain event.
  srv.on('rotateFeaturedShow', async req => {
    const shows = await SELECT.from(Show).columns('ID', 'title')
    // Rotate based on elapsed minutes so each scheduled tick features a different show.
    const seed = req.data?.tick ?? Math.floor(Date.now() / 60000)
    const featured = pickFeaturedShow(shows, seed)
    if (!featured) return LOG.warn('No shows to feature')
    LOG.info('Featured show rotated to', featured.title, featured.ID)
    await srv.emit('Show.Refreshed.v1', { ID: featured.ID })
  })

  // Register a named singleton schedule over the outbox (CAP 10 Event Queues scheduling API).
  cds.once('served', async () => {
    try {
      await srv.schedule('rotateFeaturedShow', {}).every('10m').as('featured-show-rotation')
      LOG.info('Scheduled featured-show-rotation every 10m')
    } catch (e) {
      LOG.warn('Could not register schedule:', e.message)
    }
  })
}

module.exports = { pickFeaturedShow, register }
```

**Architecture note:** `scheduled.js` is NOT a `cds.service.impl` — it exports a plain `register(srv)` function that binds the handler and schedule to the `StarWarsShow` service instance. No CDS action declaration is needed; CAP dispatches scheduled events by name through the outbox without a CDS declaration.

**Try it:**
```bash
cd cap && npm run sqlite
# Look for this line in the startup log:
# [scheduled] - Scheduled featured-show-rotation every 10m
```

With a populated database (after `npm run load_sqlite`), the rotation log shows:
```
[scheduled] - Featured show rotated to <title> <ID>
```

With an empty SQLite in-memory database, you will see `[scheduled] - No shows to feature` on the first tick — expected, non-blocking behavior.

---

## 4. Data Inspector

**What it is:** `@cap-js/data-inspector` is a CAP 10 plugin that serves a browsable UI over all CAP entities at `/data-inspector-ui/`. It respects CAP authentication (requires login), uses the running app's service layer, and requires zero configuration to show entity data, counts, and column types.

**Package:** `@cap-js/data-inspector@1.0.5`

**Install note:** `cds add data-inspector` is NOT supported in `@sap/cds-dk` 10.0.4 — that facet does not exist in this version. Install directly:
```bash
npm add @cap-js/data-inspector@1.0.5
```
The plugin self-registers in the CAP build pipeline automatically — no `cds add` step required.

**Files touched:**
- `cap/package.json` — `"@cap-js/data-inspector": "1.0.5"` dependency added
- `cap/package-lock.json` — lockfile updated

No exclusions file (`srv/data-inspector.cds`) was created — all Star Wars domain entities are appropriate for inspection.

**Try it:**
```bash
cd cap && npm run sqlite
# Then open:
# http://localhost:4004/data-inspector-ui/
# Log in as: alice  (no password)
```

You can browse any entity (e.g., People, Film, Show, Film2People) — the inspector shows live row counts, column names, types, and sample data. It is particularly useful for inspecting junction tables like `Film2People` and `Episode2People`.

---

## 5. cds export

**What it is:** `cds export` generates a lossless CDS API client package from a service definition — a self-contained npm package with a `services.csn` snapshot and `index.cds` facade that any CAP consumer can import with `using from 'cap-hana-swapi-apis'`. The `--to` flag specifies the output directory; without it, the command streams JSON to stdout.

**Files produced:** `cap/apis/` (committed to git)

**Command (the `--to` flag is required for directory output):**
```bash
cd cap
cds export srv/data-service.cds --to apis/
```

Output:
```
Exporting APIs to apis ...

  > apis\index.cds
  > apis\services.csn
  > apis\package.json
```

**`cap/apis/package.json`:**
```json
{
  "name": "cap-hana-swapi-apis",
  "version": "2.1.0"
}
```
The `name` is derived from the project's own package name (`cap-hana-swapi`) with a `-apis` suffix; the `version` mirrors the project version.

**`cap/apis/index.cds`:**
```cds
// This file acts as a central facade to exported service definitions.
// You can modify it to tweak things, without your changes being overridden.
using from './services';
```

The `services.csn` snapshot carries `@cds.external: 2` on the exported service, marking it as an external API consumer package. The CSN version is `"2.0"` and the creator is `CDS Compiler v7.0.1`.

**Try it (consuming the package):**
```bash
# In a separate CAP project:
npm add /path/to/cloud-cap-hana-swapi/cap/apis

# Then in any .cds file:
using { DataService } from 'cap-hana-swapi-apis';
```

To regenerate after a model change:
```bash
cd cap && cds export srv/data-service.cds --to apis/
```
Re-running preserves the user-editable `index.cds` and regenerates only `services.csn`.

---

## 6. Bypass Drafts + `.affected`

**What it is:** Two related CAP 10 behavior improvements covered by `cap/test/cap10-features.test.js`:

1. **Bypass drafts** — A non-Fiori client can read the active (non-draft) entity set by including `IsActiveEntity eq true` in an OData `$filter`. CAP 10 accepts this without a Fiori draft session cookie, treating it as a plain active-entity read.

2. **Uniform `.affected`** — CAP 10 consolidated DB-service write APIs so that every `INSERT`/`UPDATE`/`DELETE` result object exposes a numeric `.affected` property indicating rows written. This property is non-enumerable (invisible to `JSON.stringify`), but always present.

**File touched:** `cap/test/cap10-features.test.js` (new)

**`cap/test/cap10-features.test.js` (verbatim):**
```js
'use strict'
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

/**
 * CAP 10 behaviour tests — bypass drafts + uniform .affected
 *
 * Test 1: Bypass drafts
 *   StarWarsShow.Show is @odata.draft.enabled.  A non-Fiori client can read
 *   the *active* data set by supplying `IsActiveEntity eq true` in the
 *   $filter.  CAP 10 accepts this without a Fiori-draft session cookie.
 *
 * Test 2: Uniform .affected
 *   CAP 10 consolidated DB-service write APIs so every INSERT/UPDATE/DELETE
 *   result exposes a numeric `.affected` property (non-enumerable) indicating
 *   how many rows were written.  Verified shape: result object whose
 *   JSON.stringify produces the inserted rows array and whose `.affected`
 *   equals the number of rows written.
 */

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const cds = require('@sap/cds')
const { INSERT, DELETE } = cds.ql

describe('CAP 10 — bypass drafts + .affected', () => {
  const { GET } = cds.test(__dirname + '/..')

  it('reads active data directly with IsActiveEntity=true (bypass drafts)', async () => {
    // Seed one Show so we can assert the returned entity truly has IsActiveEntity=true.
    const db = await cds.connect.to('db')
    await db.run(INSERT.into('star.wars.Show').entries({ title: 'Bypass-Draft-Test-Show' }))

    // Non-Fiori GET with IsActiveEntity filter — CAP 10 treats this as a
    // plain active-entity read, not a Fiori draft protocol request.
    const { status, data } = await GET(
      `/odata/v4/StarWarsShow/Show?$filter=IsActiveEntity eq true&$top=5`
    )
    assert.equal(status, 200, 'OData endpoint should return 200')
    assert.ok(Array.isArray(data.value), 'response should have a value array')
    assert.ok(data.value.length >= 1, 'seeded Show must appear in active-entity results')

    // Every row returned must be the active entity (IsActiveEntity = true)
    for (const row of data.value) {
      assert.equal(row.IsActiveEntity, true,
        `All rows must have IsActiveEntity=true; got: ${JSON.stringify(row.IsActiveEntity)}`)
    }

    // Cleanup
    await db.run(DELETE.from('star.wars.Show').where({ title: 'Bypass-Draft-Test-Show' }))
  })

  it('exposes uniform .affected (number) on a write result', async () => {
    const db = await cds.connect.to('db')
    const res = await db.run(
      INSERT.into('star.wars.Show').entries({ title: 'CAP10-Affected-Test-Show' })
    )

    // CAP 10 consolidated DB-service write APIs: `.affected` is a number >= 1.
    // It is a non-enumerable property on the result (JSON.stringify shows the
    // inserted rows array, not the .affected value).
    assert.strictEqual(typeof res.affected, 'number',
      `write result .affected should be a number; got type: ${typeof res.affected}`)
    assert.ok(res.affected >= 1,
      `write result .affected should be >= 1; got: ${res.affected}`)

    // Cleanup
    await db.run(DELETE.from('star.wars.Show').where({ title: 'CAP10-Affected-Test-Show' }))
  })
})
```

**Key findings from `.affected` shape investigation:**
```
{
  "type": "object",
  "keys": [],          // non-enumerable — Object.keys() returns []
  "affected": 1,       // always a number >= 1 after a successful write
  "serialized": "[{\"ID\":\"b6a5ab7c-...\"}]"  // JSON.stringify shows the inserted rows
}
```

**Try it:**
```bash
cd cap
node --env-file=test/test.env --test --test-timeout 60000 test/cap10-features.test.js
```

Expected:
```
▶ CAP 10 — bypass drafts + .affected
  ✔ reads active data directly with IsActiveEntity=true (bypass drafts)
  ✔ exposes uniform .affected (number) on a write result
✔ CAP 10 — bypass drafts + .affected
ℹ tests 2  pass 2  fail 0
```

---

## Running All Tests

```bash
cd cap
npm test
```

The `cap10-features.test.js` and `scheduled.test.js` tests run as part of the full suite. To run only the CAP 10 tests:

```bash
node --env-file=test/test.env --test --test-timeout 60000 test/cap10-features.test.js
node --env-file=test/test.env --test test/scheduled.test.js
```

---

## Implementation Summary

| Feature | Package/API | New files | Config change |
|---------|-------------|-----------|---------------|
| MCP Adapter | `@cap-js/mcp@1.1.1` | `srv/mcp.cds` | `cds.mcp.{prefix,toon_format}` |
| AI Core | `@cap-js/ai@1.0.1` | none | `cds bind AICore` (private) |
| Scheduling | `srv.schedule()` API | `srv/scheduled.js`, `test/scheduled.test.js` | none |
| Data Inspector | `@cap-js/data-inspector@1.0.5` | none | none |
| cds export | `cds export --to` | `apis/` directory | none |
| bypass-drafts/.affected | built-in CAP 10 | `test/cap10-features.test.js` | none |
