import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';

import template from './checkbox.html';
import scss from './checkbox.scss';

// noinspection JSUnusedLocalSymbols
export class Checkbox extends DewsFormComponent {
  constructor() {
    super();
  }
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean })
  bookmark = false;

  private _className = 'dews-checkbox-wrap';

  connectedCallback() {
    super.connectedCallback();

    console.log('connected callback');

    if (this.parentElement?.localName == 'dews-dropdownlist') {
      this._className = this._className + ' dropdown';
    }
    if (this.bookmark && this.parentElement?.localName != 'dews-dropdownlist') {
      this._className = this._className + ' bookmark';
      this.title = '';
    }
  }

  /*
   * 이벤트 생성
   * */
  private changeEvent = new CustomEvent('change');
  private checkEvent = new CustomEvent('check');

  /*
   * 포커스 설정
   * */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  focus(): void {}

  private _clickHandler() {
    if (this.disabled) {
      return;
    }
    this._checkedChange();
    if (this.checked) {
      this.dispatchEvent(this.checkEvent);
    }
  }

  private _checkedChange() {
    this.dispatchEvent(this.changeEvent);
    this.checked = !this.checked;
  }

  render() {
    return template.call(this);
  }
}
