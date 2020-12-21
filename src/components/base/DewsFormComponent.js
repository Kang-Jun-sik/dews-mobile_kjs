import { DewsComponent } from './DewsComponent.js';
import { LitElement } from 'lit-element';
/**
 * Form Component 관련
 *  - Checkboxgroup, Text, CheckBox 등등
 */
export class DewsFormComponent extends DewsComponent {
    constructor() {
        super(...arguments);
        this.version = 'test';
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV3c0Zvcm1Db21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEZXdzRm9ybUNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV6Qzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsYUFBYTtJQUFwRDs7UUFnQkUsWUFBTyxHQUFHLE1BQU0sQ0FBQztJQUNuQixDQUFDO0lBaEJDLGlCQUFpQjtRQUNmLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2xDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMzQixJQUFJLENBQUMsWUFBWSxVQUFVLEVBQUU7b0JBQzNCLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQztpQkFDekI7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1lBQ0YsdUNBQXVDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUdGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0NvbXBvbmVudCB9IGZyb20gJy4vRGV3c0NvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBMaXRFbGVtZW50IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG4vKipcbiAqIEZvcm0gQ29tcG9uZW50IOq0gOugqFxuICogIC0gQ2hlY2tib3hncm91cCwgVGV4dCwgQ2hlY2tCb3gg65Ox65OxXG4gKi9cbmV4cG9ydCBjbGFzcyBEZXdzRm9ybUNvbXBvbmVudCBleHRlbmRzIERld3NDb21wb25lbnQge1xuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMudXBkYXRlQ29tcGxldGUudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIEFycmF5LmZyb20oY2hpbGRyZW4pLm1hcChjID0+IHtcbiAgICAgICAgICBpZiAoYyBpbnN0YW5jZW9mIExpdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBjLnVwZGF0ZUNvbXBsZXRlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLCAnVXBkYXRlQ29tcGxldGUnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZlcnNpb24gPSAndGVzdCc7XG59XG4iXX0=