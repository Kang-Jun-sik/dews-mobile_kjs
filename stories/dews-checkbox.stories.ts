import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Checkbox'
};

export const CheckBox = () => html` <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <dews-checkbox-group id="chkgroup1">
      <dews-checkbox label="Check Box1" value="Check Box1" checked reverse bookmark> </dews-checkbox>
      <dews-checkbox label="Check Box2" value="Check Box2" title="Check Box2 reverse" reverse> </dews-checkbox>
      <dews-checkbox label="Check Box3" value="Check Box3" title="Check Box3"> </dews-checkbox>
      <dews-checkbox label="Check Box4" value="Check Box4" title="Check Box4"> </dews-checkbox>
    </dews-checkbox-group>
    <br />
    <dews-checkbox-group align="vertical">
      <dews-checkbox title="Check Box1" bookmark> </dews-checkbox>
      <dews-checkbox title="Check Box2"> </dews-checkbox>
      <dews-checkbox title="Check Box3"> </dews-checkbox>
      <dews-checkbox title="Check Box4 reverse" reverse> </dews-checkbox>
    </dews-checkbox-group>
    <br />
  </div>
  <div style="width: 360px">
    <dews-checkbox disabled title="Check Box"> </dews-checkbox>
  </div>
  <div style="width: 360px">
    <dews-checkbox disabled checked title="Disabled Check Box"> </dews-checkbox>
  </div>`;
