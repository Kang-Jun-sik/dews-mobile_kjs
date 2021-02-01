import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Checkbox'
};

export const CheckBox = () => html` <div style="width: 360px">
    <dews-checkbox-group>
      <dews-checkbox label="Check Box1" reverse bookmark> </dews-checkbox>
      <dews-checkbox title="Check Box2 reverse" reverse> </dews-checkbox>
      <dews-checkbox title="Check Box3"> </dews-checkbox>
      <dews-checkbox title="Check Box4 "> </dews-checkbox>
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
