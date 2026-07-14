# CAP 10 Dependency Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `cloud-cap-hana-swapi` from CAP 9 to CAP 10, bump all repo dependencies to latest, remove obsolete compat flags, and verify via test suite + local SQLite run + HANA deploy/hybrid run.

**Architecture:** Edit `cap/package.json` version ranges and clean CAP 10-removed feature flags from `cap/.cdsrc.json` and `cap/package.json`; regenerate the lockfile with `npm install`; then verify in layers (build → tests → SQLite run → HANA deploy → hybrid run → site build). Work happens on branch `chore/cap-10-upgrade` (already created), committing in logical chunks.

**Tech Stack:** SAP CAP (Node.js), `@sap/cds` 10, `@cap-js/{sqlite,hana,postgres}` 3.x, SAP HANA Cloud (HDI), SQLite, PostgreSQL, VitePress (site).

## Global Constraints

- **Node runtime:** v26.5.0 installed; CAP 10 requires ≥ v22. No runtime change. (verbatim floor: `"node": ">=22"`)
- **npm supply-chain protection:** home `~/.npmrc` has `min-release-age=1`, `save-exact=true`, `ignore-scripts=true`. Run `npm install` as-is first. Only if a specific package is blocked by the age gate, apply a narrow temporary override and report the exact package + reason to the user. Never disable the protection globally or silently.
- **CAP 10 packages must move together** (per official migration guide): `@sap/cds`→10, DB drivers→3.x, `@sap/cds-dk`→10 (global already 10.0.4), compiler→7 (transitive). Do not mix CAP 9 and CAP 10 packages.
- **All npm commands run from `cap/`** unless stated otherwise (site commands run from `site/`).
- **CDS file edits:** resolve entity/field definitions with cds-mcp before modifying models, and check CAP docs via cds-mcp before proposing CDS syntax/API usage. (No model changes are planned, but this governs any that arise.)
- **Untracked file `cap/db/src/TEST.hdbcalculationview` is out of scope** — leave untouched, do not stage.

**Target versions (exact):**

| Package | From | To |
|---|---|---|
| `@sap/cds` | ^9.9.1 | ^10.0.3 |
| `@cap-js/sqlite` | ^2.2.0 | ^3.0.2 |
| `@cap-js/hana` | ^2.7.0 | ^3.0.1 |
| `@cap-js/postgres` | ^2.2.0 | ^3.0.1 |
| `@cap-js/telemetry` | ^1.6.0 | ^2.0.1 |
| `@cap-js-community/odata-v2-adapter` | ^1.15.12 | ^1.16.0 |
| `@cap-js/change-tracking` | ^2.0.1 | ^2.0.2 |
| `@cap-js/ord` | ^1.9.0 | ^1.9.1 |
| `@sap/cds-common-content` | ^3.1.0 | ^3.2.0 |
| `eslint` | ^10.5.0 | ^10.7.0 |
| `@sap/dev-cap-tools` | ^1.53.2 | ^1.53.4 |

Unchanged (already latest): `@cap-js/graphql`, `@cap-js/cds-typer`, `@cap-js/cds-test`, `@cap-js/notifications`, `@sap/cds-fiori`, `@sap-cloud-sdk/resilience`, `@sap/xb-msg-amqp-v100`, `cds-swagger-ui-express`, `express`, `cors`, `uuid`, `@sap/eslint-plugin-cds`, `@sap/hdi-deploy`, and all `site/` deps.

---

### Task 1: Baseline — capture green state before changes

Establish that the current CAP 9 project builds and tests pass, so any post-upgrade failure is attributable to the upgrade.

**Files:**
- None modified (read/run only).

- [ ] **Step 1: Confirm branch**

Run: `git -C d:/projects/cloud-cap-hana-swapi branch --show-current`
Expected: `chore/cap-10-upgrade`

- [ ] **Step 2: Capture installed CAP versions (pre-upgrade snapshot)**

Run (from `cap/`): `npx cds -v > ../_temp/cds-v-before.txt 2>&1; cat ../_temp/cds-v-before.txt`
Expected: shows `@sap/cds 9.9.1`. File saved for later comparison.

- [ ] **Step 3: Run the build (baseline)**

