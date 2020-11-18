import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'MaskTextBox'
};

export const MaskTextbox = () => html`<div style="width: 360px">
  <dews-box title="box">
    <dews-masktextbox type="text" format="password" title="Text"></dews-masktextbox>
    <dews-masktextbox type="Number" disabled format="password" title="disabled"></dews-masktextbox>
    <dews-masktextbox type="Number" readonly format="password" title="readonly"></dews-masktextbox>
  </dews-box>
</div>`;
