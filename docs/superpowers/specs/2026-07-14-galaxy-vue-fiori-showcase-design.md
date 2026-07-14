# Galaxy — Vue 3 + Fiori-styled "Beyond Fiori Elements" showcase app

**Date:** 2026-07-14
**Status:** Approved (brainstorming) — pending spec review
**Location:** `cap/app/galaxy/`

## 1. Overview & Positioning

`galaxy` is a new UI app that wears the **Fiori face** (real SAP Horizon theme via UI5
Web Components) while doing five things Fiori Elements / UI5 fundamentally cannot do out of
the box. It consumes the existing CAP service across all of its protocols.

It is deliberately the mirror image of the existing `cap/app/viewer/` app:

| | `viewer` (existing) | `galaxy` (this spec) |
|---|---|---|
| Look | Custom "galaxy purple" theme | Real Fiori Horizon (UI5 Web Components) |
| Build | Build-free, CDN Vue + axios | Vite + Vue 3 SFCs, npm deps |
| Point | Breaks *away* from Fiori | Wears Fiori chrome, breaks the *capabilities* ceiling |

**Home tagline:** *"Same Fiori chrome. Things UI5 can't do."*

### Tech stack

- **Vue 3** — SFCs, `<script setup>`, Composition API
- **Vite** — build + dev server with HMR
- **`@ui5/webcomponents` + `@ui5/webcomponents-fiori`** — shell/chrome (ShellBar,
  SideNavigation, Card, Button, BusyIndicator, IllustratedMessage, Timeline, etc.),
  registered as Vue custom elements. Endorsed as a first-class CAP + Vue path in the
  user's global rules.
- **D3** — force-directed graph + timeline canvas
- Native **`fetch`** — OData v4 + GraphQL transport (project baseline: no axios/3rd-party HTTP)
- Native **`EventSource`** — Server-Sent Events for the live feed
- **Canvas 2D** — the Hyperspace showcase (zero extra deps)

### Consumes the CAP service via all four protocols

- **OData v4** (`/odata/v4/...`) — primary reads, `$expand`, `$count`
- **GraphQL** (`/graphql`) — the GraphQL Explorer showcase
- **REST** — where simplest
- **SSE** (`/events/stream`, new small backend addition) — the real-time feed

The app itself is a demonstration of protocol breadth.

## 2. App Shell & Navigation

Single-page Vue app inside a real Fiori shell.

- **`ui5-shellbar`** (fixed top): app title "Galaxy — Beyond Fiori Elements", a search slot
  wired to a global entity search, a theme-switch menu (Horizon / Horizon Dark / High
  Contrast — proving UI5 theming comes free), and a profile avatar.
- **`ui5-side-navigation`** (collapsible, left): Home + one item per showcase. Collapses to
  icons on narrow screens (free from the web component).
