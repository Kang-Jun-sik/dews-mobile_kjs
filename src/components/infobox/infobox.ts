import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './infobox.html';
import scss from './infobox.scss';

export class InfoboxContainer extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String, attribute: 'info-type' })
  type: 'warning' | 'care' | 'basic' = 'basic';

  @internalProperty()
  $value: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();
    const item: Array<TemplateResult> = [];
    if (this.type === 'basic') {
      for (let i = 0; i < this.childNodes.length; i++) {
        item.push(html`${this.childNodes.item(i)}`);
      }
    } else {
      for (let i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes.item(i).nodeName === 'INFO-CARE' || this.childNodes.item(i).nodeName === 'INFO-WARNING') {
          item.push(html`${(this.childNodes.item(i) as HTMLElement)?.innerText}`);
        } else {
          item.push(html`${this.childNodes.item(i)}`);
        }
      }
    }
    this.$value = html`${item}`;
  }

  firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const $el = this.shadowRoot?.querySelector('.dews-container-infobox')!;
    if (this.type === 'warning') {
      $el.classList.add('warning');
    } else if (this.type === 'care') {
      $el.classList.add('care');
    }
  }

  render() {
    return template.call(this);
  }
}
