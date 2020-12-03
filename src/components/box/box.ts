import { DewsAreaComponent } from '../base/exports.js';
import { internalProperty, LitElement, property, PropertyValues } from 'lit-element';

import template from './box.html';
import scss from './box.scss';

// noinspection JSUnusedLocalSymbols
export class Box extends DewsAreaComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: Boolean })
  collapsed = false;

  @property({ type: Boolean })
  hide = false;

  @internalProperty()
  height = 'auto';

  private slotHeight: string | undefined;

  async connectedCallback() {
    await super.connectedCallback();
    await this.updateComplete;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickEvent);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.addEventListener('click', this._clickEvent);
  }

  public _blurEvent() {
    //블러이벤트
  }

  private _clickEvent(e: Event) {
    this._focusChanging(e);
  }

  private _onToggleClick(e: Event) {
    if (!this.collapsed) {
      this.collapsed = true;
      this.height = '0px';
      const close = new CustomEvent('close');
      this.dispatchEvent(close);
    } else {
      const open = new CustomEvent('open');
      this.dispatchEvent(open);
      this.collapsed = false;
      this.height = this.slotHeight as string;
    }
  }

  protected enable: Function = (value: boolean) => {
    return (this.collapsed = value);
  };

  private async slotChange() {
    if (this.collapsed) {
      this.height = '0px';
    }
    const children: NodeListOf<LitElement> = this.shadowRoot!.querySelectorAll('*');

    await Promise.all(Array.from(children).map(c => c.updateComplete));
    this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content-wrap')?.clientHeight}px`;
    if (!this.collapsed) {
      this.height = this.slotHeight;
    } else {
      this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
  }

  render() {
    return this.hide ? null : template.call(this);
  }
}
