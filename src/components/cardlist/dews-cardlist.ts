import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './cardlist.html';
import scss from './cardlist.scss';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { Checkbox } from '../checkbox/checkbox.js';
import { Card } from './card.js';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export type CardlistField = {
  name?: string;
  field?: string;
  type?: string;
  title?: string;
  link?: unknown;
  formats?: {
    format: string;
    textAlign: 'left' | 'center' | 'right';
    textColor: string;
    fontWeight: 'normal' | 'bold';
    line: boolean;
  };
  visible?: boolean;
  _displayIndex: number;
};

type CardHeader = {
  headerTitleField: string;
  firstSubTitleField?: string;
  secondSubTitleField?: string;
  useEdit?: boolean;
  useBookmark?: boolean;
  useCheckbox?: boolean;
  status?: string;
};

type CardStatusType = 'complete' | 'standby' | 'progress' | 'failure' | 'closing';

enum CardStatus {
  complete = '완료',
  standby = '진행전',
  progress = '진행',
  failure = '실패',
  closing = '종결'
}

type CardlistFields = { [key: string]: CardlistField };

export class Cardlist<T extends object> extends DewsFormComponent {
  static styles = scss;

  // 데이터 자동 바인딩 여부
  @property({ type: Boolean, attribute: 'auto-bind' })
  autoBind = false;
  // 데이터소스 아이디
  @property({ type: String })
  datasource = '';
  // 카드 헤더 사용 여부
  @property({ type: Boolean, attribute: 'use-card-header' })
  useHeader = false;
  // 카드 헤더 옵션
  @property({ type: Object, attribute: 'header-options' })
  headerOptions = null;

  link = false;
  @property({ type: Boolean, attribute: 'use-paging' })
  usePaging = false;
  pageCount = 20;

  // 편의 기능 사용 여부
  @property({ type: Boolean, attribute: 'use-control-set' })
  useControl = false;
  // 편의 기능 설정 옵션 : 정렬 리스트, 컬럼 셋
  @property({ type: Object, attribute: 'control-options' })
  controlOptions = {
    useSortSet: true,
    useColumnSet: true
  };
  // 카드 접기/펴기 사용 여부
  @property({ type: Boolean, attribute: 'use-card-collapse' })
  useCardCollapse = false;
  // 접기/펴기 사용 할 경우 접었을 경우 고정 되는 필드 개수
  @property({ type: Number, attribute: 'card-fixed-field-count' })
  cardFixedFieldCount = 1;
  // 전체 선택 사용 여부
  @property({ type: Boolean, attribute: 'use-all-select' })
  useAllSelect = false;
  // 전체 카드 개수 사용 여부
  @property({ type: Boolean, attribute: 'use-total-count' })
  useTotalCount = false;
  // 높이
  @property({ type: String })
  height = '250px';
  // 카드리스트 타입
  @property({ type: String, attribute: 'column-type' })
  columnType = '1';

  // 카드리스트
  @internalProperty({
    hasChanged(value: unknown, oldValue: unknown): boolean {
      console.log('_cardlist', value, oldValue);

      return true;
    }
  })
  private _cardList: Array<TemplateResult> = [];

  @internalProperty()
  private _totalCount = 0;
  // 전체 선택 요소
  @internalProperty()
  private _allSelectElement?: TemplateResult | null;
  // 편의 기능 - 전체 개수 요소
  @internalProperty()
  private _totalCardCountElement?: TemplateResult | null;

  @internalProperty({
    hasChanged(value: unknown, oldValue: unknown): boolean {
      console.log('_testCardList', value, oldValue);
      return true;
    }
  })
  private _testCardList: Array<TemplateResult> = [];

  private _testCard: any = [];

  constructor() {
    super();
  }

