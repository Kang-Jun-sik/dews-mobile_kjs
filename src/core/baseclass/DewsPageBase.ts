import { DewsComponent } from './DewsComponent.js';
import { CSSResult, html, TemplateResult } from 'lit-element';
import { Tabs } from '../../components/tabs/tabs.js';
import { Box } from '../../components/box/box.js';

/**
 * 업무페이지 구성
 *  - DewsBizPage, DewsDialogPage
 */
export class DewsPageBase extends DewsComponent {
  static cssTemplate: CSSResult;
  htmlTemplate: TemplateResult;

  getAreaList: Array<Box | Tabs>;

  async connectedCallback() {
    super.connectedCallback();
    try {
      // render 전
      if (await this.updateComplete) {
        this.dispatchEvent(new CustomEvent('pageUpdateComplete', { bubbles: true, composed: true }));
        if (this.onReady) {
          await this.onReady();
        }
      }
    } catch (e) {
      console.log(`connectedCallback error : ${JSON.stringify(e)}`);
    }
  }

  // DOM detach
  async disconnectedCallback() {
    if (this.onClosed) {
      await this.onClosed();
    }
    super.disconnectedCallback();
  }

  public async onInit() {
    // main 에서 실행
    // render 전 실행
  }

  public async onReady() {
    // connectedCallback 에서 실행
    // DOM 에 요소가 랜더링 된 후
  }

  public async onClosed() {
    // disconnectedCallback 에서 실행
    // DOM 에서 remove
  }

  // 페이지 이동 시 제공 함수

  // static 필수
  static getStyles() {
    return this.cssTemplate;
  }

  render() {
    // console.log(`DewsPageBase render`);
    return html`${this.htmlTemplate}`;
  }
}
