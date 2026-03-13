---
name: cap-change-workflow
description: 'Use for end-to-end CAP change workflows: modify CDS/handlers, regenerate artifacts, and run a short verification checklist for this repository.'
argument-hint: 'Describe the CAP change to implement and verify'
user-invocable: true
disable-model-invocation: false
---

# CAP Change Workflow

Use this skill when implementing non-trivial CAP changes (CDS, services, handlers, annotations) and you want a consistent implementation + verification flow.

## When to use

- Adding/changing entities, associations, projections, or service exposure
- Updating `cap/srv/*.js` handlers or event hooks
- Regenerating build artifacts and validating basic runtime behavior

## Procedure

1. Clarify requested behavior and impacted files.
2. If CDS is involved:
   - Resolve definitions with cds-mcp first.
   - Check CAP docs with cds-mcp before proposing CAP API/CLI syntax.
3. Implement minimal changes in appropriate layer:
   - `cap/db` for domain model
   - `cap/srv/*-service.cds` for contracts
   - `cap/srv/*-fiori.cds` for UI annotations
   - `cap/srv/*.js` for runtime logic
4. Rebuild artifacts in `cap/` (`npm run build`) when CDS changed.
5. Run a compact verification checklist and report outcomes.
6. Document risks, assumptions, and follow-ups.

## Repository gotchas

- After HANA deployment, generated folders can be cleared; run `npm run build` again.
- SQLite local loading may hit `SQLITE_BUSY` with parallel loading.

## Checklist template

Use this checklist after implementation: `assets/change-checklist.md`.
