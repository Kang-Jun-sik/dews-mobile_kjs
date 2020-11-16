import { property } from 'lit-element';
import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import _html from './textbox.html';
import _scss from './textbox.scss';

export class Textbox extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: String, reflect: true })
  placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  multi: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: Number, attribute: 'multi-height' })
  multiHeight: number = 50; // default 높이값...

  @property({ type: String })
  value: string = '';

  private onChange = new CustomEvent('change', { detail: '' });
  private onFocus = new CustomEvent('focus');

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
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

  private _onFocus(e) {
    this.onFocus.initEvent(e);
    this.dispatchEvent(this.onFocus);
  }
  private _onChange(e) {
    this.value = e.target.value;
    this.onChange.initCustomEvent('change', false, false, '');
    this.dispatchEvent(this.onChange);
  }

  private _show(message, type) {
    // 경고 표시 등을 나타나게 한다.
    // if(type==='error'){
    //
    // }else if(type==='warning'){
    //
    // }
  }

  click() {
    this.shadowRoot.querySelector('input').focus();
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
