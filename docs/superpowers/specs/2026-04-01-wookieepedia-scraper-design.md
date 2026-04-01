# Design: Wookieepedia Data Scraper & Extended Star Wars Dataset

**Date:** 2026-04-01  
**Status:** Approved  
**Scope:** Full canon — all theatrical films, live-action shows, animated shows

---

## Problem Statement

The existing Star Wars fixture data in `oldPython/resources/fixtures/` was sourced from SWAPI (swapi.dev) and covers only Episodes I–VI, frozen at 2014. No maintained public API or dataset exists that covers the Disney era (Episodes VII–IX, anthology films, Disney+ shows, animated series) in a SWAPI-compatible schema. This design describes a Wookieepedia-based scraper to produce a complete, up-to-date dataset and the CAP model changes needed to accommodate it.

---

## Decisions

| Question | Decision |
| --- | --- |
| Data source | Wookieepedia MediaWiki API (`starwars.fandom.com/api.php`) |
| Content scope | Full canon: all theatrical films + live-action shows + animated shows |
| TV show modeling | New `Show` entity alongside existing `Film` (no breaking changes to `Film`) |
| Unified browsing | `Media` UNION view + 5 companion relationship UNION views |
| Output format | Clean JSON in `scripts/data/raw/` (full replacement of Django fixture format) |
| Pipeline integration | Rewrite `convertData.js` and `convertDataLite.js` to read new format |
| Data load strategy | Full replacement — old SWAPI fixtures retired; Wookieepedia data covers all episodes I–VI and beyond |

---

## Architecture Overview

```text
Wookieepedia MediaWiki API
        ↓
scripts/scraper/        ← standalone Node.js scraper (rate-limited, cached)
        ↓
scripts/data/raw/       ← clean JSON output (committed to repo)
        ↓
cap/convertData.js      ← rewritten to read new format, handle Show entity
        ↓
CAP database (SQLite / HANA / PostgreSQL)
```

---

## Section 1: CAP Schema Changes

### New `Show` Entity

```cds
entity Show : cuid, managed {
    title         : String @mandatory;
    show_type     : String enum {
        LIVE_ACTION_SERIES  = 'LIVE_ACTION_SERIES';
        ANIMATED_SERIES     = 'ANIMATED_SERIES';
        ANIMATED_FILM       = 'ANIMATED_FILM';
        // Note: anthology theatrical films (Rogue One, Solo) go in Film
        // using episode_id = 0 (OTHER), not here. ANTHOLOGY is reserved
        // for potential future short-form anthology series only.
        ANTHOLOGY           = 'ANTHOLOGY';
    };
    seasons       : Integer;
    episode_count : Integer;
    network       : String;
    director      : String;
    producer      : String;
    release_date  : Date;
    characters    : Composition of many Show2People    on characters.show = $self;
    planets       : Composition of many Show2Planets   on planets.show    = $self;
    starships     : Composition of many Show2Starships on starships.show  = $self;
    vehicles      : Composition of many Show2Vehicles  on vehicles.show   = $self;
    species       : Composition of many Show2Species   on species.show    = $self;
}
```

### Five New Junction Tables

`Show2People`, `Show2Planets`, `Show2Starships`, `Show2Vehicles`, `Show2Species` — each identical in structure to their `Film2*` counterparts (cuid, association to Show, association to the target entity, `@assert.unique` pair constraint).

**Important — field naming constraints:**

- `Show2Vehicles` must use `vehicle : Association to Vehicles` (singular field name, plural entity type) to match `Film2Vehicles` exactly — the `MediaVehicles` UNION requires both branches to project the same column name.
- `Show2Species` must use `specie : Association to Species` (singular, matching `Film2Species`) — the `MediaSpecies` UNION requires both branches to project `specie`. Note that `show-service.cds` should expose the same `specie as species` alias that `film-service.cds` uses for consumer friendliness.

### Back-References on Existing Entities

Each of `People`, `Planet`, `Species`, `Starship`, `Vehicles` gains a new composition:

```cds
// example on People — same pattern for all five entities
shows : Composition of many Show2People on shows.people = $self;
```

### No Breaking Changes to `Film`

