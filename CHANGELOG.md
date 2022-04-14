# Change Log

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/).

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
