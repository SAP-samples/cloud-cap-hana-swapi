---
description: "Use when editing CAP service handlers in cap/srv/*.js. Covers hook patterns, notifications/messaging usage, logging, and safe event emission conventions."
name: "CAP Service Handler JS Rules"
applyTo: "cap/srv/**/*.js"
---
# CAP Service Handler JS Rules

## Handler placement

- Keep custom runtime logic in `cap/srv/*.js` handlers.
- Keep CDS contracts in `*.cds`; avoid embedding schema logic in JS handlers.

## CAP handler patterns

- Prefer `module.exports = cds.service.impl(function () { ... })` for service extension.
- Use lifecycle hooks (`before/on/after`) with clear entity and event scope.
- Follow existing event style in `people-service.js` for notify + emit flows when relevant.

## Logging and robustness

- Use CAP logger (`cds.log(...)`) for operational logs.
- Keep logs useful and concise; avoid noisy per-row logs in hot paths.
- Validate request data before emitting domain events when payload shape is required by consumers.

## Integration conventions

- For notifications/messaging, prefer CAP service connections (`cds.connect.to(...)`) over ad-hoc clients.
- Preserve existing event names/versioning conventions (for example `People.Changed.v1`) unless explicitly migrating.

## Change hygiene

- Keep handlers small and readable; extract helper functions when logic grows.
- Include a quick verification step in your response (how behavior was checked).
