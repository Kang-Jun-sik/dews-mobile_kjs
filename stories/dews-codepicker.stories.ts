import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Codepicker'
};

export const Codepicker = () => html`<div style="width: 360px">
  <dews-codepicker
    title="싱글"
    help-title="회사 코드 도움창"
    help-view-url=""
    help-api-url=""
    code-field="code"
    text-field="text"
  >
  </dews-codepicker>

  <dews-codepicker multi title="멀티" help-title="사원 코드 도움창" code-field="code" text-field="text">
  </dews-codepicker>

  <dews-datasource id="ds"> </dews-datasource>
</div>`;
