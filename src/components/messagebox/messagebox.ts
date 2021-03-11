import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './messagebox.html';
import scss from './messagebox.scss';
import { eventOptions, property } from 'lit-element';

type ALIGN_LIST = 'center' | 'left' | 'right';
type ICON_LIST = 'success' | 'info' | 'error' | 'question' | 'warning';
type CHECKBOX_TYPE = 'none' | 'never' | 'today';
// alert - 확인버튼 | confirm - 예/아니오버튼 (cancel 이 true 면 예/아니오/취소버튼) | error - 확인버튼
export type MESSAGEBOX_TYPE = 'alert' | 'confirm' | 'error';
export interface MessageboxOptions {
  align?: ALIGN_LIST | undefined;
  icon?: ICON_LIST | undefined;
  cancel?: boolean | undefined;
  showCheckbox?: CHECKBOX_TYPE | undefined;
  id?: string | undefined;
}

export class Messagebox extends DewsFormComponent {
  static styles = scss;

  constructor(message: string, messageBoxType: MESSAGEBOX_TYPE, options: MessageboxOptions) {
    super();

    this.message = message;
    this._messageboxType = messageBoxType;
    this._align = options.align || 'center';
    this._cancel = options.cancel || false;
    this._showCheckbox = options.showCheckbox || 'none';
    this._id = options.id || '';
    this._icon = options.icon || 'success';

    if (this._getCookie(this._id) === 'Y') {
      this.remove();
    } else {
      this._show();
    }
  }

  @property({ type: String })
  message = '';

  private _messageboxType = 'alert';
  private _icon: ICON_LIST | undefined = 'success';
  private _align: ALIGN_LIST | undefined = 'center';
  private _cancel: boolean | undefined = false;
  private _showCheckbox: CHECKBOX_TYPE | undefined = 'none';
  private _id: string | undefined = '';
  private _className = 'msgbox-content';

  private _yesBtnMessage = '확인';
  private _checkboxMessage = '';
  private _always: Array<Function> = [];
  private _resolves: Array<Function> = [];
  private _rejects: Array<Function> = [];
  private _callbackResult: string | undefined = '';

  render() {
    return template.call(this);
  }

  done(fn: Function) {
    this._always.push(fn);
    return this;
  }

  yes(fn: Function) {
    this._resolves.push(fn);
    return this;
  }

  no(fn: Function) {
    this._rejects.push(fn);
    return this;
  }

  on(eventName: string, fn: Function) {
    this.addEventListener('closed', fn.bind(this));
  }

  private _show() {
    const body = document.querySelector('body');

    if (body !== null) {
      body.append(this);
    }

    if (this._messageboxType === 'confirm') {
      this._yesBtnMessage = '예';
    }

    this._className += ' ' + this._icon;
    if (this._showCheckbox === 'today') {
      this._checkboxMessage = '오늘 하루 이 창 열지 않기';
    } else if (this._showCheckbox === 'never') {
      this._checkboxMessage = '다시 보지 않기';
    }
  }

  private _getResolveData(btnType: string) {
    return new Promise<string>(function (resolve) {
      btnType === 'yes' ? resolve('resolves') : resolve('rejects');
    });
  }

  // 확인, 취소, 예 버튼 클릭 시 실행
  private _btnClick(btnType: string) {
    this._getResolveData(btnType)
      .then((result: string) => {
        // resolve 가 실행된 경우(성공), resolve 함수에 전달된 값이 result 에 저장된다
        this._callbackResult = result;
      })
      .finally(() => {
        this._close();
      });
  }

  private _close() {
    if (this._callbackResult === 'resolves') {
      const resolvesLength = this._resolves.length;
      if (resolvesLength > 0) {
        for (let idx = 0; idx < resolvesLength; idx++) {
          this._resolves[idx].call(this, this);
        }
      }
    } else if (this._callbackResult === 'rejects') {
      const rejectsLength = this._rejects.length;
      if (rejectsLength > 0) {
        for (let idx = 0; idx < rejectsLength; idx++) {
          this._rejects[idx].call(this, this);
        }
      }
    }
    const alwaysLength = this._always.length;
    if (alwaysLength > 0) {
      for (let idx = 0; idx < alwaysLength; idx++) {
        this._always[idx].call(this, this);
      }
    }

    // 메시지박스가 닫히고 난 후 발생하는 closed 이벤트
    this.dispatchEvent(new CustomEvent('closed'));

    const checkBox: HTMLInputElement | null = this.shadowRoot!.querySelector('#noShowCheckBox');
    if (this._callbackResult === 'resolves' && checkBox !== null && checkBox.checked) {
      if (this._showCheckbox === 'today') {
        this._setCookie(this._id, 'Y', 1);
      } else if (this._showCheckbox === 'never') {
        this._setCookie(this._id, 'Y', 9999);
      }
    }
    this.remove();
  }

  // 쿠키 가져오기
  private _getCookie(name: string | undefined) {
    const nameOfCookie = name + '=';
    let x = 0,
      endOfCookie;
    while (x <= document.cookie.length) {
      const y = x + nameOfCookie.length;
      if (document.cookie.substring(x, y) === nameOfCookie) {
        if ((endOfCookie = document.cookie.indexOf(';', y)) === -1) endOfCookie = document.cookie.length;
        return unescape(document.cookie.substring(y, endOfCookie));
      }
      x = document.cookie.indexOf(' ', x) + 1;
      if (x == 0) break;
    }
    return '';
  }

  // 다음날 동일한 시간까지 열지 않도록 설정
  private _setCookie(name: string | undefined, value: string, expireDays: number) {
    if (expireDays === 9999) {
      document.cookie = name + '=' + escape(value) + '; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT;';
    } else {
      const todayDate = new Date();

      todayDate.setDate(todayDate.getDate() + expireDays);

      document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toUTCString() + ';';
    }
  }

  // 메시지박스 출력 후 오버레이 영역의 터치 스크롤링을 막음
  @eventOptions({ passive: true })
  private _onTouchmove(e: TouchEvent) {
    e.preventDefault();
  }

  // 메시지박스 출력 후 오버레이 영역의 스크롤링을 막음
  @eventOptions({ passive: false })
  private _onWheel(e: Event) {
    e.preventDefault();
  }
}