`episode_id`, `opening_crawl`, and all existing `Film2*` junction tables are untouched.

---

## Section 2: Unified Media Views

### `Media` — Listing Surface (read-only UNION)

```cds
define view Media as
    select from Film {
        ID,
        title,
        'FILM'        as media_type    : String,
        director,
        producer,
        release_date,
        episode_id,
        opening_crawl,
        null          as show_type     : String,
        null          as seasons       : Integer,
        null          as episode_count : Integer,
        null          as network       : String
    }
    union all select from Show {
        ID,
        title,
        'SHOW'        as media_type    : String,
        director,
        producer,
        release_date,
        null          as episode_id    : Integer,
        null          as opening_crawl : String(2500),
        show_type,
        seasons,
        episode_count,
        network
    };
```

`media_type` is `'FILM'` for all films; `'SHOW'` for all shows. Use `show_type` to distinguish `LIVE_ACTION_SERIES` / `ANIMATED_SERIES` etc. within shows.

### Companion Relationship Views

Five parallel UNION views enable cross-production relationship queries:

```cds
define view MediaCharacters as
    select from Film2People   { film.ID as media_ID, 'FILM' as media_type : String, people }
    union all
    select from Show2People   { show.ID as media_ID, 'SHOW' as media_type : String, people };

define view MediaPlanets as
    select from Film2Planets  { film.ID as media_ID, 'FILM' as media_type : String, planet }
    union all
    select from Show2Planets  { show.ID as media_ID, 'SHOW' as media_type : String, planet };

define view MediaSpecies as
    select from Film2Species  { film.ID as media_ID, 'FILM' as media_type : String, specie }
    union all
    select from Show2Species  { show.ID as media_ID, 'SHOW' as media_type : String, specie };

define view MediaStarships as
    select from Film2Starships  { film.ID as media_ID, 'FILM' as media_type : String, starship }
    union all
    select from Show2Starships  { show.ID as media_ID, 'SHOW' as media_type : String, starship };

define view MediaVehicles as
    select from Film2Vehicles  { film.ID as media_ID, 'FILM' as media_type : String, vehicle }
    union all
    select from Show2Vehicles  { show.ID as media_ID, 'SHOW' as media_type : String, vehicle };
```

`media_type` is always `'FILM'` or `'SHOW'` in all six views — consistent with the `Media` discriminator. Use `show_type` on the `Show` entity itself when finer-grained show classification is needed.

---

## Section 3: Scraper Architecture

### Directory Structure

```text
scripts/
  scraper/
    package.json          ← deps: axios, wtf_wikipedia, p-throttle
    index.js              ← orchestrator
    mediawiki.js          ← rate-limited API client (1 req/s, retry on 429)
    cache.js              ← disk cache (scripts/data/cache/)
    categories.js         ← curated Wookieepedia category → entity type map
    normalize.js          ← shared field normalizers
    extractors/
      films.js
      shows.js
      people.js
      planets.js
      species.js
      starships.js
      vehicles.js
  data/
    cache/                ← gitignored (raw API responses)
    raw/                  ← committed (transformed output)
      films.json
      shows.json
      people.json
      planets.json
      species.json
      starships.json
      vehicles.json
      relationships.json
```

### Crawl Sequence

1. Fetch canon film/show category pages → collect production page titles
2. For each production: fetch wikitext, parse infobox, extract fields + linked entity page titles
3. Deduplicate entity page titles across all productions
4. For each unique entity page: fetch wikitext, parse infobox, extract fields
5. Resolve cross-references → build relationship arrays
6. Write `scripts/data/raw/*.json`

### Wookieepedia Categories

| Category | Yields |
| --- | --- |
| `Canon films` | Film records |
| `Canon television series` | Show records (live-action) |
| `Canon animated television series` | Show records (animated) |
| Characters linked from production pages | People records |
| Planets linked from production pages | Planet records |
| Species linked from production pages | Species records |
| Starships linked from production pages | Starship records |
| Vehicles linked from production pages | Vehicles records |

### Dependencies

| Package | Purpose |
| --- | --- |
| `axios` | HTTP client for MediaWiki API calls |
| `wtf_wikipedia` | Wikitext/infobox parser |
| `p-throttle` | Rate limiting (1 req/s) |
| `uuid` (v5) | Stable ID generation (already used in `convertData.js`) |

