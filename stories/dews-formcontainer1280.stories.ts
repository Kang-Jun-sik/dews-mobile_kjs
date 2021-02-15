import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'FormContainer'
};

export const FormContainer1280 = () => html`<div style="width: 1280px">
  <dews-box title="box">
    <dews-form-container id="form1" title="1234">
      <container-button data-set data-capture data-reset>
        <dews-button title="Btn" text="확정"></dews-button>
      </container-button>
      <container-content>
        <form-section title="기본정보">
          <dews-textbox id="tbx01" title="1"></dews-textbox>
          <dews-textbox id="tbx02" title="2"></dews-textbox>
          <dews-textbox id="tbx03" title="3"></dews-textbox>
        </form-section>
        <form-section title="추가정보">
          <dews-textbox id="tbx04" title="4"></dews-textbox>
          <dews-textbox id="tbx05" title="5"></dews-textbox>
          <dews-textbox id="tbx06" title="6"></dews-textbox>
        </form-section>
      </container-content>
    </dews-form-container>
  </dews-box>
</div>`;
