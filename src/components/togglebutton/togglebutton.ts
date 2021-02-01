import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './togglebutton.html';
import scss from './togglebutton.scss';
import { property } from 'lit-element';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT = 'change' | 'checked';

export class Togglebutton extends DewsFormComponent {
  static styles = scss;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String, attribute: 'title' })
  toggleTitle = undefined;

  @property({ type: String })
  text = undefined;

  render() {
    return template.call(this);
  }

  //이벤트 객체 생성
  #EVENT = new EventEmitter();

  // 이벤트 등록
  public on(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void): void {
    this.#EVENT.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.off(key, handler);
  }

  private _clickHandler() {
    if (this.disabled) {
      return;
    }
    this._checkedChange();
    if (this.checked) {
      this.#EVENT.emit('checked', { target: this, type: 'checked' });
    }
  }

  private _checkedChange() {
    this.#EVENT.emit('change', { target: this, type: 'change' });
    this.checked = !this.checked;
  }
}
