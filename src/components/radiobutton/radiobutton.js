import { __decorate, __metadata } from "tslib";
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';
import template from './radiobutton.html';
import scss from './radiobutton.scss';
export class Radiobutton extends DewsFormComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this.readonly = false;
        this.disabled = false;
        this.checked = false;
        /*
         * Event
         * */
        this._checked = new CustomEvent('check');
    }
    _clickHandler() {
        if (!this.disabled) {
            this.checked = !this.checked;
        }
        if (this.checked === true) {
            this.dispatchEvent(this._checked);
        }
    }
    render() {
        return template.call(this);
    }
}
Radiobutton.styles = scss;
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], Radiobutton.prototype, "title", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], Radiobutton.prototype, "readonly", void 0);
__decorate([
    property({ type: Boolean, attribute: 'disabled' }),
    __metadata("design:type", Object)
], Radiobutton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Radiobutton.prototype, "checked", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpb2J1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDakUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLFFBQVEsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLElBQUksTUFBTSxvQkFBb0IsQ0FBQztBQUV0QyxNQUFNLE9BQU8sV0FBWSxTQUFRLGlCQUFpQjtJQUFsRDs7UUFJRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR1gsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR2pCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEI7O2FBRUs7UUFDRyxhQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFjOUMsQ0FBQztJQVpTLGFBQWE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDOUI7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7QUE5Qk0sa0JBQU0sR0FBRyxJQUFJLENBQUM7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MENBQy9CO0FBR1g7SUFEQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7OzZDQUNYO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUM7OzZDQUNsQztBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOzs0Q0FDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZXdzRm9ybUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvRGV3c0Zvcm1Db21wb25lbnQuanMnO1xuaW1wb3J0IHsgcHJvcGVydHkgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3JhZGlvYnV0dG9uLmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9yYWRpb2J1dHRvbi5zY3NzJztcblxuZXhwb3J0IGNsYXNzIFJhZGlvYnV0dG9uIGV4dGVuZHMgRGV3c0Zvcm1Db21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcsIHJlZmxlY3Q6IHRydWUgfSlcbiAgdGl0bGUgPSAnJztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBCb29sZWFuIH0pXG4gIHJlYWRvbmx5ID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgYXR0cmlidXRlOiAnZGlzYWJsZWQnIH0pXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQHByb3BlcnR5KHsgdHlwZTogQm9vbGVhbiwgcmVmbGVjdDogdHJ1ZSB9KVxuICBjaGVja2VkID0gZmFsc2U7XG5cbiAgLypcbiAgICogRXZlbnRcbiAgICogKi9cbiAgcHJpdmF0ZSBfY2hlY2tlZCA9IG5ldyBDdXN0b21FdmVudCgnY2hlY2snKTtcblxuICBwcml2YXRlIF9jbGlja0hhbmRsZXIoKSB7XG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLmNoZWNrZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIH1cbiAgICBpZiAodGhpcy5jaGVja2VkID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5fY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jYWxsKHRoaXMpO1xuICB9XG59XG4iXX0=