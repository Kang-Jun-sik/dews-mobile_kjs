import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'DropdownButton'
};

export const DropdownButton = () => html` <div style="width: 360px">
  <dews-dropdownbutton id="ddbtn1" text="드롭다운버튼">
    <dropdown-childbutton
      id="btn1"
      text="버튼1"
      @click="${() => {
        console.log('click');
      }}"
    ></dropdown-childbutton>
    <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
  </dews-dropdownbutton>

  <dews-dropdownbutton id="ddbtn2" text="disabled" disabled="true">
    <dropdown-childbutton>
      <dropdown-childbutton text="child1"></dropdown-childbutton>
    </dropdown-childbutton>
  </dews-dropdownbutton>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">ButtonGroup</h2>
  <dews-button-gruop>
    <dews-dropdownbutton size="small" text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @click="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
    <dews-dropdownbutton text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @clcik="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
    <dews-dropdownbutton size="large" text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @clcik="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
  </dews-button-gruop>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">ButtonGroup - emphasize</h2>
  <dews-button-gruop>
    <dews-dropdownbutton ui="emphasize" size="small" text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @clcik="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
    <dews-dropdownbutton ui="emphasize" text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @clcik="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
    <dews-dropdownbutton ui="emphasize" size="large" text="드롭다운버튼">
      <dropdown-childbutton
        id="btn1"
        text="버튼1"
        @clcik="${() => {
          console.log('click');
        }}"
      ></dropdown-childbutton>
      <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
    </dews-dropdownbutton>
  </dews-button-gruop>
</div>`;
