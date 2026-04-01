'use strict'

const axios = require('axios')
const pThrottle = require('p-throttle')
const cache = require('./cache')

const API_URL = 'https://starwars.fandom.com/api.php'
const USER_AGENT = 'cloud-cap-hana-swapi-scraper/1.0 (educational project; github.com/thjung/cloud-cap-hana-swapi)'

// 1 request per second — respects Wookieepedia rate limits
const throttle = pThrottle({ limit: 1, interval: 1000 })

const rawFetch = throttle(async (pageTitle) => {
    const params = {
        action: 'query',
        prop: 'revisions',
        titles: pageTitle,
        rvprop: 'content',
        rvslots: 'main',
        format: 'json',
        formatversion: '2',
    }

    const response = await axios.get(API_URL, {
        params,
        headers: { 'User-Agent': USER_AGENT },
        timeout: 15000,
    })

    const pages = response.data?.query?.pages ?? []
    if (!pages.length) return null
    return pages[0]?.revisions?.[0]?.slots?.main?.content ?? null
})

async function fetchWikitext(pageTitle) {
    // Check cache first
    const cached = await cache.read(pageTitle)
    if (cached !== null) return cached

    // Fetch with retry
    let lastError
    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const wikitext = await rawFetch(pageTitle)
            await cache.write(pageTitle, wikitext)
            return wikitext
        } catch (err) {
            lastError = err
            const status = err?.response?.status
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
    const params = {
        action: 'query',
        list: 'categorymembers',
        cmtitle: `Category:${category}`,
        cmlimit: '500',
        cmtype: 'page',
        format: 'json',
        ...(cmcontinue ? { cmcontinue } : {}),
    }

    const response = await axios.get(API_URL, {
        params,
        headers: { 'User-Agent': USER_AGENT },
        timeout: 15000,
    })
    return response.data
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
