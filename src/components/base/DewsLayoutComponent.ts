import { DewsComponent } from './DewsComponent.js';
import { AreaType } from '../../app/base/AreaType.js';
import { FocusChangingEventArgs } from '../../app/FocusChangingEventArgs.js';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export class DewsLayoutComponent extends DewsComponent {
  // Area click 이벤트를 받아서 custom event dispatch
  protected _focusChanging(e: Event) {
    const focusChangingEvent = new FocusChangingEventArgs('focusChanging', { bubbles: true, composed: true });
    //   Click Event 에서 넘어온 currentTarget 이 click Event Listener 걸어놓은 box 나 tabs 고, 실제 active class 를 추가 할 요소이기 때문에 전달함.
    focusChangingEvent.focusTarget = e.currentTarget as AreaType;
    this.dispatchEvent(focusChangingEvent);
  }
}
