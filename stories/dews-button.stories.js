import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'Button'
};
export const Button = () => html `<div style="width: 360px">
    <dews-button />
  </div>
  <div style="width: 360px">
    <dews-button
      title="button"
      @click="${() => {
    console.log('click');
}}"
    ></dews-button>
  </div>
  <div style="width: 360px">
    <dews-button title="button" disabled />
  </div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1idXR0b24uc3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRld3MtYnV0dG9uLnN0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLGVBQWU7SUFDYixLQUFLLEVBQUUsUUFBUTtDQUNoQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7O2dCQU1oQixHQUFHLEVBQUU7SUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7Ozs7O1NBS0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdCdXR0b24nXG59O1xuXG5leHBvcnQgY29uc3QgQnV0dG9uID0gKCkgPT4gaHRtbGA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4XCI+XG4gICAgPGRld3MtYnV0dG9uIC8+XG4gIDwvZGl2PlxuICA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4XCI+XG4gICAgPGRld3MtYnV0dG9uXG4gICAgICB0aXRsZT1cImJ1dHRvblwiXG4gICAgICBAY2xpY2s9XCIkeygpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICB9fVwiXG4gICAgPjwvZGV3cy1idXR0b24+XG4gIDwvZGl2PlxuICA8ZGl2IHN0eWxlPVwid2lkdGg6IDM2MHB4XCI+XG4gICAgPGRld3MtYnV0dG9uIHRpdGxlPVwiYnV0dG9uXCIgZGlzYWJsZWQgLz5cbiAgPC9kaXY+YDtcbiJdfQ==