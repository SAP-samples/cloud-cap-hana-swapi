# Lab 01 — Extend the Domain Model

## Goal

Add a new entity `Location` to the domain model, link it to existing entities, and verify your changes compile and test cleanly.

## Background

This lab teaches you how CAP's **domain model** (`db/schema.cds`) is structured and how new entities relate to the rest of the schema. You'll learn:

- How to declare a CDS entity with typed elements
- How `cuid` and `managed` mixins add standard fields automatically
- How `Association` links two entities

## Steps

### Step 1 — Add the `Location` entity

Open `db/schema.cds` and add the following entity at the end of the `star.wars` namespace block (after the last entity or view):

```cds
/**
 * A named location in the Star Wars universe (not a full Planet, just a place).
 */
entity Location : cuid, managed {
    name        : String @mandatory;
    description : String(500);
    planet      : Association to Planet;
}
```

### Step 2 — Verify the model compiles

From `cap/`:

```bash
cds compile db --to json > /dev/null && echo "Model OK"
```

You should see `Model OK`. If you get an error, check your syntax carefully.

### Step 3 — Add a basic test

Open `test/model.test.js` and add a test inside the `describe('Star Wars CDS Model Tests', ...)` block:

```js
describe('Location entity', () => {
    let db
    before(async () => { db = await cds.connect.to('db') })
    after(async () => {
        await db.run(DELETE.from('star.wars.Location').where({ name: { like: '%-lab01' } }))
    })

    it('inserts a Location with an auto-generated ID', async () => {
        await db.run(INSERT.into('star.wars.Location').entries({
            name: 'Mos Eisley-lab01',
            description: 'A wretched hive of scum and villainy',
        }))
        const [loc] = await db.run(
            SELECT.from('star.wars.Location').where({ name: 'Mos Eisley-lab01' })
        )
        assert.ok(loc?.ID, 'Location.ID should be auto-generated')
        assert.equal(loc.name, 'Mos Eisley-lab01')
    })
})
```

### Step 4 — Run the tests

```bash
npm run test
```

All existing tests should still pass, and your new test should pass too.

## Expected Outcome

- `cds compile db` completes without errors
- `npm run test` shows the new Location test passing
- The entity has a UUID primary key, `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy` (from `cuid` + `managed`)

## Hints

- The `star.wars` namespace applies to everything in `schema.cds` because of the `namespace star.wars;` declaration at the top.
- `cuid` is from `@sap/cds/common` — it adds `key ID : UUID`.
- `managed` is from `@sap/cds/common` — it adds the four audit fields.
- You don't need to reference `cap/db/sqlite/index.cds` — it automatically includes `schema.cds`.

## Stretch Exercise

Add a `Composition of many Film2Locations` so Films can reference Locations (like filming sites in the lore). Follow the pattern of `Film2People` in `schema.cds`.
