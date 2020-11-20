import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';

import template from './areapanel.html';
import scss from './areapanel.scss';

export class AreaPanel extends DewsLayoutComponent {
  static styles = scss;

  // static get scopedElements() {
  //   return {
  //     'area-item': AreaItem,
  //     'dews-box': customElements.get('dews-box')
  //   };
  // }

  render() {
    // if (this.parentElement?.localName === 'area-item') {
    //   if (this.parentElement.attributes.getNamedItem('col').value !== '8') {
    //     return;
    //   }
    // }
    return template.call(this);
  }
}
