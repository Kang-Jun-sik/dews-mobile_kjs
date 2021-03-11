import { DewsFormComponent } from '../../base/DewsFormComponent.js';
import { eventOptions, internalProperty, property, PropertyValues, query } from 'lit-element';
import { html } from 'lit-html';
import scss from './codepickersearch.scss';
import { Codepicker } from './codepicker.js';
import { TemplateResult } from 'lit-html/ts3.4/lib/template-result';
import { DataSource } from '../../datasource/dews-datasource.js';
import { Cardlist } from '../../cardlist/dews-cardlist.js';
import { DrawerBottomBase } from '../drawer-bottom-base.js';

export class Codepickersearch extends DewsFormComponent {
  static styles = scss;

  private $parent: Codepicker;

  private formList: Array<TemplateResult> = [];

  // 필터영역 사용할 지 여부
  @property({ type: Boolean, attribute: 'filter-disabled' })
  filterDisabled = false;

  // 필터영역 액티브 여부
  @property()
  filterActive = false;

  @property({ type: String, reflect: true })
  value: string | null = '';

  @internalProperty()
  private _datasource?: DataSource;

  @query('.code-filter-input input')
  codeFilterInput: HTMLInputElement | undefined;

  @query('.filter-button')
  btnFilter: HTMLButtonElement | undefined;

  constructor() {
    super();
    this.$parent = this.parentElement as Codepicker;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.childElementCount === 0) {
      this.filterDisabled = true;
    }
  }

  private _slotChange(e: Event) {
    Array.from(this.children).forEach($el => {
      if ($el.tagName !== 'LI') {
        const li = document.createElement('li');
        if ($el instanceof DrawerBottomBase) {
          $el.dimming = true;
        }
        li.appendChild($el as HTMLElement);
        li.slot = 'content';
        this.appendChild(li);
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
      }
    });
  }

  private _clickFilter() {
    this.filterActive = !this.filterActive;
  }

  /**
   * form-field 컴포넌트를 value 값을 초기화 합니다.
   * @private
   */
  private _clear(e: Event) {
    e.preventDefault();

    (this.codeFilterInput as HTMLInputElement).value = '';
    (this.codeFilterInput as HTMLInputElement).removeAttribute('val');
  }

  private _search(e?: Event) {
    e?.preventDefault();
    const cardList: Cardlist<object> | undefined = this.$parent.shadowRoot!.querySelector(
      'dews-cardlist'
    ) as Cardlist<object>;
    const datasourceId = cardList?.datasource;

    // ds 조회
    this._datasource = dews.app.main?.currentPage?.getDataSource(datasourceId);
    if (this._datasource === undefined) {
      this._datasource = document.getElementById(`${datasourceId}`) as DataSource;
    }
    this.codeFilterInput?.setAttribute('val', this.codeFilterInput.value);

    this.$parent._codeSearchEmit();
  }

  @eventOptions({ passive: true })
  private _touchStop(e: Event) {
    e.stopPropagation();
    e.preventDefault();
  }

  private _keydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._search();
    }
  }

  private _blur(e: FocusEvent) {
    if (
      !(e.relatedTarget as HTMLElement).classList.contains('search-button') ||
      !(e.relatedTarget as HTMLElement).classList.contains('clear-button')
    ) {
      const preVal = this.codeFilterInput?.getAttribute('val');
      if (typeof preVal === 'string') {
        (this.codeFilterInput as HTMLInputElement).value = preVal;
      }
    }
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'value') {
      this.value = value;
    }
  }

  render() {
    return html` <div class="code-filter ${this.filterActive ? 'active' : ''}" @touchmove="${this._touchStop}">
        <div class="code-filter-search">
          <!-- 조건 설정 시 setting 추가  -->
          <!-- filter 사용 안 할 경우, disabled  -->
          <button
            class="filter-button ${this.filterDisabled ? 'disabled' : ''}"
            @click="${this._clickFilter}"
            ?disabled="${this.filterDisabled ? 'disabled' : ''}"
          >
            <!--          >-->
            <span>filiter</span>
          </button>
          <!-- input 활성화시 active -->
          <span class="code-filter-input">
            <form action="">
              <input type="search" name="q" @keydown="${this._keydown}" @blur="${this._blur}" value="${this.value}" />
              <button class="clear-button" @click="${this._clear}"><span>초기화</span></button>
              <button class="search-button" @click="${this._search}"><span>검색</span></button>
            </form>
          </span>
        </div>
        <div class="code-filter-field">
          <ul class="form-field">
            <slot id="content" name="content"></slot>
          </ul>
        </div>
      </div>
      <slot @slotchange="${this._slotChange}"></slot>`;
  }
}
