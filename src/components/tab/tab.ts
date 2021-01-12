import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { property } from 'lit-element';

import template from './tab.html';
import scss from './tab.scss';

export class Tab extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  hide = false;

  async connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return this.hide ? null : template.call(this);
  }
}
