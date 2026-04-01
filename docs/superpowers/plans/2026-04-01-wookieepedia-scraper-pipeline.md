# Wookieepedia Scraper & Data Pipeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a rate-limited Wookieepedia scraper that produces clean JSON data covering all canon Star Wars films, TV shows, and animated series — plus all linked characters, planets, species, starships, and vehicles — then rewrite `convertData.js` to load this new format into the CAP database.

**Architecture:** Standalone Node.js scraper in `scripts/scraper/` (own `package.json`) fetches wikitext from the Wookieepedia MediaWiki API, parses infoboxes with `wtf_wikipedia`, and writes flat JSON to `scripts/data/raw/`. `cap/convertData.js` is rewritten to read this flat JSON (name-keyed foreign refs → `uuidv5` UUIDs) instead of the old Django fixture format. The old `oldPython/resources/fixtures/` files remain untouched but are no longer the load source.

**Tech Stack:** Node.js (CJS), `axios` HTTP client, `wtf_wikipedia` infobox parser, `p-throttle@4` rate limiter, `uuid` v5, `node:test` test runner (no new test framework)

**Prerequisite:** Plan 1 (Show Schema & Service Layer) must be complete — `Show` entity must exist in the schema before `convertData.js` can load show data. The `shows` back-reference suppression in all six existing services is also done in Plan 1 (Task 3), not here.

---

## File Map

| Action | File | Responsibility |
| --- | --- | --- |
| Create | `scripts/scraper/package.json` | Scraper project manifest and deps |
| Create | `scripts/scraper/normalize.js` | Pure field normalizers + infobox alias resolution |
| Create | `scripts/scraper/cache.js` | Disk cache: read/write/TTL for API responses |
| Create | `scripts/scraper/mediawiki.js` | Rate-limited MediaWiki API client (1 req/s, retry) |
| Create | `scripts/scraper/categories.js` | Curated Wookieepedia category → entity type map |
| Create | `scripts/scraper/extractors/films.js` | Film infobox → film record |
| Create | `scripts/scraper/extractors/shows.js` | TV series infobox → show record |
| Create | `scripts/scraper/extractors/people.js` | Character infobox → person record |
| Create | `scripts/scraper/extractors/planets.js` | Planet infobox → planet record |
| Create | `scripts/scraper/extractors/species.js` | Species infobox → species record |
| Create | `scripts/scraper/extractors/starships.js` | Starship infobox → starship record |
| Create | `scripts/scraper/extractors/vehicles.js` | Vehicle infobox → vehicle record |
| Create | `scripts/scraper/index.js` | Orchestrator: crawl → extract → write raw JSON |
| Create | `scripts/scraper/test/normalize.test.js` | Unit tests for normalize.js |
| Create | `scripts/scraper/test/extractors.test.js` | Unit tests for all extractors (fixture wikitext) |
| Rewrite | `cap/convertData.js` | New `readRawJSON`/`transformEntities` replacing Django fixture loading |
| Rewrite | `cap/convertDataLite.js` | Same changes as `convertData.js` — the SQLite load path (`npm run load_sqlite`) uses this file |
| Modify | `cap/test/convertData.test.js` | Update to match new internal API |
| Modify | `cap/package.json` | Add `scrape` and `scrape:cache` scripts |
| Modify | `.gitignore` | Add `scripts/data/cache/` |
| Create | `scripts/data/raw/.gitkeep` | Ensures raw/ dir is committed even before first scrape |

---

## Task 1: Set Up Scraper Project

**Files:**
- Create: `scripts/scraper/package.json`
- Modify: `.gitignore`
- Create: `scripts/data/raw/.gitkeep`
- Create: `scripts/data/cache/.gitkeep` (then gitignore it)

- [ ] **Step 1: Create the directory structure**

```bash
mkdir -p d:/projects/cloud-cap-hana-swapi/scripts/scraper/extractors
mkdir -p d:/projects/cloud-cap-hana-swapi/scripts/scraper/test
mkdir -p d:/projects/cloud-cap-hana-swapi/scripts/data/raw
mkdir -p d:/projects/cloud-cap-hana-swapi/scripts/data/cache
```

- [ ] **Step 2: Create `scripts/scraper/package.json`**

```json
{
  "name": "star-wars-scraper",
  "version": "1.0.0",
  "description": "Wookieepedia scraper for cloud-cap-hana-swapi",
  "private": true,
  "type": "commonjs",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "node --test test/*.test.js"
  },
  "dependencies": {
    "axios": "^1.7.0",
    "p-throttle": "^4.1.1",
    "uuid": "^10.0.0",
    "wtf_wikipedia": "^10.3.3"
  }
}
```

Note: `p-throttle@4.x` is the last CommonJS-compatible version. v5+ is ESM-only.

- [ ] **Step 3: Install dependencies**

```bash
cd d:/projects/cloud-cap-hana-swapi/scripts/scraper && npm install
```

- [ ] **Step 4: Update `.gitignore` at repo root**

Add these lines:

```
# Wookieepedia scraper cache (raw API responses)
scripts/data/cache/
scripts/scraper/node_modules/
```

- [ ] **Step 5: Create placeholder files so raw/ is committed**

```bash
touch d:/projects/cloud-cap-hana-swapi/scripts/data/raw/.gitkeep
```

- [ ] **Step 6: Commit the scaffold**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/package.json scripts/scraper/package-lock.json \
        scripts/data/raw/.gitkeep .gitignore
git commit -m "chore: scaffold scripts/scraper project and data directories"
```

---

## Task 2: Implement `normalize.js` (Pure Functions, TDD First)

`normalize.js` is all pure functions — the ideal TDD starting point. These are the same normalisation rules as `cap/convertData.js` plus Wookieepedia-specific alias resolution.

**Files:**
- Create: `scripts/scraper/normalize.js`
- Create: `scripts/scraper/test/normalize.test.js`

- [ ] **Step 1: Write failing tests**

Create `scripts/scraper/test/normalize.test.js`:

```javascript
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

// Will fail until normalize.js exists
const {
    normalizeString,
    normalizeDate,
    normalizeInteger,
    resolveField,
} = require('../normalize')

describe('normalizeString', () => {
    it('returns null for null', () => assert.equal(normalizeString(null), null))
    it('returns null for undefined', () => assert.equal(normalizeString(undefined), null))
    it('returns null for empty string', () => assert.equal(normalizeString(''), null))
    it('returns null for "unknown"', () => assert.equal(normalizeString('unknown'), null))
    it('returns null for "Unknown"', () => assert.equal(normalizeString('Unknown'), null))
    it('returns null for "n/a"', () => assert.equal(normalizeString('n/a'), null))
    it('returns null for "N/A"', () => assert.equal(normalizeString('N/A'), null))
    it('returns null for "none"', () => assert.equal(normalizeString('none'), null))
    it('returns null for "null"', () => assert.equal(normalizeString('null'), null))
    it('trims whitespace', () => assert.equal(normalizeString('  foo  '), 'foo'))
    it('returns valid string unchanged', () => assert.equal(normalizeString('George Lucas'), 'George Lucas'))
})

