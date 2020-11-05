import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { html, internalProperty, property } from 'lit-element';

import _html from './formsection.html';
import _scss from './formsection.scss';

export class FormSection extends DewsLayoutComponent {
  static styles = _scss;

  constructor() {
    super();
    for (let i = 0; i < this.childElementCount; i++) {
      this._inputList.push(html`<li>${this.children.item(i)}</li>`);
    }
  }

  @property({ type: String })
  title: string = '';

  @internalProperty()
  private _inputList: Array<any> = [];

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }
  render() {
    return _html.bind(this)();
  }
}
