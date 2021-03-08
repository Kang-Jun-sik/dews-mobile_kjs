import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Progressbar, ProgressbarOptions } from '../src/components/progressbar/progressbar';

export default {
  title: 'Progressbar'
};

export const Progressbar1 = () => html`<div style="width: 360px">
  <button
    @click="${() => {
      showProgressbar('progress1', {
        total: 5,
        modal: false,
        // textTemplate: '품목을 #=percent# 설정중 입니다',
        textTemplate: '품목을 #=progress# 설정중 입니다'
      });
    }}"
  >
    showProgress
  </button>
  <button
    @click="${() => {
      showProgressbar('progress2', {
        total: 20,
        modal: true,
        // textTemplate: '품목을 #=percent# 설정중 입니다',
        textTemplate: '품목을 #=percent# 설정중 입니다',
        target: document.querySelector('#target1') as HTMLElement
      });
    }}"
  >
    showProgress2
  </button>
  <button
    @click="${() => {
      showProgressbar('progress3', {
        total: 5,
        modal: true,
        titlebar: {
          text: '품목 데이터를 설정중입니다.'
        }
        // textTemplate: '품목을 #=percent# 설정중 입니다',
        // textTemplate: '#=percent# 설정중 입니다',
      });
    }}"
  >
    showProgress3
  </button>
  <button
    @click="${() => {
      showProgressbar('progress4', {
        total: 7,
        modal: true,
        textTemplate: '품목을 #=percent# 설정중 입니다',
        alterTextTemplate: '#=progress#'
      });
    }}"
  >
    showProgress4
  </button>
  <button
    @click="${() => {
      showProgressbar('progress5', {
        total: 7,
        modal: true,
        autoClose: false,
        textTemplate: '품목을 #=percent# 설정중 입니다',
        alterTextTemplate: '#=progress#'
      });
    }}"
  >
    showProgress5
  </button>
  <button
    @click="${() => {
      showProgressbar('progress6', {
        total: 2000000000000,
        modal: true,
        // textTemplate: '품목을 #=percent# 설정중 입니다',
        alterTextTemplate: '#=progress#',
        byte: true
      });
    }}"
  >
    showProgress6
  </button>
  <div id="target1" style="height: 350px; border: 1px solid #ccc; font-size: 12px; overflow: auto">
    target
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    scroll
  </div>
  <div id="target2" style="height: 900px; border: 1px solid #ccc; font-size: 12px; overflow: auto">target</div>
  <!--  <dews-area-panel>-->
  <!--    <area-item coll="8">-->
  <!--      <dews-tabs title="Tab">-->
  <!--        <dews-tab title="Tab1">-->
  <!--          <dews-form-container>-->
  <!--            <container-content>-->
  <!--              <form-section title="기본정보">-->
  <!--                <dews-progressbar> </dews-progressbar>-->
  <!--              </form-section>-->
  <!--            </container-content>-->
  <!--          </dews-form-container>-->
  <!--        </dews-tab>-->
  <!--      </dews-tabs>-->
  <!--    </area-item>-->
  <!--    <area-item coll="4">-->
  <!--      <dews-box title="box2">-->
  <!--        <dews-form-container>-->
  <!--          <container-content>-->
  <!--            <form-section title="추가정보">-->
  <!--              <dews-progressbar> </dews-progressbar>-->
  <!--            </form-section>-->
  <!--          </container-content>-->
  <!--        </dews-form-container>-->
  <!--      </dews-box>-->
  <!--    </area-item>-->
  <!--  </dews-area-panel>-->
</div>`;

function showProgressbar(id: string, options?: ProgressbarOptions) {
  const pb = new Progressbar(id, options);

  // 값을 임의로 증가시켜 프로그래스바가 동작할 수 있게 만들어주는 코드
  if (options && options.byte) {
    for (let current = 0; current <= options.total / 100000000000; current++) {
      setTimeout(
        current => {
          pb.setCurrent(current);
        },
        current * 500,
        current * 100000000000
      );
    }
  } else if (options) {
    for (let current = 0; current < options.total; current++) {
      setTimeout(
        current => {
          pb.setCurrent(current);
        },
        current * 500,
        current + 1
      );
    }
  }
}
