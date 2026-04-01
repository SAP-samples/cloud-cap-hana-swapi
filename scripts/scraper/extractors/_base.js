'use strict'

const wtf = require('wtf_wikipedia')

const DISAMBIG_MARKERS = ['{{disambig}}', '{{disambiguation}}', '{{dis}}']
const LEGENDS_MARKERS  = ['{{legends}}']

/**
 * Parse wikitext and return the first infobox as a flat key/value object.
 * Returns null if the page is a disambiguation page or has no infobox.
 */
function parseInfobox(wikitext) {
    if (!wikitext) return null

    const lower = wikitext.toLowerCase()

    // Skip disambiguation pages
    if (DISAMBIG_MARKERS.some(m => lower.includes(m))) return null

    // Skip pure Legends pages (Canon+Legends pages are included by the caller)
    const isLegends = LEGENDS_MARKERS.some(m => lower.includes(m))
    const isBothCanons = lower.includes('{{canon and legends}}')
    if (isLegends && !isBothCanons) return null

    const doc = wtf(wikitext)
    const templates = doc.templates()
    if (!templates.length) return null

    // Flatten the first template into a key/value object
    const tpl = templates[0]
    const data = tpl.json ? tpl.json() : {}

    return {
        ...data,
        _legendsVariant: isBothCanons,
    }
}

module.exports = { parseInfobox }
