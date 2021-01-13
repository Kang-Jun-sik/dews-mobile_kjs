import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, property, TemplateResult } from 'lit-element';

import template from './formcontainer.html';
import scss from './formcontainer.scss';

export class FormContainer extends DewsLayoutComponent {
  static styles = scss;

  constructor() {
    super();
    this._contentView();
    this._buttonView();
    this._customButtonView();
  }

  @property({ type: String })
  title = '';

  private _buttonList: Array<TemplateResult> = [];

  private _iconList: Array<TemplateResult> = [];

  private _contentList: Array<TemplateResult> = [];

  private _setClick() {
    console.log('set_click');
  }

  private _resetClick() {
    console.log('reset_click');
  }

  private _captureClick() {
    console.log('capture_click');
  }

  private _contentView() {
    const contentChildLength = this.querySelector('container-content')?.childElementCount;
    const contentChildItem = this.querySelector('container-content')?.children;
    if (this.querySelectorAll('form-section').length <= 0) {
      console.error('form-section 이 없습니다.');
      return;
    }
    if (contentChildLength! <= 0 || contentChildItem == undefined) {
      return;
    }
    for (let i = 0; i < contentChildLength!; i++) {
      this._contentList.push(html`${contentChildItem.item(i)}`);
    }
    // this.querySelector('container-content').remove();
  }

  private _buttonView() {
    const setState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-set');
    const captureState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-capture');
    const resetState: boolean | undefined = this.querySelector('container-button')?.hasAttribute('data-reset');

    if (setState) {
      this._iconList.push(
        html`<li class="data-set">
          <button class="set" @click="${this._setClick}"><span>Data Set</span></button>
        </li>`
      );
    }
    if (captureState) {
      this._iconList.push(
        html`<li class="data-capture">
          <button class="capture" @click="${this._captureClick}"><span> Data Capture</span></button>
        </li>`
      );
    }
    if (resetState) {
      this._iconList.push(
        html`<li class="data-reset">
          <button class="reset" @click="${this._resetClick}"><span>Data Reset</span></button>
        </li>`
      );
    }
  }

  private _customButtonView() {
    const buttonChildLength = this.querySelector('container-button')?.childElementCount;
    const buttonChildItem = this.querySelector('container-button')?.children;
    if (buttonChildLength! <= 0 || buttonChildItem == undefined) {
      return;
    }

    const _customButtonList: Array<TemplateResult> = [];
    for (let i = 0; i < buttonChildLength!; i++) {
      _customButtonList.push(html`<li>${buttonChildItem.item(i)}</li>`);
    }
    this._buttonList.push(
      html`
        <div class="option-custom-button">
          <ul>
            ${_customButtonList}
          </ul>
        </div>
      `
    );
    // this.querySelector('container-button').remove();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return template.call(this);
  }
}
