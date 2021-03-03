import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { property } from 'lit-element';

import template from './formcontainer.html';
import scss from './formcontainer.scss';

export class FormContainer extends DewsLayoutComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  private _slotChange(e: Event) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children.item(i)?.tagName === 'CONTAINER-BUTTON') {
        (this.children.item(i) as HTMLElement).slot = 'button';
        // this.shadowRoot
        //   ?.querySelector('.dews-container-option-control')
        //   ?.appendChild(this.children.item(i) as HTMLElement);
      } else if (this.children.item(i)?.tagName === 'CONTAINER-CONTENT') {
        (this.children.item(i) as HTMLElement).slot = 'content';
        // this.shadowRoot?.querySelector('.dews-container-option-conztrol')?
        // .append(this.children.item(i) as HTMLElement);
      }
    }
  }

  render() {
    return template.call(this);
  }
}
