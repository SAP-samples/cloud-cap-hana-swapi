# Tutorial Instructor Skill (Phase 2+) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enhance the Phase 2 tutorial MCP tools with better metadata, a `recommend_tutorials` tool, annotation confidence tagging, a Claude Code `/tutorial` skill, and improved server instructions for discoverability.

**Architecture:** Five independent changes: (1) enrich `search_tutorials` response with level/duration, (2) add navigation metadata to `get_tutorial_step`, (3) new `recommend_tutorials` tool combining active + featured tutorials, (4) annotation confidence tagging, (5) `/tutorial` skill file + updated server instructions. All Go changes follow existing patterns in `internal/mcpserver/` and `internal/tutorials/`.

**Tech Stack:** Go, mcp-go (mark3labs/mcp-go), Claude Code skill markdown

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `internal/mcpserver/tools_learn.go` | Modify | Add `Level` and `Time` to `tutorialResult` struct |
| `internal/mcpserver/tools_learn_test.go` | Modify | Verify new fields in search results |
| `internal/mcpserver/tools_tutorial_exec.go` | Modify | Add `PrevStepTitle`, `NextStepTitle`, `Level`, `Time` to `stepResult` |
| `internal/mcpserver/tools_tutorial_exec_test.go` | Modify | Verify new fields in step results |
| `internal/mcpserver/tools_tutorial_recommend.go` | Create | New `recommend_tutorials` tool handler + types |
| `internal/mcpserver/tools_tutorial_recommend_test.go` | Create | Tests for recommend tool |
| `internal/mcpserver/server.go` | Modify | Register `recommend_tutorials`, update `WithInstructions` |
| `internal/tutorials/annotate.go` | Modify | Add `Confidence` field to `VerificationAnnotation` |
| `internal/tutorials/annotate_test.go` | Modify | Test confidence tagging |
| `.claude/skills/tutorial/SKILL.md` | Create | `/tutorial` skill for guided tutorial execution |
| `docs/mcp-server.md` | Modify | Add `recommend_tutorials` to tool table, update tool count to 31 |
| `CLAUDE.md` | Modify | Update tool count from 30 to 31 |

---

### Task 1: Enrich `search_tutorials` with level and duration

Add `Level` and `Time` fields to the `tutorialResult` struct in `tools_learn.go`. These fields already exist on `TutorialMeta` but are not exposed in the MCP response.

**Files:**
- Modify: `internal/mcpserver/tools_learn.go:42-48` (tutorialResult struct)
- Modify: `internal/mcpserver/tools_learn.go:68-74` (field mapping)
- Test: `internal/mcpserver/tools_learn_test.go`

- [ ] **Step 1: Write the failing test**

Add a test that verifies `search_tutorials` returns `level` and `time` fields. The existing tests use **direct handler invocation** (not a `callTool` helper): `handler := searchTutorialsHandler(deps)` then `handler(context.Background(), req)`. Follow this pattern.

```go
func TestSearchTutorials_IncludesLevelAndTime(t *testing.T) {
	deps := Deps{
		TutorialIndex: []tutorials.TutorialMeta{
			{Slug: "cap-getting-started", Title: "Getting Started with CAP", Description: "Learn CAP basics",
				URL: "https://developers.sap.com/tutorials/cap-getting-started.html", Tags: []string{"cap"},
				Level: "beginner", Time: 30},
		},
	}
	handler := searchTutorialsHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"query": "CAP"}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	env := unmarshalEnvelope(t, result)
	items := env.resultSlice(t)
	require.Len(t, items, 1)
	assert.Equal(t, "beginner", items[0]["level"])
	assert.Equal(t, float64(30), items[0]["time"])
}
```

> **Note:** The existing `TestSearchTutorials` in `tools_learn_test.go` constructs `Deps{TutorialIndex: ...}` inline and calls `searchTutorialsHandler(deps)` directly. Follow the same pattern. `unmarshalEnvelope` and `resultSlice` are existing test helpers.

- [ ] **Step 2: Run test to verify it fails**

Run: `go build ./... && go vet ./...`
Expected: Build fails or test would fail (missing fields in response)

- [ ] **Step 3: Add Level and Time to tutorialResult**

