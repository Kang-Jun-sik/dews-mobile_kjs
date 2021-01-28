import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './containerbutton.html';
import scss from './containerbutton.scss';

export class Containerbutton extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: Boolean, attribute: 'data-set' })
  setButton = false;

  @property({ type: Boolean, attribute: 'data-capture' })
  captureButton = false;

  @property({ type: Boolean, attribute: 'data-reset' })
  resetButton = false;

  @internalProperty()
  _iconList: Array<TemplateResult> = [];

  @internalProperty()
  _buttonList: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.setButton) {
      this._iconList.push(html` <li class="data-set">
        <button class="set"><span>Data Set</span></button>
      </li>`);
    }
    if (this.captureButton) {
      this._iconList.push(
        html`<li class="data-capture">
          <button class="capture"><span>Data Capture</span></button>
        </li>`
      );
    }
    if (this.resetButton) {
      this._iconList.push(
        html`<li class="data-reset">
          <button class="reset"><span>Data Reset</span></button>
        </li>`
      );
    }
  }

  private _slotChange(e: Event) {
    for (let i = 0; i < this.children.length; i++) {
      const li = document.createElement('li');
      if (this.children.item(i)?.tagName !== 'LI') {
        li.appendChild(this.children.item(i) as Element);
        this.shadowRoot?.querySelector('#custom')?.appendChild(li);
      }
    }
    if (this.shadowRoot?.querySelector('#custom')?.children.length === 0) {
      this.shadowRoot?.querySelector('.option-custom-button')?.remove();
    }
  }

  render() {
    return template.call(this);
  }
}
