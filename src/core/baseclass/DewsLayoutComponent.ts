import { DewsComponent } from './DewsComponent.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import { FocusChangingEventArgs } from '../../main/FocusChangingEventArgs.js';
import { Box } from '../../components/box/box.js';
import { Tabs } from '../../components/tabs/tabs.js';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export abstract class DewsLayoutComponent extends DewsComponent {
  // Area click 이벤트를 받아서 custom event dispatch
  protected _focusChanging(e: Event) {
    const focusChangingEvent = new FocusChangingEventArgs('focusChanging', { bubbles: true, composed: true });
    // Click Event 에서 넘어온 currentTarget 이 click Event Listener 걸어놓은 box 나 tabs 고, 실제 active class 를 추가 할 요소이기 때문에 전달함.
    focusChangingEvent.focusTarget = e.currentTarget as Box | Tabs;
    this.dispatchEvent(focusChangingEvent);
  }
}
