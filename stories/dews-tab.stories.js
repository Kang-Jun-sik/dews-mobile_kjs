import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'TabPanel'
};
export const TabPanel = () => html `<dews-area-panel>
  <area-item col="6">
    <dews-tabs id="tabs1">
      <dews-tab title="tab1">
        <dews-container>tab1</dews-container>
      </dews-tab>
      <dews-tab title="tab2">
        <dews-container>tab2</dews-container>
      </dews-tab>
      <dews-tab title="tab3" hide> </dews-tab>
      <dews-tab title="tab4"> </dews-tab>
      <dews-tab title="tab5"> </dews-tab>
      <dews-tab title="tab6"> </dews-tab>
    </dews-tabs>
  </area-item>
  <area-item col="6">
    <dews-tabs selected="1">
      <dews-tab title="tab1">
        <dews-search-container title="Search-Container">
          <container-button data-set data-reset data-capture></container-button>
          <container-content>
            <dews-textbox></dews-textbox>
          </container-content>
        </dews-search-container>
      </dews-tab>
      <dews-tab title="tab2">
        <dews-container>tab2</dews-container>
      </dews-tab>
      <dews-tab title="tab3"> </dews-tab>
      <dews-tab title="tab4"> </dews-tab>
      <dews-tab title="tab5"> </dews-tab>
      <dews-tab title="tab6"> </dews-tab>
    </dews-tabs>
  </area-item>
</dews-area-panel>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy10YWIuc3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRld3MtdGFiLnN0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLGVBQWU7SUFDYixLQUFLLEVBQUUsVUFBVTtDQUNsQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFrQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdUYWJQYW5lbCdcbn07XG5cbmV4cG9ydCBjb25zdCBUYWJQYW5lbCA9ICgpID0+IGh0bWxgPGRld3MtYXJlYS1wYW5lbD5cbiAgPGFyZWEtaXRlbSBjb2w9XCI2XCI+XG4gICAgPGRld3MtdGFicyBpZD1cInRhYnMxXCI+XG4gICAgICA8ZGV3cy10YWIgdGl0bGU9XCJ0YWIxXCI+XG4gICAgICAgIDxkZXdzLWNvbnRhaW5lcj50YWIxPC9kZXdzLWNvbnRhaW5lcj5cbiAgICAgIDwvZGV3cy10YWI+XG4gICAgICA8ZGV3cy10YWIgdGl0bGU9XCJ0YWIyXCI+XG4gICAgICAgIDxkZXdzLWNvbnRhaW5lcj50YWIyPC9kZXdzLWNvbnRhaW5lcj5cbiAgICAgIDwvZGV3cy10YWI+XG4gICAgICA8ZGV3cy10YWIgdGl0bGU9XCJ0YWIzXCIgaGlkZT4gPC9kZXdzLXRhYj5cbiAgICAgIDxkZXdzLXRhYiB0aXRsZT1cInRhYjRcIj4gPC9kZXdzLXRhYj5cbiAgICAgIDxkZXdzLXRhYiB0aXRsZT1cInRhYjVcIj4gPC9kZXdzLXRhYj5cbiAgICAgIDxkZXdzLXRhYiB0aXRsZT1cInRhYjZcIj4gPC9kZXdzLXRhYj5cbiAgICA8L2Rld3MtdGFicz5cbiAgPC9hcmVhLWl0ZW0+XG4gIDxhcmVhLWl0ZW0gY29sPVwiNlwiPlxuICAgIDxkZXdzLXRhYnMgc2VsZWN0ZWQ9XCIxXCI+XG4gICAgICA8ZGV3cy10YWIgdGl0bGU9XCJ0YWIxXCI+XG4gICAgICAgIDxkZXdzLXNlYXJjaC1jb250YWluZXIgdGl0bGU9XCJTZWFyY2gtQ29udGFpbmVyXCI+XG4gICAgICAgICAgPGNvbnRhaW5lci1idXR0b24gZGF0YS1zZXQgZGF0YS1yZXNldCBkYXRhLWNhcHR1cmU+PC9jb250YWluZXItYnV0dG9uPlxuICAgICAgICAgIDxjb250YWluZXItY29udGVudD5cbiAgICAgICAgICAgIDxkZXdzLXRleHRib3g+PC9kZXdzLXRleHRib3g+XG4gICAgICAgICAgPC9jb250YWluZXItY29udGVudD5cbiAgICAgICAgPC9kZXdzLXNlYXJjaC1jb250YWluZXI+XG4gICAgICA8L2Rld3MtdGFiPlxuICAgICAgPGRld3MtdGFiIHRpdGxlPVwidGFiMlwiPlxuICAgICAgICA8ZGV3cy1jb250YWluZXI+dGFiMjwvZGV3cy1jb250YWluZXI+XG4gICAgICA8L2Rld3MtdGFiPlxuICAgICAgPGRld3MtdGFiIHRpdGxlPVwidGFiM1wiPiA8L2Rld3MtdGFiPlxuICAgICAgPGRld3MtdGFiIHRpdGxlPVwidGFiNFwiPiA8L2Rld3MtdGFiPlxuICAgICAgPGRld3MtdGFiIHRpdGxlPVwidGFiNVwiPiA8L2Rld3MtdGFiPlxuICAgICAgPGRld3MtdGFiIHRpdGxlPVwidGFiNlwiPiA8L2Rld3MtdGFiPlxuICAgIDwvZGV3cy10YWJzPlxuICA8L2FyZWEtaXRlbT5cbjwvZGV3cy1hcmVhLXBhbmVsPmA7XG4iXX0=