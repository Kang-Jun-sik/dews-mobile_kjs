import { property } from 'lit-element';

import template from './searchcontainer.html';
import scss from './searchcontainer.scss';
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';

export interface DataSet {
  userId?: string;
  menuId?: string;
  containerId: string;
  data: Array<any>;
}

export interface SearchData {
  id: string;
  title: string;
  text: string;
  value: any;
  dateTime: string;
}

export class SearchContainer extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String })
  id = '';

  @property({ type: String })
  title = '';

  @property({ type: Number, reflect: true })
  col = 1;

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      if ($el?.tagName === 'CONTAINER-BUTTON') {
        this.shadowRoot?.querySelector('.dews-container-option-control')?.appendChild($el as HTMLElement);
      } else if ($el?.tagName === 'CONTAINER-CONTENT') {
        this.shadowRoot?.querySelector('.dews-search-field')?.appendChild($el as HTMLElement);
      }
    });
  }

  render() {
    return template.call(this);
  }
}
