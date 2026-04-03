# Media Fiori UI — Design Spec

**Date:** 2026-04-03  
**Status:** Approved  

## Overview

Add a new SAP Fiori Elements List Report + Object Page application that surfaces the unified `Media` view (films + shows in one table) from the `StarWarsShow` OData service. Wire it into `launchpadPage.html` (currently empty) alongside the existing People app.

---

## Goals

- Provide a single read-only overview of all Star Wars media (films and TV shows) in one Fiori list.
- On selecting a record, show a rich object page with type-specific detail sections and all associated entity tables (characters, planets, starships, vehicles, species).
- Include an "Edit in App" link that navigates the user to the Fiori Preview endpoint for the relevant service (Film or Show). Note: `/$fiori-preview/` is a CAP development tool endpoint — works locally but not in production deployments. These links are developer-facing placeholders.
- Add a Fiori Launchpad page (`launchpadPage.html`) that hosts both the People app tile and the new Media Browser tile.

---

## Decisions

| Question | Decision |
| -------- | -------- |
| List columns | 8 columns: Title, `media_type` (FILM/SHOW, high importance), `show_type` (LIVE_ACTION_SERIES/ANIMATED_SERIES/null for films, high importance), Release Date, Director, Seasons (medium importance), Episodes (medium importance), Network (medium importance). `media_type` and `show_type` are separate columns — `show_type` is blank for Film rows. |
| Object page read-only? | Yes — `Media` is a UNION view; no editing |
| Cross-app navigation | `edit_url` virtual field (String) computed by handler → used as `@UI.DataFieldWithUrl` in General facet |
| Object page layout | Split: General tab + type-specific tab (Show Details or Film Details, hidden conditionally) + 5 association tabs |
| Launchpad grouping | Flat — single tile group "Star Wars Apps" |
| Media tile icon | `sap-icon://media-play` |
| Service | Reuse existing `StarWarsShow` — no new service |

---

## Architecture

### Approach: Extend StarWarsShow service

The `StarWarsShow` service already exposes `Media`, `MediaCharacters`, `MediaPlanets`, `MediaStarships`, `MediaVehicles`, and `MediaSpecies` as separate read-only entity sets. The `Media` projection is enriched at the service level with a virtual `edit_url` field computed by a new `show-service.js` handler.

Navigation associations on a CDS `define view` UNION projection are **not supported** in CAP. The fallback is therefore the **primary implementation path**: the five `Media*` entity sets remain as separate read-only entity sets without navigation properties on `Media`. The association tabs (Characters, Planets, Starships, Vehicles, Species) are therefore **omitted** from the Object Page facets. The `Media*` entity sets remain browseable via the OData endpoint directly.

No new OData service is created. The existing `/odata/v4/StarWarsShow/` endpoint serves the new webapp.

> **Known data quality note:** `MediaCharacters` unions `Film2People`, `Show2People`, and `Episode2People` — meaning a character appearing in multiple episodes of a show will produce duplicate rows for that show's character list. This is a characteristic of the underlying UNION view design, not a bug in the UI.

---

## Files

### Modified

**`cap/srv/show-service.cds`** — enrich the `Media` projection (replace the existing bare projection):

```cds
@readonly : true
entity Media as projection on StarWars.Media {
    *,
    virtual edit_url : String
};
```

`@readonly : true` is preserved to ensure OData metadata correctly advertises no insert/update/delete capability on the UNION view.

### Created

**`cap/srv/show-service.js`** — handler for StarWarsShow service (follows project convention of `*-service.js`)

```js
module.exports = cds.service.impl(function () {
    this.after('READ', 'Media', results => {
        for (const m of [results].flat()) {
            m.edit_url = m.media_type === 'FILM'
                ? '/$fiori-preview/StarWarsFilm/Film#preview-app'
                : '/$fiori-preview/StarWarsShow/Show#preview-app'
        }
    })
})
```

---

**`cap/srv/media-fiori.cds`** — Fiori annotations for Media

_List Report annotations on `sws.Media`:_

