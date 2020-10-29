import { customElement, html, internalProperty, property } from 'lit-element';
import { DewsComponent } from '../../core/baseclass/DewsComponent.js';
import { HistoryBackEventArgs } from '../HistoryBackEventArgs.js';

import _scss from './NavigationBar.scss';
import { PageLoadedEventArgs } from '../PageLoadedEventArgs.js';
import { Tabs } from '../../components/tabs/tabs.js';
import { Box } from '../../components/box/box.js';
import { classMap } from 'lit-html/directives/class-map';

@customElement('main-header')
export class NavigationBar extends DewsComponent {
  static styles = _scss;

  @property({ reflect: true })
  title: string = 'Navigation BarNavigation BarNavigation BarNavigation BarNavigation Bar';

  /**
   * Tooltip : title 길이에 상관 없이 클릭시 무조건 노출
   */
  titleTooltipFlag: boolean = false;

  /**
   * 현재 업무 페이지가 가지고 있는 Area List
   */
  @internalProperty()
  areaList: Array<Box | Tabs> = [];

  /**
   * Anchor 에서 클릭 한 Area
   */
  @internalProperty()
  clickArea: Box | Tabs = null;

  /**
   * Anchor / Title 전환에 필요한 Flag
   */
  @property({ type: Boolean, attribute: 'anchor', reflect: true })
  activeAnchorFlag: boolean = false;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;

    dews.app.main.onPageLoaded = (arg: PageLoadedEventArgs) => {
      console.log('navigationBar onPageLoaded');
      const areaList: Array<Box | Tabs> = arg.openPage.getAreaList || [];
      if (areaList) {
        this.areaList = areaList;
      }
    };

    // scroll 이벤트 수신
    // 1. scroll position check: = 0 , > 0
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  private historyBack() {
    console.log(`click historyBack`);
    const historyBackEvent = new HistoryBackEventArgs('historyBack', { bubbles: true, composed: true });
    this.dispatchEvent(historyBackEvent);
  }

  private activeTitleTooltip() {
    if (!this.titleTooltipFlag) {
      this.titleTooltipFlag = !this.titleTooltipFlag;
      this.shadowRoot.querySelector('.title-wrap').classList.add('active');
    }
  }

  private inactiveTitleTooltip() {
    if (this.titleTooltipFlag) {
      this.titleTooltipFlag = !this.titleTooltipFlag;
      this.shadowRoot.querySelector('.title-wrap').classList.remove('active');
    }
  }

  private clickMenu() {
    alert('click Menu Button');
    // todo: app menu 호출
  }

  /**
   * Anchor Item 클릭
   * scroll 처리
   *  - 클릭된 Area 를 스크롤 영역 내 시작점으로 이동
   *  - 이동 된 scroll offset 에서 헤더 영역만큼 이동
   */
  private clickAnchor(area: Box | Tabs) {
    // alert(`click: ${area.title}`);
    this.clickArea = area;
    area.scrollIntoView();
    window.scroll(0, pageYOffset - 53);
  }

  render() {
    const headerClass = classMap({
      active: !this.activeAnchorFlag,
    });
    return html`
      <div class="navigation-bar-wrap">
        <button class="history-back-button" @click="${this.historyBack}"></button>
        <div class="navigation-bar">
          <header class="${headerClass}">
            <!-- active -->
            <h1><button @click="${this.activeTitleTooltip}">${this.title}</button></h1>
            <button class="all-menu-button" @click="${this.clickMenu}"></button>
          </header>
          <!-- 추가 작업 필요 -->
          <nav class="anchor-point">
            <ul>
              ${this.areaList?.map(item => {
                return html`<li class="${classMap({ active: this.clickArea === item })}">
                  <a @click="${() => this.clickAnchor(item)}">${item.title.substring(0, 1)}</a>
                </li>`;
              })}
            </ul>
          </nav>
        </div>
      </div>
      <!-- 추가 작업 필요 -->
      <div class="title-wrap">
        <p class="title">${this.title}</p>
        <button class="title-close-button" @click="${this.inactiveTitleTooltip}"></button>
      </div>
    `;
  }
}
