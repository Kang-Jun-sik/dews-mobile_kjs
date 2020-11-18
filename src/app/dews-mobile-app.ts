import { customElement, html, LitElement } from 'lit-element';
import { autoWired } from '../core/di/exports.js';
import { MyDependency } from './ApplicationContext.js';
import { ApplicationMainInterface } from './ApplicationMainInterface.js';

@customElement('dews-mobile-app')
export class DewsMobileApp extends LitElement implements ApplicationMainInterface {
  constructor() {
    super();
  }

  @autoWired dependency!: MyDependency;

  get appVersion(): string {
    return '1.0.0';
  }

  protected render(): unknown {
    return html`<h1>Main App</h1>`;
  }
}
