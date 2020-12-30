import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Monthpicker'
};

export const Monthpicker = () => html`<div style="width: 360px">
  <dews-area-panel>
    <area-item coll="8">
      <dews-tabs title="Tab">
        <dews-tab title="Tab1">
          <dews-form-container>
            <container-content>
              <form-section title="기본정보">
                <dews-monthpicker required title="monthpicker1"> </dews-monthpicker>
                <dews-monthpicker
                  required
                  spinner
                  value="20200801"
                  title="monthpicker2"
                  @change="${(e: Event) => {
                    console.log(e);
                    console.log('change');
                  }}"
                >
                </dews-monthpicker>
                <dews-monthpicker spinner title="monthpicker3"> </dews-monthpicker>
                <dews-monthpicker required holidays-visiable holidays-disabled title="monthpicker4"> </dews-monthpicker>
              </form-section>
            </container-content>
          </dews-form-container>
        </dews-tab>
        <dews-tab title="Tab2">
          <dews-form-container>
            <container-content>
              <form-section title="추가정보">
                <dews-monthpicker title="일선택"> </dews-monthpicker>
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
              <dews-monthpicker title="picker"> </dews-monthpicker>
            </form-section>
          </container-content>
        </dews-form-container>
      </dews-box>
    </area-item>
  </dews-area-panel>
</div>`;
