import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, property } from 'lit-element';
import { Sortbutton } from './sortbutton.js';
import scss from './sortbutton-item.scss';

export class SortbuttonItem extends DewsFormComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  label = '';

  @property({ type: String })
  field = '';

  @property({ type: Boolean, reflect: true })
  sorting = false;

  @property({ type: Boolean, reflect: true })
  ascending = false;

  private $parent: Sortbutton | undefined;

  private _clickHandler() {
    const sortButton = this.parentElement as Sortbutton;
    sortButton?._emit('select', { target: this, type: 'select' });
    sortButton?.close();
  }

  render() {
    return html`
      <li class="${this.sorting ? 'sorting' : ''} ${this.ascending ? 'ascending' : ''}"
          @click="${this._clickHandler}"><span class="text">${this.label}</span></span></li>`;
  }
}

//
// <li class="sorting ascending" @click=""><span class="text">이르르름???</span></span></li>
//   <li class="" @click=""><span class="text">이르르름???</span></span></li>
//   <li class="" @click=""><span class="text">이르르름???</span></span></li>
