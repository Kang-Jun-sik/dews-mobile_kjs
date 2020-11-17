import { property, html, TemplateResult } from 'lit-element';
import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import _html from './numerictextbox.html';
import _scss from './numerictextbox.scss';

export class Numerictextbox extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string | undefined;

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: Number })
  value: number | '' = '';

  @property({ type: String })
  prefix: string | undefined;

  @property({ type: String })
  suffix: string | undefined;

  @property({ type: String })
  format: string = '#,##0.00';

  // @property({ type: Number })
  // decimals: number = 2;

  @property({ type: Number })
  max: number = 999999999999;

  @property({ type: Number })
  min: number = -999999999999;

  @property({ type: Boolean, attribute: 'restrict-decimals', reflect: true })
  restrict: boolean = false;

  @property({ attribute: 'max-length' })
  maxLength: number = 12;

  @property({ type: String })
  round: 'round' | 'ceil' | 'floor' = 'round';

  private val: number = 0;

  private _step: number = 1;
  private _disabled: boolean = true;

  private _button: TemplateResult;
  private _title: TemplateResult;

  private onFocus = new CustomEvent('focus', { detail: { target: '' } });
  private onChange = new CustomEvent('change', { detail: { target: '' } });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);

    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    } else if (this.readonly) {
      this._disabled = false;
    }

    // numericbox-button 자식요소가 있으면 step을찾아 버튼 셋팅
    this._numericButton();
    this._title =
      this.title == undefined
        ? html`<label class="undefined" for="numeric-box">undefined</label>`
        : html`<label for="numeric-box">${this.title}</label>`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
  }

  private _beforeInput(e: any) {
    this.value = e.target.value;
    // 숫자 및 - . 입력처리
    if (
      (/\d/.exec(e.data) == null && e.data != null && e.data != '.' && e.data != '-') ||
      (e.target.value.replace('.', '').replace('-', '').length >= this.maxLength &&
        e.data != null &&
        e.data != '-' &&
        e.data != '.')
    ) {
      e.returnValue = null;
    }
  }

  private _numericButton() {
    if (this.children[0]?.localName === 'numericbox-button') {
      if (this.children[0]?.getAttribute('step') != undefined) {
        this._step = Number(this.children[0]?.getAttribute('step'));
      }
      this._button = html`
        <span class="stepper">
          <button class="btn-tmp" @click="${this._stepperDecrement}">-</button>
          <button class="btn-tmp" @click="${this._stepperIncrement}">+</button>
        </span>
      `;
    }
  }

  private _stepperIncrement() {
    const $input = this.shadowRoot.querySelectorAll('input');
    if (Number($input[1].value) + this._step > this.max) {
      return;
    }
    $input[1].value = (Number($input[1].value) + this._step).toString();
    $input[0].value = this.numberWithCommas($input[1].value);
  }

  private _stepperDecrement() {
    const $input = this.shadowRoot.querySelectorAll('input');
    if (Number(this.value) + this._step < this.min) {
      return;
    }
    $input[1].value = (Number($input[1].value) - this._step).toString();
    $input[0].value = this.numberWithCommas($input[1].value);
  }

  private _onFocus(e: Event) {
    // this.onFocus.detail.target = e.target;
    // this.dispatchEvent(this.onFocus);
  }

  private _inputChange(e: any) {
    if (e.data == '-') {
      e.target.value = -this.value;
    }
    // 최대값 최소값 처리
    if (e.target.value > this.max || e.target.value < this.min) {
      e.target.value = this.value;
    }
  }

  private _focusIn(e: Event) {
    if (this.disabled || this.readonly) {
      return;
    }
    const $spanView = this.shadowRoot.querySelector<HTMLElement>('span.view');
    const $spanMask = this.shadowRoot.querySelector<HTMLElement>('span.mask');
    $spanView.style.display = 'none';
    $spanMask.style.display = 'block';
    this.shadowRoot.querySelectorAll('input')[1].focus();
  }

  private _focusBlur(e: Event) {
    const $spanView = this.shadowRoot.querySelector<HTMLElement>('span.view');
    const $spanMask = this.shadowRoot.querySelector<HTMLElement>('span.mask');
    const $input = this.shadowRoot.querySelectorAll('input');

    $spanView.style.display = 'block';
    $input[0].value = this.numberWithCommas($input[1].value);
    $spanMask.style.display = 'none';
  }

  private numberWithCommas(num: string) {
    this.value = Number(num);
    const decimalLength = this.format.split('.')[1].length; // 소수점
    const commaPosition = this.format.split('.')[0].split(',')[1].length; // 콤마 위치

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
      return num;
    }

    const count = Math.ceil(numAraay[0].length / commaPosition);
    const newNum = [];
    for (let i = 0; i < count; i++) {
      newNum.unshift(numAraay[0].slice(-commaPosition * (i + 1), numAraay[0].length - commaPosition * i));
    }
    newNum.join(',');
    if (numAraay.length == 2) {
      if (numAraay[1].length > decimalLength) {
        return newNum.join(',') + '.' + numAraay[1].slice(0, decimalLength).toString();
      }
      return newNum.join(',') + '.' + numAraay[1].toString();
    } else {
      return newNum.join(',');
    }
  }

  render() {
    return _html.bind(this)();
  }
}
