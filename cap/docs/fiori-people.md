# People App

The People app is a **read-only** Fiori Elements browser for Star Wars characters. It exposes the `StarWarsPeople` service and requires only the `Viewer` role.

Annotation file: `cap/srv/people-fiori.cds`

## List Report

| Column | Field | Notes |
| --- | --- | --- |
| Name | `name` | Sorted A–Z by default |
| Homeworld | `homeworld.name` | Navigation association |
| Gender | `gender` | Value help available |
| Birth Year | `birth_year` | e.g. `19BBY` |

**Filter bar fields:** name, gender, homeworld, birth_year

## Object Page

**Header:** Character name (title), homeworld name (description), admin fields (created/modified by/at) in the header facet.

**Tabs:**

| Tab | Source | Contents |
| --- | --- | --- |
| Details | `FieldGroup#Details` | height, mass, hair/skin/eye colors, birth_year, gender |
| Films | `films/@UI.LineItem` | Films the character appeared in (via `Film2People`) |
| Episodes | `episodes/@UI.LineItem` | Episodes the character appeared in (via `Episode2People`) |
| Species | `species/@UI.LineItem` | Species associations (via `Species2People`) |
| Starships | `starships/@UI.LineItem` | Starships piloted (via `Starship2Pilot`) |
| Vehicles | `vehicles/@UI.LineItem` | Vehicles piloted (via `Vehicle2Pilot`) |

## No Draft

The People app does not use draft. Records are committed immediately on save. Only `Editor` role users can write via the API — the Fiori app renders as read-only for `Viewer` users.
