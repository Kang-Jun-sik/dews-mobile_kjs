import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'SearchContainer'
};

export const SearchContainer360 = () => html` <div style="width: 360px;display: inline-block">
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
