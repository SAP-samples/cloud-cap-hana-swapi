// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as _star_wars from './../star/wars';
import * as __ from './../_';

export default class {
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
export class Vehicle extends _VehicleAspect(__.Entity) {static drafts: __.DraftOf<Vehicle>}
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsVehicle.Vehicles' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicles extends Array<Vehicle> {static drafts: __.DraftsOf<Vehicle>
$count?: number}
Object.defineProperty(Vehicles, 'name', { value: 'StarWarsVehicle.Vehicles' })

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
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsVehicle.Vehicle' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicle_ extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicle_, 'name', { value: 'StarWarsVehicle.Vehicle' })

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
Object.defineProperty(Film, 'name', { value: 'StarWarsVehicle.Film' })
Object.defineProperty(Film, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class Film_ extends Array<Film> {$count?: number}
Object.defineProperty(Film_, 'name', { value: 'StarWarsVehicle.Film' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<People>;
    declare static readonly elements: __.ElementsOf<People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class People extends _PeopleAspect(__.Entity) {}
Object.defineProperty(People, 'name', { value: 'StarWarsVehicle.People' })
Object.defineProperty(People, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class People_ extends Array<People> {$count?: number}
Object.defineProperty(People_, 'name', { value: 'StarWarsVehicle.People' })

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
Object.defineProperty(Planet, 'name', { value: 'StarWarsVehicle.Planet' })
Object.defineProperty(Planet, 'is_singular', { value: true })
export class Planet_ extends Array<Planet> {$count?: number}
Object.defineProperty(Planet_, 'name', { value: 'StarWarsVehicle.Planet' })

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
Object.defineProperty(Starship, 'name', { value: 'StarWarsVehicle.Starship' })
Object.defineProperty(Starship, 'is_singular', { value: true })
export class Starship_ extends Array<Starship> {$count?: number}
Object.defineProperty(Starship_, 'name', { value: 'StarWarsVehicle.Starship' })

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
export class Film2Vehicle extends _Film2VehicleAspect(__.Entity) {static drafts: __.DraftOf<Film2Vehicle>}
Object.defineProperty(Film2Vehicle, 'name', { value: 'StarWarsVehicle.Film2Vehicles' })
Object.defineProperty(Film2Vehicle, 'is_singular', { value: true })
export class Film2Vehicles extends Array<Film2Vehicle> {static drafts: __.DraftsOf<Film2Vehicle>
$count?: number}
Object.defineProperty(Film2Vehicles, 'name', { value: 'StarWarsVehicle.Film2Vehicles' })

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
Object.defineProperty(Vehicle2Pilot, 'name', { value: 'StarWarsVehicle.Vehicle2Pilot' })
Object.defineProperty(Vehicle2Pilot, 'is_singular', { value: true })
export class Vehicle2Pilot_ extends Array<Vehicle2Pilot> {static drafts: __.DraftsOf<Vehicle2Pilot>
$count?: number}
Object.defineProperty(Vehicle2Pilot_, 'name', { value: 'StarWarsVehicle.Vehicle2Pilot' })

export function _vModelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class vModel extends Base {
    declare model?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<vModel>;
    declare static readonly elements: __.ElementsOf<vModel>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class vModel extends _vModelAspect(__.Entity) {}
Object.defineProperty(vModel, 'name', { value: 'StarWarsVehicle.vModels' })
Object.defineProperty(vModel, 'is_singular', { value: true })
export class vModels extends Array<vModel> {$count?: number}
Object.defineProperty(vModels, 'name', { value: 'StarWarsVehicle.vModels' })

export function _vClasAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class vClas extends Base {
    declare vehicle_class?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<vClas>;
    declare static readonly elements: __.ElementsOf<vClas>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class vClas extends _vClasAspect(__.Entity) {}
Object.defineProperty(vClas, 'name', { value: 'StarWarsVehicle.vClass' })
Object.defineProperty(vClas, 'is_singular', { value: true })
export class vClass extends Array<vClas> {$count?: number}
Object.defineProperty(vClass, 'name', { value: 'StarWarsVehicle.vClass' })

export function _vManufacturerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class vManufacturer extends Base {
    declare manufacturer?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<vManufacturer>;
    declare static readonly elements: __.ElementsOf<vManufacturer>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class vManufacturer extends _vManufacturerAspect(__.Entity) {}
Object.defineProperty(vManufacturer, 'name', { value: 'StarWarsVehicle.vManufacturer' })
Object.defineProperty(vManufacturer, 'is_singular', { value: true })
export class vManufacturer_ extends Array<vManufacturer> {$count?: number}
Object.defineProperty(vManufacturer_, 'name', { value: 'StarWarsVehicle.vManufacturer' })

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
export class Film2People extends _Film2PeopleAspect(__.Entity) {}
Object.defineProperty(Film2People, 'name', { value: 'StarWarsVehicle.Film2People' })
Object.defineProperty(Film2People, 'is_singular', { value: true })
export class Film2People_ extends Array<Film2People> {$count?: number}
Object.defineProperty(Film2People_, 'name', { value: 'StarWarsVehicle.Film2People' })

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
Object.defineProperty(Film2Planet, 'name', { value: 'StarWarsVehicle.Film2Planets' })
Object.defineProperty(Film2Planet, 'is_singular', { value: true })
export class Film2Planets extends Array<Film2Planet> {$count?: number}
Object.defineProperty(Film2Planets, 'name', { value: 'StarWarsVehicle.Film2Planets' })

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
Object.defineProperty(Film2Starship, 'name', { value: 'StarWarsVehicle.Film2Starships' })
Object.defineProperty(Film2Starship, 'is_singular', { value: true })
export class Film2Starships extends Array<Film2Starship> {$count?: number}
Object.defineProperty(Film2Starships, 'name', { value: 'StarWarsVehicle.Film2Starships' })

export function _Film2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Species extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare specie?: __.Association.to<_star_wars.Species> | null
    declare specie_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Species>;
    declare static readonly elements: __.ElementsOf<Film2Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Film2Species extends _Film2SpeciesAspect(__.Entity) {}
Object.defineProperty(Film2Species, 'name', { value: 'StarWarsVehicle.Film2Species' })
Object.defineProperty(Film2Species, 'is_singular', { value: true })
export class Film2Species_ extends Array<Film2Species> {$count?: number}
Object.defineProperty(Film2Species_, 'name', { value: 'StarWarsVehicle.Film2Species' })

export function _Species2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Species2People extends Base {
    declare ID?: __.Key<string>
    declare species?: __.Association.to<_star_wars.Species> | null
    declare species_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species2People>;
    declare static readonly elements: __.ElementsOf<Species2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Species2People extends _Species2PeopleAspect(__.Entity) {}
Object.defineProperty(Species2People, 'name', { value: 'StarWarsVehicle.Species2People' })
Object.defineProperty(Species2People, 'is_singular', { value: true })
export class Species2People_ extends Array<Species2People> {$count?: number}
Object.defineProperty(Species2People_, 'name', { value: 'StarWarsVehicle.Species2People' })

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
export class Starship2Pilot extends _Starship2PilotAspect(__.Entity) {}
Object.defineProperty(Starship2Pilot, 'name', { value: 'StarWarsVehicle.Starship2Pilot' })
Object.defineProperty(Starship2Pilot, 'is_singular', { value: true })
export class Starship2Pilot_ extends Array<Starship2Pilot> {$count?: number}
Object.defineProperty(Starship2Pilot_, 'name', { value: 'StarWarsVehicle.Starship2Pilot' })

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
Object.defineProperty(Planet2People, 'name', { value: 'StarWarsVehicle.Planet2People' })
Object.defineProperty(Planet2People, 'is_singular', { value: true })
export class Planet2People_ extends Array<Planet2People> {$count?: number}
Object.defineProperty(Planet2People_, 'name', { value: 'StarWarsVehicle.Planet2People' })
