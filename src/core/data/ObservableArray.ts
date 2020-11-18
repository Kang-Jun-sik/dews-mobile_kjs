import { EventArgs } from '../utils/events/EventArgs.js';
import { EventEmitter } from '../utils/events/EventEmitter.js';
import {
  ObservableObject,
  ObservableObjectChangeEventArgs,
  ObservableObjectProxyInterface
} from './ObservableObject.js';

export class ObservableArray<T extends object = object> extends Array<ObservableArrayItem<T>> {
  static create<T extends object = object>(items: T[], idFields: (keyof T)[] = []): ObservableArray<T> {
    return new ObservableArray<T>(idFields, ...items);
  }

  #state = new ObservableArrayState<T>();

  private constructor(idFields: (keyof T)[], ...items: T[]) {
    super();

    if (Array.isArray(idFields) && idFields.length > 0) {
      for (const idField of idFields) {
        this.#state.idFields.add(idField);
      }
    }

    if (items && items.length > 0) {
      super.push(...this.convertToObservable(...items));
      this.#state.historicalMode = false;
      this.#state.reindexHashMap(this);
      this.#state.reindexIdMaps(this);
      this.#state.historicalMode = true;
    }

    this.onChange(args => {
      if (args.type === ChangeEventType.update) {
        if (this.#state.idFields.has(args.field!)) {
          if (this.#state.idMap.has(args.items[0].id!)) {
            args.items[0].reset!();
            throw `중복되는 아이디 값이 존재하므로 '${args.field}' 필드의 값을 '${args.newValue}'(으)로 수정할 수 없습니다.`;
          } else {
            this.#state.reindexIdMaps(this);
          }
        }
      }
    });
  }

  // region # Properties

  get idFields(): (keyof T)[] {
    return [...this.#state.idFields];
  }

  get __state__(): ObservableArrayState<T> {
    /* istanbul ignore next */
    return this.#state;
  }

  // endregion # Properties

  //region # Functions

  bulk(callback: () => void): void;
  bulk(callback: (array: ObservableArray<T>) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bulk(callback: (array?: any) => void): void {
    this.#state.historicalMode = false;
    callback.call(this, this as ObservableArray<T>);
    this.#state.historicalMode = true;
  }

  push(...items: T[]): number {
    const converted = this.convertToObservable(...items);
    if (this.#state.checkIdDuplication(...converted)) {
      // Debug: Error : item - Logging
      throw new Error('중복 아이디를 가지는 항목을 추가할 수 없습니다.');
    }
    const index = this.length;
    const result = super.push(...converted);
    if (result > 0) {
      this.#state.addToStateMaps(index, ...converted);
      this.#state.triggerChangeEvent(
        this,
        this.#state.historicalMode ? ChangeEventType.add : ChangeEventType.load,
        converted
      );
    }
    return result;
  }

  unshift(...items: T[]): number {
    const converted = this.convertToObservable(...items);
    if (this.#state.checkIdDuplication(...converted)) {
      // Debug: Error : item - Logging
      throw new Error('중복 아이디를 가지는 항목을 추가할 수 없습니다.');
    }
    const oldLength = this.length;
    const newLength = super.unshift(...converted);
    if (newLength > oldLength) {
      this.#state.addToStateMaps(0, ...converted);
      this.#state.triggerChangeEvent(
        this,
        this.#state.historicalMode ? ChangeEventType.add : ChangeEventType.load,
        converted
      );
    }
    return newLength;
  }

  splice(start: number, deleteCount: number, ...addItems: T[]): ObservableArrayItem<T>[] {
    // 신규로 추가되는 항목이 있다면 중복 체크
    let convertedAddItems: ObservableArrayItem<T>[] = [];
    if (Array.isArray(addItems) && addItems.length > 0) {
      convertedAddItems = this.convertToObservable(...addItems);
      if (this.#state.checkIdDuplication(...convertedAddItems)) {
        // Debug: Error : item - Logging
        // istanbul ignore next
        throw new Error('중복 아이디를 가지는 항목을 추가할 수 없습니다.');
      }
    }
    // 삭제
    const deleted = super.splice(start, deleteCount!, ...convertedAddItems);
    if (Array.isArray(deleted) && deleted.length > 0) {
      this.#state.removeFromStateMaps(start, ...deleted);
      this.#state.triggerChangeEvent(this, ChangeEventType.delete, deleted);
    }
    // 신규 추가
    if (convertedAddItems && convertedAddItems.length > 0) {
      this.#state.addToStateMaps(start, ...convertedAddItems);
      this.#state.triggerChangeEvent(
        this,
        this.#state.historicalMode ? ChangeEventType.add : ChangeEventType.load,
        convertedAddItems
      );
    }