In `internal/mcpserver/tools_learn.go`, add two fields to the `tutorialResult` struct:

```go
type tutorialResult struct {
	Slug        string   `json:"slug"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	URL         string   `json:"url"`
	Tags        []string `json:"tags"`
	Level       string   `json:"level,omitempty"`
	Time        int      `json:"time,omitempty"`
}
```

Then in the handler where `tutorialResult` is constructed from `TutorialMeta`, add:

```go
Level: m.Level,
Time:  m.Time,
```

- [ ] **Step 4: Verify build passes**

Run: `go build ./... && go vet ./...`
Expected: Clean build

- [ ] **Step 5: Commit**

```bash
git add internal/mcpserver/tools_learn.go internal/mcpserver/tools_learn_test.go
git commit -m "feat: expose level and duration in search_tutorials MCP tool"
```

---

### Task 2: Add navigation metadata to `get_tutorial_step`

Add `PrevStepTitle`, `NextStepTitle`, `Level`, and `Time` to the `stepResult` struct so agents can provide smoother step transitions and tutorial context.

**Files:**
- Modify: `internal/mcpserver/tools_tutorial_exec.go:54-61` (stepResult struct), handler at line ~120-130
- Test: `internal/mcpserver/tools_tutorial_exec_test.go`

- [ ] **Step 1: Write the failing test**

Add a test that verifies the new fields appear in the `get_tutorial_step` response. The existing `tutorialExecDeps` helper creates a 2-step tutorial — step 1 should have no `prev_step_title` and step 2 should have `prev_step_title: "Set up"`. Tests use **direct handler invocation**: `handler := getTutorialStepHandler(deps)` then `handler(context.Background(), req)`.

```go
func TestGetTutorialStep_NavigationMetadata(t *testing.T) {
	deps := tutorialExecDeps(t)
	// Add Level and Time to the fixture's TutorialMeta
	deps.TutorialIndex[0].Level = "beginner"
	deps.TutorialIndex[0].Time = 20

	handler := getTutorialStepHandler(deps)

	// Step 1: no prev, has next
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(1), "track": false}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	var sr map[string]any
	require.NoError(t, json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &sr))

	assert.Nil(t, sr["prev_step_title"])
	assert.Equal(t, "Init project", sr["next_step_title"])
	assert.Equal(t, "beginner", sr["level"])
	assert.Equal(t, float64(20), sr["time"])

	// Step 2: has prev, no next
	req2 := mcp.CallToolRequest{}
	req2.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(2), "track": false}
	result2, _ := handler(context.Background(), req2)

	var sr2 map[string]any
	json.Unmarshal([]byte(result2.Content[0].(mcp.TextContent).Text), &sr2)

	assert.Equal(t, "Set up", sr2["prev_step_title"])
	assert.Nil(t, sr2["next_step_title"])
}
```

- [ ] **Step 2: Run build to verify test would fail**

Run: `go build ./... && go vet ./...`

- [ ] **Step 3: Add fields to stepResult and populate in handler**

In `internal/mcpserver/tools_tutorial_exec.go`, update the `stepResult` struct:

```go
type stepResult struct {
	Slug          string            `json:"slug"`
	Title         string            `json:"title"`
	Step          stepContent       `json:"step"`
	TotalSteps    int               `json:"total_steps"`
	YouWillLearn  []string          `json:"you_will_learn,omitempty"`
	Progress      *progressSnapshot `json:"progress,omitempty"`
	PrevStepTitle *string           `json:"prev_step_title"`
	NextStepTitle *string           `json:"next_step_title"`
	Level         string            `json:"level,omitempty"`
	Time          int               `json:"time,omitempty"`
}
```

In `getTutorialStepHandler`, after the step is loaded (around line 120), populate the new fields:

```go
var prevTitle, nextTitle *string
if stepNum > 1 {
	t := tut.Steps[stepNum-2].Title
	prevTitle = &t
}
if stepNum < len(tut.Steps) {
	t := tut.Steps[stepNum].Title
	nextTitle = &t
}

