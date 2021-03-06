import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './cardlist.html';
import scss from './cardlist.scss';
import { property, PropertyValues, html, TemplateResult, internalProperty } from 'lit-element';
import { Checkbox } from '../checkbox/checkbox.js';
import { repeat } from 'lit-html/directives/repeat';
import { DataSourceChangeEventArgs } from '../datasource/Event.js';
import { DataSource, ObservableArrayItem } from '../datasource/dews-datasource.js';
import { SortType } from '../datasource/Sort.js';
import { Columnsetbutton } from '../columnsetbutton/columnsetbutton.js';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { CardListChangeEventArgs, CardListCheckedEventArgs } from './Event.js';
import { SortbuttonItem } from '../sortbutton/sortbutton-item.js';
import { Sortbutton } from '../sortbutton/sortbutton.js';

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// 카드리스트 필드 타입
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
  required?: boolean;
  visible?: boolean;
  _displayIndex: number;
};

// 카드리스트 옵션 타입
type CardListOptionsType = {
  _columnType: '1' | '2';
  _useCardCollapse: boolean;
  _cardFixedFieldCount: number;
  _useHeader: boolean;
  _headerOptions: CardHeaderType;
  _controlOptions: CardControlType;
};

// 카드 컨트롤 타입
type CardControlType = {
  useSortSet: boolean;
  useColumnSet: boolean;
};

// 카드 헤더 타입
type CardHeaderType = {
  headerTitleField: string;
  firstSubTitleField?: string;
  secondSubTitleField?: string;
  useEdit?: boolean;
  useBookmark?: boolean;
  useCheckbox?: boolean;
  status?: CardStatusType;
  statusField?: string;
};

// 카드 태그 상태 타입
type CardStatusType = 'complete' | 'standby' | 'progress' | 'failure' | 'closing';

enum CardStatus {
  complete = '완료',
  standby = '진행전',
  progress = '진행',
  failure = '실패',
  closing = '종결'
}

// 카드리스트 필드들 타입
type CardlistFields = { [key: string]: CardlistField };

export class Cardlist<T extends object> extends DewsFormComponent {
  static styles = scss;

  // region 속성
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
  // 페이징 사용 여부
  @property({ type: Boolean, attribute: 'use-paging' })
  usePaging = false;
  // 페이지 개수
  @property({ type: Number, attribute: 'paging-count' })
  pagingCount = 20;
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
  // 체크 이벤트
  @property({ type: Function, attribute: 'onchecked' })
  onChecked?: (args: CardListCheckedEventArgs<T>) => void;
  // 변경 이벤트
  @property({ type: Function, attribute: 'onchange' })
  onChange?: (args: CardListChangeEventArgs<T>) => void;
  // 리스트 선택 사용 유무 (코드피커에서만 사용)
  @property({ type: Boolean, attribute: 'use-list-select' })
  useListSelect = false;

  @property({ type: Boolean })
  dimming = false;

  // 카드리스트
  @internalProperty()
  private _cardList: TemplateResult[] = [];
  // 카드리스트 요소
  @internalProperty()
  private _cardListElement: TemplateResult | null = null;
  // 전체 카운트 관련 내부 속성
  @internalProperty()
  private _totalCount = 0;
  // 전체 선택 요소
  @internalProperty()
  private _allSelectElement?: TemplateResult | null;
  // 편의 기능 - 전체 개수 요소
  @internalProperty()
  private _totalCardCountElement?: TemplateResult | null;
  // 편의 기능 요소
  @internalProperty()
  private _controlSetElement?: TemplateResult | null;
  // 더보기 버튼 요소
  @internalProperty()
  private _moreButtonElement?: TemplateResult | null;
  // 카드리스트 데이터
  @internalProperty()
  private _cardData: ObservableArrayItem<T>[] = [];
  // 컬럼 타입 클래스
  @internalProperty()
  private _columnTypeClass: string = ''.toString();
  // 카드 접기/펴기 클래스
  @internalProperty()
  private _cardCollapseClass: string = ''.toString();
  // endregion

  constructor() {
    super();
  }

