import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './yearpicker.html';
import scss from './yearpicker.scss';
import { PickerBase } from '../picker-base.js';

export class Yearpicker extends PickerBase {
  static styles = scss;

  @property({ type: String })
  min: string | undefined = `${new Date().getFullYear() - 100}`;

  @property({ type: String })
  max: string | undefined = `${new Date().getFullYear() + 100}`;

  @internalProperty()
  private _value: string | undefined = '____';

  _mode: 'year' = 'year';

  @internalProperty()
  private $spinnerYear: TemplateResult | undefined;

  private yearMinCheck: boolean | undefined = false;
  private yearMaxCheck: boolean | undefined = false;
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
        this._spinnerPickerViewChange();
      } else {
        this._setYear = this.toYear;
        this._spinnerPickerViewChange();
      }
    }
  }

  reset() {
    this._removeClickHandler();
  }

  _spinnerPickerViewChange = () => {
    this.$spinnerYear = this._yearSpinnerPickerView();
  };

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
          // this._spinnerPickerViewChange(this._setYear);
          this._spinnerPickerViewChange();
          this._spinnerYearSelect();
          this._spinnerYearPositionChange();
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

  _inputChange = () => {
    this._value = `${this._setYear}`;
    (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = this._value;
  };

  // 년도 클릭 핸들러
  _yearClickHandler = (e: Event): void => {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._setYear = this._viewYear;
    this._inputChange();
  };

  // 적용버튼 핸들러
  _confirmClickHandler = (): void => {
    if (this._value?.indexOf('_')! < 0) {
      this.inputValue = this._value;
      this._close();
    }
  };

  //  상단에 < 2020-11 > < 2020 > 모드에 따라 변경 처리
  _modeViewChange = (): void => {
    this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
      (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
    }`;
  };

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
    } else {
      this._selectChange();
    }
  }

  render() {
    return template.call(this);
  }
}
