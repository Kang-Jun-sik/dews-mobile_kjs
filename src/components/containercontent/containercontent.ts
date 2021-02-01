import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';

import template from './containercontent.html';
import scss from './containercontent.scss';
import { property } from 'lit-element';
import { SearchContainer } from '../searchcontainer/searchcontainer.js';

export class Containercontent extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  col: number | undefined = 1;

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement?.tagName === 'DEWS-SEARCH-CONTAINER') {
      this.col = (this.parentElement as SearchContainer).col;
    }
  }
  render() {
    return template.call(this);
  }

  private _slotChange(e: Event) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.parentElement?.className === 'dews-search-field') {
        const li = document.createElement('li');
        li.appendChild(this.children.item(i) as HTMLElement);
        this.shadowRoot?.querySelector('.form-field')?.appendChild(li);
      } else {
        this.shadowRoot?.appendChild(this.children.item(i) as HTMLElement);
      }
    }
  }
}
