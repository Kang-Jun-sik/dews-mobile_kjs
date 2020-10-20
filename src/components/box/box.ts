import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { eventOptions, internalProperty, property, PropertyValues, html } from 'lit-element';

import _html from './box.html';
import _scss from './box.scss';

export class Box extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String, reflect: true })
  title: string = '';

  @property({ type: Boolean })
  collapsed: boolean = false;

  @property({ type: Boolean })
  hide: boolean = false;

  @internalProperty()
  height: string;

  private slotHeight: string;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this._focusInEvent);
    this.addEventListener('blur', this._blurEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focusin', this._focusInEvent);
    this.removeEventListener('blur', this._blurEvent);
  }

  private _blurEvent(e) {}

  private _focusInEvent(e) {
    const onFocus = new Event('onFocus');
    this.dispatchEvent(onFocus);

    /*
     * main menu 변경
     * */
    // this._focusChange(e);

    const onFocused = new Event('onFocused');
    this.dispatchEvent(onFocused);
  }

  private _onToggleClick(e) {
    this._toggleOpened(e);
  }

  private _toggleOpened(e) {
    if (!this.collapsed) {
      this.collapsed = true;
      this.height = '0px';
      const close = new CustomEvent('close');
      this.dispatchEvent(close);
    } else {
      // this.open();
      const open = new CustomEvent('open');
      this.dispatchEvent(open);
      this.collapsed = false;
      this.height = this.slotHeight;
    }
  }

  enable(value: boolean) {
    return (this.collapsed = value);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
  }

  private slotChange() {
    this.slotHeight = `${this.shadowRoot.querySelector('.dews-box-content').clientHeight}px`;
    if (!this.collapsed) {
      this.height = this.slotHeight;
    }
  }

  render() {
    return this.hide ? null : _html.bind(this)();
  }
}
