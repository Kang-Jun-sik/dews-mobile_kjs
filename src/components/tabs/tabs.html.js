import { html } from 'lit-element';
export default function () {
    return html `<div class="dews-tabs-wrap">
  <div class="dews-tabs-title">
    <div class="title-list">
      ${this.titleList}
    </div>
  </div>
  <div class="dews-tabs-content">
    <slot></slot>
  </div>
</div>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGFicy5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUE7OztRQUd6QyxJQUFJLENBQUMsU0FBUzs7Ozs7OztDQU9yQixDQUFDO0FBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtZWxlbWVudCc7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAodGhpczogYW55KSB7IHJldHVybiBodG1sYDxkaXYgY2xhc3M9XCJkZXdzLXRhYnMtd3JhcFwiPlxuICA8ZGl2IGNsYXNzPVwiZGV3cy10YWJzLXRpdGxlXCI+XG4gICAgPGRpdiBjbGFzcz1cInRpdGxlLWxpc3RcIj5cbiAgICAgICR7dGhpcy50aXRsZUxpc3R9XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZGV3cy10YWJzLWNvbnRlbnRcIj5cbiAgICA8c2xvdD48L3Nsb3Q+XG4gIDwvZGl2PlxuPC9kaXY+XG5gOyB9Il19