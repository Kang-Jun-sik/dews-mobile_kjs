import { html } from 'lit-element';
export default function () {
    return html `<div class="dews-container-option-control">
  ${this.title == undefined ? null : html `<h3 class="option-sub-title">${this.title}</h3>`}
  ${(this._iconList.length == 0 ? null : html `
  <div class="option-convenience-button">
    <ul>
      ${this._iconList}
    </ul>
  </div>
  `)}
</div>

<div class="dews-search-field">
  <ul class="form-field">
    ${this._contentList}
  </ul>
</div>

`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoY29udGFpbmVyLmh0bWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZWFyY2hjb250YWluZXIuaHRtbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxPQUFPO0lBQXdCLE9BQU8sSUFBSSxDQUFBO0lBQzdDLElBQUksQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBQyxDQUFBLElBQUksQ0FBQSxnQ0FBZ0MsSUFBSSxDQUFDLEtBQUssT0FBTztJQUNuRixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7OztRQUdyQyxJQUFJLENBQUMsU0FBUzs7O0dBR25CLENBQUM7Ozs7O01BS0UsSUFBSSxDQUFDLFlBQVk7Ozs7Q0FJdEIsQ0FBQztBQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWVsZW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHRoaXM6IGFueSkgeyByZXR1cm4gaHRtbGA8ZGl2IGNsYXNzPVwiZGV3cy1jb250YWluZXItb3B0aW9uLWNvbnRyb2xcIj5cbiAgJHt0aGlzLnRpdGxlID09IHVuZGVmaW5lZD9udWxsIDpodG1sYDxoMyBjbGFzcz1cIm9wdGlvbi1zdWItdGl0bGVcIj4ke3RoaXMudGl0bGV9PC9oMz5gfVxuICAkeyh0aGlzLl9pY29uTGlzdC5sZW5ndGggPT0gMCA/IG51bGwgOiBodG1sYFxuICA8ZGl2IGNsYXNzPVwib3B0aW9uLWNvbnZlbmllbmNlLWJ1dHRvblwiPlxuICAgIDx1bD5cbiAgICAgICR7dGhpcy5faWNvbkxpc3R9XG4gICAgPC91bD5cbiAgPC9kaXY+XG4gIGApfVxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJkZXdzLXNlYXJjaC1maWVsZFwiPlxuICA8dWwgY2xhc3M9XCJmb3JtLWZpZWxkXCI+XG4gICAgJHt0aGlzLl9jb250ZW50TGlzdH1cbiAgPC91bD5cbjwvZGl2PlxuXG5gOyB9Il19