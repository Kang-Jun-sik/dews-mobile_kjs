import { DewsPageBase } from './DewsPageBase.js';
import { AreaType } from '../../main/AreaType.js';
/**
 * 업무페이지 구성
 *  - page load 할 때 필요한 것들을 정의 해야 함.
 */

export class DewsBizPage extends DewsPageBase {
  // Area Title List
  get getAreaList(): Array<AreaType> {
    const titleList: Array<AreaType> = [];
    const shadowRoot = this.shadowRoot;
    if (shadowRoot) {
      shadowRoot.querySelectorAll('dews-box, dews-tabs').forEach((item: AreaType) => {
        // console.log(item);
        titleList.push(item);
      });
    }
    return titleList;
  }
}
