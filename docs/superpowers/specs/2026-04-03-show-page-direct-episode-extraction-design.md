# Spec: Show-Page Direct Episode Extraction

**Date:** 2026-04-03  
**Status:** Approved

## Problem

Seven shows currently have 0 episodes in HANA because their episodes are listed directly in a table on the show's Wookieepedia page rather than on separate season sub-pages:

| Show | Episodes |
|------|---------|
| Star Wars: The Book of Boba Fett | 7 |
| Star Wars: Obi-Wan Kenobi | 6 |
| Star Wars: The Acolyte | 8 |
| Star Wars: Skeleton Crew | 8 |
| Star Wars: Tales of the Empire | 6 |
| Star Wars: Tales of the Jedi (television series) | 6 |
| Star Wars: Tales of the Underworld | 6 |
| Star Wars: Maul - Shadow Lord | 10 |
| Tales | 18 |

The scraper currently discovers episodes via `extractSeasonLinks` → season page → `extractSeasonEpisodeTitles`. Shows without season sub-pages fall through with 0 episodes.

## Root Cause

`extractSeasonLinks` (fixed in a prior plan) correctly returns `[]` for these shows — their show pages contain no season sub-page wikilinks. The scraper then does nothing further for those shows.

## Solution

In `scripts/scraper/index.js`, add a fallback: when `extractSeasonLinks` returns an empty array for a show, call `extractSeasonEpisodeTitles` directly on the show page's wikitext.

The show pages use an identical episode table format to season pages:
```
|"[[Chapter 1: Stranger in a Strange Land]]"
```
`extractSeasonEpisodeTitles` already handles this format exactly — confirmed empirically across all affected shows.

## Key Facts (Verified)

- **No overlap risk:** No show page has both season sub-pages and an inline episode table. The two patterns are mutually exclusive across all scraped shows.
- **Correct function:** `extractSeasonEpisodeTitles(wikitext)` returns the right episode titles from every affected show page — tested directly against cached wikitext.
- **Import exists:** `extractSeasonEpisodeTitles` is already imported in `index.js` at line 16.

## Files Changed

### `scripts/scraper/index.js`

In the show processing loop (after the `for (const seasonTitle of seasonLinks)` block), add:

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

### `scripts/scraper/test/index.test.js`

Add tests to the existing `describe('extractSeasonLinks', ...)` file or add a new `describe` for `extractSeasonEpisodeTitles` via show page — but since the unit under test is `extractSeasonEpisodeTitles` (already tested in extractors), the integration test belongs in an `index.test.js` integration section.

Add one integration test that verifies the fallback path fires correctly: a show wikitext with an inline episode table and no season links should produce episodes via the fallback.

**Note:** `index.test.js` only exports and tests `extractSeasonLinks` currently. The fallback logic in `run()` itself is integration-level (requires mocking `fetchWikitext`). The pragmatic test is to verify that `extractSeasonEpisodeTitles` returns results for a Boba Fett-style wikitext fixture — this is already proven by the existing `extractSeasonEpisodeTitles` tests. No new integration mocking is needed for this scope.

## Test Plan

1. Add a unit test in `test/index.test.js` confirming `extractSeasonEpisodeTitles` handles the inline-table format (a direct test of the function we're now relying on in the fallback path)
2. Run `npm run scrape` (cache-first)
3. Verify episode counts per show in HANA — all 9 shows above should now have episodes

## Expected Outcome

After re-scrape and HANA reload:

| Show | Before | After |
|------|--------|-------|
| Star Wars: The Book of Boba Fett | 0 | 7 |
| Star Wars: Obi-Wan Kenobi | 0 | 6 |
| Star Wars: The Acolyte | 0 | 8 |
| Star Wars: Skeleton Crew | 0 | 8 |
| Star Wars: Tales of the Empire | 0 | 6 |
| Star Wars: Tales of the Jedi (television series) | 0 | 6 |
| Star Wars: Tales of the Underworld | 0 | 6 |
| Star Wars: Maul - Shadow Lord | 0 | 10 |
| Tales | 0 | 18 |

Shows already working (Mandalorian, Ahsoka, etc.) must remain unchanged.

## Out of Scope

- Changing `extractSeasonEpisodeTitles` — it already works correctly
- Modifying the CAP schema or `convertData.js`
- Handling shows that have neither season sub-pages nor an inline episode table (e.g. Rangers of the New Republic — cancelled before production)
