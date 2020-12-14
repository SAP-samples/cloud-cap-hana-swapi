using {star.wars as StarWars} from '../db/schema';

service StarWarsService @(path : '/StarWars') {
    @odata.draft.enabled : true
    entity Film           as projection on StarWars.Film;

    @odata.draft.enabled : true
    entity People         as projection on StarWars.People;

    entity Planet         as projection on StarWars.Planet;
    entity Species        as projection on StarWars.Species;
    entity Starship       as projection on StarWars.Starship;
    entity Vehicles       as projection on StarWars.Vehicles;
    entity genders        as projection on StarWars.genders;
    entity hairColors     as projection on StarWars.hairColors;
    entity eyeColors      as projection on StarWars.eyeColors;
    entity skinColors     as projection on StarWars.skinColors;

    entity Film2People    as projection on StarWars.Film2People {
        * , people : redirected to People
    };

    entity Film2Planets   as projection on StarWars.Film2Planets;
    entity Film2Starships as projection on StarWars.Film2Starships;
    entity Film2Vehicles  as projection on StarWars.Film2Vehicles;
    entity Film2Species   as projection on StarWars.Film2Species;

    entity Planet2People  as projection on StarWars.Planet2People {
        * , people : redirected to People
    };

    entity Species2People as projection on StarWars.Species2People {
        * , people : redirected to People
    };

    entity Starship2Pilot as projection on StarWars.Starship2Pilot {
        * , pilot : redirected to People
    };

    entity Vehicle2Pilot  as projection on StarWars.Vehicle2Pilot {
        * , pilot : redirected to People
    };
}
