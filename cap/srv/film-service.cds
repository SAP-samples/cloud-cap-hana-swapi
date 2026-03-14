using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Film Information'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsFilm @(path : 'StarWarsFilm') {

    @odata.draft.enabled : true
    entity Film            as projection on StarWars.Film;

    @readonly : true
    entity People          as projection on StarWars.People;

    @readonly : true
    entity Planet          as projection on StarWars.Planet;

    @readonly : true
    entity Species         as projection on StarWars.Species;

    @readonly : true
    entity Starship        as projection on StarWars.Starship;

    @readonly : true
    entity Vehicles        as projection on StarWars.Vehicles;

    @readonly : true
    entity Vehicle @(cds.redirection.target : false) as projection on StarWars.Vehicles;

    entity Film2People     as projection on StarWars.Film2People {
        * , people : redirected to People, film : redirected to Film
    };

    entity Film2Planets    as projection on StarWars.Film2Planets {
        * , film : redirected to Film
    };

    entity Film2Starships  as projection on StarWars.Film2Starships {
        * , film : redirected to Film
    };

    entity Film2Species    as projection on StarWars.Film2Species {
        // Keep both `specie` (source naming) and `species` (consumer-friendly alias)
        * , film : redirected to Film, specie : redirected to Species, specie as species : redirected to Species
    };

    entity Film2Vehicles   as projection on StarWars.Film2Vehicles {
        * , film : redirected to Film
    };

    @readonly : true
    entity directors       as projection on StarWars.directors;

    @readonly : true
    entity producers       as projection on StarWars.producers;

    @readonly : true
    entity FilmEpisodeDesc as projection on StarWars.FilmEpisodeDesc;

}
