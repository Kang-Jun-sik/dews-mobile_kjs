import { FocusChangingEventArgs } from './FocusChangingEventArgs.js';
import { Box } from '../components/box/box.js';
import { Tabs } from '../components/tabs/tabs.js';
import { FocusChangedEventArgs } from './FocusChangedEventArgs.js';

export class FocusManager {
  // 현재 포커스 받는 대상 : Area(dews-box, dews-tabs)
  private focusElement: Box | Tabs = null;

  init() {
    dews.app.main.onFocusChanging = (arg: FocusChangingEventArgs) => {
      // console.log(arg);
      let beforeFocusElement = false;
      if (this.focusElement) {
        beforeFocusElement = true;
      }

      if (!arg.cancelable) {
        if (beforeFocusElement) {
          // 이전 focus 삭제
          this.focusElement.shadowRoot.querySelector('.dews-box-wrap').classList.remove('active');
          // box 에서만 임시로 이벤트 정의
          if (this.focusElement instanceof Box && this.focusElement !== arg.focusTarget) {
            this.focusElement._blurEvent();
          }
        }

        // focus 생성
        arg.focusTarget.shadowRoot.querySelector('.dews-box-wrap').classList.add('active');

        if (this.focusElement !== arg.focusTarget) {
          // focusChanged event dispatch
          const focusChangedEvent = new FocusChangedEventArgs('focusChanged', { bubbles: true, composed: true });
          focusChangedEvent.focusTarget = arg.focusTarget;
          arg.target.dispatchEvent(focusChangedEvent);
        }

        this.focusElement = arg.focusTarget;
      }
    };
  }
}
