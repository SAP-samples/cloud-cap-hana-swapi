# Site Documentation Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add documentation to the VitePress site for four Fiori web apps, the Show/Episode domain, and a restructured API reference section.

**Architecture:** Source-first — all new content lives in `cap/docs/` and is synced to the site by `site/scripts/copy-content.js`. The VitePress config at `site/.vitepress/config.mts` controls nav and sidebar. One static page (`site/api/index.md`) is hand-authored directly in the site and tracked by git.

**Tech Stack:** VitePress, Node.js (ESM), SAP CAP, Mermaid diagrams.

---

## File Map

### Create

| File | Purpose |
| --- | --- |
| `cap/docs/fiori-overview.md` | Launchpad + all 4 apps overview |
| `cap/docs/fiori-people.md` | People browser Fiori app |
| `cap/docs/fiori-media.md` | Media browser Fiori app |
| `cap/docs/fiori-film.md` | Film editor Fiori app |
| `cap/docs/fiori-show.md` | Show/Episode editor Fiori app |
| `cap/docs/shows-episodes.md` | Show/Episode domain, Media view, CloneWars |
| `site/api/index.md` | Static API overview page |

### Modify

| File | What changes |
| --- | --- |
| `site/.gitignore` | Add `app/`; replace `api/` with `api/data-service.md` + `api/film.md` |
| `.github/workflows/docs.yml` | Add `cap/README.md` to trigger paths |
| `site/scripts/copy-content.js` | New mappings, `title` support for `stripFrontmatter`, loop destructuring |
| `site/.vitepress/config.mts` | Add Apps nav+sidebar; Shows & Episodes in Architecture; restructure API |
| `cap/README.md` | Update `app/` description; add Beginner Track task 7 |
| `cap/docs/cap-architecture.md` | Add Film2* junctions, Media view, CloneWars, Fiori app subgraph, StarWarsEpisode |

---

## Task 1: Fix gitignore and remove stale generated api/index.md

**This must run first.** While `api/` is git-ignored as a directory, `site/api/index.md` cannot be committed. Fix the gitignore and remove the stale generated file. Task 13 then authors and commits the new static overview as a separate commit — this is safe because after this commit, git can track anything in `site/api/` except the two explicitly ignored filenames.

**Files:**

- Modify: `site/.gitignore`
- Delete: `site/api/index.md`

---

- [ ] **Step 1: Update `site/.gitignore`**

Replace the current content (the `api/` line on line 5 becomes two explicit file patterns, and `app/` is added):

```
guide/
architecture/
app/
labs/
reference/
api/data-service.md
api/film.md
hana-cli/
.vitepress/dist/
.vitepress/cache/
node_modules/
```

- [ ] **Step 2: Delete the stale generated file**

```bash
rm site/api/index.md
```

- [ ] **Step 3: Verify git will now track site/api/index.md**

```bash
cd site && git check-ignore -v api/index.md
```

Expected: no output (file is no longer ignored).

- [ ] **Step 4: Commit**

```bash
git add site/.gitignore
git commit -m "chore: fix site gitignore for static api/index.md and new app/ dir"
```

---

## Task 2: Add cap/README.md to GitHub Actions trigger

**Files:**

- Modify: `.github/workflows/docs.yml`

---

- [ ] **Step 1: Add the path to the `paths:` trigger block**

In `.github/workflows/docs.yml`, in the `on.push.paths` list, add `- 'cap/README.md'` after `- 'cap/docs/**'`:

```yaml
    paths:
      - 'site/**'
      - 'cap/README.md'
      - 'cap/docs/**'
      - 'cap/labs/**/README.md'
      - 'HANA_CLI_*.md'
      - '.github/workflows/docs.yml'
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/docs.yml
git commit -m "ci: trigger docs deploy on cap/README.md changes"
```

---

## Task 3: Update copy-content.js

Add the new file mappings, remap the DataService API page, add Film API, and update the `stripFrontmatter` transform to accept a per-mapping title.

**Files:**

- Modify: `site/scripts/copy-content.js`

---

- [ ] **Step 1: Replace the `mappings` array and update the loop + transform**

Replace the entire file with:

