import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';

import template from './radiobutton.html';
import scss from './radiobutton.scss';

export class Radiobutton extends DewsFormComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean, attribute: 'disabled' })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  /*
   * Event
   * */
  private _checked = new CustomEvent('check');

  private _clickHandler() {
    if (!this.disabled) {
      this.checked = !this.checked;
    }
    if (this.checked === true) {
      this.dispatchEvent(this._checked);
    }
  }

  render() {
    return template.call(this);
  }
}
