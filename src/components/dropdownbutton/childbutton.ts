import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import template from './childbutton.html';
import scss from './dropdownbutton.scss';

export class Childbutton extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  text = '';

  @property({ type: Boolean })
  disabled = false;

  //이벤트 객체 생성
  private Event = new EventEmitter();

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return template.call(this);
  }

  private _clickHandler(e: Event) {
    this.Event.emit('click', { target: this, type: 'click', preventDefault: e.preventDefault });
  }

  // 이벤트 등록
  public on(key: 'click', handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: 'click', handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.off(key, handler);
  }
}
