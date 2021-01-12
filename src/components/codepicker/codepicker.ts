import { internalProperty, property, PropertyValues } from 'lit-element';
import { Drawerlayout } from '../drawerlayout/drawerlayout.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';

import template from './codepicker.html';
import scss from './codepicker.scss';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { DewsComponent } from '../base/DewsComponent.js';

// noinspection JSUnusedLocalSymbols
// @ts-expect-error
export class Codepicker extends ScopedElementsMixin(DewsFormComponent) {
  static styles = scss;

  static get scopedElements() {
    return {
      'drawer-layout': Drawerlayout,
      ...DewsComponent.getRegisteredComponents()
    };
  }

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  multi = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @internalProperty()
  private active = false;

  @internalProperty()
  private height: string | undefined;

  private _count = 0;

  constructor() {
    super();
    this._nextBtnView();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  private _nextBtnView() {
    const $el: HTMLCollection = this.parentElement?.children as HTMLCollection;
    for (let i = 0; i <= $el.length; i++) {
      console.log(i);
    }
  }

  private _clickHandler(e: MouseEvent) {
    if (!this.disabled && !this.readonly) {
      const $el: Drawerlayout | null = this.shadowRoot!.querySelector('.drawer-layout');
      window.scrollTo(
        0,
        window.pageYOffset +
          this.parentElement?.getBoundingClientRect()?.top! -
          this.shadowRoot!.querySelector('.codepicker')?.clientHeight! -
          25
      );
      this.height = `${this.shadowRoot!.querySelector('.codepicker')!.clientHeight + 120}px`;
      $el!.height = this.height;
      this._open();
    }
  }

  private _open() {
    this._focus();

    this.active = true;
  }

  private _close() {
    this._blur();

    this.active = false;
  }

  private _domClickHandelr(e: MouseEvent) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.drawer-layout')?.shadowRoot!.querySelector('.layer-bottom')?.clientHeight!
      ) {
        if (!this.active) {
          return;
        }
        if (this._count >= 1) {
          this._close();
        }
      }
      this._count++;
    }
  }

  private _addEvent = this._domClickHandelr.bind(this);

  private _focus() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.add('focus');
  }

  private _blur() {
    this.shadowRoot!.querySelector('.select-wrap')?.classList.remove('focus');
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    this.shadowRoot!.querySelector('.drawer-layout')?.addEventListener('blur', this._close);
    // if (this.disabled) {
    //   this.shadowRoot!.querySelector('.select-wrap')?.classList.add('disabled');
    // }
    // if (this.readonly) {
    //   this.shadowRoot!.querySelector('.select-wrap')?.classList.add('readonly');
    // }
    // super.firstUpdated(_changedProperties);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (this.active) {
      document.addEventListener('click', this._addEvent);
    } else {
      this._count = 0;
      document.removeEventListener('click', this._addEvent);
    }
    return super.shouldUpdate(_changedProperties);
  }

  render() {
    return template.call(this);
  }
}
