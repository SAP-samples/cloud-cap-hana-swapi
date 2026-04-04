global.__base = __dirname + '/'

const cds = require('@sap/cds')
const path = require('path')
const fs = require('fs/promises')
const { v5: uuidv5 } = require('uuid')

const { INSERT, UPSERT, DELETE } = cds.ql
const ROUTES_DIR = path.join(global.__base, '../scripts/data/raw/')
const MIGRATION_ID_NAMESPACE = 'efef8f84-52d4-4899-a93e-f00f1964e3d8'
const DEFAULT_CHUNK_SIZE = 1000

const DELETE_ORDER = [
    'Planet2People',
    'Film2People', 'Film2Planets', 'Film2Starships', 'Film2Vehicles', 'Film2Species',
    'Show2People',
    'Episode2People', 'Episode2Planets', 'Episode2Starships', 'Episode2Vehicles', 'Episode2Species',
    'Episode',   // explicit before Show (composition cascade is implicit, but explicit is safer)
    'Show',
    'Species2People', 'Starship2Pilot', 'Vehicle2Pilot',
    'People', 'Starship', 'Vehicles', 'Species', 'Film', 'Planet'
]

const UPSERT_ORDER = [
    'Planet', 'People', 'Starship', 'Vehicles', 'Species', 'Film', 'Show', 'Episode',
    'Planet2People', 'Starship2Pilot', 'Vehicle2Pilot', 'Species2People',
    'Film2People', 'Film2Planets', 'Film2Starships', 'Film2Vehicles', 'Film2Species',
    'Show2People',
    'Episode2People', 'Episode2Planets', 'Episode2Starships', 'Episode2Vehicles', 'Episode2Species'
]

function normalizeString(value) {
    if (value === undefined || value === null) {
        return null
    }

    const normalized = String(value).trim()
    if (!normalized) {
        return null
    }

    const lower = normalized.toLowerCase()
    if (lower === 'unknown' || lower === 'n/a' || lower === 'none' || lower === 'null') {
        return null
    }

    return normalized
}

function normalizeDate(value) {
    const normalized = normalizeString(value)
    if (!normalized) {
        return null
    }

    const parsed = new Date(normalized)
    if (Number.isNaN(parsed.getTime())) {
        return null
    }

    return parsed.toISOString().slice(0, 10)
}

function normalizeBirthYear(value) {
    const normalized = normalizeString(value)
    if (!normalized) {
        return null
    }

    const canonical = normalized.replaceAll(' ', '').toUpperCase()
    if (!/^[0-9]+(?:BBY|ABY)$/.test(canonical)) {
        return null
    }

    return canonical
}

function hasMandatoryValue(value, entityName, fieldName, sourcePk, report) {
    if (value !== null && value !== undefined) {
        return true
    }

    report.stats.skippedRecords += 1
    report.warnings.push(`[MissingMandatory] ${entityName}.${fieldName}(${sourcePk}) is required`)
    return false
}

function deterministicId(kind, sourceKey) {
    return uuidv5(`${kind}:${sourceKey}`, MIGRATION_ID_NAMESPACE)
}

function deterministicLinkId(kind, leftId, rightId) {
    return uuidv5(`${kind}:${leftId}->${rightId}`, MIGRATION_ID_NAMESPACE)
}

function parseArgs(argv = process.argv.slice(2)) {
    const parsed = {}

    for (const arg of argv) {
        if (!arg.startsWith('--')) {
            continue
        }

        const [rawKey, rawValue] = arg.slice(2).split('=')
        parsed[rawKey] = rawValue ?? 'true'
    }

    return parsed
}

function parseChunkSize(value) {
    const parsed = Number.parseInt(value, 10)
    if (!Number.isInteger(parsed) || parsed <= 0) {
        return DEFAULT_CHUNK_SIZE
    }

    return parsed
}

function createReport({ mode, chunkSize }) {
    return {
        mode,
        chunkSize,
        startedAt: new Date().toISOString(),
        durationMs: 0,
        stats: {
            read: {},
            persisted: {},
            skippedRecords: 0,
            missingReferences: 0
        },
        warnings: []
    }
}

function buildNameIndex(items, nameField = 'name') {
    return new Map(items.map(item => [item[nameField], item]))
}

