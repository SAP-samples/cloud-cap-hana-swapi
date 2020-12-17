using {star.wars as StarWars} from '../db/schema';

service StarWarsStarship @(path : '/StarWarsStarship') {
    @odata.draft.enabled : true
    entity Starship       as projection on StarWars.Starship;

    @readonly : true
    entity Film           as projection on StarWars.Film;

    @readonly : true
    entity People         as projection on StarWars.People

    @readonly : true
    entity Planet         as projection on StarWars.Planet

    entity Film2Starships as projection on StarWars.Film2Starships {
        * , starship : redirected to Starship
    }


    entity Starship2Pilot as projection on StarWars.Starship2Pilot {
        * , pilot : redirected to People, starship : redirected to Starship
    }

    @readonly : true
    entity ssModels       as projection on StarWars.ssModels;

    @readonly : true
    entity ssClass        as projection on StarWars.ssClass;

    @readonly : true
    entity ssManufacturer as projection on StarWars.ssManufacturer;
}
