import { customElement, internalProperty, LitElement, property } from 'lit-element';

@customElement('ds-schema-model-field')
export class SchemaModelField<T> extends LitElement {
  @property({ type: String })
  field: keyof T;

  @property({ type: String, reflect: true })
  type = 'string';

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: String, reflect: true })
  format?: string = undefined;

  constructor() {
    super();
    // eslint-disable-next-line wc/no-constructor-attributes
    const fieldAttr = this.getAttribute('field');

    if (this.parentElement?.tagName !== 'DS-SCHEMA-MODEL') {
      throw 'ds-schema-model 태그가 존재하지 않습니다.';
    }

    if (fieldAttr) {
      this.field = fieldAttr as keyof T;
    } else {
      throw 'field 속성이 선언되지 않았습니다.';
    }
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

@customElement('ds-schema-model')
export class SchemaModel<T> extends LitElement {
  @property({
    attribute: 'id-fields',
    reflect: true,
    converter: {
      toAttribute(idFields: (keyof T)[]): string {
        let idFieldsAttr = '';
        for (const index in idFields) {
          if (Number(index) === idFields.length - 1) {
            idFieldsAttr += idFields[index];
          } else {
            idFieldsAttr += `${idFields[index]},`;
          }
        }
        return idFieldsAttr;
      },
      fromAttribute(idFields: string | null): (keyof T)[] {
        // eslint-disable-next-line no-useless-escape
        return idFields?.replace(' ', '').split(/[\,]+/) as (keyof T)[];
      }
    }
  })
  idFields = [];

  @internalProperty()
  fields: Array<SchemaModelField<T>> = [];

  constructor() {
    super();
    if (this.parentElement?.tagName !== 'DS-SCHEMA') {
      throw 'ds-schema 태그가 존재하지 않습니다.';
    }

    this._createFields();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    // if (name === 'id-fields' && value) {
    //   console.log('attributeChangedCallback');
    //   this._idFields = value.replace(' ', '').split(/[\,]+/) as (keyof T)[];
    // }
  }

  private _createFields(): void {
    const fieldElements: NodeListOf<SchemaModelField<T>> = this.querySelectorAll('ds-schema-model-field');
    for (let i = 0; i < fieldElements.length; i++) {
      this.fields.push(fieldElements[i]);
    }
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

@customElement('ds-schema')
export class Schema<T> extends LitElement {
  @internalProperty()
  model?: SchemaModel<T>;

  constructor() {
    super();
    if (this.parentElement?.tagName !== 'DEWS-DATASOURCE') {
      throw 'dews-datasource 태그가 존재하지 않습니다.';
    }

    this._createModel();
  }

  private _createModel(): void {
    const modelElement: SchemaModel<T> | null = this.querySelector('ds-schema-model');

    if (modelElement) this.model = modelElement!;
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
