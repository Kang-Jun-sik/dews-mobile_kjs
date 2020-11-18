import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './tabs.html';
import scss from './tabs.scss';

export class Tabs extends DewsLayoutComponent {
  static styles = scss;

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this._focusIn);
    this.addEventListener('blur', this._focusBlur);
    this.updateComplete;
    // console.log('Tabs UpdateComplete');
    this._firstTabUpdate();
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
    this.removeEventListener('focusin', this._focusIn);
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
    const focusIn = new CustomEvent('focusIn');
    this.dispatchEvent(focusIn);
  }

  private _focusBlur(e: FocusEvent) {
    this._focusChanging(e);
    const focusBlur = new CustomEvent('focusBlur');
    this.dispatchEvent(focusBlur);
  }

  private _select: Function = (select: number) => {
    this.shadowRoot!.querySelector('.title-list')?.querySelector('.active')?.classList?.remove('active');
    this.shadowRoot!.querySelector('.title-list')?.querySelectorAll('.title')[select].classList.add('active');
    this.querySelectorAll('dews-tab').forEach(tab => {
      tab.shadowRoot!.querySelector('.content')?.classList?.remove('active');
    });
    this.querySelectorAll('dews-tab')[select].shadowRoot?.querySelector('.content')?.classList?.add('active');
    this.selected = select;
    // const tabChange = new Event('tabChange');
    this.dispatchEvent(new CustomEvent('tabChange', { detail: { select: select } }));
    // this.dispatchEvent(this.eventTest);
    // console.log(tabChange);
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
