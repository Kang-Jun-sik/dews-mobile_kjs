import { DewsLayoutComponent } from '../../core/baseclass/DewsLayoutComponent.js';
import { property } from 'lit-element';

import _html from './dropdownlist.html';
import _scss from './dropdownlist.scss';

export class Dropdownlist extends DewsLayoutComponent {
  static styles = _scss;

  @property({ type: String })
  title: string = '';

  private _clickHandler() {
    console.log('click');
  }
  render() {
    return _html.bind(this)();
  }
}