function buildTitleIndex(items) {
    return buildNameIndex(items, 'title')
}

async function readRawJSON(fileName, entityName, report, log) {
    const fullPath = path.join(ROUTES_DIR, fileName)
    log.info(`Reading ${fileName}`)
    const raw = await fs.readFile(fullPath, 'utf8')
    const data = JSON.parse(raw)
    report.stats.read[entityName] = data.length
    return data
}

function pushRow(rows, dedupeSet, row) {
    if (dedupeSet.has(row.ID)) {
        return
    }

    dedupeSet.add(row.ID)
    rows.push(row)
}

function transformEntities(rawData, report) {
    const { planets, people, films, shows, species, starships, vehicles, episodes, relationships } = rawData

    // Build name/title indexes for reference resolution
    const planetsByName   = buildNameIndex(planets)
    const peopleByName    = buildNameIndex(people)
    const filmsByTitle    = buildTitleIndex(films)
    const showsByTitle    = buildTitleIndex(shows)
    const speciesByName   = buildNameIndex(species)
    const starshipsByName = buildNameIndex(starships)
    const vehiclesByName  = buildNameIndex(vehicles)

    // Build ID indexes (used for link rows)
    const planetIdByName   = new Map(planets.map(p  => [p.name, deterministicId('Planet', p.name)]))
    const peopleIdByName   = new Map(people.map(p   => [p.name, deterministicId('People', p.name)]))
    const filmIdByTitle    = new Map(films.map(f    => [f.title, deterministicId('Film', f.title)]))
    const showIdByTitle    = new Map(shows.map(s    => [s.title, deterministicId('Show', s.title)]))
    const speciesIdByName  = new Map(species.map(s  => [s.name, deterministicId('Species', s.name)]))
    const starshipIdByName = new Map(starships.map(s => [s.name, deterministicId('Starship', s.name)]))
    const vehicleIdByName  = new Map(vehicles.map(v => [v.name, deterministicId('Vehicles', v.name)]))
    const episodeIdByTitle = new Map(episodes.map(e => [e.title, deterministicId('Episode', e.title)]))

    const rows = {
        Planet: [], People: [], Starship: [], Vehicles: [], Species: [], Film: [], Show: [], Episode: [],
        Planet2People: [], Starship2Pilot: [], Vehicle2Pilot: [], Species2People: [],
        Film2People: [], Film2Planets: [], Film2Starships: [], Film2Vehicles: [], Film2Species: [],
        Show2People: [],
        Episode2People: [], Episode2Planets: [], Episode2Starships: [], Episode2Vehicles: [], Episode2Species: []
    }

    const dedupe = {}
    for (const key of Object.keys(rows)) dedupe[key] = new Set()

    // ── Planets ──
    for (const planet of planets) {
        const name = normalizeString(planet.name)
        if (!hasMandatoryValue(name, 'Planet', 'name', planet.name, report)) continue
        const ID = deterministicId('Planet', name)
        pushRow(rows.Planet, dedupe.Planet, {
            ID, name,
            diameter:        normalizeString(planet.diameter),
            rotation_period: normalizeString(planet.rotation_period),
            orbital_period:  normalizeString(planet.orbital_period),
            gravity:         normalizeString(planet.gravity),
            population:      normalizeString(planet.population),
            climate:         normalizeString(planet.climate),
            terrain:         normalizeString(planet.terrain),
            surface_water:   normalizeString(planet.surface_water)
        })
    }

    // ── People ──
    for (const person of people) {
        const name = normalizeString(person.name)
        if (!hasMandatoryValue(name, 'People', 'name', person.name, report)) continue
        const ID = deterministicId('People', name)
        const homeworldID = person._homeworld ? planetIdByName.get(person._homeworld) ?? null : null
        pushRow(rows.People, dedupe.People, {
            ID,
            name,
            homeworld_ID:  homeworldID,
            height:        normalizeString(person.height),
            mass:          normalizeString(person.mass),
            hair_color:    normalizeString(person.hair_color),
            skin_color:    normalizeString(person.skin_color),
            eye_color:     normalizeString(person.eye_color),
            birth_year:    normalizeBirthYear(person.birth_year),
            gender:        normalizeString(person.gender)
        })
    }

    // ── Starships ──
    for (const ship of starships) {
        const name = normalizeString(ship.name)
        if (!hasMandatoryValue(name, 'Starship', 'name', ship.name, report)) continue
        const ID = deterministicId('Starship', name)
        pushRow(rows.Starship, dedupe.Starship, {
            ID, name,
            model:                  normalizeString(ship.model),
            starship_class:         normalizeString(ship.starship_class),
            manufacturer:           normalizeString(ship.manufacturer),
            cost_in_credits:        normalizeString(ship.cost_in_credits),
            length:                 normalizeString(ship.length),
            crew:                   normalizeString(ship.crew),
            passengers:             normalizeString(ship.passengers),
            max_atmosphering_speed: normalizeString(ship.max_atmosphering_speed),
            hyperdrive_rating:      normalizeString(ship.hyperdrive_rating),
            MGLT:                   normalizeString(ship.MGLT),
            cargo_capacity:         normalizeString(ship.cargo_capacity),
            consumables:            normalizeString(ship.consumables)
        })
    }

    // ── Vehicles ──
    for (const vehicle of vehicles) {
        const name = normalizeString(vehicle.name)
        if (!hasMandatoryValue(name, 'Vehicles', 'name', vehicle.name, report)) continue
        const ID = deterministicId('Vehicles', name)
        pushRow(rows.Vehicles, dedupe.Vehicles, {
            ID, name,
            model:                  normalizeString(vehicle.model),
            vehicle_class:          normalizeString(vehicle.vehicle_class),
            manufacturer:           normalizeString(vehicle.manufacturer),
            cost_in_credits:        normalizeString(vehicle.cost_in_credits),
            length:                 normalizeString(vehicle.length),
            crew:                   normalizeString(vehicle.crew),
            passengers:             normalizeString(vehicle.passengers),
            max_atmosphering_speed: normalizeString(vehicle.max_atmosphering_speed),
            cargo_capacity:         normalizeString(vehicle.cargo_capacity),
            consumables:            normalizeString(vehicle.consumables)
        })
    }

    // ── Species ──
    for (const specie of species) {
        const name = normalizeString(specie.name)
        if (!hasMandatoryValue(name, 'Species', 'name', specie.name, report)) continue
        const ID = deterministicId('Species', name)
        const homeworldID = specie._homeworld ? planetIdByName.get(specie._homeworld) ?? null : null
        pushRow(rows.Species, dedupe.Species, {
            ID, name,
            classification:   normalizeString(specie.classification),
            designation:      normalizeString(specie.designation),
            eye_colors:       normalizeString(specie.eye_colors),
            skin_colors:      normalizeString(specie.skin_colors),
            language:         normalizeString(specie.language),
            hair_colors:      normalizeString(specie.hair_colors),
            average_lifespan: normalizeString(specie.average_lifespan),
            average_height:   normalizeString(specie.average_height),
            homeworld_ID:     homeworldID
        })
    }

    // ── Films ──
    for (const film of films) {
        const title = normalizeString(film.title)
        if (!hasMandatoryValue(title, 'Film', 'title', film.title, report)) continue
        const ID = deterministicId('Film', title)
        pushRow(rows.Film, dedupe.Film, {
            ID, title,
            producer:      normalizeString(film.producer),
            episode_id:    Number.parseInt(film.episode_id, 10) || 0,
            director:      normalizeString(film.director),
            release_date:  normalizeDate(film.release_date),
            opening_crawl: normalizeString(film.opening_crawl)
        })
    }

    // ── Shows ──
    for (const show of shows) {
        const title = normalizeString(show.title)
        if (!hasMandatoryValue(title, 'Show', 'title', show.title, report)) continue
        const ID = deterministicId('Show', title)
        pushRow(rows.Show, dedupe.Show, {
            ID, title,
            show_type:     normalizeString(show.show_type),
            seasons:       show.seasons ?? null,
            episode_count: show.episode_count ?? null,
            network:       normalizeString(show.network),
            director:      normalizeString(show.director),
            producer:      normalizeString(show.producer),
            release_date:  normalizeDate(show.release_date)
        })
    }

    // ── Episodes ──
    for (const ep of episodes) {
        const title = normalizeString(ep.title)
        if (!hasMandatoryValue(title, 'Episode', 'title', ep.title, report)) continue
        const showID = showIdByTitle.get(ep._show) ?? null
        const ID = deterministicId('Episode', title)
        pushRow(rows.Episode, dedupe.Episode, {
            ID, title,
            show_ID:        showID,
            season_number:  ep.season_number ?? null,
            episode_number: ep.episode_number ?? null,
            air_date:       normalizeDate(ep.air_date),
            director:       normalizeString(ep.director),
            writer:         normalizeString(ep.writer),
            runtime:        ep.runtime ?? null,
            timeline:       normalizeString(ep.timeline)
        })
    }

    // ── Junction tables from relationships ──

    // planet2people
    for (const rel of (relationships.planet2people ?? [])) {
        const planetID = planetIdByName.get(rel.planet)
        const personID = peopleIdByName.get(rel.people)
        if (!planetID || !personID) { report.stats.missingReferences++; continue }
        pushRow(rows.Planet2People, dedupe.Planet2People, {
            ID: deterministicLinkId('Planet2People', planetID, personID),
            planet_ID: planetID, people_ID: personID
        })
    }

    // starship2pilot
    for (const rel of (relationships.starship2pilot ?? [])) {
        const starshipID = starshipIdByName.get(rel.starship)
        const pilotID    = peopleIdByName.get(rel.pilot)
        if (!starshipID || !pilotID) { report.stats.missingReferences++; continue }
        pushRow(rows.Starship2Pilot, dedupe.Starship2Pilot, {
            ID: deterministicLinkId('Starship2Pilot', starshipID, pilotID),
            starship_ID: starshipID, pilot_ID: pilotID
        })
    }

    // vehicle2pilot
    for (const rel of (relationships.vehicle2pilot ?? [])) {
        const vehicleID = vehicleIdByName.get(rel.vehicle)
        const pilotID   = peopleIdByName.get(rel.pilot)
        if (!vehicleID || !pilotID) { report.stats.missingReferences++; continue }
        pushRow(rows.Vehicle2Pilot, dedupe.Vehicle2Pilot, {
            ID: deterministicLinkId('Vehicle2Pilot', vehicleID, pilotID),
            vehicle_ID: vehicleID, pilot_ID: pilotID
        })
    }

    // species2people
    for (const rel of (relationships.species2people ?? [])) {
        const speciesID = speciesIdByName.get(rel.species)
        const personID  = peopleIdByName.get(rel.people)
        if (!speciesID || !personID) { report.stats.missingReferences++; continue }
        pushRow(rows.Species2People, dedupe.Species2People, {
            ID: deterministicLinkId('Species2People', speciesID, personID),
            species_ID: speciesID, people_ID: personID
        })
    }

    // film2people
    for (const rel of (relationships.film2people ?? [])) {
        const filmID   = filmIdByTitle.get(rel.film)
        const personID = peopleIdByName.get(rel.people)
        if (!filmID || !personID) { report.stats.missingReferences++; continue }
        pushRow(rows.Film2People, dedupe.Film2People, {
            ID: deterministicLinkId('Film2People', filmID, personID),
            film_ID: filmID, people_ID: personID
        })
    }

    // film2planets
    for (const rel of (relationships.film2planets ?? [])) {
        const filmID   = filmIdByTitle.get(rel.film)
        const planetID = planetIdByName.get(rel.planet)
        if (!filmID || !planetID) { report.stats.missingReferences++; continue }
        pushRow(rows.Film2Planets, dedupe.Film2Planets, {
            ID: deterministicLinkId('Film2Planets', filmID, planetID),
            film_ID: filmID, planet_ID: planetID
        })
    }

    // film2starships
    for (const rel of (relationships.film2starships ?? [])) {
        const filmID     = filmIdByTitle.get(rel.film)
        const starshipID = starshipIdByName.get(rel.starship)
        if (!filmID || !starshipID) { report.stats.missingReferences++; continue }
        pushRow(rows.Film2Starships, dedupe.Film2Starships, {
            ID: deterministicLinkId('Film2Starships', filmID, starshipID),
            film_ID: filmID, starship_ID: starshipID
        })
    }

    // film2vehicles
    for (const rel of (relationships.film2vehicles ?? [])) {
        const filmID    = filmIdByTitle.get(rel.film)
        const vehicleID = vehicleIdByName.get(rel.vehicle)
        if (!filmID || !vehicleID) { report.stats.missingReferences++; continue }
        pushRow(rows.Film2Vehicles, dedupe.Film2Vehicles, {
            ID: deterministicLinkId('Film2Vehicles', filmID, vehicleID),
            film_ID: filmID, vehicle_ID: vehicleID
        })
    }

    // film2species
    for (const rel of (relationships.film2species ?? [])) {
        const filmID   = filmIdByTitle.get(rel.film)
        const specieID = speciesIdByName.get(rel.specie)
        if (!filmID || !specieID) { report.stats.missingReferences++; continue }
        pushRow(rows.Film2Species, dedupe.Film2Species, {
            ID: deterministicLinkId('Film2Species', filmID, specieID),
            film_ID: filmID, specie_ID: specieID
        })
    }

    // show2people
    for (const rel of (relationships.show2people ?? [])) {
        const showID   = showIdByTitle.get(rel.show)
        const personID = peopleIdByName.get(rel.people)
        if (!showID || !personID) { report.stats.missingReferences++; continue }
        pushRow(rows.Show2People, dedupe.Show2People, {
            ID: deterministicLinkId('Show2People', showID, personID),
            show_ID: showID, people_ID: personID
        })
    }

    // episode2people
    for (const rel of (relationships.episode2people ?? [])) {
        const episodeID = episodeIdByTitle.get(rel.episode)
        const personID  = peopleIdByName.get(rel.people)
        if (!episodeID || !personID) { report.stats.missingReferences++; continue }
        pushRow(rows.Episode2People, dedupe.Episode2People, {
            ID: deterministicLinkId('Episode2People', episodeID, personID),
            episode_ID: episodeID, people_ID: personID
        })
    }

    // episode2planets
    for (const rel of (relationships.episode2planets ?? [])) {
        const episodeID = episodeIdByTitle.get(rel.episode)
        const planetID  = planetIdByName.get(rel.planet)
        if (!episodeID || !planetID) { report.stats.missingReferences++; continue }
        pushRow(rows.Episode2Planets, dedupe.Episode2Planets, {
            ID: deterministicLinkId('Episode2Planets', episodeID, planetID),
            episode_ID: episodeID, planet_ID: planetID
        })
    }

    // episode2starships
    for (const rel of (relationships.episode2starships ?? [])) {
        const episodeID  = episodeIdByTitle.get(rel.episode)
        const starshipID = starshipIdByName.get(rel.starship)
        if (!episodeID || !starshipID) { report.stats.missingReferences++; continue }
        pushRow(rows.Episode2Starships, dedupe.Episode2Starships, {
            ID: deterministicLinkId('Episode2Starships', episodeID, starshipID),
            episode_ID: episodeID, starship_ID: starshipID
        })
    }

    // episode2vehicles
    for (const rel of (relationships.episode2vehicles ?? [])) {
        const episodeID = episodeIdByTitle.get(rel.episode)
        const vehicleID = vehicleIdByName.get(rel.vehicle)
        if (!episodeID || !vehicleID) { report.stats.missingReferences++; continue }
        pushRow(rows.Episode2Vehicles, dedupe.Episode2Vehicles, {
            ID: deterministicLinkId('Episode2Vehicles', episodeID, vehicleID),
            episode_ID: episodeID, vehicle_ID: vehicleID
        })
    }

    // episode2species — uses specie_ID (singular) matching Film2Species convention
    for (const rel of (relationships.episode2species ?? [])) {
        const episodeID = episodeIdByTitle.get(rel.episode)
        const specieID  = speciesIdByName.get(rel.specie)
        if (!episodeID || !specieID) { report.stats.missingReferences++; continue }
        pushRow(rows.Episode2Species, dedupe.Episode2Species, {
            ID: deterministicLinkId('Episode2Species', episodeID, specieID),
            episode_ID: episodeID, specie_ID: specieID
        })
    }

    return rows
}