describe('normalizeDate', () => {
    it('returns null for null', () => assert.equal(normalizeDate(null), null))
    it('returns null for "unknown"', () => assert.equal(normalizeDate('unknown'), null))
    it('parses ISO date', () => assert.equal(normalizeDate('1977-05-25'), '1977-05-25'))
    it('parses full datetime', () => assert.equal(normalizeDate('1977-05-25T00:00:00Z'), '1977-05-25'))
    it('parses Wookieepedia date string', () => assert.equal(normalizeDate('May 25, 1977'), '1977-05-25'))
    it('returns null for unparseable string', () => assert.equal(normalizeDate('not-a-date'), null))
})

describe('normalizeInteger', () => {
    it('returns null for null', () => assert.equal(normalizeInteger(null), null))
    it('returns null for "unknown"', () => assert.equal(normalizeInteger('unknown'), null))
    it('parses integer string', () => assert.equal(normalizeInteger('3'), 3))
    it('parses actual integer', () => assert.equal(normalizeInteger(3), 3))
    it('returns null for non-numeric', () => assert.equal(normalizeInteger('three'), null))
})

describe('resolveField', () => {
    const infobox = {
        director: 'George Lucas',
        producers: 'Rick McCallum',
        airdate: '1977-05-25'
    }

    const ALIASES = {
        director: ['director', 'directors', 'directed_by'],
        producer: ['producer', 'producers', 'produced_by'],
        release_date: ['release_date', 'release', 'released', 'airdate', 'first_aired'],
    }

    it('finds field by primary name', () => {
        assert.equal(resolveField(infobox, 'director', ALIASES.director), 'George Lucas')
    })
    it('finds field by alias', () => {
        assert.equal(resolveField(infobox, 'producer', ALIASES.producer), 'Rick McCallum')
    })
    it('finds field by second alias', () => {
        assert.equal(resolveField(infobox, 'release_date', ALIASES.release_date), '1977-05-25')
    })
    it('returns null when no alias matches', () => {
        assert.equal(resolveField(infobox, 'network', ['network', 'broadcaster']), null)
    })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
cd scripts/scraper && npm test 2>&1 | head -20
```

Expected: `Cannot find module '../normalize'`

- [ ] **Step 3: Implement `scripts/scraper/normalize.js`**

```javascript
'use strict'

const NULL_VALUES = new Set(['unknown', 'n/a', 'none', 'null', 'n/a.'])

function normalizeString(value) {
    if (value === undefined || value === null) return null
    const s = String(value).trim()
    if (!s) return null
    if (NULL_VALUES.has(s.toLowerCase())) return null
    return s
}

function normalizeDate(value) {
    const s = normalizeString(value)
    if (!s) return null
    const d = new Date(s)
    if (Number.isNaN(d.getTime())) return null
    return d.toISOString().slice(0, 10)
}

function normalizeInteger(value) {
    if (value === undefined || value === null) return null
    const s = normalizeString(String(value))
    if (!s) return null
    const n = parseInt(s, 10)
    return Number.isNaN(n) ? null : n
}

/**
 * Try each alias in order and return the first non-null normalized string.
 * @param {object} infobox  - flat object of infobox key/value pairs
 * @param {string} _field   - canonical field name (unused, for documentation)
 * @param {string[]} aliases - list of Wookieepedia field names to try in order
 */
function resolveField(infobox, _field, aliases) {
    for (const alias of aliases) {
        const val = normalizeString(infobox[alias])
        if (val !== null) return val
    }
    return null
}

// Canonical alias maps for Wookieepedia infobox fields
const FIELD_ALIASES = {
    director:      ['director', 'directors', 'directed_by'],
    producer:      ['producer', 'producers', 'produced_by', 'executive_producer'],
    release_date:  ['release_date', 'release', 'released', 'airdate', 'first_aired', 'premiere'],
    episode_count: ['episode_count', 'episodes', 'num_episodes'],
    network:       ['network', 'broadcaster', 'channel', 'streaming'],
    seasons:       ['seasons', 'series', 'num_seasons'],
    homeworld:     ['homeworld', 'home_world', 'homeplanet', 'home_planet'],
    height:        ['height', 'height_range'],
    species:       ['species', 'race'],
}

module.exports = {
    normalizeString,
    normalizeDate,
    normalizeInteger,
    resolveField,
    FIELD_ALIASES,
}
```

- [ ] **Step 4: Run tests**

```bash
cd scripts/scraper && npm test
```

Expected: All normalize tests PASS.

- [ ] **Step 5: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/normalize.js scripts/scraper/test/normalize.test.js
git commit -m "feat: add scraper normalize.js with pure field normalization and alias resolution"
```

---

## Task 3: Implement `cache.js`

Disk cache for raw API responses. Each page is stored as `scripts/data/cache/<urlEncoded-title>.json` with a timestamp. Cache is checked before every API call.

**Files:**
- Create: `scripts/scraper/cache.js`

- [ ] **Step 1: Implement `scripts/scraper/cache.js`**

No TDD here — disk I/O wrappers are better verified by inspection and integration. Keep it simple:

```javascript
'use strict'

const fs = require('fs/promises')
const path = require('path')

const CACHE_DIR = path.join(__dirname, '../../data/cache')
const TTL_DAYS = parseInt(process.env.CACHE_TTL_DAYS ?? '30', 10)
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000

function cacheKey(pageTitle) {
    return path.join(CACHE_DIR, encodeURIComponent(pageTitle) + '.json')
}

async function read(pageTitle) {
    const file = cacheKey(pageTitle)
    try {
        const raw = await fs.readFile(file, 'utf8')
        const entry = JSON.parse(raw)
        if (Date.now() - entry.cachedAt > TTL_MS) return null
        return entry.data
    } catch {
        return null
    }
}

async function write(pageTitle, data) {
    await fs.mkdir(CACHE_DIR, { recursive: true })
    const file = cacheKey(pageTitle)
    await fs.writeFile(file, JSON.stringify({ cachedAt: Date.now(), data }, null, 2))
}

module.exports = { read, write }
```

- [ ] **Step 2: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/cache.js
git commit -m "feat: add scraper disk cache with TTL support"
```

---

## Task 4: Implement `mediawiki.js` (Rate-Limited API Client)

Wraps the Wookieepedia MediaWiki API. One public function: `fetchWikitext(pageTitle)` — returns raw wikitext string, using cache.

**Files:**
- Create: `scripts/scraper/mediawiki.js`

- [ ] **Step 1: Implement `scripts/scraper/mediawiki.js`**

```javascript
'use strict'

const axios = require('axios')
const pThrottle = require('p-throttle')
const cache = require('./cache')

const API_URL = 'https://starwars.fandom.com/api.php'
const USER_AGENT = 'cloud-cap-hana-swapi-scraper/1.0 (educational project; github.com/thjung/cloud-cap-hana-swapi)'

// 1 request per second — respects Wookieepedia rate limits
const throttle = pThrottle({ limit: 1, interval: 1000 })

const rawFetch = throttle(async (pageTitle) => {
    const params = {
        action: 'query',
        prop: 'revisions',
        titles: pageTitle,
        rvprop: 'content',
        rvslots: 'main',
        format: 'json',
        formatversion: '2',
    }

    const response = await axios.get(API_URL, {
        params,
        headers: { 'User-Agent': USER_AGENT },
        timeout: 15000,
    })

    const pages = response.data?.query?.pages ?? []
    if (!pages.length) return null
    return pages[0]?.revisions?.[0]?.slots?.main?.content ?? null
})

async function fetchWikitext(pageTitle) {
    // Check cache first
    const cached = await cache.read(pageTitle)
    if (cached !== null) return cached

    // Fetch with retry
    let lastError
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const wikitext = await rawFetch(pageTitle)
            await cache.write(pageTitle, wikitext)
            return wikitext
        } catch (err) {
            lastError = err
            const status = err?.response?.status
            if (status === 429 || status === 503) {
                await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
            } else {
                throw err
            }
        }
    }
    throw lastError
}

