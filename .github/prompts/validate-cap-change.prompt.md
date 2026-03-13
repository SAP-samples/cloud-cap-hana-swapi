---
description: "Generate a focused verification plan for CAP changes in this repository, including build/run checks and risk-based test coverage."
name: "Validate CAP Change"
argument-hint: "Changed files or change summary"
agent: "agent"
---
You are validating CAP changes in this repository.

Input from user:
- Changed files and/or summary of intended behavior
- Target profile (hybrid/sqlite/pg) if relevant

Goal:
Create a concise, evidence-driven validation plan and execute checks where possible.

Requirements:
1. Build a change-aware checklist based on touched layers:
   - `cap/db/**/*.cds` (model/schema)
   - `cap/srv/*-service.cds` (service contract)
   - `cap/srv/*-fiori.cds` (UI annotations)
   - `cap/srv/**/*.js` (runtime handlers)
2. If CDS/CAP API behavior is part of validation reasoning, use cds-mcp for definitions/docs first.
3. Prefer smallest useful command set and report results clearly.
4. Include negative/edge checks, not only happy-path checks.
5. Flag migration/backward-compatibility risks explicitly.

Output format:
- Validation scope (what changed, what can break)
- Checks to run now (with rationale)
- Optional deeper checks (if time permits)
- Results summary (pass/fail/blocked)
- Risk register and follow-ups

Minimum checklist guidance:
- Build in `cap/`: `npm run build`
- Service availability sanity check (`npm start`/profile watch as applicable)
- Contract-level spot checks for affected entities/actions/events
- Handler behavior checks for event hooks/notifications when touched
- Regeneration/mismatch risks for generated artifacts (`cap/types`, `gen/*`)
