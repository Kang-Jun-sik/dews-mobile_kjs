import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './masktextbox.html';
import scss from './masktextbox.scss';
import { ChangeEvent } from 'rollup';

export class Masktextbox extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  format = 'password';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ attribute: 'data-mask' })
  mask = '000-000';

  @property({ attribute: 'data-prompt' })
  prompt = '_';

  @property({ type: String })
  value = '';

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
    const $el = this.shadowRoot!.querySelectorAll('span');
    $el[0].style.display = 'none';
    $el[1].style.display = 'block';
    this.shadowRoot!.querySelectorAll('input')[1].focus();
  }

  private _inputChange(e: ChangeEvent & MouseEvent) {
    this.value = (e.target as HTMLInputElement)?.value;
    this.dispatchEvent(this.event);
  }

  private _blur() {
    const $el = this.shadowRoot!.querySelectorAll('input');
    const $span = this.shadowRoot!.querySelectorAll('span');
    $el[0].value = $el[1].value;
    $span[0].style.display = 'block';
    $span[1].style.display = 'none';
  }

  private _onFocus() {
    // this.dispatchEvent(this.onFocus);
  }
  private _onChange(e: ChangeEvent & InputEvent) {
    this.value = (e.target as HTMLInputElement)?.value;
    // this.dispatchEvent(this.onChange);
  }

  private _show(message: string, type: string) {
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
    return template.call(this);
  }
}
