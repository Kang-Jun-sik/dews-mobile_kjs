import { html, internalProperty, property, PropertyValues, query, TemplateResult } from 'lit-element';
import { Drawerlayout } from '../../drawerlayout/drawerlayout.js';

import template from './codepicker.html';
import scss from './codepicker.scss';
import { PickerBase } from '../picker-base.js';
import { Cardlist } from '../../cardlist/dews-cardlist.js';
import { Checkbox } from '../../checkbox/checkbox.js';

type EVENT_TYPE = 'setData' | 'change';

export class Codepicker extends PickerBase {
  static styles = scss;

  @query('drawer-layout')
  _drawerLayout!: HTMLInputElement;

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String })
  placeholder: string | undefined = '';

  @property({ type: String, attribute: 'help-code' })
  helpCode = '';

  @property({ type: String, attribute: 'code-field' })
  codeField = '';

  @property({ type: String, attribute: 'text-field' })
  textField = '';

  @property({ type: String, attribute: 'help-params' })
  helpParams: string | object | Function = '';

  @property({ type: Boolean, attribute: 'help-custom' })
  helpCustom = false;

  @property({ type: String, attribute: 'help-view-url' }) // 생략시 도움창 View URL을 자동 생성
  helpViewUrl = '';

  @property({ type: String, attribute: 'help-api-url' }) // 생략시 도움창 Api URL을 자동 생성
  helpApiUrl = '';

  @property({ type: String, attribute: 'help-title' })
  helpTitle = '';

  @property({ type: String, attribute: 'data-control-type' })
  dataControlType = 'card';

  @internalProperty()
  private useFilter = true;

  @internalProperty()
  private filterActive = false;

  @internalProperty()
  private filterDisabled = false;

  @internalProperty()
  private searchFilterSet = false;

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private selectTotal = 0;

  @internalProperty()
  private text: string | undefined;

  @internalProperty()
  private texts: Array<string> = [];

  @internalProperty()
  private code: string | undefined;

  @internalProperty()
  private codes: Array<string> = [];

  @internalProperty()
  private formState = false;

  @internalProperty()
  private searchFormList: Array<HTMLCollection> = [];

  @internalProperty()
  private _allCheckState = false;

  @internalProperty()
  private _cardList: Cardlist<object> | undefined;

  constructor() {
    super();
    this._afterBtnView();
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log('connect!!');

    // this._createSearchContainer();
  }

  // 적용 버튼 클릭 시
  _confirmClickHandler() {
    const checkData = this._cardList!.getCheckCardData();

    if (checkData?.length > 0) {
      this.setData(checkData);
    } else {
      this.clearData();
    }

    this._close();
  }

  private _createSearchContainer() {
    const searchDiv = this.querySelector('codepicker-search')! as Node;
    this._drawerLayout?.querySelector('ul.form-field')?.appendChild(searchDiv);
  }

  // 필터 버튼 클릭
  private _clickFilter(e: MouseEvent) {
    this.filterActive = !this.filterActive;
  }

  private _clickSearch(e: MouseEvent) {
    console.log('_clickSearch');
  }

  private _searchKeywordEnter(e: KeyboardEvent) {
    const $searchButton = this._drawerLayout?.querySelector('.search-button') as HTMLElement;

    // if (e.key === 'Enter') {
    //   $searchButton?.click();
    // }
  }

  private _searchKeyword() {
    console.log('code search');
  }

  private _clickListButton() {
    const layerCodeList = this._drawerLayout?.querySelector('.cardlist-all-select') as HTMLElement;

    if (!layerCodeList.classList.contains('select-list')) {
      layerCodeList?.classList.add('select-list');
    } else {
      layerCodeList?.classList.remove('select-list');
    }
  }

  // 내부 컴포넌트의 change가 발생하면 서치폼의 change가 발생하면서 컴포넌트들의 validate를 체크
  // 듀스 컨트롤 찾아서 거기서 validate가 하나라도 true 이면 state를 on 으로 변경
  private _searchFormState() {
    const searchFormField = this._drawerLayout?.querySelector('.code-filter-field ul');

    // console.log(searchFormField!.querySelectorAll('[tagName^="dews-"]')); // 방법 찾기 (tag 명으로 하위 컴포넌트들 찾기)
    // console.log(searchFormField!.querySelectorAll('*[id]')); // 방법 찾기 (tag 명으로 하위 컴포넌트들 찾기)
    // const formControls = searchFormField?.querySelectorAll('dews-dropdownlist,dews-numerictextbox,dews-datepicker');
    const formControls = searchFormField?.querySelectorAll('dews-dropdownlist, dews-numerictextbox');

    formControls?.forEach(item => {
      const instance = item as any;

      instance.on('change', () => {
        this.formState = !!instance.value;
        console.log('state: ', this.formState);
      });
    });
  }

  /**
   * 코드 도움 다이얼로그 이벤트를 발생시킵니다.
   * @param {string} [keyword] 검색어
   * @param {object|array} [initData] 초기화 데이터
   * @private
   */
  private _triggerCodeDialog() {
    console.log('triggerCodeDialog');
  }

  /**
   * 코드피커에 코드와 텍스트를 설정합니다.
   * @param {object} data 코드와 텍스트
   */
  public setData(data: any) {
    let isArray = false;
    let selected: any = undefined;

    if (Array.isArray(data)) {
      isArray = true;
      if (!this.multi && data.length == 1) {
        selected = data[0];
      }
    } else if (typeof data == 'object') {
      selected = data;
    }

    if (selected) {
      this.selectTotal = 1;
      // 설정할 데이터가 단독일 경우에는 바로 설정한다.
      if (this.codeField in selected) {
        this.code = selected[this.codeField];

        if (this.multi) {
          this.codes = [];
        }
      }
      if (this.textField in selected) {
        this.text = selected[this.textField];

        if (this.multi) {
          this.texts = [];
        }
      }
    } else if (isArray) {
      // 설정할 데이터가 다수일 경우에는 코드다이얼로그를 열도록 codedialog 이벤트를 발생시킨다.
      if (this.multi) {
        selected = data;
        this.selectTotal = selected.length;

        if (this.selectTotal > 0) {
          this.code = selected[0][this.codeField];
          this.text = selected[0][this.textField];
          this.codes = [];
          this.texts = [];

          selected.forEach((item2: any) => {
            this.codes.push(item2[this.codeField]);
            this.texts.push(item2[this.textField]);
          });
        } else {
          this.code = '';
          this.text = '';
          this.codes = [];
          this.texts = [];
        }
      } else {
        this._open();
      }
    }

    if (selected) {
      this._EVENT.emit('setData', { type: 'setData', target: this, data: selected });
    }
  }

  public clearData() {
    const data: any = {};

    data[this.codeField] = data[this.textField] = '';

    this.setData(data);
  }

  public focus() {
    console.log('focus');
  }

  public setHelpParams(helpParams: object | Function) {
    let params: any = null;

    if (typeof helpParams === 'function') {
      params = helpParams.call(this);
    } else if (typeof helpParams === 'object') {
      params = helpParams;
    }

    this.helpParams = params;
  }

  private _createCard() {
    const cardList = this.querySelector('dews-cardlist') as Cardlist<object>;
    let oldCheckIndex: undefined | number = undefined;

    this._cardList = cardList;

    cardList!.autoBind = true;
    cardList!.useTotalCount = true;
    cardList!.height = '430px';
    cardList!.useHeader = true;
    cardList!.setAttribute('header-options', JSON.stringify({ useBookmark: false })); // 북마크 안나오도록 설정
    cardList!.setAttribute('codepicker', ''); // 코드피커 내에서 사용하는 카드리스트의 경우 codepicker 추가함

    if (this.multi) {
      cardList!.useAllSelect = true;
    }

    cardList.on('checked', (e: any) => {
      if (!this.multi) {
        if (typeof oldCheckIndex == 'number' && e.itemIndex !== oldCheckIndex) {
          const oldChecked = this._cardList!.shadowRoot?.querySelectorAll('dews-checkbox')[oldCheckIndex] as Checkbox;
          oldChecked.checked = false;
          oldChecked.classList.remove('checked');
        }
        oldCheckIndex = e.itemIndex;
      }
    });

    this._drawerLayout?.querySelector('.cardlist-wrap')?.append(cardList);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    console.log('shouldUpdate');
    const filterButton = this._drawerLayout?.querySelector('.filter-button') as HTMLElement;

    if (this.formState) {
      filterButton?.classList.add('setting');
    } else {
      filterButton?.classList.remove('setting');
    }

    return super.shouldUpdate(_changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    console.log('firstUpdated');
    this._drawerLayout?.addEventListener('blur', this._close);

    // dataControlType에 타입에 따라
    if (this.dataControlType == 'card') {
      this._createCard();
    }

    this._createSearchContainer();

    if (this.useFilter) {
      this._searchFormState();
    }

    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    console.log('updated');

    super.updated(_changedProperties);

    this.updateComplete.then(() => {
      // 높이 계산 (추후 변경 예정)
      // let cardListHeight: number =
      //   this._drawerLayout?.querySelector('.control')?.clientHeight! -
      //   (cardList.shadowRoot?.querySelector('.dews-container-option-control')?.clientHeight! -
      //     cardList.shadowRoot?.querySelector('.cardlist-all-select')?.clientHeight!) -
      //   42 -
      //   10;
      //
      // if (cardListHeight < 250) {
      //   cardListHeight = 250;
      // }
      // cardList.height = cardListHeight.toString() + 'px';
    });

    // _changedProperties.forEach((oldValue, propName) => {
    //   if (propName === 'searchFormList') {
    //     this.updateComplete.then(() => {
    //       if (this.useFilter) {
    //         this._searchFormState();
    //       }
    //       console.log('updateComplete');
    //     });
    //   }
    // });
  }

  // protected updateComplete;

  render() {
    console.log('render');
    return template.call(this);
  }
}