  // region 내부 속성
  private _activeCardElement: any;
  // 체크박스 리스트
  private _checkboxList: Element[] | null = [];
  // 카드리스트 필드들
  private _fields: CardlistFields = {};
  // 카드리스트 필드요소들
  private _fieldList: CardlistField[] = [];
  // 편의 기능 요소
  private _controlSetElement?: TemplateResult | null;
  // 편의 기능 - 컨트롤 요소
  private _controlElement?: TemplateResult | null;
  // 편의 기능 - 정렬 요소
  private _sortElement?: TemplateResult;
  // 편의 기능 - 컬럼 선택 요소
  private _columnSetElement?: TemplateResult;
  // 전체 선택 체크박스 요소
  private _allSelectCheckboxElement?: TemplateResult;
  // 데이터 없을 경우 출력 요소
  private _noDataElement?: TemplateResult;
  // 설정 한 옵션에 의해 보여질 요소들
  private _elements: any = {};
  private _options: any = {};
  private _datasource?: any;
  // 카드리스트 체크 카드 개수
  private _checkCount = 0;

  // endregion

  private _initOptions() {
    const cardlistElement = this.querySelector('.cardlist');

    this._allSelectCheckboxElement = html`
      <div class="all-select">
        <dews-checkbox
          label="전체선택"
          class="cardlist-all-select-checkbox"
          reverse
          @click="${this._allSelectClickHandler}"
        ></dews-checkbox>
      </div>
    `;

    this._columnSetElement = html` <button class="column-set"><span>Column Set</span></button> `;

    this._sortElement = html`
      <span id="sorting-set" class="sorting-wrap" @click="${this._sortingSetTouchEvent}">
        <span class="sorting-order"></span>
        <span class="sorting-input"></span>
        <span class="sorting-icon"></span>
      </span>
      <drawer-layout class="sort-drawer-layout" height="500px">
        <div class="sorting-list">
          <div class="titlebar">
            <div class="title">항목명</div>
            <button class="confirm-button">적용</button>
          </div>
          <div class="control">
            <ul class="list">
              <li class="sorting ascending">
                <span class="text">DATA 01</span>
              </li>
              <li>
                <span class="text"
                  >데이터 이름이 길 경우에는 줄바꿈 처리가 됩니다. 데이터 이름이 길 경우에는 줄바꿈 처리가 됩니다.
                  데이터 이름이 길 경우에는 줄바꿈 처리가 됩니다. 데이터 이름이 길 경우에는 줄바꿈 처리가 됩니다.</span
                >
              </li>
              <li>
                <span class="text">DATA 02</span>
              </li>
              <li>
                <span class="text">DATA 03</span>
              </li>
              <li>
                <span class="text">DATA 04</span>
              </li>
              <li>
                <span class="text">DATA 05</span>
              </li>
              <li>
                <span class="text">DATA 06</span>
              </li>
              <li>
                <span class="text">DATA 07</span>
              </li>
              <li>
                <span class="text">DATA 08</span>
              </li>
              <li>
                <span class="text">DATA 09</span>
              </li>
              <li>
                <span class="text">DATA 10</span>
              </li>
              <li>
                <span class="text">DATA 11</span>
              </li>
              <li>
                <span class="text">DATA 12</span>
              </li>
              <li>
                <span class="text">DATA 13</span>
              </li>
            </ul>
          </div>
        </div>
      </drawer-layout>
      <!--      <dews-dropdownlist class="sort-drawer-layout" title="정렬">-->
      <!--        <dropdownlist-item title="TEST"></dropdownlist-item>-->
      <!--      </dews-dropdownlist>-->
    `;

    this._noDataElement = html` <div class="card-nodata"><span>조회된 내역이 없습니다.</span></div> `;

    this._options._columnType = this.columnType === '2' ? '2' : '1';

    if (this._options._columnType === '2') {
      cardlistElement?.classList.add('col2');
    }

    if (this.useCardCollapse) {
      this._options._useCardCollapse = true;
      this._options._cardFixedFieldCount = this.cardFixedFieldCount;
      cardlistElement?.classList.add('card-collapse');
    }

    if (this.useHeader) {
      this._options._useHeader = true;
      let headerOpt = {
        useCheckbox: true,
        useEdit: true,
        useBookmark: true,
        headerTitleField: this._fieldList[0].field
      };
      if (this.headerOptions) {
        headerOpt = Object.assign({}, headerOpt, this.headerOptions);
      }
      this._options._headerOptions = headerOpt;
    }

    this._datasource = document.getElementById(this.datasource);
    if (!this._datasource) {
      this._datasource = document
        .querySelector('dews-mobile-app')
        ?.shadowRoot?.querySelector('main-content')
        ?.shadowRoot?.querySelector('#contents')
        ?.children[0].shadowRoot?.querySelector('dews-datasource#' + this.datasource);
    }
    if (this._datasource) {
      this._datasource.on('requestEnd', () => {
        this._createCardListElement();
      });
    } else {
      this._createCardListElement();
    }

    if (this.autoBind) {
      this._datasource.read();
    }
  }

