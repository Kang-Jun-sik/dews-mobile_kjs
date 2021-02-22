import { internalProperty, property, PropertyValues } from 'lit-element';
import { Transport } from './transport.js';
import { Schema } from './schema.js';
import {
  ajax,
  api,
  EventEmitter,
  ObservableArray,
  ObservableArrayChangeEventArgs,
  ObservableObject,
  ObservableObjectProxyInterface
} from '@dews/dews-mobile-core';
import { HttpRequestConfig, HttpResponse } from '@dews/dews-mobile-core/dist/types/utils/comm/HttpClient';
import { Sort, SortType } from './Sort.js';
import { DataSourceChangeEventArgs, DataSourceRequestStartEventArgs, DataSourceRequestEndEventArgs } from './Event.js';
import { DewsDataComponent } from '../base/DewsDataComponent.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

type DirectionType = 'asc' | 'desc';

type DataSourceEventType = 'change' | 'requestStart' | 'requestEnd';

export type ObservableArrayItem<T extends object> = T & Partial<ObservableObjectProxyInterface<T>>;

type GroupType<T> = {
  field: keyof T;
  dir?: DirectionType;
};

type PageType = 'scroll' | 'background' | 'button' | 'virtualScroll';

export class DataSource<T extends object = object> extends DewsDataComponent {
  _data?: ObservableArray<T>;
  private _sort: Sort<T> = new Sort<T>();
  private _events: EventEmitter = new EventEmitter();

  // get __data__(): ObservableArray<T> {
  //   return this._data!;
  // }

  @property({ type: String })
  id = '';

  @property({ reflect: true })
  pageType?: PageType;

  @property({ type: Number, reflect: true })
  pagingCount?: number;

  @property({ type: Function, attribute: 'onchange' })
  onChange?: (args: Partial<DataSourceChangeEventArgs<T>>) => void;

  @property({ type: Function, attribute: 'onrequeststart' })
  onRequestStart?: (args: DataSourceRequestStartEventArgs<T>) => void;

  @property({ type: Function, attribute: 'onrequestend' })
  onRequestEnd?: (args: DataSourceRequestStartEventArgs<T>) => void;

  // Transport CustomElement 데이터 전송
  @internalProperty()
  transport?: Transport;
  // Schema CustomElement 데이터 스키마
  @internalProperty()
  schema?: Schema<T>;
  // Local 데이터 속성
  @internalProperty()
  localData?: T[];
  @internalProperty()
  error?: () => {};
  @internalProperty()
  paging?: boolean;
  // @internalProperty()
  pagingStart?: number;

  constructor() {
    super();
    console.log('ds constructor');
    if (!this.getAttribute('id')) {
      throw '데이터소스 컴포넌트의 아이디가 없습니다.';
    }
    this._createTransport();
    this._createSchema();
  }

  private _createTransport(): void {
    const transportElement: Transport | null = this.querySelector('ds-transport');
    if (transportElement) {
      this.transport = transportElement;
    }
  }

  private _createSchema(): void {
    console.log('_createSchema');
    const schemaElement: Schema<T> | null = this.querySelector('ds-schema');
    if (schemaElement) {
      this.schema = schemaElement;
    }
  }

  private _bindEvent(): void {
    // 추가 이벤트 작성
  }

  private _bindDataEvent(): void {
    // ObserveArray 인스턴스화 할 경우 새로 등록 필요
    this._data?.onChange(e => {
      this._triggerChange(e);
    });
  }

  async connectedCallback() {
    super.connectedCallback();

    console.log('connectedCallback');
    await this.updateComplete;
    this._bindEvent();
    this._bindDataEvent();
    console.log('ds updateComplete');
  }

  // region LifeCycle
  disconnectedCallback() {
    console.log('disconnectedCallback');
    super.disconnectedCallback();
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    console.log('shouldUpdate');
    return super.shouldUpdate(_changedProperties);
  }

