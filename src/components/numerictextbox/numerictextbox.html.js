import { html } from 'lit-element';
export default function () {
    return html `<!-- all  -->
<div class="numeric-textbox-wrap">
  ${this._title}
  <div class="numeric-wrap">
    ${this.prefix === undefined ? '' : html `<span class="prefix">${this.prefix}</span>`}
    <span id="view" class="numeric view ${this.disabled ? 'disabled' : ''}" @click="${this._focusIn}">
        <input id="numeric-box" type="text" value="${this.value}" ?disabled="${this._disabled}" ?readonly="${this.readonly}" ?placeholder="${this.placeholder}" >
    </span>
    <span id="mask" class="numeric mask" style="display: none">
        <input type="number" value="${this.value}" step="${this._step}" min="${this.min}" max="${this.max}"  @beforeinput="${this._beforeInput}" @input="${this._inputChange}" @focusin="${this._focusIn}" @blur="${this._focusBlur}" >
    </span>
    ${this.suffix === undefined ? '' : html `<span class="suffix">${this.suffix}</span>`}
    ${this._button}
  </div>
</div>



`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtZXJpY3RleHRib3guaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm51bWVyaWN0ZXh0Ym94Lmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQTs7SUFFN0MsSUFBSSxDQUFDLE1BQU07O01BRVQsSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLHdCQUF3QixJQUFJLENBQUMsTUFBTSxTQUFTOzBDQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFBLENBQUMsQ0FBQSxVQUFVLENBQUEsQ0FBQyxDQUFBLEVBQUUsYUFBYSxJQUFJLENBQUMsUUFBUTtxREFDMUMsSUFBSSxDQUFDLEtBQUssZ0JBQWdCLElBQUksQ0FBQyxTQUFTLGdCQUFnQixJQUFJLENBQUMsUUFBUSxtQkFBbUIsSUFBSSxDQUFDLFdBQVc7OztzQ0FHdkgsSUFBSSxDQUFDLEtBQUssV0FBVyxJQUFJLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFHLFVBQVUsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLElBQUksQ0FBQyxZQUFZLGFBQWEsSUFBSSxDQUFDLFlBQVksZUFBZSxJQUFJLENBQUMsUUFBUSxZQUFZLElBQUksQ0FBQyxVQUFVOztNQUU3TixJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxJQUFJLENBQUEsd0JBQXdCLElBQUksQ0FBQyxNQUFNLFNBQVM7TUFDaEYsSUFBSSxDQUFDLE9BQU87Ozs7OztDQU1qQixDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDwhLS0gYWxsICAtLT5cbjxkaXYgY2xhc3M9XCJudW1lcmljLXRleHRib3gtd3JhcFwiPlxuICAke3RoaXMuX3RpdGxlfVxuICA8ZGl2IGNsYXNzPVwibnVtZXJpYy13cmFwXCI+XG4gICAgJHt0aGlzLnByZWZpeCA9PT0gdW5kZWZpbmVkID8gJycgOiBodG1sYDxzcGFuIGNsYXNzPVwicHJlZml4XCI+JHt0aGlzLnByZWZpeH08L3NwYW4+YH1cbiAgICA8c3BhbiBpZD1cInZpZXdcIiBjbGFzcz1cIm51bWVyaWMgdmlldyAke3RoaXMuZGlzYWJsZWQ/J2Rpc2FibGVkJzonJ31cIiBAY2xpY2s9XCIke3RoaXMuX2ZvY3VzSW59XCI+XG4gICAgICAgIDxpbnB1dCBpZD1cIm51bWVyaWMtYm94XCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIiR7dGhpcy52YWx1ZX1cIiA/ZGlzYWJsZWQ9XCIke3RoaXMuX2Rpc2FibGVkfVwiID9yZWFkb25seT1cIiR7dGhpcy5yZWFkb25seX1cIiA/cGxhY2Vob2xkZXI9XCIke3RoaXMucGxhY2Vob2xkZXJ9XCIgPlxuICAgIDwvc3Bhbj5cbiAgICA8c3BhbiBpZD1cIm1hc2tcIiBjbGFzcz1cIm51bWVyaWMgbWFza1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHt0aGlzLnZhbHVlfVwiIHN0ZXA9XCIke3RoaXMuX3N0ZXB9XCIgbWluPVwiJHt0aGlzLm1pbn1cIiBtYXg9XCIke3RoaXMubWF4fVwiICBAYmVmb3JlaW5wdXQ9XCIke3RoaXMuX2JlZm9yZUlucHV0fVwiIEBpbnB1dD1cIiR7dGhpcy5faW5wdXRDaGFuZ2V9XCIgQGZvY3VzaW49XCIke3RoaXMuX2ZvY3VzSW59XCIgQGJsdXI9XCIke3RoaXMuX2ZvY3VzQmx1cn1cIiA+XG4gICAgPC9zcGFuPlxuICAgICR7dGhpcy5zdWZmaXggPT09IHVuZGVmaW5lZCA/ICcnIDpodG1sYDxzcGFuIGNsYXNzPVwic3VmZml4XCI+JHt0aGlzLnN1ZmZpeH08L3NwYW4+YH1cbiAgICAke3RoaXMuX2J1dHRvbn1cbiAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbmA7IH0iXX0=