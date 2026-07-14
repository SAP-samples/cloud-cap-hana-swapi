# CAP 10 Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate six CAP 10 (June 2026) features into the Star Wars CAP sample as additive, isolated changes, ready to demo at reCAP.

**Architecture:** Each feature is one new file, one annotation, or one plugin — no rewrites of existing services. Work proceeds in a strict priority ladder (P0 → P2), committing after each feature so there is always a working checkpoint. If a feature misbehaves, removing its one file/line/plugin leaves the tiers above it green.

**Tech Stack:** SAP CAP 10 (`@sap/cds ^10.0.3`), Node.js 22+, `node:test` runner, SQLite (local/test), SAP HANA (hybrid/prod). New plugins: `@cap-js/mcp` `1.1.1`, `@cap-js/ai` `1.0.1`, `@cap-js/data-inspector` `1.0.5`.

## Global Constraints

- All npm/cds commands run from `cap/` (implementation code lives under `cap/`).
- Node.js floor: `>=22`. Do not lower.
- File separation rule: service contracts → `*-service.cds`; Fiori/UI annotations → `*-fiori.cds`; MCP/protocol annotations → their own new file; authorization → `services-auth.cds`; runtime logic → `*.js`. Never mix.
- Tests use the built-in `node:test` runner only (no Jest/Mocha). Test env: `CDS_ENV=sqlite`, `CDS_REQUIRES_DB_CREDENTIALS_URL=:memory:` (already in `test/test.env`).
- Never write raw SQL — use `cds.ql` / CQL.
- After any CDS model change, run `npm run build` in `cap/` to regenerate artifacts.
- Resolve entity/field definitions with `cds-mcp` before modifying models; check CAP docs via `cds-mcp` before proposing CDS syntax or API usage.
- Commit after each task. Build strictly in ladder order.

---

## File structure

| File | Responsibility | Feature |
|------|----------------|---------|
| `cap/srv/mcp.cds` (new) | `@mcp` + `@mcp.instructions` annotations on read services | P0 MCP |
| `cap/package.json` (modify) | add plugin deps; `cds.mcp` config | P0, P1 |
| `cap/srv/media-fiori.cds` (modify, optional) | `@UI.RecommendationState` tuning | P0 AI Core |
| `cap/srv/scheduled.js` (new) | named singleton scheduled task via outbox | P1 Scheduling |
| `cap/srv/data-inspector.cds` (new, optional) | `@HideFromDataInspector` exclusions | P1 Inspector |
| `cap/test/scheduled.test.js` (new) | test scheduled handler registration/logic | P1 Scheduling |
| `cap/test/cap10-features.test.js` (new) | bypass-drafts + `.affected` tests | P2 |
| `cap/docs/cap10-showcase.md` (new) | feature-by-feature showcase doc | all |
| `cap/apis/` (generated) | `cds export` output | P2 export |

---

### Task 1: MCP adapter (P0)

**Files:**
- Modify: `cap/package.json` (add `@cap-js/mcp` dependency + `cds.mcp` config)
- Create: `cap/srv/mcp.cds`

**Interfaces:**
- Consumes: existing services `StarWarsShow`, `StarWarsFilm` (from `srv/show-service.cds`, `srv/film-service.cds`).
- Produces: MCP endpoint at `/mcp` exposing `describe`, `query`, `call_action` tools for annotated services.

- [ ] **Step 1: Install the plugin**

Run from `cap/`:
```bash
npm add @cap-js/mcp@1.1.1
```
Expected: `package.json` dependencies gains `"@cap-js/mcp": "^1.1.1"`; install succeeds.

- [ ] **Step 2: Create the MCP annotation file**

Create `cap/srv/mcp.cds`:
```cds
using { StarWarsShow } from './show-service';
using { StarWarsFilm } from './film-service';

// Expose read-friendly services to MCP-capable agents (e.g. Claude Code).
// Auto-provides describe / query / call_action tools, integrated with CAP
// auth, constraints, and annotations.
annotate StarWarsShow with @mcp;
annotate StarWarsShow with @mcp.instructions:
  'Star Wars shows, episodes, and media. Use describe to explore entities, then query to answer questions about shows, characters, planets, and their relationships.';

annotate StarWarsFilm with @mcp;
annotate StarWarsFilm with @mcp.instructions:
  'Star Wars films and their many-to-many links to people, planets, species, starships, and vehicles. Use query to answer questions like which planets appear in the most films.';
```

