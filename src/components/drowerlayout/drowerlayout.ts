import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { internalProperty, property, PropertyValues } from 'lit-element';

import _html from './drowerlayout.html';
import _scss from './drowerlayout.scss';

export class Drowerlayout extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string | undefined;

  @property({ type: Boolean, reflect: true })
  active: boolean = false;

  @property({ type: String })
  height: string | undefined;

  @internalProperty()
  private _height = '0px';

  @property({ type: String, reflect: true })
  drower: 'bottom' | 'right' = 'bottom';

  private _moveStart: number;
  private _moveEnd: number;
  private _defaultHeight: number;
  private _moveState: boolean = false;
  private close = new Event('close');

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  _blur() {
    console.log('blur');
  }

  private _mouseMove(e) {
    const $el: HTMLElement = this.shadowRoot.querySelector('.layer-bottom');
    if (this._moveState) {
      this._height = `${this._defaultHeight + (this._moveStart - e.screenY)}px`;
    }
  }

  private _mouseDown(e) {
    this._moveState = true;
    this._moveStart = e.screenY;
    this._defaultHeight = this.shadowRoot.querySelector('.layer-bottom').clientHeight;
    // this.shadowRoot.querySelector('.layer-drawer').classList.add('moving');
  }

  private _mouseUp(e) {
    this._moveState = false;
    this._moveEnd = e.screenY;
    // this.shadowRoot.querySelector('.layer-drawer').classList.remove('moving');
    if (Math.abs(this._moveStart - this._moveEnd) < 5) {
      this.dispatchEvent(this.close);
    }
  }

  private _touchMove(e) {
    e.preventDefault();
    e.passive = true;
    e.capture = true;
    const $el: HTMLElement = this.shadowRoot.querySelector('.layer-bottom');
    if (this._moveState) {
      this._height = `${this._defaultHeight + (this._moveStart - e.changedTouches[0].screenY)}px`;
    }
  }

  private _touchEnd(e) {
    // e.preventDefault();
    this._moveState = false;
    this._moveEnd = e.changedTouches[0].screenY;
    this.shadowRoot.querySelector('.layer-bottom').classList.remove('little_moving');
    if (Math.abs(this._moveStart - this._moveEnd) < 5) {
      this.dispatchEvent(this.close);
    }
  }

  private _touchStart(e) {
    this._moveStart = e.changedTouches[0].screenY;
    this._defaultHeight = this.shadowRoot.querySelector('.layer-bottom').clientHeight;
    this.shadowRoot.querySelector('.layer-bottom').classList.add('little_moving');
    this._moveState = true;
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    if (_changedProperties.get('active') !== undefined) {
      if (this._height !== '0px') {
        this._height = '0px';
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

  render() {
    return _html.bind(this)();
  }
}
