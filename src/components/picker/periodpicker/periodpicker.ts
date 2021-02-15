import template from './periodpicker.html';
import scss from './periodpicker.scss';
import { internalProperty, property, PropertyValues } from 'lit-element';
import { PickerBase } from '../picker-base.js';
import { DateUtill } from '../../base/DateUtill.js';

export class Periodpicker extends PickerBase {
  static styles = scss;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  value: string | undefined = '';

  @property({ type: Boolean, attribute: 'holidays-visible' })
  visible = false;

  @property({ type: Boolean, attribute: 'holidays-disabled' })
  hdDisabled = false;

  @property({ type: String })
  min: string | undefined = '19000101';

  @property({ type: String })
  max: string | undefined = '21000101';

  @property({ type: String, reflect: true })
  endDate: string | undefined;

  @property({ type: String, reflect: true })
  startDate: string | undefined;

  @internalProperty()
  private _value: string | undefined = '____-__-__ ~ ____-__-__';

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private mode: 'day' | 'month' | 'year' | 'option' = 'day';

  private _startYear: number | undefined;
  private _startMonth: number | undefined;
  private _startDay: number | undefined;
  private _endYear: number | undefined;
  private _endMonth: number | undefined;
  private _endDay: number | undefined;

  private _beforeValue: string | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._dayViewChange();
  }

  private _beforeInputHandler(e: InputEvent) {
    this._beforeValue = (e.target as HTMLInputElement).value;
    if (/\d/.exec(e.data!) == null && e.data != null) {
      e.returnValue;
    }
  }

  /**
   *  적용 버튼 클릭핸들러
   * */
  _confirmClickHandler = () => {
    super._confirmClickHandler();
    if (this._startYear !== undefined) {
      this.startDate = `${this._startYear}${this._startMonth! < 10 ? '0' + this._startMonth! : this._startMonth}${
        this._startDay! < 10 ? '0' + this._startDay! : this._startDay!
      }`;
    } else {
      this.startDate = '';
    }
    if (this._endYear !== undefined) {
      this.endDate = `${this._endYear}${this._endMonth! < 10 ? '0' + this._endMonth! : this._endMonth}${
        this._endDay! < 10 ? '0' + this._endDay! : this._endDay!
      }`;
    } else {
      this.endDate = '';
    }
    this._valueChange();
    this.inputValue = (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value;
  };

  /**
   * @param e 인풋이벤트
   * 키패드 입력 처리(이벤트 핸들러)
   * */
  private _inputHandler(e: InputEvent) {
    let cursor = Number((e.target! as HTMLInputElement).selectionStart!);
    let value = (e.target as HTMLInputElement).value;
    const minYear = Number(this.min?.slice(0, 4));
    const maxYear = Number(this.max?.slice(0, 4));
    const minMonth = Number(this.min?.slice(0, 6));
    const maxMonth = Number(this.max?.slice(0, 6));
    const minDay = Number(this.min);
    const maxDay = Number(this.max);
    value = value.toUpperCase();

    if (value.search(/[^0-9-~_ ]/g) >= 0) {
      (e.target as HTMLInputElement).value = this._beforeValue!;
      (e.target as HTMLInputElement).setSelectionRange(cursor! - 1, cursor! - 1);
      return;
    }

    if (e.data !== null) {
      let checkValue = 0;
      let beforValue = 0;
      const date = new DateUtill();
      switch (cursor) {
        case 4:
          if (minYear > Number(value.slice(0, 4))) {
            (e.target as HTMLInputElement).value = minYear + '-' + value.slice(cursor + 2, value.length);
          } else if (maxYear < Number(value.slice(0, 4))) {
            (e.target as HTMLInputElement).value = maxYear + '-' + value.slice(cursor + 2, value.length);
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + '-' + value.slice(cursor + 2, value.length);
          }
          cursor++;
          break;
        case 7:
          if (Number(value.slice(5, 7)) > 12) {
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value =
              value.slice(0, cursor - 2) + '12' + '-' + value.slice(cursor + 1, value.length);
            value = (e.target as HTMLInputElement).value;
          } else if (Number(value.slice(5, 7)) < 1) {
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value =
              value.slice(0, cursor - 2) + '01' + '-' + value.slice(cursor + 1, value.length);
            value = (e.target as HTMLInputElement).value;
          }
          checkValue = Number(value.slice(0, 4) + value.slice(5, 7));
          if (minMonth > checkValue) {
            (e.target as HTMLInputElement).value =
              this.min!.slice(0, 4) + '-' + this.min!.slice(4, 6) + '-' + value.slice(cursor + 2, value.length);
          } else if (maxMonth < checkValue) {
            (e.target as HTMLInputElement).value =
              this.max!.slice(0, 4) + '-' + this.max!.slice(4, 6) + '-' + value.slice(cursor + 2, value.length);
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + '-' + value.slice(cursor + 2, value.length);
          }
          cursor++;
          break;
        case 5:
          (e.target as HTMLInputElement).value =
            value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
          cursor++;
          break;
        case 8:
          // 시작 월 값변경
          (e.target as HTMLInputElement).value =
            value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
          cursor++;
          break;
        case 10:
          if (Number(value.slice(8, 10)) > date.getLastDay(Number(value.slice(0, 4)), Number(value.slice(5, 7)))) {
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value =
              value.slice(0, cursor - 2) +
              date.getLastDay(Number(value.slice(0, 4)), Number(value.slice(5, 7))) +
              '-' +
              value.slice(cursor + 1, value.length);
            value = (e.target as HTMLInputElement).value;
          } else if (Number(value.slice(8, 10)) < 1) {
            (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value =
              value.slice(0, cursor - 2) + '01' + '-' + value.slice(cursor + 1, value.length);
            value = (e.target as HTMLInputElement).value;
          }
          checkValue = Number(value.slice(0, 4) + value.slice(5, 7) + value.slice(8, 10));
          if (minDay > checkValue) {
            (e.target as HTMLInputElement).value =
              this.min!.slice(0, 4) + '-' + this.min!.slice(4, 6) + '-' + this.min!.slice(6, 8) + ' ~ ____-__-__';
          } else if (maxDay < checkValue) {
            (e.target as HTMLInputElement).value =
              this.max!.slice(0, 4) + '-' + this.max!.slice(4, 6) + '-' + this.max!.slice(6, 8) + ' ~ ____-__-__';
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ' ~ ____-__-__';
          }
          this._startYear = Number((e.target as HTMLInputElement).value.slice(0, 4));
          this._startMonth = Number((e.target as HTMLInputElement).value.slice(5, 7));
          this._startDay = Number((e.target as HTMLInputElement).value.slice(8, 10));
          this._endYear = undefined;
          this._endMonth = undefined;
          this._endDay = undefined;
          if (this.mode === 'day') {
            this._dayViewChange(this._startYear, this._startMonth);
            this._daySelect();
          }
          cursor += 3;
          break;
        case 11:
          // 시작 일 값변경
          (e.target as HTMLInputElement).value =
            value.slice(0, cursor - 1) +
            ' ~ ' +
            value.slice(cursor - 1, cursor) +
            value.slice(cursor + 4, value.length);
          cursor += 3;
          break;
        case 12:
        case 13:
          (e.target as HTMLInputElement).value =
            value.slice(0, 10) + ' ~ ' + value.slice(cursor - 1, cursor) + value.slice(15, value.length);
          cursor = 14;
          break;
        case 17:
          if (
            Number((e.target as HTMLInputElement).value.slice(0, 4)) >
            Number((e.target as HTMLInputElement).value.slice(13, 17))
          ) {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ' ~ ____-__-__';
            cursor = 13;
          } else if (Number((e.target as HTMLInputElement).value.slice(13, 17)) < minYear) {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ` ~ ${minYear}-__-__`;
          } else if (Number((e.target as HTMLInputElement).value.slice(13, 17)) > maxYear) {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ` ~ ${maxYear}-__-__`;
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
          }
          cursor++;
          break;
        case 18:
          // 끝 년도 값변경
          (e.target as HTMLInputElement).value =
            value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
          cursor++;
          break;
        case 20:
          checkValue = Number(
            (e.target as HTMLInputElement).value.slice(13, 17) + (e.target as HTMLInputElement).value.slice(18, 20)
          );
          beforValue = Number(
            (e.target as HTMLInputElement).value.slice(0, 4) + (e.target as HTMLInputElement).value.slice(5, 7)
          );

          if (checkValue <= beforValue) {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ' ~ ____-__-__';
            cursor = 13;
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
          }
          break;
        case 21:
          // 끝 월 값변경
          (e.target as HTMLInputElement).value =
            value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
          cursor++;
          break;
        case 23:
          if (
            Number((e.target as HTMLInputElement).value.slice(0, 4)) ===
              Number((e.target as HTMLInputElement).value.slice(13, 17)) &&
            Number((e.target as HTMLInputElement).value.slice(5, 7)) ===
              Number((e.target as HTMLInputElement).value.slice(18, 20)) &&
            Number((e.target as HTMLInputElement).value.slice(8, 10)) >
              Number((e.target as HTMLInputElement).value.slice(21, 23))
          ) {
            (e.target as HTMLInputElement).value = value.slice(0, 10) + ' ~ ____-__-__';
            cursor = 13;
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
            cursor++;
          }
          this._endYear = Number((e.target as HTMLInputElement).value.slice(13, 17));
          this._endMonth = Number((e.target as HTMLInputElement).value.slice(18, 20));
          this._endDay = Number((e.target as HTMLInputElement).value.slice(21, 23));
          this._startYear = Number((e.target as HTMLInputElement).value.slice(0, 4));
          this._startMonth = Number((e.target as HTMLInputElement).value.slice(5, 7));
          this._startDay = Number((e.target as HTMLInputElement).value.slice(8, 10));
          this._dayViewChange(this._endYear, this._endMonth);
          this._daySelect();
          break;
        case 24:
          (e.target as HTMLInputElement).value = this._beforeValue!;
          break;
        default:
          if (cursor > 24) {
            (e.target as HTMLInputElement).value = this._beforeValue!;
          } else {
            (e.target as HTMLInputElement).value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
          }
      }
    } else {
      switch (cursor) {
        case 4:
        case 7:
        case 17:
        case 20:
          (e.target as HTMLInputElement).value = value.slice(0, cursor - 1) + '_-' + value.slice(cursor, value.length);
          cursor--;
          break;
        case 10:
        case 11:
        case 12:
          (e.target as HTMLInputElement).value = value.slice(0, 9) + '_ ~ ' + value.slice(12, value.length);
          cursor = 9;
          break;
        default:
          (e.target as HTMLInputElement).value = value.slice(0, cursor) + '_' + value.slice(cursor, value.length);
      }
    }
    (e.target as HTMLInputElement).setSelectionRange(cursor!, cursor!);
  }

  private _removeClickHandler() {
    (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = '____-__-__ ~ ____-__-__';
    this._startYear = undefined;
    this._startMonth = undefined;
    this._startDay = undefined;
    this._endYear = undefined;
    this._endMonth = undefined;
    this._endDay = undefined;
    this.shadowRoot?.querySelectorAll('.select')?.forEach($select => {
      $select.classList.remove('select');
    });
    this.shadowRoot!.querySelector('.period-month.period .select-start')?.classList.remove('select-start');
    this.shadowRoot!.querySelector('.period-month.period .select-end')?.classList.remove('select-end');
    this.shadowRoot!.querySelectorAll('.period-month.period .select-period')?.forEach($period => {
      $period.classList.remove('select-period');
    });
  }

  private _dayViewChange(y?: number, m?: number) {
    this.shadowRoot?.querySelector('.select')?.classList.remove('select');
    this.shadowRoot?.querySelector('.select-start')?.classList.remove('select-start');
    this.shadowRoot?.querySelector('.select-end')?.classList.remove('select-end');
    this.shadowRoot?.querySelectorAll('.select-period')?.forEach($period => {
      $period.classList.remove('select-period');
    });
    let toYear = this.toYear;
    let toMonth = this.toMonth + 1;
    if (y !== undefined && m !== undefined) {
      toYear = y;
      toMonth = m;
    }
    this._viewYear = toYear;
    this._viewMonth = toMonth;
    this._modeView = `${this._viewYear}-${this._viewMonth! > 9 ? this._viewMonth : '0' + this._viewMonth}`;
    if (toMonth >= 11) {
      this._beforeView = this._dayPickerView(toYear, toMonth - 1);
      this._nowView = this._dayPickerView(toYear, toMonth);
      this._afterView = this._dayPickerView(toYear + 1, 1);
    } else if (this.toMonth < 1) {
      this._beforeView = this._dayPickerView(toYear - 1, 11);
      this._nowView = this._dayPickerView(toYear, toMonth);
      this._afterView = this._dayPickerView(toYear, toMonth + 1);
    } else {
      this._beforeView = this._dayPickerView(toYear, toMonth - 1);
      this._nowView = this._dayPickerView(toYear, toMonth);
      this._afterView = this._dayPickerView(toYear, toMonth + 1);
    }
  }

  private _nowClickHandler() {
    this.mode = 'day';
    this._dayViewChange(this.toYear, this.toMonth + 1);
    this.shadowRoot!.querySelector('.selected')?.classList.remove('selected');
  }

  private _optionBtnClickHandler(e: Event) {
    const $el = e.currentTarget as HTMLElement;
    if ($el.classList.contains('select')) {
      $el.classList.remove('select');
      this._startYear = undefined;
      this._startMonth = undefined;
      this._startDay = undefined;
      this._endYear = undefined;
      this._endMonth = undefined;
      this._endDay = undefined;
    } else {
      $el.parentElement!.parentElement!.parentElement!.querySelectorAll('.select').forEach($select => {
        $select.classList.remove('select');
      });
      this.shadowRoot!.querySelector('.period-month.period .select-start')?.classList.remove('select-start');
      this.shadowRoot!.querySelector('.period-month.period .select-end')?.classList.remove('select-end');
      this.shadowRoot!.querySelectorAll('.period-month.period .select-period')?.forEach($period => {
        $period.classList.remove('select-period');
      });

      $el.classList.add('select');

      const firstDate = new Date();
      const lastDate = new Date();
      let first = firstDate.getDate() - firstDate.getDay();
      let last = lastDate.getDate() + (6 - lastDate.getDay());
      const date = new DateUtill();
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
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
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
          } else {
            this._endDay = date.getLastDay(this._endYear, this._endMonth);
          }
          // 전월
          break;
        case '4':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 1;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 3;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 1/4분기
          break;
        case '5':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 4;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 6;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 2/4분기
          break;
        case '6':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 7;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 9;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 3/4분기
          break;
        case '7':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 10;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 12;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 4/4분기
          break;
        case '8':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 1;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 6;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 상반기
          break;
        case '9':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 7;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 12;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 하반기
          break;
        case '10':
          this._startYear = firstDate.getFullYear();
          this._startMonth = 1;
          this._startDay = 1;
          this._endYear = lastDate.getFullYear();
          this._endMonth = 12;
          this._endDay = date.getLastDay(this._endYear, this._endMonth);
          // 올해
          break;
      }
    }
  }

  private _valueChange() {
    (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value =
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

  _dayClickHandler = (e: Event) => {
    const $el = (e.currentTarget as HTMLElement)!;
    if (this._startDay === undefined) {
      this._startYear = this._viewYear!;
      this._startMonth = this._viewMonth!;
      this._startDay = Number($el.dataset.value)!;
    } else if (
      (this._endDay === undefined && this._startYear! < this._viewYear!) ||
      (this._endDay === undefined && this._startYear === this._viewYear && this._startMonth! < this._viewMonth!) ||
      (this._endDay === undefined &&
        this._startYear === this._viewYear &&
        this._startMonth! === this._viewMonth! &&
        this._startDay < Number($el.dataset.value)) ||
      (this._startYear === this._viewYear &&
        this._startMonth === this._viewMonth &&
        this._startDay === Number($el.dataset.value) &&
        this._endDay === undefined)
    ) {
      // 선택 조건에 해당될 경우 endDay 를 설정
      this._endYear = this._viewYear;
      this._endMonth = this._viewMonth;
      this._endDay = Number($el.dataset.value);
    } else {
      // 선택 조건에 부합하지 않을경우 선택한일을 시작일로 변경
      this._endDay = undefined;
      this._endYear = undefined;
      this._endMonth = undefined;
      this._startYear = this._viewYear;
      this._startMonth = this._viewMonth;
      this._startDay = Number($el.dataset.value);
    }
    this._daySelect();
    this._valueChange();
  };

  /**
   * 년도를 클릭시 UI 를 변경합니다.
   * */
  _yearClickHandler = (e: Event) => {
    const $el = e.currentTarget as HTMLElement;
    this._viewYear = Number($el.dataset.value);
    this.mode = 'month';
    this._monthViewChange(Number($el.dataset.value));
  };

  /**
   * 현재 보여지는 상태를 변경 합니다.
   * */
  private _modeClickHandler() {
    if (this.mode === 'day') {
      this._monthViewChange(this._viewYear!);
      this.mode = 'month';
    } else if (this.mode === 'month') {
      this._yearViewChange(this._viewYear!);
      this.mode = 'year';
    }
  }

  private _beforeMode: 'year' | 'day' | 'month' | 'option' | undefined;

  private _optionClickHandler(e: Event) {
    (e.currentTarget as HTMLElement).classList?.remove('selected');
    if (this.mode === 'option') {
      this.mode = this._beforeMode!;
      if (this.mode === 'day') {
        this._dayViewChange(this._viewYear, this._viewMonth!);
      } else if (this.mode === 'year') {
        this._yearViewChange(this._viewYear);
      } else if (this.mode === 'month') {
        this._monthViewChange(this._viewYear);
      }
    } else {
      this._beforeMode = this.mode;
      (e.currentTarget as HTMLElement).classList.add('selected');
      this.mode = 'option';
    }
  }

  /**
   *  년도 선택 UI를 변경해 줍니다.
   * @param y year
   * */
  private _yearViewChange(y?: number) {
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
  private _monthViewChange(y?: number) {
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

  private _optionMonthClickHandler(e: Event): void {
    const $el = e.currentTarget as HTMLElement;
    const date = new Date();
    const dateUtile = new DateUtill();

    if (this.shadowRoot!.querySelector('.period-month.period .select') === null) {
      this.shadowRoot!.querySelectorAll('.calendar-content .select').forEach($select => {
        $select.classList.remove('select');
      });
      this._startYear = date.getFullYear();
      this._startMonth = Number($el.dataset.value);
      this._startDay = 1;
      this._endYear = undefined;
      this._endMonth = undefined;
      this._endDay = undefined;
      $el.classList.add('select');
    } else {
      if (this._startMonth! < Number($el.dataset.value) && this._endMonth === undefined) {
        this._endYear = date.getFullYear();
        this._endMonth = Number($el.dataset.value);
        this._endDay = dateUtile.getLastDay(this._endYear, this._endMonth);
        this.shadowRoot!.querySelector('.period-month.period .select')?.classList.add('select-start');
        $el.classList.add('select-end');
        $el.classList.add('select');
        $el.parentElement!.children;
        for (let i = 0; i < $el.parentElement!.children.length; i++) {
          const item = $el.parentElement!.children.item(i) as HTMLElement;
          if (Number(item.dataset.value) > this._startMonth! && Number(item.dataset.value) < this._endMonth!) {
            item.classList.add('select-period');
          }
        }
      } else {
        this.shadowRoot!.querySelector('.period-month.period .select')?.classList.remove('select');
        this.shadowRoot!.querySelector('.period-month.period .select')?.classList.remove('select');
        this.shadowRoot!.querySelector('.period-month.period .select-start')?.classList.remove('select-start');
        this.shadowRoot!.querySelector('.period-month.period .select-end')?.classList.remove('select-end');
        this.shadowRoot!.querySelectorAll('.period-month.period .select-period')?.forEach($period => {
          $period.classList.remove('select-period');
        });
        $el.classList.add('select');
        this._startMonth = Number($el.dataset.value);
        this._endYear = undefined;
        this._endMonth = undefined;
        this._endDay = undefined;
      }
    }
    this._valueChange();
  }

  _monthClickHandler = (e: Event): void => {
    const $el = e.currentTarget as HTMLElement;
    this._viewMonth = Number($el.dataset.value);
    this._dayViewChange(this._viewYear!, this._viewMonth);
    this.mode = 'day';
    this._beforeViewYear = undefined;
  };

  _modeViewChange = (): void => {
    if (this._mode === 'day') {
      this._modeView = `${this._viewYear}-${this._viewMonth! >= 10 ? this._viewMonth : '0' + this._viewMonth}`;
    } else if (this._mode === 'month') {
      this._modeView = `${this._viewYear}`;
    } else {
      this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
        (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
      }`;
    }
  };

  private _beforeViewYear: number | undefined;

  private _monthSelect(): void {
    const $el = this.shadowRoot!.querySelectorAll('.calendar-month')[1] as HTMLElement;
    $el?.querySelector('.select')?.classList.remove('select');
    if (this._beforeViewYear === undefined) {
      this._beforeViewYear = this._viewYear;
    }
    if (this._beforeViewYear === this._viewYear) {
      $el.children.item(this._viewMonth! - 1)?.classList.add('select');
    }
  }

  private _daySelect(): void {
    const $el = this.shadowRoot!.querySelectorAll('.calendar-date')[1] as HTMLElement;
    $el.querySelectorAll('.day').forEach($day => {
      $day?.classList.remove('select');
      $day?.classList.remove('select-start');
      $day?.classList.remove('select-end');
      $day?.classList.remove('today');
      $day?.classList.remove('select-period');
      const value = Number(($day as HTMLElement).dataset.value);
      if (this.toYear === this._viewYear && this.toMonth + 1 === this._viewMonth && value === this.toDay) {
        $day.classList.add('today');
      }
      // start
      if (this._viewYear === this._startYear && this._viewMonth === this._startMonth && this._startDay === value) {
        if (this._endYear !== undefined) {
          $day.classList.add('select-start');
        } else {
          $day.classList.add('select');
        }
      }
      // end
      else if (this._viewYear === this._endYear && this._viewMonth === this._endMonth && this._endDay === value) {
        $day.classList.add('select-end');
      }
      // period
      else if (this._startYear !== undefined && this._endYear !== undefined) {
        const STARTDATE = Number(
          `${this._startYear}${this._startMonth! < 10 ? '0' + this._startMonth! : this._startMonth}${
            this._startDay! < 10 ? '0' + this._startDay! : this._startDay!
          }`
        );
        const ENDDATE = Number(
          `${this._endYear}${this._endMonth! < 10 ? '0' + this._endMonth! : this._endMonth}${
            this._endDay! < 10 ? '0' + this._endDay! : this._endDay!
          }`
        );
        const VIEWDATE = Number(
          `${this._viewYear}${this._viewMonth! < 10 ? '0' + this._viewMonth! : this._viewMonth}${
            value < 10 ? '0' + value : value
          }`
        );

        if (VIEWDATE > STARTDATE && VIEWDATE < ENDDATE) {
          $day.classList.add('select-period');
        }
      }
    });
  }

  private _yearSelect() {
    const $el = this.shadowRoot!.querySelectorAll('.calendar-year')[1] as HTMLElement;
    $el.querySelector('.select')?.classList.remove('select');
    if (this._beforeViewYear === undefined) {
      this._beforeViewYear = this._viewYear;
    }

    for (let i = 0; i < $el.children.length; i++) {
      if (this._viewYear === Number(($el.children.item(i) as HTMLElement)!.dataset.value)) {
        ($el.children.item(i) as HTMLElement).classList.add('select');
      }
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    if (_changedProperties.has('startDate')) {
      if (this.startDate !== undefined) {
        const year = this.startDate!.slice(0, 4);
        const month = this.startDate!.slice(4, 6);
        const day = this.startDate!.slice(6, 8);
        this._startYear = Number(year);
        this._startMonth = Number(month);
        this._startDay = Number(day);
        this._valueChange();
        this.inputValue = (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value;
      }
    }
    if (_changedProperties.has('startDate')) {
      if (this.endDate !== undefined) {
        this._endYear = Number(this.endDate!.slice(0, 4));
        this._endMonth = Number(this.endDate!.slice(4, 6));
        this._endDay = Number(this.endDate!.slice(6, 8));
        this._valueChange();
        this.inputValue = (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value;
      }
    }

    super.updated(_changedProperties);
    if (this.mode === 'day') {
      this._daySelect();
    } else if (this.mode === 'month') {
      this._monthSelect();
    } else if (this.mode === 'year') {
      this._yearSelect();
    }
  }

  render() {
    return template.call(this);
  }
}
