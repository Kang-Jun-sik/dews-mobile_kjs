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
import { PageLoadedEventArgs } from './PageLoadedEventArgs.js';
import { AreaType } from './AreaType.js';
import { AreaChangedEventArgs } from './AreaChangedEventArgs.js';

export class ScrollManager {
  private areaOffsetMap: Map<number, AreaType> = new Map();
  private areaList: Array<AreaType> = [];
  private headerHeight: number = 53;
  private areaDividerHeight: number = 12;
  private currentArea: AreaType | null;

  get sortingOffsetKeyArray() {
    return Array.from(this.areaOffsetMap.keys()).sort((a, b) => (a > b ? -1 : 1));
  }
  public init() {
    dews.app.main.onPageLoaded = async (arg: PageLoadedEventArgs) => {
      console.log('ScrollManager');
      this.currentArea = null;
      this.areaList = arg.openPage.getAreaList;
      await this.getAreaOffset();
      window.onscroll = () => {
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
    };
  }

  /**
   * 현재 오픈된 페이지에 있는 각각의 Area Offset 을 Map 에 저장
   * areaOffsetMap - <number, AreaType>
   *   number : Area 의 시작점
   */
  private async getAreaOffset(): Promise<void> {
    if (this.areaList) {
      this.areaList.forEach(item => {
        // 절대좌표 : (window.pageYOffset + item.getBoundingClientRect().top) - this.headerHeight;
        const areaOffset =
          window.pageYOffset + item.getBoundingClientRect().top - this.headerHeight - this.areaDividerHeight;
        this.areaOffsetMap.set(areaOffset, item);
      });
    }
  }

  private checkScrollPosition(pageYOffset) {
    const sortingOffsetKeyArray = this.sortingOffsetKeyArray;
    for (const i of sortingOffsetKeyArray) {
      if (i <= pageYOffset) {
        if (this.currentArea !== this.areaOffsetMap.get(i)) {
          const previousArea = this.currentArea;
          this.currentArea = this.areaOffsetMap.get(i);
          // area change event
          const areaChangedEvent = new AreaChangedEventArgs('areaChanged', { bubbles: true, composed: true });
          areaChangedEvent.previous = previousArea;
          areaChangedEvent.current = this.currentArea;
          document.getElementById('main').dispatchEvent(areaChangedEvent);
        }
        break;
      }
    }
  }

  private showAnchor() {
    // custom event 로 변경해야 할 지 고민
    // 현재는 header attribute 로 anchor 만 제어함
    document.getElementById('main').shadowRoot.querySelector('main-header').setAttribute('anchor', '');
  }

  private hideAnchor() {
    document.getElementById('main').shadowRoot.querySelector('main-header').removeAttribute('anchor');
  }
}
