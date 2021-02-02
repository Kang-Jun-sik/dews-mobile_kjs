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

  @property({ type: String })
  field: string | undefined;

  @property({ type: String, attribute: 'label-field' })
  labelField: string | undefined;

  @property({ type: String, attribute: 'checked-field' })
  checkedField: string | undefined;

  @property({ type: String, attribute: 'disabled-field' })
  disabledField: string | undefined;

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
        console.log('필드가 없습니다.');
      }
    });

    // this.appendChild(' ')
  }

  /**
   * 아이템 요소를 반환합니다.
   * @param i 아이템의 인덱스 혹은 필드를 입력받아 요소를 반환합니다.
   * @return 아이템을 반환합니다.
   * */
  getItem(i: number | string): Columnitem | undefined {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    let returnValue: Columnitem | undefined;
    if (typeof i === 'number') {
      returnValue = item?.item(i) as Columnitem;
    } else {
      item?.forEach($el => {
        if (($el as Columnitem).field === i) {
          returnValue = $el as Columnitem;
        }
      });
    }
    return returnValue;
  }

  /**
   * 아이템의 리스트를 반환 합니다.
   * @return {Map<string,boolean>>}
   * key 데이터소스의 필드 값 입니다.
   * value 현재 체크 상태를 가지고 있습니다.
   * */
  getItemList(): Map<string, boolean> {
    const list = new Map();
    this.shadowRoot?.querySelectorAll('column-item').forEach($el => {
      if ($el.hasAttribute('checked')) {
        list.set(($el as Columnitem).field, true);
      } else {
        list.set(($el as Columnitem).field, false);
      }
    });
    return list;
  }

  /**
   * Columns-item 을 추가합니다.
   * @param {String} field 아이템의 라벨을 설정합니다.
   * @param {Object} options 아이템의 옵션을 설정합니다.
   * @param {Boolean} options.label 아이템의 라벨을 설정합니다.
   * @param {Boolean} options.checked 아이템의 초기 체크유무를 설정합니다.
   * @param {Boolean} options.disabled 아이템의 선택 가능여부를 설정합니다.
   * */
  addItem(field: string, options?: { label?: string; checked?: boolean; disabled?: boolean }) {
    const item = document.createElement('column-item');
    item.setAttribute('field', field);
    if (options === undefined) {
      if (options!.checked !== undefined && options!.checked) {
        item.setAttribute('checked', '');
      }
      if (options!.disabled !== undefined && options!.disabled) {
        item.setAttribute('disabled', '');
      }
    }
    this.shadowRoot?.appendChild(item);
  }

  /**
   * 아이템을 지웁니다
   * @param {Number} i 아이템의 index
   * @param {String} i 필드
   * */
  removeItem(i: number | string) {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    if (typeof i === 'number') {
      item?.item(i).remove();
    } else {
      item?.forEach($el => {
        if (($el as Columnitem).field === i) {
          $el.remove();
        }
      });
    }
  }

  /**
   * item Check 상태로 변경 합니다.
   * @param {Number} i 아이템의 index
   * */
  checkItem(i: number | string) {
    const item = this.shadowRoot?.querySelectorAll('column-item');
    if (typeof i === 'number') {
      item?.item(i).setAttribute('checked', '');
    } else {
      item?.forEach($el => {
        if (($el as Columnitem).field === i) {
          ($el as Columnitem).checked = true;
        }
      });
    }
  }

  /**
   * 아이템의 라벨리스트를 반환 합니다.
   * @return {Array} 아이템의 라벨리스트를 가져옵니다.
   * */
  getItemLabelList() {
    const list = new Map();
    this.shadowRoot?.querySelectorAll('COLUMN-ITEM').forEach(($el, index) => {
      list.set(index, ($el as Columnitem).label);
    });
    return list;
  }

  /**
   * 체크되어진 아이템의 index 를 배열로 반환합니다.
   * @return [] 체크표시된 아이템의 index 를 반환함니다.
   * */
  getCheckIndexList() {
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
    const ab = this.getItemList();

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
        console.log('컴플리트 함수셋팅');
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
    this.querySelectorAll('column-item').forEach(($child, index) => {
      const td = document.createElement('td');
      td.appendChild($child as HTMLElement);
      if (index % 2 === 0) {
        tr = document.createElement('tr');
        tr.appendChild(td);
        if (this.children.length === 0) {
          if ((this.shadowRoot?.querySelector('#table')?.lastChild as HTMLElement).children.length === 1) {
            (this.shadowRoot?.querySelector('#table')?.lastChild as HTMLElement).appendChild(td);
          } else {
            this.shadowRoot?.querySelector('#table')?.appendChild(tr);
          }
        }
      } else {
        tr.appendChild(td);
        this.shadowRoot?.querySelector('#table')?.appendChild(tr);
      }
    });
  }

  render() {
    return template.call(this);
  }
}