```js
#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
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
  { src: 'cap/docs/shows-episodes.md',              dest: 'architecture/shows-episodes.md' },
  // Reference
  { src: 'cap/docs/cap-cheat-sheet.md',             dest: 'reference/cheat-sheet.md' },
  { src: 'cap/docs/pitfalls.md',                    dest: 'reference/pitfalls.md' },
  { src: 'cap/docs/value-help-migration.md',        dest: 'reference/migration.md' },
  // API (special: strip Widdershins frontmatter, inject title)
  { src: 'cap/docs/DataService_readme.md', dest: 'api/data-service.md', stripFrontmatter: true, title: 'Data Service API' },
  { src: 'cap/docs/StarWarsFilm_readme.md', dest: 'api/film.md',         stripFrontmatter: true, title: 'Film API' },
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
  // Fiori Apps
  { src: 'cap/docs/fiori-overview.md',               dest: 'app/index.md' },
  { src: 'cap/docs/fiori-people.md',                 dest: 'app/people.md' },
  { src: 'cap/docs/fiori-media.md',                  dest: 'app/media.md' },
  { src: 'cap/docs/fiori-film.md',                   dest: 'app/film.md' },
  { src: 'cap/docs/fiori-show.md',                   dest: 'app/show.md' },
]

// Link rewrites applied after copy: maps relative paths in original source
// to their final VitePress URLs so internal doc-to-doc links work.
const linkRewrites = [
  // labs/index.md: lab-NN-name/README.md → lab-NN.md
  { pattern: /lab-01-model\/README\.md/g,    replacement: 'lab-01.md' },
  { pattern: /lab-02-service\/README\.md/g,  replacement: 'lab-02.md' },
  { pattern: /lab-03-handler\/README\.md/g,  replacement: 'lab-03.md' },
  { pattern: /lab-04-auth\/README\.md/g,     replacement: 'lab-04.md' },
  { pattern: /lab-05-testing\/README\.md/g,  replacement: 'lab-05.md' },
  // guide/learning-path.md: ../labs/lab-NN-name/README.md → /labs/lab-NN
  { pattern: /\.\.\/labs\/lab-01-model\/README\.md/g,   replacement: '/labs/lab-01' },
  { pattern: /\.\.\/labs\/lab-02-service\/README\.md/g, replacement: '/labs/lab-02' },
  { pattern: /\.\.\/labs\/lab-03-handler\/README\.md/g, replacement: '/labs/lab-03' },
  { pattern: /\.\.\/labs\/lab-04-auth\/README\.md/g,    replacement: '/labs/lab-04' },
  { pattern: /\.\.\/labs\/lab-05-testing\/README\.md/g, replacement: '/labs/lab-05' },
  // guide/overview.md: ./docs/cap-architecture → /architecture/
  { pattern: /\.\/docs\/cap-architecture\.md/g,   replacement: '/architecture/' },
  { pattern: /\.\/docs\/cap-architecture/g,        replacement: '/architecture/' },
  { pattern: /\.\/docs\/profile-comparison\.md/g, replacement: '/architecture/profiles' },
  { pattern: /\.\/docs\/profile-comparison/g,      replacement: '/architecture/profiles' },
  { pattern: /\.\/docs\/learning-path\.md/g,       replacement: '/guide/learning-path' },
  { pattern: /\.\/docs\/learning-path/g,            replacement: '/guide/learning-path' },
  { pattern: /\.\/docs\/cap-cheat-sheet\.md/g,     replacement: '/reference/cheat-sheet' },
  { pattern: /\.\/docs\/cap-cheat-sheet/g,          replacement: '/reference/cheat-sheet' },
  { pattern: /\.\/docs\/pitfalls\.md/g,             replacement: '/reference/pitfalls' },
  { pattern: /\.\/docs\/pitfalls/g,                 replacement: '/reference/pitfalls' },
  { pattern: /\.\/docs\/value-help-migration\.md/g, replacement: '/reference/migration' },
  { pattern: /\.\/docs\/value-help-migration/g,     replacement: '/reference/migration' },
  { pattern: /\.\/labs\/README\.md/g,               replacement: '/labs/' },
  { pattern: /\.\/labs\/lab-01-model\/README\.md/g, replacement: '/labs/lab-01' },
  { pattern: /\.\/labs\/lab-02-service\/README\.md/g, replacement: '/labs/lab-02' },
  { pattern: /\.\/labs\/lab-03-handler\/README\.md/g, replacement: '/labs/lab-03' },
  { pattern: /\.\/labs\/lab-04-auth\/README\.md/g,  replacement: '/labs/lab-04' },
  { pattern: /\.\/labs\/lab-05-testing\/README\.md/g, replacement: '/labs/lab-05' },
  // architecture/index.md: profile-comparison relative link
  { pattern: /\.\/profile-comparison\.md/g,   replacement: './profiles.md' },
  { pattern: /\.\/profile-comparison(?!\.)/g,  replacement: './profiles' },
]

function applyLinkRewrites(content) {
  for (const { pattern, replacement } of linkRewrites) {
    content = content.replace(pattern, replacement)
  }
  return content
}

for (const { src, dest, stripFrontmatter, title } of mappings) {
  const srcPath = resolve(root, src)
  const destPath = resolve(site, dest)
  mkdirSync(dirname(destPath), { recursive: true })

  let content = readFileSync(srcPath, 'utf8')

  if (stripFrontmatter) {
    const pageTitle = title ?? 'API Reference'
    // Replace leading ---...--- frontmatter block with minimal VitePress frontmatter
    content = content.replace(/^---[\s\S]*?---\r?\n/, `---\ntitle: ${pageTitle}\n---\n`)
  }

  content = applyLinkRewrites(content)
  writeFileSync(destPath, content, 'utf8')
  console.log(`Copied: ${src} → ${dest}`)
}

console.log(`\nDone. ${mappings.length} files copied.`)
```