  protected update(changedProperties: PropertyValues) {
    console.log('updated');
    super.update(changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    console.log('firstUpdated');
    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    console.log('updated');
    super.updated(_changedProperties);
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }

  // endregion

  /**
   * 데이터소스에서 사용자가 지정한 위치에서 데이터를 읽어 옵니다.
   *
   * @return {Promise} 데이터 읽고 발생하는 Promise 객체
   */
  async read(): Promise<void> {
    this._trigger('requestStart', { type: 'read' });
    let response: any;
    if (this.localData) {
      this._data = ObservableArray.create(this.localData, this.schema?.model?.idFields);
    } else if (this.transport?.read) {
      const readElement = this.transport.read;
      // let response: T[];
      let requestData: any = {};
      if (this.paging) {
        requestData = {
          paging: true,
          pagingCount: this.pagingCount,
          pagingStart: this.pagingStart
        };
      }

      try {
        if (readElement.type === 'get') {
          response = await api.get(readElement.url, { params: requestData });
        } else {
          response = await api.post(readElement.url, { data: requestData });
        }
        const responseData: ObservableArray<T> = ObservableArray.create(response, this.schema?.model?.idFields);
        if (this.paging && this._data) {
          this._data.__state__.historicalMode = false;
          this._data.push(...responseData);
          this._data.__state__.historicalMode = true;
        } else {
          this._data = responseData;
        }
      } catch (error) {
        console.log('err', error);
        throw error;
      }
    }

    this._trigger('requestEnd', { type: 'read', response: response });

    this._bindDataEvent();
  }

  async batchSave(config?: HttpRequestConfig) {
    const saveData = this._data?.getDirtyData();
    return this._batchSave(saveData, config);
  }

  async saveAll(config?: HttpRequestConfig) {
    const saveData = this._data;
    return this._batchSave(saveData, config);
  }

  private async _batchSave(saveData?: unknown, config?: HttpRequestConfig) {
    const saveUrl = config?.url ? config.url : this.transport?.save?.url;
    if (this.hasDirty() && saveUrl) {
      config = config ? config : {};
      config.data = JSON.stringify(saveData);
      return await api
        .post<T>(saveUrl, config)
        .then(res => {
          this.read();
        })
        .catch(error => {
          console.log('err', error);
          throw error;
        });
    }
  }

  add(item: T): number | undefined {
    return this._data?.push(item);
  }

  insert(index: number, item: T) {
    this._data?.splice(index, 0, item);
  }

  delete(index: number): ObservableObject<T> | undefined {
    return this._data?.splice(index, 1)[0];
  }

  hasDirty() {
    return this._data?.__state__.isDirty;
  }

  getDirtyData() {
    return this._data?.getDirtyData();
  }

  data(data?: T[]): ObservableArrayItem<T>[] | undefined {
    if (data) {
      this._data = ObservableArray.create(data, this.schema?.model?.idFields);
    }
    return this._data ? [...this._data] : undefined;
  }

  sort(sortOptions?: SortType<T> | SortType<T>[]) {
    let result;
    if (sortOptions) {
      sortOptions = Array.isArray(sortOptions) ? sortOptions : [sortOptions];
      if (sortOptions && this._data) {
        for (const sortOption of sortOptions) {
          sortOption.compare = this._sort.comparerCreate(sortOption);
          result = result || [...this._data];
          result?.sort(sortOption.compare);
        }
      }
      this._sort.sort = sortOptions;
      this._sort.sortingData = result;
    } else {
      result = this._sort?.sort;
    }
    return result;
  }

  sortData(): ObservableArrayItem<T>[] | undefined {
    let returnData: ObservableArrayItem<T>[] | undefined = undefined;
    if (this._sort.sortingData) {
      returnData = [...this._sort.sortingData];
    }

    return returnData;
  }

  at(index: number) {
    return this._data![index];
  }

  reset() {
    this._data?.reset();
  } // cancelChanges

  commit(): void {
    this._data?.commit();
  }

  on(type: string, handler: any) {
    this._events.on(type, handler);
  }

  off(type: string, handler: any) {
    this._events.off(type, handler);
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    console.log('attributeChangedCallback');
    super.attributeChangedCallback(name, old, value);
    if (name === 'onchange') {
      // const changeHandler = eval(value!);
      const ch = new Function('return ' + value)();
      this._events.on<DataSourceChangeEventArgs<T>>('change', ch);
      console.log(`name: ${name}, ${old}, ${value}`);
    }
  }

  private _trigger(type: DataSourceEventType, args?: any) {
    const eventArgs = Object.assign({}, args, { target: this });
    Object.freeze(args);
    if (type === 'change') {
      this._events.emit<DataSourceChangeEventArgs<T>>(type, eventArgs);
    } else if (type === 'requestStart') {
      this._events.emit<DataSourceRequestStartEventArgs<T>>(type, eventArgs);
    } else if (type === 'requestEnd') {
      this._events.emit<DataSourceRequestEndEventArgs<T>>(type, eventArgs);
    }
  }

  private _triggerChange(observableArrayChangeEventArgs: ObservableArrayChangeEventArgs<T>) {
    const args = new DataSourceChangeEventArgs(Object.assign({}, observableArrayChangeEventArgs, { target: this }));
    Object.freeze(args);
    this._events.emit<DataSourceChangeEventArgs<T>>('change', args);
  }
}
