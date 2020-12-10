import { html, property, query, TemplateResult } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './dropdownbutton.html';
import scss from './dropdownbutton.scss';

export enum TYPE_LIST {
  'text' = 'text',
  'icon' = 'icon',
  'icon-text' = 'iconText'
}

export enum SIZE_LIST {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large'
}

export enum ICON_LIST {
  'reset' = 'reset'
}

export enum UI_LIST {
  'solid' = 'solid',
  'emphasize' = 'emphasize'
}

export class Dropdownbutton extends DewsFormComponent {
  static styles = scss;

  @query('.button-list')
  private buttonList: HTMLElement | undefined;

  private buttons: Array<TemplateResult> = [];

  @property({ type: String })
  text = '';

  @property({ type: String })
  group = '';

  @property({ type: String })
  ui = UI_LIST.solid;

  @property({ type: String })
  type: TYPE_LIST = TYPE_LIST.text;

  @property({ type: String })
  size: SIZE_LIST = SIZE_LIST.medium;

  @property({ type: String })
  icon: ICON_LIST | undefined;

  @property({ type: String })
  link: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  _selected = false;

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dropdown-childbutton').forEach(btn => {
      this.buttons.push(html`${btn}`);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
        window.addEventListener('click', this.documentClick.bind(this, event));
      }
    }
  }

  private documentClick() {
    this._selected = false;
    window.removeEventListener('click', this.documentClick.bind(this));
  }

  render() {
    return template.call(this);
  }
}