  // region 내부 속성
  private _activeCardElement: Element | undefined;
  // 체크박스 리스트
  private _checkboxList: Element[] | null = [];
  // 카드리스트 필드들
  private _fields: CardlistFields = {};
  // 카드리스트 필드요소들
  private _fieldList: CardlistField[] = [];
  // 편의 기능 - 컨트롤 요소
  private _controlElement?: TemplateResult | null;
  // 편의 기능 - 정렬 요소
  private _sortElement?: TemplateResult | null;
  // 편의 기능 - 컬럼 선택 요소
  private _columnSetElement?: TemplateResult | null;
  // 전체 선택 체크박스 요소
  private _allSelectCheckboxElement?: TemplateResult | null;
  // 코드피커에서만 사용, 리스트 선택 버튼 요소
  private _listSelectElement?: TemplateResult | null;
  // 데이터 없을 경우 출력 요소
  private _noDataElement?: TemplateResult | null;
  // 내부 옵션
  private _options: CardListOptionsType = {
    _columnType: '1',
    _useCardCollapse: false,
    _cardFixedFieldCount: 1,
    _useHeader: false,
    _headerOptions: {
      headerTitleField: ''
    },
    _controlOptions: {
      useColumnSet: true,
      useSortSet: true
    }
  };
  // 데이터소스 객체
  private _datasource?: DataSource<T>;
  // 카드리스트 체크 카드 개수
  private _checkCount = 0;
  // 페이징 옵션
  private _paging: any;
  // 카드리스트 정렬 touch 위치 값
  private _startPoint: number | undefined;
  // 카드리스트 정렬 layer 활성화 여부
  private _sortActive = false;
  // 카드리스트 정렬 기능 테스트용
  private _sortObj: SortType<any> = {
    field: ''
  };
  // 이벤트
  private _events: EventEmitter = new EventEmitter();

  // endregion

  // 초기화 함수
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

    this._columnSetElement = html`<columnset-button
      key-field="name"
      label-field="title"
      checked-field="visible"
      disabled-field="required"
      ?dimming="${this.dimming}"
    ></columnset-button>`;

    if (this._fieldList?.length > 0 && this._fieldList[0].field !== undefined) {
      this._sortObj.field = this._fieldList[0].field;
      this._sortObj.dir = 'desc';
    }
    // 카드리스트 정렬 기능 drawer-layout 영역
    this._sortElement = html`
      <sort-button ?dimming="${this.dimming}" label="${this._fieldList[0].title}">
        ${this._fieldList.map(
          (field, index) =>
            html`<sort-item ?sorting="${index === 0}" field="${field.field}" label="${field.title}"></sort-item>`
        )}
      </sort-button>
    `;

    // this._sortElement = html`
    //   <sort-button ?dimming="${this.dimming}" label="">
    //     <sort-item sorting label="sorting"></sort-item>
    //     <sort-item label="ascending"></sort-item>
    //   </sort-button>
    // `;

    //     <span id="sorting-set" class="sorting-wrap" @click="${this._sortingSetTouchEvent}">
    //     <span class="sorting-order"></span>
    //       <span class="sorting-input"></span>
    //       <span class="sorting-icon"></span>
    //       </span>
    //       <drawer-layout class="sort-drawer-layout" ?dimming="${this.dimming}" height="300px" scrollEnabled>
    //     <div class="sorting-list">
    //     <div class="titlebar">
    //     <div class="title">항목명</div>
    //       <button class="confirm-button" @click="${this._sortingConfirmTouchEvent}">적용</button>
    //       </div>
    //       <div class="control" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}">
    //     <ul class="list">
    //       ${this._fieldList.map(
    //         (field, index) =>
    //           html`<li class="${index === 0 ? 'sorting' : ''}" @click="${
    //                     this._clickSortingItem
    //                   }"><span class="text">${field.field}</span></span></li>`
    //   )}
    // </ul>
    // </div>
    // </div>
    // </drawer-layout>

    this._noDataElement = html` <div class="card-nodata"><span>조회된 내역이 없습니다.</span></div> `;

    this._options._columnType = this.columnType === '2' ? '2' : '1';

    if (this._options._columnType === '2') {
      cardlistElement?.classList.add('col2');
      this._columnTypeClass = ' col2';
    }

    if (this.useCardCollapse) {
      this._options._useCardCollapse = true;
      this._options._cardFixedFieldCount = this.cardFixedFieldCount | 1;
      cardlistElement?.classList.add('card-collapse');
      this._cardCollapseClass = ' card-collapse';
    }

