import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { internalProperty, property } from 'lit-element';
import template from './box.html';
import scss from './box.scss';
// import { MainButton, MainButtonSet } from '../../app/main/MainButtons.js';
// noinspection JSUnusedLocalSymbols
export class Box extends DewsLayoutComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.collapsed = false;
        this.hide = false;
        this.height = 'auto';
        // 하단 버튼
        this.buttonSet = '';
        this.enable = (value) => {
            return (this.collapsed = value);
        };
    }
    // public _mainButtonSet: MainButtonSet | undefined;
    async connectedCallback() {
        super.connectedCallback();
        await this.updateComplete;
        await this.setMainButtonSet();
        this.addEventListener('click', this._clickEvent);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this._clickEvent);
    }
    async setMainButtonSet() {
        if (this.buttonSet !== '') {
            // const mainButtonSet = new MainButtonSet();
            this.buttonSet.split(',').forEach(item => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                const mainButton = mainButtonSet[item];
                if (mainButton) {
                    mainButton.show();
                    mainButton.onclick = () => {
                        alert(`click: ${item}`);
                    };
                }
                else {
                    console.error(`Main Button Set Error: ${this.title} ${item}`);
                }
            });
            // this._mainButtonSet = mainButtonSet;
        }
        return;
    }
    _blurEvent() {
        //블러이벤트
    }
    _clickEvent(e) {
        // 직접 일으킨 이벤트만 처리하기 위해 isTrusted 사용
        if (e.isTrusted) {
            this._focusChanging(e);
        }
    }
    _onToggleClick(e) {
        this._toggleOpened(e);
    }
    _toggleOpened(e) {
        if (!this.collapsed) {
            this.collapsed = true;
            this.height = '0px';
            const close = new CustomEvent('close');
            this.dispatchEvent(close);
        }
        else {
            // this.open();
            const open = new CustomEvent('open');
            this.dispatchEvent(open);
            this.collapsed = false;
            this.height = this.slotHeight;
        }
    }
    async slotChange() {
        var _a, _b;
        if (this.collapsed) {
            this.height = '0px';
        }
        const children = this.shadowRoot.querySelectorAll('*');
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        await Promise.all(Array.from(children).map(c => c.updateComplete));
        this.slotHeight = `${(_a = this.shadowRoot.querySelector('.dews-box-content-wrap')) === null || _a === void 0 ? void 0 : _a.clientHeight}px`;
        if (!this.collapsed) {
            this.height = this.slotHeight;
        }
        else {
            this.slotHeight = `${(_b = this.shadowRoot.querySelector('.dews-box-content')) === null || _b === void 0 ? void 0 : _b.clientHeight}px`;
        }
    }
    render() {
        console.log('render');
        return this.hide ? null : template.call(this);
    }
}
Box.styles = scss;
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], Box.prototype, "title", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Box.prototype, "collapsed", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Box.prototype, "hide", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Box.prototype, "height", void 0);
__decorate([
    property({ type: String, attribute: 'button-set' }),
    __metadata("design:type", Object)
], Box.prototype, "buttonSet", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm94LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpELE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUNsQyxPQUFPLElBQUksTUFBTSxZQUFZLENBQUM7QUFDOUIsNkVBQTZFO0FBRTdFLG9DQUFvQztBQUNwQyxNQUFNLE9BQU8sR0FBSSxTQUFRLG1CQUFtQjtJQUE1Qzs7UUFJRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUdsQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBR2IsV0FBTSxHQUFHLE1BQU0sQ0FBQztRQUloQixRQUFRO1FBRVIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQWtFTCxXQUFNLEdBQWEsQ0FBQyxLQUFjLEVBQUUsRUFBRTtZQUM5QyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUM7SUFzQkosQ0FBQztJQXhGQyxvREFBb0Q7SUFFcEQsS0FBSyxDQUFDLGlCQUFpQjtRQUNyQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDMUIsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsb0JBQW9CO1FBQ2xCLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFD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QUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUEzR00sVUFBTSxHQUFHLElBQUksQ0FBQztBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztrQ0FDL0I7QUFHWDtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQzs7c0NBQ1Y7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7O2lDQUNmO0FBR2I7SUFEQyxnQkFBZ0IsRUFBRTs7bUNBQ0g7QUFNaEI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBQzs7c0NBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGV3c0xheW91dENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0xheW91dENvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBpbnRlcm5hbFByb3BlcnR5LCBwcm9wZXJ0eSB9IGZyb20gJ2xpdC1lbGVtZW50JztcblxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vYm94Lmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9ib3guc2Nzcyc7XG4vLyBpbXBvcnQgeyBNYWluQnV0dG9uLCBNYWluQnV0dG9uU2V0IH0gZnJvbSAnLi4vLi4vYXBwL21haW4vTWFpbkJ1dHRvbnMuanMnO1xuXG4vLyBub2luc3BlY3Rpb24gSlNVbnVzZWRMb2NhbFN5bWJvbHNcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBEZXdzTGF5b3V0Q29tcG9uZW50IHtcbiAgc3RhdGljIHN0eWxlcyA9IHNjc3M7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogU3RyaW5nLCByZWZsZWN0OiB0cnVlIH0pXG4gIHRpdGxlID0gJyc7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiB9KVxuICBjb2xsYXBzZWQgPSBmYWxzZTtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIGhpZGUgPSBmYWxzZTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIGhlaWdodCA9ICdhdXRvJztcblxuICBwcml2YXRlIHNsb3RIZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvLyDtlZjri6gg67KE7Yq8XG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZywgYXR0cmlidXRlOiAnYnV0dG9uLXNldCcgfSlcbiAgYnV0dG9uU2V0ID0gJyc7XG5cbiAgLy8gcHVibGljIF9tYWluQnV0dG9uU2V0OiBNYWluQnV0dG9uU2V0IHwgdW5kZWZpbmVkO1xuXG4gIGFzeW5jIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVDb21wbGV0ZTtcbiAgICBhd2FpdCB0aGlzLnNldE1haW5CdXR0b25TZXQoKTtcbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fY2xpY2tFdmVudCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9jbGlja0V2ZW50KTtcbiAgfVxuICBwcml2YXRlIGFzeW5jIHNldE1haW5CdXR0b25TZXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuYnV0dG9uU2V0ICE9PSAnJykge1xuICAgICAgLy8gY29uc3QgbWFpbkJ1dHRvblNldCA9IG5ldyBNYWluQnV0dG9uU2V0KCk7XG4gICAgICB0aGlzLmJ1dHRvblNldC5zcGxpdCgnLCcpLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWlnbm9yZVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IG1haW5CdXR0b24gPSBtYWluQnV0dG9uU2V0W2l0ZW1dIGFzIE1haW5CdXR0b247XG4gICAgICAgIGlmIChtYWluQnV0dG9uKSB7XG4gICAgICAgICAgbWFpbkJ1dHRvbi5zaG93KCk7XG4gICAgICAgICAgbWFpbkJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgYWxlcnQoYGNsaWNrOiAke2l0ZW19YCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBNYWluIEJ1dHRvbiBTZXQgRXJyb3I6ICR7dGhpcy50aXRsZX0gJHtpdGVtfWApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIHRoaXMuX21haW5CdXR0b25TZXQgPSBtYWluQnV0dG9uU2V0O1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBwdWJsaWMgX2JsdXJFdmVudCgpIHtcbiAgICAvL+u4lOufrOydtOuypO2KuFxuICB9XG5cbiAgcHJpdmF0ZSBfY2xpY2tFdmVudChlOiBFdmVudCkge1xuICAgIC8vIOyngeygkSDsnbzsnLztgqgg7J2067Kk7Yq466eMIOyymOumrO2VmOq4sCDsnITtlbQgaXNUcnVzdGVkIOyCrOyaqVxuICAgIGlmIChlLmlzVHJ1c3RlZCkge1xuICAgICAgdGhpcy5fZm9jdXNDaGFuZ2luZyhlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vblRvZ2dsZUNsaWNrKGU6IEV2ZW50KSB7XG4gICAgdGhpcy5fdG9nZ2xlT3BlbmVkKGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlT3BlbmVkKGU/OiBFdmVudCkge1xuICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gJzBweCc7XG4gICAgICBjb25zdCBjbG9zZSA9IG5ldyBDdXN0b21FdmVudCgnY2xvc2UnKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChjbG9zZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoaXMub3BlbigpO1xuICAgICAgY29uc3Qgb3BlbiA9IG5ldyBDdXN0b21FdmVudCgnb3BlbicpO1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG9wZW4pO1xuICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zbG90SGVpZ2h0IGFzIHN0cmluZztcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZW5hYmxlOiBGdW5jdGlvbiA9ICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiAodGhpcy5jb2xsYXBzZWQgPSB2YWx1ZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBhc3luYyBzbG90Q2hhbmdlKCkge1xuICAgIGlmICh0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5oZWlnaHQgPSAnMHB4JztcbiAgICB9XG4gICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1pZ25vcmVcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoQXJyYXkuZnJvbShjaGlsZHJlbikubWFwKGMgPT4gYy51cGRhdGVDb21wbGV0ZSkpO1xuICAgIHRoaXMuc2xvdEhlaWdodCA9IGAke3RoaXMuc2hhZG93Um9vdCEucXVlcnlTZWxlY3RvcignLmRld3MtYm94LWNvbnRlbnQtd3JhcCcpPy5jbGllbnRIZWlnaHR9cHhgO1xuICAgIGlmICghdGhpcy5jb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5zbG90SGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNsb3RIZWlnaHQgPSBgJHt0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5kZXdzLWJveC1jb250ZW50Jyk/LmNsaWVudEhlaWdodH1weGA7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnNvbGUubG9nKCdyZW5kZXInKTtcbiAgICByZXR1cm4gdGhpcy5oaWRlID8gbnVsbCA6IHRlbXBsYXRlLmNhbGwodGhpcyk7XG4gIH1cbn1cbiJdfQ==