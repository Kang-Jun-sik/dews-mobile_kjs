import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'ZipCodePicker'
};

export const ZipCodePicker = () => html`<div style="width: 360px">
  <dews-zipcodepicker title="기본형"></dews-zipcodepicker>
  <dews-zipcodepicker title="기본형 + required" type="userselect" required></dews-zipcodepicker>
  <dews-zipcodepicker title="기본형 + required + reset" type="userselect" required reset></dews-zipcodepicker>
  <dews-zipcodepicker title="기본형 + disabled" disabled></dews-zipcodepicker>
  <dews-zipcodepicker title="기본형 + readonly" readonly></dews-zipcodepicker>
  <dews-zipcodepicker title="상세주소 입력" detail></dews-zipcodepicker>
  <dews-zipcodepicker id="detail" title="상세주소 입력+required" required detail></dews-zipcodepicker>
  <dews-zipcodepicker id="detail" title="상세주소 입력+required+reset" required detail reset></dews-zipcodepicker>
  <dews-zipcodepicker title="상세주소 입력+disabled" disabled detail></dews-zipcodepicker>
  <dews-zipcodepicker title="상세주소 입력+readonly" readonly detail></dews-zipcodepicker>
</div>`;
