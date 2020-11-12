import { DewsComponent } from './DewsComponent.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { FocusChangingEventArgs } from '../../main/FocusChangingEventArgs.js';
import { AreaType } from '../../main/AreaType.js';
import { LitElement } from 'lit-element';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export abstract class DewsLayoutComponent extends DewsComponent {
  // Area click 이벤트를 받아서 custom event dispatch
  protected _focusChanging(e: Event) {
    const focusChangingEvent = new FocusChangingEventArgs('focusChanging', { bubbles: true, composed: true });
    // Click Event 에서 넘어온 currentTarget 이 click Event Listener 걸어놓은 box 나 tabs 고, 실제 active class 를 추가 할 요소이기 때문에 전달함.
    focusChangingEvent.focusTarget = e.currentTarget as AreaType;
    this.dispatchEvent(focusChangingEvent);
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(async () => {
      const children = this.shadowRoot.querySelectorAll('*');
      await Promise.all(
        Array.from(children).map(c => {
          if (c instanceof LitElement) {
            return c.updateComplete;
          }
        }),
      );
      // console.log(this, 'UpdateComplete');
    });
  }

  protected async update(changedProperties) {
    super.update(changedProperties);
    // const children = this.shadowRoot.querySelectorAll('*');
    // await Promise.all(
    //   Array.from(children).map(c => {
    //     if (c instanceof LitElement) {
    //       return c.updateComplete;
    //     }
    //   }),
    // );
    // console.log(this, 'UpdateComplete');
  }
}