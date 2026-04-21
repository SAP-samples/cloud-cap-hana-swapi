# Tutorial Guided Execution — Agent-Driven via MCP

**Date:** 2026-04-21
**Status:** Design
**Scope:** Phase 2 of tutorial content feature (sap-devs-cli)

## Summary

Add four MCP tools that let an AI agent (Claude Code, Cursor, etc.) guide a user through an SAP tutorial step-by-step. The MCP server provides tutorial step content with lightweight annotations and persists progress. The AI agent acts as the instructor — it reads steps, explains them, offers to execute commands, creates files, verifies results, and advances through the tutorial at the user's pace.

The MCP server is stateless (no session management). The agent drives the flow.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Who drives the interaction? | AI agent via MCP tools | Agents already have shell access, file tools, and conversational ability. The MCP server just provides content and bookkeeping. |
| Step content format | Raw markdown + annotations | Agent gets full prose for natural language understanding, plus structured hints for actionable items (commands, file creates, verifications). |
| Annotation strategy | Heuristic parsing at serve time | Scales to all ~1,200 tutorials with zero manual work. Conservative heuristics — better to miss than mis-classify. Agent compensates from raw markdown. |
| Progress management | Agent-managed flow, server stores progress | Agent decides when to advance/revisit; server persists completed steps. Shared state with existing TUI (`tutorial show -i`). |
| Tool granularity | Multiple focused tools | Four tools, each with a single responsibility. Easier for agents to discover and use correctly. |

## MCP Tools

### 1. `get_tutorial_step`

Fetches a single step from a tutorial with content, annotations, and progress snapshot. Always loads the full `Tutorial` object (from cache or GitHub on demand) so that step content, `you_will_learn`, and total step count are available. First call for an uncached tutorial triggers a GitHub fetch, which may take a few seconds.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `slug` | string | yes | — | Tutorial slug (e.g., `cap-getting-started`) |
| `step` | int | no | 1 | Step number (1-indexed) |
| `track` | bool | no | true | If true, creates/updates progress entry. Set to false to preview a step without starting the tutorial. |

**Returns:**

```json
{
  "slug": "cap-getting-started",
  "title": "Create a CAP Project",
  "step": {
    "number": 2,
    "title": "Initialize the project",
    "content": "## Initialize the project\n\nRun the following command to create a new CAP project:\n\n```bash\ncds init bookshop\n```\n\nThis creates a new directory `bookshop` with the standard CAP project structure.\n\nVerify the project was created:\n\n```bash\nls bookshop/package.json\n```\n\nYou should see `bookshop/package.json` in the output.",
    "annotations": {
      "commands": [
        {
          "command": "cds init bookshop",
          "description": "Create a new CAP project called bookshop"
        }
      ],
      "file_creates": [],
      "verifications": [
        {
          "command": "ls bookshop/package.json",
          "expect_output": "bookshop/package.json",
          "description": "Verify the project was created"
        }
      ]
    }
  },
  "total_steps": 8,
  "you_will_learn": ["How to create a CAP project", "How to define a data model"],
  "progress": {
    "completed_steps": [1],
    "current_step": 2,
    "started_at": "2026-04-21T10:00:00Z",
    "last_accessed": "2026-04-21T10:05:00Z"
  }
}
```

**Side effects (when `track=true`, the default):**
- Creates progress entry if none exists (`started_at = now`)
- Updates `current_step` and `last_accessed` on every call

**When `track=false`:** no progress side effects. The `progress` field in the response still reflects any existing progress (or is omitted if none exists), but nothing is written.

**Error cases:**
- Tutorial slug not found in index → error with suggestion to use `search_tutorials`
- Step number out of range → error with valid range (1..total_steps)
- Tutorial content fetch fails (GitHub down, rate-limited) → error with retry hint; `you_will_learn` will be empty

### 2. `update_tutorial_progress`

Records step completion. Called by the agent after it believes a step is done.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `slug` | string | yes | — | Tutorial slug |
| `completed_steps` | int[] | yes | — | Step numbers to mark completed |
| `current_step` | int | no | — | Where the user is now (if omitted, set to max completed + 1) |

