'use strict'

const fs = require('fs/promises')
const path = require('path')

const { fetchWikitext, fetchCategoryMembers } = require('./mediawiki')
const { PRODUCTION_CATEGORIES } = require('./categories')
const { extractFilm } = require('./extractors/films')
const { extractShow } = require('./extractors/shows')
const { extractPerson } = require('./extractors/people')
const { extractPlanet } = require('./extractors/planets')
const { extractSpecies } = require('./extractors/species')
const { extractStarship } = require('./extractors/starships')
const { extractVehicle } = require('./extractors/vehicles')

const RAW_DIR = path.join(__dirname, '../data/raw')
const FAILED_LOG = path.join(__dirname, '../data/cache/failed.json')

async function run() {
    const CACHE_ONLY = process.env.CACHE_ONLY === 'true'

    const stats = { scraped: 0, failed: 0, skipped: 0 }
    const failed = []

    // Collections
    const films = new Map()      // title → film record
    const shows = new Map()      // title → show record
    const people = new Map()     // name  → person record
    const planets = new Map()
    const speciesMap = new Map()
    const starships = new Map()
    const vehicles = new Map()

    // Relationship sets (using 'title::name' keys for deduplication)
    const rels = {
        film2people:    new Set(), film2planets:   new Set(),
        film2starships: new Set(), film2vehicles:  new Set(), film2species: new Set(),
        show2people:    new Set(), show2planets:   new Set(),
        show2starships: new Set(), show2vehicles:  new Set(), show2species: new Set(),
        species2people: new Set(), starship2pilot: new Set(),
        vehicle2pilot:  new Set(), planet2people:  new Set(),
    }

    // ── Step 1: Fetch production page titles from categories ──────────────────
    console.log('Fetching production categories...')
    const productionQueue = [] // { title, type }

    for (const { category, type } of PRODUCTION_CATEGORIES) {
        if (CACHE_ONLY) {
            console.log(`  [cache-only] Skipping category fetch: ${category}`)
            continue
        }
        console.log(`  Fetching category: ${category}`)
        const titles = await fetchCategoryMembers(category)
        titles.forEach(t => productionQueue.push({ title: t, type }))
    }

    // ── Step 2: Process each production page ─────────────────────────────────
    console.log(`Processing ${productionQueue.length} production pages...`)

    for (const { title, type } of productionQueue) {
        try {
            const wikitext = await fetchWikitext(title)
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
            }
            stats.scraped++
        } catch (err) {
            stats.failed++
            failed.push({ title, error: String(err) })
            console.warn(`  [FAIL] ${title}: ${err.message}`)
        }
    }

    // ── Step 3: Process each unique entity page ───────────────────────────────
    console.log(`Scraping ${people.size} people, ${planets.size} planets, ${speciesMap.size} species, ${starships.size} starships, ${vehicles.size} vehicles...`)

    async function scrapeEntities(map, extractor, label) {
        for (const [name] of map) {
            if (map.get(name) !== null) continue  // already scraped
            try {
                const wikitext = await fetchWikitext(name)
                if (!wikitext) { stats.skipped++; continue }
                const record = extractor(name, wikitext)
                if (record) {
                    map.set(name, record)
                    stats.scraped++
                } else {
                    stats.skipped++
                }
            } catch (err) {
                stats.failed++
                failed.push({ title: name, error: String(err) })
                console.warn(`  [FAIL] ${label} ${name}: ${err.message}`)
            }
        }
    }

    await scrapeEntities(people, extractPerson, 'People')
    await scrapeEntities(planets, extractPlanet, 'Planet')
    await scrapeEntities(speciesMap, extractSpecies, 'Species')
    await scrapeEntities(starships, extractStarship, 'Starship')
    await scrapeEntities(vehicles, extractVehicle, 'Vehicle')

    // ── Step 4: Build planet2people and species2people from entity back-refs ──
    for (const [name, person] of people) {
        if (!person) continue
        if (person._homeworld) rels.planet2people.add(`${person._homeworld}::${name}`)
        if (person._species)   rels.species2people.add(`${person._species}::${name}`)
    }
    // pilot links come from starship/vehicle extractors
    for (const [name, ship] of starships) {
        if (!ship) continue
        ship._pilots.forEach(p => rels.starship2pilot.add(`${name}::${p}`))
    }
    for (const [name, veh] of vehicles) {
        if (!veh) continue
        veh._pilots.forEach(p => rels.vehicle2pilot.add(`${name}::${p}`))
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
    await fs.writeFile(path.join(RAW_DIR, 'relationships.json'), JSON.stringify(relationships,       null, 2))

    if (failed.length) {
        await fs.writeFile(FAILED_LOG, JSON.stringify(failed, null, 2))
    }

    console.log(`\nDone. Scraped: ${stats.scraped}, Failed: ${stats.failed}, Skipped: ${stats.skipped}`)
    console.log(`Films: ${films.size}, Shows: ${shows.size}, People: ${people.size}, Planets: ${planets.size}`)
    console.log(`Species: ${speciesMap.size}, Starships: ${starships.size}, Vehicles: ${vehicles.size}`)
    if (failed.length) console.log(`Failed pages logged to: ${FAILED_LOG}`)
}

run().catch(err => {
    console.error(err)
    process.exit(1)
})
