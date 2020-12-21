import { DewsComponent } from './DewsComponent.js';
import { LitElement } from 'lit-element';
// import { AreaType } from '../../app/main/AreaType.js';
// import { FocusChangingEventArgs } from '../../core/utils/events/EventArgs.js';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export class DewsLayoutComponent extends DewsComponent {
    // Area click 이벤트를 받아서 custom event dispatch
    _focusChanging(e) {
        console.log(e);
        //   const focusChangingEvent = new FocusChangingEventArgs('focusChanging', { bubbles: true, composed: true });
        //   Click Event 에서 넘어온 currentTarget 이 click Event Listener 걸어놓은 box 나 tabs 고, 실제 active class 를 추가 할 요소이기 때문에 전달함.
        // focusChangingEvent.focusTarget = e.currentTarget as AreaType;
        // this.dispatchEvent(focusChangingEvent);
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(async () => {
            const children = this.shadowRoot.querySelectorAll('*');
            await Promise.all(Array.from(children).map(c => {
                if (c instanceof LitElement) {
                    return c.updateComplete;
                }
            }));
            // console.log(this, 'UpdateComplete');
        });
    }
    async update(changedProperties) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV3c0xheW91dENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRld3NMYXlvdXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMseURBQXlEO0FBQ3pELGlGQUFpRjtBQUNqRjs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsYUFBYTtJQUNwRCw0Q0FBNEM7SUFDbEMsY0FBYyxDQUFDLENBQVE7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLCtHQUErRztRQUMvRyxvSEFBb0g7UUFDcEgsZ0VBQWdFO1FBQ2hFLDBDQUEwQztJQUM1QyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4RCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxZQUFZLFVBQVUsRUFBRTtvQkFDM0IsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDO2lCQUN6QjtZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7WUFDRix1Q0FBdUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBeUQ7UUFDOUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hDLDBEQUEwRDtRQUMxRCxxQkFBcUI7UUFDckIsb0NBQW9DO1FBQ3BDLHFDQUFxQztRQUNyQyxpQ0FBaUM7UUFDakMsUUFBUTtRQUNSLFFBQVE7UUFDUixLQUFLO1FBQ0wsdUNBQXVDO0lBQ3pDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NDb21wb25lbnQgfSBmcm9tICcuL0Rld3NDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgTGl0RWxlbWVudCB9IGZyb20gJ2xpdC1lbGVtZW50Jztcbi8vIGltcG9ydCB7IEFyZWFUeXBlIH0gZnJvbSAnLi4vLi4vYXBwL21haW4vQXJlYVR5cGUuanMnO1xuLy8gaW1wb3J0IHsgRm9jdXNDaGFuZ2luZ0V2ZW50QXJncyB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbHMvZXZlbnRzL0V2ZW50QXJncy5qcyc7XG4vKipcbiAqIExheW91dCBDb21wb25lbnQg6rSA66CoXG4gKiAgLSBBcmVhLCBQYW5lbCDrk7Hrk7FcbiAqL1xuZXhwb3J0IGNsYXNzIERld3NMYXlvdXRDb21wb25lbnQgZXh0ZW5kcyBEZXdzQ29tcG9uZW50IHtcbiAgLy8gQXJlYSBjbGljayDsnbTrsqTtirjrpbwg67Cb7JWE7IScIGN1c3RvbSBldmVudCBkaXNwYXRjaFxuICBwcm90ZWN0ZWQgX2ZvY3VzQ2hhbmdpbmcoZTogRXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICAvLyAgIGNvbnN0IGZvY3VzQ2hhbmdpbmdFdmVudCA9IG5ldyBGb2N1c0NoYW5naW5nRXZlbnRBcmdzKCdmb2N1c0NoYW5naW5nJywgeyBidWJibGVzOiB0cnVlLCBjb21wb3NlZDogdHJ1ZSB9KTtcbiAgICAvLyAgIENsaWNrIEV2ZW50IOyXkOyEnCDrhJjslrTsmKggY3VycmVudFRhcmdldCDsnbQgY2xpY2sgRXZlbnQgTGlzdGVuZXIg6rG47Ja064aT7J2AIGJveCDrgpggdGFicyDqs6AsIOyLpOygnCBhY3RpdmUgY2xhc3Mg66W8IOy2lOqwgCDtlaAg7JqU7IaM7J206riwIOuVjOusuOyXkCDsoITri6ztlaguXG4gICAgLy8gZm9jdXNDaGFuZ2luZ0V2ZW50LmZvY3VzVGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0IGFzIEFyZWFUeXBlO1xuICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudChmb2N1c0NoYW5naW5nRXZlbnQpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLnVwZGF0ZUNvbXBsZXRlLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBBcnJheS5mcm9tKGNoaWxkcmVuKS5tYXAoYyA9PiB7XG4gICAgICAgICAgaWYgKGMgaW5zdGFuY2VvZiBMaXRFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYy51cGRhdGVDb21wbGV0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcywgJ1VwZGF0ZUNvbXBsZXRlJyk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzOiBNYXA8c3RyaW5nIHwgbnVtYmVyIHwgc3ltYm9sLCB1bmtub3duPikge1xuICAgIHN1cGVyLnVwZGF0ZShjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgLy8gY29uc3QgY2hpbGRyZW4gPSB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgIC8vIGF3YWl0IFByb21pc2UuYWxsKFxuICAgIC8vICAgQXJyYXkuZnJvbShjaGlsZHJlbikubWFwKGMgPT4ge1xuICAgIC8vICAgICBpZiAoYyBpbnN0YW5jZW9mIExpdEVsZW1lbnQpIHtcbiAgICAvLyAgICAgICByZXR1cm4gYy51cGRhdGVDb21wbGV0ZTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgfSksXG4gICAgLy8gKTtcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLCAnVXBkYXRlQ29tcGxldGUnKTtcbiAgfVxufVxuIl19