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

  <columnset-button
    key-field="key"
    label-field="label"
    auto-bind
    onOpen="${(e: any) => {
      e.target.setItems([
        { key: '1234', label: '리스트 추가1' },
        { key: '1235', label: '리스트 추가2' },
        { key: '1236', label: '리스트 추가3' }
      ]);
      console.log('onOpen', e);
    }}"
    onComplete="${(e: any) => {
      console.log('onComplete', e);
    }}"
    onClose="${(e: any) => {
      console.log(e.target.getItems(), '닫힘');
      e.target.removeItem('1234');
    }}"
  >
  </columnset-button>

  <columnset-button
    key-field="key"
    label-field="name"
    auto-bind
    onOpen="${(e: any) => {
      e.target.addItem({ key: '1234', name: '추가되는것' });
      console.log('onOpen', e);
    }}"
    onComplete="${(e: any) => {
      console.log('onComplete', e);
    }}"
  >
  </columnset-button>
</div> `;
