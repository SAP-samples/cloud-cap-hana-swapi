# Change Log

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/).

## [2.0.2] - 2026-05-01

**Changed**

- Update @sap/cds from 9.8.5 to 9.9.1
- Update @cap-js/cds-test from 0.4.1 to 1.0.1 (stable release)
- Update eslint from 10.2.1 to 10.3.0
- Update @cap-js/hana from 2.7.0 to 2.8.0
- Update @cap-js/sqlite from 2.2.0 to 2.4.0
- Update @cap-js/postgres from 2.2.0 to 2.3.0
- Update @sap/cds-common-content from 3.1.0 to 3.2.0
- Update @sap/dev-cap-tools from 1.53.2 to 1.53.3
- Update @cap-js/change-tracking from 1.2.1 to 2.0.0-beta.11 (trigger-based architecture with ~2.4-50x performance improvement)
- Update site dependencies (mermaid 11.13→11.14, vue 3.5.31→3.5.33)
- Update scraper dependencies (axios 1.14→1.15)
- Raise minimum Node.js version from 20 to 22 (CDS 10 requirement)
- Enable CDS 10 forward-compatibility flags: ieee754compatible, consistent_params, compat_srv_getters, compat_texts_entities, compat_assert_not_null, compat_save_drafts, calc_elements
- Disable legacy queue locking (queue.legacyLocking: false) in preparation for CDS 10
- Add HANA migration table (sap.changelog.Changes.hdbmigrationtable) for change-tracking v2 schema migration
- Enable native node:sqlite driver (driver: "node") — uses Node.js built-in SQLite instead of better-sqlite3
- Enable parallel $batch GET processing (max_batch_parallelization: 3) for concurrent read-only batch atomicity groups

**Added**

- cds-test-v1.test.js — showcase test demonstrating @cap-js/cds-test v1.0 features: Chai assertions, Fetch-based HTTP shortcuts, native sqlite verification
- @cap-js/ord plugin (v1.6.0) — exposes Open Resource Discovery endpoints (/.well-known/open-resource-discovery, /ord/v1/documents/ord-document) for machine-readable application metadata

## [2.0.0] - 2026-04-04

**Added**

- Episode entity and Episode2* junction tables (Episode2People, Episode2Planets, Episode2Starships, Episode2Vehicles, Episode2Species) as compositions of Show
- StarWarsEpisode service exposing Episode and Episode2* projections as read-only
- Show2Planets, Show2Starships, Show2Vehicles, Show2Species replaced by CDS derived views aggregating over Episode2* tables
- Wookieepedia scraper pipeline: rate-limited MediaWiki API client, disk cache, entity/episode/season extractors, orchestrator, and CLI
- Full scrape of 11 films and 15 shows with 772 episodes and episode relationships from Wookieepedia
- Episode data fields: director, writer, season_number, episode_number, air_date, opening_crawl, show title association
- Clone Wars chronological episode ordering in StarWarsEpisode service
- Opening crawl texts for main Star Wars saga films
- Film.episode_id populated from roman numeral in Wookieepedia page title
- Sub-series pages (e.g. Tales anthology) registered as shows and their episodes correctly attributed
- Second-pass entity scrape to resolve entities discovered via episode back-references
- Virtual edit_url field on Media projection in StarWarsShow service, computed by handler
- Star Wars Media Browser Fiori webapp (list report + object page)
- Star Wars Films Fiori webapp (list report + object page)
- Star Wars Shows Fiori webapp with Episodes sub-navigation tab
- Fiori launchpad page with People, Films, and Shows tiles
- i18n labels and value helps for Media entity type selection fields
- Fiori annotations for Media list report and object page
- VitePress documentation site with animated Star Wars opening crawl homepage, Imperial Dark and Jedi Archives CSS themes, CDS syntax highlighting, and GitHub Pages CI deployment
- MIDI audio (Imperial March, Jedi Theme) and hexagon SVG logos for VitePress themes
- VitePress Apps section with per-app documentation pages (People, Media Browser, Film editor, Show/Episode editor) and API overview page
- Shows & Episodes section in VitePress API sidebar with architecture deep-dive
- Generated @cds-models type definitions for all services (DataService, StarWarsEpisode, StarWarsFilm, StarWarsPeople, StarWarsPlanet, StarWarsShow, StarWarsSpecies, StarWarsStarship, StarWarsVehicle)
- readme.mjs custom widdershins wrapper with circular $ref handling to prevent stack overflow during OpenAPI→Markdown generation
- Generated OpenAPI 3.0 specifications for all services (OData v4 and REST variants)
- Viewer app Galaxy/Light CSS themes with responsive layout, sort, filter, column-level search, and pagination
- Viewer app detail panel with field-by-field display and keyboard navigation (arrow keys, Escape)
- Viewer app row selection with clipboard copy (Tab-delimited), persisted rowKey cleared on entity switch or panel dismiss
- jsconfig.json for CAP service layer IDE support
- CAP Cheat Sheet expanded with detailed CDS modeling patterns, handler registration, and common pitfalls

