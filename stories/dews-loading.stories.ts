import { html } from 'lit-html';
import '../src/dews-mobile.js';
// eslint-disable-next-line import/extensions
import { Loading } from '../src/components/loading/loading';

export default {
  title: 'Loading'
};

export const Loading1 = () => html`<div style="width: 360px">
  <button
    @click="${() => {
      showLoading('Loading');
    }}"
  >
    showLoading 5초
  </button>
  <br />
  <div style="border: 1px solid red; width: 300px; height: 500px;" id="redDiv"></div>
  <button
    @click="${() => {
      showLoading('Loading in red div tag', 'redDiv');
    }}"
  >
    showLoadingInRedDiv
  </button>
  <button
    @click="${() => {
      hideLoading('redDiv');
    }}"
  >
    hideLoadingInRedDiv
  </button>
  <div style="border: 1px solid blue; width: 300px; height: 600px;" id="blueDiv">
    <div style="border: 2px solid yellowgreen; width: 200px; height: 400px;" id="greenDiv"></div>
  </div>
  <button
    @click="${() => {
      showLoading('Loading in blue div tag', 'blueDiv');
    }}"
  >
    showLoadingInBlueDiv
  </button>
  <button
    @click="${() => {
      hideLoading('blueDiv');
    }}"
  >
    hideLoadingInBlueDiv
  </button>
  <br />
  <button
    @click="${() => {
      showLoading('Loading in green div tag', 'greenDiv');
    }}"
  >
    showLoadingInGreenDiv
  </button>
  <button
    @click="${() => {
      hideLoading('greenDiv');
    }}"
  >
    hideLoadingInGreenDiv
  </button>
  <div style="border: 1px solid purple; width: 300px; height: 500px;" id="purpleDiv"></div>
  <button
    @click="${() => {
      showLoading('Loading in purple div tag', 'purpleDiv');
    }}"
  >
    showLoadingInPurpleDiv
  </button>
  <button
    @click="${() => {
      hideLoading('purpleDiv');
    }}"
  >
    hideLoadingInPurpleDiv
  </button>
</div>`;

function showLoading(message: string, target?: string) {
  const loading = new Loading();
  loading.message = message;
  if (target !== undefined) {
    loading.target = target;
  }
  loading.show();
  if (target === undefined) {
    setTimeout(() => {
      loading.hide();
    }, 5000);
  }
}

function hideLoading(target?: string) {
  const loading = new Loading();
  if (target !== undefined) {
    loading.target = target;
  }
  loading.hide();
}
