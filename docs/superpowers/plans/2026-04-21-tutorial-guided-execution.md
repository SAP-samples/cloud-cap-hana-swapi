# Tutorial Guided Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 4 MCP tools that let AI agents guide users through SAP tutorials step-by-step, with a heuristic annotation engine that extracts executable commands, file creates, and verification checks from tutorial step markdown.

**Architecture:** Stateless MCP server provides tutorial step content + lightweight annotations + progress storage. The AI agent drives the flow — decides when to advance, execute commands, create files, and verify. Reuses existing tutorial index, parser, progress file, and content cache.

**Tech Stack:** Go, mark3labs/mcp-go, testify, existing `internal/tutorials` and `internal/mcpserver` packages

**Spec:** `d:/projects/cloud-cap-hana-swapi/docs/superpowers/specs/2026-04-21-tutorial-guided-execution-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `internal/tutorials/annotate.go` | Create | Heuristic annotation engine — `AnnotateStep()` pure function |
| `internal/tutorials/annotate_test.go` | Create | Tests for annotation heuristics |
| `internal/tutorials/progress.go` | Modify | Add `MergeCompletedSteps()` batch function |
| `internal/tutorials/progress_test.go` | Modify | Add tests for `MergeCompletedSteps()` |
| `internal/mcpserver/server.go` | Modify | Add `DataDir` to `Deps`, register new tools, extend instructions |
| `internal/mcpserver/tools_tutorial_exec.go` | Create | 4 MCP tool handlers |
| `internal/mcpserver/tools_tutorial_exec_test.go` | Create | Tests for all 4 MCP handlers |
| `cmd/mcp_serve.go` | Modify | Pass `paths.DataDir` in Deps construction |

---

### Task 1: Annotation Engine — Types and Command Extraction

**Files:**
- Create: `internal/tutorials/annotate.go`
- Create: `internal/tutorials/annotate_test.go`

This task builds the core annotation engine that parses tutorial step markdown and extracts executable command annotations from bash/sh code blocks.

- [ ] **Step 1: Write the failing test for command extraction**

In `internal/tutorials/annotate_test.go`:

```go
package tutorials_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/SAP-samples/sap-devs-cli/internal/tutorials"
)

func TestAnnotateStep_SingleCommand(t *testing.T) {
	md := "Run the following command:\n\n```bash\ncds init bookshop\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 1)
	assert.Equal(t, "cds init bookshop", ann.Commands[0].Command)
	assert.Contains(t, ann.Commands[0].Description, "Run the following command")
}

func TestAnnotateStep_MultiLineCommands(t *testing.T) {
	md := "Install dependencies:\n\n```bash\nnpm install\nnpm start\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 2)
	assert.Equal(t, "npm install", ann.Commands[0].Command)
	assert.Equal(t, "npm start", ann.Commands[1].Command)
}

func TestAnnotateStep_SkipOutputBlock(t *testing.T) {
	md := "You should see the following output:\n\n```bash\nServer running at http://localhost:4004\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.Commands)
}

func TestAnnotateStep_SkipCommentOnlyBlock(t *testing.T) {
	md := "Example:\n\n```bash\n# This is just a comment\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.Commands)
}

func TestAnnotateStep_NoLanguageTag(t *testing.T) {
	md := "Run this:\n\n```\nnpm install\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 1)
	assert.Equal(t, "npm install", ann.Commands[0].Command)
}

func TestAnnotateStep_ShTag(t *testing.T) {
	md := "Execute:\n\n```sh\ncds watch\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 1)
	assert.Equal(t, "cds watch", ann.Commands[0].Command)
}

func TestAnnotateStep_EmptyStep(t *testing.T) {
	ann := tutorials.AnnotateStep("")
	assert.Empty(t, ann.Commands)
	assert.Empty(t, ann.FileCreates)
	assert.Empty(t, ann.Verifications)
}

