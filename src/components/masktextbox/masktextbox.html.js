import { html } from 'lit-element';
export default function () {
    return html `<!-- input box 일때 -->

<div class="mask-textbox-wrap">
  <label>${this.title}</label>
  <span  @click="${this._spanClick}" class="password view ${this.disabled ? 'disabled' : ''}">
    <input ?disabled="${this._disabled}" ?readonly="${this.readonly}" type="password">
  </span>
  <span  style="display: none " class="password mask">
    <input @input="${this._inputChange}" @blur="${this._blur}" type="${this.type}">
  </span>
</div>


`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza3RleHRib3guaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hc2t0ZXh0Ym94Lmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQTs7O1dBR3RDLElBQUksQ0FBQyxLQUFLO21CQUNGLElBQUksQ0FBQyxVQUFVLDBCQUEwQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25FLElBQUksQ0FBQyxTQUFTLGdCQUFnQixJQUFJLENBQUMsUUFBUTs7O3FCQUc5QyxJQUFJLENBQUMsWUFBWSxZQUFZLElBQUksQ0FBQyxLQUFLLFdBQVcsSUFBSSxDQUFDLElBQUk7Ozs7O0NBSy9FLENBQUM7QUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0aGlzOiBhbnkpIHsgcmV0dXJuIGh0bWxgPCEtLSBpbnB1dCBib3gg7J2865WMIC0tPlxuXG48ZGl2IGNsYXNzPVwibWFzay10ZXh0Ym94LXdyYXBcIj5cbiAgPGxhYmVsPiR7dGhpcy50aXRsZX08L2xhYmVsPlxuICA8c3BhbiAgQGNsaWNrPVwiJHt0aGlzLl9zcGFuQ2xpY2t9XCIgY2xhc3M9XCJwYXNzd29yZCB2aWV3ICR7dGhpcy5kaXNhYmxlZCA/ICdkaXNhYmxlZCcgOiAnJ31cIj5cbiAgICA8aW5wdXQgP2Rpc2FibGVkPVwiJHt0aGlzLl9kaXNhYmxlZH1cIiA/cmVhZG9ubHk9XCIke3RoaXMucmVhZG9ubHl9XCIgdHlwZT1cInBhc3N3b3JkXCI+XG4gIDwvc3Bhbj5cbiAgPHNwYW4gIHN0eWxlPVwiZGlzcGxheTogbm9uZSBcIiBjbGFzcz1cInBhc3N3b3JkIG1hc2tcIj5cbiAgICA8aW5wdXQgQGlucHV0PVwiJHt0aGlzLl9pbnB1dENoYW5nZX1cIiBAYmx1cj1cIiR7dGhpcy5fYmx1cn1cIiB0eXBlPVwiJHt0aGlzLnR5cGV9XCI+XG4gIDwvc3Bhbj5cbjwvZGl2PlxuXG5cbmA7IH0iXX0=