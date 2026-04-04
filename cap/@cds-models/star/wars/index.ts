// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../..';
import * as __ from './../../_';

export type NumericString = string;
export type IntegerLikeString = string;
export type YearString = string;
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
const FilmEpisodeDesc_episode_id = {
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
type FilmEpisodeDesc_episode_id = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 0

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

export function _FilmAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film extends _._cuidAspect(_._managedAspect(Base)) {
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
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/** All Films in the Star Wars Skywalker Saga */
export class Film extends _FilmAspect(__.Entity) {}
Object.defineProperty(Film, 'name', { value: 'star.wars.Film' })
Object.defineProperty(Film, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class Film_ extends Array<Film> {$count?: number}
Object.defineProperty(Film_, 'name', { value: 'star.wars.Film' })

export function _directorAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class director extends Base {
    declare director?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<director>;
    declare static readonly elements: __.ElementsOf<director>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Films in the Star Wars Skywalker Saga */
export class director extends _directorAspect(__.Entity) {}
Object.defineProperty(director, 'name', { value: 'star.wars.directors' })
Object.defineProperty(director, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class directors extends Array<director> {$count?: number}
Object.defineProperty(directors, 'name', { value: 'star.wars.directors' })

export function _producerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class producer extends Base {
    declare producer?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<producer>;
    declare static readonly elements: __.ElementsOf<producer>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Films in the Star Wars Skywalker Saga */
export class producer extends _producerAspect(__.Entity) {}
Object.defineProperty(producer, 'name', { value: 'star.wars.producers' })
Object.defineProperty(producer, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class producers extends Array<producer> {$count?: number}
Object.defineProperty(producers, 'name', { value: 'star.wars.producers' })

export function _FilmEpisodeDescAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class FilmEpisodeDesc extends Base {
    declare ID?: __.Key<string>
    declare episode_id?: FilmEpisodeDesc_episode_id | null
    declare title?: string | null
    declare episodeIDDesc?: string | null
    static episode_id = FilmEpisodeDesc_episode_id;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<FilmEpisodeDesc>;
    declare static readonly elements: __.ElementsOf<FilmEpisodeDesc>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All Films in the Star Wars Skywalker Saga */
export class FilmEpisodeDesc extends _FilmEpisodeDescAspect(__.Entity) {}
Object.defineProperty(FilmEpisodeDesc, 'name', { value: 'star.wars.FilmEpisodeDesc' })
Object.defineProperty(FilmEpisodeDesc, 'is_singular', { value: true })
/** All Films in the Star Wars Skywalker Saga */
export class FilmEpisodeDesc_ extends Array<FilmEpisodeDesc> {$count?: number}
Object.defineProperty(FilmEpisodeDesc_, 'name', { value: 'star.wars.FilmEpisodeDesc' })

export function _Film2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2People extends _._cuidAspect(Base) {
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film2People>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Film2People extends _Film2PeopleAspect(__.Entity) {}
Object.defineProperty(Film2People, 'name', { value: 'star.wars.Film2People' })
Object.defineProperty(Film2People, 'is_singular', { value: true })
export class Film2People_ extends Array<Film2People> {$count?: number}
Object.defineProperty(Film2People_, 'name', { value: 'star.wars.Film2People' })

export function _Film2PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Planet extends _._cuidAspect(Base) {
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Planet> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film2Planet>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Film2Planet extends _Film2PlanetAspect(__.Entity) {}
Object.defineProperty(Film2Planet, 'name', { value: 'star.wars.Film2Planets' })
Object.defineProperty(Film2Planet, 'is_singular', { value: true })
export class Film2Planets extends Array<Film2Planet> {$count?: number}
Object.defineProperty(Film2Planets, 'name', { value: 'star.wars.Film2Planets' })

export function _Film2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Starship extends _._cuidAspect(Base) {
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Starship> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film2Starship>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Film2Starship extends _Film2StarshipAspect(__.Entity) {}
Object.defineProperty(Film2Starship, 'name', { value: 'star.wars.Film2Starships' })
Object.defineProperty(Film2Starship, 'is_singular', { value: true })
export class Film2Starships extends Array<Film2Starship> {$count?: number}
Object.defineProperty(Film2Starships, 'name', { value: 'star.wars.Film2Starships' })

export function _Film2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Vehicle extends _._cuidAspect(Base) {
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Vehicle> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film2Vehicle>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Film2Vehicle extends _Film2VehicleAspect(__.Entity) {}
Object.defineProperty(Film2Vehicle, 'name', { value: 'star.wars.Film2Vehicles' })
Object.defineProperty(Film2Vehicle, 'is_singular', { value: true })
export class Film2Vehicles extends Array<Film2Vehicle> {$count?: number}
Object.defineProperty(Film2Vehicles, 'name', { value: 'star.wars.Film2Vehicles' })

export function _Film2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Film2Species extends _._cuidAspect(Base) {
    declare film?: __.Association.to<Film> | null
    declare film_ID?: string | null
    declare specie?: __.Association.to<Species> | null
    declare specie_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Film2Species> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Film2Species>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Film2Species extends _Film2SpeciesAspect(__.Entity) {}
Object.defineProperty(Film2Species, 'name', { value: 'star.wars.Film2Species' })
Object.defineProperty(Film2Species, 'is_singular', { value: true })
export class Film2Species_ extends Array<Film2Species> {$count?: number}
Object.defineProperty(Film2Species_, 'name', { value: 'star.wars.Film2Species' })

export function _ShowAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show extends _._cuidAspect(_._managedAspect(Base)) {
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
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Show>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show extends _ShowAspect(__.Entity) {}
Object.defineProperty(Show, 'name', { value: 'star.wars.Show' })
Object.defineProperty(Show, 'is_singular', { value: true })
/** All Star Wars TV Shows, Animated Series, and Streaming Content */
export class Show_ extends Array<Show> {$count?: number}
Object.defineProperty(Show_, 'name', { value: 'star.wars.Show' })

export function _Show2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Show2People extends _._cuidAspect(Base) {
    declare show?: __.Association.to<Show> | null
    declare show_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Show2People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Show2People>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Show2People extends _Show2PeopleAspect(__.Entity) {}
Object.defineProperty(Show2People, 'name', { value: 'star.wars.Show2People' })
Object.defineProperty(Show2People, 'is_singular', { value: true })
export class Show2People_ extends Array<Show2People> {$count?: number}
Object.defineProperty(Show2People_, 'name', { value: 'star.wars.Show2People' })

export function _EpisodeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode extends _._cuidAspect(_._managedAspect(Base)) {
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
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episode extends _EpisodeAspect(__.Entity) {}
Object.defineProperty(Episode, 'name', { value: 'star.wars.Episode' })
Object.defineProperty(Episode, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class Episode_ extends Array<Episode> {$count?: number}
Object.defineProperty(Episode_, 'name', { value: 'star.wars.Episode' })

export function _Episode2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2People extends _._cuidAspect(_._managedAspect(Base)) {
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode2People>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Episode2People extends _Episode2PeopleAspect(__.Entity) {}
Object.defineProperty(Episode2People, 'name', { value: 'star.wars.Episode2People' })
Object.defineProperty(Episode2People, 'is_singular', { value: true })
export class Episode2People_ extends Array<Episode2People> {$count?: number}
Object.defineProperty(Episode2People_, 'name', { value: 'star.wars.Episode2People' })

export function _Episode2PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Planet extends _._cuidAspect(_._managedAspect(Base)) {
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Planet> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode2Planet>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Episode2Planet extends _Episode2PlanetAspect(__.Entity) {}
Object.defineProperty(Episode2Planet, 'name', { value: 'star.wars.Episode2Planets' })
Object.defineProperty(Episode2Planet, 'is_singular', { value: true })
export class Episode2Planets extends Array<Episode2Planet> {$count?: number}
Object.defineProperty(Episode2Planets, 'name', { value: 'star.wars.Episode2Planets' })

export function _Episode2StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Starship extends _._cuidAspect(_._managedAspect(Base)) {
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Starship> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode2Starship>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Episode2Starship extends _Episode2StarshipAspect(__.Entity) {}
Object.defineProperty(Episode2Starship, 'name', { value: 'star.wars.Episode2Starships' })
Object.defineProperty(Episode2Starship, 'is_singular', { value: true })
export class Episode2Starships extends Array<Episode2Starship> {$count?: number}
Object.defineProperty(Episode2Starships, 'name', { value: 'star.wars.Episode2Starships' })

export function _Episode2VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Vehicle extends _._cuidAspect(_._managedAspect(Base)) {
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Vehicle> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode2Vehicle>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Episode2Vehicle extends _Episode2VehicleAspect(__.Entity) {}
Object.defineProperty(Episode2Vehicle, 'name', { value: 'star.wars.Episode2Vehicles' })
Object.defineProperty(Episode2Vehicle, 'is_singular', { value: true })
export class Episode2Vehicles extends Array<Episode2Vehicle> {$count?: number}
Object.defineProperty(Episode2Vehicles, 'name', { value: 'star.wars.Episode2Vehicles' })

export function _Episode2SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Episode2Species extends _._cuidAspect(_._managedAspect(Base)) {
    declare episode?: __.Association.to<Episode> | null
    declare episode_ID?: string | null
    declare specie?: __.Association.to<Species> | null
    declare specie_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Episode2Species> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Episode2Species>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Episode2Species extends _Episode2SpeciesAspect(__.Entity) {}
Object.defineProperty(Episode2Species, 'name', { value: 'star.wars.Episode2Species' })
Object.defineProperty(Episode2Species, 'is_singular', { value: true })
export class Episode2Species_ extends Array<Episode2Species> {$count?: number}
Object.defineProperty(Episode2Species_, 'name', { value: 'star.wars.Episode2Species' })

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
Object.defineProperty(Show2Planet, 'name', { value: 'star.wars.Show2Planets' })
Object.defineProperty(Show2Planet, 'is_singular', { value: true })
export class Show2Planets extends Array<Show2Planet> {$count?: number}
Object.defineProperty(Show2Planets, 'name', { value: 'star.wars.Show2Planets' })

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
Object.defineProperty(Show2Starship, 'name', { value: 'star.wars.Show2Starships' })
Object.defineProperty(Show2Starship, 'is_singular', { value: true })
export class Show2Starships extends Array<Show2Starship> {$count?: number}
Object.defineProperty(Show2Starships, 'name', { value: 'star.wars.Show2Starships' })

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
Object.defineProperty(Show2Vehicle, 'name', { value: 'star.wars.Show2Vehicles' })
Object.defineProperty(Show2Vehicle, 'is_singular', { value: true })
export class Show2Vehicles extends Array<Show2Vehicle> {$count?: number}
Object.defineProperty(Show2Vehicles, 'name', { value: 'star.wars.Show2Vehicles' })

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
Object.defineProperty(Show2Species, 'name', { value: 'star.wars.Show2Species' })
Object.defineProperty(Show2Species, 'is_singular', { value: true })
export class Show2Species_ extends Array<Show2Species> {$count?: number}
Object.defineProperty(Show2Species_, 'name', { value: 'star.wars.Show2Species' })

export function _CloneWarsChronologicalOrderAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CloneWarsChronologicalOrder extends Base {
    declare ID?: __.Key<string>
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
Object.defineProperty(CloneWarsChronologicalOrder, 'name', { value: 'star.wars.CloneWarsChronologicalOrder' })
Object.defineProperty(CloneWarsChronologicalOrder, 'is_singular', { value: true })
/**
* A single episode of a Star Wars TV show.
* Owned by Show via composition (cascade delete applies).
*/
export class CloneWarsChronologicalOrder_ extends Array<CloneWarsChronologicalOrder> {$count?: number}
Object.defineProperty(CloneWarsChronologicalOrder_, 'name', { value: 'star.wars.CloneWarsChronologicalOrder' })

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
    static episode_id = Media_episode_id;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Media>;
    declare static readonly elements: __.ElementsOf<Media>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Media extends _MediaAspect(__.Entity) {}
Object.defineProperty(Media, 'name', { value: 'star.wars.Media' })
Object.defineProperty(Media, 'is_singular', { value: true })
export class Media_ extends Array<Media> {$count?: number}
Object.defineProperty(Media_, 'name', { value: 'star.wars.Media' })

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
Object.defineProperty(MediaCharacter, 'name', { value: 'star.wars.MediaCharacters' })
Object.defineProperty(MediaCharacter, 'is_singular', { value: true })
export class MediaCharacters extends Array<MediaCharacter> {$count?: number}
Object.defineProperty(MediaCharacters, 'name', { value: 'star.wars.MediaCharacters' })

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
Object.defineProperty(MediaPlanet, 'name', { value: 'star.wars.MediaPlanets' })
Object.defineProperty(MediaPlanet, 'is_singular', { value: true })
export class MediaPlanets extends Array<MediaPlanet> {$count?: number}
Object.defineProperty(MediaPlanets, 'name', { value: 'star.wars.MediaPlanets' })

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
Object.defineProperty(MediaSpecies, 'name', { value: 'star.wars.MediaSpecies' })
Object.defineProperty(MediaSpecies, 'is_singular', { value: true })
export class MediaSpecies_ extends Array<MediaSpecies> {$count?: number}
Object.defineProperty(MediaSpecies_, 'name', { value: 'star.wars.MediaSpecies' })

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
Object.defineProperty(MediaStarship, 'name', { value: 'star.wars.MediaStarships' })
Object.defineProperty(MediaStarship, 'is_singular', { value: true })
export class MediaStarships extends Array<MediaStarship> {$count?: number}
Object.defineProperty(MediaStarships, 'name', { value: 'star.wars.MediaStarships' })

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
Object.defineProperty(MediaVehicle, 'name', { value: 'star.wars.MediaVehicles' })
Object.defineProperty(MediaVehicle, 'is_singular', { value: true })
export class MediaVehicles extends Array<MediaVehicle> {$count?: number}
Object.defineProperty(MediaVehicles, 'name', { value: 'star.wars.MediaVehicles' })

export function _PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class People extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare height?: IntegerLikeString | null
    declare mass?: NumericString | null
    /** Person's Hair Color */
    declare hair_color?: string | null
    declare skin_color?: string | null
    declare eye_color?: string | null
    declare birth_year?: YearString | null
    declare gender?: string | null
    declare scoundrel?: boolean | null
    declare homeworld?: __.Association.to<Planet> | null
    declare homeworld_ID?: string | null
    declare films?: __.Composition.of.many<Film2People_>
    declare species?: __.Composition.of.many<Species2People_>
    declare vehicles?: __.Composition.of.many<Vehicle2Pilot_>
    declare starships?: __.Composition.of.many<Starship2Pilot_>
    declare shows?: __.Composition.of.many<Show2People_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<People>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class People extends _PeopleAspect(__.Entity) {}
Object.defineProperty(People, 'name', { value: 'star.wars.People' })
Object.defineProperty(People, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class People_ extends Array<People> {$count?: number}
Object.defineProperty(People_, 'name', { value: 'star.wars.People' })

export function _peopleCountAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class peopleCount extends Base {
    declare people_count?: number | null
    declare name?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<peopleCount>;
    declare static readonly elements: __.ElementsOf<peopleCount>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** All People and Aliens in Star Wars */
export class peopleCount extends _peopleCountAspect(__.Entity) {}
Object.defineProperty(peopleCount, 'name', { value: 'star.wars.peopleCount' })
Object.defineProperty(peopleCount, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class peopleCount_ extends Array<peopleCount> {$count?: number}
Object.defineProperty(peopleCount_, 'name', { value: 'star.wars.peopleCount' })

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
Object.defineProperty(gender, 'name', { value: 'star.wars.genders' })
Object.defineProperty(gender, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class genders extends Array<gender> {$count?: number}
Object.defineProperty(genders, 'name', { value: 'star.wars.genders' })

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
Object.defineProperty(hairColor, 'name', { value: 'star.wars.hairColors' })
Object.defineProperty(hairColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class hairColors extends Array<hairColor> {$count?: number}
Object.defineProperty(hairColors, 'name', { value: 'star.wars.hairColors' })

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
Object.defineProperty(eyeColor, 'name', { value: 'star.wars.eyeColors' })
Object.defineProperty(eyeColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class eyeColors extends Array<eyeColor> {$count?: number}
Object.defineProperty(eyeColors, 'name', { value: 'star.wars.eyeColors' })

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
Object.defineProperty(skinColor, 'name', { value: 'star.wars.skinColors' })
Object.defineProperty(skinColor, 'is_singular', { value: true })
/** All People and Aliens in Star Wars */
export class skinColors extends Array<skinColor> {$count?: number}
Object.defineProperty(skinColors, 'name', { value: 'star.wars.skinColors' })

export function _PlanetAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Planet extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare diameter?: IntegerLikeString | null
    declare rotation_period?: IntegerLikeString | null
    declare orbital_period?: IntegerLikeString | null
    declare gravity?: string | null
    declare population?: IntegerLikeString | null
    declare climate?: string | null
    declare terrain?: string | null
    declare surface_water?: IntegerLikeString | null
    declare films?: __.Composition.of.many<Film2Planets>
    declare residents?: __.Composition.of.many<Planet2People_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Planet> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Planet>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Planet extends _PlanetAspect(__.Entity) {}
Object.defineProperty(Planet, 'name', { value: 'star.wars.Planet' })
Object.defineProperty(Planet, 'is_singular', { value: true })
export class Planet_ extends Array<Planet> {$count?: number}
Object.defineProperty(Planet_, 'name', { value: 'star.wars.Planet' })

export function _Planet2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Planet2People extends _._cuidAspect(Base) {
    declare planet?: __.Association.to<Planet> | null
    declare planet_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Planet2People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Planet2People>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Planet2People extends _Planet2PeopleAspect(__.Entity) {}
Object.defineProperty(Planet2People, 'name', { value: 'star.wars.Planet2People' })
Object.defineProperty(Planet2People, 'is_singular', { value: true })
export class Planet2People_ extends Array<Planet2People> {$count?: number}
Object.defineProperty(Planet2People_, 'name', { value: 'star.wars.Planet2People' })

export function _climateValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class climateValue extends Base {
    declare climate?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<climateValue>;
    declare static readonly elements: __.ElementsOf<climateValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class climateValue extends _climateValueAspect(__.Entity) {}
Object.defineProperty(climateValue, 'name', { value: 'star.wars.climateValues' })
Object.defineProperty(climateValue, 'is_singular', { value: true })
export class climateValues extends Array<climateValue> {$count?: number}
Object.defineProperty(climateValues, 'name', { value: 'star.wars.climateValues' })

export function _terrainValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class terrainValue extends Base {
    declare terrain?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<terrainValue>;
    declare static readonly elements: __.ElementsOf<terrainValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class terrainValue extends _terrainValueAspect(__.Entity) {}
Object.defineProperty(terrainValue, 'name', { value: 'star.wars.terrainValues' })
Object.defineProperty(terrainValue, 'is_singular', { value: true })
export class terrainValues extends Array<terrainValue> {$count?: number}
Object.defineProperty(terrainValues, 'name', { value: 'star.wars.terrainValues' })

export function _SpeciesAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Species extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare classification?: string | null
    declare designation?: string | null
    declare average_height?: IntegerLikeString | null
    declare average_lifespan?: IntegerLikeString | null
    declare hair_colors?: string | null
    declare skin_colors?: string | null
    declare eye_colors?: string | null
    declare homeworld?: __.Association.to<Planet> | null
    declare homeworld_ID?: string | null
    declare language?: string | null
    declare people?: __.Composition.of.many<Species2People_>
    declare films?: __.Composition.of.many<Film2Species_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Species>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Species extends _SpeciesAspect(__.Entity) {}
Object.defineProperty(Species, 'name', { value: 'star.wars.Species' })
Object.defineProperty(Species, 'is_singular', { value: true })
export class Species_ extends Array<Species> {$count?: number}
Object.defineProperty(Species_, 'name', { value: 'star.wars.Species' })

export function _classificationValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class classificationValue extends Base {
    declare classification?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<classificationValue>;
    declare static readonly elements: __.ElementsOf<classificationValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class classificationValue extends _classificationValueAspect(__.Entity) {}
Object.defineProperty(classificationValue, 'name', { value: 'star.wars.classificationValues' })
Object.defineProperty(classificationValue, 'is_singular', { value: true })
export class classificationValues extends Array<classificationValue> {$count?: number}
Object.defineProperty(classificationValues, 'name', { value: 'star.wars.classificationValues' })

export function _designationValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class designationValue extends Base {
    declare designation?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<designationValue>;
    declare static readonly elements: __.ElementsOf<designationValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class designationValue extends _designationValueAspect(__.Entity) {}
Object.defineProperty(designationValue, 'name', { value: 'star.wars.designationValues' })
Object.defineProperty(designationValue, 'is_singular', { value: true })
export class designationValues extends Array<designationValue> {$count?: number}
Object.defineProperty(designationValues, 'name', { value: 'star.wars.designationValues' })

export function _hairColorValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class hairColorValue extends Base {
    declare hair_colors?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<hairColorValue>;
    declare static readonly elements: __.ElementsOf<hairColorValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class hairColorValue extends _hairColorValueAspect(__.Entity) {}
Object.defineProperty(hairColorValue, 'name', { value: 'star.wars.hairColorValues' })
Object.defineProperty(hairColorValue, 'is_singular', { value: true })
export class hairColorValues extends Array<hairColorValue> {$count?: number}
Object.defineProperty(hairColorValues, 'name', { value: 'star.wars.hairColorValues' })

export function _skinColorValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class skinColorValue extends Base {
    declare skin_colors?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<skinColorValue>;
    declare static readonly elements: __.ElementsOf<skinColorValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class skinColorValue extends _skinColorValueAspect(__.Entity) {}
Object.defineProperty(skinColorValue, 'name', { value: 'star.wars.skinColorValues' })
Object.defineProperty(skinColorValue, 'is_singular', { value: true })
export class skinColorValues extends Array<skinColorValue> {$count?: number}
Object.defineProperty(skinColorValues, 'name', { value: 'star.wars.skinColorValues' })

export function _languageValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class languageValue extends Base {
    declare language?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<languageValue>;
    declare static readonly elements: __.ElementsOf<languageValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class languageValue extends _languageValueAspect(__.Entity) {}
Object.defineProperty(languageValue, 'name', { value: 'star.wars.languageValues' })
Object.defineProperty(languageValue, 'is_singular', { value: true })
export class languageValues extends Array<languageValue> {$count?: number}
Object.defineProperty(languageValues, 'name', { value: 'star.wars.languageValues' })

export function _eyeColorValueAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class eyeColorValue extends Base {
    declare eye_colors?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<eyeColorValue>;
    declare static readonly elements: __.ElementsOf<eyeColorValue>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class eyeColorValue extends _eyeColorValueAspect(__.Entity) {}
Object.defineProperty(eyeColorValue, 'name', { value: 'star.wars.eyeColorValues' })
Object.defineProperty(eyeColorValue, 'is_singular', { value: true })
export class eyeColorValues extends Array<eyeColorValue> {$count?: number}
Object.defineProperty(eyeColorValues, 'name', { value: 'star.wars.eyeColorValues' })

export function _Species2PeopleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Species2People extends _._cuidAspect(Base) {
    declare species?: __.Association.to<Species> | null
    declare species_ID?: string | null
    declare people?: __.Association.to<People> | null
    declare people_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Species2People> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Species2People>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Species2People extends _Species2PeopleAspect(__.Entity) {}
Object.defineProperty(Species2People, 'name', { value: 'star.wars.Species2People' })
Object.defineProperty(Species2People, 'is_singular', { value: true })
export class Species2People_ extends Array<Species2People> {$count?: number}
Object.defineProperty(Species2People_, 'name', { value: 'star.wars.Species2People' })

export function _StarshipAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Starship extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare model?: string | null
    declare starship_class?: string | null
    declare manufacturer?: string | null
    declare cost_in_credits?: IntegerLikeString | null
    declare length?: NumericString | null
    declare crew?: IntegerLikeString | null
    declare passengers?: IntegerLikeString | null
    declare max_atmosphering_speed?: IntegerLikeString | null
    declare hyperdrive_rating?: NumericString | null
    declare MGLT?: IntegerLikeString | null
    declare cargo_capacity?: IntegerLikeString | null
    declare consumables?: string | null
    declare films?: __.Composition.of.many<Film2Starships>
    declare pilots?: __.Composition.of.many<Starship2Pilot_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Starship> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Starship>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Starship extends _StarshipAspect(__.Entity) {}
Object.defineProperty(Starship, 'name', { value: 'star.wars.Starship' })
Object.defineProperty(Starship, 'is_singular', { value: true })
export class Starship_ extends Array<Starship> {$count?: number}
Object.defineProperty(Starship_, 'name', { value: 'star.wars.Starship' })

export function _ssModelAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ssModel extends Base {
    declare model?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ssModel>;
    declare static readonly elements: __.ElementsOf<ssModel>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class ssModel extends _ssModelAspect(__.Entity) {}
Object.defineProperty(ssModel, 'name', { value: 'star.wars.ssModels' })
Object.defineProperty(ssModel, 'is_singular', { value: true })
export class ssModels extends Array<ssModel> {$count?: number}
Object.defineProperty(ssModels, 'name', { value: 'star.wars.ssModels' })

export function _ssClasAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ssClas extends Base {
    declare starship_class?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ssClas>;
    declare static readonly elements: __.ElementsOf<ssClas>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class ssClas extends _ssClasAspect(__.Entity) {}
Object.defineProperty(ssClas, 'name', { value: 'star.wars.ssClass' })
Object.defineProperty(ssClas, 'is_singular', { value: true })
export class ssClass extends Array<ssClas> {$count?: number}
Object.defineProperty(ssClass, 'name', { value: 'star.wars.ssClass' })

export function _ssManufacturerAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ssManufacturer extends Base {
    declare manufacturer?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ssManufacturer>;
    declare static readonly elements: __.ElementsOf<ssManufacturer>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class ssManufacturer extends _ssManufacturerAspect(__.Entity) {}
Object.defineProperty(ssManufacturer, 'name', { value: 'star.wars.ssManufacturer' })
Object.defineProperty(ssManufacturer, 'is_singular', { value: true })
export class ssManufacturer_ extends Array<ssManufacturer> {$count?: number}
Object.defineProperty(ssManufacturer_, 'name', { value: 'star.wars.ssManufacturer' })

export function _Starship2PilotAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Starship2Pilot extends _._cuidAspect(Base) {
    declare starship?: __.Association.to<Starship> | null
    declare starship_ID?: string | null
    declare pilot?: __.Association.to<People> | null
    declare pilot_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Starship2Pilot> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Starship2Pilot>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Starship2Pilot extends _Starship2PilotAspect(__.Entity) {}
Object.defineProperty(Starship2Pilot, 'name', { value: 'star.wars.Starship2Pilot' })
Object.defineProperty(Starship2Pilot, 'is_singular', { value: true })
export class Starship2Pilot_ extends Array<Starship2Pilot> {$count?: number}
Object.defineProperty(Starship2Pilot_, 'name', { value: 'star.wars.Starship2Pilot' })

export function _VehicleAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Vehicle extends _._cuidAspect(_._managedAspect(Base)) {
    declare name?: string | null
    declare model?: string | null
    declare vehicle_class?: string | null
    declare manufacturer?: string | null
    declare cost_in_credits?: IntegerLikeString | null
    declare length?: NumericString | null
    declare crew?: IntegerLikeString | null
    declare passengers?: IntegerLikeString | null
    declare max_atmosphering_speed?: IntegerLikeString | null
    declare cargo_capacity?: IntegerLikeString | null
    declare consumables?: string | null
    declare films?: __.Composition.of.many<Film2Vehicles>
    declare pilots?: __.Composition.of.many<Vehicle2Pilot_>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Vehicle>;
    declare static readonly actions: typeof _.managed.actions & typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Vehicle extends _VehicleAspect(__.Entity) {}
Object.defineProperty(Vehicle, 'name', { value: 'star.wars.Vehicles' })
Object.defineProperty(Vehicle, 'is_singular', { value: true })
export class Vehicles extends Array<Vehicle> {$count?: number}
Object.defineProperty(Vehicles, 'name', { value: 'star.wars.Vehicles' })

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
Object.defineProperty(vModel, 'name', { value: 'star.wars.vModels' })
Object.defineProperty(vModel, 'is_singular', { value: true })
export class vModels extends Array<vModel> {$count?: number}
Object.defineProperty(vModels, 'name', { value: 'star.wars.vModels' })

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
Object.defineProperty(vClas, 'name', { value: 'star.wars.vClass' })
Object.defineProperty(vClas, 'is_singular', { value: true })
export class vClass extends Array<vClas> {$count?: number}
Object.defineProperty(vClass, 'name', { value: 'star.wars.vClass' })

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
Object.defineProperty(vManufacturer, 'name', { value: 'star.wars.vManufacturer' })
Object.defineProperty(vManufacturer, 'is_singular', { value: true })
export class vManufacturer_ extends Array<vManufacturer> {$count?: number}
Object.defineProperty(vManufacturer_, 'name', { value: 'star.wars.vManufacturer' })

export function _Vehicle2PilotAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Vehicle2Pilot extends _._cuidAspect(Base) {
    declare vehicle?: __.Association.to<Vehicle> | null
    declare vehicle_ID?: string | null
    declare pilot?: __.Association.to<People> | null
    declare pilot_ID?: string | null
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Vehicle2Pilot> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Vehicle2Pilot>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Vehicle2Pilot extends _Vehicle2PilotAspect(__.Entity) {}
Object.defineProperty(Vehicle2Pilot, 'name', { value: 'star.wars.Vehicle2Pilot' })
Object.defineProperty(Vehicle2Pilot, 'is_singular', { value: true })
export class Vehicle2Pilot_ extends Array<Vehicle2Pilot> {$count?: number}
Object.defineProperty(Vehicle2Pilot_, 'name', { value: 'star.wars.Vehicle2Pilot' })