**Returns:**

```json
{
  "slug": "cap-getting-started",
  "progress": {
    "completed_steps": [1, 2],
    "current_step": 3,
    "total_steps": 8,
    "started_at": "2026-04-21T10:00:00Z",
    "last_accessed": "2026-04-21T10:12:00Z"
  }
}
```

**Behavior:**
- Merges new completed steps into existing list (idempotent, no duplicates)
- Rejects step numbers outside valid range (1..total_steps) with an error
- Sets `completed_at` when `len(completed_steps) == total_steps`
- Creates progress entry if none exists

### 3. `get_tutorial_progress`

Checks progress on a specific tutorial or all tutorials with saved progress (including completed ones). For only incomplete tutorials, use `list_active_tutorials` instead.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `slug` | string | no | — | If provided, returns progress for that tutorial only. If omitted, returns all tutorials with saved progress. |

**Returns (single):**

```json
{
  "slug": "cap-getting-started",
  "title": "Create a CAP Project",
  "progress": {
    "completed_steps": [1, 2, 3],
    "current_step": 4,
    "total_steps": 8,
    "started_at": "2026-04-21T10:00:00Z",
    "last_accessed": "2026-04-21T11:30:00Z"
  }
}
```

**Returns (all):** array of the above, sorted by `last_accessed` descending.

### 4. `list_active_tutorials`

Lists tutorials with in-progress state — enables "resume where you left off" flows.

**Parameters:**

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `limit` | int | no | 10 | Maximum results (max 50) |

**Returns:**

```json
{
  "count": 2,
  "total": 2,
  "results": [
    {
      "slug": "cap-getting-started",
      "title": "Create a CAP Project",
      "completed_steps": [1, 2, 3],
      "total_steps": 8,
      "last_accessed": "2026-04-21T11:30:00Z"
    },
    {
      "slug": "hana-cloud-cap-create-project",
      "title": "Deploy CAP to HANA Cloud",
      "completed_steps": [1],
      "total_steps": 6,
      "last_accessed": "2026-04-20T14:00:00Z"
    }
  ]
}
```

**Filter:** Only returns tutorials where `completed_at == nil` (not yet finished).

## Annotation Engine

### Location

New file: `internal/tutorials/annotate.go`

Pure function: `AnnotateStep(stepContent string) StepAnnotations`

### Types

```go
type StepAnnotations struct {
    Commands      []CommandAnnotation      `json:"commands,omitempty"`
    FileCreates   []FileCreateAnnotation   `json:"file_creates,omitempty"`
    Verifications []VerificationAnnotation `json:"verifications,omitempty"`
}

type CommandAnnotation struct {
    Command     string `json:"command"`
    Description string `json:"description,omitempty"`
    WorkingDir  string `json:"working_dir,omitempty"`
}

type FileCreateAnnotation struct {
    Filename string `json:"filename"`
    Language string `json:"language"`
    Content  string `json:"content"`
}

type VerificationAnnotation struct {
    Command      string `json:"command,omitempty"`
    ExpectOutput string `json:"expect_output,omitempty"`
    Description  string `json:"description,omitempty"`
}
```

### Heuristic Rules

**Commands** — fenced code blocks with `bash`, `sh`, or no language tag:
- Skip blocks preceded by output/result language: "output", "result", "you should see", "returns", "prints", "logs", "response"
- Skip blocks containing only comments (`#` lines) or blank lines
- Multi-line blocks: each non-comment, non-blank line is a separate command
- Extract description from the immediately preceding paragraph (first sentence)
- Detect working directory from "cd X" commands or "in the X directory" language

**File creates** — fenced code blocks with a language tag (`json`, `yaml`, `cds`, `xml`, `js`, `ts`, `java`, `html`, `css`, `sql`, `properties`, `toml`):
- Preceding text must match file-creation patterns: "create", "add the following to", "open", "edit", "paste into", "replace the content of", "update", "modify" followed by a backtick-quoted or quoted filename
- Extract filename via regex: `` `path/to/file.ext` `` or `"path/to/file.ext"`
- If no filename extractable → classify as informational (skip annotation)

