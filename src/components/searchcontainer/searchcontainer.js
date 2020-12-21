import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property } from 'lit-element';
import template from './searchcontainer.html';
import scss from './searchcontainer.scss';
export class SearchContainer extends DewsLayoutComponent {
    constructor() {
        super();
        this.title = '';
        this.col = 1;
        this._iconList = [];
        this._contentList = [];
        this._contentView();
        this._buttonView();
    }
    _setClick() {
        /*
         * set 버튼 클릭시 처리
         * */
    }
    _resetClick() {
        /*
         * reset 버튼 클릭시 처리
         * */
    }
    _captureClick() {
        console.log(this.shadowRoot);
        /*
         * capture 버튼 클릭시 처리
         * */
    }
    _contentView() {
        var _a, _b;
        const contentChildLength = (_a = this.querySelector('container-content')) === null || _a === void 0 ? void 0 : _a.childElementCount;
        const contentChildItem = (_b = this.querySelector('container-content')) === null || _b === void 0 ? void 0 : _b.children;
        if (contentChildLength <= 0 || contentChildItem == undefined) {
            return;
        }
        for (let i = 0; i < contentChildLength; i++) {
            this._contentList.push(html `<li>${contentChildItem.item(i)}</li>`);
        }
        // this.querySelector('container-content').remove();
    }
    _buttonView() {
        var _a, _b, _c;
        const setState = (_a = this.querySelector('container-button')) === null || _a === void 0 ? void 0 : _a.hasAttribute('data-set');
        const captureState = (_b = this.querySelector('container-button')) === null || _b === void 0 ? void 0 : _b.hasAttribute('data-capture');
        const resetState = (_c = this.querySelector('container-button')) === null || _c === void 0 ? void 0 : _c.hasAttribute('data-reset');
        if (setState) {
            this._iconList.push(html `<li class="data-set">
          <button class="set" @click="${this._setClick}"><span>Data Set</span></button>
        </li>`);
        }
        if (captureState) {
            this._iconList.push(html `<li class="data-capture">
          <button class="capture" @click="${this._captureClick}"><span>Data Capture</span></button>
        </li>`);
        }
        if (resetState) {
            this._iconList.push(html `<li class="data-reset">
          <button class="reset" @click="${this._resetClick}"><span>Data Reset</span></button>
        </li>`);
        }
    }
    render() {
        return template.call(this);
    }
}
SearchContainer.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], SearchContainer.prototype, "title", void 0);
__decorate([
    property({ type: Number, reflect: true }),
    __metadata("design:type", Object)
], SearchContainer.prototype, "col", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VhcmNoY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFFN0QsT0FBTyxRQUFRLE1BQU0sd0JBQXdCLENBQUM7QUFDOUMsT0FBTyxJQUFJLE1BQU0sd0JBQXdCLENBQUM7QUFFMUMsTUFBTSxPQUFPLGVBQWdCLFNBQVEsbUJBQW1CO0lBdUV0RDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBcEVWLFVBQUssR0FBRyxFQUFFLENBQUM7UUFHWCxRQUFHLEdBQUcsQ0FBQyxDQUFDO1FBRUEsY0FBUyxHQUEwQixFQUFFLENBQUM7UUFFdEMsaUJBQVksR0FBMEIsRUFBRSxDQUFDO1FBOEQvQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUE5RE8sU0FBUztRQUNmOzthQUVLO0lBQ1AsQ0FBQztJQUVPLFdBQVc7UUFDakI7O2FBRUs7SUFDUCxDQUFDO0lBRU8sYUFBYTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3Qjs7YUFFSztJQUNQLENBQUM7SUFFTyxZQUFZOztRQUNsQixNQUFNLGtCQUFrQixTQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsMENBQUUsaUJBQWlCLENBQUM7UUFDdEYsTUFBTSxnQkFBZ0IsU0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFFBQVEsQ0FBQztRQUMzRSxJQUFJLGtCQUFtQixJQUFJLENBQUMsSUFBSSxnQkFBZ0IsSUFBSSxTQUFTLEVBQUU7WUFDN0QsT0FBTztTQUNSO1FBQ0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFtQixFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQSxPQUFPLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEU7UUFDRCxvREFBb0Q7SUFDdEQsQ0FBQztJQUVPLFdBQVc7O1FBQ2pCLE1BQU0sUUFBUSxTQUF3QixJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RyxNQUFNLFlBQVksU0FBd0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0csTUFBTSxVQUFVLFNBQXdCLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsMENBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTNHLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLElBQUksQ0FBQTt3Q0FDNEIsSUFBSSxDQUFDLFNBQVM7Y0FDeEMsQ0FDUCxDQUFDO1NBQ0g7UUFDRCxJQUFJLFlBQVksRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDakIsSUFBSSxDQUFBOzRDQUNnQyxJQUFJLENBQUMsYUFBYTtjQUNoRCxDQUNQLENBQUM7U0FDSDtRQUNELElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLElBQUksQ0FBQTswQ0FDOEIsSUFBSSxDQUFDLFdBQVc7Y0FDNUMsQ0FDUCxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBT0QsTUFBTTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztBQTlFTSxzQkFBTSxHQUFHLElBQUksQ0FBQztBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7OENBQ2hCO0FBR1g7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7NENBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0xheW91dENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0xheW91dENvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBodG1sLCBwcm9wZXJ0eSwgVGVtcGxhdGVSZXN1bHQgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3NlYXJjaGNvbnRhaW5lci5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vc2VhcmNoY29udGFpbmVyLnNjc3MnO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29udGFpbmVyIGV4dGVuZHMgRGV3c0xheW91dENvbXBvbmVudCB7XG4gIHN0YXRpYyBzdHlsZXMgPSBzY3NzO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICB0aXRsZSA9ICcnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IE51bWJlciwgcmVmbGVjdDogdHJ1ZSB9KVxuICBjb2wgPSAxO1xuXG4gIHByaXZhdGUgX2ljb25MaXN0OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBwcml2YXRlIF9jb250ZW50TGlzdDogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG5cbiAgcHJpdmF0ZSBfc2V0Q2xpY2soKSB7XG4gICAgLypcbiAgICAgKiBzZXQg67KE7Yq8IO2BtOumreyLnCDsspjrpqxcbiAgICAgKiAqL1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDbGljaygpIHtcbiAgICAvKlxuICAgICAqIHJlc2V0IOuyhO2KvCDtgbTrpq3si5wg7LKY66asXG4gICAgICogKi9cbiAgfVxuXG4gIHByaXZhdGUgX2NhcHR1cmVDbGljaygpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnNoYWRvd1Jvb3QpO1xuICAgIC8qXG4gICAgICogY2FwdHVyZSDrsoTtirwg7YG066at7IucIOyymOumrFxuICAgICAqICovXG4gIH1cblxuICBwcml2YXRlIF9jb250ZW50VmlldygpIHtcbiAgICBjb25zdCBjb250ZW50Q2hpbGRMZW5ndGggPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1jb250ZW50Jyk/LmNoaWxkRWxlbWVudENvdW50O1xuICAgIGNvbnN0IGNvbnRlbnRDaGlsZEl0ZW0gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1jb250ZW50Jyk/LmNoaWxkcmVuO1xuICAgIGlmIChjb250ZW50Q2hpbGRMZW5ndGghIDw9IDAgfHwgY29udGVudENoaWxkSXRlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Q2hpbGRMZW5ndGghOyBpKyspIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRMaXN0LnB1c2goaHRtbGA8bGk+JHtjb250ZW50Q2hpbGRJdGVtLml0ZW0oaSl9PC9saT5gKTtcbiAgICB9XG4gICAgLy8gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpLnJlbW92ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnV0dG9uVmlldygpIHtcbiAgICBjb25zdCBzZXRTdGF0ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMucXVlcnlTZWxlY3RvcignY29udGFpbmVyLWJ1dHRvbicpPy5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2V0Jyk7XG4gICAgY29uc3QgY2FwdHVyZVN0YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItYnV0dG9uJyk/Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jYXB0dXJlJyk7XG4gICAgY29uc3QgcmVzZXRTdGF0ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMucXVlcnlTZWxlY3RvcignY29udGFpbmVyLWJ1dHRvbicpPy5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmVzZXQnKTtcblxuICAgIGlmIChzZXRTdGF0ZSkge1xuICAgICAgdGhpcy5faWNvbkxpc3QucHVzaChcbiAgICAgICAgaHRtbGA8bGkgY2xhc3M9XCJkYXRhLXNldFwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZXRcIiBAY2xpY2s9XCIke3RoaXMuX3NldENsaWNrfVwiPjxzcGFuPkRhdGEgU2V0PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2xpPmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjYXB0dXJlU3RhdGUpIHtcbiAgICAgIHRoaXMuX2ljb25MaXN0LnB1c2goXG4gICAgICAgIGh0bWxgPGxpIGNsYXNzPVwiZGF0YS1jYXB0dXJlXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcHR1cmVcIiBAY2xpY2s9XCIke3RoaXMuX2NhcHR1cmVDbGlja31cIj48c3Bhbj5EYXRhIENhcHR1cmU8L3NwYW4+PC9idXR0b24+XG4gICAgICAgIDwvbGk+YFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHJlc2V0U3RhdGUpIHtcbiAgICAgIHRoaXMuX2ljb25MaXN0LnB1c2goXG4gICAgICAgIGh0bWxgPGxpIGNsYXNzPVwiZGF0YS1yZXNldFwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJyZXNldFwiIEBjbGljaz1cIiR7dGhpcy5fcmVzZXRDbGlja31cIj48c3Bhbj5EYXRhIFJlc2V0PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2xpPmBcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fY29udGVudFZpZXcoKTtcbiAgICB0aGlzLl9idXR0b25WaWV3KCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==