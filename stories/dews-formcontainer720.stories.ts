import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'FormContainer'
};

export const FormContainer720 = () => html`<div style="width: 720px">
  <dews-box title="box">
    <dews-form-container id="form2" title="1234">
      <container-button data-set data-capture data-reset>
        <dews-button title="Btn" text="확정"></dews-button>
      </container-button>
      <container-content>
        <form-section title="기본정보">
          <dews-textbox id="tbx01" title="TextBox"></dews-textbox>
          <dews-numerictextbox id="num01" title="numerictextbox">
            <numericbox-button step="500"></numericbox-button>
          </dews-numerictextbox>
          <dews-masktextbox id="masktbx1" type="text" title="000-000" mask="000-000"></dews-masktextbox>
          <dews-radiobutton-group id="radiogroup1" title="radiobutton">
            <dews-radiobutton label="radio1" value="radio1"></dews-radiobutton>
            <dews-radiobutton label="radio2" value="radio2"></dews-radiobutton>
            <dews-radiobutton label="radio3" value="radio3"></dews-radiobutton>
          </dews-radiobutton-group>
          <dews-checkbox-group id="checkbox1" title="checkbox">
            <dews-checkbox label="checkbox1" value="check1"> </dews-checkbox>
            <dews-checkbox label="checkbox2" value="check2"> </dews-checkbox>
            <dews-checkbox label="checkbox3" value="check3"> </dews-checkbox>
          </dews-checkbox-group>
          <dews-datepicker id="date01" title="datepicker"></dews-datepicker>
          <dews-timepicker id="time01" title="timepicker"> </dews-timepicker>
          <dews-yearpicker id="year01" title="yearpicker"> </dews-yearpicker>
          <dews-periodpicker id="period1" required title="PeriodPicker"> </dews-periodpicker>
          <dews-weekperiodpicker id="period2" title="WeekPeriodPicker"> </dews-weekperiodpicker>
          <dews-monthperiodpicker id="period3" title="MonthPeriodPicker"> </dews-monthperiodpicker>
          <dews-dropdownlist
            id="ddl1"
            title="dropdownlist"
            multi
            datasource="datasource1"
            auto-bind
            key-field="key"
            label-field="label"
            onOpen="${(e: any) => {
              console.log('open');
              e.target.setItems([
                { key: '1234', label: '리스트 추가1' },
                { key: '1235', label: '리스트 추가2' },
                { key: '1236', label: '리스트 추가3' }
              ]);
            }}"
          ></dews-dropdownlist>
        </form-section>
        <form-section title="추가정보">
          <dews-textbox id="tbx04" title="4"></dews-textbox>
          <dews-textbox id="tbx05" title="5"></dews-textbox>
          <dews-textbox id="tbx06" title="6"></dews-textbox>
        </form-section>
      </container-content>
    </dews-form-container>
  </dews-box>
</div>`;
