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
    Array.from(this.children).forEach($el => {
      if (this.parentElement?.tagName === 'DEWS-SEARCH-CONTAINER') {
        const li = document.createElement('li');
        li.classList.add('col');
        li.appendChild($el as HTMLElement);
        this.shadowRoot?.querySelector('.form-field')?.appendChild(li);
      } else {
        this.shadowRoot?.appendChild($el as HTMLElement);
      }
    });
  }
}
