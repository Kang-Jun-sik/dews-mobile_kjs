import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'NumbericTextbox'
};

export const NumericTextBox = () => html`<style>
  html {
    font-size: 15px;
  }
</style>
  <div style="width: 360px">
     <span> 기본</span>
    <dews-numerictextbox

  console.log(e);
  console.log('change');
}}"
      @focus="${(e: Event) => {
        console.log(e);
        console.log('focus');
      }}"
    >
      <numericbox-button step="500"></numericbox-button>
    </dews-numerictextbox>

    <span> format="#,##0.0000" max-length="16,3"</span>
    <dews-numerictextbox
      id="nmtb"
      required
      format="#,##0.####"
      max-length="16,3"
      @change="${(e: Event) => {
        console.log(e);
        console.log('change');
      }}"
      @focus="${(e: Event) => {
        console.log(e);
        console.log('focus');
      }}"
    >
      <numericbox-button step="5"></numericbox-button>
    </dews-numerictextbox>

    <span> decimals="10"</span>
    <dews-numerictextbox
      required
      decimals="10"
      @change="${(e: Event) => {
        console.log(e);
        console.log('change');
      }}"
      @focus="${(e: Event) => {
        console.log(e);
        console.log('focus');
      }}"
    >
      <numericbox-button step="500"></numericbox-button>
    </dews-numerictextbox>

    <dews-numerictextbox disabled title="title" prefix="$" suffix="백만원">
    <numericbox-button step="5"></numericbox-button>
    </dews-numerictextbox>
    <dews-numerictextbox readonly value="5" title="value=5" prefix="$" suffix="백만원"> </dews-numerictextbox>
  </div>
`;
