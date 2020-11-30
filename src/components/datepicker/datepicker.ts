import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

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
  inputValue: string | undefined;

  @property({ type: String })
  min: string | undefined = `${new Date().getFullYear() - 100}${('0' + (new Date().getMonth() + 1)).slice(-2)}${(
    '0' + new Date().getDate()
  ).slice(-2)}`;

  @property({ type: String })
  max: string | undefined = `${new Date().getFullYear() + 100}${('0' + (new Date().getMonth() + 1)).slice(-2)}${(
    '0' + new Date().getDate()
  ).slice(-2)}`;

  @property({ type: Boolean })
  spinner: boolean | undefined = false;

  @property({ type: Boolean, attribute: 'holidays-visible' })
  visible = false;

  @property({ type: Boolean, attribute: 'holidays-disabled' })
  hdDisabled = false;

  @internalProperty()
  _value: string | undefined = '____-__-__';

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
  private _mode: 'day' | 'month' | 'year' = 'day';

  @internalProperty()
  private $spinnerYear: Array<TemplateResult> = [];

  @internalProperty()
  private $spinnerMonth: Array<TemplateResult> = [];

  @internalProperty()
  private $spinnerDay: Array<TemplateResult> = [];

  private count: number | undefined = 0;
  private _viewYear: number | undefined;
  private _viewMonth: number | undefined;
  private _viewDay: number | undefined;
  private _setYear: number | undefined;
  private _setMonth: number | undefined;
  private _setDay: number | undefined;
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
  private monthMinCheck: boolean | undefined = false;
  private monthMaxCheck: boolean | undefined = false;
  private _touchStartSpinnerPoint: number | undefined;
  private toYear = new Date().getFullYear();
  private toMonth = new Date().getMonth();
  private toDay = new Date().getDate();
  private lastDay: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
      this.inputValue = this.value.slice(0, 4) + '-' + this.value.slice(4, 6) + '-' + this.value.slice(6, 8);
    }
    const today = new Date();
    if (!this.spinner) {
      if (this.value !== undefined) {
        this._viewYear = Number(this.value.slice(0, 4));
        this._viewMonth = Number(this.value.slice(4, 6));
        this._setYear = this._viewYear;
        this._setMonth = this._viewMonth;
        this._setDay = Number(this.value.slice(6, 8));
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth - 1);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth + 1);
        this.inputValue = this.value.slice(0, 4) + '-' + this.value.slice(4, 6) + '-' + this.value.slice(6, 8);
        this._value = this.inputValue;
      } else {
        this._beforeView = this._dayPickerView(today.getFullYear(), today.getMonth());
        this._nowView = this._dayPickerView();
        this._afterView = this._dayPickerView(today.getFullYear(), today.getMonth() + 2);
        this._viewYear = today.getFullYear();
        this._viewMonth = today.getMonth() + 1;
      }
      this._modeView = `${this._viewYear}-${this._viewMonth! > 10 ? this._viewMonth : '0' + this._viewMonth}`;
    } else {
      if (this.value !== undefined) {
        this._setYear = Number(this.value.slice(0, 4));
        this._setMonth = Number(this.value.slice(4, 6));
        this._setDay = Number(this.value.slice(6, 8));
        this._spinnerPickerView(this._setYear, this._setMonth);
      } else {
        this._setYear = this.toYear;
        this._setMonth = this.toMonth + 1;
        this._setDay = this.toDay;
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
   *  day UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * */

  private _dayPickerView(y?: number, m?: number): TemplateResult {
    const _dateView: Array<TemplateResult> = [];
    let todayYear = this.toYear;
    let todayMonth = this.toMonth;
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
    let yearDisabled = false;
    let monthDisabled = false;
    let dayMaxCheck = false;
    let dayMinCheck = false;
    if (todayYear >= Number(this.max?.slice(0, 4))) {
      if (todayYear > Number(this.max?.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 >= Number(this.max?.slice(4, 6))) {
        if (todayMonth + 1 > Number(this.max?.slice(4, 6))) {
          monthDisabled = true;
        } else {
          dayMaxCheck = true;
        }
      }
    } else if (todayYear <= Number(this.min?.slice(0, 4))) {
      if (todayYear < Number(this.min?.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 <= Number(this.min?.slice(4, 6))) {
        if (todayMonth + 1 < Number(this.min?.slice(4, 6))) {
          monthDisabled = true;
        } else {
          dayMinCheck = true;
        }
      }
    }

    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      this.lastDay[1] = 29;
    } else {
      this.lastDay[1] = 28;
    }
    const lastDate = this.lastDay[todayMonth];
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
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number(this.max?.slice(6, 8))) ||
              (dayMinCheck && count < Number(this.min?.slice(6, 8)))
            ) {
              _dateView.push(
                html`<div class="day day-disabled" data-value="${count}">
                  <span>${count}</span>
                </div>`
              );
            } else if (
              this._setMonth === todayMonth + 1 &&
              this._setYear == todayYear &&
              count === this._setDay &&
              !this.hdDisabled
            ) {
              if (this.visible) {
                _dateView.push(
                  html`<div
                    class="day select"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              } else {
                _dateView.push(
                  html`<div class="day weekend select" data-value="${count}" @click="${this._dayClickHandler}">
                    <span>${count}</span>
                  </div>`
                );
              }
            } else {
              if (this.visible) {
                _dateView.push(
                  html`<div
                    class="day"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              } else {
                _dateView.push(
                  html`<div
                    class="day weekend"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              }
            }
          } else if (count === this.toDay && this.toMonth === todayMonth && this.toYear === todayYear) {
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
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number(this.max?.slice(6, 8))) ||
              (dayMinCheck && count < Number(this.min?.slice(6, 8)))
            ) {
              _dateView.push(
                html`<div class="day day-disabled" data-value="${count}">
                  <span>${count}</span>
                </div>`
              );
            } else if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
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
    const _mountView: Array<TemplateResult> = [];
    let todayYear: number = this.toYear;
    if (y !== undefined) {
      todayYear = y;
    }
    for (let i = 1; i <= 12; i++) {
      if (todayYear === this._setYear && i === this._setMonth) {
        _mountView.push(
          html`<div class="month select" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      } else if (
        todayYear > Number(this.max?.slice(0, 4)) ||
        (todayYear === Number(this.max?.slice(0, 4)) && i > Number(this.max?.slice(4, 6)))
      ) {
        _mountView.push(
          html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
        );
      } else if (
        todayYear < Number(this.min?.slice(0, 4)) ||
        (todayYear === Number(this.min?.slice(0, 4)) && i < Number(this.min?.slice(4, 6)))
      ) {
        _mountView.push(
          html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
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
  private _spinnerPickerView(y?: number, m?: number): void {
    let year: number = this.toYear;
    let month: number = this.toMonth;
    this.$spinnerDay = [];
    this.$spinnerYear = [];
    this.$spinnerMonth = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));

    if (year! % 400 == 0 || (year! % 4 == 0 && year % 100 != 0)) {
      this.lastDay[1] = 29;
    } else {
      this.lastDay[1] = 28;
    }

    const lastDate: number = this.lastDay[month!];

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

    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (yearMin !== year || (yearMin === year && j >= Number(this.min?.slice(4, 6)))) {
        if (yearMax !== year || (yearMax === year && j <= Number(this.max?.slice(4, 6)))) {
          if (j === this.toMonth + 1) {
            this.$spinnerMonth.push(
              html` <li class="today" data-value="${j}" data-index="${j}"><button>${j}</button></li> `
            );
          } else {
            this.$spinnerMonth.push(html` <li data-value="${j}" data-index="${j}"><button>${j}</button></li> `);
          }
        }
      }
    }

    for (let k = 1; k <= lastDate; k++) {
      // 일 생성
      if (
        yearMin !== year ||
        (yearMin === year && month + 1 >= Number(this.min?.slice(4, 6)) && k >= Number(this.min?.slice(6, 8)))
      ) {
        if (
          yearMax !== year ||
          (yearMax === year && month + 1 <= Number(this.max?.slice(4, 6)) && k <= Number(this.max?.slice(6, 8)))
        ) {
          if (k === this.toDay) {
            this.$spinnerDay.push(
              html` <li class="today" data-value="${k}" data-index="${k}"><button>${k}</button></li>`
            );
          } else {
            this.$spinnerDay.push(html` <li data-value="${k}" data-index="${k}"><button>${k}</button></li>`);
          }
        }
      }
    }
  }

  // input 클릭시 포커스 위치 조정
  private _inputClickHandler(e: MouseEvent): void {
    (e.target as HTMLInputElement).setSelectionRange(0, 0);
  }

  //  각 n월 클릭 핸들러
  private _monthClickHandler(e: MouseEvent): void {
    const $el = e.currentTarget as HTMLElement;
    this.shadowRoot!.querySelectorAll('.calendar-month').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    $el.classList.add('select');
    this._viewMonth = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('day');
  }

  // 입력한 값이 숫자인지 문자인지 판별후 값 제거
  private _beforeInputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if ((/\d/.exec(e.data!) == null && e.data != null) || ($el.selectionStart! > 9 && e.data != null)) {
      e.returnValue = false;
    }
  }

  // input 입력 처리
  private _inputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if (e.data !== null) {
      let cursor: number = $el.selectionStart as number;

      $el.value = $el.value.slice(0, $el.selectionStart!) + $el.value.slice($el.selectionStart! + 1, 11);
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
        if (this.spinner) {
          this._setYear = Number($el.value.slice(0, 4));
          this._spinnerRemove();

          this._spinnerPickerView(this._setYear, this._setMonth! - 1);
          this._spinnerYearSelect();
          this._spinnerYearChange();
        }
        cursor++;
      } else if (cursor === 7) {
        this.monthMinCheck = false;
        const month: number | undefined = Number($el.value.slice(5, 7));
        const min: number | undefined = Number(this.min?.slice(4, 6));
        const max: number | undefined = Number(this.max?.slice(4, 6));

        if (month < min && this.yearMinCheck) {
          // min check
          this.monthMinCheck = true;
          $el.value = $el.value.slice(0, 5) + `${min}` + $el.value.slice(7, 10);
        } else if (month > max && this.yearMaxCheck) {
          // maxCheck
          this.monthMaxCheck = true;
          $el.value = $el.value.slice(0, 5) + `${max}` + $el.value.slice(7, 10);
        } else if (month === 0) {
          $el.value = $el.value.slice(0, 5) + '01' + $el.value.slice(7, 10);
        } else if (month > 12) {
          $el.value = $el.value.slice(0, 5) + '12' + $el.value.slice(7, 10);
        }
        if (this.spinner) {
          this._setYear = Number($el.value.slice(0, 4));
          this._setMonth = Number($el.value.slice(5, 7));
          this._spinnerPickerView(this._setYear, this._setMonth - 1);
          this._spinnerRemove();
          this._spinnerYearSelect();
          this._spinnerMonthSelect();
          this._spinnerDayPositionChange(0);
        }
        cursor++;
      } else if (cursor === 10) {
        const year: number | undefined = Number($el.value.slice(0, 4));
        const month: number | undefined = Number($el.value.slice(5, 7));
        const day: number | undefined = Number($el.value.slice(8, 10));
        const min = Number(this.min!.slice(6, 8));
        const max = Number(this.max!.slice(6, 8));

        if (year! % 400 == 0 || (year! % 4 == 0 && year! % 100 != 0)) {
          this.lastDay[1] = 29;
        } else {
          this.lastDay[1] = 28;
        }
        const lastDay: number | undefined = this.lastDay[Number($el.value.slice(5, 7)) - 1];

        if (day > lastDay) {
          // 최대 일 점검
          if (this.monthMaxCheck) {
            $el.value = $el.value.slice(0, 8) + `${max}`;
          } else {
            $el.value = $el.value.slice(0, 8) + `${lastDay}`;
          }
        } else if (day < 1 && !this.monthMinCheck) {
          // 최소 일 점검
          $el.value = $el.value.slice(0, 8) + '01';
        } else if (day < min && this.monthMinCheck) {
          // 개발자가 지정한 최소일 확인
          $el.value = $el.value.slice(0, 8) + `${min}`;
        } else if (day > max && this.monthMaxCheck) {
          // 개발자가 지정한 최대일 확인
          $el.value = $el.value.slice(0, 8) + `${max}`;
        }
        this._mode = 'month';
        this._setDay = Number($el.value.slice(8, 10));
        this._setYear = year;
        this._setMonth = month;

        if (this._setYear === this._viewYear && this._setMonth === this._viewMonth && this._setDay == this._viewDay) {
          return;
        }
        this._viewDay = this._setDay;
        this._viewYear = year;
        this._viewMonth = month;
        if (!this.spinner) {
          this._selectRemove();
          this._modeViewSet();
          this._modeChange('day');
        } else {
          this._spinnerRemove();
          this._spinnerYearSelect();
          this._spinnerMonthSelect();

          this._spinnerDaySelect();
          this._removeCheck = false;
        }
        this._value = `${this._setYear}-${this._setMonth! >= 10 ? this._setMonth : '0' + this._setMonth}-${
          this._setDay! < 10 ? '0' + this._setDay : this._setDay
        }`;
      }
      $el.setSelectionRange(cursor!, cursor!);
    } else {
      const cursor: number = $el.selectionStart as number;
      for (let i = 0; $el.value!.length + i <= 9; i++) {
        if (cursor === 7 || cursor === 4) {
          $el.value = $el.value.slice(0, cursor - 1) + '_' + '-' + $el.value.slice(cursor, 9);
          $el.setSelectionRange(cursor! - 1, cursor! - 1);
        } else {
          $el.value = $el.value.slice(0, cursor) + '_' + $el.value.slice(cursor, 9);
          $el.setSelectionRange(cursor!, cursor!);
        }
      }
    }
  }

  private _inputChange() {
    this._value = `${this._setYear}-${this._setMonth! >= 10 ? this._setMonth : '0' + this._setMonth}-${
      this._setDay! < 10 ? '0' + this._setDay : this._setDay
    }`;
    (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = this._value;
  }

  //  각 n일 클릭 핸들러
  private _dayClickHandler(e: MouseEvent): void {
    // if (!this.hdDisabled && ) {
    //
    // }
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._setDay = Number((e.currentTarget as HTMLElement).dataset.value);
    this._viewDay = this._setDay;
    this._inputChange();
  }

  // 년도 클릭 핸들러
  private _yearClickHandler(e: Event): void {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('month');
  }

  // 적용버튼 핸들러
  private _confirmClickHandler(): void {
    if (this.hdDisabled && !this.spinner) {
      const $day = this.shadowRoot!.querySelector('.drawer-layout')!
        .querySelectorAll('.calendar-date')[1]
        .querySelectorAll('div');
      for (let i = 0; i < $day!.length; i++) {
        if (Number(($day![i] as HTMLElement).dataset.value) === this._setDay) {
          if (i === 0 || i % 7 === 0 || i % 7 === 6) {
            this._removeClickHandler();
            return;
          }
        }
      }
    }
    if (this._value?.indexOf('_')! < 0) {
      this.inputValue = this._value;
      this._close();
    }
  }

  //  select 클래스를 제거
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

  // 모드변경 버튼 클릭 핸들러
  private _modeClickHandler(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      this._beforeView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._afterView = this._monthPickerView(this._viewYear! + 1);
    } else if (this._mode === 'month') {
      this._beforeView = this._yearPickerView(this._viewYear! - 10);
      this._nowView = this._yearPickerView(this._viewYear);
      this._afterView = this._yearPickerView(this._viewYear! + 10);
    }
    this._modeChange();
  }

  // 모드를 변경 day, month, year
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
  private _afterViewSet(): void {
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
      this._beforeView = this._monthPickerView(this._viewYear);
      this._nowView = this._monthPickerView(this._viewYear! + 1);
      this._afterView = this._monthPickerView(this._viewYear! + 2);
      this._viewYear!++;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear);
      this._nowView = this._yearPickerView(this._viewYear! + 10);
      this._afterView = this._yearPickerView(this._viewYear! + 20);
      this._viewYear = this._viewYear! + 10;
    }
  }

  //  셋버튼 HTML 템플릿 설정
  private _modeViewSet(): void {
    if (this._mode === 'month') {
      if (this._viewMonth! + 1 <= 1) {
        this._beforeView = this._dayPickerView(this._viewYear, 12);
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth! - 1);
      }
      this._nowView = this._dayPickerView(this._viewYear, this._viewMonth);
      if (this._viewMonth! + 1 > 12) {
        this._afterView = this._dayPickerView(this._viewYear! + 1, 1);
      } else {
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth! + 1);
      }
    } else if (this._mode === 'year') {
      this._beforeView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._afterView = this._monthPickerView(this._viewYear! + 1);
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
      this._beforeView = this._monthPickerView(this._viewYear! - 2);
      this._nowView = this._monthPickerView(this._viewYear! - 1);
      this._afterView = this._monthPickerView(this._viewYear);
      this._viewYear!--;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear! - 20);
      this._nowView = this._yearPickerView(this._viewYear! - 10);
      this._afterView = this._yearPickerView(this._viewYear);
      this._viewYear = this._viewYear! - 10;
    }
  }

  /*
   *  현재 날짜 이동 버튼
   * */
  private _nowClickHandler(): void {
    if (!this.spinner) {
      const today: Date = new Date();
      const todayYear: number = today.getFullYear();
      const todayMonth: number = today.getMonth();
      const day = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.day.today') as HTMLElement;
      this._viewYear = todayYear;
      this._viewMonth = todayMonth + 1;
      this._setYear = todayYear;
      this._setMonth = todayMonth + 1;
      this._setDay = today.getDate();
      this._selectRemove();
      day.classList.add('select');
      if (todayMonth < 1) {
        this._beforeView = this._dayPickerView(todayYear - 1, 12);
      } else {
        this._beforeView = this._dayPickerView(todayYear, todayMonth);
      }
      this._nowView = this._dayPickerView(todayYear, todayMonth + 1);
      if (todayMonth >= 11) {
        this._afterView = this._dayPickerView(todayYear + 1, 1);
      } else {
        this._afterView = this._dayPickerView(todayYear, todayMonth + 2);
      }
      this._inputChange();
      this._modeChange('day');
    } else {
      const $yearEl: Element = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-year-wrap')!;
      const $monthEl: Element = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-month-wrap')!;
      const $dayEl: Element = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-day-wrap')!;
      const year: number | undefined = Number(($yearEl!.querySelector('.today') as HTMLElement).dataset.index);
      const month: number | undefined = Number(($monthEl!.querySelector('.today') as HTMLElement).dataset.index) - 1;
      const day: number | undefined = Number(($dayEl!.querySelector('.today') as HTMLElement).dataset.index) - 1;

      ($yearEl!.querySelector('.moving-list')!.parentElement as HTMLElement).style.transform = `translateY(-${
        year * 35
      }px)`;
      ($monthEl!.querySelector('.moving-list')!.parentElement as HTMLElement).style.transform = `translateY(-${
        month * 35
      }px)`;
      ($dayEl!.querySelector('.moving-list')!.parentElement as HTMLElement).style.transform = `translateY(-${
        day * 35
      }px)`;

      $yearEl!.querySelector('.select')!.classList.remove('select');
      $monthEl!.querySelector('.select')!.classList.remove('select');
      $dayEl!.querySelector('.select')!.classList.remove('select');

      $yearEl!.querySelector('.today')!.classList.add('select');
      $monthEl!.querySelector('.today')!.classList.add('select');
      $dayEl!.querySelector('.today')!.classList.add('select');

      this._setYear = this.toYear;
      this._setMonth = this.toMonth + 1;
      this._setDay = this.toDay;
      this._inputChange();
      this._removeCheck = false;
    }
    this.dispatchEvent(this.changeEvent);
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
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____-__-__';
      this._setMonth = undefined;
      this._setYear = undefined;
      this._setDay = undefined;
      this._selectRemove();
    } else {
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____-__-__';
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
          this._spinnerPickerView(this._setYear, this._setMonth! - 1);
          this._spinnerDayPositionChange();
        } else if ((e.currentTarget as HTMLElement)!.classList.contains('month')) {
          this._setMonth = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerPickerView(this._setYear, this._setMonth! - 1);
          this._spinnerDayPositionChange();
        } else {
          this._setDay = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
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

  private _spinnerMonthSelect(num?: number): void {
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

  private _spinnerDaySelect(): void {
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

  private _spinnerYearChange(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($el.querySelector('.year')!.children[0] as HTMLElement).style.transform = `translateY(-${
      (this._setYear! - Number(this.min?.slice(0, 4))) * 35
    }px)`;
  }

  private _spinnerDayPositionChange(num?: number): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    let select = this._setDay! - 1;
    if (num !== undefined) {
      select = num;
    }
    ($el.querySelector('.day')!.children[0] as HTMLElement).style.transform = `translateY(-${select * 35}px)`;
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
      this._spinnerMonthSelect();
      this._spinnerDaySelect();
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
      const month: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
        '.moving-list.month'
      )! as HTMLElement;

      const day: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
        '.moving-list.day'
      )! as HTMLElement;

      (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.year')!
        .children[0] as HTMLElement).style.transform = `translateY(-${
        (this._setYear! - Number(this.min?.slice(0, 4))) * 35
      }px)`;

      if (month.children.length !== 12) {
        for (let i = 0; i < month.children.length; i++) {
          if (Number((month.children.item(i) as HTMLElement).dataset.value) === this._setMonth) {
            (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.month')!
              .children[0] as HTMLElement).style.transform = `translateY(-${i * 35}px)`;
          }
        }
      } else {
        (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.month')!
          .children[0] as HTMLElement).style.transform = `translateY(-${(this._setMonth! - 1) * 35}px)`;
      }
      if (day.children.length !== this.lastDay[this._setMonth! - 1]) {
        for (let i = 0; i < day.children.length; i++) {
          if (Number((day.children.item(i) as HTMLElement).dataset.value) === this._setDay) {
            (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.day')!
              .children[0] as HTMLElement).style.transform = `translateY(-${i * 35}px)`;
          }
        }
      } else {
        const nowPosition = Math.abs(Number(day.parentElement!.style.transform.split('(')[1].split('px')[0])) / 35 + 1;
        if (day.children.length < nowPosition) {
          (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.day')!
            .children[0] as HTMLElement).style.transform = `translateY(-${(day.children.length - 1) * 35}px)`;
          day.children.item(day.children.length - 1)!.classList.add('select');
          this._setDay = day.children.length;
          this._inputChange();
        } else {
          (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.day')!
            .children[0] as HTMLElement).style.transform = `translateY(-${(this._setDay! - 1) * 35}px)`;
        }
      }
    }
  }

  render() {
    return template.call(this);
  }
}
