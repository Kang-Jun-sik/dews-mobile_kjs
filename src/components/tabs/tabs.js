import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property } from 'lit-element';
import template from './tabs.html';
import scss from './tabs.scss';
export class Tabs extends DewsLayoutComponent {
    constructor() {
        super(...arguments);
        this.selected = 0;
        this.hide = false;
        this.title = '';
        this.titleList = [];
        this.select = (select) => {
            this._select(select);
        };
        this._select = (select) => {
            var _a, _b, _c, _d, _e, _f, _g;
            (_c = (_b = (_a = this.shadowRoot.querySelector('.title-list')) === null || _a === void 0 ? void 0 : _a.querySelector('.active')) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.remove('active');
            (_d = this.shadowRoot.querySelector('.title-list')) === null || _d === void 0 ? void 0 : _d.querySelectorAll('.title')[select].classList.add('active');
            this.querySelectorAll('dews-tab').forEach(tab => {
                var _a, _b;
                (_b = (_a = tab.shadowRoot.querySelector('.content')) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove('active');
            });
            (_g = (_f = (_e = this.querySelectorAll('dews-tab')[select].shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelector('.content')) === null || _f === void 0 ? void 0 : _f.classList) === null || _g === void 0 ? void 0 : _g.add('active');
            this.selected = select;
            // const tabChange = new Event('tabChange');
            this.dispatchEvent(new CustomEvent('tabChange', { detail: { select: select } }));
            // this.dispatchEvent(this.eventTest);
            // console.log(tabChange);
        };
    }
    async connectedCallback() {
        super.connectedCallback();
        this.addEventListener('focusin', this._focusIn);
        this.addEventListener('blur', this._focusBlur);
        this.updateComplete;
        // console.log('Tabs UpdateComplete');
        this._firstTabUpdate();
    }
    _firstTabUpdate() {
        var _a, _b, _c, _d, _e;
        this.title = (_b = (_a = this.children.item(0)) === null || _a === void 0 ? void 0 : _a.getAttribute('title')) !== null && _b !== void 0 ? _b : '';
        for (let i = 0; i < this.children.length; i++) {
            const title = (_c = this.children.item(i)) === null || _c === void 0 ? void 0 : _c.getAttribute('title');
            if (i === this.selected - 1) {
                (_d = this.children.item(i)) === null || _d === void 0 ? void 0 : _d.setAttribute('active', 'true');
                this.titleList.push(html ` <button class="title active" title="${title}" @click="${this._clickHandler}">
          <span>${title}</span>
        </button>`);
            }
            else if (!((_e = this.children.item(i)) === null || _e === void 0 ? void 0 : _e.hasAttribute('hide'))) {
                this.titleList.push(html `<button class="title" title="${title}" @click="${this._clickHandler}">
          <span>${title}</span>
        </button>`);
            }
        }
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('focusin', this._focusIn);
        this.removeEventListener('blur', this._focusBlur);
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.updateComplete.then(() => {
            this._select(this.selected);
        });
    }
    _focusIn(e) {
        this._focusChanging(e);
        const focusIn = new CustomEvent('focusIn');
        this.dispatchEvent(focusIn);
    }
    _focusBlur(e) {
        this._focusChanging(e);
        const focusBlur = new CustomEvent('focusBlur');
        this.dispatchEvent(focusBlur);
    }
    _clickHandler(e) {
        this.shadowRoot.querySelectorAll('.title').forEach((tab, index) => {
            if (tab === e.currentTarget) {
                this._select(index);
            }
        });
    }
    render() {
        return this.hide ? null : template.call(this);
    }
}
Tabs.styles = scss;
__decorate([
    property({ type: Number }),
    __metadata("design:type", Object)
], Tabs.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Tabs.prototype, "hide", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Tabs.prototype, "title", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUU3RSxPQUFPLFFBQVEsTUFBTSxhQUFhLENBQUM7QUFDbkMsT0FBTyxJQUFJLE1BQU0sYUFBYSxDQUFDO0FBRS9CLE1BQU0sT0FBTyxJQUFLLFNBQVEsbUJBQW1CO0lBQTdDOztRQWFFLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFHYixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBR2IsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQXlCSCxjQUFTLEdBQTBCLEVBQUUsQ0FBQztRQUU5QyxXQUFNLEdBQWEsQ0FBQyxNQUFjLEVBQUUsRUFBRTtZQUNwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQXFCTSxZQUFPLEdBQWEsQ0FBQyxNQUFjLEVBQUUsRUFBRTs7WUFDN0Msa0JBQUEsSUFBSSxDQUFDLFVBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBDQUFFLGFBQWEsQ0FBQyxTQUFTLDJDQUFHLFNBQVMsMENBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNyRyxNQUFBLElBQUksQ0FBQyxVQUFXLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQzFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUM5QyxZQUFBLEdBQUcsQ0FBQyxVQUFXLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQywwQ0FBRSxTQUFTLDBDQUFFLE1BQU0sQ0FBQyxR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ICcuLi9iYXNlL0Rld3NMYXlvdXRDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgaHRtbCwgcHJvcGVydHksIFByb3BlcnR5VmFsdWVzLCBUZW1wbGF0ZVJlc3VsdCB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGFicy5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vdGFicy5zY3NzJztcblxuZXhwb3J0IGNsYXNzIFRhYnMgZXh0ZW5kcyBEZXdzTGF5b3V0Q29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgYXN5bmMgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCB0aGlzLl9mb2N1c0luKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLl9mb2N1c0JsdXIpO1xuICAgIHRoaXMudXBkYXRlQ29tcGxldGU7XG4gICAgLy8gY29uc29sZS5sb2coJ1RhYnMgVXBkYXRlQ29tcGxldGUnKTtcbiAgICB0aGlzLl9maXJzdFRhYlVwZGF0ZSgpO1xuICB9XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogTnVtYmVyIH0pXG4gIHNlbGVjdGVkID0gMDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGhpZGUgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdGl0bGUgPSAnJztcblxuICBwcml2YXRlIF9maXJzdFRhYlVwZGF0ZSgpIHtcbiAgICB0aGlzLnRpdGxlID0gdGhpcy5jaGlsZHJlbi5pdGVtKDApPy5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgPz8gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMuY2hpbGRyZW4uaXRlbShpKT8uZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgaWYgKGkgPT09IHRoaXMuc2VsZWN0ZWQgLSAxKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uaXRlbShpKT8uc2V0QXR0cmlidXRlKCdhY3RpdmUnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLnRpdGxlTGlzdC5wdXNoKGh0bWxgIDxidXR0b24gY2xhc3M9XCJ0aXRsZSBhY3RpdmVcIiB0aXRsZT1cIiR7dGl0bGV9XCIgQGNsaWNrPVwiJHt0aGlzLl9jbGlja0hhbmRsZXJ9XCI+XG4gICAgICAgICAgPHNwYW4+JHt0aXRsZX08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPmApO1xuICAgICAgfSBlbHNlIGlmICghdGhpcy5jaGlsZHJlbi5pdGVtKGkpPy5oYXNBdHRyaWJ1dGUoJ2hpZGUnKSkge1xuICAgICAgICB0aGlzLnRpdGxlTGlzdC5wdXNoKGh0bWxgPGJ1dHRvbiBjbGFzcz1cInRpdGxlXCIgdGl0bGU9XCIke3RpdGxlfVwiIEBjbGljaz1cIiR7dGhpcy5fY2xpY2tIYW5kbGVyfVwiPlxuICAgICAgICAgIDxzcGFuPiR7dGl0bGV9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIHRoaXMuX2ZvY3VzSW4pO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMuX2ZvY3VzQmx1cik7XG4gIH1cblxuICBwcml2YXRlIHRpdGxlTGlzdDogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG5cbiAgc2VsZWN0OiBGdW5jdGlvbiA9IChzZWxlY3Q6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuX3NlbGVjdChzZWxlY3QpO1xuICB9O1xuXG4gIHByb3RlY3RlZCBmaXJzdFVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzOiBQcm9wZXJ0eVZhbHVlcykge1xuICAgIHN1cGVyLmZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgIHRoaXMudXBkYXRlQ29tcGxldGUudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLl9zZWxlY3QodGhpcy5zZWxlY3RlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9mb2N1c0luKGU6IEZvY3VzRXZlbnQpIHtcbiAgICB0aGlzLl9mb2N1c0NoYW5naW5nKGUpO1xuICAgIGNvbnN0IGZvY3VzSW4gPSBuZXcgQ3VzdG9tRXZlbnQoJ2ZvY3VzSW4nKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZm9jdXNJbik7XG4gIH1cblxuICBwcml2YXRlIF9mb2N1c0JsdXIoZTogRm9jdXNFdmVudCkge1xuICAgIHRoaXMuX2ZvY3VzQ2hhbmdpbmcoZSk7XG4gICAgY29uc3QgZm9jdXNCbHVyID0gbmV3IEN1c3RvbUV2ZW50KCdmb2N1c0JsdXInKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZm9jdXNCbHVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdDogRnVuY3Rpb24gPSAoc2VsZWN0OiBudW1iZXIpID0+IHtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy50aXRsZS1saXN0Jyk/LnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKT8uY2xhc3NMaXN0Py5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnRpdGxlLWxpc3QnKT8ucXVlcnlTZWxlY3RvckFsbCgnLnRpdGxlJylbc2VsZWN0XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rld3MtdGFiJykuZm9yRWFjaCh0YWIgPT4ge1xuICAgICAgdGFiLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50Jyk/LmNsYXNzTGlzdD8ucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rld3MtdGFiJylbc2VsZWN0XS5zaGFkb3dSb290Py5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpPy5jbGFzc0xpc3Q/LmFkZCgnYWN0aXZlJyk7XG4gICAgdGhpcy5zZWxlY3RlZCA9IHNlbGVjdDtcbiAgICAvLyBjb25zdCB0YWJDaGFuZ2UgPSBuZXcgRXZlbnQoJ3RhYkNoYW5nZScpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3RhYkNoYW5nZScsIHsgZGV0YWlsOiB7IHNlbGVjdDogc2VsZWN0IH0gfSkpO1xuICAgIC8vIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50VGVzdCk7XG4gICAgLy8gY29uc29sZS5sb2codGFiQ2hhbmdlKTtcbiAgfTtcblxuICBwcml2YXRlIF9jbGlja0hhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLnRpdGxlJykuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKHRhYiA9PT0gZS5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZSA/IG51bGwgOiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=