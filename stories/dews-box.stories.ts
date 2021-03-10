import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Box'
};

export const Box = () => html`
  <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <dews-box title="BOX">
      <dews-serach-container>
        <dews-button title="button" />
        <dews-textbox title="button" />
      </dews-serach-container>
    </dews-box>
  </div>
`;
