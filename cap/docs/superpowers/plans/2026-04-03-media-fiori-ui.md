# Media Fiori UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a read-only Fiori Elements List Report + Object Page for the unified `Media` view (films + shows) backed by the existing `StarWarsShow` OData service, and wire it into a new multi-app launchpad page.

**Architecture:** Extend the `StarWarsShow` service's `Media` projection with a `virtual edit_url` field, compute it in a new `show-service.js` handler, annotate it with Fiori annotations in `media-fiori.cds`, and create a standard SAP FE webapp under `cap/app/media/webapp/`. The launchpad page uses the `sap.ushell` sandbox fiori2 renderer with tile-group configuration.

**Tech Stack:** SAP CAP (CDS), SAPUI5 1.141.3, `sap.fe.templates` (ListReport + ObjectPage), `sap.ushell` sandbox, Node.js built-in `node:test` runner.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `cap/srv/show-service.cds` | Add `virtual edit_url : String` to `Media` projection |
| Create | `cap/srv/show-service.js` | After-READ handler: compute `edit_url` from `media_type` |
| Create | `cap/srv/media-fiori.cds` | All Fiori UI annotations for Media list + object page |
| Create | `cap/app/media/webapp/Component.js` | SAP FE AppComponent for star.wars.media |
| Create | `cap/app/media/webapp/manifest.json` | App routing, OData binding to StarWarsShow |
| Create | `cap/app/media/webapp/index.html` | Standalone USHell sandbox for the media app |
| Create | `cap/app/media/webapp/init.js` | USHell renderer init (identical to people webapp) |
| Create | `cap/app/media/webapp/i18n/i18n.properties` | App title and description strings |
| Replace | `cap/app/launchpadPage.html` | Multi-app launchpad with People + Media tiles |

---

## Task 1: Extend Media projection with virtual field

**Files:**
- Modify: `cap/srv/show-service.cds`

The `Media` projection currently reads:
```cds
@readonly : true
entity Media            as projection on StarWars.Media;
```
It needs a `virtual edit_url : String` field so the handler can populate it and the Fiori annotation can reference it.

- [ ] **Step 1: Open `cap/srv/show-service.cds` and replace the bare Media projection**

  Find this block (around line 53):
  ```cds
  @readonly : true
  entity Media            as projection on StarWars.Media;
  ```

  Replace with:
  ```cds
  @readonly : true
  entity Media as projection on StarWars.Media {
      *,
      virtual edit_url : String
  };
  ```

  Leave all other entity projections (`MediaCharacters`, `MediaPlanets`, etc.) unchanged.

- [ ] **Step 2: Verify CDS compiles — run build from `cap/`**

  ```bash
  cd cap && npm run build
  ```

  Expected: build completes with no errors. The `gen/` folder is updated. If you see `virtual fields are not supported on UNION views`, the virtual field must be moved to the service-level projection differently — but this syntax is standard CDS and should work.

- [ ] **Step 3: Commit**

  ```bash
  git add cap/srv/show-service.cds
  git commit -m "feat: add virtual edit_url field to Media projection in StarWarsShow service"
  ```

---

## Task 2: Handler — write test first, then implement

**Files:**
- Create: `cap/srv/show-service.js`
- Modify: `cap/test/handler.test.js`

The handler must populate `edit_url` on every Media READ. The project uses Node.js built-in `node:test` with `cds.test()` for integration-style handler tests. All commands run from `cap/`.

