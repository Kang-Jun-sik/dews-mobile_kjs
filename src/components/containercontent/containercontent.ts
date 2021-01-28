import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './containercontent.html';
import scss from './containercontent.scss';

export class Containercontent extends DewsLayoutComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
  private _slotChange(e: Event) {
    for (let i = 0; i < this.children.length; i++) {
      this.shadowRoot?.appendChild(this.children.item(i) as HTMLElement);
    }
  }
}
