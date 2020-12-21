import { __decorate, __metadata } from "tslib";
import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './button.html';
import scss from './button.scss';
export var TYPE_LIST;
(function (TYPE_LIST) {
    TYPE_LIST["default"] = "default";
    TYPE_LIST["text"] = "text";
    TYPE_LIST["icon"] = "icon";
})(TYPE_LIST || (TYPE_LIST = {}));
export var SIZE_LIST;
(function (SIZE_LIST) {
    SIZE_LIST["default"] = "default";
    SIZE_LIST["small"] = "small";
    SIZE_LIST["large"] = "large";
})(SIZE_LIST || (SIZE_LIST = {}));
export var ICON_LIST;
(function (ICON_LIST) {
    ICON_LIST["reset"] = "reset";
})(ICON_LIST || (ICON_LIST = {}));
// noinspection JSUnusedLocalSymbols
export class Button extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = 'title';
        this.type = TYPE_LIST.default;
        this.size = SIZE_LIST.default;
        this.disabled = false;
    }
    connectedCallback() {
        super.connectedCallback();
        // this.addEventListener('focus', this._focusChanging);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        // this.removeEventListener('focus', this._focusChanging);
    }
    _clickHandler() {
        // 클릭이벤트 핸들러
    }
    render() {
        return template.call(this);
    }
}
Button.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Button.prototype, "title", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Button.prototype, "type", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], Button.prototype, "size", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Button.prototype, "icon", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Button.prototype, "link", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Button.prototype, "disabled", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE9BQU8sUUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNyQyxPQUFPLElBQUksTUFBTSxlQUFlLENBQUM7QUFFakMsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQixnQ0FBcUIsQ0FBQTtJQUNyQiwwQkFBZSxDQUFBO0lBQ2YsMEJBQWUsQ0FBQTtBQUNqQixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFFRCxNQUFNLENBQU4sSUFBWSxTQUlYO0FBSkQsV0FBWSxTQUFTO0lBQ25CLGdDQUFxQixDQUFBO0lBQ3JCLDRCQUFpQixDQUFBO0lBQ2pCLDRCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFKVyxTQUFTLEtBQVQsU0FBUyxRQUlwQjtBQUVELE1BQU0sQ0FBTixJQUFZLFNBRVg7QUFGRCxXQUFZLFNBQVM7SUFDbkIsNEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUZXLFNBQVMsS0FBVCxTQUFTLFFBRXBCO0FBRUQsb0NBQW9DO0FBQ3BDLE1BQU0sT0FBTyxNQUFPLFNBQVEsaUJBQWlCO0lBQTdDOztRQUlFLFVBQUssR0FBRyxPQUFPLENBQUM7UUFHaEIsU0FBSSxHQUFjLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFHcEMsU0FBSSxHQUFjLFNBQVMsQ0FBQyxPQUFPLENBQUM7UUFTcEMsYUFBUSxHQUFHLEtBQUssQ0FBQztJQW1CbkIsQ0FBQztJQWpCQyxpQkFBaUI7UUFDZixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQix1REFBdUQ7SUFDekQsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3QiwwREFBMEQ7SUFDNUQsQ0FBQztJQUVPLGFBQWE7UUFDbkIsWUFBWTtJQUNkLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O0FBcENNLGFBQU0sR0FBRyxJQUFJLENBQUM7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O3FDQUNYO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztvQ0FDUztBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7b0NBQ1M7QUFHcEM7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O29DQUNDO0FBRzVCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOztvQ0FDRjtBQUd6QjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzs7d0NBQ1giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wZXJ0eSB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmltcG9ydCB7IERld3NGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzRm9ybUNvbXBvbmVudC5qcyc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2J1dHRvbi5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vYnV0dG9uLnNjc3MnO1xuXG5leHBvcnQgZW51bSBUWVBFX0xJU1Qge1xuICAnZGVmYXVsdCcgPSAnZGVmYXVsdCcsXG4gICd0ZXh0JyA9ICd0ZXh0JyxcbiAgJ2ljb24nID0gJ2ljb24nXG59XG5cbmV4cG9ydCBlbnVtIFNJWkVfTElTVCB7XG4gICdkZWZhdWx0JyA9ICdkZWZhdWx0JyxcbiAgJ3NtYWxsJyA9ICdzbWFsbCcsXG4gICdsYXJnZScgPSAnbGFyZ2UnXG59XG5cbmV4cG9ydCBlbnVtIElDT05fTElTVCB7XG4gICdyZXNldCcgPSAncmVzZXQnXG59XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIERld3NGb3JtQ29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJ3RpdGxlJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdHlwZTogVFlQRV9MSVNUID0gVFlQRV9MSVNULmRlZmF1bHQ7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHNpemU6IFNJWkVfTElTVCA9IFNJWkVfTElTVC5kZWZhdWx0O1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBpY29uOiBJQ09OX0xJU1QgfCB1bmRlZmluZWQ7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIGxpbms6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAvLyB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fZm9jdXNDaGFuZ2luZyk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIC8vIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLl9mb2N1c0NoYW5naW5nKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NsaWNrSGFuZGxlcigpIHtcbiAgICAvLyDtgbTrpq3snbTrsqTtirgg7ZW465Ok65+sXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==