import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { DewsPageBase } from './base/exports.js';
import { singleton } from 'tsyringe';

export class PageModule {
  constructor(public page: DewsPageBase, public pageId: string, public tag: string, public url?: string) {}
}

@singleton()
export class PageHistoryManager {
  private contents: Element | null | undefined;
  private history: PageModule[] = [];

  public setContentsElement(contents: Element) {
    this.contents = contents.shadowRoot!.querySelector('#contents');
  }

  public findPage(pageId: string): PageModule {
    return this.history.filter(item => item.pageId === pageId)[0];
  }

  // 새로운 페이지가 열리면 맵에 등록
  public addPage(arg: PageLoadedEventArgs) {
    if (!arg.cancelable) {
      this.setPageHistory(arg);
    } else {
      arg.preventDefault();
    }
  }

  public moveBackPage(e: Event) {
    // historyBack click 이벤트에 대한 처리
    if (!e.cancelable) {
      // history back Event 발생 전에 처리해야 할 이벤트 추가 해야 함
      console.log(e);
      this.removeLatestPageHistory();
    } else {
      e.preventDefault();
    }
  }

  // 현재 페이지
  get currentPage(): PageModule | null {
    return this.history.length > 0 ? this.history.slice(-1)[0] : null;
  }

  private setPageHistory(arg: PageLoadedEventArgs) {
    if (arg.openPage && arg.pageId && arg.tag) {
      const pageModule = new PageModule(arg.openPage, arg.pageId, arg.tag);
      if (this.history.length > 0) {
        const lastPage = this.history.slice(-1)[0];
        if (lastPage.page !== arg.openPage) {
          this.hideOtherPages(pageModule);
          this.history.push(pageModule);
        }
      } else {
        this.history.push(pageModule);
      }
    }
  }

  // DOM 에서도 요소 제거 필요
  // 마지막 남은 요소인지도 판별
  public removeLatestPageHistory() {
    const removePageModule = this.history.pop();

    if (this.history.length >= 1) {
      const removeChild = this.contents?.querySelector(`${removePageModule?.tag}`);
      this.contents?.removeChild(removeChild!);
      this.showPage();
    } else {
      // 뒤로 갈 페이지가 없을 경우 App 으로 돌아가기 필요
    }
  }

  // Contents 요소 숨김 처리 클래스
  private hideOtherPages(pageModule: PageModule) {
    this.history.filter(page => {
      if (page !== pageModule) {
        const target = `erp10-${page.pageId.toLowerCase()}`;
        this.contents?.querySelector(`#${target}`)?.setAttribute('class', 'page-hide');
      }
    });
  }

  public showPage(pageModule?: PageModule) {
    let openedPage: PageModule = this.history.slice(-1)[0];
    // 열려있는 페이지를 다시 열 때
    if (pageModule) {
      // 히스토리 제일 위로 이동
      this.history = this.history.filter(item => item !== pageModule);
      this.history.push(pageModule);
      openedPage = pageModule;
      // 나머지 페이지 숨기도록
      this.hideOtherPages(openedPage);
    }

    if (openedPage) {
      const showTarget = `erp10-${openedPage.pageId.toLowerCase()}`;
      this.contents?.querySelector(`#${showTarget}`)?.setAttribute('class', 'page-show');
      this.dispatchPageLoadedEvent(openedPage, pageModule);
    }
  }

  private dispatchPageLoadedEvent(lastPage: PageModule, page?: PageModule) {
    const pageLoadedEvent = new PageLoadedEventArgs(`pageLoaded`, {
      bubbles: true,
      composed: true
    });
    pageLoadedEvent.openPage = lastPage.page;
    pageLoadedEvent.pageId = lastPage.pageId;
    pageLoadedEvent.tag = lastPage.tag;
    pageLoadedEvent.opened = !!page;

    document.getElementsByTagName('dews-mobile-app')[0]!.dispatchEvent(pageLoadedEvent);
  }
}
