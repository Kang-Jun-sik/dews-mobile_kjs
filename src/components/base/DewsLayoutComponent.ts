import { DewsComponent } from './DewsComponent.js';
/**
 * Layout Component 관련
 *  - Area, Panel 등등
 */
export class DewsLayoutComponent extends DewsComponent {
  private headerHeight = 53;
  private areaDividerHeight = 12;
  scrollIntoView() {
    window.scrollBy({
      top: this.getBoundingClientRect().y - this.headerHeight - this.areaDividerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
