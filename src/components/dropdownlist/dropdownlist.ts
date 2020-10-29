import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';

import _html from './dropdownlist.html';
import _scss from './dropdownlist.scss';

export class Dropdownlist extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: String })
  placeholder: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

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

  render() {
    return _html.bind(this)();
  }
}
