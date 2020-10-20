import { DewsPageBase } from '../core/baseclass/DewsPageBase.js';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';

export class PageModule {
  page: DewsPageBase;
  modules: string;
  menuId: string;
  url?: string;

  constructor(page: DewsPageBase, modules: string, menuId: string, url?: string) {
    this.page = page;
    this.modules = modules;
    this.menuId = menuId;
    this.url = url || '';
  }
}
// 페이지의 최상위 체크
// 현재 페이지 기준으로 이전 페이지
// historyBack 이벤트에 대한 처리
//

export class PageHistoryManager {
  public history: PageModule[];

  constructor() {
    this.history = [];

    dews.app.main.onPageLoaded = (arg: PageLoadedEventArgs) => {
      if (!arg.cancelable) {
        // new PageModule(...arg);
        // arg.openPage;
      } else {
        arg.preventDefault();
      }
    };

    // window.addEventListener('onHistoryBack', e => {
    //   console.log(`history back`);
    //   // history manager
    //   this.removeLatestPageHistory();
    // });
  }

  public setPageHistory(pageModule: PageModule) {
    console.log(`${pageModule.modules} // ${pageModule.menuId} `);
    this.history.push(pageModule);
    this.hideOtherPages(pageModule);
  }

  public removeLatestPageHistory() {
    console.log(`Page History Manager removeLatestPageHistory()`);
    this.history.pop();
    this.showLastPage();
  }

  private hideOtherPages(pageModule: PageModule) {
    this.history.filter(page => {
      if (page !== pageModule) {
        const hideTarget = `page-${page.menuId.toLowerCase()}`;
        // this.$contents?.querySelector(`#${hideTarget}`).setAttribute('display', 'page-hide');
      }
    });
  }

  private showLastPage() {
    const lastPage = this.history.slice(-1)[0];
    if (lastPage) {
      const showTarget = `page-${lastPage.menuId.toLowerCase()}`;
      // this.$contents?.querySelector(`#${showTarget}`).setAttribute('display', 'page-show');
    }
  }

  // public getHistoryList() {}
}
