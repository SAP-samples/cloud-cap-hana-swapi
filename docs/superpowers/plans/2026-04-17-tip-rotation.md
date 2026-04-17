# Configurable Tip Rotation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `daily`/`hourly`/`session` tip rotation modes, a `--new` flag for one-off fresh tips, and a `sap-devs config tip-rotation` subcommand.

**Architecture:** All rotation modes are stateless — the seed is derived from the current time using a formula keyed to the rotation granularity. A new `TipConfig` sub-struct in `internal/config/config.go` stores the user's preference. The seed computation is extracted into a `tipSeed()` helper in `cmd/tip.go`. The `config tip-rotation` subcommand follows the exact pattern of `cmd/config_location.go`.

**Tech Stack:** Go 1.21+, Cobra, gopkg.in/yaml.v3, testify (assert/require), internal i18n catalog (JSON), internal config package.

---

## Worktree Setup

- [ ] **Create feature branch worktree before writing any code**

  Use the `superpowers:using-git-worktrees` skill. Branch name: `feat/tip-rotation`. All work in this plan happens inside that worktree.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `internal/config/config.go` | Modify | Add `TipConfig` struct + `Tip` field to `Config`; `Default()` unchanged (zero value is correct) |
| `internal/config/config_test.go` | Modify | Tests for `TipConfig` round-trip, omitempty, default |
| `internal/i18n/catalogs/en.json` | Modify | Add 6 new i18n keys |
| `internal/i18n/catalogs/de.json` | Modify | Mirror same 6 keys (English values acceptable as fallback) |
| `cmd/tip.go` | Modify | Add `tipSeed()` helper; replace seed logic; update dev-mode to `UnixNano`; add `--new` flag |
| `cmd/tip_test.go` | Create | Unit tests for `tipSeed()` |
| `cmd/config_tip_rotation.go` | Create | `configTipRotationCmd` subcommand |
| `cmd/config.go` | Modify | Register `configTipRotationCmd`; add `tip_rotation` line to `configShowCmd` |

---

## Task 1: TipConfig data model

**Files:**
- Modify: `internal/config/config.go`
- Modify: `internal/config/config_test.go`

- [ ] **Step 1: Write the failing tests**

  Append these four functions to `internal/config/config_test.go` (before the end of the file):

  ```go
  func TestTipRotation_DefaultIsEmpty(t *testing.T) {
  	// Default() leaves Rotation as "" — tipSeed treats "" as "daily" at runtime
  	cfg := config.Default()
  	assert.Equal(t, "", cfg.Tip.Rotation)
  }

  func TestTipRotation_RoundTrip(t *testing.T) {
  	dir := t.TempDir()
  	cfg := config.Default()
  	cfg.Tip.Rotation = "hourly"
  	require.NoError(t, cfg.Save(dir))

  	loaded, err := config.Load(dir)
  	require.NoError(t, err)
  	assert.Equal(t, "hourly", loaded.Tip.Rotation)
  }

  func TestTipRotation_Omitempty(t *testing.T) {
  	// When Rotation is "" (zero value), the "tip" block must not appear in YAML
  	dir := t.TempDir()
  	cfg := config.Default() // Rotation is "" — zero value
  	require.NoError(t, cfg.Save(dir))

  	data, err := os.ReadFile(filepath.Join(dir, "config.yaml"))
  	require.NoError(t, err)
  	assert.NotContains(t, string(data), "tip",
  		"empty TipConfig should not appear in YAML output")
  }

  func TestTipRotation_MissingKeyLoadsEmpty(t *testing.T) {
  	// Config files without a "tip" block load with Rotation == ""
  	dir := t.TempDir()
  	yaml := `language: "en"`
  	require.NoError(t, os.WriteFile(filepath.Join(dir, "config.yaml"), []byte(yaml), 0600))

  	cfg, err := config.Load(dir)
  	require.NoError(t, err)
  	assert.Equal(t, "", cfg.Tip.Rotation)
  }
  ```

- [ ] **Step 2: Build to confirm tests reference the not-yet-existing field**

  ```bash
  cd /d/projects/sap-devs-cli
  go build ./...
  ```

  Expected: build fails with `cfg.Tip undefined` — correct, the field doesn't exist yet.

