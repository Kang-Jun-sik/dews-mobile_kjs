import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { property } from 'lit-element';

import template from './areaitem.html';
import scss from './areaitem.scss';

export class AreaItem extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: Number })
  col = 12;

  @property({ type: Boolean, reflect: true })
  hide = false;

  render() {
    // if (this.parentElement.localName !== 'dews-area-panel') {
    //   return;
    // }
    return this.hide ? null : template.call(this);
  }
}
