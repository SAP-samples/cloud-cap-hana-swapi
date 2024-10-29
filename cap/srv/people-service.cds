using {star.wars as StarWars} from '../db/schema';

@AsyncAPI.Title        : 'Star Wars People Events'
@AsyncAPI.SchemaVersion: '1.0.0'
@AsyncAPI.Description  : 'Events emitted by the Star Wars People Service'
@title : 'Star Wars Characters'
@Core.LongDescription: 'A long time ago in a galaxy far, far away...'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsPeople @(path : 'StarWarsPeople') {
  @AsyncAPI.EventSpecVersion    : '2.0'
  @AsyncAPI.EventCharacteristics: {
    ![state-transfer]: 'full-after-image'
  }
  @AsyncAPI.EventSchemaVersion       : '1.0.0'

    @readonly : true
    entity Film                                         as projection on StarWars.Film;

    @odata.draft.enabled : true
    entity People @(cds.redirection.target : false)     as projection on StarWars.People {
        * , homeworld : redirected to Planet
    };

    event People.Changed.v1 : projection on StarWarsPeople.People;
    @readonly : true
    entity Planet                                       as projection on StarWars.Planet;

    @readonly : true
    entity Species                                      as projection on StarWars.Species;

    @readonly : true
    entity Starship                                     as projection on StarWars.Starship;

    @readonly : true
    entity Vehicles                                     as projection on StarWars.Vehicles;

    @readonly : true
    entity genders @(cds.redirection.target : false)    as projection on StarWars.genders;

    @readonly : true
    entity hairColors @(cds.redirection.target : false) as projection on StarWars.hairColors;

    @readonly : true
    entity eyeColors @(cds.redirection.target : false)  as projection on StarWars.eyeColors;

    @readonly : true
    entity skinColors @(cds.redirection.target : false) as projection on StarWars.skinColors;


    entity Film2People                                  as projection on StarWars.Film2People {
        * , people : redirected to People
    };

    entity Species2People                               as projection on StarWars.Species2People {
        * , people : redirected to People
    };

    entity Starship2Pilot                               as projection on StarWars.Starship2Pilot {
        * , pilot : redirected to People
    };

    entity Vehicle2Pilot                                as projection on StarWars.Vehicle2Pilot {
        * , pilot : redirected to People
    };
}
