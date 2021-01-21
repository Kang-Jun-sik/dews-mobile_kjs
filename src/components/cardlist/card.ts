import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { customElement, html, internalProperty, property, PropertyValues, TemplateResult } from 'lit-element';
import { CardlistField } from './dews-cardlist.js';
import scss from './cardlist.scss';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

@customElement('cl-card')
export class Card<T extends object> extends DewsFormComponent {
  static styles = scss;

  @property({ type: Object, attribute: 'card-options' })
  cardOptions: any = {};

  @internalProperty()
  data = null;

  constructor(options: Record<string, any>, data?: any) {
    super();
    this.cardOptions = options;
    this.data = data;
  }

  private _cardElement: TemplateResult | null = null;

  private _headerElement: TemplateResult | null = null;
  private _liElements: Array<TemplateResult> = [];
  private _collapseElement: TemplateResult | null = null;

  private _createCardElement = () => {
    const cardElement: TemplateResult | null = null;
    const opt: any = this.cardOptions;
    const data: any = this.data;

    for (let i = 0; i < opt._fieldList.length; i++) {
      const field: CardlistField = opt._fieldList[i];
      const type: 'number' | null = field.type === 'number' ? 'number' : null;
      let collapse: string | null = null;

      if (opt._useCardCollapse) {
        collapse = i >= opt._cardFixedFieldCount ? ' collapse' : '';
      }

      if (data[field.field!]) {
        this._liElements.push(html`
          <li class="${field.name} ${collapse}">
            <p class="name">${field.title}</p>
            <p class="item ${type}">${data[field.field!]}</p>
          </li>
        `);
      }
    }

    this._cardElement = html`
      <ul class="list-field">
        ${this._liElements}
      </ul>
    `;
  };

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
    if (this.data) {
      console.log('card updated', changedProperties);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this._createCardElement();

    this.onclick = e => {
      console.log('card click', e);
    };
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    console.log('attributeChanged');
    if (name === 'header-options' || name === 'control-options') {
      return JSON.parse(value!);
    }
  }

  render() {
    return html`
      <!--      <div class='card'>-->
      ${this._cardElement}
      <!--      </div>-->
    `;
  }
}