func TestAnnotateStep_TextOnly(t *testing.T) {
	md := "This step has no code blocks, just explanatory text.\n\nRead the documentation carefully.\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.Commands)
	assert.Empty(t, ann.FileCreates)
	assert.Empty(t, ann.Verifications)
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `go test ./internal/tutorials/... -run TestAnnotateStep -v 2>&1 | head -20`
Expected: Compilation error — `tutorials.AnnotateStep` undefined

- [ ] **Step 3: Write the annotation types and command extraction logic**

In `internal/tutorials/annotate.go`:

```go
package tutorials

import (
	"regexp"
	"strings"
)

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

var (
	fencedBlockRe       = regexp.MustCompile("(?m)^```(\\w*)\\n([\\s\\S]*?)^```")
	outputOrVerifyRe    = regexp.MustCompile(`(?i)\b(output|result|you should see|returns?|prints?|logs?|response|verify|check|confirm|make sure|expected output|the result)\b`)
)

func AnnotateStep(md string) StepAnnotations {
	var ann StepAnnotations
	if md == "" {
		return ann
	}

	blocks := parseFencedBlocks(md)
	for _, b := range blocks {
		switch classifyBlock(b) {
		case blockCommand:
			ann.Commands = append(ann.Commands, extractCommands(b)...)
		case blockFileCreate:
			if fc := extractFileCreate(b); fc != nil {
				ann.FileCreates = append(ann.FileCreates, *fc)
			}
		case blockVerification:
			ann.Verifications = append(ann.Verifications, extractVerification(b))
		}
	}
	return ann
}

type blockKind int

const (
	blockIgnored blockKind = iota
	blockCommand
	blockFileCreate
	blockVerification
)

type fencedBlock struct {
	lang        string
	content     string
	precedingText string
}

func parseFencedBlocks(md string) []fencedBlock {
	var blocks []fencedBlock
	matches := fencedBlockRe.FindAllStringSubmatchIndex(md, -1)
	for _, m := range matches {
		lang := md[m[2]:m[3]]
		content := md[m[4]:m[5]]
		preceding := precedingParagraph(md, m[0])
		blocks = append(blocks, fencedBlock{
			lang:          lang,
			content:       strings.TrimSpace(content),
			precedingText: preceding,
		})
	}
	return blocks
}

func precedingParagraph(md string, blockStart int) string {
	before := md[:blockStart]
	before = strings.TrimRight(before, " \t\n")
	lines := strings.Split(before, "\n")
	var para []string
	for i := len(lines) - 1; i >= 0; i-- {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			break
		}
		para = append([]string{line}, para...)
	}
	return strings.Join(para, " ")
}

var commandLangs = map[string]bool{"bash": true, "sh": true, "": true}

func classifyBlock(b fencedBlock) blockKind {
	if commandLangs[b.lang] {
		if outputOrVerifyRe.MatchString(b.precedingText) {
			return blockVerification
		}
		if isCommentOnly(b.content) {
			return blockIgnored
		}
		return blockCommand
	}
	if isCodeLang(b.lang) {
		if isVerificationContext(b.precedingText) {
			return blockVerification
		}
		if extractFilename(b.precedingText) != "" {
			return blockFileCreate
		}
	}
	return blockIgnored
}

func isCommentOnly(content string) bool {
	for _, line := range strings.Split(content, "\n") {
		line = strings.TrimSpace(line)
		if line != "" && !strings.HasPrefix(line, "#") {
			return false
		}
	}
	return true
}

func extractCommands(b fencedBlock) []CommandAnnotation {
	desc := firstSentence(b.precedingText)
	var cmds []CommandAnnotation
	for _, line := range strings.Split(b.content, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		cmds = append(cmds, CommandAnnotation{
			Command:     line,
			Description: desc,
		})
		desc = ""
	}
	return cmds
}

func firstSentence(text string) string {
	if text == "" {
		return ""
	}
	text = strings.TrimRight(text, ":")
	if i := strings.Index(text, ". "); i >= 0 {
		return text[:i+1]
	}
	return text
}

var codeLangs = map[string]bool{
	"json": true, "yaml": true, "yml": true, "cds": true,
	"xml": true, "js": true, "ts": true, "java": true,
	"html": true, "css": true, "sql": true, "properties": true,
	"toml": true, "csv": true, "graphql": true,
}

func isCodeLang(lang string) bool {
	return codeLangs[strings.ToLower(lang)]
}

var verifyWordsRe = regexp.MustCompile(`(?i)\b(verify|check|you should see|the output should|confirm|make sure|expected output|the result)\b`)

func isVerificationContext(text string) bool {
	return verifyWordsRe.MatchString(text)
}

var filenameRe = regexp.MustCompile("`([^`]+\\.[a-zA-Z]+)`")

var fileActionRe = regexp.MustCompile(`(?i)\b(create|add the following to|open|edit|paste into|replace the content of|update|modify)\b`)

func extractFilename(text string) string {
	if !fileActionRe.MatchString(text) {
		return ""
	}
	m := filenameRe.FindStringSubmatch(text)
	if m != nil {
		return m[1]
	}
	return ""
}

func extractFileCreate(b fencedBlock) *FileCreateAnnotation {
	fn := extractFilename(b.precedingText)
	if fn == "" {
		return nil
	}
	return &FileCreateAnnotation{
		Filename: fn,
		Language: b.lang,
		Content:  b.content,
	}
}

func extractVerification(b fencedBlock) VerificationAnnotation {
	return VerificationAnnotation{
		ExpectOutput: b.content,
		Description:  firstSentence(b.precedingText),
	}
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `go build ./internal/tutorials/... && go vet ./internal/tutorials/...`
Then on CI: `go test ./internal/tutorials/... -run TestAnnotateStep -v`
Expected: All 8 tests pass

- [ ] **Step 5: Commit**

```bash
git add internal/tutorials/annotate.go internal/tutorials/annotate_test.go
git commit -m "feat: add tutorial step annotation engine with command extraction"
```

---

### Task 2: Annotation Engine — File Creates and Verifications

**Files:**
- Modify: `internal/tutorials/annotate_test.go`

This task adds tests for file-create detection and verification block extraction.

- [ ] **Step 1: Write failing tests for file-create and verification annotations**

Append to `internal/tutorials/annotate_test.go`:

```go
func TestAnnotateStep_FileCreate(t *testing.T) {
	md := "Create the file `db/schema.cds`:\n\n```cds\nentity Books { key ID : Integer; title : String; }\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.Commands)
	assert.Len(t, ann.FileCreates, 1)
	assert.Equal(t, "db/schema.cds", ann.FileCreates[0].Filename)
	assert.Equal(t, "cds", ann.FileCreates[0].Language)
	assert.Contains(t, ann.FileCreates[0].Content, "entity Books")
}

func TestAnnotateStep_FileCreate_NoFilename(t *testing.T) {
	md := "Here is an example CDS model:\n\n```cds\nentity Foo { key ID : Integer; }\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.FileCreates)
}

func TestAnnotateStep_Verification(t *testing.T) {
	md := "You should see the following output:\n\n```\nServer running at http://localhost:4004\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Empty(t, ann.Commands)
	assert.Len(t, ann.Verifications, 1)
	assert.Contains(t, ann.Verifications[0].ExpectOutput, "localhost:4004")
}

func TestAnnotateStep_MixedContent(t *testing.T) {
	md := "Install the dependency:\n\n```bash\nnpm install @sap/cds\n```\n\n" +
		"Create the file `srv/service.cds`:\n\n```cds\nservice CatalogService { entity Books as projection on my.Books; }\n```\n\n" +
		"Verify the installation:\n\n```bash\ncds version\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 1)
	assert.Equal(t, "npm install @sap/cds", ann.Commands[0].Command)
	assert.Len(t, ann.FileCreates, 1)
	assert.Equal(t, "srv/service.cds", ann.FileCreates[0].Filename)
	assert.Len(t, ann.Verifications, 1)
	assert.Contains(t, ann.Verifications[0].ExpectOutput, "cds version")
}

func TestAnnotateStep_FileCreate_EditAction(t *testing.T) {
	md := "Edit `package.json` and add:\n\n```json\n{\"dependencies\": {}}\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.FileCreates, 1)
	assert.Equal(t, "package.json", ann.FileCreates[0].Filename)
}

func TestAnnotateStep_WorkingDir(t *testing.T) {
	md := "Change to the project directory:\n\n```bash\ncd bookshop\nnpm install\n```\n"
	ann := tutorials.AnnotateStep(md)
	assert.Len(t, ann.Commands, 2)
	assert.Equal(t, "cd bookshop", ann.Commands[0].Command)
	assert.Equal(t, "npm install", ann.Commands[1].Command)
}
```

- [ ] **Step 2: Run tests to verify they pass**

Run: `go build ./internal/tutorials/... && go vet ./internal/tutorials/...`
Then on CI: `go test ./internal/tutorials/... -run TestAnnotateStep -v`
Expected: All 14 tests pass (the implementation from Task 1 already handles these cases)

- [ ] **Step 3: Fix any failing tests**

Adjust `annotate.go` if any edge cases fail. The most likely issue is the `MixedContent` test — the last `bash` block after "Verify the installation:" should be classified as a verification, not a command. The `classifyBlock` logic checks `outputOrVerifyRe` which includes "verify", so this should work.

- [ ] **Step 4: Commit**

```bash
git add internal/tutorials/annotate_test.go
git commit -m "test: add file-create and verification annotation tests"
```

---

### Task 3: Batch Progress Merge Function

**Files:**
- Modify: `internal/tutorials/progress.go`
- Modify: `internal/tutorials/progress_test.go`

- [ ] **Step 1: Write failing tests for MergeCompletedSteps**

Append to `internal/tutorials/progress_test.go`:

```go
func TestMergeCompletedSteps_NewTutorial(t *testing.T) {
	dir := t.TempDir()
	p, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{1, 2}, 3, 5)
	require.NoError(t, err)
	assert.Equal(t, []int{1, 2}, p.CompletedSteps)
	assert.Equal(t, 3, p.CurrentStep)
	assert.Equal(t, 5, p.TotalSteps)
	assert.Nil(t, p.CompletedAt)
}

func TestMergeCompletedSteps_MergeIdempotent(t *testing.T) {
	dir := t.TempDir()
	_, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{1}, 2, 5)
	require.NoError(t, err)
	p, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{1, 2}, 3, 5)
	require.NoError(t, err)
	assert.Equal(t, []int{1, 2}, p.CompletedSteps)
	assert.Equal(t, 3, p.CurrentStep)
}

