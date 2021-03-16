import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Snackbar } from '../src/components/snackbar/snackbar';

export default {
  title: 'Snackbar'
};

export const Snackbar1 = () => html` <style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('승인신청이 접수되었습니다.').done(() => {
            console.log('승인 done');
          });
        }}"
      >
        승인
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('저장되었습니다.', false).done(() => {
            console.log('아이콘 미출력 done');
          });
        }}"
      >
        아이콘 미출력
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('대기중인 업데이트 정보가 있습니다.', 'info').done(() => {
            console.log('정보1 done');
          });
        }}"
      >
        정보1
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('준비중입니다.', { icon: 'info' }).done(() => {
            console.log('정보2 done');
          });
        }}"
      >
        정보2
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('잘못 입력하셨습니다.', 'warning').done(() => {
            console.log('경고 done');
          });
        }}"
      >
        경고
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('조건에 해당하는 데이터가 없습니다.', { icon: 'warning', exposureTime: 5 }).done(() => {
            console.log('경고 5초 done');
          });
        }}"
      >
        경고 5초
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('치명적인 버그가 발생했습니다.', 'error').done(() => {
            console.log('에러 done');
          });
        }}"
      >
        에러
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('작업이 처리되지 않았습니다.', { icon: 'error', exposureTime: 7 }).done(() => {
            console.log('에러 7초 done');
          });
        }}"
      >
        에러 7초
      </button>
    </p>
    <p style="height: 200px;">
      <button
        @click="${() => {
          new Snackbar('다운로드를 준비하고 있습니다.', 'loading').done(() => {
            console.log('로딩 done');
          });
        }}"
      >
        로딩
      </button>
    </p>
  </div>`;
