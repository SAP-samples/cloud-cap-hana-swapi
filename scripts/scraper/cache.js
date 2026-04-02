'use strict'

const fs = require('fs/promises')
const path = require('path')

const CACHE_DIR = path.join(__dirname, '../data/cache')

function cacheKey(pageTitle) {
    return path.join(CACHE_DIR, encodeURIComponent(pageTitle) + '.json')
}

async function read(pageTitle) {
    const file = cacheKey(pageTitle)
    try {
        const raw = await fs.readFile(file, 'utf8')
        const entry = JSON.parse(raw)
        return entry.data
    } catch {
        return null
    }
}

async function write(pageTitle, data) {
    await fs.mkdir(CACHE_DIR, { recursive: true })
    const file = cacheKey(pageTitle)
    await fs.writeFile(file, JSON.stringify({ cachedAt: Date.now(), data }, null, 2))
}

module.exports = { read, write }