- [ ] **Step 3: Add MCP config to package.json**

In `cap/package.json`, under the top-level `"cds"` object, add a `"mcp"` key alongside the existing `"protocols"` key:
```json
"mcp": {
  "prefix": true,
  "toon_format": true
}
```
(`prefix: true` slugifies tool names per service — `starwarsshow_query`, `starwarsfilm_describe` — avoiding collisions when multiple MCP servers connect.)

- [ ] **Step 4: Build to regenerate artifacts**

Run from `cap/`:
```bash
npm run build
```
Expected: build succeeds, no CDS compile errors on the new annotations.

- [ ] **Step 5: Verify the MCP endpoint serves**

Start the server and confirm the adapter registers. Run from `cap/`:
```bash
npm run sqlite &
sleep 8
curl -s -X POST http://localhost:4004/mcp \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | head -c 2000
kill %1
```
Expected: JSON-RPC response listing tools (names include `describe`/`query`/`call_action`, prefixed per service). If the exact path or payload differs by plugin version, confirm against `https://cap.cloud.sap/docs/guides/protocols/mcp` — the deliverable is a resolvable tools list.

- [ ] **Step 6: Commit**

```bash
git add cap/package.json cap/package-lock.json cap/srv/mcp.cds
git commit -m "feat(cap10): expose Show and Film services via MCP adapter"
```

---

### Task 2: AI Core recommendations (P0)

**Files:**
- Modify: `cap/package.json` (add `@cap-js/ai`)
- Modify (optional): `cap/srv/media-fiori.cds` (recommendation tuning)

**Interfaces:**
- Consumes: existing `@Common.ValueList` annotations on `StarWarsShow.Media` fields `media_type`, `show_type`, `network` (in `srv/media-fiori.cds`) — the plugin auto-hooks these.
- Produces: RPT-1-powered value recommendations on those Media fields in the Fiori editor; an `AICore` CAP service (`cds.connect.to('AICore')`).

- [ ] **Step 1: Install the plugin**

Run from `cap/`:
```bash
npm add @cap-js/ai@1.0.1
```
Expected: `package.json` gains `"@cap-js/ai": "^1.0.1"`.

- [ ] **Step 2: Bind SAP AI Core (hybrid profile)**

The plugin needs an AI Core binding. Bind the instance into local hybrid config:
```bash
cds bind -2 <ai-core-instance-name>
```
Expected: binding written to `.cdsrc-private.json` (git-ignored). Confirm with:
```bash
cds env requires.AICore --profile hybrid
```
Expected: shows resolved AICore credentials/kind. (If no instance name is known, list with `cf services`.)

- [ ] **Step 3: Build**

Run from `cap/`:
```bash
npm run build
```
Expected: build succeeds. No CDS changes required — recommendations attach automatically to the existing value-help fields on Media.

- [ ] **Step 4: Verify recommendations at runtime**

Run from `cap/`:
```bash
npm run watch
```
Open the Media Fiori app, create/edit a Media record, and confirm the `media_type` / `show_type` / `network` fields surface RPT-1 recommendations (as default values and/or in the value help). Confirm the `AICore` service is connectable:
```bash
cds repl --profile hybrid
> await cds.connect.to('AICore')
```
Expected: recommendations appear in the editor; `AICore` service connects without error.

- [ ] **Step 5 (optional): Tune recommendation state**

If any field should not show recommendations, add to `cap/srv/media-fiori.cds` inside the existing `annotate sws.Media with { ... }` block:
```cds
network @UI.RecommendationState : 0;
```
(0 = off. Skip this step if all three fields should keep recommendations.)

- [ ] **Step 6: Commit**

```bash
git add cap/package.json cap/package-lock.json cap/srv/media-fiori.cds
git commit -m "feat(cap10): add AI Core RPT-1 recommendations on Media value-help fields"
```

---

### Task 3: Event Queues Scheduling (P1)

**Files:**
- Create: `cap/srv/scheduled.js`
- Create: `cap/test/scheduled.test.js`

**Interfaces:**
- Consumes: the outbox already enabled via `cds.requires.queue: true`; the `StarWarsShow` service.
- Produces: a named singleton scheduled task `featured-show-rotation` that periodically selects a rotating "featured" Show and emits `Show.Refreshed.v1`. Exposes a testable pure function `pickFeaturedShow(shows, seed)` returning one show row.