**Changed**

- convertData.js rewritten to load flat JSON from scripts/data/raw instead of Django fixtures, with parallel chunk loading and SQLite-safe sequencing
- Episode loading added to data pipeline; Show2* physical table inserts removed (now derived views)
- Scraper: episode titles extracted from table rows (not all section wikilinks); season links scoped to level-2/3 headings; show attribution uses episode infobox series field filtered by show title
- Episode.director and Episode.writer use unbounded String (no length limit)
- normalizeInteger extended to parse ordinal words (One, Two, …) for season_number
- Migration handling updated and Episode Fiori annotations improved
- VitePress copy-content pipeline updated to support Fiori app docs, API restructure, and front-matter title extraction
- VitePress nav/sidebar restructured: added Apps section, split API into per-service pages, added Shows & Episodes
- CI docs workflow now also triggers on cap/README.md changes
- Viewer app index.html rewritten with SRI hashes on all CDN resources, Content-Security-Policy meta tag, and viewport meta
- README updated with current project structure, Fiori app descriptions, and revised pitfalls section

**Fixed**

- Cross-show episode attribution prevented by filtering extractSeasonLinks to the current show title
- Anthology shows (Tales) without season sub-pages now extract episodes directly from the show page
- Piped wikilinks in episode infobox now yield the series page title, not the display label
- Sub-series character relationships accumulated correctly when registering as a show
- Data quality fixes for sequel trilogy character/planet relationships
- Obsolete hand-written TypeScript type definitions (cap/types/) replaced by generated @cds-models artifacts
- Viewer CSP extended with unsafe-eval to allow Vue 3 runtime template compiler
- Viewer pagination handles backend returning @odata.count=0 without breaking page calculation

## [1.8.0] - 2026-03-14

**Changed**

- Enhance README and improve project documentation
- Add PostgreSQL profile-specific model exposure updates across CDS models and service projection
- Add and expand Star Wars CDS model unit tests, including profile-specific exposure coverage
- Update project dependencies and bump version to 1.8.0
- Update dev container setup (Dockerfile and devcontainer.json) for Node.js LTS and Cloud Foundry CLI installation
- Add CAP modeling and handler guidelines plus validation prompt workflows
- Add compatibility-safe value-help entity migration (*Values helper entities) while retaining legacy helper entities/projections with deprecation comments
- BREAKING: remove legacy value-help helper entities/projections (climate, terrain, hair_colors, eye_colors, skin_colors, classification, designation, language) in favor of *Values artifacts
- Migration details: cap/docs/value-help-migration.md

## [1.4.0] - 2024-07-19

**Changed**

