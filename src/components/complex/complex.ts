import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './complex.html';
import scss from './complex.scss';
import { html, property, TemplateResult } from 'lit-element';

export class Complex extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  private components: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();
    this.querySelectorAll('*').forEach(component => {
      this.components.push(html`${component}`);
    });
  }

  render() {
    return template.call(this);
  }
}
