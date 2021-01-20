import { DewsLayoutComponent } from './DewsLayoutComponent.js';
import { internalProperty, PropertyValues } from 'lit-element';

export default class DrawerRightBase extends DewsLayoutComponent {
  @internalProperty()
  active = false;

  protected domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  protected _open() {
    this.active = true;
    document.addEventListener('click', this.domEvent);
  }

  protected _close() {
    this.active = true;
    document.removeEventListener('click', this.domEvent);
  }

  private _domClickHandler(e: MouseEvent) {
    if (e.isTrusted) {
      if (
        e.clientX <
        window.innerWidth -
          this.shadowRoot!.querySelector('.drawer-layout')!.shadowRoot!.querySelector('.layer-right')!.clientWidth
      ) {
        if (this.active) {
          this._close();
        }
      }
    }
  }
}
