# Show Entity: CAP Schema & Service Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `Show` entity (TV series / animated series) to the CAP schema alongside `Film`, expose it through a `StarWarsShow` service, and add unified `Media` + companion UNION views — with no breaking changes to any existing entity or service.

**Architecture:** New `Show` entity with 5 junction tables mirrors the `Film` pattern exactly. UNION views (`Media`, `MediaCharacters`, etc.) are read-only surfaces exposed via the new `StarWarsShow` service. Existing services suppress the new `shows` back-reference compositions via `excluding { shows }` to avoid unresolvable redirection warnings.

**Tech Stack:** SAP CAP CDS (schema + services), Node.js `node:test` (tests), SQLite in-memory (test DB)

---

## File Map

| Action | File | Responsibility |
| --- | --- | --- |
| Modify | `cap/db/schema.cds` | Add `Show` entity, 5 junction tables, back-refs on existing entities, `Media` + 5 companion views |
| Create | `cap/srv/show-service.cds` | `StarWarsShow` service contract — exposes `Show`, junction tables, Media views |
| Create | `cap/srv/show-fiori.cds` | Fiori/UI annotations for `Show` entity |
| Modify | `cap/srv/services-auth.cds` | Register `StarWarsShow` with `@(requires: 'any')` |
| Modify | `cap/srv/film-service.cds` | Suppress `shows` back-ref on all projected shared entities |
| Modify | `cap/srv/people-service.cds` | Suppress `shows` back-ref on People projection |
| Modify | `cap/srv/planet-service.cds` | Suppress `shows` back-ref on Planet projection |
| Modify | `cap/srv/species-service.cds` | Suppress `shows` back-ref on Species projection |
| Modify | `cap/srv/starship-service.cds` | Suppress `shows` back-ref on Starship projection |
| Modify | `cap/srv/vehicle-service.cds` | Suppress `shows` back-ref on Vehicles projection |
| Modify | `cap/test/model.test.js` | Add Show endpoint test + Media view test |

---

## Task 1: Add `Show` Entity and Junction Tables to Schema

**Files:**
- Modify: `cap/db/schema.cds`
- Test: `cap/test/model.test.js`

Before touching schema.cds, understand the insertion points:
- `Show` + its junction tables belong after the `Film2Species` entity (around line 460), before the `People` entity.
- Back-references (`shows` compositions) are added inside the existing `People`, `Planet`, `Species`, `Starship`, `Vehicles` entity blocks.

- [ ] **Step 1: Write the failing test**

Add to the `Service Endpoints` array in `cap/test/model.test.js` (inside the existing `endpoints` array at line ~40):

```javascript
['/odata/v4/StarWarsShow/Show', 'StarWarsShow – Show'],
```

Also add `$metadata` test inside the `OData $metadata` describe block:

```javascript
it('StarWarsShow service exposes valid $metadata document', async () => {
  const { status } = await GET('/odata/v4/StarWarsShow/$metadata')
  assert.equal(status, 200)
})
```

- [ ] **Step 2: Run test to confirm it fails**

```bash
cd cap && node --test test/model.test.js 2>&1 | grep -E "FAIL|PASS|Error"
```

Expected: `FAIL` — `StarWarsShow – Show returns HTTP 200` fails with 404 because the service doesn't exist yet.

- [ ] **Step 3: Add `Show` entity + 5 junction tables to `cap/db/schema.cds`**

Insert after the closing `};` of `Film2Species` (after line ~459) and before `/**\n * All People and Aliens`:

