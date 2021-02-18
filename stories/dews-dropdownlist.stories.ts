import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'DropdownList'
};

export const Dropdownlist = () =>
  html`<div style="width: 360px">
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
    <dews-dropdownlist title="DataSource" datasource="datasource1" auto-bind key-field="name" label-field="name">
    </dews-dropdownlist>
    <dews-dropdownlist
      key-field="key"
      label-field="name"
      title="multi"
      multi
      onOpen="${(e: any) => {
        console.log('open');
        e.target.setItems([
          { key: '1234', label: '리스트 추가1' },
          { key: '1235', label: '리스트 추가2' },
          { key: '1236', label: '리스트 추가3' }
        ]);
        e.target.setItem({ key: '1234', name: '추가되는것' });
      }}"
      onClose="${(e: any) => {
        console.log(e.target.getItems());
        e.target.removeItems();
      }}"
    >
      <dropdownlist-item title="DATA-1"></dropdownlist-item>
      <dropdownlist-item title="DATA-2"></dropdownlist-item>
      <dropdownlist-item title="DATA-3"></dropdownlist-item>
      <dropdownlist-item title="DATA-4"></dropdownlist-item>
      <dropdownlist-item title="DATA-5"></dropdownlist-item>
      <dropdownlist-item title="DATA-6"></dropdownlist-item>
    </dews-dropdownlist>
    <dews-dropdownlist title="single">
      <dropdownlist-item title="DATA-1"></dropdownlist-item>
      <dropdownlist-item title="DATA-2"></dropdownlist-item>
      <dropdownlist-item title="DATA-3"></dropdownlist-item>
      <dropdownlist-item title="DATA-4"></dropdownlist-item>
      <dropdownlist-item title="DATA-5"></dropdownlist-item>
      <dropdownlist-item title="DATA-6"></dropdownlist-item>
      <dropdownlist-item title="DATA-7"></dropdownlist-item>
      <dropdownlist-item title="DATA-8"></dropdownlist-item>
      <dropdownlist-item title="DATA-9"></dropdownlist-item>
      <dropdownlist-item title="DATA-10"></dropdownlist-item>
      <dropdownlist-item title="DATA-11"></dropdownlist-item>
      <dropdownlist-item title="DATA-12"></dropdownlist-item>
      <dropdownlist-item title="DATA-13"></dropdownlist-item>
      <dropdownlist-item title="DATA-14"></dropdownlist-item>
      <dropdownlist-item title="DATA-15"></dropdownlist-item>
      <dropdownlist-item title="DATA-16"></dropdownlist-item>
      <dropdownlist-item title="DATA-17"></dropdownlist-item>
      <dropdownlist-item title="DATA-18"></dropdownlist-item>
      <dropdownlist-item title="DATA-19"></dropdownlist-item>
      <dropdownlist-item title="DATA-20"></dropdownlist-item>
    </dews-dropdownlist>
  </div>`;