- [ ] **Step 2: Commit**

```bash
git add site/scripts/copy-content.js
git commit -m "feat: update copy-content pipeline for Fiori docs, API restructure, title support"
```

---

## Task 4: Update site/.vitepress/config.mts

Add the Apps section to nav and sidebar; add Shows & Episodes to the Architecture sidebar; restructure the API sidebar.

**Files:**

- Modify: `site/.vitepress/config.mts`

---

- [ ] **Step 1: Replace the `nav` array**

Replace the existing `nav:` block:

```js
    nav: [
      { text: 'Getting Started', link: '/guide/overview' },
      { text: 'Architecture',    link: '/architecture/' },
      { text: 'Apps',            link: '/app/' },
      { text: 'Labs',            link: '/labs/' },
      { text: 'Reference',       link: '/reference/cheat-sheet' },
      { text: 'HANA CLI',        link: '/hana-cli/quickstart' },
      { text: 'API',             link: '/api/' },
    ],
```

- [ ] **Step 2: Replace the Architecture and API sidebar entries and add the /app/ sidebar**

Replace the existing `sidebar:` block:

```js
    sidebar: {
      '/guide/': [
        { text: 'Getting Started', items: [
          { text: 'Overview',      link: '/guide/overview' },
          { text: 'Learning Path', link: '/guide/learning-path' },
        ]},
      ],
      '/architecture/': [
        { text: 'Architecture', items: [
          { text: 'CAP Architecture',    link: '/architecture/' },
          { text: 'Profile Comparison',  link: '/architecture/profiles' },
          { text: 'Shows & Episodes',    link: '/architecture/shows-episodes' },
        ]},
      ],
      '/app/': [
        { text: 'Fiori Apps', items: [
          { text: 'Overview',      link: '/app/' },
          { text: 'People',        link: '/app/people' },
          { text: 'Media Browser', link: '/app/media' },
          { text: 'Films',         link: '/app/film' },
          { text: 'Shows',         link: '/app/show' },
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
          { text: 'Overview',      link: '/api/' },
          { text: 'Data Service',  link: '/api/data-service' },
          { text: 'Film',          link: '/api/film' },
        ]},
      ],
    },
```

- [ ] **Step 3: Commit**

```bash
git add site/.vitepress/config.mts
git commit -m "feat: add Apps nav/sidebar, restructure API sidebar, add Shows & Episodes"
```

---

## Task 5: Update cap/README.md

**Files:**

- Modify: `cap/README.md`

---

- [ ] **Step 1: Update the `app/` row in the Project Structure table**

Find:

```
| `app/` | UI frontends and Fiori Launchpad previews |
```

Replace with:

```
| `app/` | Fiori web apps (People, Media, Film, Show) + launchpad (`assets/launchpadPage.html`) |
```

- [ ] **Step 2: Add Fiori task to the Beginner Track table**

In the Beginner Track table, after row 6 (Lab 01), add:

```
| 7 | Open the Fiori launchpad at `http://localhost:4004/launchpadPage.html` and explore all four apps | [app/](app/) |
```

- [ ] **Step 3: Commit**

```bash
git add cap/README.md
git commit -m "docs: add Fiori apps to README project structure and beginner track"
```

---

## Task 6: Update cap/docs/cap-architecture.md

Add the missing entities to the schema tree, add a Fiori Apps subgraph to the Mermaid diagram, mention `StarWarsEpisode`, and link to the new shows-episodes page.

**Files:**

- Modify: `cap/docs/cap-architecture.md`

---

- [ ] **Step 1: Extend the schema tree block**

Find the existing tree (the `db/schema.cds` block) and replace it with:

```
db/schema.cds
  └── star.wars namespace
        ├── Film          (draft-enabled, episode_id enum)
        ├── People        (PersonalData annotations)
        ├── Planet
        ├── Species
        ├── Starship
        ├── Vehicle
        ├── Show          (show_type enum, draft-enabled)
        │   └── Episode   (composition child — cascade delete)
        ├── Show2People   (physical M:N junction — Show ↔ People)
        ├── Film2People, Film2Planets, Film2Starships,
        │   Film2Vehicles, Film2Species  (M:N junction tables)
        ├── Episode2People, Episode2Planets, Episode2Starships,
        │   Episode2Vehicles, Episode2Species  (M:N junction tables)
        ├── Show2Planets, Show2Starships, Show2Vehicles, Show2Species
        │   (CDS define view over Episode2* — not physical tables)
        ├── Media          (define view — UNION of Film + Show)
        ├── MediaCharacters, MediaPlanets, MediaStarships,
        │   MediaVehicles, MediaSpecies  (aggregation views)
        └── CloneWarsChronologicalOrder
            (view — 133 episodes with canonical chronological sequence)
