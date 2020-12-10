import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './loading.html';
import scss from './loading.scss';
import { property } from 'lit-element';

export class Loading extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  message = 'Loading...';

  @property({ type: String })
  target = 'page';

  private _className = 'dews-loading';

  render() {
    return template.call(this);
  }

  show() {
    const body = document.querySelector('body');
    if (body !== null) {
      if (this.target === 'page') {
        this._className += ' page';
        body.append(this);
      } else {
        const targetElement = body.querySelector('#' + this.target);
        if (targetElement !== null) {
          this._className += ' field';
          targetElement.append(this);
        }
      }
    }
  }

  hide() {
    this.remove();
  }
}
