import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Radiobutton'
};

export const RadioButton = () => html`<div style="width: 360px">
    <dews-radiobutton-group title="title!!">
      <dews-radiobutton title="button1"></dews-radiobutton>
      <dews-radiobutton title="button2"></dews-radiobutton>
      <dews-radiobutton title="button3"></dews-radiobutton>
    </dews-radiobutton-group>
  </div>
  <div style="width: 360px">
    <dews-radiobutton-group title="title!!" disabled align="vertical">
      <dews-radiobutton title="button1"></dews-radiobutton>
      <dews-radiobutton title="button2" checked disabled></dews-radiobutton>
      <dews-radiobutton title="button3"></dews-radiobutton>
    </dews-radiobutton-group>
  </div>`;
