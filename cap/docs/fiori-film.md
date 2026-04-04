# Film App

The Film app is a **draft-enabled** Fiori Elements editor for Star Wars films. It exposes the `StarWarsFilm` service. Reading requires the `Viewer` role; creating or editing requires the `Editor` role.

Annotation file: `cap/srv/film-fiori.cds`

## List Report

| Column | Field |
| --- | --- |
| Title | `title` |
| Episode | `episode_id` (enum: I–X) |
| Director | `director` |
| Producer | `producer` |
| Release Date | `release_date` (sorted ascending by default) |

**Selection fields (filter bar):** title, episode_id, director, producer, release_date

## Object Page

**Header:** Film title, episode_id (description), admin fields (created/modified by/at) in the header facet.

**Main tab — Details:**

| Field | Notes |
| --- | --- |
| Title | |
| Episode | `episode_id` enum — `I`, `II`, ... `X` |
| Director | |
| Producer | |
| Release Date | |
| Opening Crawl | Multi-line text |

**Junction tabs:**

| Tab | Junction table | What it shows |
| --- | --- | --- |
| Characters | `Film2People` | Characters appearing in this film |
| Planets | `Film2Planets` | Planets featured |
| Species | `Film2Species` | Species featured |
| Starships | `Film2Starships` | Starships featured |
| Vehicles | `Film2Vehicles` | Vehicles featured |

Each junction tab shows a list of the related entity's key fields. Clicking a row navigates to a sub-Object Page showing the junction record detail (the junction entity's own fields, not the target entity's full record).

## Draft Workflow

The Film app uses `@odata.draft.enabled` on the `Film` entity. Edits are staged as drafts before activation:

1. Click **Edit** on an Object Page — CAP creates a draft copy
2. Make changes — saved automatically to the draft
3. Click **Save** — CAP activates the draft, replacing the active record
4. Click **Discard** — draft is deleted, active record is unchanged

Only one draft per record is allowed at a time. The draft is scoped to the user who created it.
