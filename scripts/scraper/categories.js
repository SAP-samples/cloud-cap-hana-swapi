'use strict'

// Wookieepedia category names → entity type they yield
// These seed the production page crawl. Character/planet/etc. pages are
// then collected from each production's infobox, not from categories.
//
// Note: Wookieepedia uses different category names than the design spec assumed.
// - Saga films (Episodes I–IX) live in 'Saga films', not 'Canon films'
// - Anthology films (Rogue One, Solo) live in 'Anthology films'
// - Live-action shows live in 'Canon live-action television series'
// - Animated shows live in 'Canon animated television series'
const PRODUCTION_CATEGORIES = [
    { category: 'Saga films',                               type: 'film' },
    { category: 'Anthology films',                          type: 'film' },
    { category: 'Canon live-action television series',      type: 'show' },
    { category: 'Canon animated television series',         type: 'show' },
]

module.exports = { PRODUCTION_CATEGORIES }
