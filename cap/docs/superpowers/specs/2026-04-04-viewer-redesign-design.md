---
title: Data Browser Viewer Redesign
date: 2026-04-04
status: approved
---

# Data Browser Viewer Redesign

## Overview

Redesign `cap/app/viewer/index.html` and `cap/app/viewer/app.js` to replace the basic primitive-ui styling with a modern Galaxy (dark) / Clean Light (light) dual-theme, add meaningful table usability features, and harden security of CDN dependencies. No UI5. No new runtime dependencies beyond Vue 3 and Axios.

## Scope

Two files only:
- `cap/app/viewer/index.html`
- `cap/app/viewer/app.js`

## Section 1 — Security

### Remove primitive-ui
- Drop `https://unpkg.com/primitive-ui/dist/css/main.css` entirely.
- Replace all primitive-ui layout classes with custom CSS embedded in `<style>` inside `index.html`.

### Pin and SRI-hash CDN dependencies
Both Vue 3 and Axios stay as CDN references but must be pinned to exact versions and include `integrity` (SRI) hashes and `crossorigin="anonymous"`:

```html
<script
  src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js"
  integrity="sha384-<hash>"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js"
  integrity="sha384-<hash>"
  crossorigin="anonymous"></script>
```

SRI hashes must be computed at implementation time using `openssl dgst -sha384 -binary <file> | openssl base64 -A`.

### Content Security Policy
Add a `<meta http-equiv="Content-Security-Policy">` tag restricting:
- `script-src`: `'self'` + `https://cdn.jsdelivr.net` only
- `style-src`: `'self' 'unsafe-inline'` (inline styles required for theming)
- `connect-src`: `'self'` (all API calls go to same origin)
- `default-src`: `'none'`

## Section 2 — Theming System

### CSS Custom Properties
All colour and surface values defined as CSS variables on `:root` (Galaxy dark default):

```css
:root {
  --bg-base:        #0a0e1a;
  --bg-panel:       rgba(255, 255, 255, 0.04);
  --bg-panel-hover: rgba(139, 92, 246, 0.08);
  --bg-row-alt:     rgba(139, 92, 246, 0.05);
  --bg-row-active:  rgba(139, 92, 246, 0.15);
  --accent:         #8b5cf6;
  --accent-soft:    rgba(139, 92, 246, 0.2);
  --accent-text:    #c4b5fd;
  --accent-border:  rgba(139, 92, 246, 0.3);
  --text-primary:   #e2e8f0;
  --text-muted:     #64748b;
  --text-key:       #a78bfa;
  --border:         rgba(255, 255, 255, 0.07);
  --border-strong:  rgba(255, 255, 255, 0.12);
  --font-mono:      'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --radius:         6px;
  --shadow:         0 4px 24px rgba(0, 0, 0, 0.4);
}
```

Clean Light overrides applied on `[data-theme="light"]`:

```css
[data-theme="light"] {
  --bg-base:        #f8fafc;
  --bg-panel:       #ffffff;
  --bg-panel-hover: #eff6ff;
  --bg-row-alt:     #fafbff;
  --bg-row-active:  #eff6ff;
  --accent:         #6366f1;
  --accent-soft:    rgba(99, 102, 241, 0.1);
  --accent-text:    #4f46e5;
  --accent-border:  #bfdbfe;
  --text-primary:   #1e293b;
  --text-muted:     #94a3b8;
  --text-key:       #6366f1;
  --border:         #e2e8f0;
  --border-strong:  #cbd5e1;
  --shadow:         0 1px 8px rgba(0, 0, 0, 0.08);
}
```

### OS Detection + Manual Toggle
- On page load, read `localStorage.getItem('viewer:theme')`. If set, apply it to `document.documentElement.dataset.theme`.
- If not set, check `window.matchMedia('(prefers-color-scheme: light)').matches` and set `data-theme="light"` if true (Galaxy dark is the default so no attribute needed for dark).
- Toggle button in the header switches between `""` (dark/Galaxy) and `"light"`, persists to `localStorage`.
- Button icon: moon (🌙) in dark mode, sun (☀️) in light mode.

## Section 3 — Table Features

### Sort
- Clicking a `<th>` cycles: none → asc → desc → none.
- Sort state stored as `{ col: columnIndex, dir: 'asc' | 'desc' | null }` in Vue reactive data.
- Sort applied via a `computed` property over `data` — client-side, operates on the currently loaded page.
- Active sort column header shows ↑ (asc) or ↓ (desc) indicator; cursor changes to pointer on all headers.

