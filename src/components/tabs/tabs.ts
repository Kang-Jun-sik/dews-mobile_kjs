import { DewsAreaComponent } from '../base/exports.js';
import { html, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './tabs.html';
import scss from './tabs.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT = 'click' | 'blur' | 'focus' | 'change';

export class Tabs extends DewsAreaComponent {
  static styles = scss;

  async connectedCallback() {
    this.addEventListener('click', this._focusIn);
    this.addEventListener('blur', this._focusBlur);
    this._firstTabUpdate();
    await super.connectedCallback();
  }

  //이벤트 객체 생성
  #EVENT = new EventEmitter();
  // 이벤트 등록
  public on(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.off(key, handler);
  }

  @property({ type: Number })
  selected = 0;

  @property({ type: Boolean })
  hide = false;

  @property({ type: String })
  title = '';

  private _firstTabUpdate() {
    this.title = this.children.item(0)?.getAttribute('title') ?? '';
    for (let i = 0; i < this.children.length; i++) {
      const title = this.children.item(i)?.getAttribute('title');
      if (i === this.selected - 1) {
        this.children.item(i)?.setAttribute('active', 'true');
        this.titleList.push(html` <button class="title active" title="${title}" @click="${this._clickHandler}">
          <span>${title}</span>
        </button>`);
      } else if (!this.children.item(i)?.hasAttribute('hide')) {
        this.titleList.push(html`<button class="title" title="${title}" @click="${this._clickHandler}">
          <span>${title}</span>
        </button>`);
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._focusIn);
    this.removeEventListener('blur', this._focusBlur);
  }

  private titleList: Array<TemplateResult> = [];

  select: Function = (select: number) => {
    this._select(select);
  };

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updateComplete.then(() => {
      this._select(this.selected);
    });
  }

  private _focusIn(e: FocusEvent) {
    this._focusChanging(e);
    this.#EVENT.emit('focus', { target: this, type: 'focus' });
  }

  private _focusBlur(e: FocusEvent) {
    this._focusChanging(e);
    this.#EVENT.emit('blur', { target: this, type: 'blur' });
  }

  private _select: Function = (select: number) => {
    this.shadowRoot!.querySelector('.title-list')?.querySelector('.active')?.classList?.remove('active');
    this.shadowRoot!.querySelector('.title-list')?.querySelectorAll('.title')[select].classList.add('active');
    this.querySelectorAll('dews-tab').forEach(tab => {
      tab.shadowRoot!.querySelector('.content')?.classList?.remove('active');
    });
    this.querySelectorAll('dews-tab')[select].shadowRoot?.querySelector('.content')?.classList?.add('active');
    if (this.selected !== select) {
      this.selected = select;
      this.#EVENT.emit('change', { target: this, type: 'change' });
    }
  };

  private _clickHandler(e: MouseEvent) {
    this.shadowRoot!.querySelectorAll('.title').forEach((tab, index) => {
      if (tab === e.currentTarget) {
        this._select(index);
      }
    });
  }

  render() {
    return this.hide ? null : template.call(this);
  }
}
