# Scraper Show Attribution and Season Number Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three scraper bugs — wrong show attribution for episodes, null season_number for 301/380 episodes, and 0 episodes for 6 shows — by fixing the season link discoverer, ordinal integer parser, and episode show resolver.

**Architecture:** Three isolated code fixes applied TDD-style, then a cache-first re-scrape (which auto-fetches missing season pages from Wookieepedia), followed by a HANA reload and verification. Each fix is in a different file with no cross-dependencies, so they can be committed separately.

**Tech Stack:** Node.js (CommonJS), `node:test` built-in test runner, `hana-cli` for HANA verification.

---

## File Map

| File | Role | Change |
| --- | --- | --- |
| `scripts/scraper/normalize.js` | Integer/string normalizers shared by all extractors | Add `ORDINAL_TO_INT` map and ordinal fallback to `normalizeInteger` |
| `scripts/scraper/extractors/episodes.js` | Episode page extractor | Use `infobox.series ?? showTitle` for `_show` field |
| `scripts/scraper/index.js` | Scraper orchestrator — season link discovery | Add `showTitle` param + distinctive-word filter + blocklist to `extractSeasonLinks`; export the function |
| `scripts/scraper/test/extractors.test.js` | Extractor unit tests (existing) | Add `normalizeInteger` ordinal tests; add `extractEpisode` series-field tests |
| `scripts/scraper/test/index.test.js` | Orchestrator unit tests (new file) | Tests for `extractSeasonLinks` with show-title filtering |

---

## Baseline

Before starting, confirm existing test state:

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "^# (pass|fail)"
```

Expected: `# pass 34` / `# fail 3` (3 pre-existing unrelated failures).

---

## Task 1: Fix `normalizeInteger` — ordinal word parsing

**Files:**
- Modify: `scripts/scraper/normalize.js`
- Modify: `scripts/scraper/test/extractors.test.js`

### Step 1.1 — Write the failing tests

Add a new `describe('normalizeInteger', ...)` block at the bottom of `scripts/scraper/test/extractors.test.js`, after all existing describes.

First, add the require at the top of the file alongside the existing requires (around line 8):

```js
const { normalizeInteger } = require('../normalize')
```

Then add at the bottom of the file:

```js
describe('normalizeInteger', () => {
    it('parses numeric strings', () => {
        assert.equal(normalizeInteger('1'), 1)
        assert.equal(normalizeInteger('42'), 42)
    })

    it('parses ordinal word One → 1', () => {
        assert.equal(normalizeInteger('One'), 1)
    })

    it('parses ordinal word Four → 4', () => {
        assert.equal(normalizeInteger('Four'), 4)
    })

    it('parses ordinal word Ten → 10', () => {
        assert.equal(normalizeInteger('Ten'), 10)
    })

    it('parses ordinal case-insensitively', () => {
        assert.equal(normalizeInteger('ONE'), 1)
        assert.equal(normalizeInteger('four'), 4)
    })

    it('returns null for unknown words', () => {
        assert.equal(normalizeInteger('eleven'), null)
        assert.equal(normalizeInteger('unknown'), null)
    })

    it('returns null for null/undefined', () => {
        assert.equal(normalizeInteger(null), null)
        assert.equal(normalizeInteger(undefined), null)
    })
})
```

### Step 1.2 — Run tests, confirm they fail

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "normalizeInteger|^# (pass|fail)"
```

Expected: 7 lines starting with `not ok` for `normalizeInteger`. Pass 34, fail 10.

### Step 1.3 — Implement the fix in `normalize.js`

In `scripts/scraper/normalize.js`, add the `ORDINAL_TO_INT` constant before `normalizeInteger` and update the function:

```js
const ORDINAL_TO_INT = {
    one: 1, two: 2, three: 3, four: 4, five: 5,
    six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
}

function normalizeInteger(value) {
    if (value === undefined || value === null) return null
    const s = normalizeString(String(value))
    if (!s) return null
    const n = parseInt(s, 10)
    if (!Number.isNaN(n)) return n
    return ORDINAL_TO_INT[s.toLowerCase()] ?? null
}
```

Replace the existing `normalizeInteger` function (lines 39–45) entirely — the new version is a drop-in replacement with the ordinal fallback added.

### Step 1.4 — Run tests, confirm they pass

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "normalizeInteger|^# (pass|fail)"
```

Expected: 7 lines `ok ... normalizeInteger`. Overall: `# pass 41` / `# fail 3`.

