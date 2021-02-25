import { DewsFormComponent } from '../../base/DewsFormComponent.js';
import { internalProperty, property, query } from 'lit-element';
import { html } from 'lit-html';
import scss from './codepickersearch.scss';
import { Codepicker } from './codepicker.js';
import { TemplateResult } from 'lit-html/ts3.4/lib/template-result';
import { DataSource } from '../../datasource/dews-datasource.js';
import { Cardlist } from '../../cardlist/dews-cardlist.js';

export class Codepickersearch extends DewsFormComponent {
  static styles = scss;
  private $parent: Codepicker;

  private formList: Array<TemplateResult> = [];

  constructor() {
    super();
    this.$parent = this.parentElement as Codepicker;
  }

  @property()
  filterDisabled = false;

  @property()
  filterActive = false;

  @internalProperty()
  private _datasource?: DataSource;

  @query('.code-filter-input input')
  codeFilterInput: HTMLInputElement | undefined;

  @query('.filter-button')
  btnFilter: HTMLButtonElement | undefined;

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      const li = document.createElement('li');
      li.appendChild($el as HTMLElement);
      this.shadowRoot?.querySelector('.form-field')?.appendChild(li);

      this.formList.push($el as any);

      ($el as any).on('change', () => {
        let dirty = false;
        for (let i = 0; i < this.formList.length; i++) {
          const control: any = this.formList[i];
          switch (control.tagName) {
            case 'DEWS-PERIODPICKER':
            case 'DEWS-WEEKPERIODPICKER':
            case 'DEWS-MONTHPERIODPICKER':
              if (control.startDate && control.endDate) {
                dirty = true;
              }
              break;
            case 'DEWS-CHECKBOX-GROUP':
              if (control.value.length > 0) {
                dirty = true;
              }
              break;
            case 'DEWS-DROPDOWNLIST':
              if (control.getCheckItems().length > 0) {
                dirty = true;
              }
              break;
            default:
              if (control.value) {
                dirty = true;
              }
          }
        }

        if (dirty) {
          this.btnFilter?.classList.add('setting');
        } else {
          this.btnFilter?.classList.remove('setting');
        }
      });
    });
  }

  private _clickFilter() {
    this.filterActive = !this.filterActive;
  }

  /**
   * form-field 컴포넌트를 value 값을 초기화 합니다.
   * @private
   */
  private _clear() {
    (this.codeFilterInput as HTMLInputElement).value = '';

    for (let i = 0; i < this.formList.length; i++) {
      const control: any = this.formList[i];
      switch (control.tagName) {
        case 'DEWS-PERIODPICKER':
        case 'DEWS-WEEKPERIODPICKER':
        case 'DEWS-MONTHPERIODPICKER':
          control.startDate = '';
          control.endDate = '';
          break;
        case 'DEWS-DROPDOWNLIST':
          control.uncheckItems();
          break;
        default:
          control.value = '';
      }
    }
    if (this.btnFilter?.classList.contains('setting')) {
      this.btnFilter?.classList.remove('setting');
    }
  }

  private async _search() {
    const cardList: Cardlist<object> | undefined = this.$parent.shadowRoot!.querySelector(
      'dews-cardlist'
    ) as Cardlist<object>;
    const datasourceId = cardList?.datasource;

    // ds 조회
    this._datasource = dews.app.main?.currentPage?.getDataSource(datasourceId);
    if (this._datasource === undefined) {
      this._datasource = document.getElementById(`${datasourceId}`) as DataSource;
    }

    this.$parent._codeSearchEmit();
  }

  private _touchStop(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

  private _keydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this._search();
    }
  }

  render() {
    return html` <div class="code-filter ${this.filterActive ? 'active' : ''}" @touchmove="${this._touchStop}">
        <div class="code-filter-search">
          <!-- 조건 설정 시 setting 추가  -->
          <!-- filter 사용 안 할 경우, disabled  -->
          <button class="filter-button ${this.filterDisabled}" @click="${this._clickFilter}">
            <span>filiter</span>
          </button>
          <!-- input 활성화시 active -->
          <span class="code-filter-input">
            <input type="text" @keydown="${this._keydown}" />
            <button class="clear-button" @click="${this._clear}"><span>초기화</span></button>
            <button class="search-button" @click="${this._search}"><span>검색</span></button>
          </span>
        </div>
        <div class="code-filter-field">
          <ul class="form-field"></ul>
        </div>
      </div>
      <slot @slotchange="${this._slotChange}"></slot>`;
  }
}
