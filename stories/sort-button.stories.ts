import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'SortButton'
};

export const SortButton = () => html`
  <div style="width: 360px">
    <sort-button>
      <sort-item></sort-item>
      <sort-item></sort-item>
      <sort-item></sort-item>
    </sort-button>
  </div>
`;
