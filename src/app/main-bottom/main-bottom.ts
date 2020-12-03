import { customElement, html, internalProperty, LitElement, query, TemplateResult } from 'lit-element';
import { MainButtonSet } from './MainButtons.js';
import { FocusChangedEventArgs } from '../FocusChangedEventArgs.js';
import { DewsBizPage } from '../base/exports.js';

import scss from './main-bottom.scss';

@customElement('main-bottom')
export class MainBottom extends LitElement {
  // 우측 버튼은 Area Active 에 따라 변경
  // 좌측 더보기 버튼은 페이지 단위로 변경

  static styles = scss;

  @query('.sub-buttons')
  subButtons: HTMLElement | undefined;

  /**
   * main/ButtonTabBar 에서 setAttribute 로 show 할 버튼 리스트 제공
   */
  @internalProperty()
  mainButtons: MainButtonSet | undefined;

  // public init(page: DewsBizPage) {}

  public setMainButtonSet(arg: FocusChangedEventArgs) {
    this.mainButtons = arg.focusTarget?.mainButtons;
  }

  private clickMoreButton() {
    this.subButtons?.classList.toggle('active');
  }

  render() {
    const mainButtonTag = (type: string, title: string): TemplateResult => {
      let result = html``;
      if (this.mainButtons) {
        const mainButton = this.mainButtons?.getMainButtonByType(type);

        result = mainButton.hidden
          ? html``
          : html`
              <li class="main-button">
                <button class=${type} ?disabled=${mainButton.disabled} @click="${() => mainButton.click()}">
                  ${title}
                </button>
              </li>
            `;
      }

      return result;
    };

    return html`
      <div class="bottom">
        <div class="button-tab-bar">
          <ul class="tab-bar">
            ${mainButtonTag('save', '저장')} ${mainButtonTag('delete', '삭제')} ${mainButtonTag('search', '검색')}
            ${mainButtonTag('add', '추가')}

            <li class="main-button">
              <button class="more" @click="${this.clickMoreButton}">더보기</button>

              <div class="sub-buttons">
                <ul>
                  <!-- 임시 내용 -->
                  <li class="sub-button"><button class="info">메뉴정보</button></li>
                  <li class="sub-button"><button class="share">공유하기</button></li>
                  <li class="sub-button"><button class="print">인쇄하기</button></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    `;
  }
}
