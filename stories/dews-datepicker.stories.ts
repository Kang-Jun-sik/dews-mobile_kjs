import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Datepicker'
};

export const Datepicker = () => html`<div style="width: 360px">
  <dews-datepicker></dews-datepicker>
  <dews-datepicker spinner></dews-datepicker>
</div>`;
// <dews-area-panel>
// <area-item coll="8">
//   <dews-tabs title="Tab">
//   <dews-tab title="Tab1">
//   <dews-form-container>
//   <container-content>
//   <form-section title="기본정보">
//   <dews-datepicker required title="datepicker1"> </dews-datepicker>
//   <dews-datepicker
// required
// spinner
// value="20200801"
// title="datepicker2"
// @change="${(e: Event) => {
// console.log(e);
// console.log('change');
// }}"
// >
// </dews-datepicker>
// <dews-datepicker spinner title="datepicker3"> </dews-datepicker>
//   <dews-datepicker required holidays-visiable holidays-disabled title="datepicker4"> </dews-datepicker>
//   </form-section>
//   </container-content>
//   </dews-form-container>
//   </dews-tab>
//   <dews-tab title="Tab2">
//   <dews-form-container>
//   <container-content>
//   <form-section title="추가정보">
//   <dews-datepicker title="일선택"> </dews-datepicker>
//   </form-section>
//   </container-content>
//   </dews-form-container>
//   </dews-tab>
//   </dews-tabs>
//   </area-item>
//   <area-item coll="4">
//   <dews-box title="box2">
//   <dews-form-container>
//   <container-content>
//   <form-section title="추가정보">
//   <dews-datepicker title="picker"> </dews-datepicker>
//   </form-section>
//   </container-content>
//   </dews-form-container>
//   </dews-box>
//   </area-item>
//   </dews-area-panel>
