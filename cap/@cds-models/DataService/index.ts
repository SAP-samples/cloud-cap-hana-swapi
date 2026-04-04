// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../_';

/** Exposes data + entity metadata */
export default class {
}

export function _EntityAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Entity extends Base {
    declare name?: __.Key<string>
    declare columns?: __.Composition.of.many<Entities.columns>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Entity>;
    declare static readonly elements: __.ElementsOf<Entity>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** Metadata like name and columns/elements */
export class Entity extends _EntityAspect(__.Entity) {}
Object.defineProperty(Entity, 'name', { value: 'DataService.Entities' })
Object.defineProperty(Entity, 'is_singular', { value: true })
/** Metadata like name and columns/elements */
export class Entities extends Array<Entity> {$count?: number}
Object.defineProperty(Entities, 'name', { value: 'DataService.Entities' })

export function _DataAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Data extends Base {
    declare dummy?: __.Key<string>
    declare record?: Array< {
  column?: string | null,
  data?: string | null,
}>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Data>;
    declare static readonly elements: __.ElementsOf<Data>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** The actual data, organized by column name */
export class Data extends _DataAspect(__.Entity) {}
Object.defineProperty(Data, 'name', { value: 'DataService.Data' })
Object.defineProperty(Data, 'is_singular', { value: true })
/** The actual data, organized by column name */
export class Data_ extends Array<Data> {$count?: number}
Object.defineProperty(Data_, 'name', { value: 'DataService.Data' })

export namespace Entities {
  export function _columnAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
    return class column extends Base {
      declare up_?: __.Key<__.Association.to<Entity>>
      declare up__name?: __.Key<string>
      declare name?: string | null
      declare type?: string | null
      declare isKey?: boolean | null
      static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
      declare static readonly keys: __.KeysOf<column>;
      declare static readonly elements: __.ElementsOf<column>;
      declare static readonly actions: globalThis.Record<never, never>;
    };
  }
  export class column extends _columnAspect(__.Entity) {}
  Object.defineProperty(column, 'name', { value: 'DataService.Entities.columns' })
  Object.defineProperty(column, 'is_singular', { value: true })
  export class columns extends Array<column> {$count?: number}
  Object.defineProperty(columns, 'name', { value: 'DataService.Entities.columns' })
  
}