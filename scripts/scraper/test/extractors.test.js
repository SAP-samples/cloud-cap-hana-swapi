'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { extractFilm } = require('../extractors/films')
const { extractShow } = require('../extractors/shows')

// Minimal fixture wikitext for a film
const FILM_WIKITEXT = `
{{Film
|name = A New Hope
|director = George Lucas
|producer = Gary Kurtz, Rick McCallum
|release = May 25, 1977
|episode = IV
|opening crawl = It is a period of civil war.
|characters = [[Luke Skywalker]], [[Princess Leia Organa|Princess Leia]], [[Han Solo]]
|planets = [[Tatooine]], [[Alderaan]], [[Yavin 4]]
|starships = [[Millennium Falcon]], [[Star Destroyer]]
|vehicles = [[AT-AT walker|AT-AT]]
|species = [[Human]], [[Wookiee]]
}}
`

// Minimal fixture wikitext for a show
const SHOW_WIKITEXT = `
{{Television series
|name = The Mandalorian
|network = Disney+
|premiere = November 1, 2019
|seasons = 3
|episodes = 24
|director = Jon Favreau, Dave Filoni
|producer = Jon Favreau
|characters = [[Din Djarin]], [[Grogu]]
|planets = [[Nevarro]]
}}
`

describe('extractFilm', () => {
    it('extracts title', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.title, 'A New Hope')
    })

    it('extracts director', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.director, 'George Lucas')
    })

    it('extracts release_date as YYYY-MM-DD', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.equal(film.release_date, '1977-05-25')
    })

    it('extracts character list', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.ok(Array.isArray(film._characters), 'characters should be array')
        assert.ok(film._characters.includes('Luke Skywalker'))
    })

    it('extracts planet list', () => {
        const film = extractFilm('A New Hope', FILM_WIKITEXT)
        assert.ok(film._planets.includes('Tatooine'))
    })

    it('returns null for disambig page', () => {
        const result = extractFilm('Test', '{{Disambig}}\nSome content')
        assert.equal(result, null)
    })

    it('episode_id: Episode IV → 4', () => {
        const film = extractFilm('Star Wars: Episode IV A New Hope', FILM_WIKITEXT)
        assert.equal(film.episode_id, 4)
    })

    it('episode_id: Episode I → 1', () => {
        const film = extractFilm('Star Wars: Episode I The Phantom Menace', FILM_WIKITEXT)
        assert.equal(film.episode_id, 1)
    })

    it('episode_id: Episode IX → 9', () => {
        const film = extractFilm('Star Wars: Episode IX The Rise of Skywalker', FILM_WIKITEXT)
        assert.equal(film.episode_id, 9)
    })

    it('episode_id: anthology film → 0', () => {
        const film = extractFilm('Rogue One: A Star Wars Story', FILM_WIKITEXT)
        assert.equal(film.episode_id, 0)
    })

    it('episode_id: Solo anthology → 0', () => {
        const film = extractFilm('Solo: A Star Wars Story', FILM_WIKITEXT)
        assert.equal(film.episode_id, 0)
    })
})

describe('extractShow', () => {
    it('extracts title', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.title, 'The Mandalorian')
    })

    it('extracts network', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.network, 'Disney+')
    })

    it('extracts seasons as integer', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.seasons, 3)
    })

    it('extracts episode_count as integer', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.equal(show.episode_count, 24)
    })

    it('extracts character list', () => {
        const show = extractShow('The Mandalorian', SHOW_WIKITEXT)
        assert.ok(show._characters.includes('Din Djarin'))
    })
})

const { extractPerson } = require('../extractors/people')
const { extractPlanet } = require('../extractors/planets')
const { extractSpecies } = require('../extractors/species')
const { extractStarship } = require('../extractors/starships')
const { extractVehicle } = require('../extractors/vehicles')

