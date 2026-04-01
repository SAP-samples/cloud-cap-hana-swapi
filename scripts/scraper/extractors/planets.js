'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString } = require('../normalize')

function extractPlanet(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:            pageTitle,
        diameter:        normalizeString(infobox.diameter),
        rotation_period: normalizeString(infobox.rotation ?? infobox.rotation_period),
        orbital_period:  normalizeString(infobox.orbital ?? infobox.orbital_period),
        gravity:         normalizeString(infobox.gravity),
        population:      normalizeString(infobox.population),
        climate:         normalizeString(infobox.climate),
        terrain:         normalizeString(infobox.terrain),
        surface_water:   normalizeString(infobox.water ?? infobox.surface_water),
        _legendsVariant: infobox._legendsVariant ?? false,
    }
}

module.exports = { extractPlanet }
