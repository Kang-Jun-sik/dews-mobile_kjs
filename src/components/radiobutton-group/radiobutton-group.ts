import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './radiobutton-group.html';
import scss from './radiobutton-group.scss';

export class RadiobuttonGroup extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = 'title';

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  @internalProperty()
  private $_radioButtonListTemp: Array<TemplateResult> = [];

  @internalProperty()
  private _radioButton: TemplateResult | undefined;

  connectedCallback() {
    super.connectedCallback();
    this._radioButtonView();
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
        if ($el.item(i) !== e.target && !(e.target as HTMLElement).hasAttribute('disabled')) {
          $el.item(i).removeAttribute('checked');
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
