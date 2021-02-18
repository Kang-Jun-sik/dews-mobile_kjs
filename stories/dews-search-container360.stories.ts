import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'SearchContainer'
};

export const SearchContainer360 = () => html` <div style="width: 360px;display: inline-block">
  <dews-box title="box">
    <dews-search-container id="search3" col="2" title="Search-Container">
      <container-button data-set data-reset data-capture>
        <dews-button title="Btn" text="확정"></dews-button>
      </container-button>
      <container-summary> 요약영역 </container-summary>
      <container-content>
        <dews-textbox id="tbx01" title="TextBox"></dews-textbox>
        <dews-numerictextbox id="num01" title="numerictextbox">
          <numericbox-button step="500"></numericbox-button>
        </dews-numerictextbox>
        <dews-masktextbox id="masktbx1" type="text" title="000-000" mask="000-000"></dews-masktextbox>
        <dews-radiobutton-group title="radiobutton">
          <dews-radiobutton label="button1"></dews-radiobutton>
          <dews-radiobutton label="button2"></dews-radiobutton>
          <dews-radiobutton label="button3"></dews-radiobutton>
        </dews-radiobutton-group>
        <dews-checkbox-group title="checkbox">
          <dews-checkbox title="Check Box2 reverse" reverse> </dews-checkbox>
          <dews-checkbox title="Check Box3"> </dews-checkbox>
          <dews-checkbox title="Check Box4 "> </dews-checkbox>
        </dews-checkbox-group>
        <dews-datepicker id="date01" title="datepicker"></dews-datepicker>
        <dews-timepicker id="time01" title="timepicker"> </dews-timepicker>
        <dews-yearpicker id="year01" title="yearpicker"> </dews-yearpicker>
        <dews-periodpicker id="period1" required title="PeriodPicker"> </dews-periodpicker>
        <dews-weekperiodpicker id="period2" title="WeekPeriodPicker"> </dews-weekperiodpicker>
        <dews-monthperiodpicker id="period3" title="MonthPeriodPicker"> </dews-monthperiodpicker>
        <dews-dropdownlist id="ddl02" title="DropDown">
          <dropdownlist-item title="DATA-1"></dropdownlist-item>
          <dropdownlist-item title="DATA-2"></dropdownlist-item>
          <dropdownlist-item title="DATA-3"></dropdownlist-item>
        </dews-dropdownlist>
        <!--        <dews-codepicker id="code02" titale="CodePicker"></dews-codepicker>-->
      </container-content>
    </dews-search-container>
  </dews-box>
</div>`;