func TestMergeCompletedSteps_Completion(t *testing.T) {
	dir := t.TempDir()
	p, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{1, 2, 3}, 0, 3)
	require.NoError(t, err)
	assert.NotNil(t, p.CompletedAt)
}

func TestMergeCompletedSteps_OutOfRange(t *testing.T) {
	dir := t.TempDir()
	_, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{0, 6}, 1, 5)
	assert.Error(t, err)
	assert.Contains(t, err.Error(), "out of range")
}

func TestMergeCompletedSteps_DefaultCurrentStep(t *testing.T) {
	dir := t.TempDir()
	p, err := tutorials.MergeCompletedSteps(dir, "test-tut", []int{3, 1, 2}, 0, 5)
	require.NoError(t, err)
	assert.Equal(t, 4, p.CurrentStep) // max(completed) + 1
}
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `go build ./internal/tutorials/... 2>&1 | head -5`
Expected: Compilation error — `tutorials.MergeCompletedSteps` undefined

- [ ] **Step 3: Implement MergeCompletedSteps**

Append to `internal/tutorials/progress.go`:

```go
// MergeCompletedSteps merges a batch of completed steps into a tutorial's progress.
// It performs a single read-modify-write cycle. If currentStep is 0, it defaults
// to max(completedSteps) + 1. Step numbers must be in range 1..totalSteps.
func MergeCompletedSteps(dataDir, slug string, completedSteps []int, currentStep, totalSteps int) (*TutorialProgress, error) {
	for _, s := range completedSteps {
		if s < 1 || s > totalSteps {
			return nil, fmt.Errorf("step %d out of range 1..%d", s, totalSteps)
		}
	}

	all, err := LoadProgress(dataDir)
	if err != nil {
		return nil, err
	}

	now := time.Now()
	p, exists := all[slug]
	if !exists {
		p = TutorialProgress{
			Slug:       slug,
			TotalSteps: totalSteps,
			StartedAt:  now,
		}
	}

	existing := make(map[int]bool, len(p.CompletedSteps))
	for _, s := range p.CompletedSteps {
		existing[s] = true
	}
	for _, s := range completedSteps {
		if !existing[s] {
			p.CompletedSteps = append(p.CompletedSteps, s)
			existing[s] = true
		}
	}

	sort.Ints(p.CompletedSteps)

	if currentStep > 0 {
		p.CurrentStep = currentStep
	} else if len(p.CompletedSteps) > 0 {
		p.CurrentStep = p.CompletedSteps[len(p.CompletedSteps)-1] + 1
	}

	p.TotalSteps = totalSteps
	p.LastAccessed = now

	if len(p.CompletedSteps) >= totalSteps && p.CompletedAt == nil {
		p.CompletedAt = &now
	}

	all[slug] = p
	if err := SaveProgress(dataDir, all); err != nil {
		return nil, err
	}
	return &p, nil
}
```

