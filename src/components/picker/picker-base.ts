import { html, internalProperty, property, TemplateResult } from 'lit-element';
import { DrawerBottomBase } from './drawer-bottom-base.js';

export class PickerBase extends DrawerBottomBase {
  @property({ type: String })
  title = '';

  @property({ type: String })
  value: string | undefined;

  @internalProperty()
  inputValue: string | undefined;

  @property({ type: String })
  min: string | undefined = '19900101';

  @property({ type: String })
  max: string | undefined = '21000101';

  @property({ type: Boolean })
  spinner: boolean | undefined = false;

  @property({ type: Boolean, attribute: 'holidays-visible' })
  visible = false;

  @property({ type: Boolean, attribute: 'holidays-disabled' })
  hdDisabled = false;

  @internalProperty()
  protected _beforeView: TemplateResult | undefined;

  @internalProperty()
  protected _modeView: string | undefined;

  @internalProperty()
  protected _mode: 'day' | 'month' | 'year' = 'day';
  @internalProperty()
  protected _nowView: TemplateResult | undefined;

  @internalProperty()
  protected _afterView: TemplateResult | undefined;

  protected _removeCheck: boolean | undefined = false;
  protected _moveCheck: boolean | undefined = false;
  protected _count: number | undefined = 1;
  protected speed: number | undefined = 20;
  protected _touchMoveX: number | undefined = 0;
  protected _touchMoveY: number | undefined = 0;
  protected _touchStartPoint: number | undefined;
  protected _touchStartSpinnerPoint: number | undefined;
  protected _spinnerIndex: number | undefined;
  protected toYear = new Date().getFullYear();
  protected toMonth = new Date().getMonth();
  protected toDay = new Date().getDate();
  protected _viewYear: number | undefined;
  protected _viewMonth: number | undefined;
  protected _viewDay: number | undefined;
  protected _setYear: number | undefined;
  protected _setMonth: number | undefined;
  protected _setDay: number | undefined;
  protected lastDay: Array<number> = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  click() {
    this._open();
  }

  //  select 클래스를 제거
  protected _selectRemove(): void {
    this.shadowRoot!.querySelectorAll('.calendar-date')!.forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
    this.shadowRoot!.querySelectorAll('.calendar-month')!.forEach($calendar => {
      $calendar.querySelectorAll('.select').forEach($el => {
        $el.classList.remove('select');
      });
    });
  }

