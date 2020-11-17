import { DewsFormComponent } from '../../core/baseclass/DewsFormComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

import _html from './datepicker.html';
import _scss from './datepicker.scss';

export class Datepicker extends DewsFormComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  @property({ type: Boolean })
  disabled: boolean = false;

  @property({ type: Boolean })
  readonly: boolean = false;

  @property({ type: Boolean })
  required: boolean = false;

  @property({ type: String })
  value: string = '';

  @property({ type: String })
  min: string;

  @property({ type: String })
  max: string;

  @internalProperty()
  private active: boolean = false;

  private count: number = 0;

  private _viewYear: number;
  private _viewMonth: number;

  private _setYear: number;
  private _setMonth: number;
  private _setDay: number;
  private _count: number = 1;
  private speed: number = 20;

  @internalProperty()
  private _dateView1: Array<TemplateResult> = [];

  @internalProperty()
  private _dateView2: Array<TemplateResult> = [];

  @internalProperty()
  private _dateView3: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.disabled && this.readonly) {
      this.readonly = false;
    }

    this._dateView1 = this._dayPickerView(2020, 10);
    this._dateView2 = this._dayPickerView(2020, 11);
    this._dateView3 = this._dayPickerView(2020, 12);
    // this._dayPickerView();
    // this._dateSpinorView();

    this._viewYear = new Date().getFullYear();
    this._viewMonth = new Date().getMonth() + 1;
  }

  private _dayPickerView(y?: number, m?: number): Array<TemplateResult> {
    const today = new Date();
    const _dateView: Array<TemplateResult> = [];
    let todayYear = today.getFullYear();
    let todayMonth = today.getMonth();
    const todayDate = today.getDate();
    if (y !== undefined && m !== undefined) {
      todayYear = y;
      todayMonth = m - 1;
    }
    const theDate = new Date(todayYear, todayMonth, 1);
    const firstDay = theDate.getDay();
    const last: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      last[1] = 29;
    }
    const lastDate = last[todayMonth];
    let count = 1;
    const length = Math.ceil((firstDay + lastDate) / 7) + 1;
    for (let i = 1; i < length; i++) {
      for (let j = 1; j <= 7; j++) {
        if (i == 1 && j <= firstDay) {
          _dateView.push(html`<div class="day day-disabled"><span>${last[todayMonth] - (firstDay - j)}</span></div>`);
        } else if (count > lastDate) {
          _dateView.push(html`<div class="day day-disabled"><span>${count - lastDate}</span></div>`);
          count++;
        } else {
          if (j === 1 || j === 7) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day weekend select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            } else {
              _dateView.push(
                html`<div class="day weekend" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            }
          } else if (
            count === today.getDate() &&
            today.getMonth() === todayMonth &&
            today.getFullYear() === todayYear
          ) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day today select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            } else {
              _dateView.push(
                html`<div class="day today" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            }
          } else {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            } else {
              _dateView.push(
                html`<div class="day" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`,
              );
            }
          }
          count++;
        }
      }
    }
    return _dateView;
  }

  private _dateSpinorView() {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();

    const yearMin = this.min !== undefined ? this.min.slice(0, 4) : today.getFullYear() - 100;
    const yearMax = this.max !== undefined ? this.min.slice(0, 4) : today.getFullYear() + 100;

    const last: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let lastDate;
    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      lastDate = last[1] = 29;
    }

    lastDate = last[todayMonth];

    for (let i = 0; Number(yearMin) + i <= Number(yearMax); i++) {
      //  year view 생성
      if (today.getFullYear() === Number(yearMin) + i) {
        console.log(Number(yearMin) + i, 'active');
      } else {
        // console.log(Number(yearMin)+i);
      }
    }

    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (todayMonth + 1 === j) {
        console.log(j, 'active');
      } else {
        // console.log(j)
      }
    }

    for (let k = 1; k <= lastDate; k++) {
      if (k === today.getDate()) {
        console.log(k, 'active');
      } else {
        //  console.log(k)
      }
    }
  }

  private _selectYear(e: Event) {}

  private _selectMonth(e: Event) {}

  private _dayClickHandler(e: any) {
    const $el: HTMLElement = e.currentTarget;
    this._selectRemove();
    $el.classList.toggle('select');
    this._setYear = this._viewYear;
    this._setMonth = this._viewMonth;
    this._setDay = Number(e.currentTarget.dataset.value);
  }

  private _selectRemove() {
    this.shadowRoot.querySelectorAll('.calendar-date').forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
  }

  /*
   * 다음버튼 UI 처리 및 animation 처리
   * */
  private _nextAnimation() {
    const $el: HTMLElement = this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap');
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX + this._count}px, 0px, 0px)`;
    this._count = this._count - this.speed;
    if (Math.abs(this._count + this._touchMoveX) <= ($el.clientWidth / 3) * 2) {
      window.requestAnimationFrame(this._nextAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-(
        this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap').clientWidth / 3
      )}px, 0px, 0px)`;
      this._nextViewSet();
    }
  }

  private _nextViewSet() {
    if (this._viewMonth + 1 > 12) {
      this._dateView1 = this._dayPickerView(this._viewYear, 12);
      this._dateView2 = this._dayPickerView(this._viewYear + 1, 1);
      this._dateView3 = this._dayPickerView(this._viewYear + 1, 2);
      this._viewYear++;
      this._viewMonth = 1;
    } else {
      this._dateView1 = this._dayPickerView(this._viewYear, this._viewMonth);
      this._dateView2 = this._dayPickerView(this._viewYear, this._viewMonth + 1);
      this._dateView3 = this._dayPickerView(this._viewYear, this._viewMonth + 2);
      this._viewMonth++;
    }
    this._selectRemove();
  }

  /*
   * 이전버튼 UI 처리 및 animation 처리
   * */
  private _backAnimation() {
    const $el: HTMLElement = this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap');
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX + this._count}px, 0px, 0px)`;
    if (this._count <= Math.abs(this._touchMoveX)) {
      window.requestAnimationFrame(this._backAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-(
        this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap').clientWidth / 3
      )}px, 0px, 0px)`;
      this._backViewSet();
    }
    this._count = this._count + this.speed;
  }

  private _backViewSet() {
    if (this._viewMonth - 1 < 1) {
      this._dateView1 = this._dayPickerView(this._viewYear - 1, 11);
      this._dateView2 = this._dayPickerView(this._viewYear - 1, 12);
      this._dateView3 = this._dayPickerView(this._viewYear, 1);
      this._viewYear--;
      this._viewMonth = 12;
    } else {
      this._dateView1 = this._dayPickerView(this._viewYear, this._viewMonth - 2);
      this._dateView2 = this._dayPickerView(this._viewYear, this._viewMonth - 1);
      this._dateView3 = this._dayPickerView(this._viewYear, this._viewMonth);
      this._viewMonth--;
    }
    this._selectRemove();
  }

  /*
   *  현재 날짜 이동 처리 해야됨
   * */
  private _nowBtn() {
    // this._dateView2 = this._dayPickerView();
  }

  private _nextItem;
  private $nextBtn;

  /*
   *  다음 요소 선택 처리
   * */
  private _nextBtnView() {
    const $el = this.parentElement.children;
    for (let i = 0; i <= $el.length; i++) {
      if ($el.item(i) === this) {
        this._nextItem = i + 1;
        if ($el.length == i + 1) {
          this.$nextBtn = html``;
        } else {
          if (
            $el.item(i + 1).hasAttribute('disabled') ||
            $el.item(i + 1).hasAttribute('readonly') ||
            $el.item(i + 1).localName === 'dews-button' ||
            $el.item(i + 1).localName === 'dews-radiobutton-group' ||
            $el.item(i + 1).localName === 'dews-checkbox-group'
          ) {
            this.$nextBtn = html``;
          } else {
            this.$nextBtn = html`<button class="next-icon-button" @click="${this._nextBtnClickHandler}">
              <span>다음</span>
            </button>`;
          }
        }
      }
    }
  }

  private _touchStartPoint: number;
  private _touchMoveX: number = 0;

  private _touchMoveHandler(e: TouchEvent) {
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;

    this._touchMoveX =
      e.changedTouches[0].pageX -
      this._touchStartPoint -
      this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap').clientWidth / 3;

    $el.style.transform = `translate3d(${this._touchMoveX}px, 0px, 0px)`;
  }

  private _touchStartHandler(e: TouchEvent) {
    this._touchStartPoint = e.changedTouches[0].pageX;
  }

  private _touchEndHandler(e: TouchEvent) {
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;
    const scrollX = this.shadowRoot.querySelector('drower-layout').querySelector('.calendar-flip-wrap').clientWidth / 3;
    if (e.changedTouches[0].pageX > this._touchStartPoint + 5) {
      this._backAnimation();
    } else if (e.changedTouches[0].pageX < this._touchStartPoint - 5) {
      this._nextAnimation();
    }
  }

  private _nextBtnClickHandler(e: TouchEvent | MouseEvent) {
    const $el = this.parentElement?.parentElement?.children[this._nextItem]?.children[0] as HTMLElement;
    $el?.click();
  }

  private _domClickHandler(e: MouseEvent) {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot.querySelector('drower-layout').shadowRoot.querySelector('.layer-bottom').clientHeight
      ) {
        if (this.count > 0) {
          this._close();
        } else {
          this.count++;
        }
      }
    }
  }

  private _clickHandler(e: MouseEvent) {
    if (!this.disabled && !this.readonly && this.active === false) {
      this._open();
      this._scrollChange();
    }
  }

  private _scrollChange() {
    window.scrollTo(
      0,
      window.pageYOffset +
        this.parentElement?.getBoundingClientRect()?.top -
        this.shadowRoot.querySelector('.date-picker-wrap').clientHeight -
        25,
    );
  }

  private domEvent = this._domClickHandler.bind(this);

  private _close() {
    this.active = false;
    this.count = 0;
    document.removeEventListener('click', this.domEvent);
  }

  private _open() {
    this.active = true;
    document.addEventListener('click', this.domEvent);
  }

  render() {
    return _html.bind(this)();
  }
}
