import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { eventOptions, property } from 'lit-element';

import _html from './textbox.html';
import _scss from './textbox.scss';

export class Textbox extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  readonly: boolean = false;

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: String })
  value: string = '';

  private onFocus = new CustomEvent('onFocus', { detail: { target: '' } });
  private onChange = new CustomEvent('onChange', { detail: { target: '' } });

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focus', this._onFocus);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focus', this._onFocus);
  }

  private _onFocus(e) {
    this.onFocus.detail.target = e.target;
    this.dispatchEvent(this.onFocus);
  }
  private _onChange(e) {
    this.value = e.target.value;
    this.onChange.detail.target = e.target;
    this.dispatchEvent(this.onChange);
  }

  private _show(message, type) {
    // 경고 표시 등을 나타나게 한다.
    // if(type==='error'){
    //
    // }else{
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
