import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';

import _html from './tab.html';
import _scss from './tab.scss';

export class Tab extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string;

  @property({ type: Boolean })
  hide: boolean = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    console.log('Tab UpdateComplete');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return this.hide ? null : _html.bind(this)();
  }
}
