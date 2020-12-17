using {star.wars as StarWars} from '../db/schema';

service StarWarsSpecies @(path : '/StarWarsSpecies') {
    @odata.draft.enabled : true
    entity Species        as projection on StarWars.Species {
        * , homeworld : redirected to Planet
    };

    @readonly : true
    entity Planet         as projection on StarWars.Planet;

    @readonly : true
    entity Film           as projection on StarWars.Film;

    @readonly : true
    entity People         as projection on StarWars.People {
        * , homeworld : redirected to Planet
    };

    entity Film2Species   as projection on StarWars.Film2Species {
        * , specie : redirected to Species
    };

    entity Species2People as projection on StarWars.Species2People {
        * , people : redirected to People, species : redirected to Species
    }

    @readonly : true
    entity hair_colors    as projection on StarWars.hair_colors;

    @readonly : true
    entity eye_colors     as projection on StarWars.eye_colors;

    @readonly : true
    entity skin_colors    as projection on StarWars.skin_colors;


    @readonly : true
    entity classification as projection on StarWars.classification;

    @readonly : true
    entity designation    as projection on StarWars.designation;

    @readonly : true
    entity language       as projection on StarWars.language;
}