- [ ] **Step 3: Add `TipConfig` struct to `internal/config/config.go`**

  After line 28 (after the closing `}` of `SyncConfig`), insert:

  ```go
  // TipConfig controls tip display behaviour.
  type TipConfig struct {
  	Rotation string `yaml:"rotation,omitempty"` // "daily" | "hourly" | "session"; empty = "daily"
  }
  ```

  In the `Config` struct (line 12), add the field after `Sync`:

  ```go
  Tip TipConfig `yaml:"tip,omitempty"`
  ```

  `Default()` requires no change — `TipConfig{}` (zero value, `Rotation: ""`) is the correct default. `tipSeed` will treat `""` as `"daily"` at runtime. The `omitempty` tag ensures the `tip` block is absent from YAML until the user explicitly sets a value.

- [ ] **Step 4: Build and vet**

  ```bash
  go build ./...
  go vet ./...
  ```

  Expected: both pass with no output.

- [ ] **Step 5: Commit**

  ```bash
  git add internal/config/config.go internal/config/config_test.go
  git commit -m "feat(config): add TipConfig struct with Rotation field"
  ```

---

## Task 2: i18n keys

**Files:**
- Modify: `internal/i18n/catalogs/en.json`
- Modify: `internal/i18n/catalogs/de.json`

- [ ] **Step 1: Add keys to `en.json`**

  Line 101 of `en.json` currently reads:

  ```json
    "config.show.location": "location:        {{.Value}}"
  ```

  It has **no trailing comma**. First, add the comma to line 101, then insert the six new keys after it:

  ```json
    "config.show.location": "location:        {{.Value}}",
    "config.tip_rotation.short": "Set the tip rotation frequency",
    "config.tip_rotation.long": "Set how often the tip changes. Modes: daily (default), hourly, session.\n\nNote: session uses an hourly seed — multiple terminals opened within the same hour show the same tip.",
    "config.tip_rotation.done": "Tip rotation set to {{.Mode}}",
    "config.tip_rotation.current": "Tip rotation: {{.Mode}}",
    "config.tip_rotation.invalid": "Invalid rotation mode \"{{.Mode}}\": must be daily, hourly, or session",
    "config.show.tip_rotation": "tip_rotation:    {{.Value}}",
  ```

  The existing `"init.step4_location_header"` line (previously line 102) already has a leading comma — do not add another.

- [ ] **Step 2: Add same keys to `de.json`**

  First verify that `de.json` contains a `"config.show.location"` key:

  ```bash
  grep -n "config.show.location" internal/i18n/catalogs/de.json
  ```

  If found, perform the same edit as Step 1 at that location (add comma to that line, insert the six keys after it).

  If the key is **not found**, insert the six new keys after `"config.show.sync_disabled"` in `de.json` instead — same comma-then-insert pattern.

  Use identical English values for all six keys; the i18n `Lookup` function falls back to `en` automatically.

- [ ] **Step 3: Build and vet**

  ```bash
  go build ./...
  go vet ./...
  ```

  Expected: both pass. JSON catalog files are embedded at compile time — a syntax error will fail the build immediately.

- [ ] **Step 4: Commit**

  ```bash
  git add internal/i18n/catalogs/en.json internal/i18n/catalogs/de.json
  git commit -m "feat(i18n): add tip_rotation keys to en and de catalogs"
  ```

---

## Task 3: `tipSeed` helper and `--new` flag

**Files:**
- Create: `cmd/tip_test.go`
- Modify: `cmd/tip.go`

- [ ] **Step 1: Create `cmd/tip_test.go` with failing tests**

  Create `cmd/tip_test.go` (uses `package cmd` to access the unexported `tipSeed`):

  ```go
  package cmd

  import (
  	"testing"

  	"github.com/stretchr/testify/assert"
  )

  func TestTipSeed_DailyConsistency(t *testing.T) {
  	// Two calls with the same rotation and useRandom=false must return the same value
  	s1 := tipSeed("daily", false)
  	s2 := tipSeed("daily", false)
  	assert.Equal(t, s1, s2)
  }

  func TestTipSeed_SessionSameAsHourly(t *testing.T) {
  	session := tipSeed("session", false)
  	hourly := tipSeed("hourly", false)
  	assert.Equal(t, session, hourly)
  }

  func TestTipSeed_EmptyStringIsDailyBehavior(t *testing.T) {
  	// "" falls through to the default case — same formula as "daily"
  	empty := tipSeed("", false)
  	daily := tipSeed("daily", false)
  	assert.Equal(t, empty, daily)
  }

  func TestTipSeed_RandomNonZero(t *testing.T) {
  	s := tipSeed("daily", true)
  	assert.NotEqual(t, int64(0), s)
  }

  func TestTipSeed_HourlyAndDailyArePositive(t *testing.T) {
  	daily := tipSeed("daily", false)
  	hourly := tipSeed("hourly", false)
  	assert.Greater(t, daily, int64(0))
  	assert.Greater(t, hourly, int64(0))
  }
  ```

