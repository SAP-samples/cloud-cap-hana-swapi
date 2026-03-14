using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Planets'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsPlanet @(path : 'StarWarsPlanet') {

    @odata.draft.enabled : true
    entity Planet        as projection on StarWars.Planet;

    @readonly : true
    entity People        as projection on StarWars.People {*, homeworld : redirected to Planet};

    @readonly : true
    entity Vehicle @(cds.redirection.target : false) as projection on StarWars.Vehicles;

    @readonly : true
    entity Film          as projection on StarWars.Film;


    entity Film2Planets  as projection on StarWars.Film2Planets {
        * , film : redirected to Film, planet : redirected to Planet
    };

    entity Planet2People as projection on StarWars.Planet2People {
        * , people : redirected to People, planet : redirected to Planet
    };
    @readonly : true
    entity climateValues as projection on StarWars.climateValues;

    @readonly : true
    entity terrainValues as projection on StarWars.terrainValues;

}
