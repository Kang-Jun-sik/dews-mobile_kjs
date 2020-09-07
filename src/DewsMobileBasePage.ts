import { html, css, LitElement, property, customElement } from 'lit-element';
import DewsMobile from './DewsMobile.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import('http://localhost:8000/dist/src/CustomPage.js').then(e => {
  console.log('커스텀페이지 로드');
  new e.default();
});

/**
 * OpenWC Default Element
 */
@customElement('page-base')
export default class DewsMobileBasePage extends DewsMobile {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--dews-mobile-text-color, #000);
    }
  `;

  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

  render() {
    return html` <custom-page></custom-page> `;
  }
}
