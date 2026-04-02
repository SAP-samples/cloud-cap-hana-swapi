# Design: Scraper Show Attribution and Season Number Fixes

**Date:** 2026-04-02
**Status:** Approved
**Scope:** Fix three scraper bugs causing wrong show attribution, null season numbers, and missing episodes for 6 shows

---

## Problem Statement

After the previous extractor fixes (episode title row parsing, film episode_id), HANA data inspection revealed three remaining data quality issues:

1. **Wrong show attribution for episodes** — `extractSeasonLinks()` scans every wikilink containing "season" across the entire show page. Cross-show references and merchandise pages are picked up as season pages for the wrong show:
   - Ahsoka show page links to `[[The Mandalorian Season Two|...]]` (context reference) → 8 Mandalorian S2 episodes attributed to Ahsoka
   - Boba Fett **show page** links to `[[The Mandalorian Season Two|...]]` and `[[The Mandalorian Season Three|...]]` (context references) → Mandalorian S2 and S3 episodes attributed to Boba Fett. (Confirmed: no separate Boba Fett season page exists in cache; the offending links are on the show page.)
   - Resistance show page links to `[[The Clone Wars: Season Seven|revival]]` → 12 Clone Wars S7 episodes attributed to Resistance
   - Resistance show page links to `[[Star Wars Resistance: Complete Season One|DVD]]` → DVD page processed as season page (episode titles not found, but page is fetched needlessly)

2. **`season_number` null for 301/380 episodes** — `normalizeInteger()` calls `parseInt()` and returns null on non-numeric strings. Wookieepedia uses ordinal words in the `|season=` infobox field for some shows (e.g. `[[The Mandalorian Season One|One]]` → `parseInfobox` strips the wikilink leaving `"One"` → `parseInt("One")` → NaN → null). Shows affected: The Mandalorian, Clone Wars, Rebels, Resistance, Young Jedi Adventures, Book of Boba Fett. Shows unaffected: Bad Batch, Andor, Ahsoka (use digits).

3. **0 episodes for 6 shows** (Obi-Wan Kenobi, Skeleton Crew, The Acolyte, Tales, Rangers of the New Republic, Maul) — their season pages are not in cache. After Fix 1, `extractSeasonLinks()` will correctly find those season page links from the show pages, and `npm run scrape` (cache-first) will auto-fetch uncached pages from Wookieepedia.

---

## Decisions

| Question | Decision |
|---|---|
| Fix scope | Extractor and orchestrator layer only — no schema changes, no `convertData.js` changes |
| Show attribution source | Use episode's own `\|series=` infobox field as authoritative; fall back to discovery-based `showTitle` |
| Ordinal parsing scope | Add to `normalizeInteger()` globally — safe, ordinal path only triggers when `parseInt` returns NaN |
| Cache fetch strategy | Cache-first scrape auto-fetches missing pages; no separate fetch mechanism needed |

---

## Fix 1 — `extractSeasonLinks` show-aware filtering

**File:** `scripts/scraper/index.js`

**Current:** Scans all wikilinks in the entire show page wikitext for titles matching `/season/i`. No show-specificity check.

**Fix:** Make it show-aware. Derive distinctive words from the show title (excluding stopwords), require each candidate season link to contain at least one. Also exclude non-episode pages via a blocklist.

```js
const STOPWORDS = new Set(['star','wars','the','a','of','and','in'])
const NON_EPISODE_RE = /complete|guide|art of|score|vol\.|collector|soundtrack|handbook|encyclopedia/i

function extractSeasonLinks(wikitext, showTitle) {
    const keyWords = showTitle.toLowerCase().split(/[\s:]+/)
        .filter(w => w.length > 2 && !STOPWORDS.has(w))
    const re = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
    const titles = []
    let m
    while ((m = re.exec(wikitext)) !== null) {
        const t = m[1].trim()
        if (!/season/i.test(t)) continue
        if (NON_EPISODE_RE.test(t)) continue
        if (keyWords.some(w => t.toLowerCase().includes(w))) titles.push(t)
    }
    return [...new Set(titles)]
}
```

Call site: `extractSeasonLinks(wikitext, title)` (pass show title).

**What this fixes:**
- Resistance page: accepts "Star Wars Resistance Season One/Two"; rejects "The Clone Wars: Season Seven" (no "resistance") and "Complete Season One" (blocklist)
- Ahsoka page: accepts "Ahsoka Season 1/2"; rejects "The Mandalorian Season Two" (no "ahsoka")
- Boba Fett show page contains `[[The Mandalorian Season Two|...]]` and `[[The Mandalorian Season Three|...]]` as context references — both rejected (no "boba" or "fett")
- After fix, Obi-Wan/Skeleton Crew/etc. season links will be correctly found and fetched

**Edge case — empty `keyWords`:** If a show title consisted entirely of stopwords, `keyWords` would be empty and all season links would be rejected. All real Star Wars shows have at least one non-stopword in their title (e.g. "boba", "fett", "ahsoka", "mandalorian"), so this case does not occur and no fallback is needed for this scope.

---

## Fix 2 — `normalizeInteger` ordinal word parsing

