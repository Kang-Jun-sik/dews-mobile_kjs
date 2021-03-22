import scss from './barcode.scss';
import template from './barcode.html';
import { DewsFormComponent } from '../base/DewsFormComponent.js';

export class Barcode extends DewsFormComponent {
  static styles = scss;

  render() {
    return template.call(this);
  }
}
