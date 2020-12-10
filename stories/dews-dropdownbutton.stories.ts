import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'DropdownButton'
};

export const DropdownButton = () => html` <div style="width: 360px">
  <dews-dropdownbutton text="드롭다운버튼">
    <dropdwonbutton
      id="btn1"
      text="버튼1"
      @clcik="${() => {
        console.log('click');
      }}"
    ></dropdwonbutton>
    <dropdwonbutton id="btn2" text="버튼2" disabled></dropdwonbutton>
  </dews-dropdownbutton>
</div>`;