result := stepResult{
	Slug:          slug,
	Title:         tut.Title,
	Step:          stepContent{...},
	TotalSteps:    len(tut.Steps),
	YouWillLearn:  tut.YouWillLearn,
	Progress:      ps,
	PrevStepTitle: prevTitle,
	NextStepTitle: nextTitle,
	Level:         meta.Level,
	Time:          meta.Time,
}
```

> **Note:** `meta` is the `*TutorialMeta` returned by `FindBySlug` — it has `Level` and `Time`. Use `*string` for prev/next so they serialize as `null` (not `""`) when absent.

- [ ] **Step 4: Verify build passes**

Run: `go build ./... && go vet ./...`

- [ ] **Step 5: Commit**

```bash
git add internal/mcpserver/tools_tutorial_exec.go internal/mcpserver/tools_tutorial_exec_test.go
git commit -m "feat: add navigation metadata to get_tutorial_step MCP tool"
```

---

### Task 3: New `recommend_tutorials` tool

Create a new MCP tool that returns active (in-progress) tutorials and profile-matched featured tutorial recommendations in a single call. This powers the `/tutorial` skill's discovery phase.

**Files:**
- Create: `internal/mcpserver/tools_tutorial_recommend.go`
- Create: `internal/mcpserver/tools_tutorial_recommend_test.go`
- Modify: `internal/mcpserver/server.go` (register tool)

- [ ] **Step 1: Write the failing test**

Create `internal/mcpserver/tools_tutorial_recommend_test.go`:

```go
package mcpserver

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/SAP-samples/sap-devs-cli/internal/content"
	"github.com/SAP-samples/sap-devs-cli/internal/tutorials"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func recommendDeps(t *testing.T) Deps {
	t.Helper()
	dataDir := t.TempDir()
	cacheDir := t.TempDir()

	tut := &tutorials.Tutorial{
		TutorialMeta: tutorials.TutorialMeta{
			Slug:  "cap-getting-started",
			Title: "Getting Started with CAP",
			Level: "beginner",
			Time:  20,
			Repo:  "Tutorials-en",
		},
		Steps: []tutorials.TutorialStep{
			{Number: 1, Title: "Setup", Content: "step 1"},
			{Number: 2, Title: "Code", Content: "step 2"},
		},
	}
	require.NoError(t, tutorials.SaveContent(cacheDir, tut))

	packs := []*content.Pack{{
		ID:   "cap",
		Name: "CAP",
		TutorialRefs: []content.TutorialRef{
			{Slug: "cap-getting-started", Featured: true, PackID: "cap"},
			{Slug: "cap-deploy-cf", Featured: false, PackID: "cap"},
		},
	}}

	return Deps{
		TutorialIndex: []tutorials.TutorialMeta{tut.TutorialMeta},
		Packs:         packs,
		CacheDir:      cacheDir,
		DataDir:       dataDir,
	}
}

func TestRecommendTutorials_FeaturedOnly(t *testing.T) {
	deps := recommendDeps(t)
	handler := recommendTutorialsHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	require.False(t, result.IsError)

	var resp recommendResult
	require.NoError(t, json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp))

	assert.Empty(t, resp.ActiveTutorials)
	require.Len(t, resp.Recommended, 1)
	assert.Equal(t, "cap-getting-started", resp.Recommended[0].Slug)
	assert.Equal(t, "beginner", resp.Recommended[0].Level)
}

func TestRecommendTutorials_ActiveFirst(t *testing.T) {
	deps := recommendDeps(t)
	handler := recommendTutorialsHandler(deps)

	// Create in-progress tutorial
	tutorials.UpdateProgress(deps.DataDir, "cap-getting-started", 1, 2, false)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	var resp recommendResult
	json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp)

	require.Len(t, resp.ActiveTutorials, 1)
	assert.Equal(t, "cap-getting-started", resp.ActiveTutorials[0].Slug)
	assert.Equal(t, 1, resp.ActiveTutorials[0].CurrentStep)
}