  private _createCardListElement = () => {
    this._checkboxList = [];
    const cardList = [];

    if (this.datasource) {
      const dataList = this._datasource?._data;
      this._totalCount = dataList.length;
      if (this._datasource?._data === undefined || this._datasource?._data?.length === 0) {
        this._cardList.push(this._noDataElement!);
      } else {
        for (let i = 0; i < dataList.length; i++) {
          const data = dataList[i];
          cardList.push(this._createCardElement(data));
        }
      }
    } else {
      cardList.push(this._noDataElement!);
    }

    this._cardList = cardList;
    this._testCardList = this._testCard;

    if (this._options._columnType === '2') this.shadowRoot?.querySelector('.cardlist')?.classList.add('col2');
  };

  private _sortingSetTouchEvent = () => {
    const sortDrawerLayout: any = this.shadowRoot?.querySelector('.sort-drawer-layout');
    const active = !sortDrawerLayout?.getAttribute('active');

    // sortDrawerLayout.$itemList.push((html `
    //   <dropdownlist-item title="TEST"></dropdownlist-item>
    // `));
    //
    // sortDrawerLayout.render();
    //
    // sortDrawerLayout.active = true;

    // sortDrawerLayout.active = active;
    sortDrawerLayout?.setAttribute('active', String(active));
  };

  private _cardClickHandler(e: any) {
    let cardElement;

    if (e.currentTarget && e.currentTarget.localName === 'div' && e.currentTarget.classList.contains('card')) {
      cardElement = e.currentTarget;
    } else {
      cardElement = e.path[0].closest('div.card');
    }

    if (this._activeCardElement) {
      this._activeCardElement.classList.remove('active');
    }
    this._activeCardElement = cardElement;
    cardElement.classList.add('active');
  }

  private _allSelectClickHandler(e: any) {
    const checkbox: Checkbox = e.currentTarget;
    const checked: boolean = checkbox.checked;
    const selectCheckboxElements = this.shadowRoot?.querySelectorAll('dews-checkbox.card-select-checkbox');

    if (selectCheckboxElements) {
      for (let i = 0; i < selectCheckboxElements.length; i++) {
        const selectCheckboxElement: any = selectCheckboxElements[i];

        selectCheckboxElement.checked = checked;
      }
      this._checkCount = checked ? this._totalCount : 0;
    }
  }

  private _checkClickHandler(e: any) {
    console.log('check', e);
    const checkbox: Checkbox = e.currentTarget;
    const checked: boolean = checkbox.checked;
    const allSelectCheckbox: Checkbox | null | undefined = this.shadowRoot?.querySelector(
      'dews-checkbox.cardlist-all-select-checkbox'
    );

    if (checked) {
      this._checkCount++;
      if (this._checkCount === this._totalCount && allSelectCheckbox) {
        allSelectCheckbox.checked = true;
      }
    } else {
      this._checkCount--;
      if (allSelectCheckbox && allSelectCheckbox.checked) {
        allSelectCheckbox.checked = false;
      }
    }
  }