async function clearDB(tx, log) {
    log.info('Clearing existing DB tables')
    for (const entityName of DELETE_ORDER) {
        await tx.run(DELETE.from(tx.entities[entityName]))
    }
    log.info('DB tables cleared')
}

async function persistInChunks(tx, entityName, rows, mode, chunkSize, report, log) {
    if (!rows.length) {
        report.stats.persisted[entityName] = 0
        return
    }

    let persisted = 0
    for (let index = 0; index < rows.length; index += chunkSize) {
        const chunk = rows.slice(index, index + chunkSize)
        if (mode === 'delta') {
            await tx.run(UPSERT.into(tx.entities[entityName]).entries(chunk))
        } else {
            await tx.run(INSERT.into(tx.entities[entityName]).entries(chunk))
        }
        persisted += chunk.length
    }

    report.stats.persisted[entityName] = persisted
    log.info(`${mode === 'delta' ? 'Upserted' : 'Inserted'} ${persisted} row(s) into ${entityName}`)
}

async function writeReport(report, reportPath, log) {
    report.endedAt = new Date().toISOString()
    report.durationMs = new Date(report.endedAt).getTime() - new Date(report.startedAt).getTime()

    const summary = {
        mode: report.mode,
        durationMs: report.durationMs,
        read: report.stats.read,
        persisted: report.stats.persisted,
        skippedRecords: report.stats.skippedRecords,
        missingReferences: report.stats.missingReferences,
        warnings: report.warnings.length
    }

    log.info('Migration summary')
    log.info(summary)

    if (!reportPath) {
        return
    }

    const fullReportPath = path.resolve(global.__base, reportPath)
    await fs.writeFile(fullReportPath, JSON.stringify(report, null, 2), 'utf8')
    log.info(`Wrote migration report to ${fullReportPath}`)
}