func TestRecommendTutorials_NoPacks(t *testing.T) {
	deps := recommendDeps(t)
	deps.Packs = nil
	handler := recommendTutorialsHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	require.False(t, result.IsError)

	var resp recommendResult
	json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp)

	assert.Empty(t, resp.Recommended)
}
```

- [ ] **Step 2: Run build to verify failure**

Run: `go build ./... && go vet ./...`
Expected: Fails — `recommend_tutorials` tool not registered, types not defined

- [ ] **Step 3: Implement `tools_tutorial_recommend.go`**

> **Note:** This tool intentionally uses a non-envelope response format (`{active_tutorials: [], recommended: []}`) rather than the `resultEnvelope` used by `search_tutorials`. The spec defines this distinct shape because the tool returns two different categories of data. This is by design, not an oversight.

Create `internal/mcpserver/tools_tutorial_recommend.go`:

```go
package mcpserver

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"

	"github.com/SAP-samples/sap-devs-cli/internal/content"
	"github.com/SAP-samples/sap-devs-cli/internal/tutorials"
	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
)

func registerTutorialRecommendTools(s *server.MCPServer, deps Deps) {
	s.AddTool(
		mcp.NewTool("recommend_tutorials",
			mcp.WithDescription("Get profile-matched tutorial recommendations plus any in-progress tutorials. Use when the user asks what to learn or starts a tutorial session without a specific query."),
			mcp.WithNumber("limit", mcp.Description("Maximum number of recommendations (default 5, max 20)")),
		),
		recommendTutorialsHandler(deps),
	)
}

type recommendResult struct {
	ActiveTutorials []activeTutorialItem    `json:"active_tutorials"`
	Recommended     []recommendedTutorialItem `json:"recommended"`
}

type activeTutorialItem struct {
	Slug         string `json:"slug"`
	Title        string `json:"title"`
	CurrentStep  int    `json:"current_step"`
	TotalSteps   int    `json:"total_steps"`
	LastAccessed string `json:"last_accessed"`
}

type recommendedTutorialItem struct {
	Slug   string `json:"slug"`
	Title  string `json:"title"`
	Level  string `json:"level,omitempty"`
	Time   int    `json:"time,omitempty"`
	Reason string `json:"reason,omitempty"`
}

