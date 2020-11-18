import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Datepicker'
};

export const Datepicker = () => html`<div style="width: 360px">
  <dews-datepicker> </dews-datepicker>
</div>`;
