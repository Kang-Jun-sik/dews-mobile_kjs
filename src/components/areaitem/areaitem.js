import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { property } from 'lit-element';
import template from './areaitem.html';
import scss from './areaitem.scss';
export class AreaItem extends DewsLayoutComponent {
    constructor() {
        super(...arguments);
        this.col = 12;
        this.hide = false;
    }
    render() {
        var _a;
        if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.localName) !== 'dews-area-panel') {
            return;
        }
        return this.hide ? null : template.call(this);
    }
}
AreaItem.styles = scss;
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], AreaItem.prototype, "col", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], AreaItem.prototype, "hide", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcmVhaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQztBQUVuQyxNQUFNLE9BQU8sUUFBUyxTQUFRLG1CQUFtQjtJQUFqRDs7UUFJRSxRQUFHLEdBQUcsRUFBRSxDQUFDO1FBR1QsU0FBSSxHQUFHLEtBQUssQ0FBQztJQVFmLENBQUM7SUFOQyxNQUFNOztRQUNKLElBQUksT0FBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxTQUFTLE1BQUssaUJBQWlCLEVBQUU7WUFDdkQsT0FBTztTQUNSO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUFiTSxlQUFNLEdBQUcsSUFBSSxDQUFDO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztxQ0FDbEI7QUFHVDtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXdzTGF5b3V0Q29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzTGF5b3V0Q29tcG9uZW50LmpzJztcbmltcG9ydCB7IHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9hcmVhaXRlbS5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vYXJlYWl0ZW0uc2Nzcyc7XG5cbmV4cG9ydCBjbGFzcyBBcmVhSXRlbSBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBOdW1iZXIgfSlcbiAgY29sID0gMTI7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuICBoaWRlID0gZmFsc2U7XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnBhcmVudEVsZW1lbnQ/LmxvY2FsTmFtZSAhPT0gJ2Rld3MtYXJlYS1wYW5lbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaGlkZSA/IG51bGwgOiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=