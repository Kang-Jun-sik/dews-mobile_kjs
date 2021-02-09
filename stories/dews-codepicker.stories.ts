import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Codepicker'
};

export const Codepicker = () => html`<div style="width: 360px">
  <dews-datasource
    id="datasource1"
    onChange="${(e: any) => {
      console.log('test', e);
    }}"
  >
    <ds-transport>
      <ds-transport-read url="http://10.106.4.176:3000/api/baseData" type="post"></ds-transport-read>
      <!--      <ds-transport-save url="http://10.106.4.176:3000/api/batchSave"></ds-transport-save>-->
    </ds-transport>
    <ds-schema>
      <ds-schema-model id-fields="emp_id, name">
        <ds-schema-model-field field="emp_id"></ds-schema-model-field>
        <ds-schema-model-field field="name"></ds-schema-model-field>
        <ds-schema-model-field field="age" type="number"></ds-schema-model-field>
        <ds-schema-model-field field="address" required></ds-schema-model-field>
        <ds-schema-model-field field="test" required></ds-schema-model-field>
      </ds-schema-model>
    </ds-schema>
  </dews-datasource>

  <dews-codepicker
    title="싱글"
    help-title="회사 코드 도움창"
    help-view-url=""
    help-api-url=""
    code-field="age"
    text-field="name"
  >
    <!--auto-bind use-total-count use-all-select column-type="1"-->
    <dews-cardlist datasource="datasource1" height="430px" codepicker>
      <cardlist-field name="name" field="name" title="이름"></cardlist-field>
      <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
      <cardlist-field name="address" field="address" title="주소"></cardlist-field>
    </dews-cardlist>
  </dews-codepicker>

  <dews-codepicker multi title="멀티" help-title="사원 코드 도움창" code-field="code" text-field="text">
    <dews-cardlist datasource="datasource1" height="430px" codepicker>
      <cardlist-field name="name" field="name" title="이름"></cardlist-field>
      <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
      <cardlist-field name="address" field="address" title="주소"></cardlist-field>
    </dews-cardlist>
  </dews-codepicker>
</div>`;
