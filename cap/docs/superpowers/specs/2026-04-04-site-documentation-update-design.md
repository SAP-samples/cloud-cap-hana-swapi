# Site Documentation Update Design

**Date:** 2026-04-04
**Topic:** Update VitePress site to cover new Fiori apps, Show/Episode domain, and API index
**Approach:** Source-first — all new content authored in `cap/docs/`, synced to site via `copy-content.js`

---

## Problem Statement

The VitePress documentation site (`site/`) is out of sync with the current state of the project. Recent functional expansions are entirely undocumented:

1. Four Fiori web applications (People, Media, Film, Show) with a launchpad
2. Show/Episode domain entities and the five `Episode2*` junction tables
3. The `StarWarsEpisode` read-only service
4. The Media UNION view and aggregation views (`MediaCharacters`, etc.)
5. The `CloneWarsChronologicalOrder` view (133 episodes)
6. `StarWarsFilm_readme.md` generated API doc — exists but not published

The site copy pipeline (`site/scripts/copy-content.js`) correctly syncs existing docs but has no mappings for the new content.

---

## Scope

### New source files to create in `cap/docs/`

| File | Site destination | Description |
| --- | --- | --- |
| `fiori-overview.md` | `app/index.md` | Launchpad structure, 4 tiles, roles, how to launch locally |
| `fiori-people.md` | `app/people.md` | People browser List Report + Object Page, annotations, roles |
| `fiori-media.md` | `app/media.md` | Media UNION view, `media_type` discriminator, `edit_url` deep-link |
| `fiori-film.md` | `app/film.md` | Draft-enabled Film editor, junction tabs, episode_id enum |
| `fiori-show.md` | `app/show.md` | Show + Episode sub-navigation, `Episode2*` tabs, `show_type` enum |
| `shows-episodes.md` | `architecture/shows-episodes.md` | Entity model, Media view, CloneWars view, StarWarsEpisode service |

### Updates to existing source files

| File | Changes |
| --- | --- |
| `cap/docs/cap-architecture.md` | Add Show/Episode to domain model entity list; add Fiori UI layer above request-flow diagram; cross-reference new app pages |
| `cap/README.md` | Add `app/` to project structure table; add Fiori apps entry to Beginner Track |

### Pipeline changes

**`site/scripts/copy-content.js`:**

- Add 6 new source→destination mappings (5 Fiori app docs + `shows-episodes.md`)
- Remap `DataService_readme.md` from `api/index.md` → `api/data-service.md`
- Add `StarWarsFilm_readme.md` → `api/film.md` (with `stripFrontmatter: true`)
- Update the `stripFrontmatter` transform to accept a per-mapping `title` string.
  Mapping shape: `{ src, dest, stripFrontmatter: true, title: 'Film API' }`.
  When `stripFrontmatter` is true and `title` is present, inject that title;
  fall back to `'API Reference'` if `title` is omitted.
  DataService mapping title: `'Data Service API'`. Film mapping title: `'Film API'`.

**`site/.vitepress/config.mts`:**

- Add `{ text: 'Apps', link: '/app/' }` to nav
- Add `/app/` sidebar (Overview + People, Media, Film, Show)
- Add `{ text: 'Shows & Episodes', link: '/architecture/shows-episodes' }` to Architecture sidebar
- Restructure `/api/` sidebar with explicit items:

  ```js
  { text: 'Overview',      link: '/api/' },
  { text: 'Data Service',  link: '/api/data-service' },
  { text: 'Film',          link: '/api/film' },
  ```

**`site/api/index.md`** (static, hand-authored — committed to git, never overwritten by pipeline):

- Brief intro paragraph describing the API surface
- Table: service name, description, link to detail page
- The pipeline no longer maps anything to `api/index.md` (DataService moves to `api/data-service.md`), so the pipeline will never overwrite this file.

**`site/.gitignore`** — two changes. **Do this first, before authoring `site/api/index.md`**, or git will silently refuse to track the file:

1. Add `app/` to the generated-dirs section (this is `site/app/`, distinct from `cap/app/` which is tracked source code)
2. Change the `api/` ignore entry to explicit file patterns so `site/api/index.md` can be committed:

   ```gitignore
   # was: api/
   api/data-service.md
   api/film.md
   ```

   This allows `site/api/index.md` to be tracked by git while keeping the large generated API pages ignored.