**Verifications** — fenced code blocks (any language) preceded by verification language:
- Trigger words: "verify", "check", "you should see", "the output should", "confirm", "make sure", "expected output", "the result"
- These are expected output, not commands to run
- If a command annotation exists within the previous 2 blocks, link the verification to it conceptually via description

**Fallback** — code blocks not matching any category are ignored (not annotated). The agent has the raw markdown.

### Conservatism Principle

The heuristics are deliberately conservative. A missed annotation means the agent falls back to reading the raw markdown (which it always has). A false positive (e.g., annotating example output as a command) could cause the agent to execute something it shouldn't. Better to under-annotate.

## Progress Model

### Storage

Reuses the existing `TutorialProgress` struct and `tutorial-progress.json` file in the XDG data directory (`DataDir`). No schema changes needed.

- **Linux:** `~/.local/share/sap-devs/tutorial-progress.json`
- **macOS:** `~/Library/Application Support/sap-devs/data/tutorial-progress.json`
- **Windows:** `%LOCALAPPDATA%/sap-devs/data/tutorial-progress.json`

Format: `map[string]TutorialProgress` keyed by slug.

### New Batch Merge Function

The existing `UpdateProgress()` in `progress.go` marks one step at a time. The `update_tutorial_progress` MCP tool accepts a slice of completed steps. A new function is needed:

```go
func MergeCompletedSteps(dataDir, slug string, completedSteps []int, currentStep, totalSteps int) (*TutorialProgress, error)
```

This performs a single read-modify-write: loads existing progress, merges the new completed steps (deduplicates, validates range 1..totalSteps), updates `current_step` and `last_accessed`, sets `completed_at` if all steps done, and saves.

### Shared State

The existing `tutorial show -i` TUI reads and writes the same file. Progress is interchangeable:
- Start a tutorial via AI agent → resume in TUI
- Start in TUI → resume via AI agent

### Concurrency

The existing `LoadProgress`/`SaveProgress` functions in `internal/tutorials/progress.go` use file-level read-modify-write. This is sufficient — only one process (the MCP server) writes at a time for a given user session.

## On-Demand Tutorial Fetch

`get_tutorial_step` needs to load the full `Tutorial` object (not just the index `TutorialMeta`). If the tutorial content is already cached at `<CacheDir>/tutorials/content/<slug>.json`, it is loaded directly. Otherwise, the handler fetches it from GitHub on demand.

### GitHub Token Resolution

The handler reads the GitHub token from environment variables (`GITHUB_TOKEN`, `GH_TOKEN`) using the existing `credentials.Resolve()` function. No new `Deps` field is needed — the credentials package already checks env vars and the keychain. Anonymous access works for public repos but is rate-limited (60 req/hr); authenticated access gets 5,000 req/hr.

### Repo Branch Resolution

To fetch a tutorial, the handler needs the repo name and default branch. These come from:
1. The `TutorialMeta.Repo` field (already in the index) — identifies which repo the tutorial belongs to
2. The `RepoInfo` cache at `<CacheDir>/tutorials/repos.json` — maps repo name to default branch and tree SHA

The handler loads `RepoInfo` from cache (already populated by `sap-devs sync`). If the cache is missing (user never synced), the handler falls back to fetching repo metadata from GitHub.

### Caching

After fetching, the full `Tutorial` object is cached to `<CacheDir>/tutorials/content/<slug>.json` using the existing `tutorials.SaveContent()` function. Subsequent calls are instant.

## Agent Interaction Patterns

### Starting a Tutorial

```
Agent: search_tutorials("CAP getting started")
       → finds slug "cap-getting-started"

Agent: get_tutorial_step("cap-getting-started", step=1)
       → step 1 content + annotations + fresh progress

Agent to user: "Let's work through this together. Step 1 is about
setting up your dev environment. I see you'll need to install the
CAP development kit. Want me to run `npm i -g @sap/cds-dk`?"
```

### Advancing Through Steps

```
// User and agent work through step content
// Agent executes annotated commands, creates files, checks verifications

Agent: update_tutorial_progress("cap-getting-started", completed_steps=[1])
Agent: get_tutorial_step("cap-getting-started", step=2)
       → step 2 content + annotations + progress showing step 1 done
```

