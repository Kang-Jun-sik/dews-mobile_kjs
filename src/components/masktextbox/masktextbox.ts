import { internalProperty, property, PropertyValues } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './masktextbox.html';
import scss from './masktextbox.scss';
import { query } from 'lit-element/lib/decorators.js';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';
import { html } from 'lit-html';

type EVENT_TYPE = 'change' | 'focus' | 'blur';

export class Masktextbox extends DewsFormComponent {
  static styles = scss;

  @query('.view input')
  _viewElement!: HTMLInputElement;

  @query('.mask input')
  _maskElement!: HTMLInputElement;

  @query('span.view')
  viewSpan!: HTMLSpanElement;

  @query('span.mask')
  maskSpan!: HTMLSpanElement;

  @query('span.input-state')
  inputState!: HTMLSpanElement;

  @property({ type: String })
  title = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  format = '';

  @property({ type: String })
  type = 'text';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String })
  mask: string | undefined;

  @property({ type: String })
  prompt = '_';

  @property({ type: Boolean, attribute: 'unmask-on-post' })
  unmaskOnPost = true;

  @property({
    type: String,
    reflect: true
  })
  value = '';
  @property({ type: String })
  get raw() {
    let unmask = this._unmask(this.value, 0);
    unmask = unmask.replace(new RegExp(this.prompt, 'g'), '');
    return unmask;
  }

  @internalProperty()
  private _active = false;

  @internalProperty()
  $state = html``;

  private _old: string | undefined = '';
  private _oldValue: string | undefined = '';
  private emptyMask: string | undefined = '';
  private maskLen: number | undefined = 0;
  private _unmaskedValue: string | undefined;
  private tokens: any = [];
  private rules: any = {
    '0': /\d/,
    '9': /\d|\s/,
    '#': /\d|\s|\+|-/,
    L: /[a-zA-Z]/,
    '?': /[a-zA-Z]|\s/,
    '&': /\S/,
    C: /./,
    A: /[a-zA-Z0-9]/,
    a: /[a-zA-Z0-9]|\s/
  };

  //????????? ?????? ??????
  private Event = new EventEmitter();

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();

    // disabled ??? readonly ??? disabled ??? ?????? ????????????.
    if (this.disabled && this.readonly) {
      this.readonly = false;
    } else if (this.readonly) {
      this.disabled = false;
    }
  }

  render() {
    return template.call(this);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this._initToken();

    if (this.maskLen) {
      this._maskElement.addEventListener('input', (e: Event) => {
        this._inputChange(e);
      });
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    _changedProperties.forEach((oldValue, propName) => {
      const value = this.value;
      if (propName === 'value') {
        this._setValue(value);
        this.updateComplete.then(() => {
          this.value = this._viewElement.value;
        });
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _setValue(value: string) {
    const element = this._viewElement;
    const emptyMask = this.emptyMask;
    if (value === undefined) {
      return this._viewElement.value;
    }
    if (value === null) {
      value = '';
    }
    if (!emptyMask) {
      element.value = value;
      return;
    }
    value = this._unmask(value + '');
    element.value = value ? emptyMask : '';
    this._mask(element, 0, this.maskLen!, value);
    value = element.value;
    if (document.activeElement !== this) {
      if (value === emptyMask) {
        element.value = '';
      }
    }
  }

  private _initToken() {
    const mask = this.mask || '';
    const arrMask = mask.split('');
    const token = [];
    const promptChar = this.prompt;
    const rules = this.rules;
    let tokenIdx = 0;
    let chr;
    let rule;
    let emptyMask = '';

    for (let i = 0; i < arrMask.length; i++) {
      chr = arrMask[i];
      rule = rules[chr];
      if (rule) {
        token[tokenIdx] = rule;
        emptyMask += promptChar;
        tokenIdx++;
      } else {
        chr = chr.split('');
        for (let i = 0; i < chr.length; i++) {
          token[tokenIdx] = chr[i];
          emptyMask += chr[i];
          tokenIdx++;
        }
      }
    }
    this.tokens = token;
    this.emptyMask = emptyMask;
    this.maskLen = emptyMask.length;
  }

  private _handleClick(): void {
    if (this.disabled || this.readonly) {
      return;
    }

    this._maskElement.value = this.value;

    this.viewSpan.style.display = 'none';
    this.maskSpan.style.display = 'block';
    this._active = true;

    this._maskElement.focus();
  }

  private _inputChange(e: Event) {
    const element = e.target as HTMLInputElement;
    const old = this._old!;
    const value = element.value;
    const lengthGap = value.length - old.length;
    let backward;
    let cursor = element.selectionEnd!;

    if (lengthGap === -1) {
      backward = true;
    }

    const start: number = Math.min(cursor, this._stringDiffStart(value, old));

    let content = value.substring(start, cursor);

    if (content === '' && !backward) {
      content = value.substring(start, ++cursor);
    }

    element.value = value.substring(0, start) + this.emptyMask!.substring(start);
    let caretPosition = this._mask(this._maskElement, start, cursor, content);
    const endContent = this._trimStartPromptChars(value.substring(cursor), Math.min(lengthGap, caretPosition! - start));
    const unmasked = this._unmask(endContent, old.length - endContent.length);
    this._mask(this._maskElement, caretPosition!, caretPosition!, unmasked);

    this.value = element.value;

    if (backward) {
      caretPosition = this._backCaret(start);
    }
    this._caret(element, caretPosition);
  }

  private _backCaret(idx: number): number {
    let caretPos = this._find(idx, true);
    if (caretPos < idx) {
      caretPos += 1;
    }
    return caretPos;
  }

  /**
   * Prompt ????????? ???????????????.
   * @param content
   * @param count
   */
  _trimStartPromptChars(content: string, count: number): string {
    const promptChar = this.prompt;
    while (count-- > 0 && content.indexOf(promptChar) === 0) {
      content = content.substring(1);
    }
    return content;
  }

  /**
   * ????????? ???????????? ???????????????.
   * @param _element
   * @param start
   * @param end
   * @param value
   * @param backward
   * @return ?????? ??????
   */
  _mask(_element: HTMLInputElement, start: number, end: number, value: string, backward?: boolean): number | undefined {
    const element = _element;
    const current = element.value! || this.emptyMask!;
    const arrCurrent = current!.split('');
    const emptyChar = this.prompt;
    let charIdx = 0;
    let unMasked;
    let chr;
    let idx: number | undefined;
    start = this._find(start, backward);
    if (start > end) {
      end = start;
    }

    unMasked = this._unmask(current.substring(end), end);
    value = this._unmask(value, start);
    const valueLen = value.length;

    if (value) {
      unMasked = unMasked.replace(new RegExp('^_{0,' + valueLen + '}'), '');
    }
    value += unMasked;

    chr = value.charAt(charIdx);

    while (start < this.maskLen!) {
      arrCurrent[start] = chr || emptyChar;
      chr = value.charAt(++charIdx);
      if (idx === undefined && charIdx > valueLen) {
        idx = start;
      }
      start = this._find(start + 1);
    }

    element.value = this._old = arrCurrent.join('');
    if (this._active) {
      if (idx === undefined) {
        idx = this.maskLen;
      }
      this._caret(element, idx);
    }
    return idx;
  }

  /**
   * ????????? ?????? ?????? ????????? ???????????????.
   * @param element
   * @param start
   * @param end
   */
  _caret(element: HTMLInputElement, start?: number, end?: number) {
    const isPosition = start !== undefined;

    if (end === undefined) {
      end = start;
    }
    if (isPosition && element.disabled) {
      return;
    }

    if (isPosition) {
      element.focus();
      element.setSelectionRange(start!, end!);
    }

    return start;
  }

  _unmask(value: string, index?: number) {
    if (!value) {
      return '';
    }

    let char;
    let token;
    let chrIdx = 0;
    let tokenIdx = index || 0;
    const empty = this.prompt;
    const valueLength = value.length;
    const tokenLength = this.tokens.length;
    let result = '';

    while (tokenIdx < tokenLength) {
      char = value[chrIdx];
      token = this.tokens[tokenIdx];
      if (char === token || char === empty) {
        result += char === empty ? empty : '';
        chrIdx++;
        tokenIdx++;
      } else if (typeof token !== 'string') {
        if (token && token.test && token.test(char)) {
          result += char;
          tokenIdx++;
        } else {
          if (valueLength === 1) {
            this.warning('???????????? ?????? ???????????????.');
          }
        }
        chrIdx++;
      } else {
        tokenIdx++;
      }
      if (chrIdx >= valueLength) {
        break;
      }
    }
    this._unmaskedValue = result;
    return result;
  }

  /**
   * ????????? ????????? ????????????.
   * @param index ?????? ??????
   * @param backward ???????????? ??????
   */
  _find(index: number, backward?: boolean) {
    const value = this._maskElement.value! || this.emptyMask!;
    let step = 1;
    if (backward === true) {
      step = -1;
    }
    while (index > -1 || index <= this.maskLen!) {
      if (value.charAt(index) !== this.tokens[index]) {
        return index;
      }
      index += step;
    }
    return -1;
  }

  /**
   * ??????????????????????????? ?????? ???????????? ?????? ?????? ???????????? ???????????? ??? ?????? ????????? ?????? ?????????????????? ??????????????????.
   * @param str1 ??? ?????? ?????? ??????????????????????????? value
   * @param str2 ??? ?????? ?????? ??????????????????????????? value
   * @return {number} ??? ?????? ????????? ?????? ?????????????????? ??????????????????.
   */
  _stringDiffStart(str1: string, str2: string) {
    let i = 0;
    while (i < str2.length) {
      if (str1[i] !== str2[i]) {
        break;
      }
      i++;
    }
    return i;
  }

  private _focus(e: Event) {
    const value = this._viewElement!.value;

    if (!value) {
      this._maskElement.value = this._old = this.emptyMask!;
    } else {
      this._maskElement.value = value;
    }

    setTimeout(() => {
      if (!this.disabled && !this.readonly) {
        this._maskElement.select();
      }
    }, 50);

    this._oldValue = value;
    this.Event.emit('focus', { target: this, type: 'focus', preventDefault: e.preventDefault });
  }

  private _blur(e: Event) {
    let validCheck = true;
    const value = (this._viewElement.value = this._maskElement.value);
    this.viewSpan.style.display = 'block';
    this.maskSpan.style.display = 'none';
    this._active = false;

    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      const char = value.charAt(i);
      if (char !== token && token && token.test && !token.test(char)) {
        validCheck = false;
        break;
      }
    }

    if (validCheck) {
      this._showMsg('reset', 'reset');
    } else {
      this.warning('???????????? ?????? ???????????????.');
    }
    this._change(e);
    this.Event.emit('blur', { target: this, type: 'blur', preventDefault: e.preventDefault });
  }

  private _keyDown(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      this._change(e);
    }
  }

  private _change(e: Event) {
    let value = this.value;

    if (value === this.emptyMask) {
      value = '';
    }

    if (value !== this._oldValue) {
      this._oldValue = value;
      this.Event.emit('change', { target: this, type: 'change', preventDefault: e.preventDefault });
    }
  }

  /**
   * ?????? ????????? ???????????????.
   * @param message
   * @param type
   * @private
   */
  private _showMsg(message: string, type: string) {
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
    this._showMsg(message, 'error');
  };
  warning: Function = (message: string) => {
    this._showMsg(message, 'warning');
  };

  stateReset: Function = () => {
    this._showMsg('reset', 'reset');
  };

  public focus() {
    this.viewSpan.click();
  }

  public validate() {
    return !!this.value;
  }

  // ????????? ??????
  public on(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.on(key, handler);
  }

  // ????????? ??????
  public off(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this.Event.off(key, handler);
  }
}