**`.github/workflows/docs.yml`:**

- Add `cap/README.md` to the workflow trigger paths. Currently the trigger covers `cap/docs/**` but not `cap/README.md`, which maps to `guide/overview.md` in the pipeline. Changes to `cap/README.md` would otherwise not trigger a docs rebuild.

**Known breaking change:** Moving `DataService_readme.md` from `api/index.md` → `api/data-service.md` changes the URL of the DataService reference from `/api/` to `/api/data-service`. Any external bookmarks or links to `/api/` will land on the new overview page instead. This is intentional — `/api/` becomes the index, not a direct reference page. No redirect mechanism is available in the static VitePress setup.

---

## Content Plan

### `fiori-overview.md`

- How to start: `npm run sqlite` → open `/app/launchpad.html`
- Tile layout (2×2 grid): People, Media, Film, Show
- Which OData service each tile connects to
- Role requirements: Viewer (read), Editor (write)
- Navigation pattern: Launchpad → List Report → Object Page

### `fiori-people.md`

- List Report: columns (name, gender, birth_year, homeworld)
- Object Page sections: biography fields, Homeworld association, tabs for Species / Films / Vehicles / Starships
- Annotation file: `cap/srv/people-fiori.cds`
- Role: Viewer (read-only, no draft)

### `fiori-media.md`

- What the `Media` CDS view is: UNION of `Film` and `Show` with normalized columns
- `media_type` field: `'FILM'` vs `'SHOW'`
- `edit_url` virtual field: computed in `show-service.js`, deep-links to Film or Show Object Page
- Filter bar: title, media_type, director/network
- Annotation file: `cap/srv/media-fiori.cds`

### `fiori-film.md`

- Draft-enabled (requires Editor role for write)
- Object Page header: title, director, producer, release_date, episode_id enum
- Tabs: Characters (`Film2People`), Planets (`Film2Planets`), Starships (`Film2Starships`), Vehicles (`Film2Vehicles`), Species (`Film2Species`)
- Annotation file: `cap/srv/film-fiori.cds`

### `fiori-show.md`

- Object Page header: title, show_type enum, seasons, episode_count, network
- Episodes sub-table (composition): season_number, episode_number, title, air_date, director, runtime, timeline
- Episode Object Page: tabs for Characters (`Episode2People`), Planets, Starships, Vehicles, Species
- Annotation files: `cap/srv/show-fiori.cds`, `cap/srv/episode-fiori.cds`

### `shows-episodes.md`

- Entity relationship: `Show` (1) → `Episode` (many, composition)
- Five `Episode2*` junction tables vs. `Film2*` pattern (same shape, different parent)
- `Show2*` read-only CDS views: aggregate over `Episode2*` (no physical table)
- `Media` UNION view: how Film and Show are normalised to a common projection
- `MediaCharacters`, `MediaPlanets`, etc. aggregation views
- `CloneWarsChronologicalOrder`: what it is, 133 episodes, timeline field
- `StarWarsEpisode` service: read-only projections, no handler, why (no write needed)

### `cap-architecture.md` updates

- Entities list: add Show, Episode, Show2* views, Media, CloneWarsChronologicalOrder
- Add "Fiori UI Layer" box to the request-flow diagram (above the service layer, linking to `/app/`)
- Add sentence pointing to `/app/` and `/architecture/shows-episodes` in relevant sections

### `cap/README.md` updates

- Project structure table: add `app/` row — "Fiori web applications (People, Media, Film, Show)"
- Beginner Track: add task "Explore the Fiori launchpad (`/app/launchpad.html`) and the four apps"

---

## Architecture

No new architectural patterns are introduced. All changes are:

1. Authoring new markdown docs in `cap/docs/` following existing conventions
2. Extending the existing copy pipeline with new mappings
3. Extending the existing VitePress config with new nav/sidebar entries
4. One static file (`site/api/index.md`) authored directly in the site for the API overview

The `stripFrontmatter` transform already handles Widdershins-generated API readmes — extended with a per-mapping `title` field for `StarWarsFilm_readme.md`.

---

## Out of Scope

- Change tracking documentation (`change-tracking.cds`) — deferred, not enough user-facing behaviour to document now
- Entity-specific API readme pages beyond DataService and Film (too large / too generated)
- New labs
- Modifications to any CDS model or service handler files
