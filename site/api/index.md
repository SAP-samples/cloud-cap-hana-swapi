---
title: API Reference
---

# API Reference

The Star Wars CAP Showcase exposes its services on three protocols simultaneously:

| Protocol | Base path | Best for |
| --- | --- | --- |
| OData v4 | `/odata/v4/<Service>/` | Fiori UI, SAP integration, standard tooling |
| REST | `/rest/<Service>/` | Simple HTTP clients, scripting |
| GraphQL | `/graphql/` | Flexible ad-hoc queries, developer tooling |

## Services

| Service | Description | Full API reference |
| --- | --- | --- |
| **DataService** | Read-only projection of all Star Wars entities — Films, People, Planets, Species, Starships, Vehicles, Shows, Episodes | [Data Service API](/api/data-service) |
| **StarWarsFilm** | Draft-enabled Film CRUD with junction navigation | [Film API](/api/film) |

The generated reference pages below are produced by [Widdershins](https://github.com/Mermade/widdershins) from the OpenAPI 3.0 specs at `cap/docs/*.openapi3.json`.

> **Tip:** Start the server with `npm run sqlite` and browse to `http://localhost:4004/api-docs` for an interactive Swagger UI that covers all services.
