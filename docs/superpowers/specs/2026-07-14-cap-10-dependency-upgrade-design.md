# CAP 10 Dependency Upgrade — Design

**Date:** 2026-07-14
**Project:** cloud-cap-hana-swapi
**Branch:** `chore/cap-10-upgrade`

## Goal

Update repository dependencies with a focus on migrating SAP CAP from v9 to **v10**.
Verify through the automated test suite, a local SQLite run, and a HANA HDI
deploy + hybrid run.

## Context / Current State

- Node runtime is **v26.5.0** — already clears CAP 10's Node 22 minimum. No runtime change needed.
- Global `@sap/cds-dk` is already `10.0.4`; the project-local toolchain and `@sap/cds` are still on v9.
- The project is **pre-staged for CAP 10**: `cap/.cdsrc.json` already sets the CAP 10 compat
  flags to their new defaults, and `cap/package.json` sets `queue.legacyLocking: false`,
  `sql.native_hana_associations: false`, and SQLite `driver: node`.
- Handler code already uses CAP 10-correct patterns (`req.params[0]` array access in
  `cap/srv/people-service.js`).
- No root `package.json` (root `mta.yaml` is a deploy descriptor only).
- `site/` (VitePress) dependencies are all already at their latest versions.

### npm supply-chain protection

Home `~/.npmrc` sets `min-release-age=1`, `save-exact=true`, `ignore-scripts=true`.
The CAP 10 target versions shipped weeks ago, so the age gate is **not expected to block**
them. Policy for this task: run `npm install` as-is first; only if a specific package is
actually blocked by the age gate will a narrow, temporary override be applied — and the
exact package and reason will be reported to the user.

## Scope

"Everything in the repo," which resolves to:

### cap/ — CAP 10 core + driver majors (the real migration)

| Package | From | To | Type |
|---|---|---|---|
| `@sap/cds` | ^9.9.1 | ^10.0.3 | major |
| `@cap-js/sqlite` | ^2.2.0 | ^3.0.2 | major |
| `@cap-js/hana` | ^2.7.0 | ^3.0.1 | major |
| `@cap-js/postgres` | ^2.2.0 | ^3.0.1 | major |
| `@cap-js/telemetry` | ^1.6.0 | ^2.0.1 | major |

### cap/ — minor / patch bumps

- `@cap-js-community/odata-v2-adapter` → ^1.16.0
- `@cap-js/change-tracking` → ^2.0.2
- `@cap-js/ord` → ^1.9.1
- `@sap/cds-common-content` → ^3.2.0
- `eslint` → ^10.7.0
- `@sap/dev-cap-tools` → ^1.53.4

### Already at latest — no change

`@cap-js/graphql`, `@cap-js/cds-typer`, `@cap-js/cds-test`, `@cap-js/notifications`,
`@sap/cds-fiori`, `@sap-cloud-sdk/resilience`, `@sap/xb-msg-amqp-v100`,
`cds-swagger-ui-express`, `express`, `cors`, `uuid`, `@sap/eslint-plugin-cds`,
`@sap/hdi-deploy`.

### site/ — no version edits

All deps already latest; verify `npm ci` + `npm run build` still succeed.

## Config cleanup (CAP 10 flag removal)

CAP 10 **removes** several feature flags entirely (ignored if set) and makes others the
default. Both categories are now cruft.

**Delete from `cap/.cdsrc.json` (removed flags):**
- `features.consistent_params`
- `features.compat_assert_not_null`
- `features.compat_save_drafts`
- `fiori.calc_elements`

**Delete (now match CAP 10 defaults — safe cleanup):**
- `cap/.cdsrc.json`: `features.ieee754compatible`, `features.compat_srv_getters`,
  `features.compat_texts_entities`
- `cap/package.json`: `cds.requires.queue.legacyLocking`

**Result:** `cap/.cdsrc.json` retains only `export.asyncapi`. No handler code changes
required.

## Approach — incremental, on a branch

Recommended over all-at-once (easier failure bisection across a CAP major) and over
worktree isolation (overhead not justified for a branch-based chore).

1. Create branch `chore/cap-10-upgrade` off `main`.
2. Edit `cap/package.json` versions; remove redundant/removed flags from
   `cap/.cdsrc.json` and `cap/package.json`.
3. `npm install` in `cap/` (regenerates `package-lock.json`). Handle age gate per policy above.
4. `npm run build` (CDS build + typer) → `npm run test:profile` → full `npm test`.
5. Local run: `npm run sqlite`; drive it to confirm boot + serve.
6. HANA: `npm run build` → `npm run hana` (deploy to `starwars` HDI) → `npm run watch`
   (hybrid) and verify against HANA Cloud (`.cdsrc-private.json` present, `cf` authenticated).
7. `site/`: `npm ci` + `npm run build` to confirm still green.
8. Commit in logical chunks.

## Risks

- Driver 3.x majors (`sqlite`/`hana`/`postgres`) and `telemetry` 2.x are the highest-risk
  items. Pull official CAP 10 + driver migration notes during planning; the test suite and
  HANA deploy are the safety net.
- The untracked `cap/db/src/TEST.hdbcalculationview` is unrelated and will be left untouched.

## Verification (definition of done)

- `npm run build` succeeds (CDS compile + typer).
- `npm test` (model + handler + cds-test) passes.
- App boots and serves on SQLite.
- Schema deploys to HANA `starwars` HDI container; hybrid run serves against HANA Cloud.
- `site/` builds successfully.
