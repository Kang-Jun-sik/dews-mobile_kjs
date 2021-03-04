import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './complex.html';
import scss from './complex.scss';
import { html, property, PropertyValues, TemplateResult } from 'lit-element';
import { Button, SIZE_LIST } from '../button/button.js';
import { Dropdownbutton } from '../dropdownbutton/dropdownbutton.js';

export enum WIDTH_TYPE {
  variable = 'variable',
  fix = 'fix',
  autofix = 'autofix'
}

export class Complex extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  private components: Array<TemplateResult> = [];

  connectedCallback() {
    super.connectedCallback();
    const complexLine = this.querySelectorAll('complex-line');
    if (complexLine.length > 0) {
      this.querySelectorAll('complex-line').forEach(item => {
        const line: Array<TemplateResult> = [];

        for (let i = 0; i < item.childElementCount; i++) {
          const component = item.children[i];
          line.push(this.makeComponentsItem(component));
        }
        this.components.push(html`<li class="complex-line">${line}</li>`);
      });
    } else {
      const line: Array<TemplateResult> = [];

      Array.from(this.children).forEach(component => {
        line.push(this.makeComponentsItem(component));
      });

      this.components.push(html`<li class="complex-line">${line}</li>`);
    }
  }

  makeComponentsItem(component: Element) {
    let item: TemplateResult = html``;

    if (component.hasAttribute('required')) {
      this.setAttribute('required', '');
    }

    // 버튼 크기 수정
    switch (component.tagName) {
      case 'DEWS-BUTTON':
        if ((component as Button).size !== 'large') {
          (component as Button).size = SIZE_LIST.large;
        }
        break;
      case 'DEWS-DROPDOWNBUTTON':
        if ((component as Dropdownbutton).size !== 'large') {
          (component as Dropdownbutton).size = SIZE_LIST.large;
        }
        break;
    }

    // width 수정
    switch (component.tagName) {
      case 'SPAN':
        if (component.classList.contains('text')) {
          item = html`<div class="text item ${WIDTH_TYPE.autofix}">${component}</div>`;
        }
        break;
      case 'DEWS-CHECKBOX':
      case 'DEWS-RADIO':
      case 'DEWS-TOGGLE':
      case 'DEWS-ZIPCODEPICKER':
        item = html`<div class="components item ${WIDTH_TYPE.autofix}">${component}</div>`;
        break;
      case 'DEWS-BUTTON':
        if (component.getAttribute('type') === 'icon') {
          item = html`<div class="components item ${WIDTH_TYPE.autofix}">${component}</div>`;
          break;
        }
      // falls through
      default:
        if (component.hasAttribute('width')) {
          item = html`<div class="components item ${WIDTH_TYPE.fix}" style="width: ${component.getAttribute('width')};">
            ${component}
          </div>`;
        } else {
          item = html`<div class="components item ${WIDTH_TYPE.variable}">${component}</div>`;
        }
    }
    return item;
  }

  render() {
    return template.call(this);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);

    this.updateComplete.then(() => {
      this.shadowRoot!.querySelectorAll('.complex-line').forEach(line => {
        let totalWidth = 0;

        line.querySelectorAll('.components.item').forEach(item => {
          if (item.classList.contains('fix') || item.classList.contains('autofix')) {
            totalWidth += item.clientWidth;
          }
        });
        line.querySelectorAll<HTMLElement>('.components.item').forEach(item => {
          const variable = line.querySelectorAll('.components.item.variable').length;
          if (item.classList.contains('variable')) {
            item.style.width = `calc((100% - ${totalWidth}px / ${variable}`;
          }
        });
      });

      // 컴포넌트 타이틀 숨기기
      this.shadowRoot!.querySelectorAll<HTMLElement>('.complex-line .components.item').forEach(item => {
        const label = item.children[0].shadowRoot!.querySelector<HTMLElement>('label:not(.checkbox-label)');
        if (label) {
          label.style.display = 'none';
        }
      });
    });
  }
}