```cds
/**
 * All Star Wars TV Shows, Animated Series, and Streaming Content
 */
@cds.persistence.journal
entity Show : cuid, managed {
    title         : String @mandatory;
    @assert.range
    show_type     : String enum {
        LIVE_ACTION_SERIES  = 'LIVE_ACTION_SERIES';
        ANIMATED_SERIES     = 'ANIMATED_SERIES';
        ANIMATED_FILM       = 'ANIMATED_FILM';
        // Anthology theatrical films (Rogue One, Solo) go in Film using episode_id = 0.
        // ANTHOLOGY is reserved for potential future short-form anthology series only.
        ANTHOLOGY           = 'ANTHOLOGY';
    };
    seasons       : Integer;
    episode_count : Integer;
    network       : String;
    director      : String;
    producer      : String;
    release_date  : Date;
    characters    : Composition of many Show2People    on characters.show = $self;
    planets       : Composition of many Show2Planets   on planets.show    = $self;
    starships     : Composition of many Show2Starships on starships.show  = $self;
    vehicles      : Composition of many Show2Vehicles  on vehicles.show   = $self;
    species       : Composition of many Show2Species   on species.show    = $self;
}

annotate Show with @(
    title              : '{i18n>Show}',
    Common.Label       : '{i18n>Show}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [title],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : title
    }]
) {
    ID        @(
        Core.Computed,
        Common.Text            : title,
        Common.TextArrangement : #TextOnly
    );
    title     @title : '{i18n>title}';
    show_type @title : '{i18n>show_type}';
    seasons   @title : '{i18n>seasons}';
    episode_count @title : '{i18n>episode_count}';
    network   @title : '{i18n>network}';
    director  @title : '{i18n>director}';
    producer  @title : '{i18n>producer}';
    release_date @title : '{i18n>release_date}';
}

entity Show2People : cuid {
    show   : Association to Show;
    people : Association to People;
}

annotate Show2People with @assert.unique.showPeoplePair : [show, people];

annotate Show2People with {
    ID     @Core.Computed;
    show   @(Common.Text : show.title,   Common.TextArrangement : #TextOnly);
    people @(Common.Text : people.name,  Common.TextArrangement : #TextOnly);
};

entity Show2Planets : cuid {
    show   : Association to Show;
    planet : Association to Planet;
}

annotate Show2Planets with @assert.unique.showPlanetPair : [show, planet];

annotate Show2Planets with {
    ID     @Core.Computed;
    show   @(Common.Text : show.title,   Common.TextArrangement : #TextOnly);
    planet @(Common.Text : planet.name,  Common.TextArrangement : #TextOnly);
};

entity Show2Starships : cuid {
    show     : Association to Show;
    starship : Association to Starship;
}

annotate Show2Starships with @assert.unique.showStarshipPair : [show, starship];

annotate Show2Starships with {
    ID       @Core.Computed;
    show     @(Common.Text : show.title,      Common.TextArrangement : #TextOnly);
    starship @(Common.Text : starship.name,   Common.TextArrangement : #TextOnly);
};

// Note: field name is `vehicle` (singular) to match Film2Vehicles and keep
// MediaVehicles UNION branches column-compatible.
entity Show2Vehicles : cuid {
    show    : Association to Show;
    vehicle : Association to Vehicles;
}

annotate Show2Vehicles with @assert.unique.showVehiclePair : [show, vehicle];

annotate Show2Vehicles with {
    ID      @Core.Computed;
    show    @(Common.Text : show.title,    Common.TextArrangement : #TextOnly);
    vehicle @(Common.Text : vehicle.name,  Common.TextArrangement : #TextOnly);
};

// Note: field name is `specie` (singular) to match Film2Species and keep
// MediaSpecies UNION branches column-compatible.
entity Show2Species : cuid {
    show   : Association to Show;
    specie : Association to Species;
}

annotate Show2Species with @assert.unique.showSpeciesPair : [show, specie];

annotate Show2Species with {
    ID     @Core.Computed;
    show   @(Common.Text : show.title,    Common.TextArrangement : #TextOnly);
    specie @(Common.Text : specie.name,   Common.TextArrangement : #TextOnly);
};
```

- [ ] **Step 4: Add `shows` back-reference to each existing entity in `cap/db/schema.cds`**

Inside the `People` entity block (after the existing `starships` composition, before the closing `}`):

```cds
    shows      : Composition of many Show2People
                     on shows.people = $self;
```

Inside the `Planet` entity block (after the existing `residents` composition):

```cds
    shows      : Composition of many Show2Planets
                     on shows.planet = $self;
```

Inside the `Species` entity block (after the existing `films` composition):

```cds
    shows      : Composition of many Show2Species
                     on shows.specie = $self;
```

Inside the `Starship` entity block (after the existing `pilots` composition):

```cds
    shows      : Composition of many Show2Starships
                     on shows.starship = $self;
```

Inside the `Vehicles` entity block (after the existing `pilots` composition):

```cds
    shows      : Composition of many Show2Vehicles
                     on shows.vehicle = $self;
```

- [ ] **Step 5: Create `cap/srv/show-service.cds`** (required before tests pass)

