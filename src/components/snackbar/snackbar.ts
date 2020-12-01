import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './snackbar.html';
import scss from './snackbar.scss';

export class Snackbar extends DewsFormComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
}