```cds
using StarWarsShow as sws from './show-service';

annotate sws.Media with @(
    UI : {
        LineItem : [
            { $Type : 'UI.DataField', Value : title },
            { $Type : 'UI.DataField', Value : media_type,     ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : show_type,      ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : release_date,   ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : director,       ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : seasons,        ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : episode_count,  ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : network,        ![@UI.Importance] : #Medium }
        ],
        SelectionFields : [media_type, show_type, network, director, release_date],
        HeaderInfo : {
            TypeName       : 'Media',
            TypeNamePlural : 'Media',
            Title          : { Value : title },
            Description    : { Value : media_type }
        },
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : 'General',
                Target : '@UI.FieldGroup#General'
            },
            {
                $Type          : 'UI.ReferenceFacet',
                Label          : 'Show Details',
                Target         : '@UI.FieldGroup#ShowDetails',
                ![@UI.Hidden]  : { $edmJson : { '$Ne' : [{ '$Path' : 'media_type' }, 'SHOW'] } }
            },
            {
                $Type          : 'UI.ReferenceFacet',
                Label          : 'Film Details',
                Target         : '@UI.FieldGroup#FilmDetails',
                ![@UI.Hidden]  : { $edmJson : { '$Ne' : [{ '$Path' : 'media_type' }, 'FILM'] } }
            }
        ],
        FieldGroup#General : {
            Data : [
                {
                    $Type : 'UI.DataFieldWithUrl',
                    Label : 'Open in Edit App',
                    Value : edit_url,
                    Url   : edit_url
                },
                { $Type : 'UI.DataField', Value : title },
                { $Type : 'UI.DataField', Value : media_type },
                { $Type : 'UI.DataField', Value : director },
                { $Type : 'UI.DataField', Value : producer },
                { $Type : 'UI.DataField', Value : release_date }
            ]
        },
        FieldGroup#ShowDetails : {
            Data : [
                { $Type : 'UI.DataField', Value : show_type },
                { $Type : 'UI.DataField', Value : seasons },
                { $Type : 'UI.DataField', Value : episode_count },
                { $Type : 'UI.DataField', Value : network }
            ]
        },
        FieldGroup#FilmDetails : {
            Data : [
                { $Type : 'UI.DataField', Value : episode_id },
                { $Type : 'UI.DataField', Value : opening_crawl, ![@UI.MultiLineText] : true }
            ]
        }
    }
);
```

_Conditional facet visibility logic (OData `$edmJson` — operator names are case-sensitive, use `$Ne` not `$ne`):_

- Show Details: hidden when `media_type ≠ 'SHOW'` → visible only for Show records
- Film Details: hidden when `media_type ≠ 'FILM'` → visible only for Film records

---

**`cap/app/media/webapp/Component.js`**

```js
sap.ui.define(['sap/fe/core/AppComponent'], (AppComponent) => {
    'use strict';

    return AppComponent.extend("star.wars.media.Component", {
        metadata: {
            manifest: "json"
        }
    })
})
```

---

**`cap/app/media/webapp/manifest.json`**

Key differences from the people manifest:

- No `sap.ui.generic.app` section (legacy V2 namespace, not needed for pure `sap.fe.templates` apps)
- No `showDraftToggle` (`Media` is not draft-enabled)
- No `creationMode`, `enablePaste`, `enableMassEdit` (read-only app)
- No sub-route (no nested Object Page for association rows)
- `sap.fiori.archeType`: `"analytical"` (read-only browse app, not transactional)

