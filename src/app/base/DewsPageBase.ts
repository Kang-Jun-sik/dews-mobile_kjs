import { CSSResult, html, internalProperty, LitElement, TemplateResult } from 'lit-element';

/**
 * 업무페이지 구성
 *  - DewsBizPage, DewsDialogPage
 */
export class DewsPageBase extends LitElement {
  static cssTemplate: CSSResult;
  @internalProperty()
  protected htmlTemplate: TemplateResult | undefined;

  async connectedCallback() {
    super.connectedCallback();
    try {
      await this.updateComplete;
      // 페이지의 updateComplete 후 발생하는 이벤트
      this.dispatchEvent(new CustomEvent('pageUpdateComplete', { bubbles: true, composed: true }));

      if (this.onReady) {
        await this.onReady();
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
