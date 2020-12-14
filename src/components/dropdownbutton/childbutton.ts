import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './childbutton.html';
import scss from './dropdownbutton.scss';

export class Childbutton extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  text = '';

  @property({ type: Boolean })
  disabled = false;

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