Also add `"fmt"` and `"sort"` to the import block in `progress.go`.

- [ ] **Step 4: Run tests to verify they pass**

Run: `go build ./internal/tutorials/... && go vet ./internal/tutorials/...`
Then on CI: `go test ./internal/tutorials/... -run TestMergeCompleted -v`
Expected: All 5 tests pass

- [ ] **Step 5: Commit**

```bash
git add internal/tutorials/progress.go internal/tutorials/progress_test.go
git commit -m "feat: add MergeCompletedSteps for batch progress updates"
```

---

### Task 4: Add DataDir to MCP Server Deps

**Files:**
- Modify: `internal/mcpserver/server.go`
- Modify: `cmd/mcp_serve.go`

- [ ] **Step 1: Add DataDir field to Deps struct**

In `internal/mcpserver/server.go`, add `DataDir` to the `Deps` struct after `ConfigDir`:

```go
type Deps struct {
	Packs         []*content.Pack
	Profile       *content.Profile
	TutorialIndex []tutorials.TutorialMeta
	LearningIndex []learning.LearningJourney
	CacheDir      string
	ConfigDir     string
	DataDir       string
	Version       string
	Cwd           string
	CFClient      *cfcli.Client
	BTPClient     *btpcli.Client
	CFConfigPath  string
}
```

- [ ] **Step 2: Pass paths.DataDir in mcp_serve.go**

In `cmd/mcp_serve.go`, add `DataDir: paths.DataDir,` to the Deps construction (after `ConfigDir: paths.ConfigDir,` on line 100):

```go
deps := mcpserver.Deps{
	Packs:         packs,
	Profile:       activeProfile,
	TutorialIndex: tutorialIndex,
	LearningIndex: learningIndex,
	CacheDir:      paths.CacheDir,
	ConfigDir:     paths.ConfigDir,
	DataDir:       paths.DataDir,
	Version:       Version,
	Cwd:           cwd,
	CFClient:      cfClient,
	BTPClient:     btpClient,
	CFConfigPath:  cfConfigPath,
}
```

- [ ] **Step 3: Build to verify no errors**

Run: `go build ./...`
Expected: Clean build (DataDir is added but not yet used — that's fine)

- [ ] **Step 4: Commit**

```bash
git add internal/mcpserver/server.go cmd/mcp_serve.go
git commit -m "feat: add DataDir to MCP server Deps for tutorial progress"
```

---

### Task 5: MCP Tool — `get_tutorial_step`

**Files:**
- Create: `internal/mcpserver/tools_tutorial_exec.go`
- Create: `internal/mcpserver/tools_tutorial_exec_test.go`
- Modify: `internal/mcpserver/server.go`

- [ ] **Step 1: Write failing test for get_tutorial_step**

Create `internal/mcpserver/tools_tutorial_exec_test.go`:

```go
package mcpserver

import (
	"context"
	"encoding/json"
	"testing"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/SAP-samples/sap-devs-cli/internal/tutorials"
)

func tutorialExecDeps(t *testing.T) Deps {
	t.Helper()
	dir := t.TempDir()
	cacheDir := t.TempDir()

	tut := &tutorials.Tutorial{
		TutorialMeta: tutorials.TutorialMeta{
			Slug:  "cap-getting-started",
			Title: "Getting Started with CAP",
			Repo:  "Tutorials-en",
		},
		YouWillLearn: []string{"How to init a CAP project"},
		Steps: []tutorials.TutorialStep{
			{Number: 1, Title: "Set up", Content: "Install CDS:\n\n```bash\nnpm i -g @sap/cds-dk\n```\n"},
			{Number: 2, Title: "Init project", Content: "Run:\n\n```bash\ncds init bookshop\n```\n"},
		},
	}
	require.NoError(t, tutorials.SaveContent(cacheDir, tut))

	return Deps{
		TutorialIndex: []tutorials.TutorialMeta{tut.TutorialMeta},
		CacheDir:      cacheDir,
		DataDir:       dir,
	}
}

func TestGetTutorialStep_Valid(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialStepHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(1)}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	var resp map[string]any
	require.NoError(t, json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp))
	assert.Equal(t, "cap-getting-started", resp["slug"])
	assert.Equal(t, float64(2), resp["total_steps"])

	step := resp["step"].(map[string]any)
	assert.Equal(t, float64(1), step["number"])
	assert.Equal(t, "Set up", step["title"])
	assert.Contains(t, step["content"], "npm i -g @sap/cds-dk")

	anns := step["annotations"].(map[string]any)
	cmds := anns["commands"].([]any)
	assert.Len(t, cmds, 1)
}

func TestGetTutorialStep_InvalidSlug(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialStepHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "nonexistent"}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.True(t, result.IsError)
}

func TestGetTutorialStep_OutOfRange(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialStepHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(99)}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.True(t, result.IsError)
}

func TestGetTutorialStep_TracksProgress(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialStepHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(1)}
	_, err := handler(context.Background(), req)
	require.NoError(t, err)

	p, err := tutorials.GetProgress(deps.DataDir, "cap-getting-started")
	require.NoError(t, err)
	require.NotNil(t, p)
	assert.Equal(t, 1, p.CurrentStep)
}

func TestGetTutorialStep_NoTrack(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialStepHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started", "step": float64(1), "track": false}
	_, err := handler(context.Background(), req)
	require.NoError(t, err)

	p, err := tutorials.GetProgress(deps.DataDir, "cap-getting-started")
	require.NoError(t, err)
	assert.Nil(t, p)
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `go build ./internal/mcpserver/... 2>&1 | head -5`
Expected: Compilation error — `getTutorialStepHandler` undefined

- [ ] **Step 3: Implement the handler and registration**

Create `internal/mcpserver/tools_tutorial_exec.go`:

```go
package mcpserver

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/mark3labs/mcp-go/mcp"
	"github.com/mark3labs/mcp-go/server"
	"github.com/SAP-samples/sap-devs-cli/internal/credentials"
	"github.com/SAP-samples/sap-devs-cli/internal/tutorials"
)

