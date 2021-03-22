import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'DateTimePicker'
};

export const Datetimepicker = () => html`
  <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <dews-datetimepicker></dews-datetimepicker>
  </div>
`;
