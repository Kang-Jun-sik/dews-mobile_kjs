import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'InfoboxContainer'
};

export const Infobox = () => html`<div style="width: 360px">
  <dews-infobox-container>
    테스트1<info-care>주의 입력</info-care> <info-warning>경고 입력</info-warning>테스트2
  </dews-infobox-container>
  <dews-infobox-container info-type="warning">
    테스트1<info-warning>경고 입력</info-warning><info-care>주의 입력</info-care>테스트2
  </dews-infobox-container>
  <dews-infobox-container info-type="care">
    테스트1<info-warning>경고 입력!!</info-warning><info-care>주의 입력</info-care>테스트2
  </dews-infobox-container>
</div> `;
