import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './checkbox-group.html';
import scss from './checkbox-group.scss';
import { Checkbox } from '../checkbox/checkbox.js';

// noinspection JSUnusedLocalSymbols
export class CheckboxGroup extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = 'title';

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Array })
  value: string[] = [];

  private $_checkBoxListTemp: Array<TemplateResult> = [];
  private _checkBox: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dews-checkbox').forEach(checkBox => {
      const _checkBox: Checkbox = checkBox as Checkbox;
      this.$_checkBoxListTemp.push(html`<span class="group-item">${checkBox}</span>`);
      if (_checkBox.checked) {
        this.value.push(_checkBox.value);
      }
    });
    if (this.align === 'vertical') {
      this._checkBox = html`<div class="checkbox-group vertical">${this.$_checkBoxListTemp}</div>`;
    } else {
      this._checkBox = html`<div class="checkbox-group">${this.$_checkBoxListTemp}</div>`;
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    _changedProperties.forEach((oldValue, propName) => {
      const $el = this.shadowRoot!.querySelectorAll('dews-checkbox');

      if (propName === 'value') {
        for (let i = 0; i < $el.length; i++) {
          const checkbox = $el.item(i) as Checkbox;
          checkbox.checked = false;

          for (let j = 0; j < this.value.length; j++) {
            if (this.value[j] === checkbox.value) {
              checkbox.checked = true;
            }
          }
        }
      }
    });
  }

  private _clickHandler(e: MouseEvent) {
    this._checkedChange(e);
  }

  private _checkedChange(e: MouseEvent) {
    const $el = this.shadowRoot!.querySelectorAll('dews-checkbox');
    this.value = [];
    if ((e.target as HTMLElement).localName == 'dews-checkbox') {
      for (let i = 0; i < $el.length; i++) {
        const check: Checkbox = $el.item(i) as Checkbox;

        if (check.checked) {
          this.value.push(check.value);
        }
      }
    }
  }

  render() {
    return template.call(this);
  }
}