```

- [ ] **Step 2: Add a Fiori Apps subgraph to the Mermaid diagram**

In the `graph TB` Mermaid block, add a new subgraph for the Fiori apps above the Clients subgraph. Find the line `subgraph Clients["Client Layer"]` and insert before it:

```
    subgraph APP["Fiori Apps  (cap/app/)"]
        direction LR
        LAUNCH[Launchpad]
        FPEOPLE[People App]
        FMEDIA[Media Browser]
        FFILM[Film Editor]
        FSHOW[Show/Episode Editor]
    end
```

Then add a connection from the Apps subgraph to the Service layer. After the existing `UI -->|OData v4| SVCDEF` line, add:

```
    APP -->|OData v4| SVCDEF
```

- [ ] **Step 3: Add StarWarsEpisode to the Service Layer section**

After the existing service layer code block (the `srv/people-service.cds` example), add:

```
The **`StarWarsEpisode`** service (`srv/episode-service.cds`) exposes `Episodes` and `Episode2*`
junctions as read-only projections across all three protocols. It has no `.js` handler because
there is no write path — all episode data arrives through the Show draft workflow or via data loading.

See [Shows & Episodes](/architecture/shows-episodes) for a full explanation of the domain model.
```

- [ ] **Step 4: Add a Fiori Apps section reference below the Protocols table**

After the Protocols table, add:

```
The four Fiori web applications (People, Media Browser, Film Editor, Show/Episode Editor) consume
these protocols via OData v4. See [Fiori Apps](/app/) for a walkthrough of each application.
```

- [ ] **Step 5: Commit**

```bash
git add cap/docs/cap-architecture.md
git commit -m "docs: update architecture doc with Film2* junctions, Media view, Fiori apps"
```

---

## Task 7: Create cap/docs/shows-episodes.md

**Files:**

- Create: `cap/docs/shows-episodes.md`

---

- [ ] **Step 1: Write the file**

```markdown
# Shows & Episodes

This page covers the **Show/Episode** domain: how TV shows and their episodes are modelled, how they relate to the core Star Wars entity set, and the read-only views derived from them.

## Entity Relationships

`Show` and `Episode` follow a **composition** pattern. An Episode cannot exist without its parent Show, and deleting a Show cascades to all its Episodes.

```cds
entity Show : cuid, managed {
    title         : String(100) @mandatory;
    show_type     : String enum { LIVE_ACTION_SERIES; ANIMATED_SERIES; ANIMATED_FILM };
    seasons       : Integer;
    episode_count : Integer;
    network       : String(50);
    director      : String(100);
    producer      : String(100);
    release_date  : Date;
    episodes      : Composition of many Episode on episodes.show = $self;
}

entity Episode : cuid, managed {
    show          : Association to Show;
    title         : String(200) @mandatory;
    season_number : Integer;
    episode_number: Integer;
    air_date      : Date;
    director      : String(100);
    writer        : String(200);
    runtime       : Integer;  // minutes
    timeline      : String(50); // e.g. "19 BBY"
}
```

## Episode2* Junction Tables

Each `Episode2*` table links episodes to the core entity set, mirroring the `Film2*` pattern used for Films:

| Table | Links | Physical table? |
| --- | --- | --- |
| `Episode2People` | Episode ↔ People | Yes |
| `Episode2Planets` | Episode ↔ Planet | Yes |
| `Episode2Starships` | Episode ↔ Starship | Yes |
| `Episode2Vehicles` | Episode ↔ Vehicle | Yes |
| `Episode2Species` | Episode ↔ Species | Yes |

The junction tables share the same `@assert.unique` constraint pattern as `Film2People` — duplicate links are rejected by the framework before they reach the database.

## Show2* — Views and the Physical Exception

`Show2Planets`, `Show2Starships`, `Show2Vehicles`, and `Show2Species` are CDS `define view` declarations — not physical tables. Each aggregates over its corresponding `Episode2*` table:

```cds
define view Show2Planets as
    select from Episode2Planets { episode.show as show, planet };
```

