# Lab 05 — Test By Layer

## Goal

Write tests that target each CAP layer independently: model constraints, service contract, and handler behavior.

## Background

CAP applications have three distinct testable layers:

| Layer | What to test | Tools |
|-------|-------------|-------|
| **Model** | Constraints (`@assert.range`, `@mandatory`, `@assert.unique`), entity persistence | `cds.connect.to('db')` + direct INSERT/SELECT |
| **Service contract** | HTTP status codes, OData response shape, `$metadata` | `cds.test()` + `GET`/`POST`/`DELETE` |
| **Handler** | Validation logic, action results, after-READ enrichment | `cds.test()` + service-level CRUD |

The key insight: **layer isolation**. Model tests bypass the service; service tests bypass the DB layer. Handler tests go end-to-end but focus on custom logic.

## Steps

### Step 1 — Explore the existing tests

Open `test/model.test.js` and find examples of each layer:

1. Line ~30: Service contract tests — the `Service Endpoints` suite
2. Line ~80: Model tests — `Planet – CRUD via DB`
3. Line ~250: Model constraint test — `Film.episode_id – @assert.range`

### Step 2 — Write a model constraint test

Add this to `test/model.test.js` (inside the top-level `describe` block):

```js
// ─────────────────────────────────────────────────────────────────────────
// People.name – @mandatory
// name is declared @mandatory, which means it cannot be null/empty.
// ─────────────────────────────────────────────────────────────────────────
describe('People.name – @mandatory constraint', () => {
    let peopleSrv

    before(async () => {
        peopleSrv = await cds.connect.to('StarWarsPeople')
    })

    it('rejects a People record with no name', async () => {
        await assert.rejects(
            peopleSrv.run(INSERT.into('People').entries({ gender: 'male' })),
            'Service should reject People without a name'
        )
    })

    it('accepts a People record with a valid name', async () => {
        const db = await cds.connect.to('db')
        await db.run(INSERT.into('star.wars.People').entries({
            name: 'Mandatory-test-person',
            gender: 'male',
        }))
        const [p] = await db.run(
            SELECT.from('star.wars.People').where({ name: 'Mandatory-test-person' })
        )
        assert.ok(p?.ID, 'Should have auto-generated ID')
        await db.run(DELETE.from('star.wars.People').where({ name: 'Mandatory-test-person' }))
    })
})
```

### Step 3 — Write a handler behavior test

Open `test/handler.test.js` and look at the existing tests. Then add a test for the `countByGender` function:

```js
describe('countByGender – unbound function', () => {
    it('returns 0 for an unknown gender', async () => {
        const { data } = await GET(
            `/odata/v4/StarWarsPeople/countByGender(gender='xyzzy-unknown')`
        )
        assert.equal(data.value, 0)
    })

    it('returns a non-negative integer for "male"', async () => {
        const { status, data } = await GET(
            `/odata/v4/StarWarsPeople/countByGender(gender='male')`
        )
        assert.equal(status, 200)
        assert.ok(typeof data.value === 'number' && data.value >= 0,
            'countByGender should return a non-negative integer')
    })
})
```

### Step 4 — Write a service contract test for a custom action

Add this to `test/handler.test.js`:

```js
describe('rename action – service contract', () => {
    let personId

    before(async () => {
        const db = await cds.connect.to('db')
        await db.run(INSERT.into('star.wars.People').entries({
            name: 'Rename-Lab-Test'
        }))
        const [p] = await db.run(
            SELECT.from('star.wars.People').where({ name: 'Rename-Lab-Test' })
        )
        personId = p.ID
    })

    after(async () => {
        const db = await cds.connect.to('db')
        await db.run(DELETE.from('star.wars.People').where({ ID: personId }))
    })

    it('rename action changes the name', async () => {
        const { status } = await POST(
            `/odata/v4/StarWarsPeople/People(${personId})/rename`,
            { newName: 'Renamed Person' }
        )
        assert.equal(status, 200)

        const db = await cds.connect.to('db')
        const [p] = await db.run(SELECT.from('star.wars.People').where({ ID: personId }))
        assert.equal(p.name, 'Renamed Person')
    })
})
```

### Step 5 — Run all tests

```bash
npm run test
```

All tests should pass.

## Expected Outcome

- Mandatory constraint test verifies that `name` cannot be null
- `countByGender` returns 0 for unknown genders and a non-negative integer for known ones
- `rename` action correctly updates the name in the database

## Hints

- `cds.connect.to('db')` gives you direct DB access — no service-layer filtering or authorization.
- `cds.connect.to('StarWarsPeople')` gives you the service — authorization and handlers apply.
- Use `before`/`after` hooks in tests to set up and clean up test data.
- `assert.rejects(promise, message)` verifies that a promise is rejected (i.e., an error is thrown).

## Stretch Exercise

Add a test that verifies the `displayTitle` virtual field is populated in after-READ responses:

```js
it('People READ response includes a populated displayTitle', async () => {
    const { data } = await GET('/odata/v4/StarWarsPeople/People?$top=1')
    const first = data.value[0]
    assert.ok(first?.displayTitle, 'displayTitle should be populated by the after-READ handler')
})
```
