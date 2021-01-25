import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './cardlist.html';
import scss from './cardlist.scss';

export class Cardlist extends DewsFormComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
}
