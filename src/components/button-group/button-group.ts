import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './button-group.html';
import scss from './button-group.scss';
import { html, queryAll, TemplateResult } from 'lit-element';

export class ButtonGroup extends DewsFormComponent {
  static styles = scss;

  private _buttons: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dews-button').forEach(button => {
      this._buttons.push(html`${button}`);
    });
  }

  render() {
    return template.call(this);
  }
}
