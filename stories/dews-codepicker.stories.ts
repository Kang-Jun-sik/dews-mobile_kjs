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
      <ds-transport-read url="http://localhost:3000/api/baseData" type="post"></ds-transport-read>
      <ds-transport-save url="http://localhost:3000/api/batchSave"></ds-transport-save>
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

  <dews-codepicker title="싱글" help-title="싱글도움창" code-field="age" text-field="name">
    <dews-cardlist datasource="datasource1">
      <cardlist-field name="name" field="name" title="이름"></cardlist-field>
      <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
      <cardlist-field name="address" field="address" title="주소"></cardlist-field>
    </dews-cardlist>

    <codepicker-search>
      <dews-dropdownlist id="ddl1" title="이름">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-dropdownlist id="ddl2" title="주소">
        <dropdownlist-item title="DATA-1">1</dropdownlist-item>
        <dropdownlist-item title="DATA-2">2</dropdownlist-item>
      </dews-dropdownlist>
      <dews-textbox id="txtbox" title="나이"> </dews-textbox>
    </codepicker-search>
  </dews-codepicker>

  <dews-codepicker multi title="멀티" help-title="사원 코드 도움창" code-field="age" text-field="name">
    <dews-cardlist datasource="datasource1">
      <cardlist-field name="name" field="name" title="이름"></cardlist-field>
      <cardlist-field name="address" field="address" title="주소"></cardlist-field>
      <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
    </dews-cardlist>

    <codepicker-search>
      <dews-dropdownlist id="ddl1" title="이름">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-dropdownlist id="ddl2" title="주소">
        <dropdownlist-item title="DATA-1">1</dropdownlist-item>
        <dropdownlist-item title="DATA-2">2</dropdownlist-item>
      </dews-dropdownlist>
      <dews-textbox id="txtbox" title="나이"> </dews-textbox>
    </codepicker-search>
  </dews-codepicker>
</div>`;