func registerTutorialExecTools(s *server.MCPServer, deps Deps) {
	s.AddTool(
		mcp.NewTool("get_tutorial_step",
			mcp.WithDescription("Get a single step from an SAP tutorial with content, annotations (executable commands, file creates, verifications), and progress. Use to guide users through tutorials step-by-step. First call for an uncached tutorial triggers a GitHub fetch."),
			mcp.WithString("slug", mcp.Required(), mcp.Description("Tutorial slug (e.g., 'cap-getting-started')")),
			mcp.WithNumber("step", mcp.Description("Step number, 1-indexed (default 1)")),
			mcp.WithBoolean("track", mcp.Description("If true (default), creates/updates progress. Set false to preview without starting.")),
		),
		getTutorialStepHandler(deps),
	)

	s.AddTool(
		mcp.NewTool("update_tutorial_progress",
			mcp.WithDescription("Record step completion for a tutorial. Called after guiding a user through a step."),
			mcp.WithString("slug", mcp.Required(), mcp.Description("Tutorial slug")),
			mcp.WithArray("completed_steps", mcp.Required(), mcp.Description("Step numbers to mark as completed (1-indexed)"), mcp.WithNumberItems()),
			mcp.WithNumber("current_step", mcp.Description("Where the user is now. If omitted, set to max(completed) + 1.")),
		),
		updateTutorialProgressHandler(deps),
	)

	s.AddTool(
		mcp.NewTool("get_tutorial_progress",
			mcp.WithDescription("Check progress on a specific tutorial or all tutorials with saved progress (including completed). For only incomplete tutorials, use list_active_tutorials."),
			mcp.WithString("slug", mcp.Description("Tutorial slug. If omitted, returns all tutorials with progress.")),
		),
		getTutorialProgressHandler(deps),
	)

	s.AddTool(
		mcp.NewTool("list_active_tutorials",
			mcp.WithDescription("List tutorials with in-progress state (not yet completed). Enables 'resume where you left off' flows."),
			mcp.WithNumber("limit", mcp.Description("Maximum number of results (default 10, max 50)")),
		),
		listActiveTutorialsHandler(deps),
	)
}

type stepResult struct {
	Slug         string              `json:"slug"`
	Title        string              `json:"title"`
	Step         stepContent         `json:"step"`
	TotalSteps   int                 `json:"total_steps"`
	YouWillLearn []string            `json:"you_will_learn,omitempty"`
	Progress     *progressSnapshot   `json:"progress,omitempty"`
}

type stepContent struct {
	Number      int                        `json:"number"`
	Title       string                     `json:"title"`
	Content     string                     `json:"content"`
	Annotations tutorials.StepAnnotations  `json:"annotations"`
}

type progressSnapshot struct {
	CompletedSteps []int  `json:"completed_steps"`
	CurrentStep    int    `json:"current_step"`
	TotalSteps     int    `json:"total_steps"`
	StartedAt      string `json:"started_at"`
	LastAccessed   string `json:"last_accessed"`
}

