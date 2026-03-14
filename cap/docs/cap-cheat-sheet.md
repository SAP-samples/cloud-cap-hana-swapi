# CAP Cheat Sheet

Quick reference for the most common CDS modeling and handler patterns used in this project.

---

## CDS Model Patterns

### Entity with auto-key and audit fields

```cds
entity MyEntity : cuid, managed {
    name : String @mandatory;
    code : String(10);
}
// cuid  → adds UUID primary key (ID)
// managed → adds createdAt, createdBy, modifiedAt, modifiedBy
```

### Custom scalar types with validation

```cds
type YearString       : String @assert.format: '^[0-9]+(?:BBY|ABY)$';
type IntegerLikeString: String @assert.format: '^[0-9][0-9,]*$';
```

### Enum with `@assert.range`

```cds
entity Film : cuid {
    @assert.range
    episode_id : Integer enum {
        I = 1; II = 2; III = 3; /* ... */
    };
}
// CAP rejects any episode_id value not declared in the enum.
```

### One-to-many Composition

```cds
entity Film : cuid {
    characters : Composition of many Film2People
                     on characters.film = $self;
}
entity Film2People : cuid {
    film   : Association to Film;
    people : Association to People;
}
// Composition: child records are owned by the parent — cascading delete applies.
```

### Many-to-many with uniqueness constraint

```cds
entity Film2People : cuid {
    film   : Association to Film;
    people : Association to People;
}
annotate Film2People with @assert.unique.filmPeoplePair : [film, people];
// Prevents duplicate film/people combinations at the DB constraint level.
```

### Computed view (no persistence overhead)

```cds
define view peopleCount as
    select from People {
        count(*) as people_count : Integer,
        homeworld.name
    }
    group by homeworld.name;
```

### Virtual element (computed in handler, not persisted)

```cds
entity People as projection on StarWars.People {
    *,
    virtual displayTitle : String  // populated in after-READ handler
}
```

---

## Service Patterns

### Read-only vs writable projections

```cds
service MySrv {
    @readonly entity ReadOnlyView as projection on db.Thing;   // GET only
    entity WritableThing          as projection on db.Thing;   // full CRUD
}
```

### Draft-enabled entity

```cds
@odata.draft.enabled : true
entity Film as projection on StarWars.Film;
// Adds IsActiveEntity, HasDraftEntity, DraftAdministrativeData navigation.
// Access active entities with: GET .../Film(ID=...,IsActiveEntity=true)
```

### Custom bound action

```cds
entity People as projection on StarWars.People {
    *, homeworld : redirected to Planet
} actions {
    @requires: 'authenticated-user'
    action rename (newName : String not null) returns People;
};
```

### Custom unbound function

```cds
service StarWarsPeople {
    function countByGender (gender : String) returns Integer;
}
// HTTP: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
```

### Redirected association in projection

```cds
entity People as projection on StarWars.People {
    *, homeworld : redirected to Planet
    //   ↑ tells OData which service entity Planet refers to (not the DB entity)
}
```

---

## Handler Patterns

### Module export convention

```js
const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    // `this` is the service instance
})
```

### Before hook — validation

```js
this.before(['CREATE', 'UPDATE'], 'People', req => {
    const { name } = req.data
    if (!name?.trim()) return req.reject(400, 'name must not be blank')
})
// Returning req.reject() aborts the request before any DB write.
```

### On hook — custom action handler

```js
this.on('rename', 'People', async req => {
    const { ID } = req.params[0]   // bound entity key
    const { newName } = req.data
    const { People } = this.entities
    await UPDATE(People).set({ name: newName }).where({ ID })
    return SELECT.one.from(People).where({ ID })
})
```

### After hook — result enrichment

```js
this.after('READ', 'People', results => {
    for (const p of [].concat(results)) {
        p.displayTitle = `${p.name} (${p.birth_year ?? 'unknown era'})`
    }
})
// [].concat(results) handles both single object and array responses.
```

### After hook — emit domain event

```js
this.after(['CREATE', 'UPDATE', 'DELETE'], 'People', async (_, req) => {
    await this.emit('People.Changed.v1', req.data)
})
```

### Connect to another service (notifications, messaging)

```js
const alert = await cds.connect.to('notifications')
alert.notify({ NotificationTypeKey: '...', /* ... */ })
```

---

## Authorization Patterns

### Service-level: public / authenticated / specific role

```cds
annotate MySrv with @(requires: 'any');               // public
annotate MySrv with @(requires: 'authenticated-user'); // logged in
annotate MySrv with @(requires: ['Viewer', 'Admin']);  // specific roles
```

### Entity-level: fine-grained CRUD roles

```cds
annotate MySrv.Thing with @(restrict: [
    { grant: 'READ' },                                     // everyone can read
    { grant: ['CREATE', 'UPDATE'], to: ['Editor', 'Admin'] }, // editor/admin write
    { grant: 'DELETE', to: 'Admin' }                        // admin-only delete
]);
```

### Instance-level: row-level security

```cds
annotate MySrv.Orders with @(restrict: [
    { grant: '*', to: 'Customer', where: 'CreatedBy = $user' }
    // Customer can only see/change their own orders
]);
```

---

## CLI Commands

```bash
# Start with SQLite (development)
cds watch --profile sqlite

# Compile to see the resolved CSN model
cds compile db --to json | head -50

# Generate OpenAPI spec
cds compile srv --service all -o docs --to openapi

# Generate AsyncAPI spec
cds compile srv --service all -o docs --to asyncapi

# Deploy to SQLite file
cds deploy --profile sqlite

# Build for production
cds build
```

---

## OData Query Cheat Sheet

```
# Read list with paging
GET /odata/v4/StarWarsPeople/People?$top=5&$skip=10

# Filter
GET /odata/v4/StarWarsPeople/People?$filter=gender eq 'female'

# Expand association
GET /odata/v4/StarWarsPeople/People?$expand=homeworld

# Select specific fields
GET /odata/v4/StarWarsPeople/People?$select=name,birth_year

# Sort
GET /odata/v4/StarWarsPeople/People?$orderby=name asc

# Count
GET /odata/v4/StarWarsPeople/People/$count

# Combined
GET /odata/v4/StarWarsPeople/People?$filter=gender eq 'male'&$orderby=name&$top=3&$expand=homeworld($select=name)

# Draft active entity by key
GET /odata/v4/StarWarsFilm/Film(ID=<uuid>,IsActiveEntity=true)

# Bound action
POST /odata/v4/StarWarsPeople/People(<ID>)/rename
{ "newName": "Darth Vader" }

# Unbound function
GET /odata/v4/StarWarsPeople/countByGender(gender='female')
```