### Global Search / Filter
- Text `<input>` above the table with placeholder "Search all columns…".
- Bound to a `search` reactive string.
- A `filteredData` computed property filters `data` rows where any cell value contains `search` (case-insensitive string match).
- Clears to empty string when a new entity is loaded.
- Row count badge updates to reflect filtered count: "14 of 87 rows".

### Pagination
- Replace the bare `skip`/`top` number inputs with:
  - **Prev** / **Next** buttons (disabled at boundaries).
  - A **page size selector**: `<select>` with options 10 / 20 / 50 / 100.
  - A record counter label: "21–40 of 87 rows".
- Internally still maps to `$skip` / `$top` OData params (unchanged API contract).
- Page resets to 1 when entity changes or search clears results.

### Column Visibility
- Gear icon (⚙) button opens a floating dropdown panel anchored to the table header area.
- Panel contains a checkbox list — one entry per column, labelled with column name.
- Checked = visible. All columns start checked.
- Hidden columns are excluded from `<th>` / `<td>` rendering via `v-if`.
- Hidden columns are also excluded from the global search.
- Panel closes on outside-click or pressing ESC.

### Copy Cell Value
- Clicking any `<td>` calls `navigator.clipboard.writeText(cellValue)`.
- A toast notification (`position: fixed; bottom: 1rem; right: 1rem`) fades in "Copied ✓" and auto-dismisses after 1.5 s.
- Toast styled with accent background.

### Loading Skeleton
- Boolean `loading` reactive flag set `true` before `fetchData()` and `false` on completion (success or error).
- When `loading` is true, render 5 skeleton `<tr>` rows in place of real data rows.
- Each skeleton `<td>` contains a `<div class="skeleton-bar">` — animated shimmer via CSS `@keyframes`.
- Shimmer uses a diagonal gradient sweep (standard skeleton loader pattern).

### Long Values
- All `<td>` elements have `max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`.
- `title` attribute on each `<td>` set to the raw value (already done, just preserved).

### Keyboard Navigation
- When `data` is loaded, attach `keydown` listener on `document`.
- `↓` / `↑`: move `activeRowIndex` down/up, clamp at boundaries, call `_setRowDetails` for active row.
- `ESC`: clear `rowDetails`, `rowKey`, `activeRowIndex`.
- Listener removed on unmount / entity change.

## Section 4 — Row Detail Panel

Replace `<table id="rowDetails">` with a themed card `<div class="detail-panel">`:

### Structure
```
┌─ detail-panel ──────────────────────────────────┐
│ Row Detail — Luke Skywalker            [ESC ×]  │
├─────────────────────────────────────────────────┤
│  [ID]          [Name]          [Height]         │
│  c001           Luke Skywalker  172              │
│  [📋]           [📋]            [📋]            │
│                                                 │
│  [Birth Year]  [Eye Color]     [Gender]         │
│  19BBY          blue            male             │
│  [📋]           [📋]            [📋]            │
└─────────────────────────────────────────────────┘
```

- Header: "Row Detail — {key column value}" + dismiss button (×).
- Fields: 3-column CSS `grid`, wraps responsively.
- Each field cell: muted `<label>` above, value `<span>` below, copy icon button (📋) to the right of the value.
- Key-column values rendered in `var(--accent-text)` + `var(--font-mono)`.
- Panel hidden (`v-if="rowDetails && Object.keys(rowDetails).length"`) — appears with `transition: opacity 0.15s`.
- Dismiss button (×) clears `rowDetails` and `rowKey`.

## Section 5 — Layout & Header

### Header
```
Data Browser — People              [☀️/🌙]
```
- `<h1>` left-aligned with entity name.
- Theme toggle button right-aligned (flexbox space-between).
- Header sits outside the sidebar/main split.

### Sidebar
- Entity list styled as a nav list (not a `<table>`): `<ul>` of `<li>` items.
- Active entity: left border `3px solid var(--accent)` + `var(--bg-panel-hover)` background.
- Hover: `var(--bg-panel-hover)` background.
- DB / Service toggle: pill toggle switch (`<label>` wrapping two `<input type="radio">`) replacing bare radio + label pairs.

### Main Area
- Top bar: search input (left) + column visibility gear button (right) + pagination controls (right).
- Data table in a scrollable container (`max-height: 50vh; overflow-y: auto`).
- Row detail panel below the table.

### Backgrounds & Surfaces
- `<body>`: `background: var(--bg-base)`.
- Sidebar panel + main panel: `background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow)`.
- No external layout framework — custom flexbox only.

## Non-Goals

- No edit/delete/create functionality.
- No server-side sorting or filtering (client-side only for loaded page).
- No virtualised scrolling (datasets are small; OData `$top` handles limiting).
- No routing or multi-page structure.
- No build step — files served as static assets by CAP.
