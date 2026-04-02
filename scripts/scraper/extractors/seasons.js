'use strict'

// Month names used to filter date wikilinks in the fallback path.
// A wikilink whose title is a month name or a 4-digit year is a date reference,
// not an episode title.
const MONTH_NAMES = new Set([
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
])

function isDateLink(title) {
    return MONTH_NAMES.has(title)
        || /^\d{4}$/.test(title)
        || /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}$/.test(title)
}

/**
 * Extract episode page titles from a Wookieepedia season page.
 *
 * Season pages list episodes in a wikitable under an "Episodes" section.
 * Each row has columns: episode#, image, title, airdate, prod#.
 *
 * The title cell uses one of two formats:
 *   Standard:  "[[Page Title]]"   — straight double quotes wrapping a wikilink
 *   Italic:    ''[[Page Title]]'' — italic markup wrapping a wikilink (Rebels premieres)
 *
 * Fallback: if neither primary signal matches, and the row has exactly one
 * non-File, non-date wikilink, that link is used.
 */
function extractSeasonEpisodeTitles(wikitext) {
    if (!wikitext) return []

    // Find the Episodes section (case-insensitive heading)
    const sectionMatch = wikitext.match(/==\s*Episodes?\s*==/i)
    if (!sectionMatch) return []

    const sectionStart = sectionMatch.index + sectionMatch[0].length
    // End at the next == heading or end of text
    const nextSection = wikitext.indexOf('\n==', sectionStart)
    const content = wikitext.slice(sectionStart, nextSection !== -1 ? nextSection : undefined)

    const titles = []

    // Split on |- to get table rows
    const rows = content.split('|-')

    for (const row of rows) {
        const title = extractEpisodeTitleFromRow(row)
        if (title) titles.push(title)
    }

    // Deduplicate while preserving order
    return [...new Set(titles)]
}

/**
 * Extract the episode page title from a single table row.
 * Returns null if the row does not look like an episode data row.
 */
function extractEpisodeTitleFromRow(row) {
    // Signal A: quoted wikilink — "[[Page Title]]"
    const quotedMatch = row.match(/"(\[\[[^\]|#]+?\]\])"/)
    if (quotedMatch) {
        return extractPageTitle(quotedMatch[1])
    }

    // Signal B: italic wikilink — ''[[Page Title]]''
    const italicMatch = row.match(/''\s*(\[\[[^\]|#]+?\]\])\s*''/)
    if (italicMatch) {
        return extractPageTitle(italicMatch[1])
    }

    // Fallback: exactly one non-File, non-date wikilink in the row
    const allLinks = extractAllWikilinks(row)
    const candidates = allLinks.filter(t => !isNamespaceLink(t) && !isDateLink(t))
    if (candidates.length === 1) {
        return candidates[0]
    }

    return null
}

/**
 * Extract the page title from a [[Page Title]] or [[Page Title|Label]] wikilink string.
 * Returns null for File:, Image:, Category: links.
 */
function extractPageTitle(wikilink) {
    const m = wikilink.match(/\[\[([^\]|#]+?)(?:\|[^\]]+)?\]\]/)
    if (!m) return null
    const title = m[1].trim()
    if (isNamespaceLink(title)) return null
    return title || null
}

function isNamespaceLink(title) {
    return /^(File|Image|Category):/i.test(title)
}

/**
 * Extract all [[wikilink]] page titles from a text block.
 */
function extractAllWikilinks(text) {
    const titles = []
    const re = /\[\[([^\]|#]+?)(?:\|[^\]]+)?\]\]/g
    let m
    while ((m = re.exec(text)) !== null) {
        const title = m[1].trim()
        if (title) titles.push(title)
    }
    return titles
}

module.exports = { extractSeasonEpisodeTitles }
