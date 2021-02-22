import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

import template from './radiobutton-group.html';
import scss from './radiobutton-group.scss';
import { Radiobutton } from '../radiobutton/radiobutton.js';

export class RadiobuttonGroup extends DewsFormComponent {
  static styles = scss;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String, reflect: true })
  value = '';

  @internalProperty()
  private $_radioButtonListTemp: Array<TemplateResult> = [];

  @internalProperty()
  private _radioButton: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._radioButtonView();
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    _changedProperties.forEach((oldValue, propName) => {
      const $el = this.shadowRoot!.querySelectorAll('dews-radiobutton');

      if (propName === 'value') {
        for (let i = 0; i < $el.length; i++) {
          const radio = $el.item(i) as Radiobutton;
          radio.checked = false;
          if (radio.value && this.value === radio.value) {
            radio.checked = true;
          }
        }
      }
    });
  }

  private _radioButtonView() {
    const $el: HTMLCollection = this.children;
    const $checkedList: Array<Element> = [];
    for (let i = 0; i < $el.length; i++) {
      if (this.disabled) {
        $el.item(i)?.setAttribute('disabled', 'disabled');
      }
      if ($el.item(i)?.hasAttribute('checked')) {
        $checkedList.push($el.item(i)!);
        this.value = ($el.item(i) as Radiobutton).value;
      }
    }
    if ($checkedList.length >= 2) {
      for (let j = 1; j < $checkedList.length; j++) {
        $checkedList[j].removeAttribute('checked');
      }
    }

    this.querySelectorAll('dews-radiobutton').forEach(checkBox => {
      this.$_radioButtonListTemp.push(html`<span class="group-item">${checkBox}</span>`);
    });
    if (this.align === 'vertical') {
      this._radioButton = html`<div class="radio-group vertical">${this.$_radioButtonListTemp}</div>`;
    } else {
      this._radioButton = html`<div class="radio-group">${this.$_radioButtonListTemp}</div>`;
    }
  }

  private _radioCheckedChange(e: MouseEvent) {
    const $el = this.shadowRoot!.querySelectorAll('dews-radiobutton');
    if ((e.target as HTMLElement).localName == 'dews-radiobutton') {
      for (let i = 0; i < $el.length; i++) {
        const radio: Radiobutton = $el.item(i) as Radiobutton;
        if ($el.item(i) !== e.target && !(e.target as HTMLElement).hasAttribute('disabled')) {
          $el.item(i).removeAttribute('checked');
        }
        if (radio.checked) {
          this.value = radio.value;
        }
      }
    }
  }

  private _clickHandler(e: MouseEvent) {
    this._radioCheckedChange(e);
  }

  render() {
    return template.call(this);
  }
}
