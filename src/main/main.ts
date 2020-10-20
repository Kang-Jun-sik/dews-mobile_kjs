import { MainEnvironment, PagePath } from '../env/MainEnvironment.js';
import { PageHistoryManager } from './PageHistoryManager.js';
import { FocusManager } from './FocusManager.js';
import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';
import { ContentsManager } from './ContentsManager.js';
import { MainInterface } from './MainInterface.js';
import { EnvironmentService } from '../env/EnvironmentService.js';
import { customElement, html, LitElement, property } from 'lit-element';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { PageLoadingEventArgs } from './PageLoadingEventArgs.js';

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
    // this.pageHistoryManager = new PageHistoryManager();
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

        if (mainEnv.initMenu) {
          const initMenu = mainEnv.initMenu;
          this.loadPage(initMenu.modules, initMenu.menuId);
        }
        // this.focusManager.init();
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
        this.dispatchEvent(pageLoadedEvent);
      })
      .catch(error => {
        console.log(error);
      });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <main-header></main-header>
      <div id="contents" style="height: 800px; overflow-y: scroll; margin-top: 45px;"></div>
      <main-bottom></main-bottom>
    `;
  }
}
