# VitePress Documentation Site — Design Spec

**Date:** 2026-03-31
**Status:** Approved
**Repo:** cloud-cap-hana-swapi

---

## Overview

Build a VitePress documentation site for the cloud-cap-hana-swapi repository, deployed to GitHub Pages via a dedicated GitHub Actions workflow. The site surfaces content from `cap/docs/`, `cap/labs/`, and the cap README file. The theme is Star Wars–inspired with a dual personality: Imperial Dark (dark mode) and Jedi Archives (light mode).

---

## Site Location & Content Pipeline

The VitePress project lives at `/site/` in the repo root. Content markdown files are **not** committed to `/site/` — they are copied at build time from their canonical locations in `cap/docs/` and `cap/labs/`. This keeps the original documentation as the single source of truth.

A Node.js script at `site/scripts/copy-content.js` handles all copying before VitePress runs. Destination directories (`site/guide/`, `site/architecture/`, `site/labs/`, `site/reference/`, `site/api/`) are git-ignored.

### Content Mapping

| Source | Destination | Nav Title | Notes |
| --- | --- | --- | --- |
| `cap/README.md` only | `site/guide/overview.md` | Overview | Root README is repo boilerplate; use only `cap/README.md` |
| `cap/docs/learning-path.md` | `site/guide/learning-path.md` | Learning Path | |
| `cap/docs/cap-architecture.md` | `site/architecture/index.md` | CAP Architecture | |
| `cap/docs/profile-comparison.md` | `site/architecture/profiles.md` | Profile Comparison | |
| `cap/docs/cap-cheat-sheet.md` | `site/reference/cheat-sheet.md` | CDS Cheat Sheet | |
| `cap/docs/pitfalls.md` | `site/reference/pitfalls.md` | Common Pitfalls | |
| `cap/docs/value-help-migration.md` | `site/reference/migration.md` | Value-Help Migration | |
| `cap/docs/DataService_readme.md` | `site/api/index.md` | API Reference | Strip Widdershins frontmatter (see note) |
| `cap/labs/README.md` | `site/labs/index.md` | Labs Overview | |
| `cap/labs/lab-01-model/README.md` | `site/labs/lab-01.md` | Lab 01: Domain Model | |
| `cap/labs/lab-02-service/README.md` | `site/labs/lab-02.md` | Lab 02: Service Projections | |
| `cap/labs/lab-03-handler/README.md` | `site/labs/lab-03.md` | Lab 03: Handler Logic | |
| `cap/labs/lab-04-auth/README.md` | `site/labs/lab-04.md` | Lab 04: Authorization | |
| `cap/labs/lab-05-testing/README.md` | `site/labs/lab-05.md` | Lab 05: Testing | |

**DataService frontmatter note:** `DataService_readme.md` begins with a Widdershins/Slate-specific YAML frontmatter block (`language_tabs`, `highlight_theme`, `headingLevel`, etc.) that conflicts with VitePress. `copy-content.js` must detect and replace the leading `---…---` frontmatter block in this file only, replacing it with:

```yaml
---
title: API Reference
---
```

---

## Repository Structure

```text
/site/
├── .vitepress/
│   ├── config.mts                  # Nav, sidebar, theme config
│   └── theme/
│       ├── index.ts                # Extends default theme; registers StarWarsHome layout
│       ├── style.css               # Imperial Dark + Jedi Archives CSS variables
│       └── components/
│           └── OpeningCrawl.vue    # Animated Star Wars crawl homepage component
├── public/                         # Static assets (favicon, og-image)
├── scripts/
│   └── copy-content.js             # Build-time content copy script
├── index.md                        # Homepage (layout: StarWarsHome)
├── guide/                          # git-ignored, populated at build time
├── architecture/                   # git-ignored, populated at build time
├── labs/                           # git-ignored, populated at build time
├── reference/                      # git-ignored, populated at build time
├── api/                            # git-ignored, populated at build time
├── .gitignore                      # Ignores copied dirs and dist/
└── package.json
```

---

## Navigation Structure

**Top navbar:**

```text
[⬡ SWAPI DOCS]   Getting Started   Architecture   Labs   Reference   API
```

**Sidebar — Getting Started:**

- Overview
- Learning Path

**Sidebar — Architecture:**

- CAP Architecture
- Profile Comparison

**Sidebar — Labs:**

- Labs Overview
- Lab 01: Domain Model
- Lab 02: Service Projections
- Lab 03: Handler Logic
- Lab 04: Authorization
- Lab 05: Testing

**Sidebar — Reference:**

- CDS Cheat Sheet
- Common Pitfalls
- Value-Help Migration

**Sidebar — API:**

- API Reference (DataService)

---

## Theme Design

### Dual Theme

The site uses VitePress's built-in dark/light mode toggle. Each mode has a distinct Star Wars identity implemented via CSS custom properties.

### Imperial Dark (dark mode)

