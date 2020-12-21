import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property } from 'lit-element';
import template from './formcontainer.html';
import scss from './formcontainer.scss';
export class FormContainer extends DewsLayoutComponent {
    constructor() {
        super();
        this.title = '';
        this._buttonList = [];
        this._iconList = [];
        this._contentList = [];
        this._contentView();
        this._buttonView();
        this._customButtonView();
    }
    _setClick() {
        console.log('set_click');
    }
    _resetClick() {
        console.log('reset_click');
    }
    _captureClick() {
        console.log('capture_click');
    }
    _contentView() {
        var _a, _b;
        const contentChildLength = (_a = this.querySelector('container-content')) === null || _a === void 0 ? void 0 : _a.childElementCount;
        const contentChildItem = (_b = this.querySelector('container-content')) === null || _b === void 0 ? void 0 : _b.children;
        if (this.querySelectorAll('form-section').length <= 0) {
            console.error('form-section 이 없습니다.');
            return;
        }
        if (contentChildLength <= 0 || contentChildItem == undefined) {
            return;
        }
        for (let i = 0; i < contentChildLength; i++) {
            this._contentList.push(html `${contentChildItem.item(i)}`);
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
          <button class="capture" @click="${this._captureClick}"><span> Data Capture</span></button>
        </li>`);
        }
        if (resetState) {
            this._iconList.push(html `<li class="data-reset">
          <button class="reset" @click="${this._resetClick}"><span>Data Reset</span></button>
        </li>`);
        }
    }
    _customButtonView() {
        var _a, _b;
        const buttonChildLength = (_a = this.querySelector('container-button')) === null || _a === void 0 ? void 0 : _a.childElementCount;
        const buttonChildItem = (_b = this.querySelector('container-button')) === null || _b === void 0 ? void 0 : _b.children;
        if (buttonChildLength <= 0 || buttonChildItem == undefined) {
            return;
        }
        const _customButtonList = [];
        for (let i = 0; i < buttonChildLength; i++) {
            _customButtonList.push(html `<li>${buttonChildItem.item(i)}</li>`);
        }
        this._buttonList.push(html `
        <div class="option-custom-button">
          <ul>
            ${_customButtonList}
          </ul>
        </div>
      `);
        // this.querySelector('container-button').remove();
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    render() {
        console.log('form-container-render');
        return template.call(this);
    }
}
FormContainer.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], FormContainer.prototype, "title", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm1jb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFrQixNQUFNLGFBQWEsQ0FBQztBQUU3RCxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxzQkFBc0IsQ0FBQztBQUV4QyxNQUFNLE9BQU8sYUFBYyxTQUFRLG1CQUFtQjtJQUdwRDtRQUNFLEtBQUssRUFBRSxDQUFDO1FBT1YsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVILGdCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQUV4QyxjQUFTLEdBQTBCLEVBQUUsQ0FBQztRQUV0QyxpQkFBWSxHQUEwQixFQUFFLENBQUM7UUFaL0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBV08sU0FBUztRQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVPLFdBQVc7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU8sYUFBYTtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFTyxZQUFZOztRQUNsQixNQUFNLGtCQUFrQixTQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsMENBQUUsaUJBQWlCLENBQUM7UUFDdEYsTUFBTSxnQkFBZ0IsU0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFFBQVEsQ0FBQztRQUMzRSxJQUFJLElBQUks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QUFFLENBQUM7OzRDQUNoQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NMYXlvdXRDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgaHRtbCwgcHJvcGVydHksIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9mb3JtY29udGFpbmVyLmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9mb3JtY29udGFpbmVyLnNjc3MnO1xuXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRhaW5lciBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2NvbnRlbnRWaWV3KCk7XG4gICAgdGhpcy5fYnV0dG9uVmlldygpO1xuICAgIHRoaXMuX2N1c3RvbUJ1dHRvblZpZXcoKTtcbiAgfVxuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICB0aXRsZSA9ICcnO1xuXG4gIHByaXZhdGUgX2J1dHRvbkxpc3Q6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIHByaXZhdGUgX2ljb25MaXN0OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBwcml2YXRlIF9jb250ZW50TGlzdDogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG5cbiAgcHJpdmF0ZSBfc2V0Q2xpY2soKSB7XG4gICAgY29uc29sZS5sb2coJ3NldF9jbGljaycpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDbGljaygpIHtcbiAgICBjb25zb2xlLmxvZygncmVzZXRfY2xpY2snKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhcHR1cmVDbGljaygpIHtcbiAgICBjb25zb2xlLmxvZygnY2FwdHVyZV9jbGljaycpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGVudFZpZXcoKSB7XG4gICAgY29uc3QgY29udGVudENoaWxkTGVuZ3RoID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpPy5jaGlsZEVsZW1lbnRDb3VudDtcbiAgICBjb25zdCBjb250ZW50Q2hpbGRJdGVtID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpPy5jaGlsZHJlbjtcbiAgICBpZiAodGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtLXNlY3Rpb24nKS5sZW5ndGggPD0gMCkge1xuICAgICAgY29uc29sZS5lcnJvcignZm9ybS1zZWN0aW9uIOydtCDsl4bsirXri4jri6QuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250ZW50Q2hpbGRMZW5ndGghIDw9IDAgfHwgY29udGVudENoaWxkSXRlbSA9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Q2hpbGRMZW5ndGghOyBpKyspIHtcbiAgICAgIHRoaXMuX2NvbnRlbnRMaXN0LnB1c2goaHRtbGAke2NvbnRlbnRDaGlsZEl0ZW0uaXRlbShpKX1gKTtcbiAgICB9XG4gICAgLy8gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpLnJlbW92ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnV0dG9uVmlldygpIHtcbiAgICBjb25zdCBzZXRTdGF0ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMucXVlcnlTZWxlY3RvcignY29udGFpbmVyLWJ1dHRvbicpPy5oYXNBdHRyaWJ1dGUoJ2RhdGEtc2V0Jyk7XG4gICAgY29uc3QgY2FwdHVyZVN0YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItYnV0dG9uJyk/Lmhhc0F0dHJpYnV0ZSgnZGF0YS1jYXB0dXJlJyk7XG4gICAgY29uc3QgcmVzZXRTdGF0ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IHRoaXMucXVlcnlTZWxlY3RvcignY29udGFpbmVyLWJ1dHRvbicpPy5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmVzZXQnKTtcblxuICAgIGlmIChzZXRTdGF0ZSkge1xuICAgICAgdGhpcy5faWNvbkxpc3QucHVzaChcbiAgICAgICAgaHRtbGA8bGkgY2xhc3M9XCJkYXRhLXNldFwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzZXRcIiBAY2xpY2s9XCIke3RoaXMuX3NldENsaWNrfVwiPjxzcGFuPkRhdGEgU2V0PC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2xpPmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChjYXB0dXJlU3RhdGUpIHtcbiAgICAgIHRoaXMuX2ljb25MaXN0LnB1c2goXG4gICAgICAgIGh0bWxgPGxpIGNsYXNzPVwiZGF0YS1jYXB0dXJlXCI+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhcHR1cmVcIiBAY2xpY2s9XCIke3RoaXMuX2NhcHR1cmVDbGlja31cIj48c3Bhbj4gRGF0YSBDYXB0dXJlPC9zcGFuPjwvYnV0dG9uPlxuICAgICAgICA8L2xpPmBcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChyZXNldFN0YXRlKSB7XG4gICAgICB0aGlzLl9pY29uTGlzdC5wdXNoKFxuICAgICAgICBodG1sYDxsaSBjbGFzcz1cImRhdGEtcmVzZXRcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwicmVzZXRcIiBAY2xpY2s9XCIke3RoaXMuX3Jlc2V0Q2xpY2t9XCI+PHNwYW4+RGF0YSBSZXNldDwvc3Bhbj48L2J1dHRvbj5cbiAgICAgICAgPC9saT5gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2N1c3RvbUJ1dHRvblZpZXcoKSB7XG4gICAgY29uc3QgYnV0dG9uQ2hpbGRMZW5ndGggPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1idXR0b24nKT8uY2hpbGRFbGVtZW50Q291bnQ7XG4gICAgY29uc3QgYnV0dG9uQ2hpbGRJdGVtID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItYnV0dG9uJyk/LmNoaWxkcmVuO1xuICAgIGlmIChidXR0b25DaGlsZExlbmd0aCEgPD0gMCB8fCBidXR0b25DaGlsZEl0ZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgX2N1c3RvbUJ1dHRvbkxpc3Q6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uQ2hpbGRMZW5ndGghOyBpKyspIHtcbiAgICAgIF9jdXN0b21CdXR0b25MaXN0LnB1c2goaHRtbGA8bGk+JHtidXR0b25DaGlsZEl0ZW0uaXRlbShpKX08L2xpPmApO1xuICAgIH1cbiAgICB0aGlzLl9idXR0b25MaXN0LnB1c2goXG4gICAgICBodG1sYFxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uLWN1c3RvbS1idXR0b25cIj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAke19jdXN0b21CdXR0b25MaXN0fVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICk7XG5cbiAgICAvLyB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1idXR0b24nKS5yZW1vdmUoKTtcbiAgfVxuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdmb3JtLWNvbnRhaW5lci1yZW5kZXInKTtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19