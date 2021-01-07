import template from './customcontainer.html';
import scss from './customcontainer.scss';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { internalProperty, TemplateResult } from 'lit-element';
import { html } from 'lit-html';

export class Customcontainer extends DewsFormComponent {
  static styles = scss;

  @internalProperty()
  private $itemList: Array<TemplateResult> = [];

  constructor() {
    super();
    for (let i = 0; i < this.children.length; i++) {
      this.$itemList.push(html`<li>${this.children.item(i)}</li>`);
    }
  }

  render() {
    return template.call(this);
  }
}
