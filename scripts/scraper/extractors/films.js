'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, resolveField, FIELD_ALIASES } = require('../normalize')

/**
 * Extract a film record from Wookieepedia wikitext.
 * Returns null if the page is a disambiguation page or has no infobox.
 * Private relationship arrays (_characters, _planets, etc.) are name lists
 * resolved to IDs by the orchestrator.
 */
function extractFilm(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    // Helper to split comma/pipe-delimited wiki link lists into page title arrays
    function extractLinks(raw) {
        if (!raw) return []
        return String(raw)
            .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')  // [[Page|Label]] → Page
            .split(/[,|]/)
            .map(s => s.trim())
            .filter(Boolean)
    }

    return {
        title:         pageTitle,
        director:      resolveField(infobox, 'director', FIELD_ALIASES.director),
        producer:      resolveField(infobox, 'producer', FIELD_ALIASES.producer),
        release_date:  normalizeDate(resolveField(infobox, 'release_date', FIELD_ALIASES.release_date)),
        opening_crawl: normalizeString(infobox['opening crawl'] ?? infobox.opening_crawl ?? null),
        episode_id:    null, // populated by orchestrator from episode roman numeral
        _legendsVariant: infobox._legendsVariant ?? false,
        // Relationship link lists — resolved to entity records by orchestrator
        _characters:   extractLinks(infobox.characters ?? infobox.cast),
        _planets:      extractLinks(infobox.planets ?? infobox.locations),
        _starships:    extractLinks(infobox.starships ?? infobox.vehicles_starships),
        _vehicles:     extractLinks(infobox.vehicles),
        _species:      extractLinks(infobox.species),
    }
}

module.exports = { extractFilm }