**File:** `scripts/scraper/normalize.js`

**Current:** Returns null when `parseInt` returns NaN — no fallback for English ordinal words.

**Fix:** Add ordinal lookup after the `parseInt` attempt:

```js
const ORDINAL_TO_INT = {
    one:1, two:2, three:3, four:4, five:5,
    six:6, seven:7, eight:8, nine:9, ten:10
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

**What this fixes:** The Mandalorian `season: "One"` → 1. Clone Wars `season: "Two"` → 2. Etc. Numeric callers (`parseInt` succeeds first) are unaffected.

---

## Fix 3 — `extractEpisode` uses `|series=` for `_show`

**File:** `scripts/scraper/extractors/episodes.js`

**Current:** `_show` is always set from the `showTitle` parameter passed by the orchestrator (the discovery-based `episodeShowMap` value).

**Fix:** The `|series=` infobox field is already cleaned to a plain string by `parseInfobox` (e.g. `"Star Wars: The Mandalorian"`). Use it when present:

```js
_show: infobox.series ?? showTitle,
```

**What this fixes:**
- Chapter 9–16 (Mando S2): `infobox.series = "Star Wars: The Mandalorian"` → correct show
- Chapter 17–24 (Mando S3): `infobox.series = "Star Wars: The Mandalorian"` → correct show (not Boba Fett)
- Episodes without a `series` field fall back to `showTitle` (existing behaviour preserved)

---

## Re-scrape + Reload Sequence

After all code fixes pass tests:

```bash
cd cap
npm run scrape         # cache-first; fetches any missing season pages automatically
npm run load           # full-replace load to HANA
```

---

## Files Changed

| File | Change |
|---|---|
| `scripts/scraper/index.js` | `extractSeasonLinks` — add `showTitle` param, distinctive word filter, NON_EPISODE_RE blocklist; **export the function** so it can be unit-tested |
| `scripts/scraper/normalize.js` | `normalizeInteger` — add `ORDINAL_TO_INT` map and ordinal fallback (`normalizeInteger` has no existing tests; none will break) |
| `scripts/scraper/extractors/episodes.js` | `extractEpisode` — use `infobox.series ?? showTitle` for `_show` |
| `scripts/scraper/test/extractors.test.js` | Add `normalizeInteger` ordinal tests; add `extractEpisode` series-field tests |
| `scripts/scraper/test/index.test.js` | New file — tests for `extractSeasonLinks` (requires the function to be exported from `index.js`) |

No schema changes. No `convertData.js` changes.

---

## Test Cases Required

### `normalizeInteger` — ordinal parsing

| Input | Expected |
|---|---|
| `"One"` | `1` |
| `"Four"` | `4` |
| `"Ten"` | `10` |
| `"1"` | `1` |
| `"42"` | `42` |
| `null` | `null` |
| `"unknown"` | `null` |

### `extractSeasonLinks` — show-aware filtering

| Show title | Season link in wikitext | Expected result |
|---|---|---|
| `"Star Wars: Ahsoka"` | `[[Ahsoka Season 1\|first]]` | included |
| `"Star Wars: Ahsoka"` | `[[The Mandalorian Season Two\|season two]]` | excluded |
| `"Star Wars Resistance"` | `[[Star Wars Resistance Season One\|One]]` | included |
| `"Star Wars Resistance"` | `[[The Clone Wars: Season Seven\|revival]]` | excluded |
| `"Star Wars Resistance"` | `[[Star Wars Resistance: Complete Season One\|DVD]]` | excluded (blocklist) |
| `"Star Wars: The Book of Boba Fett"` | `[[The Mandalorian Season Two\|season two]]` | excluded (no "boba" or "fett") |
| `"Star Wars: The Book of Boba Fett"` | `[[The Mandalorian Season Three\|third season]]` | excluded (no "boba" or "fett") |

### `extractEpisode` — series field attribution

| `infobox.series` | `showTitle` param | Expected `_show` |
|---|---|---|
| `"Star Wars: The Mandalorian"` | `"Star Wars: Ahsoka"` | `"Star Wars: The Mandalorian"` |
| `null` | `"Star Wars: The Clone Wars"` | `"Star Wars: The Clone Wars"` |

---

## Expected Outcome

| Check | Before | After |
|---|---|---|
| Mandalorian episode count | 8 (S1 only) | ~24 (S1-S3; S4 if in cache) |
| Ahsoka episode count | 16 (8 real + 8 Mando S2) | 8 |
| Boba Fett episode count | 8 (all Mando S3) | 7 (real Boba Fett episodes) |
| Resistance episode count | 49 (9 spurious Clone Wars S7) | 40 |
| Episodes with `season_number` | 79 / 380 (21%) | ~330+ / 380 (87%+) |
| Obi-Wan / Skeleton Crew / Acolyte / Tales / Rangers / Maul | 0 each | Depends on Wookieepedia cache coverage |

---

## Out of Scope

- Shows that genuinely have no season pages on Wookieepedia (e.g. Rangers of the New Republic, Maul — these were cancelled/shelved early)
- `opening_crawl` null for films (article body, not infobox)
- People homeworld nulls (minor characters, acceptable)
