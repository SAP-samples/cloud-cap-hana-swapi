---
description: "Generate a PR-ready CAP validation report with checks run, risk matrix, and go/no-go recommendation."
name: "CAP PR Validation Report"
argument-hint: "PR summary or changed files"
agent: "agent"
---
You are preparing a PR-ready validation report for CAP changes in this repository.

Input from user:
- PR summary and changed files
- Target runtime profile(s): hybrid/sqlite/pg (if known)
- Any known blockers or skipped checks

Goal:
Produce a concise, reviewer-friendly report based on executed checks and explicit assumptions.

Requirements:
1. Build a validation plan from changed layers:
   - `cap/db/**/*.cds`
   - `cap/srv/*-service.cds`
   - `cap/srv/*-fiori.cds`
   - `cap/srv/**/*.js`
2. If CDS/CAP API behavior is discussed, use cds-mcp for definitions/docs before reasoning about expected behavior.
3. Run practical checks when possible; distinguish executed checks vs. proposed-only checks.
4. Include edge/negative checks and compatibility concerns.
5. Highlight generated artifact implications (`cap/types`, `gen/*`) when CDS changed.

Output structure (strict):

## PR Validation Report

### Change Scope
- Bullet list of impacted areas and likely blast radius.

### Checks Executed
| Check | Command/Method | Result | Evidence |
|---|---|---|---|
| ... | ... | pass/fail/blocked | short note |

### Checks Not Executed
| Check | Why skipped | Recommended owner/time |
|---|---|---|

### Risk Matrix
| Risk | Likelihood (Low/Med/High) | Impact (Low/Med/High) | Mitigation |
|---|---|---|---|

### Backward Compatibility Notes
- Contracts, events, annotations, migrations, and profile-specific concerns.

### Recommendation
- **Go / No-Go / Go with follow-ups**
- Clear rationale in 2-4 bullets.

### Follow-ups
- Actionable next steps with owner suggestions.

Quality bar:
- Be explicit about unknowns.
- Never claim checks were run unless results are available.
- Keep it short enough for PR reviewers to consume quickly.