- [ ] **Step 1: Write the failing test**

Create `cap/test/scheduled.test.js`:
```js
'use strict'
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const { pickFeaturedShow } = require('../srv/scheduled')

describe('Scheduled featured-show rotation', () => {
  const shows = [{ ID: 'a' }, { ID: 'b' }, { ID: 'c' }]

  it('picks a deterministic show for a given seed', () => {
    assert.equal(pickFeaturedShow(shows, 0).ID, 'a')
    assert.equal(pickFeaturedShow(shows, 1).ID, 'b')
    assert.equal(pickFeaturedShow(shows, 4).ID, 'b') // wraps: 4 % 3 = 1
  })

  it('returns undefined for an empty list', () => {
    assert.equal(pickFeaturedShow([], 0), undefined)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run from `cap/`:
```bash
node --env-file=test/test.env --test test/scheduled.test.js
```
Expected: FAIL — `pickFeaturedShow is not a function` / cannot find module export.

- [ ] **Step 3: Write the handler with the pure helper**

Create `cap/srv/scheduled.js`:
```js
const cds = require('@sap/cds')
const LOG = cds.log('scheduled')

/**
 * Deterministically pick one show by seed (round-robin).
 * Pure + exported so it is unit-testable without a DB.
 */
function pickFeaturedShow(shows, seed) {
  if (!shows || shows.length === 0) return undefined
  return shows[seed % shows.length]
}

module.exports = cds.service.impl(async function () {
  const { Show } = this.entities

  // Handle the scheduled event: rotate the featured show and emit an event.
  this.on('rotateFeaturedShow', async req => {
    const shows = await SELECT.from(Show).columns('ID', 'title')
    const featured = pickFeaturedShow(shows, req.data?.tick ?? 0)
    if (!featured) return LOG.warn('No shows to feature')
    LOG.info('Featured show rotated to', featured.title, featured.ID)
    await this.emit('Show.Refreshed.v1', { ID: featured.ID })
  })

  // Register a named singleton schedule (survives restart, tenant-aware, scaled-safe).
  // Uses the CAP 10 Event Queues scheduling API over the existing outbox.
  cds.once('served', async () => {
    try {
      await this.schedule('rotateFeaturedShow', { tick: 0 })
        .every('10m')
        .as('featured-show-rotation')
      LOG.info('Scheduled featured-show-rotation every 10m')
    } catch (e) {
      LOG.warn('Could not register schedule:', e.message)
    }
  })
})

module.exports.pickFeaturedShow = pickFeaturedShow
```

Note: `rotateFeaturedShow` must be a known event/action on the service. Since `StarWarsShow` is defined in CDS, add the action to a new annotation-free extension is not allowed in a `*.js`. Instead register the handler on a custom event name via `this.on(...)` as above — CAP dispatches scheduled emits by event name through the outbox without requiring a CDS action declaration. If the plugin version requires a declared action, declare it in `srv/show-service.cds` as `action rotateFeaturedShow(tick: Integer);` (verify via cds-mcp before adding).

- [ ] **Step 4: Wire the handler to a service**

The handler must be bound to a service. Confirm `show-service.js` is the impl for `StarWarsShow`; register the scheduled logic by requiring it. In `cap/srv/show-service.cds`, confirm the service name, then attach the impl by adding to `cap/package.json` is not needed — instead, make `scheduled.js` the impl for a lightweight internal service OR merge into `show-service.js`. To keep isolation, register it as an additional impl: add at the end of `cap/srv/show-service.js`:
```js
// CAP 10 Event Queues scheduling showcase — see srv/scheduled.js
require('./scheduled')
```
Verify `show-service.js` exports via `cds.service.impl` (the `require` executes the registration against the same service). If `scheduled.js` needs its own service binding, confirm the impl wiring with cds-mcp / CAP docs before finalizing.

- [ ] **Step 5: Run the unit test to verify it passes**

Run from `cap/`:
```bash
node --env-file=test/test.env --test test/scheduled.test.js
```
Expected: PASS (both tests).

- [ ] **Step 6: Verify the schedule registers at runtime**

Run from `cap/`:
```bash
npm run sqlite 2>&1 | grep -i "featured-show-rotation" &
sleep 8
kill %1 2>/dev/null
```
Expected: log line `Scheduled featured-show-rotation every 10m`.

- [ ] **Step 7: Commit**

```bash
git add cap/srv/scheduled.js cap/srv/show-service.js cap/test/scheduled.test.js
git commit -m "feat(cap10): add named singleton scheduled task via Event Queues API"
```

---

### Task 4: Data Inspector plugin (P1)

**Files:**
- Modify: `cap/package.json` (add `@cap-js/data-inspector`, config via `cds add`)
- Create (optional): `cap/srv/data-inspector.cds` (`@HideFromDataInspector` exclusions)

**Interfaces:**
- Consumes: all deployed entities (Star Wars domain model).
- Produces: Data Inspector UI at `/data-inspector-ui/` for browsing entity data with CAP security applied.

- [ ] **Step 1: Add the plugin via cds add**

Run from `cap/`:
```bash
cds add data-inspector
```
Expected: `@cap-js/data-inspector` added to dependencies and required config written. If `cds add data-inspector` is unavailable in this dk version, fall back to `npm add @cap-js/data-inspector@1.0.5`.

- [ ] **Step 2: Build**

Run from `cap/`:
```bash
npm run build
```
Expected: build succeeds.

- [ ] **Step 3: Verify the inspector UI loads**

Run from `cap/`:
```bash
npm run sqlite &
sleep 8
curl -s -o /dev/null -w "%{http_code}" http://localhost:4004/data-inspector-ui/
kill %1
```
Expected: HTTP `200`. (Interactive check: open `http://localhost:4004/data-inspector-ui/`, log in as `alice` with no password, drill into `People` → `Film2People`.)

