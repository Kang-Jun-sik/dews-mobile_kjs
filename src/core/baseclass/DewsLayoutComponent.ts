import { DewsComponent } from './DewsComponent.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export abstract class DewsLayoutComponent extends DewsComponent {
  // focusChange(target) {
  //   console.log('focusChange');
  //   this.dispatchEvent(
  //     new CustomEvent('focusedAreaChanged', { bubbles: true, composed: true, detail: { $target: target } }),
  //   );
  // }

  protected _focusChange(e: object) {
    this.dispatchEvent(
      new CustomEvent('focusedAreaChanged', { bubbles: true, composed: true, detail: { $target: e } }),
    );
  }
}
