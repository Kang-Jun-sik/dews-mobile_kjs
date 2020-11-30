import { customElement, html, LitElement } from 'lit-element';
import { ApplicationMainInterface } from './ApplicationMainInterface.js';

@customElement('dews-mobile-app')
export class DewsMobileApp extends LitElement implements ApplicationMainInterface {
  constructor() {
    super();
  }

  get appVersion(): string {
    return '1.0.0';
  }

  protected render(): unknown {
    return html`<h1>Main App</h1>`;
  }
}
