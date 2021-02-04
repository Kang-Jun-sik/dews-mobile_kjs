import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'MonthPeriodPicker'
};

export const MonthPeriodPicker = () => html`<div style="width: 360px">
  <dews-area-panel>
    <dews-box title="box2">
      <dews-form-container>
        <container-content>
          <form-section title="추가정보">
            <dews-monthperiodpicker required title="PeriodPicker"> </dews-monthperiodpicker>
          </form-section>
        </container-content>
      </dews-form-container>
    </dews-box>
  </dews-area-panel>
</div>`;