This means a Show's planet list is always accurate without a separate load step — it is derived entirely from its episodes. Wookieepedia show pages do not list per-show relationships, but each episode page does, making this the correct model.

**`Show2People` is the exception.** Unlike the four views above, `Show2People` is a **physical junction entity** (`entity Show2People : cuid`). It holds a direct many-to-many relationship between `Show` and `People` — used for top-billed cast and crew who are associated with the show as a whole, independent of individual episodes. This is why the Show Object Page has a `characters` composition tab drawn from `Show2People` directly, rather than from an episode aggregation.

## The Media View

The `Media` view is a `UNION` of `Film` and `Show`, normalised to a common projection. It adds a `media_type` discriminator field so consumers can tell the two apart:

```cds
define view Media as
    select from Film {
        ID, title, director, producer, release_date,
        episode_id, opening_crawl,
        null as seasons       : Integer,
        null as episode_count : Integer,
        null as network       : String(50),
        null as show_type     : String,
        'FILM' as media_type  : String,
        virtual null as edit_url : String
    }
    union all
    select from Show { ... 'SHOW' as media_type, ... };
```

The `edit_url` virtual field is populated by the `StarWarsShow` service handler (`cap/srv/show-service.js`) on every READ. It generates a deep-link URL routing to the correct Fiori app:

- `FILM` → `/film/webapp/index.html#star-wars-film&/Film(ID=...,IsActiveEntity=true)`
- `SHOW` → `/show/webapp/index.html#star-wars-show&/Show(ID=...,IsActiveEntity=true)`

### MediaCharacters and Siblings

Five additional aggregation views (`MediaCharacters`, `MediaPlanets`, `MediaStarships`, `MediaVehicles`, `MediaSpecies`) union the Film2* and Episode2* tables to give a single cross-media view of which entities appear in which content.

## CloneWarsChronologicalOrder

`CloneWarsChronologicalOrder` is a read-only view that provides the canonical **in-universe chronological** episode sequence for *Star Wars: The Clone Wars*. It covers all 133 episodes mapped to their chronological position, using the `timeline` field (e.g., `"22 BBY"`) from `Episode` to establish ordering.

This view exists because the broadcast order of Clone Wars episodes differs significantly from the in-universe order. Fans and educators frequently need the chronological sequence for study guides and watch lists.

## StarWarsEpisode Service

`StarWarsEpisode` (`cap/srv/episode-service.cds`) exposes `Episodes` and all five `Episode2*` junctions as **read-only** projections. It registers no `.js` handler.

This is intentional: all episode write operations occur through the `StarWarsShow` service (episodes are a composition child of Show, so they are managed via the Show draft workflow). A separate write-capable episode service would duplicate that path. For data loading, the `convertData.js` script writes directly to the database.

The service is exposed on all three protocols: OData v4 (`/odata/v4/StarWarsEpisode/`), REST (`/rest/StarWarsEpisode/`), and GraphQL (`/graphql/`).
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/shows-episodes.md
git commit -m "docs: add shows-episodes architecture deep-dive"
```

---

## Task 8: Create cap/docs/fiori-overview.md

**Files:**

- Create: `cap/docs/fiori-overview.md`

---

- [ ] **Step 1: Write the file**

```markdown
# Fiori Apps Overview

This project ships four SAP Fiori Launchpad applications built on top of the CAP OData v4 services. They demonstrate how `*-fiori.cds` annotation files drive the Fiori Elements framework without custom UI code.

## Quick Start

```bash
cd cap
npm run sqlite
```

Open `http://localhost:4004/launchpadPage.html` to see the Fiori Launchpad.

## The Four Apps

| Tile | App | OData service | Role required |
| --- | --- | --- | --- |
| Star Wars People | Character browser (read-only) | `StarWarsPeople` | Viewer |
| Media | Film + Show UNION browser | `StarWarsShow` (`Media` view) | Viewer |
| Films | Film editor (draft-enabled) | `StarWarsFilm` | Viewer (read) / Editor (write) |
| Shows | Show + Episode editor (draft-enabled) | `StarWarsShow` | Viewer (read) / Editor (write) |

## Navigation Pattern

All four apps follow the standard Fiori Elements List Report → Object Page pattern:

```
Launchpad
  └── List Report  (filterable table of entities)
        └── Object Page  (detail view with tabs)
              └── Sub-Object Page  (junction entity detail, where applicable)
```

## Annotation Files

Each app's UI is driven entirely by CDS annotations — no custom JavaScript UI code is required:

| App | Annotation file |
| --- | --- |
| People | `cap/srv/people-fiori.cds` |
| Media | `cap/srv/media-fiori.cds` |
| Films | `cap/srv/film-fiori.cds` |
| Shows / Episodes | `cap/srv/show-fiori.cds`, `cap/srv/episode-fiori.cds` |

