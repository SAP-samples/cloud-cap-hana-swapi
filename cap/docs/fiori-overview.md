# Fiori Apps Overview

This project ships four SAP Fiori Launchpad applications built on top of the CAP OData v4 services. They demonstrate how `*-fiori.cds` annotation files drive the Fiori Elements framework without custom UI code.

## Quick Start

```bash
cd cap
npm run sqlite
```

Open `http://localhost:4004/launchpadPage.html` to see the Fiori Launchpad.

## The Four Apps

| Tile | App | OData service | Role required |
| --- | --- | --- | --- |
| Star Wars People | Character browser (read-only) | `StarWarsPeople` | Viewer |
| Media | Film + Show UNION browser | `StarWarsShow` (`Media` view) | Viewer |
| Films | Film editor (draft-enabled) | `StarWarsFilm` | Viewer (read) / Editor (write) |
| Shows | Show + Episode editor (draft-enabled) | `StarWarsShow` | Viewer (read) / Editor (write) |

## Navigation Pattern

All four apps follow the standard Fiori Elements List Report → Object Page pattern:

```
Launchpad
  └── List Report  (filterable table of entities)
        └── Object Page  (detail view with tabs)
              └── Sub-Object Page  (junction entity detail, where applicable)
```

## Annotation Files

Each app's UI is driven entirely by CDS annotations — no custom JavaScript UI code is required:

| App | Annotation file |
| --- | --- |
| People | `cap/srv/people-fiori.cds` |
| Media | `cap/srv/media-fiori.cds` |
| Films | `cap/srv/film-fiori.cds` |
| Shows / Episodes | `cap/srv/show-fiori.cds`, `cap/srv/episode-fiori.cds` |

## Role Requirements

Authorization is defined in `cap/srv/services-auth.cds`. For the UI apps:

- **`Viewer`** role — read-only access to all four apps
- **`Editor`** role — required to create, update, or delete Film and Show records
- In local development (`npm run sqlite`), no authentication is enforced by default

## File Structure

```
cap/app/
├── launchpadPage.html           ← SAP Fiori Launchpad shell
├── assets/                      ← shared CSS, images, preview XML
├── people/webapp/               ← People browser app
├── media/webapp/                ← Media browser app
├── film/webapp/                 ← Film editor app
└── show/webapp/                 ← Show/Episode editor app
```
