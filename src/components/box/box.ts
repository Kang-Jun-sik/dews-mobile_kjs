import { DewsAreaComponent } from '../base/exports.js';
import { internalProperty, LitElement, property } from 'lit-element';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

import template from './box.html';
import scss from './box.scss';

type EVENT = 'click' | 'focus' | 'blur';

// noinspection JSUnusedLocalSymbols
export class Box extends DewsAreaComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: Boolean })
  collapsed = false;

  @property({ type: Boolean })
  hide = false;

  @internalProperty()
  height = 'auto';

  private slotHeight: string | undefined;

  async connectedCallback() {
    await super.connectedCallback();
    await this.updateComplete;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  public _blurEvent() {
    this.#EVENT.emit('blur', { target: this, type: 'blur' });
    //블러이벤트
  }

  public _focusEvent() {
    this.#EVENT.emit('focus', { target: this, type: 'focus' });
    //블러이벤트
  }

  //이벤트 객체 생성
  #EVENT = new EventEmitter();
  // 이벤트 등록
  public on(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.on(key, handler);
  }

  // 이벤트 삭제
  public off(key: EVENT, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.#EVENT.off(key, handler);
  }

  private _clickEvent(e: Event) {
    this._focusChanging(e);
  }

  private _onToggleClick = (e: Event) => {
    // 이벤트 실행
    if (!this.collapsed) {
      this.collapsed = true;
      this.height = '0px';
    } else {
      this.collapsed = false;
      this.height = this.slotHeight as string;
    }

    this.#EVENT.emit('click', { target: this, type: 'click', preventDefault: e.preventDefault });
  };
  protected enable: Function = (value: boolean) => {
    return (this.collapsed = value);
  };

  private async slotChange() {
    if (this.collapsed) {
      this.height = '0px';
    }
    const children: NodeListOf<LitElement> = this.shadowRoot!.querySelectorAll('*');

    await Promise.all(Array.from(children).map(c => c.updateComplete));
    this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content-wrap')?.clientHeight}px`;
    if (!this.collapsed) {
      this.height = this.slotHeight;
    } else {
      this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
  }

  render() {
    return this.hide ? null : template.call(this);
  }
}
