'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString } = require('../normalize')

function extractLinks(raw) {
    if (!raw) return []
    return String(raw)
        .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
        .split(/[,|]/)
        .map(s => s.trim())
        .filter(Boolean)
}

function extractVehicle(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    return {
        name:                   pageTitle,
        model:                  normalizeString(infobox.model ?? infobox.type),
        vehicle_class:          normalizeString(infobox.class ?? infobox.vehicle_class),
        manufacturer:           normalizeString(infobox.manufacturer ?? infobox.make),
        cost_in_credits:        normalizeString(infobox.cost ?? infobox.cost_in_credits),
        length:                 normalizeString(infobox.length),
        crew:                   normalizeString(infobox.crew),
        passengers:             normalizeString(infobox.passengers),
        max_atmosphering_speed: normalizeString(infobox.speed ?? infobox.max_speed),
        cargo_capacity:         normalizeString(infobox.cargo ?? infobox.cargo_capacity),
        consumables:            normalizeString(infobox.consumables),
        _pilots:                extractLinks(infobox.pilots ?? infobox.crew_members),
        _legendsVariant:        infobox._legendsVariant ?? false,
    }
}

module.exports = { extractVehicle }
