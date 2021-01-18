import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';

import template from './checkbox.html';
import scss from './checkbox.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT_TYPE = 'change' | 'checked';

// noinspection JSUnusedLocalSymbols
export class Checkbox extends DewsFormComponent {
  constructor() {
    super();
  }
  static styles = scss;

  @property({ type: String })
  label = '';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean })
  bookmark = false;

  @property({ type: Boolean })
  reverse = false;

  private _className = 'dews-checkbox-wrap';

  connectedCallback() {
    super.connectedCallback();

    if (this.reverse) {
      this._className = this._className + ' reverse';
    }
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
  #EVENT = new EventEmitter();

  /*
   * 포커스 설정
   * */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  focus(): void {}

  private _clickHandler() {
    if (this.disabled) {
      return;
    }
    this.#checkedChange();
    if (this.checked) {
      this.#EVENT.emit('checked', { target: this, type: 'checked' });
    }
  }

  #checkedChange = () => {
    this.checked = !this.checked;
    this.#EVENT.emit('change', { target: this, type: 'change' });
  };

  public on(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.on(key, handler);
  }

  public off(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.off(key, handler);
  }

  render() {
    return template.call(this);
  }
}
