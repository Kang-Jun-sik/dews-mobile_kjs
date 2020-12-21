import { __decorate, __metadata } from "tslib";
import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './textbox.html';
import scss from './textbox.scss';
export class Textbox extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.placeholder = '';
        this.multi = false;
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.multiHeight = 50; // default 높이값...
        this.value = '';
        this.error = (message) => {
            this._show(message, 'error');
        };
        this.warning = (message) => {
            this._show(message, 'warning');
        };
    }
    connectedCallback() {
        super.connectedCallback();
        // disabled 와 readonly 중 disabled 를 우선 처리한다.
        if (this.disabled && this.readonly) {
            this.readonly = false;
        }
        // this.addEventListener('change', this._onChange);
        // disabled 와 readonly 중 disabled 를 우선 처리한다.
        if (this.disabled && this.readonly) {
            this.readonly = false;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    _onFocus(e) {
        this.dispatchEvent(new CustomEvent('focusin', { detail: { target: e.target } }));
    }
    _onChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('change', { detail: { target: e.target } }));
    }
    _show(message, type) {
        // 경고 표시 등을 나타나게 한다.
        if (type === 'error') {
            alert(message);
        }
        else if (type === 'warning') {
            alert(message);
        }
    }
    click() {
        var _a;
        (_a = this.shadowRoot.querySelector('input')) === null || _a === void 0 ? void 0 : _a.focus();
    }
    shouldUpdate(_changedProperties) {
        if (_changedProperties.get('value') !== undefined && !this.multi) {
            this.shadowRoot.querySelector('.dews-input').value = this.value;
        }
        else if (_changedProperties.get('value') !== undefined && this.multi) {
            this.shadowRoot.querySelector('.dews-multi-input').value = this.value;
        }
        return super.shouldUpdate(_changedProperties);
    }
    render() {
        return template.call(this);
    }
}
Textbox.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Textbox.prototype, "title", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Textbox.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Textbox.prototype, "multi", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Textbox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Textbox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Textbox.prototype, "required", void 0);
__decorate([
    property({ type: Number, attribute: 'multi-height' }),
    __metadata("design:type", Object)
], Textbox.prototype, "multiHeight", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], Textbox.prototype, "value", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHRib3gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBQ3ZELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWpFLE9BQU8sUUFBUSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RDLE9BQU8sSUFBSSxNQUFNLGdCQUFnQixDQUFDO0FBRWxDLE1BQU0sT0FBTyxPQUFRLFNBQVEsaUJBQWlCO0lBQTlDOztRQUlFLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHWCxnQkFBVyxHQUF1QixFQUFFLENBQUM7UUFHckMsVUFBSyxHQUFHLEtBQUssQ0FBQztRQUdkLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGdCQUFXLEdBQUcsRUFBRSxDQUFDLENBQUMsaUJBQWlCO1FBR25DLFVBQUssR0FBRyxFQUFFLENBQUM7UUF5Q1gsVUFBSyxHQUFhLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDO1FBQ0YsWUFBTyxHQUFhLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDO0lBYUosQ0FBQztJQXpEQyxpQkFBaUI7UUFDZixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQiw0Q0FBNEM7UUFDNUMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxtREFBbUQ7UUFDbkQsNENBQTRD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YyxFQUFFLENBQUM7OzRDQUNyQztBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wZXJ0eSwgUHJvcGVydHlWYWx1ZXMgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5pbXBvcnQgeyBEZXdzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0Zvcm1Db21wb25lbnQuanMnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZXh0Ym94Lmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi90ZXh0Ym94LnNjc3MnO1xuXG5leHBvcnQgY2xhc3MgVGV4dGJveCBleHRlbmRzIERld3NGb3JtQ29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIG11bHRpID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbiAgcmVhZG9ubHkgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIHJlcXVpcmVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogTnVtYmVyLCBhdHRyaWJ1dGU6ICdtdWx0aS1oZWlnaHQnIH0pXG4gIG11bHRpSGVpZ2h0ID0gNTA7IC8vIGRlZmF1bHQg64aS7J206rCSLi4uXG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nLCByZWZsZWN0OiB0cnVlIH0pXG4gIHZhbHVlID0gJyc7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICAvLyBkaXNhYmxlZCDsmYAgcmVhZG9ubHkg7KSRIGRpc2FibGVkIOulvCDsmrDshKAg7LKY66as7ZWc64ukLlxuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmVhZG9ubHkgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLl9vbkNoYW5nZSk7XG4gICAgLy8gZGlzYWJsZWQg7JmAIHJlYWRvbmx5IOykkSBkaXNhYmxlZCDrpbwg7Jqw7ISgIOyymOumrO2VnOuLpC5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJlYWRvbmx5ID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uRm9jdXMoZTogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2ZvY3VzaW4nLCB7IGRldGFpbDogeyB0YXJnZXQ6IGUudGFyZ2V0IGFzIEV2ZW50VGFyZ2V0IH0gfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2UoZTogSW5wdXRFdmVudCkge1xuICAgIHRoaXMudmFsdWUgPSAoZS50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkhLnZhbHVlO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NoYW5nZScsIHsgZGV0YWlsOiB7IHRhcmdldDogZS50YXJnZXQgYXMgRXZlbnRUYXJnZXQgfSB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93KG1lc3NhZ2U6IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XG4gICAgLy8g6rK96rOgIO2RnOyLnCDrk7HsnYQg64KY7YOA64KY6rKMIO2VnOuLpC5cbiAgICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnd2FybmluZycpIHtcbiAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignaW5wdXQnKT8uZm9jdXMoKTtcbiAgfVxuXG4gIGVycm9yOiBGdW5jdGlvbiA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLl9zaG93KG1lc3NhZ2UsICdlcnJvcicpO1xuICB9O1xuICB3YXJuaW5nOiBGdW5jdGlvbiA9IChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLl9zaG93KG1lc3NhZ2UsICd3YXJuaW5nJyk7XG4gIH07XG5cbiAgcHJvdGVjdGVkIHNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKTogYm9vbGVhbiB7XG4gICAgaWYgKF9jaGFuZ2VkUHJvcGVydGllcy5nZXQoJ3ZhbHVlJykgIT09IHVuZGVmaW5lZCAmJiAhdGhpcy5tdWx0aSkge1xuICAgICAgKHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRld3MtaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50KSEudmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgIH0gZWxzZSBpZiAoX2NoYW5nZWRQcm9wZXJ0aWVzLmdldCgndmFsdWUnKSAhPT0gdW5kZWZpbmVkICYmIHRoaXMubXVsdGkpIHtcbiAgICAgICh0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kZXdzLW11bHRpLWlucHV0JykgYXMgSFRNTElucHV0RWxlbWVudCkhLnZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpO1xuICB9XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19