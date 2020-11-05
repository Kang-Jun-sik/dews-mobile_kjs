import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { HistoryBackEventArgs } from './HistoryBackEventArgs.js';

export class PageModule {
  page: DewsPageBase;
  modules: string;
  menuId: string;
  tag: string;
  url?: string;

  constructor(page: DewsPageBase, modules: string, menuId: string, tag: string, url?: string) {
    this.page = page;
    this.modules = modules;
    this.menuId = menuId;
    this.tag = tag;
    this.url = url || '';
  }
}

export class PageHistoryManager {
  private history: PageModule[] = [];
  private mainShadowRoot: ShadowRoot;
  constructor() {}

  public init() {
    this.mainShadowRoot = document.getElementById('main').shadowRoot;

    dews.app.main.onPageLoaded = (arg: PageLoadedEventArgs) => {
      console.log('pageHistoryManager');
      if (!arg.cancelable) {
        console.log(arg);
        this.setPageHistory(new PageModule(arg.openPage, arg.modules, arg.menuId, arg.tag));
      } else {
        arg.preventDefault();
      }
    };

    // historyBack click 이벤트에 대한 처리
    dews.app.main.onHistoryBack = (arg: HistoryBackEventArgs) => {
      if (!arg.cancelable) {
        // history back Event 발생 전에 처리해야 할 이벤트 추가 해야 함
        console.log(arg);
        this.removeLatestPageHistory();
      } else {
        arg.preventDefault();
      }
    };
  }

  // 현재 페이지
  get currentPage(): PageModule {
    return this.history.length > 0 ? this.history.slice(-1)[0] : null;
  }
  // 현재 페이지 기준으로 이전 페이지

  public setPageHistory(pageModule: PageModule) {
    console.log(`${pageModule.modules} // ${pageModule.menuId} `);
    this.history.push(pageModule);
    this.hideOtherPages(pageModule);
  }

  // DOM 에서도 요소 제거 필요
  // 마지막 남은 요소인지도 판별
  public removeLatestPageHistory() {
    console.log(`Page History Manager removeLatestPageHistory()`);
    const removePageModule = this.history.pop();
    if (this.history.length > 0) {
      const removeChild = this.mainShadowRoot.querySelector(`${removePageModule.tag}`);
      this.mainShadowRoot.querySelector('#contents').removeChild(removeChild);
      this.showLastPage();
    } else {
      // App 으로 돌아가기 필요
    }
  }

  // Contents 요소 숨김 처리 클래스
  private hideOtherPages(pageModule: PageModule) {
    this.history.filter(page => {
      if (page !== pageModule) {
        const hideTarget = `erp10-${page.menuId.toLowerCase()}`;
        this.mainShadowRoot.querySelector(`#${hideTarget}`).setAttribute('class', 'page-hide');
      }
    });
  }

  private showLastPage() {
    const lastPage = this.history.slice(-1)[0];
    if (lastPage) {
      const showTarget = `erp10-${lastPage.menuId.toLowerCase()}`;
      this.mainShadowRoot.querySelector(`#${showTarget}`).setAttribute('class', 'page-show');
    }
  }
}
