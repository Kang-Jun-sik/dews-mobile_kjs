import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Timepicker'
};

export const Timepicker = () => html`<div style="width: 360px">
  <dews-area-panel>
    <area-item coll="8">
      <dews-box title="timepicker">
        <dews-form-container>
          <container-content>
            <form-section title="기본정보">
              <dews-timepicker required title="timepicker1" min="0800" max="2200" minute-interval="5">
              </dews-timepicker>
              <dews-timepicker required title="timepicker2" value="0707" minute-interval="5"> </dews-timepicker>
              <dews-timepicker required title="timepicker3"> </dews-timepicker>
            </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
    <area-item coll="4">
      <dews-box title="box2">
        <dews-form-container>
          <container-content>
            <form-section title="추가정보"> </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
  </dews-area-panel>
</div>`;
