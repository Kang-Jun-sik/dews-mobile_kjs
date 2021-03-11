import { DewsAreaComponent } from '../base/exports.js';
import { eventOptions, internalProperty, LitElement, property, PropertyValues } from 'lit-element';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

import template from './box.html';
import scss from './box.scss';

type EVENT = 'click' | 'focus' | 'blur';

// noinspection JSUnusedLocalSymbols
export class Box extends DewsAreaComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: Boolean, reflect: true })
  collapsed = false;

  @property({ type: Boolean })
  hide = false;

  @internalProperty()
  height = 'auto';

  private slotHeight: string | undefined;

  async connectedCallback() {
    await super.connectedCallback();
    await this.updateComplete;
    this.shadowRoot?.querySelector('.dews-box-content-wrap')?.addEventListener('transitionend', this.#animationEnd);
    this.shadowRoot?.querySelector('.dews-box-content-wrap')?.addEventListener('transitionstart', this.#animationStart);
    this.addEventListener('click', this._clickEvent, { passive: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickEvent);
    this.shadowRoot?.querySelector('.dews-box-content-wrap')?.removeEventListener('transitionend', this.#animationEnd);
    this.shadowRoot
      ?.querySelector('.dews-box-content-wrap')
      ?.removeEventListener('transitionstart', this.#animationStart);
  }

  public _blurEvent() {
    this.#EVENT.emit('blur', { target: this, type: 'blur' });
    //블러이벤트
  }

  public _focusEvent() {
    this.#EVENT.emit('focus', { target: this, type: 'focus' });
    //블러이벤트
  }

  #animationStart = () => {
    if (!this.collapsed) {
      this.height = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
  };

  #animationEnd = () => {
    if (!this.collapsed) {
      this.height = 'auto';
    }
  };

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

  private _onToggleClick(e: Event) {
    // 이벤트 실행
    if (!this.collapsed) {
      this.height = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
    this.#EVENT.emit('click', { target: this, type: 'click', preventDefault: e.preventDefault });
  }
  protected enable: Function = (value: boolean) => {
    return (this.collapsed = value);
  };
  private _check = false;
  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.get('collapsed') !== undefined && this.collapsed) {
      this._check = true;
      this.height = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
    if (_changedProperties.get('collapsed') !== undefined && !this.collapsed) {
      this.height = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
    if (_changedProperties.get('collapsed') !== undefined && this._check) {
      this._check = false;
      this.height = '0px';
    }
  }

  private async slotChange() {
    const children: NodeListOf<LitElement> = this.shadowRoot!.querySelectorAll('*');
    await Promise.all(Array.from(children).map(c => c.updateComplete));
  }

  render() {
    return this.hide ? null : template.call(this);
  }
}
