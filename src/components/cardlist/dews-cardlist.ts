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
import { CardListCheckedEventArgs } from './Event.js';

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

  // 카드리스트
  @internalProperty()
  private _cardList: TemplateResult[] = [];

  // 카드리스트 요소
  @internalProperty()
  private _cardListElement: TemplateResult | null = null;

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
    ></columnset-button>`;

    if (this._fieldList?.length > 0 && this._fieldList[0].field !== undefined) {
      this._sortObj.field = this._fieldList[0].field;
      this._sortObj.dir = 'desc';
    }

    // 카드리스트 정렬 기능 drawer-layout 영역
    this._sortElement = html`
      <span id="sorting-set" class="sorting-wrap" @click="${this._sortingSetTouchEvent}">
        <span class="sorting-order"></span>
        <span class="sorting-input"></span>
        <span class="sorting-icon"></span>
      </span>
      <drawer-layout class="sort-drawer-layout" height="500px" scrollEnabled>
        <div class="sorting-list">
          <div class="titlebar">
            <div class="title">항목명</div>
            <button class="confirm-button" @click="${this._sortingConfirmTouchEvent}">적용</button>
          </div>
          <div class="control" @touchstart="${this._touchStart}" @touchmove="${this._touchMove}">
            <ul class="list">
              ${this._fieldList.map(
                (field, index) =>
                  html`<li class="${index === 0 ? 'sorting' : ''}" @click="${
                    this._clickSortingItem
                  }"><span class="text">${field.field}</span></span></li>`
              )}
            </ul>
          </div>
        </div>
      </drawer-layout>
    `;

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

  private _columnSetOpenHandler = (e: EventArgs) => {
    console.log('open', e);
    const columnSet = e.target as Columnsetbutton;
    // columnSet.addItems(this._fieldList);
  };

  private _columnSetCompleteHandler = (e: EventArgs) => {
    console.log('complete', e);
    const columnSet = e.target as Columnsetbutton;
    // const itemList = columnSet.getItemList();
    // console.log(itemList);
  };

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

      this._datasource.on('requestEnd', (e: any) => {
        console.log('requestEnd', e);
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
        console.log('datasource change', e);
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

  private _cardListRepeat = (items: any) => {
    const keyFn = (item: any) => {
      console.log('keyFn', item);
      return item.uid;
    };
    const itemTemplate = (item: any, index: number) => {
      console.log('itemTemplate', item, index);
      return this._createCardElement(item, index);
    };
    console.log('cardListFn');
    return html`${repeat(items, keyFn, itemTemplate)}`;
  };

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

  private _moreButtonClickHandler = (e: any) => {
    this._datasource?.read();
  };

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

  // 정렬 버튼 클릭 시 drawer-layout 활성화
  private _sortingSetTouchEvent = (e: TouchEvent) => {
    const sortDrawerLayout: any = this.shadowRoot?.querySelector('.sort-drawer-layout');
    if (!this._sortActive) {
      e.stopPropagation(); // 처음 열었을 때 drawer-layout 이 닫히지 않게 하기 위해 추가
      this._sortActive = true;
      sortDrawerLayout?.setAttribute('active', String(this._sortActive));
      document.addEventListener('click', this._addEvent);
    } else {
      sortDrawerLayout?.setAttribute('active', String(!this._sortActive));
      this._close();
    }
  };

  // 정렬 drawer-layout 에서 적용 버튼 클릭 시
  private _sortingConfirmTouchEvent = () => {
    const sortDrawerLayout: any = this.shadowRoot?.querySelector('.sort-drawer-layout');

    const sortingItem: HTMLElement = sortDrawerLayout.querySelector('.sorting');

    this._sortObj.field = sortingItem.innerText;
    this._sortObj.dir = sortingItem.classList.contains('ascending') ? 'asc' : 'desc';
    this._close();

    this._datasource!.sort(this._sortObj);
    this._cardData = this._datasource!.sortData() || [];

    this._cardListElement = this._cardListRepeat(this._cardData);
  };

  // 정렬 drawer-layout 에서 필드 값 클릭 시
  private _clickSortingItem = (e: Event) => {
    const sortDrawerLayout: any = this.shadowRoot?.querySelector('.sort-drawer-layout');
    let target: HTMLElement = e.target as HTMLElement;
    if (target?.tagName === 'SPAN') {
      target = target.parentElement as HTMLElement;
    }
    if (target.classList.contains('sorting')) {
      target.classList.contains('ascending') ? target.classList.remove('ascending') : target.classList.add('ascending');
    } else {
      const sortingItem: HTMLElement = sortDrawerLayout.querySelector('.sorting');
      sortingItem !== null ? sortingItem.classList.remove('sorting') : '';
      sortingItem?.classList.contains('ascending') ? sortingItem?.classList.remove('ascending') : '';
      target.classList.add('sorting');
    }
  };

  // 정렬 drawer-layout 이 활성화되어있을 때 다른 영역 클릭 시 닫힐 수 있게
  private _domClickHandler(e: MouseEvent) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.sort-drawer-layout')?.shadowRoot!.querySelector('.layer-bottom')
            ?.clientHeight!
      ) {
        if (!this._sortActive) {
          return;
        } else {
          this._close();
        }
      }
    }
  }

  private _addEvent = this._domClickHandler.bind(this);

  // 정렬 drawer-layout 닫기
  private _close = () => {
    this._sortActive = false;
    document.removeEventListener('click', this._addEvent);
    this.shadowRoot?.querySelector('.sort-drawer-layout')?.removeAttribute('active');
  };

  // 정렬 drawer-layout 스크롤링
  private _touchMove(e: any) {
    // e.passive = true;
    // e.capture = true;
    e.currentTarget.scrollTo(0, this._startPoint! - e.changedTouches[0].screenY);
  }

  // 정렬 drawer-layout 스크롤링
  private _touchStart(e: any) {
    this._startPoint = e.changedTouches[0].screenY + e.currentTarget.scrollTop;
  }

  private _cardClickHandler(e: any) {
    let cardElement;

    if (e.currentTarget && e.currentTarget.localName === 'div' && e.currentTarget.classList.contains('card')) {
      cardElement = e.currentTarget;
    } else {
      cardElement = e.path[0].closest('div.card');
    }

    this._activeChange(cardElement);
  }

  // 활성화 카드 변경
  private _activeChange = (element: Element) => {
    const cardElement = element;
    if (this._activeCardElement) {
      this._activeCardElement.classList.remove('active');
    }
    this._activeCardElement = cardElement;
    cardElement.classList.add('active');
  };

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

  private _checkClickHandler(e: any) {
    console.log('check', e);
    const checkbox: Checkbox = e.currentTarget;
    const checked: boolean = checkbox.checked;
    this._checkChange(checkbox, checked);
  }

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

      if (data[field.field!]) {
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
    >
      ${headerElement}
      <ul class="list-field">
        ${liElements}
      </ul>
      ${collapseElement}
    </div>`;
  };

  // private _bindEvent = () => {
  //
  // }

  private _createAllSelectElement = () => {
    this._allSelectElement =
      this.useAllSelect || this.useTotalCount
        ? html`
            <div class="cardlist-all-select">${this._totalCardCountElement} ${this._allSelectCheckboxElement}</div>
          `
        : null;
  };

  private _createControlElement = () => {
    this._controlElement =
      this._options._controlOptions.useSortSet || this._options._controlOptions.useColumnSet
        ? html` <div class="option-control">${this._sortElement} ${this._columnSetElement}</div> `
        : null;
  };

  private _createTotalCardCountElement = () => {
    this._totalCardCountElement = this.useTotalCount
      ? html`
          <div class="card-total">
            <span>총<strong>${this._totalCount}</strong>건</span>
          </div>
        `
      : null;
  };

  private _createControlSetElement = () => {
    this._controlSetElement = this.useControl
      ? html` <div class="cardlist-option-control">${this._controlElement}</div> `
      : null;
  };

  private _createSortElement = () => {
    this._sortElement = this._options._controlOptions.useSortSet ? this._sortElement : null;
  };

  private _createColumnSetElement = () => {
    this._columnSetElement = this._options._controlOptions.useColumnSet ? this._columnSetElement : null;
  };

  private _createAllSelectCheckboxElement = () => {
    this._allSelectCheckboxElement = this.useAllSelect ? this._allSelectCheckboxElement : null;
  };

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
    // 전체 카드 개수, 전체 선택 체크박스 부모 요소
    this._createAllSelectElement();
    // 편의기능 요소
    this._createControlSetElement();
  };

  private _trigger(type: string, args?: any) {
    const eventArgs = Object.assign({}, args, { target: this });
    Object.freeze(args);
    if (type === 'checked') {
      this._events.emit<CardListCheckedEventArgs<T>>(type, eventArgs);
    }
  }

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
    console.log('updateComplete');
    // 컬럼 셋 이벤트 헨들러 등록
    const columnSetElement = this.shadowRoot?.querySelector('columnset-button') as Columnsetbutton;
    columnSetElement.on('open', this._columnSetOpenHandler);
    columnSetElement.on('complete', this._columnSetCompleteHandler);
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
    console.log('attributeChanged');
    if (name === 'header-options' || name === 'control-options') {
      return JSON.parse(value!);
    }
    if (name === 'onchecked') {
      const ch = new Function('return ' + value)();
      this._events.on<CardListCheckedEventArgs<T>>('checked', ch);
    }
  }

  // endregion

  render() {
    console.log('render');
    return template.call(this);
  }

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
  private _getCard = (itemIndex: number): Element | undefined | null => {
    return this.shadowRoot?.querySelector(`.cardlist-wrap > .cardlist > .card-${itemIndex}}`);
  };
  private _getDataIndex = (itemIndex: number): number | undefined => {
    const data: ObservableArrayItem<T> = this._cardData[itemIndex];
    let dataIndex: number | undefined = undefined;
    if (data) {
      dataIndex = this._datasource?._data?.getIndexByUid(data.uid!);
    }
    return dataIndex;
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
}
