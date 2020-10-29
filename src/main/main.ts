import { MainEnvironment, PagePath } from '../env/MainEnvironment.js';
import { PageHistoryManager } from './PageHistoryManager.js';
import { FocusManager } from './FocusManager.js';
import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';
import { ContentsManager } from './ContentsManager.js';
import { MainInterface } from './MainInterface.js';
import { EnvironmentService } from '../env/EnvironmentService.js';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { PageLoadingEventArgs } from './PageLoadingEventArgs.js';
import { HistoryBackEventArgs } from './HistoryBackEventArgs.js';

/**
 * Main System 호출 전 필요한 세팅 작업
 */
@customElement('main-page')
export class Main extends LitElement implements MainInterface {
  @property({ reflect: true })
  id = '';

  // @property({ attribute: 'show-header' })
  // showHeader: boolean = true;

  private $app: HTMLElement | null;
  private pageHistoryManager: PageHistoryManager;
  private focusManager: FocusManager;
  private contentsManager: ContentsManager;

  private envService: EnvironmentService;

  constructor() {
    super();
    this.$app = document.getElementById('app');
    this.pageHistoryManager = new PageHistoryManager();
    // this.focusManager = new FocusManager();
    // this.contentsManager = new ContentsManager();
    this.envService = new EnvironmentService();
  }

  set onPageLoaded(handler: (e: PageLoadedEventArgs) => void) {
    this.addEventListener('pageLoaded', handler);
  }

  set onPageLoading(handler: (e: PageLoadingEventArgs) => void) {
    this.addEventListener('pageLoading', handler);
  }

  set onHistoryBack(handler: (e: HistoryBackEventArgs) => void) {
    this.addEventListener('historyBack', handler);
  }

  // 시작점
  async start(): Promise<void> {
    await this.init();
    this.loadMain();
    // if (this.getAuthorization()) {
    // } else {
    //   // App 에서는 임의로 url 입력 후 접속하는 경우
    // }
  }

  async init(): Promise<void> {
    // global variable, event 등록
  }

  private loadMain() {
    let mainEnv: MainEnvironment;
    Promise.all([this.envService.getEnvironment()])
      .then(env => {
        mainEnv = env[0] as MainEnvironment;
      })
      .finally(() => {
        const mainContainer = document.createElement('main-page');
        mainContainer.setAttribute('id', 'main');
        this.$app.append(mainContainer);

        // this.focusManager.init();
        this.pageHistoryManager.init();

        if (mainEnv.initMenu) {
          const initMenu = mainEnv.initMenu;
          this.loadPage(initMenu.modules, initMenu.menuId);
        }
      });
  }