/**
 * Fetch all page titles in a Wookieepedia category (handles API continuation).
 * Uses the same throttle wrapper as wikitext fetches — 1 req/s.
 */
const rawCategoryFetch = throttle(async (category, cmcontinue) => {
    const params = {
        action: 'query',
        list: 'categorymembers',
        cmtitle: `Category:${category}`,
        cmlimit: '500',
        cmtype: 'page',
        format: 'json',
        ...(cmcontinue ? { cmcontinue } : {}),
    }

    const response = await axios.get(API_URL, {
        params,
        headers: { 'User-Agent': USER_AGENT },
        timeout: 15000,
    })
    return response.data
})

async function fetchCategoryMembers(category) {
    const titles = []
    let cmcontinue

    do {
        const data = await rawCategoryFetch(category, cmcontinue)
        const members = data?.query?.categorymembers ?? []
        titles.push(...members.map(m => m.title))
        cmcontinue = data?.continue?.cmcontinue ?? null
    } while (cmcontinue)

    return titles
}

module.exports = { fetchWikitext, fetchCategoryMembers }
```

- [ ] **Step 2: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/mediawiki.js
git commit -m "feat: add rate-limited Wookieepedia MediaWiki API client with disk cache"
```

---

## Task 5: Implement `categories.js` and Extractor Base Pattern

`categories.js` holds the curated list of Wookieepedia category names to seed the crawl. The extractor base pattern (`extractors/_base.js`) provides the shared `extractFromWikitext(wikitext)` helper using `wtf_wikipedia`.

**Files:**
- Create: `scripts/scraper/categories.js`
- Create: `scripts/scraper/extractors/_base.js`

- [ ] **Step 1: Create `scripts/scraper/categories.js`**

```javascript
'use strict'

// Wookieepedia category names → entity type they yield
// These seed the production page crawl. Character/planet/etc. pages are
// then collected from each production's infobox, not from categories.
const PRODUCTION_CATEGORIES = [
    { category: 'Canon films',                        type: 'film' },
    { category: 'Canon television series',            type: 'show' },
    { category: 'Canon animated television series',   type: 'show' },
    { category: 'Canon short films',                  type: 'show' },
]

module.exports = { PRODUCTION_CATEGORIES }
```

- [ ] **Step 2: Create `scripts/scraper/extractors/_base.js`**

```javascript
'use strict'

const wtf = require('wtf_wikipedia')

const DISAMBIG_MARKERS = ['{{disambig}}', '{{disambiguation}}', '{{dis}}']
const LEGENDS_MARKERS  = ['{{legends}}']

/**
 * Parse wikitext and return the first infobox as a flat key/value object.
 * Returns null if the page is a disambiguation page or has no infobox.
 */
function parseInfobox(wikitext) {
    if (!wikitext) return null

    const lower = wikitext.toLowerCase()

    // Skip disambiguation pages
    if (DISAMBIG_MARKERS.some(m => lower.includes(m))) return null

    // Skip pure Legends pages (Canon+Legends pages are included by the caller)
    const isLegends = LEGENDS_MARKERS.some(m => lower.includes(m))
    const isBothCanons = lower.includes('{{canon and legends}}')
    if (isLegends && !isBothCanons) return null

    const doc = wtf(wikitext)
    const templates = doc.templates()
    if (!templates.length) return null

    // Flatten the first template into a key/value object
    const tpl = templates[0]
    const data = tpl.json ? tpl.json() : {}

    return {
        ...data,
        _legendsVariant: isBothCanons,
    }
}

module.exports = { parseInfobox }
```

- [ ] **Step 3: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/categories.js scripts/scraper/extractors/_base.js
git commit -m "feat: add scraper categories config and infobox parser base"
```

---

## Task 6: Implement Film and Show Extractors (TDD)

**Files:**
- Create: `scripts/scraper/extractors/films.js`
- Create: `scripts/scraper/extractors/shows.js`
- Create: `scripts/scraper/test/extractors.test.js`

- [ ] **Step 1: Write failing tests for film extractor**

Create `scripts/scraper/test/extractors.test.js`:

```javascript
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { extractFilm } = require('../extractors/films')
const { extractShow } = require('../extractors/shows')

// Minimal fixture wikitext for a film
const FILM_WIKITEXT = `
{{Film
|name = A New Hope
|director = George Lucas
|producer = Gary Kurtz, Rick McCallum
|release = May 25, 1977
|episode = IV
|opening crawl = It is a period of civil war.
|characters = [[Luke Skywalker]], [[Princess Leia Organa|Princess Leia]], [[Han Solo]]
|planets = [[Tatooine]], [[Alderaan]], [[Yavin 4]]
|starships = [[Millennium Falcon]], [[Star Destroyer]]
|vehicles = [[AT-AT walker|AT-AT]]
|species = [[Human]], [[Wookiee]]
}}
`

