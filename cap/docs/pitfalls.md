# Common CAP Pitfalls and How to Fix Them

These are the most frequently encountered issues when learning or extending this project.

---

## 1. SQLite `SQLITE_BUSY` under parallel data loading

**Symptom:** Data loading script fails intermittently with `SQLITE_BUSY: database is locked`.

**Cause:** SQLite only supports a single writer at a time. If `convertData.js` loads entities in parallel (multiple `Promise.all` batches), concurrent writes conflict.

**Fix:** Run the load script with the `--sequential` flag, or reduce parallelism in `convertData.js`:

```js
// Bad: parallel inserts hit the SQLITE_BUSY limitation
await Promise.all(entities.map(e => db.run(INSERT.into(...).entries(e))))

// Good: sequential inserts
for (const e of entities) {
    await db.run(INSERT.into(...).entries(e))
}
```

**This is SQLite-specific.** HANA and PostgreSQL handle concurrent writes fine.

---

## 2. Draft entity access requires `IsActiveEntity=true`

**Symptom:** `GET /odata/v4/StarWarsFilm/Film(<ID>)` returns 404 even though the record exists.

**Cause:** `@odata.draft.enabled` adds a composite key: `{ID, IsActiveEntity}`. Without `IsActiveEntity`, OData interprets your request as accessing the draft version (which may not exist).

**Fix:** Always include `IsActiveEntity=true` when accessing active records via OData key:

```
GET /odata/v4/StarWarsFilm/Film(ID=<uuid>,IsActiveEntity=true)
```

Or query via `$filter`:
```
GET /odata/v4/StarWarsFilm/Film?$filter=ID eq <uuid> and IsActiveEntity eq true
```

**Direct DB access** (via `cds.connect.to('db')`) is not affected — use plain `SELECT.from('star.wars.Film')`.

---

## 3. HANA deployment clears generated folders

**Symptom:** After `npm run hana`, TypeScript types or other generated artifacts disappear.

**Cause:** `cds deploy --to hana` regenerates `gen/` and can clear previously generated content.

**Fix:** Always re-run `npm run build` after HANA deployment:

```bash
npm run hana   # deploy
npm run build  # regenerate artifacts
```

Add this as a post-deploy step in your CI pipeline.

---

## 4. `@assert.target` and soft vs hard foreign keys

**Symptom:** Creating a `People` record with a non-existent `homeworld_ID` either silently succeeds or throws a cryptic error depending on profile.

**Cause:** `@assert.target` (on the `homeworld` association in `schema.cds`) validates that the referenced `Planet` exists. However, in SQLite this is enforced by CAP at the service layer; in HANA it is backed by a real FK constraint.

**Rule of thumb:**
- Service-layer validation via `@assert.target` is the correct approach — it works on all backends.
- Do **not** rely on DB-level FK errors as your only guard.

---

## 5. Profile-specific entity visibility

**Symptom:** An entity works in SQLite but gives a 404 or is missing from `$metadata` in HANA.

**Cause:** Some CDS views are marked `@cds.persistence.skip` in certain profile extensions, making them invisible when that profile is active.

**Diagnosis:**

```bash
# Check what the resolved service model looks like per profile
cds compile srv --profile sqlite --to json | grep '"name"' | head -20
cds compile srv --profile hana --to json   | grep '"name"' | head -20
```

The `test/model.test.js` suite includes profile-scoping tests for exactly this reason:

```bash
npm run test:profile
```

---

## 6. Forgetting `[].concat(results)` in after-READ handlers

**Symptom:** After-READ handler crashes or does nothing when reading a single record (by key).

**Cause:** CAP passes an array to after-READ for list reads, but a **single object** for key-based reads. If you write `for (const r of results)` without normalizing, it fails or iterates over object keys.

**Fix:** Always normalize before iterating:

```js
this.after('READ', 'People', results => {
    for (const p of [].concat(results)) {  // handles both array and single object
        p.displayTitle = `${p.name} (${p.birth_year ?? 'unknown era'})`
    }
})
```

---

## 7. `@requires` vs `@restrict` confusion

**Symptom:** Adding `@requires: 'Editor'` to an entity still allows anonymous reads.

**Cause:** `@requires` and `@restrict` behave differently:
- `@requires: ['A', 'B']` means the user must hold **at least one** of those roles.
- `@restrict: [{ grant: 'READ' }]` (no `to`) means **any authenticated user** can READ.

**Mental model:**

```
@requires → coarse-grained "can you enter the room at all?"
@restrict  → fine-grained "what can you do once inside?"
```

If you annotate with only `@requires: 'Editor'` at entity level, no anonymous user can access it. If you want public READ but restricted WRITE:

```cds
annotate MySrv.Thing with @(restrict: [
    { grant: 'READ' },                          // any (including anonymous)
    { grant: ['CREATE', 'UPDATE', 'DELETE'], to: 'Editor' }
]);
```

---

## 8. Projection with `redirected to` breaks navigation if entity is missing

**Symptom:** `$expand=homeworld` on `StarWarsPeople.People` returns an OData error about unresolvable navigation.

**Cause:** In service projections, if you forget `homeworld : redirected to Planet`, CAP cannot resolve which service entity `homeworld` should navigate to. The association exists in the model but has no valid target in the service scope.

**Fix:** Always redirect associations in projections:

```cds
entity People as projection on StarWars.People {
    *, homeworld : redirected to Planet   // ← required for $expand to work
}
```

---

## 9. Calling `cds.connect.to(...)` inside hot paths

**Symptom:** Performance degrades under load because every request re-establishes a service connection.

**Cause:** `cds.connect.to(...)` resolves the connection each time it is called. In hot paths (inside a handler that runs per-request), this adds overhead.

**Fix:** Cache the connection at module or service scope:

```js
// Bad: re-connects on every request
this.after('CREATE', 'People', async (_, req) => {
    const alert = await cds.connect.to('notifications')  // called every time
    alert.notify(...)
})

// Good: annotate that connect.to caches internally (it does after first call),
// but prefer top-level binding for clarity:
let _alert
const getAlert = () => _alert ??= cds.connect.to('notifications')

this.after('CREATE', 'People', async (_, req) => {
    const alert = await getAlert()
    alert.notify(...)
})
```

Note: `cds.connect.to` already returns a cached promise after the first call per service name, so in practice the issue is mostly about readability and explicit lifecycle management.

---

## 10. `npm run build` doesn't update types after schema change

**Symptom:** After adding a new entity to `schema.cds`, TypeScript files in `types/` are stale.

**Cause:** `npm run build` runs `cds build` which only regenerates `gen/`. The TypeScript type stubs in `types/` were generated separately.

**Fix:**

```bash
npm run build
# Then regenerate TypeScript types:
cds compile '*' --to ts
```

Types live in `cap/types/` and reflect the service/schema definitions at generation time.
