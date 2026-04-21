# Tutorial Instructor Skill Design (Phase 2+)

## Goal

Enhance the Phase 2 tutorial guided execution MCP tools with a Claude Code skill, targeted MCP tool improvements, and better discoverability — delivering the Phase 3 "AI Agent as Instructor" vision without building a custom embedded agent.

## Context

Phase 2 (shipped April 2026) added four MCP tools (`get_tutorial_step`, `update_tutorial_progress`, `get_tutorial_progress`, `list_active_tutorials`) and a heuristic annotation engine to `sap-devs mcp serve`. An AI agent connected to this MCP server can already guide users through SAP tutorials step-by-step.

Phase 3 was originally envisioned as an embedded Claude API agent inside the CLI. Analysis (documented in `docs/mcp-server.md § Tutorial Guided Execution — Phase 3 Analysis`) concluded that the standalone agent adds significant complexity (API dependency, provider lock-in, duplicated runtime) while the host AI tool (Claude Code, Cursor) already provides the agent runtime, shell execution, output observation, and streaming UI.

This spec defines the lighter "Phase 2+" approach: a skill that teaches the agent how to be a tutorial instructor, plus MCP tool enhancements that close the remaining capability gaps.

## Design

### 1. Enhanced MCP Server Instructions

Update the `WithInstructions` string in `internal/mcpserver/server.go` to include tutorial-specific behavioral guidance:

- Call `list_active_tutorials` at session start to surface resume opportunities
- When `check_project` detects a project type and the user asks for learning help, search tutorials filtered by the detected technology
- After completing a tutorial, suggest related tutorials via profile-matched recommendations
- When a tutorial command fails, check `get_known_errors` before debugging from scratch

This is a text-only change — no new code, just more prescriptive instructions for connected agents.

### 2. MCP Tool Enhancements

#### 2a. `search_tutorials` — expose level and duration

Add `level` and `time` (duration in minutes) to the search result JSON. These fields already exist in `TutorialMeta` but are not included in the MCP tool's response. Enables agents to say "here's a 20-minute beginner tutorial."

**Files:** `internal/mcpserver/tools_learn.go`

#### 2b. `get_tutorial_step` — add navigation and metadata

Add to the `stepResult` response:
- `prev_step_title` (nullable string) — title of the previous step, or null for step 1
- `next_step_title` (nullable string) — title of the next step, or null for the last step
- `level` — tutorial difficulty level
- `time` — estimated duration in minutes

Data is already loaded (all steps are in memory). Enables smoother transitions: "Next up: *Deploy to Cloud Foundry*."

**Files:** `internal/mcpserver/tools_tutorial_exec.go`

#### 2c. New tool: `recommend_tutorials`

Returns profile-matched tutorial suggestions plus any in-progress tutorials in a single call. No search query needed — the tool uses the active profile's `TutorialRefs` (with `featured: true`) for recommendations.

**Parameters:** `limit` (optional, default 5, max 20)

**Response:**
```json
{
  "active_tutorials": [
    {
      "slug": "cp-apm-nodejs-create-service",
      "title": "Create a CAP Business Service with Node.js",
      "current_step": 4,
      "total_steps": 10,
      "last_accessed": "2026-04-21T14:30:00Z"
    }
  ],
  "recommended": [
    {
      "slug": "build-cap-app",
      "title": "Build a CAP Application",
      "level": "beginner",
      "time": 30,
      "reason": "Featured for CAP Developer profile"
    }
  ]
}
```

Active tutorials always appear first — resume is the highest-priority action.

**Files:** Create `internal/mcpserver/tools_tutorial_recommend.go` (or add to `tools_tutorial_exec.go`)

#### 2d. Annotation enhancements

- Tag verification annotations with confidence level (`high` when explicit "you should see" text is present, `low` when inferred from context)
- Extract `prerequisite_tools` from step 1 content by matching patterns like "make sure you have X installed"

**Files:** `internal/tutorials/annotate.go`

### 3. Claude Code Skill: `/tutorial`

A skill file that orchestrates the MCP tools with pedagogical awareness. This is the core of the instructor experience.

**Location:** Distributed as a Claude Code skill (either via the sap-devs plugin or as a standalone skill file installable via `sap-devs inject`).

**Invocation:** `/tutorial` (no arguments) or `/tutorial <query>` (search and start)

#### Skill flow