Run (from `cap/`): `npm run build`
Expected: CDS build succeeds; `@cds-models/` regenerated; exit 0.

- [ ] **Step 4: Run full test suite (baseline)**

Run (from `cap/`): `npm test`
Expected: all tests pass (model + handler + cds-test-v1). Note the pass count — it must not regress after upgrade.

- [ ] **Step 5: No commit**

Baseline task; nothing to commit.

---

### Task 2: Edit dependency versions and remove obsolete CAP 10 flags

Apply all version bumps and config cleanup in one edit set (they form a single coherent "move to CAP 10" changeset), then regenerate the lockfile.

**Files:**
- Modify: `cap/package.json` — `dependencies` + `devDependencies` version ranges (per Global Constraints table); remove `cds.requires.queue.legacyLocking`.
- Modify: `cap/.cdsrc.json` — remove obsolete `features.*` and `fiori.calc_elements`.
- Modify (regenerated): `cap/package-lock.json`.

**Interfaces:**
- Produces: an installed CAP 10 `node_modules` and regenerated lockfile that Tasks 3–7 verify.

- [ ] **Step 1: Edit `cap/package.json` dependency versions**

In `dependencies`, set exactly:
```json
"@cap-js-community/odata-v2-adapter": "^1.16.0",
"@cap-js/change-tracking": "^2.0.2",
"@cap-js/hana": "^3.0.1",
"@cap-js/ord": "^1.9.1",
"@cap-js/postgres": "^3.0.1",
"@cap-js/sqlite": "^3.0.2",
"@cap-js/telemetry": "^2.0.1",
"@sap/cds": "^10.0.3",
"@sap/cds-common-content": "^3.2.0",
```
In `devDependencies`, set exactly:
```json
"@sap/dev-cap-tools": "^1.53.4",
"eslint": "^10.7.0",
```
Leave every other dependency line unchanged.

- [ ] **Step 2: Remove `queue.legacyLocking` from `cap/package.json`**

In `cds.requires.queue`, the object becomes empty of `legacyLocking`. Change:
```json
      "queue": {
        "legacyLocking": false
      },
```
to:
```json
      "queue": true,
```
(`queue: true` preserves the persistent-outbox-enabled intent documented in CLAUDE.md without pinning the removed flag.)

- [ ] **Step 3: Clean `cap/.cdsrc.json`**

Replace the whole file with (drops all removed/now-default flags; keeps only `export`):
```json
{
    "export": {
        "asyncapi": {
            "application_namespace": "sap.swapi"
        }
    }
}
```

- [ ] **Step 4: Install (regenerate lockfile), respecting age gate**

Run (from `cap/`): `npm install`
Expected: resolves `@sap/cds@10.x` and drivers `3.x`; exit 0; `package-lock.json` updated.
If it fails with an age-gate/`min-release-age` error naming a specific package: STOP, report the exact package + published date + reason to the user, and apply the narrowest possible override (e.g. `npm install <pkg>@<ver> --before=...` or a scoped `.npmrc` note) only after noting it. Do not blanket-disable the gate.

- [ ] **Step 5: Verify installed versions moved to CAP 10**

Run (from `cap/`): `npx cds -v`
Expected: `@sap/cds 10.x`, `@sap/cds-compiler 7.x`, `@cap-js/sqlite 3.x`, `@cap-js/hana 3.x`, `@cap-js/postgres 3.x`.

- [ ] **Step 6: Run cds upgrade diagnostic**

Run (from `cap/`): `npx cds upgrade --dry-run 2>&1 | tee ../_temp/cds-upgrade.txt` (if `--dry-run` is unsupported, run `npx cds upgrade` and review before accepting changes).
Expected: a report of any remaining breaking-change hits. Review output; if it flags files beyond those already handled, note them for Task 4. Do NOT auto-apply model rewrites without cds-mcp verification.

- [ ] **Step 7: Commit**

```bash
git -C d:/projects/cloud-cap-hana-swapi add cap/package.json cap/package-lock.json cap/.cdsrc.json
git -C d:/projects/cloud-cap-hana-swapi commit -m "chore(deps): upgrade to CAP 10 and remove obsolete compat flags"
```

