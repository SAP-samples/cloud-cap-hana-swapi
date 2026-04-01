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
|---|---|
| Data source | Wookieepedia MediaWiki API (`starwars.fandom.com/api.php`) |
| Content scope | Full canon: all theatrical films + live-action shows + animated shows |
| TV show modeling | New `Show` entity alongside existing `Film` (no breaking changes to `Film`) |
| Unified browsing | `Media` UNION view + 5 companion relationship UNION views |
| Output format | Clean JSON in `scripts/data/raw/` (replaces Django fixture format) |
| Pipeline integration | Update `convertData.js` and `convertDataLite.js` to read new format |

---

## Architecture Overview

```
Wookieepedia MediaWiki API
        ↓
scripts/scraper/        ← standalone Node.js scraper (rate-limited, cached)
        ↓
scripts/data/raw/       ← clean JSON output (committed to repo)
        ↓
cap/convertData.js      ← updated to read new format, handle Show entity
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
        show_type     as media_type,
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

### Companion Relationship Views

Five parallel UNION views enable cross-production relationship queries:

```cds
define view MediaCharacters as
    select from Film2People  { film.ID as media_ID, 'FILM' as media_type : String, people }
    union all
    select from Show2People  { show.ID as media_ID, show_type as media_type, people };

define view MediaPlanets as
    select from Film2Planets  { film.ID as media_ID, 'FILM' as media_type : String, planet }
    union all
    select from Show2Planets  { show.ID as media_ID, show_type as media_type, planet };

define view MediaSpecies as
    select from Film2Species  { film.ID as media_ID, 'FILM' as media_type : String, specie }
    union all
    select from Show2Species  { show.ID as media_ID, show_type as media_type, specie };

define view MediaStarships as
    select from Film2Starships  { film.ID as media_ID, 'FILM' as media_type : String, starship }
    union all
    select from Show2Starships  { show.ID as media_ID, show_type as media_type, starship };

define view MediaVehicles as
    select from Film2Vehicles  { film.ID as media_ID, 'FILM' as media_type : String, vehicle }
    union all
    select from Show2Vehicles  { show.ID as media_ID, show_type as media_type, vehicle };
```

Usage: `GET /MediaCharacters?$filter=media_ID eq '<uuid>'` returns all characters for any film or show.

---

## Section 3: Scraper Architecture

### Directory Structure

```
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
|---|---|
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
|---|---|
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

- `ROUTES_DIR` updated to `scripts/data/raw/`
- New `loadShows()` function
- `UPSERT_ORDER` gains: `Show`, `Show2People`, `Show2Planets`, `Show2Starships`, `Show2Vehicles`, `Show2Species`
- `DELETE_ORDER` gains the same 6 entries (in reverse dependency order)
- Relationship resolver extended for all 6 new junction tables

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

### Modified files
- `cap/db/schema.cds` — add `Show`, 5 junction tables, 5 back-references, `Media` view + 5 companion views
- `cap/convertData.js` — new source dir, Show entity, 6 new junction tables
- `cap/convertDataLite.js` — same changes as convertData.js
- `cap/package.json` — add `scrape` and `scrape:cache` scripts
- `.gitignore` — add `scripts/data/cache/`
