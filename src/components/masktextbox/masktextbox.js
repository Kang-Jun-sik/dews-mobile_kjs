import { __decorate, __metadata } from "tslib";
import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './masktextbox.html';
import scss from './masktextbox.scss';
export class Masktextbox extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.placeholder = '';
        this.format = 'password';
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.mask = '000-000';
        this.prompt = '_';
        this.value = '';
        this.onFocus = new CustomEvent('focus', { detail: { target: '' } });
        this.onChange = new CustomEvent('change', { detail: { target: '' } });
        this.event = new Event('input');
        this._disabled = true;
        this.error = (message) => {
            this._show(message, 'error');
        };
        this.warning = (message) => {
            this._show(message, 'warning');
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('focus', this._onFocus);
        // disabled 와 readonly 중 disabled 를 우선 처리한다.
        if (this.disabled && this.readonly) {
            this.readonly = false;
        }
        else if (this.readonly) {
            this._disabled = false;
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('focus', this._onFocus);
    }
    _spanClick() {
        if (this.disabled || this.readonly) {
            return;
        }
        const $el = this.shadowRoot.querySelectorAll('span');
        $el[0].style.display = 'none';
        $el[1].style.display = 'block';
        this.shadowRoot.querySelectorAll('input')[1].focus();
    }
    _inputChange(e) {
        var _a;
        this.value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
        this.dispatchEvent(this.event);
    }
    _blur() {
        const $el = this.shadowRoot.querySelectorAll('input');
        const $span = this.shadowRoot.querySelectorAll('span');
        $el[0].value = $el[1].value;
        $span[0].style.display = 'block';
        $span[1].style.display = 'none';
    }
    _onFocus() {
        // this.dispatchEvent(this.onFocus);
    }
    _onChange(e) {
        var _a;
        this.value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value;
        // this.dispatchEvent(this.onChange);
    }
    _show(message, type) {
        // 경고 표시 등을 나타나게 한다.
        // if(type==='error'){
        //
        // }else if(type==='warning'){
        //
        // }
    }
    render() {
        return template.call(this);
    }
}
Masktextbox.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "title", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "placeholder", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "format", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "required", void 0);
__decorate([
    property({ attribute: 'data-mask' }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "mask", void 0);
__decorate([
    property({ attribute: 'data-prompt' }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "prompt", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Masktextbox.prototype, "value", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza3RleHRib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXNrdGV4dGJveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUd0QyxNQUFNLE9BQU8sV0FBWSxTQUFRLGlCQUFpQjtJQUFsRDs7UUFJRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHakIsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQUdwQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixTQUFJLEdBQUcsU0FBUyxDQUFDO1FBR2pCLFdBQU0sR0FBRyxHQUFHLENBQUM7UUFHYixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBRUgsWUFBTyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0QsYUFBUSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakUsVUFBSyxHQUFHLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLGNBQVMsR0FBRyxJQUFJLENBQUM7UUEwRHpCLFVBQUssR0FBYSxDQUFDLE9BQWUsRUFBRSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQztRQUNG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QUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7Z0RBQ1Y7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7OzJDQUNQO0FBR3BCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzZDQUMxQjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs2Q0FDMUI7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NkNBQzFCO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDOzt5Q0FDcEI7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLENBQUM7OzJDQUMxQjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzswQ0FDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9wZXJ0eSB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmltcG9ydCB7IERld3NGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzRm9ybUNvbXBvbmVudC5qcyc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9tYXNrdGV4dGJveC5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vbWFza3RleHRib3guc2Nzcyc7XG5pbXBvcnQgeyBDaGFuZ2VFdmVudCB9IGZyb20gJ3JvbGx1cCc7XG5cbmV4cG9ydCBjbGFzcyBNYXNrdGV4dGJveCBleHRlbmRzIERld3NGb3JtQ29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHBsYWNlaG9sZGVyID0gJyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIGZvcm1hdCA9ICdwYXNzd29yZCc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbiAgcmVhZG9ubHkgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIHJlcXVpcmVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgYXR0cmlidXRlOiAnZGF0YS1tYXNrJyB9KVxuICBtYXNrID0gJzAwMC0wMDAnO1xuXG4gIEBwcm9wZXJ0eSh7IGF0dHJpYnV0ZTogJ2RhdGEtcHJvbXB0JyB9KVxuICBwcm9tcHQgPSAnXyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHZhbHVlID0gJyc7XG5cbiAgcHJpdmF0ZSBvbkZvY3VzID0gbmV3IEN1c3RvbUV2ZW50KCdmb2N1cycsIHsgZGV0YWlsOiB7IHRhcmdldDogJycgfSB9KTtcbiAgcHJpdmF0ZSBvbkNoYW5nZSA9IG5ldyBDdXN0b21FdmVudCgnY2hhbmdlJywgeyBkZXRhaWw6IHsgdGFyZ2V0OiAnJyB9IH0pO1xuICBwcml2YXRlIGV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcpO1xuICBwcml2YXRlIF9kaXNhYmxlZCA9IHRydWU7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cyk7XG4gICAgLy8gZGlzYWJsZWQg7JmAIHJlYWRvbmx5IOykkSBkaXNhYmxlZCDrpbwg7Jqw7ISgIOyymOumrO2VnOuLpC5cbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLnJlYWRvbmx5ID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICB0aGlzLl9kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMuX29uRm9jdXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3BhbkNsaWNrKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8IHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgJGVsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yQWxsKCdzcGFuJyk7XG4gICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgJGVsWzFdLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKVsxXS5mb2N1cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5wdXRDaGFuZ2UoZTogQ2hhbmdlRXZlbnQgJiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udmFsdWU7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmx1cigpIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0Jyk7XG4gICAgY29uc3QgJHNwYW4gPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NwYW4nKTtcbiAgICAkZWxbMF0udmFsdWUgPSAkZWxbMV0udmFsdWU7XG4gICAgJHNwYW5bMF0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgJHNwYW5bMV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG4gIHByaXZhdGUgX29uRm9jdXMoKSB7XG4gICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMub25Gb2N1cyk7XG4gIH1cbiAgcHJpdmF0ZSBfb25DaGFuZ2UoZTogQ2hhbmdlRXZlbnQgJiBJbnB1dEV2ZW50KSB7XG4gICAgdGhpcy52YWx1ZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udmFsdWU7XG4gICAgLy8gdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMub25DaGFuZ2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvdyhtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgIC8vIOqyveqzoCDtkZzsi5wg65Ox7J2EIOuCmO2DgOuCmOqyjCDtlZzri6QuXG4gICAgLy8gaWYodHlwZT09PSdlcnJvcicpe1xuICAgIC8vXG4gICAgLy8gfWVsc2UgaWYodHlwZT09PSd3YXJuaW5nJyl7XG4gICAgLy9cbiAgICAvLyB9XG4gIH1cblxuICBlcnJvcjogRnVuY3Rpb24gPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5fc2hvdyhtZXNzYWdlLCAnZXJyb3InKTtcbiAgfTtcbiAgd2FybmluZzogRnVuY3Rpb24gPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5fc2hvdyhtZXNzYWdlLCAnd2FybmluZycpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19