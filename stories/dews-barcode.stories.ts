import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Barcode'
};

export const Barcode = () => html`
  <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <dews-barcode></dews-barcode>
  </div>
`;
