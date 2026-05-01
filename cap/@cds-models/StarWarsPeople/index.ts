// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';
import * as _star_wars from './../star/wars';

export default class {
  /**
  * Showcase: unbound function — returns the count of characters matching the given gender.
  * No entity binding; runs custom handler logic in people-service.js.
  * HTTP example: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
  */
  declare static readonly countByGender: typeof countByGender;
}

// enum
const Film_episode_id = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  OTHER: 0,
} as const;
type Film_episode_id = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 0

// enum
const ChangeView_modification = {
  Create: "create",
  Update: "update",
  Delete: "delete",
} as const;
type ChangeView_modification = "create" | "update" | "delete"

export function _FilmAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare title?: string | null
    declare episode_id?: Film_episode_id | null
    declare opening_crawl?: string | null
    declare director?: string | null
    declare producer?: string | null
    declare release_date?: __.CdsDate | null
    declare characters?: __.Composition.of.many<Film2People_>
    declare planets?: __.Composition.of.many<Film2Planets>
    declare starships?: __.Composition.of.many<Film2Starships>
    declare vehicles?: __.Composition.of.many<Film2Vehicles>
    declare species?: __.Composition.of.many<Film2Species_>
    static episode_id = Film_episode_id;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film>;
    declare static readonly elements: __.ElementsOf<Film>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Films in the Star Wars Skywalker Saga */
