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

    super.connectedCallback();
    await this.updateComplete;

    this.historyManager.setContentsElement(this.shadowRoot?.querySelector('main-content')!);

    const mainHeader = this.shadowRoot?.querySelector('main-header') as MainHeader;
    const mainBottom = this.shadowRoot?.querySelector('main-bottom') as MainBottom;

    // 페이지가 다 로드 된 후의 이벤트핸들러
    this.addEventListener('pageLoaded', (e: Event) => {
      const args = e as PageLoadedEventArgs;

      location.hash = args.pageId!;

      if (args.openPage! instanceof DewsBizPage) {
        // 헤더와 바텀에 페이지 정보 전달하면서 초기화
        mainHeader.init(args);
        mainBottom.init(args);
        // 스크롤 매니저 초기화
        this.scrollManager.init(args);
      }

      // 열려있는 페이지가 아니면 히스토리에 등록
      if (!args.opened) {
        this.historyManager.addPage(args);
      }
    });

    // 스크롤 area가 변할 때 발생하는 이벤트 핸들러
    this.addEventListener('scrollAreaChanged', (e: Event) => {
      const args = e as ScrollAreaChangedEventArgs;
      // 헤더의 앵커포인트 포커스를 변화
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
      // css 트랜지션 시간 뒤 실행되도록 설정
      setTimeout(() => {
        // 오프셋 재설정
        this.scrollManager.getAreaOffset();
      }, 300);
    });

    this.addEventListener('historyBack', (e: Event) => {
      this.historyManager.moveBackPage(e);
    });
  }

  public openMenu(pageId: string) {
    // 기존에 열려있는 페이지이면 해당 페이지를 맨 위로 이동시키도록
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

  protected render(): unknown {
    return html`
      ${this.showHeader ? html`<main-header></main-header>` : html``}
      <main-content page-id="${this.pageId}"></main-content>
      ${this.showBottom ? html`<main-bottom></main-bottom>` : html``}
    `;
  }
}
