'use strict'
// (env vars set above)

// Must be set BEFORE @sap/cds is required so CAP reads the correct profile.
// 'sqlite' activates the [sqlite] profile (uses @cap-js/sqlite instead of HANA).
// ':memory:' avoids creating a db.sqlite file on disk during tests.
process.env.CDS_ENV = 'sqlite'
process.env.CDS_REQUIRES_DB_CREDENTIALS_URL = ':memory:'

/**
 * CDS model unit tests using cds.test (node:test runner).
 *
 * The test server starts with --in-memory? so an isolated in-memory SQLite
 * database is used for every run, regardless of the profile configured in
 * package.json.
 *
 * Run: node --test test/model.test.js
 */

const { describe, it, before, after } = require('node:test')
const assert = require('node:assert/strict')
const cds = require('@sap/cds')

// Convenience shortcuts from the CDS query builder
const { SELECT, INSERT, UPDATE, DELETE } = cds.ql

// cds.test() starts the CAP server with an in-memory SQLite DB and registers
// before/after lifecycle hooks for the top-level describe suite.
describe('Star Wars CDS Model Tests', () => {
  const { GET } = cds.test(__dirname + '/..')

  // ─────────────────────────────────────────────────────────────────────────
  // Service Endpoint Discovery
  // Verifies that all six domain services expose their primary entity via
  // GET /odata/v4/<Service>/<Entity> and return an OData value array.
  // ─────────────────────────────────────────────────────────────────────────
  describe('Service Endpoints', () => {
    const endpoints = [
      ['/odata/v4/StarWarsFilm/Film',         'StarWarsFilm – Film'],
      ['/odata/v4/StarWarsPeople/People',      'StarWarsPeople – People'],
      ['/odata/v4/StarWarsPlanet/Planet',      'StarWarsPlanet – Planet'],
      ['/odata/v4/StarWarsSpecies/Species',    'StarWarsSpecies – Species'],
      ['/odata/v4/StarWarsStarship/Starship',  'StarWarsStarship – Starship'],
      ['/odata/v4/StarWarsVehicle/Vehicles',   'StarWarsVehicle – Vehicles'],
    ]

    for (const [url, label] of endpoints) {
      it(`${label} returns HTTP 200 with OData value array`, async () => {
        const { status, data } = await GET(url)
        assert.equal(status, 200, `Expected 200 for ${url}`)
        assert.ok(Array.isArray(data.value), `Expected data.value to be an array for ${url}`)
      })
    }
  })

  // ─────────────────────────────────────────────────────────────────────────
  // OData $metadata
  // ─────────────────────────────────────────────────────────────────────────
  describe('OData $metadata', () => {
    it('StarWarsFilm service exposes valid $metadata document', async () => {
      const { status, data } = await GET('/odata/v4/StarWarsFilm/$metadata')
      assert.equal(status, 200)
      assert.ok(typeof data === 'string' || typeof data === 'object',
        '$metadata should return XML or parsed object')
    })

    it('StarWarsPeople service exposes valid $metadata document', async () => {
      const { status } = await GET('/odata/v4/StarWarsPeople/$metadata')
      assert.equal(status, 200)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Planet – CRUD
  // Planet is a simple root entity with no draft workflow, making it ideal
  // for straightforward create / read / update / delete checks.
  // ─────────────────────────────────────────────────────────────────────────
  describe('Planet – CRUD', () => {
    let db

    before(async () => {
      db = await cds.connect.to('db')
    })

    after(async () => {
      await db.run(DELETE.from('star.wars.Planet').where({ name: { like: '%-crudtest' } }))
    })

    it('inserts a Planet and returns an auto-generated UUID', async () => {
      await db.run(INSERT.into('star.wars.Planet').entries({
        name: 'Tatooine-crudtest',
        climate: 'arid',
        terrain: 'desert',
        population: '200000',
        diameter: '10465',
        gravity: '1 standard',
        rotation_period: '23',
        orbital_period: '304',
        surface_water: '1',
      }))

      const [planet] = await db.run(SELECT.from('star.wars.Planet').where({ name: 'Tatooine-crudtest' }))
      assert.ok(planet?.ID, 'Planet.ID should be auto-generated (cuid)')
      assert.equal(planet.name, 'Tatooine-crudtest')
      assert.equal(planet.climate, 'arid')
    })

    it('reads the Planet via OData $filter', async () => {
      const { status, data } = await GET(
        `/odata/v4/StarWarsPlanet/Planet?$filter=name eq 'Tatooine-crudtest'`
      )
      assert.equal(status, 200)
      assert.equal(data.value.length, 1)
      assert.equal(data.value[0].terrain, 'desert')
    })

    it('updates the Planet population', async () => {
      await db.run(
        UPDATE('star.wars.Planet')
          .set({ population: '300000' })
          .where({ name: 'Tatooine-crudtest' })
      )
      const [planet] = await db.run(
        SELECT.from('star.wars.Planet').where({ name: 'Tatooine-crudtest' })
      )
      assert.equal(planet.population, '300000')
    })

    it('deletes the Planet', async () => {
      await db.run(DELETE.from('star.wars.Planet').where({ name: 'Tatooine-crudtest' }))
      const result = await db.run(
        SELECT.from('star.wars.Planet').where({ name: 'Tatooine-crudtest' })
      )
      assert.equal(result.length, 0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Film – CRUD via DB (bypasses OData draft workflow)
  // ─────────────────────────────────────────────────────────────────────────
  describe('Film – CRUD via DB', () => {
    let db
    let filmId

    before(async () => {
      db = await cds.connect.to('db')
    })

    after(async () => {
      // Belt-and-suspenders cleanup
      if (filmId) await db.run(DELETE.from('star.wars.Film').where({ ID: filmId }))
    })

    it('inserts a Film with all standard fields', async () => {
      await db.run(INSERT.into('star.wars.Film').entries({
        title: 'A New Hope',
        episode_id: 4,
        director: 'George Lucas',
        producer: 'Gary Kurtz',
        release_date: '1977-05-25',
        opening_crawl: 'It is a period of civil war...',
      }))

      const [film] = await db.run(
        SELECT.from('star.wars.Film').where({ title: 'A New Hope' })
      )
      assert.ok(film?.ID, 'Film.ID should be auto-generated UUID')
      assert.equal(film.title, 'A New Hope')
      assert.equal(film.episode_id, 4)
      assert.equal(film.director, 'George Lucas')
      filmId = film.ID
    })

    it('reads the Film by key via OData', async () => {
      // Film is draft-enabled; active entity requires IsActiveEntity=true in the key
      const { status, data } = await GET(`/odata/v4/StarWarsFilm/Film(ID=${filmId},IsActiveEntity=true)`)
      assert.equal(status, 200)
      assert.equal(data.title, 'A New Hope')
      assert.equal(data.episode_id, 4)
    })

    it('updates the Film director', async () => {
      await db.run(
        UPDATE('star.wars.Film').set({ director: 'Updated Director' }).where({ ID: filmId })
      )
      const [film] = await db.run(SELECT.from('star.wars.Film').where({ ID: filmId }))
      assert.equal(film.director, 'Updated Director')
    })

    it('deletes the Film', async () => {
      await db.run(DELETE.from('star.wars.Film').where({ ID: filmId }))
      const result = await db.run(SELECT.from('star.wars.Film').where({ ID: filmId }))
      assert.equal(result.length, 0)
      filmId = null
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Film.episode_id – @assert.range validation
  // episode_id uses an Integer enum (0–10).  CAP's service layer rejects
  // values that fall outside those declared enum values.
  // ─────────────────────────────────────────────────────────────────────────
  describe('Film.episode_id – @assert.range validation', () => {
    let filmSrv
    let db

    before(async () => {
      filmSrv = await cds.connect.to('StarWarsFilm')
      db       = await cds.connect.to('db')
    })

    after(async () => {
      // Clean up any films that slipped through
      await db.run(DELETE.from('star.wars.Film').where({ title: { like: 'Range%' } }))
    })

    it('rejects episode_id = 11 (not in enum)', async () => {
      await assert.rejects(
        filmSrv.run(
          INSERT.into('Film').entries({ title: 'Range: Bad Film', episode_id: 11 })
        ),
        'Service should reject episode_id values outside the declared enum'
      )
    })

    it('accepts episode_id = 0 (OTHER – edge enum value)', async () => {
      await filmSrv.run(INSERT.into('Film').entries({
        title: 'Range: Episode OTHER',
        episode_id: 0,
        director: 'Range Director',
        producer: 'Range Producer',
        release_date: '2024-01-01',
      }))
      const [film] = await db.run(
        SELECT.from('star.wars.Film').where({ title: 'Range: Episode OTHER' })
      )
      assert.ok(film, 'Film with episode_id=0 (OTHER) should be persisted')
      assert.equal(film.episode_id, 0)
    })

    it('accepts episode_id = 9 (IX – highest named enum value)', async () => {
      await filmSrv.run(INSERT.into('Film').entries({
        title: 'Range: Episode IX Test',
        episode_id: 9,
        director: 'Range Director',
        producer: 'Range Producer',
        release_date: '2019-12-20',
      }))
      const [film] = await db.run(
        SELECT.from('star.wars.Film').where({ title: 'Range: Episode IX Test' })
      )
      assert.ok(film, 'Film with episode_id=9 should be persisted')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // People – defaults, associations and @assert.target
  // ─────────────────────────────────────────────────────────────────────────
  describe('People – Defaults and Associations', () => {
    let db
    let planetId

    before(async () => {
      db = await cds.connect.to('db')
      await db.run(INSERT.into('star.wars.Planet').entries({
        name: 'Test Homeworld-peopletest',
        climate: 'temperate',
        terrain: 'grasslands',
        population: '1000',
      }))
      const [planet] = await db.run(
        SELECT.from('star.wars.Planet').where({ name: 'Test Homeworld-peopletest' })
      )
      planetId = planet.ID
    })

    after(async () => {
      await db.run(DELETE.from('star.wars.People').where({ name: { like: '%-peopletest' } }))
      if (planetId) await db.run(DELETE.from('star.wars.Planet').where({ ID: planetId }))
    })

    it('People.height defaults to "Test" when not provided', async () => {
      await db.run(INSERT.into('star.wars.People').entries({
        name: 'Han Solo-peopletest',
        gender: 'male',
        homeworld_ID: planetId,
        mass: '80',
      }))
      const [person] = await db.run(
        SELECT.from('star.wars.People').where({ name: 'Han Solo-peopletest' })
      )
      assert.equal(person.height, 'Test', 'height should default to "Test" per CDS model definition')
    })

    it('People.scoundrel defaults to false when not provided', async () => {
      const [person] = await db.run(
        SELECT.from('star.wars.People').where({ name: 'Han Solo-peopletest' })
      )
      // SQLite stores Boolean as 0/1; CAP may coerce to JS boolean
      assert.ok(!person.scoundrel, 'scoundrel should default to false')
    })

    it('People has an auto-generated UUID', async () => {
      const [person] = await db.run(
        SELECT.from('star.wars.People').where({ name: 'Han Solo-peopletest' })
      )
      assert.ok(person?.ID, 'People.ID should be auto-generated (cuid)')
    })

    it('reads People via OData with $expand=homeworld', async () => {
      const { status, data } = await GET(
        `/odata/v4/StarWarsPeople/People?$filter=name eq 'Han Solo-peopletest'&$expand=homeworld`
      )
      assert.equal(status, 200)
      assert.equal(data.value.length, 1)
      assert.ok(data.value[0].homeworld, 'homeworld should be expanded')
      assert.equal(data.value[0].homeworld.name, 'Test Homeworld-peopletest')
    })

    it('People @assert.target rejects a non-existent homeworld_ID', async () => {
      const peopleSrv = await cds.connect.to('StarWarsPeople')
      const fakeId    = '00000000-0000-0000-0000-000000000000'
      await assert.rejects(
        peopleSrv.run(
          INSERT.into('People').entries({
            name: 'Ghost Person-peopletest',
            gender: 'unknown',
            homeworld_ID: fakeId, // no such Planet exists
          })
        ),
        'Service should reject homeworld_ID that does not reference a known Planet (@assert.target)'
      )
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Many-to-Many: Film ↔ People via Film2People
  // ─────────────────────────────────────────────────────────────────────────
  describe('Film ↔ People M:N via Film2People', () => {
    let db
    let filmId
    let peopleId

    before(async () => {
      db = await cds.connect.to('db')

      await db.run(INSERT.into('star.wars.Film').entries({
        title: 'M2M Test Film',
        episode_id: 5,
        director: 'M2M Director',
        producer: 'M2M Producer',
        release_date: '2024-01-01',
      }))
      const [film] = await db.run(
        SELECT.from('star.wars.Film').where({ title: 'M2M Test Film' })
      )
      filmId = film.ID

      await db.run(INSERT.into('star.wars.People').entries({
        name: 'M2M Test Hero',
        gender: 'female',
      }))
      const [person] = await db.run(
        SELECT.from('star.wars.People').where({ name: 'M2M Test Hero' })
      )
      peopleId = person.ID
    })

    after(async () => {
      if (filmId) {
        await db.run(DELETE.from('star.wars.Film2People').where({ film_ID: filmId }))
        await db.run(DELETE.from('star.wars.Film').where({ ID: filmId }))
      }
      if (peopleId) await db.run(DELETE.from('star.wars.People').where({ ID: peopleId }))
    })

    it('inserts a Film2People link (M:N join record)', async () => {
      await db.run(INSERT.into('star.wars.Film2People').entries({
        film_ID: filmId,
        people_ID: peopleId,
      }))

      const links = await db.run(
        SELECT.from('star.wars.Film2People').where({ film_ID: filmId })
      )
      assert.equal(links.length, 1)
      assert.equal(links[0].people_ID, peopleId)
    })

    it('Film2People link has an auto-generated ID', async () => {
      const [link] = await db.run(
        SELECT.from('star.wars.Film2People').where({ film_ID: filmId })
      )
      assert.ok(link?.ID, 'Film2People.ID should be auto-generated (cuid)')
    })

    it('reads Film.characters expansion via OData $expand', async () => {
      // Film is draft-enabled; compose a compound key including IsActiveEntity
      const { status, data } = await GET(
        `/odata/v4/StarWarsFilm/Film(ID=${filmId},IsActiveEntity=true)?$expand=characters`
      )
      assert.equal(status, 200)
      assert.ok(Array.isArray(data.characters))
      assert.equal(data.characters.length, 1)
    })

    it('removing the Film2People link removes it from the Film characters list', async () => {
      await db.run(DELETE.from('star.wars.Film2People').where({ film_ID: filmId }))
      const { data } = await GET(
        `/odata/v4/StarWarsFilm/Film(ID=${filmId},IsActiveEntity=true)?$expand=characters`
      )
      assert.equal(data.characters.length, 0)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Computed Views: directors, producers, FilmEpisodeDesc
  // ─────────────────────────────────────────────────────────────────────────
  describe('Computed Views', () => {
    let db

    before(async () => {
      db = await cds.connect.to('db')
      await db.run(INSERT.into('star.wars.Film').entries([
        {
          title: 'View Test Film I',
          episode_id: 1,
          director: 'View Director Alpha',
          producer: 'View Producer X',
          release_date: '2001-01-01',
        },
        {
          title: 'View Test Film II',
          episode_id: 2,
          director: 'View Director Alpha', // duplicate director
          producer: 'View Producer Y',       // different producer
          release_date: '2002-01-01',
        },
        {
          title: 'View Test Film III',
          episode_id: 3,
          director: 'View Director Beta',
          producer: 'View Producer X',       // duplicate producer
          release_date: '2003-01-01',
        },
      ]))
    })

    after(async () => {
      await db.run(DELETE.from('star.wars.Film').where({ director: { like: 'View Director%' } }))
    })

    it('directors view contains only distinct director values', async () => {
      const rows  = await db.run(SELECT.from('star.wars.directors'))
      const names = rows.map(r => r.director)
      assert.equal(
        new Set(names).size,
        names.length,
        'directors view must deduplicate: each director should appear once'
      )
      assert.ok(names.includes('View Director Alpha'))
      assert.ok(names.includes('View Director Beta'))
    })

    it('directors view does NOT expose duplicate rows for repeat directors', async () => {
      const rows = await db.run(
        SELECT.from('star.wars.directors').where({ director: 'View Director Alpha' })
      )
      assert.equal(rows.length, 1, '"View Director Alpha" should appear exactly once in the view')
    })

    it('producers view contains only distinct producer values', async () => {
      const rows  = await db.run(SELECT.from('star.wars.producers'))
      const names = rows.map(r => r.producer)
      assert.equal(
        new Set(names).size,
        names.length,
        'producers view must deduplicate: each producer should appear once'
      )
    })

    it('FilmEpisodeDesc maps episode_id 1 → "I"', async () => {
      const [row] = await db.run(
        SELECT.from('star.wars.FilmEpisodeDesc').where({ episode_id: 1 })
      )
      assert.ok(row, 'Should find a FilmEpisodeDesc row for episode_id=1')
      assert.equal(row.episodeIDDesc, 'I')
    })

    it('FilmEpisodeDesc maps episode_id 2 → "II"', async () => {
      const [row] = await db.run(
        SELECT.from('star.wars.FilmEpisodeDesc').where({ episode_id: 2 })
      )
      assert.equal(row.episodeIDDesc, 'II')
    })

    it('FilmEpisodeDesc maps episode_id 3 → "III"', async () => {
      const [row] = await db.run(
        SELECT.from('star.wars.FilmEpisodeDesc').where({ episode_id: 3 })
      )
      assert.equal(row.episodeIDDesc, 'III')
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // OData Query Options: $top, $skip, $filter, $count
  // ─────────────────────────────────────────────────────────────────────────
  describe('OData Query Options', () => {
    let db

    before(async () => {
      db = await cds.connect.to('db')
      await db.run(INSERT.into('star.wars.Planet').entries([
        { name: 'Query Alpha-querytest', climate: 'arctic',   terrain: 'tundra',  population: '1000'   },
        { name: 'Query Beta-querytest',  climate: 'tropical', terrain: 'jungle',  population: '5000'   },
        { name: 'Query Gamma-querytest', climate: 'arid',     terrain: 'desert',  population: '200000' },
        { name: 'Query Delta-querytest', climate: 'temperate',terrain: 'plains',  population: '800000' },
      ]))
    })

    after(async () => {
      await db.run(DELETE.from('star.wars.Planet').where({ name: { like: '%-querytest' } }))
    })

    it('$top=2 returns at most 2 records', async () => {
      const { status, data } = await GET('/odata/v4/StarWarsPlanet/Planet?$top=2')
      assert.equal(status, 200)
      assert.ok(data.value.length <= 2, '$top=2 must not return more than 2 records')
    })

    it('$skip=1 skips the first record', async () => {
      const { data: all  } = await GET('/odata/v4/StarWarsPlanet/Planet?$orderby=name&$top=4')
      const { data: skip1 } = await GET('/odata/v4/StarWarsPlanet/Planet?$orderby=name&$skip=1&$top=4')
      assert.ok(skip1.value.length >= 1)
      // The first item after skipping should not equal the first item without skipping
      assert.notEqual(skip1.value[0]?.ID, all.value[0]?.ID)
    })

    it('$filter by exact name returns exactly one matching Planet', async () => {
      const { status, data } = await GET(
        `/odata/v4/StarWarsPlanet/Planet?$filter=name eq 'Query Beta-querytest'`
      )
      assert.equal(status, 200)
      assert.equal(data.value.length, 1)
      assert.equal(data.value[0].climate, 'tropical')
    })

    it('$count=true includes @odata.count in response', async () => {
      const { status, data } = await GET(
        '/odata/v4/StarWarsPlanet/Planet?$count=true'
      )
      assert.equal(status, 200)
      assert.ok(
        typeof data['@odata.count'] === 'number',
        '@odata.count should be a number'
      )
      assert.ok(
        data['@odata.count'] >= 4,
        '@odata.count should reflect at least the 4 seeded test planets'
      )
    })

    it('$select limits the returned fields', async () => {
      const { status, data } = await GET(
        `/odata/v4/StarWarsPlanet/Planet?$filter=name eq 'Query Alpha-querytest'&$select=name,climate`
      )
      assert.equal(status, 200)
      assert.equal(data.value.length, 1)
      const planet = data.value[0]
      assert.equal(planet.name, 'Query Alpha-querytest')
      assert.equal(planet.climate, 'arctic')
      // fields not requested should be absent
      assert.equal(planet.terrain, undefined)
    })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // Species – basic CRUD and homeworld association
  // ─────────────────────────────────────────────────────────────────────────
  describe('Species – CRUD and Planet association', () => {
    let db
    let planetId
    let speciesId

    before(async () => {
      db = await cds.connect.to('db')
      await db.run(INSERT.into('star.wars.Planet').entries({
        name: 'Species Homeworld-speciestest',
        climate: 'temperate',
        terrain: 'forests',
        population: '500000',
      }))
      const [planet] = await db.run(
        SELECT.from('star.wars.Planet').where({ name: 'Species Homeworld-speciestest' })
      )
      planetId = planet.ID
    })

    after(async () => {
      if (speciesId) await db.run(DELETE.from('star.wars.Species').where({ ID: speciesId }))
      if (planetId)  await db.run(DELETE.from('star.wars.Planet').where({ ID: planetId }))
    })

    it('creates a Species with a homeworld Planet association', async () => {
      await db.run(INSERT.into('star.wars.Species').entries({
        name: 'Ewok-speciestest',
        classification: 'mammal',
        designation: 'sentient',
        language: 'Ewokese',
        homeworld_ID: planetId,
      }))
      const [species] = await db.run(
        SELECT.from('star.wars.Species').where({ name: 'Ewok-speciestest' })
      )
      assert.ok(species?.ID)
      assert.equal(species.classification, 'mammal')
      assert.equal(species.homeworld_ID, planetId)
      speciesId = species.ID
    })

    it('reads Species via OData with $expand=homeworld', async () => {
      const { status, data } = await GET(
        `/odata/v4/StarWarsSpecies/Species?$filter=name eq 'Ewok-speciestest'&$expand=homeworld`
      )
      assert.equal(status, 200)
      assert.equal(data.value.length, 1)
      assert.equal(data.value[0].homeworld?.name, 'Species Homeworld-speciestest')
    })
  })
})
