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
    showLoading
  </button>
  <div style="border: 1px solid red; width: 300px; height: 300px;" id="test">
    <button
      @click="${() => {
        showLoading('Loading', 'test');
      }}"
    >
      showLoading
    </button>
  </div>
</div>`;

function showLoading(message: string, target?: string) {
  const loading = new Loading();
  loading.message = message;
  if (target !== undefined) {
    loading.target = target;
  }
  loading.show();
  // setTimeout(() => {
  //   loading.hide();
  // }, 10000);
}
