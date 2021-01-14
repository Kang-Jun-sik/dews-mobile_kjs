import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

export class DrawerBottomBase extends DewsFormComponent {
  @property({ type: Boolean })
  disabled: boolean | undefined = false;

  @property({ type: Boolean })
  readonly: boolean | undefined = false;

  @property({ type: Boolean })
  required: boolean | undefined = false;

  @internalProperty()
  protected active: boolean | undefined = false;
  protected _afterItem: number | undefined;
  protected $nextBtn: TemplateResult | undefined;
  protected count: number | undefined = 0;

  //  drower layout 처리 *_*
  protected _nextBtnClickHandler(e: TouchEvent | MouseEvent): void {
    const $el = this.parentElement?.parentElement?.children[this._afterItem!]?.children[0] as HTMLElement;
    this._confirmClickHandler();
    $el?.click();
  }

  protected _confirmClickHandler(): void {
    this._close();
    // 적용버튼 클릭핸들러
  }

  /*
   *  다음 요소 선택 처리
   * */
  protected _afterBtnView(): void {
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
            this.$nextBtn = html`<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
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
        if (this.count! > 0) {
          this._close();
        } else {
          this.count!++;
        }
      }
    }
  }

  protected _clickHandler(e: MouseEvent): void {
    if (!this.disabled && !this.readonly && this.active === false) {
      this.shadowRoot!.querySelector('.select-wrap')!.classList.add('focus');
      this._open();
      this._scrollChange();
    }
  }

  protected _scrollChange(): void {
    window.scrollTo(
      0,
      window.pageYOffset +
        this.parentElement!.getBoundingClientRect()?.top -
        this.shadowRoot!.getElementById('drawer')!.clientHeight -
        25
    );
  }

  protected domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  protected _close(): void {
    this.shadowRoot!.querySelector('.select-wrap')!.classList.remove('focus');
    this.active = false;
    this.count = 0;
    this.dispatchEvent(new Event('close'));
    document.removeEventListener('click', this.domEvent);
  }
  protected _open(): void {
    this.active = true;
    this.dispatchEvent(new Event('open'));
    document.addEventListener('click', this.domEvent);
  }
}
