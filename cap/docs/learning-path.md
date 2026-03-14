# CAP Learning Path

Five progressive milestones, each building on the previous one. Every milestone links to the relevant files in this repo.

---

## Milestone 1 — Understand the Domain Model

**Goal:** Read CDS like a native, understand how types and relationships work.

**Tasks:**

1. Open `db/schema.cds` and find:
   - A custom type with a regex validation (`@assert.format`)
   - An entity using both `cuid` and `managed` mixins
   - An enum with `@assert.range`

2. Answer these questions:
   - What does `Composition of many` mean vs `Association to`?
   - What happens at the database level for a `Composition`?
   - Which entity has `@cds.persistence.journal` and why?

3. Trace how `Film2People` links `Film` and `People` (M:N relationship).

**Key files:** `db/schema.cds`

**Check your understanding:** Run `npm run test` — all model tests should pass.

---

## Milestone 2 — Understand Service Projections

**Goal:** Understand how services convert domain entities into consumer-facing APIs.

**Tasks:**

1. Compare `db/schema.cds` `People` entity with the `People` projection in `srv/people-service.cds`:
   - What fields are removed or made read-only?
   - What is `redirected to`?
   - What does `@odata.draft.enabled` enable?

2. Compare the `Film` entity across two different services:
   - `StarWarsFilm.Film` (in `film-service.cds`) — writable
   - `StarWarsPeople.Film` (in `people-service.cds`) — readonly
   - Same entity, different access modes per service.

3. Call the service via its REST endpoint:
   ```
   GET http://localhost:4004/rest/StarWarsPeople/People
   ```
   Then via OData:
   ```
   GET http://localhost:4004/odata/v4/StarWarsPeople/People?$top=3&$expand=homeworld
   ```

**Key files:** `srv/people-service.cds`, `srv/film-service.cds`

**Check your understanding:** Open Swagger UI at `http://localhost:4004/api-docs` and explore the generated spec.

---

## Milestone 3 — Service Handlers

**Goal:** Understand the `before → on → after` event lifecycle.

**Tasks:**

1. Open `srv/people-service.js` and identify:
   - The `before` hook — what does it validate?
   - The `on` handler for the `rename` action — what does it do?
   - The `after` hook for READ — what does it compute?
   - The `after` hook for write events — what does it emit?

2. Test the `before` validation by trying to create a Person with an empty name:
   ```http
   POST http://localhost:4004/odata/v4/StarWarsPeople/People
   Content-Type: application/json

   { "name": "   " }
   ```
   You should get a `400 Bad Request` with a meaningful message.

3. Call the custom `rename` action:
   ```http
   POST http://localhost:4004/odata/v4/StarWarsPeople/People(<ID>)/rename
   Content-Type: application/json

   { "newName": "Darth Vader" }
   ```

4. Call the unbound `countByGender` function:
   ```
   GET http://localhost:4004/odata/v4/StarWarsPeople/countByGender(gender='male')
   ```

**Key files:** `srv/people-service.js`, `srv/people-service.cds`

**Check your understanding:** Complete [labs/lab-03-handler/](../labs/lab-03-handler/README.md).

---

## Milestone 4 — Authorization

**Goal:** Understand how CAP enforces roles without writing imperative checks.

**Tasks:**

1. Open `srv/services-auth.cds` and understand:
   - Which services are currently public (`@requires: 'any'`)?
   - What does the `@restrict` block on `People` declare?
   - What is the difference between `@requires` and `@restrict`?

2. Enable mock users in `package.json` (under `cds.requires.auth`) and test:
   - Access as a Viewer: can you READ People?
   - Access as an Editor: can you CREATE a new Person?
   - Access as an Admin: can you DELETE?

3. Add a `@requires: 'Admin'` annotation to the `rename` action in `people-service.cds`.
   Verify it blocks non-admin calls.

**Key files:** `srv/services-auth.cds`, `srv/people-service.cds`

**Check your understanding:** Complete [labs/lab-04-auth/](../labs/lab-04-auth/README.md).

---

## Milestone 5 — Testing by Layer

**Goal:** Understand what to test at each layer and how to write effective CAP tests.

**Tasks:**

1. Run the test suite:
   ```bash
   npm run test
   ```

2. Look at `test/model.test.js`:
   - Which tests verify model constraints (`@assert.range`, `@assert.unique`)?
   - Which tests verify service contract (HTTP 200, OData `value` array)?

3. Look at `test/handler.test.js`:
   - Which tests verify handler validation (`before` hook)?
   - Which tests verify that the `rename` action works correctly?
   - Which tests verify `after`-READ enrichment (`displayTitle`)?

4. Write a new test that verifies `countByGender` returns `0` for an unknown gender.

**Key files:** `test/model.test.js`, `test/handler.test.js`

**Reference:** `test/convertData.test.js` shows how to test data migration logic separately.
