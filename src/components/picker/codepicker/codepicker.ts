import { internalProperty, property, PropertyValues, query } from 'lit-element';

import template from './codepicker.html';
import scss from './codepicker.scss';
import { Cardlist } from '../../cardlist/dews-cardlist.js';
import { Checkbox } from '../../checkbox/checkbox.js';
import { Drawerlayout } from '../../drawerlayout/drawerlayout.js';
import { TouchScroll } from '../../utill/touchscroll.js';
import { DrawerBottomBase } from '../drawer-bottom-base.js';

type EVENT_TYPE = 'setData' | 'change' | 'codeSearch' | 'open' | 'close';

export class Codepicker extends DrawerBottomBase {
  static styles = scss;

  @query('drawer-layout')
  _drawerLayout!: Drawerlayout;

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

  @property({ type: String })
  text: string | undefined;

  @property()
  texts: Array<string> = [];

  @property({ type: String })
  code: string | undefined;

  @property()
  codes: Array<string> = [];

  @internalProperty()
  private useFilter = true;

  @internalProperty()
  private filterActive = false;

  @internalProperty()
  private filterDisabled = false;

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private selectTotal = 0;

  @internalProperty()
  private _allCheckState = false;

  @internalProperty()
  private _cardList: Cardlist<object> | undefined;

  private _isCreatedCardlist = false;
  private _selectList: Array<number> | undefined;

  constructor() {
    super();
    this._afterBtnView();
  }