func recommendTutorialsHandler(deps Deps) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		limit := clampLimit(req.GetInt("limit", 5), 5, 20)

		var active []activeTutorialItem
		all, err := tutorials.LoadProgress(deps.DataDir)
		if err == nil {
			for slug, p := range all {
				if p.CompletedAt != nil {
					continue
				}
				title := slug
				if m := tutorials.FindBySlug(deps.TutorialIndex, slug); m != nil {
					title = m.Title
				}
				active = append(active, activeTutorialItem{
					Slug:         slug,
					Title:        title,
					CurrentStep:  p.CurrentStep,
					TotalSteps:   p.TotalSteps,
					LastAccessed: p.LastAccessed.Format("2006-01-02T15:04:05Z"),
				})
			}
			sort.Slice(active, func(i, j int) bool {
				return active[i].LastAccessed > active[j].LastAccessed
			})
		}

		refs := content.FlattenTutorialRefs(deps.Packs)
		seen := make(map[string]bool)
		for _, a := range active {
			seen[a.Slug] = true
		}

		var recommended []recommendedTutorialItem
		for _, ref := range refs {
			if !ref.Featured || seen[ref.Slug] {
				continue
			}
			m := tutorials.FindBySlug(deps.TutorialIndex, ref.Slug)
			if m == nil {
				continue
			}
			packName := ref.PackID
			for _, p := range deps.Packs {
				if p.ID == ref.PackID {
					packName = p.Name
					break
				}
			}
			recommended = append(recommended, recommendedTutorialItem{
				Slug:   m.Slug,
				Title:  m.Title,
				Level:  m.Level,
				Time:   m.Time,
				Reason: fmt.Sprintf("Featured for %s", packName),
			})
			if len(recommended) >= limit {
				break
			}
		}

		result := recommendResult{
			ActiveTutorials: active,
			Recommended:     recommended,
		}
		if result.ActiveTutorials == nil {
			result.ActiveTutorials = []activeTutorialItem{}
		}
		if result.Recommended == nil {
			result.Recommended = []recommendedTutorialItem{}
		}

		b, _ := json.Marshal(result)
		return mcp.NewToolResultText(string(b)), nil
	}
}
```

- [ ] **Step 4: Register the tool in `server.go`**

In `internal/mcpserver/server.go`, add after the `registerTutorialExecTools` call:

```go
registerTutorialRecommendTools(s, deps)
```

Also add to the `WithInstructions` string:

```
Use recommend_tutorials when the user asks what to learn or starts a tutorial session.
```

- [ ] **Step 5: Verify build passes**

Run: `go build ./... && go vet ./...`

- [ ] **Step 6: Commit**

```bash
git add internal/mcpserver/tools_tutorial_recommend.go internal/mcpserver/tools_tutorial_recommend_test.go internal/mcpserver/server.go
git commit -m "feat: add recommend_tutorials MCP tool with active + featured tutorials"
```

---

### Task 4: Annotation confidence tagging and prerequisite extraction

Add a `Confidence` field to `VerificationAnnotation` so agents know how reliable each verification classification is. `"high"` when the preceding text explicitly contains output-signaling words; `"low"` for weaker signals. Also add `PrerequisiteTools` extraction to `StepAnnotations` per spec section 2d.

**Files:**
- Modify: `internal/tutorials/annotate.go` (struct + classification logic + prerequisite extraction)
- Modify: `internal/tutorials/annotate_test.go`

- [ ] **Step 1: Write the failing test**

Add to `internal/tutorials/annotate_test.go`:

```go
func TestAnnotateStep_VerificationConfidence(t *testing.T) {
	// High confidence: explicit "you should see"
	md := "You should see the following output:\n\n```\nserver running on port 4004\n```"
	ann := tutorials.AnnotateStep(md)
	require.Len(t, ann.Verifications, 1)
	assert.Equal(t, "high", ann.Verifications[0].Confidence)
}
```

- [ ] **Step 2: Verify it fails**

Run: `go build ./... && go vet ./...`
Expected: Fails — `Confidence` field doesn't exist on `VerificationAnnotation`

- [ ] **Step 3: Add Confidence field and populate it**

In `internal/tutorials/annotate.go`, add the field to `VerificationAnnotation`:

```go
type VerificationAnnotation struct {
	Command      string `json:"command,omitempty"`
	ExpectOutput string `json:"expect_output,omitempty"`
	Description  string `json:"description,omitempty"`
	Confidence   string `json:"confidence,omitempty"`
}
```

In the function that creates `VerificationAnnotation` values (the `extractVerification` function or wherever verifications are appended to the result), set `Confidence`:

- If the block was classified as `blockVerification` because the preceding text matched `outputOrVerifyRe` (the main regex for "output", "you should see", "verify", etc.) → `Confidence: "high"`
- If the block was classified as verification by a weaker signal (e.g., code-language block with `verifyWordsRe` match) → `Confidence: "low"`

> **Implementation note:** The `classifyBlock` function already distinguishes these cases. The simplest approach is to have `classifyBlock` return a confidence alongside the block type, or pass the confidence through to `extractVerification`. Check how `classifyBlock` at ~line 107 handles the two code paths:
> - `commandLangs[b.lang]` + `outputOrVerifyRe.MatchString(preceding)` → high confidence
> - `isCodeLang(b.lang)` + `isVerificationContext(preceding)` → low confidence
>
> Concretely: change `classifyBlock` to return `(blockKind, string)` where the second value is `"high"` or `"low"`. Then pass the confidence through to `extractVerification(b, confidence)`.

- [ ] **Step 4: Write test for prerequisite extraction**

Add to `internal/tutorials/annotate_test.go`:

```go
func TestAnnotateStep_PrerequisiteTools(t *testing.T) {
	md := "Make sure you have **Node.js** installed.\n\nAlso ensure you have the `cf` CLI installed.\n\n```bash\nnpm i -g @sap/cds-dk\n```"
	ann := tutorials.AnnotateStep(md)
	require.Len(t, ann.PrerequisiteTools, 2)
	assert.Contains(t, ann.PrerequisiteTools, "Node.js")
	assert.Contains(t, ann.PrerequisiteTools, "cf")
}

