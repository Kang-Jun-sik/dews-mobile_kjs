import { DewsFormComponent } from '../../base/DewsFormComponent.js';

import template from './weekperiodpicker.html';
import scss from './weekperiodpicker.scss';
import { internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { PickerBase } from '../picker-base.js';
import { html } from 'lit-html';

export class Weekperiodpicker extends PickerBase {
  static styles = scss;

  @property({ type: String })
  value: string | undefined = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  min: string | undefined = undefined;

  @property({ type: String })
  max: string | undefined = undefined;

  @property({ type: String })
  startDate: string | undefined;

  @property({ type: String })
  endDate: string | undefined;

  @internalProperty()
  private _value = '____/__ ~ ____/__';

  connectedCallback() {
    super.connectedCallback();
    this._setWeekPicker(new Date().getFullYear());

    this._mode = 'week';
  }

  /**
   * 현재 보여지는 상태를 변경 합니다.
   * */
  private _modeClickHandler() {
    if (this._mode === 'week') {
      this._yearViewChange(this._viewYear!);
      this._mode = 'year';
    }
  }

  _yearClickHandler = (e: MouseEvent) => {
    const $el = e.currentTarget as HTMLElement;
    this._viewYear = Number($el.dataset.value);
    this._setYear = this._viewYear;
    this._mode = 'week';
    this._weekViewChange();
    this._modeViewChange();
  };

  private _weekViewChange() {
    this._beforeView = this._weekPickerView();
    this._nowView = this._weekPickerView();
    this._afterView = this._weekPickerView();
    this._weekSelect();
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
    this._modeView = `${Math.floor(year / 10) * 10}-${Math.floor(year / 10) * 10 + 9}`;
    this._beforeView = this._yearPickerView(Math.floor(year / 10) * 10 - 10);
    this._nowView = this._yearPickerView(Math.floor(year / 10) * 10);
    this._afterView = this._yearPickerView(Math.floor(year / 10) * 10 + 10);
  }

  _modeViewChange = (): void => {
    console.log(this._mode);
    if (this._mode === 'week') {
      this._modeView = `${this._viewYear}`;
    } else {
      this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
        (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
      }`;
    }
  };

  // 입력한 값이 숫자인지 문자인지 판별후 값 제거
  private _beforeInputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if ((/\d/.exec(e.data!) == null && e.data != null) || ($el.selectionStart! > 16 && e.data != null)) {
      e.returnValue = false;
    }
  }

  // input 입력 처리
  private _inputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    let cursor: number = $el.selectionStart as number;
    const value = $el.value;
    if (e.data !== null) {
      switch (cursor) {
        case 4:
        case 14:
          $el.value = value?.slice(0, cursor) + value?.slice(cursor + 1, value.length);
          cursor++;
          break;
        case 7:
          $el.value = value?.slice(0, cursor) + value?.slice(cursor + 1, value.length);
          if (Number(value?.slice(5, 7)) < 1) {
            $el.value = value?.slice(0, 5) + '01' + value?.slice(cursor + 1, value.length);
          } else if (Number(value?.slice(5, 7)) > 52) {
            $el.value = value?.slice(0, 5) + '52' + value?.slice(cursor + 1, value.length);
          }
          cursor = 10;
          break;
        case 8:
        case 9:
        case 10:
          $el.value = value?.slice(0, 7) + ' ~ ' + value?.slice(cursor - 1, cursor) + value?.slice(12, value.length);
          cursor = 11;
          break;
        case 17:
          $el.value = value?.slice(0, cursor) + value?.slice(cursor + 1, value.length);
          if (Number(value?.slice(15, 17)) < 1) {
            $el.value = value?.slice(0, 15) + '01';
          } else if (Number(value?.slice(15, 17)) > 52) {
            $el.value = value?.slice(0, 15) + '52';
          }
          break;
        default:
          $el.value = value?.slice(0, cursor) + value?.slice(cursor + 1, value.length);
          break;
      }
      $el.setSelectionRange(cursor, cursor);
    } else {
      switch (cursor) {
        case 4:
        case 14:
          $el.value = value?.slice(0, cursor - 1) + '_/' + value?.slice(cursor, value.length);
          cursor--;
          break;
        case 7:
        case 8:
        case 9:
          $el.value = value?.slice(0, 6) + '_ ~ ' + value?.slice(9, value.length);
          cursor = 6;
          break;
        default:
          $el.value = value?.slice(0, cursor) + '_' + value?.slice(cursor, value.length);
          break;
      }
      $el.setSelectionRange(cursor, cursor);
    }

    /*
     *  최대값 최소값 및 입력값에 따라 UI 변경처리    * */

    const startYear = Number($el.value.slice(0, 4));
    const startWeek = Number($el.value.slice(5, 7));
    const endYear = Number($el.value.slice(10, 14));
    const endWeek = Number($el.value.slice(15, 17));
    if (startYear && startWeek) {
      this._startYear = startYear;
      this._startWeek = startWeek;
      if (endYear && endWeek) {
        if (startYear > endYear || (startYear === endYear && startWeek > endWeek)) {
          $el.value = $el.value.slice(0, 7) + ' ~ ' + $el.value.slice(0, 7);
          this._endYear = startYear;
          this._endWeek = startWeek;
        } else {
          this._endYear = endYear;
          this._endWeek = endWeek;
        }
      } else {
        this._endYear = undefined;
        this._endWeek = undefined;
      }
    } else {
      this._startYear = undefined;
      this._startWeek = undefined;
      this._endYear = undefined;
      this._endWeek = undefined;
    }
    this._weekSelect();
  }

  private _setWeekPicker(y: number) {
    this._viewYear = y;
    this._setYear = this._viewYear;
    this._modeView = this._viewYear.toString();
    this._afterView = this._weekPickerView();
    this._nowView = this._weekPickerView();
    this._beforeView = this._weekPickerView();
  }

  _confirmClickHandler = () => {
    if (this._startWeek !== undefined && this._endWeek !== undefined) {
      this.inputValue = (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value;
      this.startDate = `${this._startYear}${this._startWeek < 10 ? `0${this._startWeek}` : this._startWeek}`;
      this.endDate = `${this._endYear}${this._endWeek < 10 ? `0${this._endWeek}` : this._endWeek}`;
    } else {
      this.inputValue = '';
    }
    this._close();
  };

  _removeClickHandler = () => {
    this._startYear = undefined;
    this._startWeek = undefined;
    this._endYear = undefined;
    this._endWeek = undefined;
    (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = this._value;
    this._weekSelect();
  };

  private _weekSelect() {
    const $el = this.shadowRoot?.querySelectorAll('.period-weeks')[1] as HTMLElement;
    $el?.querySelectorAll('.select')?.forEach($week => {
      $week?.classList?.remove('select');
    });
    $el?.querySelectorAll('.select-period')?.forEach($week => {
      $week?.classList?.remove('select-period');
    });
    $el?.querySelector('.select-start')?.classList.remove('select-start');
    $el?.querySelector('.select-end')?.classList.remove('select-end');

    $el?.querySelectorAll('.week')?.forEach($week => {
      const value = Number(($week as HTMLElement).dataset.value);
      const select = Number(`${this._viewYear}${value < 10 ? `0${value}` : value}`);
      const start = Number(`${this._startYear}${this._startWeek! < 10 ? `0${this._startWeek!}` : this._startWeek!}`);
      const end = Number(`${this._endYear}${this._endWeek! < 10 ? `0${this._endWeek!}` : this._endWeek!}`);
      if (select === start) {
        if (this._endWeek !== undefined) {
          $week.classList.add('select-start');
        } else {
          $week.classList.add('select');
        }
      } else if (select > start && select < end) {
        $week.classList.add('select-period');
      }
      if (select === end) {
        $week.classList.add('select-end');
      }
    });
  }

  private _inputValueChange() {
    const startYear = this._startYear === undefined ? '____' : this._startYear;
    const startWeek =
      this._startWeek === undefined ? '__' : this._startWeek < 10 ? `0${this._startWeek}` : this._startWeek;
    const endYear = this._endYear === undefined ? '____' : this._endYear;
    const endWeek = this._endWeek === undefined ? '__' : this._endWeek < 10 ? `0${this._endWeek}` : this._endWeek;

    (this.shadowRoot?.querySelector(
      '.input'
    ) as HTMLInputElement).value = `${startYear}/${startWeek} ~ ${endYear}/${endWeek}`;
  }

  private _startYear: number | undefined;
  private _startWeek: number | undefined;
  private _endYear: number | undefined;
  private _endWeek: number | undefined;

  private _weekClickHandler(e: TouchEvent) {
    const $el = e.currentTarget as HTMLElement;
    const value = Number($el.dataset.value);
    const select = Number(`${this._viewYear}${value < 10 ? `0${value}` : value}`);
    const start = Number(`${this._startYear}${this._startWeek! < 10 ? `0${this._startWeek!}` : this._startWeek!}`);

    if (this._startWeek === undefined) {
      this._startYear = this._viewYear;
      this._startWeek = value;
    } else if (this._endWeek !== undefined || start > select) {
      this._startYear = this._viewYear;
      this._startWeek = value;
      this._endYear = undefined;
      this._endWeek = undefined;
    } else {
      this._endYear = this._viewYear;
      this._endWeek = value;
    }
    this._inputValueChange();
    this._weekSelect();
  }

  private _weekPickerView() {
    const weeks: Array<TemplateResult> = [];
    for (let i = 1; i <= 52; i++) {
      weeks.push(
        html` <li class="week" @click="${this._weekClickHandler}" data-value="${i}">
          <button><span>${i}주</span></button>
        </li>`
      );
    }

    return html` <div class="period-weeks">
      <ul>
        ${weeks}
      </ul>
    </div>`;
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('startDate')) {
      this._startYear = Number(this.startDate?.slice(0, 4));
      this._startWeek = Number(this.startDate?.slice(4, 6));
      (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = `${this.startDate?.slice(
        0,
        4
      )}/${this.startDate?.slice(4, 6)} ~ ${this.endDate?.slice(0, 4)}/${this.endDate?.slice(4, 6)}`;
    }
    if (_changedProperties.has('endDate')) {
      this._endYear = Number(this.endDate?.slice(0, 4));
      this._endWeek = Number(this.endDate?.slice(4, 6));
      (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = `${this.startDate?.slice(
        0,
        4
      )}/${this.startDate?.slice(4, 6)} ~ ${this.endDate?.slice(0, 4)}/${this.endDate?.slice(4, 6)}`;
    }

    this._weekSelect();
  }

  render() {
    return template.call(this);
  }
}
