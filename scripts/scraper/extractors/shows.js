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
    // Title heuristic takes precedence — some animated shows air on Disney+ which
    // maps to LIVE_ACTION_SERIES by default, but the title is definitive.
    if (/animated|clone wars|rebels|resistance|bad batch|young jedi|tales of|tales from|^tales$/i.test(title)) return 'ANIMATED_SERIES'

    // network may be comma-separated (e.g. "Disney Channel , Disney XD")
    // Check each segment against the map; ANIMATED_SERIES wins if any segment matches
    if (network) {
        const segments = network.split(/[,/]/).map(s => s.trim())
        let result = null
        for (const seg of segments) {
            const mapped = SHOW_TYPE_MAP[seg]
            if (mapped === 'ANIMATED_SERIES') return 'ANIMATED_SERIES'
            if (mapped) result = mapped
        }
        if (result) return result
    }
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
