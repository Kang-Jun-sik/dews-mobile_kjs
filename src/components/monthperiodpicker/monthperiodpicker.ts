import template from './monthperiodpicker.html';
import scss from './monthperiodpicker.scss';
import { internalProperty, property, PropertyValues } from 'lit-element';
import { PickerBase } from '../picker/picker-base.js';
import { DateUtill } from '../base/DateUtill.js';

export class Monthperiodpicker extends PickerBase {
  static styles = scss;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String })
  value: string | undefined = '';

  @property({ type: String })
  end: string | undefined = '';

  @property({ type: String })
  start: string | undefined = '';

  @internalProperty()
  private _value: string | undefined = '____-__ ~ ____-__';

  @internalProperty()
  private height: string | undefined;

  @internalProperty()
  private mode: 'month' | 'year' | 'option' = 'month';

  private _startYear: number | undefined;
  private _startMonth: number | undefined;

  private _endYear: number | undefined;
  private _endMonth: number | undefined;

  private _beforeValue: string | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._mode = 'month';
    this._monthViewChange();
  }

  _modeViewChange = () => {
    if (this._mode === 'month') {
      this._modeView = this._viewYear!.toString();
    } else if (this._mode === 'year') {
      this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
        (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
      }`;
    }
  };

  private _beforeInputHandler(e: InputEvent) {
    this._beforeValue = (e.target as HTMLInputElement).value;
    if (/\d/.exec(e.data!) == null && e.data != null) {
      e.returnValue = false;
    }
  }

  _confirmClickHandler = () => {
    this._close();
    this.inputValue =
      `${this._startYear === undefined ? '____' : this._startYear}` +
      '-' +
      `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
      ' ~ ' +
      `${this._endYear === undefined ? '____' : this._endYear}` +
      '-' +
      `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}`;
  };

  private _inputHandler(e: InputEvent) {
    let cursor = (e.target! as HTMLInputElement).selectionStart!;
    let value = (e.target as HTMLInputElement).value;
    value = value.toUpperCase();

    if (value.search(/[^0-9-~_ ]/g) >= 0) {
      (e.target as HTMLInputElement).value = this._beforeValue!;
      (e.target as HTMLInputElement).setSelectionRange(cursor! - 1, cursor! - 1);
      return;
    } else if (cursor === 5 && e.data !== null) {
      // 시작년도 값 변경
      (e.target as HTMLInputElement).value =
        value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
      cursor++;
    } else if (cursor === 8 && e.data !== null) {
      // 시작 월 값변경
      (e.target as HTMLInputElement).value =
        value.slice(0, cursor - 1) + ' ~ ' + value.slice(cursor - 1, cursor) + value.slice(cursor + 4, value.length);
      cursor += 3;
    } else if (cursor === 15 && e.data !== null) {
      // 끝 년도 값변경
      (e.target as HTMLInputElement).value =
        value.slice(0, cursor - 1) + '-' + value.slice(cursor - 1, cursor) + value.slice(cursor + 2, value.length);
      cursor++;
    } else if (cursor === 17 && e.data !== null) {
      (e.target as HTMLInputElement).value = value.slice(0, cursor);
      this._endYear = Number(value.slice(10, 14));
      this._endMonth = Number(value.slice(15, 17));
      this._monthSelect();
    } else if (cursor === 18 && e.data !== null) {
      // 끝 월 값변경
      (e.target as HTMLInputElement).value = this._beforeValue!;
    } else if (e.data !== null) {
      (e.target as HTMLInputElement).value = value.slice(0, cursor) + value.slice(cursor + 1, value.length);
    } else {
      if (cursor === 4 || cursor === 14) {
        (e.target as HTMLInputElement).value = value.slice(0, cursor - 1) + '_-' + value.slice(cursor, value.length);
        cursor--;
      } else if (cursor > 6 && cursor < 10) {
        (e.target as HTMLInputElement).value = value.slice(0, 6) + '_ ~ ' + value.slice(9, value.length);
        cursor = 6;
      } else {
        (e.target as HTMLInputElement).value = value.slice(0, cursor) + '_' + value.slice(cursor, value.length);
      }
    }

    const change = () => {
      this._endYear = Number((e.target as HTMLInputElement).value.slice(10, 14));
      this._endMonth = Number((e.target as HTMLInputElement).value.slice(15, 17));
      this._startYear = Number((e.target as HTMLInputElement).value.slice(0, 4));
      this._startMonth = Number((e.target as HTMLInputElement).value.slice(5, 7));
    };

    if (cursor === 7 && e.data !== null) {
      this._startYear = Number((e.target as HTMLInputElement).value.slice(0, 4));
      this._startMonth = Number((e.target as HTMLInputElement).value.slice(5, 7));
    }

    if (cursor === 14 && e.data !== null) {
      if (
        Number((e.target as HTMLInputElement).value.slice(0, 4)) >
        Number((e.target as HTMLInputElement).value.slice(10, 14))
      ) {
        (e.target as HTMLInputElement).value = value.slice(0, 7) + ' ~ ' + value.slice(0, 7);
        cursor = value.length;
        change();
      }
    }

    if (cursor === 20 && e.data !== null) {
      if (
        Number((e.target as HTMLInputElement).value.slice(0, 4)) ===
          Number((e.target as HTMLInputElement).value.slice(13, 17)) &&
        Number((e.target as HTMLInputElement).value.slice(5, 7)) >
          Number((e.target as HTMLInputElement).value.slice(18, 20))
      ) {
        (e.target as HTMLInputElement).value = value.slice(0, 10) + ' ~ ' + value.slice(0, 10);
        change();
      }
    }

    if (cursor === 17 && e.data !== null) {
      if (
        Number((e.target as HTMLInputElement).value.slice(0, 4)) ===
          Number((e.target as HTMLInputElement).value.slice(10, 14)) &&
        Number((e.target as HTMLInputElement).value.slice(5, 7)) ===
          Number((e.target as HTMLInputElement).value.slice(15, 17))
      ) {
        (e.target as HTMLInputElement).value = value.slice(0, 7) + ' ~ ' + value.slice(0, 7);
        change();
      }
    }

    if (cursor === 23 && e.data !== null) {
      change();
    }

    (e.target as HTMLInputElement).setSelectionRange(cursor!, cursor!);
  }

  private _removeClickHandler() {
    this._value = '____-__ ~ ____-__';
    this._startYear = undefined;
    this._startMonth = undefined;
    this._endYear = undefined;
    this._endMonth = undefined;
    this.shadowRoot?.querySelectorAll('.select')?.forEach($select => {
      $select.classList.remove('select');
    });
    this.shadowRoot!.querySelector('.period-month.period .select-start')?.classList.remove('select-start');
    this.shadowRoot!.querySelector('.period-month.period .select-end')?.classList.remove('select-end');
    this.shadowRoot!.querySelectorAll('.period-month.period .select-period')?.forEach($period => {
      $period.classList.remove('select-period');
    });
  }

  private _optionBtnClickHandler(e: Event) {
    const year = new Date().getFullYear();
    this.shadowRoot?.querySelector('.select-start')?.classList.remove('select-start');
    this.shadowRoot?.querySelector('.select-end')?.classList.remove('select-end');
    this.shadowRoot?.querySelectorAll('.select')?.forEach($select => {
      $select.classList.remove('select');
    });
    this.shadowRoot?.querySelectorAll('.select-period')?.forEach($period => {
      $period.classList.remove('select-period');
    });

    (e.currentTarget as HTMLElement).classList.add('select');
    switch (Number((e.currentTarget as HTMLElement).dataset.index)) {
      case 0:
        this._startYear = year;
        this._startMonth = 1;
        this._endYear = year;
        this._endMonth = 3;
        break;
      case 1:
        this._startYear = year;
        this._startMonth = 3;
        this._endYear = year;
        this._endMonth = 6;
        break;
      case 2:
        this._startYear = year;
        this._startMonth = 6;
        this._endYear = year;
        this._endMonth = 9;
        break;
      case 3:
        this._startYear = year;
        this._startMonth = 9;
        this._endYear = year;
        this._endMonth = 12;
        break;
      case 4:
        this._startYear = year;
        this._startMonth = 1;
        this._endYear = year;
        this._endMonth = 6;
        break;
      case 5:
        this._startYear = year;
        this._startMonth = 7;
        this._endYear = year;
        this._endMonth = 12;
        break;
      case 6:
        this._startYear = year;
        this._startMonth = 1;
        this._endYear = year;
        this._endMonth = 12;
        break;
    }

    this._value =
      `${this._startYear === undefined ? '____' : this._startYear}` +
      '-' +
      `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
      ' ~ ' +
      `${this._endYear === undefined ? '____' : this._endYear}` +
      '-' +
      `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}`;
  }

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
    if (this.mode === 'month') {
      this._yearViewChange(this._viewYear!);
      this.mode = 'year';
    }
  }

  private _beforeMode: 'year' | 'month' | 'option' | undefined;

  private _optionClickHandler(e: Event) {
    (e.currentTarget as HTMLElement).classList?.remove('selected');
    if (this.mode === 'option') {
      this.mode = this._beforeMode!;
      if (this.mode === 'year') {
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
    if (this.shadowRoot!.querySelector('.period-month.period .select') === null) {
      this.shadowRoot!.querySelectorAll('.calendar-content .select').forEach($select => {
        $select.classList.remove('select');
      });
      this._startYear = date.getFullYear();
      this._startMonth = Number($el.dataset.value);
      this._endYear = undefined;
      this._endMonth = undefined;
      $el.classList.add('select');
    } else {
      if (this._startMonth! <= Number($el.dataset.value) && this._endMonth === undefined) {
        this._endYear = date.getFullYear();
        this._endMonth = Number($el.dataset.value);
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
      }
    }

    this._value =
      `${this._startYear === undefined ? '____' : this._startYear}` +
      '-' +
      `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
      ' ~ ' +
      `${this._endYear === undefined ? '____' : this._endYear}` +
      '-' +
      `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}`;
    // this._startDay = date.getDate();
    // this._endYear = date.getFullYear();
  }

  _monthClickHandler = (e: Event): void => {
    const $el = e.currentTarget as HTMLElement;
    const value = Number($el.dataset.value);
    if (this._startYear! < this._viewYear! || (this._startYear === this._viewYear! && this._startMonth! <= value)) {
      if (this._endYear === this._viewYear && this._endMonth! !== undefined) {
        this._startYear = this._viewYear;
        this._startMonth = value;
        this._endYear = undefined;
        this._endMonth = undefined;
      } else {
        this._endYear = this._viewYear;
        this._endMonth = value;
      }
    } else {
      this._startYear = this._viewYear;
      this._startMonth = value;
      this._endYear = undefined;
      this._endMonth = undefined;
    }
    this._monthSelect();
    this._beforeViewYear = undefined;
  };

  private _beforeViewYear: number | undefined;

  private _monthSelect(): void {
    const $el = this.shadowRoot!.querySelectorAll('.calendar-month')[1] as HTMLElement;
    $el.querySelector('.select')?.classList.remove('select');
    $el.querySelector('.select-start')?.classList.remove('select-start');
    $el.querySelector('.select-end')?.classList.remove('select-end');
    $el.querySelectorAll('.select-period')?.forEach($period => {
      $period?.classList?.remove('select-period');
    });

    const date = new DateUtill();
    const STARTTIME = date.getTime(this._startYear!, this._startMonth!, 1);
    const ENDTIME = date.getTime(this._endYear!, this._endMonth!, 1);

    $el.querySelectorAll('.month').forEach($month => {
      const VIEWTIME = date.getTime(this._viewYear!, Number(($month as HTMLElement).dataset.value), 1);
      if (STARTTIME === VIEWTIME) {
        if (ENDTIME) {
          $month.classList.add('select-start');
        } else {
          $month.classList.add('select');
        }
      } else if (STARTTIME < VIEWTIME && ENDTIME > VIEWTIME) {
        $month.classList.add('select-period');
      }
      if (ENDTIME === VIEWTIME) {
        $month.classList.add('select-end');
      }
    });

    this._value =
      `${this._startYear === undefined ? '____' : this._startYear}` +
      '-' +
      `${this._startMonth === undefined ? '__' : this._startMonth < 10 ? '0' + this._startMonth : this._startMonth}` +
      ' ~ ' +
      `${this._endYear === undefined ? '____' : this._endYear}` +
      '-' +
      `${this._endMonth === undefined ? '__' : this._endMonth < 10 ? '0' + this._endMonth : this._endMonth}`;
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
    super.updated(_changedProperties);
    if (this.mode === 'month') {
      this._monthSelect();
    } else if (this.mode === 'year') {
      this._yearSelect();
    }
  }

  render() {
    return template.call(this);
  }
}
