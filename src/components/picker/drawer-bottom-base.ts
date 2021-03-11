import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, property, PropertyValues, TemplateResult } from 'lit-element';
import { Drawerlayout } from '../drawerlayout/drawerlayout.js';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT_TYPE = 'open' | 'close';

export class DrawerBottomBase extends DewsFormComponent {
  constructor() {
    super();
    this._afterBtnView();
  }

  @property({ type: Boolean })
  disabled: boolean | undefined = false;

  @property({ type: Boolean, reflect: true })
  dimming = false;

  @property({ type: Boolean })
  readonly: boolean | undefined = false;

  @property({ type: Boolean })
  required: boolean | undefined = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  protected _afterItem: number | undefined;
  protected $nextBtn: TemplateResult | undefined;
  protected count = 0;

  protected _EVENT = new EventEmitter();

  public on(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this._EVENT.on(key, handler);
  }

  public off(key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) {
    this._EVENT.off(key, handler);
  }

  #event_emit = (e: EVENT_TYPE) => {
    switch (e) {
      case 'open':
        this._EVENT.emit('open', { target: this, type: 'open' });
        break;
      case 'close':
        this._EVENT.emit('close', { target: this, type: 'close' });
        break;
    }
  };

  //  drower layout 처리 *_*
  protected _nextBtnClickHandler(e: TouchEvent | MouseEvent): void {
    const $el = this.parentElement?.parentElement?.children[this._afterItem!]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
    this._scrollChange($el);
  }

  protected _confirmClickHandler(): void {
    this._close();
    // 적용버튼 클릭핸들러
  }

  /*
   *  다음 요소 선택 처리
   * */
  protected _afterBtnView(): void {
    if (this.parentElement === null) {
      return;
    }
    const $el = this.parentElement!.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._afterItem = i + 1;
        if ($el.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el.item(i + 1)!.hasAttribute('disabled') ||
            $el.item(i + 1)!.hasAttribute('readonly') ||
            $el.item(i + 1)!.localName === 'dews-button' ||
            $el.item(i + 1)!.localName === 'dews-radiobutton-group' ||
            $el.item(i + 1)!.localName === 'dews-checkbox-group'
          ) {
            this.$nextBtn = html``;
          } else {
            this.$nextBtn = html`<button class="next-icon-button will-touch" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
          }
        }
      }
    }
  }

  protected _domClickHandler(e: MouseEvent): void {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.drawer-layout')!.shadowRoot!.querySelector('.layer-bottom')!.clientHeight
      ) {
        if (this.active && this.count > 0) {
          this._close.call(this);
        } else {
          this.count = 1;
        }
      } else {
        this.count = 1;
      }
    }
  }

  private _focus() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.add('focus');
  }

  private _blur() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.remove('focus');
  }

  protected _clickHandler(e: MouseEvent): void {
    if (!this.disabled && !this.readonly && !this.active) {
      const $el: Drawerlayout | null = this.shadowRoot!.querySelector('.drawer-layout');
      $el!.height = `${this.shadowRoot!.getElementById('drawer')!.clientHeight + 120}px`;
      this._scrollChange(this);
      this._open();
    }
  }

  protected _scrollChange($el: Element): void {
    if ($el.parentElement && !this.dimming) {
      window.scrollTo(
        0,
        window.pageYOffset +
          $el.parentElement!.getBoundingClientRect()!.top -
          $el.shadowRoot!.getElementById('drawer')!.clientHeight -
          25
      );
    }
  }

  protected domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  protected _close(): void {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.remove('focus');
    this.#event_emit('close');
    this.active = false;
    this._blur();
    this.dispatchEvent(new Event('close'));
  }
  protected _open(): void {
    this._focus();
    this.active = true;
    this.#event_emit('open');
    this.dispatchEvent(new Event('open'));
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (_changedProperties.has('active')) {
      if (this.active !== _changedProperties.get('active')) {
        if (this.active) {
          this.count = 0;
          document.addEventListener('click', this.domEvent);
        } else {
          this.count = 0;
          document.removeEventListener('click', this.domEvent);
        }
      }
    }
  }
}
