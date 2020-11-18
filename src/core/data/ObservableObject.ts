import { uuid } from '../utils/uuid.js';
import { EventArgs } from '../utils/events/EventArgs.js';
import { EventEmitter } from '../utils/events/EventEmitter.js';

export class ObservableObject<T extends object = object> {
  static create<T extends object>(obj: T): ObservableObjectProxy<T> {
    const handler: ObservableObjectProxyHandler<T> = {
      state: new ObservableObjectState<T>(),
      get(target, prop, receiver: T) {
        if (!Reflect.has(target, prop)) {
          switch (prop) {
            case '__state__':
              return this.state;
            case 'id':
              if (this.state.idFields.size > 0) {
                if (!this.state.isNew) {
                  return [...this.state.idFields].map(field => String(Reflect.get(target, field))).join('_');
                }
              }
              return this.state.uid;
            case 'uid':
              return this.state.uid;
            case 'dirty':
              return this.state.changed.size > 0;
            case 'isNew':
              return this.state.isNew;
            case 'deleted':
              return this.state.deleted;
            case 'idFields':
              if (this.state.idFields.size > 0) {
                return [...this.state.idFields];
              }
              break;
            case 'onChange':
              return this.onChange;
            case 'removeChange':
              return this.removeChange;
            case 'reset':
              return this.reset;
            case 'commit':
              return this.commit;
            case 'getDirtyData':
              return this.getDirtyData;
            case 'toJSON':
              return this.toJSON;
          }
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value, receiver) {
        switch (prop) {
          case '__state__':
          case 'id':
          case 'uid':
          case 'dirty':
          case 'isNew':
          case 'deleted':
            /* istanbul ignore next */
            return false;
        }
        return this.setValue(target, prop, value, receiver);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(target: T, prop: PropertyKey, value: any, receiver?: any): boolean {
        const { events, originals, changed, reset } = this.state;
        if (!reset) {
          const oldValue = Reflect.get(target, prop);
          const newValue = value;
          const originalValue = Reflect.get(originals, prop);

          if (oldValue !== newValue) {
            if (events) {
              const args = new ObservableObjectChangeEventArgs<T>();
              args.target = target;
              args.field = String(prop);
              args.oldValue = oldValue;
              args.newValue = newValue;
              args.originalValue = originalValue;

              const result = Reflect.set(target, prop, value, receiver);

              if (result) {
                if (originalValue !== newValue) {
                  Reflect.set(originals, prop, oldValue);
                  changed.add(prop as keyof T);
                } else {
                  Reflect.deleteProperty(originals, prop);
                  if (changed.has(prop as keyof T)) {
                    changed.delete(prop as keyof T);
                  }
                }

                events.emit('change', args);
              }
              return result;
            }
          }
        }

        return Reflect.set(target, prop, value, receiver);
      },
      onChange(handler: (args: ObservableObjectChangeEventArgs<T>) => void) {
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;
        state.events.on('change', handler);
      },
      removeChange(handler?: (args: ObservableObjectChangeEventArgs<T>) => void) {
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;
        state.events.off('change', handler);
      },
      reset() {
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;
        state.reset = true;
        for (const prop of state.changed) {
          Reflect.set(this, prop, state.originals[prop]);
        }
        state.changed.clear();
        state.originals = {};
        state.deleted = false;
        state.reset = false;
      },
      commit() {
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;
        state.changed.clear();
        state.originals = {};
        state.isNew = false;
        state.deleted = false;
      },
      getDirtyData(): Partial<T> | null {
        let result: Partial<T> | null = null;
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;

        if (state.isNew) {
          return this as T;
        } else if (state.deleted) {
          if (state.idFields.size > 0) {
            let idOnly = false;
            result = {};
            for (const field of state.idFields) {
              if (Reflect.get(this, field)) {
                result[field] = Reflect.get(this, field);
                idOnly = true;
              } else {
                idOnly = false;
                break;
              }
            }
            if (idOnly) {
              return result;
            }
          }
          return this as T;
        } else {
          if (state.changed.size > 0) {
            result = {};
            for (const key of state.changed) {
              result[key] = Reflect.get(this, key);
            }
          }
        }

        return result;
      },
      toJSON(dirtyOnly = false): Partial<T> {
        const state = Reflect.get(this, '__state__') as ObservableObjectState<T>;
        if (dirtyOnly && (state.isNew || state.changed.size > 0)) {
          return { ...this.getDirtyData() };
        } else {
          return { ...(this as T) };
        }
      }
    };
    return new Proxy<T>(obj, handler) as ObservableObjectProxy<T>;
  }
}

export interface ObservableObjectProxyInterface<T extends object> {
  readonly __state__: ObservableObjectState<T>;
  readonly id: string;
  readonly uid: string;
  readonly dirty: boolean;
  readonly idFields: keyof T[];
  readonly isNew: boolean;
  readonly deleted: boolean;

  onChange(handler: (args: ObservableObjectChangeEventArgs<T>) => void): void;

  removeChange(handler?: (args: ObservableObjectChangeEventArgs<T>) => void): void;

  reset(): void;

  commit(): void;

  getDirtyData(): Partial<T> | null;

  toJSON(dirtyOnly?: boolean): Partial<T>;
}

class ObservableObjectState<T extends object> {
  readonly events = new EventEmitter();
  readonly changed = new Set<keyof T>();
  readonly uid = uuid.create();
  reset = false;
  originals: { [P in keyof T]?: T[P] } = {};
  idFields = new Set<keyof T>();
  isNew = false;
  deleted = false;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export class ObservableObjectChangeEventArgs<T extends object = object> extends EventArgs<T> {
  field: string | undefined;
  oldValue: any;
  newValue: any;
  originalValue: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

type ObservableObjectProxyHandler<T extends object> = ProxyHandler<T> & {
  state: ObservableObjectState<T>;
  onChange(handler: (args: ObservableObjectChangeEventArgs<T>) => void): void;
  removeChange(handler?: (args: ObservableObjectChangeEventArgs<T>) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue(target: T, prop: PropertyKey, value: any, receiver?: any): boolean;
  reset(): void;
  commit(): void;
  getDirtyData(): Partial<T> | null;
  toJSON(dirtyOnly?: boolean): Partial<T>;
};

type ObservableObjectProxy<T extends object> = T & ObservableObjectProxyInterface<T>;
