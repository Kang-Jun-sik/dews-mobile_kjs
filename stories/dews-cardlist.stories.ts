import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'CardList'
};

export const CardList = () => html`
  <div style="width: 360px;">
    <dews-box title="box">
      <dews-cardlist></dews-cardlist>
    </dews-box>
  </div>
`;
