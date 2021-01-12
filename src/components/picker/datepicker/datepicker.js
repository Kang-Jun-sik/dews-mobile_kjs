import { __decorate, __metadata } from 'tslib';
import { DewsFormComponent } from '../../base/DewsFormComponent.js';
import { html, internalProperty, property } from 'lit-element';
import template from './datepicker.html';
import scss from './datepicker.scss';
export class Datepicker extends DewsFormComponent {
  constructor() {
    super();
    this.title = '';
    this.disabled = false;
    this.readonly = false;
    this.required = false;
    this.min = `${new Date().getFullYear() - 100}${('0' + (new Date().getMonth() + 1)).slice(-2)}${(
      '0' + new Date().getDate()
    ).slice(-2)}`;
    this.max = `${new Date().getFullYear() + 100}${('0' + (new Date().getMonth() + 1)).slice(-2)}${(
      '0' + new Date().getDate()
    ).slice(-2)}`;
    this.spinner = false;
    this.visible = false;
    this.hdDisabled = false;
    this._value = '____-__-__';
    this.active = false;
    this._mode = 'day';
    this.$spinnerYear = [];
    this.$spinnerMonth = [];
    this.$spinnerDay = [];
    this.count = 0;
    this._count = 1;
    this.speed = 20;
    this._touchMoveX = 0;
    this._touchMoveY = 0;
    this._removeCheck = false;
    this.yearMinCheck = false;
    this.yearMaxCheck = false;
    this.monthMinCheck = false;
    this.monthMaxCheck = false;
    this.toYear = new Date().getFullYear();
    this.toMonth = new Date().getMonth();
    this.toDay = new Date().getDate();
    this.lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.changeEvent = new Event('change');
    this._moveCheck = false;
    this.domEvent = this._domClickHandler.bind(this);
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
      this._modeView = `${this._viewYear}-${this._viewMonth > 10 ? this._viewMonth : '0' + this._viewMonth}`;
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
  _dayPickerView(y, m) {
    let _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const _dateView = [];
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
    const theDate = new Date(todayYear, todayMonth, 1);
    const firstDay = theDate.getDay();
    let yearDisabled = false;
    let monthDisabled = false;
    let dayMaxCheck = false;
    let dayMinCheck = false;
    if (todayYear >= Number((_a = this.max) === null || _a === void 0 ? void 0 : _a.slice(0, 4))) {
      if (todayYear > Number((_b = this.max) === null || _b === void 0 ? void 0 : _b.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 >= Number((_c = this.max) === null || _c === void 0 ? void 0 : _c.slice(4, 6))) {
        if (todayMonth + 1 > Number((_d = this.max) === null || _d === void 0 ? void 0 : _d.slice(4, 6))) {
          monthDisabled = true;
        } else {
          dayMaxCheck = true;
        }
      }
    } else if (todayYear <= Number((_e = this.min) === null || _e === void 0 ? void 0 : _e.slice(0, 4))) {
      if (todayYear < Number((_f = this.min) === null || _f === void 0 ? void 0 : _f.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 <= Number((_g = this.min) === null || _g === void 0 ? void 0 : _g.slice(4, 6))) {
        if (todayMonth + 1 < Number((_h = this.min) === null || _h === void 0 ? void 0 : _h.slice(4, 6))) {
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
          _dateView.push(html`<div class="day day-disabled">
            <span></span>
          </div>`);
        } else {
          if (j === 1 || j === 7) {
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number((_j = this.max) === null || _j === void 0 ? void 0 : _j.slice(6, 8))) ||
              (dayMinCheck && count < Number((_k = this.min) === null || _k === void 0 ? void 0 : _k.slice(6, 8)))
            ) {
              _dateView.push(html`<div class="day day-disabled" data-value="${count}">
                <span>${count}</span>
              </div>`);
            } else if (
              this._setMonth === todayMonth + 1 &&
              this._setYear == todayYear &&
              count === this._setDay &&
              !this.hdDisabled
            ) {
              if (this.visible) {
                _dateView.push(html`<div
                  class="day select"
                  data-value="${count}"
                  @click="${this.hdDisabled ? null : this._dayClickHandler}"
                >
                  <span>${count}</span>
                </div>`);
              } else {
                _dateView.push(html`<div
                  class="day weekend select"
                  data-value="${count}"
                  @click="${this._dayClickHandler}"
                >
                  <span>${count}</span>
                </div>`);
              }
            } else {
              if (this.visible) {
                _dateView.push(html`<div
                  class="day"
                  data-value="${count}"
                  @click="${this.hdDisabled ? null : this._dayClickHandler}"
                >
                  <span>${count}</span>
                </div>`);
              } else {
                _dateView.push(html`<div
                  class="day weekend"
                  data-value="${count}"
                  @click="${this.hdDisabled ? null : this._dayClickHandler}"
                >
                  <span>${count}</span>
                </div>`);
              }
            }
          } else if (count === this.toDay && this.toMonth === todayMonth && this.toYear === todayYear) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(html`<div class="day today select" data-value="${count}" @click="${this._dayClickHandler}">
                <span>${count}</span>
              </div>`);
            } else {
              _dateView.push(html`<div class="day today" data-value="${count}" @click="${this._dayClickHandler}">
                <span>${count}</span>
              </div>`);
            }
          } else {
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number((_l = this.max) === null || _l === void 0 ? void 0 : _l.slice(6, 8))) ||
              (dayMinCheck && count < Number((_m = this.min) === null || _m === void 0 ? void 0 : _m.slice(6, 8)))
            ) {
              _dateView.push(html`<div class="day day-disabled" data-value="${count}">
                <span>${count}</span>
              </div>`);
            } else if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(html`<div class="day select" data-value="${count}" @click="${this._dayClickHandler}">
                <span>${count}</span>
              </div>`);
            } else {
              _dateView.push(html`<div class="day" data-value="${count}" @click="${this._dayClickHandler}">
                <span>${count}</span>
              </div>`);
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
  _monthPickerView(y) {
    let _a, _b, _c, _d, _e, _f;
    const _mountView = [];
    let todayYear = this.toYear;
    if (y !== undefined) {
      todayYear = y;
    }
    for (let i = 1; i <= 12; i++) {
      if (todayYear === this._setYear && i === this._setMonth) {
        _mountView.push(
          html`<div class="month select" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      } else if (
        todayYear > Number((_a = this.max) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) ||
        (todayYear === Number((_b = this.max) === null || _b === void 0 ? void 0 : _b.slice(0, 4)) &&
          i > Number((_c = this.max) === null || _c === void 0 ? void 0 : _c.slice(4, 6)))
      ) {
        _mountView.push(html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
          <span>${i}</span>
        </div>`);
      } else if (
        todayYear < Number((_d = this.min) === null || _d === void 0 ? void 0 : _d.slice(0, 4)) ||
        (todayYear === Number((_e = this.min) === null || _e === void 0 ? void 0 : _e.slice(0, 4)) &&
          i < Number((_f = this.min) === null || _f === void 0 ? void 0 : _f.slice(4, 6)))
      ) {
        _mountView.push(html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
          <span>${i}</span>
        </div>`);
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
  _yearPickerView(y) {
    let _a, _b;
    let toYear = this.toYear;
    const _yearView = [];
    if (y !== undefined) {
      toYear = y;
    }
    const todayYearStart = (toYear / 10) * 10 - 1 - (toYear % 10);
    const todayYearEnd = (toYear / 10) * 10 + 10 - (toYear % 10);
    for (let i = 0; todayYearStart + i <= todayYearEnd; i++) {
      if (todayYearStart + i === todayYearStart || todayYearStart + i === todayYearEnd) {
        _yearView.push(html`<div
          class="year year-disabled"
          data-value="${todayYearStart + i}"
          @click="${this._yearClickHandler}"
        >
          <span>${todayYearStart + i}</span>
        </div>`);
      } else {
        if (todayYearStart + i === this._setYear) {
          _yearView.push(html`<div
            class="year select"
            data-value="${todayYearStart + i}"
            @click="${this._yearClickHandler}"
          >
            <span>${todayYearStart + i}</span>
          </div>`);
        } else if (
          todayYearStart + i > Number((_a = this.max) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) ||
          todayYearStart + i < Number((_b = this.min) === null || _b === void 0 ? void 0 : _b.slice(0, 4))
        ) {
          _yearView.push(html`<div
            class="year year-disabled"
            data-value="${todayYearStart + i}"
            @click="${this._yearClickHandler}"
          >
            <span>${todayYearStart + i}</span>
          </div>`);
        } else {
          _yearView.push(html`<div class="year" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
            <span>${todayYearStart + i}</span>
          </div>`);
        }
      }
    }
    return html`<div class="calendar-year">${_yearView}</div>`;
  }
  // 스피너 UI 생성
  _spinnerPickerView(y, m) {
    let _a, _b, _c, _d, _e, _f;
    let year = this.toYear;
    let month = this.toMonth;
    this.$spinnerDay = [];
    this.$spinnerYear = [];
    this.$spinnerMonth = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    const yearMin = Number(this.min.slice(0, 4));
    const yearMax = Number(this.max.slice(0, 4));
    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
      this.lastDay[1] = 29;
    } else {
      this.lastDay[1] = 28;
    }
    const lastDate = this.lastDay[month];
    for (let i = 0; yearMin + i <= yearMax; i++) {
      // 년도 생성
      if (yearMin + i === this.toYear) {
        this.$spinnerYear.push(html`<li class="today" data-value="${yearMin + i}" data-index="${i}">
          <button>${yearMin + i}</button>
        </li>`);
      } else {
        this.$spinnerYear.push(
          html`<li data-value="${yearMin + i}" data-index="${i}"><button>${yearMin + i}</button></li>`
        );
      }
      // }
    }
    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (
        yearMin !== year ||
        (yearMin === year && j >= Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(4, 6)))
      ) {
        if (
          yearMax !== year ||
          (yearMax === year && j <= Number((_b = this.max) === null || _b === void 0 ? void 0 : _b.slice(4, 6)))
        ) {
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
        (yearMin === year &&
          month + 1 >= Number((_c = this.min) === null || _c === void 0 ? void 0 : _c.slice(4, 6)) &&
          k >= Number((_d = this.min) === null || _d === void 0 ? void 0 : _d.slice(6, 8)))
      ) {
        if (
          yearMax !== year ||
          (yearMax === year &&
            month + 1 <= Number((_e = this.max) === null || _e === void 0 ? void 0 : _e.slice(4, 6)) &&
            k <= Number((_f = this.max) === null || _f === void 0 ? void 0 : _f.slice(6, 8)))
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
  _inputClickHandler(e) {
    e.target.setSelectionRange(0, 0);
  }
  //  각 n월 클릭 핸들러
  _monthClickHandler(e) {
    const $el = e.currentTarget;
    this.shadowRoot.querySelectorAll('.calendar-month').forEach($calendar => {
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
  _beforeInputHandler(e) {
    const $el = e.target;
    if ((/\d/.exec(e.data) == null && e.data != null) || ($el.selectionStart > 9 && e.data != null)) {
      e.returnValue = false;
    }
  }
  // input 입력 처리
  _inputHandler(e) {
    let _a, _b;
    const $el = e.target;
    if (e.data !== null) {
      let cursor = $el.selectionStart;
      $el.value = $el.value.slice(0, $el.selectionStart) + $el.value.slice($el.selectionStart + 1, 11);
      if (cursor === 4) {
        this.yearMinCheck = false;
        this.yearMaxCheck = false;
        const year = Number($el.value.slice(0, 4));
        const min = Number(this.min.slice(0, 4));
        const max = Number(this.max.slice(0, 4));
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
          this._spinnerPickerView(this._setYear, this._setMonth - 1);
          this._spinnerYearSelect();
          this._spinnerYearChange();
        }
        cursor++;
      } else if (cursor === 7) {
        this.monthMinCheck = false;
        const month = Number($el.value.slice(5, 7));
        const min = Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(4, 6));
        const max = Number((_b = this.max) === null || _b === void 0 ? void 0 : _b.slice(4, 6));
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
        const year = Number($el.value.slice(0, 4));
        const month = Number($el.value.slice(5, 7));
        const day = Number($el.value.slice(8, 10));
        const min = Number(this.min.slice(6, 8));
        const max = Number(this.max.slice(6, 8));
        if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
          this.lastDay[1] = 29;
        } else {
          this.lastDay[1] = 28;
        }
        const lastDay = this.lastDay[Number($el.value.slice(5, 7)) - 1];
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
        this._value = `${this._setYear}-${this._setMonth >= 10 ? this._setMonth : '0' + this._setMonth}-${
          this._setDay < 10 ? '0' + this._setDay : this._setDay
        }`;
      }
      $el.setSelectionRange(cursor, cursor);
    } else {
      const cursor = $el.selectionStart;
      for (let i = 0; $el.value.length + i <= 9; i++) {
        if (cursor === 7 || cursor === 4) {
          $el.value = $el.value.slice(0, cursor - 1) + '_' + '-' + $el.value.slice(cursor, 9);
          $el.setSelectionRange(cursor - 1, cursor - 1);
        } else {
          $el.value = $el.value.slice(0, cursor) + '_' + $el.value.slice(cursor, 9);
          $el.setSelectionRange(cursor, cursor);
        }
      }
    }
  }
  _inputChange() {
    this._value = `${this._setYear}-${this._setMonth >= 10 ? this._setMonth : '0' + this._setMonth}-${
      this._setDay < 10 ? '0' + this._setDay : this._setDay
    }`;
    this.shadowRoot.querySelector('.input').value = this._value;
  }
  //  각 n일 클릭 핸들러
  _dayClickHandler(e) {
    // if (!this.hdDisabled && ) {
    //
    // }
    const $el = e.currentTarget;
    this._selectRemove();
    $el.classList.add('select');
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._setDay = Number(e.currentTarget.dataset.value);
    this._viewDay = this._setDay;
    this._inputChange();
  }
  // 년도 클릭 핸들러
  _yearClickHandler(e) {
    const $el = e.currentTarget;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('month');
  }
  // 적용버튼 핸들러
  _confirmClickHandler() {
    let _a;
    if (this.hdDisabled && !this.spinner) {
      const $day = this.shadowRoot
        .querySelector('.drawer-layout')
        .querySelectorAll('.calendar-date')[1]
        .querySelectorAll('div');
      for (let i = 0; i < $day.length; i++) {
        if (Number($day[i].dataset.value) === this._setDay) {
          if (i === 0 || i % 7 === 0 || i % 7 === 6) {
            this._removeClickHandler();
            return;
          }
        }
      }
    }
    if (((_a = this._value) === null || _a === void 0 ? void 0 : _a.indexOf('_')) < 0) {
      this.inputValue = this._value;
      this._close();
    }
  }
  //  select 클래스를 제거
  _selectRemove() {
    this.shadowRoot.querySelectorAll('.calendar-date').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    this.shadowRoot.querySelectorAll('.calendar-month').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
  }
  /*
   * 다음버튼 UI 처리 및 animation 처리
   * */
  _afterAnimation() {
    const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.calendar-flip-wrap');
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX + this._count}px, 0px, 0px)`;
    if (Math.abs(this._count + this._touchMoveX) <= ($el.clientWidth / 3) * 2) {
      window.requestAnimationFrame(this._afterAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot.querySelector('.drawer-layout').querySelector('.calendar-flip-wrap').clientWidth / 3
      )}px, 0px, 0px)`;
      this._afterViewSet();
      this._modeViewChange();
    }
    this._count = this._count - this.speed;
  }
  // 모드변경 버튼 클릭 핸들러
  _modeClickHandler() {
    this._selectRemove();
    if (this._mode === 'day') {
      this._beforeView = this._monthPickerView(this._viewYear - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._afterView = this._monthPickerView(this._viewYear + 1);
    } else if (this._mode === 'month') {
      this._beforeView = this._yearPickerView(this._viewYear - 10);
      this._nowView = this._yearPickerView(this._viewYear);
      this._afterView = this._yearPickerView(this._viewYear + 10);
    }
    this._modeChange();
  }
  // 모드를 변경 day, month, year
  _modeChange(mode) {
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
  _modeViewChange() {
    if (this._mode === 'day') {
      this._modeView = `${this._viewYear}-${this._viewMonth >= 10 ? this._viewMonth : '0' + this._viewMonth}`;
    } else if (this._mode === 'month') {
      this._modeView = `${this._viewYear}`;
    } else {
      this._modeView = `${(this._viewYear / 10) * 10 - (this._viewYear % 10)}-${
        (this._viewYear / 10) * 10 + 9 - (this._viewYear % 10)
      }`;
    }
  }
  //  다음버튼 HTML 템플릿 설정
  _afterViewSet() {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth + 1 > 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 12);
        this._nowView = this._dayPickerView(this._viewYear + 1, 1);
        this._afterView = this._dayPickerView(this._viewYear + 1, 2);
        this._viewYear++;
        this._viewMonth = 1;
      } else if (this._viewMonth + 1 == 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 11);
        this._nowView = this._dayPickerView(this._viewYear, 12);
        this._afterView = this._dayPickerView(this._viewYear + 1, 1);
        this._viewMonth++;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth + 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth + 2);
        this._viewMonth++;
      }
    } else if (this._mode === 'month') {
      this._beforeView = this._monthPickerView(this._viewYear);
      this._nowView = this._monthPickerView(this._viewYear + 1);
      this._afterView = this._monthPickerView(this._viewYear + 2);
      this._viewYear++;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear);
      this._nowView = this._yearPickerView(this._viewYear + 10);
      this._afterView = this._yearPickerView(this._viewYear + 20);
      this._viewYear = this._viewYear + 10;
    }
  }
  //  셋버튼 HTML 템플릿 설정
  _modeViewSet() {
    if (this._mode === 'month') {
      if (this._viewMonth + 1 <= 1) {
        this._beforeView = this._dayPickerView(this._viewYear, 12);
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth - 1);
      }
      this._nowView = this._dayPickerView(this._viewYear, this._viewMonth);
      if (this._viewMonth + 1 > 12) {
        this._afterView = this._dayPickerView(this._viewYear + 1, 1);
      } else {
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth + 1);
      }
    } else if (this._mode === 'year') {
      this._beforeView = this._monthPickerView(this._viewYear - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._afterView = this._monthPickerView(this._viewYear + 1);
    }
  }
  /*
   * 이전버튼 UI 처리 및 animation 처리
   * */
  _beforeAnimation() {
    const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.calendar-flip-wrap');
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX + this._count}px, 0px, 0px)`;
    if (this._count <= Math.abs(this._touchMoveX)) {
      window.requestAnimationFrame(this._beforeAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot.querySelector('.drawer-layout').querySelector('.calendar-flip-wrap').clientWidth / 3
      )}px, 0px, 0px)`;
      this._beforeViewSet();
      this._modeViewChange();
    }
    this._count = this._count + this.speed;
  }
  // view template 설정
  _beforeViewSet() {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth - 1 < 1) {
        this._beforeView = this._dayPickerView(this._viewYear - 1, 11);
        this._nowView = this._dayPickerView(this._viewYear - 1, 12);
        this._afterView = this._dayPickerView(this._viewYear, 1);
        this._viewYear--;
        this._viewMonth = 12;
      } else if (this._viewMonth - 1 == 1) {
        this._beforeView = this._dayPickerView(this._viewYear - 1, 12);
        this._nowView = this._dayPickerView(this._viewYear, 1);
        this._afterView = this._dayPickerView(this._viewYear, 2);
        this._viewMonth--;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth - 2);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth - 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._viewMonth--;
      }
      this._selectRemove();
    } else if (this._mode === 'month') {
      this._beforeView = this._monthPickerView(this._viewYear - 2);
      this._nowView = this._monthPickerView(this._viewYear - 1);
      this._afterView = this._monthPickerView(this._viewYear);
      this._viewYear--;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear - 20);
      this._nowView = this._yearPickerView(this._viewYear - 10);
      this._afterView = this._yearPickerView(this._viewYear);
      this._viewYear = this._viewYear - 10;
    }
  }
  /*
   *  현재 날짜 이동 버튼
   * */
  _nowClickHandler() {
    if (!this.spinner) {
      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const day = this.shadowRoot.querySelector('.drawer-layout').querySelector('.day.today');
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
      const $yearEl = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-year-wrap');
      const $monthEl = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-month-wrap');
      const $dayEl = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-day-wrap');
      const year = Number($yearEl.querySelector('.today').dataset.index);
      const month = Number($monthEl.querySelector('.today').dataset.index) - 1;
      const day = Number($dayEl.querySelector('.today').dataset.index) - 1;
      $yearEl.querySelector('.moving-list').parentElement.style.transform = `translateY(-${year * 35}px)`;
      $monthEl.querySelector('.moving-list').parentElement.style.transform = `translateY(-${month * 35}px)`;
      $dayEl.querySelector('.moving-list').parentElement.style.transform = `translateY(-${day * 35}px)`;
      $yearEl.querySelector('.select').classList.remove('select');
      $monthEl.querySelector('.select').classList.remove('select');
      $dayEl.querySelector('.select').classList.remove('select');
      $yearEl.querySelector('.today').classList.add('select');
      $monthEl.querySelector('.today').classList.add('select');
      $dayEl.querySelector('.today').classList.add('select');
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
  _afterBtnView() {
    const $el = this.parentElement.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._afterItem = i + 1;
        if ($el.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el.item(i + 1).hasAttribute('disabled') ||
            $el.item(i + 1).hasAttribute('readonly') ||
            $el.item(i + 1).localName === 'dews-button' ||
            $el.item(i + 1).localName === 'dews-radiobutton-group' ||
            $el.item(i + 1).localName === 'dews-checkbox-group'
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
  _removeClickHandler() {
    this._value = '';
    if (!this.spinner) {
      this.shadowRoot.querySelector('.input').value = '____-__-__';
      this._setMonth = undefined;
      this._setYear = undefined;
      this._setDay = undefined;
      this._selectRemove();
    } else {
      this.shadowRoot.querySelector('.input').value = '____-__-__';
      this.shadowRoot
        .querySelector('.drawer-layout')
        .querySelectorAll('.select')
        .forEach($el => {
          $el.classList.add('clear');
        });
      this._removeCheck = true;
    }
    this.dispatchEvent(this.changeEvent);
  }
  //  터치 이벤트 처리 ex) 스와이프 효과를 위해 처리
  _touchMoveHandler(e) {
    this._moveCheck = true;
    let $el = e.currentTarget;
    $el = $el.children[0];
    if (!this.spinner) {
      this._touchMoveX =
        e.changedTouches[0].pageX -
        this._touchStartPoint -
        this.shadowRoot.querySelector('.drawer-layout').querySelector('.calendar-flip-wrap').clientWidth / 3;
      $el.style.transform = `translate3d(${this._touchMoveX}px, 0px, 0px)`;
    } else {
      const liHeight = $el.clientHeight;
      this._touchMoveY = this._touchStartSpinnerPoint - (e.changedTouches[0].pageY - this._touchStartPoint) * 1.3;
      if (($el.parentElement.children.length - 1) * liHeight >= this._touchMoveY) {
        $el.parentElement.parentElement.style.transform = `translateY(-${this._touchMoveY}px)`;
      } else {
        this._touchMoveY = ($el.parentElement.children.length - 1) * liHeight;
      }
    }
  }
  _touchStartHandler(e) {
    if (!this.spinner) {
      this._touchStartPoint = e.changedTouches[0].pageX;
    } else {
      this._touchStartSpinnerPoint = Math.abs(
        Number(e.currentTarget.children[0].parentElement.parentElement.style.transform.split('(')[1].split('px')[0])
      );
      this._touchStartPoint = e.changedTouches[0].pageY;
      const length = e.currentTarget.children.length;
      for (let i = 0; i < length; i++) {
        if (e.currentTarget.children.item(i) === e.target.parentElement) {
          this._spinnerIndex = i;
        }
      }
      e.currentTarget.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    }
  }
  _touchEndHandler(e) {
    if (!this.spinner) {
      if (e.changedTouches[0].pageX > this._touchStartPoint + 5) {
        this._beforeAnimation();
      } else if (e.changedTouches[0].pageX < this._touchStartPoint - 5) {
        this._afterAnimation();
      }
    } else {
      this._touchMoveY = Math.abs(Number(e.currentTarget.parentElement.style.transform.split('(')[1].split('px')[0]));
      let selectIndex = Math.round(this._touchMoveY / 35);
      if (selectIndex < 0) {
        selectIndex = 0;
      }
      if (this._moveCheck) {
        if (e.currentTarget.classList.contains('year')) {
          this._setYear = Number(e.currentTarget.children.item(selectIndex).dataset.value);
          this._spinnerPickerView(this._setYear, this._setMonth - 1);
          this._spinnerDayPositionChange();
        } else if (e.currentTarget.classList.contains('month')) {
          this._setMonth = Number(e.currentTarget.children.item(selectIndex).dataset.value);
          this._spinnerPickerView(this._setYear, this._setMonth - 1);
          this._spinnerDayPositionChange();
        } else {
          this._setDay = Number(e.currentTarget.children.item(selectIndex).dataset.value);
        }
        this._inputChange();
        e.currentTarget.parentElement.style.transform = `translateY(-${selectIndex * 35}px)`;
        e.currentTarget.children.item(selectIndex).classList.add('select');
        this._moveCheck = false;
      } else {
        e.currentTarget.parentElement.style.transform = `translateY(-${selectIndex * 35}px)`;
        e.currentTarget.children.item(selectIndex).classList.add('select');
      }
      this.dispatchEvent(this.changeEvent);
    }
    this._removeCheck = false;
  }
  // ========= spinner
  _spinnerRemove() {
    const $drawer = this.shadowRoot.querySelector('.drawer-layout');
    $drawer.querySelectorAll('.select').forEach($el => {
      $el.classList.remove('select');
    });
  }
  _spinnerYearSelect() {
    let _a;
    const $drawer = this.shadowRoot.querySelector('.drawer-layout');
    $drawer
      .querySelector('.moving-list.year')
      .children[
        this._setYear - Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 4))
      ].classList.add('select');
  }
  _spinnerMonthSelect(num) {
    const $drawer = this.shadowRoot.querySelector('.drawer-layout');
    const $monthList = $drawer.querySelector('.moving-list.month');
    let select = this._setMonth - 1;
    if (num !== undefined) {
      select = num;
    }
    if ($monthList.children.length !== 12) {
      for (let i = 0; i < $monthList.children.length; i++) {
        if (Number($monthList.children.item(i).dataset.value) === this._setMonth) {
          $drawer.querySelector('.moving-list.month').children[i].classList.add('select');
        }
      }
    } else {
      $drawer.querySelector('.moving-list.month').children[select].classList.add('select');
    }
  }
  _spinnerDaySelect() {
    const $drawer = this.shadowRoot.querySelector('.drawer-layout');
    const $dayList = $drawer.querySelector('.moving-list.day');
    if ($dayList.children.length !== 12) {
      for (let i = 0; i < $dayList.children.length; i++) {
        if (Number($dayList.children.item(i).dataset.value) === this._setDay) {
          $drawer.querySelector('.moving-list.day').children[i].classList.add('select');
          this._spinnerDayPositionChange(i);
        }
      }
    } else {
      $drawer.querySelector('.moving-list.day').children[this._setDay - 1].classList.add('select');
      this._spinnerDayPositionChange();
    }
  }
  _spinnerYearChange() {
    let _a;
    const $el = this.shadowRoot.querySelector('.drawer-layout');
    $el.querySelector('.year').children[0].style.transform = `translateY(-${
      (this._setYear - Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 4))) * 35
    }px)`;
  }
  _spinnerDayPositionChange(num) {
    const $el = this.shadowRoot.querySelector('.drawer-layout');
    let select = this._setDay - 1;
    if (num !== undefined) {
      select = num;
    }
    $el.querySelector('.day').children[0].style.transform = `translateY(-${select * 35}px)`;
  }
  //  drower layout 처리 *_*
  _nextBtnClickHandler(e) {
    let _a, _b, _c;
    const $el =
      (_c =
        (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0
          ? void 0
          : _b.children[this._afterItem]) === null || _c === void 0
        ? void 0
        : _c.children[0];
    this._confirmClickHandler();
    $el === null || $el === void 0 ? void 0 : $el.click();
  }
  _domClickHandler(e) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot.querySelector('.drawer-layout').shadowRoot.querySelector('.layer-bottom').clientHeight
      ) {
        if (this.count > 0) {
          this._close();
        } else {
          this.count++;
        }
      }
    }
  }
  _clickHandler(e) {
    if (!this.disabled && !this.readonly && this.active === false) {
      this.shadowRoot.querySelector('.select-wrap').classList.add('focus');
      this._open();
      this._scrollChange();
    }
  }
  _scrollChange() {
    let _a;
    window.scrollTo(
      0,
      window.pageYOffset +
        ((_a = this.parentElement.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.top) -
        this.shadowRoot.querySelector('.date-picker-wrap').clientHeight -
        25
    );
  }
  _close() {
    this.shadowRoot.querySelector('.select-wrap').classList.remove('focus');
    this.active = false;
    this.count = 0;
    this.dispatchEvent(new Event('close'));
    document.removeEventListener('click', this.domEvent);
  }
  _open() {
    this.active = true;
    this.dispatchEvent(new Event('open'));
    document.addEventListener('click', this.domEvent);
  }
  // spinner 기본 선택
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    if (this.spinner) {
      this._inputChange();
      this._spinnerYearSelect();
      this._spinnerMonthSelect();
      this._spinnerDaySelect();
    }
  }
  updated(_changedProperties) {
    let _a;
    super.updated(_changedProperties);
    if (this.spinner && !this._removeCheck) {
      this.shadowRoot
        .querySelector('.drawer-layout')
        .querySelectorAll('.clear')
        .forEach($el => {
          $el.classList.remove('clear');
        });
    }
    if (this.spinner) {
      const month = this.shadowRoot.querySelector('.drawer-layout').querySelector('.moving-list.month');
      const day = this.shadowRoot.querySelector('.drawer-layout').querySelector('.moving-list.day');
      this.shadowRoot
        .querySelector('.drawer-layout')
        .querySelector('.year').children[0].style.transform = `translateY(-${
        (this._setYear - Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 4))) * 35
      }px)`;
      if (month.children.length !== 12) {
        for (let i = 0; i < month.children.length; i++) {
          if (Number(month.children.item(i).dataset.value) === this._setMonth) {
            this.shadowRoot
              .querySelector('.drawer-layout')
              .querySelector('.month').children[0].style.transform = `translateY(-${i * 35}px)`;
          }
        }
      } else {
        this.shadowRoot
          .querySelector('.drawer-layout')
          .querySelector('.month').children[0].style.transform = `translateY(-${(this._setMonth - 1) * 35}px)`;
      }
      if (day.children.length !== this.lastDay[this._setMonth - 1]) {
        for (let i = 0; i < day.children.length; i++) {
          if (Number(day.children.item(i).dataset.value) === this._setDay) {
            this.shadowRoot
              .querySelector('.drawer-layout')
              .querySelector('.day').children[0].style.transform = `translateY(-${i * 35}px)`;
          }
        }
      } else {
        const nowPosition = Math.abs(Number(day.parentElement.style.transform.split('(')[1].split('px')[0])) / 35 + 1;
        if (day.children.length < nowPosition) {
          this.shadowRoot
            .querySelector('.drawer-layout')
            .querySelector('.day').children[0].style.transform = `translateY(-${(day.children.length - 1) * 35}px)`;
          day.children.item(day.children.length - 1).classList.add('select');
          this._setDay = day.children.length;
          this._inputChange();
        } else {
          this.shadowRoot
            .querySelector('.drawer-layout')
            .querySelector('.day').children[0].style.transform = `translateY(-${(this._setDay - 1) * 35}px)`;
        }
      }
    }
  }
  render() {
    return template.call(this);
  }
}
Datepicker.styles = scss;
__decorate([property({ type: String }), __metadata('design:type', Object)], Datepicker.prototype, 'title', void 0);
__decorate([property({ type: Boolean }), __metadata('design:type', Object)], Datepicker.prototype, 'disabled', void 0);
__decorate([property({ type: Boolean }), __metadata('design:type', Object)], Datepicker.prototype, 'readonly', void 0);
__decorate([property({ type: Boolean }), __metadata('design:type', Object)], Datepicker.prototype, 'required', void 0);
__decorate([property({ type: String }), __metadata('design:type', Object)], Datepicker.prototype, 'value', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, 'inputValue', void 0);
__decorate([property({ type: String }), __metadata('design:type', Object)], Datepicker.prototype, 'min', void 0);
__decorate([property({ type: String }), __metadata('design:type', Object)], Datepicker.prototype, 'max', void 0);
__decorate([property({ type: Boolean }), __metadata('design:type', Object)], Datepicker.prototype, 'spinner', void 0);
__decorate(
  [property({ type: Boolean, attribute: 'holidays-visible' }), __metadata('design:type', Object)],
  Datepicker.prototype,
  'visible',
  void 0
);
__decorate(
  [property({ type: Boolean, attribute: 'holidays-disabled' }), __metadata('design:type', Object)],
  Datepicker.prototype,
  'hdDisabled',
  void 0
);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, '_value', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, 'active', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, '_beforeView', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, '_nowView', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, '_afterView', void 0);
__decorate([internalProperty(), __metadata('design:type', Object)], Datepicker.prototype, '_modeView', void 0);
__decorate([internalProperty(), __metadata('design:type', String)], Datepicker.prototype, '_mode', void 0);
__decorate([internalProperty(), __metadata('design:type', Array)], Datepicker.prototype, '$spinnerYear', void 0);
__decorate([internalProperty(), __metadata('design:type', Array)], Datepicker.prototype, '$spinnerMonth', void 0);
__decorate([internalProperty(), __metadata('design:type', Array)], Datepicker.prototype, '$spinnerDay', void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUUvRixPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUVyQyxNQUFNLE9BQU8sVUFBVyxTQUFRLGlCQUFpQjtJQWlHL0M7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQTlGVixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsYUFBUSxHQUF3QixLQUFLLENBQUM7UUFHdEMsYUFBUSxHQUF3QixLQUFLLENBQUM7UUFHdEMsYUFBUSxHQUF3QixLQUFLLENBQUM7UUFTdEMsUUFBRyxHQUF1QixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQzVHLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUMzQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFHZCxRQUFHLEdBQXVCLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDNUcsR0FBRyxHQUFHLElBQUks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RTs7MENBQ3VCO0FBRzFDO0lBREMsZ0JBQWdCLEVBQUU7OzBDQUN5QjtBQUc1QztJQURDLGdCQUFnQixFQUFFOzsrQ0FDNkI7QUFHaEQ7SUFEQyxnQkFBZ0IsRUFBRTs7NENBQzBCO0FBRzdDO0lBREMsZ0JBQWdCLEVBQUU7OzhDQUM0QjtBQUcvQztJQURDLGdCQUFnQixFQUFFOzs2Q0FDbUI7QUFHdEM7SUFEQyxnQkFBZ0IsRUFBRTs7eUNBQzZCO0FBR2hEO0lBREMsZ0JBQWdCLEVBQUU7OEJBQ0csS0FBSztnREFBc0I7QUFHakQ7SUFEQyxnQkFBZ0IsRUFBRTs4QkFDSSxLQUFLO2lEQUFzQjtBQUdsRDtJQURDLGdCQUFnQixFQUFFOzhCQUNFLEtBQUs7K0NBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0Zvcm1Db21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NGb3JtQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IGh0bWwsIGludGVybmFsUHJvcGVydHksIHByb3BlcnR5LCBQcm9wZXJ0eVZhbHVlcywgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2RhdGVwaWNrZXIuaHRtbCc7XG5pbXBvcnQgc2NzcyBmcm9tICcuL2RhdGVwaWNrZXIuc2Nzcyc7XG5cbmV4cG9ydCBjbGFzcyBEYXRlcGlja2VyIGV4dGVuZHMgRGV3c0Zvcm1Db21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdGl0bGUgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuICByZWFkb25seTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbiAgcmVxdWlyZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIGlucHV0VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgbWluOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgLSAxMDB9JHsoJzAnICsgKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMil9JHsoXG4gICAgJzAnICsgbmV3IERhdGUoKS5nZXREYXRlKClcbiAgKS5zbGljZSgtMil9YDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgbWF4OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgKyAxMDB9JHsoJzAnICsgKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDEpKS5zbGljZSgtMil9JHsoXG4gICAgJzAnICsgbmV3IERhdGUoKS5nZXREYXRlKClcbiAgKS5zbGljZSgtMil9YDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIHNwaW5uZXI6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCBhdHRyaWJ1dGU6ICdob2xpZGF5cy12aXNpYmxlJyB9KVxuICB2aXNpYmxlID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgYXR0cmlidXRlOiAnaG9saWRheXMtZGlzYWJsZWQnIH0pXG4gIGhkRGlzYWJsZWQgPSBmYWxzZTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIF92YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ19fX18tX18tX18nO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBhY3RpdmU6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgX2JlZm9yZVZpZXc6IFRlbXBsYXRlUmVzdWx0IHwgdW5kZWZpbmVkO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBfbm93VmlldzogVGVtcGxhdGVSZXN1bHQgfCB1bmRlZmluZWQ7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIF9hZnRlclZpZXc6IFRlbXBsYXRlUmVzdWx0IHwgdW5kZWZpbmVkO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBfbW9kZVZpZXc6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgX21vZGU6ICdkYXknIHwgJ21vbnRoJyB8ICd5ZWFyJyA9ICdkYXknO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSAkc3Bpbm5lclllYXI6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSAkc3Bpbm5lck1vbnRoOiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgJHNwaW5uZXJEYXk6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIHByaXZhdGUgY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG4gIHByaXZhdGUgX3ZpZXdZZWFyOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3ZpZXdNb250aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF92aWV3RGF5OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3NldFllYXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfc2V0TW9udGg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfc2V0RGF5OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2NvdW50OiBudW1iZXIgfCB1bmRlZmluZWQgPSAxO1xuICBwcml2YXRlIHNwZWVkOiBudW1iZXIgfCB1bmRlZmluZWQgPSAyMDtcbiAgcHJpdmF0ZSBfdG91Y2hTdGFydFBvaW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3RvdWNoTW92ZVg6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG4gIHByaXZhdGUgX3RvdWNoTW92ZVk6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG4gIHByaXZhdGUgX2FmdGVySXRlbTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlICRuZXh0QnRuOiBUZW1wbGF0ZVJlc3VsdCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfc3Bpbm5lckluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3JlbW92ZUNoZWNrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgeWVhck1pbkNoZWNrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgeWVhck1heENoZWNrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgbW9udGhNaW5DaGVjazogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIG1vbnRoTWF4Q2hlY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdG91Y2hTdGFydFNwaW5uZXJQb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIHRvWWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcbiAgcHJpdmF0ZSB0b01vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpO1xuICBwcml2YXRlIHRvRGF5ID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gIHByaXZhdGUgbGFzdERheTogQXJyYXk8bnVtYmVyPiA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXTtcbiAgcHJpdmF0ZSBjaGFuZ2VFdmVudDogRXZlbnQgPSBuZXcgRXZlbnQoJ2NoYW5nZScpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWZ0ZXJCdG5WaWV3KCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmVhZG9ubHkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgwLCA0KSArICctJyArIHRoaXMudmFsdWUuc2xpY2UoNCwgNikgKyAnLScgKyB0aGlzLnZhbHVlLnNsaWNlKDYsIDgpO1xuICAgIH1cbiAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgaWYgKCF0aGlzLnNwaW5uZXIpIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fdmlld1llYXIgPSBOdW1iZXIodGhpcy52YWx1ZS5zbGljZSgwLCA0KSk7XG4gICAgICAgIHRoaXMuX3ZpZXdNb250aCA9IE51bWJlcih0aGlzLnZhbHVlLnNsaWNlKDQsIDYpKTtcbiAgICAgICAgdGhpcy5fc2V0WWVhciA9IHRoaXMuX3ZpZXdZZWFyO1xuICAgICAgICB0aGlzLl9zZXRNb250aCA9IHRoaXMuX3ZpZXdNb250aDtcbiAgICAgICAgdGhpcy5fc2V0RGF5ID0gTnVtYmVyKHRoaXMudmFsdWUuc2xpY2UoNiwgOCkpO1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgdGhpcy5fdmlld01vbnRoIC0gMSk7XG4gICAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCB0aGlzLl92aWV3TW9udGgpO1xuICAgICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCB0aGlzLl92aWV3TW9udGggKyAxKTtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy52YWx1ZS5zbGljZSgwLCA0KSArICctJyArIHRoaXMudmFsdWUuc2xpY2UoNCwgNikgKyAnLScgKyB0aGlzLnZhbHVlLnNsaWNlKDYsIDgpO1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHRoaXMuaW5wdXRWYWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCkpO1xuICAgICAgICB0aGlzLl9ub3dWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldygpO1xuICAgICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRvZGF5LmdldEZ1bGxZZWFyKCksIHRvZGF5LmdldE1vbnRoKCkgKyAyKTtcbiAgICAgICAgdGhpcy5fdmlld1llYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgICB0aGlzLl92aWV3TW9udGggPSB0b2RheS5nZXRNb250aCgpICsgMTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21vZGVWaWV3ID0gYCR7dGhpcy5fdmlld1llYXJ9LSR7dGhpcy5fdmlld01vbnRoISA+IDEwID8gdGhpcy5fdmlld01vbnRoIDogJzAnICsgdGhpcy5fdmlld01vbnRofWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fc2V0WWVhciA9IE51bWJlcih0aGlzLnZhbHVlLnNsaWNlKDAsIDQpKTtcbiAgICAgICAgdGhpcy5fc2V0TW9udGggPSBOdW1iZXIodGhpcy52YWx1ZS5zbGljZSg0LCA2KSk7XG4gICAgICAgIHRoaXMuX3NldERheSA9IE51bWJlcih0aGlzLnZhbHVlLnNsaWNlKDYsIDgpKTtcbiAgICAgICAgdGhpcy5fc3Bpbm5lclBpY2tlclZpZXcodGhpcy5fc2V0WWVhciwgdGhpcy5fc2V0TW9udGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2V0WWVhciA9IHRoaXMudG9ZZWFyO1xuICAgICAgICB0aGlzLl9zZXRNb250aCA9IHRoaXMudG9Nb250aCArIDE7XG4gICAgICAgIHRoaXMuX3NldERheSA9IHRoaXMudG9EYXk7XG4gICAgICAgIHRoaXMuX3NwaW5uZXJQaWNrZXJWaWV3KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5fb3BlbigpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ2xpY2tIYW5kbGVyKCk7XG4gIH1cblxuICAvKlxuICAgKiAgZGF5IFVJIOyymOumrCDrpqzthLQg6rCS7J2AIExpdC1lbGVtZW50IOydmCBUZW1wbGF0ZVJlc3VsdCDtg4DsnoXsnZgg6rCS7J2EIOumrO2EtCDtlZzri6QuXG4gICAqICovXG5cbiAgcHJpdmF0ZSBfZGF5UGlja2VyVmlldyh5PzogbnVtYmVyLCBtPzogbnVtYmVyKTogVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0IF9kYXRlVmlldzogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG4gICAgbGV0IHRvZGF5WWVhciA9IHRoaXMudG9ZZWFyO1xuICAgIGxldCB0b2RheU1vbnRoID0gdGhpcy50b01vbnRoO1xuICAgIF9kYXRlVmlldy5wdXNoKGh0bWxgIDxzcGFuIGNsYXNzPVwiZGF5LW5hbWVcIj7snbw8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRheS1uYW1lXCI+7JuUPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkYXktbmFtZVwiPu2ZlDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LW5hbWVcIj7siJg8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRheS1uYW1lXCI+66qpPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkYXktbmFtZVwiPuq4iDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LW5hbWVcIj7thqA8L3NwYW4+YCk7XG4gICAgaWYgKHkgIT09IHVuZGVmaW5lZCAmJiBtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRvZGF5WWVhciA9IHk7XG4gICAgICB0b2RheU1vbnRoID0gbSAtIDE7XG4gICAgfVxuICAgIGNvbnN0IHRoZURhdGU6IERhdGUgPSBuZXcgRGF0ZSh0b2RheVllYXIsIHRvZGF5TW9udGgsIDEpO1xuICAgIGNvbnN0IGZpcnN0RGF5ID0gdGhlRGF0ZS5nZXREYXkoKTtcbiAgICBsZXQgeWVhckRpc2FibGVkID0gZmFsc2U7XG4gICAgbGV0IG1vbnRoRGlzYWJsZWQgPSBmYWxzZTtcbiAgICBsZXQgZGF5TWF4Q2hlY2sgPSBmYWxzZTtcbiAgICBsZXQgZGF5TWluQ2hlY2sgPSBmYWxzZTtcbiAgICBpZiAodG9kYXlZZWFyID49IE51bWJlcih0aGlzLm1heD8uc2xpY2UoMCwgNCkpKSB7XG4gICAgICBpZiAodG9kYXlZZWFyID4gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCA0KSkpIHtcbiAgICAgICAgeWVhckRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodG9kYXlNb250aCArIDEgPj0gTnVtYmVyKHRoaXMubWF4Py5zbGljZSg0LCA2KSkpIHtcbiAgICAgICAgaWYgKHRvZGF5TW9udGggKyAxID4gTnVtYmVyKHRoaXMubWF4Py5zbGljZSg0LCA2KSkpIHtcbiAgICAgICAgICBtb250aERpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXlNYXhDaGVjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRvZGF5WWVhciA8PSBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDQpKSkge1xuICAgICAgaWYgKHRvZGF5WWVhciA8IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoMCwgNCkpKSB7XG4gICAgICAgIHllYXJEaXNhYmxlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRvZGF5TW9udGggKyAxIDw9IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoNCwgNikpKSB7XG4gICAgICAgIGlmICh0b2RheU1vbnRoICsgMSA8IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoNCwgNikpKSB7XG4gICAgICAgICAgbW9udGhEaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF5TWluQ2hlY2sgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvZGF5WWVhciAlIDQwMCA9PSAwIHx8ICh0b2RheVllYXIgJSA0ID09IDAgJiYgdG9kYXlZZWFyICUgMTAwICE9IDApKSB7XG4gICAgICB0aGlzLmxhc3REYXlbMV0gPSAyOTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sYXN0RGF5WzFdID0gMjg7XG4gICAgfVxuICAgIGNvbnN0IGxhc3REYXRlID0gdGhpcy5sYXN0RGF5W3RvZGF5TW9udGhdO1xuICAgIGxldCBjb3VudCA9IDE7XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5jZWlsKChmaXJzdERheSArIGxhc3REYXRlKSAvIDcpICsgMTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8PSA3OyBqKyspIHtcbiAgICAgICAgaWYgKChpID09IDEgJiYgaiA8PSBmaXJzdERheSkgfHwgY291bnQgPiBsYXN0RGF0ZSkge1xuICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwiZGF5IGRheS1kaXNhYmxlZFwiPlxuICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaiA9PT0gMSB8fCBqID09PSA3KSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHllYXJEaXNhYmxlZCB8fFxuICAgICAgICAgICAgICBtb250aERpc2FibGVkIHx8XG4gICAgICAgICAgICAgIChkYXlNYXhDaGVjayAmJiBjb3VudCA+IE51bWJlcih0aGlzLm1heD8uc2xpY2UoNiwgOCkpKSB8fFxuICAgICAgICAgICAgICAoZGF5TWluQ2hlY2sgJiYgY291bnQgPCBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDYsIDgpKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXkgZGF5LWRpc2FibGVkXCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICB0aGlzLl9zZXRNb250aCA9PT0gdG9kYXlNb250aCArIDEgJiZcbiAgICAgICAgICAgICAgdGhpcy5fc2V0WWVhciA9PSB0b2RheVllYXIgJiZcbiAgICAgICAgICAgICAgY291bnQgPT09IHRoaXMuX3NldERheSAmJlxuICAgICAgICAgICAgICAhdGhpcy5oZERpc2FibGVkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgICAgICAgaHRtbGA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF5IHNlbGVjdFwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtdmFsdWU9XCIke2NvdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5oZERpc2FibGVkID8gbnVsbCA6IHRoaXMuX2RheUNsaWNrSGFuZGxlcn1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwiZGF5IHdlZWtlbmQgc2VsZWN0XCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCIgQGNsaWNrPVwiJHt0aGlzLl9kYXlDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICAgIGh0bWxgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImRheVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtdmFsdWU9XCIke2NvdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljaz1cIiR7dGhpcy5oZERpc2FibGVkID8gbnVsbCA6IHRoaXMuX2RheUNsaWNrSGFuZGxlcn1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgICAgICAgaHRtbGA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiZGF5IHdlZWtlbmRcIlxuICAgICAgICAgICAgICAgICAgICBkYXRhLXZhbHVlPVwiJHtjb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCIke3RoaXMuaGREaXNhYmxlZCA/IG51bGwgOiB0aGlzLl9kYXlDbGlja0hhbmRsZXJ9XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IHRoaXMudG9EYXkgJiYgdGhpcy50b01vbnRoID09PSB0b2RheU1vbnRoICYmIHRoaXMudG9ZZWFyID09PSB0b2RheVllYXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXRNb250aCA9PT0gdG9kYXlNb250aCArIDEgJiYgdGhpcy5fc2V0WWVhciA9PSB0b2RheVllYXIgJiYgY291bnQgPT09IHRoaXMuX3NldERheSkge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXkgdG9kYXkgc2VsZWN0XCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCIgQGNsaWNrPVwiJHt0aGlzLl9kYXlDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXkgdG9kYXlcIiBkYXRhLXZhbHVlPVwiJHtjb3VudH1cIiBAY2xpY2s9XCIke3RoaXMuX2RheUNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICB5ZWFyRGlzYWJsZWQgfHxcbiAgICAgICAgICAgICAgbW9udGhEaXNhYmxlZCB8fFxuICAgICAgICAgICAgICAoZGF5TWF4Q2hlY2sgJiYgY291bnQgPiBOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDYsIDgpKSkgfHxcbiAgICAgICAgICAgICAgKGRheU1pbkNoZWNrICYmIGNvdW50IDwgTnVtYmVyKHRoaXMubWluPy5zbGljZSg2LCA4KSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgX2RhdGVWaWV3LnB1c2goXG4gICAgICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwiZGF5IGRheS1kaXNhYmxlZFwiIGRhdGEtdmFsdWU9XCIke2NvdW50fVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXRNb250aCA9PT0gdG9kYXlNb250aCArIDEgJiYgdGhpcy5fc2V0WWVhciA9PSB0b2RheVllYXIgJiYgY291bnQgPT09IHRoaXMuX3NldERheSkge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXkgc2VsZWN0XCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCIgQGNsaWNrPVwiJHt0aGlzLl9kYXlDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXlcIiBkYXRhLXZhbHVlPVwiJHtjb3VudH1cIiBAY2xpY2s9XCIke3RoaXMuX2RheUNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZGF0ZVwiPiR7X2RhdGVWaWV3fTwvZGl2PmA7XG4gIH1cblxuICAvKlxuICAgKiAgbW9udGggVUkg7LKY66asIOumrO2EtCDqsJLsnYAgTGl0LWVsZW1lbnQg7J2YIFRlbXBsYXRlUmVzdWx0IO2DgOyeheydmCDqsJLsnYQg66as7YS0IO2VnOuLpC5cbiAgICogKi9cbiAgcHJpdmF0ZSBfbW9udGhQaWNrZXJWaWV3KHk/OiBudW1iZXIpOiBUZW1wbGF0ZVJlc3VsdCB7XG4gICAgY29uc3QgX21vdW50VmlldzogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG4gICAgbGV0IHRvZGF5WWVhcjogbnVtYmVyID0gdGhpcy50b1llYXI7XG4gICAgaWYgKHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdG9kYXlZZWFyID0geTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xuICAgICAgaWYgKHRvZGF5WWVhciA9PT0gdGhpcy5fc2V0WWVhciAmJiBpID09PSB0aGlzLl9zZXRNb250aCkge1xuICAgICAgICBfbW91bnRWaWV3LnB1c2goXG4gICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwibW9udGggc2VsZWN0XCIgZGF0YS12YWx1ZT1cIiR7aX1cIiBAY2xpY2s9XCIke3RoaXMuX21vbnRoQ2xpY2tIYW5kbGVyfVwiPjxzcGFuPiR7aX08L3NwYW4+PC9kaXY+YFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdG9kYXlZZWFyID4gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCA0KSkgfHxcbiAgICAgICAgKHRvZGF5WWVhciA9PT0gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCA0KSkgJiYgaSA+IE51bWJlcih0aGlzLm1heD8uc2xpY2UoNCwgNikpKVxuICAgICAgKSB7XG4gICAgICAgIF9tb3VudFZpZXcucHVzaChcbiAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJtb250aCBtb250aC1kaXNhYmxlZFwiIGRhdGEtdmFsdWU9XCIke2l9XCIgQGNsaWNrPVwiJHt0aGlzLl9tb250aENsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7aX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+YFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgdG9kYXlZZWFyIDwgTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCA0KSkgfHxcbiAgICAgICAgKHRvZGF5WWVhciA9PT0gTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCA0KSkgJiYgaSA8IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoNCwgNikpKVxuICAgICAgKSB7XG4gICAgICAgIF9tb3VudFZpZXcucHVzaChcbiAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJtb250aCBtb250aC1kaXNhYmxlZFwiIGRhdGEtdmFsdWU9XCIke2l9XCIgQGNsaWNrPVwiJHt0aGlzLl9tb250aENsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7aX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+YFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX21vdW50Vmlldy5wdXNoKFxuICAgICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cIm1vbnRoXCIgZGF0YS12YWx1ZT1cIiR7aX1cIiBAY2xpY2s9XCIke3RoaXMuX21vbnRoQ2xpY2tIYW5kbGVyfVwiPjxzcGFuPiR7aX08L3NwYW4+PC9kaXY+YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItbW9udGhcIj4ke19tb3VudFZpZXd9PC9kaXY+YDtcbiAgfVxuXG4gIC8qXG4gICAqICB5ZWFyIFVJIOyymOumrCDrpqzthLQg6rCS7J2AIExpdC1lbGVtZW50IOydmCBUZW1wbGF0ZVJlc3VsdCDtg4DsnoXsnZgg6rCS7J2EIOumrO2EtCDtlZzri6QuXG4gICAqICovXG4gIHByaXZhdGUgX3llYXJQaWNrZXJWaWV3KHk/OiBudW1iZXIpOiBUZW1wbGF0ZVJlc3VsdCB7XG4gICAgbGV0IHRvWWVhcjogbnVtYmVyID0gdGhpcy50b1llYXI7XG4gICAgY29uc3QgX3llYXJWaWV3OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcbiAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0b1llYXIgPSB5O1xuICAgIH1cbiAgICBjb25zdCB0b2RheVllYXJTdGFydCA9ICh0b1llYXIgLyAxMCkgKiAxMCAtIDEgLSAodG9ZZWFyICUgMTApO1xuICAgIGNvbnN0IHRvZGF5WWVhckVuZCA9ICh0b1llYXIgLyAxMCkgKiAxMCArIDEwIC0gKHRvWWVhciAlIDEwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgdG9kYXlZZWFyU3RhcnQgKyBpIDw9IHRvZGF5WWVhckVuZDsgaSsrKSB7XG4gICAgICBpZiAodG9kYXlZZWFyU3RhcnQgKyBpID09PSB0b2RheVllYXJTdGFydCB8fCB0b2RheVllYXJTdGFydCArIGkgPT09IHRvZGF5WWVhckVuZCkge1xuICAgICAgICBfeWVhclZpZXcucHVzaChcbiAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJ5ZWFyIHllYXItZGlzYWJsZWRcIiBkYXRhLXZhbHVlPVwiJHt0b2RheVllYXJTdGFydCArIGl9XCIgQGNsaWNrPVwiJHt0aGlzLl95ZWFyQ2xpY2tIYW5kbGVyfVwiPlxuICAgICAgICAgICAgPHNwYW4+JHt0b2RheVllYXJTdGFydCArIGl9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0b2RheVllYXJTdGFydCArIGkgPT09IHRoaXMuX3NldFllYXIpIHtcbiAgICAgICAgICBfeWVhclZpZXcucHVzaChcbiAgICAgICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cInllYXIgc2VsZWN0XCIgZGF0YS12YWx1ZT1cIiR7dG9kYXlZZWFyU3RhcnQgKyBpfVwiIEBjbGljaz1cIiR7dGhpcy5feWVhckNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgPHNwYW4+JHt0b2RheVllYXJTdGFydCArIGl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgdG9kYXlZZWFyU3RhcnQgKyBpID4gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCA0KSkgfHxcbiAgICAgICAgICB0b2RheVllYXJTdGFydCArIGkgPCBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDQpKVxuICAgICAgICApIHtcbiAgICAgICAgICBfeWVhclZpZXcucHVzaChcbiAgICAgICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cInllYXIgeWVhci1kaXNhYmxlZFwiIGRhdGEtdmFsdWU9XCIke3RvZGF5WWVhclN0YXJ0ICsgaX1cIiBAY2xpY2s9XCIke3RoaXMuX3llYXJDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dG9kYXlZZWFyU3RhcnQgKyBpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF95ZWFyVmlldy5wdXNoKFxuICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwieWVhclwiIGRhdGEtdmFsdWU9XCIke3RvZGF5WWVhclN0YXJ0ICsgaX1cIiBAY2xpY2s9XCIke3RoaXMuX3llYXJDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dG9kYXlZZWFyU3RhcnQgKyBpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJjYWxlbmRhci15ZWFyXCI+JHtfeWVhclZpZXd9PC9kaXY+YDtcbiAgfVxuXG4gIC8vIOyKpO2UvOuEiCBVSSDsg53shLFcbiAgcHJpdmF0ZSBfc3Bpbm5lclBpY2tlclZpZXcoeT86IG51bWJlciwgbT86IG51bWJlcik6IHZvaWQge1xuICAgIGxldCB5ZWFyOiBudW1iZXIgPSB0aGlzLnRvWWVhcjtcbiAgICBsZXQgbW9udGg6IG51bWJlciA9IHRoaXMudG9Nb250aDtcbiAgICB0aGlzLiRzcGlubmVyRGF5ID0gW107XG4gICAgdGhpcy4kc3Bpbm5lclllYXIgPSBbXTtcbiAgICB0aGlzLiRzcGlubmVyTW9udGggPSBbXTtcbiAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB5ZWFyID0geTtcbiAgICAgIGlmIChtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbW9udGggPSBtO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCB5ZWFyTWluID0gTnVtYmVyKHRoaXMubWluIS5zbGljZSgwLCA0KSk7XG4gICAgY29uc3QgeWVhck1heCA9IE51bWJlcih0aGlzLm1heCEuc2xpY2UoMCwgNCkpO1xuXG4gICAgaWYgKHllYXIhICUgNDAwID09IDAgfHwgKHllYXIhICUgNCA9PSAwICYmIHllYXIgJSAxMDAgIT0gMCkpIHtcbiAgICAgIHRoaXMubGFzdERheVsxXSA9IDI5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxhc3REYXlbMV0gPSAyODtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0RGF0ZTogbnVtYmVyID0gdGhpcy5sYXN0RGF5W21vbnRoIV07XG5cbiAgICBmb3IgKGxldCBpID0gMDsgeWVhck1pbiArIGkgPD0geWVhck1heDsgaSsrKSB7XG4gICAgICAvLyDrhYTrj4Qg7IOd7ISxXG4gICAgICBpZiAoeWVhck1pbiArIGkgPT09IHRoaXMudG9ZZWFyKSB7XG4gICAgICAgIHRoaXMuJHNwaW5uZXJZZWFyLnB1c2goXG4gICAgICAgICAgaHRtbGA8bGkgY2xhc3M9XCJ0b2RheVwiIGRhdGEtdmFsdWU9XCIke3llYXJNaW4gKyBpfVwiIGRhdGEtaW5kZXg9XCIke2l9XCI+XG4gICAgICAgICAgICA8YnV0dG9uPiR7eWVhck1pbiArIGl9PC9idXR0b24+XG4gICAgICAgICAgPC9saT5gXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLiRzcGlubmVyWWVhci5wdXNoKFxuICAgICAgICAgIGh0bWxgPGxpIGRhdGEtdmFsdWU9XCIke3llYXJNaW4gKyBpfVwiIGRhdGEtaW5kZXg9XCIke2l9XCI+PGJ1dHRvbj4ke3llYXJNaW4gKyBpfTwvYnV0dG9uPjwvbGk+YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gfVxuICAgIH1cblxuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDEyOyBqKyspIHtcbiAgICAgIC8vIOuLrCDsg53shLFcbiAgICAgIGlmICh5ZWFyTWluICE9PSB5ZWFyIHx8ICh5ZWFyTWluID09PSB5ZWFyICYmIGogPj0gTnVtYmVyKHRoaXMubWluPy5zbGljZSg0LCA2KSkpKSB7XG4gICAgICAgIGlmICh5ZWFyTWF4ICE9PSB5ZWFyIHx8ICh5ZWFyTWF4ID09PSB5ZWFyICYmIGogPD0gTnVtYmVyKHRoaXMubWF4Py5zbGljZSg0LCA2KSkpKSB7XG4gICAgICAgICAgaWYgKGogPT09IHRoaXMudG9Nb250aCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMuJHNwaW5uZXJNb250aC5wdXNoKFxuICAgICAgICAgICAgICBodG1sYCA8bGkgY2xhc3M9XCJ0b2RheVwiIGRhdGEtdmFsdWU9XCIke2p9XCIgZGF0YS1pbmRleD1cIiR7an1cIj48YnV0dG9uPiR7an08L2J1dHRvbj48L2xpPiBgXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzcGlubmVyTW9udGgucHVzaChodG1sYCA8bGkgZGF0YS12YWx1ZT1cIiR7an1cIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+JHtqfTwvYnV0dG9uPjwvbGk+IGApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGsgPSAxOyBrIDw9IGxhc3REYXRlOyBrKyspIHtcbiAgICAgIC8vIOydvCDsg53shLFcbiAgICAgIGlmIChcbiAgICAgICAgeWVhck1pbiAhPT0geWVhciB8fFxuICAgICAgICAoeWVhck1pbiA9PT0geWVhciAmJiBtb250aCArIDEgPj0gTnVtYmVyKHRoaXMubWluPy5zbGljZSg0LCA2KSkgJiYgayA+PSBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDYsIDgpKSlcbiAgICAgICkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgeWVhck1heCAhPT0geWVhciB8fFxuICAgICAgICAgICh5ZWFyTWF4ID09PSB5ZWFyICYmIG1vbnRoICsgMSA8PSBOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDQsIDYpKSAmJiBrIDw9IE51bWJlcih0aGlzLm1heD8uc2xpY2UoNiwgOCkpKVxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoayA9PT0gdGhpcy50b0RheSkge1xuICAgICAgICAgICAgdGhpcy4kc3Bpbm5lckRheS5wdXNoKFxuICAgICAgICAgICAgICBodG1sYCA8bGkgY2xhc3M9XCJ0b2RheVwiIGRhdGEtdmFsdWU9XCIke2t9XCIgZGF0YS1pbmRleD1cIiR7a31cIj48YnV0dG9uPiR7a308L2J1dHRvbj48L2xpPmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNwaW5uZXJEYXkucHVzaChodG1sYCA8bGkgZGF0YS12YWx1ZT1cIiR7a31cIiBkYXRhLWluZGV4PVwiJHtrfVwiPjxidXR0b24+JHtrfTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gaW5wdXQg7YG066at7IucIO2PrOy7pOyKpCDsnITsuZgg7KGw7KCVXG4gIHByaXZhdGUgX2lucHV0Q2xpY2tIYW5kbGVyKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgMCk7XG4gIH1cblxuICAvLyAg6rCBIG7sm5Qg7YG066atIO2VuOuTpOufrFxuICBwcml2YXRlIF9tb250aENsaWNrSGFuZGxlcihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgJGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyLW1vbnRoJykuZm9yRWFjaCgkY2FsZW5kYXIgPT4ge1xuICAgICAgJGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QnKS5mb3JFYWNoKCRlbCA9PiB7XG4gICAgICAgICRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgICRlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICB0aGlzLl92aWV3TW9udGggPSBOdW1iZXIoJGVsLmRhdGFzZXQudmFsdWUpO1xuICAgIHRoaXMuX21vZGVWaWV3U2V0KCk7XG4gICAgdGhpcy5fbW9kZUNoYW5nZSgnZGF5Jyk7XG4gIH1cblxuICAvLyDsnoXroKXtlZwg6rCS7J20IOyIq+yekOyduOyngCDrrLjsnpDsnbjsp4Ag7YyQ67OE7ZuEIOqwkiDsoJzqsbBcbiAgcHJpdmF0ZSBfYmVmb3JlSW5wdXRIYW5kbGVyKGU6IElucHV0RXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCAkZWw6IEhUTUxJbnB1dEVsZW1lbnQgPSBlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGlmICgoL1xcZC8uZXhlYyhlLmRhdGEhKSA9PSBudWxsICYmIGUuZGF0YSAhPSBudWxsKSB8fCAoJGVsLnNlbGVjdGlvblN0YXJ0ISA+IDkgJiYgZS5kYXRhICE9IG51bGwpKSB7XG4gICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5wdXQg7J6F66ClIOyymOumrFxuICBwcml2YXRlIF9pbnB1dEhhbmRsZXIoZTogSW5wdXRFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0ICRlbDogSFRNTElucHV0RWxlbWVudCA9IGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWYgKGUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgbGV0IGN1cnNvcjogbnVtYmVyID0gJGVsLnNlbGVjdGlvblN0YXJ0IGFzIG51bWJlcjtcblxuICAgICAgJGVsLnZhbHVlID0gJGVsLnZhbHVlLnNsaWNlKDAsICRlbC5zZWxlY3Rpb25TdGFydCEpICsgJGVsLnZhbHVlLnNsaWNlKCRlbC5zZWxlY3Rpb25TdGFydCEgKyAxLCAxMSk7XG4gICAgICBpZiAoY3Vyc29yID09PSA0KSB7XG4gICAgICAgIHRoaXMueWVhck1pbkNoZWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMueWVhck1heENoZWNrID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IHllYXI6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcigkZWwudmFsdWUuc2xpY2UoMCwgNCkpO1xuICAgICAgICBjb25zdCBtaW46IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcih0aGlzLm1pbiEuc2xpY2UoMCwgNCkpO1xuICAgICAgICBjb25zdCBtYXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcih0aGlzLm1heCEuc2xpY2UoMCwgNCkpO1xuICAgICAgICBpZiAoeWVhciA8IG1pbikge1xuICAgICAgICAgICRlbC52YWx1ZSA9IGAke21pbn1gICsgJGVsLnZhbHVlLnNsaWNlKDQsIDEwKTtcbiAgICAgICAgICB0aGlzLnllYXJNaW5DaGVjayA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoeWVhciA+IG1heCkge1xuICAgICAgICAgICRlbC52YWx1ZSA9IGAke21heH1gICsgJGVsLnZhbHVlLnNsaWNlKDQsIDEwKTtcbiAgICAgICAgICB0aGlzLnllYXJNYXhDaGVjayA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3Bpbm5lcikge1xuICAgICAgICAgIHRoaXMuX3NldFllYXIgPSBOdW1iZXIoJGVsLnZhbHVlLnNsaWNlKDAsIDQpKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyUmVtb3ZlKCk7XG5cbiAgICAgICAgICB0aGlzLl9zcGlubmVyUGlja2VyVmlldyh0aGlzLl9zZXRZZWFyLCB0aGlzLl9zZXRNb250aCEgLSAxKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyWWVhclNlbGVjdCgpO1xuICAgICAgICAgIHRoaXMuX3NwaW5uZXJZZWFyQ2hhbmdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3Vyc29yKys7XG4gICAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gNykge1xuICAgICAgICB0aGlzLm1vbnRoTWluQ2hlY2sgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgbW9udGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcigkZWwudmFsdWUuc2xpY2UoNSwgNykpO1xuICAgICAgICBjb25zdCBtaW46IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoNCwgNikpO1xuICAgICAgICBjb25zdCBtYXg6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcih0aGlzLm1heD8uc2xpY2UoNCwgNikpO1xuXG4gICAgICAgIGlmIChtb250aCA8IG1pbiAmJiB0aGlzLnllYXJNaW5DaGVjaykge1xuICAgICAgICAgIC8vIG1pbiBjaGVja1xuICAgICAgICAgIHRoaXMubW9udGhNaW5DaGVjayA9IHRydWU7XG4gICAgICAgICAgJGVsLnZhbHVlID0gJGVsLnZhbHVlLnNsaWNlKDAsIDUpICsgYCR7bWlufWAgKyAkZWwudmFsdWUuc2xpY2UoNywgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKG1vbnRoID4gbWF4ICYmIHRoaXMueWVhck1heENoZWNrKSB7XG4gICAgICAgICAgLy8gbWF4Q2hlY2tcbiAgICAgICAgICB0aGlzLm1vbnRoTWF4Q2hlY2sgPSB0cnVlO1xuICAgICAgICAgICRlbC52YWx1ZSA9ICRlbC52YWx1ZS5zbGljZSgwLCA1KSArIGAke21heH1gICsgJGVsLnZhbHVlLnNsaWNlKDcsIDEwKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb250aCA9PT0gMCkge1xuICAgICAgICAgICRlbC52YWx1ZSA9ICRlbC52YWx1ZS5zbGljZSgwLCA1KSArICcwMScgKyAkZWwudmFsdWUuc2xpY2UoNywgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKG1vbnRoID4gMTIpIHtcbiAgICAgICAgICAkZWwudmFsdWUgPSAkZWwudmFsdWUuc2xpY2UoMCwgNSkgKyAnMTInICsgJGVsLnZhbHVlLnNsaWNlKDcsIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zcGlubmVyKSB7XG4gICAgICAgICAgdGhpcy5fc2V0WWVhciA9IE51bWJlcigkZWwudmFsdWUuc2xpY2UoMCwgNCkpO1xuICAgICAgICAgIHRoaXMuX3NldE1vbnRoID0gTnVtYmVyKCRlbC52YWx1ZS5zbGljZSg1LCA3KSk7XG4gICAgICAgICAgdGhpcy5fc3Bpbm5lclBpY2tlclZpZXcodGhpcy5fc2V0WWVhciwgdGhpcy5fc2V0TW9udGggLSAxKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyUmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5fc3Bpbm5lclllYXJTZWxlY3QoKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyTW9udGhTZWxlY3QoKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyRGF5UG9zaXRpb25DaGFuZ2UoMCk7XG4gICAgICAgIH1cbiAgICAgICAgY3Vyc29yKys7XG4gICAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gMTApIHtcbiAgICAgICAgY29uc3QgeWVhcjogbnVtYmVyIHwgdW5kZWZpbmVkID0gTnVtYmVyKCRlbC52YWx1ZS5zbGljZSgwLCA0KSk7XG4gICAgICAgIGNvbnN0IG1vbnRoOiBudW1iZXIgfCB1bmRlZmluZWQgPSBOdW1iZXIoJGVsLnZhbHVlLnNsaWNlKDUsIDcpKTtcbiAgICAgICAgY29uc3QgZGF5OiBudW1iZXIgfCB1bmRlZmluZWQgPSBOdW1iZXIoJGVsLnZhbHVlLnNsaWNlKDgsIDEwKSk7XG4gICAgICAgIGNvbnN0IG1pbiA9IE51bWJlcih0aGlzLm1pbiEuc2xpY2UoNiwgOCkpO1xuICAgICAgICBjb25zdCBtYXggPSBOdW1iZXIodGhpcy5tYXghLnNsaWNlKDYsIDgpKTtcblxuICAgICAgICBpZiAoeWVhciEgJSA0MDAgPT0gMCB8fCAoeWVhciEgJSA0ID09IDAgJiYgeWVhciEgJSAxMDAgIT0gMCkpIHtcbiAgICAgICAgICB0aGlzLmxhc3REYXlbMV0gPSAyOTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxhc3REYXlbMV0gPSAyODtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsYXN0RGF5OiBudW1iZXIgfCB1bmRlZmluZWQgPSB0aGlzLmxhc3REYXlbTnVtYmVyKCRlbC52YWx1ZS5zbGljZSg1LCA3KSkgLSAxXTtcblxuICAgICAgICBpZiAoZGF5ID4gbGFzdERheSkge1xuICAgICAgICAgIC8vIOy1nOuMgCDsnbwg7KCQ6rKAXG4gICAgICAgICAgaWYgKHRoaXMubW9udGhNYXhDaGVjaykge1xuICAgICAgICAgICAgJGVsLnZhbHVlID0gJGVsLnZhbHVlLnNsaWNlKDAsIDgpICsgYCR7bWF4fWA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICRlbC52YWx1ZSA9ICRlbC52YWx1ZS5zbGljZSgwLCA4KSArIGAke2xhc3REYXl9YDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGF5IDwgMSAmJiAhdGhpcy5tb250aE1pbkNoZWNrKSB7XG4gICAgICAgICAgLy8g7LWc7IaMIOydvCDsoJDqsoBcbiAgICAgICAgICAkZWwudmFsdWUgPSAkZWwudmFsdWUuc2xpY2UoMCwgOCkgKyAnMDEnO1xuICAgICAgICB9IGVsc2UgaWYgKGRheSA8IG1pbiAmJiB0aGlzLm1vbnRoTWluQ2hlY2spIHtcbiAgICAgICAgICAvLyDqsJzrsJzsnpDqsIAg7KeA7KCV7ZWcIOy1nOyGjOydvCDtmZXsnbhcbiAgICAgICAgICAkZWwudmFsdWUgPSAkZWwudmFsdWUuc2xpY2UoMCwgOCkgKyBgJHttaW59YDtcbiAgICAgICAgfSBlbHNlIGlmIChkYXkgPiBtYXggJiYgdGhpcy5tb250aE1heENoZWNrKSB7XG4gICAgICAgICAgLy8g6rCc67Cc7J6Q6rCAIOyngOygle2VnCDstZzrjIDsnbwg7ZmV7J24XG4gICAgICAgICAgJGVsLnZhbHVlID0gJGVsLnZhbHVlLnNsaWNlKDAsIDgpICsgYCR7bWF4fWA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbW9kZSA9ICdtb250aCc7XG4gICAgICAgIHRoaXMuX3NldERheSA9IE51bWJlcigkZWwudmFsdWUuc2xpY2UoOCwgMTApKTtcbiAgICAgICAgdGhpcy5fc2V0WWVhciA9IHllYXI7XG4gICAgICAgIHRoaXMuX3NldE1vbnRoID0gbW9udGg7XG5cbiAgICAgICAgaWYgKHRoaXMuX3NldFllYXIgPT09IHRoaXMuX3ZpZXdZZWFyICYmIHRoaXMuX3NldE1vbnRoID09PSB0aGlzLl92aWV3TW9udGggJiYgdGhpcy5fc2V0RGF5ID09IHRoaXMuX3ZpZXdEYXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmlld0RheSA9IHRoaXMuX3NldERheTtcbiAgICAgICAgdGhpcy5fdmlld1llYXIgPSB5ZWFyO1xuICAgICAgICB0aGlzLl92aWV3TW9udGggPSBtb250aDtcbiAgICAgICAgaWYgKCF0aGlzLnNwaW5uZXIpIHtcbiAgICAgICAgICB0aGlzLl9zZWxlY3RSZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9tb2RlVmlld1NldCgpO1xuICAgICAgICAgIHRoaXMuX21vZGVDaGFuZ2UoJ2RheScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3NwaW5uZXJSZW1vdmUoKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyWWVhclNlbGVjdCgpO1xuICAgICAgICAgIHRoaXMuX3NwaW5uZXJNb250aFNlbGVjdCgpO1xuXG4gICAgICAgICAgdGhpcy5fc3Bpbm5lckRheVNlbGVjdCgpO1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUNoZWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBgJHt0aGlzLl9zZXRZZWFyfS0ke3RoaXMuX3NldE1vbnRoISA+PSAxMCA/IHRoaXMuX3NldE1vbnRoIDogJzAnICsgdGhpcy5fc2V0TW9udGh9LSR7XG4gICAgICAgICAgdGhpcy5fc2V0RGF5ISA8IDEwID8gJzAnICsgdGhpcy5fc2V0RGF5IDogdGhpcy5fc2V0RGF5XG4gICAgICAgIH1gO1xuICAgICAgfVxuICAgICAgJGVsLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciEsIGN1cnNvciEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjdXJzb3I6IG51bWJlciA9ICRlbC5zZWxlY3Rpb25TdGFydCBhcyBudW1iZXI7XG4gICAgICBmb3IgKGxldCBpID0gMDsgJGVsLnZhbHVlIS5sZW5ndGggKyBpIDw9IDk7IGkrKykge1xuICAgICAgICBpZiAoY3Vyc29yID09PSA3IHx8IGN1cnNvciA9PT0gNCkge1xuICAgICAgICAgICRlbC52YWx1ZSA9ICRlbC52YWx1ZS5zbGljZSgwLCBjdXJzb3IgLSAxKSArICdfJyArICctJyArICRlbC52YWx1ZS5zbGljZShjdXJzb3IsIDkpO1xuICAgICAgICAgICRlbC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IhIC0gMSwgY3Vyc29yISAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbC52YWx1ZSA9ICRlbC52YWx1ZS5zbGljZSgwLCBjdXJzb3IpICsgJ18nICsgJGVsLnZhbHVlLnNsaWNlKGN1cnNvciwgOSk7XG4gICAgICAgICAgJGVsLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciEsIGN1cnNvciEpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5wdXRDaGFuZ2UoKSB7XG4gICAgdGhpcy5fdmFsdWUgPSBgJHt0aGlzLl9zZXRZZWFyfS0ke3RoaXMuX3NldE1vbnRoISA+PSAxMCA/IHRoaXMuX3NldE1vbnRoIDogJzAnICsgdGhpcy5fc2V0TW9udGh9LSR7XG4gICAgICB0aGlzLl9zZXREYXkhIDwgMTAgPyAnMCcgKyB0aGlzLl9zZXREYXkgOiB0aGlzLl9zZXREYXlcbiAgICB9YDtcbiAgICAodGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuaW5wdXQnKSEgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIC8vICDqsIEgbuydvCDtgbTrpq0g7ZW465Ok65+sXG4gIHByaXZhdGUgX2RheUNsaWNrSGFuZGxlcihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgLy8gaWYgKCF0aGlzLmhkRGlzYWJsZWQgJiYgKSB7XG4gICAgLy9cbiAgICAvLyB9XG4gICAgY29uc3QgJGVsOiBIVE1MRWxlbWVudCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9zZWxlY3RSZW1vdmUoKTtcbiAgICAkZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgdGhpcy5fc2V0WWVhciA9IHRoaXMuX3ZpZXdZZWFyO1xuICAgIHRoaXMuX3NldE1vbnRoID0gdGhpcy5fdmlld01vbnRoO1xuICAgIHRoaXMuX3NldERheSA9IE51bWJlcigoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKTtcbiAgICB0aGlzLl92aWV3RGF5ID0gdGhpcy5fc2V0RGF5O1xuICAgIHRoaXMuX2lucHV0Q2hhbmdlKCk7XG4gIH1cblxuICAvLyDrhYTrj4Qg7YG066atIO2VuOuTpOufrFxuICBwcml2YXRlIF95ZWFyQ2xpY2tIYW5kbGVyKGU6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgJGVsOiBIVE1MRWxlbWVudCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9zZWxlY3RSZW1vdmUoKTtcbiAgICAkZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgdGhpcy5fdmlld1llYXIgPSBOdW1iZXIoJGVsLmRhdGFzZXQudmFsdWUpO1xuICAgIHRoaXMuX21vZGVWaWV3U2V0KCk7XG4gICAgdGhpcy5fbW9kZUNoYW5nZSgnbW9udGgnKTtcbiAgfVxuXG4gIC8vIOyggeyaqeuyhO2KvCDtlbjrk6Trn6xcbiAgcHJpdmF0ZSBfY29uZmlybUNsaWNrSGFuZGxlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5oZERpc2FibGVkICYmICF0aGlzLnNwaW5uZXIpIHtcbiAgICAgIGNvbnN0ICRkYXkgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FsZW5kYXItZGF0ZScpWzFdXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCdkaXYnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGRheSEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKE51bWJlcigoJGRheSFbaV0gYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpID09PSB0aGlzLl9zZXREYXkpIHtcbiAgICAgICAgICBpZiAoaSA9PT0gMCB8fCBpICUgNyA9PT0gMCB8fCBpICUgNyA9PT0gNikge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2xpY2tIYW5kbGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLl92YWx1ZT8uaW5kZXhPZignXycpISA8IDApIHtcbiAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IHRoaXMuX3ZhbHVlO1xuICAgICAgdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICAvLyAgc2VsZWN0IO2BtOuemOyKpOulvCDsoJzqsbBcbiAgcHJpdmF0ZSBfc2VsZWN0UmVtb3ZlKCk6IHZvaWQge1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyLWRhdGUnKSEuZm9yRWFjaCgkY2FsZW5kYXIgPT4ge1xuICAgICAgJGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zZWxlY3QnKS5mb3JFYWNoKCRlbCA9PiB7XG4gICAgICAgICRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyLW1vbnRoJykhLmZvckVhY2goJGNhbGVuZGFyID0+IHtcbiAgICAgICRjYWxlbmRhci5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgICAkZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qXG4gICAqIOuLpOydjOuyhO2KvCBVSSDsspjrpqwg67CPIGFuaW1hdGlvbiDsspjrpqxcbiAgICogKi9cbiAgcHJpdmF0ZSBfYWZ0ZXJBbmltYXRpb24oKSB7XG4gICAgY29uc3QgJGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcihcbiAgICAgICcuY2FsZW5kYXItZmxpcC13cmFwJ1xuICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKHRoaXMuX3RvdWNoTW92ZVggPT09IDApIHtcbiAgICAgIHRoaXMuX3RvdWNoTW92ZVggPSAtKCRlbC5jbGllbnRXaWR0aCAvIDMpO1xuICAgIH1cbiAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy5fdG91Y2hNb3ZlWCEgKyB0aGlzLl9jb3VudCF9cHgsIDBweCwgMHB4KWA7XG4gICAgaWYgKE1hdGguYWJzKHRoaXMuX2NvdW50ISArIHRoaXMuX3RvdWNoTW92ZVghKSA8PSAoJGVsLmNsaWVudFdpZHRoIC8gMykgKiAyKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FmdGVyQW5pbWF0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb3VudCA9IDA7XG4gICAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7LU1hdGguYWJzKFxuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci1mbGlwLXdyYXAnKSEuY2xpZW50V2lkdGggLyAzXG4gICAgICApfXB4LCAwcHgsIDBweClgO1xuICAgICAgdGhpcy5fYWZ0ZXJWaWV3U2V0KCk7XG4gICAgICB0aGlzLl9tb2RlVmlld0NoYW5nZSgpO1xuICAgIH1cbiAgICB0aGlzLl9jb3VudCA9IHRoaXMuX2NvdW50ISAtIHRoaXMuc3BlZWQhO1xuICB9XG5cbiAgLy8g66qo65Oc67OA6rK9IOuyhO2KvCDtgbTrpq0g7ZW465Ok65+sXG4gIHByaXZhdGUgX21vZGVDbGlja0hhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fc2VsZWN0UmVtb3ZlKCk7XG4gICAgaWYgKHRoaXMuX21vZGUgPT09ICdkYXknKSB7XG4gICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fbW9udGhQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyISAtIDEpO1xuICAgICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX21vbnRoUGlja2VyVmlldyh0aGlzLl92aWV3WWVhcik7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhICsgMSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5feWVhclBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhIC0gMTApO1xuICAgICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX3llYXJQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyKTtcbiAgICAgIHRoaXMuX2FmdGVyVmlldyA9IHRoaXMuX3llYXJQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyISArIDEwKTtcbiAgICB9XG4gICAgdGhpcy5fbW9kZUNoYW5nZSgpO1xuICB9XG5cbiAgLy8g66qo65Oc66W8IOuzgOqyvSBkYXksIG1vbnRoLCB5ZWFyXG4gIHByaXZhdGUgX21vZGVDaGFuZ2UobW9kZT86ICdkYXknIHwgJ21vbnRoJyB8ICd5ZWFyJyk6IHZvaWQge1xuICAgIGlmIChtb2RlICE9IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9tb2RlID09PSAnZGF5Jykge1xuICAgICAgICB0aGlzLl9tb2RlID0gJ21vbnRoJztcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fbW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgICB0aGlzLl9tb2RlID0gJ3llYXInO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9tb2RlVmlld0NoYW5nZSgpO1xuICB9XG5cbiAgLy8gIOyDgeuLqOyXkCA8IDIwMjAtMTEgPiA8IDIwMjAgPiDrqqjrk5zsl5Ag65Sw6528IOuzgOqyvSDsspjrpqxcbiAgcHJpdmF0ZSBfbW9kZVZpZXdDaGFuZ2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX21vZGUgPT09ICdkYXknKSB7XG4gICAgICB0aGlzLl9tb2RlVmlldyA9IGAke3RoaXMuX3ZpZXdZZWFyfS0ke3RoaXMuX3ZpZXdNb250aCEgPj0gMTAgPyB0aGlzLl92aWV3TW9udGggOiAnMCcgKyB0aGlzLl92aWV3TW9udGh9YDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX21vZGUgPT09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuX21vZGVWaWV3ID0gYCR7dGhpcy5fdmlld1llYXJ9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW9kZVZpZXcgPSBgJHsodGhpcy5fdmlld1llYXIhIC8gMTApICogMTAgLSAodGhpcy5fdmlld1llYXIhICUgMTApfS0ke1xuICAgICAgICAodGhpcy5fdmlld1llYXIhIC8gMTApICogMTAgKyA5IC0gKHRoaXMuX3ZpZXdZZWFyISAlIDEwKVxuICAgICAgfWA7XG4gICAgfVxuICB9XG5cbiAgLy8gIOuLpOydjOuyhO2KvCBIVE1MIO2FnO2UjOumvyDshKTsoJVcbiAgcHJpdmF0ZSBfYWZ0ZXJWaWV3U2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdFJlbW92ZSgpO1xuICAgIGlmICh0aGlzLl9tb2RlID09PSAnZGF5Jykge1xuICAgICAgaWYgKHRoaXMuX3ZpZXdNb250aCEgKyAxID4gMTIpIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIsIDEyKTtcbiAgICAgICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhICsgMSwgMSk7XG4gICAgICAgIHRoaXMuX2FmdGVyVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhICsgMSwgMik7XG4gICAgICAgIHRoaXMuX3ZpZXdZZWFyISsrO1xuICAgICAgICB0aGlzLl92aWV3TW9udGggPSAxO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9udGghICsgMSA9PSAxMikge1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgMTEpO1xuICAgICAgICB0aGlzLl9ub3dWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgMTIpO1xuICAgICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyISArIDEsIDEpO1xuICAgICAgICB0aGlzLl92aWV3TW9udGghKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgdGhpcy5fdmlld01vbnRoKTtcbiAgICAgICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIsIHRoaXMuX3ZpZXdNb250aCEgKyAxKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgdGhpcy5fdmlld01vbnRoISArIDIpO1xuICAgICAgICB0aGlzLl92aWV3TW9udGghKys7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9tb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fbW9udGhQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyKTtcbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhICsgMSk7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhICsgMik7XG4gICAgICB0aGlzLl92aWV3WWVhciErKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX3llYXJQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyKTtcbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl95ZWFyUGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgKyAxMCk7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl95ZWFyUGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgKyAyMCk7XG4gICAgICB0aGlzLl92aWV3WWVhciA9IHRoaXMuX3ZpZXdZZWFyISArIDEwO1xuICAgIH1cbiAgfVxuXG4gIC8vICDshYvrsoTtirwgSFRNTCDthZztlIzrpr8g7ISk7KCVXG4gIHByaXZhdGUgX21vZGVWaWV3U2V0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9tb2RlID09PSAnbW9udGgnKSB7XG4gICAgICBpZiAodGhpcy5fdmlld01vbnRoISArIDEgPD0gMSkge1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgMTIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIsIHRoaXMuX3ZpZXdNb250aCEgLSAxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCB0aGlzLl92aWV3TW9udGgpO1xuICAgICAgaWYgKHRoaXMuX3ZpZXdNb250aCEgKyAxID4gMTIpIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FmdGVyVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIsIHRoaXMuX3ZpZXdNb250aCEgKyAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX21vZGUgPT09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX21vbnRoUGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgLSAxKTtcbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIpO1xuICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fbW9udGhQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyISArIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIOydtOyghOuyhO2KvCBVSSDsspjrpqwg67CPIGFuaW1hdGlvbiDsspjrpqxcbiAgICogKi9cbiAgcHJpdmF0ZSBfYmVmb3JlQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0ICRlbDogSFRNTEVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmNhbGVuZGFyLWZsaXAtd3JhcCdcbiAgICApIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl90b3VjaE1vdmVYID09PSAwKSB7XG4gICAgICB0aGlzLl90b3VjaE1vdmVYID0gLSgkZWwuY2xpZW50V2lkdGggLyAzKTtcbiAgICB9XG4gICAgJGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3RoaXMuX3RvdWNoTW92ZVghICsgdGhpcy5fY291bnQhfXB4LCAwcHgsIDBweClgO1xuICAgIGlmICh0aGlzLl9jb3VudCEgPD0gTWF0aC5hYnModGhpcy5fdG91Y2hNb3ZlWCEpKSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2JlZm9yZUFuaW1hdGlvbi5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY291bnQgPSAwO1xuICAgICAgJGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgkey1NYXRoLmFicyhcbiAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItZmxpcC13cmFwJykhLmNsaWVudFdpZHRoIC8gM1xuICAgICAgKX1weCwgMHB4LCAwcHgpYDtcbiAgICAgIHRoaXMuX2JlZm9yZVZpZXdTZXQoKTtcbiAgICAgIHRoaXMuX21vZGVWaWV3Q2hhbmdlKCk7XG4gICAgfVxuICAgIHRoaXMuX2NvdW50ID0gdGhpcy5fY291bnQhICsgdGhpcy5zcGVlZCE7XG4gIH1cblxuICAvLyB2aWV3IHRlbXBsYXRlIOyEpOyglVxuICBwcml2YXRlIF9iZWZvcmVWaWV3U2V0KCk6IHZvaWQge1xuICAgIHRoaXMuX3NlbGVjdFJlbW92ZSgpO1xuICAgIGlmICh0aGlzLl9tb2RlID09PSAnZGF5Jykge1xuICAgICAgaWYgKHRoaXMuX3ZpZXdNb250aCEgLSAxIDwgMSkge1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgLSAxLCAxMSk7XG4gICAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyISAtIDEsIDEyKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgMSk7XG4gICAgICAgIHRoaXMuX3ZpZXdZZWFyIS0tO1xuICAgICAgICB0aGlzLl92aWV3TW9udGggPSAxMjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vbnRoISAtIDEgPT0gMSkge1xuICAgICAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgLSAxLCAxMik7XG4gICAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCAxKTtcbiAgICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0aGlzLl92aWV3WWVhciwgMik7XG4gICAgICAgIHRoaXMuX3ZpZXdNb250aCEtLTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2JlZm9yZVZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCB0aGlzLl92aWV3TW9udGghIC0gMik7XG4gICAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRoaXMuX3ZpZXdZZWFyLCB0aGlzLl92aWV3TW9udGghIC0gMSk7XG4gICAgICAgIHRoaXMuX2FmdGVyVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodGhpcy5fdmlld1llYXIsIHRoaXMuX3ZpZXdNb250aCk7XG4gICAgICAgIHRoaXMuX3ZpZXdNb250aCEtLTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3NlbGVjdFJlbW92ZSgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fbW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX21vbnRoUGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgLSAyKTtcbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhIC0gMSk7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcodGhpcy5fdmlld1llYXIpO1xuICAgICAgdGhpcy5fdmlld1llYXIhLS07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2JlZm9yZVZpZXcgPSB0aGlzLl95ZWFyUGlja2VyVmlldyh0aGlzLl92aWV3WWVhciEgLSAyMCk7XG4gICAgICB0aGlzLl9ub3dWaWV3ID0gdGhpcy5feWVhclBpY2tlclZpZXcodGhpcy5fdmlld1llYXIhIC0gMTApO1xuICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5feWVhclBpY2tlclZpZXcodGhpcy5fdmlld1llYXIpO1xuICAgICAgdGhpcy5fdmlld1llYXIgPSB0aGlzLl92aWV3WWVhciEgLSAxMDtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiAg7ZiE7J6sIOuCoOynnCDsnbTrj5kg67KE7Yq8XG4gICAqICovXG4gIHByaXZhdGUgX25vd0NsaWNrSGFuZGxlcigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3Bpbm5lcikge1xuICAgICAgY29uc3QgdG9kYXk6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgdG9kYXlZZWFyOiBudW1iZXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xuICAgICAgY29uc3QgdG9kYXlNb250aDogbnVtYmVyID0gdG9kYXkuZ2V0TW9udGgoKTtcbiAgICAgIGNvbnN0IGRheSA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLmRheS50b2RheScpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgdGhpcy5fdmlld1llYXIgPSB0b2RheVllYXI7XG4gICAgICB0aGlzLl92aWV3TW9udGggPSB0b2RheU1vbnRoICsgMTtcbiAgICAgIHRoaXMuX3NldFllYXIgPSB0b2RheVllYXI7XG4gICAgICB0aGlzLl9zZXRNb250aCA9IHRvZGF5TW9udGggKyAxO1xuICAgICAgdGhpcy5fc2V0RGF5ID0gdG9kYXkuZ2V0RGF0ZSgpO1xuICAgICAgdGhpcy5fc2VsZWN0UmVtb3ZlKCk7XG4gICAgICBkYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICBpZiAodG9kYXlNb250aCA8IDEpIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9kYXlZZWFyIC0gMSwgMTIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9kYXlZZWFyLCB0b2RheU1vbnRoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vd1ZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRvZGF5WWVhciwgdG9kYXlNb250aCArIDEpO1xuICAgICAgaWYgKHRvZGF5TW9udGggPj0gMTEpIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0b2RheVllYXIgKyAxLCAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2FmdGVyVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9kYXlZZWFyLCB0b2RheU1vbnRoICsgMik7XG4gICAgICB9XG4gICAgICB0aGlzLl9pbnB1dENoYW5nZSgpO1xuICAgICAgdGhpcy5fbW9kZUNoYW5nZSgnZGF5Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0ICR5ZWFyRWw6IEVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyLXllYXItd3JhcCcpITtcbiAgICAgIGNvbnN0ICRtb250aEVsOiBFbGVtZW50ID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1tb250aC13cmFwJykhO1xuICAgICAgY29uc3QgJGRheUVsOiBFbGVtZW50ID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1kYXktd3JhcCcpITtcbiAgICAgIGNvbnN0IHllYXI6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcigoJHllYXJFbCEucXVlcnlTZWxlY3RvcignLnRvZGF5JykgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQuaW5kZXgpO1xuICAgICAgY29uc3QgbW9udGg6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcigoJG1vbnRoRWwhLnF1ZXJ5U2VsZWN0b3IoJy50b2RheScpIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LmluZGV4KSAtIDE7XG4gICAgICBjb25zdCBkYXk6IG51bWJlciB8IHVuZGVmaW5lZCA9IE51bWJlcigoJGRheUVsIS5xdWVyeVNlbGVjdG9yKCcudG9kYXknKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC5pbmRleCkgLSAxO1xuXG4gICAgICAoJHllYXJFbCEucXVlcnlTZWxlY3RvcignLm1vdmluZy1saXN0JykhLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke1xuICAgICAgICB5ZWFyICogMzVcbiAgICAgIH1weClgO1xuICAgICAgKCRtb250aEVsIS5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWxpc3QnKSEucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7XG4gICAgICAgIG1vbnRoICogMzVcbiAgICAgIH1weClgO1xuICAgICAgKCRkYXlFbCEucXVlcnlTZWxlY3RvcignLm1vdmluZy1saXN0JykhLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke1xuICAgICAgICBkYXkgKiAzNVxuICAgICAgfXB4KWA7XG5cbiAgICAgICR5ZWFyRWwhLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QnKSEuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgICAkbW9udGhFbCEucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpIS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICAgICRkYXlFbCEucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpIS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcblxuICAgICAgJHllYXJFbCEucXVlcnlTZWxlY3RvcignLnRvZGF5JykhLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgJG1vbnRoRWwhLnF1ZXJ5U2VsZWN0b3IoJy50b2RheScpIS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgICRkYXlFbCEucXVlcnlTZWxlY3RvcignLnRvZGF5JykhLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuXG4gICAgICB0aGlzLl9zZXRZZWFyID0gdGhpcy50b1llYXI7XG4gICAgICB0aGlzLl9zZXRNb250aCA9IHRoaXMudG9Nb250aCArIDE7XG4gICAgICB0aGlzLl9zZXREYXkgPSB0aGlzLnRvRGF5O1xuICAgICAgdGhpcy5faW5wdXRDaGFuZ2UoKTtcbiAgICAgIHRoaXMuX3JlbW92ZUNoZWNrID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmNoYW5nZUV2ZW50KTtcbiAgfVxuXG4gIC8qXG4gICAqICDri6TsnYwg7JqU7IaMIOyEoO2DnSDsspjrpqxcbiAgICogKi9cbiAgcHJpdmF0ZSBfYWZ0ZXJCdG5WaWV3KCk6IHZvaWQge1xuICAgIGNvbnN0ICRlbCA9IHRoaXMucGFyZW50RWxlbWVudCEuY2hpbGRyZW47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gJGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoJGVsLml0ZW0oaSkgPT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJJdGVtID0gaSArIDE7XG4gICAgICAgIGlmICgkZWwubGVuZ3RoID09IGkgKyAxKSB7XG4gICAgICAgICAgdGhpcy4kbmV4dEJ0biA9IGh0bWxgYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgICAgICAgJGVsLml0ZW0oaSArIDEpIS5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykgfHxcbiAgICAgICAgICAgICRlbC5pdGVtKGkgKyAxKSEubG9jYWxOYW1lID09PSAnZGV3cy1idXR0b24nIHx8XG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmxvY2FsTmFtZSA9PT0gJ2Rld3MtcmFkaW9idXR0b24tZ3JvdXAnIHx8XG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmxvY2FsTmFtZSA9PT0gJ2Rld3MtY2hlY2tib3gtZ3JvdXAnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGBgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGA8YnV0dG9uIGNsYXNzPVwibmV4dC1pY29uLWJ1dHRvblwiIEBjbGljaz1cIiR7dGhpcy5fbmV4dEJ0bkNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgPHNwYW4+64uk7J2MPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDrpqzshYvrsoTtirwg7YG066atIO2VuOuTpOufrFxuICBwcml2YXRlIF9yZW1vdmVDbGlja0hhbmRsZXIoKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWUgPSAnJztcbiAgICBpZiAoIXRoaXMuc3Bpbm5lcikge1xuICAgICAgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmlucHV0JykhIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gJ19fX18tX18tX18nO1xuICAgICAgdGhpcy5fc2V0TW9udGggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zZXRZZWFyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc2V0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc2VsZWN0UmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dCcpISBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9ICdfX19fLV9fLV9fJztcbiAgICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykgYXMgSFRNTEVsZW1lbnQpIS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgICAkZWwhLmNsYXNzTGlzdC5hZGQoJ2NsZWFyJyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX3JlbW92ZUNoZWNrID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuY2hhbmdlRXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW92ZUNoZWNrOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG5cbiAgLy8gIO2EsOy5mCDsnbTrsqTtirgg7LKY66asIGV4KSDsiqTsmYDsnbTtlIQg7Zqo6rO866W8IOychO2VtCDsspjrpqxcbiAgcHJpdmF0ZSBfdG91Y2hNb3ZlSGFuZGxlcihlOiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZUNoZWNrID0gdHJ1ZTtcbiAgICBsZXQgJGVsOiBIVE1MRWxlbWVudCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAkZWwgPSAkZWwuY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKCF0aGlzLnNwaW5uZXIpIHtcbiAgICAgIHRoaXMuX3RvdWNoTW92ZVggPVxuICAgICAgICBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC1cbiAgICAgICAgdGhpcy5fdG91Y2hTdGFydFBvaW50ISAtXG4gICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLmNhbGVuZGFyLWZsaXAtd3JhcCcpIS5jbGllbnRXaWR0aCAvIDM7XG4gICAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dGhpcy5fdG91Y2hNb3ZlWH1weCwgMHB4LCAwcHgpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGlIZWlnaHQ6IG51bWJlciA9ICRlbC5jbGllbnRIZWlnaHQ7XG4gICAgICB0aGlzLl90b3VjaE1vdmVZID0gdGhpcy5fdG91Y2hTdGFydFNwaW5uZXJQb2ludCEgLSAoZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuX3RvdWNoU3RhcnRQb2ludCEpICogMS4zO1xuICAgICAgaWYgKCgkZWwucGFyZW50RWxlbWVudCEuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiBsaUhlaWdodCA+PSB0aGlzLl90b3VjaE1vdmVZKSB7XG4gICAgICAgICRlbC5wYXJlbnRFbGVtZW50IS5wYXJlbnRFbGVtZW50IS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHt0aGlzLl90b3VjaE1vdmVZfXB4KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl90b3VjaE1vdmVZID0gKCRlbC5wYXJlbnRFbGVtZW50IS5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIGxpSGVpZ2h0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoU3RhcnRIYW5kbGVyKGU6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3Bpbm5lcikge1xuICAgICAgdGhpcy5fdG91Y2hTdGFydFBvaW50ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdG91Y2hTdGFydFNwaW5uZXJQb2ludCA9IE1hdGguYWJzKFxuICAgICAgICBOdW1iZXIoXG4gICAgICAgICAgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2hpbGRyZW5bMF0hLnBhcmVudEVsZW1lbnQhLnBhcmVudEVsZW1lbnQhLnN0eWxlLnRyYW5zZm9ybS5zcGxpdChcbiAgICAgICAgICAgICcoJ1xuICAgICAgICAgIClbMV0uc3BsaXQoJ3B4JylbMF1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIHRoaXMuX3RvdWNoU3RhcnRQb2ludCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG4gICAgICBjb25zdCBsZW5ndGg6IG51bWJlciA9IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5jaGlsZHJlbi5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICgoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KSEuY2hpbGRyZW4uaXRlbShpKSA9PT0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSEucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuX3NwaW5uZXJJbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgICAkZWwhLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG91Y2hFbmRIYW5kbGVyKGU6IFRvdWNoRXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuc3Bpbm5lcikge1xuICAgICAgaWYgKGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggPiB0aGlzLl90b3VjaFN0YXJ0UG9pbnQhICsgNSkge1xuICAgICAgICB0aGlzLl9iZWZvcmVBbmltYXRpb24oKTtcbiAgICAgIH0gZWxzZSBpZiAoZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA8IHRoaXMuX3RvdWNoU3RhcnRQb2ludCEgLSA1KSB7XG4gICAgICAgIHRoaXMuX2FmdGVyQW5pbWF0aW9uKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3RvdWNoTW92ZVkgPSBNYXRoLmFicyhcbiAgICAgICAgTnVtYmVyKChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQhLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCdweCcpWzBdKVxuICAgICAgKTtcbiAgICAgIGxldCBzZWxlY3RJbmRleDogbnVtYmVyID0gTWF0aC5yb3VuZCh0aGlzLl90b3VjaE1vdmVZISAvIDM1KTtcbiAgICAgIGlmIChzZWxlY3RJbmRleCA8IDApIHtcbiAgICAgICAgc2VsZWN0SW5kZXggPSAwO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX21vdmVDaGVjaykge1xuICAgICAgICBpZiAoKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkhLmNsYXNzTGlzdC5jb250YWlucygneWVhcicpKSB7XG4gICAgICAgICAgdGhpcy5fc2V0WWVhciA9IE51bWJlcihcbiAgICAgICAgICAgICgoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KSEuY2hpbGRyZW4uaXRlbShzZWxlY3RJbmRleCkgYXMgSFRNTEVsZW1lbnQpIS5kYXRhc2V0LnZhbHVlXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyUGlja2VyVmlldyh0aGlzLl9zZXRZZWFyLCB0aGlzLl9zZXRNb250aCEgLSAxKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyRGF5UG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgICAgfSBlbHNlIGlmICgoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KSEuY2xhc3NMaXN0LmNvbnRhaW5zKCdtb250aCcpKSB7XG4gICAgICAgICAgdGhpcy5fc2V0TW9udGggPSBOdW1iZXIoXG4gICAgICAgICAgICAoKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkhLmNoaWxkcmVuLml0ZW0oc2VsZWN0SW5kZXgpIGFzIEhUTUxFbGVtZW50KSEuZGF0YXNldC52YWx1ZVxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fc3Bpbm5lclBpY2tlclZpZXcodGhpcy5fc2V0WWVhciwgdGhpcy5fc2V0TW9udGghIC0gMSk7XG4gICAgICAgICAgdGhpcy5fc3Bpbm5lckRheVBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2V0RGF5ID0gTnVtYmVyKFxuICAgICAgICAgICAgKChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5jaGlsZHJlbi5pdGVtKHNlbGVjdEluZGV4KSBhcyBIVE1MRWxlbWVudCkhLmRhdGFzZXQudmFsdWVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lucHV0Q2hhbmdlKCk7XG4gICAgICAgIChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5wYXJlbnRFbGVtZW50IS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtzZWxlY3RJbmRleCAqIDM1fXB4KWA7XG4gICAgICAgIChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5jaGlsZHJlbi5pdGVtKHNlbGVjdEluZGV4KSEuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgIHRoaXMuX21vdmVDaGVjayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkhLnBhcmVudEVsZW1lbnQhLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke3NlbGVjdEluZGV4ICogMzV9cHgpYDtcbiAgICAgICAgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkhLmNoaWxkcmVuLml0ZW0oc2VsZWN0SW5kZXgpIS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmNoYW5nZUV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlQ2hlY2sgPSBmYWxzZTtcbiAgfVxuXG4gIC8vID09PT09PT09PSBzcGlubmVyXG5cbiAgcHJpdmF0ZSBfc3Bpbm5lclJlbW92ZSgpOiB2b2lkIHtcbiAgICBjb25zdCAkZHJhd2VyOiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgJGRyYXdlci5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JykhLmZvckVhY2goJGVsID0+IHtcbiAgICAgICRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NwaW5uZXJZZWFyU2VsZWN0KCk6IHZvaWQge1xuICAgIGNvbnN0ICRkcmF3ZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpISBhcyBIVE1MRWxlbWVudDtcbiAgICAoJGRyYXdlci5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWxpc3QueWVhcicpIS5jaGlsZHJlbltcbiAgICAgIHRoaXMuX3NldFllYXIhIC0gTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCA0KSlcbiAgICBdIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NwaW5uZXJNb250aFNlbGVjdChudW0/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCAkZHJhd2VyOiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgJG1vbnRoTGlzdCA9ICRkcmF3ZXIucXVlcnlTZWxlY3RvcignLm1vdmluZy1saXN0Lm1vbnRoJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgbGV0IHNlbGVjdDogbnVtYmVyID0gdGhpcy5fc2V0TW9udGghIC0gMTtcbiAgICBpZiAobnVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlbGVjdCA9IG51bTtcbiAgICB9XG4gICAgaWYgKCRtb250aExpc3QuY2hpbGRyZW4ubGVuZ3RoICE9PSAxMikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAkbW9udGhMaXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChOdW1iZXIoKCRtb250aExpc3QuY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZSkgPT09IHRoaXMuX3NldE1vbnRoKSB7XG4gICAgICAgICAgKCRkcmF3ZXIucXVlcnlTZWxlY3RvcignLm1vdmluZy1saXN0Lm1vbnRoJykhLmNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAoJGRyYXdlci5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWxpc3QubW9udGgnKSEuY2hpbGRyZW5bc2VsZWN0XSBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3Bpbm5lckRheVNlbGVjdCgpOiB2b2lkIHtcbiAgICBjb25zdCAkZHJhd2VyOiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgJGRheUxpc3QgPSAkZHJhd2VyLnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctbGlzdC5kYXknKSBhcyBIVE1MRWxlbWVudDtcblxuICAgIGlmICgkZGF5TGlzdC5jaGlsZHJlbi5sZW5ndGggIT09IDEyKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRkYXlMaXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChOdW1iZXIoKCRkYXlMaXN0LmNoaWxkcmVuLml0ZW0oaSkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpID09PSB0aGlzLl9zZXREYXkpIHtcbiAgICAgICAgICAoJGRyYXdlci5xdWVyeVNlbGVjdG9yKCcubW92aW5nLWxpc3QuZGF5JykhLmNoaWxkcmVuW2ldIGFzIEhUTUxFbGVtZW50KS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgICAgICB0aGlzLl9zcGlubmVyRGF5UG9zaXRpb25DaGFuZ2UoaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgKCRkcmF3ZXIucXVlcnlTZWxlY3RvcignLm1vdmluZy1saXN0LmRheScpIS5jaGlsZHJlblt0aGlzLl9zZXREYXkhIC0gMV0gYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgdGhpcy5fc3Bpbm5lckRheVBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3Bpbm5lclllYXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgY29uc3QgJGVsOiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEgYXMgSFRNTEVsZW1lbnQ7XG4gICAgKCRlbC5xdWVyeVNlbGVjdG9yKCcueWVhcicpIS5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7XG4gICAgICAodGhpcy5fc2V0WWVhciEgLSBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDQpKSkgKiAzNVxuICAgIH1weClgO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3Bpbm5lckRheVBvc2l0aW9uQ2hhbmdlKG51bT86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0ICRlbDogSFRNTEVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhIGFzIEhUTUxFbGVtZW50O1xuICAgIGxldCBzZWxlY3QgPSB0aGlzLl9zZXREYXkhIC0gMTtcbiAgICBpZiAobnVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNlbGVjdCA9IG51bTtcbiAgICB9XG4gICAgKCRlbC5xdWVyeVNlbGVjdG9yKCcuZGF5JykhLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtzZWxlY3QgKiAzNX1weClgO1xuICB9XG5cbiAgLy8gIGRyb3dlciBsYXlvdXQg7LKY66asICpfKlxuICBwcml2YXRlIF9uZXh0QnRuQ2xpY2tIYW5kbGVyKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5wYXJlbnRFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5jaGlsZHJlblt0aGlzLl9hZnRlckl0ZW0hXT8uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fY29uZmlybUNsaWNrSGFuZGxlcigpO1xuICAgICRlbD8uY2xpY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RvbUNsaWNrSGFuZGxlcihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGUuaXNUcnVzdGVkKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGUuY2xpZW50WSA8XG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCAtXG4gICAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcubGF5ZXItYm90dG9tJykhLmNsaWVudEhlaWdodFxuICAgICAgKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ISA+IDApIHtcbiAgICAgICAgICB0aGlzLl9jbG9zZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuY291bnQhKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jbGlja0hhbmRsZXIoZTogTW91c2VFdmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSAmJiB0aGlzLmFjdGl2ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnNlbGVjdC13cmFwJykhLmNsYXNzTGlzdC5hZGQoJ2ZvY3VzJyk7XG4gICAgICB0aGlzLl9vcGVuKCk7XG4gICAgICB0aGlzLl9zY3JvbGxDaGFuZ2UoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zY3JvbGxDaGFuZ2UoKTogdm9pZCB7XG4gICAgd2luZG93LnNjcm9sbFRvKFxuICAgICAgMCxcbiAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCArXG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudCEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk/LnRvcCAtXG4gICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRhdGUtcGlja2VyLXdyYXAnKSEuY2xpZW50SGVpZ2h0IC1cbiAgICAgICAgMjVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBkb21FdmVudDogRXZlbnRMaXN0ZW5lciA9IHRoaXMuX2RvbUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpIGFzIEV2ZW50TGlzdGVuZXI7XG5cbiAgcHJpdmF0ZSBfY2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LXdyYXAnKSEuY2xhc3NMaXN0LnJlbW92ZSgnZm9jdXMnKTtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Nsb3NlJykpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb21FdmVudCk7XG4gIH1cblxuICBwcml2YXRlIF9vcGVuKCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdvcGVuJykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kb21FdmVudCk7XG4gIH1cblxuICAvLyBzcGlubmVyIOq4sOuzuCDshKDtg51cbiAgcHJvdGVjdGVkIGZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogdm9pZCB7XG4gICAgc3VwZXIuZmlyc3RVcGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgaWYgKHRoaXMuc3Bpbm5lcikge1xuICAgICAgdGhpcy5faW5wdXRDaGFuZ2UoKTtcbiAgICAgIHRoaXMuX3NwaW5uZXJZZWFyU2VsZWN0KCk7XG4gICAgICB0aGlzLl9zcGlubmVyTW9udGhTZWxlY3QoKTtcbiAgICAgIHRoaXMuX3NwaW5uZXJEYXlTZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLnNwaW5uZXIgJiYgIXRoaXMuX3JlbW92ZUNoZWNrKSB7XG4gICAgICAodGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIGFzIEhUTUxFbGVtZW50KSEucXVlcnlTZWxlY3RvckFsbCgnLmNsZWFyJykuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgICAkZWwhLmNsYXNzTGlzdC5yZW1vdmUoJ2NsZWFyJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zcGlubmVyKSB7XG4gICAgICBjb25zdCBtb250aDogSFRNTEVsZW1lbnQgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcubW92aW5nLWxpc3QubW9udGgnXG4gICAgICApISBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgY29uc3QgZGF5OiBIVE1MRWxlbWVudCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5tb3ZpbmctbGlzdC5kYXknXG4gICAgICApISBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLnllYXInKSFcbiAgICAgICAgLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtcbiAgICAgICAgKHRoaXMuX3NldFllYXIhIC0gTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCA0KSkpICogMzVcbiAgICAgIH1weClgO1xuXG4gICAgICBpZiAobW9udGguY2hpbGRyZW4ubGVuZ3RoICE9PSAxMikge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnRoLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKE51bWJlcigobW9udGguY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZSkgPT09IHRoaXMuX3NldE1vbnRoKSB7XG4gICAgICAgICAgICAodGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcubW9udGgnKSFcbiAgICAgICAgICAgICAgLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtpICogMzV9cHgpYDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoJy5tb250aCcpIVxuICAgICAgICAgIC5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7KHRoaXMuX3NldE1vbnRoISAtIDEpICogMzV9cHgpYDtcbiAgICAgIH1cbiAgICAgIGlmIChkYXkuY2hpbGRyZW4ubGVuZ3RoICE9PSB0aGlzLmxhc3REYXlbdGhpcy5fc2V0TW9udGghIC0gMV0pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXkuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoTnVtYmVyKChkYXkuY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZSkgPT09IHRoaXMuX3NldERheSkge1xuICAgICAgICAgICAgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLmRheScpIVxuICAgICAgICAgICAgICAuY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke2kgKiAzNX1weClgO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgbm93UG9zaXRpb24gPSBNYXRoLmFicyhOdW1iZXIoZGF5LnBhcmVudEVsZW1lbnQhLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCdweCcpWzBdKSkgLyAzNSArIDE7XG4gICAgICAgIGlmIChkYXkuY2hpbGRyZW4ubGVuZ3RoIDwgbm93UG9zaXRpb24pIHtcbiAgICAgICAgICAodGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuZGF5JykhXG4gICAgICAgICAgICAuY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0keyhkYXkuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAzNX1weClgO1xuICAgICAgICAgIGRheS5jaGlsZHJlbi5pdGVtKGRheS5jaGlsZHJlbi5sZW5ndGggLSAxKSEuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgICAgdGhpcy5fc2V0RGF5ID0gZGF5LmNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgICB0aGlzLl9pbnB1dENoYW5nZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoJy5kYXknKSFcbiAgICAgICAgICAgIC5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7KHRoaXMuX3NldERheSEgLSAxKSAqIDM1fXB4KWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==
