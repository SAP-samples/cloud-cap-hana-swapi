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
        * ,
        homeworld         : redirected to Planet,
        /**
         * Showcase: virtual element — not persisted, computed in the after-READ handler.
         * Pattern: <name> (<birth_year>) e.g. "Luke Skywalker (19BBY)"
         */
        virtual displayTitle : String
    } actions {
        /**
         * Showcase: bound action — renames this character and emits a People.Changed.v1 event.
         * Bound to a single People instance; the entity key is available in req.params[0].
         * Handler: people-service.js  →  this.on('rename', 'People', ...)
         * HTTP example: POST /odata/v4/StarWarsPeople/People(<ID>)/rename  { "newName": "..." }
                 *
                 * To restrict to authenticated users only, add:  @requires: 'authenticated-user'
                 * To restrict to a specific role, add:           @requires: 'Editor'
                 * See: labs/lab-04-auth/README.md (stretch exercise)
         */
        action rename (newName : String not null) returns People;
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
    entity Vehicle @(cds.redirection.target : false)   as projection on StarWars.Vehicles;

    @readonly : true
    entity genders @(cds.redirection.target : false)    as projection on StarWars.genders;

    @readonly : true
    entity hairColors @(cds.redirection.target : false) as projection on StarWars.hairColors;

    @readonly : true
    entity eyeColors @(cds.redirection.target : false)  as projection on StarWars.eyeColors;

    @readonly : true
    entity skinColors @(cds.redirection.target : false) as projection on StarWars.skinColors;

    @readonly : true
    entity peopleCount @(cds.redirection.target : false) as select from StarWars.peopleCount {
        key name,
            people_count
    };

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

    /**
     * Showcase: unbound function — returns the count of characters matching the given gender.
     * No entity binding; runs custom handler logic in people-service.js.
     * HTTP example: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
     */
    function countByGender (gender : String) returns Integer;
}