func TestAnnotateStep_NoPrerequisites(t *testing.T) {
	md := "Run the following command:\n\n```bash\ncds init bookshop\n```"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.PrerequisiteTools)
}
```

- [ ] **Step 5: Add PrerequisiteTools to StepAnnotations and extract**

In `internal/tutorials/annotate.go`, add the field to `StepAnnotations`:

```go
type StepAnnotations struct {
	Commands         []CommandAnnotation      `json:"commands,omitempty"`
	FileCreates      []FileCreateAnnotation   `json:"file_creates,omitempty"`
	Verifications    []VerificationAnnotation `json:"verifications,omitempty"`
	PrerequisiteTools []string                `json:"prerequisite_tools,omitempty"`
}
```

Add a regex and extraction function:

```go
var prerequisiteRe = regexp.MustCompile(`(?i)\b(?:make sure|ensure|you need|requires?|must have|install)\b[^.]*?` + "(?:`([^`]+)`|\\*\\*([^*]+)\\*\\*)")

func extractPrerequisites(md string) []string {
	seen := make(map[string]bool)
	var tools []string
	for _, m := range prerequisiteRe.FindAllStringSubmatch(md, -1) {
		name := m[1]
		if name == "" {
			name = m[2]
		}
		name = strings.TrimSpace(name)
		if name != "" && !seen[name] {
			seen[name] = true
			tools = append(tools, name)
		}
	}
	return tools
}
```

Call it in `AnnotateStep` before the return:

```go
ann.PrerequisiteTools = extractPrerequisites(md)
```

- [ ] **Step 6: Verify build passes**

Run: `go build ./... && go vet ./...`

- [ ] **Step 7: Commit**

```bash
git add internal/tutorials/annotate.go internal/tutorials/annotate_test.go
git commit -m "feat: add confidence tagging and prerequisite extraction to annotations"
```

---

### Task 5: Enhanced server instructions for discoverability

Update the `WithInstructions` string to include behavioral guidance for tutorial discoverability: proactive resume prompting, context-aware suggestions, and error recovery.

**Files:**
- Modify: `internal/mcpserver/server.go:34` (WithInstructions string)

- [ ] **Step 1: Update WithInstructions**

In `internal/mcpserver/server.go`, append to the existing `WithInstructions` string (after the existing tutorial tool instructions). Add these behavioral hints:

```
At session start, call list_active_tutorials to check for in-progress tutorials and mention them to the user. When check_project detects a project type and the user asks for learning help, search tutorials filtered by the detected technology. When a tutorial command fails, check get_known_errors before debugging from scratch.
```

> **Note:** The instructions string is long. Append to the end of the existing string, before the closing `"`). Keep it as a single continuous sentence flow matching the existing style.

- [ ] **Step 2: Verify build passes**

Run: `go build ./... && go vet ./...`

- [ ] **Step 3: Update docs/mcp-server.md**

Update the server instructions quote block in `docs/mcp-server.md` to match the new `WithInstructions` content. Also:
- Add `recommend_tutorials` to the "Tutorial guided execution tools" table
- Update tool count from 30 to 31 in the opening paragraph and architecture section

- [ ] **Step 4: Update CLAUDE.md**

Change the MCP tool count from 30 to 31 and add `recommend_tutorials` to the tool names in the `mcp list/install/status/serve` row.

- [ ] **Step 5: Commit**

```bash
git add internal/mcpserver/server.go docs/mcp-server.md CLAUDE.md
git commit -m "docs: update server instructions for tutorial discoverability (31 MCP tools)"
```

---

### Task 6: Create `/tutorial` Claude Code skill

Create the skill file that teaches the agent how to be a tutorial instructor. This is a markdown file — no Go code.

**Files:**
- Create: `.claude/skills/tutorial/SKILL.md`

- [ ] **Step 1: Create the skill file**

Create `.claude/skills/tutorial/SKILL.md` with the following content. This is the instructor behavior — the "brain" that orchestrates the MCP tools pedagogically.

