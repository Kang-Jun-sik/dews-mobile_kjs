import { css, customElement, html, property } from 'lit-element';
import { DewsComponent } from '../../core/baseclass/DewsComponent.js';

@customElement('main-header')
export class NavigationBar extends DewsComponent {
  static styles = css`
    header {
      position: fixed;
      width: 100%;
      height: 45px;
      top: 0;
      border-bottom: 2px solid #436bc7;
      background-color: #1c90fb;
      z-index: 10;
      transition: 0.5s;
    }

    header button.btn-back:before {
      content: '';
      display: block;
      width: 45px;
      height: 45px;
      background: transparent
        url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjQsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIxN3B4Ig0KCSBoZWlnaHQ9IjE3cHgiIHZpZXdCb3g9IjAgMCAxNyAxNyIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTcgMTciIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IndoaXRlX2JnIiBkaXNwbGF5PSJub25lIj4NCgk8cmVjdCB4PSItMjIyIiBkaXNwbGF5PSJpbmxpbmUiIHdpZHRoPSI0NjIiIGhlaWdodD0iMTciLz4NCjwvZz4NCjxnIGlkPSJibGFjayI+DQoJPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMy41NTYsOS44NTJMOSwxNEg4TDMuNDQ0LDkuODUybDAuNjczLTAuNzRMOCwxMi42NDRWM2gxdjkuNjQ0DQoJCWwzLjg4My0zLjUzMkwxMy41NTYsOS44NTJ6Ii8+DQo8L2c+DQo8ZyBpZD0id2hpdGUiPg0KPC9nPg0KPGcgaWQ9InRleHQiPg0KPC9nPg0KPC9zdmc+DQo=)
        no-repeat 50%;
      transform: rotate(90deg);
    }

    header button.btn-back {
      width: 45px;
      height: 45px;
    }
    button {
      background-color: transparent;
      border: 0;
    }

    header h2.title {
      position: fixed;
      top: 0;
      left: 45px;
      width: calc(100% - 90px);
      height: 45px;
      line-height: 45px;
      background-color: transparent;
      text-align: left;
      color: #ffffff;
      font-size: 20px;
      z-index: 11;
      margin: 5px;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('onFocusedAreaChanged', e => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const target = e.detail?.$target;
      this.title = target?.title || '';
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  @property({ reflect: true })
  title: string = 'init';

  private historyBack() {
    console.log(`click historyBack`);
    this.dispatchEvent(new CustomEvent('historyBack', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <header>
        <button class="btn-back" @click="${this.historyBack}"></button>
        <h2 class="title">${this.title}</h2>
      </header>
    `;
  }
}
