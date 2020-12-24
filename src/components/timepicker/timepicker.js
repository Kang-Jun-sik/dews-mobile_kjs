import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property } from 'lit-element';
import template from './timepicker.html';
import scss from './timepicker.scss';
export class Timepicker extends DewsFormComponent {
    constructor() {
        super();
        this.active = false;
        this.disabled = false;
        this.readonly = false;
        this.step = 1;
        this._value = '';
        this.$hour = [];
        this.$minute = [];
        this.$meridiem = [];
        this.toHour = new Date().getHours();
        this.toMinute = new Date().getMinutes();
        this.count = 0;
        this._clearCheck = false;
        this.domEvent = this._domClickHandler.bind(this);
        this._afterBtnView();
    }
    connectedCallback() {
        super.connectedCallback();
        this._meridiemView();
        this._hourView();
        this._minuteView();
    }
    click() {
        this._open();
    }
    _afterBtnView() {
        const $el = this.parentElement.children;
        for (let i = 0; i <= $el.length; i++) {
            if ($el.item(i) === this) {
                this._afterItem = i + 1;
                if ($el.length == i + 1) {
                    this.$nextBtn = html ``;
                }
                else {
                    if ($el.item(i + 1).hasAttribute('disabled') ||
                        $el.item(i + 1).hasAttribute('readonly') ||
                        $el.item(i + 1).localName === 'dews-button' ||
                        $el.item(i + 1).localName === 'dews-radiobutton-group' ||
                        $el.item(i + 1).localName === 'dews-checkbox-group') {
                        this.$nextBtn = html ``;
                    }
                    else {
                        this.$nextBtn = html `<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
                    }
                }
            }
        }
    }
    _confirmClickHandler() {
        this._close();
        if (!this._clearCheck) {
            let hour = this._setHour;
            let min = this._setMinute.toString();
            if (this._setMeridiem !== 'AM') {
                hour = this._setHour + 12;
            }
            if (this._setMinute < 10) {
                min = '0' + this._setMinute;
            }
            this.value = hour.toString() + min;
            this.inputValue = this._value;
        }
        else {
            this.value = '';
            this.inputValue = '';
        }
    }
    _removeClickHandler() {
        this.shadowRoot.querySelector('.drawer-layout').querySelector('.input').value = `${this._setMeridiem} __:__`;
        this._clearCheck = true;
        this.shadowRoot.querySelector('.drawer-layout')
            .querySelectorAll('.select')
            .forEach($el => {
            $el.classList.add('clear');
        });
    }
    _beforeInputHandler(e) {
        const $el = e.target;
        this._beforeValue = e.target.value;
        const cursor = e.target.selectionStart;
        if (cursor === 0) {
            if (e.data != 'A' && e.data != 'a' && e.data != 'P' && e.data != 'p' && e.data != null) {
                e.returnValue = false;
            }
        }
        else if (cursor === 1 && e.data != null) {
            if (e.data != 'M' && e.data != 'm') {
                e.returnValue = false;
            }
        }
        else if ((cursor === 2 && e.data != null) || (cursor === 3 && e.data != null)) {
            if (e.data != '1' && e.data != '0' && e.data != null) {
                e.returnValue = false;
            }
        }
        else if (cursor === 6 && e.data != null) {
            if (e.data != '6' &&
                e.data != '5' &&
                e.data != '4' &&
                e.data != '3' &&
                e.data != '2' &&
                e.data != '1' &&
                e.data != '0' &&
                e.data != null) {
                e.returnValue = false;
            }
        }
        else if ((/\d/.exec(e.data) == null && e.data != null) || ($el.selectionStart > 7 && e.data != null)) {
            e.returnValue = false;
        }
    }
    _inputHandler(e) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        let cursor = e.target.selectionStart;
        let value = e.target.value;
        value = value.toUpperCase();
        if (value.search(/[^0-9APM:_ ]/g) >= 0) {
            e.target.value = this._beforeValue;
            e.target.setSelectionRange(cursor - 1, cursor - 1);
            return;
        }
        if (cursor === 2 && e.data != null) {
            e.target.value = value.slice(0, 2) + ' ' + value.slice(4, 9);
            if (this.min !== undefined && this.max !== undefined) {
                const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-allday-wrap .moving-list');
                if ($el.children.length > 1) {
                    if (value.slice(0, 2) === 'AM') {
                        this._setMeridiem = 'AM';
                        this._meridiemSelect(0);
                    }
                    else {
                        this._setMeridiem = 'PM';
                        this._meridiemSelect(1);
                    }
                }
                else {
                    this._setMeridiem = $el.children.item(0).dataset.value;
                    this._meridiemSelect(0);
                }
            }
            else if (value.slice(0, 2) === 'AM') {
                this._setMeridiem = 'AM';
                this._meridiemSelect(0);
            }
            else {
                this._setMeridiem = 'PM';
                this._meridiemSelect(1);
            }
            this._inputChange();
            this._meridiemPositionChange();
            cursor++;
        }
        else if (cursor === 3 && e.data != null) {
            e.target.value = value.slice(0, 2) + ' ' + value.slice(2, 3) + value.slice(5, 9);
            cursor++;
        }
        else if (cursor === 5 && e.data != null) {
            const hour = Number(value.slice(3, 5));
            /*
             * 최대값 처리 및 최소값처리
             * */
            if (this._setMeridiem === 'AM' && Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 2)) > hour) {
                this._setHour = Number((_b = this.min) === null || _b === void 0 ? void 0 : _b.slice(0, 2));
                this._hourSelect(0);
                this._inputChange();
            }
            else if (this._setMeridiem === 'AM' && Number((_c = this.max) === null || _c === void 0 ? void 0 : _c.slice(0, 2)) < hour) {
                e.target.value =
                    value.slice(0, cursor - 2) + ((_d = this.max) === null || _d === void 0 ? void 0 : _d.slice(0, 2)) + ':' + value.slice(7, 9);
                this._setHour = Number((_e = this.max) === null || _e === void 0 ? void 0 : _e.slice(0, 2));
                this._hourSelect(this.shadowRoot.querySelector('.drawer-layout .spinner-hour-wrap .moving-list').children.length - 1);
            }
            else if (this._setMeridiem === 'PM' && Number((_f = this.max) === null || _f === void 0 ? void 0 : _f.slice(0, 2)) - 12 < hour) {
                /*
                 * 최소값 처리 및 최대값 처리
                 * */
                if (Number((_g = this.max) === null || _g === void 0 ? void 0 : _g.slice(0, 2)) - 12 < 10) {
                    e.target.value =
                        value.slice(0, cursor - 2) + '0' + (Number((_h = this.max) === null || _h === void 0 ? void 0 : _h.slice(0, 2)) - 12) + ':' + value.slice(7, 9);
                }
                else {
                    e.target.value =
                        value.slice(0, cursor - 2) + (Number((_j = this.max) === null || _j === void 0 ? void 0 : _j.slice(0, 2)) - 12) + ':' + value.slice(7, 9);
                }
                this._setHour = Number((_k = this.max) === null || _k === void 0 ? void 0 : _k.slice(0, 2)) - 12;
                this._hourSelect(this.shadowRoot.querySelector('.drawer-layout .spinner-hour-wrap .moving-list').children.length - 1);
            }
            else if (this._setMeridiem === 'PM' && Number((_l = this.min) === null || _l === void 0 ? void 0 : _l.slice(0, 2)) - 12 > hour) {
                e.target.value =
                    value.slice(0, cursor - 2) + ((_m = this.min) === null || _m === void 0 ? void 0 : _m.slice(0, 2)) + ':' + value.slice(7, 9);
                this._setHour = Number((_o = this.min) === null || _o === void 0 ? void 0 : _o.slice(0, 2)) - 12;
                this._hourSelect(0);
            }
            else if (Number(value.slice(3, 5)) > 12) {
                e.target.value = value.slice(0, cursor - 2) + '12:' + value.slice(7, 9);
                this._setHour = 12;
                this._hourSelect(this.shadowRoot.querySelector('.drawer-layout .spinner-hour-wrap .moving-list').children.length - 1);
                this._inputChange();
            }
            else if (Number(value.slice(3, 5)) < 1) {
                e.target.value = value.slice(0, cursor - 2) + '01:' + value.slice(7, 9);
                this._hourSelect(0);
                this._setHour = 1;
            }
            else {
                const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-hour-wrap .moving-list');
                if ($el.children.length < 12) {
                    for (let i = 0; i < $el.children.length; i++) {
                        if (Number($el.children.item(i).dataset.value) === Number(value.slice(3, 5))) {
                            this._hourSelect(i);
                        }
                    }
                    this._setHour = Number(value.slice(3, 5));
                }
                else {
                    e.target.value = value.slice(0, cursor) + ':' + value.slice(7, 9);
                    this._hourSelect(Number(value.slice(3, 5)) - 1);
                    this._setHour = Number(value.slice(3, 5));
                }
            }
            this._hourPositionChange();
            this._inputChange();
            cursor++;
        }
        else if (cursor === 6 && e.data != null) {
            e.target.value =
                value.slice(0, cursor - 1) + ':' + value.slice(cursor - 1, cursor) + value.slice(8, 9);
            cursor++;
        }
        else if (cursor === 8 && e.data != null) {
            const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-minute-wrap .moving-list');
            if ($el.children.length !== 60) {
                let min = Number((_p = this.min) === null || _p === void 0 ? void 0 : _p.slice(0, 2));
                let valueMax = Number(value.slice(3, 5));
                if (Number((_q = this.min) === null || _q === void 0 ? void 0 : _q.slice(0, 2)) > 12) {
                    min -= 12;
                }
                if (this._setMeridiem === 'PM') {
                    valueMax += 12;
                }
                if (min === Number(value.slice(3, 5)) && Number((_r = this.min) === null || _r === void 0 ? void 0 : _r.slice(2, 4)) > Number(value.slice(6, 8))) {
                    /*
                     * 정상적인 범위 미만의 입력
                     * */
                    this._minuteSelect(0);
                    this._setMinute = Number((_s = this.min) === null || _s === void 0 ? void 0 : _s.slice(2, 4));
                }
                else if (Number((_t = this.max) === null || _t === void 0 ? void 0 : _t.slice(0, 2)) < valueMax &&
                    Number((_u = this.max) === null || _u === void 0 ? void 0 : _u.slice(2, 4)) < Number(value.slice(6, 8))) {
                    /*
                     * 정상적인 범위 초과의 입력
                     * */
                    this._minuteSelect($el.children.length - 1);
                    this._setMinute = Number($el.children.item($el.children.length - 1).dataset.value);
                }
                else {
                    /*
                     * 정상적인 범위의 입력
                     * */
                    for (let i = 0; i < $el.children.length; i++) {
                        if (Number($el.children.item(i).dataset.value) ===
                            Math.ceil(Number(value.slice(6, 8)) / this.step) * this.step) {
                            this._setMinute = Number(Math.ceil(Math.ceil(Number(value.slice(6, 8))) / this.step) * this.step);
                            this._minuteSelect(i);
                        }
                    }
                }
            }
            else if (Number(value.slice(6, 8)) > 59) {
                e.target.value = value.slice(0, 6) + '59';
                this._setMinute = 59;
                this._minuteSelect(58);
            }
            else {
                e.target.value = value.slice(0, 6) + value.slice(6, 8);
                this._setMinute = Number(value.slice(6, 8));
                this._minuteSelect(this._setMinute);
            }
            this._minutePositionChange();
            this._inputChange();
        }
        else {
            if (e.data != null) {
                if (cursor === 3 || cursor === 5) {
                    e.target.value = value.slice(0, cursor - 1) + value.slice(cursor + 1, 9);
                }
                else {
                    e.target.value = value.slice(0, cursor) + value.slice(cursor + 1, 9);
                }
            }
            else {
                if ((cursor > 2 && cursor < 5) || (cursor > 5 && cursor < 8)) {
                    e.target.value = value.slice(0, cursor) + '_' + value.slice(cursor, 9);
                }
                else if (cursor === 5) {
                    e.target.value = value.slice(0, cursor - 1) + '_:' + value.slice(cursor, 9);
                    cursor--;
                }
                else if (cursor === 2) {
                    e.target.value = value.slice(0, cursor - 1) + '  ' + value.slice(cursor, 9);
                    cursor--;
                }
                else {
                    e.target.value = value.slice(0, cursor) + ' ' + value.slice(cursor, 9);
                }
            }
        }
        e.target.setSelectionRange(cursor, cursor);
    }
    /*
     * 시간 element 생성
     * */
    _hourView() {
        this.$hour = [];
        let j = 1;
        if (this.min !== undefined && this.max !== undefined) {
            let min = Number(this.min.slice(0, 2));
            let max = Number(this.max.slice(0, 2));
            if (min === 0) {
                min = 1;
            }
            if (this._setMeridiem === 'AM') {
                if (max < 13) {
                    for (let i = min; i <= max; i++) {
                        this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                }
                else {
                    for (let i = min; i <= 11; i++) {
                        this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                    if (max === 24) {
                        this.$hour.push(html `<li data-value="12" data-index="${j}"><button>12</button></li>`);
                    }
                }
            }
            else {
                max = max - 12;
                if (min > 12) {
                    min = min - 12;
                    for (let i = min; i <= max - 1; i++) {
                        this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                }
                else {
                    this.$hour.push(html `<li data-value="12" data-index="${j}"><button>12</button></li>`);
                    j++;
                    for (let i = 1; i <= max; i++) {
                        this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                }
            }
        }
        else if (this._setMeridiem === 'PM') {
            this.$hour.push(html `<li data-value="12" data-index="${j}"><button>12</button></li>`);
            j++;
            for (let i = 1; i <= 11; i++) {
                this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                j++;
            }
        }
        else {
            for (let i = 1; i <= 12; i++) {
                this.$hour.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                j++;
            }
        }
    }
    /*
     * 해당되는 시간에 select 클래스 생성
     * */
    _hourSelect(num) {
        var _a, _b, _c, _d;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-hour-wrap .moving-list');
        this._clearCheck = false;
        (_a = $el.querySelector('.clear')) === null || _a === void 0 ? void 0 : _a.classList.remove('clear');
        (_b = $el.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.classList.remove('select');
        if (num !== undefined) {
            (_c = $el.children.item(num)) === null || _c === void 0 ? void 0 : _c.classList.add('select');
            this._setHour = Number($el.children.item(num).dataset.value);
            this._inputChange();
        }
        else {
            (_d = $el.children.item((this.toHour % 12) - 1)) === null || _d === void 0 ? void 0 : _d.classList.add('select');
            this._setHour = Number($el.children.item((this.toHour % 12) - 1).dataset.value);
        }
        this._minuteView();
    }
    /*
     *  select 클래스를 찾아 그 위치로 spinner 이동
     * */
    _hourPositionChange(num) {
        var _a, _b, _c, _d, _e;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-hour-wrap .moving-list');
        const height = (_a = $el.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientHeight;
        if (num === undefined) {
            if ($el.querySelector('.select') === null) {
                num = 0;
                this._hourSelect(0);
            }
            else if (Number((_c = (_b = $el.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.value) !== this._setHour) {
                for (let i = 0; i < $el.children.length; i++) {
                    if (Number($el.children.item(i).dataset.value) === this._setHour) {
                        num = i;
                        this._hourSelect(i);
                    }
                }
                if (num === undefined) {
                    num = 0;
                    this._hourSelect(0);
                }
            }
            else {
                num = Number((_e = (_d = $el.querySelector('.select')) === null || _d === void 0 ? void 0 : _d.dataset) === null || _e === void 0 ? void 0 : _e.index) - 1;
            }
        }
        $el.parentElement.style.transform = `translateY(-${num * height}px)`;
    }
    /*
     *  분 element 생성
     * */
    _minuteView() {
        this.$minute = [];
        let j = 0;
        if (this.min !== undefined && this.max !== undefined) {
            const min = Math.round(Number(this.min.slice(2, 4)) / this.step) * this.step;
            const max = Number(this.max.slice(2, 4));
            let hour = this._setHour;
            if (this._setMeridiem === 'PM' && this._setHour !== 12) {
                hour = hour + 12;
            }
            if (hour === Number(this.min.slice(0, 2))) {
                if (hour === Number(this.max.slice(0, 2))) {
                    for (let i = min; i <= max; i += this.step) {
                        this.$minute.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                }
                else {
                    for (let i = min; i < 60; i += this.step) {
                        this.$minute.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                        j++;
                    }
                }
            }
            else if (hour === Number(this.max.slice(0, 2))) {
                for (let i = 0; i <= max; i += this.step) {
                    this.$minute.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                    j++;
                }
            }
            else {
                for (let i = 0; i < 60; i += this.step) {
                    this.$minute.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                    j++;
                }
            }
        }
        else {
            for (let i = 0; i < 60; i += this.step) {
                this.$minute.push(html `<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
                j++;
            }
        }
    }
    /*
     * 해당되는 분에 select 클래스 생성
     * */
    _minuteSelect(num) {
        var _a, _b, _c, _d, _e, _f, _g;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-minute-wrap .moving-list');
        (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.remove('select');
        (_b = $el.querySelector('.clear')) === null || _b === void 0 ? void 0 : _b.classList.remove('clear');
        this._clearCheck = false;
        if (num !== undefined) {
            if ($el.children.item(num) === null) {
                this._setMinute = Number((_c = $el.children.item(0)) === null || _c === void 0 ? void 0 : _c.dataset.value);
                (_d = $el.children.item(0)) === null || _d === void 0 ? void 0 : _d.classList.add('select');
            }
            else {
                this._setMinute = Number((_e = $el.children.item(num)) === null || _e === void 0 ? void 0 : _e.dataset.value);
                (_f = $el.children.item(num)) === null || _f === void 0 ? void 0 : _f.classList.add('select');
            }
        }
        else {
            $el.children.item(this.toMinute).classList.add('select');
            this._setMinute = Number((_g = $el.children.item(this.toMinute)) === null || _g === void 0 ? void 0 : _g.dataset.value);
        }
        this._inputChange();
    }
    /*
     *  select 클래스를 찾아 그 위치로 spinner 이동
     * */
    _minutePositionChange(num) {
        var _a, _b, _c, _d, _e;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-minute-wrap .moving-list');
        const height = (_a = $el.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientHeight;
        if (num === undefined) {
            if ($el.querySelector('.select') === null) {
                this._minuteSelect(0);
                num = 0;
            }
            else {
                if (this._setMinute !== Number((_c = (_b = $el.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.dataset) === null || _c === void 0 ? void 0 : _c.value)) {
                    for (let i = 0; i < $el.children.length; i++) {
                        if (this._setMinute === Number($el.children.item(i).dataset.value)) {
                            num = i;
                            this._minuteSelect(Number($el.children.item(i).dataset.index));
                        }
                    }
                    if (num === undefined) {
                        num = 0;
                        this._setMinute = Number($el.children.item(0).dataset.value);
                    }
                    this._inputChange();
                }
                else {
                    num = Number((_e = (_d = $el.querySelector('.select')) === null || _d === void 0 ? void 0 : _d.dataset) === null || _e === void 0 ? void 0 : _e.index);
                }
            }
        }
        $el.parentElement.style.transform = `translateY(-${num * height}px)`;
    }
    /*
     * 해당되는 AM,PM에 select 클래스 생성
     * */
    _meridiemView() {
        var _a, _b;
        this.$meridiem = [];
        if (this.min !== undefined && this.max !== undefined) {
            if (Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 2)) > 12) {
                //  PM 만 생성
                this._setMeridiem = 'PM';
                this.$meridiem.push(html `<li data-value="PM" data-index="0"><button>PM</button></li>`);
            }
            else {
                //  AM 생성
                this._setMeridiem = 'AM';
                this.$meridiem.push(html `<li data-value="AM" data-index="0"><button>AM</button></li>`);
                if (Number((_b = this.max) === null || _b === void 0 ? void 0 : _b.slice(0, 2)) > 12) {
                    this.$meridiem.push(html `<li data-value="PM" data-index="1"><button>PM</button></li>`);
                    //  pm 생성
                }
            }
        }
        else {
            this.$meridiem.push(html `<li data-value="AM" data-index="0"><button>AM</button></li>`);
            this.$meridiem.push(html `<li data-value="PM" data-index="1"><button>PM</button></li>`);
        }
    }
    _meridiemSelect(num) {
        var _a, _b;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-allday-wrap .moving-list');
        (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.classList.remove('select');
        (_b = $el.querySelector('.clear')) === null || _b === void 0 ? void 0 : _b.classList.remove('clear');
        this._clearCheck = false;
        if (num !== undefined) {
            this._setMeridiem = $el.children.item(num).dataset.value;
            $el.children.item(num).classList.add('select');
        }
        else {
            if (this.min !== undefined && this.max !== undefined) {
                $el.children.item(0).classList.add('select');
                this._setMeridiem = $el.children.item(0).dataset.value;
            }
            else {
                if (this.toHour / 12 >= 1) {
                    $el.children.item(1).classList.add('select');
                    this._setMeridiem = $el.children.item(1).dataset.value;
                }
                else {
                    $el.children.item(0).classList.add('select');
                    this._setMeridiem = $el.children.item(0).dataset.value;
                }
            }
        }
    }
    /*
     *  select 클래스를 찾아 그 위치로 spinner 이동
     * */
    _meridiemPositionChange(num) {
        var _a, _b;
        const $el = this.shadowRoot.querySelector('.drawer-layout').querySelector('.spinner-allday-wrap .moving-list');
        const height = $el.children.item(0).clientHeight;
        if (num === undefined) {
            num = Number((_b = (_a = $el.querySelector('.select')) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.index);
        }
        $el.parentElement.style.transform = `translateY(-${num * height}px)`;
    }
    _touchStartHandler(e) {
        var _a, _b;
        this._touchStartPoint = e.changedTouches[0].pageY;
        this._touchStartPosition = Math.abs(Number((_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.style.transform.split('(')[1].split('px')[0]));
        (_b = e.currentTarget.parentElement.querySelector('.select')) === null || _b === void 0 ? void 0 : _b.classList.remove('select');
    }
    _touchMoveHandler(e) {
        e.preventDefault();
        const $el = e.currentTarget.parentElement;
        const height = e.currentTarget.children.item(0).clientHeight;
        this._movePoint = this._touchStartPosition - (e.changedTouches[0].pageY - this._touchStartPoint) * 1.3;
        if (height * ($el.children[0].childElementCount - 1) <= this._movePoint) {
            this._movePoint = height * ($el.children[0].childElementCount - 1);
        }
        else {
            if (this._movePoint < 10) {
                this._movePoint = 0;
            }
            $el.style.transform = `translateY(-${this._movePoint}px)`;
        }
    }
    _touchEndHandler(e) {
        const $el = e.currentTarget.parentElement;
        const height = e.currentTarget.children.item(0).clientHeight;
        this._movePoint = Math.abs(Number(e.currentTarget.parentElement.style.transform.split('(')[1].split('px')[0]));
        $el.style.transform = `translateY(-${Math.round(this._movePoint / height) * height}px)`;
        const index = Number($el.querySelector('.moving-list').children.item(Math.round(this._movePoint / height))
            .dataset.index);
        if ($el.parentElement.classList.contains('hour')) {
            this._hourSelect(index - 1);
        }
        else if ($el.parentElement.classList.contains('minute')) {
            this._minuteSelect(index);
        }
        else {
            this._meridiemSelect(index);
            this._hourView();
            this._minuteView();
        }
        this._inputChange();
        this.shadowRoot.querySelector('.drawer-layout')
            .querySelectorAll('.clear')
            .forEach($clear => {
            $clear.classList.remove('clear');
        });
        this._clearCheck = false;
    }
    _inputChange() {
        this._value = `${this._setMeridiem} ${this._setHour < 10 ? '0' + this._setHour : this._setHour}:${this._setMinute < 10 ? '0' + this._setMinute : this._setMinute}`;
        this.shadowRoot.querySelector('.drawer-layout').querySelector('.input').value = this._value;
    }
    _selectRemove() {
        this.shadowRoot.querySelector('.drawer-layout')
            .querySelectorAll('.select')
            .forEach($el => {
            $el.classList.remove('select');
        });
    }
    //  drower layout 처리 *_*
    _nextBtnClickHandler(e) {
        var _a, _b, _c;
        const $el = (_c = (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.children[this._afterItem]) === null || _c === void 0 ? void 0 : _c.children[0];
        this._confirmClickHandler();
        $el === null || $el === void 0 ? void 0 : $el.click();
    }
    _domClickHandler(e) {
        if (e.isTrusted) {
            if (e.clientY <
                window.innerHeight -
                    this.shadowRoot.querySelector('.drawer-layout').shadowRoot.querySelector('.layer-bottom').clientHeight) {
                if (this.count > 0) {
                    this._close();
                }
                else {
                    this.count++;
                }
            }
        }
    }
    _clickHandler(e) {
        if (!this.disabled && !this.readonly && this.active === false) {
            this.shadowRoot.querySelector('.select-wrap').classList.add('focus');
            if (this.value === undefined) {
                const today = new Date();
                if (this.min === undefined && this.max === undefined) {
                    this._setHour = today.getHours() / 12 <= 1 ? today.getHours() : today.getHours() % 12;
                    this._setMinute = today.getMinutes();
                    this._setMeridiem = today.getHours() / 12 <= 1 ? 'AM' : 'PM';
                    this._meridiemSelect(this._setMeridiem === 'AM' ? 0 : 1);
                    this._hourSelect(this._setHour - 1);
                    this._minuteSelect(Math.ceil(this._setMinute / this.step));
                }
            }
            this._open();
            this._scrollChange();
        }
    }
    _scrollChange() {
        var _a;
        window.scrollTo(0, window.pageYOffset + ((_a = this.parentElement.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.top) -
            this.shadowRoot.querySelector('.time-picker-wrap').clientHeight -
            25);
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
    async firstUpdated(_changedProperties) {
        var _a;
        super.firstUpdated(_changedProperties);
        if (this.min === undefined || this.max === undefined || this.value === undefined) {
            if (this.min === undefined && this.max === undefined && this.value === undefined) {
                if (this.toHour < 13) {
                    this._meridiemSelect(0);
                    this._hourSelect(this.toHour - 1);
                }
                else {
                    this._meridiemSelect(1);
                    this._hourSelect(this.toHour - 13);
                }
                this._minuteSelect(this.toMinute);
            }
            if (this.value !== undefined) {
                let hour = Number(this.value.slice(0, 2)) - 1;
                if (hour > 12) {
                    hour = hour - 13;
                    if (Number((_a = this.min) === null || _a === void 0 ? void 0 : _a.slice(0, 2)) < 13) {
                        this._meridiemSelect(1);
                    }
                    else {
                        this._meridiemSelect(0);
                    }
                }
                else {
                    this._meridiemSelect(0);
                }
                this._hourSelect(hour);
                this._minuteSelect(Math.ceil(Number(this.value.slice(2, 4)) / this.step));
                this.inputValue = this._value;
            }
            else {
                this._meridiemSelect(0);
                this._hourSelect(0);
                this._minuteSelect(0);
            }
        }
        else if (this.value != undefined) {
            if (Number(this.value.slice(0, 2)) < 13) {
                this._meridiemSelect(0);
                this._hourSelect(Number(this.value.slice(0, 2)) - 1);
            }
            else {
                this._meridiemSelect(1);
                this._hourSelect(Number(this.value.slice(0, 2)) - 13);
            }
            this._minuteSelect(Number(this.value.slice(2, 4)));
        }
        else {
            this._meridiemSelect(0);
            this._hourSelect(0);
            this._minuteSelect(0);
        }
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        this._hourPositionChange();
        this._minutePositionChange();
        this._meridiemPositionChange();
    }
    render() {
        return template.call(this);
    }
}
Timepicker.styles = scss;
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Timepicker.prototype, "active", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Timepicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Timepicker.prototype, "readonly", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Timepicker.prototype, "height", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Timepicker.prototype, "value", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Timepicker.prototype, "min", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Timepicker.prototype, "max", void 0);
__decorate([
    property({ type: Number, attribute: 'minute-interval' }),
    __metadata("design:type", Object)
], Timepicker.prototype, "step", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Timepicker.prototype, "_value", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Timepicker.prototype, "inputValue", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], Timepicker.prototype, "$hour", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], Timepicker.prototype, "$minute", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], Timepicker.prototype, "$meridiem", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWVwaWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUUvRixPQUFPLFFBQVEsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLElBQUksTUFBTSxtQkFBbUIsQ0FBQztBQUVyQyxNQUFNLE9BQU8sVUFBVyxTQUFRLGlCQUFpQjtJQXVEL0M7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQXJERixXQUFNLEdBQXdCLEtBQUssQ0FBQztRQUc1QyxhQUFRLEdBQXdCLEtBQUssQ0FBQztRQUd0QyxhQUFRLEdBQXdCLEtBQUssQ0FBQztRQWV0QyxTQUFJLEdBQXVCLENBQUMsQ0FBQztRQUdyQixXQUFNLEdBQXVCLEVBQUUsQ0FBQztRQU1oQyxVQUFLLEdBQTBCLEVBQUUsQ0FBQztRQUdsQyxZQUFPLEdBQTBCLEVBQUUsQ0FBQztRQUdwQyxjQUFTLEdBQTBCLEVBQUUsQ0FBQztRQUV0QyxXQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMvQixhQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUtuQyxVQUFLLEdBQXVCLENBQUMsQ0FBQztRQUc5QixnQkFBVyxHQUF3QixLQUFLLENBQUM7UUErcUJ6QyxhQUFRLEdBQWtCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFrQixDQUFDO1FBeHFCbEYsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFD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SSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzs7d0NBQzVCO0FBRzdCO0lBREMsZ0JBQWdCLEVBQUU7OzBDQUNxQjtBQUd4QztJQURDLGdCQUFnQixFQUFFOzs4Q0FDb0I7QUFHdkM7SUFEQyxnQkFBZ0IsRUFBRTs4QkFDSixLQUFLO3lDQUFzQjtBQUcxQztJQURDLGdCQUFnQixFQUFFOzhCQUNGLEtBQUs7MkNBQXNCO0FBRzVDO0lBREMsZ0JBQWdCLEVBQUU7OEJBQ0EsS0FBSzs2Q0FBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXdzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0Zvcm1Db21wb25lbnQuanMnO1xuaW1wb3J0IHsgaHRtbCwgaW50ZXJuYWxQcm9wZXJ0eSwgcHJvcGVydHksIFByb3BlcnR5VmFsdWVzLCBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGltZXBpY2tlci5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vdGltZXBpY2tlci5zY3NzJztcblxuZXhwb3J0IGNsYXNzIFRpbWVwaWNrZXIgZXh0ZW5kcyBEZXdzRm9ybUNvbXBvbmVudCB7XG4gIHN0YXRpYyBzdHlsZXMgPSBzY3NzO1xuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgYWN0aXZlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuICBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbiAgcmVhZG9ubHk6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSBmYWxzZTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIGhlaWdodDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICB2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBtaW46IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgbWF4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogTnVtYmVyLCBhdHRyaWJ1dGU6ICdtaW51dGUtaW50ZXJ2YWwnIH0pXG4gIHN0ZXA6IG51bWJlciB8IHVuZGVmaW5lZCA9IDE7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIF92YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gJyc7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIGlucHV0VmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgJGhvdXI6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSAkbWludXRlOiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgJG1lcmlkaWVtOiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBwcml2YXRlIHRvSG91ciA9IG5ldyBEYXRlKCkuZ2V0SG91cnMoKTtcbiAgcHJpdmF0ZSB0b01pbnV0ZSA9IG5ldyBEYXRlKCkuZ2V0TWludXRlcygpO1xuXG4gIHByaXZhdGUgX3NldEhvdXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfc2V0TWludXRlOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3NldE1lcmlkaWVtOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgY291bnQ6IG51bWJlciB8IHVuZGVmaW5lZCA9IDA7XG4gIHByaXZhdGUgX2FmdGVySXRlbTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlICRuZXh0QnRuOiBUZW1wbGF0ZVJlc3VsdCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfY2xlYXJDaGVjazogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICBwcml2YXRlIF90b3VjaFN0YXJ0UG9pbnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfdG91Y2hTdGFydFBvc2l0aW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX21vdmVQb2ludDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWZ0ZXJCdG5WaWV3KCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX21lcmlkaWVtVmlldygpO1xuICAgIHRoaXMuX2hvdXJWaWV3KCk7XG4gICAgdGhpcy5fbWludXRlVmlldygpO1xuICB9XG5cbiAgY2xpY2soKSB7XG4gICAgdGhpcy5fb3BlbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWZ0ZXJCdG5WaWV3KCk6IHZvaWQge1xuICAgIGNvbnN0ICRlbCA9IHRoaXMucGFyZW50RWxlbWVudCEuY2hpbGRyZW47XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gJGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoJGVsLml0ZW0oaSkgPT09IHRoaXMpIHtcbiAgICAgICAgdGhpcy5fYWZ0ZXJJdGVtID0gaSArIDE7XG4gICAgICAgIGlmICgkZWwubGVuZ3RoID09IGkgKyAxKSB7XG4gICAgICAgICAgdGhpcy4kbmV4dEJ0biA9IGh0bWxgYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgICAgICAgJGVsLml0ZW0oaSArIDEpIS5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykgfHxcbiAgICAgICAgICAgICRlbC5pdGVtKGkgKyAxKSEubG9jYWxOYW1lID09PSAnZGV3cy1idXR0b24nIHx8XG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmxvY2FsTmFtZSA9PT0gJ2Rld3MtcmFkaW9idXR0b24tZ3JvdXAnIHx8XG4gICAgICAgICAgICAkZWwuaXRlbShpICsgMSkhLmxvY2FsTmFtZSA9PT0gJ2Rld3MtY2hlY2tib3gtZ3JvdXAnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGBgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGA8YnV0dG9uIGNsYXNzPVwibmV4dC1pY29uLWJ1dHRvblwiIEBjbGljaz1cIiR7dGhpcy5fbmV4dEJ0bkNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgPHNwYW4+64uk7J2MPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfY29uZmlybUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLl9jbG9zZSgpO1xuICAgIGlmICghdGhpcy5fY2xlYXJDaGVjaykge1xuICAgICAgbGV0IGhvdXIgPSB0aGlzLl9zZXRIb3VyO1xuICAgICAgbGV0IG1pbiA9IHRoaXMuX3NldE1pbnV0ZSEudG9TdHJpbmcoKTtcbiAgICAgIGlmICh0aGlzLl9zZXRNZXJpZGllbSAhPT0gJ0FNJykge1xuICAgICAgICBob3VyID0gdGhpcy5fc2V0SG91ciEgKyAxMjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9zZXRNaW51dGUhIDwgMTApIHtcbiAgICAgICAgbWluID0gJzAnICsgdGhpcy5fc2V0TWludXRlO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IGhvdXIhLnRvU3RyaW5nKCkgKyBtaW47XG4gICAgICB0aGlzLmlucHV0VmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgICAgdGhpcy5pbnB1dFZhbHVlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlQ2xpY2tIYW5kbGVyKCkge1xuICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmlucHV0J1xuICAgICkgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBgJHt0aGlzLl9zZXRNZXJpZGllbX0gX186X19gO1xuICAgIHRoaXMuX2NsZWFyQ2hlY2sgPSB0cnVlO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSFcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCcuc2VsZWN0JylcbiAgICAgIC5mb3JFYWNoKCRlbCA9PiB7XG4gICAgICAgICRlbCEuY2xhc3NMaXN0LmFkZCgnY2xlYXInKTtcbiAgICAgIH0pO1xuICB9XG4gIHByaXZhdGUgX2JlZm9yZVZhbHVlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2JlZm9yZUlucHV0SGFuZGxlcihlOiBJbnB1dEV2ZW50KSB7XG4gICAgY29uc3QgJGVsOiBIVE1MSW5wdXRFbGVtZW50ID0gZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLl9iZWZvcmVWYWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZTtcbiAgICBjb25zdCBjdXJzb3IgPSAoZS50YXJnZXQhIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnNlbGVjdGlvblN0YXJ0O1xuICAgIGlmIChjdXJzb3IgPT09IDApIHtcbiAgICAgIGlmIChlLmRhdGEgIT0gJ0EnICYmIGUuZGF0YSAhPSAnYScgJiYgZS5kYXRhICE9ICdQJyAmJiBlLmRhdGEgIT0gJ3AnICYmIGUuZGF0YSAhPSBudWxsKSB7XG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gMSAmJiBlLmRhdGEgIT0gbnVsbCkge1xuICAgICAgaWYgKGUuZGF0YSAhPSAnTScgJiYgZS5kYXRhICE9ICdtJykge1xuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoY3Vyc29yID09PSAyICYmIGUuZGF0YSAhPSBudWxsKSB8fCAoY3Vyc29yID09PSAzICYmIGUuZGF0YSAhPSBudWxsKSkge1xuICAgICAgaWYgKGUuZGF0YSAhPSAnMScgJiYgZS5kYXRhICE9ICcwJyAmJiBlLmRhdGEgIT0gbnVsbCkge1xuICAgICAgICBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJzb3IgPT09IDYgJiYgZS5kYXRhICE9IG51bGwpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS5kYXRhICE9ICc2JyAmJlxuICAgICAgICBlLmRhdGEgIT0gJzUnICYmXG4gICAgICAgIGUuZGF0YSAhPSAnNCcgJiZcbiAgICAgICAgZS5kYXRhICE9ICczJyAmJlxuICAgICAgICBlLmRhdGEgIT0gJzInICYmXG4gICAgICAgIGUuZGF0YSAhPSAnMScgJiZcbiAgICAgICAgZS5kYXRhICE9ICcwJyAmJlxuICAgICAgICBlLmRhdGEgIT0gbnVsbFxuICAgICAgKSB7XG4gICAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCgvXFxkLy5leGVjKGUuZGF0YSEpID09IG51bGwgJiYgZS5kYXRhICE9IG51bGwpIHx8ICgkZWwuc2VsZWN0aW9uU3RhcnQhID4gNyAmJiBlLmRhdGEgIT0gbnVsbCkpIHtcbiAgICAgIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbnB1dEhhbmRsZXIoZTogSW5wdXRFdmVudCkge1xuICAgIGxldCBjdXJzb3IgPSAoZS50YXJnZXQhIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnNlbGVjdGlvblN0YXJ0ITtcbiAgICBsZXQgdmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgdmFsdWUgPSB2YWx1ZS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmICh2YWx1ZS5zZWFyY2goL1teMC05QVBNOl8gXS9nKSA+PSAwKSB7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB0aGlzLl9iZWZvcmVWYWx1ZSE7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkuc2V0U2VsZWN0aW9uUmFuZ2UoY3Vyc29yISAtIDEsIGN1cnNvciEgLSAxKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY3Vyc29yID09PSAyICYmIGUuZGF0YSAhPSBudWxsKSB7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCAyKSArICcgJyArIHZhbHVlLnNsaWNlKDQsIDkpO1xuXG4gICAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0ICRlbCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAnLnNwaW5uZXItYWxsZGF5LXdyYXAgLm1vdmluZy1saXN0J1xuICAgICAgICApITtcbiAgICAgICAgaWYgKCRlbC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgaWYgKHZhbHVlLnNsaWNlKDAsIDIpID09PSAnQU0nKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRNZXJpZGllbSA9ICdBTSc7XG4gICAgICAgICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2V0TWVyaWRpZW0gPSAnUE0nO1xuICAgICAgICAgICAgdGhpcy5fbWVyaWRpZW1TZWxlY3QoMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3NldE1lcmlkaWVtID0gKCRlbC5jaGlsZHJlbi5pdGVtKDApIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlO1xuICAgICAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlLnNsaWNlKDAsIDIpID09PSAnQU0nKSB7XG4gICAgICAgIHRoaXMuX3NldE1lcmlkaWVtID0gJ0FNJztcbiAgICAgICAgdGhpcy5fbWVyaWRpZW1TZWxlY3QoMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zZXRNZXJpZGllbSA9ICdQTSc7XG4gICAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KDEpO1xuICAgICAgfVxuICAgICAgdGhpcy5faW5wdXRDaGFuZ2UoKTtcbiAgICAgIHRoaXMuX21lcmlkaWVtUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIGN1cnNvcisrO1xuICAgIH0gZWxzZSBpZiAoY3Vyc29yID09PSAzICYmIGUuZGF0YSAhPSBudWxsKSB7XG4gICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCAyKSArICcgJyArIHZhbHVlLnNsaWNlKDIsIDMpICsgdmFsdWUuc2xpY2UoNSwgOSk7XG4gICAgICBjdXJzb3IrKztcbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gNSAmJiBlLmRhdGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgaG91ciA9IE51bWJlcih2YWx1ZS5zbGljZSgzLCA1KSk7XG4gICAgICAvKlxuICAgICAgICog7LWc64yA6rCSIOyymOumrCDrsI8g7LWc7IaM6rCS7LKY66asXG4gICAgICAgKiAqL1xuICAgICAgaWYgKHRoaXMuX3NldE1lcmlkaWVtID09PSAnQU0nICYmIE51bWJlcih0aGlzLm1pbj8uc2xpY2UoMCwgMikpID4gaG91cikge1xuICAgICAgICB0aGlzLl9zZXRIb3VyID0gTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCAyKSk7XG4gICAgICAgIHRoaXMuX2hvdXJTZWxlY3QoMCk7XG4gICAgICAgIHRoaXMuX2lucHV0Q2hhbmdlKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX3NldE1lcmlkaWVtID09PSAnQU0nICYmIE51bWJlcih0aGlzLm1heD8uc2xpY2UoMCwgMikpIDwgaG91cikge1xuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICAgIHZhbHVlLnNsaWNlKDAsIGN1cnNvciAtIDIpICsgdGhpcy5tYXg/LnNsaWNlKDAsIDIpICsgJzonICsgdmFsdWUuc2xpY2UoNywgOSk7XG4gICAgICAgIHRoaXMuX3NldEhvdXIgPSBOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDAsIDIpKTtcbiAgICAgICAgdGhpcy5faG91clNlbGVjdChcbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0IC5zcGlubmVyLWhvdXItd3JhcCAubW92aW5nLWxpc3QnKSEuY2hpbGRyZW4ubGVuZ3RoIC0gMVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXRNZXJpZGllbSA9PT0gJ1BNJyAmJiBOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDAsIDIpKSAtIDEyIDwgaG91cikge1xuICAgICAgICAvKlxuICAgICAgICAgKiDstZzshozqsJIg7LKY66asIOuwjyDstZzrjIDqsJIg7LKY66asXG4gICAgICAgICAqICovXG4gICAgICAgIGlmIChOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDAsIDIpKSAtIDEyIDwgMTApIHtcbiAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICAgICAgdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMikgKyAnMCcgKyAoTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCAyKSkgLSAxMikgKyAnOicgKyB2YWx1ZS5zbGljZSg3LCA5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICAgICAgdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMikgKyAoTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCAyKSkgLSAxMikgKyAnOicgKyB2YWx1ZS5zbGljZSg3LCA5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZXRIb3VyID0gTnVtYmVyKHRoaXMubWF4Py5zbGljZSgwLCAyKSkgLSAxMjtcbiAgICAgICAgdGhpcy5faG91clNlbGVjdChcbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0IC5zcGlubmVyLWhvdXItd3JhcCAubW92aW5nLWxpc3QnKSEuY2hpbGRyZW4ubGVuZ3RoIC0gMVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9zZXRNZXJpZGllbSA9PT0gJ1BNJyAmJiBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDIpKSAtIDEyID4gaG91cikge1xuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPVxuICAgICAgICAgIHZhbHVlLnNsaWNlKDAsIGN1cnNvciAtIDIpICsgdGhpcy5taW4/LnNsaWNlKDAsIDIpICsgJzonICsgdmFsdWUuc2xpY2UoNywgOSk7XG4gICAgICAgIHRoaXMuX3NldEhvdXIgPSBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDIpKSAtIDEyO1xuICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KDApO1xuICAgICAgfSBlbHNlIGlmIChOdW1iZXIodmFsdWUuc2xpY2UoMywgNSkpID4gMTIpIHtcbiAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMikgKyAnMTI6JyArIHZhbHVlLnNsaWNlKDcsIDkpO1xuICAgICAgICB0aGlzLl9zZXRIb3VyID0gMTI7XG4gICAgICAgIHRoaXMuX2hvdXJTZWxlY3QoXG4gICAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCAuc3Bpbm5lci1ob3VyLXdyYXAgLm1vdmluZy1saXN0JykhLmNoaWxkcmVuLmxlbmd0aCAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5faW5wdXRDaGFuZ2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyKHZhbHVlLnNsaWNlKDMsIDUpKSA8IDEpIHtcbiAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMikgKyAnMDE6JyArIHZhbHVlLnNsaWNlKDcsIDkpO1xuICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KDApO1xuICAgICAgICB0aGlzLl9zZXRIb3VyID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0ICRlbCA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLnNwaW5uZXItaG91ci13cmFwIC5tb3ZpbmctbGlzdCcpITtcbiAgICAgICAgaWYgKCRlbC5jaGlsZHJlbi5sZW5ndGggPCAxMikge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGVsLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoTnVtYmVyKCgkZWwuY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZSkgPT09IE51bWJlcih2YWx1ZS5zbGljZSgzLCA1KSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5faG91clNlbGVjdChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5fc2V0SG91ciA9IE51bWJlcih2YWx1ZS5zbGljZSgzLCA1KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yKSArICc6JyArIHZhbHVlLnNsaWNlKDcsIDkpO1xuICAgICAgICAgIHRoaXMuX2hvdXJTZWxlY3QoTnVtYmVyKHZhbHVlLnNsaWNlKDMsIDUpKSAtIDEpO1xuICAgICAgICAgIHRoaXMuX3NldEhvdXIgPSBOdW1iZXIodmFsdWUuc2xpY2UoMywgNSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9ob3VyUG9zaXRpb25DaGFuZ2UoKTtcbiAgICAgIHRoaXMuX2lucHV0Q2hhbmdlKCk7XG4gICAgICBjdXJzb3IrKztcbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gNiAmJiBlLmRhdGEgIT0gbnVsbCkge1xuICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID1cbiAgICAgICAgdmFsdWUuc2xpY2UoMCwgY3Vyc29yIC0gMSkgKyAnOicgKyB2YWx1ZS5zbGljZShjdXJzb3IgLSAxLCBjdXJzb3IpICsgdmFsdWUuc2xpY2UoOCwgOSk7XG4gICAgICBjdXJzb3IrKztcbiAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gOCAmJiBlLmRhdGEgIT0gbnVsbCkge1xuICAgICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1taW51dGUtd3JhcCAubW92aW5nLWxpc3QnKSE7XG4gICAgICBpZiAoJGVsLmNoaWxkcmVuLmxlbmd0aCAhPT0gNjApIHtcbiAgICAgICAgbGV0IG1pbiA9IE51bWJlcih0aGlzLm1pbj8uc2xpY2UoMCwgMikpO1xuICAgICAgICBsZXQgdmFsdWVNYXggPSBOdW1iZXIodmFsdWUuc2xpY2UoMywgNSkpO1xuICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCAyKSkgPiAxMikge1xuICAgICAgICAgIG1pbiAtPSAxMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fc2V0TWVyaWRpZW0gPT09ICdQTScpIHtcbiAgICAgICAgICB2YWx1ZU1heCArPSAxMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtaW4gPT09IE51bWJlcih2YWx1ZS5zbGljZSgzLCA1KSkgJiYgTnVtYmVyKHRoaXMubWluPy5zbGljZSgyLCA0KSkgPiBOdW1iZXIodmFsdWUuc2xpY2UoNiwgOCkpKSB7XG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiDsoJXsg4HsoIHsnbgg67KU7JyEIOuvuOunjOydmCDsnoXroKVcbiAgICAgICAgICAgKiAqL1xuICAgICAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdCgwKTtcbiAgICAgICAgICB0aGlzLl9zZXRNaW51dGUgPSBOdW1iZXIodGhpcy5taW4/LnNsaWNlKDIsIDQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBOdW1iZXIodGhpcy5tYXg/LnNsaWNlKDAsIDIpKSA8IHZhbHVlTWF4ICYmXG4gICAgICAgICAgTnVtYmVyKHRoaXMubWF4Py5zbGljZSgyLCA0KSkgPCBOdW1iZXIodmFsdWUuc2xpY2UoNiwgOCkpXG4gICAgICAgICkge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICog7KCV7IOB7KCB7J24IOuylOychCDstIjqs7zsnZgg7J6F66ClXG4gICAgICAgICAgICogKi9cbiAgICAgICAgICB0aGlzLl9taW51dGVTZWxlY3QoJGVsLmNoaWxkcmVuLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIHRoaXMuX3NldE1pbnV0ZSA9IE51bWJlcigoJGVsLmNoaWxkcmVuLml0ZW0oJGVsLmNoaWxkcmVuLmxlbmd0aCAtIDEpIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIOygleyDgeyggeyduCDrspTsnITsnZgg7J6F66ClXG4gICAgICAgICAgICogKi9cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRlbC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBOdW1iZXIoKCRlbC5jaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSA9PT1cbiAgICAgICAgICAgICAgTWF0aC5jZWlsKE51bWJlcih2YWx1ZS5zbGljZSg2LCA4KSkgLyB0aGlzLnN0ZXAhKSAqIHRoaXMuc3RlcCFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLl9zZXRNaW51dGUgPSBOdW1iZXIoTWF0aC5jZWlsKE1hdGguY2VpbChOdW1iZXIodmFsdWUuc2xpY2UoNiwgOCkpKSAvIHRoaXMuc3RlcCEpICogdGhpcy5zdGVwISk7XG4gICAgICAgICAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoTnVtYmVyKHZhbHVlLnNsaWNlKDYsIDgpKSA+IDU5KSB7XG4gICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIDYpICsgJzU5JztcbiAgICAgICAgdGhpcy5fc2V0TWludXRlID0gNTk7XG4gICAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdCg1OCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCA2KSArIHZhbHVlLnNsaWNlKDYsIDgpO1xuICAgICAgICB0aGlzLl9zZXRNaW51dGUgPSBOdW1iZXIodmFsdWUuc2xpY2UoNiwgOCkpO1xuICAgICAgICB0aGlzLl9taW51dGVTZWxlY3QodGhpcy5fc2V0TWludXRlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21pbnV0ZVBvc2l0aW9uQ2hhbmdlKCk7XG4gICAgICB0aGlzLl9pbnB1dENoYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZS5kYXRhICE9IG51bGwpIHtcbiAgICAgICAgaWYgKGN1cnNvciA9PT0gMyB8fCBjdXJzb3IgPT09IDUpIHtcbiAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBjdXJzb3IhIC0gMSkgKyB2YWx1ZS5zbGljZShjdXJzb3IhICsgMSwgOSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yISkgKyB2YWx1ZS5zbGljZShjdXJzb3IhICsgMSwgOSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICgoY3Vyc29yID4gMiAmJiBjdXJzb3IgPCA1KSB8fCAoY3Vyc29yID4gNSAmJiBjdXJzb3IgPCA4KSkge1xuICAgICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGN1cnNvciEpICsgJ18nICsgdmFsdWUuc2xpY2UoY3Vyc29yISwgOSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29yID09PSA1KSB7XG4gICAgICAgICAgKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gdmFsdWUuc2xpY2UoMCwgY3Vyc29yISAtIDEpICsgJ186JyArIHZhbHVlLnNsaWNlKGN1cnNvciEsIDkpO1xuICAgICAgICAgIGN1cnNvci0tO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvciA9PT0gMikge1xuICAgICAgICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIGN1cnNvciEgLSAxKSArICcgICcgKyB2YWx1ZS5zbGljZShjdXJzb3IhLCA5KTtcbiAgICAgICAgICBjdXJzb3ItLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB2YWx1ZS5zbGljZSgwLCBjdXJzb3IhKSArICcgJyArIHZhbHVlLnNsaWNlKGN1cnNvciEsIDkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KS5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IhLCBjdXJzb3IhKTtcbiAgfVxuXG4gIC8qXG4gICAqIOyLnOqwhCBlbGVtZW50IOyDneyEsVxuICAgKiAqL1xuICBwcml2YXRlIF9ob3VyVmlldygpIHtcbiAgICB0aGlzLiRob3VyID0gW107XG4gICAgbGV0IGogPSAxO1xuICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBtaW4gPSBOdW1iZXIodGhpcy5taW4uc2xpY2UoMCwgMikpO1xuICAgICAgbGV0IG1heCA9IE51bWJlcih0aGlzLm1heC5zbGljZSgwLCAyKSk7XG4gICAgICBpZiAobWluID09PSAwKSB7XG4gICAgICAgIG1pbiA9IDE7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5fc2V0TWVyaWRpZW0gPT09ICdBTScpIHtcbiAgICAgICAgaWYgKG1heCA8IDEzKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy4kaG91ci5wdXNoKGh0bWxgPGxpIGRhdGEtdmFsdWU9XCIke2l9XCIgZGF0YS1pbmRleD1cIiR7an1cIj48YnV0dG9uPiR7aX08L2J1dHRvbj48L2xpPmApO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDw9IDExOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuJGhvdXIucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiJHtpfVwiIGRhdGEtaW5kZXg9XCIke2p9XCI+PGJ1dHRvbj4ke2l9PC9idXR0b24+PC9saT5gKTtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1heCA9PT0gMjQpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvdXIucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiMTJcIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+MTI8L2J1dHRvbj48L2xpPmApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF4ID0gbWF4IC0gMTI7XG4gICAgICAgIGlmIChtaW4gPiAxMikge1xuICAgICAgICAgIG1pbiA9IG1pbiAtIDEyO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBtaW47IGkgPD0gbWF4IC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLiRob3VyLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIiR7aX1cIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+JHtpfTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgICAgICBqKys7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuJGhvdXIucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiMTJcIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+MTI8L2J1dHRvbj48L2xpPmApO1xuICAgICAgICAgIGorKztcbiAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBtYXg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy4kaG91ci5wdXNoKGh0bWxgPGxpIGRhdGEtdmFsdWU9XCIke2l9XCIgZGF0YS1pbmRleD1cIiR7an1cIj48YnV0dG9uPiR7aX08L2J1dHRvbj48L2xpPmApO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fc2V0TWVyaWRpZW0gPT09ICdQTScpIHtcbiAgICAgIHRoaXMuJGhvdXIucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiMTJcIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+MTI8L2J1dHRvbj48L2xpPmApO1xuICAgICAgaisrO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTE7IGkrKykge1xuICAgICAgICB0aGlzLiRob3VyLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIiR7aX1cIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+JHtpfTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTI7IGkrKykge1xuICAgICAgICB0aGlzLiRob3VyLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIiR7aX1cIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+JHtpfTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiDtlbTri7nrkJjripQg7Iuc6rCE7JeQIHNlbGVjdCDtgbTrnpjsiqQg7IOd7ISxXG4gICAqICovXG4gIHByaXZhdGUgX2hvdXJTZWxlY3QobnVtPzogbnVtYmVyKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1ob3VyLXdyYXAgLm1vdmluZy1saXN0Jyk7XG4gICAgdGhpcy5fY2xlYXJDaGVjayA9IGZhbHNlO1xuICAgICRlbCEucXVlcnlTZWxlY3RvciEoJy5jbGVhcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdjbGVhcicpO1xuICAgICRlbCEucXVlcnlTZWxlY3RvciEoJy5zZWxlY3QnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgaWYgKG51bSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAkZWwhLmNoaWxkcmVuLml0ZW0obnVtKT8uY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICB0aGlzLl9zZXRIb3VyID0gTnVtYmVyKCgkZWwhLmNoaWxkcmVuLml0ZW0obnVtKSEgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpO1xuICAgICAgdGhpcy5faW5wdXRDaGFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJGVsIS5jaGlsZHJlbi5pdGVtKCh0aGlzLnRvSG91ciAlIDEyKSAtIDEpPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgIHRoaXMuX3NldEhvdXIgPSBOdW1iZXIoKCRlbCEuY2hpbGRyZW4uaXRlbSgodGhpcy50b0hvdXIgJSAxMikgLSAxKSEgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9taW51dGVWaWV3KCk7XG4gIH1cblxuICAvKlxuICAgKiAgc2VsZWN0IO2BtOuemOyKpOulvCDssL7slYQg6re4IOychOy5mOuhnCBzcGlubmVyIOydtOuPmVxuICAgKiAqL1xuICBwcml2YXRlIF9ob3VyUG9zaXRpb25DaGFuZ2UobnVtPzogbnVtYmVyKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1ob3VyLXdyYXAgLm1vdmluZy1saXN0Jyk7XG4gICAgY29uc3QgaGVpZ2h0ID0gJGVsIS5jaGlsZHJlbi5pdGVtKDApPy5jbGllbnRIZWlnaHQ7XG4gICAgaWYgKG51bSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoKCRlbCEucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpIGFzIEhUTUxFbGVtZW50KSA9PT0gbnVsbCkge1xuICAgICAgICBudW0gPSAwO1xuICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KDApO1xuICAgICAgfSBlbHNlIGlmIChOdW1iZXIoKCRlbCEucXVlcnlTZWxlY3RvcignLnNlbGVjdCcpIGFzIEhUTUxFbGVtZW50KT8uZGF0YXNldD8udmFsdWUpICE9PSB0aGlzLl9zZXRIb3VyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGVsIS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChOdW1iZXIoKCRlbCEuY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZSkgPT09IHRoaXMuX3NldEhvdXIpIHtcbiAgICAgICAgICAgIG51bSA9IGk7XG4gICAgICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobnVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBudW0gPSAwO1xuICAgICAgICAgIHRoaXMuX2hvdXJTZWxlY3QoMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG51bSA9IE51bWJlcigoJGVsIS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0JykgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0Py5pbmRleCkgLSAxO1xuICAgICAgfVxuICAgIH1cbiAgICAoJGVsIS5wYXJlbnRFbGVtZW50IGFzIEhUTUxFbGVtZW50KS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtudW0hICogaGVpZ2h0IX1weClgO1xuICB9XG5cbiAgLypcbiAgICogIOu2hCBlbGVtZW50IOyDneyEsVxuICAgKiAqL1xuICBwcml2YXRlIF9taW51dGVWaWV3KCkge1xuICAgIHRoaXMuJG1pbnV0ZSA9IFtdO1xuICAgIGxldCBqID0gMDtcbiAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBtaW4gPSBNYXRoLnJvdW5kKE51bWJlcih0aGlzLm1pbi5zbGljZSgyLCA0KSkgLyB0aGlzLnN0ZXAhKSAqIHRoaXMuc3RlcCE7XG4gICAgICBjb25zdCBtYXggPSBOdW1iZXIodGhpcy5tYXguc2xpY2UoMiwgNCkpO1xuICAgICAgbGV0IGhvdXIgPSB0aGlzLl9zZXRIb3VyITtcbiAgICAgIGlmICh0aGlzLl9zZXRNZXJpZGllbSA9PT0gJ1BNJyAmJiB0aGlzLl9zZXRIb3VyICE9PSAxMikge1xuICAgICAgICBob3VyID0gaG91ciArIDEyO1xuICAgICAgfVxuICAgICAgaWYgKGhvdXIgPT09IE51bWJlcih0aGlzLm1pbi5zbGljZSgwLCAyKSkpIHtcbiAgICAgICAgaWYgKGhvdXIgPT09IE51bWJlcih0aGlzLm1heC5zbGljZSgwLCAyKSkpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gbWluOyBpIDw9IG1heDsgaSArPSB0aGlzLnN0ZXAhKSB7XG4gICAgICAgICAgICB0aGlzLiRtaW51dGUucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiJHtpfVwiIGRhdGEtaW5kZXg9XCIke2p9XCI+PGJ1dHRvbj4ke2l9PC9idXR0b24+PC9saT5gKTtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IG1pbjsgaSA8IDYwOyBpICs9IHRoaXMuc3RlcCEpIHtcbiAgICAgICAgICAgIHRoaXMuJG1pbnV0ZS5wdXNoKGh0bWxgPGxpIGRhdGEtdmFsdWU9XCIke2l9XCIgZGF0YS1pbmRleD1cIiR7an1cIj48YnV0dG9uPiR7aX08L2J1dHRvbj48L2xpPmApO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChob3VyID09PSBOdW1iZXIodGhpcy5tYXguc2xpY2UoMCwgMikpKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG1heDsgaSArPSB0aGlzLnN0ZXAhKSB7XG4gICAgICAgICAgdGhpcy4kbWludXRlLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIiR7aX1cIiBkYXRhLWluZGV4PVwiJHtqfVwiPjxidXR0b24+JHtpfTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgICAgaisrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDYwOyBpICs9IHRoaXMuc3RlcCEpIHtcbiAgICAgICAgICB0aGlzLiRtaW51dGUucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiJHtpfVwiIGRhdGEtaW5kZXg9XCIke2p9XCI+PGJ1dHRvbj4ke2l9PC9idXR0b24+PC9saT5gKTtcbiAgICAgICAgICBqKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2MDsgaSArPSB0aGlzLnN0ZXAhKSB7XG4gICAgICAgIHRoaXMuJG1pbnV0ZS5wdXNoKGh0bWxgPGxpIGRhdGEtdmFsdWU9XCIke2l9XCIgZGF0YS1pbmRleD1cIiR7an1cIj48YnV0dG9uPiR7aX08L2J1dHRvbj48L2xpPmApO1xuICAgICAgICBqKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICog7ZW064u565CY64qUIOu2hOyXkCBzZWxlY3Qg7YG0656Y7IqkIOyDneyEsVxuICAgKiAqL1xuICBwcml2YXRlIF9taW51dGVTZWxlY3QobnVtPzogbnVtYmVyKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1taW51dGUtd3JhcCAubW92aW5nLWxpc3QnKTtcbiAgICAkZWwhLnF1ZXJ5U2VsZWN0b3IhKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICRlbCEucXVlcnlTZWxlY3RvciEoJy5jbGVhcicpPy5jbGFzc0xpc3QucmVtb3ZlKCdjbGVhcicpO1xuICAgIHRoaXMuX2NsZWFyQ2hlY2sgPSBmYWxzZTtcbiAgICBpZiAobnVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICgoJGVsIS5jaGlsZHJlbi5pdGVtKG51bSkhIGFzIEhUTUxFbGVtZW50KSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9zZXRNaW51dGUgPSBOdW1iZXIoKCRlbCEuY2hpbGRyZW4uaXRlbSgwKSEgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0LnZhbHVlKTtcbiAgICAgICAgJGVsIS5jaGlsZHJlbi5pdGVtKDApPy5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NldE1pbnV0ZSA9IE51bWJlcigoJGVsIS5jaGlsZHJlbi5pdGVtKG51bSkgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0LnZhbHVlKTtcbiAgICAgICAgJGVsIS5jaGlsZHJlbi5pdGVtKG51bSk/LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAkZWwhLmNoaWxkcmVuLml0ZW0odGhpcy50b01pbnV0ZSkhLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgICAgdGhpcy5fc2V0TWludXRlID0gTnVtYmVyKCgkZWwhLmNoaWxkcmVuLml0ZW0odGhpcy50b01pbnV0ZSkgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0LnZhbHVlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbnB1dENoYW5nZSgpO1xuICB9XG5cbiAgLypcbiAgICogIHNlbGVjdCDtgbTrnpjsiqTrpbwg7LC+7JWEIOq3uCDsnITsuZjroZwgc3Bpbm5lciDsnbTrj5lcbiAgICogKi9cbiAgcHJpdmF0ZSBfbWludXRlUG9zaXRpb25DaGFuZ2UobnVtPzogbnVtYmVyKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1taW51dGUtd3JhcCAubW92aW5nLWxpc3QnKTtcbiAgICBjb25zdCBoZWlnaHQgPSAkZWwhLmNoaWxkcmVuLml0ZW0oMCk/LmNsaWVudEhlaWdodDtcbiAgICBpZiAobnVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICgoJGVsIS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0JykgYXMgSFRNTEVsZW1lbnQpID09PSBudWxsKSB7XG4gICAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdCgwKTtcbiAgICAgICAgbnVtID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLl9zZXRNaW51dGUgIT09IE51bWJlcigoJGVsIS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0JykgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0Py52YWx1ZSkpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRlbCEuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9zZXRNaW51dGUgPT09IE51bWJlcigoJGVsIS5jaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlKSkge1xuICAgICAgICAgICAgICBudW0gPSBpO1xuICAgICAgICAgICAgICB0aGlzLl9taW51dGVTZWxlY3QoTnVtYmVyKCgkZWwhLmNoaWxkcmVuLml0ZW0oaSkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQuaW5kZXgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG51bSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBudW0gPSAwO1xuICAgICAgICAgICAgdGhpcy5fc2V0TWludXRlID0gTnVtYmVyKCgkZWwhLmNoaWxkcmVuLml0ZW0oMCkgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLl9pbnB1dENoYW5nZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG51bSA9IE51bWJlcigoJGVsIS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0JykgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0Py5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgKCRlbCEucGFyZW50RWxlbWVudCBhcyBIVE1MRWxlbWVudCkuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7bnVtISAqIGhlaWdodCF9cHgpYDtcbiAgfVxuXG4gIC8qXG4gICAqIO2VtOuLueuQmOuKlCBBTSxQTeyXkCBzZWxlY3Qg7YG0656Y7IqkIOyDneyEsVxuICAgKiAqL1xuXG4gIHByaXZhdGUgX21lcmlkaWVtVmlldygpIHtcbiAgICB0aGlzLiRtZXJpZGllbSA9IFtdO1xuICAgIGlmICh0aGlzLm1pbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChOdW1iZXIodGhpcy5taW4/LnNsaWNlKDAsIDIpKSA+IDEyKSB7XG4gICAgICAgIC8vICBQTSDrp4wg7IOd7ISxXG4gICAgICAgIHRoaXMuX3NldE1lcmlkaWVtID0gJ1BNJztcbiAgICAgICAgdGhpcy4kbWVyaWRpZW0ucHVzaChodG1sYDxsaSBkYXRhLXZhbHVlPVwiUE1cIiBkYXRhLWluZGV4PVwiMFwiPjxidXR0b24+UE08L2J1dHRvbj48L2xpPmApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gIEFNIOyDneyEsVxuICAgICAgICB0aGlzLl9zZXRNZXJpZGllbSA9ICdBTSc7XG4gICAgICAgIHRoaXMuJG1lcmlkaWVtLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIkFNXCIgZGF0YS1pbmRleD1cIjBcIj48YnV0dG9uPkFNPC9idXR0b24+PC9saT5gKTtcbiAgICAgICAgaWYgKE51bWJlcih0aGlzLm1heD8uc2xpY2UoMCwgMikpID4gMTIpIHtcbiAgICAgICAgICB0aGlzLiRtZXJpZGllbS5wdXNoKGh0bWxgPGxpIGRhdGEtdmFsdWU9XCJQTVwiIGRhdGEtaW5kZXg9XCIxXCI+PGJ1dHRvbj5QTTwvYnV0dG9uPjwvbGk+YCk7XG4gICAgICAgICAgLy8gIHBtIOyDneyEsVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJG1lcmlkaWVtLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIkFNXCIgZGF0YS1pbmRleD1cIjBcIj48YnV0dG9uPkFNPC9idXR0b24+PC9saT5gKTtcbiAgICAgIHRoaXMuJG1lcmlkaWVtLnB1c2goaHRtbGA8bGkgZGF0YS12YWx1ZT1cIlBNXCIgZGF0YS1pbmRleD1cIjFcIj48YnV0dG9uPlBNPC9idXR0b24+PC9saT5gKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9tZXJpZGllbVNlbGVjdChudW0/OiBudW1iZXIpIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnF1ZXJ5U2VsZWN0b3IoJy5zcGlubmVyLWFsbGRheS13cmFwIC5tb3ZpbmctbGlzdCcpO1xuICAgICRlbCEucXVlcnlTZWxlY3RvciEoJy5zZWxlY3QnKT8uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0Jyk7XG4gICAgJGVsIS5xdWVyeVNlbGVjdG9yISgnLmNsZWFyJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2NsZWFyJyk7XG4gICAgdGhpcy5fY2xlYXJDaGVjayA9IGZhbHNlO1xuICAgIGlmIChudW0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fc2V0TWVyaWRpZW0gPSAoJGVsIS5jaGlsZHJlbi5pdGVtKG51bSkhIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlO1xuICAgICAgJGVsIS5jaGlsZHJlbi5pdGVtKG51bSkhLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5taW4gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICRlbCEuY2hpbGRyZW4uaXRlbSgwKSEuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgIHRoaXMuX3NldE1lcmlkaWVtID0gKCRlbCEuY2hpbGRyZW4uaXRlbSgwKSEgYXMgSFRNTEVsZW1lbnQpLmRhdGFzZXQudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy50b0hvdXIgLyAxMiA+PSAxKSB7XG4gICAgICAgICAgJGVsIS5jaGlsZHJlbi5pdGVtKDEpIS5jbGFzc0xpc3QuYWRkKCdzZWxlY3QnKTtcbiAgICAgICAgICB0aGlzLl9zZXRNZXJpZGllbSA9ICgkZWwhLmNoaWxkcmVuLml0ZW0oMSkhIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0LnZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbCEuY2hpbGRyZW4uaXRlbSgwKSEuY2xhc3NMaXN0LmFkZCgnc2VsZWN0Jyk7XG4gICAgICAgICAgdGhpcy5fc2V0TWVyaWRpZW0gPSAoJGVsIS5jaGlsZHJlbi5pdGVtKDApISBhcyBIVE1MRWxlbWVudCkuZGF0YXNldC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqICBzZWxlY3Qg7YG0656Y7Iqk66W8IOywvuyVhCDqt7gg7JyE7LmY66GcIHNwaW5uZXIg7J2064+ZXG4gICAqICovXG4gIHByaXZhdGUgX21lcmlkaWVtUG9zaXRpb25DaGFuZ2UobnVtPzogbnVtYmVyKSB7XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIS5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lci1hbGxkYXktd3JhcCAubW92aW5nLWxpc3QnKTtcbiAgICBjb25zdCBoZWlnaHQgPSAkZWwhLmNoaWxkcmVuLml0ZW0oMCkhLmNsaWVudEhlaWdodDtcbiAgICBpZiAobnVtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG51bSA9IE51bWJlcigoJGVsIS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0JykgYXMgSFRNTEVsZW1lbnQpPy5kYXRhc2V0Py5pbmRleCk7XG4gICAgfVxuICAgICgkZWwhLnBhcmVudEVsZW1lbnQgYXMgSFRNTEVsZW1lbnQpLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKC0ke251bSEgKiBoZWlnaHR9cHgpYDtcbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoU3RhcnRIYW5kbGVyKGU6IFRvdWNoRXZlbnQpIHtcbiAgICB0aGlzLl90b3VjaFN0YXJ0UG9pbnQgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgIHRoaXMuX3RvdWNoU3RhcnRQb3NpdGlvbiA9IE1hdGguYWJzKFxuICAgICAgTnVtYmVyKChlLmN1cnJlbnRUYXJnZXQhIGFzIEhUTUxFbGVtZW50KS5wYXJlbnRFbGVtZW50Py5zdHlsZS50cmFuc2Zvcm0uc3BsaXQoJygnKVsxXS5zcGxpdCgncHgnKVswXSlcbiAgICApO1xuICAgIChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpIS5wYXJlbnRFbGVtZW50IS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Jyk/LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG91Y2hNb3ZlSGFuZGxlcihlOiBUb3VjaEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0ICRlbCA9IChlLmN1cnJlbnRUYXJnZXQhIGFzIEhUTUxFbGVtZW50KSEucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCBoZWlnaHQgPSAoZS5jdXJyZW50VGFyZ2V0ISBhcyBIVE1MRWxlbWVudCkhLmNoaWxkcmVuLml0ZW0oMCkhLmNsaWVudEhlaWdodDtcbiAgICB0aGlzLl9tb3ZlUG9pbnQgPSB0aGlzLl90b3VjaFN0YXJ0UG9zaXRpb24hIC0gKGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLl90b3VjaFN0YXJ0UG9pbnQhKSAqIDEuMztcbiAgICBpZiAoaGVpZ2h0ICogKCRlbCEuY2hpbGRyZW5bMF0uY2hpbGRFbGVtZW50Q291bnQgLSAxKSA8PSB0aGlzLl9tb3ZlUG9pbnQpIHtcbiAgICAgIHRoaXMuX21vdmVQb2ludCA9IGhlaWdodCAqICgkZWwhLmNoaWxkcmVuWzBdLmNoaWxkRWxlbWVudENvdW50IC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9tb3ZlUG9pbnQgPCAxMCkge1xuICAgICAgICB0aGlzLl9tb3ZlUG9pbnQgPSAwO1xuICAgICAgfVxuICAgICAgJGVsIS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHt0aGlzLl9tb3ZlUG9pbnR9cHgpYDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90b3VjaEVuZEhhbmRsZXIoZTogVG91Y2hFdmVudCkge1xuICAgIGNvbnN0ICRlbCA9IChlLmN1cnJlbnRUYXJnZXQhIGFzIEhUTUxFbGVtZW50KSEucGFyZW50RWxlbWVudDtcbiAgICBjb25zdCBoZWlnaHQgPSAoZS5jdXJyZW50VGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jaGlsZHJlbi5pdGVtKDApIS5jbGllbnRIZWlnaHQ7XG4gICAgdGhpcy5fbW92ZVBvaW50ID0gTWF0aC5hYnMoXG4gICAgICBOdW1iZXIoKGUuY3VycmVudFRhcmdldCEgYXMgSFRNTEVsZW1lbnQpLnBhcmVudEVsZW1lbnQhLnN0eWxlLnRyYW5zZm9ybS5zcGxpdCgnKCcpWzFdLnNwbGl0KCdweCcpWzBdKVxuICAgICk7XG4gICAgJGVsIS5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWSgtJHtNYXRoLnJvdW5kKHRoaXMuX21vdmVQb2ludCEgLyBoZWlnaHQpICogaGVpZ2h0fXB4KWA7XG5cbiAgICBjb25zdCBpbmRleCA9IE51bWJlcihcbiAgICAgICgkZWwhLnF1ZXJ5U2VsZWN0b3IoJy5tb3ZpbmctbGlzdCcpIS5jaGlsZHJlbi5pdGVtKE1hdGgucm91bmQodGhpcy5fbW92ZVBvaW50ISAvIGhlaWdodCkpISBhcyBIVE1MRWxlbWVudCkhXG4gICAgICAgIC5kYXRhc2V0LmluZGV4XG4gICAgKTtcblxuICAgIGlmICgkZWwhLnBhcmVudEVsZW1lbnQhLmNsYXNzTGlzdC5jb250YWlucygnaG91cicpKSB7XG4gICAgICB0aGlzLl9ob3VyU2VsZWN0KGluZGV4IC0gMSk7XG4gICAgfSBlbHNlIGlmICgkZWwhLnBhcmVudEVsZW1lbnQhLmNsYXNzTGlzdC5jb250YWlucygnbWludXRlJykpIHtcbiAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdChpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KGluZGV4KTtcbiAgICAgIHRoaXMuX2hvdXJWaWV3KCk7XG4gICAgICB0aGlzLl9taW51dGVWaWV3KCk7XG4gICAgfVxuICAgIHRoaXMuX2lucHV0Q2hhbmdlKCk7XG4gICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpIVxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbGVhcicpXG4gICAgICAuZm9yRWFjaCgkY2xlYXIgPT4ge1xuICAgICAgICAkY2xlYXIuY2xhc3NMaXN0LnJlbW92ZSgnY2xlYXInKTtcbiAgICAgIH0pO1xuICAgIHRoaXMuX2NsZWFyQ2hlY2sgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgX2lucHV0Q2hhbmdlKCkge1xuICAgIHRoaXMuX3ZhbHVlID0gYCR7dGhpcy5fc2V0TWVyaWRpZW19ICR7dGhpcy5fc2V0SG91ciEgPCAxMCA/ICcwJyArIHRoaXMuX3NldEhvdXIgOiB0aGlzLl9zZXRIb3VyfToke1xuICAgICAgdGhpcy5fc2V0TWludXRlISA8IDEwID8gJzAnICsgdGhpcy5fc2V0TWludXRlIDogdGhpcy5fc2V0TWludXRlXG4gICAgfWA7XG4gICAgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyYXdlci1sYXlvdXQnKSEucXVlcnlTZWxlY3RvcignLmlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdFJlbW92ZSgpIHtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhXG4gICAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNlbGVjdCcpXG4gICAgICAuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgICAkZWwhLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdCcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyAgZHJvd2VyIGxheW91dCDsspjrpqwgKl8qXG4gIHByaXZhdGUgX25leHRCdG5DbGlja0hhbmRsZXIoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LmNoaWxkcmVuW3RoaXMuX2FmdGVySXRlbSFdPy5jaGlsZHJlblswXSBhcyBIVE1MRWxlbWVudDtcbiAgICB0aGlzLl9jb25maXJtQ2xpY2tIYW5kbGVyKCk7XG4gICAgJGVsPy5jbGljaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZG9tQ2xpY2tIYW5kbGVyKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZS5pc1RydXN0ZWQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS5jbGllbnRZIDxcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IC1cbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0JykhLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5sYXllci1ib3R0b20nKSEuY2xpZW50SGVpZ2h0XG4gICAgICApIHtcbiAgICAgICAgaWYgKHRoaXMuY291bnQhID4gMCkge1xuICAgICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5jb3VudCErKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NsaWNrSGFuZGxlcihlOiBNb3VzZUV2ZW50KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkICYmICF0aGlzLnJlYWRvbmx5ICYmIHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LXdyYXAnKSEuY2xhc3NMaXN0LmFkZCgnZm9jdXMnKTtcblxuICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmICh0aGlzLm1pbiA9PT0gdW5kZWZpbmVkICYmIHRoaXMubWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aGlzLl9zZXRIb3VyID0gdG9kYXkuZ2V0SG91cnMoKSAvIDEyIDw9IDEgPyB0b2RheS5nZXRIb3VycygpIDogdG9kYXkuZ2V0SG91cnMoKSAlIDEyO1xuICAgICAgICAgIHRoaXMuX3NldE1pbnV0ZSA9IHRvZGF5LmdldE1pbnV0ZXMoKTtcbiAgICAgICAgICB0aGlzLl9zZXRNZXJpZGllbSA9IHRvZGF5LmdldEhvdXJzKCkgLyAxMiA8PSAxID8gJ0FNJyA6ICdQTSc7XG4gICAgICAgICAgdGhpcy5fbWVyaWRpZW1TZWxlY3QodGhpcy5fc2V0TWVyaWRpZW0gPT09ICdBTScgPyAwIDogMSk7XG4gICAgICAgICAgdGhpcy5faG91clNlbGVjdCh0aGlzLl9zZXRIb3VyIC0gMSk7XG4gICAgICAgICAgdGhpcy5fbWludXRlU2VsZWN0KE1hdGguY2VpbCh0aGlzLl9zZXRNaW51dGUgLyB0aGlzLnN0ZXAhKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX29wZW4oKTtcbiAgICAgIHRoaXMuX3Njcm9sbENoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Njcm9sbENoYW5nZSgpOiB2b2lkIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oXG4gICAgICAwLFxuICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0ICtcbiAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50IS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKT8udG9wIC1cbiAgICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcudGltZS1waWNrZXItd3JhcCcpIS5jbGllbnRIZWlnaHQgLVxuICAgICAgICAyNVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGRvbUV2ZW50OiBFdmVudExpc3RlbmVyID0gdGhpcy5fZG9tQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykgYXMgRXZlbnRMaXN0ZW5lcjtcblxuICBwcml2YXRlIF9jbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Qtd3JhcCcpIS5jbGFzc0xpc3QucmVtb3ZlKCdmb2N1cycpO1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2xvc2UnKSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvbUV2ZW50KTtcbiAgfVxuXG4gIHByaXZhdGUgX29wZW4oKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ29wZW4nKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmRvbUV2ZW50KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHN1cGVyLmZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIGlmICh0aGlzLm1pbiA9PT0gdW5kZWZpbmVkIHx8IHRoaXMubWF4ID09PSB1bmRlZmluZWQgfHwgdGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodGhpcy5taW4gPT09IHVuZGVmaW5lZCAmJiB0aGlzLm1heCA9PT0gdW5kZWZpbmVkICYmIHRoaXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodGhpcy50b0hvdXIgPCAxMykge1xuICAgICAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KDApO1xuICAgICAgICAgIHRoaXMuX2hvdXJTZWxlY3QodGhpcy50b0hvdXIgLSAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgxKTtcbiAgICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KHRoaXMudG9Ib3VyIC0gMTMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdCh0aGlzLnRvTWludXRlKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IGhvdXIgPSBOdW1iZXIodGhpcy52YWx1ZS5zbGljZSgwLCAyKSkgLSAxO1xuICAgICAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgICAgaG91ciA9IGhvdXIgLSAxMztcbiAgICAgICAgICBpZiAoTnVtYmVyKHRoaXMubWluPy5zbGljZSgwLCAyKSkgPCAxMykge1xuICAgICAgICAgICAgdGhpcy5fbWVyaWRpZW1TZWxlY3QoMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgwKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KGhvdXIpO1xuICAgICAgICB0aGlzLl9taW51dGVTZWxlY3QoTWF0aC5jZWlsKE51bWJlcih0aGlzLnZhbHVlLnNsaWNlKDIsIDQpKSAvIHRoaXMuc3RlcCEpKTtcbiAgICAgICAgdGhpcy5pbnB1dFZhbHVlID0gdGhpcy5fdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgwKTtcbiAgICAgICAgdGhpcy5faG91clNlbGVjdCgwKTtcbiAgICAgICAgdGhpcy5fbWludXRlU2VsZWN0KDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChOdW1iZXIodGhpcy52YWx1ZS5zbGljZSgwLCAyKSkgPCAxMykge1xuICAgICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgwKTtcbiAgICAgICAgdGhpcy5faG91clNlbGVjdChOdW1iZXIodGhpcy52YWx1ZS5zbGljZSgwLCAyKSkgLSAxKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21lcmlkaWVtU2VsZWN0KDEpO1xuICAgICAgICB0aGlzLl9ob3VyU2VsZWN0KE51bWJlcih0aGlzLnZhbHVlLnNsaWNlKDAsIDIpKSAtIDEzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX21pbnV0ZVNlbGVjdChOdW1iZXIodGhpcy52YWx1ZS5zbGljZSgyLCA0KSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tZXJpZGllbVNlbGVjdCgwKTtcbiAgICAgIHRoaXMuX2hvdXJTZWxlY3QoMCk7XG4gICAgICB0aGlzLl9taW51dGVTZWxlY3QoMCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHN1cGVyLnVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICB0aGlzLl9ob3VyUG9zaXRpb25DaGFuZ2UoKTtcbiAgICB0aGlzLl9taW51dGVQb3NpdGlvbkNoYW5nZSgpO1xuICAgIHRoaXMuX21lcmlkaWVtUG9zaXRpb25DaGFuZ2UoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19