- [CAP version 8.0](https://cap.cloud.sap/docs/releases/jun24)
- Update for SAPUI5 1.126.0
- If you have ran this project locally previously, I recommend deleting your node_modules folder and doing a clean install of all dependencies

## [1.3.0] - 2024-03-01

**Changed**

- [CAP version 7.7.0](https://cap.cloud.sap/docs/releases/feb24)
- Update for SAPUI5 1.121.0

## [1.2.7] - 2024-02-02

**Changed**

- [CAP version 7.6.0](https://cap.cloud.sap/docs/releases/jan24)
- Add [Telemetry Plugin](https://cap.cloud.sap/docs/releases/jan24#open-telemetry-plugin)
- Update for SAPUI5 1.120.5

## [1.2.5] - 2024-01-10

**Changed**

- [CAP version 7.4.0](https://cap.cloud.sap/docs/releases/nov23)
- [CAP version 7.5.0](https://cap.cloud.sap/docs/releases/dec23)
- Add [Audit Logging](https://cap.cloud.sap/docs/guides/data-privacy/audit-logging) functionality - added to People entity in schema.cds
- Add [Notifications](https://cap.cloud.sap/docs/plugins/#notifications) - emit alert upon change/update/create of People entity - see people-service.js
- Add [Change Tracking](https://github.com/cap-js/change-tracking) - see change-tracking.cds for annotations adding tacking to the People entity
- Add [Persistent Outbox](https://cap.cloud.sap/docs/node.js/outbox)
- Update for SAPUI5 1.120

## [1.2.3] - 2023-09-06

**Changed**

- [CAP version 7.2.0](https://cap.cloud.sap/docs/releases/aug23)
- New Node.js minimum version of 18. [16 is end of life](https://nodejs.org/en/blog/announcements/nodejs16-eol)

## [1.2.1] - 2023-07-07

**Changed**

- Add support for new sqlite database service
- Add support for new postgres database service

## [1.2.0] - 2023-06-28

**Changed**

- SAP CAP updated to 7.0 June 2023 Rel - Major Annual Update
- SAPUI5 update to 1.115.0

## [1.1.8] - 2023-02-28

**Changed**

- SAP CAP updated to 6.6 Feb 2023 Rel
- Fixes in the convertData to avoid issues with parallelization and DB constrains
- SAPUI5 update to 1.111.0

## [1.1.5] - 2022-12-19

**Changed**

- SAP CAP updated to 6.4 Dec 2022 Rel
- Switch to @cap-js/graphql [Open Source GraphQL Adapter](https://cap.cloud.sap/docs/releases/dec22#open-source-graphql-adapter)
- SAPUI5 update to 1.109.3

## [1.1.5] - 2022-11-28

**Changed**

- SAP CAP updated to 6.3
- SAPUI5 update to 1.108.2
- New Node.js minimal version is 14.18

## [1.1.4] - 2022-08-11

**Changed**

- SAP CAP updated to 6.1
- SAPUI5 update to 1.105.0
- Kyma Helm Charts updated for new functionality in CAP 6.1

**Added**

- Update to SAP Cloud Application Programming Model 6.0.x - Yearly Major Release
- Add Support for Node.js 18.x
- Added Helm Charts support for deployment on Kyma/K8S

## [1.1.0] - 2022-07-05

**Changed**

- GraphQL support is now GA by switching to the @sap/cds-graphql dependency.  Removal of old GraphQL dependencies.
- Remove Support Node.js 12.x, minimal version now 14.15 as enforced by @sap/cds itself
- SAPUI5 update to 1.103.0

**Added**

- Update to SAP Cloud Application Programming Model 6.0.x - Yearly Major Release
- Add Support for Node.js 18.x
- Added Helm Charts support for deployment on Kyma/K8S

## [1.0.7] - 2022-04-14

**Changed**

- Dark Theme loading optimization thanks to [Marian Zeis](https://github.com/marianfoo) [PR #4](https://github.com/SAP-samples/cloud-cap-hana-swapi/pull/4)

**Added**

- Added async bootstrap for UI5 in preparation for [Patch-Level Independent Bootstrap](https://blogs.sap.com/2022/04/14/sapui5-patch-level-independent-bootstrap) - although I couldn't switch yet as it doesn't seem to work for version 1.100

## [1.0.6] - 2022-03-30

**Changed**

- Update to [CAP March 2022 5.9](https://cap.cloud.sap/docs/releases/mar22)
- Update to [SAPUI5 1.100](https://sapui5.hana.ondemand.com/1.100.0/#/topic/5deb78f36022473487be44cb3a71140a)
- Reactivated experimental GraphQL support. Use from test application with /graphql
- [People App](/people/webapp/index.html) now uses OS setting and adjusts to dark theme - new sap_horizon_dark

**Added**

- New Changelog - You are looking at it
- [Database Integrity Constraints](https://cap.cloud.sap/docs/releases/mar22#database-integrity-constraints)
- People Entity Name Attribute Fuzzy Search via [Native Database Clauses](https://cap.cloud.sap/docs/releases/mar22#native-database-clauses)
- New tallestPerson view uses [Native HANA Functions with non-standard syntax](https://cap.cloud.sap/docs/releases/mar22#native-hana-functions-with-non-standard-syntax)