// Minimal fixture wikitext for a show
const SHOW_WIKITEXT = `
{{Television series
|name = The Mandalorian
|network = Disney+
|premiere = November 1, 2019
|seasons = 3
|episodes = 24
|director = Jon Favreau, Dave Filoni
|producer = Jon Favreau
|characters = [[Din Djarin]], [[Grogu]]
|planets = [[Nevarro]]
}}
`

describe('extractFilm', () => {
    it('extracts title', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.title, 'A New Hope')
    })

    it('extracts director', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.director, 'George Lucas')
    })

    it('extracts release_date as YYYY-MM-DD', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.release_date, '1977-05-25')
    })

    it('extracts character list', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.ok(Array.isArray(film._characters), 'characters should be array')
        assert.ok(film._characters.includes('Luke Skywalker'))
    })

    it('extracts planet list', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.ok(film._planets.includes('Tatooine'))
    })

    it('returns null for disambig page', () => {
        const result = extractFilm('Test', '{{Disambig}}\nSome content')
        assert.equal(result, null)
    })
})

describe('extractShow', () => {
    it('extracts title', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.title, 'The Mandalorian')
    })

    it('extracts network', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.network, 'Disney+')
    })

    it('extracts seasons as integer', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.seasons, 3)
    })

    it('extracts episode_count as integer', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.episode_count, 24)
    })

    it('extracts character list', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.ok(show._characters.includes('Din Djarin'))
    })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
cd scripts/scraper && npm test 2>&1 | grep -E "FAIL|Cannot find"
```

Expected: `Cannot find module '../extractors/films'`

- [ ] **Step 3: Implement `scripts/scraper/extractors/films.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, resolveField, FIELD_ALIASES } = require('../normalize')

/**
 * Extract a film record from Wookieepedia wikitext.
 * Returns null if the page is a disambiguation page or has no infobox.
 * Private relationship arrays (_characters, _planets, etc.) are name lists
 * resolved to IDs by the orchestrator.
 */
function extractFilm(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    // Helper to split comma/pipe-delimited wiki link lists into page title arrays
    function extractLinks(raw) {
        if (!raw) return []
        return String(raw)
            .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')  // [[Page|Label]] → Page
            .split(/[,|]/)
            .map(s => s.trim())
            .filter(Boolean)
    }

    return {
        title:         pageTitle,
        director:      resolveField(infobox, 'director', FIELD_ALIASES.director),
        producer:      resolveField(infobox, 'producer', FIELD_ALIASES.producer),
        release_date:  normalizeDate(resolveField(infobox, 'release_date', FIELD_ALIASES.release_date)),
        opening_crawl: normalizeString(infobox['opening crawl'] ?? infobox.opening_crawl ?? null),
        episode_id:    null, // populated by orchestrator from episode roman numeral
        _legendsVariant: infobox._legendsVariant ?? false,
        // Relationship link lists — resolved to entity records by orchestrator
        _characters:   extractLinks(infobox.characters ?? infobox.cast),
        _planets:      extractLinks(infobox.planets ?? infobox.locations),
        _starships:    extractLinks(infobox.starships ?? infobox.vehicles_starships),
        _vehicles:     extractLinks(infobox.vehicles),
        _species:      extractLinks(infobox.species),
    }
}

module.exports = { extractFilm }
```

- [ ] **Step 4: Implement `scripts/scraper/extractors/shows.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, normalizeInteger, resolveField, FIELD_ALIASES } = require('../normalize')

const SHOW_TYPE_MAP = {
    'Disney+':          'LIVE_ACTION_SERIES',
    'disney+':          'LIVE_ACTION_SERIES',
    'Cartoon Network':  'ANIMATED_SERIES',
    'Disney XD':        'ANIMATED_SERIES',
    'Disney Channel':   'ANIMATED_SERIES',
    'Netflix':          'LIVE_ACTION_SERIES',
    'Adult Swim':       'ANIMATED_SERIES',
    'Disney+ / Disney Channel': 'ANIMATED_SERIES',
}

function inferShowType(network, title) {
    const mapped = SHOW_TYPE_MAP[network]
    if (mapped) return mapped
    // Fallback: animated in title heuristic
    if (/animated|clone wars|rebels|resistance/i.test(title)) return 'ANIMATED_SERIES'
    return 'LIVE_ACTION_SERIES'
}

function extractLinks(raw) {
    if (!raw) return []
    return String(raw)
        .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
        .split(/[,|]/)
        .map(s => s.trim())
        .filter(Boolean)
}

function extractShow(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    const network = resolveField(infobox, 'network', FIELD_ALIASES.network)

    return {
        title:          pageTitle,
        show_type:      inferShowType(network, pageTitle),
        seasons:        normalizeInteger(resolveField(infobox, 'seasons', FIELD_ALIASES.seasons)),
        episode_count:  normalizeInteger(resolveField(infobox, 'episode_count', FIELD_ALIASES.episode_count)),
        network:        network,
        director:       resolveField(infobox, 'director', FIELD_ALIASES.director),
        producer:       resolveField(infobox, 'producer', FIELD_ALIASES.producer),
        release_date:   normalizeDate(resolveField(infobox, 'release_date', FIELD_ALIASES.release_date)),
        _legendsVariant: infobox._legendsVariant ?? false,
        _characters:    extractLinks(infobox.characters ?? infobox.cast),
        _planets:       extractLinks(infobox.planets ?? infobox.locations),
        _starships:     extractLinks(infobox.starships),
        _vehicles:      extractLinks(infobox.vehicles),
        _species:       extractLinks(infobox.species),
    }
}

module.exports = { extractShow }
```

- [ ] **Step 5: Run tests**

```bash
cd scripts/scraper && npm test 2>&1 | grep -E "FAIL|PASS|extractFilm|extractShow"
```

Expected: All `extractFilm` and `extractShow` tests PASS. (Some may need minor adjustment based on how `wtf_wikipedia` parses the fixture wikitext — adjust the fixture if needed, not the extractor logic.)

- [ ] **Step 6: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/extractors/films.js scripts/scraper/extractors/shows.js \
        scripts/scraper/test/extractors.test.js
git commit -m "feat: implement film and show infobox extractors with tests"
```

---

## Task 7: Implement Remaining Entity Extractors

**Files:**
- Create: `scripts/scraper/extractors/people.js`
- Create: `scripts/scraper/extractors/planets.js`
- Create: `scripts/scraper/extractors/species.js`
- Create: `scripts/scraper/extractors/starships.js`
- Create: `scripts/scraper/extractors/vehicles.js`

All follow the same pattern as `films.js`. Add fixture wikitext and tests to `extractors.test.js` for each.

- [ ] **Step 1: Add fixtures and tests to `extractors.test.js`** for people, planets, species, starships, vehicles (follow the same pattern as the film tests above — write them BEFORE implementing the extractor)

