import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
import template from './columnsetbutton.html';
import scss from './columnsetbutton.scss';
import { EventArgs } from '@dews/dews-mobile-core';
import { Columnitem } from './columnitem.js';
import { property } from 'lit-element';
import { DataSource } from '../datasource/dews-datasource.js';

type EVENT_TYPE = 'open' | 'close' | 'click' | 'change' | 'complete';

export class Columnsetbutton extends DrawerBottomBase {
  static styles = scss;

  @property({ type: Function })
  onComplete: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onOpen: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onClose: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onChange: ((args: EventArgs) => void) | undefined;

  @property({ type: String })
  datasource: string | undefined;

  @property({ type: String, attribute: 'key-field' })
  field = 'key';

  @property({ type: String, attribute: 'label-field' })
  labelField = 'label';

  @property({ type: String, attribute: 'checked-field' })
  checkedField = 'checked';

  @property({ type: String, attribute: 'disabled-field' })
  disabledField = 'disabled';

  @property({ type: Boolean, attribute: 'auto-bind' })
  autoBind = false;

  private _datasource?: DataSource;

  connectedCallback() {
    super.connectedCallback();
    if (this.datasource !== undefined) {
      this._datasource = dews.app.main?.currentPage?.getDataSource(this.datasource);
      if (this._datasource === undefined) {
        this._datasource = document.getElementById(`${this.datasource}`) as DataSource;
      }
      if (this._datasource) {
        this._datasource.on('requestEnd', (e: EventArgs) => {
          this.createItemList();
        });
      }
      if (this.autoBind) {
        this._datasource?.read();
      }
    }
  }

  private createItemList() {
    const data = this._datasource?.data();
    let item: Columnitem;
    data?.forEach(_data => {
      if (this.field !== undefined) {
        item = document.createElement('column-item') as Columnitem;
        item.field = (_data as any)[this.field];
        if (this.labelField !== undefined) {
          item.label = (_data as any)[this.labelField];
        }
        if (this.disabledField) {
          item.disabled = Boolean((_data as any)[this.disabledField]);
        }
        if (this.checkedField) {
          item.checked = Boolean((_data as any)[this.checkedField]);
        }
        item.$pel = this;
        this.appendChild(item);
      } else {
        console.log('????????? ????????????.');
      }
    });

    // this.appendChild(' ')
  }

  /**
   * ????????? ????????? ???????????????.
   * @param i ???????????? ????????? ?????? ????????? ???????????? ????????? ???????????????.
   * @return ???????????? ???????????????.
   * */
  getItem(i: number | string): object | undefined {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    let returnValue: object = {};
    if (typeof i === 'number') {
      returnValue = {
        [this.field]: (item?.item(i) as Columnitem).field,
        [this.labelField]: (item?.item(i) as Columnitem).label,
        [this.checkedField]: (item?.item(i) as Columnitem).checked,
        [this.disabledField]: (item?.item(i) as Columnitem).disabled
      };
    } else {
      item?.forEach($el => {
        if (($el as Columnitem).field === i) {
          returnValue = {
            [this.field]: ($el as Columnitem).field,
            [this.labelField]: ($el as Columnitem).label,
            [this.checkedField]: ($el as Columnitem).checked,
            [this.disabledField]: ($el as Columnitem).disabled
          };
        }
      });
    }
    return returnValue;
  }

  /**
   * ???????????? ???????????? ?????? ?????????.
   * @return Array<object>
   * key ?????????????????? ?????? ??? ?????????.
   * value ?????? ????????? ????????? ????????????.
   * */
  getItems(): Array<object> {
    const returnValue: Array<object> = [];
    this.shadowRoot?.querySelectorAll('column-item').forEach($el => {
      let obj: object = {};
      obj = {
        [this.field]: ($el as Columnitem).field,
        [this.labelField]: ($el as Columnitem).label,
        [this.checkedField]: ($el as Columnitem).checked,
        [this.disabledField]: ($el as Columnitem).disabled
      };
      returnValue.push(obj);
    });
    return returnValue;
  }

  removeItems() {
    this.shadowRoot?.querySelector('tbody')?.remove();
    const tbody = document.createElement('tbody');
    tbody.id = 'table';
    this.shadowRoot?.querySelector('.column-list')?.appendChild(tbody);
  }

  /**
   * Columns-item ??? ???????????????.
   * @param {Object} data ???????????? ????????? ???????????????.
   * @param {String} data.(key)  ???????????? ????????? ???????????????.(??? ??????);
   * @param {String} data.(label-field)???????????? ????????? ???????????????.
   * @param {Boolean} data.(checked-field) ???????????? ?????? ??????????????? ???????????????.
   * @param {Boolean} data.(disabled-field) ???????????? ?????? ??????????????? ???????????????.
   * */
  setItem(data: object) {
    const DATA = new Map(Object.entries(data));
    const item = document.createElement('column-item');
    for (const i in data) {
      switch (i) {
        case this.checkedField:
          if (DATA.get(`${this.checkedField}`)) {
            item.setAttribute('checked', '');
          }
          break;
        case `${this.disabledField}`:
          if (DATA.get(`${this.disabledField}`)) {
            item.setAttribute('disabled', '');
          }
          break;
        case `${this.labelField}`:
          item.setAttribute('label', DATA.get(`${this.labelField}`) as string);
          break;
        case `${this.field}`:
          item.setAttribute('field', DATA.get(`${this.field}`) as string);
          break;
      }
    }
    this.appendChild(item);
  }

