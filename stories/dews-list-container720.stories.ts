import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'ListContainer'
};

export const ListContainer720 = () => html`<div style="width: 720px">
  <dews-tabs>
    <dews-tab title="default">
      <dews-list-container title="title#12">
        <container-button>
          <dews-button slot="button" title="Btn"></dews-button>
        </container-button>
        <container-summary>
          <span>요약 내용영역</span>
        </container-summary>
        <container-content>
          <dews-textbox title="title#1"></dews-textbox>
        </container-content>
      </dews-list-container>
    </dews-tab>
  </dews-tabs>
  <dews-box title="box">
    <dews-list-container title="title#12">
      <container-button>
        <dews-button slot="button" title="Btn"></dews-button>
      </container-button>
      <container-summary>
        <span>요약 내용영역</span>
      </container-summary>
      <container-content>
        <dews-textbox title="title#1"></dews-textbox>
      </container-content>
    </dews-list-container>
  </dews-box>
</div>`;