---

## Section 4: Data Format

### Per-Entity Files (flat arrays, no Django wrapper)

```json
// films.json
[{ "name": "A New Hope", "episode_id": 4, "opening_crawl": "...",
   "director": "George Lucas", "producer": "Gary Kurtz, Rick McCallum",
   "release_date": "1977-05-25" }]

// shows.json
[{ "name": "The Mandalorian", "show_type": "LIVE_ACTION_SERIES",
   "seasons": 3, "episode_count": 24, "network": "Disney+",
   "director": "Jon Favreau", "producer": "Jon Favreau, Dave Filoni",
   "release_date": "2019-11-01" }]
```

### `relationships.json` (name-keyed foreign references)

```json
{
  "film2people":    [{ "film": "A New Hope", "people": "Luke Skywalker" }],
  "show2people":    [{ "show": "The Mandalorian", "people": "Din Djarin" }],
  "film2planets":   [...],
  "show2planets":   [...],
  "film2starships": [...],
  "show2starships": [...],
  "film2vehicles":  [...],
  "show2vehicles":  [...],
  "film2species":   [...],
  "show2species":   [...],
  "species2people": [...],
  "starship2pilot": [...],
  "vehicle2pilot":  [...],
  "planet2people":  [...]
}
```

Names are resolved to `uuidv5` UUIDs by `convertData.js` during the UPSERT transform.

### `convertData.js` / `convertDataLite.js` Changes

This is a **full rewrite of the data loading layer**, not an incremental update. The Django fixture format (`pk`, `model`, `fields` wrapper) is retired entirely. The new flat JSON format requires:

- `readFixture()` replaced with `readRawJSON()` — reads flat arrays, no `item.fields` unwrapping
- `transformFixtures()` replaced with `transformEntities()` — resolves name-keyed foreign refs to uuidv5 UUIDs directly (no `item.pk` lookups)
- `ROUTES_DIR` updated to `scripts/data/raw/`
- New `loadShows()` function added
- `UPSERT_ORDER` gains: `Show`, `Show2People`, `Show2Planets`, `Show2Starships`, `Show2Vehicles`, `Show2Species`
- `DELETE_ORDER` gains the same 6 entries (in reverse dependency order)
- Relationship resolver extended for all 6 new junction tables

**Load strategy:** Full replacement on every run. The old SWAPI data is retired — Wookieepedia data covers Episodes I–VI and all newer content. Running `npm run load` (or `load_sqlite`) deletes all existing records and re-inserts from `scripts/data/raw/`. The `uuidv5` ID generation ensures the same entity name always produces the same UUID, so re-runs are idempotent.

### New npm Scripts (in `cap/package.json`)

```json
"scrape":       "node ../scripts/scraper/index.js",
"scrape:cache": "CACHE_ONLY=true node ../scripts/scraper/index.js"
```

---

## Section 5: Operational Concerns

### Rate Limiting

- Hard cap: **1 request/second** via `p-throttle`
- Exponential backoff on 429/503: 1s → 2s → 4s → fail after 3 retries
- `User-Agent`: `cloud-cap-hana-swapi-scraper/1.0 (educational project)`

### Disk Cache

- Location: `scripts/data/cache/{pageTitle}.json`
- **Gitignored** — raw API responses are not committed
- TTL: **30 days** (configurable via `CACHE_TTL_DAYS` env var)
- `--force-refresh <pageTitle>` flag bypasses cache for a specific page

### Failure Handling

- Failed infobox parses logged to `scripts/data/cache/failed.json` with raw wikitext
- Scraper continues past individual failures — one bad page doesn't abort the run
- End-of-run summary: `Scraped: N pages, Failed: N, Skipped: N`

### Canonicity Filtering

- Pages tagged `{{Legends}}` are silently skipped
- Pages tagged `{{Canon and Legends}}` are included, flagged with `legends_variant: true`
- Only pages in Canon categories or linked from Canon production pages are scraped

### Incremental Updates

