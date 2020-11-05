import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';

import _html from './areaitem.html';
import _scss from './areaitem.scss';

export class AreaItem extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: Number })
  col: number = 12;

  @property({ type: Boolean, reflect: true })
  hide: boolean = false;

  render() {
    // if (this.parentElement.localName !== 'dews-area-panel') {
    //   return;
    // }
    return this.hide ? null : _html.bind(this)();
  }
}
