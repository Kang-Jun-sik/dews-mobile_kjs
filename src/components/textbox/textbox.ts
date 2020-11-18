import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './textbox.html';
import scss from './textbox.scss';

export class Textbox extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: String, reflect: true })
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Number, attribute: 'multi-height' })
  multiHeight = 50; // default 높이값...

  @property({ type: String })
  value = '';

  private onFocus = new CustomEvent('focus', { detail: { target: '' } });
  private onChange = new CustomEvent('change', { detail: { target: '' } });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
    // this.addEventListener('change', this._onChange);
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
  }

  private _onFocus(e: FocusEvent) {
    this.onFocus.initEvent(e.type);
    // this.dispatchEvent(this.onFocus);
  }

  private _onChange(e: CustomEvent) {
    this.value = (e.target as HTMLInputElement)!.value;
    this.dispatchEvent(this.onChange);
  }

  private _show(message: string, type: string) {
    // 경고 표시 등을 나타나게 한다.
    if (type === 'error') {
      alert(message);
    } else if (type === 'warning') {
      alert(message);
    }
  }

  click() {
    this.shadowRoot!.querySelector('input')?.focus();
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