  private _collapseButtonClickHandler(e: any) {
    const collapseButtonElement = e.path[0];
    const collapseElements = collapseButtonElement.parentElement?.querySelectorAll('li.collapse');
    const collapse = collapseButtonElement.classList.contains('open');

    if (collapse) {
      collapseButtonElement.classList.remove('open');
    } else {
      collapseButtonElement.classList.add('open');
    }

    for (let i = 0; i < collapseElements.length; i++) {
      const collapseElement = collapseElements[i];
      if (collapse) {
        collapseElement.classList.remove('open');
      } else {
        collapseElement.classList.add('open');
      }
    }
  }

  private _createCardElement = (data: any) => {
    let headerElement: TemplateResult | null = null;
    let subTitleElement: TemplateResult | null = null;
    let cardStatusTagElement: TemplateResult | null = null;
    const liElements: any = [];
    let collapseElement: TemplateResult | null = null;
    const opt = this._options;
    const status: CardStatusType = 'complete';

    opt._useHeader = true;
    opt._headerOptions = {};
    opt._headerOptions.useCheckbox = true;

    if (opt._useCardCollapse) {
      collapseElement = html`<button class="collapse-button" @click="${this._collapseButtonClickHandler}"></button>`;
    }

    if (opt._useHeader) {
      let headerControl: TemplateResult | null = null;

      if (opt._headerOptions.useBookmark || opt._headerOptions.useCheckbox || opt._headerOptions.useEdit) {
        const liBookmarkElement: TemplateResult | null = opt._headerOptions.useBookmark
          ? html`
              <li>
                <dews-checkbox bookmark></dews-checkbox>
              </li>
            `
          : null;
        const liCheckboxElement: TemplateResult | null = opt._headerOptions.useCheckbox
          ? html`
              <li>
                <dews-checkbox class="card-select-checkbox" @click="${this._checkClickHandler}"></dews-checkbox>
              </li>
            `
          : null;
        const liEditElement: TemplateResult | null = opt._headerOptions.useEdit
          ? html`
              <li>
                <button class="editing"><span>편집</span></button>
              </li>
            `
          : null;

        headerControl = html`
          <div class="card-control">
            <ul>
              ${liBookmarkElement} ${liEditElement} ${liCheckboxElement}
            </ul>
          </div>
        `;
      }

      if (opt._headerOptions.firstSubTitleField) {
        const fsSubTitleFieldElement = opt._headerOptions.firstSubTitleField
          ? html` <span>${data[opt._headerOptions.firstSubTitleField]}</span> `
          : null;
        const ssSubTitleFieldElement = opt._headerOptions.firstSubTitleField
          ? html` <span>${data[opt._headerOptions.secondSubTitleField]}</span> `
          : null;

        subTitleElement = html` <div class="sub">${fsSubTitleFieldElement} ${ssSubTitleFieldElement}</div> `;
      }

      if (status) {
        cardStatusTagElement = html`<span class="state ${status}">${CardStatus[status]}</span>`;
      }

      headerElement = html`
        <div class="card-header">
          ${headerControl}
          <div class="title">
            <h3>${data[opt._headerOptions.headerTitleField]}</h3>
            ${cardStatusTagElement} ${subTitleElement}
          </div>
        </div>
      `;
    }

    for (let i = 0; i < this._fieldList.length; i++) {
      const field: CardlistField = this._fieldList[i];
      const type: 'number' | null = field.type === 'number' ? 'number' : null;
      let collapse: string | null = null;

      if (opt._useCardCollapse) {
        collapse = i >= opt._cardFixedFieldCount ? ' collapse' : '';
      }

      if (data[field.field!]) {
        liElements.push(html`
          <li class="${field.name}${collapse}">
            <p class="name">${field.title}</p>
            <p class="item ${type}">${data[field.field!]}</p>
          </li>
        `);
      }
    }

    // TODO 카드 lit-element 고려
    const cardOptions = opt;
    cardOptions._fieldList = this._fieldList;
    const test = new Card(cardOptions, data);
    this._testCard.push(test);

    return html`<div class="card" @click="${this._cardClickHandler}">
      ${headerElement}
      <ul class="list-field">
        ${liElements}
      </ul>
      ${collapseElement}
    </div> `;
  };

