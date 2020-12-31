import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './yearpicker.html';
import scss from './yearpicker.scss';

export class Yearpicker extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  disabled: boolean | undefined = false;

  @property({ type: Boolean })
  readonly: boolean | undefined = false;

  @property({ type: Boolean })
  required: boolean | undefined = false;

  @property({ type: String })
  value: string | undefined;

  @internalProperty()
  inputValue: string | undefined;

  @property({ type: String })
  min: string | undefined = `${new Date().getFullYear() - 100}`;

  @property({ type: String })
  max: string | undefined = `${new Date().getFullYear() + 100}`;

  @property({ type: Boolean })
  spinner: boolean | undefined = false;

  @property({ type: Boolean, attribute: 'holidays-visible' })
  visible = false;

  @property({ type: Boolean, attribute: 'holidays-disabled' })
  hdDisabled = false;

  @internalProperty()
  private _value: string | undefined = '____';

  @internalProperty()
  private active: boolean | undefined = false;

  @internalProperty()
  private _beforeView: TemplateResult | undefined;

  @internalProperty()
  private _nowView: TemplateResult | undefined;

  @internalProperty()
  private _afterView: TemplateResult | undefined;

  @internalProperty()
  private _modeView: string | undefined;

  @internalProperty()
  private _mode: 'year' = 'year';

  @internalProperty()
  private $spinnerYear: Array<TemplateResult> = [];

  @internalProperty()
  private $spinnerMonth: Array<TemplateResult> = [];

  private count: number | undefined = 0;
  private _viewYear: number | undefined;
  private _setYear: number | undefined;
  private _count: number | undefined = 1;
  private speed: number | undefined = 20;
  private _touchStartPoint: number | undefined;
  private _touchMoveX: number | undefined = 0;
  private _touchMoveY: number | undefined = 0;
  private _afterItem: number | undefined;
  private $nextBtn: TemplateResult | undefined;
  private _spinnerIndex: number | undefined;
  private _removeCheck: boolean | undefined = false;
  private yearMinCheck: boolean | undefined = false;
  private yearMaxCheck: boolean | undefined = false;
  private _touchStartSpinnerPoint: number | undefined;
  private toYear = new Date().getFullYear();
  private toMonth = new Date().getMonth();
  private changeEvent: Event = new Event('change');

  constructor() {
    super();
    this._afterBtnView();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
    if (this.value !== undefined) {
      this.inputValue = this.value.slice(0, 4);
    }
    const today = new Date();
    if (!this.spinner) {
      if (this.value !== undefined) {
        this._viewYear = Number(this.value.slice(0, 4));
        this._setYear = this._viewYear;
        this._beforeView = this._yearPickerView(this._viewYear - 1);
        this._nowView = this._yearPickerView(this._viewYear);
        this._afterView = this._yearPickerView(this._viewYear + 1);
        this.inputValue = this.value.slice(0, 4);
        this._value = this.inputValue;
      } else {
        this._beforeView = this._yearPickerView(this._viewYear! - 1);
        this._nowView = this._yearPickerView(this._viewYear);
        this._afterView = this._yearPickerView(this._viewYear! + 1);
        this._viewYear = today.getFullYear();
      }
      this._modeViewChange();
    } else {
      if (this.value !== undefined) {
        this._setYear = Number(this.value.slice(0, 4));
        this._spinnerPickerView(this._setYear);
      } else {
        this._setYear = this.toYear;
        this._spinnerPickerView();
      }
    }
  }

  click() {
    this._open();
  }

  reset() {
    this._removeClickHandler();
  }

  /*
   *  year UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * */
  private _yearPickerView(y?: number): TemplateResult {
    let toYear: number = this.toYear;
    const _yearView: Array<TemplateResult> = [];
    if (y !== undefined) {
      toYear = y;
    }
    const todayYearStart = (toYear / 10) * 10 - 1 - (toYear % 10);
    const todayYearEnd = (toYear / 10) * 10 + 10 - (toYear % 10);
    for (let i = 0; todayYearStart + i <= todayYearEnd; i++) {
      if (todayYearStart + i === todayYearStart || todayYearStart + i === todayYearEnd) {
        _yearView.push(
          html`<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
            <span>${todayYearStart + i}</span>
          </div>`
        );
      } else {
        if (todayYearStart + i === this._setYear) {
          _yearView.push(
            html`<div class="year select" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else if (
          todayYearStart + i > Number(this.max?.slice(0, 4)) ||
          todayYearStart + i < Number(this.min?.slice(0, 4))
        ) {
          _yearView.push(
            html`<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else {
          _yearView.push(
            html`<div class="year" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        }
      }
    }
    return html`<div class="calendar-year">${_yearView}</div>`;
  }

  // 스피너 UI 생성
  private _spinnerPickerView(y?: number): void {
    let year: number = this.toYear;
    this.$spinnerYear = [];
    this.$spinnerMonth = [];
    if (y !== undefined) {
      year = y;
    }
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));

    for (let i = 0; yearMin + i <= yearMax; i++) {
      // 년도 생성
      if (yearMin + i === this.toYear) {
        this.$spinnerYear.push(
          html`<li class="today" data-value="${yearMin + i}" data-index="${i}">
            <button>${yearMin + i}</button>
          </li>`
        );
      } else {
        this.$spinnerYear.push(
          html`<li data-value="${yearMin + i}" data-index="${i}"><button>${yearMin + i}</button></li>`
        );
      }
      // }
    }
  }

  // input 클릭시 포커스 위치 조정
  private _inputClickHandler(e: MouseEvent): void {
    (e.target as HTMLInputElement).setSelectionRange(0, 0);
  }

  // 입력한 값이 숫자인지 문자인지 판별후 값 제거
  private _beforeInputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if ((/\d/.exec(e.data!) == null && e.data != null) || ($el.selectionStart! > 3 && e.data != null)) {
      e.returnValue = false;
    }
  }

  // input 입력 처리
  private _inputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if (e.data !== null) {
      let cursor: number = $el.selectionStart as number;
      $el.value = $el.value.slice(0, $el.selectionStart!) + $el.value.slice($el.selectionStart! + 1, 8);
      if (cursor === 4) {
        this.yearMinCheck = false;
        this.yearMaxCheck = false;
        const year: number | undefined = Number($el.value.slice(0, 4));
        const min: number | undefined = Number(this.min!.slice(0, 4));
        const max: number | undefined = Number(this.max!.slice(0, 4));
        if (year < min) {
          $el.value = `${min}` + $el.value.slice(4, 10);
          this.yearMinCheck = true;
        } else if (year > max) {
          $el.value = `${max}` + $el.value.slice(4, 10);
          this.yearMaxCheck = true;
        }
        this._setYear = Number($el.value.slice(0, 4));
        if (this.spinner) {
          this._spinnerRemove();
          this._spinnerPickerView(this._setYear);
          this._spinnerYearSelect();
          this._spinnerYearChange();
        } else {
          this._selectRemove();
          this.shadowRoot!.querySelectorAll('.calendar-year')[1]
            .querySelectorAll('.year')
            .forEach($year => {
              if (Number(($year as HTMLElement).dataset.value) === this._setYear) {
                $year.classList.add('select');
              }
            });
        }
        cursor++;
      }
      $el.setSelectionRange(cursor!, cursor!);
    } else {
      const cursor: number = $el.selectionStart as number;
      $el.value = $el.value.slice(0, cursor) + '_' + $el.value.slice(cursor, 4);
      $el.setSelectionRange(cursor!, cursor!);
    }
  }

  private _inputChange() {
    this._value = `${this._setYear}`;
    (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = this._value;
  }

  // 년도 클릭 핸들러
  private _yearClickHandler(e: Event): void {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._setYear = this._viewYear;
    this._inputChange();
  }

  // 적용버튼 핸들러
  private _confirmClickHandler(): void {
    if (this._value?.indexOf('_')! < 0) {
      this.inputValue = this._value;
      this._close();
    }
  }

  //  select 클래스를 제거
  private _selectRemove(): void {
    this.shadowRoot!.querySelectorAll('.calendar-year')!.forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el?.classList.remove('select');
      });
    });
  }

  /*
   * 다음버튼 UI 처리 및 animation 처리
   * */
  private _afterAnimation() {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
      '.calendar-flip-wrap'
    ) as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (Math.abs(this._count! + this._touchMoveX!) <= ($el.clientWidth / 3) * 2) {
      window.requestAnimationFrame(this._afterAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._afterViewSet();
      this._modeViewChange();
    }
    this._count = this._count! - this.speed!;
  }

  //  상단에 < 2020-11 > < 2020 > 모드에 따라 변경 처리
  private _modeViewChange(): void {
    this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
      (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
    }`;
  }

  //  다음버튼 HTML 템플릿 설정
  private _afterViewSet(): void {
    this._selectRemove();
    this._beforeView = this._yearPickerView(this._viewYear);
    this._nowView = this._yearPickerView(this._viewYear! + 10);
    this._afterView = this._yearPickerView(this._viewYear! + 20);
    this._viewYear = this._viewYear! + 10;
  }

  /*
   * 이전버튼 UI 처리 및 animation 처리
   * */
  private _beforeAnimation(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
      '.calendar-flip-wrap'
    ) as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (this._count! <= Math.abs(this._touchMoveX!)) {
      window.requestAnimationFrame(this._beforeAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._beforeViewSet();
      this._modeViewChange();
    }
    this._count = this._count! + this.speed!;
  }

  // view template 설정
  private _beforeViewSet(): void {
    this._selectRemove();
    this._beforeView = this._yearPickerView(this._viewYear! - 20);
    this._nowView = this._yearPickerView(this._viewYear! - 10);
    this._afterView = this._yearPickerView(this._viewYear);
    this._viewYear = this._viewYear! - 10;
  }

  /*
   *  다음 요소 선택 처리
   * */
  private _afterBtnView(): void {
    const $el = this.parentElement!.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._afterItem = i + 1;
        if ($el.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el.item(i + 1)!.hasAttribute('disabled') ||
            $el.item(i + 1)!.hasAttribute('readonly') ||
            $el.item(i + 1)!.localName === 'dews-button' ||
            $el.item(i + 1)!.localName === 'dews-radiobutton-group' ||
            $el.item(i + 1)!.localName === 'dews-checkbox-group'
          ) {
            this.$nextBtn = html``;
          } else {
            this.$nextBtn = html`<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
          }
        }
      }
    }
  }

  // 리셋버튼 클릭 핸들러
  private _removeClickHandler(): void {
    this._value = '';
    if (!this.spinner) {
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____';
      this._setYear = undefined;
      this._selectRemove();
    } else {
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____';
      (this.shadowRoot!.querySelector('.drawer-layout') as HTMLElement)!.querySelectorAll('.select').forEach($el => {
        $el!.classList.add('clear');
      });
      this._removeCheck = true;
    }
    this.dispatchEvent(this.changeEvent);
  }

  private _moveCheck: boolean | undefined = false;

  //  터치 이벤트 처리 ex) 스와이프 효과를 위해 처리
  private _touchMoveHandler(e: TouchEvent): void {
    this._moveCheck = true;
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;
    if (!this.spinner) {
      this._touchMoveX =
        e.changedTouches[0].pageX -
        this._touchStartPoint! -
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3;
      $el.style.transform = `translate3d(${this._touchMoveX}px, 0px, 0px)`;
    } else {
      const liHeight: number = $el.clientHeight;
      this._touchMoveY = this._touchStartSpinnerPoint! - (e.changedTouches[0].pageY - this._touchStartPoint!) * 1.3;
      if (($el.parentElement!.children.length - 1) * liHeight >= this._touchMoveY) {
        $el.parentElement!.parentElement!.style.transform = `translateY(-${this._touchMoveY}px)`;
      } else {
        this._touchMoveY = ($el.parentElement!.children.length - 1) * liHeight;
      }
    }
  }

  private _touchStartHandler(e: TouchEvent): void {
    if (!this.spinner) {
      this._touchStartPoint = e.changedTouches[0].pageX;
    } else {
      this._touchStartSpinnerPoint = Math.abs(
        Number(
          (e.currentTarget as HTMLElement).children[0]!.parentElement!.parentElement!.style.transform.split(
            '('
          )[1].split('px')[0]
        )
      );
      this._touchStartPoint = e.changedTouches[0].pageY;
      const length: number = (e.currentTarget as HTMLElement)!.children.length;
      for (let i = 0; i < length; i++) {
        if ((e.currentTarget as HTMLElement)!.children.item(i) === (e.target as HTMLElement)!.parentElement) {
          this._spinnerIndex = i;
        }
      }
      (e.currentTarget as HTMLElement)!.querySelectorAll('.select').forEach($el => {
        $el!.classList.remove('select');
      });
    }
  }

  private _touchEndHandler(e: TouchEvent) {
    if (!this.spinner) {
      if (e.changedTouches[0].pageX > this._touchStartPoint! + 5) {
        this._beforeAnimation();
      } else if (e.changedTouches[0].pageX < this._touchStartPoint! - 5) {
        this._afterAnimation();
      }
    } else {
      this._touchMoveY = Math.abs(
        Number((e.currentTarget as HTMLElement).parentElement!.style.transform.split('(')[1].split('px')[0])
      );
      let selectIndex: number = Math.round(this._touchMoveY! / 35);
      if (selectIndex < 0) {
        selectIndex = 0;
      }
      if (this._moveCheck) {
        if ((e.currentTarget as HTMLElement)!.classList.contains('year')) {
          this._setYear = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerPickerView(this._setYear);
        }
        this._inputChange();
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
        this._moveCheck = false;
      } else {
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
      }
      this.dispatchEvent(this.changeEvent);
    }
    this._removeCheck = false;
  }

  // ========= spinner

  private _spinnerRemove(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    $drawer.querySelectorAll('.select')!.forEach($el => {
      $el.classList.remove('select');
    });
  }

  private _spinnerYearSelect(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($drawer.querySelector('.moving-list.year')!.children[
      this._setYear! - Number(this.min?.slice(0, 4))
    ] as HTMLElement).classList.add('select');
  }

  private _spinnerYearChange(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($el.querySelector('.year')!.children[0] as HTMLElement).style.transform = `translateY(-${
      (this._setYear! - Number(this.min?.slice(0, 4))) * 35
    }px)`;
  }

  //  drower layout 처리 *_*
  private _nextBtnClickHandler(e: TouchEvent | MouseEvent): void {
    const $el = this.parentElement?.parentElement?.children[this._afterItem!]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
  }

  private _domClickHandler(e: MouseEvent): void {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.drawer-layout')!.shadowRoot!.querySelector('.layer-bottom')!.clientHeight
      ) {
        if (this.count! > 0) {
          this._close();
        } else {
          this.count!++;
        }
      }
    }
  }

  private _clickHandler(e: MouseEvent): void {
    if (!this.disabled && !this.readonly && this.active === false) {
      this.shadowRoot!.querySelector('.select-wrap')!.classList.add('focus');
      this._open();
      this._scrollChange();
    }
  }

  private _scrollChange(): void {
    window.scrollTo(
      0,
      window.pageYOffset +
        this.parentElement!.getBoundingClientRect()?.top -
        this.shadowRoot!.querySelector('.date-picker-wrap')!.clientHeight -
        25
    );
  }

  private domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  private _close(): void {
    this.shadowRoot!.querySelector('.select-wrap')!.classList.remove('focus');
    this.active = false;
    this.count = 0;
    this.dispatchEvent(new Event('close'));
    document.removeEventListener('click', this.domEvent);
  }

  private _open(): void {
    this.active = true;
    this.dispatchEvent(new Event('open'));
    document.addEventListener('click', this.domEvent);
  }

  // spinner 기본 선택
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    if (this.spinner) {
      this._inputChange();
      this._spinnerYearSelect();
    }
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (this.spinner && !this._removeCheck) {
      (this.shadowRoot!.querySelector('.drawer-layout') as HTMLElement)!.querySelectorAll('.clear').forEach($el => {
        $el!.classList.remove('clear');
      });
    }

    if (this.spinner) {
      (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.year')!
        .children[0] as HTMLElement).style.transform = `translateY(-${
        (this._setYear! - Number(this.min?.slice(0, 4))) * 35
      }px)`;
    }
  }

  render() {
    return template.call(this);
  }
}
