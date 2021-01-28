import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './containersummary.html';
import scss from './containersummary.scss';

export class Containersummary extends DewsLayoutComponent {
  static styles = scss;

  render() {
    return this.parentElement?.tagName === 'DEWS-LIST-CONTAINER' ? template.call(this) : null;
  }
}
