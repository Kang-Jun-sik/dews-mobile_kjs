import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'TabPanel'
};

export const TabPanel = () => html` <style>
    html {
      font-size: 15px;
    }
  </style>
  <dews-area-panel>
    <area-item col="6">
      <dews-tabs id="tabs1">
        <dews-tab title="tab1">
          <dews-container>tab1</dews-container>
        </dews-tab>
        <dews-tab title="tab2">
          <dews-container>tab2</dews-container>
        </dews-tab>
        <dews-tab title="tab3" hide> </dews-tab>
        <dews-tab title="tab4"> </dews-tab>
        <dews-tab title="tab5"> </dews-tab>
        <dews-tab title="tab6"> </dews-tab>
      </dews-tabs>
    </area-item>
    <area-item col="6">
      <dews-tabs selected="1">
        <dews-tab title="tab1">
          <dews-search-container title="Search-Container">
            <container-button data-set data-reset data-capture></container-button>
            <container-content>
              <dews-textbox></dews-textbox>
            </container-content>
          </dews-search-container>
        </dews-tab>
        <dews-tab title="tab2">
          <dews-container>tab2</dews-container>
        </dews-tab>
        <dews-tab title="tab3"> </dews-tab>
        <dews-tab title="tab4"> </dews-tab>
        <dews-tab title="tab5"> </dews-tab>
        <dews-tab title="tab6"> </dews-tab>
      </dews-tabs>
    </area-item>
  </dews-area-panel>`;
