# Galaxy — Vue 3 + Fiori Showcase Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `cap/app/galaxy/`, a Vite + Vue 3 app with real Fiori chrome (UI5 Web Components) that showcases five things UI5/Fiori Elements can't do, all consuming the existing CAP service.

**Architecture:** A single-page Vue 3 app inside a `ui5-navigation-layout` shell. A tiny hash-router swaps five lazily-loaded showcase views. A thin `src/api/` layer isolates all transport (OData/GraphQL/SSE/CSN). One small guarded backend file adds an SSE bridge over CAP messaging.

**Tech Stack:** Vue 3 (SFC, `<script setup>`), Vite, `@ui5/webcomponents` + `-fiori` + `-icons`, D3, Canvas 2D, native `fetch` + `EventSource`, Vitest.

## Global Constraints

- Node.js >= 22 (v26 present). Native `fetch`/`EventSource`; no axios or 3rd-party HTTP client.
- `galaxy/` has its OWN `package.json` — deps isolated from CAP root.
- Build output → `cap/app/galaxy/dist/`; served by CAP as static content at `/galaxy/`.
- No raw SQL in any backend code; use `cds.ql`. Backend additions must be guarded (degrade to warning) like `srv/scheduled.js`.
- Vue must treat `ui5-*` tags as custom elements (`compilerOptions.isCustomElement`).
- CSP stays same-origin: `default-src 'self'`, `connect-src 'self'`.
- Events consumed: `People.Changed.v1` (StarWarsPeople), `Show.Refreshed.v1` (StarWarsShow). Dev messaging = `file-based-messaging`.
- Endpoints: OData `/odata/v4/<Service>`, GraphQL `/graphql`, CSN `/model/`, introspection `/odata/v4/-data`.

---

### Task 1: Scaffold Vite + Vue project with UI5 WC + CAP proxy

**Files:**
- Create: `cap/app/galaxy/package.json`, `vite.config.js`, `index.html`, `src/main.js`, `src/ui5.js`, `.gitignore`, `README.md`

**Produces:** a runnable `npm run dev` shell; `npm run build` → `dist/`.

- [ ] `package.json`: deps `vue`, `@ui5/webcomponents`, `@ui5/webcomponents-fiori`, `@ui5/webcomponents-icons`, `d3`; devDeps `vite`, `@vitejs/plugin-vue`, `vitest`. Scripts: `dev`, `build` (`vite build`), `preview`, `test` (`vitest run`).
- [ ] `vite.config.js`: `base: '/galaxy/'`, `build.outDir: 'dist'`, plugin-vue with `compilerOptions.isCustomElement: (t) => t.startsWith('ui5-')`, dev `server.proxy` mapping `/odata`,`/graphql`,`/model`,`/events`,`/rest` → `http://localhost:4004`.
- [ ] `src/ui5.js`: import needed UI5 components + `setTheme('sap_horizon')`.
- [ ] `src/main.js`: import `./ui5.js`, create app, mount `#app`.
- [ ] `npm install` then `npm run build` → verify `dist/index.html` exists. Commit.

### Task 2: Hash router composable + app shell

**Files:** Create `src/router.js`, `src/App.vue`, `src/views/Home.vue`. 
**Consumes:** shell from Task 1. **Produces:** `useRoute()` composable (`route.value`, `navigate(path)`), routed `<main>`.

- [ ] `src/router.js`: reactive `route` from `location.hash`, `hashchange` listener, `navigate(path)` sets `location.hash`. Export `useRoute`.
- [ ] `src/App.vue`: `ui5-navigation-layout` + `ui5-shellbar` (title, theme menu) + `ui5-side-navigation` (Home + 5 items) + `<component :is>` async view switch by `route`.
- [ ] `src/views/Home.vue`: grid of `ui5-card`, one per showcase, each with "what UI5 can't do" text + launch action calling `navigate`.
- [ ] Build; manually verify shell renders and nav switches views. Commit.

### Task 3: API layer (odata, graphql, events, model) + Vitest

**Files:** Create `src/api/odata.js`, `src/api/graphql.js`, `src/api/events.js`, `src/api/model.js`, `test/api.test.js`.
**Produces:** `list(service,entity,opts)`, `gqlQuery(query,vars)`, `connectEvents(onMsg,onState)`, `loadModel()`.

- [ ] TDD `odata.js`: test URL construction for `$expand/$top/$count` against mocked `fetch`; implement.
- [ ] TDD `graphql.js`: test POST body shape against mocked `fetch`; implement.
- [ ] `events.js`: `EventSource('/events/stream')` wrapper w/ auto-reconnect + state callback.
- [ ] `model.js`: `fetch('/model/')` → parse entities+associations.
- [ ] `vitest run` green. Commit.

### Task 4: Backend SSE bridge (`/events/stream`)

**Files:** Create `cap/srv/events-stream.js`; Modify `cap/srv/server.js` to require it (guarded).
**Produces:** `GET /events/stream` emitting `text/event-stream` frames on `People.Changed.v1` / `Show.Refreshed.v1`.

- [ ] `events-stream.js`: `cds.on('bootstrap', app => app.get('/events/stream', sse))`; on `served`, subscribe via `cds.connect.to('messaging')` `.on(topic)` → push to open SSE clients. Guard whole thing in try/catch → `cds.log().warn`.
- [ ] `server.js`: `try { require('./events-stream') } catch(e){ cds.log('sse').warn(...) }`.
- [ ] Backend test: emit event → assert SSE frame. Run `cds watch --profile sqlite`, curl `/events/stream`. Commit.

### Task 5: Relationship Graph view (D3 force)
- [ ] `src/views/GraphView.vue` + `src/lib/forceGraph.js`: D3 force sim from OData/model; drag/zoom/pan; node click → `ui5-card` panel; `ui5-segmented-button` type filter. Loading/error/empty states. Commit.

### Task 6: GraphQL Explorer view
- [ ] `src/views/GraphqlView.vue`: field/association picker → live query string → run via `gqlQuery` → expandable JSON tree; query↔result split. Commit.

### Task 7: Real-time Event Feed view
- [ ] `src/views/EventsView.vue`: `connectEvents` → animated `ui5-timeline`; connection badge; "trigger" button POSTs `rename` action; surfaces `ChangeView`. Commit.

### Task 8: Cinematic Timeline view
- [ ] `src/views/TimelineView.vue` + canvas: Films+Episodes by year; parallax starfield; hover poster bloom; Fiori toolbar filters. Commit.

### Task 9: Hyperspace view (break-from-Fiori)
- [ ] `src/views/HyperspaceView.vue` + `src/lib/hyperspace.js`: Canvas 2D starfield seeded from Planet data; click star → decelerate + reveal planet. Full-bleed, non-Fiori. Commit.

### Task 10: Wire CAP to serve `/galaxy/`, README, final verify
- [ ] Confirm CAP static-serves `dist/` at `/galaxy/`; document `dev`/`build` in README; full `verify` pass across all 5 views. Commit.

## Notes
- UI5 shell uses `ui5-navigation-layout` (confirmed via ui5-webcomponents guidelines).
- CSN endpoint `/model/` already exists (`srv/server.js`); introspection at `/odata/v4/-data`.
