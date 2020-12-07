import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './codepicker.html';
import scss from './codepicker.scss';

export class Codepicker extends DewsFormComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
}
