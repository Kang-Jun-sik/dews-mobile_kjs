import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'SearchContainer'
};
export const SearchContainer360 = () => html ` <div style="width: 360px;display: inline-block">
  <dews-box title="box">
    <dews-search-container title="Search-Container">
      <container-button data-set data-reset data-capture> </container-button>
      <container-summary> 요약영역 </container-summary>
      <container-content>
        <dews-textbox title="TextBox"></dews-textbox>
        <dews-datepicker title="DatePicker"></dews-datepicker>
        <dews-dropdownlist title="DropDown"></dews-dropdownlist>
        <dews-codepicker title="CodePicker"></dews-codepicker>
        <dews-dropdownlist title="DropDown"></dews-dropdownlist>
        <dews-codepicker title="CodePicker"></dews-codepicker>
        <dews-textbox title="TextBox"></dews-textbox>
      </container-content>
    </dews-search-container>
  </dews-box>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1zZWFyY2gtY29udGFpbmVyMzYwLnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXdzLXNlYXJjaC1jb250YWluZXIzNjAuc3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsZUFBZTtJQUNiLEtBQUssRUFBRSxpQkFBaUI7Q0FDekIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7OztPQWdCckMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdTZWFyY2hDb250YWluZXInXG59O1xuXG5leHBvcnQgY29uc3QgU2VhcmNoQ29udGFpbmVyMzYwID0gKCkgPT4gaHRtbGAgPGRpdiBzdHlsZT1cIndpZHRoOiAzNjBweDtkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj5cbiAgPGRld3MtYm94IHRpdGxlPVwiYm94XCI+XG4gICAgPGRld3Mtc2VhcmNoLWNvbnRhaW5lciB0aXRsZT1cIlNlYXJjaC1Db250YWluZXJcIj5cbiAgICAgIDxjb250YWluZXItYnV0dG9uIGRhdGEtc2V0IGRhdGEtcmVzZXQgZGF0YS1jYXB0dXJlPiA8L2NvbnRhaW5lci1idXR0b24+XG4gICAgICA8Y29udGFpbmVyLXN1bW1hcnk+IOyalOyVveyYgeyXrSA8L2NvbnRhaW5lci1zdW1tYXJ5PlxuICAgICAgPGNvbnRhaW5lci1jb250ZW50PlxuICAgICAgICA8ZGV3cy10ZXh0Ym94IHRpdGxlPVwiVGV4dEJveFwiPjwvZGV3cy10ZXh0Ym94PlxuICAgICAgICA8ZGV3cy1kYXRlcGlja2VyIHRpdGxlPVwiRGF0ZVBpY2tlclwiPjwvZGV3cy1kYXRlcGlja2VyPlxuICAgICAgICA8ZGV3cy1kcm9wZG93bmxpc3QgdGl0bGU9XCJEcm9wRG93blwiPjwvZGV3cy1kcm9wZG93bmxpc3Q+XG4gICAgICAgIDxkZXdzLWNvZGVwaWNrZXIgdGl0bGU9XCJDb2RlUGlja2VyXCI+PC9kZXdzLWNvZGVwaWNrZXI+XG4gICAgICAgIDxkZXdzLWRyb3Bkb3dubGlzdCB0aXRsZT1cIkRyb3BEb3duXCI+PC9kZXdzLWRyb3Bkb3dubGlzdD5cbiAgICAgICAgPGRld3MtY29kZXBpY2tlciB0aXRsZT1cIkNvZGVQaWNrZXJcIj48L2Rld3MtY29kZXBpY2tlcj5cbiAgICAgICAgPGRld3MtdGV4dGJveCB0aXRsZT1cIlRleHRCb3hcIj48L2Rld3MtdGV4dGJveD5cbiAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgPC9kZXdzLXNlYXJjaC1jb250YWluZXI+XG4gIDwvZGV3cy1ib3g+XG48L2Rpdj5gO1xuIl19