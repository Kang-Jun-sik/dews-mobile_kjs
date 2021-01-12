import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Box'
};

export const Box = () => html`<div style="width: 360px">
  <dews-box title="box" ?collapsed="${true}">
    <dews-serach-container>
      <dews-button title="button" />
      <dews-textbox title="button" />
    </dews-serach-container>
  </dews-box>
</div> `;
