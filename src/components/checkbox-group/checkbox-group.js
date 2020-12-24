import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, property } from 'lit-element';
import template from './checkbox-group.html';
import scss from './checkbox-group.scss';
// noinspection JSUnusedLocalSymbols
export class CheckboxGroup extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = 'title';
        this.align = 'horizontal';
        this.$_checkBoxListTemp = [];
    }
    connectedCallback() {
        super.connectedCallback();
        this.querySelectorAll('dews-checkbox').forEach(checkBox => {
            this.$_checkBoxListTemp.push(html `<span class="group-item">${checkBox}</span>`);
        });
        if (this.align === 'vertical') {
            this._checkBox = html `<div class="checkbox-group vertical">${this.$_checkBoxListTemp}</div>`;
        }
        else {
            this._checkBox = html `<div class="checkbox-group">${this.$_checkBoxListTemp}</div>`;
        }
    }
    render() {
        return template.call(this);
    }
}
CheckboxGroup.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], CheckboxGroup.prototype, "title", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], CheckboxGroup.prototype, "align", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2JveC1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBRTdELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sSUFBSSxNQUFNLHVCQUF1QixDQUFDO0FBRXpDLG9DQUFvQztBQUNwQyxNQUFNLE9BQU8sYUFBYyxTQUFRLGlCQUFpQjtJQUFwRDs7UUFJRSxVQUFLLEdBQUcsT0FBTyxDQUFDO1FBR2hCLFVBQUssR0FBOEIsWUFBWSxDQUFDO1FBRXhDLHVCQUFrQixHQUEwQixFQUFFLENBQUM7SUFtQnpELENBQUM7SUFoQkMsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQSw0QkFBNEIsUUFBUSxTQUFTLENBQUMsQ0FBQztRQUNsRixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUEsd0NBQXdDLElBQUksQ0FBQyxrQkFBa0IsUUFBUSxDQUFDO1NBQzlGO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQSwrQkFBK0IsSUFBSSxDQUFDLGtCQUFrQixRQUFRLENBQUM7U0FDckY7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztBQTFCTSxvQkFBTSxHQUFHLElBQUksQ0FBQztBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NENBQ1g7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7OzRDQUNxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzRm9ybUNvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBodG1sLCBwcm9wZXJ0eSwgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2NoZWNrYm94LWdyb3VwLmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9jaGVja2JveC1ncm91cC5zY3NzJztcblxuLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzXG5leHBvcnQgY2xhc3MgQ2hlY2tib3hHcm91cCBleHRlbmRzIERld3NGb3JtQ29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJ3RpdGxlJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgYWxpZ246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgcHJpdmF0ZSAkX2NoZWNrQm94TGlzdFRlbXA6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuICBwcml2YXRlIF9jaGVja0JveDogVGVtcGxhdGVSZXN1bHQgfCB1bmRlZmluZWQ7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgIHRoaXMucXVlcnlTZWxlY3RvckFsbCgnZGV3cy1jaGVja2JveCcpLmZvckVhY2goY2hlY2tCb3ggPT4ge1xuICAgICAgdGhpcy4kX2NoZWNrQm94TGlzdFRlbXAucHVzaChodG1sYDxzcGFuIGNsYXNzPVwiZ3JvdXAtaXRlbVwiPiR7Y2hlY2tCb3h9PC9zcGFuPmApO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmFsaWduID09PSAndmVydGljYWwnKSB7XG4gICAgICB0aGlzLl9jaGVja0JveCA9IGh0bWxgPGRpdiBjbGFzcz1cImNoZWNrYm94LWdyb3VwIHZlcnRpY2FsXCI+JHt0aGlzLiRfY2hlY2tCb3hMaXN0VGVtcH08L2Rpdj5gO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jaGVja0JveCA9IGh0bWxgPGRpdiBjbGFzcz1cImNoZWNrYm94LWdyb3VwXCI+JHt0aGlzLiRfY2hlY2tCb3hMaXN0VGVtcH08L2Rpdj5gO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19