- [ ] **Step 1: Add a failing test to `cap/test/handler.test.js`**

  Open `cap/test/handler.test.js`. The file has a single outer `describe('People Service – Handler Behavior', ...)` block with `const { GET, POST } = cds.test(__dirname + '/..')` declared inside it on line 27. The new block must be added **inside** that outer `describe`, after its last inner `describe` block and before the outer `describe`'s final `})`. Adding it outside the outer describe will cause `ReferenceError: GET is not defined`.

  Add this block before the outer `describe`'s closing `})`:

  ```js
  // ─────────────────────────────────────────────────────────────────────────
  // StarWarsShow – Media edit_url enrichment
  // show-service.js registers an after-READ hook that sets edit_url based on
  // media_type: 'FILM' → StarWarsFilm preview, 'SHOW' → StarWarsShow preview.
  // ─────────────────────────────────────────────────────────────────────────
  describe('StarWarsShow Service – Media edit_url enrichment', () => {

      it('FILM records get the StarWarsFilm preview URL', async () => {
          const { data } = await GET(
              `/odata/v4/StarWarsShow/Media?$filter=media_type eq 'FILM'&$top=1`
          )
          assert.ok(data.value.length >= 1, 'Expected at least one FILM record in seed data')
          assert.equal(
              data.value[0].edit_url,
              '/$fiori-preview/StarWarsFilm/Film#preview-app',
              'FILM edit_url should point to StarWarsFilm preview'
          )
      })

      it('SHOW records get the StarWarsShow preview URL', async () => {
          const { data } = await GET(
              `/odata/v4/StarWarsShow/Media?$filter=media_type eq 'SHOW'&$top=1`
          )
          assert.ok(data.value.length >= 1, 'Expected at least one SHOW record in seed data')
          assert.equal(
              data.value[0].edit_url,
              '/$fiori-preview/StarWarsShow/Show#preview-app',
              'SHOW edit_url should point to StarWarsShow preview'
          )
      })
  })
  ```

  Note: `GET` is in scope because the new `describe` block is nested inside the outer `describe('People Service – Handler Behavior', ...)` that declares `const { GET, POST } = cds.test(__dirname + '/..')` on line 27.

- [ ] **Step 2: Run the test to confirm it fails**

  ```bash
  cd cap && node --test test/handler.test.js 2>&1 | grep -A3 "edit_url"
  ```

  Expected: both new tests **FAIL** because `edit_url` is `undefined` (no handler exists yet).

- [ ] **Step 3: Create `cap/srv/show-service.js`**

  ```js
  'use strict'

  const cds = require('@sap/cds')

  module.exports = cds.service.impl(function () {

      // Populate the virtual edit_url field after every Media READ.
      // Directs the user to the Fiori Preview for the appropriate service.
      // Note: /$fiori-preview/ is a CAP dev tool endpoint — not available in production.
      this.after('READ', 'Media', results => {
          for (const m of [results].flat()) {
              m.edit_url = m.media_type === 'FILM'
                  ? '/$fiori-preview/StarWarsFilm/Film#preview-app'
                  : '/$fiori-preview/StarWarsShow/Show#preview-app'
          }
      })

  })
  ```

- [ ] **Step 4: Run the test again to confirm it passes**

  ```bash
  cd cap && node --test test/handler.test.js 2>&1 | grep -A3 "edit_url"
  ```

  Expected: both `edit_url` tests **PASS**.

- [ ] **Step 5: Run the full handler test suite to confirm no regressions**

  ```bash
  cd cap && npm run test:handler
  ```

  Expected: all tests pass.

- [ ] **Step 6: Commit**

  ```bash
  git add cap/srv/show-service.js cap/test/handler.test.js
  git commit -m "feat: add show-service handler to compute Media edit_url virtual field"
  ```

---

## Task 3: Fiori annotations

**Files:**
- Create: `cap/srv/media-fiori.cds`

This is a pure annotation file — no logic, no service contract changes. It follows the same pattern as `cap/srv/show-fiori.cds`. There are no unit tests for annotation files; correctness is verified visually when the app runs.

