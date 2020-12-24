import { html } from 'lit-element';
export default function () {
    return html `<div class="dews-container-option-control">
  ${this.title == undefined ? null : html `<h3 class="option-sub-title">${this.title}</h3>`}
  ${this._buttonList}

  ${(this._iconList.length == 0 ? null : html `
  <div class="option-convenience-button">
    <ul>
      ${this._iconList}
    </ul>
  </div>
  `)}
</div>

${this._contentList}
`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWNvbnRhaW5lci5odG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9ybWNvbnRhaW5lci5odG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDbkMsTUFBTSxDQUFDLE9BQU87SUFBd0IsT0FBTyxJQUFJLENBQUE7SUFDN0MsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFBLGdDQUFnQyxJQUFJLENBQUMsS0FBSyxPQUFPO0lBQ25GLElBQUksQ0FBQyxXQUFXOztJQUVoQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUE7OztRQUdyQyxJQUFJLENBQUMsU0FBUzs7O0dBR25CLENBQUM7OztFQUdGLElBQUksQ0FBQyxZQUFZO0NBQ2xCLENBQUM7QUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1lbGVtZW50JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0aGlzOiBhbnkpIHsgcmV0dXJuIGh0bWxgPGRpdiBjbGFzcz1cImRld3MtY29udGFpbmVyLW9wdGlvbi1jb250cm9sXCI+XG4gICR7dGhpcy50aXRsZSA9PSB1bmRlZmluZWQ/bnVsbCA6aHRtbGA8aDMgY2xhc3M9XCJvcHRpb24tc3ViLXRpdGxlXCI+JHt0aGlzLnRpdGxlfTwvaDM+YH1cbiAgJHt0aGlzLl9idXR0b25MaXN0fVxuXG4gICR7KHRoaXMuX2ljb25MaXN0Lmxlbmd0aCA9PSAwID8gbnVsbCA6IGh0bWxgXG4gIDxkaXYgY2xhc3M9XCJvcHRpb24tY29udmVuaWVuY2UtYnV0dG9uXCI+XG4gICAgPHVsPlxuICAgICAgJHt0aGlzLl9pY29uTGlzdH1cbiAgICA8L3VsPlxuICA8L2Rpdj5cbiAgYCl9XG48L2Rpdj5cblxuJHt0aGlzLl9jb250ZW50TGlzdH1cbmA7IH0iXX0=