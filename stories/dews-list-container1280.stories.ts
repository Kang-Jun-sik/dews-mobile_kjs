import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'ListContainer'
};

export const ListContainer1280 = () => html`<div style="width: 1280px">
  <dews-box title="box">
    <dews-list-container title="title#12">
      <container-button>
        <dews-button title="Btn" text="확정"></dews-button>
        <dews-button text="확정취소"></dews-button>
        <dews-dropdownbutton id="ddbtn1" text="드롭다운버튼" size="small">
          <dropdown-childbutton
            id="btn1"
            text="버튼1"
            @click="${() => {
              console.log('click');
            }}"
          ></dropdown-childbutton>
          <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
        </dews-dropdownbutton>
        <dews-button text="종결"></dews-button>
        <dews-dropdownbutton id="ddbtn1" text="종결취소">
          <dropdown-childbutton
            id="btn1"
            text="버튼1"
            @click="${() => {
              console.log('click');
            }}"
          ></dropdown-childbutton>
          <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
        </dews-dropdownbutton>
        <dews-button title="Btn" text="확정"></dews-button>
        <dews-button text="확정취소"></dews-button>
        <dews-button text="종결"></dews-button>
        <dews-button text="종결취소"></dews-button>
      </container-button>

      <container-summary>
        <span>요약 내용영역</span>
      </container-summary>

      <container-content>
        <dews-cardlist></dews-cardlist>
      </container-content>
    </dews-list-container>
  </dews-box>
  <dews-tabs>
    <dews-tab title="default">
      <dews-list-container title="title#12">
        <container-button>
          <dews-button title="Btn" text="확정"></dews-button>
          <dews-button text="확정취소"></dews-button>
          <dews-dropdownbutton id="ddbtn1" text="드롭다운버튼" size="small">
            <dropdown-childbutton
              id="btn1"
              text="버튼1"
              @click="${() => {
                console.log('click');
              }}"
            ></dropdown-childbutton>
            <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
          </dews-dropdownbutton>
          <dews-button text="종결"></dews-button>
          <dews-dropdownbutton id="ddbtn1" text="종결취소">
            <dropdown-childbutton
              id="btn1"
              text="버튼1"
              @click="${() => {
                console.log('click');
              }}"
            ></dropdown-childbutton>
            <dropdown-childbutton id="btn2" text="비활성화버튼" disabled="true"></dropdown-childbutton>
          </dews-dropdownbutton>
          <dews-button title="Btn" text="확정"></dews-button>
          <dews-button text="확정취소"></dews-button>
          <dews-button text="종결"></dews-button>
          <dews-button text="종결취소"></dews-button>
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
</div>`;