  public async loadPage(modules: string, menuId: string, options?: object) {
    // todo: change full url
    import(`../pages/${modules}/${menuId}/${menuId}.js`)
      .then(async pageClass => {
        if (!customElements.get(`erp10-${menuId.toLowerCase()}`)) {
          customElements.define(`erp10-${menuId.toLowerCase()}`, pageClass.default);
        }
        const page: DewsPageBase = new pageClass.default() as DewsPageBase;

        // main event
        const pageLoadingEvent = new PageLoadingEventArgs('pageLoading', { bubbles: true, composed: true });
        this.dispatchEvent(pageLoadingEvent);

        // page event
        await page.onInit();

        const tag = `erp10-${menuId.toLowerCase()}`;
        const createCustomTag = document.createElement(tag);
        createCustomTag.setAttribute('id', tag);
        document.getElementById('main').shadowRoot.querySelector('#contents').appendChild(createCustomTag);

        // main event
        const pageLoadedEvent = new PageLoadedEventArgs(`pageLoaded`, {
          bubbles: true,
          composed: true,
        });
        pageLoadedEvent.openPage = page;
        pageLoadedEvent.modules = modules;
        pageLoadedEvent.menuId = menuId;
        pageLoadedEvent.tag = tag;

        this.dispatchEvent(pageLoadedEvent);
      })
      .catch(error => {
        console.log(error);
      });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  static styles = css`
    .page-hide {
      display: none;
    }
    .page-show {
      display: block;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    #contents {
      position: relative;
      overflow: hidden;
      width: 100%;
      min-height: calc(100vh - 53px - 56px);
      margin: 53px 0 56px;
      padding-top: 12px;
      background-color: #efeff4;
    }
    #contents:after {
      content: '';
      display: block;
      width: 100%;
      height: calc(100vh - 53px - 56px);
      background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJsb2dvX2VycF9wcmkiIHdpZHRoPSI2NyIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDY3IDE5Ij4KICAgIDxkZWZzPgogICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLmNscy0ye2ZpbGw6cmdiYSg2MCw2MCw2NywuMyl9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGlkPSJhcmVhIiBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuMykiIGQ9Ik0wIDBINjdWMTlIMHoiIG9wYWNpdHk9IjAuMDAzIi8+CiAgICA8ZyBpZD0iXzEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjQ2NyAxLjgwOSkiPgogICAgICAgIDxnIGlkPSLqt7jro7lfMTExMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAuMjg5KSI+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MCIgZD0iTTEzMC42MDcgMjguODIyaC01LjcxNGExLjE1NCAxLjE1NCAwIDAgMC0xLjE0NiAxLjE2MVY0Mi45YTEuMTQ3IDEuMTQ3IDAgMSAwIDIuMjkzIDB2LTVoNC41NjhhNC41MzggNC41MzggMCAwIDAgMC05LjA3NXptMCA2Ljc1MmgtNC41Njd2LTQuNDNoNC41NjhhMi4yMTUgMi4yMTUgMCAwIDEgMCA0LjQzeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTkuMDc1IC0yOC44MjIpIi8+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MSIgZD0iTTM3Ljk1MiA0MS43MzdoLTYuNDQ1di00LjRoNS4zNzRhMS4xNjIgMS4xNjIgMCAwIDAgMC0yLjMyM2gtNS4zNzR2LTMuODdoNi4wNjZhMS4xNjEgMS4xNjEgMCAwIDAgMC0yLjMyMmgtNy4yMTJhMS4xNTQgMS4xNTQgMCAwIDAtMS4xNDcgMS4xNjFWNDIuOWExLjE1NCAxLjE1NCAwIDAgMCAxLjE0NyAxLjE2MWg3LjU5MmExLjE2MSAxLjE2MSAwIDAgMCAwLTIuMzIyeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjkuMjE0IC0yOC44MjIpIi8+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MiIgZD0iTTgxLjE2NSAzNy43MThhNC41NDQgNC41NDQgMCAwIDAtMS4yNDUtOC45aC01LjcxM2ExLjE1MyAxLjE1MyAwIDAgMC0xLjE0NiAxLjE2MVY0Mi45YTEuMTQ3IDEuMTQ3IDAgMSAwIDIuMjkzIDB2LTVoMy4xNjFsMy43ODUgNS42NWExLjEzNyAxLjEzNyAwIDAgMCAxLjU5Mi4zMDkgMS4xNyAxLjE3IDAgMCAwIC4zMDUtMS42MTN6bS01LjgxMi02LjU3NGg0LjU2N2EyLjIxNSAyLjIxNSAwIDAgMSAwIDQuNDNoLTQuNTY3eiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjEuNjE3IC0yOC44MjIpIi8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSLqt7jro7lfMTExMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkuNzc0KSI+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MyIgZD0iTTE4OS44MTYgNDNhMS4wNTEgMS4wNTEgMCAwIDAtMS4wNDYtMS4wNThoLTEuNTI0VjI5Ljg4YTEuMDUgMS4wNSAwIDAgMC0xLjA0NC0xLjA1OGgtMi45NzJhMS4wNTggMS4wNTggMCAwIDAgMCAyLjExNWgxLjM1M3YxMS4wMDZoLTEuOTIzYTEuMDU4IDEuMDU4IDAgMCAwIDAgMi4xMTZoNi4xMUExLjA1MSAxLjA1MSAwIDAgMCAxODkuODE2IDQzeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjYxNiAtMjguNTMzKSIvPgogICAgICAgICAgICA8cGF0aCBpZD0i7Yyo7IqkXzQ0OTQiIGQ9Ik0yMTkuODI2IDI3LjcyOWMtMi44MTcgMC00Ljc4NSAxLjgyOS00Ljc4NSA0LjQ0OFYzOS4xYzAgMi42MyAxLjk2NyA0LjQ2NyA0Ljc4NSA0LjQ2N3M0Ljc4NS0xLjgzNyA0Ljc4NS00LjQ2N3YtNi45MjNjLS4wMDEtMi42MTktMS45NjgtNC40NDgtNC43ODUtNC40NDh6bTIuMDkyIDExLjA4MmMwIDEuNDY4LS43ODIgMi4zNDQtMi4wOTIgMi4zNDRzLTIuMDkzLS44NzYtMi4wOTMtMi4zNDR2LTYuMzQ4YTIuMSAyLjEgMCAxIDEgNC4xODUgMHoiIGNsYXNzPSJjbHMtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNi4zMTggLTI3LjcyOSkiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=)
        no-repeat;
      background-position: center 30px;
    }
    @media screen and (min-width: 1024px) {
      #contents:after {
        display: none;
      }
    }
  `;
  render() {
    return html`
      <main-header></main-header>
      <div id="contents"></div>
      <main-bottom></main-bottom>
    `;
  }
}
