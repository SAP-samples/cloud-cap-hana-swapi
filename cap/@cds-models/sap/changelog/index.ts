// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../../_';
import * as _ from './../..';

// enum
const ChangeView_modification = {
  Create: "create",
  Update: "update",
  Delete: "delete",
} as const;
type ChangeView_modification = "create" | "update" | "delete"

// enum
const Change_modification = {
  Create: "create",
  Update: "update",
  Delete: "delete",
} as const;
type Change_modification = "create" | "update" | "delete"

export function _aspectAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class aspect extends Base {
    declare changes?: __.Association.to.many<ChangeView_>
    declare ID?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<aspect>;
    declare static readonly elements: __.ElementsOf<aspect>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/** Used in cds-plugin.js as template for tracked entities */
export class aspect extends _aspectAspect(__.Entity) {}
Object.defineProperty(aspect, 'name', { value: 'sap.changelog.aspect' })
Object.defineProperty(aspect, 'is_singular', { value: true })
/** Used in cds-plugin.js as template for tracked entities */
export class aspect_ extends Array<aspect> {$count?: number}
Object.defineProperty(aspect_, 'name', { value: 'sap.changelog.aspect' })

export function _ChangeViewAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ChangeView extends Base {
    declare ID?: __.Key<string>
    declare keys?: string | null
    declare attribute?: string | null
    declare valueChangedFrom?: string | null
    declare valueChangedTo?: string | null
    declare entity?: string | null
    declare serviceEntity?: string | null
    declare parentKey?: string | null
    declare serviceEntityPath?: string | null
    declare modification?: ChangeView_modification | null
    declare valueDataType?: string | null
    declare changeLog?: __.Association.to<ChangeLog> | null
    declare changeLog_ID?: string | null
    declare createdAt?: __.DeepRequired<_.managed>['createdAt'] | null
    /** Canonical user ID */
    declare createdBy?: __.DeepRequired<_.managed>['createdBy'] | null
    declare objectID?: string | null
    declare parentObjectID?: string | null
    declare entityKey?: string | null
    static modification = ChangeView_modification;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ChangeView>;
    declare static readonly elements: __.ElementsOf<ChangeView>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Attribute-level Changes with simple capturing of one-level
* composition trees in parent... elements.
*/
export class ChangeView extends _ChangeViewAspect(__.Entity) {}
Object.defineProperty(ChangeView, 'name', { value: 'sap.changelog.ChangeView' })
Object.defineProperty(ChangeView, 'is_singular', { value: true })
/**
* Attribute-level Changes with simple capturing of one-level
* composition trees in parent... elements.
*/
export class ChangeView_ extends Array<ChangeView> {$count?: number}
Object.defineProperty(ChangeView_, 'name', { value: 'sap.changelog.ChangeView' })

export function _ChangeLogAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class ChangeLog extends _._managedAspect(_._cuidAspect(Base)) {
    declare serviceEntity?: string | null
    declare entity?: string | null
    declare entityKey?: string | null
    declare changes?: __.Composition.of.many<Changes>
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<ChangeLog> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<ChangeLog>;
    declare static readonly actions: typeof _.cuid.actions & typeof _.managed.actions & globalThis.Record<never, never>;
  };
}
/** Top-level changes entity, e.g. UPDATE Incident by, at, ... */
export class ChangeLog extends _ChangeLogAspect(__.Entity) {}
Object.defineProperty(ChangeLog, 'name', { value: 'sap.changelog.ChangeLog' })
Object.defineProperty(ChangeLog, 'is_singular', { value: true })
/** Top-level changes entity, e.g. UPDATE Incident by, at, ... */
export class ChangeLog_ extends Array<ChangeLog> {$count?: number}
Object.defineProperty(ChangeLog_, 'name', { value: 'sap.changelog.ChangeLog' })

export function _ChangeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Change extends Base {
    declare ID?: __.Key<string>
    declare keys?: string | null
    declare attribute?: string | null
    declare valueChangedFrom?: string | null
    declare valueChangedTo?: string | null
    declare entityID?: string | null
    declare entity?: string | null
    declare serviceEntity?: string | null
    declare parentEntityID?: string | null
    declare parentKey?: string | null
    declare serviceEntityPath?: string | null
    declare modification?: Change_modification | null
    declare valueDataType?: string | null
    declare changeLog?: __.Association.to<ChangeLog> | null
    declare changeLog_ID?: string | null
    declare createdAt?: __.DeepRequired<_.managed>['createdAt'] | null
    /** Canonical user ID */
    declare createdBy?: __.DeepRequired<_.managed>['createdBy'] | null
    static modification = Change_modification;
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Change>;
    declare static readonly elements: __.ElementsOf<Change>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
/**
* Attribute-level Changes with simple capturing of one-level
* composition trees in parent... elements.
*/
export class Change extends _ChangeAspect(__.Entity) {}
Object.defineProperty(Change, 'name', { value: 'sap.changelog.Changes' })
Object.defineProperty(Change, 'is_singular', { value: true })
/**
* Attribute-level Changes with simple capturing of one-level
* composition trees in parent... elements.
*/
export class Changes extends Array<Change> {$count?: number}
Object.defineProperty(Changes, 'name', { value: 'sap.changelog.Changes' })
