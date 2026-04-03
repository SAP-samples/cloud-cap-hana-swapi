# Show-Page Direct Episode Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 9 shows that currently have 0 episodes in HANA by adding a fallback path that extracts episodes directly from the show page when no season sub-pages exist.

**Architecture:** In `index.js`, after `extractSeasonLinks` returns `[]` for a show, call `extractSeasonEpisodeTitles(wikitext)` directly on the show page. `extractSeasonEpisodeTitles` already parses the identical `"[[Episode Title]]"` table format used on these show pages. The two patterns are mutually exclusive — no show page has both season sub-pages and an inline episode table.

**Tech Stack:** Node.js `node:test` runner, Wookieepedia wikitext, SAP HANA Cloud via `hana-cli`

---

## File Map

| File | Change |
|------|--------|
| `scripts/scraper/index.js` | Add 8-line fallback block in show processing loop |
| `scripts/scraper/test/extractors.test.js` | Add 1 test: inline show-page episode table fixture |

No new files. No schema changes. No `convertData.js` changes.

---

## Baseline

- `test/extractors.test.js`: `# pass 44` / `# fail 3` (3 pre-existing failures unrelated to this work)
- `test/index.test.js`: `# pass 8` / `# fail 0`

---

## Task 1: Add test for inline show-page episode table

**Files:**
- Modify: `scripts/scraper/test/extractors.test.js`

### Step 1.1 — Add fixture

Add the following fixture constant to the fixtures section of `scripts/scraper/test/extractors.test.js`, alongside the existing `MANDO_S1_WIKITEXT`, `REBELS_S1_WIKITEXT`, etc. constants. Place it after `ANDOR_S1_WIKITEXT` (around line 334):

```js
// Show page with inline episode table (no season sub-pages) — Boba Fett format
const BOBA_FETT_SHOW_WIKITEXT = `
==Episodes==
{|{{Prettytable}}
! Episode !! Image !! Title !! Original Airdate !! Prod. #
|-
|style="text-align: center;"|1
|[[File:Chapter_1_Stranger_in_a_Strange_Land.jpg|150px]]
|"[[Chapter 1: Stranger in a Strange Land]]"
|[[December 29]], [[2021]]
|101
|-
|style="text-align: center;"|2
|[[File:Chapter_2_The_Tribes_of_Tatooine.jpg|150px]]
|"[[Chapter 2: The Tribes of Tatooine]]"
|[[January 5]], [[2022]]
|102
|-
|}
`
```

### Step 1.2 — Write the failing test

Add one new `it(...)` test inside the existing `describe('extractSeasonEpisodeTitles', ...)` block at the bottom of the file:

```js
    it('extracts episodes from a show page with inline episode table (no season sub-pages)', () => {
        const titles = extractSeasonEpisodeTitles(BOBA_FETT_SHOW_WIKITEXT)
        assert.equal(titles.length, 2)
        assert.equal(titles[0], 'Chapter 1: Stranger in a Strange Land')
        assert.equal(titles[1], 'Chapter 2: The Tribes of Tatooine')
    })
```

### Step 1.3 — Run test, confirm it fails

```bash
cd d:/projects/cloud-cap-hana-swapi/scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "inline episode table|^# (pass|fail)"
```

Expected: `not ok` for the new test. Overall: `# pass 44` / `# fail 4`.

**Note:** The test should actually pass immediately because `extractSeasonEpisodeTitles` already handles this format. If it does pass, that is the correct outcome — it confirms the function works for show-page fixtures and no code change to the extractor is needed. Proceed to Step 1.4 either way.

### Step 1.4 — Run all tests, confirm baseline is preserved

```bash
cd d:/projects/cloud-cap-hana-swapi/scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "^# (pass|fail)"
```

Expected: `# pass 45` / `# fail 3`.

### Step 1.5 — Commit

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/test/extractors.test.js
git commit -m "test: verify extractSeasonEpisodeTitles handles inline show-page episode tables"
```

---

## Task 2: Add fallback in index.js

**Files:**
- Modify: `scripts/scraper/index.js`

### Step 2.1 — Write the failing test (integration level)

Add to `scripts/scraper/test/index.test.js` a new describe block that documents the expected behavior of the fallback path. `extractSeasonLinks` is already imported at line 6 of `index.test.js` — no new import is needed. The test validates that `extractSeasonLinks` returns `[]` for a show-page-style wikitext (no season links), confirming the fallback condition fires for Boba Fett-style show pages:

```js
describe('extractSeasonLinks — show pages without season sub-pages', () => {
    it('returns [] for Boba Fett show page wikitext (no season sub-page links)', () => {
        const wikitext = `
==Episodes==
{|{{Prettytable}}
|-
|"[[Chapter 1: Stranger in a Strange Land]]"
|-
|"[[Chapter 2: The Tribes of Tatooine]]"
|}
`
        const result = extractSeasonLinks(wikitext, 'Star Wars: The Book of Boba Fett')
        assert.deepEqual(result, [])
    })
})
```

### Step 2.2 — Run test, confirm it passes (documents current behavior)

```bash
cd d:/projects/cloud-cap-hana-swapi/scripts/scraper
node --test --test-reporter=tap test/index.test.js 2>&1 | grep -E "show pages without|^# (pass|fail)"
```

Expected: `ok` — the test should pass immediately, confirming `extractSeasonLinks` returns `[]` for Boba Fett-style wikitext (no `[[... season ...]]` links). This is the condition that triggers the fallback.

Overall: `# pass 9` / `# fail 0`.

