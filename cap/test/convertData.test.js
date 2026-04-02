const test = require('node:test')
const assert = require('node:assert/strict')

const { __internals } = require('../convertData')

const {
    normalizeString,
    normalizeDate,
    normalizeBirthYear,
    deterministicId,
    deterministicLinkId,
    parseChunkSize,
    transformEntities
} = __internals

function createRawData() {
    return {
        planets: [{ name: 'Tatooine', diameter: '10465', rotation_period: '23',
                    orbital_period: '304', gravity: '1 standard', population: '200000',
                    climate: 'arid', terrain: 'desert', surface_water: '1' }],
        people:  [
            { name: 'Luke Skywalker', height: '172', mass: '77',
              hair_color: 'blond', skin_color: 'fair', eye_color: 'blue',
              birth_year: '19BBY', gender: 'male', _homeworld: 'Tatooine',
              _species: 'Human' },
            { name: 'Mystery Person', height: 'unknown', mass: 'n/a',
              hair_color: '', skin_color: null, eye_color: 'green',
              birth_year: 'unknown', gender: 'none', _homeworld: null, _species: null }
        ],
        films:   [{ title: 'A New Hope', episode_id: 4, opening_crawl: 'It is a period of civil war...',
                    director: 'George Lucas', producer: 'Gary Kurtz, Rick McCallum',
                    release_date: '1977-05-25' }],
        shows:   [{ title: 'The Mandalorian', show_type: 'LIVE_ACTION_SERIES',
                    seasons: 3, episode_count: 24, network: 'Disney+',
                    director: 'Jon Favreau', producer: 'Jon Favreau',
                    release_date: '2019-11-01' }],
        species:   [{ name: 'Human', classification: 'mammal', designation: 'sentient',
                      eye_colors: 'brown, blue', skin_colors: 'light, dark',
                      language: 'Galactic Basic', hair_colors: 'blond, brown',
                      average_lifespan: '120', average_height: '180',
                      _homeworld: 'Tatooine' }],
        starships: [{ name: 'X-wing', model: 'T-65 X-wing', starship_class: 'Starfighter',
                      manufacturer: 'Incom', cost_in_credits: '149999', length: '12.5',
                      crew: '1', passengers: '0', max_atmosphering_speed: '1050',
                      hyperdrive_rating: '1.0', MGLT: '100', cargo_capacity: '110',
                      consumables: '1 week', _pilots: ['Luke Skywalker', 'Ghost Pilot'] }],
        vehicles:  [{ name: 'T-47 Airspeeder', model: 'T-47 airspeeder', vehicle_class: 'Snowspeeder',
                      manufacturer: 'Incom', cost_in_credits: null, length: '5.3',
                      crew: '2', passengers: '0', max_atmosphering_speed: '1000',
                      cargo_capacity: '10', consumables: 'none', _pilots: ['Luke Skywalker'] }],
        episodes: [
            {
                title:          'Chapter 1: The Mandalorian',
                season_number:  1,
                episode_number: 1,
                air_date:       '2019-11-01',
                director:       'Dave Filoni',
                writer:         'Jon Favreau',
                runtime:        39,
                timeline:       '9 ABY',
                _show:          'The Mandalorian',
            }
        ],
        relationships: {
            film2people:    [{ film: 'A New Hope',      people: 'Luke Skywalker' },
                             { film: 'A New Hope',      people: 'Ghost Character' }],
            show2people:    [{ show: 'The Mandalorian', people: 'Luke Skywalker' }],
            film2planets:   [{ film: 'A New Hope',      planet: 'Tatooine' }],
            film2starships: [{ film: 'A New Hope',      starship: 'X-wing' }],
            film2vehicles:  [{ film: 'A New Hope',      vehicle: 'T-47 Airspeeder' }],
            film2species:   [{ film: 'A New Hope',      specie: 'Human' }],
            species2people: [{ species: 'Human',        people: 'Luke Skywalker' },
                             { species: 'Human',        people: 'Ghost Person' }],
            starship2pilot: [{ starship: 'X-wing',      pilot: 'Luke Skywalker' },
                             { starship: 'X-wing',      pilot: 'Ghost Pilot' }],
            vehicle2pilot:  [{ vehicle: 'T-47 Airspeeder', pilot: 'Luke Skywalker' }],
            planet2people:  [{ planet: 'Tatooine',      people: 'Luke Skywalker' }],
            episode2people:    [{ episode: 'Chapter 1: The Mandalorian', people: 'Luke Skywalker' }],
            episode2planets:   [{ episode: 'Chapter 1: The Mandalorian', planet: 'Tatooine' }],
            episode2starships: [],
            episode2vehicles:  [],
            episode2species:   [{ episode: 'Chapter 1: The Mandalorian', specie: 'Human' }],
        }
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

    assert.equal(normalizeBirthYear('19bby'), '19BBY')
    assert.equal(normalizeBirthYear('5 ABY'), '5ABY')
    assert.equal(normalizeBirthYear('unknown'), null)
    assert.equal(normalizeBirthYear('year-5'), null)
})

