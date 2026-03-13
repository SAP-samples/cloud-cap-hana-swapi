---
description: "Add a new CAP entity with service exposure and checklist-driven verification for this repository."
name: "Add CAP Entity"
argument-hint: "Entity name + fields + associations + target service"
agent: "agent"
---
You are updating a CAP project at `cap/`.

Goal: add or extend an entity with safe, minimal changes and align with repository conventions.

User input:
- Entity and namespace details
- Field list (types, defaults, enums)
- Associations/compositions
- Service(s) that should expose it
- Whether Fiori annotations are required

Requirements:
1. Use cds-mcp for CDS definitions and CAP docs before changing CDS or using CAP CLI/API syntax.
2. Keep split-of-concerns:
   - domain model in `cap/db/`
   - service projection/contract in `cap/srv/*-service.cds`
   - UI metadata in matching `cap/srv/*-fiori.cds`
3. Preserve style and existing naming conventions.
4. Make the smallest safe diff.
5. Include a concise verification checklist after edits.

Output format:
- Summary of intended change
- Files to modify and why
- Implemented changes
- Verification checklist:
  - Build step in `cap/` (`npm run build`)
  - Service exposure check (odata/rest/graphql as applicable)
  - Any migration/risk notes
