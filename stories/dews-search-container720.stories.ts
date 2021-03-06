import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'SearchContainer'
};

export const SearchContainer720 = () => html`<div style="width: 720px">
  <dews-box title="box">
    <dews-search-container id="search2" title="Search-Container">
      <container-button data-set data-reset data-capture>
        <dews-button title="Btn" text="확정"></dews-button>
      </container-button>
      <container-summary> 요약영역 </container-summary>
      <container-content>
        <dews-textbox id="tbx01" title="TextBox"></dews-textbox>
        <dews-datepicker id="date01" title="DatePicker"></dews-datepicker>
        <dews-dropdownlist id="ddl01" title="DropDown"></dews-dropdownlist>
        <dews-codepicker id="code01" title="CodePicker"></dews-codepicker>
        <dews-dropdownlist id="ddl02" title="DropDown"></dews-dropdownlist>
        <dews-codepicker id="code01" title="CodePicker"></dews-codepicker>
        <dews-textbox id="tbx02" title="TextBox"></dews-textbox>
      </container-content>
    </dews-search-container>
  </dews-box>
</div>`;