    return deleted;
  }

  pop(): ObservableArrayItem<T> {
    const deleted = super.pop();
    if (typeof deleted !== 'undefined') {
      const index = this.length;
      this.#state.removeFromStateMaps(index, deleted);
      this.#state.triggerChangeEvent(this, ChangeEventType.delete, [deleted]);
    }
    return deleted!;
  }

  shift(): ObservableArrayItem<T> {
    const deleted = super.shift();
    if (typeof deleted !== 'undefined') {
      this.#state.removeFromStateMaps(0, deleted);
      this.#state.triggerChangeEvent(this, ChangeEventType.delete, [deleted]);
    }
    return deleted!;
  }

  getByUid(uid: string): ObservableArrayItem<T> | undefined {
    return this.#state.hashMap.get(uid);
  }

  getById(...idValues: unknown[]): ObservableArrayItem<T> | undefined {
    if (Array.isArray(idValues) && idValues.length > 0) {
      const targetId = idValues.map(item => String(item)).join('_');
      if (this.#state.idMap.has(targetId)) {
        const uid = this.#state.idMap.get(targetId);
        return this.getByUid(uid!);
      }
    }
    return;
  }

  getIndexByUid(uid: string): number {
    return this.indexOf(this.#state.hashMap.get(uid)!);
  }

  setIdFields(...idFields: (keyof T)[]): void {
    if (Array.isArray(idFields) && idFields.length > 0) {
      this.#state.idFields.clear();
      for (const idField of idFields) {
        this.#state.idFields.add(idField);
      }
      this.#state.reindexIdMaps(this);
    }
  }

  reset(): void {
    if (this.#state.isDirty) {
      const changed = this.#state.restoreOriginDataSequence(this);
      super.splice(0, this.length, ...changed);
      this.filter(item => item.dirty).forEach(item => item.reset!());
      this.#state.clearState(this);
    }
  }

  commit(): void {
    if (this.#state.isDirty) {
      this.filter(item => item.dirty || item.isNew).forEach(item => item.commit!());
      this.#state.clearState(this);
    }
  }

  getDirtyData(): ObservableArrayDirtyData<T> {
    return this.#state.getDirtyData();
  }

  // endregion # Functions

  // region # EventHandler

  onChange(handler: (args: ObservableArrayChangeEventArgs<T>) => void): void {
    this.#state.events.on<ObservableArrayChangeEventArgs<T>>('change', handler);
  }

  removeChange(handler?: (args: ObservableArrayChangeEventArgs<T>) => void): void {
    this.#state.events.off<ObservableArrayChangeEventArgs<T>>('change', handler);
  }

  // endregion # EventHandler

  // region # Private functions

  private convertToObservable(...items: T[]): (T & ObservableObjectProxyInterface<T>)[] {
    return items.map(item => {
      const converted = ObservableObject.create<T>(item);
      converted.__state__.idFields = this.#state.idFields;
      converted.onChange(args => {
        this.#state.relayItemsChangeEvent(this, converted, args);
      });
      return converted;
    });
  }

  // endregion # Private functions
}

export interface ObservableArrayDirtyData<T extends object> {
  added: Partial<T>[];
  updated: Partial<T>[];
  deleted: Partial<T>[];
}

export class ObservableArrayChangeEventArgs<T extends object> extends EventArgs<ObservableArray<T>> {
  type!: ChangeEventType;
  items: ObservableArrayItem<T>[] = [];
  field?: keyof T;
  oldValue?: unknown;
  newValue?: unknown;
  originalValue?: unknown;

  constructor(init?: Partial<ObservableArrayChangeEventArgs<T>>) {
    super();
    if (init) {
      Object.assign(this, init);
    }
  }
}

const enum ChangeEventType {
  load = 'load',
  add = 'add',
  update = 'update',
  delete = 'delete'
}

class ObservableArrayState<T extends object> {
  historicalMode: boolean;
  hashMap: Map<string, ObservableArrayItem<T>>;
  idMap: Map<string, string>;
  deletedMap: Map<string, ObservableArrayItem<T>>;
  historyStack: ObservableArrayHistoryItem<T>[];
  idFields: Set<keyof T>;
  events: EventEmitter;

  constructor() {
    this.historicalMode = true;
    this.hashMap = new Map<string, ObservableArrayItem<T>>();
    this.idMap = new Map<string, string>();
    this.deletedMap = new Map<string, ObservableArrayItem<T>>();
    this.historyStack = [];
    this.idFields = new Set<keyof T>();
    this.events = new EventEmitter();
  }

  get added(): ObservableArrayItem<T>[] {
    return [...this.hashMap.values()].filter(item => item.isNew);
  }

  get updated(): ObservableArrayItem<T>[] {
    return [...this.hashMap.values()].filter(item => item.dirty && !item.isNew);
  }

  get deleted(): ObservableArrayItem<T>[] {
    return [...this.deletedMap.values()];
  }

  get isDirty(): boolean {
    return [...this.hashMap.values()].some(item => item.dirty || item.isNew) || this.deletedMap.size > 0;
  }