- [ ] **Step 4 (optional): Exclude sensitive/noise entities**

If any generated/internal entity should be hidden, create `cap/srv/data-inspector.cds`:
```cds
using { star.wars as sw } from '../db/schema';
// Example: hide a technical entity from the inspector. Adjust targets as needed.
// annotate sw.SomeInternalEntity with @HideFromDataInspector;
```
Skip if nothing needs hiding (leave no empty file — only create if used).

- [ ] **Step 5: Commit**

```bash
git add cap/package.json cap/package-lock.json cap/srv/data-inspector.cds 2>/dev/null; git add -A cap/
git commit -m "feat(cap10): add Data Inspector plugin for live entity data browsing"
```

---

### Task 5: cds export (P2)

**Files:**
- Generated: `cap/apis/` (from `cds export`)

**Interfaces:**
- Consumes: `srv/data-service.cds` (`DataService`).
- Produces: a lossless CDS API client package under `cap/apis/`.

- [ ] **Step 1: Export the DataService client package**

Run from `cap/`:
```bash
cds export srv/data-service.cds
```
Expected: a package generated under `cap/apis/` (e.g. `cap/apis/data-service/` or similar) containing the CSN + package.json. If the command name/flags differ, verify with `cds export --help`.

- [ ] **Step 2: Verify the generated package**

Run from `cap/`:
```bash
ls -R apis/ | head -40
```
Expected: a directory with `package.json` and CSN/model files preserving the DataService definition.

- [ ] **Step 3: Decide git tracking**

The exported package is a build artifact. Add `cap/apis/` to `cap/.gitignore` unless it is meant to be published from the repo. For the demo, track it so it is visible:
```bash
# (Only if it should be committed for the demo)
git add cap/apis
```
Confirm intent before committing generated output.

- [ ] **Step 4: Commit**

```bash
git commit -m "feat(cap10): export DataService as a lossless CDS API client package"
```
(If `apis/` is git-ignored instead, commit only the `.gitignore` change with the same message.)

---

### Task 6: Bypass drafts + uniform `.affected` (P2)

**Files:**
- Create: `cap/test/cap10-features.test.js`

**Interfaces:**
- Consumes: draft-enabled `StarWarsShow.Show` (has `@odata.draft.enabled`).
- Produces: tests demonstrating (a) non-Fiori read of active data with `IsActiveEntity=true`, and (b) uniform write results exposing `.affected`.

- [ ] **Step 1: Write the failing test**

