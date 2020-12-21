import { html } from 'lit-element';
export default function () {
    return html `<span class="dews-dropdown-button ${this.group ? 'group' : ''}">
  <button class="dews-button dropdown ${this.ui} ${this.size} ${this.disabled ? 'disabled' : ''}" @click ="${this._clickHandler}">
      <span class="button-icon"></span>
      <span class="button-text">${this.text}</span>
  </button>
  <span class="button-list ${this._selected ? 'selected' : ''}" >
    ${this.childButtons}
  </span>
</span>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd25idXR0b24uaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRyb3Bkb3duYnV0dG9uLmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQSxxQ0FBcUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO3dDQUN2RSxJQUFJLENBQUMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsSUFBSSxDQUFDLGFBQWE7O2tDQUU3RixJQUFJLENBQUMsSUFBSTs7NkJBRWQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO01BQ3ZELElBQUksQ0FBQyxZQUFZOzs7Q0FHdEIsQ0FBQztBQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRoaXM6IGFueSkgeyByZXR1cm4gaHRtbGA8c3BhbiBjbGFzcz1cImRld3MtZHJvcGRvd24tYnV0dG9uICR7dGhpcy5ncm91cCA/ICdncm91cCcgOiAnJ31cIj5cbiAgPGJ1dHRvbiBjbGFzcz1cImRld3MtYnV0dG9uIGRyb3Bkb3duICR7dGhpcy51aX0gJHt0aGlzLnNpemV9ICR7dGhpcy5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31cIiBAY2xpY2sgPVwiJHt0aGlzLl9jbGlja0hhbmRsZXJ9XCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImJ1dHRvbi1pY29uXCI+PC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3M9XCJidXR0b24tdGV4dFwiPiR7dGhpcy50ZXh0fTwvc3Bhbj5cbiAgPC9idXR0b24+XG4gIDxzcGFuIGNsYXNzPVwiYnV0dG9uLWxpc3QgJHt0aGlzLl9zZWxlY3RlZCA/ICdzZWxlY3RlZCcgOiAnJ31cIiA+XG4gICAgJHt0aGlzLmNoaWxkQnV0dG9uc31cbiAgPC9zcGFuPlxuPC9zcGFuPlxuYDsgfSJdfQ==