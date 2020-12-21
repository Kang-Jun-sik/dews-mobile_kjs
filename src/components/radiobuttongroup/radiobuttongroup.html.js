import { html } from 'lit-element';
export default function () {
    return html `<div class="dews-radio-group-wrap" @click="${this._clickHandler}">
  <span class="radio-group-label">${this.title}</span>
  ${this._radioButton}
</div>
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9idXR0b25ncm91cC5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaW9idXR0b25ncm91cC5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUEsOENBQThDLElBQUksQ0FBQyxhQUFhO29DQUM3RSxJQUFJLENBQUMsS0FBSztJQUMxQyxJQUFJLENBQUMsWUFBWTs7Q0FFcEIsQ0FBQztBQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRoaXM6IGFueSkgeyByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiZGV3cy1yYWRpby1ncm91cC13cmFwXCIgQGNsaWNrPVwiJHt0aGlzLl9jbGlja0hhbmRsZXJ9XCI+XG4gIDxzcGFuIGNsYXNzPVwicmFkaW8tZ3JvdXAtbGFiZWxcIj4ke3RoaXMudGl0bGV9PC9zcGFuPlxuICAke3RoaXMuX3JhZGlvQnV0dG9ufVxuPC9kaXY+XG5gOyB9Il19