Create `cap/test/cap10-features.test.js`:
```js
'use strict'
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

const { describe, it, before } = require('node:test')
const assert = require('node:assert/strict')
const cds = require('@sap/cds')
const { INSERT } = cds.ql

describe('CAP 10 — bypass drafts + .affected', () => {
  const { GET } = cds.test(__dirname + '/..')

  it('reads active data directly with IsActiveEntity=true (bypass drafts)', async () => {
    // Non-Fiori client hitting active data of a draft-enabled entity.
    const { status, data } = await GET(
      `/odata/v4/StarWarsShow/Show?$filter=IsActiveEntity eq true&$top=1`
    )
    assert.equal(status, 200)
    assert.ok(Array.isArray(data.value))
  })

  it('exposes uniform .affected on a write result', async () => {
    const db = await cds.connect.to('db')
    const res = await db.run(
      INSERT.into('star.wars.Show').entries({ title: 'CAP10 Test Show' })
    )
    // CAP 10 consolidated service APIs: writes carry .affected.
    assert.ok(res.affected !== undefined, 'write result should expose .affected')
  })
})
```

- [ ] **Step 2: Run test to verify it fails (or reveals real behavior)**

Run from `cap/`:
```bash
node --env-file=test/test.env --test --test-timeout 60000 test/cap10-features.test.js
```
Expected: initial run may FAIL if the OData path or `.affected` shape differs. Use the failure output to correct the path/assertion (e.g. confirm the exact entity name via cds-mcp: `star.wars.Show`), then re-run. The goal is a passing test that genuinely exercises both behaviors.

- [ ] **Step 3: Adjust assertions to match verified behavior**

Using cds-mcp to confirm the `StarWarsShow.Show` entity path and the domain entity name, correct any path/name mismatch in the test so both assertions pass against real runtime behavior. (No production code change — this task documents CAP 10 behavior via tests.)

- [ ] **Step 4: Run test to verify it passes**

Run from `cap/`:
```bash
node --env-file=test/test.env --test --test-timeout 60000 test/cap10-features.test.js
```
Expected: PASS (both tests).

- [ ] **Step 5: Commit**

```bash
git add cap/test/cap10-features.test.js
git commit -m "test(cap10): demonstrate bypass-drafts read and uniform .affected writes"
```

---

### Task 7: Showcase documentation (all tiers)

**Files:**
- Create: `cap/docs/cap10-showcase.md`

**Interfaces:**
- Consumes: everything built in Tasks 1–6.
- Produces: a feature-by-feature doc that auto-flows into the VitePress site via `site/scripts/copy-content.js`.

- [ ] **Step 1: Write the showcase doc**

Create `cap/docs/cap10-showcase.md` with sections in ladder order (MCP, AI Core, Scheduling, Data Inspector, cds export, bypass-drafts/`.affected`). For each: what the CAP 10 feature is, the exact package/annotation/command used here, the file(s) touched, and the "try it" step (endpoint/URL/command). Keep code snippets copied verbatim from the implemented files so the doc stays accurate.

- [ ] **Step 2: Verify it renders in the site build**

Run from `site/`:
```bash
npm run build 2>&1 | tail -20
```
Expected: build succeeds and `cap10-showcase.md` is copied into the generated content (check `copy-content.js` picks up `cap/docs/**`). If the copy script needs the file listed explicitly, add it there.

- [ ] **Step 3: Commit**

```bash
git add cap/docs/cap10-showcase.md site/scripts/copy-content.js 2>/dev/null; git add -A
git commit -m "docs(cap10): add CAP 10 feature showcase guide"
```

---

## Self-review notes

- **Spec coverage:** All six ladder features map to Tasks 1–6; docs/verification map to Task 7 and the per-task verify steps. ✅
- **Alpha/beta uncertainty:** Tasks 1, 3, 4, 5 include explicit "verify against CAP docs / cds-mcp / `--help`" fallbacks where plugin behavior may vary by version — deliberate, not placeholders.
- **Non-unit-testable features:** MCP endpoint, AI Core recommendations, and the Inspector UI are verified via runtime checks (curl / interactive), which is the honest test surface for these; genuine `node:test` tests exist where they add value (Tasks 3 and 6).
- **Type consistency:** `pickFeaturedShow(shows, seed)` and event `Show.Refreshed.v1` are used consistently between `scheduled.js` and `scheduled.test.js`.
- **Risk flag (Task 3):** the exact wiring of a scheduled emit to a service (custom event vs. declared CDS action) must be confirmed with cds-mcp/CAP docs before finalizing; Step 3/4 call this out.