  //  다음버튼 HTML 템플릿 설정
  protected _afterViewSet(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! + 1 > 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 12);
        this._nowView = this._dayPickerView(this._viewYear! + 1, 1);
        this._afterView = this._dayPickerView(this._viewYear! + 1, 2);
        this._viewYear!++;
        this._viewMonth = 1;
      } else if (this._viewMonth! + 1 == 12) {
        this._beforeView = this._dayPickerView(this._viewYear, 11);
        this._nowView = this._dayPickerView(this._viewYear, 12);
        this._afterView = this._dayPickerView(this._viewYear! + 1, 1);
        this._viewMonth!++;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! + 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth! + 2);
        this._viewMonth!++;
      }
    } else if (this._mode === 'month') {
      this._beforeView = this._monthPickerView(this._viewYear);
      this._nowView = this._monthPickerView(this._viewYear! + 1);
      this._afterView = this._monthPickerView(this._viewYear! + 2);
      this._viewYear!++;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear);
      this._nowView = this._yearPickerView(this._viewYear! + 10);
      this._afterView = this._yearPickerView(this._viewYear! + 20);
      this._viewYear = this._viewYear! + 10;
    }
  }

  // view template 설정
  private _beforeViewSet(): void {
    this._selectRemove();
    if (this._mode === 'day') {
      if (this._viewMonth! - 1 < 1) {
        this._beforeView = this._dayPickerView(this._viewYear! - 1, 11);
        this._nowView = this._dayPickerView(this._viewYear! - 1, 12);
        this._afterView = this._dayPickerView(this._viewYear, 1);
        this._viewYear!--;
        this._viewMonth = 12;
      } else if (this._viewMonth! - 1 == 1) {
        this._beforeView = this._dayPickerView(this._viewYear! - 1, 12);
        this._nowView = this._dayPickerView(this._viewYear, 1);
        this._afterView = this._dayPickerView(this._viewYear, 2);
        this._viewMonth!--;
      } else {
        this._beforeView = this._dayPickerView(this._viewYear, this._viewMonth! - 2);
        this._nowView = this._dayPickerView(this._viewYear, this._viewMonth! - 1);
        this._afterView = this._dayPickerView(this._viewYear, this._viewMonth);
        this._viewMonth!--;
      }
      this._selectRemove();
    } else if (this._mode === 'month') {
      this._beforeView = this._monthPickerView(this._viewYear! - 2);
      this._nowView = this._monthPickerView(this._viewYear! - 1);
      this._afterView = this._monthPickerView(this._viewYear);
      this._viewYear!--;
    } else {
      this._beforeView = this._yearPickerView(this._viewYear! - 20);
      this._nowView = this._yearPickerView(this._viewYear! - 10);
      this._afterView = this._yearPickerView(this._viewYear);
      this._viewYear = this._viewYear! - 10;
    }
  }

  protected _modeViewChange() {
    //  오버라이드
  }

  /*
   * 이전버튼 UI 처리 및 animation 처리
   * */
  private _beforeAnimation(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
      '.calendar-flip-wrap'
    ) as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (this._count! <= Math.abs(this._touchMoveX!)) {
      window.requestAnimationFrame(this._beforeAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._beforeViewSet();
      this._modeViewChange();
    }
    this._count = this._count! + this.speed!;
  }

  // 리셋버튼 클릭 핸들러

  /*
   * 다음버튼 UI 처리 및 animation 처리
   * */
  private _afterAnimation() {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')!.querySelector(
      '.calendar-flip-wrap'
    ) as HTMLElement;
    if (this._touchMoveX === 0) {
      this._touchMoveX = -($el.clientWidth / 3);
    }
    $el.style.transform = `translate3d(${this._touchMoveX! + this._count!}px, 0px, 0px)`;
    if (Math.abs(this._count! + this._touchMoveX!) <= ($el.clientWidth / 3) * 2) {
      window.requestAnimationFrame(this._afterAnimation.bind(this));
    } else {
      this._count = 0;
      $el.style.transform = `translate3d(${-Math.abs(
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3
      )}px, 0px, 0px)`;
      this._afterViewSet();
      this._modeViewChange();
    }
    this._count = this._count! - this.speed!;
  }

  //  터치 이벤트 처리 ex) 스와이프 효과를 위해 처리
  private _touchMoveHandler(e: TouchEvent): void {
    e.preventDefault();
    this._moveCheck = true;
    let $el: HTMLElement = e.currentTarget as HTMLElement;
    $el = $el.children[0] as HTMLElement;
    if (!this.spinner) {
      this._touchMoveX =
        e.changedTouches[0].pageX -
        this._touchStartPoint! -
        this.shadowRoot!.querySelector('.drawer-layout')!.querySelector('.calendar-flip-wrap')!.clientWidth / 3;
      $el.style.transform = `translate3d(${this._touchMoveX}px, 0px, 0px)`;
    } else {
      const liHeight: number = $el.clientHeight;
      this._touchMoveY = this._touchStartSpinnerPoint! - (e.changedTouches[0].pageY - this._touchStartPoint!) * 1.3;
      if (($el.parentElement!.children.length - 1) * liHeight >= this._touchMoveY) {
        $el.parentElement!.parentElement!.style.transform = `translateY(-${this._touchMoveY}px)`;
      } else {
        this._touchMoveY = ($el.parentElement!.children.length - 1) * liHeight;
      }
    }
  }

  private _touchStartHandler(e: TouchEvent): void {
    if (!this.spinner) {
      this._touchStartPoint = e.changedTouches[0].pageX;
    } else {
      this._touchStartSpinnerPoint = Math.abs(
        Number(
          (e.currentTarget as HTMLElement).children[0]!.parentElement!.parentElement!.style.transform.split(
            '('
          )[1].split('px')[0]
        )
      );
      this._touchStartPoint = e.changedTouches[0].pageY;
      const length: number = (e.currentTarget as HTMLElement)!.children.length;
      for (let i = 0; i < length; i++) {
        if ((e.currentTarget as HTMLElement)!.children.item(i) === (e.target as HTMLElement)!.parentElement) {
          this._spinnerIndex = i;
        }
      }
      (e.currentTarget as HTMLElement)!.querySelectorAll('.select').forEach($el => {
        $el!.classList.remove('select');
      });
    }
  }

  private _touchEndHandler(e: TouchEvent) {
    if (!this.spinner) {
      if (e.changedTouches[0].pageX > this._touchStartPoint! + 5) {
        this._beforeAnimation();
      } else if (e.changedTouches[0].pageX < this._touchStartPoint! - 5) {
        this._afterAnimation();
      }
    } else {
      this._touchMoveY = Math.abs(
        Number((e.currentTarget as HTMLElement).parentElement!.style.transform.split('(')[1].split('px')[0])
      );
      let selectIndex: number = Math.round(this._touchMoveY! / 35);
      if (selectIndex < 0) {
        selectIndex = 0;
      }
      if (this._moveCheck) {
        if ((e.currentTarget as HTMLElement)!.classList.contains('year')) {
          this._setYear = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerYearPositionChange();
        } else if ((e.currentTarget as HTMLElement)!.classList.contains('month')) {
          this._setMonth = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerPickerViewChange(this._setYear, this._setMonth! - 1);
          this._spinnerMonthPositionChange();
        } else {
          this._setDay = Number(
            ((e.currentTarget as HTMLElement)!.children.item(selectIndex) as HTMLElement)!.dataset.value
          );
          this._spinnerDayPositionChange();
        }
        this._inputChange();
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
        this._moveCheck = false;
      } else {
        (e.currentTarget as HTMLElement)!.parentElement!.style.transform = `translateY(-${selectIndex * 35}px)`;
        (e.currentTarget as HTMLElement)!.children.item(selectIndex)!.classList.add('select');
      }
      //  change 이벤트 들어가야 될부분
    }
    this._removeCheck = false;
  }

  protected _inputChange() {
    //  오버라이드 될부분
  }

  protected _spinnerPickerViewChange(y?: number, m?: number) {
    //  오버라이드 될부분
  }

  protected _spinnerRemove(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    $drawer.querySelectorAll('.select')!.forEach($el => {
      $el.classList.remove('select');
    });
  }

  protected _spinnerYearSelect(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($drawer.querySelector('.moving-list.year')!.children[
      this._setYear! - Number(this.min?.slice(0, 4))
    ] as HTMLElement).classList.add('select');
  }

  protected _spinnerMonthSelect(num?: number): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    const $monthList = $drawer.querySelector('.moving-list.month') as HTMLElement;
    let select: number = this._setMonth! - 1;
    if (num !== undefined) {
      select = num;
    }
    if ($monthList.children.length !== 12) {
      for (let i = 0; i < $monthList.children.length; i++) {
        if (Number(($monthList.children.item(i) as HTMLElement).dataset.value) === this._setMonth) {
          ($drawer.querySelector('.moving-list.month')!.children[i] as HTMLElement).classList.add('select');
        }
      }
    } else {
      ($drawer.querySelector('.moving-list.month')!.children[select] as HTMLElement).classList.add('select');
    }
  }

  protected _spinnerDaySelect(): void {
    const $drawer: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    const $dayList = $drawer.querySelector('.moving-list.day') as HTMLElement;

    if ($dayList.children.length !== 12) {
      for (let i = 0; i < $dayList.children.length; i++) {
        if (Number(($dayList.children.item(i) as HTMLElement).dataset.value) === this._setDay) {
          ($drawer.querySelector('.moving-list.day')!.children[i] as HTMLElement).classList.add('select');
          this._spinnerDayPositionChange(i);
        }
      }
    } else {
      ($drawer.querySelector('.moving-list.day')!.children[this._setDay! - 1] as HTMLElement).classList.add('select');
      this._spinnerDayPositionChange();
    }
  }

  protected _spinnerYearPositionChange(): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    ($el.querySelector('.year')!.children[0] as HTMLElement).style.transform = `translateY(-${
      (this._setYear! - Number(this.min?.slice(0, 4))) * 35
    }px)`;
  }

  protected _spinnerDayPositionChange(num?: number): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    let select = this._setDay! - 1;
    if (num !== undefined) {
      select = num;
    }
    ($el.querySelector('.day')?.children[0] as HTMLElement).style.transform = `translateY(-${select * 35}px)`;
  }

  protected _spinnerMonthPositionChange(num?: number): void {
    const $el: HTMLElement = this.shadowRoot!.querySelector('.drawer-layout')! as HTMLElement;
    let select = this._setMonth! - 1;
    if (num !== undefined) {
      select = num;
    }
    ($el.querySelector('.month')!.children[0] as HTMLElement).style.transform = `translateY(-${select * 35}px)`;
  }

  protected _monthSpinnerPickerView(y?: number, m?: number): TemplateResult {
    let year: number = this.toYear;
    let month: number = this.toMonth;
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    const $spinnerMonth = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    for (let j = 1; j <= 12; j++) {
      // 달 생성
      if (yearMin !== year || (yearMin === year && j >= Number(this.min?.slice(4, 6)))) {
        if (yearMax !== year || (yearMax === year && j <= Number(this.max?.slice(4, 6)))) {
          if (j === this.toMonth + 1) {
            $spinnerMonth.push(
              html` <li class="today" data-value="${j}" data-index="${j}"><button>${j}</button></li> `
            );
          } else {
            $spinnerMonth.push(html` <li data-value="${j}" data-index="${j}"><button>${j}</button></li> `);
          }
        }
      }
    }
    return html`${$spinnerMonth}`;
  }

  protected _yearSpinnerPickerView(): TemplateResult {
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));

    const $spinnerYear: Array<TemplateResult> = [];
    for (let i = 0; yearMin + i <= yearMax; i++) {
      // 년도 생성
      if (yearMin + i === this.toYear) {
        $spinnerYear.push(
          html`<li class="today" data-value="${yearMin + i}" data-index="${i}">
            <button>${yearMin + i}</button>
          </li>`
        );
      } else {
        $spinnerYear.push(html`<li data-value="${yearMin + i}" data-index="${i}"><button>${yearMin + i}</button></li>`);
      }
    }
    return html`${$spinnerYear}`;
  }

  // 스피너 UI 생성
  protected _daySpinnerPickerView(y?: number, m?: number): TemplateResult {
    let year: number = this.toYear;
    let month: number = this.toMonth;
    const $spinnerDay: Array<TemplateResult> = [];
    if (y !== undefined) {
      year = y;
      if (m !== undefined) {
        month = m;
      }
    }
    const yearMin = Number(this.min!.slice(0, 4));
    const yearMax = Number(this.max!.slice(0, 4));
    if (year! % 400 == 0 || (year! % 4 == 0 && year % 100 != 0)) {
      this.lastDay[1] = 29;
    } else {
      this.lastDay[1] = 28;
    }
    const lastDate: number = this.lastDay[month!];
    for (let k = 1; k <= lastDate; k++) {
      // 일 생성
      if (
        yearMin !== year ||
        (yearMin === year && month + 1 >= Number(this.min?.slice(4, 6)) && k >= Number(this.min?.slice(6, 8)))
      ) {
        if (
          yearMax !== year ||
          (yearMax === year && month + 1 <= Number(this.max?.slice(4, 6)) && k <= Number(this.max?.slice(6, 8)))
        ) {
          if (k === this.toDay) {
            $spinnerDay.push(html` <li class="today" data-value="${k}" data-index="${k}"><button>${k}</button></li>`);
          } else {
            $spinnerDay.push(html` <li data-value="${k}" data-index="${k}"><button>${k}</button></li>`);
          }
        }
      }
    }
    return html`${$spinnerDay}`;
  }

  /**
   *  day UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   * @param y 년도
   * @param m 월
   * */
  protected _dayPickerView(y?: number, m?: number): TemplateResult {
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

  /**
   *  일 클릭 핸들러
   * @param e 마우스이벤트
   * */
  protected _dayClickHandler = (e: MouseEvent): void => {
    // 일 클릭핸들러 오버라이드 할 대상
  };

  /**
   *  month UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   *  @param y 년도
   * */
  protected _monthPickerView(y?: number): TemplateResult {
    const _mountView: Array<TemplateResult> = [];
    let todayYear: number = this.toYear;
    if (y !== undefined) {
      todayYear = y;
    }
    for (let i = 1; i <= 12; i++) {
      if (todayYear === this._setYear && i === this._setMonth) {
        _mountView.push(
          html`<div class="month select" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      } else if (
        todayYear > Number(this.max?.slice(0, 4)) ||
        (todayYear === Number(this.max?.slice(0, 4)) && i > Number(this.max?.slice(4, 6)))
      ) {
        _mountView.push(
          html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
        );
      } else if (
        todayYear < Number(this.min?.slice(0, 4)) ||
        (todayYear === Number(this.min?.slice(0, 4)) && i < Number(this.min?.slice(4, 6)))
      ) {
        _mountView.push(
          html`<div class="month month-disabled" data-value="${i}" @click="${this._monthClickHandler}">
            <span>${i}</span>
          </div>`
        );
      } else {
        _mountView.push(
          html`<div class="month" data-value="${i}" @click="${this._monthClickHandler}"><span>${i}</span></div>`
        );
      }
    }
    return html`<div class="calendar-month">${_mountView}</div>`;
  }

  /**
   * 달 클릭 핸들러
   * @param e 마우스이벤트
   * */
  protected _monthClickHandler = (e: MouseEvent): void => {
    // 달 클릭핸들러 오버라이드 할 대상
  };

  /**
   *  year UI 처리 리턴 값은 Lit-element 의 TemplateResult 타입의 값을 리턴 한다.
   *  @param y 년도
   * */
  protected _yearPickerView(y?: number): TemplateResult {
    let toYear: number = this.toYear;
    const _yearView: Array<TemplateResult> = [];
    if (y !== undefined) {
      toYear = y;
    }
    const todayYearStart = (toYear / 10) * 10 - 1 - (toYear % 10);
    const todayYearEnd = (toYear / 10) * 10 + 10 - (toYear % 10);
    for (let i = 0; todayYearStart + i <= todayYearEnd; i++) {
      if (todayYearStart + i === todayYearStart || todayYearStart + i === todayYearEnd) {
        _yearView.push(
          html`<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
            <span>${todayYearStart + i}</span>
          </div>`
        );
      } else {
        if (todayYearStart + i === this._setYear) {
          _yearView.push(
            html`<div class="year select" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else if (
          todayYearStart + i > Number(this.max?.slice(0, 4)) ||
          todayYearStart + i < Number(this.min?.slice(0, 4))
        ) {
          _yearView.push(
            html`<div class="year year-disabled" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        } else {
          _yearView.push(
            html`<div class="year" data-value="${todayYearStart + i}" @click="${this._yearClickHandler}">
              <span>${todayYearStart + i}</span>
            </div>`
          );
        }
      }
    }
    return html`<div class="calendar-year">${_yearView}</div>`;
  }

  /**
   *  년도 클릭 핸들러
   * @param e 마우스이벤트
   * */
  protected _yearClickHandler(e: MouseEvent): void {
    // 년도 클릭핸들러 오버라이드 할 대상
  }

  /*
  * 하위의 html 태그 요소 필수.!
  *
 <div  id="drawer" @click="${this._clickHandler}">

</div>


<drawer-layout class="drawer-layout" @close="${this._close}" ?active="${this.active}">
</drawer-layout>
  * */
}
