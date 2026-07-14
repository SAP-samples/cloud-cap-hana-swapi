'use strict'

const pThrottle = require('p-throttle')
const cache = require('./cache')

const API_URL = 'https://starwars.fandom.com/api.php'
const USER_AGENT = 'cloud-cap-hana-swapi-scraper/1.0 (educational project; github.com/thjung/cloud-cap-hana-swapi)'

// 1 request per second — respects Wookieepedia rate limits
const throttle = pThrottle({ limit: 1, interval: 1000 })

/**
 * Error carrying the HTTP status of a failed response, so the retry loop can
 * back off on 429/503 the same way it did with axios's err.response.status.
 */
class HttpError extends Error {
    constructor(status, statusText) {
        super(`HTTP ${status} ${statusText}`.trim())
        this.name = 'HttpError'
        this.status = status
    }
}

// Native fetch GET against the MediaWiki API. Builds the query string from
// params, sends the User-Agent, and aborts after 15s (replacing axios timeout).
async function apiGet(params) {
    const url = `${API_URL}?${new URLSearchParams(params)}`
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
        const response = await fetch(url, {
            headers: { 'User-Agent': USER_AGENT },
            signal: controller.signal,
        })
        if (!response.ok) throw new HttpError(response.status, response.statusText)
        return await response.json()
    } finally {
        clearTimeout(timeout)
    }
}

const rawFetch = throttle(async (pageTitle) => {
    const data = await apiGet({
        action: 'query',
        prop: 'revisions',
        titles: pageTitle,
        rvprop: 'content',
        rvslots: 'main',
        format: 'json',
        formatversion: '2',
        redirects: '1',  // follow redirects automatically
    })

    const pages = data?.query?.pages ?? []
    if (!pages.length) return null
    return pages[0]?.revisions?.[0]?.slots?.main?.content ?? null
})

async function fetchWikitext(pageTitle, bypassCache = false) {
    // Check cache first (skip if bypass requested)
    if (!bypassCache) {
        const cached = await cache.read(pageTitle)
        if (cached !== null) return cached
    }

    // Fetch with retry
    let lastError
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const wikitext = await rawFetch(pageTitle)
            await cache.write(pageTitle, wikitext)
            return wikitext
        } catch (err) {
            lastError = err
            const status = err?.status
            if (status === 429 || status === 503) {
                await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)))
            } else {
                throw err
            }
        }
    }
    throw lastError
}

/**
 * Fetch all page titles in a Wookieepedia category (handles API continuation).
 * Uses the same throttle wrapper as wikitext fetches — 1 req/s.
 */
const rawCategoryFetch = throttle(async (category, cmcontinue) => {
    const data = await apiGet({
        action: 'query',
        list: 'categorymembers',
        cmtitle: `Category:${category}`,
        cmlimit: '500',
        cmtype: 'page',
        format: 'json',
        ...(cmcontinue ? { cmcontinue } : {}),
    })
    return data
})

async function fetchCategoryMembers(category) {
    const titles = []
    let cmcontinue

    do {
        const data = await rawCategoryFetch(category, cmcontinue)
        const members = data?.query?.categorymembers ?? []
        titles.push(...members.map(m => m.title))
        cmcontinue = data?.continue?.cmcontinue ?? null
    } while (cmcontinue)

    return titles
}

module.exports = { fetchWikitext, fetchCategoryMembers }
