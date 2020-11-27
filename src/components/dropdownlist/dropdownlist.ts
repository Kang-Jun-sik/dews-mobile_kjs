import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { Drawerlayout } from '../drawerlayout/drawerlayout.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

import template from './dropdownlist.html';
import scss from './dropdownlist.scss';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { DewsComponent } from '../base/DewsComponent.js';

// noinspection JSUnusedLocalSymbols
// @ts-expect-error
export class Dropdownlist extends ScopedElementsMixin(DewsFormComponent) {
  static styles = scss;

  static get scopedElements() {
    return {
      'drawer-layout': Drawerlayout,
      ...DewsComponent.getRegisteredComponents()
    };
  }

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @internalProperty()
  private active = false;

  @internalProperty()
  private height: string | undefined;

  private _startPoint: number | undefined;
  private _count = 0;
  private _multiCheck = false;
  private $itemList: Array<TemplateResult> = [];
  private select: Array<string> = [];
  private _selectList: Array<boolean> = [];
  private $nextBtn: TemplateResult | undefined;
  private _nextItem: number | undefined;
  private _allCheckState: boolean | undefined = false;

  constructor() {
    super();
    this._nextBtnView();
  }

  connectedCallback() {
    super.connectedCallback();
    this._itemview();
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
  }

  private _itemview() {
    this.$itemList = [];
    for (let i = 0; i <= this.children.length; i++) {
      if (this.children.item(i)?.localName === 'dropdownlist-item') {
        const title = this.children.item(i)?.getAttribute('title');
        if (this.multi) {
          this.$itemList.push(
            html`
              <li data-value="${title}" @click="${this._multiItemSelect}">
                <span class="text">${title}</span>
                <span data-value="${title}" class="checkbox">
                  <dews-checkbox class="multi-checkbox"></dews-checkbox>
                </span>
              </li>
            `
          );
        } else {
          this.$itemList.push(
            html`
              <li @click="${this._singleItemSelect}" data-value="${title}">
                <span>${title}</span>
              </li>
            `
          );
        }
      }
    }
  }

  private _nextBtnView() {
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
  }

  private _nextBtnClickHandler(e: MouseEvent) {
    const $el = this.parentElement?.parentElement?.children[this._nextItem!]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
  }

  private _allChecked(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._allCheckState = $el!.querySelector('.multi-checkbox')?.hasAttribute('checked');
    if ((e.target as HTMLElement).localName === 'dews-checkbox') {
      this._allCheckState = (e.target as HTMLElement).hasAttribute('checked');
    }
    this.shadowRoot!.querySelectorAll('.multi-checkbox').forEach($el => {
      if (this._allCheckState) {
        $el.setAttribute('checked', 'true');
      } else {
        $el.removeAttribute('checked');
      }
    });
  }

  private _singleItemSelect(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this.shadowRoot!.querySelector('.check')?.classList?.remove('check');
    $el.classList.add('check');
    this.select[0] = $el.dataset.value as string;
    this._close();
  }

  private _multiItemSelect(e: MouseEvent) {
    const $el: HTMLElement = (e.currentTarget as HTMLElement).querySelector('.multi-checkbox') as HTMLElement;
    if (this._allCheckState) {
      this.shadowRoot!.querySelector('.multi-checkbox')?.removeAttribute('checked');
    }
    if ($el.hasAttribute('checked')) {
      if ((e.target as HTMLElement).localName !== 'dews-checkbox') {
        $el.removeAttribute('checked');
      }
    } else {
      if ((e.target as HTMLElement).localName !== 'dews-checkbox') {
        $el.setAttribute('checked', 'true');
      }
    }
  }

  private _confirmClickHandler() {
    this._multiCheck = true;
    this.select = [];
    this._selectList = [];
    this.shadowRoot!.querySelectorAll('.multi-checkbox').forEach($el => {
      if ($el.hasAttribute('checked')) {
        if ($el.parentElement?.dataset.value !== 'allCheck') {
          this.select.push(($el.parentElement as HTMLDivElement).dataset.value!);
        }
        this._selectList.push(true);
      } else {
        this._selectList.push(false);
      }
    });
    this._close();
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
          this.shadowRoot!.querySelector('.dropdown-list-wrap')?.clientHeight! -
          25
      );
      this.height = `${this.shadowRoot!.querySelector('.dropdown-list-wrap')!.clientHeight + 120}px`;
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
  }

  private _close() {
    this._blur();
    if (this.multi && !this._multiCheck) {
      this.shadowRoot!.querySelectorAll('.multi-checkbox').forEach($el => {
        if ($el.hasAttribute('checked')) {
          $el.removeAttribute('checked');
        }
      });
    }
    this.active = false;
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