### Step 1.5 — Commit

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/normalize.js scripts/scraper/test/extractors.test.js
git commit -m "fix: parse ordinal words (One, Two...) in normalizeInteger for season_number"
```

---

## Task 2: Fix `extractEpisode` — use `infobox.series` for `_show`

**Files:**
- Modify: `scripts/scraper/extractors/episodes.js`
- Modify: `scripts/scraper/test/extractors.test.js`

### Step 2.1 — Write the failing tests

Add a new `describe('extractEpisode _show attribution', ...)` block at the bottom of `scripts/scraper/test/extractors.test.js`.

First add the require alongside the other requires at the top:

```js
const { extractEpisode } = require('../extractors/episodes')
```

Add the fixture and describe block at the bottom:

```js
// ── Episode attribution fixtures ──────────────────────────────────────────────

// Episode infobox WITH a |series= field (authoritative show)
const EPISODE_WITH_SERIES_WIKITEXT = `
{{Episode
|series=Star Wars: The Mandalorian
|season=One
|number=9
|airdate=October 30, 2020
|director=Jon Favreau
|writer=Jon Favreau
|runtime=50
}}
`

// Episode infobox WITHOUT a |series= field (fallback to showTitle)
const EPISODE_WITHOUT_SERIES_WIKITEXT = `
{{Episode
|season=1
|number=1
|airdate=November 12, 2019
|director=Dave Filoni
|writer=Jon Favreau
|runtime=39
}}
`

describe('extractEpisode _show attribution', () => {
    it('uses infobox series field when present, ignores showTitle', () => {
        const ep = extractEpisode('Chapter 9: The Marshal', EPISODE_WITH_SERIES_WIKITEXT, 'Star Wars: Ahsoka')
        assert.equal(ep._show, 'Star Wars: The Mandalorian')
    })

    it('falls back to showTitle when series field is absent', () => {
        const ep = extractEpisode('Chapter 1: The Mandalorian', EPISODE_WITHOUT_SERIES_WIKITEXT, 'Star Wars: The Mandalorian')
        assert.equal(ep._show, 'Star Wars: The Mandalorian')
    })

    it('falls back to showTitle when series field is empty string', () => {
        const ep = extractEpisode('Chapter 1: The Mandalorian', EPISODE_WITHOUT_SERIES_WIKITEXT, 'Star Wars: The Clone Wars')
        assert.equal(ep._show, 'Star Wars: The Clone Wars')
    })
})
```

### Step 2.2 — Run tests, confirm they fail

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "_show attribution|^# (pass|fail)"
```

Expected: 3 lines `not ok`. Pass 41, fail 6.

### Step 2.3 — Implement the fix in `episodes.js`

In `scripts/scraper/extractors/episodes.js`, change line 42 in the `return` statement of `extractEpisode`:

```js
// Before:
_show:          showTitle,

// After:
_show:          infobox.series ?? showTitle,
```

This is a one-line change. `parseInfobox` already strips wikilink markup from field values, so `infobox.series` is a plain string like `"Star Wars: The Mandalorian"` when present, or `undefined`/`null` when absent.

### Step 2.4 — Run tests, confirm they pass

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "_show attribution|^# (pass|fail)"
```

Expected: 3 lines `ok`. Overall: `# pass 44` / `# fail 3`.

### Step 2.5 — Commit

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/extractors/episodes.js scripts/scraper/test/extractors.test.js
git commit -m "fix: use episode infobox series field for _show attribution"
```

---

## Task 3: Fix `extractSeasonLinks` — show-aware filtering

**Files:**
- Modify: `scripts/scraper/index.js`
- Create: `scripts/scraper/test/index.test.js`

### Step 3.1 — Write the failing tests (new test file)

Create `scripts/scraper/test/index.test.js`:

```js
'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { extractSeasonLinks } = require('../index')

