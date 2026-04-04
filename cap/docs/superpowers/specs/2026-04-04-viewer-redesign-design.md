---
title: Data Browser Viewer Redesign
date: 2026-04-04
status: approved
---

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
  integrity="sha384-COMPUTED_AT_IMPL_TIME"
  crossorigin="anonymous"></script>
<script
  src="https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js"
  integrity="sha384-COMPUTED_AT_IMPL_TIME"
  crossorigin="anonymous"></script>
```

**Implementation step (required):** Before committing, download each file and compute its SRI hash:

```bash
curl -sL https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js | openssl dgst -sha384 -binary | openssl base64 -A
curl -sL https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js | openssl dgst -sha384 -binary | openssl base64 -A
```

Replace `COMPUTED_AT_IMPL_TIME` with the resulting base64 strings prefixed with `sha384-`. The placeholder text must not appear in the committed file.

### Content Security Policy

Add a `<meta http-equiv="Content-Security-Policy">` tag restricting:

- `script-src`: `'self'` + `https://cdn.jsdelivr.net` only
- `style-src`: `'self' 'unsafe-inline'` (inline styles required for theming)
- `connect-src`: `'self'` (all API calls go to same origin)
- `default-src`: `'none'`

### Viewport meta tag

Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to `<head>`.

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
  --font-mono:      ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  --radius:         6px;
  --shadow:         0 4px 24px rgba(0, 0, 0, 0.4);
}
```

`--font-mono` uses system fonts only — no web font CDN is loaded. `ui-monospace` resolves to the OS monospace font (SF Mono on macOS, Cascadia Code on Windows, etc.).

Alternating row striping applied via CSS: `#data tr:nth-child(even) { background: var(--bg-row-alt); }`.

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

Theme initialisation runs as an inline `<script>` in `<head>` (before body render) to avoid flash of wrong theme:

1. Read `localStorage.getItem('data-viewer:theme')`.
2. If set (`"light"` or `"dark"`), write to `document.documentElement.dataset.theme` (`"light"`) or remove the attribute (`"dark"`).
3. If not set, check `window.matchMedia('(prefers-color-scheme: light)').matches`; if true set `data-theme="light"`.

The `localStorage` key is `'data-viewer:theme'` (consistent with existing `'data-viewer:'` prefix in `app.js`).

Toggle button in the header switches between dark (no attribute) and `data-theme="light"`, persists to `localStorage`.

Vue reactive property `theme` (`'dark'` | `'light'`) mirrors `document.documentElement.dataset.theme` and drives the button icon: moon (🌙) for dark, sun (☀️) for light.

## Section 3 — Table Features

### Data Shape

The existing `data` reactive property remains `string[][]` (array of rows, each row is an array of cell values corresponding to `columns` by index). All computed properties and sort/filter logic operate on this shape. Column access: `row[columnIndex]`.

### Sort

- Vue reactive data: `sortState: { col: null, dir: null }` where `col` is a column index (`number | null`) and `dir` is `'asc' | 'desc' | null`.
- Clicking a `<th>` cycles: `null` → `'asc'` → `'desc'` → `null` for that column; switching to a different column resets to `'asc'`.
- Sort is applied in the `sortedData` computed property (see pipeline below).
- Comparator: `String(a[col]).localeCompare(String(b[col]), undefined, { numeric: true, sensitivity: 'base' })` — handles numeric strings (e.g. `"172"` vs `"96"`) correctly via `numeric: true`.
- Active sort column header shows ↑ (asc) or ↓ (desc) indicator appended to column name; cursor `pointer` on all `<th>`.

### Global Search / Filter

- Vue reactive data: `search: ''`.
- `filteredData` computed property: filters `sortedData` rows where `String(cell).toLowerCase().includes(search.toLowerCase())` is true for at least one visible column's cell.
- Only visible columns (per Column Visibility) are searched.
- `search` is reset to `''` inside `inspectEntity()` when a new entity is selected.

### Computed Data Pipeline

Computed properties chain in order:

1. `sortedData` — applies sort to `data`
2. `filteredData` — applies search filter to `sortedData`
3. Template renders `filteredData`

### Pagination & Total Count