## Role Requirements

Authorization is defined in `cap/srv/services-auth.cds`. For the UI apps:

- **`Viewer`** role — read-only access to all four apps
- **`Editor`** role — required to create, update, or delete Film and Show records
- In local development (`npm run sqlite`), no authentication is enforced by default

## File Structure

```
cap/app/
├── launchpadPage.html           ← SAP Fiori Launchpad shell
├── assets/                      ← shared CSS, images, preview XML
├── people/webapp/               ← People browser app
├── media/webapp/                ← Media browser app
├── film/webapp/                 ← Film editor app
└── show/webapp/                 ← Show/Episode editor app
```
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/fiori-overview.md
git commit -m "docs: add Fiori apps overview"
```

---

## Task 9: Create cap/docs/fiori-people.md

**Files:**

- Create: `cap/docs/fiori-people.md`

---

- [ ] **Step 1: Write the file**

```markdown
# People App

The People app is a **read-only** Fiori Elements browser for Star Wars characters. It exposes the `StarWarsPeople` service and requires only the `Viewer` role.

Annotation file: `cap/srv/people-fiori.cds`

## List Report

| Column | Field | Notes |
| --- | --- | --- |
| Name | `name` | Sorted A–Z by default |
| Homeworld | `homeworld.name` | Navigation association |
| Gender | `gender` | Value help available |
| Birth Year | `birth_year` | e.g. `19BBY` |

**Filter bar fields:** name, gender, homeworld, birth_year

## Object Page

**Header:** Character name (title), homeworld name (description), admin fields (created/modified by/at) in the header facet.

**Tabs:**

| Tab | Source | Contents |
| --- | --- | --- |
| Details | `FieldGroup#Details` | height, mass, hair/skin/eye colors, birth_year, gender |
| Films | `films/@UI.LineItem` | Films the character appeared in (via `Film2People`) |
| Episodes | `episodes/@UI.LineItem` | Episodes the character appeared in (via `Episode2People`) |
| Species | `species/@UI.LineItem` | Species associations (via `Species2People`) |
| Starships | `starships/@UI.LineItem` | Starships piloted (via `Starship2Pilot`) |
| Vehicles | `vehicles/@UI.LineItem` | Vehicles piloted (via `Vehicle2Pilot`) |

## No Draft

The People app does not use draft. Records are committed immediately on save. Only `Editor` role users can write via the API — the Fiori app renders as read-only for `Viewer` users.
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/fiori-people.md
git commit -m "docs: add People Fiori app documentation"
```

---

## Task 10: Create cap/docs/fiori-media.md

**Files:**

- Create: `cap/docs/fiori-media.md`

---

- [ ] **Step 1: Write the file**

```markdown
# Media Browser App

The Media app is a **read-only** browser that shows Films and Shows together in a single list using the `Media` CDS view — a SQL UNION of the `Film` and `Show` tables. It surfaces the `StarWarsShow` service.

Annotation file: `cap/srv/media-fiori.cds`

## The Media View

`Media` is a `define view` in `cap/db/schema.cds`. It unions `Film` and `Show` into a single flat projection with a `media_type` discriminator:

| `media_type` value | Source entity |
| --- | --- |
| `'FILM'` | `Film` |
| `'SHOW'` | `Show` |

Fields that do not apply to one type are projected as `null` (e.g., `opening_crawl` is null for Shows, `seasons` is null for Films).

## List Report

| Column | Field | Notes |
| --- | --- | --- |
| Title | `title` | |
| Type | `media_type` | `FILM` or `SHOW` |
| Show Type | `show_type` | `LIVE_ACTION_SERIES` etc. (null for films) |
| Release Date | `release_date` | |
| Director | `director` | |
| Seasons | `seasons` | null for films |
| Episode Count | `episode_count` | null for films |
| Network | `network` | null for films |

**Selection fields (filter bar):** media_type, show_type, network, director, release_date

## Object Page

**Header:** Title (title field), media_type (description).

**Tabs:**

| Tab | Visible when | Contents |
| --- | --- | --- |
| General | Always | `edit_url` link, title, media_type, director, producer, release_date |
| Show Details | `media_type = 'SHOW'` | show_type, seasons, episode_count, network |
| Film Details | `media_type = 'FILM'` | episode_id, opening_crawl |

The conditional tab visibility is driven by `![@UI.Hidden]` with an `$edmJson` expression — no custom controller code is required.

## The edit_url Field

`edit_url` is a **virtual field** on the `Media` view — it is not stored in the database. The `StarWarsShow` service handler (`cap/srv/show-service.js`) populates it on every READ:

