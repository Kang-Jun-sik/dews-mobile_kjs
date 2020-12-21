import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'Timepicker'
};
export const Timepicker = () => html `<div style="width: 360px">
  <dews-area-panel>
    <area-item coll="8">
      <dews-box title="timepicker">
        <dews-form-container>
          <container-content>
            <form-section title="기본정보">
              <dews-timepicker required title="timepicker1" min="0800" max="2200" minute-interval="5">
              </dews-timepicker>
              <dews-timepicker required title="timepicker2" value="0707" minute-interval="5"> </dews-timepicker>
              <dews-timepicker required title="timepicker3"> </dews-timepicker>
            </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
    <area-item coll="4">
      <dews-box title="box2">
        <dews-form-container>
          <container-content>
            <form-section title="추가정보"> </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
  </dews-area-panel>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy10aW1lcGlja2VyLnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXdzLXRpbWVwaWNrZXIuc3Rvcmllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sdUJBQXVCLENBQUM7QUFFL0IsZUFBZTtJQUNiLEtBQUssRUFBRSxZQUFZO0NBQ3BCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTBCN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQtaHRtbCc7XG5pbXBvcnQgJy4uL3NyYy9kZXdzLW1vYmlsZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdUaW1lcGlja2VyJ1xufTtcblxuZXhwb3J0IGNvbnN0IFRpbWVwaWNrZXIgPSAoKSA9PiBodG1sYDxkaXYgc3R5bGU9XCJ3aWR0aDogMzYwcHhcIj5cbiAgPGRld3MtYXJlYS1wYW5lbD5cbiAgICA8YXJlYS1pdGVtIGNvbGw9XCI4XCI+XG4gICAgICA8ZGV3cy1ib3ggdGl0bGU9XCJ0aW1lcGlja2VyXCI+XG4gICAgICAgIDxkZXdzLWZvcm0tY29udGFpbmVyPlxuICAgICAgICAgIDxjb250YWluZXItY29udGVudD5cbiAgICAgICAgICAgIDxmb3JtLXNlY3Rpb24gdGl0bGU9XCLquLDrs7jsoJXrs7RcIj5cbiAgICAgICAgICAgICAgPGRld3MtdGltZXBpY2tlciByZXF1aXJlZCB0aXRsZT1cInRpbWVwaWNrZXIxXCIgbWluPVwiMDgwMFwiIG1heD1cIjIyMDBcIiBtaW51dGUtaW50ZXJ2YWw9XCI1XCI+XG4gICAgICAgICAgICAgIDwvZGV3cy10aW1lcGlja2VyPlxuICAgICAgICAgICAgICA8ZGV3cy10aW1lcGlja2VyIHJlcXVpcmVkIHRpdGxlPVwidGltZXBpY2tlcjJcIiB2YWx1ZT1cIjA3MDdcIiBtaW51dGUtaW50ZXJ2YWw9XCI1XCI+IDwvZGV3cy10aW1lcGlja2VyPlxuICAgICAgICAgICAgICA8ZGV3cy10aW1lcGlja2VyIHJlcXVpcmVkIHRpdGxlPVwidGltZXBpY2tlcjNcIj4gPC9kZXdzLXRpbWVwaWNrZXI+XG4gICAgICAgICAgICA8L2Zvcm0tc2VjdGlvbj5cbiAgICAgICAgICA8L2NvbnRhaW5lci1jb250ZW50PlxuICAgICAgICA8L2Rld3MtZm9ybS1jb250YWluZXI+XG4gICAgICA8L2Rld3MtYm94PlxuICAgIDwvYXJlYS1pdGVtPlxuICAgIDxhcmVhLWl0ZW0gY29sbD1cIjRcIj5cbiAgICAgIDxkZXdzLWJveCB0aXRsZT1cImJveDJcIj5cbiAgICAgICAgPGRld3MtZm9ybS1jb250YWluZXI+XG4gICAgICAgICAgPGNvbnRhaW5lci1jb250ZW50PlxuICAgICAgICAgICAgPGZvcm0tc2VjdGlvbiB0aXRsZT1cIuy2lOqwgOygleuztFwiPiA8L2Zvcm0tc2VjdGlvbj5cbiAgICAgICAgICA8L2NvbnRhaW5lci1jb250ZW50PlxuICAgICAgICA8L2Rld3MtZm9ybS1jb250YWluZXI+XG4gICAgICA8L2Rld3MtYm94PlxuICAgIDwvYXJlYS1pdGVtPlxuICA8L2Rld3MtYXJlYS1wYW5lbD5cbjwvZGl2PmA7XG4iXX0=