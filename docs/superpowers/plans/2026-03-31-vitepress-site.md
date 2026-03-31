# VitePress Documentation Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a Star Wars–themed VitePress documentation site to GitHub Pages, sourcing content from `cap/docs/`, `cap/labs/`, and root-level HANA CLI markdown files.

**Architecture:** VitePress project lives at `/site/`. A Node.js copy script (`scripts/copy-content.js`) pulls all markdown content into `/site/` at build time — source files are never committed there. A GitHub Actions workflow runs the copy + build on every push and deploys via OIDC to GitHub Pages.

**Tech Stack:** VitePress ^1.6.0, Vue 3, Node.js 20, GitHub Actions (`upload-pages-artifact@v3` + `deploy-pages@v4`), Shiki (vitesse-dark / vitesse-light), CSS custom properties for dual theming.

---

## File Map

| File | Responsibility |
| --- | --- |
| `site/package.json` | VitePress project config, npm scripts |
| `site/.gitignore` | Exclude copied content dirs and build output |
| `site/scripts/copy-content.js` | Copy all 18 source files to their destinations; strip Widdershins frontmatter from DataService file |
| `site/.vitepress/config.mts` | Base URL, nav, per-section sidebars, Shiki dual themes |
| `site/.vitepress/theme/index.ts` | Extend DefaultTheme; register `StarWarsHome` component via `enhanceApp` |
| `site/.vitepress/theme/style.css` | Override VitePress CSS variables for Imperial Dark (dark) and Jedi Archives (light) |
| `site/.vitepress/theme/components/OpeningCrawl.vue` | Full-screen animated crawl; feature cards with scroll target `#feature-cards` |
| `site/index.md` | Homepage — `layout: StarWarsHome`, no body content needed |
| `.github/workflows/docs.yml` | CI/CD: copy content → build → upload artifact → deploy pages |
| `.gitignore` (repo root) | Exclude `docs/superpowers/` brainstorm files |

---

## Task 1: Project Scaffold

**Files:**

- Create: `site/package.json`
- Create: `site/.gitignore`
- Create: `.gitignore` (repo root)

- [ ] **Step 1: Create `site/package.json`**

```json
{
  "name": "cloud-cap-hana-swapi-docs",
  "private": true,
  "scripts": {
    "dev": "node scripts/copy-content.js && vitepress dev",
    "build": "node scripts/copy-content.js && vitepress build",
    "preview": "vitepress preview"
  },
  "devDependencies": {
    "vitepress": "^1.6.0",
    "vue": "^3.5.0"
  }
}
```

- [ ] **Step 2: Create `site/.gitignore`**

```
guide/
architecture/
labs/
reference/
api/
hana-cli/
.vitepress/dist/
.vitepress/cache/
node_modules/
```

- [ ] **Step 3: Create repo-root `.gitignore`**

Check if `/.gitignore` exists first (`ls /d/projects/cloud-cap-hana-swapi/.gitignore`). If absent, create it; if present, append. Either way ensure it contains:

```
docs/superpowers/
.superpowers/
```

- [ ] **Step 4: Install dependencies**

```bash
cd site && npm install
```

Expected: `node_modules/` created, `package-lock.json` written, no errors.

- [ ] **Step 5: Commit**

```bash
git add site/package.json site/package-lock.json site/.gitignore .gitignore
git commit -m "chore: scaffold VitePress site project"
```

---

## Task 2: Content Copy Script

**Files:**

- Create: `site/scripts/copy-content.js`

The script copies 18 source files to their destinations relative to the `site/` directory. It runs from the `site/` working directory, so all source paths are resolved relative to the repo root (`../`). For `DataService_readme.md` only, it strips the Widdershins frontmatter block and replaces it with a minimal VitePress one.

- [ ] **Step 1: Create `site/scripts/copy-content.js`**