```json
{
    "_version": "1.29.0",
    "sap.app": {
        "id": "star.wars.media",
        "type": "application",
        "i18n": "i18n/i18n.properties",
        "applicationVersion": { "version": "1.0.0" },
        "title": "{{appTitle}}",
        "description": "{{appDescription}}",
        "dataSources": {
            "mainService": {
                "uri": "/odata/v4/StarWarsShow/",
                "type": "OData",
                "settings": { "odataVersion": "4.0" }
            }
        },
        "offline": false,
        "resources": "resources.json"
    },
    "sap.ui": {
        "technology": "UI5",
        "deviceTypes": { "desktop": true, "tablet": true, "phone": true }
    },
    "sap.ui5": {
        "flexEnabled": true,
        "config": { "experimentalCAPScenario": true },
        "resources": { "js": [], "css": [] },
        "dependencies": {
            "minUI5Version": "1.76.0",
            "libs": { "sap.ui.core": {}, "sap.fe.templates": {} }
        },
        "models": {
            "i18n": {
                "type": "sap.ui.model.resource.ResourceModel",
                "uri": "i18n/i18n.properties"
            },
            "": {
                "dataSource": "mainService",
                "preload": true,
                "settings": {
                    "synchronizationMode": "None",
                    "operationMode": "Server",
                    "autoExpandSelect": true,
                    "earlyRequests": true
                }
            }
        },
        "routing": {
            "routes": [
                {
                    "pattern": ":?query:",
                    "name": "MediaList",
                    "target": "MediaList"
                },
                {
                    "pattern": "Media({key}):?query:",
                    "name": "MediaObjectPage",
                    "target": "MediaObjectPage"
                }
            ],
            "targets": {
                "MediaList": {
                    "type": "Component",
                    "id": "MediaList",
                    "name": "sap.fe.templates.ListReport",
                    "options": {
                        "settings": {
                            "initialLoad": "Enabled",
                            "entitySet": "Media",
                            "variantManagement": "Page",
                            "navigation": {
                                "Media": {
                                    "detail": { "route": "MediaObjectPage" }
                                }
                            },
                            "controlConfiguration": {
                                "@com.sap.vocabularies.UI.v1.LineItem": {
                                    "tableSettings": {
                                        "type": "GridTable",
                                        "enableFullScreen": true,
                                        "personalization": {
                                            "column": true,
                                            "sort": true,
                                            "filter": true
                                        },
                                        "enableExport": true
                                    }
                                }
                            }
                        }
                    }
                },
                "MediaObjectPage": {
                    "type": "Component",
                    "id": "MediaObjectPage",
                    "name": "sap.fe.templates.ObjectPage",
                    "options": {
                        "settings": {
                            "entitySet": "Media"
                        }
                    }
                }
            }
        },
        "contentDensities": { "compact": true, "cozy": true }
    },
    "sap.fiori": {
        "_version": "1.1.0",
        "registrationIds": [],
        "archeType": "analytical"
    }
}
```

> **Note on `resources.json`:** This file is referenced in `sap.app.resources` but is **auto-generated** by `npm run build` (CDS build step). It is not hand-authored. No need to create it manually — run `npm run build` in `cap/` after all files are in place.

---

**`cap/app/media/webapp/index.html`**  
Follows the people webapp pattern exactly. App title: `Star Wars Media Browser`. Component: `star.wars.media`.

**`cap/app/media/webapp/init.js`**  
Identical copy of `cap/app/people/webapp/init.js`.

**`cap/app/media/webapp/i18n/i18n.properties`**

```properties
appTitle=Star Wars Media Browser
appDescription=Star Wars Media Browser
```

---

**`cap/app/launchpadPage.html`** — **replace** (file exists but is empty)

Multi-app Fiori Launchpad using `sap.ushell` sandbox fiori2 renderer with a single tile group "Star Wars Apps":

| Tile | SAPUI5 Component | Icon | Title | Description |
| ---- | --------------- | ---- | ----- | ----------- |
| People | `star.wars.people` | `sap-icon://person-placeholder` | Star Wars People | Star Wars People Maintenance |
| Media Browser | `star.wars.media` | `sap-icon://media-play` | Star Wars Media | Star Wars Media Browser |

Pattern: same `sap-ushell-config` multi-app sandbox pattern as `cap/app/people/webapp/index.html`, but with both apps registered and the launchpad renderer presenting tiles.

---

## Out of Scope

- Editing media records (Media is a read-only UNION view by design)
- Standalone Film or Show edit webapps (Fiori Preview link is a developer-facing placeholder)
- Episode sub-page navigation from the Media Object Page
- Association tabs (Characters, Planets, Starships, Vehicles, Species) on the Object Page — CDS does not support navigation associations on UNION view projections
