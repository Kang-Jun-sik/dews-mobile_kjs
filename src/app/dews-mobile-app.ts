import { customElement, html, internalProperty, LitElement } from 'lit-element';
import { ApplicationMainInterface } from './ApplicationMainInterface.js';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { MainHeader } from './main-header/main-header.js';
import { MainBottom } from './main-bottom/main-bottom.js';
import { container } from 'tsyringe';
import { ScrollManager } from './ScrollManager.js';
import { ScrollAreaChangedEventArgs } from './ScrollAreaChangedEventArgs.js';
import { FocusChangingEventArgs } from './FocusChangingEventArgs.js';
import { FocusManager } from './FocusManager.js';
import { FocusChangedEventArgs } from './FocusChangedEventArgs.js';
import { PageHistoryManager } from './PageHistoryManager.js';
import { DewsBizPage } from './base/DewsBizPage.js';
import { DewsPageBase } from './base/DewsPageBase.js';

@customElement('dews-mobile-app')
export class DewsMobileApp extends LitElement implements ApplicationMainInterface {
  @internalProperty()
  private showHeader = true;
  @internalProperty()
  private showBottom = true;
  @internalProperty()
  private pageId: string | undefined;

  private scrollManager: ScrollManager;
  private focusManager: FocusManager;
  private historyManager: PageHistoryManager;

  constructor() {
    super();
    this.scrollManager = container.resolve(ScrollManager);
    this.focusManager = container.resolve(FocusManager);
    this.historyManager = container.resolve(PageHistoryManager);
  }

  async connectedCallback() {
    this.pageId = location.hash.replace('#', '');

    window.addEventListener('hashchange', () => {
      console.log('location.hash', location.hash);
      this.openMenu(location.hash.replace('#', ''));
    });

    super.connectedCallback();
    await this.updateComplete;

    this.historyManager.setContentsElement(this.shadowRoot?.querySelector('main-content')!);

    const mainHeader = this.shadowRoot?.querySelector('main-header') as MainHeader;
    const mainBottom = this.shadowRoot?.querySelector('main-bottom') as MainBottom;

    // ???????????? ??? ?????? ??? ?????? ??????????????????
    this.addEventListener('pageLoaded', (e: Event) => {
      const args = e as PageLoadedEventArgs;

      location.hash = args.pageId!;

      if (args.openPage! instanceof DewsBizPage) {
        // ????????? ????????? ????????? ?????? ??????????????? ?????????
        mainHeader.init(args);
        mainBottom.init(args);
        // ????????? ????????? ?????????
        this.scrollManager.init(args);
      }

      // ???????????? ???????????? ????????? ??????????????? ??????
      if (!args.opened) {
        this.historyManager.addPage(args);
      }
    });

    // ????????? area??? ?????? ??? ???????????? ????????? ?????????
    this.addEventListener('scrollAreaChanged', (e: Event) => {
      const args = e as ScrollAreaChangedEventArgs;
      // ????????? ??????????????? ???????????? ??????
      mainHeader.setFocusedArea(args.current!);
    });

    this.addEventListener('focusChanging', (e: Event) => {
      const args = e as FocusChangingEventArgs;
      this.focusManager.changeFocus(args);
    });

    this.addEventListener('focusChanged', (e: Event) => {
      const args = e as FocusChangedEventArgs;
      mainBottom.setMainButtonSet(args);
    });

    this.addEventListener('setScrollOffset', () => {
      // css ???????????? ?????? ??? ??????????????? ??????
      setTimeout(() => {
        // ????????? ?????????
        this.scrollManager.getAreaOffset();
      }, 300);
    });

    this.addEventListener('historyBack', (e: Event) => {
      this.historyManager.moveBackPage(e);
    });
  }

  public openMenu(pageId: string) {
    // ????????? ???????????? ??????????????? ?????? ???????????? ??? ?????? ??????????????????
    const openedPage = this.historyManager.findPage(pageId);

    if (openedPage) {
      this.historyManager.showPage(openedPage);
    } else {
      this.pageId = pageId;
    }
  }

  get appVersion(): string {
    return '1.0.0';
  }

  get currentPage(): DewsPageBase | undefined {
    return this.historyManager?.currentPage?.page;
  }

  protected render(): unknown {
    return html`
      ${this.showHeader ? html`<main-header></main-header>` : html``}
      <main-content page-id="${this.pageId}"></main-content>
      ${this.showBottom ? html`<main-bottom></main-bottom>` : html``}
    `;
  }
}
