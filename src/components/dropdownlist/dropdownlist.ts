import { internalProperty, property, TemplateResult } from 'lit-element';
import template from './dropdownlist.html';
import scss from './dropdownlist.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { DropdownlistItem } from './dropdownlist-item.js';
import { DataSource } from '../datasource/dews-datasource.js';
import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
import { Columnitem } from '../columnsetbutton/columnitem.js';

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
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @internalProperty()
  active = false;

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private $itemList: Array<TemplateResult> = [];

  private _startPoint: number | undefined;
  private _count = 0;
  private _multiCheck = false;

  select: Array<string> = [];
  private _selectList: Array<boolean> = [];

  @internalProperty()
  _allCheckState: boolean | undefined = false;

  constructor() {
    super();
  }

  getCheckItems(): Array<object> {
    const resultValue: Array<object> = [];
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

  setCheckItems(data: Array<object>) {
    data.forEach(DATA => {
      const map = new Map(Object.entries(DATA));
      this.checkItem(map.get(`${this.field}`));
    });
  }

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
      console.log('여기');
      resultValue.push(obj);
    });
    return resultValue;
  }

  setItem(data: object) {
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
  }

  setItems(data: Array<object>) {
    data.forEach(DATA => {
      this.setItem(DATA);
    });
  }

  removeItem(key: string) {
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === key) {
        $item.remove();
      }
    });
  }

  removeItems() {
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      $item.remove();
    });
  }

  updateItem(data: object) {
    const map = new Map(Object.entries(data));
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === map.get(`${this.field}`)) {
        ($item as DropdownlistItem).label = map.get(`${this.labelField}`);
        ($item as DropdownlistItem).checked = Boolean(map.get(`${this.checkedField}`));
        ($item as DropdownlistItem).disabled = Boolean(map.get(`${this.disabled}`));
      }
    });
  }

  checkItem(key: string) {
    this.querySelectorAll('dropdownlist-item').forEach($item => {
      if (($item as DropdownlistItem).field === key) {
        ($item as DropdownlistItem).checked = true;
      }
    });
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
    if (this.select[0] !== undefined) {
      if (this.multi) {
        this.text = `${this.select[0]} ${this.select.length > 1 ? '외' + `${this.select.length - 1}건` : ''}`;
      } else {
        this.text = `${this.select[0]}`;
      }
    } else {
      this.text = '';
    }
    console.log('여기임니다');
    this._close();
  };

  click() {
    this._clickHandler(new MouseEvent('click'));
  }

  private _touchMove(e: any) {
    e.passive = true;
    e.capture = true;
    e.currentTarget.scrollTo(0, this._startPoint! - e.changedTouches[0].screenY);
  }

  private _touchStart(e: any) {
    this._startPoint = e.changedTouches[0].screenY + e.currentTarget.scrollTop;
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

  render() {
    return template.call(this);
  }
}