- Add `$count=true` to the `fetchData` OData request URL.
- Store the OData response's `@odata.count` value in Vue reactive data `totalCount: 0`.
- Replace bare `skip`/`top` number inputs with:
  - **Prev** / **Next** buttons (disabled when at first/last page).
  - A **page size selector** `<select>` with options 10 / 20 / 50 / 100; bound to `top`.
  - Record counter: when `search` is empty — `"{skip+1}–{skip+top} of {totalCount} rows"`; when `search` is active — `"{filteredData.length} of {totalCount} rows (filtered)"`.
- `skip` and `top` remain stored in `localStorage` under existing keys (`'data-viewer:skip'`, `'data-viewer:top'`).
- Page resets (`skip = 0`) when entity changes (inside `inspectEntity`) or when `top` changes.

### Column Visibility

- Vue reactive data: `hiddenCols: Set<number>` (set of column indexes that are hidden). Starts empty (all visible).
- Vue reactive data: `showColPanel: false` — controls dropdown visibility.
- Gear icon (⚙) button toggles `showColPanel`. Panel is a `<div>` with `position: absolute` anchored below the gear button using a wrapper `<div style="position: relative">`.
- Panel contains a `<label><input type="checkbox">` per column. Checked = visible. Unchecked adds index to `hiddenCols`.
- Outside-click closes the panel: a single `document` `'click'` listener added when `showColPanel` becomes `true`, removed when it becomes `false`. The listener checks `!event.composedPath().includes(gearWrapperEl)` and sets `showColPanel = false` if true. Use a Vue `watch` on `showColPanel` to add/remove the listener.
- ESC keydown (part of the keyboard navigation listener) also sets `showColPanel = false`.
- `<th>` and `<td>` rendered with `v-show` (not `v-if`) for hidden columns to preserve column index alignment in the `row[]` array.
- Hidden columns excluded from `filteredData` search: only iterate `row[i]` where `!hiddenCols.has(i)`.
- `hiddenCols` resets to `new Set()` when a new entity is loaded.

### Copy Cell Value

- Each `<td>` has `@click.stop="copyCell(cellValue)"`.
- `.stop` prevents the click from bubbling to the `<tr>`'s row-selection handler.
- `copyCell(value)` calls `navigator.clipboard.writeText(String(value))`.
- Vue reactive data: `toastVisible: false`, `toastMessage: ''`.
- On copy: set `toastMessage = 'Copied ✓'`, `toastVisible = true`, then `setTimeout(() => { toastVisible = false }, 1500)`.
- Toast is a `<div>` with `v-show="toastVisible"`, `position: fixed; bottom: 1.5rem; right: 1.5rem`, styled with `var(--accent)` background.
- Detail panel field copy buttons (📋) call the same `copyCell` method.

### Loading Skeleton

- Vue reactive data: `loading: false`.
- Set `loading = true` at the start of `fetchData()`, `loading = false` in both the success and error paths (inside `finally`).
- Template: when `loading` is true, render 5 `<tr class="skeleton-row">` rows instead of real data rows. Each `<tr>` has one `<td colspan="N">` containing a `<div class="skeleton-bar">` where N = number of visible columns.
- CSS shimmer animation:

```css
.skeleton-bar {
  height: 14px; border-radius: 4px;
  background: linear-gradient(90deg, var(--bg-panel) 25%, var(--border-strong) 50%, var(--bg-panel) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }
```

### Long Values

- All `<td>` elements: `max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap`.
- `title` attribute on each `<td>` set to the raw cell value.

### Row Selection & Keyboard Navigation

- Vue reactive data: `activeRowIndex: -1` (index into `filteredData`; -1 = no selection).
- `rowKey` remains as the localStorage-persisted selection identifier (unchanged logic).
- When a `<tr>` is clicked (`@click="selectRow(index)"`), set `activeRowIndex = index` and call existing `_setRowDetails(filteredData[index])` / `_makeRowKey` logic.
- `isActiveRow` checks `filteredData.indexOf(row) === activeRowIndex` (or equivalently, pass index from `v-for`).
- Keyboard listener attached once in Vue's `mounted()` hook, never removed (the app is never unmounted):

```js
mounted() {
  document.addEventListener('keydown', this._onKeydown)
}
```

