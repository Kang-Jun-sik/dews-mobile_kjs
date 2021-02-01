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
        const targetElement = body.querySelector<HTMLElement>('#' + this.target);
        if (targetElement !== null) {
          targetElement.style.position = 'relative';
          this._className += ' field';
          targetElement.append(this);
        }
      }
    }
  }

  hide() {
    let loading;
    if (this.target === 'page') {
      loading = document.querySelector('body>dews-loading');
    } else {
      const body = document.querySelector('body');
      if (body !== null) {
        loading = body.querySelector('#' + this.target + '>dews-loading');
      }
    }

    if (loading !== null && loading !== undefined) {
      loading.remove();
    }
  }

  // 로딩 출력 후 오버레이 영역의 터치 스크롤링을 막음
  private _onTouchmove(e: TouchEvent) {
    e.preventDefault();
  }

  // 로딩 출력 후 오버레이 영역의 스크롤링을 막음
  private _onWheel(e: Event) {
    e.preventDefault();
  }
}
