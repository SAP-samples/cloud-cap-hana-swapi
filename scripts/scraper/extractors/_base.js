'use strict'

// Note: wtf_wikipedia is not used here — its template parser does not handle
// Wookieepedia's custom infobox templates. We use a direct regex parser instead.

const DISAMBIG_MARKERS = ['{{disambig}}', '{{disambiguation}}', '{{dis}}']
const LEGENDS_MARKERS  = ['{{legends}}']

// Known infobox template names used by Wookieepedia (case-insensitive, no spaces)
const INFOBOX_NAMES = new Set([
    'movie', 'film',
    'televisionseries', 'television series', 'tv series', 'tvseries', 'series',
    'character',
    'planet',
    'species',
    'starship',
    'vehicle', 'ground vehicle',
    'droid', 'creature',
])

/**
 * Find the first infobox in wikitext and return its fields as a flat object.
 * Wookieepedia infoboxes look like:
 *   {{Movie
 *   |director = George Lucas
 *   |release date = May 25, 1977
 *   }}
 *
 * Returns null for disambig pages, pure Legends pages, or pages with no infobox.
 */
function parseInfobox(wikitext) {
    if (!wikitext) return null

    const lower = wikitext.toLowerCase()

    // Skip disambiguation pages
    if (DISAMBIG_MARKERS.some(m => lower.includes(m))) return null

    // Skip pure Legends pages (Canon+Legends pages are included)
    const isLegends = LEGENDS_MARKERS.some(m => lower.includes(m))
    const isBothCanons = lower.includes('{{canon and legends}}')
    if (isLegends && !isBothCanons) return null

    // Find the first infobox by looking for {{KnownTemplateName
    // The template may start at the very beginning or after other templates
    const infobox = extractFirstKnownInfobox(wikitext)
    if (!infobox) return null

    return { ...infobox, _legendsVariant: isBothCanons }
}

/**
 * Scan wikitext for the first template whose name is in INFOBOX_NAMES.
 * Returns a flat key/value object of field names to raw string values,
 * or null if no known infobox is found.
 */
function extractFirstKnownInfobox(wikitext) {
    // Match {{TemplateName\n|...}} blocks
    // We find the start of each {{ block and check if the name is known
    let pos = 0
    while (pos < wikitext.length) {
        const start = wikitext.indexOf('{{', pos)
        if (start === -1) break

        // Extract template name (up to first \n or |)
        const nameEnd = wikitext.search(/[|\n}]/)
        // More precise: find the name starting right after {{
        const afterBraces = start + 2
        const nameTerminator = wikitext.indexOf('\n', afterBraces)
        if (nameTerminator === -1) { pos = start + 2; continue }

        const rawName = wikitext.slice(afterBraces, nameTerminator).trim()
        const normalizedName = rawName.toLowerCase().replace(/\s+/g, ' ').replace(/^[^a-z]*/,'')
        // Also try without spaces for camelCase template names like TelevisionSeries
        const noSpaceName = normalizedName.replace(/\s+/g, '')

        if (INFOBOX_NAMES.has(normalizedName) || INFOBOX_NAMES.has(noSpaceName)) {
            // Found a known infobox — parse its fields
            const fields = parseTemplateFields(wikitext, start)
            if (fields) return fields
        }

        pos = start + 2
    }
    return null
}

/**
 * Parse fields from a {{ ... }} template block starting at `start`.
 * Returns a flat object { fieldName: rawValue } or null on parse failure.
 *
 * Field format: |key = value  (value may span multiple lines until the next |)
 */
function parseTemplateFields(wikitext, start) {
    // Find the end of this template (matching closing }})
    // We need to handle nested {{ }}
    let depth = 0
    let i = start
    let templateEnd = -1

    while (i < wikitext.length) {
        if (wikitext[i] === '{' && wikitext[i+1] === '{') {
            depth++
            i += 2
        } else if (wikitext[i] === '}' && wikitext[i+1] === '}') {
            depth--
            if (depth === 0) {
                templateEnd = i
                break
            }
            i += 2
        } else {
            i++
        }
    }

    if (templateEnd === -1) return null

    const body = wikitext.slice(start, templateEnd + 2)

    // Skip the template name line
    const firstPipe = body.indexOf('\n|')
    if (firstPipe === -1) return {}

    const fieldSection = body.slice(firstPipe)
    const result = {}

    // Split on \n| to get each field line
    const fieldLines = fieldSection.split('\n|').filter(Boolean)
    for (let line of fieldLines) {
        // Strip trailing }} (end of template) from the last field's value
        line = line.replace(/\}\}\s*$/, '')
        const eqPos = line.indexOf('=')
        if (eqPos === -1) continue
        const key   = line.slice(0, eqPos).trim().toLowerCase()
        const value = line.slice(eqPos + 1).trim()
        if (key && value) {
            result[key] = cleanValue(value)
        }
    }

    return result
}

/**
 * Strip wiki markup from a field value to get a plain string.
 * - Removes [[link|label]] → label (or link if no label)
 * - Removes <ref>...</ref> citation markup
 * - Removes {{...}} templates (multi-pass to handle nested)
 * - Removes <br /> and other HTML tags
 * - Collapses * bullet lists to comma-separated
 * - Trims whitespace
 */
function cleanValue(raw) {
    if (!raw) return null

    let v = raw
        // Remove <ref>...</ref>
        .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
        // Remove <ref ... /> self-closing
        .replace(/<ref[^/]*\/>/gi, '')
        // Remove <br /> and other HTML tags
        .replace(/<[^>]+>/g, '')
        // Remove {{...}} nested templates — multi-pass handles 2 levels of nesting
        .replace(/\{\{[^{}]*\}\}/g, '')
        .replace(/\{\{[^{}]*\}\}/g, '')
        // Remove any remaining incomplete {{... fragments (no matching }})
        .replace(/\{\{[^{}]*/g, '')
        // [[Page|Label]] → Label
        .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
        // [[Page]] → Page
        .replace(/\[\[([^\]]+)\]\]/g, '$1')
        // ''italic'' and '''bold'''
        .replace(/'{2,3}/g, '')
        // * bullets → comma-separated list
        .replace(/\n\*/g, ', ')
        .replace(/^\*/,'')
        // Collapse whitespace
        .replace(/\s+/g, ' ')
        .trim()

    return v || null
}

module.exports = { parseInfobox }