func getTutorialStepHandler(deps Deps) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		slug, err := req.RequireString("slug")
		if err != nil {
			return mcp.NewToolResultError("slug parameter is required"), nil
		}
		stepNum := req.GetInt("step", 1)
		track := req.GetBool("track", true)

		meta := tutorials.FindBySlug(deps.TutorialIndex, slug)
		if meta == nil {
			return mcp.NewToolResultError(fmt.Sprintf("Tutorial %q not found. Use search_tutorials to find valid slugs.", slug)), nil
		}

		tut, err := loadOrFetchTutorial(deps, meta)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to load tutorial %q: %v", slug, err)), nil
		}

		if stepNum < 1 || stepNum > len(tut.Steps) {
			return mcp.NewToolResultError(fmt.Sprintf("Step %d out of range. Valid range: 1..%d", stepNum, len(tut.Steps))), nil
		}

		step := tut.Steps[stepNum-1]
		annotations := tutorials.AnnotateStep(step.Content)

		var ps *progressSnapshot
		if track {
			if err := tutorials.UpdateProgress(deps.DataDir, slug, stepNum, len(tut.Steps), false); err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("Failed to update progress: %v", err)), nil
			}
		}
		if p, _ := tutorials.GetProgress(deps.DataDir, slug); p != nil {
			ps = &progressSnapshot{
				CompletedSteps: p.CompletedSteps,
				CurrentStep:    p.CurrentStep,
				TotalSteps:     len(tut.Steps),
				StartedAt:      p.StartedAt.Format("2006-01-02T15:04:05Z"),
				LastAccessed:   p.LastAccessed.Format("2006-01-02T15:04:05Z"),
			}
		}

		result := stepResult{
			Slug:         slug,
			Title:        tut.Title,
			Step:         stepContent{Number: step.Number, Title: step.Title, Content: step.Content, Annotations: annotations},
			TotalSteps:   len(tut.Steps),
			YouWillLearn: tut.YouWillLearn,
			Progress:     ps,
		}

		b, _ := json.Marshal(result)
		return mcp.NewToolResultText(string(b)), nil
	}
}

func loadOrFetchTutorial(deps Deps, meta *tutorials.TutorialMeta) (*tutorials.Tutorial, error) {
	tut, err := tutorials.LoadContent(deps.CacheDir, meta.Slug)
	if err == nil {
		return tut, nil
	}
	if !os.IsNotExist(err) {
		return nil, err
	}

	branch := "main"
	repos, _ := tutorials.LoadRepoInfo(deps.CacheDir)
	for _, r := range repos {
		if r.Name == meta.Repo {
			branch = r.DefaultBranch
			break
		}
	}

	token := credentials.Resolve(deps.ConfigDir)
	client := tutorials.NewClient(tutorials.ClientConfig{Token: token})
	raw, err := client.FetchRawMarkdown(meta.Repo, branch, meta.Slug)
	if err != nil {
		return nil, fmt.Errorf("fetch tutorial: %w", err)
	}

	tut, err = tutorials.Parse(raw, meta.Slug, meta.Repo)
	if err != nil {
		return nil, fmt.Errorf("parse tutorial: %w", err)
	}

	_ = tutorials.SaveContent(deps.CacheDir, tut)
	return tut, nil
}
```

- [ ] **Step 4: Register in server.go**

In `internal/mcpserver/server.go`, add `registerTutorialExecTools(s, deps)` after `registerBTPTools(s, deps)` (line 48).

Also extend the `WithInstructions` string — append before the closing `"`):

```
 Use `get_tutorial_step` to guide users through SAP tutorials step-by-step. Use `list_active_tutorials` to check for tutorials the user can resume. Use `update_tutorial_progress` after completing each step. Use `get_tutorial_progress` to check detailed progress on a specific tutorial.
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `go build ./... && go vet ./...`
Then on CI: `go test ./internal/mcpserver/... -run TestGetTutorialStep -v`
Expected: All 5 tests pass

- [ ] **Step 6: Commit**

```bash
git add internal/mcpserver/tools_tutorial_exec.go internal/mcpserver/tools_tutorial_exec_test.go internal/mcpserver/server.go
git commit -m "feat: add get_tutorial_step MCP tool with annotations and progress"
```

---

### Task 6: MCP Tool — `update_tutorial_progress`

**Files:**
- Modify: `internal/mcpserver/tools_tutorial_exec.go`
- Modify: `internal/mcpserver/tools_tutorial_exec_test.go`

- [ ] **Step 1: Write failing tests**

Append to `internal/mcpserver/tools_tutorial_exec_test.go`:

```go
func TestUpdateTutorialProgress_Basic(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := updateTutorialProgressHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"slug":            "cap-getting-started",
		"completed_steps": []any{float64(1)},
		"current_step":    float64(2),
	}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.False(t, result.IsError)

	var resp map[string]any
	require.NoError(t, json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp))
	prog := resp["progress"].(map[string]any)
	assert.Equal(t, float64(2), prog["current_step"])
}

func TestUpdateTutorialProgress_InvalidSlug(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := updateTutorialProgressHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"slug":            "nonexistent",
		"completed_steps": []any{float64(1)},
	}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.True(t, result.IsError)
}

