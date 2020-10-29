import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { internalProperty, html, property } from 'lit-element';

import _html from './tabs.html';
import _scss from './tabs.scss';

export class Tabs extends DewsLayoutComponent {
  static styles = _scss;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this._focusIn);
    this.addEventListener('blur', this._focusBlur);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this._focusIn);
    this.removeEventListener('blur', this._focusBlur);
  }

  @property({ type: Number })
  selected: number = 0;

  @property({ type: Boolean })
  hide: boolean = false;

  @internalProperty()
  private titleList;

  select: Function = (select: number) => {
    this._select(select);
  };

  private _focusIn(e) {
    this._focusChanging(e);
    const focusIn = new CustomEvent('focusIn');
    this.dispatchEvent(focusIn);
  }

  private _focusBlur(e) {
    this._focusChanging(e);
    const focusBlur = new CustomEvent('focusBlur');
    this.dispatchEvent(focusBlur);
  }

  private _select: Function = (select: number) => {
    this.shadowRoot.querySelector('.title-list').querySelector('.active').classList.remove('active');
    this.shadowRoot.querySelector('.title-list').querySelectorAll('.title')[select].classList.add('active');
    this.querySelectorAll('dews-tab').forEach(tab => {
      tab.shadowRoot.querySelector('.content')?.classList?.remove('active');
    });
    this.querySelectorAll('dews-tab')[select].shadowRoot.querySelector('.content')?.classList?.add('active');
    this.selected = select;
    // const tabChange = new Event('tabChange');
    this.dispatchEvent(new CustomEvent('tabChange', { detail: { select: select } }));
    // this.dispatchEvent(this.eventTest);
    // console.log(tabChange);
  };

  private _clickHandler(e) {
    this.shadowRoot.querySelectorAll('.title').forEach((tab, index) => {
      if (tab === e.currentTarget) {
        this._select(index);
      }
    });
  }

  private slotChange(e) {
    this.titleList = e.target.assignedElements().map((tab, index) => {
      if (tab.hide) return;
      if (index === this.selected) {
        return html`<button class="title active" title="${tab.title}" @click="${this._clickHandler}">
          <span>${tab.title}</span>
        </button>`;
      }
      return html`<button class="title" title="${tab.title}" @click="${this._clickHandler}">
        <span>${tab.title}</span>
      </button>`;
    });
    e.target.assignedElements()[this.selected].shadowRoot.children[0].classList.add('active');
  }

  render() {
    return this.hide ? null : _html.bind(this)();
  }
}