  // private _bindEvent = () => {
  //
  // }

  private _createAllSelectElement = () => {
    return html`
      <div class="cardlist-all-select">${this._totalCardCountElement} ${this._elements._allSelectCheckboxElement}</div>
    `;
  };

  private _createControlElement = () => {
    return html` <div class="option-control">${this._elements._sortElement} ${this._elements._columnSetElement}</div> `;
  };

  private _createTotalCardCountElement = () => {
    return html`
      <div class="card-total">
        <span>총<strong>${this._totalCount}</strong>건</span>
      </div>
    `;
  };

  private _createControlSetElement = () => {
    return html` <div class="cardlist-option-control">${this._controlElement}</div> `;
  };

  private _createElements = () => {
    // 정렬 선택 드롭다운리스트 요소
    this._elements._sortElement = this.controlOptions.useSortSet ? this._sortElement : null;
    // 컬럼 셋 요소
    this._elements._columnSetElement = this.controlOptions.useColumnSet ? this._columnSetElement : null;
    // 전체 선택 체크박스 요소
    this._elements._allSelectCheckboxElement = this.useAllSelect ? this._allSelectCheckboxElement : null;
    // 정렬 선택, 컬럼 선택 부모 요소
    this._controlElement = this._createControlElement();
    // 전체 카드 개수 요소
    this._totalCardCountElement = this.useTotalCount ? this._createTotalCardCountElement() : null;
    // 전체 카드 개수, 전체 선택 체크박스 부모 요소
    this._allSelectElement = this.useAllSelect || this.useTotalCount ? this._createAllSelectElement() : null;
    // 편의기능 요소
    this._controlSetElement = this.useControl ? this._createControlSetElement() : null;
  };

  private _getFields(): void {
    const fieldElements = this.querySelectorAll('cardlist-field');
    const fieldCount = fieldElements.length;
    const fields: CardlistFields = {};
    const fieldList: CardlistField[] = [];

    for (let i = 0; i < fieldCount; i++) {
      const fieldElement = fieldElements[i];
      const name: string = fieldElement.getAttribute('name')!;
      const field: string | null = fieldElement.getAttribute('field');
      const type: string | null = fieldElement.getAttribute('type');
      const title: string | null = fieldElement.getAttribute('title');
      const visible: string | null = fieldElement.getAttribute('visible');

      fields[name] = { _displayIndex: i };
      fields[name].name = name;
      fields[name].field = field ? field : name;
      fields[name].type = type ? type : undefined;
      fields[name].title = title ? title : name;
      fields[name].visible = visible ? visible === 'true' : true;

      fieldList.push(fields[name]);
    }

    this._fields = fields;
    this._fieldList = fieldList;
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log('connectedCallback');
    this._getFields();
    this._initOptions();
    this._createElements();

    await this.updateComplete;
  }

  // region LifeCycle
  disconnectedCallback() {
    console.log('disconnectedCallback');
    super.disconnectedCallback();
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    console.log('shouldUpdate', this);
    return super.shouldUpdate(_changedProperties);
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    console.log('update', this);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    console.log('firstUpdated', this);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    console.log('updated', this);
    if (typeof _changedProperties.get('_totalCount') === 'number' && this._totalCount > 0) {
      this._totalCardCountElement = this._createTotalCardCountElement();
      this._allSelectElement = this._createAllSelectElement();
    }
    // if (this._cardList.length > 0 && !this._activeCardElement) {
    //
    // }
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    console.log('attributeChanged');
    if (name === 'header-options' || name === 'control-options') {
      return JSON.parse(value!);
    }
  }

  // endregion

  render() {
    console.log('render');
    return template.call(this);
  }
}
