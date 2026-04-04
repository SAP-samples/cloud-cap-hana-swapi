// This is an automatically generated file. Please do not change its contents manually!
import * as _ from './../../..';
import * as _star_wars from './../../../star/wars';
import * as _StarWarsPeople from './../..';
import * as __ from './../../../_';

// event
export declare class v1 {
  declare ID: __.Key<string>
  declare createdAt: __.CdsTimestamp | null
  /** Canonical user ID */
  declare createdBy: _.User | null
  declare modifiedAt: __.CdsTimestamp | null
  /** Canonical user ID */
  declare modifiedBy: _.User | null
  declare name: string | null
  declare height: _star_wars.IntegerLikeString | null
  declare mass: _star_wars.NumericString | null
  declare hair_color: string | null
  declare skin_color: string | null
  declare eye_color: string | null
  declare birth_year: _star_wars.YearString | null
  declare gender: string | null
  declare scoundrel: boolean | null
  declare homeworld: __.Association.to<_StarWarsPeople.Planet> | null
  declare films: __.Composition.of.many<_StarWarsPeople.Film2People_>
  declare species: __.Composition.of.many<_StarWarsPeople.Species2People_>
  declare vehicles: __.Composition.of.many<_StarWarsPeople.Vehicle2Pilot_>
  declare starships: __.Composition.of.many<_StarWarsPeople.Starship2Pilot_>
  declare displayTitle: string | null
  declare episodes: __.Association.to.many<_StarWarsPeople.Episode2People_>
}