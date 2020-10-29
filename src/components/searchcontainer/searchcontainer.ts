import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { html, internalProperty, property } from 'lit-element';

import _html from './searchcontainer.html';
import _scss from './searchcontainer.scss';

export class SearchContainer extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string | undefined;

  @property({ type: Number, reflect: true })
  col: number = 1;

  private _iconList: Array<any> = [];

  private _contentList: Array<any> = [];

  private _setClick() {
    /*
     * set 버튼 클릭시 처리
     * */
  }

  private _resetClick() {
    /*
     * reset 버튼 클릭시 처리
     * */
  }

  private _captureClick() {
    console.log(this.shadowRoot);
    /*
     * capture 버튼 클릭시 처리
     * */
  }

  private _contentView() {
    const contentChildLength = this.querySelector('container-content')?.childElementCount;
    const contentChildItem = this.querySelector('container-content')?.children;
    if (contentChildLength <= 0 || contentChildItem == undefined) {
      return;
    }
    for (let i = 0; i < contentChildLength; i++) {
      this._contentList.push(html`<li>${contentChildItem.item(i)}</li>`);
    }
    this.querySelector('container-content').remove();
  }

  private _buttonView() {
    const setState: boolean = this.querySelector('container-button')?.hasAttribute('data-set');
    const captureState: boolean = this.querySelector('container-button')?.hasAttribute('data-capture');
    const resetState: boolean = this.querySelector('container-button')?.hasAttribute('data-reset');

    if (setState) {
      this._iconList.push(
        html`<li class="data-set">
          <button class="set" @click="${this._setClick}"><span>Data Set</span></button>
        </li>`,
      );
    }
    if (captureState) {
      this._iconList.push(
        html`<li class="data-capture">
          <button class="capture" @click="${this._captureClick}"><span>Data Capture</span></button>
        </li>`,
      );
    }
    if (resetState) {
      this._iconList.push(
        html`<li class="data-reset">
          <button class="reset" @click="${this._resetClick}"><span>Data Reset</span></button>
        </li>`,
      );
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._contentView();
    this._buttonView();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return _html.bind(this)();
  }
}