- [ ] **Step 1: Create `cap/srv/media-fiori.cds`**

  ```cds
  using StarWarsShow as sws from './show-service';

  annotate sws.Media with @(UI.TextArrangement : #TextOnly);

  annotate sws.Media with @(
      UI : {
          LineItem : [
              { $Type : 'UI.DataField', Value : title },
              { $Type : 'UI.DataField', Value : media_type,    ![@UI.Importance] : #High },
              { $Type : 'UI.DataField', Value : show_type,     ![@UI.Importance] : #High },
              { $Type : 'UI.DataField', Value : release_date,  ![@UI.Importance] : #High },
              { $Type : 'UI.DataField', Value : director,      ![@UI.Importance] : #High },
              { $Type : 'UI.DataField', Value : seasons,       ![@UI.Importance] : #Medium },
              { $Type : 'UI.DataField', Value : episode_count, ![@UI.Importance] : #Medium },
              { $Type : 'UI.DataField', Value : network,       ![@UI.Importance] : #Medium }
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
                  $Type         : 'UI.ReferenceFacet',
                  Label         : 'Show Details',
                  Target        : '@UI.FieldGroup#ShowDetails',
                  ![@UI.Hidden] : { $edmJson : { '$Ne' : [{ '$Path' : 'media_type' }, 'SHOW'] } }
              },
              {
                  $Type         : 'UI.ReferenceFacet',
                  Label         : 'Film Details',
                  Target        : '@UI.FieldGroup#FilmDetails',
                  ![@UI.Hidden] : { $edmJson : { '$Ne' : [{ '$Path' : 'media_type' }, 'FILM'] } }
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

  **Key annotation notes:**
  - `$Ne` (capital N) is the correct OData `$edmJson` operator — lowercase `$ne` is silently ignored and will hide both facets permanently.
  - `Show Details` facet: hidden when `media_type ≠ 'SHOW'` → visible only for Show records.
  - `Film Details` facet: hidden when `media_type ≠ 'FILM'` → visible only for Film records.
  - `edit_url` in `DataFieldWithUrl`: both `Value` (display text) and `Url` reference the same virtual field — CAP/FE renders it as a hyperlink.

- [ ] **Step 2: Run build to verify annotations compile**

  ```bash
  cd cap && npm run build
  ```

  Expected: no errors. CDS parses the annotation file against the service model. If you see "element edit_url not found", confirm Task 1 was committed and the `virtual edit_url` field is present in `show-service.cds`.

- [ ] **Step 3: Commit**

  ```bash
  git add cap/srv/media-fiori.cds
  git commit -m "feat: add Fiori annotations for Media list report and object page"
  ```

---

## Task 4: Media webapp files

**Files:**
- Create: `cap/app/media/webapp/Component.js`
- Create: `cap/app/media/webapp/manifest.json`
- Create: `cap/app/media/webapp/index.html`
- Create: `cap/app/media/webapp/init.js`
- Create: `cap/app/media/webapp/i18n/i18n.properties`

The webapp follows `cap/app/people/webapp/` exactly. Key differences: app ID is `star.wars.media`, no draft, no write controls, data source is `/odata/v4/StarWarsShow/`.

- [ ] **Step 1: Create `cap/app/media/webapp/Component.js`**

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

- [ ] **Step 2: Create `cap/app/media/webapp/manifest.json`**

  ```json
  {
      "_version": "1.29.0",
      "sap.app": {
          "id": "star.wars.media",
          "type": "application",
          "i18n": "i18n/i18n.properties",
          "applicationVersion": {
              "version": "1.0.0"
          },
          "title": "{{appTitle}}",
          "description": "{{appDescription}}",
          "dataSources": {
              "mainService": {
                  "uri": "/odata/v4/StarWarsShow/",
                  "type": "OData",
                  "settings": {
                      "odataVersion": "4.0"
                  }
              }
          },
          "offline": false,
          "resources": "resources.json"
      },
      "sap.ui": {
          "technology": "UI5",
          "deviceTypes": {
              "desktop": true,
              "tablet": true,
              "phone": true
          }
      },
      "sap.ui5": {
          "flexEnabled": true,
          "config": {
              "experimentalCAPScenario": true
          },
          "resources": {
              "js": [],
              "css": []
          },
          "dependencies": {
              "minUI5Version": "1.76.0",
              "libs": {
                  "sap.ui.core": {},
                  "sap.fe.templates": {}
              }
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
                                      "detail": {
                                          "route": "MediaObjectPage"
                                      }
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
          "contentDensities": {
              "compact": true,
              "cozy": true
          }
      },
      "sap.fiori": {
          "_version": "1.1.0",
          "registrationIds": [],
          "archeType": "analytical"
      }
  }
  ```

- [ ] **Step 3: Create `cap/app/media/webapp/index.html`**

  ```html
  <!DOCTYPE html>
  <html>

  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Star Wars Media Browser</title>

      <script>
          window['sap-ushell-config'] = {
              defaultRenderer: 'fiori2',
              applications: {
                  'star-wars-media': {
                      title: 'Star Wars Media Browser',
                      description: 'Star Wars Media Browser',
                      additionalInformation: 'SAPUI5.Component=star.wars.media',
                      applicationType: 'URL',
                      url: './',
                      navigationMode: 'embedded'
                  }
              },
              bootstrapPlugins: {
                  RuntimeAuthoringPlugin: {
                      component: "sap.ushell.plugins.rta",
                      config: {
                          validateAppVersion: false,
                      },
                  },
                  PersonalizePlugin: {
                      component: "sap.ushell.plugins.rta-personalize",
                      config: {
                          validateAppVersion: false,
                      },
                  },
              }
          }
      </script>
      <script src="https://ui5.sap.com/1.141.3/test-resources/sap/ushell/bootstrap/sandbox.js"></script>
      <script>
          function themeCalc() {
              try {
                  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "sap_horizon_dark" :
                      "sap_horizon"
                  return theme
              } catch (ex) {
                  console.warn("window.matchMedia not supported - keep default theme")
                  return "sap_horizon"
              }
          }

          function ui5Bootstrap() {
              return new Promise((resolve, reject) => {
                  const s = document.createElement('script')
                  s.setAttribute('src', "https://ui5.sap.com/1.141.3/resources/sap-ui-core.js")
                  s.setAttribute('id', "sap-ui-bootstrap")
                  s.setAttribute('data-sap-ui-libs', "sap.m, sap.ushell, sap.fe.templates")
                  s.setAttribute('data-sap-ui-compatVersion', "edge")
                  s.setAttribute('data-sapui-frameOptions', "allow")
                  s.setAttribute('data-sapui-bindingSyntax', "complex")
                  s.setAttribute('data-sap-ui-async', "true")
                  s.setAttribute('data-sap-ui-resourceroots', '{"root": "./"}')
                  s.setAttribute('data-sap-ui-onInit', "module:root/init")
                  s.setAttribute('data-sap-ui-theme', themeCalc())
                  document.head.appendChild(s)
              })
          }
          try {
              ui5Bootstrap()
          } catch (error) {
              console.log(error)
          }
      </script>
  </head>

  <body id="content" class="sapUiBody sapUiSizeCompact" role="application">
      <div data-sap-ui-component data-id="container" data-name="root" data-handle-validation="true">
      </div>
  </body>
  </html>
  ```

- [ ] **Step 4: Create `cap/app/media/webapp/init.js`**

  ```js
  /* eslint-disable no-undef */
  /*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-shadow:0 */
  /*eslint-env es6 */
  sap.ui.require(["sap/ui/core/Core", "sap/ui/core/Component"], (oCore, Component) => {

      sap.ushell.Container.createRenderer().placeAt('content')
      sap.ui
          .getCore()
          .getConfiguration()
          .setFlexibilityServices([{
              connector: "SessionStorageConnector"
          }])

  })
  ```

- [ ] **Step 5: Create `cap/app/media/webapp/i18n/i18n.properties`**

  ```properties
  # This is the resource bundle for media

  #Texts for manifest.json

  #XTIT: Application name
  appTitle=Star Wars Media Browser

  #YDES: Application description
  appDescription=Star Wars Media Browser
  ```

- [ ] **Step 6: Run build to generate `resources.json` and verify no errors**

  ```bash
  cd cap && npm run build
  ```

  Expected: `cap/app/media/webapp/resources.json` is generated automatically. Build completes with no errors.

- [ ] **Step 7: Smoke-test the app locally with SQLite**

  ```bash
  cd cap && npm run sqlite
  ```

  Open `http://localhost:4004` in a browser. You should see the `StarWarsShow` service listed. Navigate to `http://localhost:4004/media/webapp/` — the Fiori List Report should load showing the Media list with Title, Type, Show Type, Release Date, Director columns. Click a row to verify the Object Page loads with General, Show/Film Details facets, and an "Open in Edit App" link.

  If the list is empty: the SQLite database needs fixture data. Run `npm run load_sqlite` to load it, then restart.

- [ ] **Step 8: Commit**

  ```bash
  git add cap/app/media/webapp/
  git commit -m "feat: add Star Wars Media Browser Fiori webapp"
  ```

---

## Task 5: Launchpad page

**Files:**
- Replace: `cap/app/launchpadPage.html` (file exists but is empty — write it)

The launchpad uses the `sap.ushell` sandbox fiori2 renderer with a `LaunchPage` service configuration to show tiles in a named group. Both apps are registered as navigation targets via `NavTargetResolution`.

- [ ] **Step 1: Write `cap/app/launchpadPage.html`**

  ```html
  <!DOCTYPE html>
  <html>

  <head>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Star Wars Launchpad</title>

      <script>
          window['sap-ushell-config'] = {
              defaultRenderer: 'fiori2',
              services: {
                  NavTargetResolution: {
                      config: {
                          enableClientSideTargetResolution: true,
                          applications: {
                              'star-wars-people-Display': {
                                  additionalInformation: 'SAPUI5.Component=star.wars.people',
                                  applicationType: 'URL',
                                  url: './people/webapp/',
                                  navigationMode: 'embedded'
                              },
                              'star-wars-media-Display': {
                                  additionalInformation: 'SAPUI5.Component=star.wars.media',
                                  applicationType: 'URL',
                                  url: './media/webapp/',
                                  navigationMode: 'embedded'
                              }
                          }
                      }
                  },
                  LaunchPage: {
                      adapter: {
                          config: {
                              groups: [
                                  {
                                      id: 'group-starwars',
                                      title: 'Star Wars Apps',
                                      isPreset: true,
                                      isVisible: true,
                                      tiles: [
                                          {
                                              id: 'tile-people',
                                              tileType: 'sap.ushell.ui.tile.StaticTile',
                                              properties: {
                                                  title: 'Star Wars People',
                                                  subtitle: 'People Maintenance',
                                                  icon: 'sap-icon://person-placeholder',
                                                  targetURL: '#star-wars-people-Display'
                                              }
                                          },
                                          {
                                              id: 'tile-media',
                                              tileType: 'sap.ushell.ui.tile.StaticTile',
                                              properties: {
                                                  title: 'Star Wars Media',
                                                  subtitle: 'Media Browser',
                                                  icon: 'sap-icon://media-play',
                                                  targetURL: '#star-wars-media-Display'
                                              }
                                          }
                                      ]
                                  }
                              ]
                          }
                      }
                  }
              }
          }
      </script>
      <script src="https://ui5.sap.com/1.141.3/test-resources/sap/ushell/bootstrap/sandbox.js"></script>
      <script>
          function themeCalc() {
              try {
                  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "sap_horizon_dark" :
                      "sap_horizon"
                  return theme
              } catch (ex) {
                  console.warn("window.matchMedia not supported - keep default theme")
                  return "sap_horizon"
              }
          }

          function ui5Bootstrap() {
              const s = document.createElement('script')
              s.setAttribute('src', "https://ui5.sap.com/1.141.3/resources/sap-ui-core.js")
              s.setAttribute('id', "sap-ui-bootstrap")
              s.setAttribute('data-sap-ui-libs', "sap.m, sap.ushell, sap.fe.templates")
              s.setAttribute('data-sap-ui-compatVersion', "edge")
              s.setAttribute('data-sapui-frameOptions', "allow")
              s.setAttribute('data-sapui-bindingSyntax', "complex")
              s.setAttribute('data-sap-ui-async', "true")
              s.setAttribute('data-sap-ui-theme', themeCalc())
              document.head.appendChild(s)
          }
          try {
              ui5Bootstrap()
          } catch (error) {
              console.log(error)
          }
      </script>
  </head>

  <body id="content" class="sapUiBody" role="application">
  </body>
  </html>
  ```

  The launchpad does not need `data-sap-ui-resourceroots` or `data-sap-ui-onInit` — the fiori2 renderer bootstraps itself from the ushell config. The body is empty; the renderer populates it.

- [ ] **Step 2: Start the server and verify the launchpad loads**

  ```bash
  cd cap && npm run sqlite
  ```

  Open `http://localhost:4004/app/launchpadPage.html`. Expected: a Fiori Launchpad page with a "Star Wars Apps" tile group containing two tiles — "Star Wars People" (person icon) and "Star Wars Media" (media-play icon). Clicking each tile should launch the corresponding app in the same shell.

  If tiles do not appear but the launchpad shell loads: check the browser console for errors related to `LaunchPage` adapter config. The `sap.ushell` sandbox may require the `LaunchPage` adapter to be spelled exactly as shown (case-sensitive service name).

- [ ] **Step 3: Run the regression test suite**

  ```bash
  cd cap && npm run test:profile
  ```

  Expected: all tests pass. This is the fast gate before committing.

- [ ] **Step 4: Commit**

  ```bash
  git add cap/app/launchpadPage.html
  git commit -m "feat: add Fiori launchpad page with People and Media tiles"
  ```

---

## Final Verification

- [ ] Run `cd cap && npm test` — full test suite passes (60s timeout)
- [ ] Open `http://localhost:4004/app/launchpadPage.html` — launchpad shows two tiles
- [ ] Click Media tile → list loads with 8 columns (Title, Type, Show Type, Release Date, Director, Seasons, Episodes, Network)
- [ ] Click a **Film** row → Object Page shows General + Film Details facets; Show Details is hidden; "Open in Edit App" link points to `/$fiori-preview/StarWarsFilm/Film#preview-app`
- [ ] Click a **Show** row → Object Page shows General + Show Details facets; Film Details is hidden; "Open in Edit App" link points to `/$fiori-preview/StarWarsShow/Show#preview-app`
- [ ] Click People tile → People app loads as before
