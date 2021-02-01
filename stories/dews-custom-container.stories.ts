import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'CustomContainer'
};

export const FormContainer720 = () => html`<div style="width: 720px">
  <dews-box title="dews-custom-container">
    <dews-custom-container>
      <dews-datepicker></dews-datepicker>
      <dews-timepicker></dews-timepicker>
    </dews-custom-container>
  </dews-box>
</div>`;
