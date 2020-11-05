import { MainEnvironment } from '../env/MainEnvironment.js';
import { PageHistoryManager } from './PageHistoryManager.js';
import { FocusManager } from './FocusManager.js';
import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';
import { ContentsManager } from './ContentsManager.js';
import { MainInterface } from './MainInterface.js';
import { EnvironmentService } from '../env/EnvironmentService.js';
import { css, customElement, html, LitElement, property } from 'lit-element';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { PageLoadingEventArgs } from './PageLoadingEventArgs.js';
import { FocusChangingEventArgs } from './FocusChangingEventArgs.js';
import { FocusChangedEventArgs } from './FocusChangedEventArgs.js';
import { HistoryBackEventArgs } from './HistoryBackEventArgs.js';
import { ScrollManager } from './ScrollManager.js';
import { AreaChangedEventArgs } from './AreaChangedEventArgs.js';

/**
 * Main System 호출 전 필요한 세팅 작업
 */
@customElement('main-page')
export class Main extends LitElement implements MainInterface {
  @property({ reflect: true })
  id = 'main';

  // @property({ attribute: 'show-header' })
  // showHeader: boolean = true;

  private $app: HTMLElement | null;
  private pageHistoryManager: PageHistoryManager;
  private focusManager: FocusManager;
  // private contentsManager: ContentsManager;
  private scrollManager: ScrollManager;
  private envService: EnvironmentService;

  constructor() {
    super();
    this.$app = document.getElementById('app');
    this.pageHistoryManager = new PageHistoryManager();
    this.focusManager = new FocusManager();
    // this.contentsManager = new ContentsManager();
    this.scrollManager = new ScrollManager();
    this.envService = new EnvironmentService();
  }

  set onMainLoadComplete(handler: () => void) {
    this.addEventListener('mainLoadComplete', handler);
  }