---

### Task 3: Verify build + typed models regenerate under CAP 10

The compiler moved to v7; confirm the CDS model still compiles and typer output regenerates.

**Files:**
- Regenerated (git-ignored): `cap/@cds-models/`, `cap/gen/`.

- [ ] **Step 1: Clean stale generated artifacts**

Run (from `cap/`): `rm -rf gen @cds-models/_ 2>/dev/null; echo cleaned`
Expected: `cleaned` (prevents stale-artifact false failures; `@cds-models` is regenerated by typer).

- [ ] **Step 2: Build**

Run (from `cap/`): `npm run build`
Expected: `cds build` completes; typer writes `@cds-models/`; exit 0. No compiler v7 errors (`@restrict`/`@requires` on non-existent targets are now errors — none expected since auth is `@requires: 'any'`).

- [ ] **Step 3: Commit (only if tracked files changed)**

Generated dirs are git-ignored, so typically nothing to commit. Verify:
```bash
git -C d:/projects/cloud-cap-hana-swapi status --porcelain cap
```
If only ignored dirs changed: no commit. If a tracked file changed unexpectedly, review before committing.

---

### Task 4: Verify test suite passes under CAP 10

Confirm handlers, model exposure, and cds-test behave identically. Watch for the two CAP 10 runtime behavior changes: write ops return `.affected`, and draft requests default to `IsActiveEntity=true`.

**Files:**
- Test only (no source change expected): `cap/test/model.test.js`, `cap/test/handler.test.js`, `cap/test/cds-test-v1.test.js`.
- Potentially modify (only if a test asserts old CAP 9 behavior): the failing test file.

- [ ] **Step 1: Run full test suite**

Run (from `cap/`): `npm test`
Expected: pass count matches Task 1 baseline.

- [ ] **Step 2: If a test fails, triage against known CAP 10 changes**

Check the failure against: (a) write-result shape now `.affected`; (b) draft default `IsActiveEntity=true`; (c) `ASSERT_NOT_NULL` vs old `ASSERT_MANDATORY` error code. Use cds-mcp to confirm the current CAP 10 contract before editing. Fix the *test's* stale assertion to match CAP 10 (not the handler, unless the handler genuinely relied on removed behavior).

- [ ] **Step 3: Re-run to confirm green**

Run (from `cap/`): `npm test`
Expected: all pass.

- [ ] **Step 4: Commit (only if a test was changed)**

```bash
git -C d:/projects/cloud-cap-hana-swapi add cap/test
git -C d:/projects/cloud-cap-hana-swapi commit -m "test: align assertions with CAP 10 behavior"
```
If no test changed, skip.

---

### Task 5: Verify local SQLite run boots and serves

Confirm the app starts on the native `node:sqlite` driver (default in CAP 10) and serves an OData request.

**Files:**
- None modified.

- [ ] **Step 1: Deploy schema to SQLite**

Run (from `cap/`): `npm run build_sqlite`
Expected: `cds deploy --profile sqlite` creates/updates `db.sqlite`; exit 0.

- [ ] **Step 2: Start the app (background) and capture startup**

Run (from `cap/`): `npm run sqlite` in the background; wait for `server listening on` in the log.
Expected: server boots without driver/compat errors; services listed (StarWarsFilm, StarWarsPeople, …, DataService, GraphQL at `/graphql`).

- [ ] **Step 3: Smoke-test an endpoint**

Run: `curl -s "http://localhost:4004/odata/v4/StarWarsFilm/Film?$top=1" | head -c 400`
Expected: HTTP 200 with a JSON `value` array (data present if fixtures loaded, or empty array — either proves serving works).

- [ ] **Step 4: Stop the background server**

Stop the background process.
Expected: process terminated cleanly.

- [ ] **Step 5: No commit**

Runtime verification only.

---

### Task 6: Verify HANA deploy + hybrid run

Confirm the HANA driver 3.x deploys the schema to the `starwars` HDI container and the hybrid profile serves against HANA Cloud. Requires `.cdsrc-private.json` (present) and `cf` auth (present; org/space not targeted — hybrid uses the private config binding).