### Step 2.3 — Implement the fallback in index.js

In `scripts/scraper/index.js`, find the end of the season links loop (around line 176):

```js
                const seasonLinks = extractSeasonLinks(wikitext, title)
                for (const seasonTitle of seasonLinks) {
                    try {
                        const seasonWikitext = await fetchWikitext(seasonTitle, BYPASS_CACHE)
                        if (!seasonWikitext) continue
                        const episodeTitles = extractSeasonEpisodeTitles(seasonWikitext)
                        for (const epTitle of episodeTitles) {
                            if (!episodes.has(epTitle)) {
                                episodes.set(epTitle, null)
                                episodeShowMap.set(epTitle, title)
                            }
                        }
                    } catch (err) {
                        stats.failed++
                        failed.push({ title: seasonTitle, error: String(err) })
                        console.warn(`  [FAIL] Season ${seasonTitle}: ${err.message}`)
                    }
                }
```

Add the fallback block **immediately after** the closing `}` of the `for (const seasonTitle of seasonLinks)` loop:

```js
                // No season sub-pages — try extracting episodes directly from the show page
                if (seasonLinks.length === 0) {
                    const directEpisodeTitles = extractSeasonEpisodeTitles(wikitext)
                    for (const epTitle of directEpisodeTitles) {
                        if (!episodes.has(epTitle)) {
                            episodes.set(epTitle, null)
                            episodeShowMap.set(epTitle, title)
                        }
                    }
                }
```

`extractSeasonEpisodeTitles` is already imported at line 16 — no import change needed.

### Step 2.4 — Run all tests, confirm no regression

```bash
cd d:/projects/cloud-cap-hana-swapi/scripts/scraper
node --test --test-reporter=tap test/extractors.test.js 2>&1 | grep -E "^# (pass|fail)"
node --test --test-reporter=tap test/index.test.js 2>&1 | grep -E "^# (pass|fail)"
```

Expected:
- `extractors.test.js`: `# pass 45` / `# fail 3`
- `index.test.js`: `# pass 9` / `# fail 0`

### Step 2.5 — Commit

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/scraper/index.js scripts/scraper/test/index.test.js
git commit -m "fix: extract episodes directly from show page when no season sub-pages exist"
```

---

## Task 3: Re-scrape and reload HANA

**Files:** None — data files only

### Step 3.1 — Run the scraper (cache-first)

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
npm run scrape
```

Wait for completion. Episode count should increase from 380 to approximately 380 + 57 = 437 (Boba Fett 7 + Obi-Wan Kenobi 6 + Acolyte 8 + Skeleton Crew 8 + Tales of the Empire 6 + Tales of the Jedi 6 + Tales of the Underworld 6 + Maul - Shadow Lord 10 + Tales 18 - some may already be in cache from prior runs). Exact count may vary.

### Step 3.2 — Verify episode attribution is correct

```bash
cd d:/projects/cloud-cap-hana-swapi
node -e "
const eps = JSON.parse(require('fs').readFileSync('scripts/data/raw/episodes.json','utf8'))
const byShow = {}
eps.forEach(e => { byShow[e._show] = (byShow[e._show] || 0) + 1 })
Object.entries(byShow).sort((a,b) => b[1]-a[1]).forEach(([s,n]) => console.log(n, s))
"
```

Expected new entries (shows that previously had 0):
- `Star Wars: The Book of Boba Fett`: 7
- `Star Wars: Obi-Wan Kenobi`: 6
- `Star Wars: The Acolyte`: 8
- `Star Wars: Skeleton Crew`: 8
- `Star Wars: Tales of the Empire`: 6
- `Star Wars: Tales of the Jedi (television series)`: 6
- `Star Wars: Tales of the Underworld`: 6
- `Star Wars: Maul - Shadow Lord`: 10
- `Tales`: 18

Previously working shows must remain unchanged:
- `Star Wars: The Mandalorian`: 24
- `Star Wars: Ahsoka`: 8
- `Star Wars Resistance`: 38
- `Star Wars: Andor`: 24
- `Star Wars: The Bad Batch`: 47
- `Star Wars: The Clone Wars`: 118
- `Star Wars Rebels`: 66
- `Star Wars: Young Jedi Adventures`: 55

### Step 3.3 — Reload HANA

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
npm run load
```

### Step 3.4 — Verify episode counts in HANA

```bash
cd d:/projects/cloud-cap-hana-swapi/cap
hana-cli querySimple --query "
SELECT s.TITLE as show,
       COUNT(e.ID) as ep_count
FROM STAR_WARS_SHOW s
LEFT JOIN STAR_WARS_EPISODE e ON e.SHOW_ID = s.ID
GROUP BY s.ID, s.TITLE
ORDER BY s.TITLE
"
```

Confirm all 9 previously-zero shows now have non-zero counts matching Step 3.2. Confirm previously-working shows are unchanged.

### Step 3.5 — Commit updated data

Stage all changed data and cache files first, then commit together:

```bash
cd d:/projects/cloud-cap-hana-swapi
git add scripts/data/raw/episodes.json scripts/data/raw/relationships.json
git add scripts/data/cache/
git status
git commit -m "data: re-scrape and reload episodes including show-page inline episode tables"
```