```js
this.after('READ', 'Media', results => {
    for (const m of [].concat(results)) {
        m.edit_url = m.media_type === 'FILM'
            ? `/film/webapp/index.html#star-wars-film&/Film(ID=${m.ID},IsActiveEntity=true)`
            : `/show/webapp/index.html#star-wars-show&/Show(ID=${m.ID},IsActiveEntity=true)`
    }
})
```

On the Object Page, the General tab renders `edit_url` as a `DataFieldWithUrl` — a clickable link that deep-navigates to the Film or Show editor app for that specific record.

## No Write Operations

`Media` is a read-only view. There is no create, update, or delete path through this app. To edit a Film or Show, use the deep-link from the General tab's "Open in Edit App" field.
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/fiori-media.md
git commit -m "docs: add Media Browser Fiori app documentation"
```

---

## Task 11: Create cap/docs/fiori-film.md

**Files:**

- Create: `cap/docs/fiori-film.md`

---

- [ ] **Step 1: Write the file**

```markdown
# Film App

The Film app is a **draft-enabled** Fiori Elements editor for Star Wars films. It exposes the `StarWarsFilm` service. Reading requires the `Viewer` role; creating or editing requires the `Editor` role.

Annotation file: `cap/srv/film-fiori.cds`

## List Report

| Column | Field |
| --- | --- |
| Title | `title` |
| Episode | `episode_id` (enum: I–X) |
| Director | `director` |
| Producer | `producer` |
| Release Date | `release_date` (sorted ascending by default) |

**Selection fields (filter bar):** title, episode_id, director, producer, release_date

## Object Page

**Header:** Film title, episode_id (description), admin fields (created/modified by/at) in the header facet.

**Main tab — Details:**

| Field | Notes |
| --- | --- |
| Title | |
| Episode | `episode_id` enum — `I`, `II`, ... `X` |
| Director | |
| Producer | |
| Release Date | |
| Opening Crawl | Multi-line text |

**Junction tabs:**

| Tab | Junction table | What it shows |
| --- | --- | --- |
| Characters | `Film2People` | Characters appearing in this film |
| Planets | `Film2Planets` | Planets featured |
| Species | `Film2Species` | Species featured |
| Starships | `Film2Starships` | Starships featured |
| Vehicles | `Film2Vehicles` | Vehicles featured |

Each junction tab shows a list of the related entity's key fields. Clicking a row navigates to a sub-Object Page showing the junction record detail (the junction entity's own fields, not the target entity's full record).

## Draft Workflow

The Film app uses `@odata.draft.enabled` on the `Film` entity. Edits are staged as drafts before activation:

1. Click **Edit** on an Object Page — CAP creates a draft copy
2. Make changes — saved automatically to the draft
3. Click **Save** — CAP activates the draft, replacing the active record
4. Click **Discard** — draft is deleted, active record is unchanged

Only one draft per record is allowed at a time. The draft is scoped to the user who created it.
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/fiori-film.md
git commit -m "docs: add Film editor Fiori app documentation"
```

---

## Task 12: Create cap/docs/fiori-show.md

**Files:**

- Create: `cap/docs/fiori-show.md`

---

- [ ] **Step 1: Write the file**

```markdown
# Show App

The Show app is a **draft-enabled** Fiori Elements editor for Star Wars TV shows and their episodes. It exposes the `StarWarsShow` service. Reading requires the `Viewer` role; creating or editing requires `Editor`.

Annotation files: `cap/srv/show-fiori.cds`, `cap/srv/episode-fiori.cds`

## Show List Report

| Column | Field |
| --- | --- |
| Title | `title` |
| Type | `show_type` (LIVE_ACTION_SERIES, ANIMATED_SERIES, ANIMATED_FILM) |
| Director | `director` |
| Release Date | `release_date` |
| Seasons | `seasons` |
| Episode Count | `episode_count` |
| Network | `network` |

**Selection fields:** show_type, network, director, release_date

## Show Object Page

**Header:** Show title, show_type (description).

**Show Details tab (`FieldGroup#Main`):**

| Field | Notes |
| --- | --- |
| Title | |
| Show Type | `show_type` enum |
| Seasons | |
| Episode Count | |
| Network | |
| Director | |
| Producer | |
| Release Date | |

**Episodes tab:** Displays the `episodes` composition using `Episode`'s `UI.LineItem`:

| Column | Field |
| --- | --- |
| Season | `season_number` |
| Episode | `episode_number` |
| Title | `title` |
| Air Date | `air_date` |
| Director | `director` |
| Writer | `writer` |
| Runtime | `runtime` (minutes) |
| Timeline | `timeline` (e.g. `22 BBY`) |

Clicking an episode row opens the **Episode Object Page**.

