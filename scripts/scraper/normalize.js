'use strict'

const NULL_VALUES = new Set(['unknown', 'n/a', 'none', 'null', 'n/a.'])

function normalizeString(value) {
    if (value === undefined || value === null) return null
    const s = String(value).trim()
    if (!s) return null
    if (NULL_VALUES.has(s.toLowerCase())) return null
    return s
}

function normalizeDate(value) {
    const s = normalizeString(value)
    if (!s) return null
    const d = new Date(s)
    if (Number.isNaN(d.getTime())) return null
    return d.toISOString().slice(0, 10)
}

function normalizeInteger(value) {
    if (value === undefined || value === null) return null
    const s = normalizeString(String(value))
    if (!s) return null
    const n = parseInt(s, 10)
    return Number.isNaN(n) ? null : n
}

/**
 * Try each alias in order and return the first non-null normalized string.
 * @param {object} infobox  - flat object of infobox key/value pairs
 * @param {string} _field   - canonical field name (unused, for documentation)
 * @param {string[]} aliases - list of Wookieepedia field names to try in order
 */
function resolveField(infobox, _field, aliases) {
    for (const alias of aliases) {
        const val = normalizeString(infobox[alias])
        if (val !== null) return val
    }
    return null
}

// Canonical alias maps for Wookieepedia infobox fields
const FIELD_ALIASES = {
    director:      ['director', 'directors', 'directed_by'],
    producer:      ['producer', 'producers', 'produced_by', 'executive_producer'],
    release_date:  ['release_date', 'release', 'released', 'airdate', 'first_aired', 'premiere'],
    episode_count: ['episode_count', 'episodes', 'num_episodes'],
    network:       ['network', 'broadcaster', 'channel', 'streaming'],
    seasons:       ['seasons', 'series', 'num_seasons'],
    homeworld:     ['homeworld', 'home_world', 'homeplanet', 'home_planet'],
    height:        ['height', 'height_range'],
    species:       ['species', 'race'],
}

module.exports = {
    normalizeString,
    normalizeDate,
    normalizeInteger,
    resolveField,
    FIELD_ALIASES,
}