    if (this.useHeader) {
      this._options._useHeader = true;
      let headerOpt: CardHeaderType = {
        useCheckbox: true,
        useEdit: true,
        useBookmark: true,
        headerTitleField: this._fieldList[0].field!
      };
      if (this.headerOptions) {
        headerOpt = Object.assign({}, headerOpt, this.headerOptions);
      }
      this._options._headerOptions = headerOpt;
    }
    this._initDatasource();
  }

  // 데이터소스 초기화 함수
  private _initDatasource() {
    if (dews.app.main) {
      this._datasource = dews.app.main.currentPage?.getDataSource(this.datasource) as DataSource<T> | undefined;
    } else {
      this._datasource = document.querySelector<DataSource<T>>(`#${this.datasource}`) || undefined;
    }

    if (this._datasource) {
      if (this.usePaging) {
        this._paging = {
          _use: true,
          _pagingStart: 0,
          _pagingCount: this.pagingCount,
          _current: 0,
          _total: undefined
        };
        this._datasource.paging = true;
        this._datasource.pagingStart = this._paging._pagingStart;
        this._datasource.pagingCount = this.pagingCount;
      }

      this._datasource.on('_dataBound', (e: any) => {
        if (this.usePaging) {
          if (e.response.total) {
            this._paging._total = e.response.total;
          }
          if (this._paging._total - 1 <= e.response.current) {
            this._moreButtonElement = null;
            this._paging = {
              _use: false,
              _pagingStart: 0,
              _pagingCount: this.pagingCount,
              _current: 0,
              _total: undefined
            };
          } else {
            this._paging._current = e.response.current;
            this._datasource!.pagingStart = this._paging._pagingStart = e.response.current + 1;
            this._createMoreButtonElement();
          }
        }
        if (this.useControl && this.controlOptions.useSortSet) {
          this._datasource!.sort({ field: this._fieldList[0].field as keyof T });
          this._cardData = this._datasource!.sortData() || [];
        } else {
          this._cardData = this._datasource!.data() || [];
        }
        this._createCardListElement();
      });

      this._datasource.on('change', (e: DataSourceChangeEventArgs<T>) => {
        if (e.type === 'add' || e.type === 'update' || e.type === 'delete') {
          if (this.useControl && this.controlOptions.useSortSet) {
            this._cardData = this._datasource!.sortData() || [];
          } else {
            this._cardData = this._datasource!.data() || [];
          }
          this._cardListElement = this._cardListRepeat(this._cardData);
        } else if (e.type === 'load') {
          // aa
        }
      });
    } else {
      this._createCardListElement();
    }

    if (this.autoBind) {
      this._datasource?.read();
    }
  }
  // 카드리스트 다시그리는 함수
  private _cardListRepeat = (items: any) => {
    const keyFn = (item: any) => {
      return item.uid;
    };
    const itemTemplate = (item: any, index: number) => {
      return this._createCardElement(item, index);
    };
    return html`${repeat(items, keyFn, itemTemplate)}`;
  };

  // region 요소 생성
  // 카드리스트 요소 생성
  private _createCardListElement = () => {
    this._checkboxList = [];
    if (this._datasource) {
      const dataList = this._cardData;
      this._totalCount = dataList.length;
      if (dataList?.length === 0) {
        this._cardListElement = this._noDataElement!;
      } else {
        this._cardListElement = this._cardListRepeat(this._cardData);
      }
    } else {
      this._cardListElement = this._noDataElement!;
    }

    if (this._options._columnType === '2') this.shadowRoot?.querySelector('.cardlist')?.classList.add('col2');
  };
  // 더보기 버튼 요소 생성
  private _createMoreButtonElement = () => {
    const nowCount = this._paging?._pagingStart;
    const totalCount = this._paging?._total;

    this._moreButtonElement = html`
      <div class="more-button-wrap">
        <button class="more-button" @click="${this._moreButtonClickHandler}">
          <span class="text">더보기</span>
          <span class="count"> (<span class="now">${nowCount}</span>/<span class="total">${totalCount}</span>) </span>
        </button>
      </div>
    `;
  };
  // 카드 요소 생성
  private _createCardElement = (data: any, index?: number) => {
    let headerElement: TemplateResult | null = null;
    let subTitleElement: TemplateResult | null = null;
    let cardStatusTagElement: TemplateResult | null = null;
    const liElements: any = [];
    let collapseElement: TemplateResult | null = null;
    const opt: CardListOptionsType = this._options;
    const status: CardStatusType | undefined =
      data[opt._headerOptions.statusField as keyof T] || opt._headerOptions?.status;

    if (opt._useCardCollapse) {
      collapseElement = html`<button class="collapse-button" @click="${this._collapseButtonClickHandler}"></button>`;
    }

    if (opt._useHeader) {
      let headerControl: TemplateResult | null = null;

      if (opt._headerOptions?.useBookmark || opt._headerOptions?.useCheckbox || opt._headerOptions?.useEdit) {
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

      if (opt._headerOptions?.firstSubTitleField) {
        const fsSubTitleFieldElement = opt._headerOptions.firstSubTitleField
          ? html` <span>${data[opt._headerOptions.firstSubTitleField]}</span> `
          : null;
        const ssSubTitleFieldElement = opt._headerOptions.secondSubTitleField
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
        collapse = i >= opt._cardFixedFieldCount ? ' collapse' : ' open';
      }

      if (field.visible && data[field.field!]) {
        liElements.push(html`
          <li class="${field.name}${collapse}">
            <p class="name">${field.title}</p>
            <p class="item ${type}">${data[field.field!]}</p>
          </li>
        `);
      }
    }

    return html`<div
      class="card card-${index}"
      .cardIndex="${index}"
      .data="${data}"
      @click="${this._cardClickHandler}"
      @mousedown="${this._mouseDownHandler}"
    >
      ${headerElement}
      <ul class="list-field">
        ${liElements}
      </ul>
      ${collapseElement}
    </div>`;
  };
  // 리스트 선택 요소 생성
  private _createListSelectElement = () => {
    this._listSelectElement = this.useListSelect
      ? html`
          <div class="list-select">
            <span class="list-select-title">선택목록</span>
            <button class="list-select-button"><span></span></button>
          </div>
        `
      : null;
  };
  // 전체 선택 요소 생성
  private _createAllSelectElement = () => {
    // 클래스 추가 필요
    this._allSelectElement =
      this.useAllSelect || this.useListSelect || this.useTotalCount
        ? html`
            <div class="cardlist-all-select">
              ${this._totalCardCountElement} ${this._listSelectElement} ${this._allSelectCheckboxElement}
            </div>
          `
        : null;
  };
  // 전체 컨트롤 요소 생성
  private _createControlElement = () => {
    this._controlElement =
      this._options._controlOptions.useSortSet || this._options._controlOptions.useColumnSet
        ? html` <div class="option-control">${this._sortElement} ${this._columnSetElement}</div> `
        : null;
  };
  // 카드 총 개수 요소 생성
  private _createTotalCardCountElement = () => {
    this._totalCardCountElement = this.useTotalCount
      ? html`
          <div class="card-total">
            <span>총<strong>${this._totalCount}</strong>건</span>
          </div>
        `
      : null;
  };
  // 컨트롤 셋 요소 생성
  private _createControlSetElement = () => {
    this._controlSetElement = this.useControl
      ? html` <div class="cardlist-option-control">${this._controlElement}</div> `
      : null;
  };
  // 정렬 요소 생성
  private _createSortElement = () => {
    this._sortElement = this._options._controlOptions.useSortSet ? this._sortElement : null;
  };
  // 컬럼 셋 요소 생성
  private _createColumnSetElement = () => {
    this._columnSetElement = this._options._controlOptions.useColumnSet ? this._columnSetElement : null;
  };
  // 전체 선택 체크박스 요소 생성
  private _createAllSelectCheckboxElement = () => {
    this._allSelectCheckboxElement = this.useAllSelect ? this._allSelectCheckboxElement : null;
  };
  // 요소들 생성
  private _createElements = () => {
    // 정렬 선택 드롭다운리스트 요소
    this._createSortElement();
    // 컬럼 셋 요소
    this._createColumnSetElement();
    // 전체 선택 체크박스 요소
    this._createAllSelectCheckboxElement();
    // 정렬 선택, 컬럼 선택 부모 요소
    this._createControlElement();
    // 전체 카드 개수 요소
    this._createTotalCardCountElement();
    // 리스트 선택 요소 ( 코드피커에서만 사용 )
    this._createListSelectElement();
    // 전체 카드 개수, 전체 선택 체크박스 부모 요소
    this._createAllSelectElement();
    // 편의기능 요소
    this._createControlSetElement();
  };
  // endregion

  // region 내부 이벤트 핸들러
  // 필드 선택 컬럼 셋 열림 이벤트 헨들러
  private _columnSetOpenHandler = (e: EventArgs) => {
    const columnSet = e.target as Columnsetbutton;
    columnSet.removeItems();
    columnSet.setItems(this._fieldList);
  };
  // 필드 선택 컬럼 셋 완료 이벤트 헨들러
  private _columnSetCompleteHandler = (e: EventArgs) => {
    const columnSet = e.target as Columnsetbutton;
    const itemList: Array<CardlistField> = columnSet.getItems() as Array<CardlistField>;
    for (let i = 0; i < this._fieldList.length; i++) {
      this._fieldList[i].visible = itemList[i].visible;
    }
    this._createCardListElement();
  };
  // 더보기 버튼 클릭 이벤트 핸들러
  private _moreButtonClickHandler = (e: any) => {
    this._datasource?.read();
  };
  // 카드 요소 클릭 이벤트 핸들러
  private _cardClickHandler(e: any) {
    let cardElement;

    if (e.currentTarget && e.currentTarget.localName === 'div' && e.currentTarget.classList.contains('card')) {
      cardElement = e.currentTarget;
    } else {
      cardElement = e.path[0].closest('div.card');
    }

    this._activeChange(cardElement);
  }
  private _mouseDownHandler(e: any) {
    let cardElement;

    if (e.currentTarget && e.currentTarget.localName === 'div' && e.currentTarget.classList.contains('card')) {
      cardElement = e.currentTarget;
    } else {
      cardElement = e.path[0].closest('div.card');
    }
    const changeArgs = { card: cardElement };

    this._trigger('change', changeArgs);
  }
  // 전체 선택 클릭 이벤트 핸들러
  private _allSelectClickHandler(e: any) {
    const checkbox: Checkbox = e.currentTarget;
    const checked: boolean = checkbox.checked;
    const selectCheckboxElements = this.shadowRoot?.querySelectorAll('dews-checkbox.card-select-checkbox');

    if (selectCheckboxElements) {
      for (let i = 0; i < selectCheckboxElements.length; i++) {
        const selectCheckboxElement: any = selectCheckboxElements[i];

        selectCheckboxElement.checked = checked;
        if (checked) {
          selectCheckboxElement.classList.add('checked');
        } else {
          selectCheckboxElement.classList.remove('checked');
        }
      }
      this._checkCount = checked ? this._totalCount : 0;
    }
  }
  // 카드 체크 요소 클릭 이벤트 헨들러
  private _checkClickHandler(e: any) {
    const checkbox: Checkbox = e.currentTarget;
    const checked: boolean = checkbox.checked;
    this._checkChange(checkbox, checked);
  }
  // 카드 안의 열기/닫기 버튼 클릭 이벤트 헨들러
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

  // 정렬 drawer-layout 에서 적용 버튼 클릭 시
  private _sortingConfirmTouchEvent = (target: SortbuttonItem) => {
    const sortbutton: Sortbutton | undefined | null = this.shadowRoot?.querySelector('sort-button');
    sortbutton!.label = target!.label;
    sortbutton!.ascending = target!.ascending;
    this._sortObj.field = target!.field;
    this._sortObj.dir = target!.ascending ? 'asc' : 'desc';
    this._datasource!.sort(this._sortObj);
    this._cardData = this._datasource!.sortData() || [];
    this._cardListElement = this._cardListRepeat(this._cardData);
  };
  // 정렬 drawer-layout 에서 필드 값 클릭 시
  private _clickSortingItem = (e: any) => {
    const target: SortbuttonItem = e.target as SortbuttonItem;
    if (target.sorting) {
      target.ascending = !target.ascending;
    } else {
      const sortingItem: SortbuttonItem | null | undefined = target.parentElement?.querySelector('sort-item[sorting]');
      if (sortingItem) {
        sortingItem.sorting = false;
        sortingItem.ascending = false;
      }
      target.sorting = true;
    }
    this._sortingConfirmTouchEvent(target);
  };

  // endregion

  // region 내부 Method
  // 활성화 카드 변경 함수
  private _activeChange = (element: Element) => {
    const cardElement = element;
    if (this._activeCardElement) {
      this._activeCardElement.classList.remove('active');
    }
    this._activeCardElement = cardElement;
    cardElement.classList.add('active');
  };
  // 체크 변경 함수
  private _checkChange = (checkbox: Checkbox, checked: boolean) => {
    const allSelectCheckbox: Checkbox | null | undefined = this.shadowRoot?.querySelector(
      'dews-checkbox.cardlist-all-select-checkbox'
    );
    const card: any = checkbox.closest('.card');
    const checkedArgs = { event: 'checked', checked: checked, checkbox: checkbox, itemIndex: card!.cardIndex };
    if (checked) {
      this._checkCount++;
      if (this._checkCount === this._totalCount && allSelectCheckbox) {
        allSelectCheckbox.checked = true;
      }
      checkbox.classList.add('checked');
    } else {
      this._checkCount--;
      if (allSelectCheckbox && allSelectCheckbox.checked) {
        allSelectCheckbox.checked = false;
      }
      checkbox.classList.remove('checked');
    }

    this._trigger('checked', checkedArgs);
  };
  // 필드 리스트를 얻어오는 함수
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
      const required: string | null = fieldElement.getAttribute('required');

      fields[name] = { _displayIndex: i };
      fields[name].name = name;
      fields[name].field = field ? field : name;
      fields[name].type = type ? type : undefined;
      fields[name].title = title ? title : name;
      fields[name].visible = visible ? visible === 'true' : true;
      fields[name].required = required ? required === 'true' : false;

      fieldList.push(fields[name]);
    }

    this._fields = fields;
    this._fieldList = fieldList;
  }
  // 체크 카드 호출
  private _getCheckCard(type: 'data' | 'cardIndex') {
    const checkCards = this.shadowRoot?.querySelectorAll('dews-checkbox.card-select-checkbox.checked');
    const result = [];
    if (checkCards && checkCards.length > 0) {
      for (let i = 0; i < checkCards.length; i++) {
        const card: any = checkCards[i].closest('.card');
        result.push(card[type]);
      }
    }
    return result;
  }
  // 카드 요소 호출
  private _getCard = (itemIndex: number): Element | undefined | null => {
    return this.shadowRoot?.querySelector(`.cardlist-wrap > .cardlist > .card-${itemIndex}}`);
  };
  // 카드 인덱스 호출
  private _getDataIndex = (itemIndex: number): number | undefined => {
    const data: ObservableArrayItem<T> = this._cardData[itemIndex];
    let dataIndex: number | undefined = undefined;
    if (data) {
      dataIndex = this._datasource?._data?.getIndexByUid(data.uid!);
    }
    return dataIndex;
  };
  // 이벤트 트리거 함수
  private _trigger(type: string, args?: unknown) {
    if (type === 'checked') {
      const eventArgs = new CardListCheckedEventArgs(Object.assign({}, args, { target: this }));
      Object.freeze(args);
      this._events.emit<CardListCheckedEventArgs<T>>(type, eventArgs);
    }
    if (type === 'change') {
      const eventArgs = new CardListChangeEventArgs(Object.assign({}, args, { target: this }));
      Object.freeze(args);
      this._events.emit<CardListChangeEventArgs<T>>(type, eventArgs);
    }
  }
  // endregion

  private _first = true;

  // region LifeCycle
  async connectedCallback() {
    super.connectedCallback();
    if (this._first) {
      this._getFields();
      this._first = false;
      await this.updateComplete;
      await this._initOptions();
      await this._createElements();
      // 컬럼 셋 이벤트 헨들러 등록
      const columnSetElement = this.shadowRoot?.querySelector('columnset-button') as Columnsetbutton;
      if (columnSetElement) {
        columnSetElement.on('open', this._columnSetOpenHandler);
        columnSetElement.on('complete', this._columnSetCompleteHandler);
      }
      const sortButtonElement = this.shadowRoot?.querySelector('sort-button') as Sortbutton;
      if (sortButtonElement) {
        sortButtonElement.on('select', this._clickSortingItem);
      }
    }
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    return super.shouldUpdate(_changedProperties);
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (typeof _changedProperties.get('_totalCount') === 'number' && this._totalCount >= 0) {
      this._createTotalCardCountElement();
      this._createAllSelectElement();
    }
    if (_changedProperties.get('datasource')) {
      // 데이터소스 변경
      this._initDatasource();
    }
    if (typeof _changedProperties.get('useHeader') === 'boolean') {
      // 카드 헤더 사용 여부
      this._options._useHeader = this.useHeader;
      this._createCardListElement();
    }
    if (_changedProperties.get('headerOptions')) {
      // 카드 헤더 옵션
      this._options._headerOptions = this.headerOptions!;
      if (this.useHeader) {
        this._createCardListElement();
      }
    }
    if (typeof _changedProperties.get('useControl') === 'boolean') {
      // 편의 기능 사용 여부
      this._createControlSetElement();
    }
    if (_changedProperties.get('controlOptions')) {
      // 편의 기능 설정 옵션
      this._options._controlOptions = this.controlOptions;
      this._createSortElement();
      this._createColumnSetElement();
      this._createControlElement();
      this._createColumnSetElement();
    }
    if (typeof _changedProperties.get('useCardCollapse') === 'boolean') {
      // 카드 접기/펴기 사용 여부
      this._options._useCardCollapse = this.useCardCollapse;
      this._createCardListElement();
    }
    if (_changedProperties.get('cardFixedFieldCount')) {
      // 접기/펴기 사용 할 경우 접었을 경우 고정 되는 필드 개수
      if (this.useCardCollapse) {
        this._createCardListElement();
      }
    }
    if (_changedProperties.get('useAllSelect')) {
      // 전체 선택 사용 여부
      this._createAllSelectCheckboxElement();
      this._createAllSelectElement();
    }
    if (_changedProperties.get('useTotalCount')) {
      // 전체 카드 개수 사용 여부
      this._createTotalCardCountElement();
      this._createAllSelectElement();
    }
    if (_changedProperties.get('columnType')) {
      // 카드리스트 타입
      this._createCardListElement();
    }
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === 'header-options' || name === 'control-options') {
      return JSON.parse(value!);
    }
    if (name === 'onchecked') {
      const ch = new Function('return ' + value)();
      this._events.on<CardListCheckedEventArgs<T>>('checked', ch);
    }
    if (name === 'onchange') {
      const ch = new Function('return ' + value)();
      this._events.on<CardListChangeEventArgs<T>>('change', ch);
    }
  }

  render() {
    return template.call(this);
  }
  // endregion

  // region Method
  // 카드 체크
  cardCheck = (itemIndex: number, checked?: boolean) => {
    const cardElement: Element | null | undefined = this.shadowRoot?.querySelector(
      `.cardlist-wrap > .cardlist > .card-${itemIndex}`
    );
    let cardChecked: boolean | undefined = undefined;
    if (this._options._useHeader && this._options._headerOptions.useCheckbox) {
      const selectCheckbox: Checkbox | null | undefined = cardElement?.querySelector(
        'dews-checkbox.card-select-checkbox'
      );
      if (typeof checked === 'boolean') {
        this._checkChange(selectCheckbox!, checked);
      } else {
        cardChecked = selectCheckbox!.checked;
      }
    }

    return cardChecked;
  };
  // 체크 카드 인덱스 호출
  getCheckCardIndex = (): Array<number> => {
    return this._getCheckCard('cardIndex');
  };
  // 체크 카드 데이터 호출
  getCheckCardData = (): Array<ObservableArrayItem<T>> => {
    return this._getCheckCard('data');
  };
  // 카드 데이터
  cardItems = () => {
    return this._cardData;
  };
  // 선택 카드
  select = (itemIndex?: number): Element | undefined => {
    if (itemIndex) {
      const cardElement: Element | null | undefined = this.shadowRoot?.querySelector(
        `.cardlist-wrap > .cardlist > .card-${itemIndex}`
      );
      if (cardElement) {
        this._activeChange(cardElement);
      }
    }
    return this._activeCardElement;
  };
  // 카드 요소
  getCard = (itemIndex: number): Element | undefined | null => {
    return this._getCard(itemIndex);
  };
  // 카드 추가
  addCard = (data: T) => {
    this._datasource?.add(data);
  };
  // 카드 제거
  removeCard = (itemIndex: number) => {
    if (this.useControl && this.controlOptions.useSortSet) {
      const dataIndex = this._getDataIndex(itemIndex);
      if (dataIndex) this._datasource?.delete(dataIndex);
    }
    this._datasource?.delete(itemIndex);
  };
  // 특정 값 반환
  getValue = (itemIndex: number, field: keyof T) => {
    // return this._datasource?.__data__[itemIndex][field];
  };
  // 특정 값 설정
  setValue = (itemIndex: number, field: keyof T, value: unknown) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    this._datasource?.__data__[itemIndex][field] = value;
  };
  // 이벤트 등록
  on(type: string, handler: any) {
    this._events.on(type, handler);
  }
  // 이벤트 해제
  off(type: string, handler: any) {
    this._events.off(type, handler);
  }
  // endregion
}
