import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { css, customElement, html, internalProperty, query, TemplateResult } from 'lit-element';
import { FocusChangedEventArgs } from '../FocusChangedEventArgs.js';
import { MainButtonSet } from '../MainButton.js';

@customElement('main-bottom')
export class ButtonTabBar extends DewsLayoutComponent {
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
    .bottom {
      position: fixed;
      z-index: 3000;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .button-tab-bar {
      position: relative;
      padding: 8px 20px 8px 28px;
      background-color: rgba(28, 144, 251, 0.95);
    }
    .tab-bar {
      display: flex;
      flex-flow: row-reverse nowrap;
      align-items: center;
    }
    .main-button {
      margin-right: 25px;
      font-size: 0;
    }
    .main-button:first-child {
      margin-right: 0;
    }
    .main-button:last-child {
      flex: auto;
    }
    .main-button > button {
      position: relative;
      width: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      background-size: 24px 24px;
      background-repeat: no-repeat;
      background-position: center center;
      font-size: 0;
    }
    .main-button > button:active:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 100%;
      background: rgba(255, 255, 255, 0.1);
    }
    .sub-buttons {
      position: absolute;
      bottom: 60px;
      left: 8px;
      display: none;
      padding: 12px 0 12px;
      border-radius: 8px;
      background-color: rgba(60, 60, 67, 0.9);
    }
    .sub-buttons.active {
      display: block;
    }
    .sub-button button {
      position: relative;
      width: 100%;
      padding: 8px 20px 8px 56px;
      color: #ffffff;
      border: 0;

      font-size: 16px;
      text-align: left;
      line-height: 24px;
    }
    .sub-button button:before {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      top: 9px;
      left: 20px;
      background-color: transparent;
      background-size: 24px 24px;
      background-repeat: no-repeat;
    }
    .sub-button button:active:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.12);
    }

    .save {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19idGJfc2F2ZV90ZXJfbWwiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLmNscy0ze2ZpbGw6I2ZmZn0KICAgICAgICA8L3N0eWxlPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImljIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOSAxKSI+CiAgICAgICAgPHBhdGggaWQ9Iu2MqOyKpCIgZD0iTTEwNjMgNDY2LjVhMSAxIDAgMCAwLTEgMXYxNmExIDEgMCAwIDAgMSAxaDE2YTEgMSAwIDAgMCAxLTF2LTEyLjU4NmwtNC40MTQtNC40MTRIMTA2M20wLTJoMTNhMSAxIDAgMCAxIC43MDcuMjkzbDUgNWExIDEgMCAwIDEgLjI5My43MDd2MTNhMyAzIDAgMCAxLTMgM2gtMTZhMyAzIDAgMCAxLTMtM3YtMTZhMyAzIDAgMCAxIDMtM3oiIGNsYXNzPSJjbHMtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwODggLTQ2NC41KSIvPgogICAgICAgIDxwYXRoIGlkPSLrubzquLAiIGQ9Ik0yIDhIMFYwYTEgMSAwIDAgMSAxLTFoMTBhMSAxIDAgMCAxIDEgMXY4aC0yVjEuNWEuNS41IDAgMCAwLS41LS41aC03YS41LjUgMCAwIDAtLjUuNVY4eiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMgMTIpIi8+CiAgICAgICAgPHBhdGggaWQ9Iu2Vqey5mOq4sCIgZD0iTS0xIDZhMSAxIDAgMCAxLTEtMVYwaDJ2NGg3YTEgMSAwIDAgMSAwIDJ6IiBjbGFzcz0iY2xzLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMSAyKSIvPgogICAgPC9nPgo8L3N2Zz4K);
    }
    .delete {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNC4wMDYiIHZpZXdCb3g9IjAgMCAyNCAyNC4wMDYiPgogICAgPGc+CiAgICAgICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwNjE3IDE3OTg2YTMuMDA5IDMuMDA5IDAgMCAxLTMtM3YtMTVoLS45YTEgMSAwIDEgMSAwLTJoMTIuOXYtMWExIDEgMCAwIDAtMS0xaC00YTEgMSAwIDAgMC0xIDF2MWgtMnYtMWEzIDMgMCAwIDEgMy0zaDRhMyAzIDAgMCAxIDMgM3YxaC0yIDYuOWExIDEgMCAxIDEgMCAyaC0uOXYxNWEzLjAwNyAzLjAwNyAwIDAgMS0zIDN6bS0xLTNhMSAxIDAgMCAwIDEgMWgxMmExIDEgMCAwIDAgMS0xdi0xNWgtMTR6bTgtM3YtOGExIDEgMCAxIDEgMiAwdjhhMSAxIDAgMSAxLTIgMHptLTQgMHYtOGExIDEgMCAwIDEgMiAwdjhhMSAxIDAgMCAxLTIgMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5IDEuMDA0KSB0cmFuc2xhdGUoLTEwNjQwIC0xNzk2My4wMDIpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }
    .search {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19idGJfaW5xdWlyeV90ZXJfbWwiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLmNscy0ze2ZpbGw6I2ZmZn0KICAgICAgICA8L3N0eWxlPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImljIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyOSAxKSI+CiAgICAgICAgPHBhdGggaWQ9Iuu5vOq4sCIgZD0iTTYzMDkgMTkzNDFoLTdhMy4wMDUgMy4wMDUgMCAwIDEtMy0zdi0xNmEzIDMgMCAwIDEgMy0yLjk5NGgxNmEzIDMgMCAwIDEgMyAyLjk5NHY3aC0ydi03YTEgMSAwIDAgMC0xLTFoLTE2YTEgMSAwIDAgMC0xIDF2MTZhMSAxIDAgMCAwIDEgMWg3djJ6IiBjbGFzcz0iY2xzLTMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MzI3IC0xOTMxOSkiLz4KICAgICAgICA8cGF0aCBpZD0i7ZWp7LmY6riwIiBkPSJNOC4yNzIgOS42ODVMNi44OTQgOC4zMDlhNC41IDQuNSAwIDEgMSAxLjQxNS0xLjQxNWwxLjM3NyAxLjM3N2ExIDEgMCAxIDEtMS40MTQgMS40MTR6TTIgNC41QTIuNSAyLjUgMCAxIDAgNC41IDIgMi41IDIuNSAwIDAgMCAyIDQuNXoiIGNsYXNzPSJjbHMtMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3IDExKSIvPgogICAgPC9nPgo8L3N2Zz4K);
    }
    .add {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19idGJfYWRkX3Rlcl9tbCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTN7ZmlsbDojZmZmfQogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iaWMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI5IDEpIj4KICAgICAgICA8cGF0aCBpZD0i7KCV7IKs6rCB7ZiVIiBkPSJNOTAzMSAxOTczOGgtMTZhMy4wMDYgMy4wMDYgMCAwIDEtMy0zdi0xNmEzIDMgMCAwIDEgMy0zaDE2YTMgMyAwIDAgMSAzIDN2MTZhMyAzIDAgMCAxLTMgM3ptLTE2LTIwYTEgMSAwIDAgMC0xIDF2MTZhMSAxIDAgMCAwIDEgMWgxNmExIDEgMCAwIDAgMS0xdi0xNmExIDEgMCAwIDAtMS0xeiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTA0MCAtMTk3MTYpIi8+CiAgICAgICAgPHBhdGggaWQ9Iu2Vqey5mOq4sCIgZD0iTTYzODQgMTkzNzB2LTNoLTNhMSAxIDAgMSAxIDAtMmgzdi0zYTEgMSAwIDAgMSAyIDB2M2gzYTEgMSAwIDEgMSAwIDJoLTN2M2ExIDEgMCAxIDEtMiAweiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjQwMiAtMTkzNTUpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }
    .more {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19idGJfbW9yZV90ZXJfbWwiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLmNscy0ze2ZpbGw6I2ZmZn0KICAgICAgICA8L3N0eWxlPgogICAgPC9kZWZzPgogICAgPGcgaWQ9ImljIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NTYxIDE5MjgxKSI+CiAgICAgICAgPGNpcmNsZSBpZD0i7YOA7JuQXzEiIGN4PSIyIiBjeT0iMiIgcj0iMiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU1MSAtMTkyODApIi8+CiAgICAgICAgPGNpcmNsZSBpZD0i7YOA7JuQXzIiIGN4PSIyIiBjeT0iMiIgcj0iMiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU1MSAtMTkyNzEpIi8+CiAgICAgICAgPGNpcmNsZSBpZD0i7YOA7JuQXzMiIGN4PSIyIiBjeT0iMiIgcj0iMiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjU1MSAtMTkyNjIpIi8+CiAgICA8L2c+Cjwvc3ZnPgo=);
    }

    .info:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJpY19jaXJfaW5mb190ZXJfbWQiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxkZWZzPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0ibGluZWFyLWdyYWRpZW50IiB4Mj0iMSIgeTI9IjEiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYjY3NGZmIi8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzEyNjFmZiIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuY2xzLTN7ZmlsbDojZmZmfQogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0iaWMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPgogICAgICAgIDxwYXRoIGlkPSJQYXRoIiBkPSJNMTEgMjJhMTEgMTEgMCAxIDEgMTEtMTEgMTEuMDEyIDExLjAxMiAwIDAgMS0xMSAxMXptMC0yMGE5IDkgMCAxIDAgOSA5IDkuMDEgOS4wMSAwIDAgMC05LTl6IiBjbGFzcz0iY2xzLTMiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aC0yIiBkPSJNMSAwYTEgMSAwIDAgMC0xIDF2NGExIDEgMCAwIDAgMiAwVjFhMSAxIDAgMCAwLTEtMSIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkiLz4KICAgICAgICA8cGF0aCBpZD0iUGF0aC0zIiBkPSJNMS41Ni4xNzFhMS42MTggMS42MTggMCAwIDAtLjE4LS4xIDEuMjA5IDEuMjA5IDAgMCAwLS4xOC0uMDUgMS4wMTggMS4wMTggMCAwIDAtLjkxLjI3QTEuMDUyIDEuMDUyIDAgMCAwIDAgMWExLjA1MiAxLjA1MiAwIDAgMCAuMjkuNzFBMS4wNTIgMS4wNTIgMCAwIDAgMSAyYTEuNSAxLjUgMCAwIDAgLjItLjAyLjYzNi42MzYgMCAwIDAgLjE4LS4wNi43NTcuNzU3IDAgMCAwIC4xOC0uMDlsLjE1LS4xMmExLjE1NSAxLjE1NSAwIDAgMCAuMjEtLjMzQS44MzguODM4IDAgMCAwIDIgMWExLjAzMyAxLjAzMyAwIDAgMC0uMjktLjcxLjc4OS43ODkgMCAwIDAtLjE1LS4xMiIgY2xhc3M9ImNscy0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCA2LjAwMikiLz4KICAgIDwvZz4KPC9zdmc+Cg==);
    }
    .share:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMzEyNiAxNDQ2OGEzLjk3OSAzLjk3OSAwIDAgMSAuMTU3LTEuMTExbC01LjMxNS0zLjA3MWE0IDQgMCAxIDEtLjA0NS01LjY3NWw1LjM0NS0zLjA4NmE0LjAxIDQuMDEgMCAxIDEgMSAxLjczNWwtNS4zIDMuMDZhNCA0IDAgMCAxIC4wMTggMi4yNGw1LjMyNyAzLjA3N2E0IDQgMCAxIDEtMS4xODcgMi44MzF6bTIgMGEyIDIgMCAxIDAgMi0yIDIgMiAwIDAgMC0yIDJ6bS0xMi03YTIgMiAwIDEgMCAyLTIgMi4wMDYgMi4wMDYgMCAwIDAtMiAyem0xMi03YTIgMiAwIDEgMCAyLTIgMi4wMDYgMi4wMDYgMCAwIDAtMiAyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkgMSkgdHJhbnNsYXRlKC0xMzE0MS4wMDMgLTE0NDQ5Ljk5OCkiLz4KICAgIDwvZz4KPC9zdmc+Cg==);
    }
    .print:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnPgogICAgICAgIDxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xMzE5MyAxNDQ3MmExIDEgMCAwIDEtMS0xdi0zaC0xYTMgMyAwIDAgMS0zLTN2LTVhMyAzIDAgMCAxIDMtM2gxdi02YTEgMSAwIDAgMSAxLTFoMTJhMSAxIDAgMCAxIDEgMXY2aDFhMyAzIDAgMCAxIDMgM3Y1YTMuMDA1IDMuMDA1IDAgMCAxLTMgM2gtMXYzYTEgMSAwIDAgMS0xIDF6bTEtMi4xMjVoMTBWMTQ0NjQuMjQ5aC0xMHptMTMtMy44NzlhMSAxIDAgMCAwIDEtMXYtNWExIDEgMCAwIDAtMS0xaC0xNmExIDEgMCAwIDAtMSAxdjVhMSAxIDAgMCAwIDEgMWgxdi0zYTEgMSAwIDAgMSAxLTFoMTJhMSAxIDAgMCAxIDEgMXYzem0tMTMtOS4xMmgxMHYtNC42MjdoLTEweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkgMSkgdHJhbnNsYXRlKC0xMzIxNi4wMDIgLTE0NDQ5Ljk5OCkiLz4KICAgIDwvZz4KPC9zdmc+Cg==);
    }
  `;

  // 우측 버튼은 Area Active 에 따라 변경
  // 좌측 더보기 버튼은 페이지 단위로 변경

  @query('.sub-buttons')
  subButtons: HTMLElement;

  /**
   * main/ButtonTabBar 에서 setAttribute 로 show 할 버튼 리스트 제공
   */
  @internalProperty()
  mainButtonSet: MainButtonSet | undefined;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    dews.app.main.onFocusChanged = (arg: FocusChangedEventArgs) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.mainButtonSet = arg.focusTarget?._mainButtonSet;
    };
  }

  private clickMoreButton() {
    this.subButtons.classList.toggle('active');
  }

  render() {
    const mainButtonTag = (type: string, title: string): TemplateResult => {
      if (this.mainButtonSet) {
        if (this.mainButtonSet[type]._hidden) {
          return html``;
        } else {
          return html`
            <li class="main-button">
              <button
                class=${type}
                ?disabled=${this.mainButtonSet[type]?.disabled}
                @click="${() => this.mainButtonSet[type]?.click()}"
              >
                ${title}
              </button>
            </li>
          `;
        }
      } else {
        return html``;
      }
    };

    return html`
      <div class="bottom">
        <div class="button-tab-bar">
          <ul class="tab-bar">
            ${mainButtonTag('save', '저장')} ${mainButtonTag('delete', '삭제')} ${mainButtonTag('search', '검색')}
            ${mainButtonTag('add', '추가')}

            <li class="main-button">
              <button class="more" @click="${this.clickMoreButton}">더보기</button>

              <div class="sub-buttons">
                <ul>
                  <!-- 임시 내용 -->
                  <li class="sub-button"><button class="info">메뉴정보</button></li>
                  <li class="sub-button"><button class="share">공유하기</button></li>
                  <li class="sub-button"><button class="print">인쇄하기</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}