### Resuming

```
Agent: list_active_tutorials()
       → cap-getting-started: 3/8 done, last accessed 2h ago

Agent to user: "You're partway through CAP Getting Started — 3 of 8
steps done. Want to pick up at Step 4?"

Agent: get_tutorial_step("cap-getting-started", step=4)
```

### Handling Failures

The agent uses its own capabilities:
- Reads error output from failed commands
- Calls `get_known_errors` (existing MCP tool) for SAP-specific diagnosis
- Suggests fixes, retries commands
- Can skip or revisit steps — flow is entirely agent-controlled

### Completion

When all steps are done, `update_tutorial_progress` sets `completed_at`. The agent can:
- Congratulate the user
- Suggest related tutorials via `search_tutorials`
- Recommend learning journeys via `search_learning_journeys`

## File Changes

### New Files

| File | Purpose |
|------|---------|
| `internal/tutorials/annotate.go` | `AnnotateStep()` — heuristic markdown annotation engine |
| `internal/tutorials/annotate_test.go` | Tests for annotation heuristics with real tutorial markdown samples |
| `internal/mcpserver/tools_tutorial_exec.go` | MCP tool handlers: `get_tutorial_step`, `update_tutorial_progress`, `get_tutorial_progress`, `list_active_tutorials` |
| `internal/mcpserver/tools_tutorial_exec_test.go` | Tests for tutorial execution MCP handlers |

### Modified Files

| File | Change |
|------|--------|
| `internal/mcpserver/server.go` | Add `registerTutorialExecTools(s, deps)` call in `NewServer()`; extend `WithInstructions()` string with usage hints for the 4 new tools |
| `internal/mcpserver/server.go` (Deps) | Add `DataDir string` field to `Deps` struct |
| `cmd/mcp_serve.go` | Pass `paths.DataDir` when constructing `Deps` |
| `internal/tutorials/progress.go` | Add `MergeCompletedSteps()` function for batch step completion |
| `CLAUDE.md` | Update MCP tool count (26 → 30) and add tool descriptions |
| `TODO.md` | Mark Phase 2 items as done |

### Unchanged

| File | Why |
|------|-----|
| `internal/tutorials/types.go` | `TutorialProgress` struct already covers all needed fields |
| `internal/tutorials/parser.go` | Step parsing is already complete |
| `internal/tutorials/client.go` | Content fetching is already complete |

## Out of Scope

- **Agent system prompt injection** — injecting "user is on step 3" into `inject` output is a separate feature
- **Command execution in MCP server** — the agent uses its own shell tools
- **Embedded AI instructor** (Phase 3) — separate concern, different architecture
- **Tutorial-specific prompting guidance** — could add a `get_tutorial_guide_prompt` tool later
- **Manual annotation overrides** — heuristics only for now; override YAML could be added later if needed

## MCP Server System Prompt Update

The MCP server's tool descriptions (used in `.mcp.json` and adapter instructions) should be updated to include guidance for agents:

```
Use `get_tutorial_step` to guide users through SAP tutorials step-by-step.
Use `list_active_tutorials` to check for tutorials the user can resume.
Use `update_tutorial_progress` after completing each step.
Use `get_tutorial_progress` to check detailed progress on a specific tutorial.
```

## Testing Strategy

### Annotation Engine (`annotate_test.go`)

Test with real tutorial markdown samples covering:
- Simple bash command extraction
- Multi-line command blocks
- File creation detection (with filename extraction)
- Verification block detection
- Output blocks correctly skipped (not classified as commands)
- Mixed content with all annotation types
- Edge cases: empty steps, steps with no code blocks, steps with only text

### MCP Handlers (`tools_tutorial_exec_test.go`)

- `get_tutorial_step`: valid slug + step, invalid slug, out-of-range step, auto-fetch from GitHub
- `update_tutorial_progress`: create new progress, merge steps (idempotent), completion detection
- `get_tutorial_progress`: single tutorial, all tutorials, no progress
- `list_active_tutorials`: filters out completed, sorts by last_accessed, respects limit
