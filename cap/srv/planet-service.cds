using {star.wars as StarWars} from '../db/schema';

service StarWarsPlanet @(path : '/StarWarsPlanet') {

    @odata.draft.enabled : true
    entity Planet        as projection on StarWars.Planet;

    @readonly : true
    entity People        as projection on StarWars.People {*, homeworld : redirected to Planet};

    @readonly : true
    entity Film          as projection on StarWars.Film;


    entity Film2Planets  as projection on StarWars.Film2Planets {
        * , film : redirected to Film, planet : redirected to Planet
    };

    entity Planet2People as projection on StarWars.Planet2People {
        * , people : redirected to People, planet : redirected to Planet
    };


    @readonly : true
    entity climate       as projection on StarWars.climate;

    @readonly : true
    entity terrain       as projection on StarWars.terrain;

}
