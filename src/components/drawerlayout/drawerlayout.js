import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { customElement, internalProperty, property } from 'lit-element';
import template from './drawerlayout.html';
import scss from './drawerlayout.scss';
let Drawerlayout = class Drawerlayout extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.active = false;
        this.scrollEnabled = false;
        this._height = '0px';
        this.drower = 'bottom';
        this._moveState = false;
        this.close = new Event('close');
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    _blur() {
        console.log('blur');
    }
    _mouseMove(e) {
        if (this._moveState) {
            this._height = `${this._defaultHeight + (this._moveStart - e.screenY)}px`;
        }
        window.pageYOffset;
    }
    _mouseDown(e) {
        var _a;
        this._moveState = true;
        this._moveStart = e.screenY;
        this._defaultHeight = (_a = this.shadowRoot.querySelector('.layer-bottom')) === null || _a === void 0 ? void 0 : _a.clientHeight;
        // this.shadowRoot.querySelector('.layer-drawer').classList.add('moving');
    }
    _mouseUp(e) {
        this._moveState = false;
        this._moveEnd = e.screenY;
        // this.shadowRoot.querySelector('.layer-drawer').classList.remove('moving');
        if (Math.abs(this._moveStart - this._moveEnd) < 5) {
            this.dispatchEvent(this.close);
        }
    }
    _touchMove(e) {
        if (this.scrollEnabled) {
            e.preventDefault();
            e.passive = true;
            e.capture = true;
            if (this._moveState) {
                this._height = `${this._defaultHeight + (this._moveStart - e.changedTouches[0].screenY)}px`;
            }
        }
    }
    _touchEnd(e) {
        var _a;
        // e.preventDefault();
        this._moveState = false;
        this._moveEnd = e.changedTouches[0].screenY;
        (_a = this.shadowRoot.querySelector('.layer-bottom')) === null || _a === void 0 ? void 0 : _a.classList.remove('little_moving');
        if (Math.abs(this._moveStart - this._moveEnd) < 5) {
            this.dispatchEvent(this.close);
        }
    }
    _close() {
        this.dispatchEvent(this.close);
    }
    _touchStart(e) {
        var _a, _b;
        this._moveStart = e.changedTouches[0].screenY;
        this._defaultHeight = (_a = this.shadowRoot.querySelector('.layer-bottom')) === null || _a === void 0 ? void 0 : _a.clientHeight;
        (_b = this.shadowRoot.querySelector('.layer-bottom')) === null || _b === void 0 ? void 0 : _b.classList.add('little_moving');
        this._moveState = true;
    }
    shouldUpdate(_changedProperties) {
        if (_changedProperties.get('active') !== undefined) {
            if (this._height !== '0px') {
                this._height = '0px';
            }
            else {
                if (this.height === undefined) {
                    this._height = `${window.innerHeight - 200}px`;
                }
                else {
                    this._height = `calc(100% - ${this.height})`;
                }
            }
        }
        return super.shouldUpdate(_changedProperties);
    }
    render() {
        return template.call(this);
    }
};
Drawerlayout.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Drawerlayout.prototype, "title", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Drawerlayout.prototype, "active", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], Drawerlayout.prototype, "height", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Drawerlayout.prototype, "scrollEnabled", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Object)
], Drawerlayout.prototype, "_height", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], Drawerlayout.prototype, "drower", void 0);
Drawerlayout = __decorate([
    customElement('drawer-layout')
], Drawerlayout);
export { Drawerlayout };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhd2VybGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHJhd2VybGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFFeEYsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyxJQUFJLE1BQU0scUJBQXFCLENBQUM7QUFHdkMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLGlCQUFpQjtJQUFuRDs7UUFJRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsV0FBTSxHQUFHLEtBQUssQ0FBQztRQU1mLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBR2QsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUd4QixXQUFNLEdBQXVCLFFBQVEsQ0FBQztRQUs5QixlQUFVLEdBQXdCLEtBQUssQ0FBQztRQUN4QyxVQUFLLEdBQVUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUF3RjVDLENBQUM7SUF0RkMsaUJBQWlCO1FBQ2YsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sS0FBSztRQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVPLFVBQVUsQ0FBQyxDQUFhO1FBQzlCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFXLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDN0U7UUFFRCxNQUFNLENBQUMsV0FB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RUFBRTtvQkFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLENBQUM7aUJBQ2hEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7aUJBQzlDO2FBQ0Y7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRixDQUFBO0FBaEhRLG1CQUFNLEdBQUcsSUFBSSxDQUFDO0FBR3JCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDOzsyQ0FDaEI7QUFHWDtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDNUI7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NENBQ0E7QUFHM0I7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7O21EQUNOO0FBR3RCO0lBREMsZ0JBQWdCLEVBQUU7OzZDQUNLO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7OzRDQUNKO0FBbkIzQixZQUFZO0lBRHhCLGFBQWEsQ0FBQyxlQUFlLENBQUM7R0FDbEIsWUFBWSxDQWlIeEI7U0FqSFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS9EZXdzRm9ybUNvbXBvbmVudC5qcyc7XG5pbXBvcnQgeyBjdXN0b21FbGVtZW50LCBpbnRlcm5hbFByb3BlcnR5LCBwcm9wZXJ0eSwgUHJvcGVydHlWYWx1ZXMgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2RyYXdlcmxheW91dC5odG1sJztcbmltcG9ydCBzY3NzIGZyb20gJy4vZHJhd2VybGF5b3V0LnNjc3MnO1xuXG5AY3VzdG9tRWxlbWVudCgnZHJhd2VyLWxheW91dCcpXG5leHBvcnQgY2xhc3MgRHJhd2VybGF5b3V0IGV4dGVuZHMgRGV3c0Zvcm1Db21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdGl0bGUgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuLCByZWZsZWN0OiB0cnVlIH0pXG4gIGFjdGl2ZSA9IGZhbHNlO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZyB9KVxuICBoZWlnaHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIHNjcm9sbEVuYWJsZWQgPSBmYWxzZTtcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgX2hlaWdodCA9ICcwcHgnO1xuXG4gIEBwcm9wZXJ0eSh7IHR5cGU6IFN0cmluZywgcmVmbGVjdDogdHJ1ZSB9KVxuICBkcm93ZXI6ICdib3R0b20nIHwgJ3JpZ2h0JyA9ICdib3R0b20nO1xuXG4gIHByaXZhdGUgX21vdmVTdGFydDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9tb3ZlRW5kOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2RlZmF1bHRIZWlnaHQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfbW92ZVN0YXRlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gZmFsc2U7XG4gIHByaXZhdGUgY2xvc2U6IEV2ZW50ID0gbmV3IEV2ZW50KCdjbG9zZScpO1xuXG4gIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmx1cigpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnYmx1cicpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbW92ZVN0YXRlKSB7XG4gICAgICB0aGlzLl9oZWlnaHQgPSBgJHt0aGlzLl9kZWZhdWx0SGVpZ2h0ISArICh0aGlzLl9tb3ZlU3RhcnQhIC0gZS5zY3JlZW5ZKX1weGA7XG4gICAgfVxuXG4gICAgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBfbW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHtcbiAgICB0aGlzLl9tb3ZlU3RhdGUgPSB0cnVlO1xuICAgIHRoaXMuX21vdmVTdGFydCA9IGUuc2NyZWVuWTtcbiAgICB0aGlzLl9kZWZhdWx0SGVpZ2h0ID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcubGF5ZXItYm90dG9tJyk/LmNsaWVudEhlaWdodDtcbiAgICAvLyB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmxheWVyLWRyYXdlcicpLmNsYXNzTGlzdC5hZGQoJ21vdmluZycpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW91c2VVcChlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5fbW92ZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZUVuZCA9IGUuc2NyZWVuWTtcbiAgICAvLyB0aGlzLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLmxheWVyLWRyYXdlcicpLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmluZycpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLl9tb3ZlU3RhcnQhIC0gdGhpcy5fbW92ZUVuZCEpIDwgNSkge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuY2xvc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoTW92ZShlOiBUb3VjaEV2ZW50ICYgQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5zY3JvbGxFbmFibGVkKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnBhc3NpdmUgPSB0cnVlO1xuICAgICAgZS5jYXB0dXJlID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLl9tb3ZlU3RhdGUpIHtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gYCR7dGhpcy5fZGVmYXVsdEhlaWdodCEgKyAodGhpcy5fbW92ZVN0YXJ0ISAtIGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWSl9cHhgO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoRW5kKGU6IFRvdWNoRXZlbnQpIHtcbiAgICAvLyBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5fbW92ZVN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5fbW92ZUVuZCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5sYXllci1ib3R0b20nKT8uY2xhc3NMaXN0LnJlbW92ZSgnbGl0dGxlX21vdmluZycpO1xuICAgIGlmIChNYXRoLmFicyh0aGlzLl9tb3ZlU3RhcnQhIC0gdGhpcy5fbW92ZUVuZCEpIDwgNSkge1xuICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuY2xvc2UpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2Nsb3NlKCkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmNsb3NlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvdWNoU3RhcnQoZTogVG91Y2hFdmVudCkge1xuICAgIHRoaXMuX21vdmVTdGFydCA9IGUuY2hhbmdlZFRvdWNoZXNbMF0uc2NyZWVuWTtcbiAgICB0aGlzLl9kZWZhdWx0SGVpZ2h0ID0gdGhpcy5zaGFkb3dSb290IS5xdWVyeVNlbGVjdG9yKCcubGF5ZXItYm90dG9tJyk/LmNsaWVudEhlaWdodDtcbiAgICB0aGlzLnNoYWRvd1Jvb3QhLnF1ZXJ5U2VsZWN0b3IoJy5sYXllci1ib3R0b20nKT8uY2xhc3NMaXN0LmFkZCgnbGl0dGxlX21vdmluZycpO1xuICAgIHRoaXMuX21vdmVTdGF0ZSA9IHRydWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2hvdWxkVXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllczogUHJvcGVydHlWYWx1ZXMpOiBib29sZWFuIHtcbiAgICBpZiAoX2NoYW5nZWRQcm9wZXJ0aWVzLmdldCgnYWN0aXZlJykgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHRoaXMuX2hlaWdodCAhPT0gJzBweCcpIHtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gJzBweCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGAke3dpbmRvdy5pbm5lckhlaWdodCAtIDIwMH1weGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5faGVpZ2h0ID0gYGNhbGMoMTAwJSAtICR7dGhpcy5oZWlnaHR9KWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyLnNob3VsZFVwZGF0ZShfY2hhbmdlZFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=