import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './formsection.html';
import scss from './formsection.scss';

export class FormSection extends DewsLayoutComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  @internalProperty()
  private _inputList: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
  render() {
    return template.call(this);
  }

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      const li = document.createElement('li');
      li.appendChild($el as HTMLElement);
      this.shadowRoot?.querySelector('.form-field')?.appendChild(li);
    });
  }
}
