import { DewsFormComponent } from '../../base/DewsFormComponent.js';
import { property } from 'lit-element';
import { html } from 'lit-html';
import scss from './codepickersearch.scss';
import { Codepicker } from './codepicker.js';

export class Codepickersearch extends DewsFormComponent {
  static styles = scss;
  private $parent: Codepicker;

  constructor() {
    super();
    this.$parent = this.parentElement as Codepicker;
  }
  @property()
  filterDisabled = false;

  @property()
  filterActive = false;

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      const li = document.createElement('li');
      li.appendChild($el as HTMLElement);
      this.shadowRoot?.querySelector('.form-field')?.appendChild(li);
    });
  }

  private _clickFilter() {
    this.filterActive = !this.filterActive;
  }

  render() {
    return html` <div class="code-filter ${this.filterActive ? 'active' : ''}">
        <div class="code-filter-search">
          <!-- 조건 설정 시 setting 추가  -->
          <!-- filter 사용 안 할 경우, disabled  -->
          <button class="filter-button ${this.filterDisabled}" @click="${this._clickFilter}">
            <span>filiter</span>
          </button>
          <!-- input 활성화시 active -->
          <span class="code-filter-input">
            <input type="text" />
            <button class="clear-button"><span>초기화</span></button>
            <button class="search-button"><span>검색</span></button>
          </span>
        </div>
        <div class="code-filter-field">
          <ul class="form-field"></ul>
        </div>
      </div>
      <slot @slotchange="${this._slotChange}"></slot>`;
  }
}
