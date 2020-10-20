import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';

import _html from './container.html';
import _scss from './container.scss';

export class Container extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string;

  @property({ type: Boolean })
  selected: boolean = false;

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