```cds
using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Show Information'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsShow @(path : 'StarWarsShow') {

    @odata.draft.enabled : true
    entity Show            as projection on StarWars.Show;

    @readonly : true
    entity People          as projection on StarWars.People
                              excluding { shows };

    @readonly : true
    entity Planet          as projection on StarWars.Planet
                              excluding { shows };

    @readonly : true
    entity Species         as projection on StarWars.Species
                              excluding { shows };

    @readonly : true
    entity Starship        as projection on StarWars.Starship
                              excluding { shows };

    @readonly : true
    entity Vehicles        as projection on StarWars.Vehicles
                              excluding { shows };

    @readonly : true
    entity Vehicle @(cds.redirection.target : false)
                           as projection on StarWars.Vehicles
                              excluding { shows };

    entity Show2People     as projection on StarWars.Show2People {
        * , people : redirected to People, show : redirected to Show
    };

    entity Show2Planets    as projection on StarWars.Show2Planets {
        * , show : redirected to Show
    };

    entity Show2Starships  as projection on StarWars.Show2Starships {
        * , show : redirected to Show
    };

    entity Show2Species    as projection on StarWars.Show2Species {
        // Keep both `specie` (source naming) and `species` (consumer-friendly alias)
        * , show : redirected to Show, specie : redirected to Species,
        specie as species : redirected to Species
    };

    entity Show2Vehicles   as projection on StarWars.Show2Vehicles {
        * , show : redirected to Show
    };

    @readonly : true
    entity Media            as projection on StarWars.Media;

    @readonly : true
    entity MediaCharacters  as projection on StarWars.MediaCharacters;

    @readonly : true
    entity MediaPlanets     as projection on StarWars.MediaPlanets;

    @readonly : true
    entity MediaSpecies     as projection on StarWars.MediaSpecies;

    @readonly : true
    entity MediaStarships   as projection on StarWars.MediaStarships;

    @readonly : true
    entity MediaVehicles    as projection on StarWars.MediaVehicles;
}
```

- [ ] **Step 6: Run tests — expect PASS for Show endpoint**

```bash
cd cap && node --test test/model.test.js 2>&1 | grep -E "FAIL|PASS|✓|✗|StarWarsShow"
```

Expected: `StarWarsShow – Show returns HTTP 200` PASSES. All previously passing tests still pass.

If CDS complains about `excluding` syntax with inline projections, the fallback is to use `{ * }` without `excluding` and instead expose `Show2*` in those services — but try `excluding` first.

- [ ] **Step 7: Commit**

> **Note:** `show-service.cds` (created in this step) already contains projections for `Media`, `MediaCharacters`, etc. Those views don't exist in `schema.cds` yet — they are added in Task 2. The commit at this step will succeed because CDS resolves views lazily, but running `npm run build` will warn until Task 2 is done. That's expected. Do not run `npm run build` until after Task 2 is complete.

```bash
cd cap && git add db/schema.cds srv/show-service.cds test/model.test.js
git commit -m "feat: add Show entity, junction tables, and StarWarsShow service"
```

---

## Task 2: Add Media UNION Views to Schema

**Files:**
- Modify: `cap/db/schema.cds`
- Test: `cap/test/model.test.js`

- [ ] **Step 1: Write the failing test**

Add to the `Service Endpoints` describe block in `cap/test/model.test.js`:

```javascript
it('StarWarsShow Media view returns HTTP 200 with OData value array', async () => {
  const { status, data } = await GET('/odata/v4/StarWarsShow/Media')
  assert.equal(status, 200, 'Expected 200 for /odata/v4/StarWarsShow/Media')
  assert.ok(Array.isArray(data.value), 'Expected data.value to be an array')
})

it('StarWarsShow MediaCharacters view returns HTTP 200 with OData value array', async () => {
  const { status, data } = await GET('/odata/v4/StarWarsShow/MediaCharacters')
  assert.equal(status, 200)
  assert.ok(Array.isArray(data.value))
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
cd cap && node --test test/model.test.js 2>&1 | grep -E "Media"
```

Expected: FAIL — `Media` not yet in schema.

- [ ] **Step 3: Add Media UNION views to `cap/db/schema.cds`**

Insert after the `Show2Species` entity block and before `/**\n * All People and Aliens`:

