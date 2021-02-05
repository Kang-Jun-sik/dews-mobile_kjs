import { PickerBase } from '../picker-base.js';
import { internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './datepicker.html';
import scss from './datepicker.scss';
import { DateUtill } from '../../base/DateUtill.js';

export class Datepicker extends PickerBase {
  static styles = scss;

  @internalProperty()
  _value: string | undefined = '____-__-__';

  _mode: 'day' | 'month' | 'year' = 'day';

  @property({ type: String, reflect: true })
  value: string | undefined;

  @internalProperty()
  private $spinnerYear: TemplateResult | undefined;

  @internalProperty()
  private $spinnerMonth: TemplateResult | undefined;

  @internalProperty()
  private $spinnerDay: TemplateResult | undefined;

  private yearMinCheck: boolean | undefined = false;
  private yearMaxCheck: boolean | undefined = false;
  private monthMinCheck: boolean | undefined = false;
  private monthMaxCheck: boolean | undefined = false;

  private changeEvent: Event = new Event('change');

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
        this._nowView = this._dayPickerView(today.getFullYear(), today.getMonth() + 1);
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
        this._spinnerPickerViewChange(this._setYear, this._setMonth);
      } else {
        this._setYear = this.toYear;
        this._setMonth = this.toMonth + 1;
        this._setDay = this.toDay;
        this._spinnerPickerViewChange();
      }
    }
  }

  _spinnerPickerViewChange = (y?: number, m?: number) => {
    this.$spinnerYear = this._yearSpinnerPickerView();
    this.$spinnerMonth = this._monthSpinnerPickerView(y, m);
    this.$spinnerDay = this._daySpinnerPickerView(y, m);
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
    this._modeViewSet();
    this._modeChange('day');
  };

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

          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerYearSelect();
          this._spinnerYearPositionChange();
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
          $el.value = $el.value.slice(0, 5) + `${this.min?.slice(4, 6)}` + $el.value.slice(7, 10);
        } else if (month > max && this.yearMaxCheck) {
          // maxCheck
          this.monthMaxCheck = true;
          $el.value = $el.value.slice(0, 5) + `${this.max?.slice(4, 6)}` + $el.value.slice(7, 10);
        } else if (month === 0) {
          $el.value = $el.value.slice(0, 5) + '01' + $el.value.slice(7, 10);
        } else if (month > 12) {
          $el.value = $el.value.slice(0, 5) + '12' + $el.value.slice(7, 10);
        }
        if (this.spinner) {
          this._setYear = Number($el.value.slice(0, 4));
          this._setMonth = Number($el.value.slice(5, 7));
          this._spinnerPickerViewChange(this._setYear, this._setMonth - 1);
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
        const date = new DateUtill();
        const lastDay: number | undefined = date.getLastDay(
          Number($el.value.slice(0, 4)),
          Number($el.value.slice(5, 7))
        );

        if (day > lastDay) {
          // 최대 일 점검
          if (this.monthMaxCheck) {
            $el.value = $el.value.slice(0, 8) + `${this.max!.slice(6, 8)}`;
          } else {
            $el.value = $el.value.slice(0, 8) + `${lastDay}`;
          }
        } else if (day < 1 && !this.monthMinCheck) {
          // 최소 일 점검
          $el.value = $el.value.slice(0, 8) + '01';
        } else if (day < min && this.monthMinCheck) {
          // 개발자가 지정한 최소일 확인
          $el.value = $el.value.slice(0, 8) + `${this.min!.slice(6, 8)}`;
        } else if (day > max && this.monthMaxCheck) {
          // 개발자가 지정한 최대일 확인
          $el.value = $el.value.slice(0, 8) + `${this.max!.slice(6, 8)}`;
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

  _inputChange = () => {
    this._value = `${this._setYear}-${this._setMonth! >= 10 ? this._setMonth : '0' + this._setMonth}-${
      this._setDay! < 10 ? '0' + this._setDay : this._setDay
    }`;
    (this.shadowRoot!.querySelector('.input')! as HTMLInputElement).value = this._value;
  };

  // 일 클릭 핸들러(오버라이드)
  _dayClickHandler = (e: MouseEvent) => {
    // this._selectRemove();
    // const $el: HTMLElement = e.currentTarget as HTMLElement;
    // $el.classList.add('select');
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._setDay = Number((e.currentTarget as HTMLElement).dataset.value);
    this._viewDay = this._setDay;
    this._inputChange();
  };

  // _dayClickHandler = (e: MouseEvent): void => {
  //   // if (!this.hdDisabled && ) {
  //   //
  //   // }
  //   this._selectRemove();
  //   const $el: HTMLElement = e.currentTarget as HTMLElement;
  //   $el.classList.add('select');
  //   this._setYear = this._viewYear;
  //   this._setMonth = this._viewMonth;
  //   this._setDay = Number((e.currentTarget as HTMLElement).dataset.value);
  //   this._viewDay = this._setDay;
  //   this._inputChange();
  // };

  // 년도 클릭 핸들러(오버라이드)
  _yearClickHandler = (e: Event) => {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this._selectRemove();
    $el.classList.add('select');
    this._viewYear = Number($el.dataset.value);
    this._modeViewSet();
    this._modeChange('month');
  };

  // 적용버튼 핸들러(오버라이드)
  _confirmClickHandler = (): void => {
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
      this.value = `${this.inputValue?.slice(0, 4)}${this.inputValue?.slice(5, 7)}${this.inputValue?.slice(8, 10)}`;
      this._close();
    } else {
      this._close();
    }
  };

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
   *  현재 날짜 이동 버튼
   * */
  private _nowClickHandler(): void {
    if (!this.spinner) {
      const today: Date = new Date();
      const todayYear: number = today.getFullYear();
      const todayMonth: number = today.getMonth();
      this._viewYear = todayYear;
      this._viewMonth = todayMonth + 1;
      this._setYear = todayYear;
      this._setMonth = todayMonth + 1;
      this._setDay = today.getDate();
      this._selectRemove();
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

  reset() {
    this._removeClickHandler();
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
  }

  // ========= spinner

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
      const year: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
        '.moving-list.year'
      )! as HTMLElement;

      const month: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
        '.moving-list.month'
      )! as HTMLElement;

      const day: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
        '.moving-list.day'
      )! as HTMLElement;

      const date = new DateUtill();

      (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.year')!
        .children[0] as HTMLElement).style.transform = `translateY(-${
        (this._setYear! - Number(this.min?.slice(0, 4))) * 35
      }px)`;

      if (year.children.length !== 12) {
        for (let i = 0; i < month.children.length; i++) {
          if (Number((year.children.item(i) as HTMLElement).dataset.value) === this._setYear) {
            (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.year')!
              .children[0] as HTMLElement).style.transform = `translateY(-${i * 35}px)`;
          }
        }
      } else {
        (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.year')!
          .children[0] as HTMLElement).style.transform = `translateY(-${(this._setYear! - 1) * 35}px)`;
      }

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
      if (day.children.length !== date.getLastDay(this._setYear!, this._setMonth!)) {
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
    } else {
      this._selectChange();
    }
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (_changedProperties.has('value')) {
      if (this.value !== undefined) {
        this.inputValue = '';
        (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = '____-__-__';
      } else {
        this.inputValue = this.value!.slice(0, 4) + '-' + this.value!.slice(4, 6) + '-' + this.value!.slice(6, 8);
        (this.shadowRoot?.querySelector('.input') as HTMLInputElement).value = this.inputValue;
      }
    }
    return super.shouldUpdate(_changedProperties);
  }

  render() {
    return template.call(this);
  }
}
