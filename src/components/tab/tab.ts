import { property } from 'lit-element';

import template from './tab.html';
import scss from './tab.scss';
import { DewsAreaComponent } from '../base/DewsAreaComponent.js';

export class Tab extends DewsAreaComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  hide = false;

  render() {
    return this.hide ? null : template.call(this);
  }
}
