import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property } from 'lit-element';
import template from './formsection.html';
import scss from './formsection.scss';
export class FormSection extends DewsLayoutComponent {
    constructor() {
        super();
        this.title = '';
        this._inputList = [];
        for (let i = 0; i < this.childElementCount; i++) {
            this._inputList.push(html `<li>${this.children.item(i)}</li>`);
        }
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        return template.call(this);
    }
}
FormSection.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormSection.prototype, "title", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], FormSection.prototype, "_inputList", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXNlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmb3Jtc2VjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDckUsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBRS9FLE9BQU8sUUFBUSxNQUFNLG9CQUFvQixDQUFDO0FBQzFDLE9BQU8sSUFBSSxNQUFNLG9CQUFvQixDQUFDO0FBRXRDLE1BQU0sT0FBTyxXQUFZLFNBQVEsbUJBQW1CO0lBR2xEO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUFPVixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR0gsZUFBVSxHQUEwQixFQUFFLENBQUM7UUFUN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDO0lBUUQsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztBQXhCTSxrQkFBTSxHQUFHLElBQUksQ0FBQztBQVVyQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7MENBQ2hCO0FBR1g7SUFEQyxnQkFBZ0IsRUFBRTs4QkFDQyxLQUFLOytDQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NMYXlvdXRDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgaHRtbCwgaW50ZXJuYWxQcm9wZXJ0eSwgcHJvcGVydHksIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9mb3Jtc2VjdGlvbi5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vZm9ybXNlY3Rpb24uc2Nzcyc7XG5cbmV4cG9ydCBjbGFzcyBGb3JtU2VjdGlvbiBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaGlsZEVsZW1lbnRDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLl9pbnB1dExpc3QucHVzaChodG1sYDxsaT4ke3RoaXMuY2hpbGRyZW4uaXRlbShpKX08L2xpPmApO1xuICAgIH1cbiAgfVxuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICB0aXRsZSA9ICcnO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBfaW5wdXRMaXN0OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==