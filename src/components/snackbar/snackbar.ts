import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './snackbar.html';
import scss from './snackbar.scss';
import { property, PropertyValues } from 'lit-element';

type ICON_LIST = 'success' | 'warning' | 'error' | 'info' | 'loading';
export type SNACKBAR_OPTIONS =
  | {
      icon?: ICON_LIST | undefined;
      exposureTime?: number | undefined;
    }
  | ICON_LIST
  | boolean
  | undefined;

export class Snackbar extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  message = '';

  @property({ type: String })
  icon: ICON_LIST = 'success';

  @property({ type: String })
  _className = 'dews-snackbar fadein';

  options: SNACKBAR_OPTIONS = undefined;

  private _icon: ICON_LIST | undefined = 'success';
  private _exposureTime: number | undefined = 2;
  private _showIcon = true;
  private _always: Array<Function> = [];

  render() {
    return template.call(this);
  }

  showSnackBar() {
    if (typeof this.options === 'object') {
      for (const prop in this.options) {
        switch (prop) {
          case 'icon':
            this._icon = this.options[prop];
            break;
          case 'exposureTime':
            this._exposureTime = this.options[prop];
            break;
        }
      }
    } else if (typeof this.options === 'boolean' && !this.options) {
      this._showIcon = false;
    } else if (typeof this.options === 'string') {
      this._icon = this.options;
    }
    this._show();
  }

  done(fn: Function) {
    this._always.push(fn);
    return this;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    let fadeoutTime = 2000;
    let removeTime = 2500;

    if (this._exposureTime !== undefined) {
      fadeoutTime = this._exposureTime * 1000;
      removeTime = (this._exposureTime + 0.5) * 1000;
    }

    // 스낵바가 사라질 때 애니메이션을 주기위한 class 변경
    setTimeout(() => {
      this._className = this._className.replace('fadein', 'fadeout');
    }, fadeoutTime);

    // 스낵바 삭제
    setTimeout(() => {
      const alwaysLength = this._always.length;
      if (alwaysLength > 0) {
        for (let idx = 0; idx < alwaysLength; idx++) {
          this._always[idx].call(this, this);
        }
      }
      this.remove();
    }, removeTime);
  }

  private _show() {
    const body = document.querySelector('body');
    const snack = document.querySelector('dews-snackbar');

    if (snack === null && body !== null) {
      body.append(this);
    }

    if (this._icon !== undefined) {
      this._className += ' ' + this._icon;
    }
  }
}