```
1. DISCOVERY
   - Call list_active_tutorials
   - If active tutorials exist: present them first ("You have 2 in progress — resume?")
   - If query provided: call search_tutorials
   - If no query: call recommend_tutorials for profile-matched suggestions
   - Present numbered list with level, duration, progress

2. STEP EXECUTION LOOP (per step)
   a. Fetch step via get_tutorial_step
   b. Read annotations to understand step structure
   c. BEFORE COMMANDS: Explain what the command does and why
      - Use get_context for relevant pack if needed
      - Calibrate depth to user profile (beginner: explain everything; intermediate+: focus on "why")
   d. COMMANDS: Present each command, offer to run it
      - Never run without showing first and getting confirmation
      - After running, observe output
   e. FILE CREATES: Show file content, explain purpose, offer to create in project directory
   f. VERIFICATIONS: Compare observed output against expected
      - If output diverges: diagnose using get_known_errors, then reason about the difference
      - Don't just say "it failed" — explain what went wrong and suggest fixes
   g. Mark complete: call update_tutorial_progress

3. BETWEEN STEPS
   - Brief transition using next_step_title: "Step 3 done. Next: Deploy to Cloud Foundry — ready?"
   - If user asks a question mid-step: answer using get_context, then resume

4. COMPLETION
   - Summarize what was learned (reference you_will_learn from step 1)
   - Call recommend_tutorials for related tutorials
   - Congratulate and suggest next steps
```

#### Teaching behaviors

- **Profile-aware depth:** For beginner tutorials with a beginner user, explain every concept. For intermediate+ users or topics they know, focus on the "why" not the "what."
- **Error recovery:** When a command fails, first check `get_known_errors`. If no match, analyze the error output and suggest fixes. Don't just re-run.
- **Mid-step questions:** If the user asks "what does this flag do?" or "why are we using CAP here?", answer using `get_context` and pack knowledge, then resume the step.
- **Comprehension checks:** After key concept steps, ask a brief question to verify understanding. Generate this from the step content — don't rely on external verification files.
- **Prerequisite awareness:** On step 1, check if the user has required tools installed (via `check_tools` if prerequisites mention specific tools).

### 4. Tutorial Discoverability

Three improvements to make tutorials easier to find and resume:

#### 4a. Proactive resume prompting (server instructions)

Add to MCP server instructions: "When starting a session, call `list_active_tutorials`. If any exist, mention them briefly."

This is a text change in `server.go` — zero code.

#### 4b. Context-aware suggestions (server instructions)

Add to MCP server instructions: "When `check_project` detects a project type and the user asks for help learning, call `search_tutorials` filtered by the detected technology."

The agent already has both tools — it just needs to be told to connect them.

#### 4c. `recommend_tutorials` tool (Section 2c)

The new tool provides one-call access to "what should I learn?" — combining active tutorials with profile-matched recommendations.

## What this does NOT include

| Excluded item | Reason |
|---------------|--------|
| Embedded Claude API agent | Claude Code IS the agent runtime; duplicating it adds complexity without proportional benefit |
| `ANTHROPIC_API_KEY` dependency | Locks to one provider; contradicts MCP-agnostic design |
| Custom shell output capture | Claude Code already captures Bash output natively |
| Session state persistence | Tutorial progress MCP tools handle this |
| Streaming terminal UI | Claude Code provides this |
| `.vr` file integration | Files are in private repos and only ~2 tutorials have them; agent generates better comprehension checks from step content |

## Architecture impact

- **MCP server:** 1 new tool (`recommend_tutorials`), 2 modified tools, updated instructions — all in existing file structure
- **Annotation engine:** Minor enhancement (confidence tagging, prerequisite extraction) — existing file
- **Skill file:** New file, no Go code — distributed via plugin or inject
- **No new dependencies, no API keys, no new binaries**

## Testing

- Annotation enhancements: unit tests in `annotate_test.go`
- `recommend_tutorials` tool: handler tests following existing pattern in `tools_tutorial_exec_test.go`
- Modified tool responses: update existing tests to verify new fields
- Skill behavior: manual testing via Claude Code with the sap-devs MCP server connected
- Integration: `go build ./...` + `go vet ./...` locally; `go test ./...` in CI

## Success criteria

1. A user can say `/tutorial` and immediately see their in-progress tutorials plus recommendations
2. The agent guides through a tutorial with explanations, command execution, and verification
3. If a command fails, the agent diagnoses rather than just reporting failure
4. The experience works with any MCP-compatible AI tool, not just Claude Code
5. No API keys or external service dependencies beyond what Phase 2 already requires
