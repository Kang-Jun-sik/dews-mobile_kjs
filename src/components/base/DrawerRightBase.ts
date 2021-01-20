import { DewsLayoutComponent } from './DewsLayoutComponent.js';
import { internalProperty, PropertyValues } from 'lit-element';

export default class DrawerRightBase extends DewsLayoutComponent {
  @internalProperty()
  active = false;

  protected domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  private count = 0;

  protected _open() {
    this.active = true;
    document.addEventListener('click', this.domEvent);
  }

  protected _close() {
    this.active = false;
    document.removeEventListener('click', this.domEvent);
    this.count = 0;
  }

  private _domClickHandler(e: MouseEvent) {
    if (e.isTrusted && (e.target as HTMLElement).tagName !== 'DEWS-MESSAGEBOX') {
      if (
        e.clientX <
        window.innerWidth -
          this.shadowRoot!.querySelector('.drawer-layout')!.shadowRoot!.querySelector('.layer-right')!.clientWidth
      ) {
        if (this.count > 0) {
          this._close();
        } else {
          this.count++;
        }
      }
    }
  }
}