- Re-running `npm run scrape` only fetches pages with cache entries older than `CACHE_TTL_DAYS`
- `scrape:cache` rebuilds `raw/` from existing cache — zero network calls, useful after normalizer changes

### Disambiguation Pages

Wookieepedia disambiguation pages (e.g. "Han Solo" may list multiple media entries) contain no infobox — `wtf_wikipedia` returns an empty template object. Detection: check for `{{Disambig}}` template presence or absence of any recognised infobox key. Disambig pages are skipped and logged to `failed.json` for manual review.

### Infobox Field Aliasing

Wookieepedia infobox field names are not standardised across articles. Each extractor in `extractors/` must implement an alias resolution step in `normalize.js`. Known aliases to handle at minimum:

| Canonical field | Known Wookieepedia aliases |
| --- | --- |
| `director` | `directors`, `directed_by` |
| `producer` | `producers`, `produced_by` |
| `release_date` | `release`, `released`, `airdate`, `first_aired` |
| `episode_count` | `episodes`, `num_episodes` |
| `homeworld` | `home_world`, `homeplanet` |
| `height` | `height_range` |

The extractor tries each alias in order and takes the first non-null value. Unknown fields are logged at `debug` level.

---

## Files Changed / Created

### New files

- `scripts/scraper/package.json`
- `scripts/scraper/index.js`
- `scripts/scraper/mediawiki.js`
- `scripts/scraper/cache.js`
- `scripts/scraper/categories.js`
- `scripts/scraper/normalize.js`
- `scripts/scraper/extractors/films.js`
- `scripts/scraper/extractors/shows.js`
- `scripts/scraper/extractors/people.js`
- `scripts/scraper/extractors/planets.js`
- `scripts/scraper/extractors/species.js`
- `scripts/scraper/extractors/starships.js`
- `scripts/scraper/extractors/vehicles.js`
- `scripts/data/raw/` (output, committed)
- `scripts/data/cache/` (gitignored)
- `cap/srv/show-service.cds` (new — `StarWarsShow` service following the `film-service.cds` pattern exactly):
  - `@odata.draft.enabled: true` on `Show`
  - `@readonly` projections for `People`, `Planet`, `Species`, `Starship`, `Vehicles`
  - Junction table projections with `redirected to` for `Show2People`, `Show2Planets`, `Show2Starships`, `Show2Vehicles`, `Show2Species`
  - `@readonly` projections for `Media`, `MediaCharacters`, `MediaPlanets`, `MediaSpecies`, `MediaStarships`, `MediaVehicles` views (Media views are exposed here, not in a separate service)
- `cap/srv/show-fiori.cds` (new — Fiori/UI annotations for `Show`, following `film-fiori.cds` patterns)

### Modified files

- `cap/db/schema.cds` — add `Show`, 5 junction tables, 5 back-references on existing entities (`People`, `Planet`, `Species`, `Starship`, `Vehicles`), `Media` view + 5 companion views; **note:** the new back-reference compositions will surface as navigation properties in all existing services — each existing `*-service.cds` (`film-service.cds`, `people-service.cds`, etc.) needs a `redirected to` clause for the new `Show2*` back-reference to suppress CDS compiler warnings
- `cap/srv/services-auth.cds` — add `using { StarWarsShow } from './show-service';` import at top; add `annotate StarWarsShow with @(requires: 'any');` following the identical pattern used for the six existing services
- `cap/srv/film-service.cds`, `people-service.cds`, `planet-service.cds`, `species-service.cds`, `starship-service.cds`, `vehicle-service.cds` — these services expose shared entities (`People`, `Planet`, etc.) that will gain new `shows` back-reference compositions. Since none of these services expose `Show`, the new navigations must be suppressed on each projected entity using `@cds.redirection.target: false` — the same pattern already used for the `Vehicle` alias in `film-service.cds`. Without suppression, the CDS compiler will warn about unresolvable redirections.
- `cap/convertData.js` — rewrite `readFixture`/`transformFixtures`, add `Show` entity + 6 junction tables
- `cap/convertDataLite.js` — same changes as `convertData.js`
- `cap/package.json` — add `scrape` and `scrape:cache` scripts
- `.gitignore` — add `scripts/data/cache/`
