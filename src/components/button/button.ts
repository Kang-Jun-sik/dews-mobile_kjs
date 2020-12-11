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
  'default' = '',
  'ico-set' = 'ico-set',
  'ico-search' = 'ico-search',
  'ico-add' = 'ico-add',
  'ico-delete' = 'ico-delete',
  'ico-save' = 'ico-save',
  'ico-qr' = 'ico-qr',
  'ico-barcode' = 'ico-barcode',
  'ico-scan' = 'ico-scan',
  'ico-download' = 'ico-download',
  'ico-upload' = 'ico-upload',
  'ico-up' = 'ico-up',
  'ico-down' = 'ico-down',
  'ico-left' = 'ico-left',
  'ico-right' = 'ico-right',
  'ico-excel' = 'ico-excel',
  'ico-edit' = 'ico-edit',
  'ico-file' = 'ico-file',
  'ico-reset' = 'ico-reset',
  'ico-language' = 'ico-language',
  'ico-information' = 'ico-information',
  'ico-subtraction' = 'ico-subtraction'
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
  icon: ICON_LIST = ICON_LIST.default;

  @property({ type: String })
  link: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  group = false; //버튼 그룹 내부

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
