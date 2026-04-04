// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './..';
import * as __ from './../_';
import * as _star_wars from './../star/wars';

export default class {
}

// enum
const Show_show_type = {
  LIVE_ACTION_SERIES: "LIVE_ACTION_SERIES",
  ANIMATED_SERIES: "ANIMATED_SERIES",
  ANIMATED_FILM: "ANIMATED_FILM",
  ANTHOLOGY: "ANTHOLOGY",
} as const;
type Show_show_type = "LIVE_ACTION_SERIES" | "ANIMATED_SERIES" | "ANIMATED_FILM" | "ANTHOLOGY"

// enum
const Media_episode_id = {
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
type Media_episode_id = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 0

// enum
const ShowTypeValue_show_type = {
  LIVE_ACTION_SERIES: "LIVE_ACTION_SERIES",
  ANIMATED_SERIES: "ANIMATED_SERIES",
  ANIMATED_FILM: "ANIMATED_FILM",
  ANTHOLOGY: "ANTHOLOGY",
} as const;
type ShowTypeValue_show_type = "LIVE_ACTION_SERIES" | "ANIMATED_SERIES" | "ANIMATED_FILM" | "ANTHOLOGY"

export function _ShowAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare title?: string | null
    declare show_type?: Show_show_type | null
    declare seasons?: number | null
    declare episode_count?: number | null
    declare network?: string | null
    declare director?: string | null
    declare producer?: string | null
    declare release_date?: __.CdsDate | null
    declare characters?: __.Composition.of.many<Show2People_>
    declare episodes?: __.Composition.of.many<Episode_>
    static show_type = Show_show_type;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show>;
    declare static readonly elements: __.ElementsOf<Show>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show extends _ShowAspect(__.Entity) {static drafts: __.DraftOf<Show>}
Object.defineProperty(Show, 'name', { value: 'StarWarsShow.Show' })
Object.defineProperty(Show, 'is_singular', { value: true })
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show_ extends Array<Show> {static drafts: __.DraftsOf<Show>
$count?: number}
Object.defineProperty(Show_, 'name', { value: 'StarWarsShow.Show' })

export function _EpisodeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode extends Base {
    declare ID?: __.Key<string>
    declare createdAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare createdBy?: _.User | null
    declare modifiedAt?: __.CdsTimestamp | null
    /** Canonical user ID */
    declare modifiedBy?: _.User | null
    declare show?: __.Association.to<Show> | null
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
export class Episode extends _EpisodeAspect(__.Entity) {static drafts: __.DraftOf<Episode>}
Object.defineProperty(Episode, 'name', { value: 'StarWarsShow.Episode' })
Object.defineProperty(Episode, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episode_ extends Array<Episode> {static drafts: __.DraftsOf<Episode>
$count?: number}
Object.defineProperty(Episode_, 'name', { value: 'StarWarsShow.Episode' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<People>;
    declare static readonly elements: __.ElementsOf<People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class People extends _PeopleAspect(__.Entity) {}
Object.defineProperty(People, 'name', { value: 'StarWarsShow.People' })
Object.defineProperty(People, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class People_ extends Array<People> {$count?: number}
Object.defineProperty(People_, 'name', { value: 'StarWarsShow.People' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Planet>;
    declare static readonly elements: __.ElementsOf<Planet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Planet extends _PlanetAspect(__.Entity) {}
Object.defineProperty(Planet, 'name', { value: 'StarWarsShow.Planet' })
Object.defineProperty(Planet, 'is_singular', { value: true })
export class Planet_ extends Array<Planet> {$count?: number}
Object.defineProperty(Planet_, 'name', { value: 'StarWarsShow.Planet' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species>;
    declare static readonly elements: __.ElementsOf<Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Species extends _SpeciesAspect(__.Entity) {}
Object.defineProperty(Species, 'name', { value: 'StarWarsShow.Species' })
Object.defineProperty(Species, 'is_singular', { value: true })
export class Species_ extends Array<Species> {$count?: number}
Object.defineProperty(Species_, 'name', { value: 'StarWarsShow.Species' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Starship>;
    declare static readonly elements: __.ElementsOf<Starship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Starship extends _StarshipAspect(__.Entity) {}
Object.defineProperty(Starship, 'name', { value: 'StarWarsShow.Starship' })
Object.defineProperty(Starship, 'is_singular', { value: true })
export class Starship_ extends Array<Starship> {$count?: number}
Object.defineProperty(Starship_, 'name', { value: 'StarWarsShow.Starship' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle>;
    declare static readonly elements: __.ElementsOf<Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Vehicle extends _VehicleAspect(__.Entity) {}
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsShow.Vehicles' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicles extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicles, 'name', { value: 'StarWarsShow.Vehicles' })

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
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle>;
    declare static readonly elements: __.ElementsOf<Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Vehicle extends _VehicleAspect(__.Entity) {}
Object.defineProperty(Vehicle, 'name', { value: 'StarWarsShow.Vehicle' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicle_ extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicle_, 'name', { value: 'StarWarsShow.Vehicle' })

export function _Show2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2People extends Base {
    declare ID?: __.Key<string>
    declare show?: __.Association.to<Show> | null
    declare show_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2People>;
    declare static readonly elements: __.ElementsOf<Show2People>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2People extends _Show2PeopleAspect(__.Entity) {static drafts: __.DraftOf<Show2People>}
Object.defineProperty(Show2People, 'name', { value: 'StarWarsShow.Show2People' })
Object.defineProperty(Show2People, 'is_singular', { value: true })
export class Show2People_ extends Array<Show2People> {static drafts: __.DraftsOf<Show2People>
$count?: number}
Object.defineProperty(Show2People_, 'name', { value: 'StarWarsShow.Show2People' })

export function _Show2PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2Planet extends Base {
    declare show_ID?: __.Key<string>
    declare planet_ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2Planet>;
    declare static readonly elements: __.ElementsOf<Show2Planet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2Planet extends _Show2PlanetAspect(__.Entity) {}
Object.defineProperty(Show2Planet, 'name', { value: 'StarWarsShow.Show2Planets' })
Object.defineProperty(Show2Planet, 'is_singular', { value: true })
export class Show2Planets extends Array<Show2Planet> {$count?: number}
Object.defineProperty(Show2Planets, 'name', { value: 'StarWarsShow.Show2Planets' })

export function _Show2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2Starship extends Base {
    declare show_ID?: __.Key<string>
    declare starship_ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2Starship>;
    declare static readonly elements: __.ElementsOf<Show2Starship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2Starship extends _Show2StarshipAspect(__.Entity) {}
Object.defineProperty(Show2Starship, 'name', { value: 'StarWarsShow.Show2Starships' })
Object.defineProperty(Show2Starship, 'is_singular', { value: true })
export class Show2Starships extends Array<Show2Starship> {$count?: number}
Object.defineProperty(Show2Starships, 'name', { value: 'StarWarsShow.Show2Starships' })

export function _Show2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2Species extends Base {
    declare show_ID?: __.Key<string>
    declare specie_ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2Species>;
    declare static readonly elements: __.ElementsOf<Show2Species>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2Species extends _Show2SpeciesAspect(__.Entity) {}
Object.defineProperty(Show2Species, 'name', { value: 'StarWarsShow.Show2Species' })
Object.defineProperty(Show2Species, 'is_singular', { value: true })
export class Show2Species_ extends Array<Show2Species> {$count?: number}
Object.defineProperty(Show2Species_, 'name', { value: 'StarWarsShow.Show2Species' })

export function _Show2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2Vehicle extends Base {
    declare show_ID?: __.Key<string>
    declare vehicle_ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2Vehicle>;
    declare static readonly elements: __.ElementsOf<Show2Vehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Show2Vehicle extends _Show2VehicleAspect(__.Entity) {}
Object.defineProperty(Show2Vehicle, 'name', { value: 'StarWarsShow.Show2Vehicles' })
Object.defineProperty(Show2Vehicle, 'is_singular', { value: true })
export class Show2Vehicles extends Array<Show2Vehicle> {$count?: number}
Object.defineProperty(Show2Vehicles, 'name', { value: 'StarWarsShow.Show2Vehicles' })

export function _MediaAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Media extends Base {
    declare ID?: __.Key<string>
    declare title?: string | null
    declare media_type?: string | null
    declare director?: string | null
    declare producer?: string | null
    declare release_date?: __.CdsDate | null
    declare episode_id?: Media_episode_id | null
    declare opening_crawl?: string | null
    declare show_type?: string | null
    declare seasons?: number | null
    declare episode_count?: number | null
    declare network?: string | null
    declare edit_url?: string | null
    static episode_id = Media_episode_id;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Media>;
    declare static readonly elements: __.ElementsOf<Media>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Media extends _MediaAspect(__.Entity) {}
Object.defineProperty(Media, 'name', { value: 'StarWarsShow.Media' })
Object.defineProperty(Media, 'is_singular', { value: true })
export class Media_ extends Array<Media> {$count?: number}
Object.defineProperty(Media_, 'name', { value: 'StarWarsShow.Media' })

export function _MediaCharacterAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaCharacter extends Base {
    declare media_ID?: __.Key<string>
    declare media_type?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaCharacter>;
    declare static readonly elements: __.ElementsOf<MediaCharacter>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaCharacter extends _MediaCharacterAspect(__.Entity) {}
Object.defineProperty(MediaCharacter, 'name', { value: 'StarWarsShow.MediaCharacters' })
Object.defineProperty(MediaCharacter, 'is_singular', { value: true })
export class MediaCharacters extends Array<MediaCharacter> {$count?: number}
Object.defineProperty(MediaCharacters, 'name', { value: 'StarWarsShow.MediaCharacters' })

export function _MediaPlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaPlanet extends Base {
    declare media_ID?: __.Key<string>
    declare media_type?: string | null
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaPlanet>;
    declare static readonly elements: __.ElementsOf<MediaPlanet>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaPlanet extends _MediaPlanetAspect(__.Entity) {}
Object.defineProperty(MediaPlanet, 'name', { value: 'StarWarsShow.MediaPlanets' })
Object.defineProperty(MediaPlanet, 'is_singular', { value: true })
export class MediaPlanets extends Array<MediaPlanet> {$count?: number}
Object.defineProperty(MediaPlanets, 'name', { value: 'StarWarsShow.MediaPlanets' })

export function _MediaSpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaSpecies extends Base {
    declare media_ID?: __.Key<string>
    declare media_type?: string | null
    declare specie?: __.Association.to<Species> | null
    declare specie_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaSpecies>;
    declare static readonly elements: __.ElementsOf<MediaSpecies>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaSpecies extends _MediaSpeciesAspect(__.Entity) {}
Object.defineProperty(MediaSpecies, 'name', { value: 'StarWarsShow.MediaSpecies' })
Object.defineProperty(MediaSpecies, 'is_singular', { value: true })
export class MediaSpecies_ extends Array<MediaSpecies> {$count?: number}
Object.defineProperty(MediaSpecies_, 'name', { value: 'StarWarsShow.MediaSpecies' })

export function _MediaStarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaStarship extends Base {
    declare media_ID?: __.Key<string>
    declare media_type?: string | null
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaStarship>;
    declare static readonly elements: __.ElementsOf<MediaStarship>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaStarship extends _MediaStarshipAspect(__.Entity) {}
Object.defineProperty(MediaStarship, 'name', { value: 'StarWarsShow.MediaStarships' })
Object.defineProperty(MediaStarship, 'is_singular', { value: true })
export class MediaStarships extends Array<MediaStarship> {$count?: number}
Object.defineProperty(MediaStarships, 'name', { value: 'StarWarsShow.MediaStarships' })

export function _MediaVehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaVehicle extends Base {
    declare media_ID?: __.Key<string>
    declare media_type?: string | null
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaVehicle>;
    declare static readonly elements: __.ElementsOf<MediaVehicle>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaVehicle extends _MediaVehicleAspect(__.Entity) {}
Object.defineProperty(MediaVehicle, 'name', { value: 'StarWarsShow.MediaVehicles' })
Object.defineProperty(MediaVehicle, 'is_singular', { value: true })
export class MediaVehicles extends Array<MediaVehicle> {$count?: number}
Object.defineProperty(MediaVehicles, 'name', { value: 'StarWarsShow.MediaVehicles' })

export function _MediaTypeValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class MediaTypeValue extends Base {
    declare media_type?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<MediaTypeValue>;
    declare static readonly elements: __.ElementsOf<MediaTypeValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class MediaTypeValue extends _MediaTypeValueAspect(__.Entity) {}
Object.defineProperty(MediaTypeValue, 'name', { value: 'StarWarsShow.MediaTypeValues' })
Object.defineProperty(MediaTypeValue, 'is_singular', { value: true })
export class MediaTypeValues extends Array<MediaTypeValue> {$count?: number}
Object.defineProperty(MediaTypeValues, 'name', { value: 'StarWarsShow.MediaTypeValues' })

export function _ShowTypeValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ShowTypeValue extends Base {
    declare show_type?: __.Key<ShowTypeValue_show_type>
    static show_type = ShowTypeValue_show_type;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ShowTypeValue>;
    declare static readonly elements: __.ElementsOf<ShowTypeValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class ShowTypeValue extends _ShowTypeValueAspect(__.Entity) {}
Object.defineProperty(ShowTypeValue, 'name', { value: 'StarWarsShow.ShowTypeValues' })
Object.defineProperty(ShowTypeValue, 'is_singular', { value: true })
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class ShowTypeValues extends Array<ShowTypeValue> {$count?: number}
Object.defineProperty(ShowTypeValues, 'name', { value: 'StarWarsShow.ShowTypeValues' })

export function _NetworkValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class NetworkValue extends Base {
    declare network?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<NetworkValue>;
    declare static readonly elements: __.ElementsOf<NetworkValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class NetworkValue extends _NetworkValueAspect(__.Entity) {}
Object.defineProperty(NetworkValue, 'name', { value: 'StarWarsShow.NetworkValues' })
Object.defineProperty(NetworkValue, 'is_singular', { value: true })
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class NetworkValues extends Array<NetworkValue> {$count?: number}
Object.defineProperty(NetworkValues, 'name', { value: 'StarWarsShow.NetworkValues' })