  addToStateMaps(startIndex: number, ...newItems: ObservableArrayItem<T>[]): void {
    if (Array.isArray(newItems) && newItems.length > 0) {
      let index = startIndex;
      for (const item of newItems) {
        if (this.historicalMode) {
          item.__state__!.isNew = true;

          this.historyStack.push({
            type: HistoryType.Add,
            item: item.uid,
            index
          });
        }
        this.hashMap.set(item.uid!, item);
        if (this.idFields.size > 0 && !this.idMap.has(item.id!)) {
          this.idMap.set(item.id!, item.uid!);
        }
        index++;
      }
    }
  }

  removeFromStateMaps(startIndex: number, ...removeItems: ObservableArrayItem<T>[]): void {
    if (Array.isArray(removeItems) && removeItems.length > 0) {
      for (const item of removeItems) {
        item.__state__!.deleted = true;
        this.hashMap.delete(item.uid!);

        if (this.idFields.size > 0 && this.idMap.has(item.id!)) {
          this.idMap.delete(item.id!);
        }

        if (!item.isNew) {
          this.deletedMap.set(item.uid!, item);
        }

        this.historyStack.push({
          type: HistoryType.Delete,
          item: item.uid,
          index: startIndex
        });
      }
    }
  }

  reindexHashMap(source: ObservableArray<T>): void {
    this.hashMap.clear();
    for (const item of source) {
      this.hashMap.set(item.uid!, item);
    }
  }

  reindexIdMaps(source: ObservableArray<T>) {
    this.idMap.clear();
    for (const item of source) {
      if (item.id !== item.uid) {
        if (this.idMap.has(item.id!)) {
          // Debug: Error : item - Logging
          throw new Error('중복 아이디를 가지는 항목이 존재합니다.');
        }
        this.idMap.set(item.id!, item.uid!);
      }
    }
  }

  getDirtyData(): ObservableArrayDirtyData<T> {
    const dirtyData: ObservableArrayDirtyData<T> = {
      added: [],
      updated: [],
      deleted: []
    };

    if (this.added.length > 0) {
      dirtyData.added = this.added.map(item => item.getDirtyData!()) as T[];
    }
    if (this.updated.length > 0) {
      dirtyData.updated = this.updated.map(item => item.getDirtyData!()) as T[];
    }
    if (this.deletedMap.size > 0) {
      dirtyData.deleted = this.deleted.map(item => item.getDirtyData!()) as T[];
    }

    return dirtyData;
  }

  checkIdDuplication(...items: ObservableArrayItem<T>[]): boolean {
    if (items && this.idFields.size > 0) {
      return items.some(item => this.idMap.has(item.id!));
    }
    return false;
  }

  restoreOriginDataSequence(source: ObservableArray<T>): ObservableArrayItem<T>[] {
    let processArray = [...source];
    if (this.historyStack.length > 0) {
      while (this.historyStack.length !== 0) {
        const history = this.historyStack.pop();

        if (history!.type === HistoryType.Add) {
          processArray.splice(history!.index, 1);
        } else if (history!.type === HistoryType.Delete) {
          const restoreItem = this.deletedMap.has(history!.item!) ? this.deletedMap.get(history!.item!) : null;
          processArray.splice(history!.index, 0, restoreItem!);
        }
      }
      processArray = processArray.filter(item => item !== null);
    }

    return processArray;
  }

  clearState(source: ObservableArray<T>): void {
    this.deletedMap.clear();
    this.historyStack = [];
    this.reindexHashMap(source);
    this.reindexIdMaps(source);
  }

  triggerChangeEvent(
    target: ObservableArray<T>,
    type: ChangeEventType,
    items: ObservableArrayItem<T>[],
    field?: keyof T,
    oldValue?: unknown,
    newValue?: unknown,
    originalValue?: unknown
  ): void {
    const args = new ObservableArrayChangeEventArgs({
      target,
      type,
      items
    });
    if (type === ChangeEventType.update) {
      args.field = field;
      args.oldValue = oldValue;
      args.newValue = newValue;
      args.originalValue = originalValue;
    }
    Object.freeze(args);

    this.events.emit<ObservableArrayChangeEventArgs<T>>('change', args);
  }

  relayItemsChangeEvent(
    target: ObservableArray<T>,
    item: ObservableArrayItem<T>,
    args: ObservableObjectChangeEventArgs<T>
  ): void {
    this.triggerChangeEvent(
      target,
      ChangeEventType.update,
      [item],
      args.field as keyof T,
      args.oldValue,
      args.newValue,
      args.originalValue
    );
  }
}

type ObservableArrayItem<T extends object> = T & Partial<ObservableObjectProxyInterface<T>>;

type ObservableArrayHistoryItem<T extends object> = {
  type: HistoryType;
  item?: string;
  index: number;
};

const enum HistoryType {
  Add = 'A',
  Delete = 'D'
}
