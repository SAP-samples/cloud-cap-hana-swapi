const test = require('node:test')
const assert = require('node:assert/strict')

const { __internals } = require('../convertData')

const {
    normalizeString,
    normalizeDate,
    deterministicId,
    deterministicLinkId,
    parseChunkSize,
    transformFixtures
} = __internals

function createFixtures() {
    const planets = [
        {
            pk: 1,
            ID: deterministicId('Planet', 1),
            fields: {
                name: 'Tatooine',
                diameter: '10465',
                rotation_period: '23',
                orbital_period: '304',
                gravity: '1 standard',
                population: '200000',
                climate: 'arid',
                terrain: 'desert',
                surface_water: '1'
            }
        }
    ]

    const people = [
        {
            pk: 10,
            ID: deterministicId('People', 10),
            fields: {
                homeworld: 1,
                name: 'Luke Skywalker',
                height: '172',
                mass: '77',
                hair_color: 'blond',
                skin_color: 'fair',
                eye_color: 'blue',
                birth_year: '19BBY',
                gender: 'male'
            }
        },
        {
            pk: 11,
            ID: deterministicId('People', 11),
            fields: {
                homeworld: 999,
                name: 'Mystery Person',
                height: 'unknown',
                mass: 'n/a',
                hair_color: '',
                skin_color: null,
                eye_color: 'green',
                birth_year: 'unknown',
                gender: 'none'
            }
        }
    ]

    const transportBase = {
        fields: {
            name: 'X-wing',
            model: 'T-65 X-wing',
            manufacturer: 'Incom',
            cost_in_credits: '149999',
            length: '12.5',
            crew: '1',
            passengers: '0',
            max_atmosphering_speed: '1050',
            cargo_capacity: '110',
            consumables: '1 week'
        }
    }

    const starships = [
        {
            pk: 20,
            ID: deterministicId('Starship', 20),
            fields: {
                starship_class: 'Starfighter',
                hyperdrive_rating: '1.0',
                MGLT: '100',
                pilots: [10, 999]
            }
        }
    ]

    const vehicles = [
        {
            pk: 30,
            ID: deterministicId('Vehicles', 30),
            fields: {
                vehicle_class: 'Snowspeeder',
                pilots: [10]
            }
        }
    ]

    const transports = [
        {
            pk: 20,
            ...transportBase
        },
        {
            pk: 30,
            fields: {
                ...transportBase.fields,
                name: 'T-47 Airspeeder',
                model: 't-47 airspeeder'
            }
        }
    ]

    const species = [
        {
            pk: 40,
            ID: deterministicId('Species', 40),
            fields: {
                name: 'Human',
                classification: 'mammal',
                designation: 'sentient',
                eye_colors: 'brown, blue, green',
                skin_colors: 'light, dark',
                language: 'Galactic Basic',
                hair_colors: 'blond, brown, black',
                average_lifespan: '120',
                average_height: '180',
                homeworld: 1,
                people: [10, 999]
            }
        }
    ]

    const films = [
        {
            pk: 50,
            ID: deterministicId('Film', 50),
            fields: {
                producer: 'Gary Kurtz, Rick McCallum',
                title: 'A New Hope',
                episode_id: '4',
                director: 'George Lucas',
                release_date: '1977-05-25',
                opening_crawl: 'It is a period of civil war...',
                starships: [20],
                vehicles: [30],
                planets: [1],
                characters: [10, 999],
                species: [40]
            }
        }
    ]

    return {
        people,
        planets,
        films,
        species,
        starships,
        vehicles,
        transports
    }
}

test('deterministic ids remain stable and link ids are order-sensitive', () => {
    const left = deterministicId('People', 10)
    const leftAgain = deterministicId('People', 10)
    const right = deterministicId('People', 11)

    assert.equal(left, leftAgain)
    assert.notEqual(left, right)

    const linkA = deterministicLinkId('Film2People', 'film1', 'person1')
    const linkB = deterministicLinkId('Film2People', 'film1', 'person2')
    const linkC = deterministicLinkId('Film2People', 'person1', 'film1')

    assert.notEqual(linkA, linkB)
    assert.notEqual(linkA, linkC)
})

test('normalization handles unknown/empty values and parses dates safely', () => {
    assert.equal(normalizeString('  value  '), 'value')
    assert.equal(normalizeString('unknown'), null)
    assert.equal(normalizeString('N/A'), null)
    assert.equal(normalizeString(''), null)
    assert.equal(normalizeString(undefined), null)

    assert.equal(normalizeDate('1977-05-25'), '1977-05-25')
    assert.equal(normalizeDate('invalid-date'), null)
    assert.equal(normalizeDate('unknown'), null)
})

test('chunk-size parser falls back on invalid input', () => {
    assert.equal(parseChunkSize('250'), 250)
    assert.equal(parseChunkSize('-1'), 1000)
    assert.equal(parseChunkSize('abc'), 1000)
    assert.equal(parseChunkSize(undefined), 1000)
})

test('transformFixtures creates expected rows and records missing references', () => {
    const report = {
        stats: {
            read: {},
            persisted: {},
            skippedRecords: 0,
            missingReferences: 0
        },
        warnings: []
    }

    const rows = transformFixtures(createFixtures(), report)

    assert.equal(rows.Planet.length, 1)
    assert.equal(rows.People.length, 2)
    assert.equal(rows.Planet2People.length, 1, 'only one person has resolvable homeworld')
    assert.equal(rows.Starship2Pilot.length, 1, 'one starship pilot link should be skipped due to missing person')
    assert.equal(rows.Species2People.length, 1, 'one species person link should be skipped due to missing person')
    assert.equal(rows.Film2People.length, 1, 'one film character link should be skipped due to missing person')

    const mysteryPerson = rows.People.find(row => row.name === 'Mystery Person')
    assert.equal(mysteryPerson.homeworld_ID, null)
    assert.equal(mysteryPerson.height, null)
    assert.equal(mysteryPerson.mass, null)

    assert.equal(rows.Film[0].episode_id, 4)
    assert.equal(rows.Film[0].release_date, '1977-05-25')

    assert.equal(report.stats.missingReferences, 4)
    assert.equal(report.warnings.length, 4)
})
