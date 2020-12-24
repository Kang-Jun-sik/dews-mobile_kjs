import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './periodpicker.html';
import scss from './periodpicker.scss';
import { html, internalProperty, property, TemplateResult } from 'lit-element';
export class Periodpicker extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.readonly = false;
        this.value = '';
        this.visible = false;
        this.hdDisabled = false;
        this.min = undefined;
        this.max = undefined;
        this.end = '';
        this.start = '';
        this._value = '____-__-__ ~ ____-__-__';
        this.active = false;
        this._beforeView = html ``;
        this._afterView = html ``;
        this._nowView = html ``;
        this.mode = 'day';
        this._modeView = '';
        this.toYear = new Date().getFullYear();
        this.toMonth = new Date().getMonth();
        this.toDay = new Date().getDate();
        this.lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this._touchStartPoint = 0;
        this._touchStartPosition = -33.33333;
        this.moveCheck = false;
        this._count = 1;
    }
    _open() {
        this.active = true;
    }
    _close() {
        this.active = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this._dayViewChange();
    }
    _beforeInputHandler(e) {
        this._beforeValue = e.target.value;
        if (/\d/.exec(e.data) == null && e.data != null) {
            e.returnValue = false;
        }
    }
    _inputHandler(e) {
        let cursor = e.target.selectionStart;
        let value = e.target.value;
        value = value.toUpperCase();
        if (value.search(/[^0-9-~_ ]/g) >= 0) {
            e.target.value = this._beforeValue;
            e.target.setSelectionRange(cursor - 1, cursor - 1);
            return;
        }
        else if (cursor === 5 && e.data !== null) {
            // 시작년도 값 변경
            e.target.value =
                value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
            cursor++;
        }
        else if (cursor === 8 && e.data !== null) {
            // 시작 월 값변경
            e.target.value =
                value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
            cursor++;
        }
        else if (cursor === 11 && e.data !== null) {
            // 시작 일 값변경
            e.target.value =
                value.slice(0, cursor - 1) + ' ~ ' + value.slice(cursor - 1, cursor) + value.slice(cursor + 4, value.length);
            cursor += 3;
        }
        else if (cursor === 18 && e.data !== null) {
            // 끝 년도 값변경
            e.target.value =
                value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
            cursor++;
        }
        else if (cursor === 21 && e.data !== null) {
            // 끝 월 값변경
            e.target.value =
                value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
            cursor++;
        }
        else if (cursor === 24 && e.data !== null) {
            // 끝 일 값변경
            e.target.value = this._beforeValue;
        }
        else if (e.data !== null) {
            e.target.value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
        }
        else {
            if (cursor === 4 || cursor === 7 || cursor === 17 || cursor === 20) {
                e.target.value = value.slice(0, cursor - 1) + '_-' + value.slice(cursor, value.length);
                cursor--;
            }
            else if (cursor > 9 && cursor < 13) {
                e.target.value = value.slice(0, 9) + '_ ~ ' + value.slice(12, value.length);
                cursor = 9;
            }
            else {
                e.target.value = value.slice(0, cursor) + '_' + value.slice(cursor, value.length);
            }
        }
        const change = () => {
            this._endYear = Number(e.target.value.slice(13, 17));
            this._endMonth = Number(e.target.value.slice(18, 20));
            this._endDay = Number(e.target.value.slice(21, 23));
            this._startYear = Number(e.target.value.slice(0, 4));
            this._startMonth = Number(e.target.value.slice(5, 7));
            this._startDay = Number(e.target.value.slice(8, 10));
            if (this.mode === 'day') {
                this._daySelect();
            }
        };
        if (cursor === 10 && e.data !== null) {
            this._startYear = Number(e.target.value.slice(0, 4));
            this._startMonth = Number(e.target.value.slice(5, 7));
            this._startDay = Number(e.target.value.slice(8, 10));
            if (this.mode === 'day') {
                this._daySelect();
            }
        }
        if (cursor === 17 && e.data !== null) {
            if (Number(e.target.value.slice(0, 4)) >
                Number(e.target.value.slice(13, 17))) {
                e.target.value = value.slice(0, 10) + ' ~ ' + value.slice(0, 10);
                change();
            }
        }
        if (cursor === 20 && e.data !== null) {
            if (Number(e.target.value.slice(0, 4)) ===
                Number(e.target.value.slice(13, 17)) &&
                Number(e.target.value.slice(5, 7)) >
                    Number(e.target.value.slice(18, 20))) {
                e.target.value = value.slice(0, 10) + ' ~ ' + value.slice(0, 10);
                change();
            }
        }
        if (cursor === 23 && e.data !== null) {
            if (Number(e.target.value.slice(0, 4)) ===
                Number(e.target.value.slice(13, 17)) &&
                Number(e.target.value.slice(5, 7)) ===
                    Number(e.target.value.slice(18, 20)) &&
                Number(e.target.value.slice(8, 10)) >
                    Number(e.target.value.slice(21, 23))) {
                e.target.value = value.slice(0, 10) + ' ~ ' + value.slice(0, 10);
                change();
            }
        }
        if (cursor === 23 && e.data !== null) {
            change();
        }
        e.target.setSelectionRange(cursor, cursor);
    }
    _removeClickHandler() {
        var _a, _b, _c, _d, _e;
        this._value = '____-__-__ ~ ____-__-__';
        this._startYear = undefined;
        this._startMonth = undefined;
        this._startDay = undefined;
        this._endYear = undefined;
        this._endMonth = undefined;
        this._endDay = undefined;
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.select')) === null || _b === void 0 ? void 0 : _b.forEach($select => {
            $select.classList.remove('select');
        });
        (_c = this.shadowRoot.querySelector('.period-month.period .select-start')) === null || _c === void 0 ? void 0 : _c.classList.remove('select-start');
        (_d = this.shadowRoot.querySelector('.period-month.period .select-end')) === null || _d === void 0 ? void 0 : _d.classList.remove('select-end');
        (_e = this.shadowRoot.querySelectorAll('.period-month.period .select-period')) === null || _e === void 0 ? void 0 : _e.forEach($period => {
            $period.classList.remove('select-period');
        });
    }
    _dayViewChange(y, m) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.classList.remove('select');
        (_d = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('.select-start')) === null || _d === void 0 ? void 0 : _d.classList.remove('select-start');
        (_f = (_e = this.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('.select-end')) === null || _f === void 0 ? void 0 : _f.classList.remove('select-end');
        (_h = (_g = this.shadowRoot) === null || _g === void 0 ? void 0 : _g.querySelectorAll('.select-period')) === null || _h === void 0 ? void 0 : _h.forEach($period => {
            $period.classList.remove('select-period');
        });
        let toYear = this.toYear;
        let toMonth = this.toMonth;
        if (y !== undefined && m !== undefined) {
            toYear = y;
            toMonth = m;
        }
        this._viewYear = toYear;
        this._viewMonth = toMonth + 1;
        this._modeView = `${this._viewYear}-${this._viewMonth > 9 ? this._viewMonth : '0' + this._viewMonth}`;
        if (toMonth >= 11) {
            this._beforeView = this._dayPickerView(toYear, toMonth - 1);
            this._afterView = this._dayPickerView(toYear + 1, 1);
        }
        else if (this.toMonth < 1) {
            this._beforeView = this._dayPickerView(toYear - 1, 11);
            this._afterView = this._dayPickerView(toYear, toMonth + 1);
        }
        else {
            this._beforeView = this._dayPickerView(toYear, toMonth - 1);
            this._afterView = this._dayPickerView(toYear, toMonth + 1);
        }
        this._nowView = this._dayPickerView(toYear, toMonth);
    }
    _dayPickerView(y, m) {
        const _dateView = [];
        let todayYear = this.toYear;
        let todayMonth = this.toMonth;
        if (y !== undefined && m !== undefined) {
            todayYear = y;
            todayMonth = m;
        }
        _dateView.push(html `
      <span class="day-name">일</span>
      <span class="day-name">월</span>
      <span class="day-name">화</span>
      <span class="day-name">수</span>
      <span class="day-name">목</span>
      <span class="day-name">금</span>
      <span class="day-name">토</span>
    `);
        if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
            this.lastDay[1] = 29;
        }
        else {
            this.lastDay[1] = 28;
        }
        const theDate = new Date(todayYear, todayMonth, 1);
        const firstDay = theDate.getDay();
        const lastDate = this.lastDay[todayMonth];
        const length = Math.ceil((firstDay + lastDate) / 7) + 1;
        let count = 1;
        for (let i = 1; i < length; i++) {
            for (let j = 1; j <= 7; j++) {
                if ((i == 1 && j <= firstDay) || count > lastDate) {
                    _dateView.push(html `<div class="day-disabled">
              <span></span>
            </div>`);
                }
                else {
                    if (j === 1 || j === 7) {
                        if (this.hdDisabled && this.visible) {
                            _dateView.push(html `<div class="day" data-value="${count}">
                  <span>${count}</span>
                </div>`);
                        }
                        else if (this.hdDisabled) {
                            _dateView.push(html `<div class="day weekend" data-value="${count}">
                  <span>${count}</span>
                </div>`);
                        }
                        else if (this.visible) {
                            _dateView.push(html `<div class="day weekend" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`);
                        }
                        else {
                            _dateView.push(html `<div class="day weekend" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`);
                        }
                    }
                    else {
                        _dateView.push(html `<div class="day" @click="${this._dayClickHandler}" data-value="${count}">
                <span>${count}</span>
              </div>`);
                    }
                    count++;
                }
            }
        }
        return html `<div class="calendar-date">${_dateView}</div>`;
    }
    _monthPickerView(y) {
        const _mountView = [];
        let todayYear = this.toYear;
        if (y !== undefined) {
            todayYear = y;
        }
        for (let i = 1; i <= 12; i++) {
            _mountView.push(html `<div class="month" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`);
        }
        return html `<div class="calendar-month">${_mountView}</div>`;
    }
    _nowClickHandler() {
        var _a;
        this.mode = 'day';
        this._dayViewChange(this.toYear, this.toMonth);
        (_a = this.shadowRoot.querySelector('.selected')) === null || _a === void 0 ? void 0 : _a.classList.remove('selected');
    }
    _optionBtnClickHandler(e) {
        var _a, _b, _c;
        const $el = e.currentTarget;
        if ($el.classList.contains('select')) {
            $el.classList.remove('select');
            this._startYear = undefined;
            this._startMonth = undefined;
            this._startDay = undefined;
            this._endYear = undefined;
            this._endMonth = undefined;
            this._endDay = undefined;
        }
        else {
            $el.parentElement.parentElement.parentElement.querySelectorAll('.select').forEach($select => {
                $select.classList.remove('select');
            });
            (_a = this.shadowRoot.querySelector('.period-month.period .select-start')) === null || _a === void 0 ? void 0 : _a.classList.remove('select-start');
            (_b = this.shadowRoot.querySelector('.period-month.period .select-end')) === null || _b === void 0 ? void 0 : _b.classList.remove('select-end');
            (_c = this.shadowRoot.querySelectorAll('.period-month.period .select-period')) === null || _c === void 0 ? void 0 : _c.forEach($period => {
                $period.classList.remove('select-period');
            });
            $el.classList.add('select');
            const firstDate = new Date();
            const lastDate = new Date();
            let first = firstDate.getDate() - firstDate.getDay();
            let last = lastDate.getDate() + (6 - lastDate.getDay());
            switch ($el.dataset.index) {
                case '0':
                    firstDate.setDate(first);
                    lastDate.setDate(last);
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = firstDate.getMonth() + 1;
                    this._startDay = firstDate.getDate();
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = lastDate.getMonth() + 1;
                    this._endDay = lastDate.getDate();
                    // 주간
                    break;
                case '1':
                    first -= 7;
                    last -= 7;
                    firstDate.setDate(first);
                    lastDate.setDate(last);
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = firstDate.getMonth() + 1;
                    this._startDay = firstDate.getDate();
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = lastDate.getMonth() + 1;
                    this._endDay = lastDate.getDate();
                    // 전주
                    break;
                case '2':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = firstDate.getMonth() + 1;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = lastDate.getMonth() + 1;
                    this._endDay = this.lastDay[lastDate.getMonth()];
                    // 당월
                    break;
                case '3':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = firstDate.getMonth();
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = lastDate.getMonth();
                    if (lastDate.getMonth() === 0) {
                        this._startYear = firstDate.getFullYear() - 1;
                        this._startMonth = 12;
                        this._endYear = lastDate.getFullYear() - 1;
                        this._endMonth = 12;
                        this._endDay = 31;
                    }
                    else {
                        this._endDay = this.lastDay[lastDate.getMonth() - 1];
                    }
                    // 전월
                    break;
                case '4':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 1;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 3;
                    this._endDay = this.lastDay[2];
                    // 1/4분기
                    break;
                case '5':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 4;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 6;
                    this._endDay = this.lastDay[5];
                    // 2/4분기
                    break;
                case '6':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 7;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 9;
                    this._endDay = this.lastDay[8];
                    // 3/4분기
                    break;
                case '7':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 10;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 12;
                    this._endDay = this.lastDay[11];
                    // 4/4분기
                    break;
                case '8':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 1;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 6;
                    this._endDay = this.lastDay[5];
                    // 상반기
                    break;
                case '9':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 7;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 12;
                    this._endDay = this.lastDay[11];
                    // 하반기
                    break;
                case '10':
                    this._startYear = firstDate.getFullYear();
                    this._startMonth = 1;
                    this._startDay = 1;
                    this._endYear = lastDate.getFullYear();
                    this._endMonth = 12;
                    this._endDay = this.lastDay[11];
                    // 올해
                    break;
            }
        }
        this._value =
            `${this._startYear === undefined ? '____' : this._startYear}` +
                '-' +
                `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
                '-' +
                `${this._startDay === undefined ? '__' : this._startDay < 10 ? '0' + this._startDay : this._startDay}` +
                ' ~ ' +
                `${this._endYear === undefined ? '____' : this._endYear}` +
                '-' +
                `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}` +
                '-' +
                `${this._endDay === undefined ? '__' : this._endDay < 10 ? '0' + this._endDay : this._endDay}`;
        console.log(this._startYear +
            '-' +
            this._startMonth +
            '-' +
            this._startDay +
            ' ~ ' +
            this._endYear +
            '-' +
            this._endMonth +
            '-' +
            this._endDay);
    }
    _touchMoveHandler(e) {
        e.preventDefault();
        const $el = e.currentTarget;
        let move = e.changedTouches[0].pageX - this._touchStartPoint - this._touchStartPosition;
        this.moveCheck = true;
        if (move > 0) {
            move = 0;
        }
        else if (Math.abs(move) > this._touchStartPosition * 2) {
            move = -this._touchStartPosition * 2;
        }
        $el.style.transform = `translate3d(${move}px, 0px, 0px)`;
    }
    _beforeAnimation() {
        const $el = this.shadowRoot.querySelector('.calendar-flip-wrap');
        const position = Math.abs(Number($el.style.transform.split('(')[1].split('px')[0])) - this._count;
        $el.style.transform = `translate3d(-${position}px,0px,0px)`;
        if (position >= 0) {
            window.webkitRequestAnimationFrame(this._beforeAnimation.bind(this));
        }
        else {
            $el.style.transform = `translate3d(-${$el.clientWidth / 3}px,0px,0px)`;
            this._count = 1;
            if (this.mode === 'day') {
                if (this._viewMonth === 1) {
                    this._dayViewChange(this._viewYear - 1, 11);
                }
                else {
                    this._dayViewChange(this._viewYear, this._viewMonth - 2);
                }
            }
            else if (this.mode === 'month') {
                this._monthViewChange(this._viewYear - 1);
            }
            else {
                this._yearViewChange(this._beforeViewYear - 10);
            }
        }
        this._count++;
    }
    _afterAnimation() {
        const $el = this.shadowRoot.querySelector('.calendar-flip-wrap');
        const position = Math.abs(Number($el.style.transform.split('(')[1].split('px')[0])) + this._count;
        $el.style.transform = `translate3d(-${position}px,0px,0px)`;
        if (position <= ($el.clientWidth / 3) * 2) {
            window.webkitRequestAnimationFrame(this._afterAnimation.bind(this));
        }
        else {
            $el.style.transform = `translate3d(-${$el.clientWidth / 3}px,0px,0px)`;
            this._count = 1;
            if (this.mode === 'day') {
                if (this._viewMonth === 12) {
                    this._dayViewChange(this._viewYear + 1, 0);
                }
                else {
                    this._dayViewChange(this._viewYear, this._viewMonth);
                }
            }
            else if (this.mode === 'month') {
                this._monthViewChange(this._viewYear + 1);
            }
            else {
                this._yearViewChange(this._beforeViewYear + 10);
            }
        }
        this._count++;
    }
    _touchStartHandler(e) {
        this._touchStartPoint = e.changedTouches[0].pageX;
        this._touchStartPosition = Number(e.currentTarget.clientWidth / 3);
    }
    _touchEndHandler(e) {
        const $el = e.currentTarget;
        if (this.moveCheck) {
            if (Math.abs(this._touchStartPoint - e.changedTouches[0].pageX) > 100) {
                if (this._touchStartPoint > e.changedTouches[0].pageX) {
                    this._afterAnimation();
                }
                else {
                    this._beforeAnimation();
                }
                this.moveCheck = false;
            }
            else {
                $el.style.transform = `translate3d(-${$el.clientWidth / 3}px,0px,0px)`;
            }
        }
    }
    _dayClickHandler(e) {
        const $el = e.currentTarget;
        if (this._startDay === undefined) {
            this._startYear = this._viewYear;
            this._startMonth = this._viewMonth;
            this._startDay = Number($el.dataset.value);
        }
        else if ((this._endDay === undefined && this._startYear < this._viewYear) ||
            (this._endDay === undefined && this._startYear === this._viewYear && this._startMonth < this._viewMonth) ||
            (this._endDay === undefined &&
                this._startYear === this._viewYear &&
                this._startMonth === this._viewMonth &&
                this._startDay < Number($el.dataset.value)) ||
            (this._startYear === this._viewYear &&
                this._startMonth === this._viewMonth &&
                this._startDay === Number($el.dataset.value) &&
                this._endDay === undefined)) {
            // 선택 조건에 해당될 경우 endDay 를 설정
            this._endYear = this._viewYear;
            this._endMonth = this._viewMonth;
            this._endDay = Number($el.dataset.value);
        }
        else {
            // 선택 조건에 부합하지 않을경우 선택한일을 시작일로 변경
            this._endDay = undefined;
            this._endYear = undefined;
            this._endMonth = undefined;
            this._startYear = this._viewYear;
            this._startMonth = this._viewMonth;
            this._startDay = Number($el.dataset.value);
        }
        this._daySelect();
        this._value =
            `${this._startYear === undefined ? '____' : this._startYear}` +
                '-' +
                `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
                '-' +
                `${this._startDay === undefined ? '__' : this._startDay < 10 ? '0' + this._startDay : this._startDay}` +
                ' ~ ' +
                `${this._endYear === undefined ? '____' : this._endYear}` +
                '-' +
                `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}` +
                '-' +
                `${this._endDay === undefined ? '__' : this._endDay < 10 ? '0' + this._endDay : this._endDay}`;
    }
    _beforeClickHandler() {
        const $el = this.shadowRoot.querySelector('.calendar-flip-wrap');
        $el.style.transform = `translate3d(-${$el.clientWidth / 3}px,0px,0px)`;
        this._beforeAnimation();
    }
    _afterClickHandler() {
        const $el = this.shadowRoot.querySelector('.calendar-flip-wrap');
        $el.style.transform = `translate3d(-${$el.clientWidth / 3}px,0px,0px)`;
        this._afterAnimation();
    }
    /**
     *  년도 HTMLTemplate 을 반환합니다.
     * @param e Event
     * */
    _clickHandler(e) {
        var _a, _b, _c;
        if (!this.disabled && !this.readonly) {
            const $el = this.shadowRoot.querySelector('.drawer-layout');
            window.scrollTo(0, window.pageYOffset +
                ((_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.top) -
                ((_c = this.shadowRoot.querySelector('.period-picker-wrap')) === null || _c === void 0 ? void 0 : _c.clientHeight) -
                25);
            this.height = `${this.shadowRoot.querySelector('.period-picker-wrap').clientHeight + 120}px`;
            $el.height = this.height;
            this._open();
        }
    }
    /**
     *  년도 HTMLTemplate 을 반환합니다.
     * @param y 년도를 입력 받습니다.
     * @return {TemplateResult} 년도 HTMLTemplate 을 반환합니다.
     * */
    _yearPickerView(y) {
        var _a, _b;
        let toYear = this.toYear;
        const _yearView = [];
        if (y !== undefined) {
            toYear = y;
        }
        const todayYearStart = (toYear / 10) * 10 - 1 - (toYear % 10);
        const todayYearEnd = (toYear / 10) * 10 + 10 - (toYear % 10);
        for (let i = 0; todayYearStart + i <= todayYearEnd; i++) {
            if (todayYearStart + i === todayYearStart || todayYearStart + i === todayYearEnd) {
                _yearView.push(html `<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
            <span>${todayYearStart + i}</span>
          </div>`);
            }
            else {
                if (todayYearStart + i > Number((_a = this.max) === null || _a === void 0 ? void 0 : _a.slice(0, 4)) || todayYearStart + i < Number((_b = this.min) === null || _b === void 0 ? void 0 : _b.slice(0, 4))) {
                    _yearView.push(html `<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`);
                }
                else {
                    _yearView.push(html `<div class="year" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`);
                }
            }
        }
        return html `<div class="calendar-year">${_yearView}</div>`;
    }
    /**
     * 년도를 클릭시 UI 를 변경합니다.
     * */
    _yearClickHandler(e) {
        const $el = e.currentTarget;
        this._viewYear = Number($el.dataset.value);
        this.mode = 'month';
        this._monthViewChange(Number($el.dataset.value));
    }
    /**
     * 현재 보여지는 상태를 변경 합니다.
     * */
    _modeClickHandler() {
        if (this.mode === 'day') {
            this._monthViewChange(this._viewYear);
            this.mode = 'month';
        }
        else if (this.mode === 'month') {
            this._yearViewChange(this._viewYear);
            this.mode = 'year';
        }
    }
    _optionClickHandler(e) {
        var _a;
        (_a = e.currentTarget.classList) === null || _a === void 0 ? void 0 : _a.remove('selected');
        if (this.mode === 'option') {
            this.mode = this._beforeMode;
            if (this.mode === 'day') {
                this._dayViewChange(this._viewYear, this._viewMonth - 1);
            }
            else if (this.mode === 'year') {
                this._yearViewChange(this._viewYear);
            }
            else if (this.mode === 'month') {
                this._monthViewChange(this._viewYear);
            }
        }
        else {
            this._beforeMode = this.mode;
            e.currentTarget.classList.add('selected');
            this.mode = 'option';
        }
    }
    /**
     *  년도 선택 UI를 변경해 줍니다.
     * @param y year
     * */
    _yearViewChange(y) {
        let year = this.toYear;
        if (y !== undefined) {
            year = y;
        }
        this._beforeViewYear = year;
        this._modeView = `${Math.floor(year / 10) * 10}-${Math.floor(year / 10) * 10 + 9}`;
        this._beforeView = this._yearPickerView(Math.floor(year / 10) * 10 - 10);
        this._nowView = this._yearPickerView(Math.floor(year / 10) * 10);
        this._afterView = this._yearPickerView(Math.floor(year / 10) * 10 + 10);
    }
    /**
     *  월선택 UI를 변경해 줍니다.
     * @param y year
     * */
    _monthViewChange(y) {
        let year = this.toYear;
        if (y !== undefined) {
            year = y;
        }
        this._viewYear = year;
        this._modeView = `${year}`;
        this._beforeView = this._monthPickerView(year - 1);
        this._nowView = this._monthPickerView(year);
        this._afterView = this._monthPickerView(year + 1);
    }
    _optionMonthClickHandler(e) {
        var _a, _b, _c, _d, _e, _f;
        const $el = e.currentTarget;
        const date = new Date();
        if (this.shadowRoot.querySelector('.period-month.period .select') === null) {
            this.shadowRoot.querySelectorAll('.calendar-content .select').forEach($select => {
                $select.classList.remove('select');
            });
            this._startYear = date.getFullYear();
            this._startMonth = Number($el.dataset.value);
            this._startDay = 1;
            this._endYear = undefined;
            this._endMonth = undefined;
            this._endDay = undefined;
            $el.classList.add('select');
        }
        else {
            if (this._startMonth < Number($el.dataset.value) && this._endMonth === undefined) {
                this._endYear = date.getFullYear();
                this._endMonth = Number($el.dataset.value);
                this._endDay = this.lastDay[this._endMonth - 1];
                (_a = this.shadowRoot.querySelector('.period-month.period .select')) === null || _a === void 0 ? void 0 : _a.classList.add('select-start');
                $el.classList.add('select-end');
                $el.classList.add('select');
                $el.parentElement.children;
                for (let i = 0; i < $el.parentElement.children.length; i++) {
                    const item = $el.parentElement.children.item(i);
                    if (Number(item.dataset.value) > this._startMonth && Number(item.dataset.value) < this._endMonth) {
                        item.classList.add('select-period');
                    }
                }
            }
            else {
                (_b = this.shadowRoot.querySelector('.period-month.period .select')) === null || _b === void 0 ? void 0 : _b.classList.remove('select');
                (_c = this.shadowRoot.querySelector('.period-month.period .select')) === null || _c === void 0 ? void 0 : _c.classList.remove('select');
                (_d = this.shadowRoot.querySelector('.period-month.period .select-start')) === null || _d === void 0 ? void 0 : _d.classList.remove('select-start');
                (_e = this.shadowRoot.querySelector('.period-month.period .select-end')) === null || _e === void 0 ? void 0 : _e.classList.remove('select-end');
                (_f = this.shadowRoot.querySelectorAll('.period-month.period .select-period')) === null || _f === void 0 ? void 0 : _f.forEach($period => {
                    $period.classList.remove('select-period');
                });
                $el.classList.add('select');
                this._startMonth = Number($el.dataset.value);
                this._endYear = undefined;
                this._endMonth = undefined;
                this._endDay = undefined;
            }
        }
        this._value =
            `${this._startYear === undefined ? '____' : this._startYear}` +
                '-' +
                `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
                '-' +
                `${this._startDay === undefined ? '__' : this._startDay < 10 ? '0' + this._startDay : this._startDay}` +
                ' ~ ' +
                `${this._endYear === undefined ? '____' : this._endYear}` +
                '-' +
                `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}` +
                '-' +
                `${this._endDay === undefined ? '__' : this._endDay < 10 ? '0' + this._endDay : this._endDay}`;
        // this._startDay = date.getDate();
        // this._endYear = date.getFullYear();
    }
    _monthClickHandler(e) {
        const $el = e.currentTarget;
        this._viewMonth = Number($el.dataset.value);
        this._dayViewChange(this._viewYear, this._viewMonth - 1);
        this.mode = 'day';
        this._beforeViewYear = undefined;
    }
    _monthSelect() {
        var _a, _b;
        const $el = this.shadowRoot.querySelectorAll('.calendar-month')[1];
        (_a = $el === null || $el === void 0 ? void 0 : $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.remove('select');
        if (this._beforeViewYear === undefined) {
            this._beforeViewYear = this._viewYear;
        }
        if (this._beforeViewYear === this._viewYear) {
            (_b = $el.children.item(this._viewMonth - 1)) === null || _b === void 0 ? void 0 : _b.classList.add('select');
        }
    }
    _daySelect() {
        var _a, _b, _c, _d, _e;
        const $el = this.shadowRoot.querySelectorAll('.calendar-date')[1];
        (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.remove('select');
        (_b = $el.querySelector('.select-start')) === null || _b === void 0 ? void 0 : _b.classList.remove('select-start');
        (_c = $el.querySelector('.select-end')) === null || _c === void 0 ? void 0 : _c.classList.remove('select-end');
        (_d = $el.querySelector('.today')) === null || _d === void 0 ? void 0 : _d.classList.remove('today');
        (_e = $el.querySelectorAll('.select-period')) === null || _e === void 0 ? void 0 : _e.forEach($period => {
            var _a;
            (_a = $period === null || $period === void 0 ? void 0 : $period.classList) === null || _a === void 0 ? void 0 : _a.remove('select-period');
        });
        if (this.toYear === this._viewYear && this.toMonth + 1 === this._viewMonth) {
            $el.querySelectorAll('.day').forEach($day => {
                if (Number($day.dataset.value) === this.toDay) {
                    $day.classList.add('today');
                }
            });
        }
        if (this._viewYear === this._startYear && this._viewMonth === this._startMonth) {
            // select-start,select 클래 생성
            $el.querySelectorAll('.day').forEach($day => {
                if (this._startDay === Number($day.dataset.value) && this._endDay !== undefined) {
                    $day.classList.add('select-start');
                }
                else if (this._startDay === Number($day.dataset.value) && this._endDay === undefined) {
                    $day.classList.add('select');
                }
            });
        }
        if (this._viewYear === this._endYear && this._viewMonth === this._endMonth) {
            // select-end 클래스 생성
            $el.querySelectorAll('.day').forEach($day => {
                var _a, _b;
                if (this._endDay === Number($day.dataset.value)) {
                    (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.add('select-start');
                    (_b = $el.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.classList.remove('select');
                    $day.classList.add('select-end');
                }
            });
        }
        if (this._viewYear >= this._startYear && this._viewYear <= this._endYear) {
            // period 클래스 생성
            if ((this._viewMonth > this._startMonth && this._viewMonth < this._endMonth) ||
                (this._viewYear > this._startYear && this._viewMonth < this._endMonth)) {
                // start 와 end 가 없는 달의 영역에 period 클래스 생성
                $el.querySelectorAll('.day').forEach($day => {
                    $day.classList.add('select-period');
                });
            }
            else if (this._viewMonth === this._startMonth) {
                // start 위치의 period 클래스 생성
                $el.querySelectorAll('.day').forEach($day => {
                    if (this._startDay < Number($day.dataset.value)) {
                        if (this._endDay > Number($day.dataset.value) && this._viewMonth === this._endMonth) {
                            $day.classList.add('select-period');
                        }
                        else if (this._viewMonth !== this._endMonth) {
                            $day.classList.add('select-period');
                        }
                    }
                });
            }
            else if (this._viewMonth === this._endMonth) {
                // 다른 달의 끝지점 period 클래스 생성
                $el.querySelectorAll('.day').forEach($day => {
                    if (this._endDay > Number($day.dataset.value)) {
                        $day.classList.add('select-period');
                    }
                });
            }
        }
    }
    _yearSelect() {
        var _a;
        const $el = this.shadowRoot.querySelectorAll('.calendar-year')[1];
        (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.remove('select');
        if (this._beforeViewYear === undefined) {
            this._beforeViewYear = this._viewYear;
        }
        for (let i = 0; i < $el.children.length; i++) {
            if (this._viewYear === Number($el.children.item(i).dataset.value)) {
                $el.children.item(i).classList.add('select');
            }
        }
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (this.mode === 'day') {
            this._daySelect();
        }
        else if (this.mode === 'month') {
            this._monthSelect();
        }
        else if (this.mode === 'year') {
            this._yearSelect();
        }
    }
    render() {
        return template.call(this);
    }
}
Periodpicker.styles = scss;
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "readonly", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "value", void 0);
__decorate([
    property({ type: Boolean, attribute: 'holidays-visible' }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "visible", void 0);
__decorate([
    property({ type: Boolean, attribute: 'holidays-disabled' }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "hdDisabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "min", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "max", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "end", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Periodpicker.prototype, "start", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Periodpicker.prototype, "_value", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Periodpicker.prototype, "height", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Periodpicker.prototype, "inputValue", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Periodpicker.prototype, "active", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", TemplateResult)
], Periodpicker.prototype, "_beforeView", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", TemplateResult)
], Periodpicker.prototype, "_afterView", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", TemplateResult)
], Periodpicker.prototype, "_nowView", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", String)
], Periodpicker.prototype, "mode", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyaW9kcGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGVyaW9kcGlja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUVqRSxPQUFPLFFBQVEsTUFBTSxxQkFBcUIsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxxQkFBcUIsQ0FBQztBQUN2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBa0IsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRy9GLE1BQU0sT0FBTyxZQUFhLFNBQVEsaUJBQWlCO0lBQW5EOztRQUlFLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixVQUFLLEdBQXVCLEVBQUUsQ0FBQztRQUcvQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbkIsUUFBRyxHQUF1QixTQUFTLENBQUM7UUFHcEMsUUFBRyxHQUF1QixTQUFTLENBQUM7UUFHcEMsUUFBRyxHQUF1QixFQUFFLENBQUM7UUFHN0IsVUFBSyxHQUF1QixFQUFFLENBQUM7UUFHdkIsV0FBTSxHQUF1Qix5QkFBeUIsQ0FBQztRQVN2RCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBR2YsZ0JBQVcsR0FBbUIsSUFBSSxDQUFBLEVBQUUsQ0FBQztRQUdyQyxlQUFVLEdBQW1CLElBQUksQ0FBQSxFQUFFLENBQUM7UUFHcEMsYUFBUSxHQUFtQixJQUFJLENBQUEsRUFBRSxDQUFDO1FBR2xDLFNBQUksR0FBd0MsS0FBSyxDQUFDO1FBRWxELGNBQVMsR0FBdUIsRUFBRSxDQUFDO1FBVW5DLFdBQU0sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFVB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QUFJLE1BQU0sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBRSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFFLENBQUMsQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ25CO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7WUFDcEMsSUFDRSxNQUFNLENBQUUsQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELE1BQU0sQ0FBRSxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUMxRDtnQkFDQyxDQUFDLENBQUMsTUFBMkIsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixNQUFNLEVBQUUsQ0FBQzthQUNWO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sS0FBSyxFQUFFLElBQUksQ0FBQyxD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Q0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDN0QsR0FBRztnQkFDSCxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDOUcsR0FBRztnQkFDSCxHQUFHLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDdEcsS0FBSztnQkFDTCxHQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pELEdBQUc7Z0JBQ0gsR0FBRyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RHLEdBQUc7Z0JBQ0gsR0FBRyxJQUFJLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVqRyxPQUFP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QUFFLENBQUM7OzZDQUMzQztBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLENBQUM7O2dEQUN6QztBQUduQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7eUNBQ1M7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O3lDQUNTO0FBR3BDO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzt5Q0FDRTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MkNBQ0k7QUFHL0I7SUFEQyxnQkFBZ0IsRUFBRTs7NENBQzRDO0FBRy9EO0lBREMsZ0JBQWdCLEVBQUU7OzRDQUNnQjtBQUduQztJQURDLGdCQUFnQixFQUFFOztnREFDb0I7QUFHdkM7SUFEQyxnQkFBZ0IsRUFBRTs7NENBQ0k7QUFHdkI7SUFEQyxnQkFBZ0IsRUFBRTs4QkFDRSxjQUFjO2lEQUFVO0FBRzdDO0lBREMsZ0JBQWdCLEVBQUU7OEJBQ0MsY0FBYztnREFBVTtBQUc1QztJQURDLGdCQUFnQixFQUFFOzhCQUNELGNBQWM7OENBQVU7QUFHMUM7SUFEQyxnQkFBZ0IsRUFBRTs7MENBQ3VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0Zvcm1Db21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NGb3JtQ29tcG9uZW50LmpzJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vcGVyaW9kcGlja2VyLmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9wZXJpb2RwaWNrZXIuc2Nzcyc7XG5pbXBvcnQgeyBodG1sLCBpbnRlcm5hbFByb3BlcnR5LCBwcm9wZXJ0eSwgUHJvcGVydHlWYWx1ZXMsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhd2VybGF5b3V0IH0gZnJvbSAnLi4vZHJhd2VybGF5b3V0L2RyYXdlcmxheW91dC5qcyc7XG5cbmV4cG9ydCBjbGFzcyBQZXJpb2RwaWNrZXIgZXh0ZW5kcyBEZXdzRm9ybUNvbXBvbmVudCB7XG4gIHN0YXRpYyBzdHlsZXMgPSBzY3NzO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbiAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCBhdHRyaWJ1dGU6ICdob2xpZGF5cy12aXNpYmxlJyB9KVxuICB2aXNpYmxlID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgYXR0cmlidXRlOiAnaG9saWRheXMtZGlzYWJsZWQnIH0pXG4gIGhkRGlzYWJsZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgbWluOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIG1heDogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBlbmQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9ICcnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBzdGFydDogc3RyaW5nIHwgdW5kZWZpbmVkID0gJyc7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gJ19fX18tX18tX18gfiBfX19fLV9fLV9fJztcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgaGVpZ2h0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIGlucHV0VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgYWN0aXZlID0gZmFsc2U7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIF9iZWZvcmVWaWV3OiBUZW1wbGF0ZVJlc3VsdCA9IGh0bWxgYDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgX2FmdGVyVmlldzogVGVtcGxhdGVSZXN1bHQgPSBodG1sYGA7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIF9ub3dWaWV3OiBUZW1wbGF0ZVJlc3VsdCA9IGh0bWxgYDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgbW9kZTogJ2RheScgfCAnbW9udGgnIHwgJ3llYXInIHwgJ29wdGlvbicgPSAnZGF5JztcblxuICBwcml2YXRlIF9tb2RlVmlldzogc3RyaW5nIHwgdW5kZWZpbmVkID0gJyc7XG5cbiAgcHJpdmF0ZSBfb3BlbigpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9jbG9zZSgpIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSB0b1llYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gIHByaXZhdGUgdG9Nb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKTtcbiAgcHJpdmF0ZSB0b0RheSA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICBwcml2YXRlIGxhc3REYXk6IEFycmF5PG51bWJlcj4gPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV07XG4gIHByaXZhdGUgX3RvdWNoU3RhcnRQb2ludCA9IDA7XG4gIHByaXZhdGUgX3RvdWNoU3RhcnRQb3NpdGlvbiA9IC0zMy4zMzMzMztcblxuICBwcml2YXRlIF92aWV3WWVhcjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF92aWV3TW9udGg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfdmlld0RhdGU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9zdGFydFllYXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfc3RhcnRNb250aDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9zdGFydERheTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2VuZFllYXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZW5kTW9udGg6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZW5kRGF5OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBtb3ZlQ2hlY2sgPSBmYWxzZTtcblxuICBwcml2YXRlIF9jb3VudCA9IDE7XG4gIHByaXZhdGUgX2JlZm9yZVZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9kYXlWaWV3Q2hhbmdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVJbnB1dEhhbmRsZXIoZTogSW5wdXRFdmVudCkge1xuICAgIHRoaXMuX2JlZm9yZVZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuICAgIGlmICgvXFxkLy5leGVjKGUuZGF0YSEpID09IG51bGwgJiYgZS5kYXRhICE9IG51bGwpIHtcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnB1dEhhbmRsZXIoZTogSW5wdXRFdmVudCkge1xuICAgIGxldCBjdXJzb3IgPSAoZS50YXJnZXQhIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnNlbGVjdGlvblN0YXJ0ITtcbiAgICBsZXQgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgaWYgKHZhbHVlLnNlYXJjaCgvW14wLTktfl8gXS9nKSA+PSAwKSB7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB0aGlzLl9iZWZvcmVWYWx1ZSE7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yISAtIDEsIGN1cnNvciEgLSAxKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gNSAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIC8vIOyLnOyekeuFhOuPhCDqsJIg67OA6rK9XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICB2YWx1ZS5zbGljZSgwLCBjdXJzb3IgLSAxKSArICctJyArIHZhbHVlLnNsaWNlKGN1cnNvciAtIDEsIGN1cnNvcikgKyB2YWx1ZS5zbGljZShjdXJzb3IgKyAyLCB2YWx1ZS5sZW5ndGgpO1xuICAgICAgY3Vyc29yKys7XG4gICAgfSBlbHNlIGlmIChjdXJzb3IgPT09IDggJiYgZS5kYXRhICE9PSBudWxsKSB7XG4gICAgICAvLyDsi5zsnpEg7JuUIOqwkuuzgOqyvVxuICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID1cbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMSkgKyAnLScgKyB2YWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IpICsgdmFsdWUuc2xpY2UoY3Vyc29yICsgMiwgdmFsdWUubGVuZ3RoKTtcbiAgICAgIGN1cnNvcisrO1xuICAgIH0gZWxzZSBpZiAoY3Vyc29yID09PSAxMSAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIC8vIOyLnOyekSDsnbwg6rCS67OA6rK9XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICB2YWx1ZS5zbGljZSgwLCBjdXJzb3IgLSAxKSArICcgfiAnICsgdmFsdWUuc2xpY2UoY3Vyc29yIC0gMSwgY3Vyc29yKSArIHZhbHVlLnNsaWNlKGN1cnNvciArIDQsIHZhbHVlLmxlbmd0aCk7XG4gICAgICBjdXJzb3IgKz0gMztcbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gMTggJiYgZS5kYXRhICE9PSBudWxsKSB7XG4gICAgICAvLyDrgZ0g64WE64+EIOqwkuuzgOqyvVxuICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID1cbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMSkgKyAnLScgKyB2YWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IpICsgdmFsdWUuc2xpY2UoY3Vyc29yICsgMiwgdmFsdWUubGVuZ3RoKTtcbiAgICAgIGN1cnNvcisrO1xuICAgIH0gZWxzZSBpZiAoY3Vyc29yID09PSAyMSAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIC8vIOuBnSDsm5Qg6rCS67OA6rK9XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICB2YWx1ZS5zbGljZSgwLCBjdXJzb3IgLSAxKSArICctJyArIHZhbHVlLnNsaWNlKGN1cnNvciAtIDEsIGN1cnNvcikgKyB2YWx1ZS5zbGljZShjdXJzb3IgKyAyLCB2YWx1ZS5sZW5ndGgpO1xuICAgICAgY3Vyc29yKys7XG4gICAgfSBlbHNlIGlmIChjdXJzb3IgPT09IDI0ICYmIGUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgLy8g64GdIOydvCDqsJLrs4Dqsr1cbiAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHRoaXMuX2JlZm9yZVZhbHVlITtcbiAgICB9IGVsc2UgaWYgKGUuZGF0YSAhPT0gbnVsbCkge1xuICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yKSArIHZhbHVlLnNsaWNlKGN1cnNvciArIDEsIHZhbHVlLmxlbmd0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjdXJzb3IgPT09IDQgfHwgY3Vyc29yID09PSA3IHx8IGN1cnNvciA9PT0gMTcgfHwgY3Vyc29yID09PSAyMCkge1xuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBjdXJzb3IgLSAxKSArICdfLScgKyB2YWx1ZS5zbGljZShjdXJzb3IsIHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGN1cnNvci0tO1xuICAgICAgfSBlbHNlIGlmIChjdXJzb3IgPiA5ICYmIGN1cnNvciA8IDEzKSB7XG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIDkpICsgJ18gfiAnICsgdmFsdWUuc2xpY2UoMTIsIHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGN1cnNvciA9IDk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBjdXJzb3IpICsgJ18nICsgdmFsdWUuc2xpY2UoY3Vyc29yLCB2YWx1ZS5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuX2VuZFllYXIgPSBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDEzLCAxNykpO1xuICAgICAgdGhpcy5fZW5kTW9udGggPSBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDE4LCAyMCkpO1xuICAgICAgdGhpcy5fZW5kRGF5ID0gTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgyMSwgMjMpKTtcbiAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IE51bWJlcigoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUuc2xpY2UoMCwgNCkpO1xuICAgICAgdGhpcy5fc3RhcnRNb250aCA9IE51bWJlcigoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUuc2xpY2UoNSwgNykpO1xuICAgICAgdGhpcy5fc3RhcnREYXkgPSBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDgsIDEwKSk7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnZGF5Jykge1xuICAgICAgICB0aGlzLl9kYXlTZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKGN1cnNvciA9PT0gMTAgJiYgZS5kYXRhICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9zdGFydFllYXIgPSBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDAsIDQpKTtcbiAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDUsIDcpKTtcbiAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSg4LCAxMCkpO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgdGhpcy5fZGF5U2VsZWN0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGN1cnNvciA9PT0gMTcgJiYgZS5kYXRhICE9PSBudWxsKSB7XG4gICAgICBpZiAoXG4gICAgICAgIE51bWJlcigoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUuc2xpY2UoMCwgNCkpID5cbiAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgxMywgMTcpKVxuICAgICAgKSB7XG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIDEwKSArICcgfiAnICsgdmFsdWUuc2xpY2UoMCwgMTApO1xuICAgICAgICBjaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3Vyc29yID09PSAyMCAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgwLCA0KSkgPT09XG4gICAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgxMywgMTcpKSAmJlxuICAgICAgICBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDUsIDcpKSA+XG4gICAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgxOCwgMjApKVxuICAgICAgKSB7XG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIDEwKSArICcgfiAnICsgdmFsdWUuc2xpY2UoMCwgMTApO1xuICAgICAgICBjaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3Vyc29yID09PSAyMyAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgwLCA0KSkgPT09XG4gICAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgxMywgMTcpKSAmJlxuICAgICAgICBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDUsIDcpKSA9PT1cbiAgICAgICAgICBOdW1iZXIoKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlLnNsaWNlKDE4LCAyMCkpICYmXG4gICAgICAgIE51bWJlcigoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUuc2xpY2UoOCwgMTApKSA+XG4gICAgICAgICAgTnVtYmVyKChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZS5zbGljZSgyMSwgMjMpKVxuICAgICAgKSB7XG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIDEwKSArICcgfiAnICsgdmFsdWUuc2xpY2UoMCwgMTApO1xuICAgICAgICBjaGFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY3Vyc29yID09PSAyMyAmJiBlLmRhdGEgIT09IG51bGwpIHtcbiAgICAgIGNoYW5nZSgpO1xuICAgIH1cblxuICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IhLCBjdXJzb3IhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLl92YWx1ZSA9ICdfX19fLV9fLV9fIH4gX19fXy1fXy1fXyc7XG4gICAgdGhpcy5fc3RhcnRZZWFyID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N0YXJ0TW9udGggPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3RhcnREYXkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5fZW5kWWVhciA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmRNb250aCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9lbmREYXkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0Jyk/LmZvckVhY2goJHNlbGVjdCA9PiB7XG4gICAgICAkc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgIH0pO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdC1zdGFydCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Qtc3RhcnQnKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5wZXJpb2QtbW9udGgucGVyaW9kIC5zZWxlY3QtZW5kJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1lbmQnKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wZXJpb2QtbW9udGgucGVyaW9kIC5zZWxlY3QtcGVyaW9kJyk/LmZvckVhY2goJHBlcmlvZCA9PiB7XG4gICAgICAkcGVyaW9kLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1wZXJpb2QnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2RheVZpZXdDaGFuZ2UoeT86IG51bWJlciwgbT86IG51bWJlcikge1xuICAgIHRoaXMuc2hhZG93Um9vdD8ucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3Q/LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Qtc3RhcnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LXN0YXJ0Jyk7XG4gICAgdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LWVuZCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtZW5kJyk7XG4gICAgdGhpcy5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0LXBlcmlvZCcpPy5mb3JFYWNoKCRwZXJpb2QgPT4ge1xuICAgICAgJHBlcmlvZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtcGVyaW9kJyk7XG4gICAgfSk7XG4gICAgbGV0IHRvWWVhciA9IHRoaXMudG9ZZWFyO1xuICAgIGxldCB0b01vbnRoID0gdGhpcy50b01vbnRoO1xuICAgIGlmICh5ICE9PSB1bmRlZmluZWQgJiYgbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0b1llYXIgPSB5O1xuICAgICAgdG9Nb250aCA9IG07XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdZZWFyID0gdG9ZZWFyO1xuICAgIHRoaXMuX3ZpZXdNb250aCA9IHRvTW9udGggKyAxO1xuICAgIHRoaXMuX21vZGVWaWV3ID0gYCR7dGhpcy5fdmlld1llYXJ9LSR7dGhpcy5fdmlld01vbnRoISA+IDkgPyB0aGlzLl92aWV3TW9udGggOiAnMCcgKyB0aGlzLl92aWV3TW9udGh9YDtcbiAgICBpZiAodG9Nb250aCA+PSAxMSkge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9ZZWFyLCB0b01vbnRoIC0gMSk7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRvWWVhciArIDEsIDEpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b01vbnRoIDwgMSkge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9ZZWFyIC0gMSwgMTEpO1xuICAgICAgdGhpcy5fYWZ0ZXJWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0b1llYXIsIHRvTW9udGggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX2RheVBpY2tlclZpZXcodG9ZZWFyLCB0b01vbnRoIC0gMSk7XG4gICAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9kYXlQaWNrZXJWaWV3KHRvWWVhciwgdG9Nb250aCArIDEpO1xuICAgIH1cbiAgICB0aGlzLl9ub3dWaWV3ID0gdGhpcy5fZGF5UGlja2VyVmlldyh0b1llYXIsIHRvTW9udGgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGF5UGlja2VyVmlldyh5PzogbnVtYmVyLCBtPzogbnVtYmVyKTogVGVtcGxhdGVSZXN1bHQge1xuICAgIGNvbnN0IF9kYXRlVmlldzogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG4gICAgbGV0IHRvZGF5WWVhciA9IHRoaXMudG9ZZWFyO1xuICAgIGxldCB0b2RheU1vbnRoID0gdGhpcy50b01vbnRoO1xuICAgIGlmICh5ICE9PSB1bmRlZmluZWQgJiYgbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0b2RheVllYXIgPSB5O1xuICAgICAgdG9kYXlNb250aCA9IG07XG4gICAgfVxuICAgIF9kYXRlVmlldy5wdXNoKGh0bWxgXG4gICAgICA8c3BhbiBjbGFzcz1cImRheS1uYW1lXCI+7J28PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkYXktbmFtZVwiPuyblDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LW5hbWVcIj7tmZQ8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRheS1uYW1lXCI+7IiYPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJkYXktbmFtZVwiPuuqqTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZGF5LW5hbWVcIj7quIg8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImRheS1uYW1lXCI+7YagPC9zcGFuPlxuICAgIGApO1xuICAgIGlmICh0b2RheVllYXIgJSA0MDAgPT0gMCB8fCAodG9kYXlZZWFyICUgNCA9PSAwICYmIHRvZGF5WWVhciAlIDEwMCAhPSAwKSkge1xuICAgICAgdGhpcy5sYXN0RGF5WzFdID0gMjk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGFzdERheVsxXSA9IDI4O1xuICAgIH1cbiAgICBjb25zdCB0aGVEYXRlOiBEYXRlID0gbmV3IERhdGUodG9kYXlZZWFyLCB0b2RheU1vbnRoLCAxKTtcbiAgICBjb25zdCBmaXJzdERheSA9IHRoZURhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgbGFzdERhdGUgPSB0aGlzLmxhc3REYXlbdG9kYXlNb250aF07XG4gICAgY29uc3QgbGVuZ3RoID0gTWF0aC5jZWlsKChmaXJzdERheSArIGxhc3REYXRlKSAvIDcpICsgMTtcbiAgICBsZXQgY291bnQgPSAxO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDc7IGorKykge1xuICAgICAgICBpZiAoKGkgPT0gMSAmJiBqIDw9IGZpcnN0RGF5KSB8fCBjb3VudCA+IGxhc3REYXRlKSB7XG4gICAgICAgICAgX2RhdGVWaWV3LnB1c2goXG4gICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXktZGlzYWJsZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGogPT09IDEgfHwgaiA9PT0gNykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGREaXNhYmxlZCAmJiB0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgX2RhdGVWaWV3LnB1c2goXG4gICAgICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwiZGF5XCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGREaXNhYmxlZCkge1xuICAgICAgICAgICAgICBfZGF0ZVZpZXcucHVzaChcbiAgICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXkgd2Vla2VuZFwiIGRhdGEtdmFsdWU9XCIke2NvdW50fVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgX2RhdGVWaWV3LnB1c2goXG4gICAgICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwiZGF5IHdlZWtlbmRcIiBkYXRhLXZhbHVlPVwiJHtjb3VudH1cIiBAY2xpY2s9XCIke3RoaXMuX2RheUNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y291bnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cImRheSB3ZWVrZW5kXCIgZGF0YS12YWx1ZT1cIiR7Y291bnR9XCIgQGNsaWNrPVwiJHt0aGlzLl9kYXlDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9kYXRlVmlldy5wdXNoKFxuICAgICAgICAgICAgICBodG1sYDxkaXYgY2xhc3M9XCJkYXlcIiBAY2xpY2s9XCIke3RoaXMuX2RheUNsaWNrSGFuZGxlcn1cIiBkYXRhLXZhbHVlPVwiJHtjb3VudH1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4ke2NvdW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItZGF0ZVwiPiR7X2RhdGVWaWV3fTwvZGl2PmA7XG4gIH1cblxuICBwcml2YXRlIF9tb250aFBpY2tlclZpZXcoeT86IG51bWJlcik6IFRlbXBsYXRlUmVzdWx0IHtcbiAgICBjb25zdCBfbW91bnRWaWV3OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcbiAgICBsZXQgdG9kYXlZZWFyOiBudW1iZXIgPSB0aGlzLnRvWWVhcjtcbiAgICBpZiAoeSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0b2RheVllYXIgPSB5O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMjsgaSsrKSB7XG4gICAgICBfbW91bnRWaWV3LnB1c2goXG4gICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cIm1vbnRoXCIgZGF0YS12YWx1ZT1cIiR7aX1cIiBAY2xpY2s9XCIke3RoaXMuX21vbnRoQ2xpY2tIYW5kbGVyfVwiPjxzcGFuPiR7aX08L3NwYW4+PC9kaXY+YFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImNhbGVuZGFyLW1vbnRoXCI+JHtfbW91bnRWaWV3fTwvZGl2PmA7XG4gIH1cblxuICBwcml2YXRlIF9ub3dDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy5tb2RlID0gJ2RheSc7XG4gICAgdGhpcy5fZGF5Vmlld0NoYW5nZSh0aGlzLnRvWWVhciwgdGhpcy50b01vbnRoKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3B0aW9uQnRuQ2xpY2tIYW5kbGVyKGU6IEV2ZW50KSB7XG4gICAgY29uc3QgJGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICgkZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3QnKSkge1xuICAgICAgJGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgdGhpcy5fc3RhcnRZZWFyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fc3RhcnRNb250aCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fZW5kWWVhciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2VuZE1vbnRoID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fZW5kRGF5ID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZWwucGFyZW50RWxlbWVudCEucGFyZW50RWxlbWVudCEucGFyZW50RWxlbWVudCEucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdCcpLmZvckVhY2goJHNlbGVjdCA9PiB7XG4gICAgICAgICRzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdC1zdGFydCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3Qtc3RhcnQnKTtcbiAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdC1lbmQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LWVuZCcpO1xuICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yQWxsKCcucGVyaW9kLW1vbnRoLnBlcmlvZCAuc2VsZWN0LXBlcmlvZCcpPy5mb3JFYWNoKCRwZXJpb2QgPT4ge1xuICAgICAgICAkcGVyaW9kLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1wZXJpb2QnKTtcbiAgICAgIH0pO1xuXG4gICAgICAkZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG5cbiAgICAgIGNvbnN0IGZpcnN0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBsYXN0RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBsZXQgZmlyc3QgPSBmaXJzdERhdGUuZ2V0RGF0ZSgpIC0gZmlyc3REYXRlLmdldERheSgpO1xuICAgICAgbGV0IGxhc3QgPSBsYXN0RGF0ZS5nZXREYXRlKCkgKyAoNiAtIGxhc3REYXRlLmdldERheSgpKTtcbiAgICAgIHN3aXRjaCAoJGVsLmRhdGFzZXQuaW5kZXgpIHtcbiAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgZmlyc3REYXRlLnNldERhdGUoZmlyc3QpO1xuICAgICAgICAgIGxhc3REYXRlLnNldERhdGUobGFzdCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gZmlyc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnRNb250aCA9IGZpcnN0RGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICB0aGlzLl9zdGFydERheSA9IGZpcnN0RGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgdGhpcy5fZW5kWWVhciA9IGxhc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fZW5kTW9udGggPSBsYXN0RGF0ZS5nZXRNb250aCgpICsgMTtcbiAgICAgICAgICB0aGlzLl9lbmREYXkgPSBsYXN0RGF0ZS5nZXREYXRlKCk7XG4gICAgICAgICAgLy8g7KO86rCEXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgIGZpcnN0IC09IDc7XG4gICAgICAgICAgbGFzdCAtPSA3O1xuICAgICAgICAgIGZpcnN0RGF0ZS5zZXREYXRlKGZpcnN0KTtcbiAgICAgICAgICBsYXN0RGF0ZS5zZXREYXRlKGxhc3QpO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IGZpcnN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSBmaXJzdERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgdGhpcy5fc3RhcnREYXkgPSBmaXJzdERhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgIHRoaXMuX2VuZFllYXIgPSBsYXN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX2VuZE1vbnRoID0gbGFzdERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgdGhpcy5fZW5kRGF5ID0gbGFzdERhdGUuZ2V0RGF0ZSgpO1xuXG4gICAgICAgICAgLy8g7KCE7KO8XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IGZpcnN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSBmaXJzdERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgdGhpcy5fc3RhcnREYXkgPSAxO1xuICAgICAgICAgIHRoaXMuX2VuZFllYXIgPSBsYXN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX2VuZE1vbnRoID0gbGFzdERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgdGhpcy5fZW5kRGF5ID0gdGhpcy5sYXN0RGF5W2xhc3REYXRlLmdldE1vbnRoKCldO1xuICAgICAgICAgIC8vIOuLueyblFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICB0aGlzLl9zdGFydFllYXIgPSBmaXJzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9zdGFydE1vbnRoID0gZmlyc3REYXRlLmdldE1vbnRoKCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnREYXkgPSAxO1xuICAgICAgICAgIHRoaXMuX2VuZFllYXIgPSBsYXN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX2VuZE1vbnRoID0gbGFzdERhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICBpZiAobGFzdERhdGUuZ2V0TW9udGgoKSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gZmlyc3REYXRlLmdldEZ1bGxZZWFyKCkgLSAxO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRNb250aCA9IDEyO1xuICAgICAgICAgICAgdGhpcy5fZW5kWWVhciA9IGxhc3REYXRlLmdldEZ1bGxZZWFyKCkgLSAxO1xuICAgICAgICAgICAgdGhpcy5fZW5kTW9udGggPSAxMjtcbiAgICAgICAgICAgIHRoaXMuX2VuZERheSA9IDMxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9lbmREYXkgPSB0aGlzLmxhc3REYXlbbGFzdERhdGUuZ2V0TW9udGgoKSAtIDFdO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDsoITsm5RcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnNCc6XG4gICAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gZmlyc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnRNb250aCA9IDE7XG4gICAgICAgICAgdGhpcy5fc3RhcnREYXkgPSAxO1xuICAgICAgICAgIHRoaXMuX2VuZFllYXIgPSBsYXN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX2VuZE1vbnRoID0gMztcbiAgICAgICAgICB0aGlzLl9lbmREYXkgPSB0aGlzLmxhc3REYXlbMl07XG4gICAgICAgICAgLy8gMS8067aE6riwXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzUnOlxuICAgICAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IGZpcnN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSA0O1xuICAgICAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gMTtcbiAgICAgICAgICB0aGlzLl9lbmRZZWFyID0gbGFzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9lbmRNb250aCA9IDY7XG4gICAgICAgICAgdGhpcy5fZW5kRGF5ID0gdGhpcy5sYXN0RGF5WzVdO1xuICAgICAgICAgIC8vIDIvNOu2hOq4sFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc2JzpcbiAgICAgICAgICB0aGlzLl9zdGFydFllYXIgPSBmaXJzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9zdGFydE1vbnRoID0gNztcbiAgICAgICAgICB0aGlzLl9zdGFydERheSA9IDE7XG4gICAgICAgICAgdGhpcy5fZW5kWWVhciA9IGxhc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fZW5kTW9udGggPSA5O1xuICAgICAgICAgIHRoaXMuX2VuZERheSA9IHRoaXMubGFzdERheVs4XTtcbiAgICAgICAgICAvLyAzLzTrtoTquLBcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnNyc6XG4gICAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gZmlyc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnRNb250aCA9IDEwO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gMTtcbiAgICAgICAgICB0aGlzLl9lbmRZZWFyID0gbGFzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9lbmRNb250aCA9IDEyO1xuICAgICAgICAgIHRoaXMuX2VuZERheSA9IHRoaXMubGFzdERheVsxMV07XG4gICAgICAgICAgLy8gNC8067aE6riwXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJzgnOlxuICAgICAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IGZpcnN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSAxO1xuICAgICAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gMTtcbiAgICAgICAgICB0aGlzLl9lbmRZZWFyID0gbGFzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9lbmRNb250aCA9IDY7XG4gICAgICAgICAgdGhpcy5fZW5kRGF5ID0gdGhpcy5sYXN0RGF5WzVdO1xuICAgICAgICAgIC8vIOyDgeuwmOq4sFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICc5JzpcbiAgICAgICAgICB0aGlzLl9zdGFydFllYXIgPSBmaXJzdERhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgICB0aGlzLl9zdGFydE1vbnRoID0gNztcbiAgICAgICAgICB0aGlzLl9zdGFydERheSA9IDE7XG4gICAgICAgICAgdGhpcy5fZW5kWWVhciA9IGxhc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fZW5kTW9udGggPSAxMjtcbiAgICAgICAgICB0aGlzLl9lbmREYXkgPSB0aGlzLmxhc3REYXlbMTFdO1xuICAgICAgICAgIC8vIO2VmOuwmOq4sFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcxMCc6XG4gICAgICAgICAgdGhpcy5fc3RhcnRZZWFyID0gZmlyc3REYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgdGhpcy5fc3RhcnRNb250aCA9IDE7XG4gICAgICAgICAgdGhpcy5fc3RhcnREYXkgPSAxO1xuICAgICAgICAgIHRoaXMuX2VuZFllYXIgPSBsYXN0RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICAgIHRoaXMuX2VuZE1vbnRoID0gMTI7XG4gICAgICAgICAgdGhpcy5fZW5kRGF5ID0gdGhpcy5sYXN0RGF5WzExXTtcbiAgICAgICAgICAvLyDsmKztlbRcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPVxuICAgICAgYCR7dGhpcy5fc3RhcnRZZWFyID09PSB1bmRlZmluZWQgPyAnX19fXycgOiB0aGlzLl9zdGFydFllYXJ9YCArXG4gICAgICAnLScgK1xuICAgICAgYCR7dGhpcy5fc3RhcnRNb250aCA9PT0gdW5kZWZpbmVkID8gJ19fJyA6IHRoaXMuX3N0YXJ0TW9udGggPCAxMCA/ICcwJyArIHRoaXMuX3N0YXJ0TW9udGggOiB0aGlzLl9zdGFydE1vbnRofWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX3N0YXJ0RGF5ID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fc3RhcnREYXkgPCAxMCA/ICcwJyArIHRoaXMuX3N0YXJ0RGF5IDogdGhpcy5fc3RhcnREYXl9YCArXG4gICAgICAnIH4gJyArXG4gICAgICBgJHt0aGlzLl9lbmRZZWFyID09PSB1bmRlZmluZWQgPyAnX19fXycgOiB0aGlzLl9lbmRZZWFyfWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX2VuZE1vbnRoID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fZW5kTW9udGggPCAxMCA/ICcwJyArIHRoaXMuX2VuZE1vbnRoIDogdGhpcy5fZW5kTW9udGh9YCArXG4gICAgICAnLScgK1xuICAgICAgYCR7dGhpcy5fZW5kRGF5ID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fZW5kRGF5IDwgMTAgPyAnMCcgKyB0aGlzLl9lbmREYXkgOiB0aGlzLl9lbmREYXl9YDtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgdGhpcy5fc3RhcnRZZWFyICtcbiAgICAgICAgJy0nICtcbiAgICAgICAgdGhpcy5fc3RhcnRNb250aCArXG4gICAgICAgICctJyArXG4gICAgICAgIHRoaXMuX3N0YXJ0RGF5ICtcbiAgICAgICAgJyB+ICcgK1xuICAgICAgICB0aGlzLl9lbmRZZWFyICtcbiAgICAgICAgJy0nICtcbiAgICAgICAgdGhpcy5fZW5kTW9udGggK1xuICAgICAgICAnLScgK1xuICAgICAgICB0aGlzLl9lbmREYXlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG91Y2hNb3ZlSGFuZGxlcihlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0ICRlbCA9IGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICBsZXQgbW92ZSA9IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLl90b3VjaFN0YXJ0UG9pbnQgLSB0aGlzLl90b3VjaFN0YXJ0UG9zaXRpb247XG4gICAgdGhpcy5tb3ZlQ2hlY2sgPSB0cnVlO1xuICAgIGlmIChtb3ZlID4gMCkge1xuICAgICAgbW92ZSA9IDA7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyhtb3ZlKSA+IHRoaXMuX3RvdWNoU3RhcnRQb3NpdGlvbiAqIDIpIHtcbiAgICAgIG1vdmUgPSAtdGhpcy5fdG91Y2hTdGFydFBvc2l0aW9uICogMjtcbiAgICB9XG4gICAgJGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke21vdmV9cHgsIDBweCwgMHB4KWA7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVBbmltYXRpb24oKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItZmxpcC13cmFwJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgcG9zaXRpb24gPSBNYXRoLmFicyhOdW1iZXIoJGVsLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCdweCcpWzBdKSkgLSB0aGlzLl9jb3VudDtcbiAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKC0ke3Bvc2l0aW9ufXB4LDBweCwwcHgpYDtcbiAgICBpZiAocG9zaXRpb24gPj0gMCkge1xuICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLl9iZWZvcmVBbmltYXRpb24uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoLSR7JGVsLmNsaWVudFdpZHRoIC8gM31weCwwcHgsMHB4KWA7XG4gICAgICB0aGlzLl9jb3VudCA9IDE7XG4gICAgICBpZiAodGhpcy5tb2RlID09PSAnZGF5Jykge1xuICAgICAgICBpZiAodGhpcy5fdmlld01vbnRoID09PSAxKSB7XG4gICAgICAgICAgdGhpcy5fZGF5Vmlld0NoYW5nZSh0aGlzLl92aWV3WWVhciEgLSAxLCAxMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fZGF5Vmlld0NoYW5nZSh0aGlzLl92aWV3WWVhciwgdGhpcy5fdmlld01vbnRoISAtIDIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgICB0aGlzLl9tb250aFZpZXdDaGFuZ2UodGhpcy5fdmlld1llYXIhIC0gMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl95ZWFyVmlld0NoYW5nZSh0aGlzLl9iZWZvcmVWaWV3WWVhciEgLSAxMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NvdW50Kys7XG4gIH1cblxuICBwcml2YXRlIF9hZnRlckFuaW1hdGlvbigpIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci1mbGlwLXdyYXAnKSBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IE1hdGguYWJzKE51bWJlcigkZWwuc3R5bGUudHJhbnNmb3JtLnNwbGl0KCcoJylbMV0uc3BsaXQoJ3B4JylbMF0pKSArIHRoaXMuX2NvdW50O1xuICAgICRlbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoLSR7cG9zaXRpb259cHgsMHB4LDBweClgO1xuICAgIGlmIChwb3NpdGlvbiA8PSAoJGVsLmNsaWVudFdpZHRoIC8gMykgKiAyKSB7XG4gICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuX2FmdGVyQW5pbWF0aW9uLmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKC0keyRlbC5jbGllbnRXaWR0aCAvIDN9cHgsMHB4LDBweClgO1xuICAgICAgdGhpcy5fY291bnQgPSAxO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgaWYgKHRoaXMuX3ZpZXdNb250aCA9PT0gMTIpIHtcbiAgICAgICAgICB0aGlzLl9kYXlWaWV3Q2hhbmdlKHRoaXMuX3ZpZXdZZWFyISArIDEsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2RheVZpZXdDaGFuZ2UodGhpcy5fdmlld1llYXIsIHRoaXMuX3ZpZXdNb250aCEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgICB0aGlzLl9tb250aFZpZXdDaGFuZ2UodGhpcy5fdmlld1llYXIhICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl95ZWFyVmlld0NoYW5nZSh0aGlzLl9iZWZvcmVWaWV3WWVhciEgKyAxMCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX2NvdW50Kys7XG4gIH1cblxuICBwcml2YXRlIF90b3VjaFN0YXJ0SGFuZGxlcihlOiBUb3VjaEV2ZW50KSB7XG4gICAgdGhpcy5fdG91Y2hTdGFydFBvaW50ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB0aGlzLl90b3VjaFN0YXJ0UG9zaXRpb24gPSBOdW1iZXIoKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xpZW50V2lkdGggLyAzKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoRW5kSGFuZGxlcihlOiBUb3VjaEV2ZW50KSB7XG4gICAgY29uc3QgJGVsID0gZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLm1vdmVDaGVjaykge1xuICAgICAgaWYgKE1hdGguYWJzKHRoaXMuX3RvdWNoU3RhcnRQb2ludCAtIGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVgpID4gMTAwKSB7XG4gICAgICAgIGlmICh0aGlzLl90b3VjaFN0YXJ0UG9pbnQgPiBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYKSB7XG4gICAgICAgICAgdGhpcy5fYWZ0ZXJBbmltYXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9iZWZvcmVBbmltYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vdmVDaGVjayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgtJHskZWwuY2xpZW50V2lkdGggLyAzfXB4LDBweCwwcHgpYDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXlDbGlja0hhbmRsZXIoZTogRXZlbnQpIHtcbiAgICBjb25zdCAkZWwgPSAoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KSE7XG4gICAgaWYgKHRoaXMuX3N0YXJ0RGF5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3N0YXJ0WWVhciA9IHRoaXMuX3ZpZXdZZWFyITtcbiAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSB0aGlzLl92aWV3TW9udGghO1xuICAgICAgdGhpcy5fc3RhcnREYXkgPSBOdW1iZXIoJGVsLmRhdGFzZXQudmFsdWUpITtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHRoaXMuX2VuZERheSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuX3N0YXJ0WWVhciEgPCB0aGlzLl92aWV3WWVhciEpIHx8XG4gICAgICAodGhpcy5fZW5kRGF5ID09PSB1bmRlZmluZWQgJiYgdGhpcy5fc3RhcnRZZWFyID09PSB0aGlzLl92aWV3WWVhciAmJiB0aGlzLl9zdGFydE1vbnRoISA8IHRoaXMuX3ZpZXdNb250aCEpIHx8XG4gICAgICAodGhpcy5fZW5kRGF5ID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdGhpcy5fc3RhcnRZZWFyID09PSB0aGlzLl92aWV3WWVhciAmJlxuICAgICAgICB0aGlzLl9zdGFydE1vbnRoISA9PT0gdGhpcy5fdmlld01vbnRoISAmJlxuICAgICAgICB0aGlzLl9zdGFydERheSA8IE51bWJlcigkZWwuZGF0YXNldC52YWx1ZSkpIHx8XG4gICAgICAodGhpcy5fc3RhcnRZZWFyID09PSB0aGlzLl92aWV3WWVhciAmJlxuICAgICAgICB0aGlzLl9zdGFydE1vbnRoID09PSB0aGlzLl92aWV3TW9udGggJiZcbiAgICAgICAgdGhpcy5fc3RhcnREYXkgPT09IE51bWJlcigkZWwuZGF0YXNldC52YWx1ZSkgJiZcbiAgICAgICAgdGhpcy5fZW5kRGF5ID09PSB1bmRlZmluZWQpXG4gICAgKSB7XG4gICAgICAvLyDshKDtg50g7KGw6rG07JeQIO2VtOuLueuQoCDqsr3smrAgZW5kRGF5IOulvCDshKTsoJVcbiAgICAgIHRoaXMuX2VuZFllYXIgPSB0aGlzLl92aWV3WWVhcjtcbiAgICAgIHRoaXMuX2VuZE1vbnRoID0gdGhpcy5fdmlld01vbnRoO1xuICAgICAgdGhpcy5fZW5kRGF5ID0gTnVtYmVyKCRlbC5kYXRhc2V0LnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g7ISg7YOdIOyhsOqxtOyXkCDrtoDtlantlZjsp4Ag7JWK7J2E6rK97JqwIOyEoO2Dne2VnOydvOydhCDsi5zsnpHsnbzroZwg67OA6rK9XG4gICAgICB0aGlzLl9lbmREYXkgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9lbmRZZWFyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fZW5kTW9udGggPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9zdGFydFllYXIgPSB0aGlzLl92aWV3WWVhcjtcbiAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSB0aGlzLl92aWV3TW9udGg7XG4gICAgICB0aGlzLl9zdGFydERheSA9IE51bWJlcigkZWwuZGF0YXNldC52YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX2RheVNlbGVjdCgpO1xuXG4gICAgdGhpcy5fdmFsdWUgPVxuICAgICAgYCR7dGhpcy5fc3RhcnRZZWFyID09PSB1bmRlZmluZWQgPyAnX19fXycgOiB0aGlzLl9zdGFydFllYXJ9YCArXG4gICAgICAnLScgK1xuICAgICAgYCR7dGhpcy5fc3RhcnRNb250aCA9PT0gdW5kZWZpbmVkID8gJ19fJyA6IHRoaXMuX3N0YXJ0TW9udGggPCAxMCA/ICcwJyArIHRoaXMuX3N0YXJ0TW9udGggOiB0aGlzLl9zdGFydE1vbnRofWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX3N0YXJ0RGF5ID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fc3RhcnREYXkgPCAxMCA/ICcwJyArIHRoaXMuX3N0YXJ0RGF5IDogdGhpcy5fc3RhcnREYXl9YCArXG4gICAgICAnIH4gJyArXG4gICAgICBgJHt0aGlzLl9lbmRZZWFyID09PSB1bmRlZmluZWQgPyAnX19fXycgOiB0aGlzLl9lbmRZZWFyfWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX2VuZE1vbnRoID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fZW5kTW9udGggPCAxMCA/ICcwJyArIHRoaXMuX2VuZE1vbnRoIDogdGhpcy5fZW5kTW9udGh9YCArXG4gICAgICAnLScgK1xuICAgICAgYCR7dGhpcy5fZW5kRGF5ID09PSB1bmRlZmluZWQgPyAnX18nIDogdGhpcy5fZW5kRGF5IDwgMTAgPyAnMCcgKyB0aGlzLl9lbmREYXkgOiB0aGlzLl9lbmREYXl9YDtcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5jYWxlbmRhci1mbGlwLXdyYXAnKSBhcyBIVE1MRWxlbWVudDtcbiAgICAkZWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKC0keyRlbC5jbGllbnRXaWR0aCAvIDN9cHgsMHB4LDBweClgO1xuICAgIHRoaXMuX2JlZm9yZUFuaW1hdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWZ0ZXJDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItZmxpcC13cmFwJykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgJGVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgtJHskZWwuY2xpZW50V2lkdGggLyAzfXB4LDBweCwwcHgpYDtcbiAgICB0aGlzLl9hZnRlckFuaW1hdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqICDrhYTrj4QgSFRNTFRlbXBsYXRlIOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSBlIEV2ZW50XG4gICAqICovXG4gIHByaXZhdGUgX2NsaWNrSGFuZGxlcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5KSB7XG4gICAgICBjb25zdCAkZWw6IERyYXdlcmxheW91dCB8IG51bGwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0Jyk7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oXG4gICAgICAgIDAsXG4gICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCArXG4gICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKT8udG9wISAtXG4gICAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcucGVyaW9kLXBpY2tlci13cmFwJyk/LmNsaWVudEhlaWdodCEgLVxuICAgICAgICAgIDI1XG4gICAgICApO1xuICAgICAgdGhpcy5oZWlnaHQgPSBgJHt0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5wZXJpb2QtcGlja2VyLXdyYXAnKSEuY2xpZW50SGVpZ2h0ICsgMTIwfXB4YDtcbiAgICAgICRlbCEuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICB0aGlzLl9vcGVuKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICDrhYTrj4QgSFRNTFRlbXBsYXRlIOydhCDrsJjtmZjtlanri4jri6QuXG4gICAqIEBwYXJhbSB5IOuFhOuPhOulvCDsnoXroKUg67Cb7Iq164uI64ukLlxuICAgKiBAcmV0dXJuIHtUZW1wbGF0ZVJlc3VsdH0g64WE64+EIEhUTUxUZW1wbGF0ZSDsnYQg67CY7ZmY7ZWp64uI64ukLlxuICAgKiAqL1xuICBwcml2YXRlIF95ZWFyUGlja2VyVmlldyh5PzogbnVtYmVyKTogVGVtcGxhdGVSZXN1bHQge1xuICAgIGxldCB0b1llYXI6IG51bWJlciA9IHRoaXMudG9ZZWFyO1xuICAgIGNvbnN0IF95ZWFyVmlldzogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG4gICAgaWYgKHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdG9ZZWFyID0geTtcbiAgICB9XG4gICAgY29uc3QgdG9kYXlZZWFyU3RhcnQgPSAodG9ZZWFyIC8gMTApICogMTAgLSAxIC0gKHRvWWVhciAlIDEwKTtcbiAgICBjb25zdCB0b2RheVllYXJFbmQgPSAodG9ZZWFyIC8gMTApICogMTAgKyAxMCAtICh0b1llYXIgJSAxMCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IHRvZGF5WWVhclN0YXJ0ICsgaSA8PSB0b2RheVllYXJFbmQ7IGkrKykge1xuICAgICAgaWYgKHRvZGF5WWVhclN0YXJ0ICsgaSA9PT0gdG9kYXlZZWFyU3RhcnQgfHwgdG9kYXlZZWFyU3RhcnQgKyBpID09PSB0b2RheVllYXJFbmQpIHtcbiAgICAgICAgX3llYXJWaWV3LnB1c2goXG4gICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwieWVhciB5ZWFyLWRpc2FibGVkXCIgZGF0YS12YWx1ZT1cIiR7dG9kYXlZZWFyU3RhcnQgKyBpfVwiIEBjbGljaz1cIiR7dGhpcy5feWVhckNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgIDxzcGFuPiR7dG9kYXlZZWFyU3RhcnQgKyBpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodG9kYXlZZWFyU3RhcnQgKyBpID4gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCA0KSkgfHwgdG9kYXlZZWFyU3RhcnQgKyBpIDwgTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCA0KSkpIHtcbiAgICAgICAgICBfeWVhclZpZXcucHVzaChcbiAgICAgICAgICAgIGh0bWxgPGRpdiBjbGFzcz1cInllYXIgeWVhci1kaXNhYmxlZFwiIGRhdGEtdmFsdWU9XCIke3RvZGF5WWVhclN0YXJ0ICsgaX1cIiBAY2xpY2s9XCIke3RoaXMuX3llYXJDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dG9kYXlZZWFyU3RhcnQgKyBpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF95ZWFyVmlldy5wdXNoKFxuICAgICAgICAgICAgaHRtbGA8ZGl2IGNsYXNzPVwieWVhclwiIGRhdGEtdmFsdWU9XCIke3RvZGF5WWVhclN0YXJ0ICsgaX1cIiBAY2xpY2s9XCIke3RoaXMuX3llYXJDbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgICAgIDxzcGFuPiR7dG9kYXlZZWFyU3RhcnQgKyBpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PmBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJjYWxlbmRhci15ZWFyXCI+JHtfeWVhclZpZXd9PC9kaXY+YDtcbiAgfVxuXG4gIC8qKlxuICAgKiDrhYTrj4Trpbwg7YG066at7IucIFVJIOulvCDrs4Dqsr3tlanri4jri6QuXG4gICAqICovXG4gIHByaXZhdGUgX3llYXJDbGlja0hhbmRsZXIoZTogRXZlbnQpIHtcbiAgICBjb25zdCAkZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld1llYXIgPSBOdW1iZXIoJGVsLmRhdGFzZXQudmFsdWUpO1xuICAgIHRoaXMubW9kZSA9ICdtb250aCc7XG4gICAgdGhpcy5fbW9udGhWaWV3Q2hhbmdlKE51bWJlcigkZWwuZGF0YXNldC52YWx1ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIO2YhOyerCDrs7Tsl6zsp4DripQg7IOB7YOc66W8IOuzgOqyvSDtlanri4jri6QuXG4gICAqICovXG4gIHByaXZhdGUgX21vZGVDbGlja0hhbmRsZXIoKSB7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHRoaXMuX21vbnRoVmlld0NoYW5nZSh0aGlzLl92aWV3WWVhciEpO1xuICAgICAgdGhpcy5tb2RlID0gJ21vbnRoJztcbiAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5feWVhclZpZXdDaGFuZ2UodGhpcy5fdmlld1llYXIhKTtcbiAgICAgIHRoaXMubW9kZSA9ICd5ZWFyJztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVNb2RlOiAneWVhcicgfCAnZGF5JyB8ICdtb250aCcgfCAnb3B0aW9uJyB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfb3B0aW9uQ2xpY2tIYW5kbGVyKGU6IEV2ZW50KSB7XG4gICAgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0Py5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgIHRoaXMubW9kZSA9IHRoaXMuX2JlZm9yZU1vZGUhO1xuICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgdGhpcy5fZGF5Vmlld0NoYW5nZSh0aGlzLl92aWV3WWVhciwgdGhpcy5fdmlld01vbnRoISAtIDEpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm1vZGUgPT09ICd5ZWFyJykge1xuICAgICAgICB0aGlzLl95ZWFyVmlld0NoYW5nZSh0aGlzLl92aWV3WWVhcik7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgICB0aGlzLl9tb250aFZpZXdDaGFuZ2UodGhpcy5fdmlld1llYXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9iZWZvcmVNb2RlID0gdGhpcy5tb2RlO1xuICAgICAgKGUuY3VycmVudFRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMubW9kZSA9ICdvcHRpb24nO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiAg64WE64+EIOyEoO2DnSBVSeulvCDrs4Dqsr3tlbQg7KSN64uI64ukLlxuICAgKiBAcGFyYW0geSB5ZWFyXG4gICAqICovXG4gIHByaXZhdGUgX3llYXJWaWV3Q2hhbmdlKHk/OiBudW1iZXIpIHtcbiAgICBsZXQgeWVhciA9IHRoaXMudG9ZZWFyO1xuICAgIGlmICh5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHllYXIgPSB5O1xuICAgIH1cbiAgICB0aGlzLl9iZWZvcmVWaWV3WWVhciA9IHllYXI7XG4gICAgdGhpcy5fbW9kZVZpZXcgPSBgJHtNYXRoLmZsb29yKHllYXIgLyAxMCkgKiAxMH0tJHtNYXRoLmZsb29yKHllYXIgLyAxMCkgKiAxMCArIDl9YDtcbiAgICB0aGlzLl9iZWZvcmVWaWV3ID0gdGhpcy5feWVhclBpY2tlclZpZXcoTWF0aC5mbG9vcih5ZWFyIC8gMTApICogMTAgLSAxMCk7XG4gICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX3llYXJQaWNrZXJWaWV3KE1hdGguZmxvb3IoeWVhciAvIDEwKSAqIDEwKTtcbiAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl95ZWFyUGlja2VyVmlldyhNYXRoLmZsb29yKHllYXIgLyAxMCkgKiAxMCArIDEwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAg7JuU7ISg7YOdIFVJ66W8IOuzgOqyve2VtCDspI3ri4jri6QuXG4gICAqIEBwYXJhbSB5IHllYXJcbiAgICogKi9cbiAgcHJpdmF0ZSBfbW9udGhWaWV3Q2hhbmdlKHk/OiBudW1iZXIpIHtcbiAgICBsZXQgeWVhciA9IHRoaXMudG9ZZWFyO1xuICAgIGlmICh5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHllYXIgPSB5O1xuICAgIH1cbiAgICB0aGlzLl92aWV3WWVhciA9IHllYXI7XG4gICAgdGhpcy5fbW9kZVZpZXcgPSBgJHt5ZWFyfWA7XG4gICAgdGhpcy5fYmVmb3JlVmlldyA9IHRoaXMuX21vbnRoUGlja2VyVmlldyh5ZWFyIC0gMSk7XG4gICAgdGhpcy5fbm93VmlldyA9IHRoaXMuX21vbnRoUGlja2VyVmlldyh5ZWFyKTtcbiAgICB0aGlzLl9hZnRlclZpZXcgPSB0aGlzLl9tb250aFBpY2tlclZpZXcoeWVhciArIDEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3B0aW9uTW9udGhDbGlja0hhbmRsZXIoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCAkZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgaWYgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdCcpID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhci1jb250ZW50IC5zZWxlY3QnKS5mb3JFYWNoKCRzZWxlY3QgPT4ge1xuICAgICAgICAkc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zdGFydFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICB0aGlzLl9zdGFydE1vbnRoID0gTnVtYmVyKCRlbC5kYXRhc2V0LnZhbHVlKTtcbiAgICAgIHRoaXMuX3N0YXJ0RGF5ID0gMTtcbiAgICAgIHRoaXMuX2VuZFllYXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9lbmRNb250aCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuX2VuZERheSA9IHVuZGVmaW5lZDtcbiAgICAgICRlbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuX3N0YXJ0TW9udGghIDwgTnVtYmVyKCRlbC5kYXRhc2V0LnZhbHVlKSAmJiB0aGlzLl9lbmRNb250aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2VuZFllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHRoaXMuX2VuZE1vbnRoID0gTnVtYmVyKCRlbC5kYXRhc2V0LnZhbHVlKTtcbiAgICAgICAgdGhpcy5fZW5kRGF5ID0gdGhpcy5sYXN0RGF5W3RoaXMuX2VuZE1vbnRoIC0gMV07XG4gICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdCcpPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3Qtc3RhcnQnKTtcbiAgICAgICAgJGVsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1lbmQnKTtcbiAgICAgICAgJGVsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgICAkZWwucGFyZW50RWxlbWVudCEuY2hpbGRyZW47XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGVsLnBhcmVudEVsZW1lbnQhLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgaXRlbSA9ICRlbC5wYXJlbnRFbGVtZW50IS5jaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgIGlmIChOdW1iZXIoaXRlbS5kYXRhc2V0LnZhbHVlKSA+IHRoaXMuX3N0YXJ0TW9udGghICYmIE51bWJlcihpdGVtLmRhdGFzZXQudmFsdWUpIDwgdGhpcy5fZW5kTW9udGghKSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1wZXJpb2QnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdCcpPy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QnKTtcbiAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcucGVyaW9kLW1vbnRoLnBlcmlvZCAuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5wZXJpb2QtbW9udGgucGVyaW9kIC5zZWxlY3Qtc3RhcnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LXN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnBlcmlvZC1tb250aC5wZXJpb2QgLnNlbGVjdC1lbmQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LWVuZCcpO1xuICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5wZXJpb2QtbW9udGgucGVyaW9kIC5zZWxlY3QtcGVyaW9kJyk/LmZvckVhY2goJHBlcmlvZCA9PiB7XG4gICAgICAgICAgJHBlcmlvZC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3QtcGVyaW9kJyk7XG4gICAgICAgIH0pO1xuICAgICAgICAkZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgIHRoaXMuX3N0YXJ0TW9udGggPSBOdW1iZXIoJGVsLmRhdGFzZXQudmFsdWUpO1xuICAgICAgICB0aGlzLl9lbmRZZWFyID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9lbmRNb250aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fZW5kRGF5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3ZhbHVlID1cbiAgICAgIGAke3RoaXMuX3N0YXJ0WWVhciA9PT0gdW5kZWZpbmVkID8gJ19fX18nIDogdGhpcy5fc3RhcnRZZWFyfWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX3N0YXJ0TW9udGggPT09IHVuZGVmaW5lZCA/ICdfXycgOiB0aGlzLl9zdGFydE1vbnRoIDwgMTAgPyAnMCcgKyB0aGlzLl9zdGFydE1vbnRoIDogdGhpcy5fc3RhcnRNb250aH1gICtcbiAgICAgICctJyArXG4gICAgICBgJHt0aGlzLl9zdGFydERheSA9PT0gdW5kZWZpbmVkID8gJ19fJyA6IHRoaXMuX3N0YXJ0RGF5IDwgMTAgPyAnMCcgKyB0aGlzLl9zdGFydERheSA6IHRoaXMuX3N0YXJ0RGF5fWAgK1xuICAgICAgJyB+ICcgK1xuICAgICAgYCR7dGhpcy5fZW5kWWVhciA9PT0gdW5kZWZpbmVkID8gJ19fX18nIDogdGhpcy5fZW5kWWVhcn1gICtcbiAgICAgICctJyArXG4gICAgICBgJHt0aGlzLl9lbmRNb250aCA9PT0gdW5kZWZpbmVkID8gJ19fJyA6IHRoaXMuX2VuZE1vbnRoIDwgMTAgPyAnMCcgKyB0aGlzLl9lbmRNb250aCA6IHRoaXMuX2VuZE1vbnRofWAgK1xuICAgICAgJy0nICtcbiAgICAgIGAke3RoaXMuX2VuZERheSA9PT0gdW5kZWZpbmVkID8gJ19fJyA6IHRoaXMuX2VuZERheSA8IDEwID8gJzAnICsgdGhpcy5fZW5kRGF5IDogdGhpcy5fZW5kRGF5fWA7XG4gICAgLy8gdGhpcy5fc3RhcnREYXkgPSBkYXRlLmdldERhdGUoKTtcbiAgICAvLyB0aGlzLl9lbmRZZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9udGhDbGlja0hhbmRsZXIoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCAkZWwgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fdmlld01vbnRoID0gTnVtYmVyKCRlbC5kYXRhc2V0LnZhbHVlKTtcbiAgICB0aGlzLl9kYXlWaWV3Q2hhbmdlKHRoaXMuX3ZpZXdZZWFyISwgdGhpcy5fdmlld01vbnRoIC0gMSk7XG4gICAgdGhpcy5tb2RlID0gJ2RheSc7XG4gICAgdGhpcy5fYmVmb3JlVmlld1llYXIgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVWaWV3WWVhcjogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX21vbnRoU2VsZWN0KCk6IHZvaWQge1xuICAgIGNvbnN0ICRlbCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLmNhbGVuZGFyLW1vbnRoJylbMV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgJGVsPy5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgIGlmICh0aGlzLl9iZWZvcmVWaWV3WWVhciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9iZWZvcmVWaWV3WWVhciA9IHRoaXMuX3ZpZXdZZWFyO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYmVmb3JlVmlld1llYXIgPT09IHRoaXMuX3ZpZXdZZWFyKSB7XG4gICAgICAkZWwuY2hpbGRyZW4uaXRlbSh0aGlzLl92aWV3TW9udGghIC0gMSk/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RheVNlbGVjdCgpOiB2b2lkIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYWxlbmRhci1kYXRlJylbMV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgJGVsLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgJGVsLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Qtc3RhcnQnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0LXN0YXJ0Jyk7XG4gICAgJGVsLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3QtZW5kJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdC1lbmQnKTtcbiAgICAkZWwucXVlcnlTZWxlY3RvcignLnRvZGF5Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3RvZGF5Jyk7XG5cbiAgICAkZWwucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdC1wZXJpb2QnKT8uZm9yRWFjaCgkcGVyaW9kID0+IHtcbiAgICAgICRwZXJpb2Q/LmNsYXNzTGlzdD8ucmVtb3ZlKCdzZWxlY3QtcGVyaW9kJyk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy50b1llYXIgPT09IHRoaXMuX3ZpZXdZZWFyICYmIHRoaXMudG9Nb250aCArIDEgPT09IHRoaXMuX3ZpZXdNb250aCkge1xuICAgICAgJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXknKS5mb3JFYWNoKCRkYXkgPT4ge1xuICAgICAgICBpZiAoTnVtYmVyKCgkZGF5IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSA9PT0gdGhpcy50b0RheSkge1xuICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZCgndG9kYXknKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3ZpZXdZZWFyID09PSB0aGlzLl9zdGFydFllYXIgJiYgdGhpcy5fdmlld01vbnRoID09PSB0aGlzLl9zdGFydE1vbnRoKSB7XG4gICAgICAvLyBzZWxlY3Qtc3RhcnQsc2VsZWN0IO2BtOuemCDsg53shLFcbiAgICAgICRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5JykuZm9yRWFjaCgkZGF5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0RGF5ID09PSBOdW1iZXIoKCRkYXkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpICYmIHRoaXMuX2VuZERheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgJGRheS5jbGFzc0xpc3QuYWRkKCdzZWxlY3Qtc3RhcnQnKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdGFydERheSA9PT0gTnVtYmVyKCgkZGF5IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSAmJiB0aGlzLl9lbmREYXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl92aWV3WWVhciA9PT0gdGhpcy5fZW5kWWVhciAmJiB0aGlzLl92aWV3TW9udGggPT09IHRoaXMuX2VuZE1vbnRoKSB7XG4gICAgICAvLyBzZWxlY3QtZW5kIO2BtOuemOyKpCDsg53shLFcbiAgICAgICRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5JykuZm9yRWFjaCgkZGF5ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2VuZERheSA9PT0gTnVtYmVyKCgkZGF5IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSkge1xuICAgICAgICAgICRlbC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1zdGFydCcpO1xuICAgICAgICAgICRlbC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0LWVuZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdmlld1llYXIhID49IHRoaXMuX3N0YXJ0WWVhciEgJiYgdGhpcy5fdmlld1llYXIhIDw9IHRoaXMuX2VuZFllYXIhKSB7XG4gICAgICAvLyBwZXJpb2Qg7YG0656Y7IqkIOyDneyEsVxuICAgICAgaWYgKFxuICAgICAgICAodGhpcy5fdmlld01vbnRoISA+IHRoaXMuX3N0YXJ0TW9udGghICYmIHRoaXMuX3ZpZXdNb250aCEgPCB0aGlzLl9lbmRNb250aCEpIHx8XG4gICAgICAgICh0aGlzLl92aWV3WWVhciEgPiB0aGlzLl9zdGFydFllYXIhICYmIHRoaXMuX3ZpZXdNb250aCEgPCB0aGlzLl9lbmRNb250aCEpXG4gICAgICApIHtcbiAgICAgICAgLy8gc3RhcnQg7JmAIGVuZCDqsIAg7JeG64qUIOuLrOydmCDsmIHsl63sl5AgcGVyaW9kIO2BtOuemOyKpCDsg53shLFcbiAgICAgICAgJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXknKS5mb3JFYWNoKCRkYXkgPT4ge1xuICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0LXBlcmlvZCcpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vbnRoISA9PT0gdGhpcy5fc3RhcnRNb250aCEpIHtcbiAgICAgICAgLy8gc3RhcnQg7JyE7LmY7J2YIHBlcmlvZCDtgbTrnpjsiqQg7IOd7ISxXG4gICAgICAgICRlbC5xdWVyeVNlbGVjdG9yQWxsKCcuZGF5JykuZm9yRWFjaCgkZGF5ID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5fc3RhcnREYXkhIDwgTnVtYmVyKCgkZGF5IGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2VuZERheSEgPiBOdW1iZXIoKCRkYXkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpICYmIHRoaXMuX3ZpZXdNb250aCEgPT09IHRoaXMuX2VuZE1vbnRoISkge1xuICAgICAgICAgICAgICAkZGF5LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1wZXJpb2QnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vbnRoISAhPT0gdGhpcy5fZW5kTW9udGghKSB7XG4gICAgICAgICAgICAgICRkYXkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0LXBlcmlvZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb250aCEgPT09IHRoaXMuX2VuZE1vbnRoISkge1xuICAgICAgICAvLyDri6Trpbgg64us7J2YIOuBneyngOygkCBwZXJpb2Qg7YG0656Y7IqkIOyDneyEsVxuICAgICAgICAkZWwucXVlcnlTZWxlY3RvckFsbCgnLmRheScpLmZvckVhY2goJGRheSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2VuZERheSEgPiBOdW1iZXIoKCRkYXkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpKSB7XG4gICAgICAgICAgICAkZGF5LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdC1wZXJpb2QnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3llYXJTZWxlY3QoKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yQWxsKCcuY2FsZW5kYXIteWVhcicpWzFdIGFzIEhUTUxFbGVtZW50O1xuICAgICRlbC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgIGlmICh0aGlzLl9iZWZvcmVWaWV3WWVhciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9iZWZvcmVWaWV3WWVhciA9IHRoaXMuX3ZpZXdZZWFyO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5fdmlld1llYXIgPT09IE51bWJlcigoJGVsLmNoaWxkcmVuLml0ZW0oaSkgYXMgSFRNTEVsZW1lbnQpIS5kYXRhc2V0LnZhbHVlKSkge1xuICAgICAgICAoJGVsLmNoaWxkcmVuLml0ZW0oaSkgYXMgSFRNTEVsZW1lbnQpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB1cGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpIHtcbiAgICBzdXBlci51cGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgaWYgKHRoaXMubW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHRoaXMuX2RheVNlbGVjdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9tb250aFNlbGVjdCgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5tb2RlID09PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3llYXJTZWxlY3QoKTtcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==