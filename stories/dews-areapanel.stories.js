import { html } from 'lit-html';
import '../src/dews-mobile.js';
export default {
    title: 'AreaPanel'
};
export const AreaPanel = () => html `<dews-box id="box1" title="box1">
    <dews-container></dews-container>
  </dews-box>
  <dews-area-panel id="panel1">
    <area-item id="item1" col="4">
      <dews-box id="box2" title="box2"> </dews-box>
    </area-item>
    <area-item id="item2" col="8">
      <dews-area-panel>
        <area-item col="6">
          <dews-box id="box3" title="box3"> </dews-box>
        </area-item>
        <area-item col="6">
          <dews-box id="box4" title="box4"></dews-box>
        </area-item>
      </dews-area-panel>
    </area-item>
  </dews-area-panel>
  <dews-box id="box5" title="box5"></dews-box>`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV3cy1hcmVhcGFuZWwuc3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRld3MtYXJlYXBhbmVsLnN0b3JpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLHVCQUF1QixDQUFDO0FBRS9CLGVBQWU7SUFDYixLQUFLLEVBQUUsV0FBVztDQUNuQixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OytDQWtCWSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdC1odG1sJztcbmltcG9ydCAnLi4vc3JjL2Rld3MtbW9iaWxlLmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0FyZWFQYW5lbCdcbn07XG5cbmV4cG9ydCBjb25zdCBBcmVhUGFuZWwgPSAoKSA9PiBodG1sYDxkZXdzLWJveCBpZD1cImJveDFcIiB0aXRsZT1cImJveDFcIj5cbiAgICA8ZGV3cy1jb250YWluZXI+PC9kZXdzLWNvbnRhaW5lcj5cbiAgPC9kZXdzLWJveD5cbiAgPGRld3MtYXJlYS1wYW5lbCBpZD1cInBhbmVsMVwiPlxuICAgIDxhcmVhLWl0ZW0gaWQ9XCJpdGVtMVwiIGNvbD1cIjRcIj5cbiAgICAgIDxkZXdzLWJveCBpZD1cImJveDJcIiB0aXRsZT1cImJveDJcIj4gPC9kZXdzLWJveD5cbiAgICA8L2FyZWEtaXRlbT5cbiAgICA8YXJlYS1pdGVtIGlkPVwiaXRlbTJcIiBjb2w9XCI4XCI+XG4gICAgICA8ZGV3cy1hcmVhLXBhbmVsPlxuICAgICAgICA8YXJlYS1pdGVtIGNvbD1cIjZcIj5cbiAgICAgICAgICA8ZGV3cy1ib3ggaWQ9XCJib3gzXCIgdGl0bGU9XCJib3gzXCI+IDwvZGV3cy1ib3g+XG4gICAgICAgIDwvYXJlYS1pdGVtPlxuICAgICAgICA8YXJlYS1pdGVtIGNvbD1cIjZcIj5cbiAgICAgICAgICA8ZGV3cy1ib3ggaWQ9XCJib3g0XCIgdGl0bGU9XCJib3g0XCI+PC9kZXdzLWJveD5cbiAgICAgICAgPC9hcmVhLWl0ZW0+XG4gICAgICA8L2Rld3MtYXJlYS1wYW5lbD5cbiAgICA8L2FyZWEtaXRlbT5cbiAgPC9kZXdzLWFyZWEtcGFuZWw+XG4gIDxkZXdzLWJveCBpZD1cImJveDVcIiB0aXRsZT1cImJveDVcIj48L2Rld3MtYm94PmA7XG4iXX0=