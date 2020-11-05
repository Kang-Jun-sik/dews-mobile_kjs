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

  @property({ type: Boolean })
  active: boolean = false;

  render() {
    return this.hide ? null : _html.bind(this)();
  }
}
