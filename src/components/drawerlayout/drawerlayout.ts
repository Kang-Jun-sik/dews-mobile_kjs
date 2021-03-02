import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { internalProperty, property, PropertyValues } from 'lit-element';

import template from './drawerlayout.html';
import scss from './drawerlayout.scss';
import { EventArgs, EventEmitter } from '@dews/dews-mobile-core';

type EVENT_TYPE = 'heightChange';

export class Drawerlayout extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  right = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  dimming = false;

  @property({ type: String })
  size: 'large' | 'full' = 'large';

  @property({ type: String })
  height: string | undefined = '200px';

  @property({ type: Boolean })
  scrollEnabled = false;

  @internalProperty()
  private _height = '-5px';
  private _moveStart: number | undefined;
  private _moveEnd: number | undefined;
  private _defaultHeight: number | undefined;
  private _moveState: boolean | undefined = false;
  private _moveCheck = false;
  private close: Event = new Event('close');
  private _portrait = window.matchMedia('(orientation: portrait)').matches;

  connectedCallback() {
    super.connectedCallback();
    this._height = `calc(100% - ${this.height})`;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /*
   * 이벤트 생성
   * */
  #EVENT = new EventEmitter();

  public on(key: EVENT_TYPE, handler: (e: { target: Element; type: string; height?: number }) => void) {
    this.#EVENT.on(key, handler);
  }

  public off(key: EVENT_TYPE, handler: (e: { target: Element; type: string; height?: number }) => void) {
    this.#EVENT.off(key, handler);
  }

  private _blur(): void {
    console.log('blur');
  }

  private _mouseMove(e: MouseEvent): void {
    if (this._moveState) {
      this._height = `${this._defaultHeight! + (this._moveStart! - e.screenY)}px`;
      this.#EVENT.emit('heightChange', {
        target: this,
        type: 'heightChange',
        height: this._defaultHeight! + (this._moveStart! - e.screenY)
      });
    }
  }

  private _mouseDown(e: MouseEvent) {
    this._moveState = true;
    this._moveStart = e.screenY;
    this._defaultHeight = this.shadowRoot!.querySelector('.layer-bottom')?.clientHeight;
    // this.shadowRoot.querySelector('.layer-drawer').classList.add('moving');
  }

  private _mouseUp(e: MouseEvent) {
    this._moveState = false;
    this._moveEnd = e.screenY;
    // this.shadowRoot.querySelector('.layer-drawer').classList.remove('moving');
    if (Math.abs(this._moveStart! - this._moveEnd!) < 5) {
      this.dispatchEvent(this.close);
    }
  }

  private _touchStop(e: TouchEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  private _touchMove(e: TouchEvent & AddEventListenerOptions) {
    e.preventDefault();
    e.passive = true;
    e.capture = true;
    if (this.scrollEnabled) {
      if (this._moveState) {
        if (
          window.innerHeight - 30 >= this._defaultHeight! + (this._moveStart! - e.changedTouches[0].screenY) &&
          24 <= this._defaultHeight! + (this._moveStart! - e.changedTouches[0].screenY)
        ) {
          this._moveCheck = true;
          this._height = `${this._defaultHeight! + (this._moveStart! - e.changedTouches[0].screenY)}px`;
          this.#EVENT.emit('heightChange', {
            target: this,
            type: 'heightChange',
            height: this._defaultHeight! + (this._moveStart! - e.changedTouches[0].screenY)
          });
        }
      }
    }
  }

  private _touchEnd(e: TouchEvent) {
    this._moveState = false;
    this._moveEnd = e.changedTouches[0].screenY;
    this.shadowRoot!.querySelector('.layer-bottom')?.classList.remove('little_moving');
    if (Math.abs(this._moveStart! - this._moveEnd!) < 8) {
      this.dispatchEvent(this.close);
      this._moveCheck = false;
    }
  }

  private _close() {
    this.dispatchEvent(this.close);
  }

  private _touchStart(e: TouchEvent) {
    this._moveStart = e.changedTouches[0].screenY;
    this._defaultHeight = this.shadowRoot!.querySelector('.layer-bottom')?.clientHeight;
    this.shadowRoot!.querySelector('.layer-bottom')?.classList.add('little_moving');
    this._moveState = true;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._portrait = window.matchMedia('(orientation: portrait)').matches;
    const $el = this.shadowRoot?.querySelector('.layer-bottom') as HTMLElement;
    if ($el) {
      $el.style.visibility = 'hidden';
    }

    $el?.addEventListener('transitionend', () => {
      if (!this.active) {
        $el.style.visibility = 'hidden';
      }
    });

    $el?.addEventListener('transitionstart', () => {
      if (this.active) {
        $el.style.visibility = 'visible';
      }
    });
  }

  private _beforeTop = 0;

  keypadStateChange() {
    const layerBottom = this.shadowRoot?.querySelector('.layer-bottom') as HTMLElement;
    if (this.orientationChange) {
      this.orientationChange = false;
      this._height = `calc(100% - ${this.height})`;
      this._moveCheck = false;
      this.#EVENT.emit('heightChange', {
        target: this,
        type: 'heightChange'
      });
      return;
    } else {
      if (window.innerWidth + window.innerHeight + 100 < this._originalSize) {
        if (window.innerWidth + window.innerHeight !== this._originalSize) {
          if (this.active) {
            layerBottom.style.top = `${this._beforeTop}px`;
            this._height = `${window.innerHeight}px`;
          }
        } else {
          if (this.active) {
            layerBottom.style.top = '';
            this._height = `calc(100% - ${this.height})`;
          }
        }
      }
    }
  }

  private keypadStateChangeEvent = this.keypadStateChange.bind(this);
  private _originalSize = 0;
  private _outerHeight = 0;

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (_changedProperties.get('active') !== undefined && !this.right) {
      if ((!_changedProperties.get('active') && this._moveCheck) || this.height === '200px') {
        this._height = `calc(100% - ${this.height})`;
        this._moveCheck = false;
        const layerBottom = this.shadowRoot?.querySelector('.layer-bottom') as HTMLElement;
        this._beforeTop = layerBottom.offsetTop;
      }
      if (!_changedProperties.get('active')) {
        this._originalSize = window.innerWidth + window.innerHeight;
        this._outerHeight = window.outerHeight;
        window.addEventListener('resize', this.keypadStateChangeEvent);
        window.addEventListener('orientationchange', this.orientationChangeEvent);
      } else {
        window.removeEventListener('resize', this.keypadStateChangeEvent);
        window.removeEventListener('orientationchange', this.orientationChangeEvent);
      }
    }
    return super.shouldUpdate(_changedProperties);
  }

  private orientationChangeEvent = this.orientation.bind(this);
  private orientationChange = false;

  private orientation() {
    this.orientationChange = true;
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
  }

  render() {
    return template.call(this);
  }
}
