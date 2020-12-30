import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Togglebutton'
};

export const Togglebutton = () => html`<div style="width: 360px">
  <dews-togglebutton
    @change="${() => {
      console.log('change');
    }}"
    @check="${() => {
      console.log('check');
    }}"
  ></dews-togglebutton>
  <dews-togglebutton disabled on title="알림" text="마케팅 정보 수신 동의"></dews-togglebutton>
  <dews-togglebutton disabled text="이벤트 알림 동의"></dews-togglebutton>
  <dews-togglebutton disabled on></dews-togglebutton>
  <dews-togglebutton on></dews-togglebutton>
  <dews-togglebutton title="알림" text="마케팅 정보 수신 동의"></dews-togglebutton>
</div>`;
