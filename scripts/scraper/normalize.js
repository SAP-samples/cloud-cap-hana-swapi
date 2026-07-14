'use strict'

const NULL_VALUES = new Set(['unknown', 'n/a', 'none', 'null', 'n/a.'])

function normalizeString(value) {
    if (value === undefined || value === null) return null
    const s = String(value).trim()
    if (!s) return null
    if (NULL_VALUES.has(s.toLowerCase())) return null
    return s
}

/**
 * Format a parsed Date as YYYY-MM-DD without shifting the calendar day.
 *
 * JS parses bare ISO dates ("1977-05-25") and strings with an explicit
 * Z/offset as UTC, but locale strings ("May 25, 1977") as *local* midnight.
 * Using toISOString() on a locale-parsed date shifts it to the previous day
 * in any timezone ahead of UTC. So we read the calendar parts from the same
 * frame the input was parsed in: UTC getters for UTC-framed inputs, local
 * getters otherwise.
 */
function toISODate(input, d) {
    const utcFramed = /^\d{4}-\d{2}-\d{2}$/.test(input) || /[Zz]$|[+-]\d{2}:?\d{2}$/.test(input)
    const year  = utcFramed ? d.getUTCFullYear() : d.getFullYear()
    const month = (utcFramed ? d.getUTCMonth() : d.getMonth()) + 1
    const day   = utcFramed ? d.getUTCDate() : d.getDate()
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function normalizeDate(value) {
    const s = normalizeString(value)
    if (!s) return null
    // Wookieepedia sometimes has multiple dates like "May 25, 1977 , January 31, 1997"
    // or "May 19, 1999, February 10, 2012 {{C|In 3D}}"
    // Strategy: try ' , ' split first (space-comma-space), then split on the first year boundary
    const spacedComma = s.split(/\s+,\s+|\n/)[0].trim()
    // If the first segment already parses as a date, use it
    let d = new Date(spacedComma)
    if (!Number.isNaN(d.getTime())) return toISODate(spacedComma, d)

    // Fall back: split on ', ' after a 4-digit year (optionally followed by parenthetical)
    // e.g. "May 19, 1999, February..." → take "May 19, 1999"
    // e.g. "December 15, 2016 (UK), December 16, 2016 (US)" → take "December 15, 2016"
    const yearBoundary = spacedComma.match(/^(.*?\d{4})\s*(?:\([^)]*\))?\s*,\s+/)
    if (yearBoundary) {
        const seg = yearBoundary[1].trim()
        d = new Date(seg)
        if (!Number.isNaN(d.getTime())) return toISODate(seg, d)
    }

    // Last attempt: just the first space-delimited segment that has a year
    const firstDate = spacedComma.replace(/\*\s*/, '').trim()
    d = new Date(firstDate)
    return Number.isNaN(d.getTime()) ? null : toISODate(firstDate, d)
}

const ORDINAL_TO_INT = {
    one: 1, two: 2, three: 3, four: 4, five: 5,
    six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
}

function normalizeInteger(value) {
    if (value === undefined || value === null) return null
    const s = normalizeString(String(value))
    if (!s) return null
    const n = parseInt(s, 10)
    if (!Number.isNaN(n)) return n
    return ORDINAL_TO_INT[s.toLowerCase()] ?? null
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
    producer:      ['producer', 'producers', 'produced_by', 'executive_producer', 'executive producers', 'creators'],
    release_date:  ['release_date', 'release', 'released', 'release date', 'airdate', 'first_aired', 'premiere', 'first aired'],
    episode_count: ['episode_count', 'episodes', 'num_episodes', 'num episodes'],
    network:       ['network', 'broadcaster', 'channel', 'streaming'],
    seasons:       ['seasons', 'series', 'num_seasons', 'num seasons'],
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
