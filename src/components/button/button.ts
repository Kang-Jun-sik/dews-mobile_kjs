import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './button.html';
import scss from './button.scss';

export enum TYPE_LIST {
  'default' = 'default',
  'text' = 'text',
  'icon' = 'icon'
}

export enum SIZE_LIST {
  'default' = 'default',
  'small' = 'small',
  'large' = 'large'
}

export enum ICON_LIST {
  'reset' = 'reset'
}

// noinspection JSUnusedLocalSymbols
export class Button extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  title = 'title';

  @property({ type: String })
  type: TYPE_LIST = TYPE_LIST.default;

  @property({ type: String })
  size: SIZE_LIST = SIZE_LIST.default;

  @property({ type: String })
  icon: ICON_LIST | undefined;

  @property({ type: String })
  link: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  connectedCallback() {
    super.connectedCallback();
    // this.addEventListener('focus', this._focusChanging);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // this.removeEventListener('focus', this._focusChanging);
  }

  private _clickHandler() {
    // 클릭이벤트 핸들러
  }

  render() {
    return template.call(this);
  }
}
