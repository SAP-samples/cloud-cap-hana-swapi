# CAP 10 Showcase — Design Spec

**Date:** 2026-07-14
**Branch:** `feature/cap10-showcase`
**Occasion:** reCAP conference (next day) — celebrate CAP 10 (June 2026).

## Goal

The `cloud-cap-hana-swapi` sample already *runs* on CAP 10 (`@sap/cds ^10.0.3`,
Node 22+; upgrade landed in commit `26e2c10`). This branch makes it *show off*
CAP 10 by integrating six new features from the June 2026 release, each as an
additive, isolated change.

Because the demo is the next day, the work is organized as a **priority ladder**:
the two headline features must be bulletproof; everything else is expendable if
the clock runs out. The intent is to land all six.

## Priority ladder

| Tier | Feature | Package / mechanism | External binding |
|------|---------|---------------------|------------------|
| **P0** | MCP adapter | `@cap-js/mcp` + `@mcp` annotation | none — driven live from Claude Code |
| **P0** | AI Core plugin | `@cap-js/ai` (alpha) + AI Core binding | SAP AI Core (user will bind) |
| **P1** | Event Queues Scheduling | built-in CAP 10, uses existing outbox | none |
| **P1** | Data Inspector plugin | Data Inspector plugin (verify exact pkg at impl time) | none |
| **P2** | `cds export` (GA) | `cds export` on DataService | none |
| **P2** | Bypass drafts + `.affected` | `IsActiveEntity=true`, uniform write results | none |

**Rules:**
- Build strictly in ladder order; commit after each feature so there is always a
  working checkpoint.
- Every feature is behind an isolated file, annotation, or plugin. If one breaks,
  remove that one line/file — the tiers above it stay green.
- P0 must work by demo time. P1 strongly desired. P2 freely cuttable.

## Per-feature integration detail

### P0 · MCP adapter (`@cap-js/mcp`)
- `npm add @cap-js/mcp`.
- New file `srv/mcp.cds` annotating read-friendly services with `@mcp`
  (start with `StarWarsShow` + `StarWarsFilm`). Keeps annotations out of service
  contracts, per the project's file-separation rule.
- Auto-exposes MCP tools (`describe`, `query`, `call_action`); integrates with CAP
  auth, constraints, and annotations.
- **Demo moment:** wire into Claude Code live; ask "which planets appear in the
  most films?" — Claude answers by querying over MCP.

### P0 · AI Core plugin (`@cap-js/ai`, alpha)
- `npm add @cap-js/ai`; bind SAP AI Core via `cds bind` into `.cdsrc-private.json`.
- Showcase the built-in **UI field-recommendation** use case (RPT-1) on an
  editable entity — likely `Media` on `StarWarsShow`, which already has handler
  logic in `show-service.js`.
- **Demo moment:** RPT-1 suggests a field value in the Fiori editor.
- **Note:** plugin is alpha; verify exact config/feature-toggle at implementation
  time against current docs.

### P1 · Event Queues Scheduling (built-in)
- Uses the outbox already enabled (`cds.requires.queue: true`).
- New `srv/scheduled.js` handler registering a named singleton task via the
  scheduling API (`.schedule(...).every(...).as(name)`), e.g. a cron/interval job
  that rotates a "featured Show" or emits a periodic `Show.Refreshed.v1` event.
- **Demo moment:** show the task registered and firing in logs.

### P1 · Data Inspector plugin
- Add the plugin; browse Star Wars entity data locally (and in prod) with full CAP
  security applied.
- Positioned as the *visual* counterpart to the existing `DataService`
  introspection (avoid framing as a replacement).
- **Demo moment:** open the inspector UI, drill into `People` / `Film2People`.
- **Note:** verify exact package name and registration at implementation time.

### P2 · `cds export` (GA)
- `cds export srv/data-service.cds` → publishable lossless client package under
  `./apis` (e.g. `@cap-hana-swapi/data`).
- No runtime change.
- **Demo moment:** show the generated package contents.

### P2 · Bypass drafts + `.affected`
- Entity services are draft-enabled (`@odata.draft.enabled` across film/people/
  planet/show/species/starship/vehicle), so this is meaningful here.
- Demonstrate a non-Fiori client reading active data with `IsActiveEntity=true`,
  and a write returning uniform `.affected`.
- Captured as documentation + a `node:test` test, not a UI change.

## Docs & verification

**Docs/lab**
- New `cap/docs/cap10-showcase.md` — feature-by-feature in ladder order.
  Auto-flows into the VitePress site via `site/scripts/copy-content.js`.
- Optional `labs/lab-06` if time allows (P2).

**Verification (per tier, the night before)**
- **P0:** MCP tool list resolves from a client; AI Core recommendation returns a value.
- **P1:** scheduled task logged firing; Data Inspector UI loads and drills in.
- **P2:** export package generates; a `.affected` / bypass-drafts test passes.
- Reuse the existing `node:test` runner (no Jest/Mocha).

**Safety for demo day**
- Isolated changes per feature; remove one line/file to disable a misbehaving one.
- Commit after each feature for always-green checkpoints.

## Out of scope

- The CAP 10 dependency upgrade itself (already done).
- HCQL protocol adapter, Data Privacy plugin, Telemetry v2 (already present),
  Consolidated Service API internals beyond `.affected`.
- Any rewrite of existing services, domain model, or data loading.
