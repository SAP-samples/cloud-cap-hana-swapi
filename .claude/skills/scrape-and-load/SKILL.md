---
name: scrape-and-load
description: Run the Wookieepedia scraper, convert data, load into SQLite, and verify with migration and full tests.
disable-model-invocation: true
---

Run the full data pipeline **sequentially** from the `cap/` directory.

## Steps

1. **Scrape Star Wars data**
   ```bash
   cd cap && npm run scrape
   ```
   Uses committed cache by default (fast). If the user requests `--bypass-cache`, ask for explicit confirmation first, then run `npm run scrape:bypass-cache` instead.

2. **Build CDS artifacts**
   ```bash
   cd cap && npm run build
   ```

3. **Load fixture data into SQLite**
   ```bash
   cd cap && npm run load_sqlite
   ```

4. **Run migration tests**
   ```bash
   cd cap && npm run test:migration
   ```
   Verifies data conversion logic and report generation.

5. **Run full test suite**
   ```bash
   cd cap && npm test
   ```

## Rules

- **Stop on failure.** If any step fails, report the error and do not continue.
- **Cache-first by default.** Never bypass the scraper cache without user confirmation — fresh fetches hit Wookieepedia and take significantly longer.
- **Report results.** Summarize each step's outcome: scrape stats, build status, load counts, and test pass/fail/skip.
