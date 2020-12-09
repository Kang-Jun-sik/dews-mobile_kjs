import { property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './button.html';
import scss from './button.scss';

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

export class Button extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  text = '';

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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private _clickHandler() {
    // 클릭이벤트 핸들러
  }

  render() {
    return template.call(this);
  }
}
