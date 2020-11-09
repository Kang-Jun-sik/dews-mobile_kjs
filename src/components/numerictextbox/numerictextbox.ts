import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';
import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import _html from './numerictextbox.html';
import _scss from './numerictextbox.scss';

export class Numerictextbox extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean, reflect: true })
  multi: boolean = false;

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  readonly: boolean = false;

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: String })
  value: string = '';

  private onFocus = new CustomEvent('focus', { detail: { target: '' } });
  private onChange = new CustomEvent('change', { detail: { target: '' } });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
    // this.addEventListener('keypress', this._onlyNumber);
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
  }
  private _onlyNumber(e) {
    // e.target.type = "text";
  }

  private _onFocus(e) {
    console.log('focus');
    // this.onFocus.detail.target = e.target;
    // this.dispatchEvent(this.onFocus);
  }
  private _onChange(e) {
    // this.value = e.target.value;
    // this.onChange.detail.target = e.target;
    // this.dispatchEvent(this.onChange);
  }

  private _focusIn(e) {
    console.log('focusIn');
    this.shadowRoot.querySelectorAll('input')[0].style.display = 'none';
    this.shadowRoot.querySelectorAll('input')[1].style.display = 'block';
    // this.updateComplete.then(()=>{
    this.shadowRoot.querySelectorAll('input')[1].focus();
    // })
  }

  private _focusBlur(e) {
    this.shadowRoot.querySelectorAll('input')[0].style.display = 'block';
    this.shadowRoot.querySelectorAll('input')[0].value = this.numberWithCommas(
      this.shadowRoot.querySelectorAll('input')[1].value,
    );
    this.shadowRoot.querySelectorAll('input')[1].style.display = 'none';
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    return _html.bind(this)();
  }
}
