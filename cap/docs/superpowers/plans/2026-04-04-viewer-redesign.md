# Data Browser Viewer Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `cap/app/viewer/index.html` and `cap/app/viewer/app.js` to add Galaxy/Light dual-theme, security hardening, and enhanced table features (sort, filter, pagination, column visibility, copy cell, keyboard nav, loading skeleton, improved row detail panel).

**Architecture:** Complete rewrite of two files only. `index.html` owns the HTML template and all CSS (no external stylesheet). `app.js` owns all Vue logic. No build step — files served as CAP static assets and loaded directly in the browser.

**Tech Stack:** Vue 3.4.21 (CDN, SRI-pinned), Axios 1.6.8 (CDN, SRI-pinned), custom CSS with CSS custom properties, no other dependencies.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `cap/app/viewer/index.html` | **Full rewrite** | HTML template, all CSS, theme init script, CSP/SRI meta |
| `cap/app/viewer/app.js` | **Full rewrite** | All Vue reactive data, computed properties, methods, lifecycle |

There are no automated tests for the viewer app (the test suite in `cap/test/` covers the CAP service layer only). Each task ends with a browser verification step. Start the app once before Task 1 and leave it running.

---

## Pre-flight: Start the app

```bash
cd cap
npm run sqlite
```

Open `http://localhost:4004` in your browser. You will see the current basic viewer. Keep this running throughout all tasks.

---

## Task 1: Security hardening — CDN pins, SRI hashes, CSP

**Files:**
- Modify: `cap/app/viewer/index.html`

Replace the entire `<head>` of `index.html`. This removes primitive-ui, pins CDN versions, adds SRI integrity hashes, adds CSP, and adds a viewport tag. The SRI hashes below are pre-computed — do not recompute them.

- [ ] **Step 1: Replace `<head>` in index.html**

Replace the existing `<head>…</head>` block with:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy"
        content="default-src 'none'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; connect-src 'self'">
  <title>Data Browser</title>

  <!-- Theme init: runs before body renders to avoid flash of wrong theme -->
  <script>
    (function () {
      var saved = localStorage.getItem('data-viewer:theme')
      if (saved) {
        if (saved === 'light') document.documentElement.dataset.theme = 'light'
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.documentElement.dataset.theme = 'light'
      }
    })()
  </script>

  <script src="https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js"
          integrity="sha384-6pS1WSZJY7wOk6qQTa9C9U2W1/qzqL7iYoMil7qn9KFeN5fZDAwIExgCd7U5AH+X"
          crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js"
          integrity="sha384-ftvHQsVsFt/CYVdJ1acqn4sKGIZ77bziRNFfeph9Ww9C4vQa5zY/ev4cfR5vyYrZ"
          crossorigin="anonymous"></script>

  <script src="app.js" defer></script>

  <style>
    /* placeholder — styles added in Task 2 */
  </style>
</head>
```

- [ ] **Step 2: Verify in browser**

Hard-refresh `http://localhost:4004/viewer/`. Open DevTools → Console — no errors. Network tab: primitive-ui request is gone; Vue and Axios load from jsdelivr with status 200.

> **If you see `net::ERR_SRI_HASH_MISMATCH` in the console:** the pre-computed hashes above are stale. Recompute them fresh:
>
> ```bash
> curl -sL https://cdn.jsdelivr.net/npm/vue@3.4.21/dist/vue.global.prod.js | openssl dgst -sha384 -binary | openssl base64 -A
> curl -sL https://cdn.jsdelivr.net/npm/axios@1.6.8/dist/axios.min.js | openssl dgst -sha384 -binary | openssl base64 -A
> ```
>
> Replace both `integrity="sha384-…"` values in `index.html` with the new output (prefixed `sha384-`).

- [ ] **Step 3: Commit**

```bash
git add cap/app/viewer/index.html
git commit -m "feat(viewer): pin CDN versions with SRI hashes, add CSP and viewport meta"
```

---

## Task 2: CSS — theming system and full layout styles

