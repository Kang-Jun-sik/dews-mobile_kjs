import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './togglebutton.html';
import scss from './togglebutton.scss';
import { property } from 'lit-element';

export class Togglebutton extends DewsFormComponent {
  static styles = scss;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  on = false;

  @property({ type: String, attribute: 'title' })
  toggleTitle = undefined;

  @property({ type: String })
  text = undefined;

  render() {
    return template.call(this);
  }

  private changeEvent = new CustomEvent('change');
  private checkEvent = new CustomEvent('check');

  private _clickHandler() {
    if (this.disabled) {
      return;
    }
    this._checkedChange();
    if (this.on) {
      this.dispatchEvent(this.checkEvent);
    }
  }

  private _checkedChange() {
    this.dispatchEvent(this.changeEvent);
    this.on = !this.on;
  }
}
