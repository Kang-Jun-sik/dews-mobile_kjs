import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Button'
};

export const Button = () => html` <div style="width: 360px">
  <dews-button text="button" @click="${() => {
    console.log('click');
  }}""></dews-button>



  <h2 style="font-size:15px;">Solid small(button group)</h2>
  <dews-button-group>
    <group-item>
      <dews-button text="Solid" size="small"></dews-button>
      <dews-dropdownbutton text="드롭다운버튼">
        <dropdown-childbutton
          id="btn1"
          text="버튼1"
          @click="${() => {
            console.log('click');
          }}"
        ></dropdown-childbutton>
        <dropdown-childbutton id="btn2" text="버튼2" disabled></dropdown-childbutton>
      </dews-dropdownbutton>
      <dews-button text="disabled" size="small" disabled="true"></dews-button>
      <dews-button type="icon" size="small" icon="tmp-icon"></dews-button>
    </group-item>
    <group-item>
      <dews-button type="icon" size="small" icon="tmp-icon" disabled="true"></dews-button>
      <dews-button type="icon" size="small" icon="tmp-icon" disabled="true"></dews-button>
      <dews-button type="icon-text" text="버튼입니다." size="small" icon="tmp-icon" disabled="true"></dews-button>
    </group-item>
  </dews-button-group>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">icon(button group)</h2>
  <dews-button-group>
    <group-item>
      <dews-button type="icon" icon="ico-set"></dews-button>
      <dews-button type="icon" icon="ico-search"></dews-button>
      <dews-button type="icon" icon="ico-add"></dews-button>
      <dews-button type="icon" icon="ico-delete"></dews-button>
      <dews-button type="icon" icon="ico-save"></dews-button>
      <dews-button type="icon" icon="ico-qr"></dews-button>
    </group-item>
    <group-item>
      <dews-button type="icon" icon="ico-barcode"></dews-button>
      <dews-button type="icon" icon="ico-scan"></dews-button>
      <dews-button type="icon" icon="ico-download"></dews-button>
      <dews-button type="icon" icon="ico-upload"></dews-button>
      <dews-button type="icon" icon="ico-up"></dews-button>
      <dews-button type="icon" icon="ico-down"></dews-button>
    </group-item>
    <group-item>
      <dews-button type="icon" icon="ico-left"></dews-button>
      <dews-button type="icon" icon="ico-right"></dews-button>
      <dews-button type="icon" icon="ico-excel"></dews-button>
      <dews-button type="icon" icon="ico-edit"></dews-button>
      <dews-button type="icon" icon="ico-file"></dews-button>
      <dews-button type="icon" icon="ico-reset"></dews-button>
    </group-item>
    <group-item>
      <dews-button type="icon" icon="ico-language"></dews-button>
      <dews-button type="icon" icon="ico-information"></dews-button>
      <dews-button type="icon" icon="ico-subtraction"></dews-button>
    </group-item>
  </dews-button-group>


  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">Emphasize small(button group)</h2>
  <dews-button-group>
    <dews-button text="emphasize" ui="emphasize" size="small"></dews-button>
    <dews-button text="disabled" ui="emphasize" size="small" disabled="true"></dews-button>
    <dews-button type="icon" ui="emphasize" size="small" icon="tmp-icon"></dews-button>
    <dews-button type="icon" ui="emphasize" size="small" icon="tmp-icon" disabled="true"></dews-button>
    <dews-button type="icon-text" text="버튼입니다." ui="emphasize" size="small" icon="tmp-icon"></dews-button>
    <dews-button
      type="icon-text"
      text="버튼입니다."
      ui="emphasize"
      size="small"
      icon="tmp-icon"
      disabled="true"
    ></dews-button>
  </dews-button-group>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">Solid medium</h2>
  <dews-button text="Solid" size="medium" disabled="true"></dews-button>
  <dews-button text="disabled" size="medium" disabled="true"></dews-button>
  <dews-button type="icon" size="medium" icon="tmp-icon"></dews-button>
  <dews-button type="icon" size="medium" icon="tmp-icon" disabled="true"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." size="medium" icon="tmp-icon"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." size="medium" icon="tmp-icon" disabled="true"></dews-button>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">Emphasize medium</h2>
  <dews-button text="emphasize" ui="emphasize" size="medium"></dews-button>
  <dews-button text="disabled" ui="emphasize" size="medium" disabled="true"></dews-button>
  <dews-button type="icon" ui="emphasize" size="medium" icon="tmp-icon"></dews-button>
  <dews-button type="icon" ui="emphasize" size="medium" icon="tmp-icon" disabled="true"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." ui="emphasize" size="medium" icon="tmp-icon"></dews-button>
  <dews-button
    type="icon-text"
    text="버튼입니다."
    ui="emphasize"
    size="medium"
    icon="tmp-icon"
    disabled="true"
  ></dews-button>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">Solid large</h2>

  <dews-button text="Solid" size="large" disabled="true"></dews-button>
  <dews-button text="disabled" size="large" disabled="true"></dews-button>
  <dews-button type="icon" size="large" icon="tmp-icon"></dews-button>
  <dews-button type="icon" size="large" icon="tmp-icon" disabled="true"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." size="large" icon="tmp-icon"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." size="large" icon="tmp-icon" disabled="true"></dews-button>

  <p style="height: 20px;"></p>
  <h2 style="font-size:15px;">Emphasize large</h2>
  <dews-button text="emphasize" ui="emphasize" size="large"></dews-button>
  <dews-button text="disabled" ui="emphasize" size="large" disabled="true"></dews-button>
  <dews-button type="icon" ui="emphasize" size="large" icon="tmp-icon"></dews-button>
  <dews-button type="icon" ui="emphasize" size="large" icon="tmp-icon" disabled="true"></dews-button>
  <dews-button type="icon-text" text="버튼입니다." ui="emphasize" size="large" icon="tmp-icon"></dews-button>
  <dews-button
    type="icon-text"
    text="버튼입니다."
    ui="emphasize"
    size="large"
    icon="tmp-icon"
    disabled="true"
  ></dews-button>
</div>`;
