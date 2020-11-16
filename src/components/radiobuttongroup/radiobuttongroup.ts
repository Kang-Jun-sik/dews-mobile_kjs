import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { html, property, TemplateResult } from 'lit-element';

import _html from './radiobuttongroup.html';
import _scss from './radiobuttongroup.scss';

export class Radiobuttongroup extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = 'title';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: String })
  align: 'horizontal' | 'vertical' = 'horizontal';

  private $_radioButtonListTemp: Array<TemplateResult> = [];
  private _radioButton: TemplateResult;

  connectedCallback() {
    super.connectedCallback();
    this._radioButtonView();
  }

  private _radioButtonView() {
    const $el = this.children;
    const $checkedList: Array<Element> = [];
    for (let i = 0; i < $el.length; i++) {
      if (this.disabled) {
        $el.item(i).setAttribute('disabled', 'disabled');
      }
      if ($el.item(i).hasAttribute('checked')) {
        $checkedList.push($el.item(i));
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

  private _radioCheckedChange(e) {
    const $el = this.shadowRoot.querySelectorAll('dews-radiobutton');
    if (e.target.localName == 'dews-radiobutton') {
      for (let i = 0; i < $el.length; i++) {
        if ($el.item(i) !== e.target && !e.target.hasAttribute('disabled')) {
          $el.item(i).removeAttribute('checked');
        }
      }
    }
  }

  private _clickHandler(e) {
    this._radioCheckedChange(e);
  }

  render() {
    return _html.bind(this)();
  }
}
