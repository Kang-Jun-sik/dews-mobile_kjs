import { DewsPageBase } from './DewsPageBase.js';
import { Tabs } from '../../components/tabs/tabs.js';
import { Box } from '../../components/box/box.js';
/**
 * 업무페이지 구성
 *  - page load 할 때 필요한 것들을 정의 해야 함.
 */

export class DewsBizPage extends DewsPageBase {
  // Area Title List
  get getAreaList(): Array<Box | Tabs> {
    const titleList: Array<Box | Tabs> = [];
    const shadowRoot = this.shadowRoot;
    if (shadowRoot) {
      shadowRoot.querySelectorAll('dews-box, dews-tabs').forEach((item: Box | Tabs) => {
        // console.log(item);
        titleList.push(item);
      });
    }
    return titleList;
  }
}
