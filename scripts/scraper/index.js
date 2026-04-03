'use strict'

const fs = require('fs/promises')
const path = require('path')
const readline = require('readline')

const { fetchWikitext, fetchCategoryMembers } = require('./mediawiki')
const { PRODUCTION_CATEGORIES } = require('./categories')
const { extractFilm } = require('./extractors/films')
const { extractShow } = require('./extractors/shows')
const { extractPerson } = require('./extractors/people')
const { extractPlanet } = require('./extractors/planets')
const { extractSpecies } = require('./extractors/species')
const { extractStarship } = require('./extractors/starships')
const { extractVehicle } = require('./extractors/vehicles')
const { extractSeasonEpisodeTitles } = require('./extractors/seasons')
const { extractEpisode } = require('./extractors/episodes')

const RAW_DIR = path.join(__dirname, '../data/raw')
const FAILED_LOG = path.join(__dirname, '../data/cache/failed.json')

const ARGS = new Set(process.argv.slice(2))
const BYPASS_CACHE = ARGS.has('--bypass-cache')
const FILMS_ONLY = ARGS.has('--films-only')

const SEASON_LINK_BLOCKLIST = /complete|guide|art of|score|vol\.|collector|soundtrack|handbook|encyclopedia/i
const SEASON_LINK_STOPWORDS = new Set(['star', 'wars', 'the', 'a', 'of', 'and', 'in'])

/**
 * Extract season page titles from a show's wikitext.
 * Only returns pages that:
 *   1. Contain "season" in the page title
 *   2. Are not merchandise/media pages (blocklist)
 *   3. Contain at least one distinctive word from the show's title
 */
function extractSeasonLinks(wikitext, showTitle) {
    if (!wikitext) return []
    const keyWords = (showTitle || '').toLowerCase().split(/[\s:]+/)
        .filter(w => w.length > 2 && !SEASON_LINK_STOPWORDS.has(w))
    const titles = []
    let m

    // Pass 1: links anywhere whose title contains "season" (standard multi-season shows)
    const re1 = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
    while ((m = re1.exec(wikitext)) !== null) {
        const t = m[1].trim()
        if (!/season/i.test(t)) continue
        if (SEASON_LINK_BLOCKLIST.test(t)) continue
        if (keyWords.some(w => t.toLowerCase().includes(w))) titles.push(t)
    }

    // Pass 2: links inside a ==Seasons== section, regardless of title
    // Handles anthology shows (e.g. Tales) where season sub-pages are linked
    // by series title rather than "Season N" page names.
    const sectionMatch = wikitext.match(/==\s*Seasons?\s*==/i)
    if (sectionMatch) {
        const sectionStart = sectionMatch.index + sectionMatch[0].length
        const nextSection = wikitext.indexOf('\n==', sectionStart)
        const sectionContent = wikitext.slice(sectionStart, nextSection !== -1 ? nextSection : undefined)
        const re2 = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
        while ((m = re2.exec(sectionContent)) !== null) {
            const t = m[1].trim()
            if (/^(File|Image|Category):/i.test(t)) continue
            if (SEASON_LINK_BLOCKLIST.test(t)) continue
            if (keyWords.some(w => t.toLowerCase().includes(w))) titles.push(t)
        }
    }

    return [...new Set(titles)]
}

async function confirm(question) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close()
            resolve(answer.trim().toLowerCase())
        })
    })
}

