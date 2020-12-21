/**
 * 1. window.onscroll 등록
 *  - on, off 할 수 있는 방식으로 제공 해야 할 꺼 같음
 *   -> onscroll overwrite?
 * 2. window y scroll position 체크
 *  - header 영역이 더해져 나오는지 확인 필요
 * 3. AreaList 의 offset check
 *  - Area 의 Type 을 정의하고 page 에서 받아온 AreaList 의 offset 을 구해서 새로운 Map 에 저장
 * 4. position 이 해당 영역을 넘어갔을 경우 로직 수행
 *  - CustomEvent 발생
 *
 * width: 1024px(테블릿_L) 이하에서만 스크롤 처리 해야 함
 */
import { AreaType, DewsBizPage } from './base/exports.js';
import { ScrollAreaChangedEventArgs } from './ScrollAreaChangedEventArgs.js';
import { singleton } from 'tsyringe';
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';

@singleton()
export class ScrollManager {
  private areaOffsetMap: Map<number, AreaType> = new Map();
  private areaList: Array<AreaType> = [];
  private headerHeight = 53;
  private areaDividerHeight = 12;
  private currentArea: AreaType | undefined;
  private $app: Element | undefined;
  private $header: Element | undefined | null;
  // 윈도우 스크롤 이벤트 핸들러
  private scrollHandler = () => {
    const pageYOffset = window.pageYOffset;
    if (pageYOffset === 0) {
      // anchor disabled event
      this.hideAnchor();
    } else if (pageYOffset > 0) {
      // anchor enabled event
      this.showAnchor();
      this.checkScrollPosition(pageYOffset);
    }
  };

  get sortingOffsetKeyArray() {
    return Array.from(this.areaOffsetMap.keys()).sort((a, b) => (a > b ? -1 : 1));
  }

  public async init(args: PageLoadedEventArgs) {
    this.$app = document.getElementsByTagName('dews-mobile-app')[0];
    this.$header = this.$app?.shadowRoot?.querySelector('main-header');
    this.currentArea = undefined;
    this.areaList = (args.openPage! as DewsBizPage).areaList;
    await this.getAreaOffset();

    // 기존 스크롤 이벤트 제거 후 등록
    window.removeEventListener('scroll', this.scrollHandler);
    window.addEventListener('scroll', this.scrollHandler);
  }

  /**
   * 현재 오픈된 페이지에 있는 각각의 Area Offset 을 Map 에 저장
   * areaOffsetMap - <number, AreaType>
   *   number : Area 의 시작점
   */
  public async getAreaOffset(): Promise<void> {
    if (this.areaList) {
      this.areaOffsetMap.clear();
      this.areaList.forEach((item, index) => {
        let areaOffset = window.pageYOffset + item.getBoundingClientRect().top - this.headerHeight;
        areaOffset = areaOffset - (index !== 0 ? this.areaDividerHeight : 0);
        this.areaOffsetMap.set(areaOffset, item);
      });
    }
  }

  private checkScrollPosition(pageYOffset: number) {
    const sortingOffsetKeyArray = this.sortingOffsetKeyArray;

    for (const i of sortingOffsetKeyArray) {
      if (i <= pageYOffset) {
        if (this.currentArea !== this.areaOffsetMap.get(i)) {
          const previousArea = this.currentArea;
          this.currentArea = this.areaOffsetMap.get(i);
          // area change event
          const areaChangedEvent = new ScrollAreaChangedEventArgs('scrollAreaChanged', {
            bubbles: true,
            composed: true
          });
          areaChangedEvent.previous = previousArea;
          areaChangedEvent.current = this.currentArea;
          this.$app?.dispatchEvent(areaChangedEvent);
        }
        break;
      }
    }
  }

  private showAnchor() {
    // 현재는 header attribute 로 anchor 만 제어함
    this.$header?.setAttribute('anchor', '');
  }

  private hideAnchor() {
    this.$header?.removeAttribute('anchor');
  }
}
