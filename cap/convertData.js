global.__base = __dirname + '/'

const cds = require('@sap/cds')
const path = require('path')
const fs = require('fs/promises')
const { v5: uuidv5 } = require('uuid')

const { INSERT, UPSERT, DELETE } = cds.ql
const ROUTES_DIR = path.join(global.__base, '../oldPython/resources/fixtures/')
const MIGRATION_ID_NAMESPACE = 'efef8f84-52d4-4899-a93e-f00f1964e3d8'
const DEFAULT_CHUNK_SIZE = 1000

const DELETE_ORDER = [
    'Planet2People',
    'Film2People',
    'Film2Planets',
    'Film2Starships',
    'Film2Vehicles',
    'Film2Species',
    'Species2People',
    'Starship2Pilot',
    'Vehicle2Pilot',
    'People',
    'Starship',
    'Vehicles',
    'Species',
    'Film',
    'Planet'
]

const UPSERT_ORDER = [
    'Planet',
    'People',
    'Starship',
    'Vehicles',
    'Species',
    'Film',
    'Planet2People',
    'Starship2Pilot',
    'Vehicle2Pilot',
    'Species2People',
    'Film2People',
    'Film2Planets',
    'Film2Starships',
    'Film2Vehicles',
    'Film2Species'
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

function buildIndex(items) {
    return new Map(items.map(item => [item.pk, item]))
}

function resolveReference(index, sourcePk, context, report) {
    if (sourcePk === undefined || sourcePk === null) {
        return null
    }

    const resolved = index.get(sourcePk)
    if (!resolved) {
        report.stats.missingReferences += 1
        report.warnings.push(`[MissingRef] ${context} -> source pk '${sourcePk}' not found`)
        return null
    }

    return resolved
}

async function readFixture(fileName, entityName, report, log) {
    const fullPath = path.join(ROUTES_DIR, fileName)
    log.info(`Reading ${fileName}`)
    const importData = await fs.readFile(fullPath, 'utf8')
    const data = JSON.parse(importData)

    const output = data.map(item => ({
        ...item,
        ID: deterministicId(entityName, item.pk)
    }))

    report.stats.read[entityName] = output.length
    return output
}

function pushRow(rows, dedupeSet, row) {
    if (dedupeSet.has(row.ID)) {
        return
    }

    dedupeSet.add(row.ID)
    rows.push(row)
}

function transformFixtures(fixtures, report) {
    const {
        people,
        planets,
        films,
        species,
        starships,
        vehicles,
        transports
    } = fixtures

    const peopleByPk = buildIndex(people)
    const planetsByPk = buildIndex(planets)
    const filmsByPk = buildIndex(films)
    const speciesByPk = buildIndex(species)
    const starshipsByPk = buildIndex(starships)
    const vehiclesByPk = buildIndex(vehicles)
    const transportsByPk = buildIndex(transports)

    const rows = {
        Planet: [],
        People: [],
        Starship: [],
        Vehicles: [],
        Species: [],
        Film: [],
        Planet2People: [],
        Starship2Pilot: [],
        Vehicle2Pilot: [],
        Species2People: [],
        Film2People: [],
        Film2Planets: [],
        Film2Starships: [],
        Film2Vehicles: [],
        Film2Species: []
    }

    const dedupe = {}
    for (const key of Object.keys(rows)) {
        dedupe[key] = new Set()
    }

    for (const planet of planets) {
        const name = normalizeString(planet.fields.name)
        if (!hasMandatoryValue(name, 'Planet', 'name', planet.pk, report)) {
            continue
        }

        pushRow(rows.Planet, dedupe.Planet, {
            ID: planet.ID,
            name,
            diameter: normalizeString(planet.fields.diameter),
            rotation_period: normalizeString(planet.fields.rotation_period),
            orbital_period: normalizeString(planet.fields.orbital_period),
            gravity: normalizeString(planet.fields.gravity),
            population: normalizeString(planet.fields.population),
            climate: normalizeString(planet.fields.climate),
            terrain: normalizeString(planet.fields.terrain),
            surface_water: normalizeString(planet.fields.surface_water)
        })
    }

    for (const person of people) {
        const homeworld = resolveReference(planetsByPk, person.fields.homeworld, `People.homeworld(${person.pk})`, report)
        const name = normalizeString(person.fields.name)
        if (!hasMandatoryValue(name, 'People', 'name', person.pk, report)) {
            continue
        }

        pushRow(rows.People, dedupe.People, {
            ID: person.ID,
            homeworld_ID: homeworld?.ID ?? null,
            name,
            height: normalizeString(person.fields.height),
            mass: normalizeString(person.fields.mass),
            hair_color: normalizeString(person.fields.hair_color),
            skin_color: normalizeString(person.fields.skin_color),
            eye_color: normalizeString(person.fields.eye_color),
            birth_year: normalizeBirthYear(person.fields.birth_year),
            gender: normalizeString(person.fields.gender)
        })

        if (homeworld) {
            pushRow(rows.Planet2People, dedupe.Planet2People, {
                ID: deterministicLinkId('Planet2People', homeworld.ID, person.ID),
                planet_ID: homeworld.ID,
                people_ID: person.ID
            })
        }
    }

    for (const ship of starships) {
        const transport = resolveReference(transportsByPk, ship.pk, `Starship.transport(${ship.pk})`, report)
        if (!transport) {
            report.stats.skippedRecords += 1
            continue
        }

        const name = normalizeString(transport.fields.name)
        if (!hasMandatoryValue(name, 'Starship', 'name', ship.pk, report)) {
            continue
        }

        pushRow(rows.Starship, dedupe.Starship, {
            ID: ship.ID,
            name,
            model: normalizeString(transport.fields.model),
            starship_class: normalizeString(ship.fields.starship_class),
            manufacturer: normalizeString(transport.fields.manufacturer),
            cost_in_credits: normalizeString(transport.fields.cost_in_credits),
            length: normalizeString(transport.fields.length),
            crew: normalizeString(transport.fields.crew),
            passengers: normalizeString(transport.fields.passengers),
            max_atmosphering_speed: normalizeString(transport.fields.max_atmosphering_speed),
            hyperdrive_rating: normalizeString(ship.fields.hyperdrive_rating),
            MGLT: normalizeString(ship.fields.MGLT),
            cargo_capacity: normalizeString(transport.fields.cargo_capacity),
            consumables: normalizeString(transport.fields.consumables)
        })

        const pilots = Array.isArray(ship.fields.pilots) ? ship.fields.pilots : []
        for (const pilotPk of pilots) {
            const pilot = resolveReference(peopleByPk, pilotPk, `Starship.pilot(${ship.pk})`, report)
            if (!pilot) {
                continue
            }

            pushRow(rows.Starship2Pilot, dedupe.Starship2Pilot, {
                ID: deterministicLinkId('Starship2Pilot', ship.ID, pilot.ID),
                starship_ID: ship.ID,
                pilot_ID: pilot.ID
            })
        }
    }

    for (const vehicle of vehicles) {
        const transport = resolveReference(transportsByPk, vehicle.pk, `Vehicle.transport(${vehicle.pk})`, report)
        if (!transport) {
            report.stats.skippedRecords += 1
            continue
        }

        const name = normalizeString(transport.fields.name)
        if (!hasMandatoryValue(name, 'Vehicles', 'name', vehicle.pk, report)) {
            continue
        }

        pushRow(rows.Vehicles, dedupe.Vehicles, {
            ID: vehicle.ID,
            name,
            model: normalizeString(transport.fields.model),
            vehicle_class: normalizeString(vehicle.fields.vehicle_class),
            manufacturer: normalizeString(transport.fields.manufacturer),
            cost_in_credits: normalizeString(transport.fields.cost_in_credits),
            length: normalizeString(transport.fields.length),
            crew: normalizeString(transport.fields.crew),
            passengers: normalizeString(transport.fields.passengers),
            max_atmosphering_speed: normalizeString(transport.fields.max_atmosphering_speed),
            cargo_capacity: normalizeString(transport.fields.cargo_capacity),
            consumables: normalizeString(transport.fields.consumables)
        })

        const pilots = Array.isArray(vehicle.fields.pilots) ? vehicle.fields.pilots : []
        for (const pilotPk of pilots) {
            const pilot = resolveReference(peopleByPk, pilotPk, `Vehicle.pilot(${vehicle.pk})`, report)
            if (!pilot) {
                continue
            }

            pushRow(rows.Vehicle2Pilot, dedupe.Vehicle2Pilot, {
                ID: deterministicLinkId('Vehicle2Pilot', vehicle.ID, pilot.ID),
                vehicle_ID: vehicle.ID,
                pilot_ID: pilot.ID
            })
        }
    }

    for (const specie of species) {
        const homeworld = resolveReference(planetsByPk, specie.fields.homeworld, `Species.homeworld(${specie.pk})`, report)
        const name = normalizeString(specie.fields.name)
        if (!hasMandatoryValue(name, 'Species', 'name', specie.pk, report)) {
            continue
        }

        pushRow(rows.Species, dedupe.Species, {
            ID: specie.ID,
            name,
            classification: normalizeString(specie.fields.classification),
            designation: normalizeString(specie.fields.designation),
            eye_colors: normalizeString(specie.fields.eye_colors),
            skin_colors: normalizeString(specie.fields.skin_colors),
            language: normalizeString(specie.fields.language),
            hair_colors: normalizeString(specie.fields.hair_colors),
            average_lifespan: normalizeString(specie.fields.average_lifespan),
            average_height: normalizeString(specie.fields.average_height),
            homeworld_ID: homeworld?.ID ?? null
        })

        const speciePeople = Array.isArray(specie.fields.people) ? specie.fields.people : []
        for (const personPk of speciePeople) {
            const person = resolveReference(peopleByPk, personPk, `Species.people(${specie.pk})`, report)
            if (!person) {
                continue
            }

            pushRow(rows.Species2People, dedupe.Species2People, {
                ID: deterministicLinkId('Species2People', specie.ID, person.ID),
                species_ID: specie.ID,
                people_ID: person.ID
            })
        }
    }

    for (const film of films) {
        if (!filmsByPk.has(film.pk)) {
            report.stats.skippedRecords += 1
            continue
        }

        const title = normalizeString(film.fields.title)
        if (!hasMandatoryValue(title, 'Film', 'title', film.pk, report)) {
            continue
        }

        pushRow(rows.Film, dedupe.Film, {
            ID: film.ID,
            producer: normalizeString(film.fields.producer),
            title,
            episode_id: Number.parseInt(film.fields.episode_id, 10) || 0,
            director: normalizeString(film.fields.director),
            release_date: normalizeDate(film.fields.release_date),
            opening_crawl: normalizeString(film.fields.opening_crawl)
        })

        const filmStarships = Array.isArray(film.fields.starships) ? film.fields.starships : []
        for (const starshipPk of filmStarships) {
            const starship = resolveReference(starshipsByPk, starshipPk, `Film.starships(${film.pk})`, report)
            if (!starship) {
                continue
            }

            pushRow(rows.Film2Starships, dedupe.Film2Starships, {
                ID: deterministicLinkId('Film2Starships', film.ID, starship.ID),
                film_ID: film.ID,
                starship_ID: starship.ID
            })
        }

        const filmVehicles = Array.isArray(film.fields.vehicles) ? film.fields.vehicles : []
        for (const vehiclePk of filmVehicles) {
            const vehicle = resolveReference(vehiclesByPk, vehiclePk, `Film.vehicles(${film.pk})`, report)
            if (!vehicle) {
                continue
            }

            pushRow(rows.Film2Vehicles, dedupe.Film2Vehicles, {
                ID: deterministicLinkId('Film2Vehicles', film.ID, vehicle.ID),
                film_ID: film.ID,
                vehicle_ID: vehicle.ID
            })
        }

        const filmPlanets = Array.isArray(film.fields.planets) ? film.fields.planets : []
        for (const planetPk of filmPlanets) {
            const planet = resolveReference(planetsByPk, planetPk, `Film.planets(${film.pk})`, report)
            if (!planet) {
                continue
            }

            pushRow(rows.Film2Planets, dedupe.Film2Planets, {
                ID: deterministicLinkId('Film2Planets', film.ID, planet.ID),
                film_ID: film.ID,
                planet_ID: planet.ID
            })
        }

        const filmPeople = Array.isArray(film.fields.characters) ? film.fields.characters : []
        for (const personPk of filmPeople) {
            const person = resolveReference(peopleByPk, personPk, `Film.characters(${film.pk})`, report)
            if (!person) {
                continue
            }

            pushRow(rows.Film2People, dedupe.Film2People, {
                ID: deterministicLinkId('Film2People', film.ID, person.ID),
                film_ID: film.ID,
                people_ID: person.ID
            })
        }

        const filmSpecies = Array.isArray(film.fields.species) ? film.fields.species : []
        for (const speciePk of filmSpecies) {
            const specie = resolveReference(speciesByPk, speciePk, `Film.species(${film.pk})`, report)
            if (!specie) {
                continue
            }

            pushRow(rows.Film2Species, dedupe.Film2Species, {
                ID: deterministicLinkId('Film2Species', film.ID, specie.ID),
                film_ID: film.ID,
                specie_ID: specie.ID
            })
        }
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

        const [people, planets, films, species, starships, vehicles, transports] = await Promise.all([
            readFixture('people.json', 'People', report, log),
            readFixture('planets.json', 'Planet', report, log),
            readFixture('films.json', 'Film', report, log),
            readFixture('species.json', 'Species', report, log),
            readFixture('starships.json', 'Starship', report, log),
            readFixture('vehicles.json', 'Vehicles', report, log),
            readFixture('transport.json', 'Transport', report, log)
        ])

        const transformedRows = transformFixtures({
            people,
            planets,
            films,
            species,
            starships,
            vehicles,
            transports
        }, report)

        for (const entityName of UPSERT_ORDER) {
            await persistInChunks(tx, entityName, transformedRows[entityName], mode, chunkSize, report, log)
        }
    })

    await writeReport(report, reportPath, log)
}

if (require.main === module) {
    runMigration().catch(error => {
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
        transformFixtures
    }
}
