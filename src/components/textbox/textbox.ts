import { internalProperty, property, PropertyValues } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './textbox.html';
import scss from './textbox.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { html } from 'lit-html';

type EVENT_TYPE = 'focus' | 'blur' | 'change';

export class Textbox extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  placeholder: string | undefined = '';

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Number, attribute: 'multi-height' })
  multiHeight = 50; // default 높이값...

  @property({ type: String, reflect: true })
  value = '';

  @internalProperty()
  $state = html``;

  #EVENT = new EventEmitter();

  connectedCallback() {
    super.connectedCallback();
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
    // this.addEventListener('change', this._onChange);
    // disabled 와 readonly 중 disabled 를 우선 처리한다.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _onFocus(e: FocusEvent) {
    this.#EVENT.emit('focus', { target: this, type: 'change', preventDefault: e.preventDefault });
    // this.dispatchEvent(new CustomEvent('focusin', { detail: { target: e.target as EventTarget } }));
  }

  focus(options?: FocusOptions) {
    if (this.multi) {
      (this.shadowRoot?.querySelector('textarea') as HTMLElement).focus(options);
    } else {
      (this.shadowRoot?.querySelector('input') as HTMLElement).focus(options);
    }
  }

  private _keyDownHandler(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }

  private _onChange(e: InputEvent) {
    this.value = (e.target as HTMLInputElement)!.value;
    this.#EVENT.emit('change', { target: this, type: 'change', preventDefault: e.preventDefault, value: this.value });
    // this.dispatchEvent(new CustomEvent('change', { detail: { target: e.target as EventTarget } }));
  }

  click() {
    this.shadowRoot!.querySelector('input')?.focus();
  }
  on = (
    key: EVENT_TYPE,
    handler: (e: { target: Textbox; type: string; value: string }, ...args: unknown[]) => void
  ) => {
    this.#EVENT.on(key, handler);
  };

  off = (
    key: EVENT_TYPE,
    handler: (e: { target: Textbox; type: string; value: string }, ...args: unknown[]) => void
  ) => {
    this.#EVENT.off(key, handler);
  };

  private _show(message: string, type: string) {
    // 경고 표시 등을 나타나게 한다.
    switch (type) {
      case 'error':
        this.$state = html`<span class="input-state error">${message}</span>`;
        break;
      case 'warning':
        this.$state = html`<span class="input-state warning">${message}</span>`;
        break;
      case 'reset':
        this.$state = html``;
        break;
    }
  }
  error: Function = (message: string) => {
    this._show(message, 'error');
  };

  warning: Function = (message: string) => {
    this._show(message, 'warning');
  };

  stateReset: Function = () => {
    this._show('reset', 'reset');
  };

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (_changedProperties.get('value') !== undefined && !this.multi) {
      (this.shadowRoot!.querySelector('.dews-input') as HTMLInputElement)!.value = this.value;
    } else if (_changedProperties.get('value') !== undefined && this.multi) {
      (this.shadowRoot!.querySelector('.dews-multi-input') as HTMLInputElement)!.value = this.value;
    }
    return super.shouldUpdate(_changedProperties);
  }
  render() {
    return template.call(this);
  }
}
