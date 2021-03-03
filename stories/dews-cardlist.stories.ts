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
      <ds-transport-read url="http://10.106.4.176:3000/api/baseData" type="post"></ds-transport-read>
      <ds-transport-save url="http://10.106.4.176:3000/api/batchSave"></ds-transport-save>
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

  <div style="width: 360px; height: 500px;">
    <dews-box title="box">
      <dews-cardlist
        height="500px"
        auto-bind
        datasource="datasource1"
        column-type="2"
        use-total-count
        use-card-header
        use-card-collapse
        header-options=${JSON.stringify({
          headerTitleField: 'age',
          firstSubTitleField: 'name',
          secondSubTitleField: 'address',
          useEdit: true,
          useCheckbox: true,
          useBookmark: true,
          status: 'complete'
        })}
        use-control-set
        use-all-select
      >
        <cardlist-field name="name" field="name" title="이름"></cardlist-field>
        <cardlist-field name="age" field="age" title="나이" type="number"></cardlist-field>
        <cardlist-field name="address" field="address" title="주소"></cardlist-field>
        <cardlist-field name="emp_id" field="emp_id" title="사번"></cardlist-field>
        <cardlist-field name="birth" field="birth" title="생일"></cardlist-field>
        <!--        <cardlist-field name="gender" field="gender" title="성별"></cardlist-field>-->
        <!--        <cardlist-field name="hobby" field="hobby" title="취미"></cardlist-field>-->
        <!--        <cardlist-field name="job" field="job" title="직업"></cardlist-field>-->
        <!--        <cardlist-field name="height" field="height" title="신장"></cardlist-field>-->
        <!--        <cardlist-field name="dept" field="dept" title="부서"></cardlist-field>-->
        <!--        <cardlist-field name="team" field="team" title="팀"></cardlist-field>-->
        <!--        <cardlist-field name="position" field="position" title="직급"></cardlist-field>-->
        <!--        <cardlist-field name="id" field="id" title="아이디"></cardlist-field>-->
        <!--        <cardlist-field name="telephone" field="telephone" title="전화번호"></cardlist-field>-->
        <!--        <cardlist-field name="company" field="company" title="회사명"></cardlist-field>-->
        <!--        <cardlist-field name="vacation" field="vacation" title="휴가일수"></cardlist-field>-->
        <!--        <cardlist-field name="test" field="test" title="test"></cardlist-field>-->
        <!--        <cardlist-field name="test2" field="test2" title="test2"></cardlist-field>-->
        <!--        <cardlist-field name="test3" field="test3" title="test3"></cardlist-field>-->
        <!--        <cardlist-field name="test4" field="test4" title="test4"></cardlist-field>-->
      </dews-cardlist>
    </dews-box>
  </div>
`;