- [ ] **Step 2: Build to confirm tests reference the not-yet-existing `tipSeed`**

  ```bash
  go build ./...
  ```

  Expected: build fails with `undefined: tipSeed` — correct.

- [ ] **Step 3: Add `tipSeed` to `cmd/tip.go` and replace seed logic**

  Insert the `tipSeed` helper in `cmd/tip.go` between `FormatTip` (ends ~line 30) and `tipCmd` (starts ~line 32):

  ```go
  // tipSeed returns the seed for tip selection.
  // useRandom=true (--new flag or dev mode) returns a unique value on every call.
  // Otherwise the seed is derived from the current time at the rotation granularity.
  func tipSeed(rotation string, useRandom bool) int64 {
  	if useRandom {
  		return time.Now().UnixNano()
  	}
  	now := time.Now()
  	switch rotation {
  	case "hourly", "session":
  		// All terms cast to int64 before arithmetic to avoid 32-bit int overflow
  		return int64(now.Year())*100000 + int64(now.YearDay())*24 + int64(now.Hour())
  	default: // "daily" and ""
  		return int64(now.Year())*1000 + int64(now.YearDay())
  	}
  }
  ```

  In `tipCmd.RunE`, replace lines 65–72 (the `now := time.Now()` / `seed :=` / dev-mode block) with:

  ```go
  cfg, err := config.Load(paths.ConfigDir)
  if err != nil {
  	return err
  }

  rotation := cfg.Tip.Rotation
  if rotation != "" && rotation != "daily" && rotation != "hourly" && rotation != "session" {
  	fmt.Fprintf(os.Stderr, "warning: unknown tip_rotation value %q, falling back to daily\n", rotation)
  	rotation = ""
  }

  useRandom := tipNew || os.Getenv("SAP_DEVS_DEV") == "1"
  seed := tipSeed(rotation, useRandom)
  ```

  `tipNew` is the flag variable added in Step 4. The old `now.Unix()` dev-mode path is replaced by `tipSeed(..., true)` which uses `UnixNano()`.

- [ ] **Step 4: Add `tipNew` flag variable and wire it**

  After the existing flag vars at the top of `cmd/tip.go` (lines 17–18), add:

  ```go
  var tipNew bool
  ```

  In the `init()` function, add alongside the existing `--markdown` and `--plain` flag registrations:

  ```go
  tipCmd.Flags().BoolVar(&tipNew, "new", false, "show a different tip than the current rotation slot")
  ```

  The `config` package import is already present in `cmd/tip.go` — confirm it; if absent, add `"github.tools.sap/developer-relations/sap-devs-cli/internal/config"` to the import block.

- [ ] **Step 5: Build and vet**

  ```bash
  go build ./...
  go vet ./...
  ```

  Expected: both pass.

- [ ] **Step 6: Commit**

  ```bash
  git add cmd/tip.go cmd/tip_test.go
  git commit -m "feat(tip): add tipSeed helper, --new flag, and configurable rotation"
  ```

---

## Task 4: `config tip-rotation` subcommand

**Files:**
- Create: `cmd/config_tip_rotation.go`
- Modify: `cmd/config.go`

