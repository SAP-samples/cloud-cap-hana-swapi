'use strict'

// Wookieepedia category names → entity type they yield
// These seed the production page crawl. Character/planet/etc. pages are
// then collected from each production's infobox, not from categories.
const PRODUCTION_CATEGORIES = [
    { category: 'Canon films',                        type: 'film' },
    { category: 'Canon television series',            type: 'show' },
    { category: 'Canon animated television series',   type: 'show' },
    { category: 'Canon short films',                  type: 'show' },
]

module.exports = { PRODUCTION_CATEGORIES }