**Files:**
- None modified. May regenerate `cap/gen/` (git-ignored) via `prehana`/`cds build`.

- [ ] **Step 1: Build for HANA**

Run (from `cap/`): `npm run build`
Expected: HANA artifacts generated under `gen/db` (`.hdbtable`, `.hdbmigrationtable`); exit 0.

- [ ] **Step 2: Deploy to HANA HDI container**

Run (from `cap/`): `npm run hana`
Expected: `cds deploy --to hana:starwars --auto-undeploy` connects and deploys; exit 0. Watch for driver 3.x connection-pool changes (native pool replaces `generic-pool`) — a pool error here is the key risk signal.

- [ ] **Step 2b: If deploy fails, triage**

Match error via `get_known_errors` / cds-mcp (e.g. "No credentials configured for HDI container" → binding; pool/driver errors → HANA driver 3.x). Report the specific error to the user before attempting fixes; do not alter credentials.

- [ ] **Step 3: Start hybrid run (background)**

Run (from `cap/`): `npm run watch` in the background; wait for `server listening on`.
Expected: hybrid profile connects to HANA Cloud; services served; no driver errors in log.

- [ ] **Step 4: Smoke-test against HANA**

Run: `curl -s "http://localhost:4004/odata/v4/StarWarsFilm/Film?$top=1" | head -c 400`
Expected: HTTP 200 JSON `value` array from HANA.

- [ ] **Step 5: Stop the background server**

Stop the background process.

- [ ] **Step 6: No commit**

Runtime verification only.

---

### Task 7: Verify site build (VitePress)

`site/` deps are already latest; confirm the upgraded content still builds (it copies from `cap/docs`, `cap/labs`, etc.).

**Files:**
- None modified.

- [ ] **Step 1: Install site deps clean**

Run (from `site/`): `npm ci`
Expected: install succeeds against existing lockfile; exit 0.

- [ ] **Step 2: Build the site**

Run (from `site/`): `npm run build`
Expected: content copied; VitePress builds to `site/.vitepress/dist/`; exit 0.

- [ ] **Step 3: No commit**

Build verification only (generated dirs are git-ignored).

---

### Task 8: Final review and wrap-up

- [ ] **Step 1: Confirm full changeset**

Run: `git -C d:/projects/cloud-cap-hana-swapi log --oneline main..chore/cap-10-upgrade` and `git -C d:/projects/cloud-cap-hana-swapi diff --stat main..chore/cap-10-upgrade`
Expected: commits for the spec, the deps upgrade, and (if any) test alignment. Diff limited to `cap/package.json`, `cap/package-lock.json`, `cap/.cdsrc.json`, spec/plan docs, and any adjusted tests. No stray `TEST.hdbcalculationview`.

- [ ] **Step 2: Confirm installed versions one last time**

Run (from `cap/`): `npx cds -v`
Expected: CAP 10 stack confirmed.

- [ ] **Step 3: Report verification summary to user**

Summarize: build ✓, tests ✓ (count), SQLite run ✓, HANA deploy+hybrid ✓, site build ✓, and whether any age-gate override was needed. Ask whether to open a PR (per commit-push-pr flow) or hand back for manual review.

---

## Self-Review

**Spec coverage:**
- All version bumps (spec §Scope) → Task 2 Step 1. ✓
- Flag cleanup (spec §Config cleanup) → Task 2 Steps 2–3. ✓
- npm age-gate policy (spec §npm supply-chain) → Global Constraints + Task 2 Step 4. ✓
- Branch approach (spec §Approach) → branch already created; commits in Tasks 2/4. ✓
- Verification: build → Task 3; tests → Task 4; SQLite → Task 5; HANA deploy+hybrid → Task 6; site → Task 7 (spec §Verification). ✓
- Risk: driver majors/telemetry → Task 6 Step 2 + Task 4 triage; untracked hdbcalculationview → Global Constraints. ✓

**Placeholder scan:** No TBD/TODO; every code/config step shows exact content; every run step shows exact command + expected output.

**Type/name consistency:** File paths, npm scripts (`build`, `build_sqlite`, `sqlite`, `hana`, `watch`, `test`), and version strings match `cap/package.json` and the spec table verbatim.
