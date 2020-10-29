import { css, customElement, html, property } from 'lit-element';
import { DewsComponent } from '../../core/baseclass/DewsComponent.js';
import { HistoryBackEventArgs } from '../HistoryBackEventArgs.js';

@customElement('main-header')
export class NavigationBar extends DewsComponent {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    ul,
    li,
    ol {
      list-style: none;
    }
    button {
      border: 0;
      border-radius: 0;
      background-color: transparent;
      outline: 0;
    }
    button:focus {
      outline: none;
    }
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 2000;
      width: 100%;
    }
    .navigation-bar-wrap {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      width: 100%;
      padding-left: 20px;
      border-bottom: 1px solid rgba(27, 31, 35, 0.04);
      background-color: #ffffff;
    }
    .history-back-button {
      flex: 0 0 24px;
      height: 24px;
      border: none;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnLz4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0xMy43MTIgNy43MDdhMS4wMTQgMS4wMTQgMCAwIDEtMS40MiAwTDggMy40MDhWMTdhMSAxIDAgMSAxLTIgMFYzLjQwOGwtNC4yOSA0LjNhMSAxIDAgMCAxLTEuNDItMS40Mmw2LTZhLjk4OC45ODggMCAwIDEgLjMyLS4yMS4zNzEuMzcxIDAgMCAxIC4xNC0uMDQuODUyLjg1MiAwIDAgMSAuNSAwIC4zNzEuMzcxIDAgMCAxIC4xNC4wNC45ODguOTg4IDAgMCAxIC4zMi4yMWw2IDZhMS4wMDggMS4wMDggMCAwIDEgMCAxLjQyIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgOS41MDMgOS40OTkpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=)
        no-repeat;
    }
    .history-back-button:active {
      border: none;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnLz4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9InJnYmEoNjAsNjAsNjcsMC43KSIgZD0iTTEzLjcxMiA3LjcwN2ExLjAxNCAxLjAxNCAwIDAgMS0xLjQyIDBMOCAzLjQwOFYxN2ExIDEgMCAxIDEtMiAwVjMuNDA4bC00LjI5IDQuM2ExIDEgMCAwIDEtMS40Mi0xLjQybDYtNmEuOTg4Ljk4OCAwIDAgMSAuMzItLjIxLjM3MS4zNzEgMCAwIDEgLjE0LS4wNC44NTIuODUyIDAgMCAxIC41IDAgLjM3MS4zNzEgMCAwIDEgLjE0LjA0Ljk4OC45ODggMCAwIDEgLjMyLjIxbDYgNmExLjAwOCAxLjAwOCAwIDAgMSAwIDEuNDIiIHRyYW5zZm9ybT0icm90YXRlKC05MCA5LjUwMyA5LjQ5OSkiLz4KICAgIDwvZz4KPC9zdmc+Cg==)
        no-repeat;
    }

    /* header title */
    .navigation-bar {
      position: relative;
      flex: 0 0 calc(100% - 24px); /*100% - history back button size */
      width: calc(100% - 24px); /*100% - history back button size */
    }
    .navigation-bar header {
      display: block;
      width: 100%;
      padding: 12px 20px 12px 4px;
    }
    .navigation-bar header h1 {
      width: calc(100% - 16px - 24px); /*100% - (margin) -(menu button size) */
      height: 28px;
    }
    .navigation-bar header h1 button {
      display: block;
      overflow: hidden;
      width: 100%;
      height: 100%;
      border: none;
      color: #111111;
      background-color: transparent;
      font-size: 18px;
      font-weight: bold;
      text-align: left;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
    }
    .navigation-bar header .all-menu-button {
      position: absolute;
      top: 12px;
      right: 20px;
      width: 24px;
      height: 24px;
      margin: 2px 0;
      border: none;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnLz4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0xIDE0YTEgMSAwIDAgMSAwLTJoMThhMSAxIDAgMCAxIDAgMnptMC02YTEgMSAwIDAgMSAwLTJoMThhMSAxIDAgMCAxIDAgMnptMC02YTEgMSAwIDAgMSAwLTJoMThhMSAxIDAgMCAxIDAgMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgNSkiLz4KICAgIDwvZz4KPC9zdmc+Cg==)
        no-repeat;
    }
    .navigation-bar header .all-menu-button:active {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnLz4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9InJnYmEoNTEsNTEsNTEsMC43KSIgZD0iTTEgMTRhMSAxIDAgMCAxIDAtMmgxOGExIDEgMCAwIDEgMCAyem0wLTZhMSAxIDAgMCAxIDAtMmgxOGExIDEgMCAwIDEgMCAyem0wLTZhMSAxIDAgMCAxIDAtMmgxOGExIDEgMCAwIDEgMCAyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNCA1KSIvPgogICAgPC9nPgo8L3N2Zz4K);
    }

    /* anchor point */
    .anchor-point {
      position: relative;
      display: none;
      margin-left: 8px;
    }
    .anchor-point:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      display: block;
      width: 45px;
      height: 100%;
      background: linear-gradient(to right, rgba(255, 255, 255, 0) -16%, #ffffff 70%, #ffffff);
    }
    .anchor-point ul {
      display: flex;
      overflow-x: auto;
      padding: 8px 0;
    }
    .anchor-point li {
      flex: 0 0 36px;
      height: 36px;
      margin-right: 12px;
    }
    .anchor-point li:last-of-type {
      box-sizing: content-box;
      padding-right: 45px;
    }
    .anchor-point li a {
      display: block;
      width: 100%;
      height: 100%;
      color: rgba(60, 60, 67, 0.6);
      border: 1px solid rgba(60, 60, 67, 0.1);
      border-radius: 18px;
      font-size: 16px;
      font-weight: bold;
      line-height: 34px;
      text-align: center;
      text-decoration: none;
    }
    .anchor-point li.active a {
      border: solid 1px #3676ff;
      background-color: rgba(55, 118, 255, 0.1);
    }
    .anchor-point li.active a {
      color: #3676ff;
    }

    /* title tooltip */
    .title-wrap {
      display: none;
      position: relative;
      width: 100%;
      padding: 12px 20px;
      background-color: rgba(60, 60, 67, 0.8);
    }
    .title-wrap .title {
      width: calc(100% - 18px);
      color: #ffffff;
      font-size: 13px;
      line-height: 1.54;
    }
    .title-wrap .title-close-button {
      position: absolute;
      display: block;
      top: 12px;
      right: 20px;
      width: 18px;
      height: 18px;
      border: 0;
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03LjA3MSA3Ljg0TDQgNC43NjguOTI3IDcuODRhLjU0My41NDMgMCAwIDEtLjc2OC0uNzY5TDMuMjMxIDQgLjE1OS45MjdBLjU0My41NDMgMCAwIDEgLjkyNy4xNTlMNCAzLjIzMSA3LjA3MS4xNTlhLjU0My41NDMgMCAwIDEgLjc2OS43NjhMNC43NjggNCA3Ljg0IDcuMDcxYS41NDMuNTQzIDAgMCAxLS43NjkuNzY5eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSA1KSIvPgo8L3N2Zz4K)
        no-repeat;
      background-position: center;
    }
    .title-wrap .title-close-button:active {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICAgIDxwYXRoIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgZD0iTTcuMDcxIDcuODRMNCA0Ljc2OC45MjcgNy44NGEuNTQzLjU0MyAwIDAgMS0uNzY4LS43NjlMMy4yMzEgNCAuMTU5LjkyN0EuNTQzLjU0MyAwIDAgMSAuOTI3LjE1OUw0IDMuMjMxIDcuMDcxLjE1OWEuNTQzLjU0MyAwIDAgMSAuNzY5Ljc2OEw0Ljc2OCA0IDcuODQgNy4wNzFhLjU0My41NDMgMCAwIDEtLjc2OS43Njl6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1IDUpIi8+Cjwvc3ZnPgo=);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // window.addEventListener('onFocusedAreaChanged', e => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    //   // @ts-ignore
    //   const target = e.detail?.$target;
    //   this.title = target?.title || '';
    // });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true })
  title: string = 'init';

  historyBack() {
    console.log(`click historyBack`);
    const historyBackEvent = new HistoryBackEventArgs('historyBack', { bubbles: true, composed: true });
    dews.app.main.dispatchEvent(historyBackEvent);
  }

  render() {
    return html`
      <!--      <header>-->
      <!--        <button class="btn-back" @click="${this.historyBack}"></button>-->
      <!--        <h2 class="title">${this.title}</h2>-->
      <!--      </header>-->
      <div class="navigation-bar-wrap">
        <button class="history-back-button"></button>
        <div class="navigation-bar">
          <header>
            <h1><button>Navigation BarNavigation BarNavigation BarNavigation BarNavigation Bar</button></h1>
            <button class="all-menu-button"></button>
          </header>
          <!-- 추가 작업 필요 -->
          <nav class="anchor-point">
            <ul>
              <li class="active"><a href="#">일</a></li>
              <li><a href="#">이</a></li>
              <li><a href="#">삼</a></li>
              <li><a href="#">사</a></li>
              <li><a href="#">오</a></li>
              <li><a href="#">육</a></li>
              <li><a href="#">칠</a></li>
              <li><a href="#">팔</a></li>
              <li><a href="#">구</a></li>
              <li><a href="#">십</a></li>
              <li><a href="#">일</a></li>
              <li><a href="#">이</a></li>
              <li><a href="#">삼</a></li>
              <li><a href="#">사</a></li>
              <li><a href="#">오</a></li>
              <li><a href="#">육</a></li>
              <li><a href="#">칠</a></li>
              <li><a href="#">팔</a></li>
              <li><a href="#">구</a></li>
              <li><a href="#">십</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <!-- 추가 작업 필요 -->
      <div class="title-wrap">
        <p class="title">Navigation BarNavigation BarNavigation BarNavigation BarNavigation Bar</p>
        <button class="title-close-button"></button>
      </div>
    `;
  }
}
