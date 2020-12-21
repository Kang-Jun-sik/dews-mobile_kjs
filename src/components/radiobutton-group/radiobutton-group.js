import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property } from 'lit-element';
import template from './radiobutton-group.html';
import scss from './radiobutton-group.scss';
export class RadiobuttonGroup extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = 'title';
        this.disabled = false;
        this.align = 'horizontal';
        this.$_radioButtonListTemp = [];
    }
    connectedCallback() {
        super.connectedCallback();
        this._radioButtonView();
    }
    _radioButtonView() {
        var _a, _b;
        const $el = this.children;
        const $checkedList = [];
        for (let i = 0; i < $el.length; i++) {
            if (this.disabled) {
                (_a = $el.item(i)) === null || _a === void 0 ? void 0 : _a.setAttribute('disabled', 'disabled');
            }
            if ((_b = $el.item(i)) === null || _b === void 0 ? void 0 : _b.hasAttribute('checked')) {
                $checkedList.push($el.item(i));
            }
        }
        if ($checkedList.length >= 2) {
            for (let j = 1; j < $checkedList.length; j++) {
                $checkedList[j].removeAttribute('checked');
            }
        }
        this.querySelectorAll('dews-radiobutton').forEach(checkBox => {
            this.$_radioButtonListTemp.push(html `<span class="group-item">${checkBox}</span>`);
        });
        if (this.align === 'vertical') {
            this._radioButton = html `<div class="radio-group vertical">${this.$_radioButtonListTemp}</div>`;
        }
        else {
            this._radioButton = html `<div class="radio-group">${this.$_radioButtonListTemp}</div>`;
        }
    }
    _radioCheckedChange(e) {
        const $el = this.shadowRoot.querySelectorAll('dews-radiobutton');
        if (e.target.localName == 'dews-radiobutton') {
            for (let i = 0; i < $el.length; i++) {
                if ($el.item(i) !== e.target && !e.target.hasAttribute('disabled')) {
                    $el.item(i).removeAttribute('checked');
                }
            }
        }
    }
    _clickHandler(e) {
        this._radioCheckedChange(e);
    }
    render() {
        return template.call(this);
    }
}
RadiobuttonGroup.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], RadiobuttonGroup.prototype, "title", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], RadiobuttonGroup.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], RadiobuttonGroup.prototype, "align", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], RadiobuttonGroup.prototype, "$_radioButtonListTemp", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], RadiobuttonGroup.prototype, "_radioButton", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24tZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpb2J1dHRvbi1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQWtCLE1BQU0sYUFBYSxDQUFDO0FBRS9FLE9BQU8sUUFBUSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hELE9BQU8sSUFBSSxNQUFNLDBCQUEwQixDQUFDO0FBRTVDLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxpQkFBaUI7SUFBdkQ7O1FBSUUsVUFBSyxHQUFHLE9BQU8sQ0FBQztRQUdoQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFVBQUssR0FBOEIsWUFBWSxDQUFDO1FBR3hDLDBCQUFxQixHQUEwQixFQUFFLENBQUM7SUF1RDVELENBQUM7SUFsREMsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLGdCQUFnQjs7UUFDdEIsTUFBTSxHQUFHLEdBQW1CLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDMUMsTUFBTSxZQUFZLEdBQW1CLEVBQUUsQ0FBQztRQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pCLE1BQUEsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMENBQUUsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUU7YUFDbkQ7WUFDRCxVQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLDBDQUFFLFlBQVksQ0FBQyxTQUFTLEdBQUc7Z0JBQ3hDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7UUFDRCxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM1QyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0Y7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0QsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsNEJBQTRCLFFBQVEsU0FBUyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFBLHFDQUFxQyxJQUFJLENBQUMscUJBQXFCLFFBQVEsQ0FBQztTQUNqRzthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUEsNEJBQTRCLElBQUksQ0FBQyxxQkFBcUIsUUFBUSxDQUFDO1NBQ3hGO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUFDLENBQWE7UUFDdkMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2xFLElBQUssQ0FBQyxDQUFDLE1BQXNCLENBQUMsU0FBUyxJQUFJLGtCQUFrQixFQUFFO1lBQzdELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFFLENBQUMsQ0FBQyxNQUFzQixDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDbkYsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3hDO2FBQ0Y7U0FDRjtJQUNILENBQUM7SUFFTyxhQUFhLENBQUMsQ0FBYTtRQUNqQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7QUFsRU0sdUJBQU0sR0FBRyxJQUFJLENBQUM7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7OytDQUNYO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDOztrREFDWDtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7K0NBQ3FCO0FBR2hEO0lBREMsZ0JBQWdCLEVBQUU7OEJBQ1ksS0FBSzsrREFBc0I7QUFHMUQ7SUFEQyxnQkFBZ0IsRUFBRTs7c0RBQzhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0Zvcm1Db21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NGb3JtQ29tcG9uZW50LmpzJztcbmltcG9ydCB7IGh0bWwsIGludGVybmFsUHJvcGVydHksIHByb3BlcnR5LCBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vcmFkaW9idXR0b24tZ3JvdXAuaHRtbCc7XG5pbXBvcnQgc2NzcyBmcm9tICcuL3JhZGlvYnV0dG9uLWdyb3VwLnNjc3MnO1xuXG5leHBvcnQgY2xhc3MgUmFkaW9idXR0b25Hcm91cCBleHRlbmRzIERld3NGb3JtQ29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJ3RpdGxlJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIGFsaWduOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSAkX3JhZGlvQnV0dG9uTGlzdFRlbXA6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBfcmFkaW9CdXR0b246IFRlbXBsYXRlUmVzdWx0IHwgdW5kZWZpbmVkO1xuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5fcmFkaW9CdXR0b25WaWV3KCk7XG4gIH1cblxuICBwcml2YXRlIF9yYWRpb0J1dHRvblZpZXcoKSB7XG4gICAgY29uc3QgJGVsOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMuY2hpbGRyZW47XG4gICAgY29uc3QgJGNoZWNrZWRMaXN0OiBBcnJheTxFbGVtZW50PiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgJGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAkZWwuaXRlbShpKT8uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKCRlbC5pdGVtKGkpPy5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkY2hlY2tlZExpc3QucHVzaCgkZWwuaXRlbShpKSEpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoJGNoZWNrZWRMaXN0Lmxlbmd0aCA+PSAyKSB7XG4gICAgICBmb3IgKGxldCBqID0gMTsgaiA8ICRjaGVja2VkTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAkY2hlY2tlZExpc3Rbal0ucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdkZXdzLXJhZGlvYnV0dG9uJykuZm9yRWFjaChjaGVja0JveCA9PiB7XG4gICAgICB0aGlzLiRfcmFkaW9CdXR0b25MaXN0VGVtcC5wdXNoKGh0bWxgPHNwYW4gY2xhc3M9XCJncm91cC1pdGVtXCI+JHtjaGVja0JveH08L3NwYW4+YCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMuYWxpZ24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHRoaXMuX3JhZGlvQnV0dG9uID0gaHRtbGA8ZGl2IGNsYXNzPVwicmFkaW8tZ3JvdXAgdmVydGljYWxcIj4ke3RoaXMuJF9yYWRpb0J1dHRvbkxpc3RUZW1wfTwvZGl2PmA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JhZGlvQnV0dG9uID0gaHRtbGA8ZGl2IGNsYXNzPVwicmFkaW8tZ3JvdXBcIj4ke3RoaXMuJF9yYWRpb0J1dHRvbkxpc3RUZW1wfTwvZGl2PmA7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfcmFkaW9DaGVja2VkQ2hhbmdlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCAkZWwgPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rld3MtcmFkaW9idXR0b24nKTtcbiAgICBpZiAoKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5sb2NhbE5hbWUgPT0gJ2Rld3MtcmFkaW9idXR0b24nKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8ICRlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoJGVsLml0ZW0oaSkgIT09IGUudGFyZ2V0ICYmICEoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICRlbC5pdGVtKGkpLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2xpY2tIYW5kbGVyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9yYWRpb0NoZWNrZWRDaGFuZ2UoZSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==