import { html, css, property, customElement, PropertyValues, eventOptions } from 'lit-element';
import DewsMobileBasePage from './DewsMobileBasePage.js';

@customElement('custom-page')
export default class CustomPage extends DewsMobileBasePage {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--dews-mobile-text-color, #000);
    }
  `;
  constructor() {
    super();
  }
  opened = true;

  __Click() {
    console.log('click');
    this.opened = !this.opened;
  }

  render() {
    return html`
      <form-container opened="true" title="1234" Click="${this.__Click()}">
        <form-section></form-section>
      </form-container>
    `;
  }
}
