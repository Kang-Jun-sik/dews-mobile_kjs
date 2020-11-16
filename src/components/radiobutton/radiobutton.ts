import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { property } from 'lit-element';

import _html from './radiobutton.html';
import _scss from './radiobutton.scss';

export class Radiobutton extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String, reflect: true })
  title: string | undefined;

  @property({ type: Boolean })
  readonly: boolean = false;

  @property({ type: Boolean, attribute: 'disabled' })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

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
    return _html.bind(this)();
  }
}
