import { customElement, html, internalProperty, LitElement, PropertyValues, query, TemplateResult } from 'lit-element';
import { MainButtonSet } from './MainButtons.js';
import { FocusChangedEventArgs } from '../FocusChangedEventArgs.js';

import scss from './main-bottom.scss';
import template from './main-bottom.html';
import { PageLoadedEventArgs } from '../PageLoadedEventArgs.js';
import { TouchActive } from '../../components/utill/touchActive.js';

@customElement('main-bottom')
export class MainBottom extends LitElement {
  static styles = scss;

  @query('.sub-buttons')
  subButtons: HTMLElement | undefined;

  /**
   * main/ButtonTabBar 에서 setAttribute 로 show 할 버튼 리스트 제공
   */
  @internalProperty()
  mainButtons: MainButtonSet | undefined;

  public init(args: PageLoadedEventArgs) {
    // TODO: 더보기 버튼 페이지 정보로 셋팅
    console.log(args);
  }

  public setMainButtonSet(arg: FocusChangedEventArgs) {
    this.mainButtons = arg.focusTarget?.mainButtons;
    this.mainButtons?.renderButtonSetEvent.on('renderButtonSet', async () => {
      await this.requestUpdate();
    });
  }

  // 더보기 버튼 클릭 핸들러
  private clickMoreButton(e: MouseEvent) {
    e.stopPropagation();
    this.subButtons?.classList.toggle('active');

    // 다른 부분을 클릭했을 때 더보기 영역이 사라짐
    if (this.subButtons?.classList.contains('active')) {
      document.addEventListener('click', this.moreButtonHandler);
    } else {
      document.removeEventListener('click', this.moreButtonHandler);
    }
  }

  private moreButtonHandler = (e: MouseEvent) => {
    this.clickMoreButton(e);
    e.stopPropagation();
  };

  // 메인버튼 렌더링
  private mainButtonRender(type: string, title: string): TemplateResult {
    let result = html``;
    if (this.mainButtons) {
      const mainButton = this.mainButtons?.getMainButtonByType(type);

      result = html`
        <li class="main-button ${mainButton.hidden ? 'hide' : ''}">
          <button
            class="${type}"
            @click="${(e: MouseEvent) => mainButton.click(e)}"
            @touchstart="${this._touchstart}"
            @touchend="${this._touchend}"
          >
            ${title}
          </button>
        </li>
      `;
    }
    return result;
  }

  private _touchstart(e: Event) {
    (e.target as HTMLElement).classList.add('touch');
  }
  private _touchend(e: Event) {
    (e.target as HTMLElement).classList.remove('touch');
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const touchActive = new TouchActive();
    this.shadowRoot?.querySelectorAll('button').forEach($el => {
      touchActive.TouchActive($el as HTMLElement);
    });
  }

  render() {
    return template.call(this);
  }
}
