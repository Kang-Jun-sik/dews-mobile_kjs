import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'FormContainer'
};

export const FormContainer1280 = () => html`<div style="width: 1280px">
  <dews-box title="box">
    <dews-form-container title="1234">
      <container-button data-set>
        <dews-button title="button"></dews-button>
      </container-button>
      <container-content>
        <form-section title="기본정보">
          <dews-textbox title="1"></dews-textbox>
          <dews-textbox title="2"></dews-textbox>
          <dews-textbox title="3"></dews-textbox>
        </form-section>
        <form-section title="추가정보">
          <dews-textbox title="4"></dews-textbox>
          <dews-textbox title="5"></dews-textbox>
          <dews-textbox title="6"></dews-textbox>
        </form-section>
      </container-content>
    </dews-form-container>
  </dews-box>
</div>`;
