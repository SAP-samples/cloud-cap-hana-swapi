# CAP Cheat Sheet

Quick reference for the most common CDS modeling and handler patterns used in this project.

---

## CDS Model Patterns

### Entity with auto-key and audit fields

Every entity in this project mixes in `cuid` and `managed` from `@sap/cds/common`. `cuid` injects a UUID primary key called `ID` — you never have to declare or populate it yourself. `managed` injects four audit fields (`createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`) that CAP fills automatically on every write, including cascade operations. Use this for any persistent entity that needs a stable identity and an audit trail. It eliminates boilerplate, keeps the model clean, and ensures consistent timestamps across all database profiles.

```cds
entity MyEntity : cuid, managed {
    name : String @mandatory;
    code : String(10);
}
// cuid    → adds UUID primary key (ID)
// managed → adds createdAt, createdBy, modifiedAt, modifiedBy
```

📖 [`cuid`](https://cap.cloud.sap/docs/cds/common#aspect-cuid) · [`managed`](https://cap.cloud.sap/docs/cds/common#aspect-managed)

---

### Custom scalar types with validation

CDS lets you define reusable named types that carry their own validation constraints. `@assert.format` takes a regular expression; CAP rejects any value that doesn't match at the framework level — before it ever reaches your handler or the database. Use this whenever a string field has a well-known format (dates, codes, identifiers) that you want enforced consistently across every service that exposes the entity. Centralising the rule in the type means you change it in one place.

```cds
type YearString       : String @assert.format: '^[0-9]+(?:BBY|ABY)$';
type IntegerLikeString: String @assert.format: '^[0-9][0-9,]*$';
```

📖 [Type definitions](https://cap.cloud.sap/docs/cds/cdl#type-definitions) · [`@assert.format`](https://cap.cloud.sap/docs/guides/services/constraints#assert-format)

---

### Enum with `@assert.range`

Inline enums give a field a closed vocabulary of named constants. Adding `@assert.range` tells CAP to enforce that vocabulary at runtime — any value not listed is rejected with a 400. Use this for status fields, classification codes, or any integer/string field where only a specific set of values is valid. It is more powerful than a database check constraint because the validation fires in the framework layer and produces a structured OData error, and the enum values are also exposed in the metadata for client-side validation.

```cds
entity Film : cuid {
    @assert.range
    episode_id : Integer enum {
        I = 1; II = 2; III = 3; /* ... */
    };
}
// CAP rejects any episode_id value not declared in the enum.
```

📖 [Enums](https://cap.cloud.sap/docs/cds/cdl#enums) · [`@assert.range`](https://cap.cloud.sap/docs/guides/services/constraints#assert-range)

---

### One-to-many Composition

A `Composition of many` declares a parent–child ownership relationship. Child records cannot exist outside their parent — CAP enforces this by cascading deletes and by requiring deep-insert payloads to go through the parent. Use this whenever the child entity has no independent lifecycle: episodes belong to a show, line items belong to an order. In OData, the composition exposes as a navigation property and supports deep-insert in a single request.

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

📖 [Compositions](https://cap.cloud.sap/docs/cds/cdl#compositions)

---

### Many-to-many with uniqueness constraint

CAP does not have a native many-to-many shorthand — instead you model an explicit junction entity with two associations. This gives you full control: you can add payload fields to the junction (e.g. a role or order), and you can annotate it like any other entity. `@assert.unique` on a named set of fields creates a real database unique constraint, preventing duplicate pairs from being inserted. Use this pattern whenever two entities can be related multiple times in different contexts — the uniqueness constraint guards data integrity at the DB level.

```cds
entity Film2People : cuid {
    film   : Association to Film;
    people : Association to People;
}
annotate Film2People with @assert.unique.filmPeoplePair : [film, people];
// Prevents duplicate film/people combinations at the DB constraint level.
```

📖 [Many-to-many associations](https://cap.cloud.sap/docs/cds/cdl#many-to-many-associations) · [`@assert.unique`](https://cap.cloud.sap/docs/guides/databases/cdl-to-ddl#unique-constraints)

---

### Computed view (no persistence overhead)

`define view` creates a named CDS query that is translated to a database view — no extra table is created, and the data is always computed on read. Use this for aggregations, joins, or reshapings that are too heavy to materialise but are needed by multiple consumers. Views are composable: another view or service entity can select from them. Because there is no physical table, there is no sync problem — the view always reflects the current state of the underlying data.

```cds
define view peopleCount as
    select from People {
        count(*) as people_count : Integer,
        homeworld.name
    }
    group by homeworld.name;
```

📖 [Views & Projections](https://cap.cloud.sap/docs/cds/cdl#views-projections)

---

### Virtual element (computed in handler, not persisted)

A `virtual` element is declared in the CDS model but has no column in the database. It is invisible to the persistence layer — reads and writes ignore it — but it appears in the OData metadata, so clients know it exists. You populate it in an `after READ` handler. Use this for computed display fields (concatenated labels, formatted values, derived scores) that depend on other fields and would be stale if cached. The model stays the single source of truth for the API contract even though the logic lives in JavaScript.

```cds
entity People as projection on StarWars.People {
    *,
    virtual displayTitle : String  // populated in after-READ handler
}
```

📖 [Virtual elements](https://cap.cloud.sap/docs/cds/cdl#virtual-elements)

---

### Change-journal tracking

`@cds.persistence.journal` tells the HANA HDI deployer to generate an `hdbmigrationtable` instead of a plain `hdbtable`. Every schema change is recorded as a migration step and every row change is captured in a journal table, giving you a full temporal history. Use this on entities where you need a complete audit trail of who changed what and when — regulatory, financial, or safety-critical data. On SQLite and PostgreSQL the annotation is silently ignored, so your local dev workflow is unaffected.

```cds
@cds.persistence.journal
entity Film : cuid, managed {
    title : String @mandatory;
    // ...
}
// Enables temporal history on HANA — every change is logged in a journal table.
// Development fallback: no-op on SQLite (journal tables are HANA-only).
```

📖 [`@cds.persistence.journal` / hdbmigrationtable](https://cap.cloud.sap/docs/guides/databases/hana#enabling-hdbmigrationtable-generation)

---

### Semantic key annotation

`Common.SemanticKey` tells Fiori elements and OData clients which field(s) form the business key of an entity — the field a human would use to identify a record, as opposed to the internal UUID. This drives SmartTable column sorting, SmartForm title rendering, and object page navigation. Without it, Fiori falls back to the technical key (`ID`), producing unintelligible UUIDs in headers and breadcrumbs. Always annotate entities that are displayed in Fiori UIs.

```cds
annotate Film with @(
    Common.SemanticKey : [title]
);
// Tells Fiori/OData that `title` is the business key for display (not the UUID).
// Used by SmartTable and SmartForm to determine which field identifies a record.
```

📖 [SAP vocabularies in CAP](https://cap.cloud.sap/docs/guides/protocols/odata#sap-vocabularies) · [SAP OData Vocabularies (GitHub)](https://github.com/SAP/odata-vocabularies)

---

### Text and text-arrangement annotations

`Common.Text` links a key field to the human-readable field that describes it. `Common.TextArrangement` controls how that description is rendered alongside the key in Fiori controls. `#TextOnly` suppresses the UUID entirely, showing just the label — the most common choice. `#TextFirst` / `#TextLast` show both with the description leading or trailing. Use this on any UUID or code field that is displayed in a Fiori list or form so users see `A New Hope` instead of `3fa85f64-...`.

```cds
annotate Film with {
    ID @(
        Common.Text            : title,
        Common.TextArrangement : #TextOnly
    );
}
// Common.Text: the field that provides a human-readable label for this key.
// #TextOnly: show only the text, not "UUID (text)".
// Other values: #TextFirst, #TextLast, #TextSeparate.
```

📖 [Annotating annotations](https://cap.cloud.sap/docs/guides/protocols/odata#annotating-annotations)

---

### Value help with free-text input

`Common.ValueList` wires a field to a drop-down or type-ahead suggestion list in Fiori. `CollectionPath` names the OData entity set to query for suggestions; `Parameters` maps local fields to fields in the suggestion set, controlling both the in/out binding and which columns appear in the popup. `ValueListWithFixedValues: false` means the user can also type a value that isn't in the list — ideal for fields like `director` where the list is suggestive rather than exhaustive. Set it to `true` for true enumerations (e.g. status codes) to get a proper dropdown.

```cds
annotate Film with {
    title @(
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'title',
                ValueListProperty : 'title'
            }]
        }
    );
}
// false → user can type a value not in the list (free-text + suggestions).
// true  → only values from the list are accepted (fixed/dropdown).
```

📖 [Value helps](https://cap.cloud.sap/docs/guides/uis/fiori#value-helps) · [Convenience option `@cds.odata.valuelist`](https://cap.cloud.sap/docs/guides/uis/fiori#convenience-option-cds-odata-valuelist)

---

### UNION view across entity types

`union all` inside a `define view` lets you merge rows from structurally similar but separate entities into a single queryable surface. This is how this project exposes a unified `Media` entity covering both `Film` and `Show` records. The key constraint is that both branches must project the same columns with compatible types — columns that only exist on one side must be padded with `null` and given an explicit type. Use this whenever you need a polymorphic list view without duplicating service logic.

```cds
define view Media as
    select from Film {
        key ID, title,
        'FILM' as media_type : String,
        director, release_date
    }
    union all select from Show {
        key ID, title,
        'SHOW' as media_type : String,
        director, release_date
    };
// Columns absent on one side must be projected as typed nulls:
// null as episode_id : Integer
```

📖 [`as select from` (full CQL, supports UNION)](https://cap.cloud.sap/docs/cds/cdl#as-select-from)

---

### Personal data annotations (GDPR)

CAP's `@PersonalData` annotations feed the SAP BTP Audit Log service and Personal Data Manager. `EntitySemantics: 'DataSubject'` marks the entity as the person the data is about; `FieldSemantics: 'DataSubjectID'` identifies the technical key. `IsPotentiallyPersonal` flags fields that could identify someone (name, email); `IsPotentiallySensitive` flags fields requiring heightened protection (health, financial). These annotations are purely declarative — no handler code required — and they activate audit logging, data erasure, and reporting automatically when the corresponding BTP services are bound.

```cds
annotate People with @PersonalData : {
    DataSubjectRole : 'Person',
    EntitySemantics : 'DataSubject'
} {
    ID   @PersonalData.FieldSemantics: 'DataSubjectID';
    name @PersonalData.IsPotentiallyPersonal;
    mass @PersonalData.IsPotentiallySensitive;
}
// DataSubject: the person the data is about (triggers audit-log support).
// IsPotentiallyPersonal: field may identify the person (e.g. name, email).
// IsPotentiallySensitive: field requires extra protection (e.g. health, finance).
```

📖 [Annotating personal data](https://cap.cloud.sap/docs/guides/security/data-privacy#annotating-personal-data) · [Personal data annotation reference](https://cap.cloud.sap/docs/guides/security/dpp-annotations#personaldata)

---

### Window function view (PARTITION BY)

CDS supports SQL window functions via the `OVER (PARTITION BY … ORDER BY …)` syntax inside `define view`. Window functions compute aggregates or rankings across a partition of rows without collapsing them the way `GROUP BY` does — every row in the partition keeps its identity while gaining the computed value. Use this for per-group rankings, running totals, or counts that need to stay alongside the individual rows. On HANA this maps directly to native analytical functions; SQLite has supported `OVER()` since version 3.25.

```cds
define view peopleCount as
    select from People distinct {
        count(*) over(
            partition by homeworld.ID
            order by homeworld.name
        ) as people_count : Integer,
        homeworld.name
    }
    order by people_count desc;
// Window functions run on HANA; SQLite supports basic OVER() since 3.25.
// `distinct` deduplicates the projected rows after the window is evaluated.
```

📖 [Window functions](https://cap.cloud.sap/docs/guides/databases/cap-level-dbs#window-functions)

---

### Distinct key-only lookup view

A `define view` with `distinct` and a single `key` field produces a deduplicated list of all unique values for that column. This is the standard CAP pattern for populating value-help dropdowns from free-text fields (like `manufacturer` or `director`) that have no separate master-data entity. The view is lightweight — it is computed on read, backed by a DB index — and can be referenced as the `CollectionPath` in a `Common.ValueList` annotation on any field that uses the same vocabulary.

```cds
define view vManufacturer as
    select from Vehicles distinct {
        key manufacturer
    };
// Produces a unique-values list used as a ValueList CollectionPath.
// `key` on a non-ID field marks it as the OData entity key in the view.
```

📖 [Views & Projections](https://cap.cloud.sap/docs/cds/cdl#views-projections) · [Value helps](https://cap.cloud.sap/docs/guides/uis/fiori#value-helps)

---

### Fuzzy search index (HANA only)

> **HANA Cloud only.** This annotation has no effect on SQLite or PostgreSQL. Place it in a profile-specific extension file under `db/hana/` so it is only applied during HANA deployment.

`@sql.append` injects a raw DDL clause directly after the generated column definition in the HANA artifact. `'FUZZY SEARCH INDEX ON'` tells HANA to build a dedicated inverted index on the column, which is required for fuzzy text matching. Once the index exists, clients can query it with `GET .../People?$search=luke` and CAP routes that to a `CONTAINS(*, 'luke', FUZZY(...))` predicate. `@cds.search` controls which fields are included in `$search`; by default all `String` fields are included. Adding `@Search.fuzzinessThreshold` and `@Search.ranking` on individual fields lets you tune match sensitivity per field.

```cds
// db/hana/index.cds — applied only during HANA deployment
extend star.wars.People with {
    extend name with @sql.append : 'FUZZY SEARCH INDEX ON'
}
```

For clients, fuzzy search is invoked via the standard OData `$search` query option — no custom action needed:

```http
GET /odata/v4/StarWarsPeople/People?$search=luke
```

📖 [`@sql.append` / native DDL clauses](https://cap.cloud.sap/docs/guides/databases/hana#schema-evolution-native-db-clauses) · [Fuzzy search on HANA Cloud](https://cap.cloud.sap/docs/guides/services/served-ootb#fuzzy-search) · [`@cds.search`](https://cap.cloud.sap/docs/guides/services/served-ootb#cds-search)

---

### HANA analytic functions in a view (`first_value`, `to_integer`)

> **HANA Cloud only.** CDS parses these as native SQL expressions; they are passed through to the HANA engine unchanged. Place such views in `db/hana/` so they are only deployed on HANA.

`first_value(expr ORDER BY ...)` is a HANA aggregate function that returns the first value in an ordered group — equivalent to "top 1 by sort key" without a subquery. `to_integer()` is a HANA built-in cast function; because CDS does not have its own integer-cast expression, it is written as a native SQL fragment inside the projection. Combined with `distinct`, this produces a single-row result containing the "winner" across all rows. Use this pattern for ranked-first queries (tallest, heaviest, most recent) where a subquery or application-side sort would be wasteful.

```cds
// db/hana/index.cds
define view star.wars.tallestPerson as
    select from star.wars.People distinct {
        first_value(name order by
            to_integer(height) desc
        ) as tallest_name : String
    };
```

If the CDS compiler cannot parse a native expression (complex window functions, `xmltable`, proprietary casts), use a raw `.hdbview` artifact instead and expose it to the CDS layer with `@cds.persistence.exists`.

📖 [HANA aggregate functions with ORDER BY](https://cap.cloud.sap/docs/guides/databases/hana#regex-functions) · [Native HANA objects (`@cds.persistence.exists`)](https://cap.cloud.sap/docs/guides/databases/hana-native#make-the-object-known-to-cds)

---

## Service Patterns

### Read-only vs writable projections

By default a service entity exposes full CRUD. Annotating it `@readonly` restricts it to GET only — CAP returns 405 for any write attempt, and the OData metadata advertises the entity as non-insertable/non-updatable/non-deletable so Fiori controls disable their edit buttons automatically. Use `@readonly` for aggregated views, lookup data, or any projection you want to expose for read access without accidentally enabling writes through an oversight.

```cds
service MySrv {
    @readonly entity ReadOnlyView as projection on db.Thing;   // GET only
    entity WritableThing          as projection on db.Thing;   // full CRUD
}
```

📖 [`@readonly`](https://cap.cloud.sap/docs/guides/services/constraints#readonly)

---

### Draft-enabled entity

`@odata.draft.enabled` activates CAP's draft choreography for Fiori Elements. A draft is an in-progress edit that is saved server-side but not yet committed — it survives browser refreshes, allows validation on activation, and enables lock-based collision prevention. CAP adds shadow tables, extra navigation properties (`IsActiveEntity`, `HasDraftEntity`, `DraftAdministrativeData`), and a set of OData actions (`draftActivate`, `draftEdit`, `draftDiscard`) automatically. Use this on any entity that a user edits in a Fiori object page.

```cds
@odata.draft.enabled : true
entity Film as projection on StarWars.Film;
// Adds IsActiveEntity, HasDraftEntity, DraftAdministrativeData navigation.
// Access active entities with: GET .../Film(ID=...,IsActiveEntity=true)
```

📖 [Draft support](https://cap.cloud.sap/docs/guides/uis/fiori#draft-support) · [`@odata.draft.enabled`](https://cap.cloud.sap/docs/guides/uis/fiori#enabling-draft-with-odata-draft-enabled)

---

### Custom bound action

A bound action is attached to a specific entity instance — it receives the entity's key as context and can return the updated entity. Declaring it inside the `actions { }` block of a projection ties it to that service entity. Use bound actions for operations with side effects that operate on a known record: state transitions, approvals, renames. The `@requires` annotation on the action itself allows fine-grained auth — different roles can read the entity vs trigger the action.

```cds
entity People as projection on StarWars.People {
    *, homeworld : redirected to Planet
} actions {
    @requires: 'authenticated-user'
    action rename (newName : String not null) returns People;
};
```

📖 [Bound actions](https://cap.cloud.sap/docs/cds/cdl#bound-actions)

---

### Custom unbound function

An unbound function or action belongs to the service, not to a specific entity. It is useful for cross-entity queries, search operations, or anything that doesn't naturally live on a single record. Functions (HTTP GET) are idempotent and take parameters in the URL. Actions (HTTP POST) have side effects. Use unbound operations when the result spans entities or doesn't fit the CRUD model — for example, a search-by-keyword that returns a heterogeneous list.

```cds
service StarWarsPeople {
    function countByGender (gender : String) returns Integer;
}
// HTTP: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
```

📖 [Actions & Functions](https://cap.cloud.sap/docs/cds/cdl#actions)

---

### Redirected association in projection

When you project an entity into a service, its associations still point to the database-layer entities by default. `redirected to` rewires them to the corresponding service-layer entities. This matters for OData navigation: without it, expanding `homeworld` would try to navigate to a `db.People` entity that doesn't exist in the service, causing an error. Use it on every association whose target is also exposed in the same service so that `$expand` and navigation URLs work correctly.

```cds
entity People as projection on StarWars.People {
    *, homeworld : redirected to Planet
    //   ↑ tells OData which service entity Planet refers to (not the DB entity)
}
```

📖 [Redirected associations](https://cap.cloud.sap/docs/guides/services/providing-services#redirected-associations) · [Auto-redirected associations](https://cap.cloud.sap/docs/cds/cdl#auto-redirected-associations)

---

## Handler Patterns

### Module export convention

`cds.service.impl()` is a no-op wrapper whose sole purpose is to give the IDE the type information it needs for `this` (the service instance) inside the callback. Without it, editors treat `this` as `unknown` and you lose autocomplete on `.before()`, `.on()`, `.entities`, etc. The pattern is idiomatic across all CAP Node.js projects — use it consistently so handlers look familiar to anyone who knows CAP.

```js
const cds = require('@sap/cds')
module.exports = cds.service.impl(function () {
    // `this` is the service instance
})
```

📖 [Custom service implementations](https://cap.cloud.sap/docs/node.js/core-services#how-to-provide-custom-service-implementations)

---

### Before hook — validation

`before` handlers run before CAP processes the request — before the DB write, before draft activation, before any framework logic. They are the right place for input validation that should abort the operation. Calling `req.reject()` raises a structured OData error with a status code and propagates back to the caller; no further handlers run. Use `before` for mandatory-field checks, cross-field business rules, or any guard that must fire regardless of how the write was triggered (direct API call, deep-insert, draft activation).

```js
this.before(['CREATE', 'UPDATE'], 'People', req => {
    const { name } = req.data
    if (!name?.trim()) return req.reject(400, 'name must not be blank')
})
// Returning req.reject() aborts the request before any DB write.
```

📖 [`srv.before()`](https://cap.cloud.sap/docs/node.js/core-services#srv-before-request)

---

### On hook — custom action handler

`on` handlers *replace* the default framework behaviour for an event. For custom actions (declared in `.cds`) there is no default, so you must provide an `on` handler or the action returns 501. For CRUD events you can supplement or fully replace CAP's built-in DB processing. The handler receives `req.params[0]` for the bound entity's key and `req.data` for the request body. Use `on` for anything that needs full control: state machine transitions, multi-step writes, calls to external services.

```js
this.on('rename', 'People', async req => {
    const { ID } = req.params[0]   // bound entity key
    const { newName } = req.data
    const { People } = this.entities
    await UPDATE(People).set({ name: newName }).where({ ID })
    return SELECT.one.from(People).where({ ID })
})
```

📖 [`srv.on()` (request)](https://cap.cloud.sap/docs/node.js/core-services#srv-on-request)

---

### After hook — result enrichment

`after` handlers receive the result of the operation (already fetched from the DB) and can mutate it before it is sent to the client. Because a single READ may return one object or an array, `[].concat(results)` normalises both cases safely. Use `after READ` to populate virtual fields, compute derived values, or redact sensitive data. Use `after CREATE/UPDATE` to trigger side-effects that should only fire once the write has succeeded.

```js
this.after('READ', 'People', results => {
    for (const p of [].concat(results)) {
        p.displayTitle = `${p.name} (${p.birth_year ?? 'unknown era'})`
    }
})
// [].concat(results) handles both single object and array responses.
```

📖 [`srv.after()`](https://cap.cloud.sap/docs/node.js/core-services#srv-after-request)

---

### After hook — emit domain event

`this.emit()` publishes a named event to any subscriber — within the same process or, when a messaging service is configured, to an external message broker (SAP Event Mesh, Redis, etc.). Emitting from an `after` hook guarantees the write committed before the event fires. The event payload is whatever you pass; by convention this project uses versioned event names (`Entity.Changed.v1`) so consumers can evolve independently. Use this for any change that other services or consumers need to react to.

```js
this.after(['CREATE', 'UPDATE', 'DELETE'], 'People', async (_, req) => {
    await this.emit('People.Changed.v1', req.data)
})
```

📖 [`srv.emit()`](https://cap.cloud.sap/docs/node.js/core-services#srv-emit-event) · [Messaging](https://cap.cloud.sap/docs/node.js/messaging)

---

### Connect to another service (notifications, messaging)

`cds.connect.to()` returns a service proxy for any service declared in `cds.requires` — whether it's a local CAP service, an external REST/OData API, or a platform service like SAP Alert Notifications. The proxy provides the same `.send()`, `.run()`, and event-handler API as a local service, so you can swap the implementation (real vs mocked) via config without touching handler code. Use this pattern to call external services from within a handler rather than importing an SDK directly.

```js
const alert = await cds.connect.to('notifications')
alert.notify({ NotificationTypeKey: '...', /* ... */ })
```

📖 [`cds.connect.to()`](https://cap.cloud.sap/docs/node.js/core-services#connecting-to-required-services-→-cds-connect)

---

## Authorization Patterns

### Service-level: public / authenticated / specific role

`@requires` on a service sets the minimum access level for the entire service. `'any'` makes it public (no authentication needed). `'authenticated-user'` requires a valid JWT/session but no specific role. An array of role names requires the caller to have at least one of them. This is the coarse-grained gate — lock down the service first, then open up specific entities or operations with `@restrict`. Without any `@requires` annotation, CAP defaults to requiring authentication in production profiles.

```cds
annotate MySrv with @(requires: 'any');               // public
annotate MySrv with @(requires: 'authenticated-user'); // logged in
annotate MySrv with @(requires: ['Viewer', 'Admin']);  // specific roles
```

📖 [`@requires`](https://cap.cloud.sap/docs/guides/security/authorization#requires)

---

### Entity-level: fine-grained CRUD roles

`@restrict` on a service entity gives per-operation role control. Each element in the array grants a set of HTTP verbs (`READ`, `CREATE`, `UPDATE`, `DELETE`, or `*`) to a named role. CAP evaluates them in order and rejects the request with 403 if no element matches the caller's roles. Use this when different personas should have different write privileges on the same entity — a common pattern is: everyone can read, editors can write, only admins can delete.

```cds
annotate MySrv.Thing with @(restrict: [
    { grant: 'READ' },                                        // everyone can read
    { grant: ['CREATE', 'UPDATE'], to: ['Editor', 'Admin'] }, // editor/admin write
    { grant: 'DELETE', to: 'Admin' }                          // admin-only delete
]);
```

📖 [`@restrict`](https://cap.cloud.sap/docs/guides/security/authorization#restrict-annotation)

---

### Instance-level: row-level security

Adding a `where` clause to a `@restrict` element filters which rows a role can see or modify. `$user` resolves to the authenticated user's ID at runtime, making this a zero-code row-level security filter. CAP injects the condition into every query generated for that entity, so it applies whether the read comes from a direct GET, an `$expand`, or an internal `SELECT`. Use this for multi-tenant data, customer portals, or any entity where users should only access their own records.

```cds
annotate MySrv.Orders with @(restrict: [
    { grant: '*', to: 'Customer', where: 'CreatedBy = $user' }
    // Customer can only see/change their own orders
]);
```

📖 [Authorization overview](https://cap.cloud.sap/docs/guides/security/authorization) · [`@restrict`](https://cap.cloud.sap/docs/guides/security/authorization#restrict-annotation)

---

## CLI Commands

The `cds` CLI is the main tool for compiling, deploying, and running CAP projects. `cds watch` starts a live-reload dev server; `cds compile` lets you inspect the resolved CSN model or generate protocol specs without starting a server. `cds deploy` applies the CDS schema to a database, creating or migrating tables as needed — it is profile-aware, so `--profile sqlite` targets your local file and `--profile hana` targets the bound HDI container.

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

📖 [CDS CLI reference](https://cap.cloud.sap/docs/tools/cds-cli) · [`cds compile`](https://cap.cloud.sap/docs/tools/cds-cli#cds-compile)

---

## OData Query Cheat Sheet

OData v4 uses URL system query options (prefixed `$`) to filter, shape, and paginate results. CAP supports the full standard query vocabulary over all its database backends. `$expand` is especially powerful — it resolves associations server-side in a single request, eliminating N+1 round trips. All options can be combined freely; the server applies them in the standard OData evaluation order (filter → order → skip/top → select → expand).

```http
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

📖 [OData query options](https://cap.cloud.sap/docs/guides/protocols/odata#overview)