```markdown
---
name: tutorial
description: Guide users through SAP tutorials step-by-step with explanations, command execution, and verification. Use when the user wants to learn SAP technologies via hands-on tutorials.
---

# SAP Tutorial Instructor

You are guiding a user through an SAP tutorial. Use the sap-devs MCP tools as your backend.

## Phase 1: Discovery

1. Call `list_active_tutorials` first.
   - If active tutorials exist, present them: "You have tutorials in progress — want to resume one?"
   - List each with: title, current step / total steps, last accessed date

2. If the user provided a query (skill args), call `search_tutorials` with that query.
   If no query, call `recommend_tutorials` for profile-matched suggestions.

3. Present results as a numbered list:
   ```
   1. [beginner, 20 min] Getting Started with CAP
   2. [intermediate, 45 min] Deploy CAP to Cloud Foundry
   ```

4. Ask the user to pick one, or let them describe what they want to learn.

## Phase 2: Step-by-Step Execution

For each step, call `get_tutorial_step` and follow this pattern:

### Before running anything
- Read the step title and content
- Read the annotations (commands, file_creates, verifications)
- Briefly explain what this step accomplishes and why it matters

### Commands (from annotations.commands)
- Show each command before running it
- Explain what the command does (use `get_context` if SAP-specific context helps)
- Ask: "Ready to run this?" — never execute without confirmation
- After running, observe the output
- If the command fails: call `get_known_errors` with the error text first, then diagnose

### File Creates (from annotations.file_creates)
- Show the file content with syntax highlighting
- Explain the file's purpose and key parts
- Offer to create the file: "I'll create `db/schema.cds` with this content — OK?"
- After creating, confirm it was written

### Verifications (from annotations.verifications)
- After commands run, compare actual output with expected output
- If output matches: confirm success briefly
- If output diverges: explain the difference, suggest fixes, don't just say "it failed"
- High-confidence verifications (confidence: "high") are explicit checks — validate carefully
- Low-confidence verifications are informational — mention but don't block on mismatches

### Completing a step
- Call `update_tutorial_progress` with the completed step number
- Use `next_step_title` from the response for a smooth transition:
  "Step 3 done. Next: *Deploy to Cloud Foundry* — ready to continue?"

## Phase 3: Mid-Tutorial Support

- If the user asks a question ("what does this flag do?"), answer using `get_context` for the relevant technology, then resume the step
- If the user wants to skip a step, respect it — mark complete and move on
- If the user wants to stop, tell them their progress is saved and they can resume later

## Phase 4: Completion

When all steps are done:
1. Congratulate the user
2. Summarize what they learned (reference the `you_will_learn` field from step 1)
3. Call `recommend_tutorials` to suggest what to do next

## Teaching Style

- **Adapt to the tutorial level.** Beginner tutorials: explain every concept, define terms. Intermediate+: focus on "why" not "what", assume foundational knowledge.
- **Be concise between steps.** One sentence transitions, not paragraphs.
- **Don't read the markdown verbatim.** Interpret it, summarize, explain in your own words. The raw markdown is your script, not your teleprompter.
- **Check prerequisites on step 1.** If the step mentions installing tools, call `check_tools` to verify they're already installed before proceeding.
- **Comprehension checks.** After steps that introduce key concepts, ask a brief question generated from the step content to verify understanding. Keep it conversational ("Quick check — what does the `@requires` annotation do?"), not quiz-like.
```

- [ ] **Step 2: Verify skill file is valid**

Run: `ls -la .claude/skills/tutorial/SKILL.md` — confirm the file exists with the frontmatter.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/tutorial/SKILL.md
git commit -m "feat: add /tutorial Claude Code skill for guided tutorial execution"
```

---

### Task 7: Integration verification

Build, vet, and verify everything works together.

**Files:** None (verification only)

- [ ] **Step 1: Build and vet**

```bash
go build ./... && go vet ./...
```

Expected: Clean build, no warnings

- [ ] **Step 2: Verify tool count**

Count the `mcp.NewTool` calls across all `tools_*.go` files to confirm 31 total:

```bash
grep -r 'mcp.NewTool(' internal/mcpserver/tools_*.go | wc -l
```

Expected: 31

- [ ] **Step 3: Verify skill is loadable**

```bash
cat .claude/skills/tutorial/SKILL.md | head -5
```

Expected: Shows frontmatter with `name: tutorial`

- [ ] **Step 4: Final commit (if any fixups needed)**

If any issues were found and fixed, commit them.
