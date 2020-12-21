import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'ListContainer'
};
export const ListContainer1280 = () => html `<div style="width: 1280px">
  <dews-tabs>
    <dews-tab title="default">
      <dews-list-container title="title#12">
        <container-button>
          <dews-button slot="button" title="Btn"></dews-button>
        </container-button>
        <container-summary>
          <span>요약 내용영역</span>
        </container-summary>
        <container-content>
          <dews-textbox title="title#1"></dews-textbox>
        </container-content>
      </dews-list-container>
    </dews-tab>
  </dews-tabs>
  <dews-box title="box">
    <dews-list-container title="title#12">
      <container-button>
        <dews-button slot="button" title="Btn"></dews-button>
      </container-button>
      <container-summary>
        <span>요약 내용영역</span>
      </container-summary>
      <container-content>
        <dews-textbox title="title#1"></dews-textbox>
      </container-content>
    </dews-list-container>
  </dews-box>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1saXN0LWNvbnRhaW5lcjEyODAuc3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRld3MtbGlzdC1jb250YWluZXIxMjgwLnN0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLGVBQWU7SUFDYixLQUFLLEVBQUUsZUFBZTtDQUN2QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTZCcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdMaXN0Q29udGFpbmVyJ1xufTtcblxuZXhwb3J0IGNvbnN0IExpc3RDb250YWluZXIxMjgwID0gKCkgPT4gaHRtbGA8ZGl2IHN0eWxlPVwid2lkdGg6IDEyODBweFwiPlxuICA8ZGV3cy10YWJzPlxuICAgIDxkZXdzLXRhYiB0aXRsZT1cImRlZmF1bHRcIj5cbiAgICAgIDxkZXdzLWxpc3QtY29udGFpbmVyIHRpdGxlPVwidGl0bGUjMTJcIj5cbiAgICAgICAgPGNvbnRhaW5lci1idXR0b24+XG4gICAgICAgICAgPGRld3MtYnV0dG9uIHNsb3Q9XCJidXR0b25cIiB0aXRsZT1cIkJ0blwiPjwvZGV3cy1idXR0b24+XG4gICAgICAgIDwvY29udGFpbmVyLWJ1dHRvbj5cbiAgICAgICAgPGNvbnRhaW5lci1zdW1tYXJ5PlxuICAgICAgICAgIDxzcGFuPuyalOyVvSDrgrTsmqnsmIHsl608L3NwYW4+XG4gICAgICAgIDwvY29udGFpbmVyLXN1bW1hcnk+XG4gICAgICAgIDxjb250YWluZXItY29udGVudD5cbiAgICAgICAgICA8ZGV3cy10ZXh0Ym94IHRpdGxlPVwidGl0bGUjMVwiPjwvZGV3cy10ZXh0Ym94PlxuICAgICAgICA8L2NvbnRhaW5lci1jb250ZW50PlxuICAgICAgPC9kZXdzLWxpc3QtY29udGFpbmVyPlxuICAgIDwvZGV3cy10YWI+XG4gIDwvZGV3cy10YWJzPlxuICA8ZGV3cy1ib3ggdGl0bGU9XCJib3hcIj5cbiAgICA8ZGV3cy1saXN0LWNvbnRhaW5lciB0aXRsZT1cInRpdGxlIzEyXCI+XG4gICAgICA8Y29udGFpbmVyLWJ1dHRvbj5cbiAgICAgICAgPGRld3MtYnV0dG9uIHNsb3Q9XCJidXR0b25cIiB0aXRsZT1cIkJ0blwiPjwvZGV3cy1idXR0b24+XG4gICAgICA8L2NvbnRhaW5lci1idXR0b24+XG4gICAgICA8Y29udGFpbmVyLXN1bW1hcnk+XG4gICAgICAgIDxzcGFuPuyalOyVvSDrgrTsmqnsmIHsl608L3NwYW4+XG4gICAgICA8L2NvbnRhaW5lci1zdW1tYXJ5PlxuICAgICAgPGNvbnRhaW5lci1jb250ZW50PlxuICAgICAgICA8ZGV3cy10ZXh0Ym94IHRpdGxlPVwidGl0bGUjMVwiPjwvZGV3cy10ZXh0Ym94PlxuICAgICAgPC9jb250YWluZXItY29udGVudD5cbiAgICA8L2Rld3MtbGlzdC1jb250YWluZXI+XG4gIDwvZGV3cy1ib3g+XG48L2Rpdj5gO1xuIl19