```js
#!/usr/bin/env node
import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '../..') // repo root
const site = resolve(__dirname, '..') // site/

const mappings = [
  // Guide
  { src: 'cap/README.md',                           dest: 'guide/overview.md' },
  { src: 'cap/docs/learning-path.md',               dest: 'guide/learning-path.md' },
  // Architecture
  { src: 'cap/docs/cap-architecture.md',            dest: 'architecture/index.md' },
  { src: 'cap/docs/profile-comparison.md',          dest: 'architecture/profiles.md' },
  // Reference
  { src: 'cap/docs/cap-cheat-sheet.md',             dest: 'reference/cheat-sheet.md' },
  { src: 'cap/docs/pitfalls.md',                    dest: 'reference/pitfalls.md' },
  { src: 'cap/docs/value-help-migration.md',        dest: 'reference/migration.md' },
  // API (special: strip Widdershins frontmatter)
  { src: 'cap/docs/DataService_readme.md',          dest: 'api/index.md', stripFrontmatter: true },
  // HANA CLI
  { src: 'HANA_CLI_QUICKSTART.md',                  dest: 'hana-cli/quickstart.md' },
  { src: 'HANA_CLI_EXAMPLES.md',                    dest: 'hana-cli/examples.md' },
  { src: 'HANA_CLI_WORKFLOWS.md',                   dest: 'hana-cli/workflows.md' },
  { src: 'HANA_CLI_REFERENCE.md',                   dest: 'hana-cli/reference.md' },
  // Labs
  { src: 'cap/labs/README.md',                       dest: 'labs/index.md' },
  { src: 'cap/labs/lab-01-model/README.md',          dest: 'labs/lab-01.md' },
  { src: 'cap/labs/lab-02-service/README.md',        dest: 'labs/lab-02.md' },
  { src: 'cap/labs/lab-03-handler/README.md',        dest: 'labs/lab-03.md' },
  { src: 'cap/labs/lab-04-auth/README.md',           dest: 'labs/lab-04.md' },
  { src: 'cap/labs/lab-05-testing/README.md',        dest: 'labs/lab-05.md' },
]

for (const { src, dest, stripFrontmatter } of mappings) {
  const srcPath = resolve(root, src)
  const destPath = resolve(site, dest)
  mkdirSync(dirname(destPath), { recursive: true })

  if (stripFrontmatter) {
    let content = readFileSync(srcPath, 'utf8')
    // Replace leading ---...--- frontmatter block with minimal VitePress frontmatter
    content = content.replace(/^---[\s\S]*?---\n/, '---\ntitle: API Reference\n---\n')
    writeFileSync(destPath, content, 'utf8')
  } else {
    cpSync(srcPath, destPath)
  }
  console.log(`Copied: ${src} → ${dest}`)
}

console.log(`\nDone. ${mappings.length} files copied.`)
```

- [ ] **Step 2: Run the script to verify it works**

```bash
cd site && node scripts/copy-content.js
```

Expected output: 18 lines of `Copied: … → …` then `Done. 18 files copied.` with no errors.

- [ ] **Step 3: Verify destination files exist**

```bash
ls site/guide/ site/architecture/ site/labs/ site/reference/ site/api/ site/hana-cli/
```

Expected: all directories exist with their markdown files.

- [ ] **Step 4: Verify DataService frontmatter was stripped**

```bash
head -5 site/api/index.md
```

Expected:
```
---
title: API Reference
---
```

- [ ] **Step 5: Commit**

```bash
git add site/scripts/copy-content.js
git commit -m "feat: add content copy script for VitePress build"
```

---

## Task 3: VitePress Config

**Files:**

- Create: `site/.vitepress/config.mts`