| Token | Value |
| --- | --- |
| Background | `#0a0a0f` |
| Sidebar background | `#0d0d14` |
| Brand / accent | `#c0392b` (Imperial crimson) |
| Brand hover | `#e74c3c` |
| Text primary | `#e0e0e0` |
| Text muted | `#888888` |
| Code block background | `#1a1a2e` |
| Border | `#1e1e2e` |
| Heading style | Uppercase, monospace, letter-spacing |

### Jedi Archives (light mode)

| Token | Value |
| --- | --- |
| Background | `#f5faf8` |
| Sidebar background | `#f0f8f5` |
| Brand / accent | `#00897b` (Jedi teal) |
| Brand hover | `#00796b` |
| Text primary | `#1a2e28` |
| Text muted | `#4a7a72` |
| Code block background | `#e8f5f1` |
| Border | `#c8e6e0` |
| Heading style | Normal weight, sans-serif |

### Code Highlighting

- Dark mode: Shiki `vitesse-dark` theme
- Light mode: Shiki `vitesse-light` theme

---

## Homepage — Opening Crawl

### Frontmatter

`site/index.md` uses a fully custom layout:

```yaml
---
layout: StarWarsHome
title: SWAPI Docs
---
```

### Theme Registration

In `site/.vitepress/theme/index.ts`, the `StarWarsHome` layout is registered so VitePress resolves `layout: StarWarsHome` by looking up a globally registered Vue component by that name:

```ts
import DefaultTheme from 'vitepress/theme'
import OpeningCrawl from './components/OpeningCrawl.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('StarWarsHome', OpeningCrawl)
  },
}
```

### OpeningCrawl.vue Behaviour

1. Full-screen black backdrop (`#000`) on mount — bypasses all theme chrome
2. "STAR WARS" wordmark fades in at top (gold `#f0c040`, uppercase, letter-spacing)
3. Episode subtitle: *"Episode IV — A New Hope for CAP Developers"*
4. Crawl text scrolls upward with CSS `perspective` 3D tilt (classic crawl effect)
5. After ~8 seconds, a "BEGIN YOUR JOURNEY ↓" button fades in (gold border, black bg)
6. Button calls `document.getElementById('feature-cards').scrollIntoView({ behavior: 'smooth' })`
7. Below the crawl, a feature cards section carries `id="feature-cards"` with three learning track tiles (Beginner / Intermediate / Advanced) linking into the sidebar

The crawl always renders on a space-black backdrop regardless of light/dark mode setting.

---

## GitHub Actions Deployment

**Workflow file:** `.github/workflows/docs.yml`

**Triggers:** Push to `main` matching any of:

- `site/**`
- `cap/docs/**`
- `cap/labs/**/README.md`
- `.github/workflows/docs.yml`

**Job-level configuration:**

```yaml
permissions:
  pages: write
  id-token: write

environment:
  name: github-pages
  url: ${{ steps.deployment.outputs.page_url }}
```

`environment: github-pages` is a job-level key (not a step property) required for the OIDC token to be scoped to the Pages deployment environment. The `actions/deploy-pages` step must carry `id: deployment` so `page_url` is accessible as an output.

**Job steps:**

1. `actions/checkout`
2. `actions/setup-node@v4` — Node 20, npm cache pointed at `site/`
3. `npm ci` in `site/`
4. `node scripts/copy-content.js` in `site/`
5. `npm run build` in `site/` (`vitepress build`)
6. `actions/upload-pages-artifact@v3` — uploads `site/.vitepress/dist/`
7. `actions/deploy-pages@v4` with `id: deployment`

**VitePress base URL:** `/cloud-cap-hana-swapi/` — required so asset paths resolve correctly under `https://[user].github.io/cloud-cap-hana-swapi/`.

**GitHub Pages config:** Repository Settings → Pages → Source: "GitHub Actions" (not branch deploy).

---

## Dependencies

```json
{
  "devDependencies": {
    "vitepress": "^1.6.0",
    "vue": "^3.5.0"
  }
}
```

No runtime dependencies. The copy script uses only Node.js built-ins (`fs`, `path`).

---

## Files Created / Modified

| File | Action |
| --- | --- |
| `site/package.json` | Create |
| `site/.gitignore` | Create — ignores `guide/`, `architecture/`, `labs/`, `reference/`, `api/`, `.vitepress/dist/`, `.vitepress/cache/` |
| `site/.vitepress/config.mts` | Create |
| `site/.vitepress/theme/index.ts` | Create |
| `site/.vitepress/theme/style.css` | Create |
| `site/.vitepress/theme/components/OpeningCrawl.vue` | Create |
| `site/index.md` | Create |
| `site/scripts/copy-content.js` | Create |
| `.github/workflows/docs.yml` | Create |
| `.gitignore` (root) | Create if absent — add `docs/superpowers/` to avoid committing brainstorm session files |
