# Galaxy — Beyond Fiori Elements

A Vue 3 app wearing a genuine **SAP Fiori Horizon** face (via [UI5 Web Components](https://sap.github.io/ui5-webcomponents/)) that showcases five things Fiori Elements / UI5 **can't do out of the box** — all consuming this project's CAP service.

Where the sibling [`../viewer`](../viewer) app breaks *away* from Fiori with a custom theme, `galaxy` keeps the Fiori chrome and instead breaks the **capabilities** ceiling.

## The five showcases

| Showcase | What UI5 / Fiori Elements can't do | How it consumes CAP |
|----------|-----------------------------------|---------------------|
| **Relationship Graph** | No network-graph control | D3 force graph built from the CSN model (`/model/`) + OData sampling |
| **GraphQL Explorer** | Can't consume GraphQL at all | Visual query builder → single round-trip against `/graphql` |
| **Real-time Feed** | No live server push | `EventSource` over the SSE bridge at `/events/stream` |
| **Cinematic Timeline** | Beyond a stock timeline control | Canvas parallax timeline from OData films + episodes |
| **Hyperspace** | Deliberately non-enterprise | Full-bleed Canvas starfield seeded from Planet data |

## Running

The app is served two ways:

### Via `cds watch` (recommended)

CAP has native Vite integration — it detects `vite.config.js` and serves the app with Vite dev middleware (HMR included). From `cap/`:

```bash
npm run sqlite        # or: npm run watch (HANA)
```

Then open <http://localhost:4004/galaxy/>.

### Standalone Vite dev server

From `cap/app/galaxy/` (proxies CAP protocols to `:4004`):

```bash
npm install           # first time
npm run dev           # http://localhost:5173/galaxy/
```

Requires `cds watch` running separately on `:4004` for data.

## Building for production

```bash
npm run build         # → dist/  (served by CAP as static content)
```

## Testing

```bash
npm test              # Vitest — API-layer query construction (odata/graphql/model)
```

## Architecture

```
src/
  main.js             App entry — registers UI5 components, mounts Vue
  ui5.js              Central UI5 Web Components + theme + icon imports
  router.js           ~30-line hash router (no vue-router dependency)
  App.vue             Fiori shell: navigation-layout + shellbar + side nav
  api/                Transport layer — views never call fetch directly
    odata.js          OData v4 client (list, action, query building)
    graphql.js        GraphQL POST client for /graphql
    events.js         EventSource wrapper w/ auto-reconnect
    model.js          CSN loader → entity/association graph
  lib/
    forceGraph.js     D3 force-simulation renderer (framework-agnostic)
    hyperspace.js     Canvas 2D warp-speed engine
  views/              One lazily-loaded component per showcase
```

### Backend

The Real-time Feed relies on a small SSE bridge added to the CAP server:
[`../../srv/events-stream.js`](../../srv/events-stream.js) exposes `GET /events/stream`
and relays the `People.Changed.v1` and `Show.Refreshed.v1` domain events. It is
guarded in [`../../srv/server.js`](../../srv/server.js) so a failure degrades to a
warning rather than taking the server down.

## Notes

- **No CDN** — everything is bundled locally; CSP stays same-origin (`default-src 'self'`).
- Vue treats all `ui5-*` tags as custom elements (`vite.config.js` → `isCustomElement`).
- Theme switching (Horizon / Horizon Dark / High Contrast) is available from the ShellBar palette icon — proving UI5's theming comes for free.
