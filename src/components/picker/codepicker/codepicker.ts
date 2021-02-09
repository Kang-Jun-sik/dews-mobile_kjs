import { internalProperty, property, PropertyValues, query } from 'lit-element';
import { Drawerlayout } from '../../drawerlayout/drawerlayout.js';

import template from './codepicker.html';
import scss from './codepicker.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { PickerBase } from '../picker-base.js';

type EVENT = 'setData' | 'change';

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
  private total = 50;

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

  _Event: EventEmitter = new EventEmitter();

  constructor() {
    super();
    this._afterBtnView();
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log('connect');

    this._createSearchContainer();
  }

  // 적용 버튼 클릭 시
  _confirmClickHandler() {
    const $cardList: Drawerlayout | null = this.shadowRoot!.querySelector('.drawer-layout .cardlist');
    const $selectItem = $cardList?.querySelectorAll('dews-checkbox');
    const text = '';
    const code = '';
    let selected: object | Array<object> = [];
    let data;

    // 카드리스트의 체크된 항목을 받아오기
    if (this.multi) {
      data = [
        { code: 'code1', text: 'Multi Data' },
        { code: 'code2', text: 'text2' },
        { code: 'code3', text: 'text3' },
        { code: 'code4', text: 'text4' }
      ];
    } else {
      data = { code: 'code1', text: 'Single Data' };
    }

    // 카드리스트에서 받아온 데이터로 수정하기
    if (this.multi && this.selectTotal > 1) {
      // $selectItem?.forEach($item => {
      //   let itemText = ($item?.parentElement?.querySelector(
      //     'li > p.item[data-value="' + this.textField + '"]'
      //   ) as HTMLParagraphElement)?.innerHTML;
      //   let itemCode = ($item?.parentElement?.querySelector(
      //     'li > p.item[data-value="' + this.codeField + '"]'
      //   ) as HTMLParagraphElement)?.innerHTML;

      //   (selected as []).push({ code: itemCode, text: itemText });
      // });
      selected = data;
    } else {
      // selected = { code: code, text: text };
      selected = data;
    }

    this.setData(selected);

    this._close();
  }

  private _allCheck(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    const $cardCheckbox = this.shadowRoot!.querySelector('.drawer-layout .cardlist')!.querySelectorAll(
      'input.card-checkbox'
    );

    this._allCheckState = $el!.hasAttribute('checked');

    if ((e.target as HTMLElement).localName === 'dews-checkbox') {
      this._allCheckState = (e.target as HTMLElement).hasAttribute('checked');
    }

    this._allCheckState ? (this.selectTotal = $cardCheckbox.length) : (this.selectTotal = 0);

    const allCheck = this._allCheckState;

    $cardCheckbox.forEach(function (item) {
      const $item = item as HTMLInputElement;
      $item!.checked = allCheck;
    });
  }

  private _createSearchContainer() {
    // 일단 이렇게 받아온다 가정
    const htmlString =
      ' <li>\n' +
      '                <label for="">거래처코드</label>\n' +
      '                <dews-dropdownlist id="ddl">\n' +
      '                  <dropdownlist-item title="DATA-1"></dropdownlist-item>\n' +
      '                  <dropdownlist-item title="DATA-2"></dropdownlist-item>\n' +
      '                </dews-dropdownlist>\n' +
      '              </li>\n' +
      '              <li>\n' +
      '                <label for="">거래처명</label>\n' +
      '                <dews-numerictextbox id="ntb"></dews-numerictextbox>\n' +
      '              </li>' +
      '              <li>\n' +
      '                <label for="">등록</label>\n' +
      '                  <dews-masktextbox id="masktbx3" type="text" placeholder="hint" title="LL-00" mask="LL-00">' +
      '                   </dews-masktextbox>\n' +
      '              </li>';

    const parser = new DOMParser(),
      dom = parser.parseFromString(htmlString, 'text/html');

    //eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //@ts-ignore
    for (const item of dom?.body.children) {
      this.searchFormList.push(item);
    }
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

  // // 이벤트 등록
  // public on(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
  //   this._Event.on(key, handler);
  // }
  //
  // // 이벤트 삭제
  // public off(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
  //   this._Event.off(key, handler);
  // }

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
      }
      if (this.textField in selected) {
        this.text = selected[this.textField];
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
        }
      } else {
        this._open();
      }
    }

    if (selected) {
      this._Event.emit('setData', { type: 'setData', target: this, data: selected });
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

    const cardList = this.querySelector('dews-cardlist') as HTMLElement;

    cardList?.setAttribute('use-total-count', 'true');
    cardList?.setAttribute('auto-bind', 'true');

    if (this.multi) {
      cardList?.setAttribute('use-all-select', 'true');
    }

    this._drawerLayout?.querySelector('.cardlist-wrap')?.append(cardList);
    // cardList.shadowRoot!.querySelector('.cardlist')?.classList.add('dews-cardlist codepicker');

    if (this.useFilter) {
      this._searchFormState();
    }

    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    console.log('updated');

    super.updated(_changedProperties);

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

  render() {
    console.log('render');
    return template.call(this);
  }
}
