# Value-Help Endpoint Migration Guide

This guide documents the breaking migration from legacy value-help helper entities to the new `*Values` entities.

## Summary

Legacy helper entities and service projections were removed in favor of non-colliding `*Values` artifacts.

If your UI, integration tests, or scripts previously called legacy endpoints, update them using the table below.

## Endpoint mapping (OData v4)

### StarWarsPlanet service

Base service URL:

- `/odata/v4/StarWarsPlanet/`

| Legacy endpoint (removed) | Replacement endpoint |
| --- | --- |
| `/odata/v4/StarWarsPlanet/climate` | `/odata/v4/StarWarsPlanet/climateValues` |
| `/odata/v4/StarWarsPlanet/terrain` | `/odata/v4/StarWarsPlanet/terrainValues` |

### StarWarsSpecies service

Base service URL:

- `/odata/v4/StarWarsSpecies/`

| Legacy endpoint (removed) | Replacement endpoint |
| --- | --- |
| `/odata/v4/StarWarsSpecies/hair_colors` | `/odata/v4/StarWarsSpecies/hairColorValues` |
| `/odata/v4/StarWarsSpecies/eye_colors` | `/odata/v4/StarWarsSpecies/eyeColorValues` |
| `/odata/v4/StarWarsSpecies/skin_colors` | `/odata/v4/StarWarsSpecies/skinColorValues` |
| `/odata/v4/StarWarsSpecies/classification` | `/odata/v4/StarWarsSpecies/classificationValues` |
| `/odata/v4/StarWarsSpecies/designation` | `/odata/v4/StarWarsSpecies/designationValues` |
| `/odata/v4/StarWarsSpecies/language` | `/odata/v4/StarWarsSpecies/languageValues` |

## UI annotation impact

`CollectionPath` references in CDS annotations were updated accordingly:

- Planet value helps now point to `climateValues` and `terrainValues`
- Species value helps now point to `classificationValues`, `designationValues`, `hairColorValues`, `skinColorValues`, `eyeColorValues`, `languageValues`

## Compatibility and rollout notes

- This is a breaking contract change for clients that explicitly consumed legacy helper endpoints.
- Core business entities and primary service root endpoints are unchanged.
- If needed, you can temporarily re-introduce compatibility projections in service CDS files as aliases.