  /**
   * Columns-items ??? ???????????????.
   * @param {Array<Object>} data ???????????? ????????? ???????????????.
   * @param {String} data.(key)  ???????????? ????????? ???????????????.(??? ??????);
   * @param {String} data.(label-field)???????????? ????????? ???????????????.
   * @param {Boolean} data.(checked-field) ???????????? ?????? ??????????????? ???????????????.
   * @param {Boolean} data.(disabled-field) ???????????? ?????? ??????????????? ???????????????.
   * */
  async setItems(data: Array<object>) {
    await this.removeItems();
    await data.forEach(Data => {
      this.setItem(Data);
    });
  }

  /**
   * item Check ????????? ?????? ?????????.
   * @param {Number} key ???????????? key
   * */
  checkItem(key: string) {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    item?.forEach($el => {
      if (($el as Columnitem).field === key) {
        ($el as Columnitem).checked = true;
      }
    });
  }

  /**
   * item ??? ????????????.
   * @param {Number} key ???????????? key
   * */
  async removeItem(key: string) {
    const items: Array<object> = this.getItems();
    const returnValue: Array<object> = [];
    await items?.forEach(item => {
      const data = new Map(Object.entries(item));
      if (data.get(`${this.field}`) !== key) {
        let obj: object = {};
        obj = {
          [this.field]: data.get(`${this.field}`),
          [this.labelField]: data.get(`${this.labelField}`),
          [this.checkedField]: data.get(`${this.checkedField}`),
          [this.disabledField]: data.get(`${this.disabledField}`)
        };
        returnValue.push(obj);
      }
    });
    await this.removeItems();
    await this.setItems(returnValue);
  }

  /**
   * item ??? ????????? ?????? ?????????.
   * @param {Object} obj ???????????? ??????
   * @param {String} obj.(label-field) ??? ???????????? ????????????.
   * @param {String} obj.(checked-field) ??? ???????????? ????????????.
   * @param {String} obj.(disabled-field) ??? ???????????? ????????????.
   * */
  updateItem(obj: object) {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    const data = new Map(Object.entries(obj));
    item?.forEach($el => {
      if (($el as Columnitem).field === data.get(`${this.field}`)) {
        for (const dataKey in data) {
          switch (dataKey) {
            case this.labelField:
              ($el as Columnitem).label = data.get(`${this.labelField}`);
              break;
            case this.checkedField:
              if (data.get(`${this.checkedField}`) == true) {
                ($el as Columnitem).checked = Boolean(data.get(`${this.checkedField}`));
              }
              break;
            case this.disabledField:
              if (data.get(`${this.disabledField}`) == true) {
                ($el as Columnitem).disabled = Boolean(data.get(`${this.disabledField}`));
              }
              break;
          }
        }
      }
    });
  }

  /**
   * ???????????? ?????????????????? ?????? ?????????.
   * @return {Array} ???????????? ?????????????????? ???????????????.
   * */
  private _getItemLabelList() {
    const list = new Map();
    this.shadowRoot?.querySelectorAll('COLUMN-ITEM').forEach(($el, index) => {
      list.set(index, ($el as Columnitem).label);
    });
    return list;
  }

  /**
   * ??????????????? ???????????? index ??? ????????? ???????????????.
   * @return [] ??????????????? ???????????? index ??? ???????????????.
   * */
  private _getCheckIndexList() {
    const list: number[] = [];
    this.shadowRoot?.querySelectorAll('COLUMN-ITEM').forEach(($el, index) => {
      if ($el.hasAttribute('checked')) {
        list.push(index);
      }
    });
    return list;
  }

  on = (key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) => {
    return this._EVENT.on(key, handler);
  };

  off = (key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) => {
    return this._EVENT.off(key, handler);
  };

  _emit(event: string, args: any) {
    return this._EVENT.emit(event, args);
  }

  private _confirmHandler() {
    this._EVENT.emit('complete', { target: this, type: 'complete' });
    this._close();
  }

  protected _clickHandler(e: MouseEvent) {
    super._clickHandler(e);
    this._EVENT.emit('click', { target: this, type: 'click' });
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    switch (name) {
      case 'oncomplete':
        this._EVENT.on('complete', new Function('return ' + value)());
        break;
      case 'onopen':
        this._EVENT.on('open', new Function('return ' + value)());
        break;
      case 'onclose':
        this._EVENT.on('close', new Function('return ' + value)());
        break;
      case 'onchange':
        this._EVENT.on('change', new Function('return ' + value)());
        break;
    }
  }

  private async _slotChange() {
    let tr = document.createElement('tr');
    const $table = this.shadowRoot?.querySelector('#table');
    this.querySelectorAll('column-item').forEach($child => {
      const td = document.createElement('td');
      td.appendChild($child as HTMLElement);
      if (this.shadowRoot?.querySelectorAll('column-item')?.length! % 2 === 0) {
        tr = document.createElement('tr');
        tr.appendChild(td);
        $table?.appendChild(tr);
      } else {
        $table?.lastChild?.appendChild(td);
      }
    });
  }

  render() {
    return template.call(this);
  }
}