- [ ] **Step 2: Implement `scripts/scraper/extractors/people.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, resolveField, FIELD_ALIASES } = require('../normalize')

function extractPerson(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:        pageTitle,
        height:      normalizeString(infobox.height ?? infobox.height_range),
        mass:        normalizeString(infobox.mass ?? infobox.weight),
        hair_color:  normalizeString(infobox.hair ?? infobox.hair_color),
        skin_color:  normalizeString(infobox.skin ?? infobox.skin_color),
        eye_color:   normalizeString(infobox.eyes ?? infobox.eye_color),
        birth_year:  normalizeString(infobox.born ?? infobox.birth_year),
        gender:      normalizeString(infobox.gender ?? infobox.sex),
        _homeworld:  normalizeString(resolveField(infobox, 'homeworld', FIELD_ALIASES.homeworld)),
        _species:    normalizeString(resolveField(infobox, 'species', FIELD_ALIASES.species)),
        _legendsVariant: infobox._legendsVariant ?? false,
    }
}

module.exports = { extractPerson }
```

- [ ] **Step 3: Implement `scripts/scraper/extractors/planets.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString } = require('../normalize')

function extractPlanet(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:            pageTitle,
        diameter:        normalizeString(infobox.diameter),
        rotation_period: normalizeString(infobox.rotation ?? infobox.rotation_period),
        orbital_period:  normalizeString(infobox.orbital ?? infobox.orbital_period),
        gravity:         normalizeString(infobox.gravity),
        population:      normalizeString(infobox.population),
        climate:         normalizeString(infobox.climate),
        terrain:         normalizeString(infobox.terrain),
        surface_water:   normalizeString(infobox.water ?? infobox.surface_water),
        _legendsVariant: infobox._legendsVariant ?? false,
    }
}

module.exports = { extractPlanet }
```

- [ ] **Step 4: Implement `scripts/scraper/extractors/species.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, resolveField, FIELD_ALIASES } = require('../normalize')

function extractSpecies(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:             pageTitle,
        classification:   normalizeString(infobox.classification ?? infobox.type),
        designation:      normalizeString(infobox.designation ?? infobox.sentience),
        average_height:   normalizeString(infobox.average_height ?? infobox.height),
        average_lifespan: normalizeString(infobox.average_lifespan ?? infobox.lifespan),
        hair_colors:      normalizeString(infobox.hair_color ?? infobox.hair),
        skin_colors:      normalizeString(infobox.skin_color ?? infobox.skin),
        eye_colors:       normalizeString(infobox.eye_color ?? infobox.eyes),
        language:         normalizeString(infobox.language ?? infobox.languages),
        _homeworld:       normalizeString(resolveField(infobox, 'homeworld', FIELD_ALIASES.homeworld)),
        _legendsVariant:  infobox._legendsVariant ?? false,
    }
}

module.exports = { extractSpecies }
```

- [ ] **Step 5: Implement `scripts/scraper/extractors/starships.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString } = require('../normalize')

function extractLinks(raw) {
    if (!raw) return []
    return String(raw)
        .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
        .split(/[,|]/)
        .map(s => s.trim())
        .filter(Boolean)
}

function extractStarship(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:                   pageTitle,
        model:                  normalizeString(infobox.model ?? infobox.type),
        starship_class:         normalizeString(infobox.class ?? infobox.starship_class),
        manufacturer:           normalizeString(infobox.manufacturer ?? infobox.make),
        cost_in_credits:        normalizeString(infobox.cost ?? infobox.cost_in_credits),
        length:                 normalizeString(infobox.length),
        crew:                   normalizeString(infobox.crew),
        passengers:             normalizeString(infobox.passengers),
        max_atmosphering_speed: normalizeString(infobox.speed ?? infobox.max_speed),
        hyperdrive_rating:      normalizeString(infobox.hyperdrive ?? infobox.hyperdrive_rating),
        MGLT:                   normalizeString(infobox.mglt ?? infobox.MGLT),
        cargo_capacity:         normalizeString(infobox.cargo ?? infobox.cargo_capacity),
        consumables:            normalizeString(infobox.consumables),
        _pilots:                extractLinks(infobox.pilots ?? infobox.crew_members),
        _legendsVariant:        infobox._legendsVariant ?? false,
    }
}

module.exports = { extractStarship }
```

- [ ] **Step 6: Implement `scripts/scraper/extractors/vehicles.js`**

```javascript
'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString } = require('../normalize')

function extractLinks(raw) {
    if (!raw) return []
    return String(raw)
        .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
        .split(/[,|]/)
        .map(s => s.trim())
        .filter(Boolean)
}

function extractVehicle(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:                   pageTitle,
        model:                  normalizeString(infobox.model ?? infobox.type),
        vehicle_class:          normalizeString(infobox.class ?? infobox.vehicle_class),
        manufacturer:           normalizeString(infobox.manufacturer ?? infobox.make),
        cost_in_credits:        normalizeString(infobox.cost ?? infobox.cost_in_credits),
        length:                 normalizeString(infobox.length),
        crew:                   normalizeString(infobox.crew),
        passengers:             normalizeString(infobox.passengers),
        max_atmosphering_speed: normalizeString(infobox.speed ?? infobox.max_speed),
        cargo_capacity:         normalizeString(infobox.cargo ?? infobox.cargo_capacity),
        consumables:            normalizeString(infobox.consumables),
        _pilots:                extractLinks(infobox.pilots ?? infobox.crew_members),
        _legendsVariant:        infobox._legendsVariant ?? false,
    }
}

module.exports = { extractVehicle }
```

- [ ] **Step 7: Run all extractor tests**

```bash
cd scripts/scraper && npm test
```

Expected: All tests PASS.