**Files:**
- Modify: `cap/app/viewer/index.html` (the `<style>` block)

Replace the `/* placeholder */` comment in `<style>` with the complete stylesheet. The body of `index.html` remains unchanged for now.

- [ ] **Step 1: Replace the `<style>` block content**

```css
/* ── Reset & base ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; font-size: 14px; line-height: 1.5; }

/* ── Galaxy dark (default) ────────────────────────────── */
:root {
  --bg-base:        #0a0e1a;
  --bg-panel:       rgba(255,255,255,0.04);
  --bg-panel-hover: rgba(139,92,246,0.08);
  --bg-row-alt:     rgba(139,92,246,0.05);
  --bg-row-active:  rgba(139,92,246,0.15);
  --accent:         #8b5cf6;
  --accent-soft:    rgba(139,92,246,0.2);
  --accent-text:    #c4b5fd;
  --accent-border:  rgba(139,92,246,0.3);
  --text-primary:   #e2e8f0;
  --text-muted:     #64748b;
  --text-key:       #a78bfa;
  --border:         rgba(255,255,255,0.07);
  --border-strong:  rgba(255,255,255,0.12);
  --font-mono:      ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
  --radius:         6px;
  --shadow:         0 4px 24px rgba(0,0,0,0.4);
}

/* ── Clean Light overrides ────────────────────────────── */
[data-theme="light"] {
  --bg-base:        #f8fafc;
  --bg-panel:       #ffffff;
  --bg-panel-hover: #eff6ff;
  --bg-row-alt:     #fafbff;
  --bg-row-active:  #eff6ff;
  --accent:         #6366f1;
  --accent-soft:    rgba(99,102,241,0.1);
  --accent-text:    #4f46e5;
  --accent-border:  #bfdbfe;
  --text-primary:   #1e293b;
  --text-muted:     #94a3b8;
  --text-key:       #6366f1;
  --border:         #e2e8f0;
  --border-strong:  #cbd5e1;
  --shadow:         0 1px 8px rgba(0,0,0,0.08);
}

/* ── App shell ────────────────────────────────────────── */
html, body { height: 100%; background: var(--bg-base); color: var(--text-primary); }
#app { display: flex; flex-direction: column; height: 100vh; padding: 1rem; gap: 1rem; }

/* ── Page header ─────────────────────────────────────── */
.app-header { display: flex; justify-content: space-between; align-items: center; }
.app-header h1 { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); }
.app-header h1 span { color: var(--accent-text); }
.btn-theme {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--text-primary); cursor: pointer; padding: 0.35rem 0.75rem; font-size: 1rem;
  transition: background 0.15s;
}
.btn-theme:hover { background: var(--bg-panel-hover); }

/* ── Layout: sidebar + main ──────────────────────────── */
.layout { display: flex; gap: 1rem; flex: 1; min-height: 0; }
.sidebar {
  flex: 0 0 220px; display: flex; flex-direction: column; gap: 0.75rem;
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius); box-shadow: var(--shadow); padding: 1rem; overflow-y: auto;
}
.main {
  flex: 1; display: flex; flex-direction: column; gap: 0.75rem;
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: var(--radius); box-shadow: var(--shadow); padding: 1rem; min-width: 0;
}

/* ── Source pill toggle ──────────────────────────────── */
.source-toggle { display: flex; gap: 0; border-radius: 20px; border: 1px solid var(--border); overflow: hidden; width: fit-content; }
.source-toggle input[type="radio"] { display: none; }
.source-toggle label {
  padding: 0.25rem 0.75rem; cursor: pointer; font-size: 12px; color: var(--text-muted);
  background: transparent; transition: background 0.15s, color 0.15s; user-select: none;
}
.source-toggle input[type="radio"]:checked + label {
  background: var(--accent-soft); color: var(--accent-text); font-weight: 600;
}

/* ── Entity list ─────────────────────────────────────── */
.sidebar-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 700; }
.entity-list { list-style: none; display: flex; flex-direction: column; gap: 2px; }
.entity-list li {
  padding: 0.4rem 0.75rem; border-radius: calc(var(--radius) - 2px); cursor: pointer;
  color: var(--text-muted); font-size: 13px; border-left: 3px solid transparent;
  transition: background 0.12s, color 0.12s;
}
.entity-list li:hover { background: var(--bg-panel-hover); color: var(--text-primary); }
.entity-list li.active {
  border-left-color: var(--accent); background: var(--bg-panel-hover);
  color: var(--accent-text); font-weight: 600;
}

/* ── Table toolbar ───────────────────────────────────── */
.toolbar { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.search-input {
  flex: 1; min-width: 160px; background: transparent; border: 1px solid var(--border);
  border-radius: var(--radius); padding: 0.35rem 0.65rem; color: var(--text-primary);
  font-size: 13px; outline: none;
}
.search-input:focus { border-color: var(--accent); }
.search-input::placeholder { color: var(--text-muted); }
.record-count { font-size: 12px; color: var(--text-muted); white-space: nowrap; }

/* ── Pagination ──────────────────────────────────────── */
.pagination { display: flex; align-items: center; gap: 0.4rem; margin-left: auto; }
.btn-page {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--text-primary); cursor: pointer; padding: 0.25rem 0.6rem; font-size: 12px;
}
.btn-page:disabled { opacity: 0.35; cursor: default; }
.btn-page:not(:disabled):hover { background: var(--bg-panel-hover); }
.page-size {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--text-primary); padding: 0.2rem 0.4rem; font-size: 12px; cursor: pointer;
}

/* ── Column visibility gear ──────────────────────────── */
.col-vis-wrap { position: relative; }
.btn-gear {
  background: var(--bg-panel); border: 1px solid var(--border); border-radius: var(--radius);
  color: var(--text-muted); cursor: pointer; padding: 0.35rem 0.6rem; font-size: 14px;
}
.btn-gear:hover { color: var(--text-primary); background: var(--bg-panel-hover); }
.col-panel {
  position: absolute; right: 0; top: calc(100% + 4px); z-index: 10;
  background: var(--bg-base); border: 1px solid var(--border-strong);
  border-radius: var(--radius); box-shadow: var(--shadow);
  padding: 0.5rem; min-width: 160px; max-height: 280px; overflow-y: auto;
}
.col-panel label {
  display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.35rem;
  cursor: pointer; color: var(--text-primary); font-size: 12px; border-radius: 3px;
}
.col-panel label:hover { background: var(--bg-panel-hover); }
.col-panel input[type="checkbox"] { accent-color: var(--accent); }

/* ── Data table ──────────────────────────────────────── */
.table-wrap { flex: 1; overflow-y: auto; min-height: 0; }
table { width: 100%; border-collapse: collapse; }
thead th {
  position: sticky; top: 0; z-index: 2;
  background: var(--bg-base); color: var(--text-muted);
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid var(--border-strong);
  cursor: pointer; user-select: none; white-space: nowrap;
}
thead th:hover { color: var(--text-primary); }
thead th.sorted { color: var(--accent-text); }
tbody tr { border-bottom: 1px solid var(--border); transition: background 0.1s; }
tbody tr:nth-child(even) { background: var(--bg-row-alt); }
tbody tr:hover td { background: var(--bg-panel-hover); cursor: pointer; }
tbody tr.active td { background: var(--bg-row-active) !important; }
td {
  padding: 0.45rem 0.75rem; font-size: 13px; color: var(--text-primary);
  max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  cursor: pointer;
}
td.is-key { color: var(--text-key); font-family: var(--font-mono); font-size: 12px; }

/* ── Skeleton loader ─────────────────────────────────── */
.skeleton-bar {
  height: 14px; border-radius: 4px;
  background: linear-gradient(90deg, var(--bg-panel) 25%, var(--border-strong) 50%, var(--bg-panel) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }

/* ── Error message ───────────────────────────────────── */
.error-msg { color: #f87171; padding: 0.5rem 0; font-size: 13px; }

/* ── Row detail panel ────────────────────────────────── */
.detail-panel {
  background: var(--bg-panel); border: 1px solid var(--accent-border);
  border-radius: var(--radius); padding: 1rem; margin-top: 0.5rem;
  transition: opacity 0.15s ease;
}
.detail-header {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border);
}
.detail-header span { font-size: 13px; font-weight: 600; color: var(--accent-text); }
.btn-dismiss {
  background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 16px; line-height: 1;
  padding: 0 0.25rem;
}
.btn-dismiss:hover { color: var(--text-primary); }
.detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.75rem; }
.field-cell { display: flex; flex-direction: column; gap: 2px; }
.field-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }
.field-value-row { display: flex; align-items: center; gap: 0.35rem; }
.field-value { font-size: 13px; color: var(--text-primary); word-break: break-all; }
.field-value.is-key { color: var(--text-key); font-family: var(--font-mono); font-size: 12px; }
.btn-copy { background: none; border: none; cursor: pointer; color: var(--text-muted); font-size: 12px; padding: 0; line-height: 1; }
.btn-copy:hover { color: var(--accent-text); }

/* ── Toast ───────────────────────────────────────────── */
.toast {
  position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 100;
  background: var(--accent); color: #fff; padding: 0.5rem 1rem;
  border-radius: var(--radius); font-size: 13px; font-weight: 600;
  box-shadow: var(--shadow); pointer-events: none;
}
```

