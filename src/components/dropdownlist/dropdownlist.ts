import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { Drawerlayout } from '../drawerlayout/drawerlayout.js';
import template from './dropdownlist.html';
import scss from './dropdownlist.scss';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { DropdownlistItem } from './dropdownlist-item.js';
import { DataSource } from '../datasource/dews-datasource.js';

type EVENT = 'change' | 'open' | 'close' | 'select' | 'dataBound';

export class Dropdownlist extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

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

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  once = false;

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
  private $nextBtn: TemplateResult | undefined;
  private _nextItem: number | undefined;

  @internalProperty()
  _allCheckState: boolean | undefined = false;

  constructor() {
    super();
    this.#nextBtnView();
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

  private _confirmClickHandler() {
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
    this._close();
  }

  #nextBtnView = () => {
    const $el: HTMLCollection = this.parentElement?.children as HTMLCollection;
    for (let i = 0; i <= $el.length; i++) {
      if ($el!.item(i) === this) {
        this._nextItem = i + 1;
        if ($el!.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el!.item(i + 1)?.hasAttribute('disabled') ||
            $el!.item(i + 1)?.hasAttribute('readonly') ||
            $el!.item(i + 1)?.localName === 'dews-button' ||
            $el!.item(i + 1)?.localName === 'dews-radiobutton-group' ||
            $el!.item(i + 1)?.localName === 'dews-checkbox-group'
          ) {
            this.$nextBtn = html``;
          } else {
            this.$nextBtn = html`<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
          }
        }
      }
    }
  };

  private _nextBtnClickHandler(e: MouseEvent) {
    const $el = this.parentElement?.parentElement?.children[this._nextItem!]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
  }

  click() {
    this._confirmClickHandler();
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

  private _focus() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.add('focus');
  }

  private _blur() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.remove('focus');
  }

  private _clickHandler(e: MouseEvent) {
    if (!this.disabled && !this.readonly) {
      const $el: Drawerlayout | null = this.shadowRoot!.querySelector('.drawer-layout');
      window.scrollTo(
        0,
        window.pageYOffset +
          this.parentElement?.getBoundingClientRect()?.top! -
          this.shadowRoot!.querySelector('.dropdownlist-wrap')?.clientHeight! -
          25
      );
      this.height = `${this.shadowRoot!.querySelector('.dropdownlist-wrap')!.clientHeight + 120}px`;
      $el!.height = this.height;
      this._open();
    }
  }

  private _open() {
    this._focus();
    this.shadowRoot!.querySelectorAll('.multi-checkbox').forEach(($el, index) => {
      if (this._selectList[index]) {
        $el.setAttribute('checked', 'true');
      }
    });
    this.active = true;
    this._EVENT.emit('open', { target: this, type: 'open' });
  }

  _close() {
    this._blur();
    if (this.multi && !this._multiCheck) {
      this.shadowRoot!.querySelectorAll('.multi-checkbox').forEach($el => {
        if ($el.hasAttribute('checked')) {
          $el.removeAttribute('checked');
        }
      });
    }
    this.active = false;
    this._EVENT.emit('close', { target: this, type: 'close' });
  }

  private _domClickHandelr(e: MouseEvent) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.drawer-layout')?.shadowRoot!.querySelector('.layer-bottom')?.clientHeight!
      ) {
        if (!this.active) {
          return;
        }
        if (this._count >= 1) {
          this._close();
        }
      }
      this._count++;
    }
  }

  private _addEvent = this._domClickHandelr.bind(this);

  protected firstUpdated(_changedProperties: PropertyValues) {
    this.shadowRoot!.querySelector('.drawer-layout')?.addEventListener('blur', this._close);
    if (this.disabled) {
      this.shadowRoot!.querySelector('.select-wrap')?.classList.add('disabled');
    }
    if (this.readonly) {
      this.shadowRoot!.querySelector('.select-wrap')?.classList.add('readonly');
    }
    super.firstUpdated(_changedProperties);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (this.active) {
      document.addEventListener('click', this._addEvent);
    } else {
      this._count = 0;
      document.removeEventListener('click', this._addEvent);
    }
    return super.shouldUpdate(_changedProperties);
  }

  render() {
    return template.call(this);
  }
}
