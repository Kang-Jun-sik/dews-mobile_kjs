import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'CardList'
};

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const CardList = () => html`
  <dews-datasource
    id="datasource1"
    onChange="${(e: any) => {
      console.log('test', e);
    }}"
  >
    <ds-transport>
      <ds-transport-read url="http://10.106.4.144:3000/api/baseData" type="post"></ds-transport-read>
      <ds-transport-save url="http://10.106.4.144:3000/api/batchSave"></ds-transport-save>
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

  <div style="width: 360px; height: 3000px;">
    <dews-box title="box">
      <dews-cardlist
        height="500px"
        auto-bind
        datasource="datasource1"
        columnType="2"
        use-card-header
        use-card-collapse
        header-options=${JSON.stringify({
          headerTitleField: 'age',
          firstSubTitleField: 'name',
          secondSubTitleField: 'address',
          useEdit: true,
          useCheckbox: true,
          useBookmark: true
        })}
        use-total-count
        use-control-set
        use-all-select
      >
        <cardlist-field name="name" field="name" title="이름"></cardlist-field>
        <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
        <cardlist-field name="address" field="address" title="주소"></cardlist-field>
      </dews-cardlist>
    </dews-box>
  </div>
`;