- [ ] **Step 2: Verify the CSS loads**

Hard-refresh the page. The layout will look broken (body still has old primitive-ui classes) but there should be zero console errors and DevTools → Sources shows the new stylesheet.

- [ ] **Step 3: Commit**

```bash
git add cap/app/viewer/index.html
git commit -m "feat(viewer): add Galaxy/Light CSS theme system with full layout styles"
```

---

## Task 3: Rewrite index.html template body

**Files:**
- Modify: `cap/app/viewer/index.html` (the `<body>`)

Replace the entire `<body>` with the new Vue template. The app.js logic is still the old code at this point — the page will look right structurally but Vue bindings won't all work yet. That's fine.

- [ ] **Step 1: Replace `<body>` content**

```html
<body>
<div id="app">

  <!-- Page header -->
  <header class="app-header">
    <h1>Data Browser<span v-if="entity"> &mdash; {{ entity.name }}</span></h1>
    <button class="btn-theme" @click="toggleTheme" :title="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
      {{ theme === 'dark' ? '☀️' : '🌙' }}
    </button>
  </header>

  <!-- Main layout -->
  <div class="layout">

    <!-- Sidebar -->
    <aside class="sidebar">
      <span class="sidebar-label">Source</span>
      <div class="source-toggle">
        <input type="radio" id="src-db"  value="db"      v-model="dataSource" name="src">
        <label for="src-db">Database</label>
        <input type="radio" id="src-srv" value="service" v-model="dataSource" name="src">
        <label for="src-srv">Service</label>
      </div>

      <span class="sidebar-label" style="margin-top:0.5rem;">Entities</span>
      <ul class="entity-list">
        <li v-for="e in entities" :key="e.name"
            :class="{ active: entity && e.name === entity.name }"
            @click="inspectEntity(e)">
          {{ e.name }}
        </li>
      </ul>
    </aside>

    <!-- Main content -->
    <main class="main">

      <!-- Toolbar: search + gear + pagination -->
      <div class="toolbar" v-if="columns.length">
        <input class="search-input" v-model="search" placeholder="Search all columns…" />
        <span class="record-count">
          <template v-if="!search">{{ skip + 1 }}–{{ Math.min(skip + top, totalCount) }} of {{ totalCount }} rows</template>
          <template v-else>{{ filteredData.length }} of {{ totalCount }} rows (filtered)</template>
        </span>

        <!-- Column visibility -->
        <div class="col-vis-wrap" ref="gearWrap">
          <button class="btn-gear" @click="showColPanel = !showColPanel" title="Column visibility">⚙</button>
          <div class="col-panel" v-show="showColPanel">
            <label v-for="(col, i) in columns" :key="col.name">
              <input type="checkbox" :checked="!hiddenCols.has(i)" @change="toggleCol(i)">
              {{ col.name }}
            </label>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="btn-page" @click="prevPage" :disabled="skip === 0">‹ Prev</button>
          <select class="page-size" v-model.number="top">
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
          <button class="btn-page" @click="nextPage" :disabled="skip + top >= totalCount">Next ›</button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="error-msg">
        Error: {{ error.code ? error.code + ' – ' + error.message : error.message }}
      </div>

      <!-- Data table -->
      <div class="table-wrap" v-if="columns.length">
        <table id="data">
          <thead>
            <tr>
              <th v-for="(col, i) in columns"
                  v-show="!hiddenCols.has(i)"
                  :key="col.name"
                  :class="{ sorted: sortState.col === i }"
                  :title="col.type"
                  @click="sortBy(i)">
                {{ col.name }}
                <span v-if="sortState.col === i">{{ sortState.dir === 'asc' ? '↑' : '↓' }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Skeleton rows while loading -->
            <template v-if="loading">
              <tr v-for="n in 5" :key="'sk'+n" class="skeleton-row">
                <td :colspan="columns.length - hiddenCols.size">
                  <div class="skeleton-bar"></div>
                </td>
              </tr>
            </template>
            <!-- Data rows -->
            <template v-else>
              <tr v-for="(row, rowIdx) in filteredData"
                  :key="rowIdx"
                  :class="{ active: rowIdx === activeRowIndex }"
                  @click="selectRow(rowIdx)">
                <td v-for="(cell, colIdx) in row"
                    v-show="!hiddenCols.has(colIdx)"
                    :key="colIdx"
                    :class="{ 'is-key': columns[colIdx] && columns[colIdx].isKey }"
                    :title="cell"
                    @click.stop="copyCell(cell)">
                  {{ cell }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Row detail panel -->
      <div class="detail-panel" v-if="Object.keys(rowDetails).length > 0">
        <div class="detail-header">
          <span>Row Detail — {{ displayKey }}</span>
          <button class="btn-dismiss" @click="dismissDetail" title="Close">×</button>
        </div>
        <div class="detail-grid">
          <div class="field-cell" v-for="(value, key) in rowDetails" :key="key">
            <span class="field-label">{{ key }}</span>
            <div class="field-value-row">
              <span class="field-value" :class="{ 'is-key': isKeyColumn(key) }">{{ value }}</span>
              <button class="btn-copy" @click="copyCell(value)" title="Copy">📋</button>
            </div>
          </div>
        </div>
      </div>

    </main>
  </div>

  <!-- Toast -->
  <div class="toast" v-show="toastVisible">{{ toastMessage }}</div>

</div>
</body>
```

