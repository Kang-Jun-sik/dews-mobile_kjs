import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, property, TemplateResult } from 'lit-element';

import template from './checkbox-group.html';
import scss from './checkbox-group.scss';

// noinspection JSUnusedLocalSymbols
export class CheckboxGroup extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = 'title';

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  private $_checkBoxListTemp: Array<TemplateResult> = [];
  private _checkBox: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dews-checkbox').forEach(checkBox => {
      this.$_checkBoxListTemp.push(html`<span class="group-item">${checkBox}</span>`);
    });
    if (this.align === 'vertical') {
      this._checkBox = html`<div class="checkbox-group vertical">${this.$_checkBoxListTemp}</div>`;
    } else {
      this._checkBox = html`<div class="checkbox-group">${this.$_checkBoxListTemp}</div>`;
    }
  }

  render() {
    return template.call(this);
  }
}
