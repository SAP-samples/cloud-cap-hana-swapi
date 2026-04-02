# Design: Scraper Data Quality Fixes

**Date:** 2026-04-02
**Status:** Approved
**Scope:** Fix three data quality issues found during HANA data verification

---

## Problem Statement

HANA data verification revealed three bugs in the scraper pipeline:

1. **`Film.episode_id` is 0 for all 11 films** — the `extractFilm()` function always sets `episode_id: null`, with a comment that the orchestrator will populate it from the roman numeral in the title. The orchestrator never does.

2. **Episode records contain non-episode Wookieepedia pages** — `extractSeasonEpisodeTitles()` collects all `[[wikilinks]]` from the Episodes section of season pages. Wookieepedia episode tables contain per-row links to characters, files, and other topics — not only episode titles. This causes character/lore page titles (e.g. "R2-D2/Legends", "Ahsoka Tano") to be treated as episode pages.

3. **Episode counts are wrong for most shows** — a direct symptom of bug 2. Only 79 of 772 episode rows have `season_number` populated (the others are character/lore pages that have no episode infobox). Several shows have 0 episodes scraped.

---

## Decisions

| Question | Decision |
|---|---|
| Fix scope | Extractor layer only — no schema changes, no `convertData.js` changes |
| Re-scrape strategy | Cache-first (`npm run scrape` without `--bypass-cache`) — no network calls |
| Reload strategy | Full replacement (`npm run load`) after re-scrape |

---

## Fix 1 — `film.episode_id` population

**File:** `scripts/scraper/extractors/films.js`

Parse the roman numeral from the page title in `extractFilm()`. The title pattern is consistent across all saga films: `"Star Wars: Episode IV A New Hope"`.

```js
const ROMAN_TO_INT = { I:1, II:2, III:3, IV:4, V:5, VI:6, VII:7, VIII:8, IX:9, X:10 }

function parseEpisodeId(title) {
    const m = title.match(/\bEpisode\s+(I{1,3}|IV|V|VI{0,3}|IX|X)\b/)
    return m ? (ROMAN_TO_INT[m[1]] ?? 0) : 0
}
```

Change `episode_id: null` to `episode_id: parseEpisodeId(pageTitle)` in the returned object.

**Expected result:** Episodes I–IX get values 1–9. Anthology films (Rogue One, Solo) have no "Episode X" in their title and correctly get `0` (the `OTHER` enum value).

---

## Fix 2 — Season episode title extraction

**File:** `scripts/scraper/extractors/seasons.js`

Replace the "collect all wikilinks" strategy with a table-row parser.

### Wookieepedia season page table structure

Season pages use a wikitable in the Episodes section. Each episode row follows this column order:

```
|-
|style="..."|1              ← episode number cell
|[[File:...]]               ← image cell
|"[[Chapter 1: The Mandalorian]]"  ← title cell — quoted wikilink
|[[November 12]], 2019      ← airdate cell
|                           ← prod# cell
```

The episode title cell is uniquely identified by a quoted wikilink: `"[[Page Title]]"`. This pattern does not appear in number, image, airdate, or prod# cells.

### Algorithm

1. Extract the Episodes section (existing heading detection logic, kept as-is)
2. Split on `|-` to get table rows
3. For each row, search for the pattern `"[[Page Title]]"` (a wikilink surrounded by straight double quotes)
4. Extract the page title from the first matching quoted wikilink
5. Skip `File:`, `Image:`, `Category:` prefixed links (existing filter, kept as-is)
6. **Fallback:** if no quoted wikilink is found in a row but the row contains exactly one non-File wikilink, use that link (handles format variations on some show pages)

### What this fixes

- Character links ("Ahsoka Tano", "R2-D2/Legends") appear in episode synopsis cells but are never quoted — they are excluded
- File links are excluded by the existing namespace filter
- Episode title links are always quoted per Wookieepedia episode table convention

---

## Fix 3 — Re-scrape + reload sequence

After both extractor fixes:

```bash
cd cap
npm run scrape         # regenerates films.json + episodes.json from cache
npm run load           # full-replace load to HANA
```

`npm run scrape` reads from `scripts/data/cache/` (committed). It re-runs all extractors against the cached wikitext. Only `films.json` (episode_id field) and `episodes.json` (episode list) change. People, planets, species, starships, vehicles, shows, and relationships are unchanged.

`npm run load` calls `convertData.js` with `mode=full` — it clears and reloads all tables.

---

## Files Changed

| File | Change |
|---|---|
| `scripts/scraper/extractors/films.js` | Add `parseEpisodeId()`, change `episode_id: null` → `episode_id: parseEpisodeId(pageTitle)` |
| `scripts/scraper/extractors/seasons.js` | Replace `extractWikilinks()` with table-row parser using quoted-wikilink detection |

No schema changes. No `convertData.js` changes. No `cap/package.json` changes.

---

## Expected Outcome

| Check | Before | After |
|---|---|---|
| `Film.episode_id` | All 0 | Episodes I–IX → 1–9, anthologies → 0 |
| Total episode rows | 772 (693 spurious) | ~430 proper episodes |
| Episodes with `season_number` | 79 / 772 (10%) | ~430 / ~430 (100%) |
| Clone Wars episodes | 260 (expected 133) | ~133 |
| Mandalorian episodes | 212 (expected 24) | ~24 |
| Ahsoka spurious rows | 37 non-episode rows | 0 |

Note: exact episode counts depend on Wookieepedia cache coverage. Some shows may have partial caches (pages not yet fetched) which will be visible as a lower-than-expected count, not as spurious rows.

---

## Out of Scope

- People homeworld nulls (75% null) — acceptable, minor characters often have no homeworld listed on Wookieepedia
- Shows with 0 episodes (Obi-Wan Kenobi, Tales, Skeleton Crew, Acolyte, Rangers, Maul) — their season pages may not be in cache; this is a separate re-scrape task
- `opening_crawl` null for all films — separate issue, the crawl text is in the article body, not the infobox