- [ ] **Step 2: Verify structure**

Hard-refresh. The page should render with Galaxy dark background. Some bindings will error (new properties not yet in app.js) — that's expected. Check DevTools console to confirm Vue loaded and the app mounted.

- [ ] **Step 3: Commit**

```bash
git add cap/app/viewer/index.html
git commit -m "feat(viewer): rewrite HTML template with Galaxy/Light layout and all UI elements"
```

---

## Task 4: Rewrite app.js — core data, theme toggle, entity + data fetching

**Files:**
- Modify: `cap/app/viewer/app.js`

This is a full rewrite of app.js. Replace the entire file with the new version. This task wires up everything needed for the basic app to function: theme, entity list, data fetching with `$count`, pagination, and the core selection model. Later tasks add computed pipelines and new features.

- [ ] **Step 1: Replace app.js entirely**

```js
/* global Vue axios */
const GET = (url) => axios.get('/odata/v4/-data' + url)
const storageGet = (key, def) => localStorage.getItem('data-viewer:' + key) ?? def
const storageSet = (key, val) => localStorage.setItem('data-viewer:' + key, val)

const columnKeysFirst = (c1, c2) => {
  if (c1.isKey && !c2.isKey) return -1
  if (!c1.isKey && c2.isKey) return 1
  if (c1.isKey && c2.isKey) return c1.name.localeCompare(c2.name)
  return 0
}

const app = Vue.createApp({

  data() {
    const savedTheme = localStorage.getItem('data-viewer:theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    return {
      // Theme
      theme: savedTheme,
      // Data source
      dataSource: storageGet('data-source', 'db'),
      // Pagination
      skip: Number(storageGet('skip', 0)),
      top:  Number(storageGet('top', 20)),
      totalCount: 0,
      // Entities + columns
      entity:   storageGet('entity') ? JSON.parse(storageGet('entity')) : undefined,
      entities: [],
      columns:  [],
      // Raw data (string[][])
      data: [],
      loading: false,
      error: undefined,
      // Sort
      sortState: { col: null, dir: null },
      // Search
      search: '',
      // Column visibility
      hiddenCols: new Set(),
      showColPanel: false,
      // Row selection
      rowDetails: {},
      rowKey: storageGet('row-key', ''),
      activeRowIndex: -1,
      // Toast
      toastVisible: false,
      toastMessage: '',
    }
  },

  computed: {
    sortedData() {
      const { col, dir } = this.sortState
      if (col === null || dir === null) return this.data
      return [...this.data].sort((a, b) => {
        const cmp = String(a[col]).localeCompare(String(b[col]), undefined, { numeric: true, sensitivity: 'base' })
        return dir === 'asc' ? cmp : -cmp
      })
    },

    filteredData() {
      if (!this.search) return this.sortedData
      const q = this.search.toLowerCase()
      return this.sortedData.filter(row =>
        row.some((cell, i) => !this.hiddenCols.has(i) && String(cell).toLowerCase().includes(q))
      )
    },

    displayKey() {
      if (!this.columns.length || !Object.keys(this.rowDetails).length) return ''
      return this.columns
        .filter(c => c.isKey)
        .map(c => this.rowDetails[c.name] ?? '')
        .join(', ')
    },
  },

  watch: {
    dataSource(v) { storageSet('data-source', v); this.fetchEntities() },
    skip(v)       { storageSet('skip', v); if (this.entity) this.fetchData() },
    top(v)        { storageSet('top', v);  this.skip = 0; if (this.entity) this.fetchData() },

    showColPanel(open) {
      if (open) {
        this._colPanelHandler = (e) => {
          if (!this.$refs.gearWrap.contains(e.target)) this.showColPanel = false
        }
        document.addEventListener('click', this._colPanelHandler)
      } else {
        document.removeEventListener('click', this._colPanelHandler)
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this._onKeydown.bind(this))
    this.fetchEntities()
  },

  methods: {

    // ── Theme ──────────────────────────────────────────────
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      if (this.theme === 'light') {
        document.documentElement.dataset.theme = 'light'
      } else {
        delete document.documentElement.dataset.theme
      }
      storageSet('theme', this.theme)
    },

    // ── Entity fetching ────────────────────────────────────
    async fetchEntities() {
      let url = '/Entities'
      if (this.dataSource === 'db') url += '?dataSource=db'
      const { data } = await GET(url)
      this.entities = data.value
      this.entities.forEach(e => e.columns.sort(columnKeysFirst))
      const entity = this.entity && this.entities.find(e => e.name === this.entity.name)
      if (entity) {
        this.columns = entity.columns
        await this.fetchData()
      } else {
        this.entity = undefined
        this.columns = []
        this.data = []
        this.rowDetails = {}
      }
    },

    inspectEntity(entity) {
      this.entity = entity
      storageSet('entity', JSON.stringify(entity))
      this.columns = this.entities.find(e => e.name === entity.name).columns
      // Reset per-entity state
      this.search = ''
      this.hiddenCols = new Set()
      this.sortState = { col: null, dir: null }
      this.skip = 0
      this.activeRowIndex = -1
      this.rowDetails = {}
      this.rowKey = ''
      document.title = 'Data Browser — ' + entity.name
      return this.fetchData()
    },

    // ── Data fetching ──────────────────────────────────────
    async fetchData() {
      let url = `/Data?entity=${this.entity.name}&$skip=${this.skip}&$top=${this.top}&$count=true`
      if (this.dataSource === 'db') url += '&dataSource=db'
      this.loading = true
      try {
        const { data } = await GET(url)
        this.totalCount = data['@odata.count'] ?? 0
        const colIdx = {}
        this.columns.forEach((c, i) => { colIdx[c.name] = i })
        this.data = data.value.map(d =>
          d.record
            .sort((r1, r2) => colIdx[r1.column] - colIdx[r2.column])
            .map(r => r.data)
        )
        // Restore row selection if key still exists
        const row = this.data.find(r => this._makeRowKey(r) === this.rowKey)
        if (row) {
          this.activeRowIndex = this.filteredData.indexOf(row)
          this._setRowDetails(row)
        } else {
          this.rowDetails = {}
          this.activeRowIndex = -1
        }
        this.error = undefined
      } catch (err) {
        this.data = []
        this.rowDetails = {}
        this.activeRowIndex = -1
        this.error = err.response?.data?.error ?? { code: err.code, message: err.message }
      } finally {
        this.loading = false
      }
    },

    // ── Row selection ──────────────────────────────────────
    selectRow(idx) {
      this.activeRowIndex = idx
      const row = this.filteredData[idx]
      this.rowKey = this._makeRowKey(row)
      storageSet('row-key', this.rowKey)
      this._setRowDetails(row)
    },

    _setRowDetails(row) {
      this.rowDetails = {}
      row.forEach((val, i) => {
        this.rowDetails[this.columns[i].name] = val
      })
    },

    _makeRowKey(row) {
      return row
        .filter((_, i) => this.columns[i]?.isKey)
        .reduce((acc, v) => acc + v, '')
    },

    dismissDetail() {
      this.rowDetails = {}
      this.rowKey = ''
      this.activeRowIndex = -1
    },

    isKeyColumn(colName) {
      return this.columns.some(c => c.name === colName && c.isKey)
    },

    // ── Sort ───────────────────────────────────────────────
    sortBy(colIdx) {
      const s = this.sortState
      if (s.col !== colIdx) {
        this.sortState = { col: colIdx, dir: 'asc' }
      } else if (s.dir === 'asc') {
        this.sortState = { col: colIdx, dir: 'desc' }
      } else if (s.dir === 'desc') {
        this.sortState = { col: null, dir: null }
      }
    },

    // ── Pagination ─────────────────────────────────────────
    prevPage() {
      if (this.skip > 0) this.skip = Math.max(0, this.skip - this.top)
    },
    nextPage() {
      if (this.skip + this.top < this.totalCount) this.skip += this.top
    },

    // ── Column visibility ──────────────────────────────────
    toggleCol(idx) {
      const h = new Set(this.hiddenCols)
      if (h.has(idx)) h.delete(idx)
      else h.add(idx)
      this.hiddenCols = h
    },

    // ── Copy + toast ───────────────────────────────────────
    copyCell(value) {
      navigator.clipboard.writeText(String(value ?? ''))
      this.toastMessage = 'Copied ✓'
      this.toastVisible = true
      clearTimeout(this._toastTimer)
      this._toastTimer = setTimeout(() => { this.toastVisible = false }, 1500)
    },

    // ── Keyboard navigation ────────────────────────────────
    _onKeydown(e) {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (this.activeRowIndex < this.filteredData.length - 1) {
          this.selectRow(this.activeRowIndex + 1)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (this.activeRowIndex > 0) {
          this.selectRow(this.activeRowIndex - 1)
        }
      } else if (e.key === 'Escape') {
        this.dismissDetail()
        this.showColPanel = false
      }
    },

  }
})

app.mount('#app')
```