- [ ] **Step 1: Create `site/.vitepress/config.mts`**

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'SWAPI Docs',
  description: 'SAP Cloud Application Programming Model — Star Wars API sample',
  base: '/cloud-cap-hana-swapi/',

  markdown: {
    theme: {
      dark: 'vitesse-dark',
      light: 'vitesse-light',
    },
  },

  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: 'SWAPI' },
    siteTitle: 'SWAPI DOCS',

    nav: [
      { text: 'Getting Started', link: '/guide/overview' },
      { text: 'Architecture',    link: '/architecture/' },
      { text: 'Labs',            link: '/labs/' },
      { text: 'Reference',       link: '/reference/cheat-sheet' },
      { text: 'HANA CLI',        link: '/hana-cli/quickstart' },
      { text: 'API',             link: '/api/' },
    ],

    sidebar: {
      '/guide/': [
        { text: 'Getting Started', items: [
          { text: 'Overview',      link: '/guide/overview' },
          { text: 'Learning Path', link: '/guide/learning-path' },
        ]},
      ],
      '/architecture/': [
        { text: 'Architecture', items: [
          { text: 'CAP Architecture',  link: '/architecture/' },
          { text: 'Profile Comparison', link: '/architecture/profiles' },
        ]},
      ],
      '/labs/': [
        { text: 'Hands-On Labs', items: [
          { text: 'Labs Overview',           link: '/labs/' },
          { text: 'Lab 01: Domain Model',    link: '/labs/lab-01' },
          { text: 'Lab 02: Service Projections', link: '/labs/lab-02' },
          { text: 'Lab 03: Handler Logic',   link: '/labs/lab-03' },
          { text: 'Lab 04: Authorization',   link: '/labs/lab-04' },
          { text: 'Lab 05: Testing',         link: '/labs/lab-05' },
        ]},
      ],
      '/reference/': [
        { text: 'Reference', items: [
          { text: 'CDS Cheat Sheet',      link: '/reference/cheat-sheet' },
          { text: 'Common Pitfalls',      link: '/reference/pitfalls' },
          { text: 'Value-Help Migration', link: '/reference/migration' },
        ]},
      ],
      '/hana-cli/': [
        { text: 'HANA CLI', items: [
          { text: 'Quick Start',      link: '/hana-cli/quickstart' },
          { text: 'Examples',         link: '/hana-cli/examples' },
          { text: 'Workflows',        link: '/hana-cli/workflows' },
          { text: 'Command Reference', link: '/hana-cli/reference' },
        ]},
      ],
      '/api/': [
        { text: 'API', items: [
          { text: 'API Reference', link: '/api/' },
        ]},
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SAP-samples/cloud-cap-hana-swapi' },
    ],

    search: { provider: 'local' },
  },
})
```

- [ ] **Step 2: Verify VitePress can read the config**

```bash
cd site && node -e "import('./node_modules/vitepress/dist/node/index.js').then(m => console.log('vitepress ok'))"
```

Expected: `vitepress ok` (just a sanity check that the package is installed).

- [ ] **Step 3: Commit**

```bash
git add site/.vitepress/config.mts
git commit -m "feat: add VitePress config with nav and sidebar"
```

---

## Task 4: Theme CSS

**Files:**

- Create: `site/.vitepress/theme/style.css`

The CSS overrides VitePress's built-in custom properties. Dark mode variables go inside `:root.dark`, light mode inside `:root`. Heading uppercase/monospace style applies dark-mode only.

- [ ] **Step 1: Create `site/.vitepress/theme/style.css`**

```css
/* ============================================================
   JEDI ARCHIVES — Light mode (default)
   ============================================================ */
:root {
  --vp-c-brand-1: #00897b;
  --vp-c-brand-2: #00796b;
  --vp-c-brand-3: #00695c;
  --vp-c-brand-soft: rgba(0, 137, 123, 0.14);

  --vp-c-bg: #f5faf8;
  --vp-c-bg-soft: #f0f8f5;
  --vp-c-bg-mute: #e8f5f1;

  --vp-c-text-1: #1a2e28;
  --vp-c-text-2: #4a7a72;
  --vp-c-text-3: #80aba3;

  --vp-c-divider: #c8e6e0;
  --vp-c-border: #c8e6e0;

  --vp-code-block-bg: #e8f5f1;

  --vp-sidebar-bg-color: #f0f8f5;
  --vp-nav-bg-color: #fff;

  --vp-button-brand-bg: #00897b;
  --vp-button-brand-hover-bg: #00796b;
  --vp-button-brand-text: #fff;
}

/* ============================================================
   IMPERIAL DARK — Dark mode
   ============================================================ */
:root.dark {
  --vp-c-brand-1: #c0392b;
  --vp-c-brand-2: #e74c3c;
  --vp-c-brand-3: #a93226;
  --vp-c-brand-soft: rgba(192, 57, 43, 0.16);

  --vp-c-bg: #0a0a0f;
  --vp-c-bg-soft: #0d0d14;
  --vp-c-bg-mute: #1a1a2e;

  --vp-c-text-1: #e0e0e0;
  --vp-c-text-2: #aaaaaa;
  --vp-c-text-3: #666666;

  --vp-c-divider: #1e1e2e;
  --vp-c-border: #1e1e2e;

  --vp-code-block-bg: #1a1a2e;

  --vp-sidebar-bg-color: #0d0d14;
  --vp-nav-bg-color: #0d0d14;

  --vp-button-brand-bg: #c0392b;
  --vp-button-brand-hover-bg: #e74c3c;
  --vp-button-brand-text: #fff;
}

/* ============================================================
   IMPERIAL DARK — Heading style (monospace uppercase)
   ============================================================ */
