import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { property, PropertyValues } from 'lit-element';

import _html from './checkbox.html';
import _scss from './checkbox.scss';

export class Checkbox extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked: boolean = false;

  @property({ type: Boolean })
  bookmark: boolean = false;

  private _className: string = 'dews-checkbox-wrap';

  connectedCallback() {
    super.connectedCallback();

    if (this.parentElement.localName == 'dews-dropdownlist') {
      this._className = this._className + ' dropdown';
    }
    if (this.bookmark && this.parentElement.localName != 'dews-dropdownlist') {
      this._className = this._className + ' bookmark';
      this.title = undefined;
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
    return _html.bind(this)();
  }
}