**Characters tab:** Displays `Show2People` — characters who appear in any episode of this show (derived via the `Episode2People` aggregation view, not a physical junction to the show).

## Episode Object Page

The Episode Object Page shows the episode's detail fields (season, episode number, title, air date, director, writer, runtime, timeline) and a single **Episode Details** tab containing the same fields in a form layout.

Annotation: `annotate sws.Episode` in `cap/srv/show-fiori.cds`.

## Episode2* Sub-navigation

The `StarWarsEpisode` service exposes `Episode2People`, `Episode2Planets`, `Episode2Starships`, `Episode2Vehicles`, and `Episode2Species` as read-only projections. These are accessible directly via the OData service but are not surfaced as tabs in the Show app's Episode Object Page — they require direct API access or a future extension of the annotations.

## Draft Workflow

Identical to the Film app. Shows use `@odata.draft.enabled`. Editing a show (including adding/removing episodes) creates a draft. Activating the draft commits the entire show + episodes composition atomically.
```

- [ ] **Step 2: Commit**

```bash
git add cap/docs/fiori-show.md
git commit -m "docs: add Show/Episode editor Fiori app documentation"
```

---

## Task 13: Create site/api/index.md (static)

This is the hand-authored API overview page. It must be committed to git — the gitignore fix in Task 1 makes this possible.

**Files:**

- Create: `site/api/index.md`

---

- [ ] **Step 1: Write the file**

```markdown
---
title: API Reference
---

# API Reference

The Star Wars CAP Showcase exposes its services on three protocols simultaneously:

| Protocol | Base path | Best for |
| --- | --- | --- |
| OData v4 | `/odata/v4/<Service>/` | Fiori UI, SAP integration, standard tooling |
| REST | `/rest/<Service>/` | Simple HTTP clients, scripting |
| GraphQL | `/graphql/` | Flexible ad-hoc queries, developer tooling |

## Services

| Service | Description | Full API reference |
| --- | --- | --- |
| **DataService** | Read-only projection of all Star Wars entities — Films, People, Planets, Species, Starships, Vehicles, Shows, Episodes | [Data Service API](/api/data-service) |
| **StarWarsFilm** | Draft-enabled Film CRUD with junction navigation | [Film API](/api/film) |

The generated reference pages below are produced by [Widdershins](https://github.com/Mermade/widdershins) from the OpenAPI 3.0 specs at `cap/docs/*.openapi3.json`.

> **Tip:** Start the server with `npm run sqlite` and browse to `http://localhost:4004/api-docs` for an interactive Swagger UI that covers all services.
```

- [ ] **Step 2: Verify git will track this file**

```bash
cd site && git status api/index.md
```

Expected: `api/index.md` appears as an untracked file (not ignored).

- [ ] **Step 3: Commit**

```bash
git add site/api/index.md
git commit -m "docs: add static API overview page"
```

---

## Task 14: Final build verification

Run the full pipeline and VitePress build to confirm all pages copy and render correctly.

**Files:** none

---

- [ ] **Step 1: Run the copy pipeline**

```bash
cd site && node scripts/copy-content.js
```

Expected output: `Done. 25 files copied.` with no errors. Verify:

- `site/app/index.md` — exists (fiori-overview)
- `site/app/people.md` — exists
- `site/app/media.md` — exists
- `site/app/film.md` — exists
- `site/app/show.md` — exists
- `site/architecture/shows-episodes.md` — exists
- `site/api/data-service.md` — exists, starts with `---\ntitle: Data Service API\n---`
- `site/api/film.md` — exists, starts with `---\ntitle: Film API\n---`

- [ ] **Step 2: Build the VitePress site**

```bash
cd site && npx vitepress build
```

Expected: build completes with no errors. Warnings about dead links are suppressed by `ignoreDeadLinks: true`.

- [ ] **Step 3: Spot-check nav links**

```bash
cd site && npx vitepress dev &
```

Navigate to these URLs and confirm they render:

- `http://localhost:5173/cloud-cap-hana-swapi/app/` — Fiori Apps overview
- `http://localhost:5173/cloud-cap-hana-swapi/app/people` — People app
- `http://localhost:5173/cloud-cap-hana-swapi/architecture/shows-episodes` — Shows & Episodes
- `http://localhost:5173/cloud-cap-hana-swapi/api/` — API overview (static page)
- `http://localhost:5173/cloud-cap-hana-swapi/api/data-service` — DataService reference
- `http://localhost:5173/cloud-cap-hana-swapi/api/film` — Film API reference

- [ ] **Step 4: Kill dev server and commit any fixes**

```bash
kill %1
```

If any page had errors, fix the source file in `cap/docs/`, re-run the pipeline, and commit.