test('chunk-size parser falls back on invalid input', () => {
    assert.equal(parseChunkSize('250'), 250)
    assert.equal(parseChunkSize('-1'), 1000)
    assert.equal(parseChunkSize('abc'), 1000)
    assert.equal(parseChunkSize(undefined), 1000)
})

test('transformEntities creates expected rows and records missing references', () => {
    const report = {
        stats: { read: {}, persisted: {}, skippedRecords: 0, missingReferences: 0 },
        warnings: []
    }

    const rows = transformEntities(createRawData(), report)

    assert.equal(rows.Planet.length, 1, 'one planet')
    assert.equal(rows.People.length, 2, 'two people')
    assert.equal(rows.Film.length, 1, 'one film')
    assert.equal(rows.Show.length, 1, 'one show')
    assert.equal(rows.Planet2People.length, 1, 'one planet-people link (Tatooine → Luke)')
    assert.equal(rows.Starship2Pilot.length, 1, 'one pilot link — Ghost Pilot is missing')
    assert.equal(rows.Vehicle2Pilot.length, 1, 'one vehicle pilot link')
    assert.equal(rows.Species2People.length, 1, 'one species-people link — Ghost Person is missing')
    assert.equal(rows.Film2People.length, 1, 'one film-people link — Ghost Character is missing')
    assert.equal(rows.Film2Planets.length, 1)
    assert.equal(rows.Film2Starships.length, 1)
    assert.equal(rows.Film2Vehicles.length, 1)
    assert.equal(rows.Film2Species.length, 1)
    assert.equal(rows.Show2People.length, 1)

    const luke = rows.People.find(row => row.name === 'Luke Skywalker')

    // Episode rows
    assert.equal(rows.Episode.length, 1, 'one episode')
    assert.equal(rows.Episode[0].title, 'Chapter 1: The Mandalorian')
    assert.equal(rows.Episode[0].season_number, 1)
    assert.equal(rows.Episode[0].episode_number, 1)
    assert.equal(rows.Episode[0].air_date, '2019-11-01')
    assert.equal(rows.Episode[0].runtime, 39)
    assert.equal(rows.Episode[0].timeline, '9 ABY')
    assert.ok(rows.Episode[0].show_ID, 'episode has show_ID resolved from The Mandalorian')

    // Episode junction rows
    assert.equal(rows.Episode2People.length, 1, 'one episode2people link')
    assert.equal(rows.Episode2Planets.length, 1, 'one episode2planets link')
    assert.equal(rows.Episode2Species.length, 1, 'one episode2species link')
    assert.equal(rows.Episode2Starships.length, 0)
    assert.equal(rows.Episode2Vehicles.length, 0)

    // Show2Planets/Starships/Vehicles/Species are now views — must NOT appear in rows
    assert.equal(rows.Show2Planets,   undefined, 'Show2Planets removed from rows (now a view)')
    assert.equal(rows.Show2Starships, undefined, 'Show2Starships removed from rows (now a view)')
    assert.equal(rows.Show2Vehicles,  undefined, 'Show2Vehicles removed from rows (now a view)')
    assert.equal(rows.Show2Species,   undefined, 'Show2Species removed from rows (now a view)')

    assert.equal(luke.birth_year, '19BBY')

    const mysteryPerson = rows.People.find(row => row.name === 'Mystery Person')
    assert.equal(mysteryPerson.homeworld_ID, null, 'null _homeworld → null homeworld_ID')
    assert.equal(mysteryPerson.height, null, 'unknown height → null')
    assert.equal(mysteryPerson.mass, null, 'n/a mass → null')

    assert.equal(rows.Film[0].episode_id, 4)
    assert.equal(rows.Film[0].release_date, '1977-05-25')

    assert.equal(rows.Show[0].title, 'The Mandalorian')
    assert.equal(rows.Show[0].show_type, 'LIVE_ACTION_SERIES')
    assert.equal(rows.Show[0].seasons, 3)

    // Missing references: Ghost Character (film2people) + Ghost Pilot (starship2pilot) +
    //                     Ghost Person (species2people) = 3
    assert.equal(report.stats.missingReferences, 3, 'three missing references')
})
