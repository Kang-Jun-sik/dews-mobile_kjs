import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'AreaPanel'
};

export const AreaPanel = () => html`<dews-box id="box1" title="box1">
    <dews-container></dews-container>
  </dews-box>
  <dews-area-panel id="panel1">
    <area-item id="item1" col="4">
      <dews-box id="box2" title="box2"> </dews-box>
    </area-item>
    <area-item id="item2" col="8">
      <dews-box id="box2" title="box3"> </dews-box>
      <!--<dews-area-panel>
        <area-item col="6">
          <dews-box id="box3" title="box3"> </dews-box>
        </area-item>
        <area-item col="6">
          <dews-box id="box4" title="box4"></dews-box>
        </area-item>
      </dews-area-panel>-->
    </area-item>
  </dews-area-panel>
  <dews-box id="box5" title="box5"></dews-box>`;
