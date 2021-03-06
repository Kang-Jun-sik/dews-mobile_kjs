import { eventOptions, html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { DrawerBottomBase } from './drawer-bottom-base.js';
import { DateUtill } from '../base/DateUtill.js';

export class PickerBase extends DrawerBottomBase {
  @property({ type: String })
  title = '';

  @property({ type: String })
  value: string | undefined;

  @internalProperty()
  inputValue: string | undefined;

  @property({ type: String })
  min: string | undefined = '19000101';

  @property({ type: String })
  max: string | undefined = '21000101';

  @property({ type: Boolean })
  spinner = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  dimming = false;

  @property({ type: Boolean, attribute: 'holidays-visible' })
  visible = false;

  @property({ type: Boolean, attribute: 'holidays-disabled' })
  hdDisabled = false;

  @internalProperty()
  protected _beforeView: TemplateResult | undefined;

  @internalProperty()
  protected _modeView: string | undefined;

  @internalProperty()
  protected _mode: 'day' | 'month' | 'year' | 'week' = 'day';
  @internalProperty()
  protected _nowView: TemplateResult | undefined;

  @internalProperty()
  protected _afterView: TemplateResult | undefined;

  private _touchStartPosition = -33.33333;
  private moveCheck = false;
  protected _removeCheck: boolean | undefined = false;
  protected _moveCheck: boolean | undefined = false;
  protected _count: number | undefined = 1;
  protected speed: number | undefined = 20;
  protected _touchMoveX: number | undefined = 0;
  protected _touchMoveY: number | undefined = 0;
  protected _touchStartPoint: number | undefined;
  protected _touchStartSpinnerPoint: number | undefined;
  protected _spinnerIndex: number | undefined;
  protected toYear = new Date().getFullYear();
  protected toMonth = new Date().getMonth();
  protected toDay = new Date().getDate();
  protected _viewYear: number | undefined;
  protected _viewMonth: number | undefined;
  protected _viewDay: number | undefined;
  protected _setYear: number | undefined;
  protected _setMonth: number | undefined;
  protected _setDay: number | undefined;

  click() {
    this._open();
  }

  //  ???????????? HTML ????????? ??????
  protected _afterViewSet(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! + 1 > 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 12);
        this._nowView = this._dayPickerView(this._viewYear! + 1, 1);
        this._afterView = this._dayPickerView(this._viewYear! + 1, 2);
        this._viewYear!++;
        this._viewMonth = 1;
      } else if (this._viewMonth! + 1 == 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 11);
        this._nowView = this._dayPickerView(this._viewYear, 12);
        this._afterView = this._dayPickerView(this._viewYear! + 1, 1);
        this._viewMonth!++;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! + 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth! + 2);
        this._viewMonth!++;
      }
    } else if (this._mode === 'month') {
      this._viewYear!++;
      this._beforeView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear!);
      this._afterView = this._monthPickerView(this._viewYear! + 1);
    } else if (this._mode === 'week') {
      this._viewYear!++;
      this._setYear = this._viewYear;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear);
      this._nowView = this._yearPickerView(this._viewYear! + 10);
      this._afterView = this._yearPickerView(this._viewYear! + 20);
      this._viewYear = this._viewYear! + 10;
    }
  }

  // view template ??????
  private _beforeViewSet(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! - 1 < 1) {
        this._beforeView = this._dayPickerView(this._viewYear! - 1, 11);
        this._nowView = this._dayPickerView(this._viewYear! - 1, 12);
        this._afterView = this._dayPickerView(this._viewYear, 1);
        this._viewYear!--;
        this._viewMonth = 12;
      } else if (this._viewMonth! - 1 == 1) {
        this._beforeView = this._dayPickerView(this._viewYear! - 1, 12);
        this._nowView = this._dayPickerView(this._viewYear, 1);
        this._afterView = this._dayPickerView(this._viewYear, 2);
        this._viewMonth!--;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth! - 2);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! - 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._viewMonth!--;
      }
      this._selectRemove();
    } else if (this._mode === 'month') {
      this._viewYear!--;
      this._beforeView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear!);
      this._afterView = this._monthPickerView(this._viewYear! + 1);
    } else if (this._mode === 'week') {
      this._viewYear!--;
      this._setYear = this._viewYear;
      //
    } else {
      this._beforeView = this._yearPickerView(this._viewYear! - 20);
      this._nowView = this._yearPickerView(this._viewYear! - 10);
      this._afterView = this._yearPickerView(this._viewYear);
      this._viewYear = this._viewYear! - 10;
    }
  }

  protected _modeViewChange() {
    //  ???????????????
  }

  /*
   * ???????????? UI ?????? ??? animation ??????
   * */
  /*
   * ???????????? UI ?????? ??? animation ??????
   * */

  private animationCheck = false;

  private _beforeAnimation(): void {
    const $el = this.shadowRoot!.querySelector('.calendar-flip-wrap') as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (this._count! <= Math.abs(this._touchMoveX!)) {
      window.requestAnimationFrame(this._beforeAnimation.bind(this));
    } else {
      this.animationCheck = false;
      this._count = 0;
      $el.style.transform = `translate3d(-${this.width}px, 0px, 0px)`;
      this._beforeViewSet();
      this._modeViewChange();
    }
    this._count = this._count! + this.speed!;
  }

  // ???????????? ?????? ?????????

  /*
   * ???????????? UI ?????? ??? animation ??????
   * */
  private _afterAnimation() {
    const $el = this.shadowRoot!.querySelector('.calendar-flip-wrap') as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (Math.abs(this._count! + this._touchMoveX!) <= ($el.clientWidth / 3) * 2) {
      window.requestAnimationFrame(this._afterAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(-${this.width}px, 0px, 0px)`;
      this._afterViewSet();
      this._modeViewChange();
    }
    this._count = this._count! - this.speed!;
  }

  //  ?????? ????????? ?????? ex) ???????????? ????????? ?????? ??????
  @eventOptions({ passive: true })
  private _touchMoveHandler(e: TouchEvent): void {
    e.preventDefault();
    this._moveCheck = true;
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;
    if (!this.spinner) {
      const move = -this.width! + (e.changedTouches[0].pageX - this._touchStartPoint!);
      this.moveCheck = true;
      $el.style.transform = `translate3d(${move}px, 0px, 0px)`;
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

  @eventOptions({ passive: true })
  private _touchStartHandler(e: TouchEvent): void {
    if (!this.spinner) {
      this._touchStartPoint = e.changedTouches[0].pageX;
      // this._touchStartPosition = Number((e.currentTarget as HTMLElement).clientWidth / 3);
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
  @eventOptions({ passive: true })
  private _touchEndHandler(e: TouchEvent) {
    if (!this.spinner) {
      const $el = e.currentTarget as HTMLElement;
      if (this.moveCheck) {
        if (Math.abs(this._touchStartPoint! - e.changedTouches[0].pageX) > 100) {
          if (this._touchStartPoint! > e.changedTouches[0].pageX) {
            this._afterAnimation();
            this.animationCheck = true;
          } else {
            this.animationCheck = true;
            this._beforeAnimation();
          }
          this.moveCheck = false;
        } else {
          ($el.querySelector(
            '.calendar-flip-wrap'
          ) as HTMLDivElement).style.transform = `translate3d(-${33.333}%,0px,0px)`;
        }
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
          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerYearPositionChange();
        } else if ((e.currentTarget as HTMLElement)!.classList.contains('month')) {
          this._setMonth = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerMonthPositionChange();
        } else {
          this._setDay = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerDayPositionChange();
        }
        this._inputChange();
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
        this._moveCheck = false;
      } else {
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
      }
      //  change ????????? ???????????? ?????????
    }
    this._removeCheck = false;
  }

  // eslint-disable-next-line
  protected _inputChange() {
    //  ??????????????? ?????????
  }

  // eslint-disable-next-line
  protected _spinnerPickerViewChange(y?: number, m?: number) {
    //  ??????????????? ?????????
  }

  protected _spinnerRemove(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    $drawer.querySelectorAll('.select')!.forEach($el => {
      $el.classList.remove('select');
    });
  }

  protected _spinnerYearSelect(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($drawer.querySelector('.moving-list.year')?.children[
      this._setYear! - Number(this.min?.slice(0, 4))
    ] as HTMLElement).classList.add('select');
  }

  protected _spinnerMonthSelect(num?: number): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    const $monthList = $drawer.querySelector('.moving-list.month') as HTMLElement;
    let select: number = this._setMonth! - 1;
    if (num !== undefined) {
      select = num;
    }
    if ($monthList.children.length !== 12) {
      for (let i = 0; i < $monthList.children.length; i++) {
        if (Number(($monthList.children.item(i) as HTMLElement).dataset.value) === this._setMonth) {
          ($drawer.querySelector('.moving-list.month')!.children[i] as HTMLElement).classList.add('select');
        }
      }
    } else {
      ($drawer.querySelector('.moving-list.month')!.children[select] as HTMLElement).classList.add('select');
    }
  }

  protected _spinnerDaySelect(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    const $dayList = $drawer.querySelector('.moving-list.day') as HTMLElement;

    if ($dayList.children.length !== 12) {
      for (let i = 0; i < $dayList.children.length; i++) {
        if (Number(($dayList.children.item(i) as HTMLElement).dataset.value) === this._setDay) {
          ($drawer.querySelector('.moving-list.day')!.children[i] as HTMLElement).classList.add('select');
          this._spinnerDayPositionChange(i);
        }
      }
    } else {
      ($drawer.querySelector('.moving-list.day')!.children[this._setDay! - 1] as HTMLElement).classList.add('select');
      this._spinnerDayPositionChange();
    }
  }

  protected _spinnerYearPositionChange(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($el.querySelector('.year')!.children[0] as HTMLElement).style.transform = `translateY(-${
      (this._setYear! - Number(this.min?.slice(0, 4))) * 35
    }px)`;
    // $el
    // .querySelector('.moving-list.year')
    // ?.children[this._setYear! - Number(this.min?.slice(0, 4))].classList.add('select');
  }

  protected _spinnerDayPositionChange(num?: number): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    let select = this._setDay! - 1;
    if (num !== undefined) {
      select = num;
    }
    ($el.querySelector('.day')?.children[0] as HTMLElement).style.transform = `translateY(-${select * 35}px)`;
  }

  protected _spinnerMonthPositionChange(num?: number): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    let select = this._setMonth! - 1;
    if (num !== undefined) {
      select = num;
    }
    ($el.querySelector('.month')!.children[0] as HTMLElement).style.transform = `translateY(-${select * 35}px)`;
  }

  protected _monthSpinnerPickerView(y?: number, m?: number): TemplateResult {
    let year: number = this.toYear;
    let month: number = this.toMonth;
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    const $spinnerMonth = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    for (let j = 1; j <= 12; j++) {
      // ??? ??????
      if (yearMin !== year || (yearMin === year && j >= Number(this.min?.slice(4, 6)))) {
        if (yearMax !== year || (yearMax === year && j <= Number(this.max?.slice(4, 6)))) {
          if (j === this.toMonth + 1) {
            $spinnerMonth.push(
              html`
                <li class="today" data-value="${j}" data-index="${j}">
                  <button>${j}</button>
                </li>
              `
            );
          } else {
            $spinnerMonth.push(html`
              <li data-value="${j}" data-index="${j}">
                <button>${j}</button>
              </li>
            `);
          }
        }
      }
    }
    return html`${$spinnerMonth}`;
  }

  protected _yearSpinnerPickerView(): TemplateResult {
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    const $spinnerYear: Array<TemplateResult> = [];
    for (let i = 0; yearMin + i <= yearMax; i++) {
      // ?????? ??????
      if (yearMin + i === this.toYear) {
        $spinnerYear.push(
          html` <li class="today" data-value="${yearMin + i}" data-index="${i}">
            <button>${yearMin + i}</button>
          </li>`
        );
      } else {
        $spinnerYear.push(html` <li data-value="${yearMin + i}" data-index="${i}">
          <button>${yearMin + i}</button>
        </li>`);
      }
    }
    return html`${$spinnerYear}`;
  }

  // ????????? UI ??????
  protected _daySpinnerPickerView(y?: number, m?: number): TemplateResult {
    let year: number = this.toYear;
    let month: number = this.toMonth + 1;
    const date = new DateUtill();
    const $spinnerDay: Array<TemplateResult> = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));

    const lastDate: number = date.getLastDay(year, month);

    for (let k = 1; k <= lastDate; k++) {
      // ??? ??????
      if (
        yearMin !== year ||
        (yearMin === year && month + 1 >= Number(this.min?.slice(4, 6)) && k >= Number(this.min?.slice(6, 8)))
      ) {
        if (
          yearMax !== year ||
          (yearMax === year && month + 1 <= Number(this.max?.slice(4, 6)) && k <= Number(this.max?.slice(6, 8)))
        ) {
          if (k === this.toDay) {
            $spinnerDay.push(html` <li class="today" data-value="${k}" data-index="${k}">
              <button>${k}</button>
            </li>`);
          } else {
            $spinnerDay.push(html` <li data-value="${k}" data-index="${k}">
              <button>${k}</button>
            </li>`);
          }
        }
      }
    }
    return html`${$spinnerDay}`;
  }

  /**
   *  day UI ?????? ?????? ?????? Lit-element ??? TemplateResult ????????? ?????? ?????? ??????.
   * @param y ??????
   * @param m ???
   * */
  protected _dayPickerView(y?: number, m?: number): TemplateResult {
    const returnValue: Array<TemplateResult> = [];
    let todayYear = this.toYear;
    let todayMonth = this.toMonth;
    returnValue.push(html` <span class="day-name">???</span>
      <span class="day-name">???</span>
      <span class="day-name">???</span>
      <span class="day-name">???</span>
      <span class="day-name">???</span>
      <span class="day-name">???</span>
      <span class="day-name">???</span>`);
    if (y !== undefined && m !== undefined) {
      todayYear = y;
      todayMonth = m;
    }

    const date = new DateUtill();
    const lastDate = date.getLastDay(todayYear, todayMonth);
    const firstDate = date.getDay(todayYear, todayMonth);
    const max = date.getTime(
      Number(this.max?.slice(0, 4)),
      Number(this.max?.slice(4, 6)),
      Number(this.max?.slice(6, 8))
    );
    const min = date.getTime(
      Number(this.min?.slice(0, 4)),
      Number(this.min?.slice(4, 6)),
      Number(this.min?.slice(6, 8))
    );
    let count = 0;

    for (let i = 0; i < 6; i++) {
      for (let j = 1; j < 8; j++) {
        if ((i === 0 && j <= firstDate) || lastDate <= count) {
          // ????????? ?????? ??????
          returnValue.push(html` <div class="day day-disabled">
            <span></span>
          </div>`);
        } else {
          count++;
          if (j === 1 || j === 7) {
            // ??????
            if (max < date.getTime(todayYear, todayMonth, count) || min > date.getTime(todayYear, todayMonth, count)) {
              returnValue.push(html` <div data-value="${count}" class="day weekend day-disabled">
                <span>${count}</span>
              </div>`);
            } else {
              returnValue.push(
                html` <div data-value="${count}" @click="${this._dayClickHandler}" class="day weekend will-touch">
                  <span>${count}</span>
                </div>`
              );
            }
          } else if (
            max < date.getTime(todayYear, todayMonth, count) ||
            min > date.getTime(todayYear, todayMonth, count)
          ) {
            // ????????? ????????? ??????
            returnValue.push(html` <div data-value="${count}" class="day day-disabled">
              <span>${count}</span>
            </div>`);
          } else {
            // ??????
            returnValue.push(html` <div data-value="${count}" @click="${this._dayClickHandler}" class="day will-touch">
              <span>${count}</span>
            </div>`);
          }
        }
      }
    }

    return html` <div class="calendar-date">${returnValue}</div>`;
  }

  /**
   *  ??? ?????? ?????????
   * @param e ??????????????????
   * */
  protected _dayClickHandler = (e: MouseEvent): void => {
    // ??? ??????????????? ??????????????? ??? ??????
  };

  /**
   *  month UI ?????? ?????? ?????? Lit-element ??? TemplateResult ????????? ?????? ?????? ??????.
   *  @param y ??????
   * */
  protected _monthPickerView(y?: number): TemplateResult {
    const _mountView: Array<TemplateResult> = [];
    const date = new DateUtill();
    const max = date.getTime(Number(this.max?.slice(0, 4)), Number(this.max?.slice(4, 6)), 1);
    const min = date.getTime(Number(this.min?.slice(0, 4)), Number(this.min?.slice(4, 6)), 1);
    for (let i = 1; i <= 12; i++) {
      if (date.getTime(this._viewYear!, i, 1) > max || date.getTime(this._viewYear!, i, 1) < min) {
        _mountView.push(
          html` <div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
        );
      } else {
        _mountView.push(
          html` <div class="month will-touch" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
        );
      }
    }
    return html` <div class="calendar-month">${_mountView}</div>`;
  }

  /**
   * ??? ?????? ?????????
   * @param e ??????????????????
   * */
  protected _monthClickHandler = (e: MouseEvent): void => {
    // ??? ??????????????? ??????????????? ??? ??????
  };

  /**
   *  year UI ?????? ?????? ?????? Lit-element ??? TemplateResult ????????? ?????? ?????? ??????.
   *  @param y ??????
   * */
  protected _yearPickerView(y?: number): TemplateResult {
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
          html` <div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
            <span>${todayYearStart + i}</span>
          </div>`
        );
      } else {
        if (todayYearStart + i === this._setYear) {
          _yearView.push(
            html` <div class="year select" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else if (
          todayYearStart + i > Number(this.max?.slice(0, 4)) ||
          todayYearStart + i < Number(this.min?.slice(0, 4))
        ) {
          _yearView.push(
            html` <div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else {
          _yearView.push(
            html` <div class="year will-touch" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        }
      }
    }
    return html` <div class="calendar-year">${_yearView}</div>`;
  }

  /**
   *  ?????? ?????? ?????????
   * @param e ??????????????????
   * */
  protected _yearClickHandler(e: MouseEvent): void {
    // ?????? ??????????????? ??????????????? ??? ??????
  }

  private width: number | undefined;

  protected _beforeClickHandler() {
    this._selectRemove();
    this._beforeAnimation();
  }
  protected _afterClickHandler() {
    this._selectRemove();
    this._afterAnimation();
  }

  protected _selectRemove() {
    const $el = this.shadowRoot?.querySelector('.calendar-content')?.firstElementChild?.children.item(1) as HTMLElement;
    $el.querySelectorAll('.select')?.forEach($select => {
      $select.classList.remove('select');
    });
    $el.querySelectorAll('.select-period')?.forEach($select => {
      $select.classList.remove('select-period');
    });
    $el.querySelector('.select-start')?.classList.remove('select-start');
    $el.querySelector('.select-end')?.classList.remove('select-end');
    $el.querySelector('.today')?.classList.remove('today');
  }
  protected _selectChange() {
    this._selectRemove();
    const date = new DateUtill();
    const viewYearTime = date.getTime(this._viewYear!, 1, 1);
    const checkYearTime = date.getTime(this._setYear!, 1, 1);
    const viewMonthTime = date.getTime(this._viewYear!, this._viewMonth!, 1);
    const checkMonthTime = date.getTime(this._setYear!, this._setMonth!, 1);
    const nowTime = date.getTime(this.toYear, this.toMonth + 1, this.toDay);
    const $el = this.shadowRoot!.querySelector('.calendar-flip-wrap')?.children[1] as HTMLElement;
    switch (this._mode) {
      case 'day':
        $el.querySelectorAll('.day').forEach($el => {
          if (nowTime === date.getTime(this._viewYear!, this._viewMonth!, Number(($el as HTMLElement).dataset.value))) {
            $el.classList.add('today');
          }
          if (Number(($el as HTMLElement).dataset.value) === this._setDay && viewMonthTime === checkMonthTime) {
            $el.classList.add('select');
          }
        });
        break;
      case 'month':
        $el.querySelectorAll('.month').forEach($el => {
          if (Number(($el as HTMLElement).dataset.value) === this._setMonth && viewYearTime === checkYearTime) {
            $el.classList.add('select');
          }
        });
        break;
      case 'year':
        $el.querySelectorAll('.year').forEach($el => {
          if (Number(($el as HTMLElement).dataset.value) === this._setYear) {
            $el.classList.add('select');
          }
        });
        break;
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.updateComplete.then(() => {
      if (!this.spinner) {
        const $el = this.shadowRoot!.querySelector('.calendar-flip-wrap') as HTMLElement;
        this.width = $el?.clientWidth / 3;
      }
    });
  }

  /*
  * ????????? html ?????? ?????? ??????.!
  *
 <div  id="drawer" @click="${this._clickHandler}">

</div>


<drawer-layout class="drawer-layout" @close="${this._close}" ?active="${this.active}">
</drawer-layout>
  * */
}