describe('extractSeasonLinks', () => {
    it('returns [] for empty wikitext', () => {
        assert.deepEqual(extractSeasonLinks('', 'Star Wars: Ahsoka'), [])
    })

    it('returns [] for null wikitext', () => {
        assert.deepEqual(extractSeasonLinks(null, 'Star Wars: Ahsoka'), [])
    })

    it('extracts matching season link for own show', () => {
        const wikitext = 'See [[Ahsoka Season 1|first season]] for details.'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.ok(result.includes('Ahsoka Season 1'), 'should include own season page')
    })

    it('excludes season links from other shows', () => {
        const wikitext = '[[Ahsoka Season 1|first]] and [[The Mandalorian Season Two|season two]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.ok(result.includes('Ahsoka Season 1'), 'own season included')
        assert.ok(!result.includes('The Mandalorian Season Two'), 'other show excluded')
    })

    it('excludes Resistance Clone Wars cross-reference', () => {
        const wikitext = '[[Star Wars Resistance Season One|One]] and [[The Clone Wars: Season Seven|revival]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars Resistance')
        assert.ok(result.includes('Star Wars Resistance Season One'))
        assert.ok(!result.includes('The Clone Wars: Season Seven'))
    })

    it('excludes DVD/complete season pages via blocklist', () => {
        const wikitext = '[[Star Wars Resistance Season One|One]] [[Star Wars Resistance: Complete Season One|DVD]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars Resistance')
        assert.ok(result.includes('Star Wars Resistance Season One'))
        assert.ok(!result.includes('Star Wars Resistance: Complete Season One'))
    })

    it('excludes Mandalorian season links from Boba Fett show page', () => {
        const wikitext = '[[The Mandalorian Season Two|second season]] and [[The Mandalorian Season Three|third season]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: The Book of Boba Fett')
        assert.deepEqual(result, [])
    })

    it('deduplicates repeated season links', () => {
        const wikitext = '[[Ahsoka Season 1|first]] mentioned again [[Ahsoka Season 1|S1]]'
        const result = extractSeasonLinks(wikitext, 'Star Wars: Ahsoka')
        assert.equal(result.length, 1)
        assert.equal(result[0], 'Ahsoka Season 1')
    })
})
```

### Step 3.2 — Run tests, confirm they fail

```bash
cd scripts/scraper
node --test --test-reporter=tap test/index.test.js 2>&1 | grep -E "extractSeasonLinks|^# (pass|fail)"
```

Expected: errors because `extractSeasonLinks` is not exported yet. All tests fail.

### Step 3.3 — Rewrite `extractSeasonLinks` in `index.js` and export it

In `scripts/scraper/index.js`, replace the existing `extractSeasonLinks` function (lines 26–38) with:

```js
const SEASON_LINK_BLOCKLIST = /complete|guide|art of|score|vol\.|collector|soundtrack|handbook|encyclopedia/i
const SEASON_LINK_STOPWORDS = new Set(['star', 'wars', 'the', 'a', 'of', 'and', 'in'])

/**
 * Extract season page titles from a show's wikitext.
 * Only returns pages that:
 *   1. Contain "season" in the page title
 *   2. Are not merchandise/media pages (blocklist)
 *   3. Contain at least one distinctive word from the show's title
 */
function extractSeasonLinks(wikitext, showTitle) {
    if (!wikitext) return []
    const keyWords = (showTitle || '').toLowerCase().split(/[\s:]+/)
        .filter(w => w.length > 2 && !SEASON_LINK_STOPWORDS.has(w))
    const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
    const titles = []
    let m
    while ((m = re.exec(wikitext)) !== null) {
        const t = m[1].trim()
        if (!/season/i.test(t)) continue
        if (SEASON_LINK_BLOCKLIST.test(t)) continue
        if (keyWords.some(w => t.toLowerCase().includes(w))) titles.push(t)
    }
    return [...new Set(titles)]
}
```

Then update the call site at line 147 (inside the show processing loop) to pass the show title:

```js
// Before:
const seasonLinks = extractSeasonLinks(wikitext)

