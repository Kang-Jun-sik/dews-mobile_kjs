import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Yearpicker'
};

export const Yearpicker = () => html`<div style="width: 360px">
  <dews-area-panel>
    <area-item coll="8">
      <dews-tabs title="Tab">
        <dews-tab title="Tab1">
          <dews-form-container>
            <container-content>
              <form-section title="기본정보">
                <dews-yearpicker required title="yearpicker1"> </dews-yearpicker>
                <dews-yearpicker
                  required
                  spinner
                  value="20200801"
                  title="yearpicker2"
                  @change="${(e: Event) => {
                    console.log(e);
                    console.log('change');
                  }}"
                >
                </dews-yearpicker>
                <dews-yearpicker spinner title="yearpicker3"> </dews-yearpicker>
                <dews-yearpicker required holidays-visiable holidays-disabled title="yearpicker4"> </dews-yearpicker>
              </form-section>
            </container-content>
          </dews-form-container>
        </dews-tab>
        <dews-tab title="Tab2">
          <dews-form-container>
            <container-content>
              <form-section title="추가정보">
                <dews-yearpicker title="일선택"> </dews-yearpicker>
              </form-section>
            </container-content>
          </dews-form-container>
        </dews-tab>
      </dews-tabs>
    </area-item>
    <area-item coll="4">
      <dews-box title="box2">
        <dews-form-container>
          <container-content>
            <form-section title="추가정보">
              <dews-yearpicker title="picker"> </dews-yearpicker>
            </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
  </dews-area-panel>
</div>`;
