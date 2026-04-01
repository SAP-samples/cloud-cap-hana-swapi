'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, resolveField, FIELD_ALIASES } = require('../normalize')

function extractSpecies(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:             pageTitle,
        classification:   normalizeString(infobox.classification ?? infobox.type),
        designation:      normalizeString(infobox.designation ?? infobox.sentience),
        average_height:   normalizeString(infobox.average_height ?? infobox.height),
        average_lifespan: normalizeString(infobox.average_lifespan ?? infobox.lifespan),
        hair_colors:      normalizeString(infobox.hair_color ?? infobox.hair),
        skin_colors:      normalizeString(infobox.skin_color ?? infobox.skin),
        eye_colors:       normalizeString(infobox.eye_color ?? infobox.eyes),
        language:         normalizeString(infobox.language ?? infobox.languages),
        _homeworld:       normalizeString(resolveField(infobox, 'homeworld', FIELD_ALIASES.homeworld)),
        _legendsVariant:  infobox._legendsVariant ?? false,
    }
}

module.exports = { extractSpecies }
