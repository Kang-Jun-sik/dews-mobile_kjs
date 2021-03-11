import { DewsFormComponent } from '../../base/DewsFormComponent.js';
import { eventOptions, html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './timepicker.html';
import scss from './timepicker.scss';
import { DrawerBottomBase } from '../drawer-bottom-base.js';

export class Timepicker extends DrawerBottomBase {
  static styles = scss;

  @property({ type: Boolean })
  disabled: boolean | undefined = false;

  @property({ type: Boolean })
  readonly: boolean | undefined = false;

  @internalProperty()
  height: string | undefined;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  text = '';

  @property({ type: String })
  min: string | undefined;

  @property({ type: String })
  max: string | undefined;

  @property({ type: Number, attribute: 'minute-interval' })
  step: number | undefined = 1;

  @internalProperty()
  private _value: string | undefined = '';

  @internalProperty()
  private inputValue: string | undefined;

  @internalProperty()
  private $hour: Array<TemplateResult> = [];

  @internalProperty()
  private $minute: Array<TemplateResult> = [];

  @internalProperty()
  private $meridiem: Array<TemplateResult> = [];

  private toHour = new Date().getHours();
  private toMinute = new Date().getMinutes();

  private _setHour: number | undefined;
  private _setMinute: number | undefined;
  private _setMeridiem: string | undefined;
  private _clearCheck: boolean | undefined = false;
  private _touchStartPoint: number | undefined;
  private _touchStartPosition: number | undefined;
  private _movePoint: number | undefined;

  constructor() {
    super();
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

  _confirmClickHandler = () => {
    this._close();
    if (!this._clearCheck) {
      let hour = this._setHour;
      let min = this._setMinute!.toString();
      if (this._setMeridiem !== 'AM') {
        hour = this._setHour! + 12;
      }
      if (this._setMinute! < 10) {
        min = '0' + this._setMinute;
      }
      if (hour! < 10) {
        this.value = `0${hour}${min}`;
      } else {
        this.value = `${hour}${min}`;
      }
      this.inputValue = this._value;
      this.text = this.inputValue!;
    } else {
      this.value = '';
      this.inputValue = '';
    }
  };

  private _removeClickHandler() {
    (this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
      '.input'
    ) as HTMLInputElement).value = `${this._setMeridiem} __:__`;
    this._clearCheck = true;
    this.shadowRoot!.querySelector('.drawer-layout')!
      .querySelectorAll('.select')
      .forEach($el => {
        $el!.classList.add('clear');
      });
  }

  /*
   * 시간 element 생성
   * */
  private _hourView() {
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
            this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
        } else {
          for (let i = min; i <= 11; i++) {
            this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
          if (max === 24) {
            this.$hour.push(html`<li data-value="12" data-index="${j}"><button>12</button></li>`);
          }
        }
      } else {
        max = max - 12;
        if (min > 12) {
          min = min - 12;
          for (let i = min; i <= max - 1; i++) {
            this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
        } else {
          this.$hour.push(html`<li data-value="12" data-index="${j}"><button>12</button></li>`);
          j++;
          for (let i = 1; i <= max; i++) {
            this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
        }
      }
    } else if (this._setMeridiem === 'PM') {
      this.$hour.push(html`<li data-value="12" data-index="${j}"><button>12</button></li>`);
      j++;
      for (let i = 1; i <= 11; i++) {
        this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
        j++;
      }
    } else {
      for (let i = 1; i <= 12; i++) {
        this.$hour.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
        j++;
      }
    }
  }

  /*
   * 해당되는 시간에 select 클래스 생성
   * */
  private _hourSelect(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-hour-wrap .moving-list');
    this._clearCheck = false;
    $el!.querySelector!('.clear')?.classList.remove('clear');
    $el!.querySelector!('.select')?.classList.remove('select');
    if (num !== undefined) {
      $el!.children.item(num)?.classList.add('select');
      this._setHour = Number(($el!.children.item(num)! as HTMLElement)?.dataset?.value);
      this._inputChange();
    } else {
      $el!.children.item((this.toHour % 12) - 1)?.classList.add('select');
      this._setHour = Number(($el!.children.item((this.toHour % 12) - 1)! as HTMLElement)?.dataset?.value);
    }
    this._minuteView();
  }

  /*
   *  select 클래스를 찾아 그 위치로 spinner 이동
   * */
  private _hourPositionChange(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-hour-wrap .moving-list');
    const height = $el!.children.item(0)?.clientHeight;
    if (num === undefined) {
      if (($el!.querySelector('.select') as HTMLElement) === null) {
        num = 0;
        this._hourSelect(0);
      } else if (Number(($el!.querySelector('.select') as HTMLElement)?.dataset?.value) !== this._setHour) {
        for (let i = 0; i < $el!.children.length; i++) {
          if (Number(($el!.children.item(i) as HTMLElement).dataset.value) === this._setHour) {
            num = i;
            this._hourSelect(i);
          }
        }
        if (num === undefined) {
          num = 0;
          this._hourSelect(0);
        }
      } else {
        num = Number(($el!.querySelector('.select') as HTMLElement)?.dataset?.index) - 1;
      }
    }
    ($el!.parentElement as HTMLElement).style.transform = `translateY(-${num! * height!}px)`;
  }

  /*
   *  분 element 생성
   * */
  private _minuteView() {
    this.$minute = [];
    let j = 0;
    if (this.min !== undefined && this.max !== undefined) {
      const min = Math.round(Number(this.min.slice(2, 4)) / this.step!) * this.step!;
      const max = Number(this.max.slice(2, 4));
      let hour = this._setHour!;
      if (this._setMeridiem === 'PM' && this._setHour !== 12) {
        hour = hour + 12;
      }
      if (hour === Number(this.min.slice(0, 2))) {
        if (hour === Number(this.max.slice(0, 2))) {
          for (let i = min; i <= max; i += this.step!) {
            this.$minute.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
        } else {
          for (let i = min; i < 60; i += this.step!) {
            this.$minute.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
            j++;
          }
        }
      } else if (hour === Number(this.max.slice(0, 2))) {
        for (let i = 0; i <= max; i += this.step!) {
          this.$minute.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
          j++;
        }
      } else {
        for (let i = 0; i < 60; i += this.step!) {
          this.$minute.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
          j++;
        }
      }
    } else {
      for (let i = 0; i < 60; i += this.step!) {
        this.$minute.push(html`<li data-value="${i}" data-index="${j}"><button>${i}</button></li>`);
        j++;
      }
    }
  }

  /*
   * 해당되는 분에 select 클래스 생성
   * */
  private _minuteSelect(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-minute-wrap .moving-list');
    $el!.querySelector!('.select')?.classList.remove('select');
    $el!.querySelector!('.clear')?.classList.remove('clear');
    this._clearCheck = false;
    if (num !== undefined) {
      if (($el!.children.item(num)! as HTMLElement) === null) {
        this._setMinute = Number(($el!.children.item(0)! as HTMLElement)?.dataset.value);
        $el!.children.item(0)?.classList.add('select');
      } else {
        this._setMinute = Number(($el!.children.item(num) as HTMLElement)?.dataset.value);
        $el!.children.item(num)?.classList.add('select');
      }
    } else {
      $el!.children.item(this.toMinute)!.classList.add('select');
      this._setMinute = Number(($el!.children.item(this.toMinute) as HTMLElement)?.dataset.value);
    }

    this._inputChange();
  }

  /*
   *  select 클래스를 찾아 그 위치로 spinner 이동
   * */
  private _minutePositionChange(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-minute-wrap .moving-list');
    const height = $el!.children.item(0)?.clientHeight;
    if (num === undefined) {
      if (($el!.querySelector('.select') as HTMLElement) === null) {
        this._minuteSelect(0);
        num = 0;
      } else {
        if (this._setMinute !== Number(($el!.querySelector('.select') as HTMLElement)?.dataset?.value)) {
          for (let i = 0; i < $el!.children.length; i++) {
            if (this._setMinute === Number(($el!.children.item(i) as HTMLElement).dataset.value)) {
              num = i;
              this._minuteSelect(Number(($el!.children.item(i) as HTMLElement).dataset.index));
            }
          }
          if (num === undefined) {
            num = 0;
            this._setMinute = Number(($el!.children.item(0) as HTMLElement).dataset.value);
          }
          this._inputChange();
        } else {
          num = Number(($el!.querySelector('.select') as HTMLElement)?.dataset?.index);
        }
      }
    }
    ($el!.parentElement as HTMLElement).style.transform = `translateY(-${num! * height!}px)`;
  }

  /*
   * 해당되는 AM,PM에 select 클래스 생성
   * */

  private _meridiemView() {
    this.$meridiem = [];
    if (this.min !== undefined && this.max !== undefined) {
      if (Number(this.min?.slice(0, 2)) > 12) {
        //  PM 만 생성
        this._setMeridiem = 'PM';
        this.$meridiem.push(html`<li data-value="PM" data-index="0"><button>PM</button></li>`);
      } else {
        //  AM 생성
        this._setMeridiem = 'AM';
        this.$meridiem.push(html`<li data-value="AM" data-index="0"><button>AM</button></li>`);
        if (Number(this.max?.slice(0, 2)) > 12) {
          this.$meridiem.push(html`<li data-value="PM" data-index="1"><button>PM</button></li>`);
          //  pm 생성
        }
      }
    } else {
      this.$meridiem.push(html`<li data-value="AM" data-index="0"><button>AM</button></li>`);
      this.$meridiem.push(html`<li data-value="PM" data-index="1"><button>PM</button></li>`);
    }
  }

  private _meridiemSelect(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-allday-wrap .moving-list');
    $el!.querySelector!('.select')?.classList.remove('select');
    $el!.querySelector!('.clear')?.classList.remove('clear');
    this._clearCheck = false;
    if (num !== undefined) {
      this._setMeridiem = ($el!.children.item(num)! as HTMLElement).dataset.value;
      $el!.children.item(num)!.classList.add('select');
    } else {
      if (this.min !== undefined && this.max !== undefined) {
        $el!.children.item(0)!.classList.add('select');
        this._setMeridiem = ($el!.children.item(0)! as HTMLElement).dataset.value;
      } else {
        if (this.toHour / 12 >= 1) {
          $el!.children.item(1)!.classList.add('select');
          this._setMeridiem = ($el!.children.item(1)! as HTMLElement).dataset.value;
        } else {
          $el!.children.item(0)!.classList.add('select');
          this._setMeridiem = ($el!.children.item(0)! as HTMLElement).dataset.value;
        }
      }
    }
  }

  /*
   *  select 클래스를 찾아 그 위치로 spinner 이동
   * */
  private _meridiemPositionChange(num?: number) {
    const $el = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.spinner-allday-wrap .moving-list');
    const height = $el!.children.item(0)!.clientHeight;
    if (num === undefined) {
      num = Number(($el!.querySelector('.select') as HTMLElement)?.dataset?.index);
    }
    ($el!.parentElement as HTMLElement).style.transform = `translateY(-${num! * height}px)`;
  }

  @eventOptions({ passive: true })
  private _touchStartHandler(e: TouchEvent) {
    this._touchStartPoint = e.changedTouches[0].pageY;
    this._touchStartPosition = Math.abs(
      Number((e.currentTarget! as HTMLElement).parentElement?.style.transform.split('(')[1].split('px')[0])
    );
    (e.currentTarget as HTMLElement)!.parentElement!.querySelector('.select')?.classList.remove('select');
  }

  @eventOptions({ passive: true })
  private _touchMoveHandler(e: TouchEvent) {
    e.preventDefault();
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

  @eventOptions({ passive: true })
  private _touchEndHandler(e: TouchEvent) {
    const $el = (e.currentTarget! as HTMLElement)!.parentElement;
    const height = (e.currentTarget as HTMLElement).children.item(0)!.clientHeight;
    this._movePoint = Math.abs(
      Number((e.currentTarget! as HTMLElement).parentElement!.style.transform.split('(')[1].split('px')[0])
    );
    $el!.style.transform = `translateY(-${Math.round(this._movePoint! / height) * height}px)`;

    const index = Number(
      ($el!.querySelector('.moving-list')!.children.item(Math.round(this._movePoint! / height))! as HTMLElement)!
        .dataset.index
    );

    if ($el!.parentElement!.classList.contains('hour')) {
      this._hourSelect(index - 1);
    } else if ($el!.parentElement!.classList.contains('minute')) {
      this._minuteSelect(index);
    } else {
      this._meridiemSelect(index);
      this._hourView();
      this._minuteView();
    }
    this._inputChange();
    this.shadowRoot!.querySelector('.drawer-layout')!
      .querySelectorAll('.clear')
      .forEach($clear => {
        $clear.classList.remove('clear');
      });
    this._clearCheck = false;
  }

  private _inputChange() {
    this._value = `${this._setMeridiem} ${this._setHour! < 10 ? '0' + this._setHour : this._setHour}:${
      this._setMinute! < 10 ? '0' + this._setMinute : this._setMinute
    }`;
    (this.shadowRoot!.querySelector('.input') as HTMLInputElement).value = this._value;
  }

  private _selectRemove() {
    this.shadowRoot!.querySelector('.drawer-layout')!
      .querySelectorAll('.select')
      .forEach($el => {
        $el!.classList.remove('select');
      });
  }

  protected async firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    if (this.min === undefined || this.max === undefined || this.value === undefined) {
      if (this.min === undefined && this.max === undefined && this.value === undefined) {
        if (this.toHour < 13) {
          this._meridiemSelect(0);
          this._hourSelect(this.toHour - 1);
        } else {
          this._meridiemSelect(1);
          this._hourSelect(this.toHour - 13);
        }
        this._minuteSelect(this.toMinute);
      }
      if (this.value !== undefined) {
        let hour = Number(this.value.slice(0, 2)) - 1;
        if (hour > 12) {
          hour = hour - 13;
          if (Number(this.min?.slice(0, 2)) < 13) {
            this._meridiemSelect(1);
          } else {
            this._meridiemSelect(0);
          }
        } else {
          this._meridiemSelect(0);
        }
        this._hourSelect(hour);
        this._minuteSelect(Math.ceil(Number(this.value.slice(2, 4)) / this.step!));
        this.inputValue = this._value;
      } else {
        this._meridiemSelect(0);
        this._hourSelect(0);
        this._minuteSelect(0);
      }
    } else if (this.value != undefined) {
      if (Number(this.value.slice(0, 2)) < 13) {
        this._meridiemSelect(0);
        this._hourSelect(Number(this.value.slice(0, 2)) - 1);
      } else {
        this._meridiemSelect(1);
        this._hourSelect(Number(this.value.slice(0, 2)) - 13);
      }
      this._minuteSelect(Number(this.value.slice(2, 4)));
    } else {
      this._meridiemSelect(0);
      this._hourSelect(0);
      this._minuteSelect(0);
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('value')) {
      if (this.value !== '') {
        if (Number(this.value?.slice(0, 2)) > 12) {
          this._setHour = Number(this.value?.slice(0, 2)) - 12;
          this._setMeridiem = 'PM';
        } else {
          this._setHour = Number(this.value?.slice(0, 2));
          this._setMeridiem = 'AM';
        }
        this._setMinute = Number(this.value?.slice(2, 4));
        this._inputChange();
        this.inputValue = this._value;
        this.text = this.inputValue!;
        const $el = this.shadowRoot?.querySelector('.allday .moving-list');
        for (let i = 0; i < $el!.children!.length; i++) {
          if (($el?.children.item(i) as HTMLElement).dataset.value === this._setMeridiem) {
            this._meridiemSelect(Number(($el?.children.item(i) as HTMLElement).dataset.index));
          }
        }
      } else {
        this._setHour = undefined;
        this._setMinute = undefined;
        this.inputValue = '';
      }
    }

    this._hourPositionChange();
    this._minutePositionChange();
    this._meridiemPositionChange();
  }

  render() {
    return template.call(this);
  }
}