- [ ] **Step 2: Verify full functionality in browser**

Hard-refresh `http://localhost:4004/viewer/`.

Work through this checklist manually:

1. **Theme toggle** — click ☀️/🌙 in the header; page switches between Galaxy and Light. Refresh — theme persists.
2. **OS theme** — if you clear `localStorage` (`localStorage.clear()` in console) and refresh, theme matches your OS setting.
3. **Entity list** — click different entities in the sidebar; data table fills, entity highlights in sidebar.
4. **DB/Service toggle** — switch between Database and Service; entity list reloads.
5. **Pagination** — Prev/Next buttons work; page-size selector works; record counter updates.
6. **Sort** — click any column header; ↑/↓ indicator appears; clicking again reverses; clicking a third time clears.
7. **Search** — type in the search box; rows filter live; record counter shows "(filtered)".
8. **Column visibility** — click ⚙; uncheck a column; it disappears from the table. Click outside the panel — it closes.
9. **Copy cell** — click any cell in the data table; "Copied ✓" toast appears for 1.5 s.
10. **Row detail** — click a row; detail panel appears below with all fields. Click 📋 on a field — copies value.
11. **Dismiss** — click × on detail panel; it closes.
12. **Keyboard nav** — click a row; press ↓/↑ to move between rows; press ESC to dismiss.
13. **Loading skeleton** — on a slow connection (DevTools → Network → throttle to Slow 3G), select an entity; shimmer skeleton rows appear while loading.
14. **Error state** — stop the server (`Ctrl+C`) and refresh — error message appears. Restart server.

