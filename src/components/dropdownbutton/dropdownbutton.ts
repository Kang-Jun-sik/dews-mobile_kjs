import { html, property, query, TemplateResult } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './dropdownbutton.html';
import scss from './dropdownbutton.scss';

export enum SIZE_LIST {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large'
}

export enum UI_LIST {
  'solid' = 'solid',
  'emphasize' = 'emphasize'
}

export class Dropdownbutton extends DewsFormComponent {
  static styles = scss;

  @query('.button-list')
  private buttonList: HTMLElement | undefined;

  private childButtons: Array<TemplateResult> = [];

  // 드롭다운 버튼 내부 버튼
  public buttons: Element[] = [];

  @property({ type: String })
  text = '';

  @property({ type: String })
  ui = UI_LIST.solid;

  @property({ type: String })
  size: SIZE_LIST = SIZE_LIST.medium;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  group = ''; // 버튼그룹 내부

  @property({ type: Boolean, reflect: true })
  _selected = false;

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dropdown-childbutton').forEach(btn => {
      this.buttons.push(btn);
      this.childButtons.push(html`${btn}`);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return template.call(this);
  }

  private _clickHandler(e: Event) {
    e.stopPropagation();

    if (!this.disabled) {
      if (this._selected) {
        // 닫기
        this._selected = false;
      } else {
        // 열기
        this._selected = true;
        window.addEventListener('click', this.documentClick.bind(this), true);
      }
    }
  }

  private documentClick() {
    this._selected = false;
    window.removeEventListener('click', this.documentClick.bind(this));
  }

  /**
   *  ID를 이용하여 내부 버튼을 가져옵니다.
   * @param id
   */
  public getById(id: string) {
    for (let i = 0; this.buttons.length; i++) {
      if (this.buttons[i].getAttribute('id') === id) {
        return this.buttons[i];
      }
    }
    return null;
  }
}
