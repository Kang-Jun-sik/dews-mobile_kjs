import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';
import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import _html from './masktextbox.html';
import _scss from './masktextbox.scss';

export class Masktextbox extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: String })
  format = 'password';

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ attribute: 'data-mask' })
  mask = '000-000';

  @property({ attribute: 'data-prompt' })
  prompt = '_';

  @property({ type: String })
  value: string = '';

  private onFocus = new CustomEvent('focus', { detail: { target: '' } });
  private onChange = new CustomEvent('change', { detail: { target: '' } });
  private event = new Event('input');
  private _disabled = true;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    } else if (this.readonly) {
      this._disabled = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
  }

  private _spanClick() {
    if (this.disabled || this.readonly) {
      return;
    }
    const $el = this.shadowRoot.querySelectorAll('span');
    $el[0].style.display = 'none';
    $el[1].style.display = 'block';
    this.shadowRoot.querySelectorAll('input')[1].focus();
  }

  private _inputChange(e) {
    this.value = e.target.value;
    this.dispatchEvent(this.event);
  }

  private _blur() {
    const $el = this.shadowRoot.querySelectorAll('input');
    const $span = this.shadowRoot.querySelectorAll('span');
    $el[0].value = $el[1].value;
    $span[0].style.display = 'block';
    $span[1].style.display = 'none';
  }

  private _onFocus(e) {
    // this.dispatchEvent(this.onFocus);
  }
  private _onChange(e) {
    this.value = e.target.value;
    // this.dispatchEvent(this.onChange);
  }

  private _show(message, type) {
    // 경고 표시 등을 나타나게 한다.
    // if(type==='error'){
    //
    // }else if(type==='warning'){
    //
    // }
  }

  error: Function = (message: string) => {
    this._show(message, 'error');
  };
  warning: Function = (message: string) => {
    this._show(message, 'warning');
  };

  render() {
    return _html.bind(this)();
  }
}
