import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'PeriodPicker'
};
export const PeriodPicker = () => html `<div style="width: 360px">
  <dews-area-panel>
    <dews-box title="box2">
      <dews-form-container>
        <container-content>
          <form-section title="추가정보">
            <dews-periodpicker required title="PeriodPicker"> </dews-periodpicker>
          </form-section>
        </container-content>
      </dews-form-container>
    </dews-box>
  </dews-area-panel>
</div>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1wZXJpb2RwaWNrZXIuc3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRld3MtcGVyaW9kcGlja2VyLnN0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLGVBQWU7SUFDYixLQUFLLEVBQUUsY0FBYztDQUN0QixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7O09BWS9CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBodG1sIH0gZnJvbSAnbGl0LWh0bWwnO1xuaW1wb3J0ICcuLi9zcmMvZGV3cy1tb2JpbGUuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnUGVyaW9kUGlja2VyJ1xufTtcblxuZXhwb3J0IGNvbnN0IFBlcmlvZFBpY2tlciA9ICgpID0+IGh0bWxgPGRpdiBzdHlsZT1cIndpZHRoOiAzNjBweFwiPlxuICA8ZGV3cy1hcmVhLXBhbmVsPlxuICAgIDxkZXdzLWJveCB0aXRsZT1cImJveDJcIj5cbiAgICAgIDxkZXdzLWZvcm0tY29udGFpbmVyPlxuICAgICAgICA8Y29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICAgICAgPGZvcm0tc2VjdGlvbiB0aXRsZT1cIuy2lOqwgOygleuztFwiPlxuICAgICAgICAgICAgPGRld3MtcGVyaW9kcGlja2VyIHJlcXVpcmVkIHRpdGxlPVwiUGVyaW9kUGlja2VyXCI+IDwvZGV3cy1wZXJpb2RwaWNrZXI+XG4gICAgICAgICAgPC9mb3JtLXNlY3Rpb24+XG4gICAgICAgIDwvY29udGFpbmVyLWNvbnRlbnQ+XG4gICAgICA8L2Rld3MtZm9ybS1jb250YWluZXI+XG4gICAgPC9kZXdzLWJveD5cbiAgPC9kZXdzLWFyZWEtcGFuZWw+XG48L2Rpdj5gO1xuIl19