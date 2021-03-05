import { customElement, LitElement, property } from 'lit-element';

import scss from './main-content.scss';
import template from './main-content.html';
import { PageLoadedEventArgs } from '../PageLoadedEventArgs.js';
import { DewsBizPage } from '../base/DewsBizPage.js';

@customElement('main-content')
export class MainContent extends LitElement {
  static styles = scss;

  @property({ attribute: 'page-id' })
  pageId: string | undefined;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
  }

  async update(changeProperty: Map<string, unknown>) {
    super.update(changeProperty);
    // 해당 페이지 로드
    await this.loadPage();
  }

  async loadPage() {
    if (this.pageId) {
      try {
        const pageClass = await import(`/view/MOB/${this.pageId}`);
        // const pageClass = await import(`../../sample/MB_Customer_management/MB_Customer_management.js`);

        if (!customElements.get(`erp10-${this.pageId!.toLowerCase()}`)) {
          customElements.define(`erp10-${this.pageId!.toLowerCase()}`, pageClass.default);
        }
        const page: DewsBizPage = new pageClass.default();

        // const pageLoadingEvent = new PageLoadingEventArgs('pageLoading', { bubbles: true, composed: true });
        // this.dispatchEvent(pageLoadingEvent);

        // 개발자가 등록한 init 이벤트 핸들러 호출
        await page.onInit();

        const tag = `erp10-${this.pageId!.toLowerCase()}`;
        const contents = this.shadowRoot!.querySelector('#contents');
        // 컨텐츠 영역에 해당 페이지 삽입
        contents?.appendChild(page);
        contents?.getElementsByTagName(tag)[0].setAttribute('id', tag);

        // PageBase에서 페이지 로드가 완료되면 발생하는 pageUpdateComplete 이벤트에 핸들러 등록
        this.addEventListener(
          'pageUpdateComplete',
          () => {
            // 페이지 로드가 완료됐다는 이벤트 호출
            const pageLoadedEvent = new PageLoadedEventArgs('pageLoaded', { bubbles: true, composed: true });
            pageLoadedEvent.openPage = page;
            pageLoadedEvent.pageId = this.pageId!;
            pageLoadedEvent.tag = tag;

            this.dispatchEvent(pageLoadedEvent);
          },
          { once: true }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    return template.call(this);
  }
}
