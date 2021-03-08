import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './progressbar.html';
import scss from './progressbar.scss';
import { internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

export interface ProgressbarOptions {
  total: number;
  modal?: boolean | undefined;
  textTemplate?: string | undefined;
  alterTextTemplate?: string | undefined;
  target?: HTMLElement | null | undefined;
  titlebar?: boolean | object | undefined;
  byte?: boolean | undefined;
  autoClose?: boolean | undefined;
  cancel?: boolean | undefined;
}

export class Progressbar extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  progressId: string | undefined = '';

  @property({ type: Boolean })
  cancel: boolean | undefined = false;

  @internalProperty()
  _className = 'progressbar-layer';

  @internalProperty()
  _progressWidth = '0%';

  @internalProperty()
  textTemplate: TemplateResult | undefined = undefined;

  @internalProperty()
  _textTemplate: string | undefined = undefined;

  @internalProperty()
  _alterTextTemplate: string | undefined = undefined;

  @internalProperty()
  _titlebar: boolean | object | undefined = false;

  private _total = -1;
  private _modal: boolean | undefined = false;
  private _originTextTemplate: string | undefined = undefined;
  private _originAlterTextTemplate: string | undefined = undefined;
  private _target: HTMLElement | undefined | null;
  private _byte: boolean | undefined = false;
  private _autoClose: boolean | undefined = true;
  private _status = '';
  private _current = 0;

  constructor(id: string, options?: ProgressbarOptions) {
    super();
    this._initProgress(id, options);
  }

  render() {
    return template.call(this);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }

  _initProgress(id: string, options?: ProgressbarOptions) {
    if (options && options?.total <= 0) {
      console.log('total 값은 0보다 커야합니다.');
      this.close();
      return;
    }
    if (id === undefined) {
      console.log('progressId 를 설정해주세요');
      this.close();
      return;
    }
    const body = document.querySelector('body');

    if (body !== null) {
      if (options?.target !== undefined) {
        const targetElement = options.target;
        if (targetElement !== null) {
          targetElement.style.position = 'relative';
          this._className += ' field';
          targetElement.append(this);
        }
      } else {
        body.append(this);
      }
    }

    this._className += ' active';
    if (options) {
      this._total = options.total;
    }
    this._modal = options?.modal || false;
    this._textTemplate = options?.textTemplate;
    this._originTextTemplate = options?.textTemplate;
    this._alterTextTemplate = options?.alterTextTemplate;
    this._originAlterTextTemplate = options?.alterTextTemplate;
    this._target = options?.target;
    this._titlebar = options?.titlebar || false;
    this._byte = options?.byte || false;
    this._autoClose = options?.autoClose || true;
    this.cancel = options?.cancel;

    if (this._modal) {
      this._className += ' bg-add';
    }

    if (this._target !== undefined) {
      this._className += ' field';
    }

    const percent = Math.round((this._current / this._total) * 100);
    if (this._textTemplate !== undefined) {
      this._textTemplate = this._replaceText(this._textTemplate);
    } else {
      this._textTemplate = percent + '%';
    }

    if (this._alterTextTemplate !== undefined) {
      this._alterTextTemplate = this._replaceText(this._alterTextTemplate);
    }
    this._progressWidth = percent + '%';
  }

  private _replaceText(textTemplate: string): string {
    if (this._current === this._total) {
      this._current = this._total;
    }
    if (/#=\s*progress\s*/i.test(textTemplate)) {
      if (this._byte) {
        this._status = this._byteCalculation(this._current) + '/' + this._byteCalculation(this._total);
      } else {
        // 원래는 this._current, this._total 값에 dews.number.format 를 적용시켰었음
        this._status = this._current + '/' + this._total;
      }

      textTemplate = textTemplate?.replace(/#=\s*progress\s*#/i, this._status);
    }

    if (/#=\s*percent\s*/i.test(textTemplate)) {
      this._status = Math.round((this._current / this._total) * 100) + '%';
      textTemplate = textTemplate?.replace(/#=\s*percent\s*#/i, this._status);
    }
    return textTemplate;
  }

  private _byteCalculation(value: number) {
    const byte = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    if (value >= 0) {
      const cal = Math.floor(Math.log(value) / Math.log(1024));

      if (cal.toString() === '-Infinity') {
        return '0 ' + byte[0];
      } else {
        return (value / Math.pow(1024, Math.floor(cal))).toFixed(2) + ' ' + byte[cal];
        // if (byte[cal] === byte[0]) {
        //   // return dews.number.format((value / Math.pow(1024, Math.floor(cal))), 'N') + " " + byte[cal];
        // } else {
        //   return dews.number.format((value / Math.pow(1024, Math.floor(cal))), 'N2') + " " + byte[cal];
        // }
      }
    }
  }

  close() {
    this.remove();
  }

  setCurrent(value: number) {
    this._current = value;

    const percent = Math.round((this._current / this._total) * 100);
    if (this._originTextTemplate !== undefined) {
      this._textTemplate = this._replaceText(this._originTextTemplate);
    } else {
      this._textTemplate = percent + '%';
    }

    if (this._originAlterTextTemplate !== undefined) {
      this._alterTextTemplate = this._replaceText(this._originAlterTextTemplate);
    }
    this._progressWidth = percent + '%';

    if (this._current === this._total && this._autoClose) {
      setTimeout(() => {
        this.close();
      }, 300);
    }
  }

  // modal 속성이 true 일 때만 프로그래스바 출력 후 오버레이 영역의 터치 스크롤링을 막음
  private _onTouchmove(e: TouchEvent) {
    if (this._modal) {
      e.preventDefault();
    }
  }

  // modal 속성이 true 일 때만 프로그래스바 출력 후 오버레이 영역의 스크롤링을 막음
  private _onWheel(e: Event) {
    if (this._modal) {
      e.preventDefault();
    }
  }
}
