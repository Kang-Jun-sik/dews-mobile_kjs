import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Codepicker'
};

export const Codepicker = () => html`<div style="width: 360px">
  <dews-codepicker> </dews-codepicker>
</div>`;
