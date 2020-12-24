import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { property } from 'lit-element';
import template from './tab.html';
import scss from './tab.scss';
export class Tab extends DewsLayoutComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.hide = false;
    }
    async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete;
        console.log('Tab UpdateComplete');
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        return this.hide ? null : template.call(this);
    }
}
Tab.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Tab.prototype, "title", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Tab.prototype, "hide", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFFOUIsTUFBTSxPQUFPLEdBQUksU0FBUSxtQkFBbUI7SUFBNUM7O1FBSUUsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdYLFNBQUksR0FBRyxLQUFLLENBQUM7SUFlZixDQUFDO0lBYkMsS0FBSyxDQUFDLGlCQUFpQjtRQUNyQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoRCxDQUFDOztBQXBCTSxVQUFNLEdBQUcsSUFBSSxDQUFDO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztrQ0FDaEI7QUFHWDtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzs7aUNBQ2YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXdzTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzTGF5b3V0Q29tcG9uZW50LmpzJztcbmltcG9ydCB7IHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90YWIuaHRtbCc7XG5pbXBvcnQgc2NzcyBmcm9tICcuL3RhYi5zY3NzJztcblxuZXhwb3J0IGNsYXNzIFRhYiBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdGl0bGUgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGhpZGUgPSBmYWxzZTtcblxuICBhc3luYyBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIGF3YWl0IHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgY29uc29sZS5sb2coJ1RhYiBVcGRhdGVDb21wbGV0ZScpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5oaWRlID8gbnVsbCA6IHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==