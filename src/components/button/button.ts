import { property } from 'lit-element';
import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';

import _html from './button.html';
import _scss from './button.scss';

export enum TYPE_LIST {
  'default' = 'default',
  'text' = 'text',
  'icon' = 'icon',
}

export enum SIZE_LIST {
  'default' = 'default',
  'small' = 'small',
  'large' = 'large',
}

export enum ICON_LIST {
  'reset' = 'reset',
}

export class Button extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = 'title';

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

  private _clickHandler() {}

  render() {
    return _html.bind(this)();
  }
}