  async connectedCallback() {
    super.connectedCallback();

    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    } else if (this.readonly) {
      this.disabled = false;
    }
  }

  // 적용 버튼 클릭 시
  _confirmClickHandler() {
    const checkData = this._cardList?.getCheckCardData();

    if (checkData && checkData.length > 0) {
      this.setData(checkData);
    } else {
      this.clearData();
    }

    this._close('confirm');
  }

  private _createSearchContainer() {
    const $search = this.querySelector('codepicker-search')!;
    $search.slot = 'search';
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
      this._selectList = this._cardList?.getCheckCardIndex();
    }
  }

  public _codeSearchEmit() {
    this._EVENT.emit('codeSearch', { type: 'codeSearch', target: this, cardList: this._cardList });
  }

  public clearData() {
    const data: any = {};

    data[this.codeField] = data[this.textField] = '';

    this.setData(data);
  }

  public focus() {
    // console.log('focus');
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

  public on(
    key: EVENT_TYPE,
    handler: (e: { data: any; target: Codepicker; type: string }, ...args: unknown[]) => void
  ) {
    this._EVENT.on(key, handler);
  }

  // 이벤트 삭제
  public off(
    key: EVENT_TYPE,
    handler: (e: { data: any; target: Codepicker; type: string }, ...args: unknown[]) => void
  ) {
    this._EVENT.off(key, handler);
  }

  private _createCard() {
    const cardList = this.querySelector('dews-cardlist') as Cardlist<object>;
    let oldCheckIndex: undefined | number = undefined;

    if (cardList) {
      cardList!.autoBind = true;
      cardList!.useTotalCount = true;
      cardList!.useHeader = true;
      cardList!.useListSelect = true;
      cardList!.setAttribute('header-options', JSON.stringify({ useBookmark: false })); // 북마크 안나오도록 설정
      cardList!.setAttribute('use-control-set', ''); // 컬럼
      cardList!.setAttribute('codepicker', ''); // 코드피커 내에서 사용하는 카드리스트의 경우 codepicker 추가함

      if (this.multi) {
        cardList!.useAllSelect = true;
      }

      cardList.on('checked', (e: any) => {
        if (!this.multi) {
          if (typeof oldCheckIndex == 'number' && e.itemIndex !== oldCheckIndex) {
            const oldChecked = this._cardList?.shadowRoot?.querySelectorAll('dews-checkbox')[oldCheckIndex] as Checkbox;
            oldChecked.checked = false;
            oldChecked.classList.remove('checked');
          }
          oldCheckIndex = e.itemIndex;
        }

        const allSelectElement = this._cardList?.shadowRoot!.querySelector('.cardlist-all-select') as HTMLElement;
        const spanElement = allSelectElement.querySelector('.list-select-button>span') as HTMLElement;

        if (this._cardList?.getCheckCardIndex().length == 0) {
          spanElement!.style.display = 'none';
        } else {
          spanElement!.style.display = 'block';
          spanElement!.innerText = this._cardList!.getCheckCardIndex().length.toString();
        }

        if (allSelectElement?.classList.contains('select')) {
          this._showCheckedCard(true);
        }
      });
    }
  }

  private _showCheckedCard(selectFlag: boolean): boolean | undefined {
    const uncheckedCards = this._cardList?.shadowRoot?.querySelectorAll(
      'dews-checkbox.card-select-checkbox:not([checked])'
    );
    const checkedCards = this._cardList?.shadowRoot?.querySelectorAll('dews-checkbox.card-select-checkbox[checked]');

    if (uncheckedCards && uncheckedCards?.length > 0) {
      for (let i = 0; i < uncheckedCards.length; i++) {
        const unchecked = uncheckedCards[i].closest('.card') as HTMLElement;
        selectFlag ? (unchecked!.style.display = 'none') : (unchecked!.style.display = 'block');
      }
    }

    if (checkedCards && checkedCards?.length > 0) {
      for (let i = 0; i < checkedCards.length; i++) {
        const checked = checkedCards[i].closest('.card') as HTMLElement;
        checked!.style.display = 'block';
      }
    } else {
      return true; // checked된 카드가 없을 때, nodataElement 출력 여부 결정
    }
  }

  _close(type?: string) {
    super._close();

    if (type !== 'confirm') {
      this._setSelectedData();
    }
  }

  // 적용 안하고 그냥 닫았을 경우, 선택되어있던 데이터로 되돌리기.
  private _setSelectedData() {
    const allSelectElement = this._cardList?.shadowRoot!.querySelector('.cardlist-all-select') as HTMLElement;
    const allCheckElement = allSelectElement?.querySelector('dews-checkbox.cardlist-all-select-checkbox') as Checkbox;
    const checkboxs = this._cardList?.shadowRoot!.querySelectorAll('dews-checkbox.card-select-checkbox') as NodeList;
    const spanElement = allSelectElement?.querySelector('.list-select-button>span') as HTMLElement;
    const checkedIndexs = this._selectList;

    if (!checkedIndexs || (checkedIndexs && checkedIndexs.length == 0)) {
      if (allCheckElement) {
        allCheckElement.checked = false;
      }

      if (checkboxs && checkboxs.length > 0) {
        for (let i = 0; i < checkboxs.length; i++) {
          const checked = checkboxs[i] as Checkbox;
          checked.checked = false;
          checked.classList.remove('checked');
        }
      }
      allSelectElement?.classList.remove('select');
      spanElement!.style.display = 'none';
    } else {
      if (this.multi) {
        for (let i = 0; i < checkboxs.length; i++) {
          const checked = checkboxs[i] as Checkbox;
          for (let j = 0; j < checkedIndexs.length; j++) {
            if (checkedIndexs[j] === i) {
              checked.checked = true;
              break;
            } else {
              checked.checked = false;
              checked.classList.remove('checked');
            }
          }
        }
      } else {
        const checked = checkedIndexs[0] as number;
        const checkbox = checkboxs[checked] as Checkbox;
        for (let i = 0; i < checkboxs.length; i++) {
          const checked = checkboxs[i] as Checkbox;
          checked.checked = false;
          checked.classList.remove('checked');
        }
        checkbox.checked = true;
      }

      if (allCheckElement) {
        checkboxs.length == checkedIndexs.length ? (allCheckElement.checked = true) : (allCheckElement.checked = false);
      }

      spanElement.style.display = 'block';
      spanElement.innerText = checkedIndexs.length.toString();
    }
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    return super.shouldUpdate(_changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    // this._drawerLayout?.addEventListener('blur', this._close);

    new TouchScroll(this.shadowRoot?.querySelector('.control') as HTMLElement);

    // dataControlType에 타입에 따라
    if (this.dataControlType == 'card') {
      this._createCard();
    }

    // drawerLayout의 높이값이 변경되면 카드리스트의 높이 다시 세팅팅
    this._drawerLayout.on('heightChange', e => {
      this._setCardlistHeight(this._drawerLayout);
    });

    super.firstUpdated(_changedProperties);
  }

  // 초기화, drawerLayout의 높이 변경 시 카드리스트 높이 다시 세팅
  private _setCardlistHeight(drawerLayout: Drawerlayout) {
    const controlHeight = drawerLayout.querySelector('.control')?.clientHeight as number;
    const nodataElement = this._cardList?.shadowRoot?.querySelector('.card-nodata') as HTMLElement;

    // 높이 계산 (.control.height - 필터.height(48) - 총건수.height(48))
    this._cardList!.height = (controlHeight - 48 * 2).toString() + 'px';

    // 요고요고 문제 있음.
    if (nodataElement?.style.display === 'block') {
      this._cardList!.height = '250px';
    }
  }

  // 카드리스트의 전체선택 체크박스 클릭 시
  private _allCheckHandler() {
    const allSelectElement = this._cardList?.shadowRoot!.querySelector('.cardlist-all-select') as HTMLElement;
    const allCheckElement = allSelectElement?.querySelector('dews-checkbox.cardlist-all-select-checkbox') as Checkbox;
    const spanElement = allSelectElement?.querySelector('.list-select-button>span') as HTMLElement;
    const nodataElement = this._cardList?.shadowRoot!.querySelector(
      '.cardlist-wrap > .cardlist > .card-nodata'
    ) as HTMLElement;
    const nodataSpanElement = nodataElement?.querySelector('span') as HTMLElement;

    if (allCheckElement.checked) {
      spanElement!.style.display = 'block';
      spanElement!.innerText = this._cardList!.getCheckCardIndex().length.toString();
      this._showCheckedCard(true);
    } else {
      spanElement!.style.display = 'none';

      if (nodataElement) {
        this._showCheckedCard(true);
        nodataElement.style.display = 'block';
        nodataSpanElement!.innerText = '선택된 내역이 없습니다.';
      }
    }
  }

  // 카드리스트의 .list-select-button 클릭 시
  private _selectButtonHandler() {
    const allSelectElement = this._cardList?.shadowRoot?.querySelector('.cardlist-all-select') as HTMLElement;
    let nodataElement = this._cardList?.shadowRoot?.querySelector(
      '.cardlist-wrap > .cardlist > .card-nodata'
    ) as HTMLElement;
    let nodata: boolean | undefined = undefined;

    if (allSelectElement?.classList.contains('select')) {
      allSelectElement?.classList.remove('select');
      this._showCheckedCard(false);

      nodataElement!.style.display = 'none';

      this._setCardlistHeight(this._drawerLayout);
    } else {
      if (!this._cardList?.shadowRoot?.querySelector('.cardlist-wrap > .cardlist > .card-nodata')) {
        const noDataDiv = document.createElement('div');
        const noDataSpan = document.createElement('span');

        this._cardList?.shadowRoot!.querySelector('.cardlist-wrap > .cardlist')?.appendChild(noDataDiv);
        noDataDiv?.appendChild(noDataSpan);
        noDataDiv.classList.add('card-nodata');
        noDataSpan.innerText = '선택된 내역이 없습니다.';

        nodataElement = noDataDiv;
      }

      allSelectElement?.classList.add('select');

      nodata = this._showCheckedCard(true);
      nodata ? (nodataElement.style.display = 'block') : (nodataElement.style.display = 'none');
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.updateComplete.then(() => {
      const allSelectElement = this._cardList?.shadowRoot?.querySelector('.cardlist-all-select') as HTMLElement;
      const allCheckElement = allSelectElement?.querySelector('dews-checkbox.cardlist-all-select-checkbox') as Checkbox;
      const selectButtonElement = allSelectElement?.querySelector('.list-select-button') as HTMLButtonElement;
      const spanElement = allSelectElement?.querySelector('.list-select-button>span') as HTMLElement;

      if (this._isCreatedCardlist && allCheckElement) {
        allSelectElement?.classList.add('codepicker-control');
        allCheckElement?.addEventListener('click', this._allCheckHandler.bind(this));
        selectButtonElement?.addEventListener('click', this._selectButtonHandler.bind(this));

        this._isCreatedCardlist = false;
      }

      if (this._cardList) {
        this._setCardlistHeight(this._drawerLayout);

        if (spanElement) {
          if (this._cardList?.getCheckCardIndex().length == 0) {
            spanElement.style.display = 'none';
          } else {
            spanElement.style.display = 'block';
          }
        }
      }
    });
  }

  private _slotChange() {
    Array.from(this.children).forEach($el => {
      if ($el.tagName === 'DEWS-CARDLIST') {
        const cardList = this.querySelector('dews-cardlist') as Cardlist<object>;

        this._cardList = cardList;
        this._cardList.dimming = true;
        this._drawerLayout?.querySelector('.cardlist-wrap')?.append(this._cardList);

        new TouchScroll(this._cardList?.shadowRoot?.querySelector('.cardlist') as HTMLElement);

        this._isCreatedCardlist = true;
      }

      if ($el.tagName === 'CODEPICKER-SEARCH') {
        this._createSearchContainer();
      }
    });
  }

  render() {
    return template.call(this);
  }
}
