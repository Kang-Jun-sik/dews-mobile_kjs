import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './formsection.html';
import scss from './formsection.scss';

export class FormSection extends DewsLayoutComponent {
  static styles = scss;

  constructor() {
    super();
    for (let i = 0; i < this.childElementCount; i++) {
      this._inputList.push(html`<li>${this.children.item(i)}</li>`);
    }
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
}
