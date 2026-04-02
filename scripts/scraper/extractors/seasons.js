'use strict'

/**
 * Extract episode page titles from a Wookieepedia season page.
 * Season pages list episodes in a table under an "Episodes" section.
 * Each episode row has a [[Page Title|display]] wikilink.
 * We collect every unique [[...]] page title that is not a category/file link.
 */
function extractSeasonEpisodeTitles(wikitext) {
    if (!wikitext) return []

    // Find the Episodes section (case-insensitive heading)
    const sectionMatch = wikitext.match(/==\s*Episodes?\s*==/i)
    if (!sectionMatch) {
        // Fallback: scan entire page for episode wikilinks
        return extractWikilinks(wikitext)
    }

    const sectionStart = sectionMatch.index + sectionMatch[0].length
    // Find the next == heading (end of section) or end of text
    const nextSection = wikitext.indexOf('\n==', sectionStart)
    const content = wikitext.slice(sectionStart, nextSection !== -1 ? nextSection : undefined)
    return extractWikilinks(content)
}

function extractWikilinks(text) {
    const titles = []
    const re = /\[\[([^\]|#]+?)(?:\|[^\]]+)?\]\]/g
    let m
    while ((m = re.exec(text)) !== null) {
        const title = m[1].trim()
        // Skip File:, Image:, Category: namespaced links
        if (/^(File|Image|Category):/i.test(title)) continue
        if (title) titles.push(title)
    }
    // Deduplicate while preserving order
    return [...new Set(titles)]
}

module.exports = { extractSeasonEpisodeTitles }