- **Routing:** a small (~30-line) hash-router composable in `src/router.js` (no `vue-router`
  dependency — matches the sample's minimalist spirit). Each showcase is a lazily-loaded Vue
  view (`defineAsyncComponent` + dynamic `import()`).
- **Home view:** a responsive grid of `ui5-card` tiles, one per showcase, each stating *what
  UI5 can't do here* and a "Launch" action. This is the showcase catalog and the landing view.

**Layout:** ShellBar (fixed) → flex row of SideNavigation + `<main>` router outlet. Content
scrolls; shell stays fixed. Responsive via the web components.

## 3. The Five Showcases

Each is a lazily-loaded Vue view. Fiori chrome around it; custom content inside.

### 3.1 Relationship Graph — *"UI5 has no network-graph control."*

- D3 force-directed graph of the M:N universe.
- Nodes = entities (Film, People, Planet, Species, Starship, Vehicle), color-coded by type.
- Edges = junction relationships (`Film2People`, `Film2Planets`, …).
- Drag, zoom, pan. Click a node to lazy-expand its neighbors — fetches related sets on demand
  via OData `$expand` / follow-up queries.
- Fiori-styled control bar: `ui5-segmented-button` to filter node types, `ui5-slider` for link
  strength.
- Click a node → `ui5-card` side panel with entity details.
- Entity/association topology is derived from the CSN loaded from `/model/` (no hardcoded schema).

### 3.2 GraphQL Explorer — *"Fiori Elements can't consume GraphQL at all."*

- Visual query-builder against `/graphql`.
- Pick a root entity; tick fields; walk into associations via nested checkboxes.
- App assembles the GraphQL query live and shows it in a read-only code panel.
- Runs the query in **one round-trip**; renders nested JSON as an expandable tree.
- Side-by-side "query ↔ result" — the teaching point: one request returns a graph that OData
  would need many round-trips for.

### 3.3 Real-time Event Feed — *"Fiori Elements has no live push."*

- Live activity stream driven by CAP domain events already emitted by the backend:
  - `People.Changed.v1` — on every People CREATE/UPDATE/DELETE (see `srv/people-service.js`).
  - `Show.Refreshed.v1` — every 10 min via the scheduled rotation (see `srv/scheduled.js`).
- **New backend addition:** a tiny SSE endpoint `GET /events/stream` (`text/event-stream`) that
  subscribes to the messaging service and pushes those events to the browser. Native
  `EventSource` on the client.
- New events animate into a Fiori-styled feed (`ui5-timeline` or custom cards) with no refresh.
- A "trigger" button renames a random character via the existing `rename` action so the user can
  watch an event arrive live.
- Also surfaces change-tracking history from the `@cap-js/change-tracking` `ChangeView`.
- Connection badge shows connected / reconnecting state.

### 3.4 Cinematic Timeline — *"Beyond a UI5 timeline control."*

- Full-canvas horizontal timeline of Films + Show Episodes by release/air year.
- Custom D3 / canvas rendering: parallax starfield background, animated scrubbing, hover to
  bloom a poster card.
- Consumes OData sorted by date.
- Fiori chrome (toolbar, filters) frames a decidedly non-enterprise canvas.

### 3.5 Hyperspace — *"Slick, fun, non-enterprise."* (the break-from-Fiori piece)

- Deliberately un-Fiori, full-bleed **Canvas 2D** experience: a hyperspace-jump / starfield
  animation where stars are seeded from real Planet data (name, population, terrain drive
  color / size / count).
- Click a star → it decelerates and reveals that planet's details.
- Intentionally throws out Fiori conventions to prove the app can pivot from enterprise-clean to
  playful. Reachable from the shell but visually its own world.

## 4. Data Layer, Build/Serve, Error Handling & Testing

### Data access layer (`src/api/`)

- `odata.js` — thin `fetch` wrapper for `/odata/v4/...` (list, `$expand`, `$count`).
- `graphql.js` — `fetch` POST to `/graphql`.
- `events.js` — `EventSource` wrapper for `/events/stream` with auto-reconnect.
- `model.js` — loads CSN from the existing `/model/` endpoint to drive the graph's known
  entities/associations (no hardcoded schema).

Views use only these wrappers; no `fetch` scattered in components. Views own presentation; the
API layer owns transport.

### Build & serve

- Vite project under `cap/app/galaxy/` with its **own** `package.json` (deps isolated from
  CAP's root `package.json`).
- `vite build` → `cap/app/galaxy/dist/`; CAP serves it as static content (`cds watch` serves the
  built assets with no extra server config).
- During UI dev: `vite dev` with a proxy to `cds watch` so `/odata`, `/graphql`, `/events`,
  `/model` hit the live CAP server. HMR for fast iteration.
- npm scripts in the galaxy package: `dev`, `build`, `preview`. Documented in the app README.
- **CSP:** real build with bundled local assets (no CDN) → tight policy: `default-src 'self'`,
  `connect-src 'self'` for same-origin OData/GraphQL/SSE.

### Backend addition

- One new file `cap/srv/events-stream.js`: a `bootstrap` hook adds the `/events/stream` SSE
  route to the express app and subscribes to the messaging service. **Guarded** like
  `scheduled.js` — a failure degrades to a warning and never takes down services.

### Error handling

Every view has three explicit states:

- **Loading** — `ui5-busy-indicator`.
- **Error** — `ui5-illustrated-message` with retry.
- **Empty** — friendly message.

SSE feed additionally shows a connection badge (connected / reconnecting).

### Testing

- API-layer unit tests (**Vitest** — aligns with CAP 10's test direction) for `odata.js` /
  `graphql.js` query construction against a mocked `fetch`.
- One backend test for the SSE endpoint (event in → SSE frame out) using CAP's test harness.
- Showcases are visual/interactive — verified manually via the `verify` flow, not heavy
  component tests (YAGNI for a sample app).

### Out of scope (YAGNI)

- Auth / roles — services are public (`@requires: 'any'`).
- Write-back beyond the existing `rename` trigger.
- Mobile-first tuning beyond what the web components give free.
- i18n.

## Open risks / notes for implementation planning

- Confirm the exact messaging API to subscribe to in `events-stream.js` (file-based-messaging in
  dev/hybrid; enterprise-messaging in prod). The SSE bridge must work under `file-based-messaging`
  locally.
- Confirm `/graphql` schema shape for the association-walking builder (introspection query).
- Confirm the `/model/` CSN endpoint returns association targets usable for graph topology.
- UI5 Web Components + Vue: register custom elements and configure Vue's
  `compilerOptions.isCustomElement` so Vue does not warn on `ui5-*` tags.
