import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { html, property, TemplateResult } from 'lit-element';

import _html from './checkboxgroup.html';
import _scss from './checkboxgroup.scss';

export class Checkboxgroup extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = 'title';

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  private $_checkBoxListTemp: Array<TemplateResult> = [];
  private _checkBox: TemplateResult;

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
    return _html.bind(this)();
  }
}
