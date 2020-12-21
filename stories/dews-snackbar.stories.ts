import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Snackbar'
};

export const Snackbar = () => html`<div style="width: 360px">
  <dews-snackbar></dews-snackbar>
</div>`;
