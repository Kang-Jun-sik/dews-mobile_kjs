import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Column-Set'
};

export const ColumnSet = () => html`<div style="width: 360px">
  <dews-datasource
    id="datasource1"
    onChange="${(e: any) => {
      console.log('test', e);
    }}"
  >
    <ds-transport>
      <ds-transport-read url="http://localhost:3030/api/baseData" type="post"></ds-transport-read>
      <ds-transport-save url="http://localhost:3030/api/batchSave"></ds-transport-save>
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

  <columnset-button
    datasource="datasource1"
    field="name"
    label-field="name"
    auto-bind
    onOpen="${(e: any) => {
      console.log('onOpen', e);
    }}"
    onComplete="${(e: any) => {
      console.log('onComplete', e);
    }}"
  >
  </columnset-button>
</div> `;
