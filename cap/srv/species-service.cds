using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Alien Species'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsSpecies @(path : 'StarWarsSpecies') {
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

    @readonly : true
    entity Vehicle @(cds.redirection.target : false) as projection on StarWars.Vehicles;

    entity Film2Species   as projection on StarWars.Film2Species {
        // Keep both `specie` (source naming) and `species` (consumer-friendly alias)
        * , specie : redirected to Species, specie as species : redirected to Species
    };

    entity Species2People as projection on StarWars.Species2People {
        * , people : redirected to People, species : redirected to Species
    }
    @readonly : true
    entity hairColorValues as projection on StarWars.hairColorValues;

    @readonly : true
    entity eyeColorValues as projection on StarWars.eyeColorValues;

    @readonly : true
    entity skinColorValues as projection on StarWars.skinColorValues;

    @readonly : true
    entity classificationValues as projection on StarWars.classificationValues;

    @readonly : true
    entity designationValues as projection on StarWars.designationValues;

    @readonly : true
    entity languageValues as projection on StarWars.languageValues;
}
