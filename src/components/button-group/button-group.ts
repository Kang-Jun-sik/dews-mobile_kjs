import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './button-group.html';
import scss from './button-group.scss';
import { html, queryAll, TemplateResult } from 'lit-element';

export class ButtonGroup extends DewsFormComponent {
  static styles = scss;

  private _buttons: Array<TemplateResult> = [];

  @queryAll('group-item')
  private groupItem: Array<TemplateResult> | undefined;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    const groupItem = this.querySelectorAll('group-item');
    if (groupItem.length > 0) {
      this.querySelectorAll('group-item').forEach(item => {
        const row: Array<TemplateResult> = [];
        for (let i = 0; i < item.childElementCount; i++) {
          item.children[i].setAttribute('group', 'true');
          console.log(item.children[i]);
          row.push(html`${item.children[i]}`);
        }
        this._buttons.push(html`<li>${row}</li>`);
      });
    } else {
      const row: Array<TemplateResult> = [];
      this.querySelectorAll('dews-button').forEach(button => {
        button.setAttribute('group', 'true');
        row.push(html`${button}`);
      });
      this._buttons.push(html`<li>${row}</li>`);
    }
  }

  render() {
    return template.call(this);
  }
}
