import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { html, internalProperty, property, TemplateResult } from 'lit-element';

export class PickerBase extends DewsFormComponent {
  @property({ type: String })
  title = '';
  @property({ type: Boolean })
  disabled: boolean | undefined = false;

  @property({ type: Boolean })
  readonly: boolean | undefined = false;

  @property({ type: Boolean })
  required: boolean | undefined = false;

  @property({ type: String })
  value: string | undefined;

  @internalProperty()
  inputValue: string | undefined;

  @property({ type: String })
  min: string | undefined;

  @property({ type: String })
  max: string | undefined;

  @property({ type: Boolean })
  spinner: boolean | undefined = false;

  @internalProperty()
  protected active: boolean | undefined = false;

  protected count: number | undefined = 0;

  protected toYear = new Date().getFullYear();
  protected toMonth = new Date().getMonth();
  protected toDay = new Date().getDate();

  private lastDay: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  click() {
    this._open();
  }

  /**
   *  day UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * @param y 년도
   * @param m 월
   * */
  private _dayPickerView(y?: number, m?: number): TemplateResult {
    const _dateView: Array<TemplateResult> = [];
    let todayYear = this.toYear;
    let todayMonth = this.toMonth;
    _dateView.push(html` <span class="day-name">일</span>
      <span class="day-name">월</span>
      <span class="day-name">화</span>
      <span class="day-name">수</span>
      <span class="day-name">목</span>
      <span class="day-name">금</span>
      <span class="day-name">토</span>`);
    if (y !== undefined && m !== undefined) {
      todayYear = y;
      todayMonth = m - 1;
    }
    const theDate: Date = new Date(todayYear, todayMonth, 1);
    const firstDay = theDate.getDay();
    let yearDisabled = false;
    let monthDisabled = false;
    let dayMaxCheck = false;
    let dayMinCheck = false;
    if (todayYear >= Number(this.max?.slice(0, 4))) {
      if (todayYear > Number(this.max?.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 >= Number(this.max?.slice(4, 6))) {
        if (todayMonth + 1 > Number(this.max?.slice(4, 6))) {
          monthDisabled = true;
        } else {
          dayMaxCheck = true;
        }
      }
    } else if (todayYear <= Number(this.min?.slice(0, 4))) {
      if (todayYear < Number(this.min?.slice(0, 4))) {
        yearDisabled = true;
      } else if (todayMonth + 1 <= Number(this.min?.slice(4, 6))) {
        if (todayMonth + 1 < Number(this.min?.slice(4, 6))) {
          monthDisabled = true;
        } else {
          dayMinCheck = true;
        }
      }
    }

    if (todayYear % 400 == 0 || (todayYear % 4 == 0 && todayYear % 100 != 0)) {
      this.lastDay[1] = 29;
    } else {
      this.lastDay[1] = 28;
    }
    const lastDate = this.lastDay[todayMonth];
    let count = 1;
    const length = Math.ceil((firstDay + lastDate) / 7) + 1;
    for (let i = 1; i < length; i++) {
      for (let j = 1; j <= 7; j++) {
        if ((i == 1 && j <= firstDay) || count > lastDate) {
          _dateView.push(
            html`<div class="day day-disabled">
              <span></span>
            </div>`
          );
        } else {
          if (j === 1 || j === 7) {
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number(this.max?.slice(6, 8))) ||
              (dayMinCheck && count < Number(this.min?.slice(6, 8)))
            ) {
              _dateView.push(
                html`<div class="day day-disabled" data-value="${count}">
                  <span>${count}</span>
                </div>`
              );
            } else if (
              this._setMonth === todayMonth + 1 &&
              this._setYear == todayYear &&
              count === this._setDay &&
              !this.hdDisabled
            ) {
              if (this.visible) {
                _dateView.push(
                  html`<div
                    class="day select"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              } else {
                _dateView.push(
                  html`<div class="day weekend select" data-value="${count}" @click="${this._dayClickHandler}">
                    <span>${count}</span>
                  </div>`
                );
              }
            } else {
              if (this.visible) {
                _dateView.push(
                  html`<div
                    class="day"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              } else {
                _dateView.push(
                  html`<div
                    class="day weekend"
                    data-value="${count}"
                    @click="${this.hdDisabled ? null : this._dayClickHandler}"
                  >
                    <span>${count}</span>
                  </div>`
                );
              }
            }
          } else if (count === this.toDay && this.toMonth === todayMonth && this.toYear === todayYear) {
            if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day today select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            } else {
              _dateView.push(
                html`<div class="day today" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            }
          } else {
            if (
              yearDisabled ||
              monthDisabled ||
              (dayMaxCheck && count > Number(this.max?.slice(6, 8))) ||
              (dayMinCheck && count < Number(this.min?.slice(6, 8)))
            ) {
              _dateView.push(
                html`<div class="day day-disabled" data-value="${count}">
                  <span>${count}</span>
                </div>`
              );
            } else if (this._setMonth === todayMonth + 1 && this._setYear == todayYear && count === this._setDay) {
              _dateView.push(
                html`<div class="day select" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            } else {
              _dateView.push(
                html`<div class="day" data-value="${count}" @click="${this._dayClickHandler}">
                  <span>${count}</span>
                </div>`
              );
            }
          }
          count++;
        }
      }
    }
    return html`<div class="calendar-date">${_dateView}</div>`;
  }

  protected _domClickHandler(e: MouseEvent): void {
    if (e.isTrusted) {
      if (
        e.clientY <
        window.innerHeight -
          this.shadowRoot!.querySelector('.drawer-layout')!.shadowRoot!.querySelector('.layer-bottom')!.clientHeight
      ) {
        if (this.count! > 0) {
          this._close();
        } else {
          this.count!++;
        }
      }
    }
  }

  protected _clickHandler(e: MouseEvent): void {
    if (!this.disabled && !this.readonly && this.active === false) {
      this.shadowRoot!.querySelector('.select-wrap')!.classList.add('focus');
      this._open();
      this._scrollChange();
    }
  }

  protected _scrollChange(): void {
    window.scrollTo(
      0,
      window.pageYOffset +
        this.parentElement!.getBoundingClientRect()?.top -
        this.shadowRoot!.querySelector('.date-picker-wrap')!.clientHeight -
        25
    );
  }

  protected domEvent: EventListener = this._domClickHandler.bind(this) as EventListener;

  protected _close(): void {
    this.shadowRoot!.querySelector('.select-wrap')!.classList.remove('focus');
    this.active = false;
    this.count = 0;
    this.dispatchEvent(new Event('close'));
    document.removeEventListener('click', this.domEvent);
  }

  protected _open(): void {
    this.active = true;
    this.dispatchEvent(new Event('open'));
    document.addEventListener('click', this.domEvent);
  }
}
