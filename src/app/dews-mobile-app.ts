import { customElement, html, internalProperty, LitElement } from 'lit-element';
import { ApplicationMainInterface } from './ApplicationMainInterface.js';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { MainHeader } from './main-header/main-header.js';
import { container } from 'tsyringe';
import { ScrollManager } from './ScrollManager.js';
import { ScrollAreaChangedEventArgs } from './ScrollAreaChangedEventArgs.js';
import { FocusChangingEventArgs } from './FocusChangingEventArgs.js';
import { FocusManager } from './FocusManager.js';

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

  constructor() {
    super();
    this.scrollManager = container.resolve(ScrollManager);
    this.focusManager = container.resolve(FocusManager);
  }

  async connectedCallback() {
    this.pageId = location.hash.replace('#', '');
    super.connectedCallback();
    await this.updateComplete;

    // 테스트
    setTimeout(() => {
      this.changeMenu('MA1000');
    }, 500);

    const mainHeader = this.shadowRoot?.querySelector('main-header') as MainHeader;

    // 페이지가 다 로드 된 후의 이벤트핸들러
    this.addEventListener('pageLoaded', (e: Event) => {
      const args = e as PageLoadedEventArgs;
      // 헤더에 페이지 정보 전달
      mainHeader.setPage(args.openPage!);
      // 스크롤 매니저 초기화
      this.scrollManager.init(args.openPage!);
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

    this.addEventListener('setScrollOffset', () => {
      // css 트랜지션 시간 뒤 실행되도록 설정
      setTimeout(() => {
        // 오프셋 재설정
        this.scrollManager.getAreaOffset();
      }, 300);
    });
  }

  public changeMenu(pageId: string) {
    this.pageId = pageId;
  }

  get appVersion(): string {
    return '1.0.0';
  }

  protected render(): unknown {
    return html`
      ${this.showHeader ? html`<main-header title="가가가가"></main-header>` : html``}
      <main-content page-id="${this.pageId}"></main-content>
      ${this.showBottom ? html`<main-bottom></main-bottom>` : html``}
    `;
  }
}
