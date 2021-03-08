import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './loading.html';
import scss from './loading.scss';
import { internalProperty } from 'lit-element';

export interface LoadingOptions {
  target?: HTMLElement | null;
  message?: string;
}

export class Loading extends DewsFormComponent {
  static styles = scss;

  constructor(option?: LoadingOptions) {
    super();
    this.target = option?.target;
    this.message = option?.message;
  }

  @internalProperty()
  message: string | undefined = 'Loading...';

  target: HTMLElement | undefined | null;

  private _className = 'dews-loading';

  render() {
    return template.call(this);
  }

  // 로딩 띄우기
  show() {
    const body = document.querySelector('body');
    if (body !== null) {
      if (!this.target) {
        this._className += ' page';
        body.append(this);
      } else {
        const targetElement = this.target;
        if (targetElement !== null) {
          targetElement.style.position = 'relative';
          this._className += ' field';
          targetElement.append(this);
        }
      }
    }
  }

  // 로딩 없애기
  hide() {
    let loading;
    if (!this.target) {
      loading = document.querySelector('body>dews-loading');
    } else {
      // 타겟에서 띄운 로딩을 찾아서 지우기 위한 코드
      const childrenList = this.target?.children;
      for (let i = 0; i < childrenList?.length; i++) {
        if (childrenList[i].tagName === 'DEWS-LOADING') {
          loading = childrenList[i];
          break;
        }
        const body = document.querySelector('body');
        if (body !== null) {
          // loading = body.querySelector('#' + this.target + '>dews-loading');
          loading = this.target.querySelector('dews-loading');
        }
      }
    }
    if (loading) {
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