async function run() {
    // --bypass-cache: require explicit confirmation before fetching live data
    if (BYPASS_CACHE) {
        console.log('⚠️  --bypass-cache: This will fetch fresh data from Wookieepedia and overwrite cached pages.')
        console.log('    Existing cache files for pages that are re-fetched will be replaced.')
        const answer = await confirm('    Type "yes" to continue, anything else to abort: ')
        if (answer !== 'yes') {
            console.log('Aborted.')
            process.exit(0)
        }
    }

    if (FILMS_ONLY) {
        console.log('Running in --films-only mode: scraping films and their entities only (no shows or episodes).')
    }

    const stats = { scraped: 0, failed: 0, skipped: 0 }
    const failed = []

    // Collections
    const films = new Map()
    const shows = new Map()
    const people = new Map()
    const planets = new Map()
    const speciesMap = new Map()
    const starships = new Map()
    const vehicles = new Map()
    const episodes        = new Map()
    const episodeShowMap  = new Map()

    // Relationship sets
    const rels = {
        film2people:    new Set(), film2planets:   new Set(),
        film2starships: new Set(), film2vehicles:  new Set(), film2species: new Set(),
        show2people:    new Set(), show2planets:   new Set(),
        show2starships: new Set(), show2vehicles:  new Set(), show2species: new Set(),
        species2people: new Set(), starship2pilot: new Set(),
        vehicle2pilot:  new Set(), planet2people:  new Set(),
        episode2people:    new Set(),
        episode2planets:   new Set(),
        episode2starships: new Set(),
        episode2vehicles:  new Set(),
        episode2species:   new Set(),
    }

    // ── Step 1: Fetch production page titles from categories ──────────────────
    console.log('Fetching production categories...')
    const productionQueue = []

    const activeCategories = FILMS_ONLY
        ? PRODUCTION_CATEGORIES.filter(c => c.type === 'film')
        : PRODUCTION_CATEGORIES

    for (const { category, type } of activeCategories) {
        console.log(`  Fetching category: ${category}`)
        const titles = await fetchCategoryMembers(category)
        titles.forEach(t => productionQueue.push({ title: t, type }))
    }

    // ── Step 2: Process each production page ─────────────────────────────────
    const FILM_COLLECTION_PAGES = new Set([
        'Original trilogy', 'Prequel trilogy', 'Sequel trilogy',
        'Star Wars saga', 'Star Wars Anthology Series',
        'Untitled Boba Fett film',
    ])

    console.log(`Processing ${productionQueue.length} production pages...`)

    for (const { title, type } of productionQueue) {
        if (type === 'film' && FILM_COLLECTION_PAGES.has(title)) {
            stats.skipped++; continue
        }
        try {
            const wikitext = await fetchWikitext(title, BYPASS_CACHE)
            if (!wikitext) { stats.skipped++; continue }

            if (type === 'film') {
                const record = extractFilm(title, wikitext)
                if (!record) { stats.skipped++; continue }
                films.set(title, record)

                record._characters.forEach(n => { people.set(n, null); rels.film2people.add(`${title}::${n}`) })
                record._planets.forEach(n => { planets.set(n, null); rels.film2planets.add(`${title}::${n}`) })
                record._starships.forEach(n => { starships.set(n, null); rels.film2starships.add(`${title}::${n}`) })
                record._vehicles.forEach(n => { vehicles.set(n, null); rels.film2vehicles.add(`${title}::${n}`) })
                record._species.forEach(n => { speciesMap.set(n, null); rels.film2species.add(`${title}::${n}`) })
            } else {
                const record = extractShow(title, wikitext)
                if (!record) { stats.skipped++; continue }
                shows.set(title, record)

                record._characters.forEach(n => { people.set(n, null); rels.show2people.add(`${title}::${n}`) })
                record._planets.forEach(n => { planets.set(n, null); rels.show2planets.add(`${title}::${n}`) })
                record._starships.forEach(n => { starships.set(n, null); rels.show2starships.add(`${title}::${n}`) })
                record._vehicles.forEach(n => { vehicles.set(n, null); rels.show2vehicles.add(`${title}::${n}`) })
                record._species.forEach(n => { speciesMap.set(n, null); rels.show2species.add(`${title}::${n}`) })

                const seasonLinks = extractSeasonLinks(wikitext, title)
                for (const seasonTitle of seasonLinks) {
                    try {
                        const seasonWikitext = await fetchWikitext(seasonTitle, BYPASS_CACHE)
                        if (!seasonWikitext) continue
                        const episodeTitles = extractSeasonEpisodeTitles(seasonWikitext)
                        for (const epTitle of episodeTitles) {
                            if (!episodes.has(epTitle)) {
                                episodes.set(epTitle, null)
                                episodeShowMap.set(epTitle, title)
                            }
                        }
                    } catch (err) {
                        stats.failed++
                        failed.push({ title: seasonTitle, error: String(err) })
                        console.warn(`  [FAIL] Season ${seasonTitle}: ${err.message}`)
                    }
                }
                // No season sub-pages — try extracting episodes directly from the show page
                if (seasonLinks.length === 0) {
                    const directEpisodeTitles = extractSeasonEpisodeTitles(wikitext)
                    for (const epTitle of directEpisodeTitles) {
                        if (!episodes.has(epTitle)) {
                            episodes.set(epTitle, null)
                            episodeShowMap.set(epTitle, title)
                        }
                    }
                }
            }
            stats.scraped++
        } catch (err) {
            stats.failed++
            failed.push({ title, error: String(err) })
            console.warn(`  [FAIL] ${title}: ${err.message}`)
        }
    }

    // ── Step 3: Process each unique entity page ───────────────────────────────
    const totalEntities = people.size + planets.size + speciesMap.size + starships.size + vehicles.size
    console.log(`Scraping ${people.size} people, ${planets.size} planets, ${speciesMap.size} species, ${starships.size} starships, ${vehicles.size} vehicles (${totalEntities} total)...`)

    let entityDone = 0

    async function scrapeEntities(map, extractor, label) {
        for (const [name] of map) {
            if (map.get(name) !== null) continue
            try {
                const wikitext = await fetchWikitext(name, BYPASS_CACHE)
                if (!wikitext) { stats.skipped++ } else {
                    const record = extractor(name, wikitext)
                    if (record) { map.set(name, record); stats.scraped++ }
                    else stats.skipped++
                }
            } catch (err) {
                stats.failed++
                failed.push({ title: name, error: String(err) })
                console.warn(`  [FAIL] ${label} ${name}: ${err.message}`)
            }
            entityDone++
            const pct = Math.round(entityDone / totalEntities * 100)
            process.stdout.write(`\r  [${entityDone}/${totalEntities}] ${pct}% — ${label}: ${name.slice(0, 50)}`.padEnd(80))
        }
    }

    await scrapeEntities(people, extractPerson, 'People')
    await scrapeEntities(planets, extractPlanet, 'Planet')
    await scrapeEntities(speciesMap, extractSpecies, 'Species')
    await scrapeEntities(starships, extractStarship, 'Starship')
    await scrapeEntities(vehicles, extractVehicle, 'Vehicle')
    process.stdout.write('\n')

    if (!FILMS_ONLY) {
        // Scrape episode pages
        console.log(`Scraping ${episodes.size} episodes...`)
        let epDone = 0
        for (const [epTitle] of episodes) {
            if (episodes.get(epTitle) !== null) continue
            const showTitle = episodeShowMap.get(epTitle) ?? ''
            try {
                const wikitext = await fetchWikitext(epTitle, BYPASS_CACHE)
                if (!wikitext) { stats.skipped++ } else {
                    const record = extractEpisode(epTitle, wikitext, showTitle)
                    if (record) { episodes.set(epTitle, record); stats.scraped++ }
                    else stats.skipped++
                }
            } catch (err) {
                stats.failed++
                failed.push({ title: epTitle, error: String(err) })
                console.warn(`  [FAIL] Episode ${epTitle}: ${err.message}`)
            }
            epDone++
            const pct = Math.round(epDone / episodes.size * 100)
            process.stdout.write(`\r  [${epDone}/${episodes.size}] ${pct}% — Episode: ${epTitle.slice(0, 50)}`.padEnd(80))
        }
        process.stdout.write('\n')
    }

    // ── Step 4: Build back-ref relationships ─────────────────────────────────
    for (const [name, person] of people) {
        if (!person) continue
        if (person._homeworld) rels.planet2people.add(`${person._homeworld}::${name}`)
        if (person._species)   rels.species2people.add(`${person._species}::${name}`)
    }
    for (const [name, ship] of starships) {
        if (!ship) continue
        ship._pilots.forEach(p => rels.starship2pilot.add(`${name}::${p}`))
    }
    for (const [name, veh] of vehicles) {
        if (!veh) continue
        veh._pilots.forEach(p => rels.vehicle2pilot.add(`${name}::${p}`))
    }

    if (!FILMS_ONLY) {
        // Episode entity relationships + second-pass scrape
        for (const [name, ep] of episodes) {
            if (!ep) continue
            ep._characters.forEach(p => { people.set(p, people.get(p) ?? null);       rels.episode2people.add(`${name}::${p}`) })
            ep._planets.forEach(n   => { planets.set(n, planets.get(n) ?? null);      rels.episode2planets.add(`${name}::${n}`) })
            ep._starships.forEach(n => { starships.set(n, starships.get(n) ?? null);  rels.episode2starships.add(`${name}::${n}`) })
            ep._vehicles.forEach(n  => { vehicles.set(n, vehicles.get(n) ?? null);    rels.episode2vehicles.add(`${name}::${n}`) })
            ep._species.forEach(n   => { speciesMap.set(n, speciesMap.get(n) ?? null); rels.episode2species.add(`${name}::${n}`) })
        }

        const newEntityCount = [people, planets, speciesMap, starships, vehicles]
            .reduce((acc, m) => acc + [...m.values()].filter(v => v === null).length, 0)
        if (newEntityCount > 0) {
            console.log(`Second-pass scrape: ${newEntityCount} entities discovered via episode back-refs...`)
            let epEntityDone = 0
            const pairs = [
                [people, extractPerson, 'People'],
                [planets, extractPlanet, 'Planet'],
                [speciesMap, extractSpecies, 'Species'],
                [starships, extractStarship, 'Starship'],
                [vehicles, extractVehicle, 'Vehicle'],
            ]
            for (const [map, extractor, label] of pairs) {
                for (const [name] of map) {
                    if (map.get(name) !== null) continue
                    try {
                        const wikitext = await fetchWikitext(name, BYPASS_CACHE)
                        if (!wikitext) { stats.skipped++ } else {
                            const record = extractor(name, wikitext)
                            if (record) { map.set(name, record); stats.scraped++ }
                            else stats.skipped++
                        }
                    } catch (err) {
                        stats.failed++
                        failed.push({ title: name, error: String(err) })
                        console.warn(`  [FAIL] ${label} ${name}: ${err.message}`)
                    }
                    epEntityDone++
                    process.stdout.write(`\r  [${epEntityDone}/${newEntityCount}] — ${label}: ${name.slice(0, 50)}`.padEnd(80))
                }
            }
            process.stdout.write('\n')
        }
    }

    // ── Step 5: Build relationships.json ─────────────────────────────────────
    function setToArray(set, leftKey, rightKey) {
        return [...set].map(entry => {
            const [left, right] = entry.split('::')
            return { [leftKey]: left, [rightKey]: right }
        })
    }

    const relationships = {
        film2people:    setToArray(rels.film2people,    'film',    'people'),
        film2planets:   setToArray(rels.film2planets,   'film',    'planet'),
        film2starships: setToArray(rels.film2starships, 'film',    'starship'),
        film2vehicles:  setToArray(rels.film2vehicles,  'film',    'vehicle'),
        film2species:   setToArray(rels.film2species,   'film',    'specie'),
        show2people:    setToArray(rels.show2people,    'show',    'people'),
        show2planets:   setToArray(rels.show2planets,   'show',    'planet'),
        show2starships: setToArray(rels.show2starships, 'show',    'starship'),
        show2vehicles:  setToArray(rels.show2vehicles,  'show',    'vehicle'),
        show2species:   setToArray(rels.show2species,   'show',    'specie'),
        species2people: setToArray(rels.species2people, 'species', 'people'),
        starship2pilot: setToArray(rels.starship2pilot, 'starship','pilot'),
        vehicle2pilot:  setToArray(rels.vehicle2pilot,  'vehicle', 'pilot'),
        planet2people:  setToArray(rels.planet2people,  'planet',  'people'),
        episode2people:    setToArray(rels.episode2people,    'episode', 'people'),
        episode2planets:   setToArray(rels.episode2planets,   'episode', 'planet'),
        episode2starships: setToArray(rels.episode2starships, 'episode', 'starship'),
        episode2vehicles:  setToArray(rels.episode2vehicles,  'episode', 'vehicle'),
        episode2species:   setToArray(rels.episode2species,   'episode', 'specie'),
    }

    // ── Step 6: Write output files ────────────────────────────────────────────
    await fs.mkdir(RAW_DIR, { recursive: true })

    const toArray = map => [...map.values()].filter(Boolean)

    await fs.writeFile(path.join(RAW_DIR, 'films.json'),         JSON.stringify(toArray(films),      null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'shows.json'),         JSON.stringify(toArray(shows),      null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'people.json'),        JSON.stringify(toArray(people),     null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'planets.json'),       JSON.stringify(toArray(planets),    null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'species.json'),       JSON.stringify(toArray(speciesMap), null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'starships.json'),     JSON.stringify(toArray(starships),  null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'vehicles.json'),      JSON.stringify(toArray(vehicles),   null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'episodes.json'),      JSON.stringify(toArray(episodes),   null, 2))
    await fs.writeFile(path.join(RAW_DIR, 'relationships.json'), JSON.stringify(relationships,       null, 2))

    if (failed.length) {
        await fs.writeFile(FAILED_LOG, JSON.stringify(failed, null, 2))
    }

    console.log(`\nDone. Scraped: ${stats.scraped}, Failed: ${stats.failed}, Skipped: ${stats.skipped}`)
    console.log(`Films: ${films.size}, Shows: ${shows.size}, People: ${people.size}, Planets: ${planets.size}`)
    console.log(`Species: ${speciesMap.size}, Starships: ${starships.size}, Vehicles: ${vehicles.size}`)
    if (!FILMS_ONLY) console.log(`Episodes: ${episodes.size}`)
    if (failed.length) console.log(`Failed pages logged to: ${FAILED_LOG}`)
}

if (require.main === module) {
    run().catch(err => {
        console.error(err)
        process.exit(1)
    })
}

module.exports = { extractSeasonLinks }
