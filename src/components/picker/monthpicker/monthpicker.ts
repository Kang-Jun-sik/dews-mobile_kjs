import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { PickerBase } from '../picker-base.js';
import template from './monthpicker.html';
import scss from './monthpicker.scss';

export class Monthpicker extends PickerBase {
  static styles = scss;

  @internalProperty()
  private _value: string | undefined = '____-__';

  _mode: 'month' | 'year' = 'month';

  @internalProperty()
  private $spinnerYear: TemplateResult | undefined;

  @internalProperty()
  private $spinnerMonth: TemplateResult | undefined;

  private yearMinCheck: boolean | undefined = false;
  private yearMaxCheck: boolean | undefined = false;
  private monthMinCheck: boolean | undefined = false;
  private monthMaxCheck: boolean | undefined = false;

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
      this.inputValue = this.value.slice(0, 4) + '-' + this.value.slice(4, 6);
    }
    const today = new Date();
    if (!this.spinner) {
      if (this.value !== undefined) {
        this._viewYear = Number(this.value.slice(0, 4));
        this._viewMonth = Number(this.value.slice(4, 6));
        this._setYear = this._viewYear;
        this._setMonth = this._viewMonth;
        this._beforeView = this._monthPickerView(this._viewYear - 1);
        this._nowView = this._monthPickerView(this._viewYear);
        this._afterView = this._monthPickerView(this._viewYear + 1);
        this.inputValue = this.value.slice(0, 4) + '-' + this.value.slice(4, 6);
        this._value = this.inputValue;
      } else {
        this._beforeView = this._monthPickerView(this._viewYear! - 1);
        this._nowView = this._monthPickerView(this._viewYear);
        this._afterView = this._monthPickerView(this._viewYear! + 1);
        this._viewYear = today.getFullYear();
        this._viewMonth = today.getMonth() + 1;
      }
      this._modeView = `${this._viewYear}`;
    } else {
      if (this.value !== undefined) {
        this._setYear = Number(this.value.slice(0, 4));
        this._setMonth = Number(this.value.slice(4, 6));
        this._spinnerPickerViewChange(this._setYear, this._setMonth);
      } else {
        this._setYear = this.toYear;
        this._setMonth = this.toMonth + 1;
        this._spinnerPickerViewChange();
      }
    }
  }

  click() {
    this._open();
  }

  reset() {
    this._removeClickHandler();
  }

  private _removeClickHandler(): void {
    this._value = '';
    if (!this.spinner) {
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____-__';
      this._setMonth = undefined;
      this._setYear = undefined;
      this._selectRemove();
    } else {
      (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = '____-__';
      (this.shadowRoot!.querySelector('.drawer-layout') as HTMLElement)!.querySelectorAll('.select').forEach($el => {
        $el!.classList.add('clear');
      });
      this._removeCheck = true;
    }
  }

  // 스피너 UI 생성

  _spinnerPickerViewChange = (y?: number, m?: number) => {
    this.$spinnerYear = this._yearSpinnerPickerView();
    this.$spinnerMonth = this._monthSpinnerPickerView(y, m);
  };

  // input 클릭시 포커스 위치 조정
  private _inputClickHandler(e: MouseEvent): void {
    (e.target as HTMLInputElement).setSelectionRange(0, 0);
  }

  //  각 n월 클릭 핸들러
  _monthClickHandler = (e: MouseEvent): void => {
    const $el = e.currentTarget as HTMLElement;
    this.shadowRoot!.querySelectorAll('.calendar-month').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    $el.classList.add('select');
    this._viewMonth = Number($el.dataset.value);
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._inputChange();
  };

  // 입력한 값이 숫자인지 문자인지 판별후 값 제거
  private _beforeInputHandler(e: InputEvent): void {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    if ((/\d/.exec(e.data!) == null && e.data != null) || ($el.selectionStart! > 6 && e.data != null)) {
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
        if (this.spinner) {
          this._setYear = Number($el.value.slice(0, 4));
          this._spinnerRemove();

          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerYearSelect();
          this._spinnerYearPositionChange();
        }
        cursor++;
      } else if (cursor === 7) {
        this.monthMinCheck = false;
        let month: number | undefined = Number($el.value.slice(5, 7));
        const min: number | undefined = Number(this.min?.slice(4, 6));
        const max: number | undefined = Number(this.max?.slice(4, 6));

        if (month < min && this.yearMinCheck) {
          // min check
          this.monthMinCheck = true;
          $el.value = $el.value.slice(0, 5) + `${min}` + $el.value.slice(7, 10);
        } else if (month > max && this.yearMaxCheck) {
          // maxCheck
          this.monthMaxCheck = true;
          $el.value = $el.value.slice(0, 5) + `${max}`;
        } else if (month === 0) {
          $el.value = $el.value.slice(0, 5) + '01';
        } else if (month > 12) {
          $el.value = $el.value.slice(0, 5) + '12';
        }
        if (this.spinner) {
          this._setYear = Number($el.value.slice(0, 4));
          this._setMonth = Number($el.value.slice(5, 7));
          this._spinnerPickerViewChange(this._setYear, this._setMonth - 1);
          this._spinnerRemove();
          this._spinnerYearSelect();
          this._spinnerMonthSelect();
        } else {
          const year: number | undefined = Number($el.value.slice(0, 4));
          month = Number($el.value.slice(5, 7));
          this._setYear = year;
          this._setMonth = month;
          this._viewYear = year;
          this._viewMonth = month;
          this._beforeView = this._monthPickerView(year - 1);
          this._nowView = this._monthPickerView(year);
          this._afterView = this._monthPickerView(year + 1);
          this._modeViewChange();
        }
        cursor++;
      }
      $el.setSelectionRange(cursor!, cursor!);
    } else {
      const cursor: number = $el.selectionStart as number;
      for (let i = 0; $el.value!.length + i <= 7; i++) {
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

  _inputChange = () => {
    this._value = `${this._setYear}-${this._setMonth! >= 10 ? this._setMonth : '0' + this._setMonth}`;
    (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = this._value;
  };

  // 년도 클릭 핸들러
  _yearClickHandler = (e: Event): void => {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('month');
  };

  //  셋버튼 HTML 템플릿 설정
  private _modeViewSet(): void {
    if (this._mode === 'year') {
      this._beforeView = this._monthPickerView(this._viewYear! - 1);
      this._nowView = this._monthPickerView(this._viewYear);
      this._afterView = this._monthPickerView(this._viewYear! + 1);
    }
  }

  // 적용버튼 핸들러
  _confirmClickHandler = (): void => {
    if (this._value?.indexOf('_')! < 0) {
      this.inputValue = this._value;
      this._close();
    }
  };

  // 모드변경 버튼 클릭 핸들러
  private _modeClickHandler(): void {
    this._selectRemove();
    if (this._mode === 'month') {
      this._beforeView = this._yearPickerView(this._viewYear! - 10);
      this._nowView = this._yearPickerView(this._viewYear);
      this._afterView = this._yearPickerView(this._viewYear! + 10);
    }
    this._modeChange();
  }

  // 모드를 변경  month, year
  _modeChange = (mode?: 'month' | 'year'): void => {
    if (mode != undefined) {
      this._mode = mode;
    } else {
      if (this._mode === 'month') {
        this._mode = 'year';
      }
    }
    this._modeViewChange();
  };

  //  상단에 < 2020-11 > < 2020 > 모드에 따라 변경 처리
  _modeViewChange = (): void => {
    if (this._mode === 'month') {
      this._modeView = `${this._viewYear}`;
    } else {
      this._modeView = `${(this._viewYear! / 10) * 10 - (this._viewYear! % 10)}-${
        (this._viewYear! / 10) * 10 + 9 - (this._viewYear! % 10)
      }`;
    }
  };

  // spinner 기본 선택
  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    if (this.spinner) {
      this._inputChange();
      this._spinnerYearSelect();
      this._spinnerMonthSelect();
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
    }
  }

  render() {
    return template.call(this);
  }
}
