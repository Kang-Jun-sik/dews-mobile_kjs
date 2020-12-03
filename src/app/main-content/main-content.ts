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
    await this.loadPage();
  }

  async loadPage() {
    if (this.pageId) {
      await import(`../../sample/MA1000/MA1000.js`)
        .then(async pageClass => {
          if (!customElements.get(`erp10-${this.pageId!.toLowerCase()}`)) {
            customElements.define(`erp10-${this.pageId!.toLowerCase()}`, pageClass.default);
          }
          const page: DewsBizPage = new pageClass.default() as DewsBizPage;

          // const pageLoadingEvent = new PageLoadingEventArgs('pageLoading', { bubbles: true, composed: true });
          // this.dispatchEvent(pageLoadingEvent);

          // page event
          await page.onInit();

          const tag = `erp10-${this.pageId!.toLowerCase()}`;
          const contents = this.shadowRoot!.querySelector('#contents');
          contents?.appendChild(page);
          contents?.getElementsByTagName(tag)[0].setAttribute('id', tag);

          this.addEventListener(
            'pageUpdateComplete',
            () => {
              const pageLoadedEvent = new PageLoadedEventArgs('pageLoaded', { bubbles: true, composed: true });
              pageLoadedEvent.openPage = page;
              pageLoadedEvent.pageId = this.pageId!;
              pageLoadedEvent.tag = tag;

              this.dispatchEvent(pageLoadedEvent);
            },
            { once: true }
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return template.call(this);
  }
}
