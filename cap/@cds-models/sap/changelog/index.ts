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
Object.defineProperty(ChangeView, 'name', { value: 'sap.changelog.ChangeView' })
Object.defineProperty(ChangeView, 'is_singular', { value: true })
export class ChangeView_ extends Array<ChangeView> {$count?: number}
Object.defineProperty(ChangeView_, 'name', { value: 'sap.changelog.ChangeView' })

export function _i18nKeyAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class i18nKey extends Base {
    declare ID?: __.Key<string>
    declare locale?: __.Key<string>
    declare text?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<i18nKey>;
    declare static readonly elements: __.ElementsOf<i18nKey>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class i18nKey extends _i18nKeyAspect(__.Entity) {}
Object.defineProperty(i18nKey, 'name', { value: 'sap.changelog.i18nKeys' })
Object.defineProperty(i18nKey, 'is_singular', { value: true })
export class i18nKeys extends Array<i18nKey> {$count?: number}
Object.defineProperty(i18nKeys, 'name', { value: 'sap.changelog.i18nKeys' })

export function _CHANGE_TRACKING_DUMMYAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class CHANGE_TRACKING_DUMMY extends Base {
    declare X?: __.Key<string>
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<CHANGE_TRACKING_DUMMY>;
    declare static readonly elements: __.ElementsOf<CHANGE_TRACKING_DUMMY>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class CHANGE_TRACKING_DUMMY extends _CHANGE_TRACKING_DUMMYAspect(__.Entity) {}
Object.defineProperty(CHANGE_TRACKING_DUMMY, 'name', { value: 'sap.changelog.CHANGE_TRACKING_DUMMY' })
Object.defineProperty(CHANGE_TRACKING_DUMMY, 'is_singular', { value: true })
export class CHANGE_TRACKING_DUMMY_ extends Array<CHANGE_TRACKING_DUMMY> {$count?: number}
Object.defineProperty(CHANGE_TRACKING_DUMMY_, 'name', { value: 'sap.changelog.CHANGE_TRACKING_DUMMY' })

export function _ChangeAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Change extends _._cuidAspect(Base) {
    declare parent?: __.Association.to<Change> | null
    declare parent_ID?: string | null
    declare children?: __.Composition.of.many<Changes>
    declare attribute?: string | null
    declare valueChangedFrom?: string | null
    declare valueChangedTo?: string | null
    declare valueChangedFromLabel?: string | null
    declare valueChangedToLabel?: string | null
    declare entity?: string | null
    declare entityKey?: string | null
    declare objectID?: string | null
    declare modification?: Change_modification | null
    declare valueDataType?: string | null
    declare createdAt?: __.DeepRequired<_.managed>['createdAt'] | null
    /** Canonical user ID */
    declare createdBy?: __.DeepRequired<_.managed>['createdBy'] | null
    declare transactionID?: number | null
    static modification = Change_modification;
    static override readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Change> & typeof _.cuid.keys;
    declare static readonly elements: __.ElementsOf<Change>;
    declare static readonly actions: typeof _.cuid.actions & globalThis.Record<never, never>;
  };
}
export class Change extends _ChangeAspect(__.Entity) {}
Object.defineProperty(Change, 'name', { value: 'sap.changelog.Changes' })
Object.defineProperty(Change, 'is_singular', { value: true })
export class Changes extends Array<Change> {$count?: number}
Object.defineProperty(Changes, 'name', { value: 'sap.changelog.Changes' })