:root.dark h1,
:root.dark h2,
:root.dark h3 {
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

/* ============================================================
   Shared — nav logo text
   ============================================================ */
.VPNavBarTitle .title {
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Commit**

```bash
git add site/.vitepress/theme/style.css
git commit -m "feat: add Imperial Dark and Jedi Archives CSS theme"
```

---

## Task 5: Opening Crawl Component

**Files:**

- Create: `site/.vitepress/theme/components/OpeningCrawl.vue`

- [ ] **Step 1: Create `site/.vitepress/theme/components/OpeningCrawl.vue`**

```vue
<template>
  <div class="crawl-wrapper">
    <!-- ── Cinematic crawl ── -->
    <div class="crawl-scene">
      <div class="crawl-logo" :class="{ visible: logoVisible }">STAR WARS</div>
      <div class="crawl-perspective">
        <div class="crawl-content" :class="{ rolling: rolling }">
          <p class="crawl-episode">Episode IV</p>
          <h1 class="crawl-title">A NEW HOPE<br><span>For CAP Developers</span></h1>
          <p>
            It is a period of learning. Rebel developers,
            striking from hidden terminals, have won their
            first victory against the complexity of
            enterprise relationships.
          </p>
          <p>
            During the battle, Rebel spies managed to steal
            secret plans to the Empire's ultimate weapon,
            the SAP HANA database — an armoured data store
            with enough join depth to destroy an entire
            microservice architecture.
          </p>
          <p>
            Pursued by the Empire's sinister agents, the
            Rebels race to master the SAP Cloud Application
            Programming Model and restore freedom to the
            galaxy of enterprise developers...
          </p>
        </div>
      </div>
      <button
        class="crawl-btn"
        :class="{ visible: btnVisible }"
        @click="scrollToCards"
      >
        BEGIN YOUR JOURNEY ↓
      </button>
    </div>

    <!-- ── Feature cards ── -->
    <div id="feature-cards" class="feature-section">
      <h2 class="feature-heading">Choose Your Path</h2>
      <div class="feature-cards">
        <a href="/cloud-cap-hana-swapi/guide/overview" class="feature-card">
          <div class="card-icon">▲</div>
          <h3>Beginner</h3>
          <p>CDS modeling, OData exploration, domain entities. Start your journey here.</p>
          <span class="card-link">Start Learning →</span>
        </a>
        <a href="/cloud-cap-hana-swapi/guide/learning-path" class="feature-card featured">
          <div class="card-icon">◈</div>
          <h3>Intermediate</h3>
          <p>Service handlers, lifecycle hooks, events, and custom actions.</p>
          <span class="card-link">Go Deeper →</span>
        </a>
        <a href="/cloud-cap-hana-swapi/labs/" class="feature-card">
          <div class="card-icon">⬡</div>
          <h3>Advanced</h3>
          <p>Authorization, testing by layer, profile comparison, and hands-on labs.</p>
          <span class="card-link">Take the Labs →</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const logoVisible = ref(false)
const rolling = ref(false)
const btnVisible = ref(false)

onMounted(() => {
  setTimeout(() => { logoVisible.value = true }, 500)
  setTimeout(() => { rolling.value = true }, 2000)
  setTimeout(() => { btnVisible.value = true }, 10000)
})

function scrollToCards() {
  document.getElementById('feature-cards')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
/* ── Layout ── */
.crawl-wrapper {
  background: #000;
  color: #f0c040;
  font-family: 'Georgia', serif;
  overflow-x: hidden;
}

/* ── Crawl scene ── */
.crawl-scene {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #000;
}

/* ── STAR WARS logo ── */
.crawl-logo {
  position: absolute;
  top: 12%;
  font-size: clamp(2rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #f0c040;
  opacity: 0;
  transition: opacity 1.5s ease;
  z-index: 10;
}
.crawl-logo.visible { opacity: 1; }

/* ── 3-D perspective tilt ── */
.crawl-perspective {
  position: absolute;
  bottom: 0;
  width: 60%;
  max-width: 700px;
  height: 70vh;
  perspective: 300px;
  overflow: hidden;
}

.crawl-content {
  position: absolute;
  bottom: -100%;
  width: 100%;
  transform: rotateX(20deg);
  transform-origin: bottom center;
  text-align: center;
  line-height: 1.8;
  padding: 0 1rem;
}

.crawl-content.rolling {
  animation: crawl 30s linear forwards;
}

@keyframes crawl {
  from { bottom: -100%; }
  to   { bottom: 200%;  }
}

.crawl-episode {
  font-size: 1rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #7eb8d4;
  margin-bottom: 0.5rem;
}

.crawl-title {
  font-size: clamp(1.4rem, 3vw, 2rem);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f0c040;
  margin-bottom: 2rem;
}
.crawl-title span { font-size: 0.7em; color: #ccc; }

.crawl-content p {
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  color: #ddd;
  margin-bottom: 1.5rem;
}

/* ── Begin button ── */
.crawl-btn {
  position: absolute;
  bottom: 8%;
  background: transparent;
  border: 2px solid #f0c040;
  color: #f0c040;
  padding: 0.7rem 2rem;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  opacity: 0;
  transition: opacity 1s ease, background 0.2s ease;
  z-index: 20;
}
.crawl-btn.visible { opacity: 1; }
.crawl-btn:hover   { background: rgba(240, 192, 64, 0.15); }

/* ── Feature cards section ── */
.feature-section {
  background: var(--vp-c-bg, #0a0a0f);
  padding: 5rem 2rem;
  text-align: center;
}

.feature-heading {
  font-size: 1.8rem;
  color: var(--vp-c-brand-1, #c0392b);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 3rem;
}

.feature-cards {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.feature-card {
  flex: 1 1 240px;
  max-width: 280px;
  background: var(--vp-c-bg-soft, #0d0d14);
  border: 1px solid var(--vp-c-border, #1e1e2e);
  border-radius: 6px;
  padding: 2rem 1.5rem;
  text-decoration: none;
  color: var(--vp-c-text-1, #e0e0e0);
  transition: border-color 0.2s ease, transform 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.feature-card:hover {
  border-color: var(--vp-c-brand-1, #c0392b);
  transform: translateY(-4px);
}
.feature-card.featured {
  border-color: var(--vp-c-brand-1, #c0392b);
}

.card-icon {
  font-size: 2rem;
  color: var(--vp-c-brand-1, #c0392b);
}

.feature-card h3 {
  font-size: 1.1rem;
  color: var(--vp-c-text-1, #e0e0e0);
  margin: 0;
  text-transform: none;
  letter-spacing: normal;
  font-family: inherit;
}

.feature-card p {
  font-size: 0.88rem;
  color: var(--vp-c-text-2, #aaa);
  line-height: 1.6;
  flex: 1;
}

.card-link {
  font-size: 0.82rem;
  color: var(--vp-c-brand-1, #c0392b);
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add site/.vitepress/theme/components/OpeningCrawl.vue
git commit -m "feat: add animated Star Wars opening crawl homepage component"
```

---

## Task 6: Theme Entry Point & Homepage

**Files:**

- Create: `site/.vitepress/theme/index.ts`
- Create: `site/index.md`

- [ ] **Step 1: Create `site/.vitepress/theme/index.ts`**

```ts
import DefaultTheme from 'vitepress/theme'
import './style.css'
import OpeningCrawl from './components/OpeningCrawl.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: any }) {
    app.component('StarWarsHome', OpeningCrawl)
  },
}
```

- [ ] **Step 2: Create `site/index.md`**

```md
---
layout: StarWarsHome
title: SWAPI Docs
---
```

- [ ] **Step 3: Run the dev server and visually verify the crawl renders**

```bash
cd site && npm run dev
```

Open `http://localhost:5173/cloud-cap-hana-swapi/` in a browser.

Expected:
- Black full-screen page
- "STAR WARS" fades in at top in gold
- Crawl text begins scrolling upward with 3D tilt after ~2s
- "BEGIN YOUR JOURNEY ↓" button appears after ~10s
- Clicking the button scrolls down to the three feature cards

- [ ] **Step 4: Verify theme switching**

Click the dark/light toggle in the VitePress nav.

Expected:
- Dark mode: near-black background, crimson brand colour, monospace uppercase headings on doc pages
- Light mode: white/teal-tinted background, teal brand colour, normal headings on doc pages
- Opening crawl is always black (not affected by theme toggle — it uses `background: #000` scoped CSS)

- [ ] **Step 5: Commit**

```bash
git add site/.vitepress/theme/index.ts site/index.md
git commit -m "feat: register StarWarsHome layout and add homepage"
```

---

## Task 7: Verify Full Build

**Files:** none new — verifying everything assembled so far works end-to-end.

- [ ] **Step 1: Run the full build**

```bash
cd site && npm run build
```

Expected: exits 0. Output ends with something like:
```
build complete in Xs
```

Common failure modes and fixes:
- **`Cannot find module '…'`** — run `npm install` in `site/`
- **`Failed to resolve import`** in `OpeningCrawl.vue`** — check `theme/index.ts` import path
- **Markdown parse error in `api/index.md`** — verify DataService frontmatter was stripped (`head -5 site/api/index.md`)
- **404 on sidebar links** — check that `copy-content.js` ran and all destination files exist

- [ ] **Step 2: Preview the built output**

```bash
cd site && npm run preview
```

Open `http://localhost:4173/cloud-cap-hana-swapi/`. Spot-check:
- Homepage crawl renders
- Navigate to Getting Started → Overview: content from `cap/README.md` visible
- Navigate to HANA CLI → Quick Start: content from `HANA_CLI_QUICKSTART.md` visible
- Navigate to API: content from `DataService_readme.md` visible, no raw YAML frontmatter at top
- Dark/light theme toggle works on a content page

- [ ] **Step 3: Commit**

```bash
git add -p  # stage any minor fixes made during verification
git commit -m "fix: resolve any build issues found during preview"
```

If there were no fixes, skip this commit.

---

## Task 8: GitHub Actions Workflow

**Files:**

- Create: `.github/workflows/docs.yml`

- [ ] **Step 1: Create `.github/workflows/docs.yml`**

```yaml
name: Deploy docs to GitHub Pages

on:
  push:
    branches: [main]
    paths:
      - 'site/**'
      - 'cap/docs/**'
      - 'cap/labs/**/README.md'
      - 'HANA_CLI_*.md'
      - '.github/workflows/docs.yml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: site/package-lock.json

      - name: Install dependencies
        working-directory: site
        run: npm ci

      - name: Copy content
        working-directory: site
        run: node scripts/copy-content.js

      - name: Build
        working-directory: site
        run: npx vitepress build  # content already copied in previous step

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/.vitepress/dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Validate YAML syntax**

```bash
node -e "
const fs = require('fs');
const yaml = require('js-yaml');
try {
  yaml.load(fs.readFileSync('.github/workflows/docs.yml', 'utf8'));
  console.log('YAML valid');
} catch(e) { console.error(e.message); }
" 2>/dev/null || python3 -c "
import yaml, sys
try:
  yaml.safe_load(open('.github/workflows/docs.yml'))
  print('YAML valid')
except Exception as e:
  print(e); sys.exit(1)
"
```

Expected: `YAML valid`

- [ ] **Step 3: Commit and push**

```bash
git add .github/workflows/docs.yml
git commit -m "ci: add GitHub Actions workflow for GitHub Pages deployment"
git push origin main
```

- [ ] **Step 4: Enable GitHub Pages in repository settings**

In the GitHub UI:
1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions** (not "Deploy from a branch")
3. Save

- [ ] **Step 5: Confirm the Actions workflow runs**

Go to **Actions** tab in GitHub. You should see the "Deploy docs to GitHub Pages" workflow triggered by your push. Wait for it to complete (green checkmark).

Expected: workflow completes successfully and the Pages URL (`https://[user].github.io/cloud-cap-hana-swapi/`) is live.

- [ ] **Step 6: Verify live site**

Open `https://[user].github.io/cloud-cap-hana-swapi/` and confirm:
- Opening crawl renders
- Theme toggle works
- Sidebar navigation works for each section
- HANA CLI and API sections load content

---

## Task 9: Update CLAUDE.md

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Add VitePress docs section to `CLAUDE.md`**

Add the following section after the existing content in `/CLAUDE.md`:

```markdown
## Documentation Site

The VitePress documentation site lives in `site/`. Run commands from within `site/`.

\```bash
cd site

npm run dev      # Start local dev server (copies content first)
npm run build    # Production build (copies content first)
npm run preview  # Preview production build
\```

Content is **not** committed to `site/` — it is copied at build time from `cap/docs/`, `cap/labs/`, and root-level `HANA_CLI_*.md` files by `site/scripts/copy-content.js`. To add new content to the site, update `copy-content.js` and the sidebar in `site/.vitepress/config.mts`.

GitHub Pages deploys automatically on push to `main` when any of those source files change.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add VitePress site section to CLAUDE.md"
```
