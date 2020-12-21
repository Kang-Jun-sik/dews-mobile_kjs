import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import template from './areapanel.html';
import scss from './areapanel.scss';
export class AreaPanel extends DewsLayoutComponent {
    // static get scopedElements() {
    //   return {
    //     'area-item': AreaItem,
    //     'dews-box': customElements.get('dews-box')
    //   };
    // }
    render() {
        // if (this.parentElement?.localName === 'area-item') {
        //   if (this.parentElement.attributes.getNamedItem('col').value !== '8') {
        //     return;
        //   }
        // }
        return template.call(this);
    }
}
AreaPanel.styles = scss;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXJlYXBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBRXJFLE9BQU8sUUFBUSxNQUFNLGtCQUFrQixDQUFDO0FBQ3hDLE9BQU8sSUFBSSxNQUFNLGtCQUFrQixDQUFDO0FBRXBDLE1BQU0sT0FBTyxTQUFVLFNBQVEsbUJBQW1CO0lBR2hELGdDQUFnQztJQUNoQyxhQUFhO0lBQ2IsNkJBQTZCO0lBQzdCLGlEQUFpRDtJQUNqRCxPQUFPO0lBQ1AsSUFBSTtJQUVKLE1BQU07UUFDSix1REFBdUQ7UUFDdkQsMkVBQTJFO1FBQzNFLGNBQWM7UUFDZCxNQUFNO1FBQ04sSUFBSTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztBQWhCTSxnQkFBTSxHQUFHLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NMYXlvdXRDb21wb25lbnQuanMnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9hcmVhcGFuZWwuaHRtbCc7XG5pbXBvcnQgc2NzcyBmcm9tICcuL2FyZWFwYW5lbC5zY3NzJztcblxuZXhwb3J0IGNsYXNzIEFyZWFQYW5lbCBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICAvLyBzdGF0aWMgZ2V0IHNjb3BlZEVsZW1lbnRzKCkge1xuICAvLyAgIHJldHVybiB7XG4gIC8vICAgICAnYXJlYS1pdGVtJzogQXJlYUl0ZW0sXG4gIC8vICAgICAnZGV3cy1ib3gnOiBjdXN0b21FbGVtZW50cy5nZXQoJ2Rld3MtYm94JylcbiAgLy8gICB9O1xuICAvLyB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIGlmICh0aGlzLnBhcmVudEVsZW1lbnQ/LmxvY2FsTmFtZSA9PT0gJ2FyZWEtaXRlbScpIHtcbiAgICAvLyAgIGlmICh0aGlzLnBhcmVudEVsZW1lbnQuYXR0cmlidXRlcy5nZXROYW1lZEl0ZW0oJ2NvbCcpLnZhbHVlICE9PSAnOCcpIHtcbiAgICAvLyAgICAgcmV0dXJuO1xuICAgIC8vICAgfVxuICAgIC8vIH1cbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19