```cds
// ─── Unified Media Views ──────────────────────────────────────────────────────
// Read-only UNION views across Film and Show.
// media_type is always 'FILM' or 'SHOW' — use show_type on the Show entity
// itself for finer-grained show classification.
// ─────────────────────────────────────────────────────────────────────────────

define view Media as
    select from Film {
        ID,
        title,
        'FILM'        as media_type    : String,
        director,
        producer,
        release_date,
        episode_id,
        opening_crawl,
        null          as show_type     : String,
        null          as seasons       : Integer,
        null          as episode_count : Integer,
        null          as network       : String
    }
    union all select from Show {
        ID,
        title,
        'SHOW'        as media_type    : String,
        director,
        producer,
        release_date,
        null          as episode_id    : Integer,
        null          as opening_crawl : String(2500),
        show_type,
        seasons,
        episode_count,
        network
    };

define view MediaCharacters as
    select from Film2People   { film.ID as media_ID, 'FILM' as media_type : String, people }
    union all
    select from Show2People   { show.ID as media_ID, 'SHOW' as media_type : String, people };

define view MediaPlanets as
    select from Film2Planets  { film.ID as media_ID, 'FILM' as media_type : String, planet }
    union all
    select from Show2Planets  { show.ID as media_ID, 'SHOW' as media_type : String, planet };

define view MediaSpecies as
    select from Film2Species  { film.ID as media_ID, 'FILM' as media_type : String, specie }
    union all
    select from Show2Species  { show.ID as media_ID, 'SHOW' as media_type : String, specie };

define view MediaStarships as
    select from Film2Starships  { film.ID as media_ID, 'FILM' as media_type : String, starship }
    union all
    select from Show2Starships  { show.ID as media_ID, 'SHOW' as media_type : String, starship };

define view MediaVehicles as
    select from Film2Vehicles  { film.ID as media_ID, 'FILM' as media_type : String, vehicle }
    union all
    select from Show2Vehicles  { show.ID as media_ID, 'SHOW' as media_type : String, vehicle };
```

- [ ] **Step 4: Run tests**

```bash
cd cap && node --test test/model.test.js 2>&1 | grep -E "FAIL|PASS|Media"
```

Expected: All Media tests PASS.

- [ ] **Step 5: Commit**

```bash
cd cap && git add db/schema.cds test/model.test.js
git commit -m "feat: add Media UNION view and MediaCharacters/Planets/Species/Starships/Vehicles companion views"
```

---

## Task 3: Suppress `shows` Back-References in Existing Services

The new `shows` compositions on `People`, `Planet`, `Species`, `Starship`, `Vehicles` will trigger CDS compiler warnings in every existing service that projects these entities, because `Show2*` junction tables are not exposed there. Suppress them with `excluding { shows }`.

**Files:**
- Modify: `cap/srv/film-service.cds`
- Modify: `cap/srv/people-service.cds`
- Modify: `cap/srv/planet-service.cds`
- Modify: `cap/srv/species-service.cds`
- Modify: `cap/srv/starship-service.cds`
- Modify: `cap/srv/vehicle-service.cds`

- [ ] **Step 1: Verify the compiler warns before suppression**

```bash
cd cap && npx cds build 2>&1 | grep -i "redirect\|warn\|shows"
```

Expected: CDS warns about unresolvable redirections for `shows` in multiple services.

If there are no warnings, skip this task — CDS is handling it automatically and no changes are needed.

- [ ] **Step 2: Add `excluding { shows }` to `film-service.cds`**

Each `@readonly` entity projection that is a shared entity (`People`, `Planet`, `Species`, `Starship`, `Vehicles`) needs the exclusion. In `cap/srv/film-service.cds`, change:

```cds
    @readonly : true
    entity People          as projection on StarWars.People;
```

to:

```cds
    @readonly : true
    entity People          as projection on StarWars.People
                              excluding { shows };
```

Repeat for `Planet`, `Species`, `Starship`, `Vehicles` in the same file.

- [ ] **Step 3: Add `excluding { shows }` to `people-service.cds`**

The `People` entity in `people-service.cds` has a complex projection with an explicit column list and an `actions` block. The `excluding` clause must appear after the column list `}` and before `actions {`.

Change:

```cds
    @odata.draft.enabled : true
    entity People @(cds.redirection.target : false)     as projection on StarWars.People {
        * ,
        homeworld         : redirected to Planet,
        virtual displayTitle : String
    } actions {
```

to:

```cds
    @odata.draft.enabled : true
    entity People @(cds.redirection.target : false)     as projection on StarWars.People {
        * ,
        homeworld         : redirected to Planet,
        virtual displayTitle : String
    } excluding { shows } actions {
```

**If the CDS compiler rejects `} excluding { shows } actions {`** (it is non-standard to place `excluding` between `}` and `actions`), use `@(cds.redirection.target: false)` on the `shows` composition directly in `schema.cds` — this is the spec-endorsed suppression pattern and will silence the warning across all services at once. Do not attempt to add `shows : redirected to ...` inside the column list — there is no valid redirection target for `Show2People` in services that don't expose `Show`.

Also add `excluding { shows }` to the `@readonly : true entity Film` projection in people-service.cds (Film has no `shows` back-ref, so skip), and add it to `Planet`, `Species`, `Starship`, `Vehicles` projections.

- [ ] **Step 4: Repeat for `planet-service.cds`, `species-service.cds`, `starship-service.cds`, `vehicle-service.cds`**

In each file, find every projection of `People`, `Planet`, `Species`, `Starship`, `Vehicles` and add `excluding { shows }`. The draft-enabled primary entity in each service (e.g., `Planet` in planet-service.cds) needs it most critically.

- [ ] **Step 5: Verify warnings are gone**

```bash
cd cap && npx cds build 2>&1 | grep -i "redirect\|warn\|shows"
```

Expected: No redirection warnings.

- [ ] **Step 6: Run full test suite to confirm nothing broke**

```bash
cd cap && npm test
```

Expected: All tests PASS (same count as before this task).

- [ ] **Step 7: Commit**

```bash
cd cap && git add srv/film-service.cds srv/people-service.cds srv/planet-service.cds \
              srv/species-service.cds srv/starship-service.cds srv/vehicle-service.cds
git commit -m "fix: suppress Show2* back-reference redirections in existing services"
```

---

## Task 4: Register `StarWarsShow` in Auth and Add Fiori Annotations

**Files:**
- Modify: `cap/srv/services-auth.cds`
- Create: `cap/srv/show-fiori.cds`

- [ ] **Step 1: Update `cap/srv/services-auth.cds`**

Add at the top of the file alongside the other imports:

```cds
using { StarWarsShow } from './show-service';
```

Add alongside the six existing `annotate` lines:

```cds
annotate StarWarsShow with @(requires: 'any');
```

- [ ] **Step 2: Create `cap/srv/show-fiori.cds`**

This provides Fiori List Report and Object Page annotations for `Show`:

```cds
using StarWarsShow as sws from './show-service';

annotate sws.Show with @(UI.TextArrangement : #TextOnly);

annotate sws.Show with @(
    UI : {
        LineItem : [
            { $Type : 'UI.DataField', Value : title },
            { $Type : 'UI.DataField', Value : show_type,     ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : director,      ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : release_date,  ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : seasons,       ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : episode_count, ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : network,       ![@UI.Importance] : #Medium }
        ],
        SelectionFields : [show_type, network, director, release_date],
        HeaderInfo : {
            TypeName       : '{i18n>Show}',
            TypeNamePlural : '{i18n>Shows}',
            Title          : { Value : title },
            Description    : { Value : show_type }
        },
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>ShowDetails}',
                Target : '@UI.FieldGroup#Main'
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>characters}',
                Target : 'characters/@UI.LineItem'
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>planets}',
                Target : 'planets/@UI.LineItem'
            }
        ],
        FieldGroup#Main : {
            Data : [
                { $Type : 'UI.DataField', Value : title },
                { $Type : 'UI.DataField', Value : show_type },
                { $Type : 'UI.DataField', Value : seasons },
                { $Type : 'UI.DataField', Value : episode_count },
                { $Type : 'UI.DataField', Value : network },
                { $Type : 'UI.DataField', Value : director },
                { $Type : 'UI.DataField', Value : producer },
                { $Type : 'UI.DataField', Value : release_date }
            ]
        }
    }
);
```

- [ ] **Step 3: Run tests to confirm nothing broke**