- [ ] **Step 1: Create `cmd/config_tip_rotation.go`**

  Create the file (mirrors the `configLocationCmd` pattern in `cmd/config_location.go`):

  ```go
  package cmd

  import (
  	"fmt"

  	"github.com/spf13/cobra"
  	"github.tools.sap/developer-relations/sap-devs-cli/internal/config"
  	"github.tools.sap/developer-relations/sap-devs-cli/internal/i18n"
  	"github.tools.sap/developer-relations/sap-devs-cli/internal/xdg"
  )

  var validRotationModes = []string{"daily", "hourly", "session"}

  var configTipRotationCmd = &cobra.Command{
  	Use:   "tip-rotation [daily|hourly|session]",
  	Short: i18n.T(i18n.ActiveLang, "config.tip_rotation.short"),
  	Long:  i18n.T(i18n.ActiveLang, "config.tip_rotation.long"),
  	Args:  cobra.MaximumNArgs(1),
  	RunE: func(cmd *cobra.Command, args []string) error {
  		paths, err := xdg.New()
  		if err != nil {
  			return err
  		}
  		cfg, err := config.Load(paths.ConfigDir)
  		if err != nil {
  			return err
  		}

  		if len(args) == 1 {
  			mode := args[0]
  			if !isValidRotation(mode) {
  				return fmt.Errorf("%s", i18n.Tf(i18n.ActiveLang, "config.tip_rotation.invalid", map[string]any{"Mode": mode}))
  			}
  			cfg.Tip.Rotation = mode
  			if err := cfg.Save(paths.ConfigDir); err != nil {
  				return err
  			}
  			fmt.Fprintln(cmd.OutOrStdout(), i18n.Tf(i18n.ActiveLang, "config.tip_rotation.done", map[string]any{"Mode": mode}))
  			return nil
  		}

  		// No args: show current value
  		mode := cfg.Tip.Rotation
  		if mode == "" {
  			mode = "daily"
  		}
  		fmt.Fprintln(cmd.OutOrStdout(), i18n.Tf(i18n.ActiveLang, "config.tip_rotation.current", map[string]any{"Mode": mode}))
  		return nil
  	},
  }

  func isValidRotation(mode string) bool {
  	for _, v := range validRotationModes {
  		if mode == v {
  			return true
  		}
  	}
  	return false
  }
  ```

- [ ] **Step 2: Update `cmd/config.go` — add `config show` line and register subcommand**

  In `configShowCmd.RunE`, after line 43 (`config.show.sync_disabled`) and before the token status block, add:

  ```go
  tipRotationDisplay := cfg.Tip.Rotation
  if tipRotationDisplay == "" {
  	tipRotationDisplay = "daily"
  }
  fmt.Fprintln(cmd.OutOrStdout(), i18n.Tf(i18n.ActiveLang, "config.show.tip_rotation", map[string]any{"Value": tipRotationDisplay}))
  ```

  In `init()` at line 186, add `configTipRotationCmd` to the existing `configCmd.AddCommand(...)` call:

  ```go
  configCmd.AddCommand(configShowCmd, configSetCmd, configCompanyCmd, configTokenCmd, configLocationCmd, configTipRotationCmd)
  ```

- [ ] **Step 3: Build and vet**

  ```bash
  go build ./...
  go vet ./...
  ```

  Expected: both pass.

- [ ] **Step 4: Smoke-test the commands manually**

  ```bash
  # Build the binary
  go build -o sap-devs-local .

  # Check tip-rotation shows default
  ./sap-devs-local config tip-rotation
  # Expected: "Tip rotation: daily"

  # Set to hourly
  ./sap-devs-local config tip-rotation hourly
  # Expected: "Tip rotation set to hourly"

  # Verify it persisted
  ./sap-devs-local config tip-rotation
  # Expected: "Tip rotation: hourly"

  # Check it appears in config show
  ./sap-devs-local config show
  # Expected: line containing "tip_rotation:    hourly"

  # Invalid mode returns error
  ./sap-devs-local config tip-rotation weekly
  # Expected: error "must be daily, hourly, or session"

  # --new flag produces a tip
  ./sap-devs-local tip --new

  # Reset to daily
  ./sap-devs-local config tip-rotation daily

  # Clean up
  rm sap-devs-local
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add cmd/config_tip_rotation.go cmd/config.go
  git commit -m "feat(config): add tip-rotation subcommand and config show entry"
  ```

---

## Task 5: Final verification and PR

- [ ] **Step 1: Full build and vet**

  ```bash
  go build ./...
  go vet ./...
  ```

  Expected: both pass cleanly.

- [ ] **Step 2: Invoke superpowers:verification-before-completion**

  Use the `superpowers:verification-before-completion` skill before claiming the work is done.

- [ ] **Step 3: Invoke superpowers:finishing-a-development-branch**

  Use the `superpowers:finishing-a-development-branch` skill to choose the merge strategy.
