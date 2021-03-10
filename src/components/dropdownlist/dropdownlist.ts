import { internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import template from './dropdownlist.html';
import scss from './dropdownlist.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { DropdownlistItem } from './dropdownlist-item.js';
import { DataSource } from '../datasource/dews-datasource.js';
import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
import { Columnitem } from '../columnsetbutton/columnitem.js';
import { TouchScroll } from '../utill/touchscroll.js';

type EVENT = 'change' | 'open' | 'close' | 'select' | 'dataBound';

export class Dropdownlist extends DrawerBottomBase {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: String })
  datasource: string | undefined;

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: String, attribute: 'key-field' })
  field = 'key';

  @property({ type: String, attribute: 'label-field' })
  labelField = 'label';

  @property({ type: String, attribute: 'checked-field' })
  checkedField = 'checked';

  @property({ type: String, attribute: 'disabled-field' })
  disabledField = 'disabled';

  @property({ type: Function })
  onComplete: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onOpen: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onClose: ((args: EventArgs) => void) | undefined;

  @property({ type: Function })
  onChange: ((args: EventArgs) => void) | undefined;

  @property({ type: Boolean, attribute: 'auto-bind' })
  autoBind = false;

  @property({ type: Boolean, reflect: true })
  dimming = false;

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String, reflect: true })
  value = '';

  @internalProperty()
  active = false;

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private $itemList: Array<TemplateResult> = [];

  private _startPoint: number | undefined;
  private _count = 0;
  private _multiCheck = false;

  @internalProperty()
  select: Array<string> = [];

  private _selectList: Array<boolean> = [];

  @internalProperty()
  _allCheckState: boolean | undefined = false;

  constructor() {
    super();
  }

  /**
   * 체크된 아이템의 data 를 반환합니다.
   * @return Array<Object> 체크된 아이템의 Array 를 반환함니다.
   * */
  getCheckItems(): Array<any> {
    const resultValue: Array<any> = [];
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).checked) {
        const obj = {
          [this.field]: ($item as Columnitem).field,
          [this.labelField]: ($item as Columnitem).label,
          [this.checkedField]: ($item as Columnitem).checked,
          [this.disabledField]: ($item as Columnitem).disabled
        };
        resultValue.push(obj);
      }
    });
    return resultValue;
  }

  /**
   * 체크된 아이템의 data 를 반환합니다.
   * @return any 체크된 아이템의 Object 를 반환함니다.
   * */
  getCheckItem(): any {
    let obj = {};
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).checked) {
        return (obj = {
          [this.field]: ($item as Columnitem).field,
          [this.labelField]: ($item as Columnitem).label,
          [this.checkedField]: ($item as Columnitem).checked,
          [this.disabledField]: ($item as Columnitem).disabled
        });
      }
    });
    return obj;
  }

  /**
   * 드롭다운 아이템리스트를 추가합니다.
   * @param {Array<Object>} data 아이템의 옵션을 설정합니다.
   * @param {String} data.(key)  아이템의 필드를 설정합니다.(필 수값);
   * @param {String} data.(label-field)아이템의 라벨을 설정합니다.
   * @param {Boolean} data.(checked-field) 아이템의 초기 체크유무를 설정합니다.
   * @param {Boolean} data.(disabled-field) 아이템의 선택 가능여부를 설정합니다.
   * */
  async setCheckItems(data: Array<object>) {
    await Array.from(data).forEach(DATA => {
      const map = new Map(Object.entries(DATA));
      this.checkItem(map.get(`${this.field}`));
    });
    await this._selectChange();
  }

  /**
   * 드롭다운 아이템을 가져옵니다.
   * @param key {String} key-field 아이템의 키 필드입니다.
   * @return {object} 아이템의 data 를 반환합니다.
   * */
  getItem(key: string): object {
    let resultValue: object = {};
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === key) {
        resultValue = {
          [this.field]: ($item as Columnitem).field,
          [this.labelField]: ($item as Columnitem).label,
          [this.checkedField]: ($item as Columnitem).checked,
          [this.disabledField]: ($item as Columnitem).disabled
        };
      }
    });
    return resultValue;
  }

  /**
   * 드롭다운 아이템리스트를 가져옵니다.
   * @param key {String} key-field 아이템의 키 필드입니다.
   * @return Array{Array<object>} 아이템의 data 리스트를 반환합니다.
   * */
  getItems(): Array<object> {
    const resultValue: Array<object> = [];
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      let obj: object = {};
      obj = {
        [this.field]: ($item as Columnitem).field,
        [this.labelField]: ($item as Columnitem).label,
        [this.checkedField]: ($item as Columnitem).checked,
        [this.disabledField]: ($item as Columnitem).disabled
      };
      resultValue.push(obj);
    });
    return resultValue;
  }

  /**
   * 드롭다운 아이템을 추가합니다.
   * @param {Object} data 아이템의 옵션을 설정합니다.
   * @param {String} data.(label-field)아이템의 라벨을 설정합니다.
   * @param {Boolean} data.(checked-field) 아이템의 초기 체크유무를 설정합니다.
   * @param {Boolean} data.(disabled-field) 아이템의 선택 가능여부를 설정합니다.
   * */
  async setItem(data: object) {
    await this.removeItems().then(() => {
      const item = document.createElement('dropdownlist-item') as DropdownlistItem;
      for (const mapKey in data) {
        const map = new Map(Object.entries(data));
        switch (mapKey) {
          case `${this.field}`:
            item.field = map.get(`${this.field}`);
            break;
          case `${this.labelField}`:
            item.label = map.get(`${this.labelField}`);
            break;
          case `${this.checkedField}`:
            item.checked = Boolean(map.get(`${this.checkedField}`));
            break;
          case `${this.disabledField}`:
            item.disabled = Boolean(map.get(`${this.disabledField}`));
            break;
        }
      }
      this.appendChild(item);
      this._selectChange();
    });
  }

  /**
   * 드롭다운 아이템리스트를 추가합니다.
   * @param {Array<Object>} data 아이템의 옵션을 설정합니다.
   * @param {String} data.(key)  아이템의 필드를 설정합니다.(필 수값);
   * @param {String} data.(label-field)아이템의 라벨을 설정합니다.
   * @param {Boolean} data.(checked-field) 아이템의 초기 체크유무를 설정합니다.
   * @param {Boolean} data.(disabled-field) 아이템의 선택 가능여부를 설정합니다.
   * */
  async setItems(data: Array<object>) {
    await data.forEach(DATA => {
      this.setItem(DATA);
    });
    await this._selectChange();
  }

  /**
   *  드롭다운 아이템을 제거합니다.
   *  @param key {string} 아이템의 key-field
   * */
  async removeItem(key: string) {
    await this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === key) {
        $item.remove();
      }
    });
    await this._selectChange();
  }

  /**
   *  드롭다운 아이템전체를 제거합니다.
   * */
  async removeItems() {
    await this.querySelectorAll('dropdownlist-item').forEach($item => {
      $item.remove();
    });
    await this._selectChange();
  }

  /**
   * 드롭다운 아이템의 옵션을 변경합니다.
   * @param {Object} data 아이템의 옵션을 설정합니다.
   * @param {String} data.(label-field)아이템의 라벨을 설정합니다.
   * @param {Boolean} data.(checked-field) 아이템의 초기 체크유무를 설정합니다.
   * @param {Boolean} data.(disabled-field) 아이템의 선택 가능여부를 설정합니다.
   * */
  async updateItem(data: object) {
    const map = new Map(Object.entries(data));
    await this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === map.get(`${this.field}`)) {
        ($item as DropdownlistItem).label = map.get(`${this.labelField}`);
        ($item as DropdownlistItem).checked = Boolean(map.get(`${this.checkedField}`));
        ($item as DropdownlistItem).disabled = Boolean(map.get(`${this.disabled}`));
      }
    });
    await this._selectChange();
  }

  /**
   *  드롭다운 아이템의 모든 체크를 해제합니다.
   * */
  uncheckItems() {
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      ($item as DropdownlistItem).checked = false;
    });
    this.select = [];
  }

  /**
   *  드롭다운 아이템의 체크를 해제합니다.
   *  @param key {string} 아이템의 key-field
   * */
  async uncheckItem(key: string) {
    await this._checkChange(key, false);
    await this._selectChange();
  }

  /**
   *  드롭다운 아이템의 체크합니다.
   *  @param key {string} 아이템의 key-field
   * */
  async checkItem(key: string) {
    await this._checkChange(key, true);
    await this._selectChange();
  }

  // key 값으로 체크 상태 변경함수
  private async _checkChange(key: string, state: boolean) {
    await this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === key) {
        ($item as DropdownlistItem).checked = state;
      }
    });
  }

  _singleClickHandler() {
    this.text = `${this.select[0]}`;
  }

  close() {
    this._close();
  }

  //이벤트 객체 생성
  _EVENT = new EventEmitter();

  // 이벤트 등록

  public on(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this._EVENT.off(key, handler);
  }

  private _datasource?: DataSource;

  connectedCallback() {
    super.connectedCallback();
    this.value = (this.querySelector('dropdownlist-item[checked]') as DropdownlistItem).value;

    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
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

  /**
   * DATASource 기반으로 컴포넌트 생성
   * */
  private createItemList() {
    const data = this._datasource?.data();
    let item: DropdownlistItem;
    data?.forEach(_data => {
      if (this.field !== undefined) {
        item = document.createElement('dropdownlist-item') as DropdownlistItem;
        item.field = (_data as any)[this.field];
        if (this.labelField !== undefined) {
          item.label = (_data as any)[this.labelField];
        }
        if (this.disabledField) {
          item.disabled = Boolean((_data as any)[this.disabledField]);
        }
        if (this.multi && this.checkedField) {
          item.checked = Boolean((_data as any)[this.checkedField]);
        }
        this.appendChild(item);
      } else {
        // console.log('필드가 없습니다.');
      }
    });
  }

  private _allChecked(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._allCheckState = !this._allCheckState;
    this.querySelectorAll('dropdownlist-item').forEach($el => {
      if (this._allCheckState) {
        ($el as DropdownlistItem).checked = true;
      } else {
        ($el as DropdownlistItem).checked = false;
      }
    });
  }

  _confirmClickHandler = () => {
    this._multiCheck = true;
    this._selectChange();
    this._close();
  };

  // select변경시 text 변경을 위해 처리
  private _selectChange() {
    this.select = [];
    this._selectList = [];
    this.querySelectorAll('dropdownlist-item').forEach($el => {
      if ($el.hasAttribute('checked')) {
        this.select.push(($el as DropdownlistItem).title);
        this._selectList.push(true);
      } else {
        this._selectList.push(false);
      }
    });
  }

  click() {
    this._clickHandler(new MouseEvent('click'));
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    new TouchScroll(this.shadowRoot?.querySelector('.control') as HTMLElement);
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

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('select')) {
      if (this.select[0] !== undefined) {
        if (this.multi) {
          this.text = `${this.select[0]} ${this.select.length > 1 ? '외' + `${this.select.length - 1}건` : ''}`;
        } else {
          this.text = `${this.select[0]}`;
        }
      } else {
        this.text = '';
      }
    }
  }

  private _slotChange() {
    this.select = [];
    this.querySelectorAll('dropdownlist-item[checked]').forEach($el => {
      this.select.push(($el as DropdownlistItem).title);
    });
  }

  render() {
    return template.call(this);
  }
}
