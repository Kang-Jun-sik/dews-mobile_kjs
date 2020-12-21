import { __decorate, __metadata } from "tslib";
import { html, internalProperty, property } from 'lit-element';
import { Drawerlayout } from '../drawerlayout/drawerlayout.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements';
import template from './dropdownlist.html';
import scss from './dropdownlist.scss';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { DewsComponent } from '../base/DewsComponent.js';
// noinspection JSUnusedLocalSymbols
// @ts-expect-error
export class Dropdownlist extends ScopedElementsMixin(DewsFormComponent) {
    constructor() {
        super();
        this.title = '';
        this.multi = false;
        this.disabled = false;
        this.readonly = false;
        this.active = false;
        this._count = 0;
        this._multiCheck = false;
        this.$itemList = [];
        this.select = [];
        this._selectList = [];
        this._allCheckState = false;
        this._addEvent = this._domClickHandelr.bind(this);
        this._nextBtnView();
    }
    static get scopedElements() {
        return {
            'drawer-layout': Drawerlayout,
            ...DewsComponent.getRegisteredComponents()
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this._itemview();
        if (this.disabled && this.readonly) {
            this.readonly = false;
        }
    }
    _itemview() {
        var _a, _b;
        this.$itemList = [];
        for (let i = 0; i <= this.children.length; i++) {
            if (((_a = this.children.item(i)) === null || _a === void 0 ? void 0 : _a.localName) === 'dropdownlist-item') {
                const title = (_b = this.children.item(i)) === null || _b === void 0 ? void 0 : _b.getAttribute('title');
                if (this.multi) {
                    this.$itemList.push(html `
              <li data-value="${title}" @click="${this._multiItemSelect}">
                <span class="text">${title}</span>
                <span data-value="${title}" class="checkbox">
                  <dews-checkbox class="multi-checkbox"></dews-checkbox>
                </span>
              </li>
            `);
                }
                else {
                    this.$itemList.push(html `
              <li @click="${this._singleItemSelect}" data-value="${title}">
                <span>${title}</span>
              </li>
            `);
                }
            }
        }
    }
    _nextBtnView() {
        var _a, _b, _c, _d, _e, _f;
        const $el = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.children;
        for (let i = 0; i <= $el.length; i++) {
            if ($el.item(i) === this) {
                this._nextItem = i + 1;
                if ($el.length == i + 1) {
                    this.$nextBtn = html ``;
                }
                else {
                    if (((_b = $el.item(i + 1)) === null || _b === void 0 ? void 0 : _b.hasAttribute('disabled')) || ((_c = $el.item(i + 1)) === null || _c === void 0 ? void 0 : _c.hasAttribute('readonly')) ||
                        ((_d = $el.item(i + 1)) === null || _d === void 0 ? void 0 : _d.localName) === 'dews-button' ||
                        ((_e = $el.item(i + 1)) === null || _e === void 0 ? void 0 : _e.localName) === 'dews-radiobutton-group' ||
                        ((_f = $el.item(i + 1)) === null || _f === void 0 ? void 0 : _f.localName) === 'dews-checkbox-group') {
                        this.$nextBtn = html ``;
                    }
                    else {
                        this.$nextBtn = html `<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
                    }
                }
            }
        }
    }
    // todo
    _nextBtnClickHandler(e) {
        var _a, _b, _c;
        const $el = (_c = (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.children[this._nextItem]) === null || _c === void 0 ? void 0 : _c.children[0];
        this._confirmClickHandler();
        $el === null || $el === void 0 ? void 0 : $el.click();
    }
    _allChecked(e) {
        var _a;
        const $el = e.currentTarget;
        this._allCheckState = (_a = $el.querySelector('.multi-checkbox')) === null || _a === void 0 ? void 0 : _a.hasAttribute('checked');
        if (e.target.localName === 'dews-checkbox') {
            this._allCheckState = e.target.hasAttribute('checked');
        }
        this.shadowRoot.querySelectorAll('.multi-checkbox').forEach($el => {
            if (this._allCheckState) {
                $el.setAttribute('checked', 'true');
            }
            else {
                $el.removeAttribute('checked');
            }
        });
    }
    _singleItemSelect(e) {
        var _a, _b;
        const $el = e.currentTarget;
        (_b = (_a = this.shadowRoot.querySelector('.check')) === null || _a === void 0 ? void 0 : _a.classList) === null || _b === void 0 ? void 0 : _b.remove('check');
        $el.classList.add('check');
        this.select[0] = $el.dataset.value;
        this._close();
    }
    _multiItemSelect(e) {
        var _a;
        const $el = e.currentTarget.querySelector('.multi-checkbox');
        if (this._allCheckState) {
            (_a = this.shadowRoot.querySelector('.multi-checkbox')) === null || _a === void 0 ? void 0 : _a.removeAttribute('checked');
        }
        if ($el.hasAttribute('checked')) {
            if (e.target.localName !== 'dews-checkbox') {
                $el.removeAttribute('checked');
            }
        }
        else {
            if (e.target.localName !== 'dews-checkbox') {
                $el.setAttribute('checked', 'true');
            }
        }
    }
    _confirmClickHandler() {
        this._multiCheck = true;
        this.select = [];
        this._selectList = [];
        this.shadowRoot.querySelectorAll('.multi-checkbox').forEach($el => {
            var _a;
            if ($el.hasAttribute('checked')) {
                if (((_a = $el.parentElement) === null || _a === void 0 ? void 0 : _a.dataset.value) !== 'allCheck') {
                    this.select.push($el.parentElement.dataset.value);
                }
                this._selectList.push(true);
            }
            else {
                this._selectList.push(false);
            }
        });
        this._close();
    }
    click() {
        this._confirmClickHandler();
        this._clickHandler(new MouseEvent('click'));
    }
    _touchMove(e) {
        e.passive = true;
        e.capture = true;
        e.currentTarget.scrollTo(0, this._startPoint - e.changedTouches[0].screenY);
    }
    _touchStart(e) {
        this._startPoint = e.changedTouches[0].screenY + e.currentTarget.scrollTop;
    }
    _focus() {
        var _a;
        (_a = this.shadowRoot.querySelector('.select-wrap')) === null || _a === void 0 ? void 0 : _a.classList.add('focus');
    }
    _blur() {
        var _a;
        (_a = this.shadowRoot.querySelector('.select-wrap')) === null || _a === void 0 ? void 0 : _a.classList.remove('focus');
    }
    _clickHandler(e) {
        var _a, _b, _c;
        if (!this.disabled && !this.readonly) {
            const $el = this.shadowRoot.querySelector('.drawer-layout');
            window.scrollTo(0, window.pageYOffset +
                ((_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) === null || _b === void 0 ? void 0 : _b.top) -
                ((_c = this.shadowRoot.querySelector('.dropdown-list-wrap')) === null || _c === void 0 ? void 0 : _c.clientHeight) -
                25);
            this.height = `${this.shadowRoot.querySelector('.dropdown-list-wrap').clientHeight + 120}px`;
            $el.height = this.height;
            this._open();
        }
    }
    _open() {
        this._focus();
        this.shadowRoot.querySelectorAll('.multi-checkbox').forEach(($el, index) => {
            if (this._selectList[index]) {
                $el.setAttribute('checked', 'true');
            }
        });
        this.active = true;
    }
    _close() {
        this._blur();
        if (this.multi && !this._multiCheck) {
            this.shadowRoot.querySelectorAll('.multi-checkbox').forEach($el => {
                if ($el.hasAttribute('checked')) {
                    $el.removeAttribute('checked');
                }
            });
        }
        this.active = false;
    }
    _domClickHandelr(e) {
        var _a, _b;
        if (e.isTrusted) {
            if (e.clientY <
                window.innerHeight -
                    ((_b = (_a = this.shadowRoot.querySelector('.drawer-layout')) === null || _a === void 0 ? void 0 : _a.shadowRoot.querySelector('.layer-bottom')) === null || _b === void 0 ? void 0 : _b.clientHeight)) {
                if (!this.active) {
                    return;
                }
                if (this._count >= 1) {
                    this._close();
                }
            }
            this._count++;
        }
    }
    firstUpdated(_changedProperties) {
        var _a, _b, _c;
        (_a = this.shadowRoot.querySelector('.drawer-layout')) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', this._close);
        if (this.disabled) {
            (_b = this.shadowRoot.querySelector('.select-wrap')) === null || _b === void 0 ? void 0 : _b.classList.add('disabled');
        }
        if (this.readonly) {
            (_c = this.shadowRoot.querySelector('.select-wrap')) === null || _c === void 0 ? void 0 : _c.classList.add('readonly');
        }
        super.firstUpdated(_changedProperties);
    }
    shouldUpdate(_changedProperties) {
        if (this.active) {
            document.addEventListener('click', this._addEvent);
        }
        else {
            this._count = 0;
            document.removeEventListener('click', this._addEvent);
        }
        return super.shouldUpdate(_changedProperties);
    }
    render() {
        return template.call(this);
    }
}
Dropdownlist.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "title", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "multi", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "readonly", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "active", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Dropdownlist.prototype, "height", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25saXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJvcGRvd25saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBa0MsTUFBTSxhQUFhLENBQUM7QUFDL0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9ELE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sSUFBSSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUV6RCxvQ0FBb0M7QUFDcEMsbUJBQW1CO0FBQ25CLE1BQU0sT0FBTyxZQUFhLFNBQVEsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7SUFzQ3RFO1FBQ0UsS0FBSyxFQUFFLENBQUM7UUE1QlYsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdYLFVBQUssR0FBRyxLQUFLLENBQUM7UUFHZCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFHVCxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBTWYsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGNBQVMsR0FBMEIsRUFBRSxDQUFDO1FBQ3RDLFdBQU0sR0FBa0IsRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQW1CLEVBQUUsQ0FBQztRQUdqQyxtQkFBYyxHQUF3QixLQUFLLENBQUM7UUFxTjVDLGNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBak5uRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7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QyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7OENBQzFCO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzhDQUMxQjtBQUdqQjtJQURDLGdCQUFnQixFQUFFOzs0Q0FDSTtBQUd2QjtJQURDLGdCQUFnQixFQUFFOzs0Q0FDZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sLCBpbnRlcm5hbFByb3BlcnR5LCBwcm9wZXJ0eSwgUHJvcGVydHlWYWx1ZXMsIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuaW1wb3J0IHsgRHJhd2VybGF5b3V0IH0gZnJvbSAnLi4vZHJhd2VybGF5b3V0L2RyYXdlcmxheW91dC5qcyc7XG5pbXBvcnQgeyBTY29wZWRFbGVtZW50c01peGluIH0gZnJvbSAnQG9wZW4td2Mvc2NvcGVkLWVsZW1lbnRzJztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZHJvcGRvd25saXN0Lmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9kcm9wZG93bmxpc3Quc2Nzcyc7XG5pbXBvcnQgeyBEZXdzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0Zvcm1Db21wb25lbnQuanMnO1xuaW1wb3J0IHsgRGV3c0NvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0NvbXBvbmVudC5qcyc7XG5cbi8vIG5vaW5zcGVjdGlvbiBKU1VudXNlZExvY2FsU3ltYm9sc1xuLy8gQHRzLWV4cGVjdC1lcnJvclxuZXhwb3J0IGNsYXNzIERyb3Bkb3dubGlzdCBleHRlbmRzIFNjb3BlZEVsZW1lbnRzTWl4aW4oRGV3c0Zvcm1Db21wb25lbnQpIHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgc3RhdGljIGdldCBzY29wZWRFbGVtZW50cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RyYXdlci1sYXlvdXQnOiBEcmF3ZXJsYXlvdXQsXG4gICAgICAuLi5EZXdzQ29tcG9uZW50LmdldFJlZ2lzdGVyZWRDb21wb25lbnRzKClcbiAgICB9O1xuICB9XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nIH0pXG4gIHRpdGxlID0gJyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuICBtdWx0aSA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IEJvb2xlYW4sIHJlZmxlY3Q6IHRydWUgfSlcbiAgZGlzYWJsZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgQGludGVybmFsUHJvcGVydHkoKVxuICBwcml2YXRlIGFjdGl2ZSA9IGZhbHNlO1xuXG4gIEBpbnRlcm5hbFByb3BlcnR5KClcbiAgcHJpdmF0ZSBoZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF9zdGFydFBvaW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2NvdW50ID0gMDtcbiAgcHJpdmF0ZSBfbXVsdGlDaGVjayA9IGZhbHNlO1xuICBwcml2YXRlICRpdGVtTGlzdDogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG4gIHByaXZhdGUgc2VsZWN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHByaXZhdGUgX3NlbGVjdExpc3Q6IEFycmF5PGJvb2xlYW4+ID0gW107XG4gIHByaXZhdGUgJG5leHRCdG46IFRlbXBsYXRlUmVzdWx0IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9uZXh0SXRlbTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9hbGxDaGVja1N0YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9uZXh0QnRuVmlldygpO1xuICB9XG5cbiAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgc3VwZXIuY29ubmVjdGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9pdGVtdmlldygpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMucmVhZG9ubHkpIHtcbiAgICAgIHRoaXMucmVhZG9ubHkgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pdGVtdmlldygpIHtcbiAgICB0aGlzLiRpdGVtTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuLml0ZW0oaSk/LmxvY2FsTmFtZSA9PT0gJ2Ryb3Bkb3dubGlzdC1pdGVtJykge1xuICAgICAgICBjb25zdCB0aXRsZSA9IHRoaXMuY2hpbGRyZW4uaXRlbShpKT8uZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xuICAgICAgICBpZiAodGhpcy5tdWx0aSkge1xuICAgICAgICAgIHRoaXMuJGl0ZW1MaXN0LnB1c2goXG4gICAgICAgICAgICBodG1sYFxuICAgICAgICAgICAgICA8bGkgZGF0YS12YWx1ZT1cIiR7dGl0bGV9XCIgQGNsaWNrPVwiJHt0aGlzLl9tdWx0aUl0ZW1TZWxlY3R9XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+JHt0aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS12YWx1ZT1cIiR7dGl0bGV9XCIgY2xhc3M9XCJjaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgPGRld3MtY2hlY2tib3ggY2xhc3M9XCJtdWx0aS1jaGVja2JveFwiPjwvZGV3cy1jaGVja2JveD5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICBgXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRpdGVtTGlzdC5wdXNoKFxuICAgICAgICAgICAgaHRtbGBcbiAgICAgICAgICAgICAgPGxpIEBjbGljaz1cIiR7dGhpcy5fc2luZ2xlSXRlbVNlbGVjdH1cIiBkYXRhLXZhbHVlPVwiJHt0aXRsZX1cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4ke3RpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIGBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dEJ0blZpZXcoKSB7XG4gICAgY29uc3QgJGVsOiBIVE1MQ29sbGVjdGlvbiA9IHRoaXMucGFyZW50RWxlbWVudD8uY2hpbGRyZW4gYXMgSFRNTENvbGxlY3Rpb247XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gJGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoJGVsIS5pdGVtKGkpID09PSB0aGlzKSB7XG4gICAgICAgIHRoaXMuX25leHRJdGVtID0gaSArIDE7XG4gICAgICAgIGlmICgkZWwhLmxlbmd0aCA9PSBpICsgMSkge1xuICAgICAgICAgIHRoaXMuJG5leHRCdG4gPSBodG1sYGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgJGVsIS5pdGVtKGkgKyAxKT8uaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpIHx8XG4gICAgICAgICAgICAkZWwhLml0ZW0oaSArIDEpPy5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykgfHxcbiAgICAgICAgICAgICRlbCEuaXRlbShpICsgMSk/LmxvY2FsTmFtZSA9PT0gJ2Rld3MtYnV0dG9uJyB8fFxuICAgICAgICAgICAgJGVsIS5pdGVtKGkgKyAxKT8ubG9jYWxOYW1lID09PSAnZGV3cy1yYWRpb2J1dHRvbi1ncm91cCcgfHxcbiAgICAgICAgICAgICRlbCEuaXRlbShpICsgMSk/LmxvY2FsTmFtZSA9PT0gJ2Rld3MtY2hlY2tib3gtZ3JvdXAnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGBgO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRuZXh0QnRuID0gaHRtbGA8YnV0dG9uIGNsYXNzPVwibmV4dC1pY29uLWJ1dHRvblwiIEBjbGljaz1cIiR7dGhpcy5fbmV4dEJ0bkNsaWNrSGFuZGxlcn1cIj5cbiAgICAgICAgICAgICAgPHNwYW4+64uk7J2MPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+YDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyB0b2RvXG4gIHByaXZhdGUgX25leHRCdG5DbGlja0hhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgIGNvbnN0ICRlbCA9IHRoaXMucGFyZW50RWxlbWVudD8ucGFyZW50RWxlbWVudD8uY2hpbGRyZW5bdGhpcy5fbmV4dEl0ZW0hXT8uY2hpbGRyZW5bMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fY29uZmlybUNsaWNrSGFuZGxlcigpO1xuICAgICRlbD8uY2xpY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FsbENoZWNrZWQoZTogTW91c2VFdmVudCkge1xuICAgIGNvbnN0ICRlbDogSFRNTEVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5fYWxsQ2hlY2tTdGF0ZSA9ICRlbCEucXVlcnlTZWxlY3RvcignLm11bHRpLWNoZWNrYm94Jyk/Lmhhc0F0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgIGlmICgoZS50YXJnZXQgYXMgSFRNTEVsZW1lbnQpLmxvY2FsTmFtZSA9PT0gJ2Rld3MtY2hlY2tib3gnKSB7XG4gICAgICB0aGlzLl9hbGxDaGVja1N0YXRlID0gKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICB9XG4gICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yQWxsKCcubXVsdGktY2hlY2tib3gnKS5mb3JFYWNoKCRlbCA9PiB7XG4gICAgICBpZiAodGhpcy5fYWxsQ2hlY2tTdGF0ZSkge1xuICAgICAgICAkZWwuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRlbC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3NpbmdsZUl0ZW1TZWxlY3QoZTogTW91c2VFdmVudCkge1xuICAgIGNvbnN0ICRlbDogSFRNTEVsZW1lbnQgPSBlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuY2hlY2snKT8uY2xhc3NMaXN0Py5yZW1vdmUoJ2NoZWNrJyk7XG4gICAgJGVsLmNsYXNzTGlzdC5hZGQoJ2NoZWNrJyk7XG4gICAgdGhpcy5zZWxlY3RbMF0gPSAkZWwuZGF0YXNldC52YWx1ZSBhcyBzdHJpbmc7XG4gICAgdGhpcy5fY2xvc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX211bHRpSXRlbVNlbGVjdChlOiBNb3VzZUV2ZW50KSB7XG4gICAgY29uc3QgJGVsOiBIVE1MRWxlbWVudCA9IChlLmN1cnJlbnRUYXJnZXQgYXMgSFRNTEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1jaGVja2JveCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICh0aGlzLl9hbGxDaGVja1N0YXRlKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5tdWx0aS1jaGVja2JveCcpPy5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICB9XG4gICAgaWYgKCRlbC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgaWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkubG9jYWxOYW1lICE9PSAnZGV3cy1jaGVja2JveCcpIHtcbiAgICAgICAgJGVsLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5sb2NhbE5hbWUgIT09ICdkZXdzLWNoZWNrYm94Jykge1xuICAgICAgICAkZWwuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jb25maXJtQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMuX211bHRpQ2hlY2sgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ID0gW107XG4gICAgdGhpcy5fc2VsZWN0TGlzdCA9IFtdO1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvckFsbCgnLm11bHRpLWNoZWNrYm94JykuZm9yRWFjaCgkZWwgPT4ge1xuICAgICAgaWYgKCRlbC5oYXNBdHRyaWJ1dGUoJ2NoZWNrZWQnKSkge1xuICAgICAgICBpZiAoJGVsLnBhcmVudEVsZW1lbnQ/LmRhdGFzZXQudmFsdWUgIT09ICdhbGxDaGVjaycpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdC5wdXNoKCgkZWwucGFyZW50RWxlbWVudCBhcyBIVE1MRGl2RWxlbWVudCkuZGF0YXNldC52YWx1ZSEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbGVjdExpc3QucHVzaCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdExpc3QucHVzaChmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fY2xvc2UoKTtcbiAgfVxuXG4gIGNsaWNrKCkge1xuICAgIHRoaXMuX2NvbmZpcm1DbGlja0hhbmRsZXIoKTtcbiAgICB0aGlzLl9jbGlja0hhbmRsZXIobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG91Y2hNb3ZlKGU6IGFueSkge1xuICAgIGUucGFzc2l2ZSA9IHRydWU7XG4gICAgZS5jYXB0dXJlID0gdHJ1ZTtcbiAgICBlLmN1cnJlbnRUYXJnZXQuc2Nyb2xsVG8oMCwgdGhpcy5fc3RhcnRQb2ludCEgLSBlLmNoYW5nZWRUb3VjaGVzWzBdLnNjcmVlblkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG91Y2hTdGFydChlOiBhbnkpIHtcbiAgICB0aGlzLl9zdGFydFBvaW50ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5zY3JlZW5ZICsgZS5jdXJyZW50VGFyZ2V0LnNjcm9sbFRvcDtcbiAgfVxuXG4gIHByaXZhdGUgX2ZvY3VzKCkge1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnNlbGVjdC13cmFwJyk/LmNsYXNzTGlzdC5hZGQoJ2ZvY3VzJyk7XG4gIH1cblxuICBwcml2YXRlIF9ibHVyKCkge1xuICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLnNlbGVjdC13cmFwJyk/LmNsYXNzTGlzdC5yZW1vdmUoJ2ZvY3VzJyk7XG4gIH1cblxuICBwcml2YXRlIF9jbGlja0hhbmRsZXIoZTogTW91c2VFdmVudCkge1xuICAgIGlmICghdGhpcy5kaXNhYmxlZCAmJiAhdGhpcy5yZWFkb25seSkge1xuICAgICAgY29uc3QgJGVsOiBEcmF3ZXJsYXlvdXQgfCBudWxsID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpO1xuICAgICAgd2luZG93LnNjcm9sbFRvKFxuICAgICAgICAwLFxuICAgICAgICB3aW5kb3cucGFnZVlPZmZzZXQgK1xuICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk/LnRvcCEgLVxuICAgICAgICAgIHRoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRyb3Bkb3duLWxpc3Qtd3JhcCcpPy5jbGllbnRIZWlnaHQhIC1cbiAgICAgICAgICAyNVxuICAgICAgKTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gYCR7dGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tbGlzdC13cmFwJykhLmNsaWVudEhlaWdodCArIDEyMH1weGA7XG4gICAgICAkZWwhLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgdGhpcy5fb3BlbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29wZW4oKSB7XG4gICAgdGhpcy5fZm9jdXMoKTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tdWx0aS1jaGVja2JveCcpLmZvckVhY2goKCRlbCwgaW5kZXgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zZWxlY3RMaXN0W2luZGV4XSkge1xuICAgICAgICAkZWwuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ3RydWUnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlKCkge1xuICAgIHRoaXMuX2JsdXIoKTtcbiAgICBpZiAodGhpcy5tdWx0aSAmJiAhdGhpcy5fbXVsdGlDaGVjaykge1xuICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yQWxsKCcubXVsdGktY2hlY2tib3gnKS5mb3JFYWNoKCRlbCA9PiB7XG4gICAgICAgIGlmICgkZWwuaGFzQXR0cmlidXRlKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAkZWwucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZG9tQ2xpY2tIYW5kZWxyKGU6IE1vdXNlRXZlbnQpIHtcbiAgICBpZiAoZS5pc1RydXN0ZWQpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZS5jbGllbnRZIDxcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IC1cbiAgICAgICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kcmF3ZXItbGF5b3V0Jyk/LnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5sYXllci1ib3R0b20nKT8uY2xpZW50SGVpZ2h0IVxuICAgICAgKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvdW50ID49IDEpIHtcbiAgICAgICAgICB0aGlzLl9jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9jb3VudCsrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZEV2ZW50ID0gdGhpcy5fZG9tQ2xpY2tIYW5kZWxyLmJpbmQodGhpcyk7XG5cbiAgcHJvdGVjdGVkIGZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXM6IFByb3BlcnR5VmFsdWVzKSB7XG4gICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuZHJhd2VyLWxheW91dCcpPy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcy5fY2xvc2UpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3Qtd3JhcCcpPy5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5yZWFkb25seSkge1xuICAgICAgdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0LXdyYXAnKT8uY2xhc3NMaXN0LmFkZCgncmVhZG9ubHknKTtcbiAgICB9XG4gICAgc3VwZXIuZmlyc3RVcGRhdGVkKF9jaGFuZ2VkUHJvcGVydGllcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2hvdWxkVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fYWRkRXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jb3VudCA9IDA7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX2FkZEV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=