```bash
cd cap && npm test
```

Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
cd cap && git add srv/services-auth.cds srv/show-fiori.cds
git commit -m "feat: register StarWarsShow service in auth; add Fiori annotations for Show"
```

---

## Task 5: Add Show-Specific Model Tests

Expand `cap/test/model.test.js` with tests that validate the `Show` entity's constraints and the `Media` view behaviour.

**Files:**
- Modify: `cap/test/model.test.js`

- [ ] **Step 1: Write the failing tests**

Add a new `describe` block after the existing `OData $metadata` block:

```javascript
// ─────────────────────────────────────────────────────────────────────────
// Show – CRUD and constraints
// ─────────────────────────────────────────────────────────────────────────
describe('Show – CRUD and constraints', () => {
  let db
  let showId

  before(async () => {
    db = await cds.connect.to('db')
  })

  after(async () => {
    if (showId) {
      await db.run(DELETE.from('star.wars.Show2People').where({ show_ID: showId }))
      await db.run(DELETE.from('star.wars.Show').where({ ID: showId }))
    }
  })

  it('creates a Show with valid fields', async () => {
    const result = await db.run(
      INSERT.into('star.wars.Show').entries({
        title: 'The Mandalorian',
        show_type: 'LIVE_ACTION_SERIES',
        seasons: 3,
        episode_count: 24,
        network: 'Disney+',
        director: 'Jon Favreau',
        producer: 'Jon Favreau',
        release_date: '2019-11-01'
      })
    )
    assert.ok(result, 'INSERT should succeed')
    const [show] = await db.run(SELECT.from('star.wars.Show').where({ title: 'The Mandalorian' }))
    showId = show.ID
    assert.equal(show.show_type, 'LIVE_ACTION_SERIES')
    assert.equal(show.seasons, 3)
  })

  it('rejects a Show with a blank title', async () => {
    await assert.rejects(
      db.run(INSERT.into('star.wars.Show').entries({ title: '' })),
      'Should reject blank title'
    )
  })

  it('Media view returns both Films and Shows', async () => {
    // Insert a test film
    await db.run(INSERT.into('star.wars.Film').entries({
      title: 'Media-Test Film',
      episode_id: 0,
      opening_crawl: 'Test',
      director: 'Test',
      producer: 'Test',
      release_date: '2020-01-01'
    }))

    const rows = await db.run(SELECT.from('star.wars.Media'))
    const types = [...new Set(rows.map(r => r.media_type))]
    assert.ok(types.includes('FILM'), 'Media should include FILM rows')
    assert.ok(types.includes('SHOW'), 'Media should include SHOW rows')

    // Cleanup
    await db.run(DELETE.from('star.wars.Film').where({ title: 'Media-Test Film' }))
  })
})
```

- [ ] **Step 2: Run to see expected failures first**

```bash
cd cap && node --test test/model.test.js 2>&1 | grep -E "Show|Media|FAIL|PASS"
```

Expected: The new `Show – CRUD` tests fail because `Show` entity may not accept the insert yet (draft mode). If the draft service interferes, use `db.run(INSERT...)` directly — which bypasses the OData draft protocol and goes straight to the database.

- [ ] **Step 3: Run the full test suite**

```bash
cd cap && npm test
```

Expected: All tests PASS including the new Show tests.

- [ ] **Step 4: Commit**

```bash
cd cap && git add test/model.test.js
git commit -m "test: add Show entity CRUD and Media view tests"
```

---

## Task 6: Final Build Verification

- [ ] **Step 1: Run a full CDS build to catch any remaining warnings**

```bash
cd cap && npx cds build 2>&1
```

Expected: Build succeeds with no redirection warnings and no errors.

- [ ] **Step 2: Run the full test suite one final time**

```bash
cd cap && npm test
```

Expected: All tests PASS. Test count is higher than before (new Show + Media tests).

- [ ] **Step 3: Start the server and manually verify Show endpoint**

```bash
cd cap && npm run sqlite
```

Open a browser or curl:
```bash
curl http://localhost:4004/odata/v4/StarWarsShow/Show
curl http://localhost:4004/odata/v4/StarWarsShow/Media
```

Expected: Both return `{ "@odata.context": "...", "value": [] }` (empty arrays — data loading comes in Plan 2).

- [ ] **Step 4: Final commit if any fixes were needed**

```bash
cd cap && git add -A && git commit -m "chore: final build verification for Show schema and service layer"
```
