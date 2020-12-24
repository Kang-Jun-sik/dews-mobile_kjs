import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';
import template from './checkbox.html';
import scss from './checkbox.scss';
// noinspection JSUnusedLocalSymbols
export class Checkbox extends DewsFormComponent {
    constructor() {
        super();
        this.title = '';
        this.disabled = false;
        this.checked = false;
        this.bookmark = false;
        this._className = 'dews-checkbox-wrap';
        /*
         * 이벤트 생성
         * */
        this.changeEvent = new CustomEvent('change');
        this.checkEvent = new CustomEvent('check');
    }
    connectedCallback() {
        var _a, _b;
        super.connectedCallback();
        console.log('connected callback');
        if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.localName) == 'dews-dropdownlist') {
            this._className = this._className + ' dropdown';
        }
        if (this.bookmark && ((_b = this.parentElement) === null || _b === void 0 ? void 0 : _b.localName) != 'dews-dropdownlist') {
            this._className = this._className + ' bookmark';
            this.title = '';
        }
    }
    /*
     * 포커스 설정
     * */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    focus() { }
    _clickHandler() {
        if (this.disabled) {
            return;
        }
        this._checkedChange();
        if (this.checked) {
            this.dispatchEvent(this.checkEvent);
        }
    }
    _checkedChange() {
        this.dispatchEvent(this.changeEvent);
        this.checked = !this.checked;
    }
    render() {
        return template.call(this);
    }
}
Checkbox.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Checkbox.prototype, "title", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Checkbox.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Checkbox.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Checkbox.prototype, "bookmark", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGVja2JveC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUN2QyxPQUFPLElBQUksTUFBTSxpQkFBaUIsQ0FBQztBQUVuQyxvQ0FBb0M7QUFDcEMsTUFBTSxPQUFPLFFBQVMsU0FBUSxpQkFBaUI7SUFDN0M7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUtWLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHWCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHaEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUVULGVBQVUsR0FBRyxvQkFBb0IsQ0FBQztRQWdCMUM7O2FBRUs7UUFDRyxnQkFBVyxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQW5DOUMsQ0FBQztJQWlCRCxpQkFBaUI7O1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRWxDLElBQUksT0FBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxTQUFTLEtBQUksbUJBQW1CLEVBQUU7WUFDeEQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztTQUNqRDtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxPQUFBLElBQUksQ0FBQyxhQUFhLDBDQUFFLFNBQVMsS0FBSSxtQkFBbUIsRUFBRTtZQUN6RSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDO1lBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQztJQVFEOztTQUVLO0lBQ0wsZ0VBQWdFO0lBQ2hFLEtBQUssS0FBVSxDQUFDO0lBRVIsYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O0FBM0RNLGVBQU0sR0FBRyxJQUFJLENBQUM7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7O3VDQUNoQjtBQUdYO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDOzswQ0FDWDtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzt5Q0FDM0I7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7OzBDQUNYIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0Zvcm1Db21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NGb3JtQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IHByb3BlcnR5IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9jaGVja2JveC5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vY2hlY2tib3guc2Nzcyc7XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuZXhwb3J0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRGV3c0Zvcm1Db21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHN0YXRpYyBzdHlsZXMgPSBzY3NzO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICB0aXRsZSA9ICcnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4gfSlcbiAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIGNoZWNrZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGJvb2ttYXJrID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfY2xhc3NOYW1lID0gJ2Rld3MtY2hlY2tib3gtd3JhcCc7XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcblxuICAgIGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgY2FsbGJhY2snKTtcblxuICAgIGlmICh0aGlzLnBhcmVudEVsZW1lbnQ/LmxvY2FsTmFtZSA9PSAnZGV3cy1kcm9wZG93bmxpc3QnKSB7XG4gICAgICB0aGlzLl9jbGFzc05hbWUgPSB0aGlzLl9jbGFzc05hbWUgKyAnIGRyb3Bkb3duJztcbiAgICB9XG4gICAgaWYgKHRoaXMuYm9va21hcmsgJiYgdGhpcy5wYXJlbnRFbGVtZW50Py5sb2NhbE5hbWUgIT0gJ2Rld3MtZHJvcGRvd25saXN0Jykge1xuICAgICAgdGhpcy5fY2xhc3NOYW1lID0gdGhpcy5fY2xhc3NOYW1lICsgJyBib29rbWFyayc7XG4gICAgICB0aGlzLnRpdGxlID0gJyc7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICog7J2067Kk7Yq4IOyDneyEsVxuICAgKiAqL1xuICBwcml2YXRlIGNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjaGFuZ2UnKTtcbiAgcHJpdmF0ZSBjaGVja0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdjaGVjaycpO1xuXG4gIC8qXG4gICAqIO2PrOy7pOyKpCDshKTsoJVcbiAgICogKi9cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvblxuICBmb2N1cygpOiB2b2lkIHt9XG5cbiAgcHJpdmF0ZSBfY2xpY2tIYW5kbGVyKCkge1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2NoZWNrZWRDaGFuZ2UoKTtcbiAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5jaGVja0V2ZW50KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jaGVja2VkQ2hhbmdlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmNoYW5nZUV2ZW50KTtcbiAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=