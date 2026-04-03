'use strict'

const { describe, it } = require('node:test')
const assert = require('node:assert/strict')

const { extractFilm } = require('../extractors/films')
const { extractShow } = require('../extractors/shows')
const { extractEpisode } = require('../extractors/episodes')
const { normalizeInteger } = require('../normalize')

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

// ── Season page fixtures ──────────────────────────────────────────────────────

// Standard format: episode title in quoted wikilink "[[Title]]"
const MANDO_S1_WIKITEXT = `
==Episodes==
{|class="wikitable"
|-
|style="text-align: center;"|1
|[[File:TheMandalorianChapter1.jpg|150px]]
|"[[Chapter 1: The Mandalorian]]"
|[[November 12]], [[2019]]
|
|-
|style="text-align: center;"|2
|[[File:TheMandalorianChapter2.jpg|150px]]
|"[[Chapter 2: The Child]]"
|[[November 15]], 2019
|
|-
|}
==Development==
Some other content with [[wikilinks]] we should NOT pick up.
`

// Italic format: Rebels season premiere uses ''[[Title]]'' not "[[Title]]"
const REBELS_S1_WIKITEXT = `
==Episodes==
{|class="wikitable"
|-
|style="text-align: center;"|1
|[[File:RebelsS1E1.jpg|150px]]
|''[[Star Wars Rebels: Spark of Rebellion]]''
|[[October 3]], [[2014]]
|
|-
|style="text-align: center;"|2
|[[File:RebelsS1E2.jpg|150px]]
|"[[Fighter Flight]]"
|[[October 13]], 2014
|
|-
|}
`

// No Episodes section — should return []
const NO_EPISODES_WIKITEXT = `
==Overview==
Some content.
==Cast==
Other content.
`

// Piped wikilink format: "[[Title (episode)|Title]]" with "Month Day" airdate wikilink
const ANDOR_S1_WIKITEXT = `
==Episodes==
{|class="wikitable"
|-
|style="text-align: center;"|1
|[[File:AndorKassa.jpg|150px]]
|"[[Kassa (episode)|Kassa]]"
|[[September 21]], [[2022]]
|
|-
|}
`

// Show page with inline episode table (no season sub-pages) — Boba Fett format
const BOBA_FETT_SHOW_WIKITEXT = `
==Episodes==
{|{{Prettytable}}
! Episode !! Image !! Title !! Original Airdate !! Prod. #
|-
|style="text-align: center;"|1
|[[File:Chapter_1_Stranger_in_a_Strange_Land.jpg|150px]]
|"[[Chapter 1: Stranger in a Strange Land]]"
|[[December 29]], [[2021]]
|101
|-
|style="text-align: center;"|2
|[[File:Chapter_2_The_Tribes_of_Tatooine.jpg|150px]]
|"[[Chapter 2: The Tribes of Tatooine]]"
|[[January 5]], [[2022]]
|102
|-
|}
`

const { extractSeasonEpisodeTitles } = require('../extractors/seasons')

