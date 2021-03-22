import scss from './datetimepicker.scss';
import template from './datetimepicker.html';
import { eventOptions, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { DateUtill } from '../../base/DateUtill.js';
import { DrawerBottomBase } from '../drawer-bottom-base.js';
import { html } from 'lit-html';

export class Datetimepicker extends DrawerBottomBase {
  static styles = scss;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  min = '19000101010101';

  @property({ type: String, reflect: true })
  max = '21000101010101';

  @internalProperty()
  _value = '____-__-__  AM__:__';

  @internalProperty()
  private $spinnerYear: TemplateResult | undefined;

  @internalProperty()
  private $spinnerMonth: TemplateResult | undefined;

  @internalProperty()
  private $spinnerDay: TemplateResult | undefined;

  @internalProperty()
  private $spinnerMeridiem: TemplateResult | undefined;

  @internalProperty()
  private $spinnerHour: TemplateResult | undefined;

  @internalProperty()
  private $spinnerMinute: TemplateResult | undefined;

  @internalProperty()
  private _valueList: any = [];

  @internalProperty()
  private inputValue = '';

  protected toYear = new Date().getFullYear();
  protected toMonth = new Date().getMonth() + 1;
  protected toDay = new Date().getDate();

  private _touchStartPosition = -33.33333;
  protected _removeCheck: boolean | undefined = false;
  protected _moveCheck: boolean | undefined = false;
  protected _count: number | undefined = 1;
  protected speed: number | undefined = 20;
  protected _touchMoveX: number | undefined = 0;
  protected _touchMoveY: number | undefined = 0;
  protected _touchStartPoint: number | undefined;
  protected _touchStartSpinnerPoint: number | undefined;
  protected _spinnerIndex: number | undefined;
  protected _viewYear: number | undefined;
  protected _viewMonth: number | undefined;
  protected _viewDay: number | undefined;
  protected _setYear: number | undefined;
  protected _setMonth: number | undefined;
  protected _setDay: number | undefined;
  private _movePoint: number | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this._spinnerPickerViewChange(this.toYear, this.toMonth);
  }

  private _spinnerPickerViewChange = (y?: number, m?: number) => {
    this.$spinnerYear = this._yearSpinnerPickerView();
    this.$spinnerMonth = this._monthSpinnerPickerView(y, m);
    this.$spinnerDay = this._daySpinnerPickerView(y, m);
    this.$spinnerMeridiem = this._meridiemSpinnerPickerView();
    this.$spinnerHour = this._hourSpinnerPickerView();
    this.$spinnerMinute = this._minutePickerView();
  };

  private _yearSpinnerPickerView() {
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    const $spinnerYear: Array<TemplateResult> = [];
    for (let i = 0; yearMin + i <= yearMax; i++) {
      // 년도 생성
      if (yearMin + i === this.toYear) {
        $spinnerYear.push(
          html` <li class="today" data-value="${yearMin + i}" data-index="${i}">
            <button>${yearMin + i}</button>
          </li>`
        );
      } else {
        $spinnerYear.push(html` <li data-value="${yearMin + i}" data-index="${i}">
          <button>${yearMin + i}</button>
        </li>`);
      }
    }
    return html`${$spinnerYear}`;
  }

  private _monthSpinnerPickerView(y?: number, m?: number) {
    let year: number = this.toYear;
    let month: number = this.toMonth;
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    const $spinnerMonth = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (yearMin !== year || (yearMin === year && j >= Number(this.min?.slice(4, 6)))) {
        if (yearMax !== year || (yearMax === year && j <= Number(this.max?.slice(4, 6)))) {
          if (j === this.toMonth + 1) {
            $spinnerMonth.push(
              html`
                <li class="today" data-value="${j}" data-index="${j - 1}">
                  <button>${j}</button>
                </li>
              `
            );
          } else {
            $spinnerMonth.push(html`
              <li data-value="${j}" data-index="${j - 1}">
                <button>${j}</button>
              </li>
            `);
          }
        }
      }
    }
    return html`${$spinnerMonth}`;
  }

  private _daySpinnerPickerView(y?: number, m?: number) {
    let year: number = this.toYear;
    let month: number = this.toMonth + 1;
    const date = new DateUtill();
    const $spinnerDay: Array<TemplateResult> = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));

    const lastDate: number = date.getLastDay(year, month);

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
            $spinnerDay.push(html` <li class="today" data-value="${k}" data-index="${k - 1}">
              <button>${k}</button>
            </li>`);
          } else {
            $spinnerDay.push(html` <li data-value="${k}" data-index="${k - 1}">
              <button>${k}</button>
            </li>`);
          }
        }
      }
    }
    return html`${$spinnerDay}`;
  }

  private _meridiemSpinnerPickerView() {
    const $meridiem = [];
    $meridiem.push(html` <li data-value="AM" data-index="0">
      <button>AM</button>
    </li>`);
    $meridiem.push(html` <li data-value="PM" data-index="1">
      <button>PM</button>
    </li>`);
    // }
    return html`${$meridiem}`;
  }

  //
  private _hourSpinnerPickerView() {
    const $hour = [];
    for (let i = 1; i <= 12; i++) {
      $hour.push(html` <li data-value="${i}" data-index="${i - 1}">
        <button>${i}</button>
      </li>`);
    }
    return html`${$hour}`;
  }

  private _minutePickerView() {
    const $minute = [];
    for (let i = 0; i <= 59; i++) {
      $minute.push(html` <li data-value="${i}" data-index="${i}">
        <button>${i}</button>
      </li>`);
    }
    return html`${$minute}`;
  }

  // 터치 시작 이벤트 핸들러
  @eventOptions({ passive: true })
  private _touchStartHandler(e: TouchEvent) {
    this._touchStartPoint = e.changedTouches[0].pageY;
    this._touchStartPosition = Math.abs(
      Number((e.currentTarget! as HTMLElement).parentElement?.style.transform.split('(')[1].split('px')[0])
    );
    (e.currentTarget as HTMLElement)!.parentElement!.querySelector('.select')?.classList.remove('select');
  }

  // 터치 이동 이벤트 핸들러
  @eventOptions({ passive: true })
  private _touchMoveHandler(e: TouchEvent) {
    const $el = (e.currentTarget! as HTMLElement)!.parentElement;
    const height = (e.currentTarget! as HTMLElement)!.children.item(0)!.clientHeight;
    this._movePoint = this._touchStartPosition! - (e.changedTouches[0].pageY - this._touchStartPoint!) * 1.3;
    if (height * ($el!.children[0].childElementCount - 1) <= this._movePoint) {
      this._movePoint = height * ($el!.children[0].childElementCount - 1);
    } else {
      if (this._movePoint < 10) {
        this._movePoint = 0;
      }
      $el!.style.transform = `translateY(-${this._movePoint}px)`;
    }
  }

  // 터치종료 이벤트 핸들러
  @eventOptions({ passive: true })
  private _touchEndHandler(e: TouchEvent) {
    const $el = (e.currentTarget! as HTMLElement)!.parentElement;
    const height = (e.currentTarget as HTMLElement).children.item(0)!.clientHeight;
    this._movePoint = Math.abs(
      Number((e.currentTarget! as HTMLElement).parentElement!.style.transform.split('(')[1].split('px')[0])
    );
    $el!.style.transform = `translateY(-${Math.round(this._movePoint! / height) * height}px)`;
    const value = ($el!
      .querySelector('.moving-list')!
      .children.item(Math.round(this._movePoint! / height))! as HTMLElement)!.dataset.value;
    const type = (e.currentTarget as HTMLElement).dataset.type;
    this._selectChange(type, value);
  }

  // 터치가 종료가 되면 해당되는 Element 에 select 클래스 부여 및 상황에 따라 UI 를 다시 그려준다.
  private async _selectChange(target: string | undefined, value: string | undefined) {
    const $el = this.shadowRoot?.querySelector(`#${target} [data-value='${value}']`) as HTMLElement;
    await $el?.classList.add('select');
    if (target) {
      this._valueList[target] = $el.dataset.value;
      this._inputValueChange();
    }

    switch (target) {
      case 'year':
        await this._spinnerPickerViewChange(
          Number(value),
          Number((this.shadowRoot?.querySelector(`#${target} .select`) as HTMLElement).dataset.value)
        );
        this._positionChange('day', 0, 'index');
        if (this.shadowRoot?.querySelector(`#day .select`) as HTMLElement) {
          (this.shadowRoot?.querySelector(`#day .select`) as HTMLElement)?.classList.remove('select');
          this._selectChange('day', '1');
        }
        break;
      case 'month':
        await this._spinnerPickerViewChange(
          Number((this.shadowRoot?.querySelector(`#${target} .select`) as HTMLElement).dataset.value),
          Number(value)
        );
        this._positionChange('day', 0, 'index');
        if (this.shadowRoot?.querySelector(`#day .select`) as HTMLElement) {
          (this.shadowRoot?.querySelector(`#day .select`) as HTMLElement)?.classList.remove('select');
          this._selectChange('day', '1');
        }
        break;
    }
  }

  // 초기값 및 사용자 입력값이 변경되면 스피너의 포지션을 잡아주는 함수
  private _positionChange(target: string, value: number | string, type: 'index' | 'value' = 'value') {
    const $el = this.shadowRoot?.querySelector(`#${target}`) as HTMLElement;
    if (type === 'index' && typeof value === 'number') {
      $el!.style.transform = `translateY(-${value * 35}px)`;
    } else {
      const $value = this.shadowRoot?.querySelector(`#${target} [data-value='${value}']`) as HTMLElement;
      const position = Number($value.dataset.index);
      $el!.style.transform = `translateY(-${position * 35}px)`;
    }
  }

  // value 가 변경되면 호출되는 함수
  private async _valueChange() {
    if (this.value === '') {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const meridiem = date.getHours() > 11 ? 'PM' : 'AM';
      const hour = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
      const minute = date.getMinutes();
      this._positionChange('year', year);
      this._positionChange('month', month);
      this._positionChange('day', day);
      this._positionChange('meridiem', meridiem);
      this._positionChange('hour', hour);
      this._positionChange('minute', minute);
    } else {
      const year = this.value.slice(0, 4);
      const month = Number(this.value.slice(4, 6));
      const day = Number(this.value.slice(6, 8));
      const _hour = Number(this.value.slice(8, 10));
      const hour = _hour > 12 ? _hour - 12 : _hour;
      const meridiem = _hour >= 12 ? 'PM' : 'AM';
      const minute = Number(this.value.slice(10, 12));
      await this.shadowRoot?.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
      await this._selectChange('year', year.toString());
      await this._selectChange('month', month.toString());
      await this._selectChange('day', day.toString());
      await this._selectChange('meridiem', meridiem);
      await this._selectChange('hour', hour.toString());
      await this._selectChange('minute', minute.toString());
      this._positionChange('year', year);
      this._positionChange('month', month);
      this._positionChange('day', day);
      this._positionChange('meridiem', meridiem);
      this._positionChange('hour', hour);
      this._positionChange('minute', minute);
    }
  }

  // form 영역의 input 의 값을 변경한다.
  private _inputValueChange() {
    const year = this._valueList['year'] ? this._valueList['year'] : '____';
    const month = this._valueList['month']
      ? Number(this._valueList['month'] < 10)
        ? `0${this._valueList['month']}`
        : this._valueList['month']
      : '__';
    const day = this._valueList['day']
      ? Number(this._valueList['day'] < 10)
        ? `0${this._valueList['day']}`
        : this._valueList['day']
      : '__';
    const meridiem = this._valueList['meridiem'] ? this._valueList['meridiem'] : 'AM';
    const hour = this._valueList['hour']
      ? Number(this._valueList['hour'] < 10)
        ? `0${this._valueList['hour']}`
        : this._valueList['hour']
      : '__';
    const minute = this._valueList['minute']
      ? Number(this._valueList['minute'] < 10)
        ? `0${this._valueList['minute']}`
        : this._valueList['minute']
      : '__';
    this._value = `${year}-${month}-${day}  ${meridiem}${hour}:${minute}`;
  }

  // 리셋 버튼 클릭핸들러
  private _removeClickHandler() {
    this._valueList = [];
    this.shadowRoot?.querySelectorAll('.select').forEach($el => {
      $el.classList.remove('select');
    });
    this._inputValueChange();
  }

  // 저장버튼 클릭 핸들러
  _confirmClickHandler = () => {
    if (
      this._valueList['year'] &&
      this._valueList['month'] &&
      this._valueList['day'] &&
      this._valueList['meridiem'] &&
      this._valueList['hour'] &&
      this._valueList['minute']
    ) {
      this.inputValue = this._value;
      const hour =
        this._valueList['meridiem'] === 'PM'
          ? this._valueList['hour'] + 12
          : this._valueList['hour'] < 10
          ? `0${this._valueList['hour']}`
          : this._valueList['hour'];
      const minute = this._valueList['minute'] < 10 ? `0${this._valueList['minute']}` : this._valueList['minute'];
      const day = this._valueList['day'] < 10 ? `0${this._valueList['day']}` : this._valueList['day'];
      const month = Number(this._valueList['month']) < 10 ? `0${this._valueList['month']}` : this._valueList['month'];
      const year = this._valueList['year'];

      this.value = `${year}${month}${day}${hour}${minute}`;
    } else {
      this.inputValue = '';
      this.value = '';
    }
    this._close();
  };

  // value 변경에 따라 UI 변경
  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (!changedProperties.get('active') && changedProperties.has('active')) {
      this._valueChange();
    }
    if (changedProperties.has('value')) {
      this._valueList['year'] = Number(this.value.slice(0, 4));
      this._valueList['month'] = Number(this.value.slice(4, 6));
      this._valueList['day'] = Number(this.value.slice(6, 8));
      this._valueList['meridiem'] = Number(this.value.slice(8, 10)) > 12 ? 'PM' : 'AM';
      this._valueList['hour'] =
        Number(this.value.slice(8, 10)) > 12 ? Number(this.value.slice(8, 10)) - 12 : Number(this.value.slice(8, 10));
      this._valueList['minute'] = Number(this.value.slice(10, 12));
      this._inputValueChange();
      if (this._value.indexOf('_') !== -1) {
        this.shadowRoot?.querySelectorAll('.select').forEach($el => {
          $el.classList.remove('select');
        });
        this.inputValue = '';
      } else {
        this.inputValue = this._value;
      }
    }
  }

  render() {
    return template.call(this);
  }
}