- [ ] **Step 8: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/extractors/ scripts/scraper/test/extractors.test.js
git commit -m "feat: implement all entity extractors (people, planets, species, starships, vehicles)"
```

---

## Task 8: Implement `index.js` Orchestrator

The orchestrator ties everything together: fetches production pages, extracts entities, deduplicates, writes `scripts/data/raw/*.json`.

**Files:**
- Create: `scripts/scraper/index.js`

- [ ] **Step 1: Implement `scripts/scraper/index.js`**

```javascript
'use strict'

const fs = require('fs/promises')
const path = require('path')

const { fetchWikitext, fetchCategoryMembers } = require('./mediawiki')
const { PRODUCTION_CATEGORIES } = require('./categories')
const { extractFilm } = require('./extractors/films')
const { extractShow } = require('./extractors/shows')
const { extractPerson } = require('./extractors/people')
const { extractPlanet } = require('./extractors/planets')
const { extractSpecies } = require('./extractors/species')
const { extractStarship } = require('./extractors/starships')
const { extractVehicle } = require('./extractors/vehicles')

const RAW_DIR = path.join(__dirname, '../data/raw')
const FAILED_LOG = path.join(__dirname, '../data/cache/failed.json')

async function run() {
    const CACHE_ONLY = process.env.CACHE_ONLY === 'true'

    const stats = { scraped: 0, failed: 0, skipped: 0 }
    const failed = []

    // Collections
    const films = new Map()      // title → film record
    const shows = new Map()      // title → show record
    const people = new Map()     // name  → person record
    const planets = new Map()
    const speciesMap = new Map()
    const starships = new Map()
    const vehicles = new Map()

    // Relationship sets (using 'title::name' keys for deduplication)
    const rels = {
        film2people:    new Set(), film2planets:   new Set(),
        film2starships: new Set(), film2vehicles:  new Set(), film2species: new Set(),
        show2people:    new Set(), show2planets:   new Set(),
        show2starships: new Set(), show2vehicles:  new Set(), show2species: new Set(),
        species2people: new Set(), starship2pilot: new Set(),
        vehicle2pilot:  new Set(), planet2people:  new Set(),
    }

    // ── Step 1: Fetch production page titles from categories ──────────────────
    console.log('Fetching production categories...')
    const productionQueue = [] // { title, type }

    for (const { category, type } of PRODUCTION_CATEGORIES) {
        if (CACHE_ONLY) {
            console.log(`  [cache-only] Skipping category fetch: ${category}`)
            continue
        }
        console.log(`  Fetching category: ${category}`)
        const titles = await fetchCategoryMembers(category)
        titles.forEach(t => productionQueue.push({ title: t, type }))
    }

    // ── Step 2: Process each production page ─────────────────────────────────
    console.log(`Processing ${productionQueue.length} production pages...`)

    for (const { title, type } of productionQueue) {
        try {
            const wikitext = await fetchWikitext(title)
            if (!wikitext) { stats.skipped++; continue }

            if (type === 'film') {
                const record = extractFilm(title, wikitext)
                if (!record) { stats.skipped++; continue }
                films.set(title, record)

                record._characters.forEach(n => { people.set(n, null); rels.film2people.add(`${title}::${n}`) })
                record._planets.forEach(n => { planets.set(n, null); rels.film2planets.add(`${title}::${n}`) })
                record._starships.forEach(n => { starships.set(n, null); rels.film2starships.add(`${title}::${n}`) })
                record._vehicles.forEach(n => { vehicles.set(n, null); rels.film2vehicles.add(`${title}::${n}`) })
                record._species.forEach(n => { speciesMap.set(n, null); rels.film2species.add(`${title}::${n}`) })
            } else {
                const record = extractShow(title, wikitext)
                if (!record) { stats.skipped++; continue }
                shows.set(title, record)

                record._characters.forEach(n => { people.set(n, null); rels.show2people.add(`${title}::${n}`) })
                record._planets.forEach(n => { planets.set(n, null); rels.show2planets.add(`${title}::${n}`) })
                record._starships.forEach(n => { starships.set(n, null); rels.show2starships.add(`${title}::${n}`) })
                record._vehicles.forEach(n => { vehicles.set(n, null); rels.show2vehicles.add(`${title}::${n}`) })
                record._species.forEach(n => { speciesMap.set(n, null); rels.show2species.add(`${title}::${n}`) })
            }
            stats.scraped++
        } catch (err) {
            stats.failed++
            failed.push({ title, error: String(err) })
            console.warn(`  [FAIL] ${title}: ${err.message}`)
        }
    }

    // ── Step 3: Process each unique entity page ───────────────────────────────
    console.log(`Scraping ${people.size} people, ${planets.size} planets, ${speciesMap.size} species, ${starships.size} starships, ${vehicles.size} vehicles...`)

    async function scrapeEntities(map, extractor, label) {
        for (const [name] of map) {
            if (map.get(name) !== null) continue  // already scraped
            try {
                const wikitext = await fetchWikitext(name)
                if (!wikitext) { stats.skipped++; continue }
                const record = extractor(name, wikitext)
                if (record) {
                    map.set(name, record)
                    stats.scraped++
                } else {
                    stats.skipped++
                }
            } catch (err) {
                stats.failed++
                failed.push({ title: name, error: String(err) })
                console.warn(`  [FAIL] ${label} ${name}: ${err.message}`)
            }
        }
    }

    await scrapeEntities(people, extractPerson, 'People')
    await scrapeEntities(planets, extractPlanet, 'Planet')
    await scrapeEntities(speciesMap, extractSpecies, 'Species')
    await scrapeEntities(starships, extractStarship, 'Starship')
    await scrapeEntities(vehicles, extractVehicle, 'Vehicle')

    // ── Step 4: Build planet2people and species2people from entity back-refs ──
    for (const [name, person] of people) {
        if (!person) continue
        if (person._homeworld) rels.planet2people.add(`${person._homeworld}::${name}`)
        if (person._species)   rels.species2people.add(`${person._species}::${name}`)
    }
    // pilot links come from starship/vehicle extractors
    for (const [name, ship] of starships) {
        if (!ship) continue
        ship._pilots.forEach(p => rels.starship2pilot.add(`${name}::${p}`))
    }
    for (const [name, veh] of vehicles) {
        if (!veh) continue
        veh._pilots.forEach(p => rels.vehicle2pilot.add(`${name}::${p}`))
    }

    // ── Step 5: Build relationships.json ─────────────────────────────────────
    function setToArray(set, leftKey, rightKey) {
        return [...set].map(entry => {
            const [left, right] = entry.split('::')
            return { [leftKey]: left, [rightKey]: right }
        })
    }

    const relationships = {
        film2people:    setToArray(rels.film2people,    'film',    'people'),
        film2planets:   setToArray(rels.film2planets,   'film',    'planet'),
        film2starships: setToArray(rels.film2starships, 'film',    'starship'),
        film2vehicles:  setToArray(rels.film2vehicles,  'film',    'vehicle'),
        film2species:   setToArray(rels.film2species,   'film',    'specie'),
        show2people:    setToArray(rels.show2people,    'show',    'people'),
        show2planets:   setToArray(rels.show2planets,   'show',    'planet'),
        show2starships: setToArray(rels.show2starships, 'show',    'starship'),
        show2vehicles:  setToArray(rels.show2vehicles,  'show',    'vehicle'),
        show2species:   setToArray(rels.show2species,   'show',    'specie'),
        species2people: setToArray(rels.species2people, 'species', 'people'),
        starship2pilot: setToArray(rels.starship2pilot, 'starship','pilot'),
        vehicle2pilot:  setToArray(rels.vehicle2pilot,  'vehicle', 'pilot'),
        planet2people:  setToArray(rels.planet2people,  'planet',  'people'),
    }

    // ── Step 6: Write output files ────────────────────────────────────────────
    await fs.mkdir(RAW_DIR, { recursive: true })

    const toArray = map => [...map.values()].filter(Boolean)

    await fs.writeFile(path.join(RAW_DIR, 'films.json'),         JSON.stringify(toArray(films),      null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'shows.json'),         JSON.stringify(toArray(shows),      null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'people.json'),        JSON.stringify(toArray(people),     null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'planets.json'),       JSON.stringify(toArray(planets),    null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'species.json'),       JSON.stringify(toArray(speciesMap), null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'starships.json'),     JSON.stringify(toArray(starships),  null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'vehicles.json'),      JSON.stringify(toArray(vehicles),   null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'relationships.json'), JSON.stringify(relationships,       null, 2))

    if (failed.length) {
        await fs.writeFile(FAILED_LOG, JSON.stringify(failed, null, 2))
    }

    console.log(`\nDone. Scraped: ${stats.scraped}, Failed: ${stats.failed}, Skipped: ${stats.skipped}`)
    console.log(`Films: ${films.size}, Shows: ${shows.size}, People: ${people.size}, Planets: ${planets.size}`)
    console.log(`Species: ${speciesMap.size}, Starships: ${starships.size}, Vehicles: ${vehicles.size}`)
    if (failed.length) console.log(`Failed pages logged to: ${FAILED_LOG}`)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})
```

- [ ] **Step 2: Commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/index.js
git commit -m "feat: implement scraper orchestrator — crawl, extract, deduplicate, write raw JSON"
```

---

## Task 9: Rewrite `cap/convertData.js` for Flat JSON Format

The existing `convertData.js` reads Django fixture format (`pk`, `model`, `fields`). The new version reads the flat arrays from `scripts/data/raw/`. The public `runMigration()` API is preserved; internal functions are replaced.

> **Note on field naming:** The design spec's data format examples use `"name"` for films and shows (e.g. `"name": "A New Hope"`). The CDS `Film` and `Show` entities both use `title`, and the extractors in this plan write `title`. The spec example was a documentation inconsistency — **use `title` for films and shows throughout**. Characters, planets, species, starships, and vehicles all use `name`, which matches the CDS entities and the spec.

**Files:**
- Rewrite: `cap/convertData.js`
- Rewrite: `cap/convertDataLite.js` (same changes — this is the SQLite load path used by `npm run load_sqlite`)
- Modify: `cap/test/convertData.test.js`
- Modify: `cap/package.json`

- [ ] **Step 1: Write failing tests first**

The existing `cap/test/convertData.test.js` imports `__internals` and tests `transformFixtures`, `normalizeString`, etc. Update it to test the new `transformEntities` function with flat JSON input:

Open `cap/test/convertData.test.js` and replace the `createFixtures()` helper and all `transformFixtures` test calls with:

```javascript
// New flat JSON format — no Django wrapper
function createRawData() {
    return {
        planets: [{ name: 'Tatooine', diameter: '10465', rotation_period: '23',
                    orbital_period: '304', gravity: '1 standard', population: '200000',
                    climate: 'arid', terrain: 'desert', surface_water: '1' }],
        people:  [{ name: 'Luke Skywalker', height: '172', mass: '77',
                    hair_color: 'blond', skin_color: 'fair', eye_color: 'blue',
                    birth_year: '19BBY', gender: 'male', _homeworld: 'Tatooine',
                    _species: 'Human' }],
        films:   [{ title: 'A New Hope', episode_id: 4, opening_crawl: 'Test crawl.',
                    director: 'George Lucas', producer: 'Gary Kurtz',
                    release_date: '1977-05-25' }],
        shows:   [{ title: 'The Mandalorian', show_type: 'LIVE_ACTION_SERIES',
                    seasons: 3, episode_count: 24, network: 'Disney+',
                    director: 'Jon Favreau', producer: 'Jon Favreau',
                    release_date: '2019-11-01' }],
        species:   [], starships: [], vehicles: [],
        relationships: {
            film2people:    [{ film: 'A New Hope',       people: 'Luke Skywalker' }],
            show2people:    [{ show: 'The Mandalorian',  people: 'Luke Skywalker' }],
            film2planets:   [], film2starships: [], film2vehicles: [], film2species: [],
            show2planets:   [], show2starships: [], show2vehicles: [], show2species: [],
            species2people: [], starship2pilot: [], vehicle2pilot: [], planet2people: [],
        }
    }
}

// Replace all `transformFixtures(createFixtures(), report)` calls with:
//   transformEntities(createRawData(), report)
// and update assertions accordingly
```

Run the tests — they FAIL because `transformEntities` doesn't exist yet:

```bash
cd cap && node --test test/convertData.test.js 2>&1 | head -20
```

Expected: test failures on missing `transformEntities`.

- [ ] **Step 2: Rewrite `cap/convertData.js` — replace constants and read helpers**

Key changes (preserve the module's overall structure — only replace the data-loading internals):

```javascript
// Replace the top of the file:
const ROUTES_DIR = path.join(global.__base, '../scripts/data/raw/')

// Replace DELETE_ORDER and UPSERT_ORDER — add Show entries:
const DELETE_ORDER = [
    'Planet2People',
    'Film2People', 'Film2Planets', 'Film2Starships', 'Film2Vehicles', 'Film2Species',
    'Show2People', 'Show2Planets', 'Show2Starships', 'Show2Vehicles', 'Show2Species',
    'Species2People', 'Starship2Pilot', 'Vehicle2Pilot',
    'People', 'Starship', 'Vehicles', 'Species', 'Show', 'Film', 'Planet'
]

const UPSERT_ORDER = [
    'Planet', 'People', 'Starship', 'Vehicles', 'Species', 'Film', 'Show',
    'Planet2People', 'Starship2Pilot', 'Vehicle2Pilot', 'Species2People',
    'Film2People', 'Film2Planets', 'Film2Starships', 'Film2Vehicles', 'Film2Species',
    'Show2People', 'Show2Planets', 'Show2Starships', 'Show2Vehicles', 'Show2Species'
]
```

Replace `readFixture()` with:

```javascript
async function readRawJSON(fileName, entityName, report, log) {
    const fullPath = path.join(ROUTES_DIR, fileName)
    log.info(`Reading ${fileName}`)
    const raw = await fs.readFile(fullPath, 'utf8')
    const data = JSON.parse(raw)
    report.stats.read[entityName] = data.length
    return data
}
```

Replace `buildIndex()` (which indexed by `pk`) with a name-based index:

```javascript
function buildNameIndex(items, nameField = 'name') {
    return new Map(items.map(item => [item[nameField], item]))
}

function buildTitleIndex(items) {
    return buildNameIndex(items, 'title')
}
```

- [ ] **Step 3: Implement `transformEntities()` — entity rows**

Replace `transformFixtures()` with `transformEntities()`. The new function reads flat objects directly instead of `item.fields.*`. Key example for planets and shows (all other entities follow the same pattern):

```javascript
for (const planet of planets) {
    const name = normalizeString(planet.name)
    if (!hasMandatoryValue(name, 'Planet', 'name', planet.name, report)) continue
    const ID = deterministicId('Planet', name)
    pushRow(rows.Planet, dedupe.Planet, {
        ID, name,
        diameter:        normalizeString(planet.diameter),
        rotation_period: normalizeString(planet.rotation_period),
        orbital_period:  normalizeString(planet.orbital_period),
        gravity:         normalizeString(planet.gravity),
        population:      normalizeString(planet.population),
        climate:         normalizeString(planet.climate),
        terrain:         normalizeString(planet.terrain),
        surface_water:   normalizeString(planet.surface_water)
    })
}
```

```javascript
for (const show of shows) {
    const title = normalizeString(show.title)
    if (!hasMandatoryValue(title, 'Show', 'title', show.title, report)) continue
    const ID = deterministicId('Show', title)
    pushRow(rows.Show, dedupe.Show, {
        ID, title,
        show_type:    normalizeString(show.show_type),
        seasons:      show.seasons ?? null,
        episode_count: show.episode_count ?? null,
        network:      normalizeString(show.network),
        director:     normalizeString(show.director),
        producer:     normalizeString(show.producer),
        release_date: normalizeDate(show.release_date)
    })
}
```

- [ ] **Step 4: Implement `transformEntities()` — junction table rows**

Junction tables are built from `relationships.json` arrays instead of embedded film/show fields:

```javascript
for (const rel of relationships.film2people) {
    const film   = filmsByTitle.get(rel.film)
    const person = peopleByName.get(rel.people)
    if (!film || !person) { report.stats.missingReferences++; continue }
    pushRow(rows.Film2People, dedupe.Film2People, {
        ID: deterministicLinkId('Film2People', film.ID, person.ID),
        film_ID: film.ID, people_ID: person.ID
    })
}
// Repeat for all 14 relationship arrays (film2planets, film2starships, film2vehicles,
// film2species, show2people, show2planets, show2starships, show2vehicles, show2species,
// species2people, starship2pilot, vehicle2pilot, planet2people)
```

Update `__internals` export at the bottom to export `transformEntities` and `readRawJSON` instead of the old functions.

- [ ] **Step 5: Apply the same changes to `cap/convertDataLite.js`**

`convertDataLite.js` is the SQLite load path (`npm run load_sqlite`). It uses the same internal structure as `convertData.js` but avoids parallel chunk loading (uses sequential UPSERTs to prevent `SQLITE_BUSY` errors). Apply every change from Step 2 to this file as well:

- Replace `ROUTES_DIR` to point at `../scripts/data/raw/`
- Replace `readFixture` with `readRawJSON`
- Replace `buildIndex` with `buildNameIndex` / `buildTitleIndex`
- Replace `transformFixtures` with `transformEntities` (same logic as `convertData.js`)
- Update `DELETE_ORDER` and `UPSERT_ORDER` to include Show + 5 Show2* junction tables

- [ ] **Step 6: Run the updated convertData tests**

```bash
cd cap && node --test test/convertData.test.js
```

Expected: All tests PASS.

- [ ] **Step 7: Run the full test suite**

```bash
cd cap && npm test
```

Expected: All tests PASS. No regressions.

- [ ] **Step 8: Commit**

```bash
cd cap && git add convertData.js convertDataLite.js test/convertData.test.js
git commit -m "feat: rewrite convertData.js and convertDataLite.js to load flat JSON from scripts/data/raw instead of Django fixtures"
```

---

## Task 10: Add `scrape` Scripts and Run End-to-End

**Files:**
- Modify: `cap/package.json`

- [ ] **Step 1: Add scripts to `cap/package.json`**

In the `"scripts"` block, add:

```json
"scrape":       "node ../scripts/scraper/index.js",
"scrape:cache": "CACHE_ONLY=true node ../scripts/scraper/index.js"
```

- [ ] **Step 2: Run the scraper (live — takes ~30-60 minutes for full canon)**

```bash
cd cap && npm run scrape
```

Monitor output. Expected summary after completion:
```
Done. Scraped: N, Failed: M, Skipped: K
Films: ~12, Shows: ~20+, People: ~500+, Planets: ~200+
```

If `Failed: M` is non-zero, inspect `scripts/data/cache/failed.json` for pages that need manual review or infobox alias additions to `normalize.js`.

- [ ] **Step 3: Verify output files were created**

```bash
ls -la d:/projects/cloud-cap-hana-swapi/scripts/data/raw/
```

Expected: 8 JSON files (`films.json`, `shows.json`, `people.json`, `planets.json`, `species.json`, `starships.json`, `vehicles.json`, `relationships.json`).

- [ ] **Step 4: Load data into SQLite**

```bash
cd cap && npm run load_sqlite
```

Expected: Completes without errors. Report shows entity counts.

- [ ] **Step 5: Start the server and verify**

```bash
cd cap && npm run sqlite
```

```bash
curl http://localhost:4004/odata/v4/StarWarsFilm/Film?$select=title,episode_id
curl http://localhost:4004/odata/v4/StarWarsShow/Show?$select=title,show_type
curl http://localhost:4004/odata/v4/StarWarsShow/Media?$select=title,media_type
```

Expected:
- Films returns 12+ records including Episodes I–IX, Rogue One, Solo
- Shows returns 20+ records including The Mandalorian, Andor, Clone Wars, Rebels, etc.
- Media returns both Films and Shows in a single list

- [ ] **Step 6: Commit raw data and package.json update**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/data/raw/ cap/package.json
git commit -m "feat: add scrape scripts; commit initial Wookieepedia raw data"
```

---

## Task 11: Final Verification

- [ ] **Step 1: Run the full test suite**

```bash
cd cap && npm test
```

Expected: All tests PASS.

- [ ] **Step 2: Run a profile test to catch regressions**

```bash
cd cap && npm run test:profile
```

Expected: Fast regression gate PASSES.

- [ ] **Step 3: Build**

```bash
cd cap && npm run build
```

Expected: CDS build succeeds with no errors or redirection warnings.

- [ ] **Step 4: Final commit**

```bash
cd d:/projects/cloud-cap-hana-swapi
git add -A
git commit -m "chore: final verification — scraper + data pipeline complete"
```
