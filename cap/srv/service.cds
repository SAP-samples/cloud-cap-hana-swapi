using {star.wars as StarWars} from '../db/schema';

service StarWarsService @(path : '/StarWars') {
    entity Film @(odata.draft.enabled : true)     as projection on StarWars.Film;
    entity People @(odata.draft.enabled : true)   as projection on StarWars.People;
    entity Planet @(odata.draft.enabled : true)   as projection on StarWars.Planet;
    entity Species @(odata.draft.enabled : true)  as projection on StarWars.Species;
    entity Starship @(odata.draft.enabled : true) as projection on StarWars.Starship;
    entity Vehicles @(odata.draft.enabled : true) as projection on StarWars.Vehicles;
    entity Film2People                            as projection on StarWars.Film2People;
    entity Film2Planets                           as projection on StarWars.Film2Planets;
    entity Film2Starships                         as projection on StarWars.Film2Starships;
    entity Film2Vehicles                          as projection on StarWars.Film2Vehicles;
    entity Film2Species                           as projection on StarWars.Film2Species;
    entity Planet2People                          as projection on StarWars.Planet2People;
    entity Species2People                         as projection on StarWars.Species2People;
    entity Starship2Pilot                         as projection on StarWars.Starship2Pilot;
    entity Vehicle2Pilot                          as projection on StarWars.Vehicle2Pilot;
}
