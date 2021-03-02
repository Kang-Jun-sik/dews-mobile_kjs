import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'TextBox'
};

export const TextBox = () => html`<div style="width: 360px">
  <dews-textbox title="multi" multi></dews-textbox>
  <dews-textbox id="textbox" title="default"></dews-textbox>
  <dews-textbox title="disabled" disabled></dews-textbox>
  <dews-textbox title="readonly" readonly></dews-textbox>
  <dews-textbox title="disabled readonly" disabled readonly></dews-textbox>
  <dews-textbox title="placeholder" placeholder="placeholder"></dews-textbox>
  <dews-textbox type="password" title="password"></dews-textbox>
</div>`;
