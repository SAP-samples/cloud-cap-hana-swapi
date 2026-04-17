# Configurable Tip Rotation — Design Spec

**Date:** 2026-04-17
**Status:** Approved
**Project:** sap-devs-cli

---

## Overview

Allow users to control how often `sap-devs tip` rotates to a new tip. The current behaviour (one tip per calendar day, seed = `year*1000+yearday`) becomes the `daily` default. Two new modes are added: `hourly` and `session`. A `--new` flag gives a one-off fresh tip without touching config.

All modes remain stateless — seed is computed from the current time, no state file is written.

---

## Data Model

Add a `TipConfig` sub-struct to `internal/config/config.go`:

```go
type TipConfig struct {
    Rotation string `yaml:"rotation,omitempty"` // "daily" | "hourly" | "session"
}

type Config struct {
    CompanyRepo string     `yaml:"company_repo,omitempty"`
    Language    string     `yaml:"language,omitempty"`
    Location    string     `yaml:"location,omitempty"`
    Sync        SyncConfig `yaml:"sync"`
    Tip         TipConfig  `yaml:"tip,omitempty"`
}
```

`Default()` sets `Tip: TipConfig{Rotation: "daily"}`. An empty `Rotation` string is treated as `"daily"` so existing config files without the key continue to work.

The `tip` block is omitted from `config.yaml` until the user explicitly sets a value (`omitempty`).

---

## Seed Logic

Replace the hardcoded seed in `cmd/tip.go` with a helper:

```go
func tipSeed(rotation string, useRandom bool) int64 {
    if useRandom {
        return time.Now().UnixNano()
    }
    now := time.Now()
    var base int64
    switch rotation {
    case "hourly", "session":
        // All terms cast to int64 before arithmetic to avoid 32-bit int overflow
        base = int64(now.Year())*100000 + int64(now.YearDay())*24 + int64(now.Hour())
    default: // "daily" and empty string
        base = int64(now.Year())*1000 + int64(now.YearDay())
    }
    return base
}
```

### Rotation modes

| Mode      | Seed formula                          | Behaviour                                         |
| --------- | ------------------------------------- | ------------------------------------------------- |
| `daily`   | `year*1000 + yearday`                 | Same tip all day (current default)                |
| `hourly`  | `year*100000 + yearday*24 + hour`     | New tip each hour                                 |
| `session` | Same as `hourly`                      | New tip per hour (stateless approximation)        |

**Note on `session` mode:** True per-terminal-session rotation would require a state file. `session` is a stateless approximation that rotates the tip once per hour. Users who open multiple terminals within the same hour will see the same tip. This is documented in the command's `Long` description.

### `--new` flag

Passes `useRandom = true` to `tipSeed`, using `time.Now().UnixNano()` as the seed. This guarantees a different tip on every invocation, regardless of pool size.

Normal invocation passes `useRandom = false`.

### Dev mode

`SAP_DEVS_DEV=1` continues to bypass `tipSeed` entirely and uses `time.Now().UnixNano()` directly (replacing the current `now.Unix()` — a minor precision improvement, same intent). This change is included in the `cmd/tip.go` row of Files Changed.

`--new` is added to `TipCmd` only; it does not affect `tip install`/`tip uninstall`.

### Invalid stored rotation value

If `cfg.Tip.Rotation` is non-empty and not one of `daily`, `hourly`, `session` (e.g. a hand-edited typo), `cmd/tip.go` prints a warning to stderr and falls back to `daily`:

```text
warning: unknown tip_rotation value "weakly", falling back to daily
```

This is non-fatal — the command continues normally.

---

## Config Subcommand

New subcommand `configTipRotationCmd` registered under `configCmd` in `cmd/config.go`, following the pattern of `configLocationCmd`:

```text
sap-devs config tip-rotation [daily|hourly|session]
```

**With a mode argument:**

- Validates the value is one of `daily`, `hourly`, `session`; returns an error for unrecognised values.
- Writes `cfg.Tip.Rotation` to `config.yaml`.
- Prints confirmation via `i18n.Tf(lang, "config.tip_rotation.done", ...)`.

**With no argument:**

- Prints the current mode via `i18n.Tf(lang, "config.tip_rotation.current", ...)` (shows `daily` if unset).

The command's `Short` and `Long` cobra fields use `i18n.T(lang, "config.tip_rotation.short")` and `i18n.T(lang, "config.tip_rotation.long")` respectively. The `Long` description explains that `session` is a per-hour stateless approximation.

### Required i18n keys (add to `internal/i18n/` catalogs for `en` and `de`)

| Key                            | English value |
| ------------------------------ | ------------- |
| `config.tip_rotation.short`   | `Set the tip rotation frequency` |
| `config.tip_rotation.long`    | `Set how often the tip changes. Modes: daily (default), hourly, session.\n\nNote: session uses an hourly seed — multiple terminals opened within the same hour show the same tip.` |
| `config.tip_rotation.done`    | `Tip rotation set to {{.Mode}}` |
| `config.tip_rotation.current` | `Tip rotation: {{.Mode}}` |
| `config.tip_rotation.invalid` | `Invalid rotation mode "{{.Mode}}": must be daily, hourly, or session` |
| `config.show.tip_rotation`    | `Tip rotation: {{.Value}}` |

### `config show` update

`configShowCmd` prints fields explicitly via `i18n.Tf` calls (it does not auto-serialise the struct). A new output line must be added for `cfg.Tip.Rotation` using the `config.show.tip_rotation` key, following the pattern of existing fields such as `config.show.location`.

---

## Files Changed

| File                   | Change |
| ---------------------- | ------ |
| `internal/config/config.go` | Add `TipConfig` struct; add `Tip TipConfig` field to `Config`; update `Default()` |
| `cmd/tip.go`           | Add `tipSeed()` helper; replace hardcoded seed; update dev-mode seed from `Unix()` to `UnixNano()`; add `--new` flag; add invalid-rotation warning |
| `cmd/config.go`        | Add `configTipRotationCmd` subcommand; add `cfg.Tip.Rotation` line to `configShowCmd` |
| `internal/i18n/`       | Add i18n keys listed above to `en` and `de` catalogs |

---

## Out of Scope

- State-file-based "true session" tracking (each new terminal = new tip) — the hourly seed is an acceptable stateless approximation.
- Friday pinned-tip override (`pinned_weekday` field) — tracked separately in backlog.
- Enum type for rotation values — string with runtime validation is sufficient.
