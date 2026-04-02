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

/**
 * Extract character page titles from the cast field of a {{Credits}} template.
 * Cast lines follow the pattern: as '''[[CharacterPage|DisplayName]]'''
 * We extract the page title (not the display name).
 */
function extractCreditsCharacters(wikitext) {
    const marker = '|cast='
    const start = wikitext.indexOf(marker)
    if (start === -1) return []
    const contentStart = start + marker.length
    const nextField = wikitext.indexOf('\n|', contentStart)
    const content = wikitext.slice(contentStart, nextField !== -1 ? nextField : undefined)

    const chars = []
    const re = /as\s+'''?\[\[([^\]|]+)(?:\|[^\]]+)?\]\]'''?/g
    let m
    while ((m = re.exec(content)) !== null) {
        const name = m[1].trim()
        if (name) chars.push(name)
    }
    return chars
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
        // Characters come from {{Credits}} cast field; planets/ships/species not available
        // at the show level on Wookieepedia (they live on individual episode pages).
        _characters:    extractCreditsCharacters(wikitext),
        _planets:       [],
        _starships:     [],
        _vehicles:      [],
        _species:       [],
    }
}

module.exports = { extractShow }