// After:
const seasonLinks = extractSeasonLinks(wikitext, title)
```

Then guard the `run()` call so that requiring the module in tests does not trigger a full scrape. Find the line near the bottom of `index.js` that reads:

```js
run().catch(err => {
```

and change it to:

```js
if (require.main === module) run().catch(err => {
```

wrap the whole block in braces: `if (require.main === module) { run().catch(err => { ... }) }`.

Then add an export at the very bottom of `index.js`, after the guarded `run().catch(...)` call:

```js
module.exports = { extractSeasonLinks }
```

### Step 3.4 — Handle null wikitext in extractSeasonLinks

The existing `extractSeasonLinks` did not guard against null input; the new one does (`if (!wikitext) return []`). This matches test cases for null/empty input.

### Step 3.5 — Run tests, confirm they pass

```bash
cd scripts/scraper
node --test --test-reporter=tap test/index.test.js 2>&1 | grep -E "extractSeasonLinks|^# (pass|fail)"
```

Expected: 8 lines `ok`. Overall: `# pass 8` / `# fail 0` in index.test.js.

Also confirm extractors.test.js still passes:

```bash
cd scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "^# (pass|fail)"
```

Expected: `# pass 44` / `# fail 3` (unchanged).

### Step 3.6 — Commit

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/index.js scripts/scraper/test/index.test.js
git commit -m "fix: filter extractSeasonLinks by show title to prevent cross-show attribution"
```

---

## Task 4: Re-scrape from cache + fetch missing season pages

### Step 4.1 — Run the scraper (cache-first, fetches uncached pages)

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
npm run scrape
```

This runs with no `--bypass-cache` flag. Cached pages are read from disk; pages not in cache are fetched live from Wookieepedia (this is how the missing season pages for Obi-Wan Kenobi, Skeleton Crew, etc. get discovered and fetched — the fixed `extractSeasonLinks` will now find them from the show pages).

Expected output ends with something like:
```
Done. Scraped: N, Failed: 0, Skipped: N
Episodes: ~280-380
```

### Step 4.2 — Verify `episodes.json` show attribution

```bash
cd d:/projects/cloud-cap-hana-swapi
node -e "
const eps = JSON.parse(require('fs').readFileSync('scripts/data/raw/episodes.json','utf8'))
const byShow = {}
eps.forEach(e => { byShow[e._show] = (byShow[e._show] || 0) + 1 })
Object.entries(byShow).sort((a,b) => b[1]-a[1]).forEach(([s,n]) => console.log(n, s))
"
```

Expected:
- `Star Wars: The Mandalorian` should have ~24-32 episodes (was 8)
- `Star Wars: Ahsoka` should have ~8 episodes (was 16)
- `Star Wars: The Book of Boba Fett` should have ~7 episodes (was 8)
- `Star Wars Resistance` should have ~40 episodes (was 49)

### Step 4.3 — Verify `season_number` coverage

```bash
cd d:/projects/cloud-cap-hana-swapi
node -e "
const eps = JSON.parse(require('fs').readFileSync('scripts/data/raw/episodes.json','utf8'))
const withSeason = eps.filter(e => e.season_number !== null)
console.log('Total:', eps.length, 'With season_number:', withSeason.length, '(' + Math.round(withSeason.length/eps.length*100) + '%)')
"
```

Expected: `with season_number` significantly higher than 79. All shows that use ordinal season names (Mandalorian, Clone Wars, Rebels, Resistance) should now populate `season_number`.

### Step 4.4 — Commit updated raw data

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/data/raw/films.json scripts/data/raw/episodes.json scripts/data/raw/relationships.json
git status
# Confirm only expected files changed
git commit -m "data: re-scrape episodes with corrected show attribution and season number parsing"
```

Note: `films.json` may be unchanged (episode_id was already fixed). `relationships.json` will change as episode counts shift.

---

## Task 5: Reload HANA + verify

### Step 5.1 — Run the full data load

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
npm run load
```

Expected: completes without errors. Watch for `Migration summary` showing Episode count and Episode2* junction counts.

### Step 5.2 — Verify episode counts per show

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
hana-cli querySimple --query "
SELECT s.TITLE as show,
       COUNT(e.ID) as ep_count,
       s.EPISODE_COUNT as expected
FROM STAR_WARS_SHOW s
LEFT JOIN STAR_WARS_EPISODE e ON e.SHOW_ID = s.ID
GROUP BY s.ID, s.TITLE, s.EPISODE_COUNT
ORDER BY s.TITLE
"
```

Expected improvements:
- `Star Wars: Ahsoka`: ~8 (was 16)
- `Star Wars: The Book of Boba Fett`: ~7 (was 8)
- `Star Wars: The Mandalorian`: ~24+ (was 8)
- `Star Wars Resistance`: ~40 (was 49)
- Previously 0-episode shows may now have episodes if their season pages exist on Wookieepedia

### Step 5.3 — Verify season_number coverage in HANA

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
hana-cli querySimple --query "
SELECT
    COUNT(*) as total_episodes,
    SUM(CASE WHEN SEASON_NUMBER IS NOT NULL THEN 1 ELSE 0 END) as with_season,
    SUM(CASE WHEN SEASON_NUMBER IS NULL THEN 1 ELSE 0 END) as without_season
FROM STAR_WARS_EPISODE
"
```

Expected: `with_season` significantly higher than 79.

### Step 5.4 — Final commit (may be a no-op if raw data already committed)

```bash
cd d:/projects/cloud-cap-hana-swapi
git status
# If anything remains uncommitted:
git add scripts/data/raw/
git commit -m "fix: reload HANA with corrected show attribution and season numbers"
```

---

## Full Test Run

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
npm test
```

Expected: passes (or same pre-existing failures as before — no CAP handler tests are affected by extractor changes).
