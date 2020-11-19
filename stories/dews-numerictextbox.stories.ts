import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'NumbericTextbox'
};

export const NumericTextBox = () => html`
  <div style="width: 360px">
    <dews-numerictextbox format="#,##0.000">
      <numericbox-button step="500"></numericbox-button>
    </dews-numerictextbox>
    <dews-numerictextbox disabled title="title" prefix="$" suffix="백만원"> </dews-numerictextbox>
  </div>
`;
