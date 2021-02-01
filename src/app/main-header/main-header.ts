import { customElement, html, internalProperty, LitElement, property, TemplateResult } from 'lit-element';
import { DewsBizPage, AreaType } from '../base/exports.js';
import { classMap } from 'lit-html/directives/class-map';
import { PageLoadedEventArgs } from '../PageLoadedEventArgs.js';

import scss from './main-header.scss';
import template from './main-header.html';

@customElement('main-header')
export class MainHeader extends LitElement {
  private headerHeight = 53;
  private areaDividerHeight = 12;
  private titleTooltipFlag = false;

  @property({ reflect: true })
  title = '';

  /**
   * Anchor / Title 전환에 필요한 Flag
   */
  @property({ type: Boolean, attribute: 'anchor', reflect: true })
  activeAnchorFlag = false;

  /**
   * 현재 업무 페이지가 가지고 있는 Area List
   */
  @internalProperty()
  areaList: Array<AreaType> = [];

  /**
   * Anchor 에서 클릭 한 Area
   */
  @internalProperty()
  focusedArea!: AreaType;

  /**
   * Anchor Template
   */
  @internalProperty()
  anchorTemplate!: TemplateResult;

  static styles = scss;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  public init(args: PageLoadedEventArgs) {
    this.areaList = (args.openPage as DewsBizPage).areaList || [];
    this.title = args.openPage!.title;
  }

  public setFocusedArea(area: AreaType) {
    this.focusedArea = area;
  }

  private renderAnchor(areaList: AreaType[]) {
    this.anchorTemplate = html`<ul>
      ${areaList?.map(item => {
        return html` <li class="${classMap({ active: this.focusedArea === item })}">
          <a @click="${() => this.clickAnchor(item)}">${item.title.substring(0, 1)}</a>
        </li>`;
      })}
    </ul>`;
  }

  private toggleTitleTooltip() {
    const wrapper = this.shadowRoot!.querySelector('.title-wrap');
    if (!this.titleTooltipFlag) {
      wrapper?.classList.add('active');
    } else {
      wrapper?.classList.remove('active');
    }
    this.titleTooltipFlag = !this.titleTooltipFlag;
  }

  private historyBack() {
    const historyBackEvent = new CustomEvent('historyBack', { bubbles: true, composed: true });
    this.dispatchEvent(historyBackEvent);
  }

  private clickMenu() {
    alert('clicked Menu');
    // todo: app menu 호출
  }

  /**
   * Anchor Item 클릭
   * scroll 처리
   *  - 클릭된 Area 를 스크롤 영역 내 시작점으로 이동
   *  - 이동 된 scroll offset 에서 헤더 영역만큼 이동
   */
  private clickAnchor(area: AreaType) {
    this.focusedArea = area;
    area.scrollIntoView();
    window.scroll(0, pageYOffset - this.headerHeight - this.areaDividerHeight);
  }

  render() {
    this.renderAnchor(this.areaList);
    return template.call(this);
  }
}
