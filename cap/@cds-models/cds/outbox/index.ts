// This is an automatically generated file. Please do not change its contents manually!
import * as __ from './../../_';

export function _MessageAspect<TBase extends new (...args: any[]) => object>(Base: TBase) {
  return class Message extends Base {
    declare ID?: __.Key<string>
    declare timestamp?: __.CdsTimestamp | null
    declare target?: string | null
    declare msg?: string | null
    declare attempts?: number | null
    declare partition?: number | null
    declare lastError?: string | null
    declare lastAttemptTimestamp?: __.CdsTimestamp | null
    declare status?: string | null
    declare task?: string | null
    declare appid?: string | null
    static readonly kind: 'entity' | 'type' | 'aspect' = 'entity';
    declare static readonly keys: __.KeysOf<Message>;
    declare static readonly elements: __.ElementsOf<Message>;
    declare static readonly actions: globalThis.Record<never, never>;
  };
}
export class Message extends _MessageAspect(__.Entity) {}
Object.defineProperty(Message, 'name', { value: 'cds.outbox.Messages' })
Object.defineProperty(Message, 'is_singular', { value: true })
export class Messages extends Array<Message> {$count?: number}
Object.defineProperty(Messages, 'name', { value: 'cds.outbox.Messages' })