func TestUpdateTutorialProgress_OutOfRange(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := updateTutorialProgressHandler(deps)

	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{
		"slug":            "cap-getting-started",
		"completed_steps": []any{float64(99)},
	}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.True(t, result.IsError)
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `go build ./internal/mcpserver/... 2>&1 | head -5`
Expected: Compilation error — `updateTutorialProgressHandler` undefined (or the function exists as a stub)

- [ ] **Step 3: Implement the handler**

Append to `internal/mcpserver/tools_tutorial_exec.go`:

```go
type progressResult struct {
	Slug     string           `json:"slug"`
	Progress progressSnapshot `json:"progress"`
}

func updateTutorialProgressHandler(deps Deps) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		slug, err := req.RequireString("slug")
		if err != nil {
			return mcp.NewToolResultError("slug parameter is required"), nil
		}

		meta := tutorials.FindBySlug(deps.TutorialIndex, slug)
		if meta == nil {
			return mcp.NewToolResultError(fmt.Sprintf("Tutorial %q not found.", slug)), nil
		}

		stepsRaw, ok := req.Params.Arguments["completed_steps"]
		if !ok {
			return mcp.NewToolResultError("completed_steps parameter is required"), nil
		}
		stepsArr, ok := stepsRaw.([]any)
		if !ok {
			return mcp.NewToolResultError("completed_steps must be an array of integers"), nil
		}
		var completedSteps []int
		for _, v := range stepsArr {
			n, ok := v.(float64)
			if !ok {
				return mcp.NewToolResultError("completed_steps must be an array of integers"), nil
			}
			completedSteps = append(completedSteps, int(n))
		}

		currentStep := req.GetInt("current_step", 0)

		tut, err := loadOrFetchTutorial(deps, meta)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to load tutorial: %v", err)), nil
		}

		p, err := tutorials.MergeCompletedSteps(deps.DataDir, slug, completedSteps, currentStep, len(tut.Steps))
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to update progress: %v", err)), nil
		}

		result := progressResult{
			Slug: slug,
			Progress: progressSnapshot{
				CompletedSteps: p.CompletedSteps,
				CurrentStep:    p.CurrentStep,
				TotalSteps:     len(tut.Steps),
				StartedAt:      p.StartedAt.Format("2006-01-02T15:04:05Z"),
				LastAccessed:   p.LastAccessed.Format("2006-01-02T15:04:05Z"),
			},
		}
		b, _ := json.Marshal(result)
		return mcp.NewToolResultText(string(b)), nil
	}
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `go build ./... && go vet ./...`
Then on CI: `go test ./internal/mcpserver/... -run TestUpdateTutorialProgress -v`
Expected: All 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add internal/mcpserver/tools_tutorial_exec.go internal/mcpserver/tools_tutorial_exec_test.go
git commit -m "feat: add update_tutorial_progress MCP tool"
```

---

### Task 7: MCP Tools — `get_tutorial_progress` and `list_active_tutorials`

**Files:**
- Modify: `internal/mcpserver/tools_tutorial_exec.go`
- Modify: `internal/mcpserver/tools_tutorial_exec_test.go`

- [ ] **Step 1: Write failing tests**

Append to `internal/mcpserver/tools_tutorial_exec_test.go`:

```go
func TestGetTutorialProgress_Single(t *testing.T) {
	deps := tutorialExecDeps(t)

	require.NoError(t, tutorials.UpdateProgress(deps.DataDir, "cap-getting-started", 2, 2, true))

	handler := getTutorialProgressHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "cap-getting-started"}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	var resp map[string]any
	require.NoError(t, json.Unmarshal([]byte(result.Content[0].(mcp.TextContent).Text), &resp))
	assert.Equal(t, "cap-getting-started", resp["slug"])
}

func TestGetTutorialProgress_All(t *testing.T) {
	deps := tutorialExecDeps(t)

	require.NoError(t, tutorials.UpdateProgress(deps.DataDir, "cap-getting-started", 1, 2, false))
	require.NoError(t, tutorials.UpdateProgress(deps.DataDir, "other-tut", 1, 3, false))

	handler := getTutorialProgressHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	env := unmarshalEnvelope(t, result)
	assert.Equal(t, 2, env.Count)
}

func TestGetTutorialProgress_None(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := getTutorialProgressHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{"slug": "nonexistent"}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)
	assert.True(t, result.IsError)
}

func TestListActiveTutorials_FiltersCompleted(t *testing.T) {
	deps := tutorialExecDeps(t)

	require.NoError(t, tutorials.UpdateProgress(deps.DataDir, "cap-getting-started", 1, 2, false))
	require.NoError(t, tutorials.UpdateProgress(deps.DataDir, "done-tut", 1, 1, true))

	handler := listActiveTutorialsHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	env := unmarshalEnvelope(t, result)
	assert.Equal(t, 1, env.Count)
	items := env.resultSlice(t)
	assert.Equal(t, "cap-getting-started", items[0]["slug"])
}

func TestListActiveTutorials_Empty(t *testing.T) {
	deps := tutorialExecDeps(t)
	handler := listActiveTutorialsHandler(deps)
	req := mcp.CallToolRequest{}
	req.Params.Arguments = map[string]any{}
	result, err := handler(context.Background(), req)
	require.NoError(t, err)

	env := unmarshalEnvelope(t, result)
	assert.Equal(t, 0, env.Count)
}
```

- [ ] **Step 2: Implement both handlers**

Append to `internal/mcpserver/tools_tutorial_exec.go`:

```go
type tutorialProgressResult struct {
	Slug     string           `json:"slug"`
	Title    string           `json:"title"`
	Progress progressSnapshot `json:"progress"`
}

func getTutorialProgressHandler(deps Deps) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		slug := req.GetString("slug", "")

		if slug != "" {
			p, err := tutorials.GetProgress(deps.DataDir, slug)
			if err != nil {
				return mcp.NewToolResultError(fmt.Sprintf("Failed to load progress: %v", err)), nil
			}
			if p == nil {
				return mcp.NewToolResultError(fmt.Sprintf("No progress found for tutorial %q.", slug)), nil
			}
			title := slug
			if m := tutorials.FindBySlug(deps.TutorialIndex, slug); m != nil {
				title = m.Title
			}
			result := tutorialProgressResult{
				Slug:  slug,
				Title: title,
				Progress: progressSnapshot{
					CompletedSteps: p.CompletedSteps,
					CurrentStep:    p.CurrentStep,
					TotalSteps:     p.TotalSteps,
					StartedAt:      p.StartedAt.Format("2006-01-02T15:04:05Z"),
					LastAccessed:   p.LastAccessed.Format("2006-01-02T15:04:05Z"),
				},
			}
			b, _ := json.Marshal(result)
			return mcp.NewToolResultText(string(b)), nil
		}

		all, err := tutorials.LoadProgress(deps.DataDir)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to load progress: %v", err)), nil
		}

		var items []tutorialProgressResult
		for slug, p := range all {
			title := slug
			if m := tutorials.FindBySlug(deps.TutorialIndex, slug); m != nil {
				title = m.Title
			}
			items = append(items, tutorialProgressResult{
				Slug:  slug,
				Title: title,
				Progress: progressSnapshot{
					CompletedSteps: p.CompletedSteps,
					CurrentStep:    p.CurrentStep,
					TotalSteps:     p.TotalSteps,
					StartedAt:      p.StartedAt.Format("2006-01-02T15:04:05Z"),
					LastAccessed:   p.LastAccessed.Format("2006-01-02T15:04:05Z"),
				},
			})
		}

		sort.Slice(items, func(i, j int) bool {
			return items[i].Progress.LastAccessed > items[j].Progress.LastAccessed
		})

		return wrapResults(items, len(items), len(items), "tutorial progress entries", ""), nil
	}
}

type activeTutorialResult struct {
	Slug           string `json:"slug"`
	Title          string `json:"title"`
	CompletedSteps []int  `json:"completed_steps"`
	TotalSteps     int    `json:"total_steps"`
	LastAccessed   string `json:"last_accessed"`
}

func listActiveTutorialsHandler(deps Deps) server.ToolHandlerFunc {
	return func(ctx context.Context, req mcp.CallToolRequest) (*mcp.CallToolResult, error) {
		limit := clampLimit(req.GetInt("limit", 10), 10, 50)

		all, err := tutorials.LoadProgress(deps.DataDir)
		if err != nil {
			return mcp.NewToolResultError(fmt.Sprintf("Failed to load progress: %v", err)), nil
		}

		var items []activeTutorialResult
		for slug, p := range all {
			if p.CompletedAt != nil {
				continue
			}
			title := slug
			if m := tutorials.FindBySlug(deps.TutorialIndex, slug); m != nil {
				title = m.Title
			}
			items = append(items, activeTutorialResult{
				Slug:           slug,
				Title:          title,
				CompletedSteps: p.CompletedSteps,
				TotalSteps:     p.TotalSteps,
				LastAccessed:   p.LastAccessed.Format("2006-01-02T15:04:05Z"),
			})
		}

		sort.Slice(items, func(i, j int) bool {
			return items[i].LastAccessed > items[j].LastAccessed
		})

		total := len(items)
		if limit < total {
			items = items[:limit]
		}
		return wrapResults(items, total, len(items), "active tutorials", ""), nil
	}
}
```

Add `"sort"` to the import block in `tools_tutorial_exec.go`.

- [ ] **Step 3: Run tests to verify they pass**

Run: `go build ./... && go vet ./...`
Then on CI: `go test ./internal/mcpserver/... -run "TestGetTutorialProgress|TestListActive" -v`
Expected: All 5 tests pass

- [ ] **Step 4: Commit**

```bash
git add internal/mcpserver/tools_tutorial_exec.go internal/mcpserver/tools_tutorial_exec_test.go
git commit -m "feat: add get_tutorial_progress and list_active_tutorials MCP tools"
```

---

### Task 8: Update Documentation

**Files:**
- Modify: `CLAUDE.md` (in sap-devs-cli project root)
- Modify: `TODO.md`

- [ ] **Step 1: Update CLAUDE.md tool count and descriptions**

In `CLAUDE.md`, find the MCP server section. Update the tool count from 26 to 30. Add the 4 new tools to the command table and the tool list in the `mcp list/install/status/serve` row.

Specifically:
- In the `| mcp list/install/status/serve |` table row, change the tool count from 26 to 30 and add the new tool names: `get_tutorial_step`, `update_tutorial_progress`, `get_tutorial_progress`, `list_active_tutorials`
- In the Architecture Overview MCP section, update the tool count references

- [ ] **Step 2: Update TODO.md**

In the tutorials Phase 2 section, mark the guided execution items as done. Add a note that the MCP tools are implemented and the annotation engine is in place.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md TODO.md
git commit -m "docs: update CLAUDE.md and TODO.md for tutorial guided execution (30 MCP tools)"
```

---

### Task 9: Full Integration Verification

- [ ] **Step 1: Build the binary**

```bash
VERSION=$(git describe --tags --always --dirty)
go build -ldflags "-X github.com/SAP-samples/sap-devs-cli/cmd.Version=${VERSION}" -o sap-devs .
```

- [ ] **Step 2: Run go vet**

```bash
go vet ./...
```
Expected: No issues

- [ ] **Step 3: Manual MCP test — list tools**

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}' | ./sap-devs mcp serve 2>/dev/null | head -1 | python3 -m json.tool | grep -c "get_tutorial_step"
```
Expected: `1` (tool is registered)

- [ ] **Step 4: Verify all tests pass on CI**

Push the branch and verify GitHub Actions `ubuntu-latest` CI passes. This is the authoritative test runner (Windows Defender blocks local `go test`).

- [ ] **Step 5: Final commit if any fixups needed**

```bash
git add -A
git commit -m "fix: address integration test feedback"
```
