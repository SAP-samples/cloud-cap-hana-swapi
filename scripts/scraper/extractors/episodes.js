'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, normalizeInteger, resolveField, FIELD_ALIASES } = require('../normalize')

/**
 * Extract page titles listed under a named field in the {{App}} template.
 * Episode pages use unprefixed keys: characters, locations, vehicles, species
 * (unlike film pages which use c-characters, c-locations, c-vehicles, c-species).
 */
function extractAppSection(key, wikitext) {
    const marker = `|${key}=`
    const start = wikitext.indexOf(marker)
    if (start === -1) return []
    const contentStart = start + marker.length
    const nextField = wikitext.indexOf('\n|', contentStart)
    const content = wikitext.slice(contentStart, nextField !== -1 ? nextField : undefined)

    const results = []
    for (const line of content.split('\n')) {
        const m = line.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)
        if (m) results.push(m[1].trim())
    }
    return results
}

/**
 * Extract the link target (page title) from the raw |series= field.
 * Wookieepedia episode infoboxes often use piped wikilinks like:
 *   [[Star Wars: Tales of the Jedi (television series)|''Star Wars: Tales of the Jedi'']]
 * cleanValue resolves these to the display label, but we want the page title for
 * reliable show → episode joining.  Falls back to the already-cleaned value.
 */
function resolveSeriesTitle(cleanedSeries, wikitext) {
    if (!cleanedSeries) return null
    const m = wikitext.match(/\|series\s*=\s*\[\[([^\]|]+)/)
    return m ? m[1].trim() : cleanedSeries
}

function extractEpisode(pageTitle, wikitext, showTitle) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    const vehicles = extractAppSection('vehicles', wikitext)

    return {
        title:          pageTitle,
        season_number:  normalizeInteger(resolveField(infobox, 'season', ['season', 'season number', 'season_number'])),
        episode_number: normalizeInteger(resolveField(infobox, 'number', ['number', 'episode', 'episode_number', 'episode number', 'num'])),
        air_date:       normalizeDate(resolveField(infobox, 'airdate', FIELD_ALIASES.release_date)),
        director:       resolveField(infobox, 'director', FIELD_ALIASES.director),
        writer:         resolveField(infobox, 'writer', ['writer', 'writers', 'written_by', 'teleplay', 'screenplay']),
        runtime:        normalizeInteger(resolveField(infobox, 'runtime', ['runtime', 'running_time', 'length', 'run_time'])),
        timeline:       normalizeString(infobox.timeline ?? infobox.timeline_position ?? null),
        _show:          resolveSeriesTitle(infobox.series, wikitext) ?? showTitle,
        _characters:    extractAppSection('characters', wikitext),
        _planets:       extractAppSection('locations', wikitext),
        _starships:     vehicles,
        _vehicles:      vehicles,
        _species:       extractAppSection('species', wikitext),
    }
}

module.exports = { extractEpisode }
