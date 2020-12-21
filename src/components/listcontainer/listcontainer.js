import { __decorate, __metadata } from "tslib";
import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property } from 'lit-element';
import template from './listcontainer.html';
import scss from './listcontainer.scss';
export class ListContainer extends DewsLayoutComponent {
    constructor() {
        super(...arguments);
        this.title = '';
        this._buttonList = [];
        this._contentList = [];
        this._summaryList = [];
    }
    _contentView() {
        var _a, _b;
        const contentChildLength = (_a = this.querySelector('container-content')) === null || _a === void 0 ? void 0 : _a.childElementCount;
        const contentChildItem = (_b = this.querySelector('container-content')) === null || _b === void 0 ? void 0 : _b.children;
        if (contentChildLength <= 0 || contentChildItem == undefined) {
            return;
        }
        for (let i = 0; i < contentChildLength; i++) {
            this._contentList.push(html `${contentChildItem.item(i)}`);
        }
        // this.querySelector('container-content').remove();
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
    _summaryView() {
        var _a, _b;
        const summaryChildLength = (_a = this.querySelector('container-summary')) === null || _a === void 0 ? void 0 : _a.childElementCount;
        const summaryChildItem = (_b = this.querySelector('container-summary')) === null || _b === void 0 ? void 0 : _b.children;
        const _summaryItem = [];
        if (summaryChildLength <= 0 || summaryChildItem == undefined) {
            return;
        }
        for (let i = 0; i < summaryChildLength; i++) {
            _summaryItem.push(html `${summaryChildItem.item(i)}`);
        }
        this._summaryList.push(html `
      <div class="option-summary">
        <div class="summary-contents">${_summaryItem}</div>
      </div>
    `);
        // this.querySelector('container-summary').remove();
    }
    connectedCallback() {
        super.connectedCallback();
        this._customButtonView();
        this._summaryView();
        this._contentView();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    _slotChange(e) {
        //slot change
    }
    render() {
        return template.call(this);
    }
}
ListContainer.styles = scss;
__decorate([
    property({ type: String }),
    __metadata("design:type", Object)
], ListContainer.prototype, "title", void 0);
__decorate([
    internalProperty(),
    __metadata("design:type", Array)
], ListContainer.prototype, "_buttonList", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3Rjb250YWluZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFrQixNQUFNLGFBQWEsQ0FBQztBQUUvRSxPQUFPLFFBQVEsTUFBTSxzQkFBc0IsQ0FBQztBQUM1QyxPQUFPLElBQUksTUFBTSxzQkFBc0IsQ0FBQztBQUV4QyxNQUFNLE9BQU8sYUFBYyxTQUFRLG1CQUFtQjtJQUF0RDs7UUFJRSxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBR0gsZ0JBQVcsR0FBMEIsRUFBRSxDQUFDO1FBRXhDLGlCQUFZLEdBQTBCLEVBQUUsQ0FBQztRQUV6QyxpQkFBWSxHQUEwQixFQUFFLENBQUM7SUE0RW5ELENBQUM7SUExRVMsWUFBWTs7UUFDbEIsTUFBTSxrQkFBa0IsU0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLGlCQUFpQixDQUFDO1FBQ3RGLE1BQU0sZ0JBQWdCLFNBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQywwQ0FBRSxRQUFRLENBQUM7UUFDM0UsSUFBSSxrQkFBbUIsSUFBSSxDQUFDLElBQUksZ0JBQWdCLElBQUksU0FBUyxFQUFFO1lBQzdELE9BQU87U0FDUjtRQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxrQkFBbUIsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNEO1FBQ0Qsb0RBQW9EO0lBQ3RELENBQUM7SUFFTyxpQkFBaUI7O1FBQ3ZCLE1BQU0saUJBQWlCLFNBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxpQkFBaUIsQ0FBQztRQUNwRixNQUFNLGVBQWUsU0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLDBDQUFFLFFBQVEsQ0FBQztRQUN6RSxJQUFJLGlCQUFrQixJQUFJLENBQUMsSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFO1lBQzNELE9BQU87U0FDUjtRQUVELE1BQU0saUJBQWlCLEdBQTBCLEVBQUUsQ0FBQztRQUNwRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWtCLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0MsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQSxPQUFPLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ25CLElBQUksQ0FBQTs7O2NBR0ksaUJBQWlCOzs7T0FHeEIsQ0FDRixDQUFDO1FBQ0YsbURBQW1EO0lBQ3JELENBQUM7SUFFTyxZQUFZOztRQUNsQixNQUFNLGtCQUFrQixTQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsMENBQUUsaUJBQWlCLENBQUM7UUFDdEYsTUFBTSxnQkFBZ0IsU0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLDBDQUFFLFFBQVEsQ0FBQztRQUMzRSxNQUFNLFlBQVksR0FBMEIsRUFBRSxDQUFDO1FBRS9DLElBQUksa0JBQW1CLElBQUksQ0FBQyxJQUFJLGdCQUFnQixJQUFJLFNBQVMsRUFBRTtZQUM3RCxPQUFPO1NBQ1I7UUFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsa0JBQW1CLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBOzt3Q0FFUyxZQUFZOztLQUUvQyxDQUFDLENBQUM7UUFFSCxvREFBb0Q7SUFDdEQsQ0FBQztJQUVELGlCQUFpQjtRQUNmLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sV0FBVyxDQUFDLENBQWlCO1FBQ25DLGFBQWE7SUFDZixDQUFDO0lBRUQsTUFBTTtRQUNKLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztBQXJGTSxvQkFBTSxHQUFHLElBQUksQ0FBQztBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7NENBQ2hCO0FBR1g7SUFEQyxnQkFBZ0IsRUFBRTs4QkFDRSxLQUFLO2tEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERld3NMYXlvdXRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlL0Rld3NMYXlvdXRDb21wb25lbnQuanMnO1xuaW1wb3J0IHsgaHRtbCwgaW50ZXJuYWxQcm9wZXJ0eSwgcHJvcGVydHksIFRlbXBsYXRlUmVzdWx0IH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9saXN0Y29udGFpbmVyLmh0bWwnO1xuaW1wb3J0IHNjc3MgZnJvbSAnLi9saXN0Y29udGFpbmVyLnNjc3MnO1xuXG5leHBvcnQgY2xhc3MgTGlzdENvbnRhaW5lciBleHRlbmRzIERld3NMYXlvdXRDb21wb25lbnQge1xuICBzdGF0aWMgc3R5bGVzID0gc2NzcztcblxuICBAcHJvcGVydHkoeyB0eXBlOiBTdHJpbmcgfSlcbiAgdGl0bGUgPSAnJztcblxuICBAaW50ZXJuYWxQcm9wZXJ0eSgpXG4gIHByaXZhdGUgX2J1dHRvbkxpc3Q6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuXG4gIHByaXZhdGUgX2NvbnRlbnRMaXN0OiBBcnJheTxUZW1wbGF0ZVJlc3VsdD4gPSBbXTtcblxuICBwcml2YXRlIF9zdW1tYXJ5TGlzdDogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG5cbiAgcHJpdmF0ZSBfY29udGVudFZpZXcoKSB7XG4gICAgY29uc3QgY29udGVudENoaWxkTGVuZ3RoID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpPy5jaGlsZEVsZW1lbnRDb3VudDtcbiAgICBjb25zdCBjb250ZW50Q2hpbGRJdGVtID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItY29udGVudCcpPy5jaGlsZHJlbjtcbiAgICBpZiAoY29udGVudENoaWxkTGVuZ3RoISA8PSAwIHx8IGNvbnRlbnRDaGlsZEl0ZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudENoaWxkTGVuZ3RoITsgaSsrKSB7XG4gICAgICB0aGlzLl9jb250ZW50TGlzdC5wdXNoKGh0bWxgJHtjb250ZW50Q2hpbGRJdGVtLml0ZW0oaSl9YCk7XG4gICAgfVxuICAgIC8vIHRoaXMucXVlcnlTZWxlY3RvcignY29udGFpbmVyLWNvbnRlbnQnKS5yZW1vdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1c3RvbUJ1dHRvblZpZXcoKSB7XG4gICAgY29uc3QgYnV0dG9uQ2hpbGRMZW5ndGggPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1idXR0b24nKT8uY2hpbGRFbGVtZW50Q291bnQ7XG4gICAgY29uc3QgYnV0dG9uQ2hpbGRJdGVtID0gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItYnV0dG9uJyk/LmNoaWxkcmVuO1xuICAgIGlmIChidXR0b25DaGlsZExlbmd0aCEgPD0gMCB8fCBidXR0b25DaGlsZEl0ZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgX2N1c3RvbUJ1dHRvbkxpc3Q6IEFycmF5PFRlbXBsYXRlUmVzdWx0PiA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnV0dG9uQ2hpbGRMZW5ndGghOyBpKyspIHtcbiAgICAgIF9jdXN0b21CdXR0b25MaXN0LnB1c2goaHRtbGA8bGk+JHtidXR0b25DaGlsZEl0ZW0uaXRlbShpKX08L2xpPmApO1xuICAgIH1cbiAgICB0aGlzLl9idXR0b25MaXN0LnB1c2goXG4gICAgICBodG1sYFxuICAgICAgICA8ZGl2IGNsYXNzPVwib3B0aW9uLWN1c3RvbS1idXR0b25cIj5cbiAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAke19jdXN0b21CdXR0b25MaXN0fVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYFxuICAgICk7XG4gICAgLy8gdGhpcy5xdWVyeVNlbGVjdG9yKCdjb250YWluZXItYnV0dG9uJykucmVtb3ZlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdW1tYXJ5VmlldygpIHtcbiAgICBjb25zdCBzdW1tYXJ5Q2hpbGRMZW5ndGggPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1zdW1tYXJ5Jyk/LmNoaWxkRWxlbWVudENvdW50O1xuICAgIGNvbnN0IHN1bW1hcnlDaGlsZEl0ZW0gPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1zdW1tYXJ5Jyk/LmNoaWxkcmVuO1xuICAgIGNvbnN0IF9zdW1tYXJ5SXRlbTogQXJyYXk8VGVtcGxhdGVSZXN1bHQ+ID0gW107XG5cbiAgICBpZiAoc3VtbWFyeUNoaWxkTGVuZ3RoISA8PSAwIHx8IHN1bW1hcnlDaGlsZEl0ZW0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdW1tYXJ5Q2hpbGRMZW5ndGghOyBpKyspIHtcbiAgICAgIF9zdW1tYXJ5SXRlbS5wdXNoKGh0bWxgJHtzdW1tYXJ5Q2hpbGRJdGVtLml0ZW0oaSl9YCk7XG4gICAgfVxuICAgIHRoaXMuX3N1bW1hcnlMaXN0LnB1c2goaHRtbGBcbiAgICAgIDxkaXYgY2xhc3M9XCJvcHRpb24tc3VtbWFyeVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic3VtbWFyeS1jb250ZW50c1wiPiR7X3N1bW1hcnlJdGVtfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgYCk7XG5cbiAgICAvLyB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ2NvbnRhaW5lci1zdW1tYXJ5JykucmVtb3ZlKCk7XG4gIH1cblxuICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX2N1c3RvbUJ1dHRvblZpZXcoKTtcbiAgICB0aGlzLl9zdW1tYXJ5VmlldygpO1xuICAgIHRoaXMuX2NvbnRlbnRWaWV3KCk7XG4gIH1cblxuICBkaXNjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xvdENoYW5nZShlOiBUZW1wbGF0ZVJlc3VsdCkge1xuICAgIC8vc2xvdCBjaGFuZ2VcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGVtcGxhdGUuY2FsbCh0aGlzKTtcbiAgfVxufVxuIl19