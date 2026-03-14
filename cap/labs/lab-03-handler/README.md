# Lab 03 — Add Handler Logic

## Goal

Add a `before` validation hook and an `after` enrichment hook to the `StarWarsPeople` service for a new event.

## Background

This lab teaches the **CAP event lifecycle**:

```
Request arrives
    │
    ▼
before  ← validate, guard, set defaults
    │
    ▼
on      ← business logic (or generic CRUD if no handler)
    │
    ▼
after   ← enrich results, fire side effects
    │
    ▼
Response sent
```

You'll add both a validation guard and a result enricher, then write a test to verify each.

## Steps

### Step 1 — Explore the existing handler

Open `srv/people-service.js` and read through all the handlers. Notice:

1. The `before` hook validates `name` — what does it check?
2. The `on` hook for `rename` — how does it find the entity key?
3. The `after READ` hook — what property does it compute?
4. The `after CREATE/UPDATE/DELETE` hook — what does it emit?

### Step 2 — Add a `before READ` logging hook

Add a new hook at the top of the `cds.service.impl` function body in `srv/people-service.js`:

```js
// ─── Showcase: before READ hook ───────────────────────────────────────────
// before-READ runs before every read, including $expand navigations.
// Use it for query guards (e.g. reject overly broad queries) or audit logging.
this.before('READ', 'People', req => {
    const log = cds.log('people')
    log.debug(`READ People — filter: ${JSON.stringify(req.query.SELECT?.where ?? null)}`)
})
```

### Step 3 — Add a `height_cm` virtual field enrichment

First, add a virtual field to the `People` projection in `srv/people-service.cds`.

Find the People entity projection:
```cds
entity People @(cds.redirection.target : false)     as projection on StarWars.People {
    * , homeworld : redirected to Planet,
    virtual displayTitle : String
}
```

And add a second virtual field:
```cds
    virtual displayTitle : String,
    virtual height_cm    : Integer  // parsed from IntegerLikeString; populated in handler
```

Then in `srv/people-service.js`, extend the `after READ People` handler to also populate `height_cm`:

```js
if (p.height && /^\d+$/.test(p.height)) {
    p.height_cm = parseInt(p.height, 10)
}
```

### Step 4 — Run the tests

```bash
npm run test
```

All existing tests should still pass.

### Step 5 — Manually verify

Start the service and read a Person record:
```
GET http://localhost:4004/odata/v4/StarWarsPeople/People?$top=1
```

Check that `displayTitle` and `height_cm` appear in the response.

## Expected Outcome

- `displayTitle` is populated for every Person in list reads
- `height_cm` is populated as an integer when `height` is a pure digit string
- All existing tests pass

## Hints

- `[].concat(results)` handles both single-item and list reads. Without this, key-based reads (`/People(<ID>)`) would pass a plain object, not an array, and `for...of` would iterate over the object's keys.
- `req.reject(400, 'message')` in a `before` handler aborts the request immediately — the `on` and `after` phases never run.
- `this.entities` (inside `cds.service.impl`) gives you the service-level entity definitions, which you should use in `SELECT`/`UPDATE` queries rather than the raw DB entity names.

## Stretch Exercise

Add a `before CREATE People` hook that checks whether a Person with the same `name` already exists and rejects the request with a clear error message if so. Use `SELECT.one.from(this.entities.People).where({ name: req.data.name })` to check.
