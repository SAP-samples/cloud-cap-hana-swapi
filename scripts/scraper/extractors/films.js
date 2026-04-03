'use strict'

const { parseInfobox } = require('./_base')
const { normalizeString, normalizeDate, resolveField, FIELD_ALIASES } = require('../normalize')

// Roman numerals I–X covering all current and future saga episodes.
// Regex uses word boundaries so "IX" does not match as "I" + word boundary
// (the trailing \b fails because "X" is a word character after "I").
const ROMAN_TO_INT = { I:1, II:2, III:3, IV:4, V:5, VI:6, VII:7, VIII:8, IX:9, X:10 }

function parseEpisodeId(title) {
    const m = title.match(/\bEpisode\s+(I{1,3}|IV|V|VI{0,3}|IX|X)\b/)
    return m ? (ROMAN_TO_INT[m[1]] ?? 0) : 0
}

/**
 * Extract a film record from Wookieepedia wikitext.
 * Returns null if the page is a disambiguation page or has no infobox.
 * Private relationship arrays (_characters, _planets, etc.) are name lists
 * resolved to IDs by the orchestrator.
 *
 * Relationship data comes from the {{App}} template in the article body,
 * not the infobox. The App template uses:
 *   c-characters → people
 *   c-locations  → planets
 *   c-vehicles   → starships + vehicles (undifferentiated in Wookieepedia)
 *   c-species    → species
 */
function extractFilm(pageTitle, wikitext) {
    const infobox = parseInfobox(wikitext)
    if (!infobox) return null

    /**
     * Extract page titles listed under a named field in the {{App}} template.
     * Fields are delimited by \n| so we find the field start and scan to the next \n|.
     * Tries each key in order, returning the first non-empty result.
     * Episodes I-VI use c-prefixed keys (c-characters, c-locations, etc.);
     * Episodes VII-IX and anthology films use unprefixed keys (characters, locations, etc.).
     */
    function extractAppSection(...keys) {
        for (const key of keys) {
            const marker = `|${key}=`
            const start = wikitext.indexOf(marker)
            if (start === -1) continue
            const contentStart = start + marker.length
            const nextField = wikitext.indexOf('\n|', contentStart)
            const content = wikitext.slice(contentStart, nextField !== -1 ? nextField : undefined)

            // Extract the page title from the first [[PageTitle|...]] or [[PageTitle]] on each line.
            // This avoids picking up trailing nicknames/annotations after the wiki link.
            const results = []
            for (const line of content.split('\n')) {
                const m = line.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)
                if (m) results.push(m[1].trim())
            }
            if (results.length > 0) return results
        }
        return []
    }

    // c-vehicles / vehicles covers both starships and vehicles — assign to both so both entity
    // maps get populated; individual entity pages determine the actual type.
    const vehicles = extractAppSection('c-vehicles', 'vehicles')

    return {
        title:         pageTitle,
        director:      resolveField(infobox, 'director', FIELD_ALIASES.director),
        producer:      resolveField(infobox, 'producer', FIELD_ALIASES.producer),
        release_date:  normalizeDate(resolveField(infobox, 'release_date', FIELD_ALIASES.release_date)),
        opening_crawl: normalizeString(infobox['opening crawl'] ?? infobox.opening_crawl ?? null),
        episode_id:    parseEpisodeId(pageTitle),
        _legendsVariant: infobox._legendsVariant ?? false,
        // Relationship link lists — resolved to entity records by orchestrator
        _characters:   extractAppSection('c-characters', 'characters'),
        _planets:      extractAppSection('c-locations', 'locations'),
        _starships:    vehicles,
        _vehicles:     vehicles,
        _species:      extractAppSection('c-species', 'species'),
    }
}

module.exports = { extractFilm }
