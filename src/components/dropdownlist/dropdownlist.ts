import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { Drowerlayout } from '../drowerlayout/drowerlayout.js';

import _html from './dropdownlist.html';
import _scss from './dropdownlist.scss';

export class Dropdownlist extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: Boolean, reflect: true })
  multi: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @internalProperty()
  private active: boolean = false;

  private _startPoint;
  private _count = 0;
  private _multiCheck: boolean = false;
  private $itemList: Array<TemplateResult> = [];

  @internalProperty()
  private height;

  select: Array<string> = [];
  private _selectList: Array<boolean> = [];
  private $nextBtn: TemplateResult;
  private _nextItem: number;
  private _allCheckState: boolean = false;

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
        const title = this.children.item(i).getAttribute('title');
        if (this.multi) {
          this.$itemList.push(
            html`
              <li data-value="${title}" @click="${this._multiItemSelect}">
                <span class="text">${title}</span>
                <span data-value="${title}" class="checkbox">
                  <dews-checkbox></dews-checkbox>
                </span>
              </li>
            `,
          );
        } else {
          this.$itemList.push(
            html`
              <li @click="${this._singleItemSelect}" data-value="${title}">
                <span>${title}</span>
              </li>
            `,
          );
        }
      }
    }
  }

  private _nextBtnView() {
    const $el = this.parentElement.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._nextItem = i + 1;
        if ($el.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el.item(i + 1).hasAttribute('disabled') ||
            $el.item(i + 1).hasAttribute('readonly') ||
            $el.item(i + 1).localName === 'dews-button' ||
            $el.item(i + 1).localName === 'dews-radiobutton-group' ||
            $el.item(i + 1).localName === 'dews-checkbox-group'
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

  private _nextBtnClickHandler(e) {
    const $el = this.parentElement?.parentElement?.children[this._nextItem]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
  }

  private _allChecked(e) {
    this._allCheckState = !e.currentTarget.querySelector('dews-checkbox').hasAttribute('checked');
    if (e.target.localName === 'dews-checkbox') {
      this._allCheckState = e.target.hasAttribute('checked');
    }
    this.shadowRoot.querySelectorAll('dews-checkbox').forEach($el => {
      if (this._allCheckState) {
        $el.setAttribute('checked', 'true');
      } else {
        $el.removeAttribute('checked');
      }
    });
  }

  private _singleItemSelect(e) {
    const $el: HTMLElement = e.currentTarget;
    this.shadowRoot.querySelector('.check')?.classList?.remove('check');
    $el.classList.add('check');
    this.select[0] = e.currentTarget.dataset.value;
    this._close();
  }

  private _multiItemSelect(e) {
    const $el: HTMLElement = e.currentTarget.querySelector('dews-checkbox');
    if (this._allCheckState) {
      this.shadowRoot.querySelector('dews-checkbox').removeAttribute('checked');
    }
    if ($el.hasAttribute('checked')) {
      if (e.target.localName !== 'dews-checkbox') {
        $el.removeAttribute('checked');
      }
    } else {
      if (e.target.localName !== 'dews-checkbox') {
        $el.setAttribute('checked', 'true');
      }
    }
  }

  private _confirmClickHandler() {
    this._multiCheck = true;
    this.select = [];
    this._selectList = [];
    this.shadowRoot.querySelectorAll('dews-checkbox').forEach($el => {
      if ($el.hasAttribute('checked')) {
        if ($el.parentElement.dataset.value !== 'allCheck') {
          this.select.push($el.parentElement.dataset.value);
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

  private _touchMove(e) {
    e.passive = true;
    e.capture = true;
    e.currentTarget.scrollTo(0, this._startPoint - e.changedTouches[0].screenY);
  }

  private _touchStart(e) {
    this._startPoint = e.changedTouches[0].screenY + e.currentTarget.scrollTop;
  }

  private _focus() {
    this.shadowRoot.querySelector('.select-wrap').classList.add('focus');
  }

  private _blur() {
    this.shadowRoot.querySelector('.select-wrap').classList.remove('focus');
  }

  private _clickHandler(e) {
    if (!this.disabled && !this.readonly) {
      const $el: Drowerlayout = this.shadowRoot.querySelector('drower-layout');
      window.scrollTo(
        0,
        window.pageYOffset +
          this.parentElement?.getBoundingClientRect()?.top -
          this.shadowRoot.querySelector('.dropdown-list-wrap').clientHeight -
          25,
      );
      // this.height = `${this.shadowRoot.querySelector('.dropdown-list-wrap').clientHeight + 120}px`
      $el.height = this.height;
      this._open();
    }
  }

  private _open() {
    this._focus();
    this.shadowRoot.querySelectorAll('dews-checkbox').forEach(($el, index) => {
      if (this._selectList[index]) {
        $el.setAttribute('checked', 'true');
      }
    });

    this.active = true;
  }

  private _close() {
    this._blur();
    if (this.multi && !this._multiCheck) {
      this.shadowRoot.querySelectorAll('dews-checkbox').forEach($el => {
        if ($el.hasAttribute('checked')) {
          $el.removeAttribute('checked');
        }
      });
    }
    this.active = false;
  }

  private _domClickHandelr(e) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot.querySelector('drower-layout').shadowRoot.querySelector('.layer-bottom').clientHeight
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
    this.shadowRoot.querySelector('drower-layout').addEventListener('blur', this._close);
    if (this.disabled) {
      this.shadowRoot.querySelector('.select-wrap').classList.add('disabled');
    }
    if (this.readonly) {
      this.shadowRoot.querySelector('.select-wrap').classList.add('readonly');
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
    return _html.bind(this)();
  }
}
