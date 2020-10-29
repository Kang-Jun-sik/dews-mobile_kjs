import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { internalProperty, property, PropertyValues } from 'lit-element';

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
    this.addEventListener('click', this._clickEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickEvent);
  }

  public _blurEvent() {
    console.log('blur');
  }

  private _clickEvent(e: Event) {
    // 직접 일으킨 이벤트만 처리하기 위해 isTrusted 사용
    if (e.isTrusted) {
      this._focusChanging(e);
    }
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

  protected enable: Function = (value: boolean) => {
    return (this.collapsed = value);
  };

  private slotChange(e) {
    if (this.collapsed) {
      this.height = '0px';
    } else {
      this.height = 'auto';
    }
    this.updateComplete.then(() => {
      this.slotHeight = `${this.shadowRoot.querySelector('.dews-box-content-wrap')?.clientHeight}px`;
      if (!this.collapsed) {
        this.height = this.slotHeight;
      } else {
        this.slotHeight = `${this.shadowRoot.querySelector('.dews-box-content')?.clientHeight}px`;
      }
    });
  }

  render() {
    return this.hide ? null : _html.bind(this)();
  }
}
