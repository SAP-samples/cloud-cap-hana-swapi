'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, normalizeInteger, resolveField, FIELD_ALIASES } = require('../normalize')

const SHOW_TYPE_MAP = {
    'Disney+':          'LIVE_ACTION_SERIES',
    'disney+':          'LIVE_ACTION_SERIES',
    'Cartoon Network':  'ANIMATED_SERIES',
    'Disney XD':        'ANIMATED_SERIES',
    'Disney Channel':   'ANIMATED_SERIES',
    'Netflix':          'LIVE_ACTION_SERIES',
    'Adult Swim':       'ANIMATED_SERIES',
    'Disney+ / Disney Channel': 'ANIMATED_SERIES',
}

function inferShowType(network, title) {
    const mapped = SHOW_TYPE_MAP[network]
    if (mapped) return mapped
    // Fallback: animated in title heuristic
    if (/animated|clone wars|rebels|resistance/i.test(title)) return 'ANIMATED_SERIES'
    return 'LIVE_ACTION_SERIES'
}

function extractLinks(raw) {
    if (!raw) return []
    return String(raw)
        .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
        .split(/[,|]/)
        .map(s => s.trim())
        .filter(Boolean)
}

function extractShow(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    const network = resolveField(infobox, 'network', FIELD_ALIASES.network)

    return {
        title:          pageTitle,
        show_type:      inferShowType(network, pageTitle),
        seasons:        normalizeInteger(resolveField(infobox, 'seasons', FIELD_ALIASES.seasons)),
        episode_count:  normalizeInteger(resolveField(infobox, 'episode_count', FIELD_ALIASES.episode_count)),
        network:        network,
        director:       resolveField(infobox, 'director', FIELD_ALIASES.director),
        producer:       resolveField(infobox, 'producer', FIELD_ALIASES.producer),
        release_date:   normalizeDate(resolveField(infobox, 'release_date', FIELD_ALIASES.release_date)),
        _legendsVariant: infobox._legendsVariant ?? false,
        _characters:    extractLinks(infobox.characters ?? infobox.cast),
        _planets:       extractLinks(infobox.planets ?? infobox.locations),
        _starships:     extractLinks(infobox.starships),
        _vehicles:      extractLinks(infobox.vehicles),
        _species:       extractLinks(infobox.species),
    }
}

module.exports = { extractShow }
