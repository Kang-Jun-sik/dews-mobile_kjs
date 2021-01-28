import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property, TemplateResult } from 'lit-element';

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
        this.shadowRoot
          ?.querySelector('.dews-container-option-control')
          ?.appendChild(this.children.item(i) as HTMLElement);
      } else if (this.children.item(i)?.tagName === 'CONTAINER-CONTENT') {
        // const li = document.createElement('li');
        this.shadowRoot?.appendChild(this.children.item(i) as HTMLElement);
      }
    }
  }

  render() {
    return template.call(this);
  }
}
