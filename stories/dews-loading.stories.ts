import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Loading, LoadingOptions } from '../src/components/loading/loading';

export default {
  title: 'Loading'
};

export const Loading1 = () => html`<style>
    html {
      font-size: 15px;
    }
  </style>
  <div style="width: 360px">
    <button
      @click="${() => {
        showLoading({ message: 'Loading' });
      }}"
    >
      showLoading 5초
    </button>
    <br />
    <div style="border: 1px solid red; width: 300px; height: 500px;" id="redDiv"></div>
    <button
      @click="${() => {
        showLoading({
          message: 'Loading in red div tag',
          target: document.querySelector('#redDiv') as HTMLElement
        });
      }}"
    >
      showLoadingInRedDiv
    </button>
    <div style="border: 1px solid blue; width: 300px; height: 600px;" id="blueDiv">
      <div style="border: 2px solid yellowgreen; width: 200px; height: 400px;" id="greenDiv"></div>
    </div>
    <button
      @click="${() => {
        showLoading({ message: 'Loading in blue div tag', target: document.querySelector('#blueDiv') as HTMLElement });
      }}"
    >
      showLoadingInBlueDiv
    </button>
    <br />
    <button
      @click="${() => {
        showLoading({
          message: 'Loading in green div tag',
          target: document.querySelector('#greenDiv') as HTMLElement
        });
      }}"
    >
      showLoadingInGreenDiv
    </button>
    <div style="border: 1px solid purple; width: 300px; height: 500px;" id="purpleDiv"></div>
    <button
      @click="${() => {
        showLoading({
          message: 'Loading in purple div tag',
          target: document.querySelector('#purpleDiv') as HTMLElement
        });
      }}"
    >
      showLoadingInPurpleDiv
    </button>
  </div>`;

function showLoading(options: LoadingOptions) {
  const loading = new Loading({
    ...options
  });
  loading.show();
  setTimeout(() => {
    loading.hide();
  }, 5000);
}
