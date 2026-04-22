---
name: load-and-test
description: Rebuild CDS artifacts, reload SQLite fixture data, and run the full test suite. Use after schema or service changes.
disable-model-invocation: true
---

Run the following commands **sequentially** from the `cap/` directory. Each step depends on the previous one succeeding.

## Steps

1. **Build CDS artifacts and typed models**
   ```bash
   cd cap && npm run build
   ```
   This runs `cds build` and regenerates `@cds-models/` via `@cap-js/cds-typer`.

2. **Reload SQLite fixture data**
   ```bash
   cd cap && npm run load_sqlite
   ```
   Runs `convertData.js` with the SQLite profile to populate `db.sqlite`.

3. **Run full test suite**
   ```bash
   cd cap && npm test
   ```
   Runs model + handler tests with a 60-second timeout.

## Rules

- **Stop on failure.** If any step fails, report the error immediately. Do not continue to the next step.
- **Report results.** After all steps pass, summarize: build status, data load count, and test results (pass/fail/skip counts).
