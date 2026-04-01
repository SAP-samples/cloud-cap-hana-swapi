'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, resolveField, FIELD_ALIASES } = require('../normalize')

function extractPerson(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:        pageTitle,
        height:      normalizeString(infobox.height ?? infobox.height_range),
        mass:        normalizeString(infobox.mass ?? infobox.weight),
        hair_color:  normalizeString(infobox.hair ?? infobox.hair_color),
        skin_color:  normalizeString(infobox.skin ?? infobox.skin_color),
        eye_color:   normalizeString(infobox.eyes ?? infobox.eye_color),
        birth_year:  normalizeString(infobox.born ?? infobox.birth_year),
        gender:      normalizeString(infobox.gender ?? infobox.sex),
        _homeworld:  normalizeString(resolveField(infobox, 'homeworld', FIELD_ALIASES.homeworld)),
        _species:    normalizeString(resolveField(infobox, 'species', FIELD_ALIASES.species)),
        _legendsVariant: infobox._legendsVariant ?? false,
    }
}

module.exports = { extractPerson }
