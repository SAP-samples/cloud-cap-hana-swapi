# Show App

The Show app is a **draft-enabled** Fiori Elements editor for Star Wars TV shows and their episodes. It exposes the `StarWarsShow` service. Reading requires the `Viewer` role; creating or editing requires `Editor`.

Annotation files: `cap/srv/show-fiori.cds`, `cap/srv/episode-fiori.cds`

## Show List Report

| Column | Field |
| --- | --- |
| Title | `title` |
| Type | `show_type` (LIVE_ACTION_SERIES, ANIMATED_SERIES, ANIMATED_FILM) |
| Director | `director` |
| Release Date | `release_date` |
| Seasons | `seasons` |
| Episode Count | `episode_count` |
| Network | `network` |

**Selection fields:** show_type, network, director, release_date

## Show Object Page

**Header:** Show title, show_type (description).

**Show Details tab (`FieldGroup#Main`):**

| Field | Notes |
| --- | --- |
| Title | |
| Show Type | `show_type` enum |
| Seasons | |
| Episode Count | |
| Network | |
| Director | |
| Producer | |
| Release Date | |

**Episodes tab:** Displays the `episodes` composition using `Episode`'s `UI.LineItem`:

| Column | Field |
| --- | --- |
| Season | `season_number` |
| Episode | `episode_number` |
| Title | `title` |
| Air Date | `air_date` |
| Director | `director` |
| Writer | `writer` |
| Runtime | `runtime` (minutes) |
| Timeline | `timeline` (e.g. `22 BBY`) |

Clicking an episode row opens the **Episode Object Page**.

**Characters tab:** Displays `Show2People` — characters who appear in any episode of this show (derived via the `Episode2People` aggregation view, not a physical junction to the show).

## Episode Object Page

The Episode Object Page shows the episode's detail fields (season, episode number, title, air date, director, writer, runtime, timeline) and a single **Episode Details** tab containing the same fields in a form layout.

Annotation: `annotate sws.Episode` in `cap/srv/show-fiori.cds`.

## Episode2* Sub-navigation

The `StarWarsEpisode` service exposes `Episode2People`, `Episode2Planets`, `Episode2Starships`, `Episode2Vehicles`, and `Episode2Species` as read-only projections. These are accessible directly via the OData service but are not surfaced as tabs in the Show app's Episode Object Page — they require direct API access or a future extension of the annotations.

## Draft Workflow

Identical to the Film app. Shows use `@odata.draft.enabled`. Editing a show (including adding/removing episodes) creates a draft. Activating the draft commits the entire show + episodes composition atomically.
