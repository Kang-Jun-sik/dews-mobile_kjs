import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property, LitElement } from 'lit-element';

import _html from './areapanel.html';
import _scss from './areapanel.scss';

export class AreaPanel extends DewsLayoutComponent {
  static styles = _scss;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    // if (this.parentElement?.localName === 'area-item') {
    //   if (this.parentElement.attributes.getNamedItem('col').value !== '8') {
    //     return;
    //   }
    // }
    return _html.bind(this)();
  }
}
