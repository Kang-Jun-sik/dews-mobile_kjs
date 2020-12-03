import { DewsPageBase } from './DewsPageBase.js';
import { AreaType } from './AreaType.js';
import { PropertyValues } from 'lit-element';
/**
 * 업무페이지 구성
 *  - page load 할 때 필요한 것들을 정의 해야 함.
 */

export class DewsBizPage extends DewsPageBase {
  // Area Title List
  get getAreaList(): Array<AreaType> {
    const titleList: Array<AreaType> = [];

    const items: NodeListOf<AreaType> = this.shadowRoot!.querySelectorAll(
      'dews-box, dews-tabs'
    ) as NodeListOf<AreaType>;

    items.forEach((item: AreaType) => {
      titleList.push(item);
    });

    return titleList;
  }

  async connectedCallback(): Promise<void> {
    await super.connectedCallback();
    await this.updateComplete;
    this.getAreaList[0].click();
  }
}