describe('extractSeasonEpisodeTitles', () => {
    it('returns [] for page with no Episodes section', () => {
        const titles = extractSeasonEpisodeTitles(NO_EPISODES_WIKITEXT)
        assert.deepEqual(titles, [])
    })

    it('returns [] for null/empty input', () => {
        assert.deepEqual(extractSeasonEpisodeTitles(null), [])
        assert.deepEqual(extractSeasonEpisodeTitles(''), [])
    })

    it('extracts quoted wikilink titles (standard format)', () => {
        const titles = extractSeasonEpisodeTitles(MANDO_S1_WIKITEXT)
        assert.equal(titles.length, 2)
        assert.equal(titles[0], 'Chapter 1: The Mandalorian')
        assert.equal(titles[1], 'Chapter 2: The Child')
    })

    it('does not include wikilinks from sections after Episodes', () => {
        const titles = extractSeasonEpisodeTitles(MANDO_S1_WIKITEXT)
        assert.ok(!titles.includes('wikilinks'), 'should not pick up links from Development section')
    })

    it('extracts italic wikilink titles (Rebels premiere format)', () => {
        const titles = extractSeasonEpisodeTitles(REBELS_S1_WIKITEXT)
        assert.ok(titles.includes('Star Wars Rebels: Spark of Rebellion'), 'italic premiere must be included')
        assert.ok(titles.includes('Fighter Flight'), 'standard episode must also be included')
        assert.equal(titles.length, 2, 'must not include date/file links')
    })

    it('does not include File: links', () => {
        const titles = extractSeasonEpisodeTitles(MANDO_S1_WIKITEXT)
        assert.ok(!titles.some(t => t.startsWith('File:')))
    })

    it('extracts piped wikilink titles (Andor format)', () => {
        const titles = extractSeasonEpisodeTitles(ANDOR_S1_WIKITEXT)
        assert.equal(titles.length, 1)
        assert.equal(titles[0], 'Kassa (episode)')
    })

    it('extracts episodes from a show page with inline episode table (no season sub-pages)', () => {
        const titles = extractSeasonEpisodeTitles(BOBA_FETT_SHOW_WIKITEXT)
        assert.equal(titles.length, 2)
        assert.equal(titles[0], 'Chapter 1: Stranger in a Strange Land')
        assert.equal(titles[1], 'Chapter 2: The Tribes of Tatooine')
    })
})

// ── Episode attribution fixtures ──────────────────────────────────────────────

// Episode infobox WITH a |series= field (authoritative show)
const EPISODE_WITH_SERIES_WIKITEXT = `
{{Episode
|series=Star Wars: The Mandalorian
|season=One
|number=9
|airdate=October 30, 2020
|director=Jon Favreau
|writer=Jon Favreau
|runtime=50
}}
`

// Episode infobox WITHOUT a |series= field (fallback to showTitle)
const EPISODE_WITHOUT_SERIES_WIKITEXT = `
{{Episode
|season=1
|number=1
|airdate=November 12, 2019
|director=Dave Filoni
|writer=Jon Favreau
|runtime=39
}}
`

describe('extractEpisode _show attribution', () => {
    it('uses infobox series field when present, ignores showTitle', () => {
        const ep = extractEpisode('Chapter 9: The Marshal', EPISODE_WITH_SERIES_WIKITEXT, 'Star Wars: Ahsoka')
        assert.equal(ep._show, 'Star Wars: The Mandalorian')
    })

    it('falls back to showTitle when series field is absent', () => {
        const ep = extractEpisode('Chapter 1: The Mandalorian', EPISODE_WITHOUT_SERIES_WIKITEXT, 'Star Wars: The Mandalorian')
        assert.equal(ep._show, 'Star Wars: The Mandalorian')
    })

    it('falls back to showTitle when series field is absent (different showTitle)', () => {
        const ep = extractEpisode('Chapter 1: The Mandalorian', EPISODE_WITHOUT_SERIES_WIKITEXT, 'Star Wars: The Clone Wars')
        assert.equal(ep._show, 'Star Wars: The Clone Wars')
    })
})

describe('normalizeInteger', () => {
    it('parses numeric strings', () => {
        assert.equal(normalizeInteger('1'), 1)
        assert.equal(normalizeInteger('42'), 42)
    })

    it('parses ordinal word One → 1', () => {
        assert.equal(normalizeInteger('One'), 1)
    })

    it('parses ordinal word Four → 4', () => {
        assert.equal(normalizeInteger('Four'), 4)
    })

    it('parses ordinal word Ten → 10', () => {
        assert.equal(normalizeInteger('Ten'), 10)
    })

    it('parses ordinal case-insensitively', () => {
        assert.equal(normalizeInteger('ONE'), 1)
        assert.equal(normalizeInteger('four'), 4)
    })

    it('returns null for unknown words', () => {
        assert.equal(normalizeInteger('eleven'), null)
        assert.equal(normalizeInteger('twelve'), null)
    })

    it('returns null for null/undefined', () => {
        assert.equal(normalizeInteger(null), null)
        assert.equal(normalizeInteger(undefined), null)
    })
})
