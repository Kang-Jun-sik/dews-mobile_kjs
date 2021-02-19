import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import template from './listcontainer.html';
import scss from './listcontainer.scss';

export class ListContainer extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String })
  title = '';

  @internalProperty()
  private _buttonList: Array<TemplateResult> = [];

  private _contentList: Array<TemplateResult> = [];

  private _summaryList: Array<TemplateResult> = [];

  private _contentView() {
    const contentChildLength = this.querySelector('container-content')?.childElementCount;
    const contentChildItem = this.querySelector('container-content')?.children;
    if (contentChildLength! <= 0 || contentChildItem == undefined) {
      return;
    }
    for (let i = 0; i < contentChildLength!; i++) {
      this._contentList.push(html`${contentChildItem.item(i)}`);
    }
    // this.querySelector('container-content').remove();
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

  private _summaryView() {
    const summaryChildLength = this.querySelector('containersummary')?.childElementCount;
    const summaryChildItem = this.querySelector('containersummary')?.children;
    const _summaryItem: Array<TemplateResult> = [];

    if (summaryChildLength! <= 0 || summaryChildItem == undefined) {
      return;
    }

    for (let i = 0; i < summaryChildLength!; i++) {
      _summaryItem.push(html`${summaryChildItem.item(i)}`);
    }
    this._summaryList.push(html`
      <div class="option-summary">
        <div class="summary-contents">${_summaryItem}</div>
      </div>
    `);

    // this.querySelector('containersummary').remove();
  }

  connectedCallback() {
    super.connectedCallback();
    this._customButtonView();
    this._summaryView();
    this._contentView();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // private _slotChange(e: Event) {
  //   for (let i = 0; i < this.children.length; i++) {
  //     if (
  //       this.children.item(i)?.tagName === 'CONTAINER-BUTTON' ||
  //       this.children.item(i)?.tagName === 'CONTAINER-SUMMARY'
  //     ) {
  //       this.shadowRoot
  //         ?.querySelector('.dews-container-option-control')
  //         ?.appendChild(this.children.item(i) as HTMLElement);
  //     } else if (this.children.item(i)?.tagName === 'CONTAINER-CONTENT') {
  //       // const li = document.createElement('li');
  //       this.shadowRoot?.querySelector('.list-field')?.appendChild(this.children.item(i) as HTMLElement);
  //     }
  //   }
  // }

  render() {
    return template.call(this);
  }
}
