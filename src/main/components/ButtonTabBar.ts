import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { css, customElement, html, property } from 'lit-element';

@customElement('main-bottom')
export class ButtonTabBar extends DewsLayoutComponent {
  static styles = css`
    nav#bottom {
      position: fixed;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 50px;
      display: flex;
      background-color: #022f6f;
      align-items: center;
      text-align: center;
    }

    nav#bottom button {
      position: relative;
      flex: 1;
      height: 100%;
      color: transparent;
    }
    button {
      background-color: transparent;
      border: 0;
    }

    nav#bottom button.more:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZmZmZmZmOwogICAgICAgIGZpbGwtcnVsZTogZXZlbm9kZDsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPHBhdGggaWQ9IuygleuztCIgY2xhc3M9ImNscy0xIiBkPSJNNzQ0LDE0MGE5LDksMCwxLDEtOSw5QTksOSwwLDAsMSw3NDQsMTQwWm0xLjUsMTNoLTNhMC41LDAuNSwwLDAsMSwwLTFINzQzdi00aC0wLjVhMC41LDAuNSwwLDAsMSwwLTFINzQ1djVoMC41QTAuNSwwLjUsMCwwLDEsNzQ1LjUsMTUzWm0tMS41LTdhMSwxLDAsMSwxLDEtMUExLDEsMCwwLDEsNzQ0LDE0NloiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MzUgLTE0MCkiLz4KPC9zdmc+Cg==);
    }
    nav#bottom button.add:before {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxnPgoJCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjRkZGRkZGIiBkPSJNMjMsN0g4QzcuMzU2LDcsNyw3LjM1MSw3LDhjMCwwLDAsMTQuNDQsMCwxNQoJCQljMC4wMzgsMC4wMzgsMC4yODcsMC44MTMsMSwxaDE1YzAuNjQ0LDAsMS0wLjM1MSwxLTFWOEMyNCw3LjM1MSwyMy42NDQsNywyMyw3eiBNMjAsMTZoLTR2NGgtMXYtNGgtNHYtMWg0di00aDF2NGg0VjE2eiIvPgoJPC9nPgo8L2c+Cjwvc3ZnPgo=);
    }
    nav#bottom button.search:before {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0ZGRkZGRiIgZD0iTTI2Ljc5NSwyNC40MDdsLTAuODI0LDAuODMybC0yLjkwNi0yLjk0MgoJYy0wLjg5NiwwLjcyNC0yLjAxOCwxLjE3NC0zLjI1NCwxLjE3NGMtMi44OTUsMC01LjI0My0yLjM3LTUuMjQzLTUuMjk0YzAtMi45MjQsMi4zNDgtNS4yOTQsNS4yNDMtNS4yOTQKCWMyLjg5NSwwLDUuMjQyLDIuMzcsNS4yNDIsNS4yOTRjMCwxLjI0OS0wLjQ0NywyLjM4My0xLjE2NCwzLjI4OEwyNi43OTUsMjQuNDA3eiBNMTkuODEsMTQuMDU5Yy0yLjI1MiwwLTQuMDc4LDEuODQ0LTQuMDc4LDQuMTE4CgljMCwyLjI3MywxLjgyNiw0LjExNyw0LjA3OCw0LjExN2MyLjI1MiwwLDQuMDc3LTEuODQ0LDQuMDc3LTQuMTE3QzIzLjg4OCwxNS45MDIsMjIuMDYyLDE0LjA1OSwxOS44MSwxNC4wNTl6IE0yMiw5SDEwdjEzaDQuMDM3CgljMC41MTcsMC44MDQsMS4yMDMsMS40NzksMi4wMTIsMS45ODlsLTcuMjA4LTAuMDFDOC4yNSwyNC4xNTcsOC4wMSwyMy42ODQsOCwyM1Y4YzAtMC42NDksMC4zNTYtMSwxLTFoMTRjMC42NDQsMCwxLDAuMzUxLDEsMQoJdjQuODI0Yy0wLjU3Ny0wLjU1NS0xLjI1LTEuMDEtMi0xLjMyMlY5eiIvPgo8L3N2Zz4K);
    }
    nav#bottom button.delete:before {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsPSIjRkZGRkZGIiBkPSJNMTksOVY3aC03djJIOHYxaDE1VjlIMTl6IE0xOCw5aC01VjhoNVY5eiIvPgoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNGRkZGRkYiIGQ9Ik05LDIxLjk3M0M5LDI0LjE2NywxMSwyNCwxMSwyNGg5YzAsMCwyLDAuMDExLDItMi4wMjdWMTFIOQoJCVYyMS45NzN6IE0xOCwxM2gxdjloLTFWMTN6IE0xNSwxM2gxdjloLTFWMTN6IE0xMiwxM2gxdjloLTFWMTN6Ii8+CjwvZz4KPC9zdmc+Cg==);
    }
    nav#bottom button.save:before {
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI0ZGRkZGRiIgZD0iTTIyLDI0SDEwYy0wLjY0NCwwLTIsMC0yLTJWMTBjMC0yLDEuMzU2LTIsMi0yaDF2NWgxMFY4aDEKCWMwLjY0NCwwLDIsMCwyLDJ2MTJDMjQsMjQsMjIuNjQ0LDI0LDIyLDI0eiBNMjEsMTZIMTF2NmgxMFYxNnogTTEyLDhoOHY0aC04Vjh6Ii8+Cjwvc3ZnPgo=);
    }
    nav#bottom button:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: 0;
      padding: 0;
      margin: calc(-32px / 2) 0 0 calc(-32px / 2);
      width: 32px;
      height: 32px;
      background: transparent no-repeat center;
    }
  `;

  private buttonMap: { [name: string]: string } = {
    more: '더보기',
    add: '추가',
    search: '조회',
    delete: '삭제',
    save: '저장',
  };

  /**
   * main/ButtonTabBar 에서 setAttribute 로 show 할 버튼 리스트 제공
   */
  @property({ attribute: 'button-set' })
  buttonSet = '[]';

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('onFocusedAreaChanged', e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const target = e.detail?.$target;
      this.buttonSet = target?.buttonSet || '[]';
    });
  }

  private getButtonTag(buttonType: string) {
    return html`<button class="${buttonType}" @click="${this.buttonClick}">${this.buttonMap[buttonType]}</button>`;
  }

  /**
   * Button 클릭 시 Main 으로 event emit
   * @param buttonType
   */
  private buttonClick(e: Event) {
    const buttonClass = (e.target as HTMLButtonElement).className;
    alert(`click button : ${buttonClass}`);

    this.dispatchEvent(
      new CustomEvent('clicked-button', { bubbles: true, composed: true, detail: { type: buttonClass } }),
    );
  }

  render() {
    const buttonSet = (JSON.parse(this.buttonSet) as Array<string>) ?? [];
    return html`
      <nav id="bottom">
        ${buttonSet.map(item => this.getButtonTag(item))}
        <!--        <button class="add">추가</button>-->
        <!--        <button class="search">조회</button>-->
        <!--        <button class="delete">삭제</button>-->
        <!--        <button class="save">저장</button>-->
      </nav>
    `;
  }
}