- `_onKeydown(e)` handler:
  - `ArrowDown`: if `activeRowIndex < filteredData.length - 1`, increment; call `_setRowDetails`.
  - `ArrowUp`: if `activeRowIndex > 0`, decrement; call `_setRowDetails`.
  - `Escape`: set `activeRowIndex = -1`, `rowDetails = {}`, `rowKey = ''`, `showColPanel = false`.
  - Only intercept arrow keys when `document.activeElement` is not an `<input>` or `<select>`.
- `activeRowIndex` resets to `-1` when a new entity is loaded (inside `inspectEntity`).

## Section 4 — Row Detail Panel

Replace `<table id="rowDetails">` with a themed card `<div class="detail-panel">`.

### Detail Panel Data Shape

`rowDetails` retains its existing shape: a plain object `{ [columnName: string]: string }` built by `_setRowDetails`. The template iterates with `v-for="(value, key) in rowDetails"`.

### Dismiss

Dismiss button (×) sets `rowDetails = {}` (empty object, not `null`) and `rowKey = ''` and `activeRowIndex = -1`.

### Detail Panel Header

`"Row Detail — {displayKey}"` where `displayKey` is the comma-separated values of all key columns (e.g., `"c001"` for a single key, `"c001, EP01"` for a composite key). Computed from `rowDetails` filtered to key column names (use `columns` array to identify which column names are keys).

### Detail Panel Structure

```text
┌─ detail-panel ──────────────────────────────────┐
│ Row Detail — Luke Skywalker            [×]      │
├─────────────────────────────────────────────────┤
│  [ID]          [Name]          [Height]         │
│  c001           Luke Skywalker  172     [📋]    │
│                                                 │
│  [Birth Year]  [Eye Color]     [Gender]         │
│  19BBY          blue            male    [📋]    │
└─────────────────────────────────────────────────┘
```

- Fields in a 3-column CSS `grid` (`grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))`).
- Each field cell: `<span class="field-label">` above, `<span class="field-value">` + `<button class="copy-btn">📋</button>` below (inline-flex row).
- Key-column field values: `color: var(--text-key); font-family: var(--font-mono)`.
- Panel shown with `v-if="Object.keys(rowDetails).length > 0"`, appears with `transition: opacity 0.15s ease`.

## Section 5 — Layout & Header

### Page Header

```text
Data Browser — People              [☀️/🌙]
```

- Flex row, `justify-content: space-between; align-items: center`.
- `<h1>` left: "Data Browser" + `<span v-if="entity"> — {{ entity.name }}</span>`.
- Right: theme toggle `<button>` with moon/sun icon.
- `document.title` updated to `"Data Browser — {entity.name}"` inside `inspectEntity`.

### Sidebar

- Entity list: `<ul class="entity-list">` of `<li>` items. Each `<li @click="inspectEntity(e)">` passes the entity object directly (eliminates DOM `rowIndex` dependency). `inspectEntity` signature changes to `inspectEntity(entity)`.
- Active entity `<li>`: `border-left: 3px solid var(--accent)` + `background: var(--bg-panel-hover)`.
- Hover: `background: var(--bg-panel-hover)`.
- DB / Service toggle: pill toggle switch using `<label>` wrapping `<input type="radio">` pairs, replacing bare radio+label markup.

### Main Area

- Top bar: search `<input>` (flex-grow left) + gear `<button>` (right) with column visibility dropdown + pagination controls (right).
- Data table in a scrollable `<div>` container: `max-height: 50vh; overflow-y: auto`.
- Row detail panel below the table.
- `inspectRow` is replaced by `@click="selectRow(index)"` on each `<tr>` in the `v-for`, where `index` is the `v-for` index into `filteredData`. This eliminates all `eve.currentTarget.rowIndex` DOM index dependencies.

### Backgrounds & Surfaces

- `<body>`: `background: var(--bg-base); color: var(--text-primary)`.
- Sidebar panel + main panel: `background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); padding: 1rem`.
- No external layout framework — custom flexbox only.

## Non-Goals

- No edit/delete/create functionality.
- No server-side sorting or filtering (client-side only for loaded page).
- No virtualised scrolling (datasets are small; OData `$top` handles limiting).
- No routing or multi-page structure.
- No build step — files served as static assets by CAP.
- Mobile responsiveness is best-effort only (viewport meta tag added; layout may reflow but is not mobile-optimised).
