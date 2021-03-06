import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './numerictextbox.html';
import scss from './numerictextbox.scss';

import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT_TYPE = 'change';

export class Numerictextbox extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String })
  value: number | '' = '';

  @property({ type: String })
  prefix = '';

  @property({ type: String })
  suffix = '';

  @property({ type: String })
  format = '#,##0.00';

  @property({ type: Number })
  decimals: number | null = null;

  @property({ type: Number })
  max: number | null = null;

  @property({ type: Number })
  min: number | null = null;

  @property({ type: Boolean, attribute: 'restrict-decimals', reflect: true })
  restrict = false;

  @property({ attribute: 'max-length' })
  maxLength: string | null = null;

  @property({ type: String })
  round: 'round' | 'ceil' | 'floor' = 'round';

  @internalProperty()
  private text = '';

  @internalProperty()
  private $state = html``;

  private _oldValue = '';
  private _rawValue: number | '' = '';
  private _step = 1;
  private _disabled = true;

  private _button: TemplateResult | undefined;
  private _title: TemplateResult | undefined;

  private _cursor: number | null = 0;
  private _floatRegExp = new RegExp('');
  private _intLength: number | undefined = 0;
  private _decimalLength: number | undefined = 0;

  //이벤트 객체 생성
  private Event = new EventEmitter();

  connectedCallback() {
    super.connectedCallback();
    // this.addEventListener('focus', this._onFocus);

    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    } else if (this.readonly) {
      this._disabled = false;
    }

    // 포맷 관련 설정
    const maxLengthRegex = /^(\d+)(?:,(\d+))?$/; // maxLength 찾는 정규식
    const maxLength = 15;
    let decimalLength;
    let intLength;

    // format 문자열에 따라서 decimals 옵션 설정
    if (this.format && !this.decimals) {
      // format 은 지정했는데 decimals 옵션은 설정하지 않은 경우 자동으로 decimals 설정
      let decimals = 0;
      const abbrPattern = /[nN][0]?([1-9])$/; // N2, N02, n3, n03 등의 약어 포맷에 매칭
      const abbrMatches = abbrPattern.exec(this.format);

      if (!abbrMatches) {
        const fullPattern = /[.]([0#]+)$/; // #,##0.## 과 같은 포맷에 매칭
        const fullMatches = fullPattern.exec(this.format);
        decimals = fullMatches ? fullMatches[1].length : decimals;
      } else {
        decimals = parseInt(abbrMatches[1], 10);
      }
      this.decimals = decimals;
    }

    if (this.maxLength) {
      const matchArray = maxLengthRegex.exec(this.maxLength);
      try {
        if (matchArray && matchArray.length > 0) {
          intLength = parseInt(matchArray[1], 10);

          if (intLength > 15) {
            throw '숫자텍스트박스 maxLength 속성의 설정 가능한 최대값은 15입니다.';
          }

          if (matchArray[2]) {
            // 소수점 입력 자리수 제한이 있을 때
            decimalLength = parseInt(matchArray[2], 10); // 소수점 입력 자리수 제한 값
            intLength = parseInt(matchArray[1], 10) - decimalLength; // 정수 입력 자리수 제한 값 = 전체 입력 가능 값 - 소수점 입력 자리수 값

            if (intLength <= 0) {
              throw '숫자텍스트박스 maxLength 속성의 설정값은 정수부의 숫자가 소수부의 숫자보다 커야합니다.';
            }
          } else {
            // 소수점 입력 자리수 제한이 없을 때
            decimalLength = 0; // 소수점 입력 자리수 제한이 없음!!
            intLength = parseInt(matchArray[1], 10); // 정수 입력 자리수 제한 값
          }
        }
      } catch (e) {
        decimalLength = this.decimals || 0;
        intLength = this.decimals === null ? maxLength : maxLength - parseInt(this.decimals.toString(), 10);
        console.log(e);
      }
    } else {
      decimalLength = this.decimals || 0;
      intLength = this.decimals === null ? maxLength : maxLength - parseInt(this.decimals.toString(), 10);
    }

    this._intLength = intLength;
    this._decimalLength = decimalLength;

    // numericbox-button 자식요소가 있으면 step을찾아 버튼 셋팅
    this._numericButton();
    this._title =
      this.title == undefined
        ? html`<label class="undefined" for="numeric-box">undefined</label>`
        : html`<label for="numeric-box">${this.title}</label>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _beforeInput(e: InputEvent) {
    const $el: HTMLInputElement = e.target as HTMLInputElement;

    this._cursor = $el.selectionStart;

    // 숫자 및 - . 입력처리
    if (/\d/.exec(e.data!) == null && e.data != null && e.data != '.' && e.data != '-') {
      // if (!($el.selectionStart == 0 && $el.selectionEnd == this.maxLength)) {
      // 전체 선택되어 있을 경우에는 값 입력 가능 하도록
      e.returnValue = false;
      // }
    } else {
      this._oldValue = (e.target as HTMLInputElement).value;
    }
  }

  private _inputChange(e: InputEvent) {
    const $el: HTMLInputElement = e.target as HTMLInputElement;
    const isValid = this._numericRegex().test($el.value);

    if ((this.min !== null && this.min >= 0 && $el.value.toString().charAt(0) === '-') || !isValid) {
      $el.value = this._oldValue.replace(/[^0-9.-]/g, '');

      if (typeof this._cursor == 'number') {
        $el.setSelectionRange(this._cursor, this._cursor);
      }

      e.returnValue = false;
    } else {
      this._rawValue = Number($el.value);

      if (isNaN(this._rawValue) || $el.value == '') {
        this._rawValue = '';
      }
    }
  }

  private _numericRegex(): RegExp {
    this._floatRegExp = new RegExp(
      '^[-]?(\\d{0,' + this._intLength + '})(?:\\.(\\d{0,' + this._decimalLength + '}))?$'
    );

    return this._floatRegExp;
  }

  // 최소값, 최대값 조정
  private _adjust(value: number) {
    const min = this.min,
      max = this.max;

    if (value === null) {
      return value;
    }
    if (min !== null && value < min) {
      value = min;
    } else if (max !== null && value > max) {
      value = max;
    }
    return value;
  }

  private _numericButton() {
    if (this.children[0]?.localName === 'numericbox-button') {
      if (this.children[0]?.getAttribute('step') != undefined) {
        this._step = Number(this.children[0]?.getAttribute('step'));
      }
      this._button = html`
        <span class="stepper">
          <button class="button-stepper minus will-touch" @click="${this._stepperDecrement}"></button>
          <button class="button-stepper plus will-touch" @click="${this._stepperIncrement}"></button>
        </span>
      `;
    }
  }

  private _stepperIncrement() {
    if (this.disabled || this.readonly) {
      return;
    }
    const $input = this.shadowRoot!.querySelectorAll('input');
    if (this.max !== null && Number($input[1].value) + this._step > Number(this.max)) {
      $input[1].value = this.max.toString();
      $input[0].value = this.addCommas($input[1].value);
      return;
    }
    $input[1].value = (Number($input[1].value) + this._step).toString();
    $input[0].value = this.addCommas($input[1].value);

    // 이벤트실행
    this.Event.emit('change', { target: this, type: 'change' });
  }

  private _stepperDecrement() {
    if (this.disabled || this.readonly) {
      return;
    }
    const $input = this.shadowRoot!.querySelectorAll('input');
    if (this.min !== null && Number(this.value) - this._step < Number(this.min)) {
      $input[1].value = this.min.toString();
      $input[0].value = this.addCommas($input[1].value);
      return;
    }
    $input[1].value = (Number($input[1].value) - this._step).toString();
    $input[0].value = this.addCommas($input[1].value);

    // 이벤트실행
    this.Event.emit('change', { target: this, type: 'change' });
  }

  private _focusIn() {
    if (this.disabled || this.readonly) {
      return;
    }

    this._oldValue = this.value.toString();

    const $spanView = this.shadowRoot!.querySelector<HTMLElement>('span.view');
    const $spanMask = this.shadowRoot!.querySelector<HTMLElement>('span.mask');
    $spanView!.style.display = 'none';
    $spanMask!.style.display = 'block';
    this.shadowRoot!.querySelectorAll('input')[1].focus();
  }

  private _focusBlur() {
    const $spanView = this.shadowRoot!.querySelector<HTMLElement>('span.view');
    const $spanMask = this.shadowRoot!.querySelector<HTMLElement>('span.mask');
    const $input = this.shadowRoot!.querySelectorAll('input');

    if ($input[1].value == '') {
      this._rawValue = '';
    } else {
      this._rawValue = this._adjust(Number(this._rawValue));
    }

    this.value = this._rawValue;

    $spanView!.style.display = 'block';
    $input[0].value = this.addCommas(this._rawValue.toString());
    $input[1].value = this._rawValue.toString();
    $spanMask!.style.display = 'none';

    this.text = this.shadowRoot!.querySelectorAll('input')[0]?.value;

    if (Number(this._oldValue) != this._rawValue) {
      // 이벤트실행
      console.log('change 이벤트 발생');
      this.Event.emit('change', { target: this, type: 'change' });
    }
  }

  /*
   * 반올림 처리 및 천단위로 콤마를 찍습니다.
   */
  private addCommas(num: string) {
    if (!num || num == '-' || num == '.') {
      return '';
    }

    const decimalLength = this.format.split('.')[1].length; // 소수점
    const commaPosition = this.format.split('.')[0].split(',')[1].length; // 콤마 위치

    this.value = Number(num);

    // 반올림 처리
    switch (this.round) {
      case 'round': {
        num = (Math.round(Number(num) * Math.pow(10, decimalLength)) / Math.pow(10, decimalLength)).toString();
        break;
      }
      case 'ceil': {
        num = (Math.ceil(Number(num) * Math.pow(10, decimalLength)) / Math.pow(10, decimalLength)).toString();
        break;
      }
      case 'floor': {
        num = (Math.floor(Number(num) * Math.pow(10, decimalLength)) / Math.pow(10, decimalLength)).toString();
        break;
      }
    }

    const numAraay: string[] = num.toString().split('.');
    if (numAraay[0].length <= commaPosition) {
      return num.toString();
    }
    if (numAraay[1] === '') {
      return num.toString();
    }

    const parts = num.toString().split('.');

    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (parts[1] ? '.' + parts[1] : '');
  }

  public focus(): void {
    this._focusIn();
  }

  private _show(message: string, type: string) {
    // 경고 표시 등을 나타나게 한다.
    switch (type) {
      case 'error':
        this.$state = html`<span class="input-state error">${message}</span>`;
        break;
      case 'warning':
        this.$state = html`<span class="input-state warning">${message}</span>`;
        break;
      case 'reset':
        this.$state = html``;
        break;
    }
  }

  error: Function = (message: string) => {
    this._show(message, 'error');
  };

  warning: Function = (message: string) => {
    this._show(message, 'warning');
  };

  stateReset: Function = () => {
    this._show('reset', 'reset');
  };

  // 이벤트 등록
  public on(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.off(key, handler);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    _changedProperties.forEach((oldValue, propName) => {
      let value = this.value;
      const $input = this.shadowRoot!.querySelectorAll('input');

      if (propName === 'value') {
        const isValid = this._numericRegex().test(value.toString());

        if (!isValid) {
          value = Number(value.toString().replace(/[^0-9.-]/g, ''));
        }

        this._rawValue = value;
        this.updateComplete.then(() => {
          $input[0].value = this.addCommas(this._rawValue.toString());
          $input[1].value = this._rawValue.toString();

          this.text = $input[0].value;
        });
      }
    });
  }

  render() {
    return template.call(this);
  }
}
