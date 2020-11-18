import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Button'
};

export const Button = () => html`<div style="width: 360px">
    <dews-button />
  </div>
  <div style="width: 360px">
    <dews-button title="button" />
  </div>
  <div style="width: 360px">
    <dews-button title="button" disabled />
  </div>`;
