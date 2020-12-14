import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Complex'
};

export const Complex = () => html`
  <div style="width: 360px">
    <dews-complex-component title="타이틀">
      <dews-textbox value="Complex"></dews-textbox>
      <dews-button text="확인"></dews-button>
    </dews-complex-component>
  </div>
`;
