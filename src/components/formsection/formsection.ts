import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { html, internalProperty, property } from 'lit-element';

import _html from './formsection.html';
import _scss from './formsection.scss';

export class FormSection extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @internalProperty()
  private _inputList;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _slotChange(e) {
    if (e.target.assignedElements().length > 0) {
      this._inputList = e.target.assignedElements()?.map(input => {
        return html`<li>${input}</li>`;
      });
    }
  }

  render() {
    return _html.bind(this)();
  }
}
