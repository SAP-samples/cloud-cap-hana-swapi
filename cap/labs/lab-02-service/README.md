# Lab 02 — Create a Service Projection

## Goal

Expose the `Location` entity (from Lab 01) through the existing `StarWarsPeople` service, with appropriate access controls.

> **Prerequisite:** Complete Lab 01 first.

## Background

CDS **service projections** let you decide which entities to expose, under what shape, and with what constraints. This lab teaches you:

- How to add an entity to an existing service
- How `@readonly` prevents writes at the service boundary
- How `redirected to` resolves associations in the service scope
- How service-level and entity-level access annotations work together

## Steps

### Step 1 — Expose Location in the People service

Open `srv/people-service.cds` and add a `Location` projection inside the `service StarWarsPeople` block, after the last entity definition:

```cds
@readonly : true
entity Location as projection on StarWars.Location {
    *, planet : redirected to Planet
};
```

### Step 2 — Verify it appears in $metadata

Start the service:
```bash
npm run sqlite
```

Then fetch the metadata and check that `Location` is listed:
```
GET http://localhost:4004/odata/v4/StarWarsPeople/$metadata
```

Search for `Location` in the XML response.

### Step 3 — Test read and write behavior

Read (should work):
```
GET http://localhost:4004/odata/v4/StarWarsPeople/Location
```

Try to write (should be rejected with 405 Method Not Allowed):
```http
POST http://localhost:4004/odata/v4/StarWarsPeople/Location
Content-Type: application/json

{ "name": "Test Location" }
```

Verify you get a `405` or a `400` error — `@readonly` blocks all mutations.

### Step 4 — Add an OData test

Add a test to `test/model.test.js` (inside the existing `describe` block):

```js
it('Location entity is exposed read-only in StarWarsPeople service', async () => {
    const { status, data } = await GET('/odata/v4/StarWarsPeople/Location')
    assert.equal(status, 200)
    assert.ok(Array.isArray(data.value), 'Should return OData value array')
})
```

### Step 5 — Run tests

```bash
npm run test
```

## Expected Outcome

- `Location` appears in `$metadata` for `StarWarsPeople`
- `GET /odata/v4/StarWarsPeople/Location` returns HTTP 200
- `POST` to Location is rejected (read-only)
- New test passes

## Hints

- `@readonly` is a shorthand for `@Capabilities.Insertable: false`, `@Capabilities.Updatable: false`, `@Capabilities.Deletable: false`.
- `redirected to Planet` is needed so that OData `$expand=planet` works — without it, the association target is unresolved in the service scope.
- If you get a compile error about `Location` not being found, make sure you added it inside the `namespace star.wars;` block in `schema.cds`.

## Stretch Exercise

Make `Location` writable (remove `@readonly`) and add it to `services-auth.cds` so that only `Editor` role users can create or update Locations.