  set onPageUpdateComplete(handler: () => void) {
    this.addEventListener('pageUpdateComplete', handler);
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

  set onFocusChanging(handler: (e: FocusChangingEventArgs) => void) {
    this.addEventListener('focusChanging', handler);
  }

  set onFocusChanged(handler: (e: FocusChangedEventArgs) => void) {
    this.addEventListener('focusChanged', handler);
  }

  set onAreaChanged(handler: (e: AreaChangedEventArgs) => void) {
    this.addEventListener('areaChanged', handler);
  }

  // 시작점
  async start(): Promise<void> {
    await this.init();
    await this.loadMain();
    // if (this.getAuthorization()) {
    // } else {
    //   // App 에서는 임의로 url 입력 후 접속하는 경우
    // }
  }

  async init(): Promise<void> {
    // global variable, event 등록
  }

  private async loadMain() {
    const data = await Promise.all([this.envService.getEnvironment()]);
    const mainEnv: MainEnvironment = data[0] as MainEnvironment;

    // this.envService.getEnvironment();
    // await Promise.all([this.envService.getEnvironment()])
    // .then(env => {
    //   mainEnv = env[0] as MainEnvironment;
    // })
    // .finally(() => {
    this.$app.append(this);
    // main page 가 랜더링 완료되고 나서 진
    this.onMainLoadComplete = async () => {
      console.log('main load complete');
      if (mainEnv.initMenu) {
        const initMenu = mainEnv.initMenu;
        await this.loadPage(initMenu.modules, initMenu.menuId);
      }
    };
    // });
  }

  public async loadPage(modules: string, menuId: string, options?: object) {
    // todo: change full url
    import(`../pages/${modules}/${menuId}/${menuId}.js`)
      .then(async pageClass => {
        if (!customElements.get(`erp10-${menuId.toLowerCase()}`)) {
          customElements.define(`erp10-${menuId.toLowerCase()}`, pageClass.default);
        }
        const page: DewsPageBase = new pageClass.default() as DewsPageBase;

        const pageLoadingEvent = new PageLoadingEventArgs('pageLoading', { bubbles: true, composed: true });
        this.dispatchEvent(pageLoadingEvent);

        // page event
        await page.onInit();

        const tag = `erp10-${menuId.toLowerCase()}`;
        const contents = document.getElementById('main').shadowRoot.querySelector('#contents');
        contents.appendChild(page);
        contents.getElementsByTagName(tag)[0].setAttribute('id', tag);

        this.onPageUpdateComplete = () => {
          const pageLoadedEvent = new PageLoadedEventArgs(`pageLoaded`, {
            bubbles: true,
            composed: true,
          });
          pageLoadedEvent.openPage = page;
          pageLoadedEvent.modules = modules;
          pageLoadedEvent.menuId = menuId;
          pageLoadedEvent.tag = tag;

          this.dispatchEvent(pageLoadedEvent);
        };
      })
      .catch(error => {
        console.log(error);
      });
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.focusManager.init();
    this.pageHistoryManager.init();
    this.scrollManager.init();
    // mainLoadComplete
    this.dispatchEvent(new CustomEvent('mainLoadComplete', { bubbles: true, composed: true }));
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
      margin: 53px 0 0;
      padding-top: 12px;
      background-color: #efeff4;
    }
    .footer {
      position: relative;
      height: calc(100vh - 53px);
      background-color: #efeff4;
    }
    .footer img {
      display: block;
      margin: 0 auto;
      padding-top: 48px;
    }
    @media screen and (min-width: 1024px) {
      .footer {
        height: 56px;
      }
      .footer img {
        display: none;
      }
    }
  `;
  render() {
    return html`
      <main-header></main-header>
      <div id="contents"></div>
      <div class="footer">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJsb2dvX2VycF9wcmkiIHdpZHRoPSI2NyIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDY3IDE5Ij4KICAgIDxkZWZzPgogICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgLmNscy0ye2ZpbGw6cmdiYSg2MCw2MCw2NywuMyl9CiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KICAgIDxwYXRoIGlkPSJhcmVhIiBmaWxsPSJyZ2JhKDYwLDYwLDY3LDAuMykiIGQ9Ik0wIDBINjdWMTlIMHoiIG9wYWNpdHk9IjAuMDAzIi8+CiAgICA8ZyBpZD0iXzEwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjQ2NyAxLjgwOSkiPgogICAgICAgIDxnIGlkPSLqt7jro7lfMTExMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAuMjg5KSI+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MCIgZD0iTTEzMC42MDcgMjguODIyaC01LjcxNGExLjE1NCAxLjE1NCAwIDAgMC0xLjE0NiAxLjE2MVY0Mi45YTEuMTQ3IDEuMTQ3IDAgMSAwIDIuMjkzIDB2LTVoNC41NjhhNC41MzggNC41MzggMCAwIDAgMC05LjA3NXptMCA2Ljc1MmgtNC41Njd2LTQuNDNoNC41NjhhMi4yMTUgMi4yMTUgMCAwIDEgMCA0LjQzeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTkuMDc1IC0yOC44MjIpIi8+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MSIgZD0iTTM3Ljk1MiA0MS43MzdoLTYuNDQ1di00LjRoNS4zNzRhMS4xNjIgMS4xNjIgMCAwIDAgMC0yLjMyM2gtNS4zNzR2LTMuODdoNi4wNjZhMS4xNjEgMS4xNjEgMCAwIDAgMC0yLjMyMmgtNy4yMTJhMS4xNTQgMS4xNTQgMCAwIDAtMS4xNDcgMS4xNjFWNDIuOWExLjE1NCAxLjE1NCAwIDAgMCAxLjE0NyAxLjE2MWg3LjU5MmExLjE2MSAxLjE2MSAwIDAgMCAwLTIuMzIyeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjkuMjE0IC0yOC44MjIpIi8+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MiIgZD0iTTgxLjE2NSAzNy43MThhNC41NDQgNC41NDQgMCAwIDAtMS4yNDUtOC45aC01LjcxM2ExLjE1MyAxLjE1MyAwIDAgMC0xLjE0NiAxLjE2MVY0Mi45YTEuMTQ3IDEuMTQ3IDAgMSAwIDIuMjkzIDB2LTVoMy4xNjFsMy43ODUgNS42NWExLjEzNyAxLjEzNyAwIDAgMCAxLjU5Mi4zMDkgMS4xNyAxLjE3IDAgMCAwIC4zMDUtMS42MTN6bS01LjgxMi02LjU3NGg0LjU2N2EyLjIxNSAyLjIxNSAwIDAgMSAwIDQuNDNoLTQuNTY3eiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjEuNjE3IC0yOC44MjIpIi8+CiAgICAgICAgPC9nPgogICAgICAgIDxnIGlkPSLqt7jro7lfMTExMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkuNzc0KSI+CiAgICAgICAgICAgIDxwYXRoIGlkPSLtjKjsiqRfNDQ5MyIgZD0iTTE4OS44MTYgNDNhMS4wNTEgMS4wNTEgMCAwIDAtMS4wNDYtMS4wNThoLTEuNTI0VjI5Ljg4YTEuMDUgMS4wNSAwIDAgMC0xLjA0NC0xLjA1OGgtMi45NzJhMS4wNTggMS4wNTggMCAwIDAgMCAyLjExNWgxLjM1M3YxMS4wMDZoLTEuOTIzYTEuMDU4IDEuMDU4IDAgMCAwIDAgMi4xMTZoNi4xMUExLjA1MSAxLjA1MSAwIDAgMCAxODkuODE2IDQzeiIgY2xhc3M9ImNscy0yIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgxLjYxNiAtMjguNTMzKSIvPgogICAgICAgICAgICA8cGF0aCBpZD0i7Yyo7IqkXzQ0OTQiIGQ9Ik0yMTkuODI2IDI3LjcyOWMtMi44MTcgMC00Ljc4NSAxLjgyOS00Ljc4NSA0LjQ0OFYzOS4xYzAgMi42MyAxLjk2NyA0LjQ2NyA0Ljc4NSA0LjQ2N3M0Ljc4NS0xLjgzNyA0Ljc4NS00LjQ2N3YtNi45MjNjLS4wMDEtMi42MTktMS45NjgtNC40NDgtNC43ODUtNC40NDh6bTIuMDkyIDExLjA4MmMwIDEuNDY4LS43ODIgMi4zNDQtMi4wOTIgMi4zNDRzLTIuMDkzLS44NzYtMi4wOTMtMi4zNDR2LTYuMzQ4YTIuMSAyLjEgMCAxIDEgNC4xODUgMHoiIGNsYXNzPSJjbHMtMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNi4zMTggLTI3LjcyOSkiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo="
          alt="erp10"
        />
      </div>
      <main-bottom></main-bottom>
    `;
  }
}
