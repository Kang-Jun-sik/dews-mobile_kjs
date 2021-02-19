import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './progressbar.html';
import scss from './progressbar.scss';
import { internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';

export type PROGRESSBAR_OPTIONS = {
  total: number;
  modal?: boolean | undefined;
  textTemplate?: string | undefined;
  alterTextTemplate?: string | undefined;
  target?: string | undefined;
  titlebar?: boolean | object | undefined;
  byte?: boolean | undefined;
  autoClose?: boolean | undefined;
  cancel?: boolean | undefined;
};

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

  // @property({ type: Object })
  options: PROGRESSBAR_OPTIONS | undefined = {
    total: -1
  };

  private _total = -1;
  private _modal: boolean | undefined = false;
  private _originTextTemplate: string | undefined = undefined;
  private _originAlterTextTemplate: string | undefined = undefined;
  private _target: string | undefined = undefined;
  private _byte: boolean | undefined = false;
  private _autoClose: boolean | undefined = true;
  private _status = '';
  private _current = 0;

  constructor() {
    super();
  }

  render() {
    return template.call(this);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }

  _initProgress() {
    if (this.options && this.options.total <= 0) {
      console.log('total 값은 0보다 커야합니다.');
      this.close();
      return;
    }
    if (this.progressId === undefined) {
      console.log('progressId 를 설정해주세요');
      this.close();
      return;
    }
    const body = document.querySelector('body');

    if (body !== null) {
      if (this.options?.target !== undefined) {
        const targetElement = body.querySelector<HTMLElement>('#' + this.options.target);
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

    for (const prop in this.options) {
      switch (prop) {
        case 'total':
          this._total = this.options[prop];
          break;
        case 'modal':
          this._modal = this.options[prop];
          break;
        case 'textTemplate':
          this._textTemplate = this.options[prop];
          this._originTextTemplate = this.options[prop];
          break;
        case 'alterTextTemplate':
          this._alterTextTemplate = this.options[prop];
          this._originAlterTextTemplate = this.options[prop];
          break;
        case 'target':
          this._target = this.options[prop];
          break;
        case 'titlebar':
          this._titlebar = this.options[prop];
          break;
        case 'byte':
          this._byte = this.options[prop];
          break;
        case 'autoClose':
          this._autoClose = this.options[prop];
          break;
        case 'cancel':
          this.cancel = this.options[prop];
          break;
      }
    }

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
