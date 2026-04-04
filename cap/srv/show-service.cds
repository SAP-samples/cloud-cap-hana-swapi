using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Show Information'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsShow @(path : 'StarWarsShow') {

    @odata.draft.enabled : true
    @cds.redirection.target : true
    entity Show            as projection on StarWars.Show;

    entity Episode as projection on StarWars.Episode;

    @readonly : true
    entity People          as projection on StarWars.People
                              excluding { shows, films, species, vehicles, starships };

    @readonly : true
    entity Planet          as projection on StarWars.Planet
                              excluding { films, residents };

    @readonly : true
    entity Species         as projection on StarWars.Species
                              excluding { films, people };

    @readonly : true
    entity Starship        as projection on StarWars.Starship
                              excluding { films, pilots };

    @readonly : true
    entity Vehicles        as projection on StarWars.Vehicles
                              excluding { films, pilots };

    @readonly : true
    entity Vehicle @(cds.redirection.target : false)
                           as projection on StarWars.Vehicles
                              excluding { films, pilots };

    entity Show2People     as projection on StarWars.Show2People {
        * , people : redirected to People, show : redirected to Show
    };

    @readonly : true
    entity Show2Planets    as projection on StarWars.Show2Planets;

    @readonly : true
    entity Show2Starships  as projection on StarWars.Show2Starships;

    @readonly : true
    entity Show2Species    as projection on StarWars.Show2Species;

    @readonly : true
    entity Show2Vehicles   as projection on StarWars.Show2Vehicles;

    @readonly : true
    entity Media as projection on StarWars.Media {
        *,
        virtual edit_url : String
    };

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

    @readonly entity MediaTypeValues as SELECT DISTINCT key media_type FROM StarWars.Media WHERE media_type IS NOT NULL;
    @readonly entity ShowTypeValues  as SELECT DISTINCT key show_type  FROM StarWars.Show  WHERE show_type  IS NOT NULL;
    @readonly entity NetworkValues   as SELECT DISTINCT key network    FROM StarWars.Show  WHERE network    IS NOT NULL;
}
