// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as _star_wars from './../star/wars';
import * as __ from './../_';

export default class {
}

export function _EpisodeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare show?: __.Association.to<_star_wars.Show> | null
    declare show_ID?: string | null
    declare title?: string | null
    declare season_number?: number | null
    declare episode_number?: number | null
    declare air_date?: __.CdsDate | null
    declare director?: string | null
    declare writer?: string | null
    declare runtime?: number | null
    declare timeline?: string | null
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
Object.defineProperty(Episode, 'name', { value: 'StarWarsEpisode.Episodes' })
Object.defineProperty(Episode, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episodes extends Array<Episode> {$count?: number}
Object.defineProperty(Episodes, 'name', { value: 'StarWarsEpisode.Episodes' })

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
Object.defineProperty(Episode2People, 'name', { value: 'StarWarsEpisode.Episode2People' })
Object.defineProperty(Episode2People, 'is_singular', { value: true })
export class Episode2People_ extends Array<Episode2People> {$count?: number}
Object.defineProperty(Episode2People_, 'name', { value: 'StarWarsEpisode.Episode2People' })

export function _Episode2PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Planet extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare planet?: __.Association.to<_star_wars.Planet> | null
    declare planet_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Planet>;
    declare static readonly elements: __.ElementsOf<Episode2Planet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Episode2Planet extends _Episode2PlanetAspect(__.Entity) {}
Object.defineProperty(Episode2Planet, 'name', { value: 'StarWarsEpisode.Episode2Planets' })
Object.defineProperty(Episode2Planet, 'is_singular', { value: true })
export class Episode2Planets extends Array<Episode2Planet> {$count?: number}
Object.defineProperty(Episode2Planets, 'name', { value: 'StarWarsEpisode.Episode2Planets' })

export function _Episode2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Starship extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Starship>;
    declare static readonly elements: __.ElementsOf<Episode2Starship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Episode2Starship extends _Episode2StarshipAspect(__.Entity) {}
Object.defineProperty(Episode2Starship, 'name', { value: 'StarWarsEpisode.Episode2Starships' })
Object.defineProperty(Episode2Starship, 'is_singular', { value: true })
export class Episode2Starships extends Array<Episode2Starship> {$count?: number}
Object.defineProperty(Episode2Starships, 'name', { value: 'StarWarsEpisode.Episode2Starships' })

export function _Episode2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Vehicle extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Vehicle>;
    declare static readonly elements: __.ElementsOf<Episode2Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Episode2Vehicle extends _Episode2VehicleAspect(__.Entity) {}
Object.defineProperty(Episode2Vehicle, 'name', { value: 'StarWarsEpisode.Episode2Vehicles' })
Object.defineProperty(Episode2Vehicle, 'is_singular', { value: true })
export class Episode2Vehicles extends Array<Episode2Vehicle> {$count?: number}
Object.defineProperty(Episode2Vehicles, 'name', { value: 'StarWarsEpisode.Episode2Vehicles' })

export function _Episode2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Species extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare specie?: __.Association.to<_star_wars.Species> | null
    declare specie_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Species>;
    declare static readonly elements: __.ElementsOf<Episode2Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Episode2Species extends _Episode2SpeciesAspect(__.Entity) {}
Object.defineProperty(Episode2Species, 'name', { value: 'StarWarsEpisode.Episode2Species' })
Object.defineProperty(Episode2Species, 'is_singular', { value: true })
export class Episode2Species_ extends Array<Episode2Species> {$count?: number}
Object.defineProperty(Episode2Species_, 'name', { value: 'StarWarsEpisode.Episode2Species' })

export function _CloneWarsChronologicalOrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CloneWarsChronologicalOrder extends Base {
    declare ID?: __.Key<string>
    declare show?: __.Association.to<_star_wars.Show> | null
    declare show_ID?: string | null
    declare title?: string | null
    declare season_number?: number | null
    declare episode_number?: number | null
    declare air_date?: __.CdsDate | null
    declare director?: string | null
    declare writer?: string | null
    declare runtime?: number | null
    declare timeline?: string | null
    declare chronological_order?: number | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CloneWarsChronologicalOrder>;
    declare static readonly elements: __.ElementsOf<CloneWarsChronologicalOrder>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class CloneWarsChronologicalOrder extends _CloneWarsChronologicalOrderAspect(__.Entity) {}
Object.defineProperty(CloneWarsChronologicalOrder, 'name', { value: 'StarWarsEpisode.CloneWarsChronologicalOrder' })
Object.defineProperty(CloneWarsChronologicalOrder, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class CloneWarsChronologicalOrder_ extends Array<CloneWarsChronologicalOrder> {$count?: number}
Object.defineProperty(CloneWarsChronologicalOrder_, 'name', { value: 'StarWarsEpisode.CloneWarsChronologicalOrder' })

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
    declare homeworld?: __.Association.to<_star_wars.Planet> | null
    declare homeworld_ID?: string | null
    declare films?: __.Composition.of.many<Film2People_>
    declare species?: __.Composition.of.many<Species2People_>
    declare vehicles?: __.Composition.of.many<Vehicle2Pilot_>
    declare starships?: __.Composition.of.many<Starship2Pilot_>
    declare shows?: __.Composition.of.many<Show2People_>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<People>;
    declare static readonly elements: __.ElementsOf<People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class People extends _PeopleAspect(__.Entity) {}
Object.defineProperty(People, 'name', { value: 'StarWarsEpisode.People' })
Object.defineProperty(People, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class People_ extends Array<People> {$count?: number}
Object.defineProperty(People_, 'name', { value: 'StarWarsEpisode.People' })

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
Object.defineProperty(Starship, 'name', { value: 'StarWarsEpisode.Starship' })
Object.defineProperty(Starship, 'is_singular', { value: true })
export class Starship_ extends Array<Starship> {$count?: number}
Object.defineProperty(Starship_, 'name', { value: 'StarWarsEpisode.Starship' })

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
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsEpisode.Vehicles' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicles extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicles, 'name', { value: 'StarWarsEpisode.Vehicles' })

export function _Film2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2People extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<_star_wars.Film> | null
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
Object.defineProperty(Film2People, 'name', { value: 'StarWarsEpisode.Film2People' })
Object.defineProperty(Film2People, 'is_singular', { value: true })
export class Film2People_ extends Array<Film2People> {$count?: number}
Object.defineProperty(Film2People_, 'name', { value: 'StarWarsEpisode.Film2People' })

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
Object.defineProperty(Species2People, 'name', { value: 'StarWarsEpisode.Species2People' })
Object.defineProperty(Species2People, 'is_singular', { value: true })
export class Species2People_ extends Array<Species2People> {$count?: number}
Object.defineProperty(Species2People_, 'name', { value: 'StarWarsEpisode.Species2People' })

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
export class Vehicle2Pilot extends _Vehicle2PilotAspect(__.Entity) {}
Object.defineProperty(Vehicle2Pilot, 'name', { value: 'StarWarsEpisode.Vehicle2Pilot' })
Object.defineProperty(Vehicle2Pilot, 'is_singular', { value: true })
export class Vehicle2Pilot_ extends Array<Vehicle2Pilot> {$count?: number}
Object.defineProperty(Vehicle2Pilot_, 'name', { value: 'StarWarsEpisode.Vehicle2Pilot' })

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
Object.defineProperty(Starship2Pilot, 'name', { value: 'StarWarsEpisode.Starship2Pilot' })
Object.defineProperty(Starship2Pilot, 'is_singular', { value: true })
export class Starship2Pilot_ extends Array<Starship2Pilot> {$count?: number}
Object.defineProperty(Starship2Pilot_, 'name', { value: 'StarWarsEpisode.Starship2Pilot' })

export function _Show2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2People extends Base {
    declare ID?: __.Key<string>
    declare show?: __.Association.to<_star_wars.Show> | null
    declare show_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2People>;
    declare static readonly elements: __.ElementsOf<Show2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2People extends _Show2PeopleAspect(__.Entity) {}
Object.defineProperty(Show2People, 'name', { value: 'StarWarsEpisode.Show2People' })
Object.defineProperty(Show2People, 'is_singular', { value: true })
export class Show2People_ extends Array<Show2People> {$count?: number}
Object.defineProperty(Show2People_, 'name', { value: 'StarWarsEpisode.Show2People' })

export function _Film2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Starship extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<_star_wars.Film> | null
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
Object.defineProperty(Film2Starship, 'name', { value: 'StarWarsEpisode.Film2Starships' })
Object.defineProperty(Film2Starship, 'is_singular', { value: true })
export class Film2Starships extends Array<Film2Starship> {$count?: number}
Object.defineProperty(Film2Starships, 'name', { value: 'StarWarsEpisode.Film2Starships' })

export function _Film2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Vehicle extends Base {
    declare ID?: __.Key<string>
    declare film?: __.Association.to<_star_wars.Film> | null
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
Object.defineProperty(Film2Vehicle, 'name', { value: 'StarWarsEpisode.Film2Vehicles' })
Object.defineProperty(Film2Vehicle, 'is_singular', { value: true })
export class Film2Vehicles extends Array<Film2Vehicle> {$count?: number}
Object.defineProperty(Film2Vehicles, 'name', { value: 'StarWarsEpisode.Film2Vehicles' })