- [ ] **Step 3: Commit**

```bash
git add cap/app/viewer/app.js
git commit -m "feat(viewer): rewrite app.js with theme toggle, sort, filter, pagination, copy, keyboard nav, detail panel"
```

---

## Task 5: Smoke test with different entities and edge cases

This is a manual verification task — no code changes.

- [ ] **Step 1: Test with entities that have composite keys**

If the CAP data service has entities with composite primary keys (check `cap/db/schema.cds` — junction entities like `Film2People` have composite keys), select one. Verify the "Row Detail — {key}" header shows comma-separated key values.

- [ ] **Step 2: Test with entities that have many columns**

Select an entity with many columns (e.g. `People` has ~10 fields). Verify the detail panel's grid wraps correctly. Verify column visibility lets you hide several columns at once.

- [ ] **Step 3: Test search + sort interaction**

1. Select `People`, type "luke" in search — one row appears.
2. Click the Name column header to sort — the filtered row stays visible.
3. Clear search — all rows return sorted.

- [ ] **Step 4: Test theme in both modes with full interaction**

Switch to Light mode. Work through a few entity selections, sorts, and row detail opens. Verify colours are correct in light mode (indigo accents, white panels, dark text).

- [ ] **Step 5: Commit (if any minor fixes were needed)**

```bash
git add cap/app/viewer/index.html cap/app/viewer/app.js
git commit -m "fix(viewer): edge case fixes from smoke test"
```

If no fixes were needed, skip the commit.

---

## Done

The viewer redesign is complete. Two files changed, no new dependencies, no build step required.

**Summary of what was built:**

| Area | What changed |
|------|-------------|
| Security | primitive-ui removed; SRI hashes on Vue + Axios; CSP meta tag |
| Theme | Galaxy dark default; Clean Light for `prefers-color-scheme: light`; manual toggle persists to localStorage |
| Table | Click-to-sort with numeric-aware comparator; global search/filter; Prev/Next pagination + page size; column visibility gear; copy cell on click; loading skeleton |
| Detail panel | Replaced bare table with themed card grid; per-field copy buttons; composite key support in header; dismiss button |
| Keyboard | ↑↓ row navigation; ESC to dismiss/close |
| UX | Entity list as styled nav (ul/li); pill toggle for DB/Service; toast notifications |
