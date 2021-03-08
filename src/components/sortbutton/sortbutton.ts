import { DrawerBottomBase } from '../picker/drawer-bottom-base.js';
import template from './sortbutton.html';
import scss from './sortbutton.scss';
import { internalProperty, property, PropertyValues } from 'lit-element';
import { EventArgs } from '@dews/dews-mobile-core';
import { SortbuttonItem } from './sortbutton-item.js';
import { TouchScroll } from '../utill/touchscroll.js';

type EVENT_TYPE = 'open' | 'close' | 'select';

export class Sortbutton extends DrawerBottomBase {
  static styles = scss;

  @property({ type: Boolean })
  dimming = false;

  @property({ type: String, reflect: true })
  label = '';

  @internalProperty()
  ascending = false;

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  close() {
    this._close();
  }

  on = (key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) => {
    return this._EVENT.on(key, handler);
  };

  off = (key: EVENT_TYPE, handler: (e: EventArgs, ...args: unknown[]) => void) => {
    return this._EVENT.off(key, handler);
  };

  _emit(type: EVENT_TYPE, args: { target: SortbuttonItem; type: EVENT_TYPE; field?: string }) {
    return this._EVENT.emit(type, args);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    new TouchScroll(this.shadowRoot?.querySelector('.control')!);
  }

  render() {
    return template.call(this);
  }
}
