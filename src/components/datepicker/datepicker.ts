import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './datepicker.html';
import scss from './datepicker.scss';

export class Datepicker extends DewsFormComponent {
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
  _value: string | undefined = '';

  @property({ type: String })
  min: string | undefined;

  @property({ type: String })
  max: string | undefined;

  @internalProperty()
  private active: boolean | undefined = false;

  @internalProperty()
  private _backView: TemplateResult | undefined;

  @internalProperty()
  private _nowView: TemplateResult | undefined;

  @internalProperty()
  private _nextView: TemplateResult | undefined;

  @internalProperty()
  private _modeView: string | undefined;

  @internalProperty()
  private _mode: 'day' | 'month' | 'year' = 'day';

  private count: number | undefined = 0;

  private _viewYear: number | undefined;
  private _viewMonth: number | undefined;

  private _setYear: number | undefined;
  private _setMonth: number | undefined;
  private _setDay: number | undefined;
  private _count: number | undefined = 1;
  private speed: number | undefined = 20;
  private _touchStartPoint: number | undefined;
  private _touchMoveX: number | undefined = 0;
  private _nextItem: number | undefined;
  private $nextBtn: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
    const today = new Date();
    this._backView = this._dayPickerView(today.getFullYear(), today.getMonth());
    this._nowView = this._dayPickerView();
    this._nextView = this._dayPickerView(today.getFullYear(), today.getMonth() + 2);
    this._viewYear = new Date().getFullYear();
    this._viewMonth = new Date().getMonth() + 1;
    this._modeView = `${this._viewYear}-${this._viewMonth > 10 ? this._viewMonth : '0' + this._viewMonth}`;
  }

  /*
   *  day UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * */
  private _dayPickerView(y?: number, m?: number): TemplateResult {
    const today: Date = new Date();
    const _dateView: Array<TemplateResult> = [];
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    _dateView.push(html` <span class="day-name">일</span>
      <span class="day-name">월</span>
      <span class="day-name">화</span>
      <span class="day-name">수</span>
      <span class="day-name">목</span>
      <span class="day-name">금</span>
      <span class="day-name">토</span>`);
    if (y !== undefined && m !== undefined) {
      todayYear = y;
      todayMonth = m - 1;
    }
    const theDate: Date = new Date(todayYear, todayMonth, 1);
    const firstDay = theDate.getDay();
    const last: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      last[1] = 29;
    }
    const lastDate = last[todayMonth];
    let count = 1;
    const length = Math.ceil((firstDay + lastDate) / 7) + 1;
    for (let i = 1; i < length; i++) {
      for (let j = 1; j <= 7; j++) {
        if ((i == 1 && j <= firstDay) || count > lastDate) {
          _dateView.push(
            html`<div class="day day-disabled">
              <span></span>
            </div>`
          );
        } else {
          if (j === 1 || j === 7) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day weekend select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            } else {
              _dateView.push(
                html`<div class="day weekend" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            }
          } else if (
            count === today.getDate() &&
            today.getMonth() === todayMonth &&
            today.getFullYear() === todayYear
          ) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day today select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            } else {
              _dateView.push(
                html`<div class="day today" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            }
          } else {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            } else {
              _dateView.push(
                html`<div class="day" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            }
          }
          count++;
        }
      }
    }
    return html`<div class="calendar-date">${_dateView}</div>`;
  }

  /*
   *  month UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * */
  private _monthPickerView(y?: number): TemplateResult {
    const today: Date = new Date();
    const _mountView: Array<TemplateResult> = [];
    let todayYear: number = today.getFullYear();
    if (y !== undefined) {
      todayYear = y;
    }
    for (let i = 1; i <= 12; i++) {
      if (todayYear === this._setYear && i === this._setMonth) {
        _mountView.push(
          html`<div class="month select" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      } else {
        _mountView.push(
          html`<div class="month" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      }
    }
    return html`<div class="calendar-month">${_mountView}</div>`;
  }

  /*
   *  year UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * */
  private _yearPickerView(y?: number): TemplateResult {
    let today: number = new Date().getFullYear();
    const _yearView: Array<TemplateResult> = [];
    if (y !== undefined) {
      today = y;
    }
    const todayYearStart = (today / 10) * 10 - 1 - (today % 10);
    const todayYearEnd = (today / 10) * 10 + 10 - (today % 10);
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

  private _dateSpinorView() {
    const today: Date = new Date();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();

    const yearMin = this.min !== undefined ? this.min!.slice(0, 4) : today.getFullYear() - 100;
    const yearMax = this.max !== undefined ? this.min!.slice(0, 4) : today.getFullYear() + 100;

    const last: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let lastDate: number;
    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      lastDate = last[1] = 29;
    }

    lastDate = last[todayMonth];

    for (let i = 0; Number(yearMin) + i <= Number(yearMax); i++) {
      //  year view 생성
      if (today.getFullYear() === Number(yearMin) + i) {
        console.log(Number(yearMin) + i, 'active');
      } else {
        // console.log(Number(yearMin)+i);
      }
    }

    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (todayMonth + 1 === j) {
        console.log(j, 'active');
      } else {
        // console.log(j)
      }
    }

    for (let k = 1; k <= lastDate; k++) {
      if (k === today.getDate()) {
        console.log(k, 'active');
      } else {
        //  console.log(k)
      }
    }
  }

  private _inputChangeHandler(e: InputEvent) {
    // const year: number | undefined = Number((e.target as HTMLInputElement).value.split('-')[0]) as number;
    // const month: number | undefined = Number((e.target as HTMLInputElement).value.split('-')[1]) as number;
    // const day: number | undefined = Number((e.target as HTMLInputElement).value.split('-')[2]) as number;
    // console.log(year, month, day);
    let value = (e.target as HTMLInputElement).value;
    value = value.split('-').join();
    let year: string | undefined;
    let month: string | undefined;
    if (value.length >= 4) {
      year = value.slice(0, 4);
    }
    if (value.length >= 6) {
      month = value.slice(4, 6);
    }
  }

  //  각 n월 클릭 핸들러
  private _monthClickHandler(e: MouseEvent): void {
    const $el = e.currentTarget as HTMLElement;
    this.shadowRoot!.querySelectorAll('.calendar-month').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    $el.classList.toggle('select');
    this._viewMonth = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('day');
  }

  private _beforeInputHandler(e: InputEvent) {
    console.log(/\d/.exec(e.data!) == null && e.data != null && e.data != '.' && e.data != '-');
  }

  private _inputClickHandler() {
    console.log('click');
    const $mask: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.mask') as HTMLElement;
    const $view: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.view') as HTMLElement;
    $mask.style.display = 'block';
    $view.style.display = 'none';
    ($mask.firstElementChild as HTMLInputElement).focus();
  }

  private _inputBlurHandler() {
    const $mask: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.mask') as HTMLElement;
    const $view: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.view') as HTMLElement;
    $mask.style.display = 'none';
    $view.style.display = 'block';
  }

  private _inputChange() {
    this._value = `${this._setYear}-${this._setMonth! >= 10 ? this._setMonth : '0' + this._setMonth}-${
      this._setDay! < 10 ? '0' + this._setDay : this._setDay
    }`;
  }

  //  각 n일 클릭 핸들러
  private _dayClickHandler(e: MouseEvent): void {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._setDay = Number((e.currentTarget as HTMLElement).dataset.value);
    this._inputChange();
  }

  private _yearClickHandler(e: Event): void {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('month');
  }

  private _inputBlur(e: FocusEvent) {
    console.log(e);
  }

  private _confirmClickHandler(): void {
    this.value = this._value;
  }

  //  선택한 대상 select 클래스를 제거
  private _selectRemove(): void {
    this.shadowRoot!.querySelectorAll('.calendar-date')!.forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    this.shadowRoot!.querySelectorAll('.calendar-month')!.forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
  }

  /*
   * 다음버튼 UI 처리 및 animation 처리
   * */
  private _afterAnimation(): void {
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
      $el.style.transform = `translate3d(${-(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._afterViewSet();
      this._modeViewChange();
    }
    this._count = this._count! - this.speed!;
  }

  // 모드변경 버튼 클릭 핸들러
  private _modeClickHandler(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      this._backView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._nextView = this._monthPickerView(this._viewYear! + 1);
    } else if (this._mode === 'month') {
      this._backView = this._yearPickerView(this._viewYear! - 10);
      this._nowView = this._yearPickerView(this._viewYear);
      this._nextView = this._yearPickerView(this._viewYear! + 10);
    }
    this._modeChange();
  }

  // day, month, year 의 설정을 변경
  private _modeChange(mode?: 'day' | 'month' | 'year'): void {
    if (mode != undefined) {
      this._mode = mode;
    } else {
      if (this._mode === 'day') {
        this._mode = 'month';
      } else if (this._mode === 'month') {
        this._mode = 'year';
      }
    }
    this._modeViewChange();
  }

  //  상단에 < 2020-11 > < 2020 > 모드에 따라 변경 처리
  private _modeViewChange(): void {
    if (this._mode === 'day') {
      this._modeView = `${this._viewYear}-${this._viewMonth! >= 10 ? this._viewMonth : '0' + this._viewMonth}`;
    } else if (this._mode === 'month') {
      this._modeView = `${this._viewYear}`;
    } else {
      this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
        (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
      }`;
    }
  }

  //  다음버튼 HTML 템플릿 설정
  private _afterViewSet() {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! + 1 > 12) {
        this._backView = this._dayPickerView(this._viewYear, 12);
        this._nowView = this._dayPickerView(this._viewYear! + 1, 1);
        this._nextView = this._dayPickerView(this._viewYear! + 1, 2);
        this._viewYear!++;
        this._viewMonth = 1;
      } else if (this._viewMonth! + 1 == 12) {
        this._backView = this._dayPickerView(this._viewYear, 11);
        this._nowView = this._dayPickerView(this._viewYear, 12);
        this._nextView = this._dayPickerView(this._viewYear! + 1, 1);
        this._viewMonth!++;
      } else {
        this._backView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! + 1);
        this._nextView = this._dayPickerView(this._viewYear, this._viewMonth! + 2);
        this._viewMonth!++;
      }
    } else if (this._mode === 'month') {
      this._backView = this._monthPickerView(this._viewYear);
      this._nowView = this._monthPickerView(this._viewYear! + 1);
      this._nextView = this._monthPickerView(this._viewYear! + 2);
      this._viewYear!++;
    } else {
      this._backView = this._yearPickerView(this._viewYear);
      this._nowView = this._yearPickerView(this._viewYear! + 10);
      this._nextView = this._yearPickerView(this._viewYear! + 20);
      this._viewYear = this._viewYear! + 10;
    }
  }

  //  셋버튼 HTML 템플릿 설정
  private _modeViewSet() {
    if (this._mode === 'month') {
      if (this._viewMonth! + 1 <= 1) {
        this._backView = this._dayPickerView(this._viewYear, 12);
      } else {
        this._backView = this._dayPickerView(this._viewYear, this._viewMonth! - 1);
      }
      this._nowView = this._dayPickerView(this._viewYear, this._viewMonth);
      if (this._viewMonth! + 1 > 12) {
        this._nextView = this._dayPickerView(this._viewYear! + 1, 1);
      } else {
        this._nextView = this._dayPickerView(this._viewYear, this._viewMonth! + 1);
      }
    } else if (this._mode === 'year') {
      this._backView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._nextView = this._monthPickerView(this._viewYear! + 1);
    }
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
      $el.style.transform = `translate3d(${-(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._beforeViewSet();
      this._modeViewChange();
    }
    this._count = this._count! + this.speed!;
  }

  private _beforeViewSet(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! - 1 < 1) {
        this._backView = this._dayPickerView(this._viewYear! - 1, 11);
        this._nowView = this._dayPickerView(this._viewYear! - 1, 12);
        this._nextView = this._dayPickerView(this._viewYear, 1);
        this._viewYear!--;
        this._viewMonth = 12;
      } else if (this._viewMonth! - 1 == 1) {
        this._backView = this._dayPickerView(this._viewYear! - 1, 12);
        this._nowView = this._dayPickerView(this._viewYear, 1);
        this._nextView = this._dayPickerView(this._viewYear, 2);
        this._viewMonth!--;
      } else {
        this._backView = this._dayPickerView(this._viewYear, this._viewMonth! - 2);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! - 1);
        this._nextView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._viewMonth!--;
      }
      this._selectRemove();
    } else if (this._mode === 'month') {
      this._backView = this._monthPickerView(this._viewYear! - 2);
      this._nowView = this._monthPickerView(this._viewYear! - 1);
      this._nextView = this._monthPickerView(this._viewYear);
      this._viewYear!--;
    } else {
      this._backView = this._yearPickerView(this._viewYear! - 20);
      this._nowView = this._yearPickerView(this._viewYear! - 10);
      this._nextView = this._yearPickerView(this._viewYear);
      this._viewYear = this._viewYear! - 10;
    }
  }

  /*
   *  현재 날짜 이동
   * */
  private _nowClickHandler(): void {
    if (this._viewYear !== this._setYear && this._viewMonth !== this._setMonth) {
      this._selectRemove();
    }
    const today: Date = new Date();
    const todayYear: number = today.getFullYear();
    const todayMonth: number = today.getMonth();
    this._viewYear = todayYear;
    this._viewMonth = todayMonth + 1;

    if (todayMonth < 1) {
      this._backView = this._dayPickerView(todayYear - 1, 12);
    } else {
      this._backView = this._dayPickerView(todayYear, todayMonth);
    }
    this._nowView = this._dayPickerView(todayYear, todayMonth + 1);
    if (todayMonth >= 11) {
      this._nextView = this._dayPickerView(todayYear + 1, 1);
    } else {
      this._nextView = this._dayPickerView(todayYear, todayMonth + 2);
    }
    this._modeChange('day');
  }

  /*
   *  다음 요소 선택 처리
   * */
  private _afterBtnView() {
    const $el = this.parentElement!.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._nextItem = i + 1;
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

  private _removeClickHandler() {
    this._value = '';
    this._setMonth = undefined;
    this._setYear = undefined;
    this._setDay = undefined;
    this._selectRemove();
  }

  //  터치 이벤트 처리 ex) 스와이프 효과를 위해 처리
  private _touchMoveHandler(e: TouchEvent) {
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;

    this._touchMoveX =
      e.changedTouches[0].pageX -
      this._touchStartPoint! -
      this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3;

    $el.style.transform = `translate3d(${this._touchMoveX}px, 0px, 0px)`;
  }

  private _touchStartHandler(e: TouchEvent) {
    this._touchStartPoint = e.changedTouches[0].pageX;
  }

  private _touchEndHandler(e: TouchEvent) {
    // const $el: HTMLElement = (e.currentTarget! as HTMLElement).children[0] as HTMLElement;
    // const scrollX: number =
    //   this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3;
    if (e.changedTouches[0].pageX > this._touchStartPoint! + 5) {
      this._beforeAnimation();
    } else if (e.changedTouches[0].pageX < this._touchStartPoint! - 5) {
      this._afterAnimation();
    }
  }

  //  drower layout 처리 *_*

  private _nextBtnClickHandler(e: TouchEvent | MouseEvent) {
    const $el = this.parentElement?.parentElement?.children[this._nextItem!]?.children[0] as HTMLElement;
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
    document.removeEventListener('click', this.domEvent);
  }

  private _open(): void {
    this.active = true;
    document.addEventListener('click', this.domEvent);
  }

  render() {
    return template.call(this);
  }
}
