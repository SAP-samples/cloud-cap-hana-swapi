# Shows & Episodes

This page covers the **Show/Episode** domain: how TV shows and their episodes are modelled, how they relate to the core Star Wars entity set, and the read-only views derived from them.

## Entity Relationships

`Show` and `Episode` follow a **composition** pattern. An Episode cannot exist without its parent Show, and deleting a Show cascades to all its Episodes.

```cds
entity Show : cuid, managed {
    title         : String(100) @mandatory;
    show_type     : String enum { LIVE_ACTION_SERIES; ANIMATED_SERIES; ANIMATED_FILM };
    seasons       : Integer;
    episode_count : Integer;
    network       : String(50);
    director      : String(100);
    producer      : String(100);
    release_date  : Date;
    episodes      : Composition of many Episode on episodes.show = $self;
}

entity Episode : cuid, managed {
    show          : Association to Show;
    title         : String(200) @mandatory;
    season_number : Integer;
    episode_number: Integer;
    air_date      : Date;
    director      : String(100);
    writer        : String(200);
    runtime       : Integer;  // minutes
    timeline      : String(50); // e.g. "19 BBY"
}
```

## Episode2* Junction Tables

Each `Episode2*` table links episodes to the core entity set, mirroring the `Film2*` pattern used for Films:

| Table | Links | Physical table? |
| --- | --- | --- |
| `Episode2People` | Episode ↔ People | Yes |
| `Episode2Planets` | Episode ↔ Planet | Yes |
| `Episode2Starships` | Episode ↔ Starship | Yes |
| `Episode2Vehicles` | Episode ↔ Vehicle | Yes |
| `Episode2Species` | Episode ↔ Species | Yes |

The junction tables share the same `@assert.unique` constraint pattern as `Film2People` — duplicate links are rejected by the framework before they reach the database.

## Show2* — Views and the Physical Exception

`Show2Planets`, `Show2Starships`, `Show2Vehicles`, and `Show2Species` are CDS `define view` declarations — not physical tables. Each aggregates over its corresponding `Episode2*` table:

```cds
define view Show2Planets as
    select from Episode2Planets { episode.show as show, planet };
```

This means a Show's planet list is always accurate without a separate load step — it is derived entirely from its episodes. Wookieepedia show pages do not list per-show relationships, but each episode page does, making this the correct model.

**`Show2People` is the exception.** Unlike the four views above, `Show2People` is a **physical junction entity** (`entity Show2People : cuid`). It holds a direct many-to-many relationship between `Show` and `People` — used for top-billed cast and crew who are associated with the show as a whole, independent of individual episodes. This is why the Show Object Page has a `characters` composition tab drawn from `Show2People` directly, rather than from an episode aggregation.

## The Media View

The `Media` view is a `UNION` of `Film` and `Show`, normalised to a common projection. It adds a `media_type` discriminator field so consumers can tell the two apart:

```cds
define view Media as
    select from Film {
        ID, title, director, producer, release_date,
        episode_id, opening_crawl,
        null as seasons       : Integer,
        null as episode_count : Integer,
        null as network       : String(50),
        null as show_type     : String,
        'FILM' as media_type  : String,
        virtual null as edit_url : String
    }
    union all
    select from Show { ... 'SHOW' as media_type, ... };
```

The `edit_url` virtual field is populated by the `StarWarsShow` service handler (`cap/srv/show-service.js`) on every READ. It generates a deep-link URL routing to the correct Fiori app:

- `FILM` → `/film/webapp/index.html#star-wars-film&/Film(ID=...,IsActiveEntity=true)`
- `SHOW` → `/show/webapp/index.html#star-wars-show&/Show(ID=...,IsActiveEntity=true)`

### MediaCharacters and Siblings

Five additional aggregation views (`MediaCharacters`, `MediaPlanets`, `MediaStarships`, `MediaVehicles`, `MediaSpecies`) union the Film2* and Episode2* tables to give a single cross-media view of which entities appear in which content.

## CloneWarsChronologicalOrder

`CloneWarsChronologicalOrder` is a read-only view that provides the canonical **in-universe chronological** episode sequence for *Star Wars: The Clone Wars*. It covers all 133 episodes mapped to their chronological position, using the `timeline` field (e.g., `"22 BBY"`) from `Episode` to establish ordering.

This view exists because the broadcast order of Clone Wars episodes differs significantly from the in-universe order. Fans and educators frequently need the chronological sequence for study guides and watch lists.

## StarWarsEpisode Service

`StarWarsEpisode` (`cap/srv/episode-service.cds`) exposes `Episodes` and all five `Episode2*` junctions as **read-only** projections. It registers no `.js` handler.

This is intentional: all episode write operations occur through the `StarWarsShow` service (episodes are a composition child of Show, so they are managed via the Show draft workflow). A separate write-capable episode service would duplicate that path. For data loading, the `convertData.js` script writes directly to the database.

The service is exposed on all three protocols: OData v4 (`/odata/v4/StarWarsEpisode/`), REST (`/rest/StarWarsEpisode/`), and GraphQL (`/graphql/`).