async function runMigration(options = {}) {
    const args = parseArgs()
    const mode = (options.mode || args.mode || process.env.MIGRATION_MODE || 'full').toLowerCase()
    const chunkSize = parseChunkSize(options.chunkSize || args['chunk-size'] || process.env.MIGRATION_CHUNK_SIZE)
    const reportPath = options.reportPath || args.report || process.env.MIGRATION_REPORT_PATH
    const log = cds.log(options.loggerName || 'migration')

    if (mode !== 'full' && mode !== 'delta') {
        throw new Error(`Unsupported mode '${mode}'. Supported modes: full, delta`)
    }

    const report = createReport({ mode, chunkSize })

    const modelPath = path.join(global.__base, '/gen/srv/srv/csn.json')
    log.info(`Model location: ${modelPath}`)

    const db = await cds.connect.to('db', { model: modelPath })

    await db.tx(async tx => {
        if (mode === 'full') {
            await clearDB(tx, log)
        } else {
            log.info('Running in delta mode: existing rows are preserved and matching keys are upserted')
        }

        const [planets, people, films, shows, species, starships, vehicles, episodes, relationships] = await Promise.all([
            readRawJSON('planets.json', 'Planet', report, log),
            readRawJSON('people.json', 'People', report, log),
            readRawJSON('films.json', 'Film', report, log),
            readRawJSON('shows.json', 'Show', report, log),
            readRawJSON('species.json', 'Species', report, log),
            readRawJSON('starships.json', 'Starship', report, log),
            readRawJSON('vehicles.json', 'Vehicles', report, log),
            readRawJSON('episodes.json', 'Episode', report, log),
            readRawJSON('relationships.json', 'Relationships', report, log)
        ])

        const transformedRows = transformEntities({
            planets, people, films, shows, species, starships, vehicles, episodes, relationships
        }, report)

        for (const entityName of UPSERT_ORDER) {
            await persistInChunks(tx, entityName, transformedRows[entityName], mode, chunkSize, report, log)
        }
    })

    await writeReport(report, reportPath, log)
}

if (require.main === module) {
    runMigration().then(() => {
        process.exit(0)
    }).catch(error => {
        const log = cds.log('migration')
        log.error('Migration failed')
        log.error(error)
        process.exit(1)
    })
}

module.exports = {
    runMigration,
    __internals: {
        normalizeString,
        normalizeDate,
        normalizeBirthYear,
        hasMandatoryValue,
        deterministicId,
        deterministicLinkId,
        parseArgs,
        parseChunkSize,
        createReport,
        persistInChunks,
        writeReport,
        transformEntities,
        readRawJSON
    }
}
