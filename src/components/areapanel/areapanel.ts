import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';

import template from './areapanel.html';
import scss from './areapanel.scss';

export class AreaPanel extends DewsLayoutComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
}