export class Film extends _FilmAspect(__.Entity) {}
Object.defineProperty(Film, 'name', { value: 'StarWarsPeople.Film' })
Object.defineProperty(Film, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class Film_ extends Array<Film> {$count?: number}
Object.defineProperty(Film_, 'name', { value: 'StarWarsPeople.Film' })

export function _PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class People extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare height?: _star_wars.IntegerLikeString | null
    declare mass?: _star_wars.NumericString | null
    declare hair_color?: string | null
    declare skin_color?: string | null
    declare eye_color?: string | null
    declare birth_year?: _star_wars.YearString | null
    declare gender?: string | null
    declare scoundrel?: boolean | null
    declare homeworld?: __.Association.to<Planet> | null
    declare homeworld_ID?: string | null
    declare films?: __.Composition.of.many<Film2People_>
    declare species?: __.Composition.of.many<Species2People_>
    declare vehicles?: __.Composition.of.many<Vehicle2Pilot_>
    declare starships?: __.Composition.of.many<Starship2Pilot_>
    /**
    * Showcase: virtual element — not persisted, computed in the after-READ handler.
    * Pattern: <name> (<birth_year>) e.g. "Luke Skywalker (19BBY)"
    */
    declare displayTitle?: string | null
    declare episodes?: __.Association.to.many<Episode2People_>
    declare changes?: __.Association.to.many<ChangeView_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<People>;
    declare static readonly elements: __.ElementsOf<People>;
    declare static readonly actions: {
      rename:  {
        // positional
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
(newName: string): People
        // named
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
({newName}: {newName: string}): People
        // metadata (do not use)
        __parameters: {newName: string}, __returns: People, __self: People
        kind: 'action'
      }
    };
  };
}
/** All People and Aliens in Star Wars */
export class People extends _PeopleAspect(__.Entity) {static drafts: __.DraftOf<People>}
Object.defineProperty(People, 'name', { value: 'StarWarsPeople.People' })
Object.defineProperty(People, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class People_ extends Array<People> {static drafts: __.DraftsOf<People>
$count?: number}
Object.defineProperty(People_, 'name', { value: 'StarWarsPeople.People' })

export function _PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Planet extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare diameter?: _star_wars.IntegerLikeString | null
    declare rotation_period?: _star_wars.IntegerLikeString | null
    declare orbital_period?: _star_wars.IntegerLikeString | null
    declare gravity?: string | null
    declare population?: _star_wars.IntegerLikeString | null
    declare climate?: string | null
    declare terrain?: string | null
    declare surface_water?: _star_wars.IntegerLikeString | null
    declare films?: __.Composition.of.many<Film2Planets>
    declare residents?: __.Composition.of.many<Planet2People_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Planet>;
    declare static readonly elements: __.ElementsOf<Planet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Planet extends _PlanetAspect(__.Entity) {}
Object.defineProperty(Planet, 'name', { value: 'StarWarsPeople.Planet' })
Object.defineProperty(Planet, 'is_singular', { value: true })
export class Planet_ extends Array<Planet> {$count?: number}
Object.defineProperty(Planet_, 'name', { value: 'StarWarsPeople.Planet' })

export function _SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Species extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare classification?: string | null
    declare designation?: string | null
    declare average_height?: _star_wars.IntegerLikeString | null
    declare average_lifespan?: _star_wars.IntegerLikeString | null
    declare hair_colors?: string | null
    declare skin_colors?: string | null
    declare eye_colors?: string | null
    declare homeworld?: __.Association.to<Planet> | null
    declare homeworld_ID?: string | null
    declare language?: string | null
    declare people?: __.Composition.of.many<Species2People_>
    declare films?: __.Composition.of.many<Film2Species_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species>;
    declare static readonly elements: __.ElementsOf<Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Species extends _SpeciesAspect(__.Entity) {}
Object.defineProperty(Species, 'name', { value: 'StarWarsPeople.Species' })
Object.defineProperty(Species, 'is_singular', { value: true })
export class Species_ extends Array<Species> {$count?: number}
Object.defineProperty(Species_, 'name', { value: 'StarWarsPeople.Species' })

export function _StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Starship extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare model?: string | null
    declare starship_class?: string | null
    declare manufacturer?: string | null
    declare cost_in_credits?: _star_wars.IntegerLikeString | null
    declare length?: _star_wars.NumericString | null
    declare crew?: _star_wars.IntegerLikeString | null
    declare passengers?: _star_wars.IntegerLikeString | null
    declare max_atmosphering_speed?: _star_wars.IntegerLikeString | null
    declare hyperdrive_rating?: _star_wars.NumericString | null
    declare MGLT?: _star_wars.IntegerLikeString | null
    declare cargo_capacity?: _star_wars.IntegerLikeString | null
    declare consumables?: string | null
    declare films?: __.Composition.of.many<Film2Starships>
    declare pilots?: __.Composition.of.many<Starship2Pilot_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Starship>;
    declare static readonly elements: __.ElementsOf<Starship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Starship extends _StarshipAspect(__.Entity) {}
Object.defineProperty(Starship, 'name', { value: 'StarWarsPeople.Starship' })
Object.defineProperty(Starship, 'is_singular', { value: true })
export class Starship_ extends Array<Starship> {$count?: number}
Object.defineProperty(Starship_, 'name', { value: 'StarWarsPeople.Starship' })

export function _VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Vehicle extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare model?: string | null
    declare vehicle_class?: string | null
    declare manufacturer?: string | null
    declare cost_in_credits?: _star_wars.IntegerLikeString | null
    declare length?: _star_wars.NumericString | null
    declare crew?: _star_wars.IntegerLikeString | null
    declare passengers?: _star_wars.IntegerLikeString | null
    declare max_atmosphering_speed?: _star_wars.IntegerLikeString | null
    declare cargo_capacity?: _star_wars.IntegerLikeString | null
    declare consumables?: string | null
    declare films?: __.Composition.of.many<Film2Vehicles>
    declare pilots?: __.Composition.of.many<Vehicle2Pilot_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle>;
    declare static readonly elements: __.ElementsOf<Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Vehicle extends _VehicleAspect(__.Entity) {}
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsPeople.Vehicles' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicles extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicles, 'name', { value: 'StarWarsPeople.Vehicles' })

export function _VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Vehicle extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare name?: string | null
    declare model?: string | null
    declare vehicle_class?: string | null
    declare manufacturer?: string | null
    declare cost_in_credits?: _star_wars.IntegerLikeString | null
    declare length?: _star_wars.NumericString | null
    declare crew?: _star_wars.IntegerLikeString | null
    declare passengers?: _star_wars.IntegerLikeString | null
    declare max_atmosphering_speed?: _star_wars.IntegerLikeString | null
    declare cargo_capacity?: _star_wars.IntegerLikeString | null
    declare consumables?: string | null
    declare films?: __.Composition.of.many<Film2Vehicles>
    declare pilots?: __.Composition.of.many<Vehicle2Pilot_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle>;
    declare static readonly elements: __.ElementsOf<Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Vehicle extends _VehicleAspect(__.Entity) {}
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsPeople.Vehicle' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicle_ extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicle_, 'name', { value: 'StarWarsPeople.Vehicle' })

export function _genderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class gender extends Base {
    declare gender?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<gender>;
    declare static readonly elements: __.ElementsOf<gender>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class gender extends _genderAspect(__.Entity) {}
Object.defineProperty(gender, 'name', { value: 'StarWarsPeople.genders' })
Object.defineProperty(gender, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class genders extends Array<gender> {$count?: number}
Object.defineProperty(genders, 'name', { value: 'StarWarsPeople.genders' })

export function _hairColorAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class hairColor extends Base {
    declare hair_color?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<hairColor>;
    declare static readonly elements: __.ElementsOf<hairColor>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class hairColor extends _hairColorAspect(__.Entity) {}
Object.defineProperty(hairColor, 'name', { value: 'StarWarsPeople.hairColors' })
Object.defineProperty(hairColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class hairColors extends Array<hairColor> {$count?: number}
Object.defineProperty(hairColors, 'name', { value: 'StarWarsPeople.hairColors' })

export function _eyeColorAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class eyeColor extends Base {
    declare eye_color?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<eyeColor>;
    declare static readonly elements: __.ElementsOf<eyeColor>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class eyeColor extends _eyeColorAspect(__.Entity) {}
Object.defineProperty(eyeColor, 'name', { value: 'StarWarsPeople.eyeColors' })
Object.defineProperty(eyeColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class eyeColors extends Array<eyeColor> {$count?: number}
Object.defineProperty(eyeColors, 'name', { value: 'StarWarsPeople.eyeColors' })

export function _skinColorAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class skinColor extends Base {
    declare skin_color?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<skinColor>;
    declare static readonly elements: __.ElementsOf<skinColor>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class skinColor extends _skinColorAspect(__.Entity) {}
Object.defineProperty(skinColor, 'name', { value: 'StarWarsPeople.skinColors' })
Object.defineProperty(skinColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class skinColors extends Array<skinColor> {$count?: number}
Object.defineProperty(skinColors, 'name', { value: 'StarWarsPeople.skinColors' })

export function _peopleCountAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class peopleCount extends Base {
    declare name?: __.Key<string>
    declare people_count?: number | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<peopleCount>;
    declare static readonly elements: __.ElementsOf<peopleCount>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class peopleCount extends _peopleCountAspect(__.Entity) {}
Object.defineProperty(peopleCount, 'name', { value: 'StarWarsPeople.peopleCount' })
Object.defineProperty(peopleCount, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class peopleCount_ extends Array<peopleCount> {$count?: number}
Object.defineProperty(peopleCount_, 'name', { value: 'StarWarsPeople.peopleCount' })

export function _Film2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2People extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2People>;
    declare static readonly elements: __.ElementsOf<Film2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2People extends _Film2PeopleAspect(__.Entity) {static drafts: __.DraftOf<Film2People>}
Object.defineProperty(Film2People, 'name', { value: 'StarWarsPeople.Film2People' })
Object.defineProperty(Film2People, 'is_singular', { value: true })
export class Film2People_ extends Array<Film2People> {static drafts: __.DraftsOf<Film2People>
$count?: number}
Object.defineProperty(Film2People_, 'name', { value: 'StarWarsPeople.Film2People' })

export function _Episode2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2People extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2People>;
    declare static readonly elements: __.ElementsOf<Episode2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Episode2People extends _Episode2PeopleAspect(__.Entity) {}
Object.defineProperty(Episode2People, 'name', { value: 'StarWarsPeople.Episode2People' })
Object.defineProperty(Episode2People, 'is_singular', { value: true })
export class Episode2People_ extends Array<Episode2People> {$count?: number}
Object.defineProperty(Episode2People_, 'name', { value: 'StarWarsPeople.Episode2People' })

export function _EpisodeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode extends Base {
    declare ID?: __.Key<string>
    declare title?: string | null
    declare season_number?: number | null
    declare episode_number?: number | null
    declare air_date?: __.CdsDate | null
    declare director?: string | null
    declare writer?: string | null
    declare runtime?: number | null
    declare timeline?: string | null
    declare show?: __.Association.to<Show> | null
    declare show_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode>;
    declare static readonly elements: __.ElementsOf<Episode>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episode extends _EpisodeAspect(__.Entity) {}
Object.defineProperty(Episode, 'name', { value: 'StarWarsPeople.Episode' })
Object.defineProperty(Episode, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episode_ extends Array<Episode> {$count?: number}
Object.defineProperty(Episode_, 'name', { value: 'StarWarsPeople.Episode' })

export function _ShowAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show extends Base {
    declare ID?: __.Key<string>
    declare title?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show>;
    declare static readonly elements: __.ElementsOf<Show>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show extends _ShowAspect(__.Entity) {}
Object.defineProperty(Show, 'name', { value: 'StarWarsPeople.Show' })
Object.defineProperty(Show, 'is_singular', { value: true })
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show_ extends Array<Show> {$count?: number}
Object.defineProperty(Show_, 'name', { value: 'StarWarsPeople.Show' })

export function _Species2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Species2People extends Base {
    declare ID?: __.Key<string>
    declare species?: __.Association.to<Species> | null
    declare species_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species2People>;
    declare static readonly elements: __.ElementsOf<Species2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Species2People extends _Species2PeopleAspect(__.Entity) {static drafts: __.DraftOf<Species2People>}
Object.defineProperty(Species2People, 'name', { value: 'StarWarsPeople.Species2People' })
Object.defineProperty(Species2People, 'is_singular', { value: true })
export class Species2People_ extends Array<Species2People> {static drafts: __.DraftsOf<Species2People>
$count?: number}
Object.defineProperty(Species2People_, 'name', { value: 'StarWarsPeople.Species2People' })

export function _Starship2PilotAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Starship2Pilot extends Base {
    declare ID?: __.Key<string>
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    declare pilot?: __.Association.to<People> | null
    declare pilot_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Starship2Pilot>;
    declare static readonly elements: __.ElementsOf<Starship2Pilot>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Starship2Pilot extends _Starship2PilotAspect(__.Entity) {static drafts: __.DraftOf<Starship2Pilot>}
Object.defineProperty(Starship2Pilot, 'name', { value: 'StarWarsPeople.Starship2Pilot' })
Object.defineProperty(Starship2Pilot, 'is_singular', { value: true })
export class Starship2Pilot_ extends Array<Starship2Pilot> {static drafts: __.DraftsOf<Starship2Pilot>
$count?: number}
Object.defineProperty(Starship2Pilot_, 'name', { value: 'StarWarsPeople.Starship2Pilot' })

export function _Vehicle2PilotAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Vehicle2Pilot extends Base {
    declare ID?: __.Key<string>
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    declare pilot?: __.Association.to<People> | null
    declare pilot_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle2Pilot>;
    declare static readonly elements: __.ElementsOf<Vehicle2Pilot>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Vehicle2Pilot extends _Vehicle2PilotAspect(__.Entity) {static drafts: __.DraftOf<Vehicle2Pilot>}
Object.defineProperty(Vehicle2Pilot, 'name', { value: 'StarWarsPeople.Vehicle2Pilot' })
Object.defineProperty(Vehicle2Pilot, 'is_singular', { value: true })
export class Vehicle2Pilot_ extends Array<Vehicle2Pilot> {static drafts: __.DraftsOf<Vehicle2Pilot>
$count?: number}
Object.defineProperty(Vehicle2Pilot_, 'name', { value: 'StarWarsPeople.Vehicle2Pilot' })

export function _Film2PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Planet extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Planet>;
    declare static readonly elements: __.ElementsOf<Film2Planet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2Planet extends _Film2PlanetAspect(__.Entity) {}
Object.defineProperty(Film2Planet, 'name', { value: 'StarWarsPeople.Film2Planets' })
Object.defineProperty(Film2Planet, 'is_singular', { value: true })
export class Film2Planets extends Array<Film2Planet> {$count?: number}
Object.defineProperty(Film2Planets, 'name', { value: 'StarWarsPeople.Film2Planets' })

export function _Film2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Starship extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Starship>;
    declare static readonly elements: __.ElementsOf<Film2Starship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2Starship extends _Film2StarshipAspect(__.Entity) {}
Object.defineProperty(Film2Starship, 'name', { value: 'StarWarsPeople.Film2Starships' })
Object.defineProperty(Film2Starship, 'is_singular', { value: true })
export class Film2Starships extends Array<Film2Starship> {$count?: number}
Object.defineProperty(Film2Starships, 'name', { value: 'StarWarsPeople.Film2Starships' })

export function _Film2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Vehicle extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Vehicle>;
    declare static readonly elements: __.ElementsOf<Film2Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2Vehicle extends _Film2VehicleAspect(__.Entity) {}
Object.defineProperty(Film2Vehicle, 'name', { value: 'StarWarsPeople.Film2Vehicles' })
Object.defineProperty(Film2Vehicle, 'is_singular', { value: true })
export class Film2Vehicles extends Array<Film2Vehicle> {$count?: number}
Object.defineProperty(Film2Vehicles, 'name', { value: 'StarWarsPeople.Film2Vehicles' })

export function _Film2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Species extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare specie?: __.Association.to<Species> | null
    declare specie_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Species>;
    declare static readonly elements: __.ElementsOf<Film2Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2Species extends _Film2SpeciesAspect(__.Entity) {}
Object.defineProperty(Film2Species, 'name', { value: 'StarWarsPeople.Film2Species' })
Object.defineProperty(Film2Species, 'is_singular', { value: true })
export class Film2Species_ extends Array<Film2Species> {$count?: number}
Object.defineProperty(Film2Species_, 'name', { value: 'StarWarsPeople.Film2Species' })

export function _Planet2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Planet2People extends Base {
    declare ID?: __.Key<string>
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Planet2People>;
    declare static readonly elements: __.ElementsOf<Planet2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Planet2People extends _Planet2PeopleAspect(__.Entity) {}
Object.defineProperty(Planet2People, 'name', { value: 'StarWarsPeople.Planet2People' })
Object.defineProperty(Planet2People, 'is_singular', { value: true })
export class Planet2People_ extends Array<Planet2People> {$count?: number}
Object.defineProperty(Planet2People_, 'name', { value: 'StarWarsPeople.Planet2People' })

export function _ChangeViewAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ChangeView extends Base {
    declare ID?: __.Key<string>
    declare parent?: __.Association.to<ChangeView> | null
    declare parent_ID?: string | null
    declare children?: __.Composition.of.many<ChangeView_>
    declare locale?: string | null
    declare text?: string | null
    declare attribute?: string | null
    declare valueChangedFrom?: string | null
    declare valueChangedTo?: string | null
    declare valueChangedFromLabel?: string | null
    declare valueChangedToLabel?: string | null
    declare entity?: string | null
    declare entityKey?: string | null
    declare objectID?: string | null
    declare modification?: ChangeView_modification | null
    declare valueDataType?: string | null
    declare createdAt?: __.DeepRequired<_.managed>['createdAt'] | null
    /** Canonical user ID */
    declare createdBy?: __.DeepRequired<_.managed>['createdBy'] | null
    declare transactionID?: number | null
    declare attributeLabel?: string | null
    declare entityLabel?: string | null
    declare modificationLabel?: string | null
    declare valueChangedFromLabelDateTime?: __.CdsDateTime | null
    declare valueChangedFromLabelDateTimeWTZ?: __.CdsDateTime | null
    declare valueChangedFromLabelTime?: __.CdsTime | null
    declare valueChangedFromLabelDate?: __.CdsDate | null
    declare valueChangedFromLabelTimestamp?: __.CdsTimestamp | null
    declare valueChangedToLabelDateTime?: __.CdsDateTime | null
    declare valueChangedToLabelDateTimeWTZ?: __.CdsDateTime | null
    declare valueChangedToLabelTime?: __.CdsTime | null
    declare valueChangedToLabelDate?: __.CdsDate | null
    declare valueChangedToLabelTimestamp?: __.CdsTimestamp | null
    declare valueTimeZone?: string | null
    declare LimitedDescendantCount?: number | null
    declare DistanceFromRoot?: number | null
    declare DrillState?: string | null
    declare LimitedRank?: number | null
    declare parent_entityKey?: string | null
    declare parent_entity?: string | null
    declare parent_parent_entityKey?: string | null
    declare parent_parent_entity?: string | null
    static modification = ChangeView_modification;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ChangeView>;
    declare static readonly elements: __.ElementsOf<ChangeView>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class ChangeView extends _ChangeViewAspect(__.Entity) {}
Object.defineProperty(ChangeView, 'name', { value: 'StarWarsPeople.ChangeView' })
Object.defineProperty(ChangeView, 'is_singular', { value: true })
export class ChangeView_ extends Array<ChangeView> {$count?: number}
Object.defineProperty(ChangeView_, 'name', { value: 'StarWarsPeople.ChangeView' })

/**
* Showcase: unbound function — returns the count of characters matching the given gender.
* No entity binding; runs custom handler logic in people-service.js.
* HTTP example: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
*/
export declare const countByGender:  {
  // positional
  /**
* Showcase: unbound function — returns the count of characters matching the given gender.
* No entity binding; runs custom handler logic in people-service.js.
* HTTP example: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
*/
(gender: string | null): globalThis.Promise<number | null> | number | null
  // named
  /**
* Showcase: unbound function — returns the count of characters matching the given gender.
* No entity binding; runs custom handler logic in people-service.js.
* HTTP example: GET /odata/v4/StarWarsPeople/countByGender(gender='female')
*/
({gender}: {gender?: string | null}): globalThis.Promise<number | null> | number | null
  // metadata (do not use)
  __parameters: {gender?: string | null}, __returns: globalThis.Promise<number | null> | number | null, __self: never
  kind: 'function'
}