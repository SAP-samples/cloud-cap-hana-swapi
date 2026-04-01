using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Show Information'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsShow @(path : 'StarWarsShow') {

    @odata.draft.enabled : true
    entity Show            as projection on StarWars.Show;

    @readonly : true
    entity People          as projection on StarWars.People
                              excluding { shows, films, species, vehicles, starships };

    @readonly : true
    entity Planet          as projection on StarWars.Planet
                              excluding { shows, films, residents };

    @readonly : true
    entity Species         as projection on StarWars.Species
                              excluding { shows, films, people };

    @readonly : true
    entity Starship        as projection on StarWars.Starship
                              excluding { shows, films, pilots };

    @readonly : true
    entity Vehicles        as projection on StarWars.Vehicles
                              excluding { shows, films, pilots };

    @readonly : true
    entity Vehicle @(cds.redirection.target : false)
                           as projection on StarWars.Vehicles
                              excluding { shows, films, pilots };

    entity Show2People     as projection on StarWars.Show2People {
        * , people : redirected to People, show : redirected to Show
    };

    entity Show2Planets    as projection on StarWars.Show2Planets {
        * , show : redirected to Show
    };

    entity Show2Starships  as projection on StarWars.Show2Starships {
        * , show : redirected to Show
    };

    entity Show2Species    as projection on StarWars.Show2Species {
        // Keep both `specie` (source naming) and `species` (consumer-friendly alias)
        * , show : redirected to Show, specie : redirected to Species,
        specie as species : redirected to Species
    };

    entity Show2Vehicles   as projection on StarWars.Show2Vehicles {
        * , show : redirected to Show
    };

    @readonly : true
    entity Media            as projection on StarWars.Media;

    @readonly : true
    entity MediaCharacters  as projection on StarWars.MediaCharacters;

    @readonly : true
    entity MediaPlanets     as projection on StarWars.MediaPlanets;

    @readonly : true
    entity MediaSpecies     as projection on StarWars.MediaSpecies;

    @readonly : true
    entity MediaStarships   as projection on StarWars.MediaStarships;

    @readonly : true
    entity MediaVehicles    as projection on StarWars.MediaVehicles;
}
