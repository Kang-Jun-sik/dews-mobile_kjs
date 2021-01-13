import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { customElement, internalProperty, property, PropertyValues } from 'lit-element';

import template from './drawerlayout.html';
import scss from './drawerlayout.scss';

@customElement('drawer-layout')
export class Drawerlayout extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String })
  height: string | undefined;

  @property({ type: Boolean })
  scrollEnabled = false;

  @internalProperty()
  private _height = '-5px';

  @property({ type: String, reflect: true })
  drower: 'bottom' | 'right' = 'bottom';

  private _moveStart: number | undefined;
  private _moveEnd: number | undefined;
  private _defaultHeight: number | undefined;
  private _moveState: boolean | undefined = false;
  private close: Event = new Event('close');

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _blur(): void {
    console.log('blur');
  }

  private _mouseMove(e: MouseEvent): void {
    if (this._moveState) {
      this._height = `${this._defaultHeight! + (this._moveStart! - e.screenY)}px`;
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

  private _touchMove(e: TouchEvent & AddEventListenerOptions) {
    if (this.scrollEnabled) {
      e.preventDefault();
      e.passive = true;
      e.capture = true;
      if (this._moveState) {
        this._height = `${this._defaultHeight! + (this._moveStart! - e.changedTouches[0].screenY)}px`;
      }
    }
  }

  private _touchEnd(e: TouchEvent) {
    // e.preventDefault();
    this._moveState = false;
    this._moveEnd = e.changedTouches[0].screenY;
    this.shadowRoot!.querySelector('.layer-bottom')?.classList.remove('little_moving');
    if (Math.abs(this._moveStart! - this._moveEnd!) < 5) {
      this.dispatchEvent(this.close);
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

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (_changedProperties.get('active') !== undefined) {
      if (this._height !== '-5px') {
        this._height = '-5px';
      } else {
        if (this.height === undefined) {
          this._height = `${window.innerHeight - 200}px`;
        } else {
          this._height = `calc(100% - ${this.height})`;
        }
      }
    }
    return super.shouldUpdate(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
  }

  render() {
    return template.call(this);
  }
}
