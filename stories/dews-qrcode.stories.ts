import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Qrcode'
};

export const Qrcode = () => html`
  <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
      <dews-qrcode color="blue" value="testdata"></dews-qrcode>
      <dews-qrcode color="red" reflect border border-color="red" border-size="2px" value="https://gwa.douzone.com">
      </dews-qrcode>
      <dews-qrcode  data="testdata"></dews-qrcode>
    </dews-box>
  </div>
`;