const PERSON_WIKITEXT = `
{{Character
|name = Luke Skywalker
|height = 1.72 meters
|mass = 77 kg
|hair = Blond
|skin = Light
|eyes = Blue
|born = 19 BBY
|gender = Male
|homeworld = [[Tatooine]]
|species = [[Human]]
}}
`

const PLANET_WIKITEXT = `
{{Planet
|name = Tatooine
|diameter = 10,465
|rotation = 23
|orbital = 304
|gravity = 1 standard
|population = 200,000
|climate = Arid
|terrain = Desert
|water = 1%
}}
`

const SPECIES_WIKITEXT = `
{{Species
|name = Wookiee
|classification = Mammal
|designation = Sentient
|height = 2.2 meters
|lifespan = 400 years
|language = Shyriiwook
|homeworld = [[Kashyyyk]]
}}
`

const STARSHIP_WIKITEXT = `
{{Starship
|name = Millennium Falcon
|model = YT-1300 light freighter
|class = Light freighter
|manufacturer = Corellian Engineering Corporation
|length = 34.75 meters
|crew = 2
|passengers = 6
|speed = 1050
|hyperdrive = 0.5
|cargo = 100 metric tons
|pilots = [[Han Solo]], [[Chewbacca]]
}}
`

const VEHICLE_WIKITEXT = `
{{Vehicle
|name = AT-AT walker
|model = All Terrain Armored Transport
|class = Walker
|manufacturer = Kuat Drive Yards
|length = 22.5 meters
|crew = 5
|passengers = 40
|speed = 60
}}
`

describe('extractPerson', () => {
    it('extracts name', () => {
        const person = extractPerson('Luke Skywalker', PERSON_WIKITEXT)
        assert.equal(person.name, 'Luke Skywalker')
    })
    it('returns null for disambig', () => {
        assert.equal(extractPerson('Test', '{{Disambig}}'), null)
    })
    it('has _homeworld field', () => {
        const person = extractPerson('Luke Skywalker', PERSON_WIKITEXT)
        assert.ok('_homeworld' in person, '_homeworld should be present')
    })
})

describe('extractPlanet', () => {
    it('extracts name', () => {
        const planet = extractPlanet('Tatooine', PLANET_WIKITEXT)
        assert.equal(planet.name, 'Tatooine')
    })
    it('returns null for disambig', () => {
        assert.equal(extractPlanet('Test', '{{Disambig}}'), null)
    })
    it('has climate field', () => {
        const planet = extractPlanet('Tatooine', PLANET_WIKITEXT)
        assert.ok('climate' in planet, 'climate should be present')
    })
})

describe('extractSpecies', () => {
    it('extracts name', () => {
        const species = extractSpecies('Wookiee', SPECIES_WIKITEXT)
        assert.equal(species.name, 'Wookiee')
    })
    it('returns null for disambig', () => {
        assert.equal(extractSpecies('Test', '{{Disambig}}'), null)
    })
})

describe('extractStarship', () => {
    it('extracts name', () => {
        const ship = extractStarship('Millennium Falcon', STARSHIP_WIKITEXT)
        assert.equal(ship.name, 'Millennium Falcon')
    })
    it('has _pilots field', () => {
        const ship = extractStarship('Millennium Falcon', STARSHIP_WIKITEXT)
        assert.ok(Array.isArray(ship._pilots), '_pilots should be array')
    })
    it('returns null for disambig', () => {
        assert.equal(extractStarship('Test', '{{Disambig}}'), null)
    })
})

describe('extractVehicle', () => {
    it('extracts name', () => {
        const veh = extractVehicle('AT-AT walker', VEHICLE_WIKITEXT)
        assert.equal(veh.name, 'AT-AT walker')
    })
    it('has _pilots field', () => {
        const veh = extractVehicle('AT-AT walker', VEHICLE_WIKITEXT)
        assert.ok(Array.isArray(veh._pilots), '_pilots should be array')
    })
    it('returns null for disambig', () => {
        assert.equal(extractVehicle('Test', '{{Disambig}}'), null)
    })
})
