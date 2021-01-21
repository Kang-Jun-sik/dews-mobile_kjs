import { customElement, LitElement, property, PropertyValues } from 'lit-element';

@customElement('ds-transport-read')
export class TransportRead extends LitElement {
  constructor() {
    super();
    console.log('read constructor');
    if (this.parentElement?.tagName !== 'DS-TRANSPORT') {
      throw 'ds-transport 태그가 존재하지 않습니다.';
    }
  }

  @property({ type: String })
  url = '';

  @property({ type: String })
  type: 'get' | 'post' = 'get';

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

@customElement('ds-transport-save')
export class TransportSave extends LitElement {
  @property({ type: String })
  url = '';

  constructor() {
    super();
    console.log('save constructor');
    if (this.parentElement?.tagName !== 'DS-TRANSPORT') {
      throw 'ds-transport 태그가 존재하지 않습니다.';
    }
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}

@customElement('ds-transport')
export class Transport extends LitElement {
  read?: TransportRead;
  save?: TransportSave;

  constructor() {
    super();
    console.log('transport constructor', this);
    if (this.parentElement?.tagName !== 'DEWS-DATASOURCE') {
      throw 'dews-datasource 태그가 존재하지 않습니다.';
    }
    this._createRead();
    this._createSave();
  }

  private _createRead(): void {
    console.log('transport/_createRead');
    const readElement: TransportRead | null = this.querySelector('ds-transport-read');
    if (readElement) {
      this.read = readElement;
    }
  }

  private _createSave(): void {
    const saveElement: TransportSave | null = this.querySelector('ds-transport-save');
    if (saveElement) {
      this.save = saveElement;
    }
  }

  async connectedCallback() {
    console.log('ds-transport connectedCallback');
    super.connectedCallback();
    await this.updateComplete;
    console.log('transport updateComplete');
  }

  disconnectedCallback() {
    console.log('ds-transport disconnectedCallback');
    super.disconnectedCallback();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    console.log('ds-transport attributeChangedCallback');
    super.attributeChangedCallback(name, old, value);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    console.log('ds-transport shouldUpdate');
    return super.shouldUpdate(_changedProperties);
  }

  protected update(changedProperties: PropertyValues) {
    console.log('ds-transport updated');
    super.update(changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    console.log('ds-transport firstUpdated');
    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    console.log('ds-transport updated');
    super.updated(_changedProperties);
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
