import { html } from 'lit-element';
export default function () {
    return html `<span class="dews-radio-wrap" @click="${this._clickHandler}">
  <span class="radio-control">
    <input type="radio" ?checked="${this.checked}" ?disabled="${this.disabled}">
    <span  class="radio-shape"></span>
  </span>
  <label class="radio-label">${this.title}</label>
</span>


`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b24uaHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhZGlvYnV0dG9uLmh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNuQyxNQUFNLENBQUMsT0FBTztJQUF3QixPQUFPLElBQUksQ0FBQSx5Q0FBeUMsSUFBSSxDQUFDLGFBQWE7O29DQUV4RSxJQUFJLENBQUMsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLFFBQVE7OzsrQkFHOUMsSUFBSSxDQUFDLEtBQUs7Ozs7Q0FJeEMsQ0FBQztBQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRoaXM6IGFueSkgeyByZXR1cm4gaHRtbGA8c3BhbiBjbGFzcz1cImRld3MtcmFkaW8td3JhcFwiIEBjbGljaz1cIiR7dGhpcy5fY2xpY2tIYW5kbGVyfVwiPlxuICA8c3BhbiBjbGFzcz1cInJhZGlvLWNvbnRyb2xcIj5cbiAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgP2NoZWNrZWQ9XCIke3RoaXMuY2hlY2tlZH1cIiA/ZGlzYWJsZWQ9XCIke3RoaXMuZGlzYWJsZWR9XCI+XG4gICAgPHNwYW4gIGNsYXNzPVwicmFkaW8tc2hhcGVcIj48L3NwYW4+XG4gIDwvc3Bhbj5cbiAgPGxhYmVsIGNsYXNzPVwicmFkaW8tbGFiZWxcIj4ke3RoaXMudGl0bGV9PC9sYWJlbD5cbjwvc3Bhbj5cblxuXG5gOyB9Il19