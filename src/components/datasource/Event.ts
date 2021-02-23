import { EventArgs } from '@dews/dews-mobile-core';
import { DataSource } from './dews-datasource.js';

export class DataSourceEventArgs<T extends object> extends EventArgs<DataSource<T>> {
  private _defaultPrevented = false;

  constructor(init?: Partial<DataSourceEventArgs<T>>) {
    super();
    if (init) {
      Object.assign(this, init);
    }
  }

  preventDefault() {
    this._defaultPrevented = true;
  }

  isPreventDefault() {
    return this._defaultPrevented;
  }
}

export class DataSourceChangeEventArgs<T extends object> extends DataSourceEventArgs<T> {
  event = 'change';
  type!: 'load' | 'add' | 'update' | 'delete';
  field?: keyof T;
  oldValue?: unknown;
  newValue?: unknown;
  originalValue: unknown;

  constructor(init?: Partial<DataSourceChangeEventArgs<T>>) {
    super(init);
  }
}

export class DataSourceRequestStartEventArgs<T extends object> extends DataSourceEventArgs<T> {
  event = 'requestStart';
  type?: string;

  constructor(init?: Partial<DataSourceRequestStartEventArgs<T>>) {
    super(init);
  }
}

export class DataSourceRequestEndEventArgs<T extends object> extends DataSourceEventArgs<T> {
  event = 'requestEnd';
  response: unknown;
  type?: string;

  constructor(init?: Partial<DataSourceRequestEndEventArgs<T>>) {
    super(init);
  }
}

export class DataSourceDataBoundEventArgs<T extends object> extends EventArgs<DataSource<T>> {
  event = '_dataBound';
  data: unknown;
  type?: string;

  constructor(init?: Partial<DataSourceDataBoundEventArgs<T>>) {
    super();
    if (init) {
      Object.assign(this, init);
    }
  }
}
