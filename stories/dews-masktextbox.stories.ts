import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'MaskTextBox'
};

export const MaskTextbox = () => html`<style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <dews-box title="box">
      <dews-masktextbox id="masktbx1" type="text" title="000-000" mask="000-000" value="123456"></dews-masktextbox>
      <dews-masktextbox
        id="masktbx2"
        type="text"
        title="##-###-####"
        mask="##-###-####"
        value="021921225"
      ></dews-masktextbox>
      <dews-masktextbox id="masktbx3" type="text" placeholder="hint" title="LL-00" mask="LL-00"></dews-masktextbox>
      <dews-masktextbox id="masktbx4" type="text" title="Text" prompt="#" mask="LL-0000"></dews-masktextbox>
      <dews-masktextbox id="masktbx5" type="text" title="Text" prompt=" " mask="LL-0000"></dews-masktextbox>
      <dews-masktextbox id="masktbx6" type="text" title="required" required mask="000-000"></dews-masktextbox>
      <dews-masktextbox id="masktbx7" type="text" title="disabled" disabled mask="000-000"></dews-masktextbox>
      <dews-masktextbox id="masktbx8" type="text" title="readonly" readonly mask="000-000"></dews-masktextbox>
    </dews-box>
  </div>`;
