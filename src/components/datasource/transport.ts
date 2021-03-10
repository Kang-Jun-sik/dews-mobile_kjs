import { customElement, LitElement, property, PropertyValues } from 'lit-element';

/* eslint-disable @typescript-eslint/no-explicit-any */
@customElement('ds-transport-read')
export class TransportRead extends LitElement {
  constructor() {
    super();
    if (this.parentElement?.tagName !== 'DS-TRANSPORT') {
      throw 'ds-transport 태그가 존재하지 않습니다.';
    }
  }

  @property({ type: String })
  url = '';

  @property({ type: String })
  type: 'get' | 'post' = 'get';

  // @property({ type: Object })
  data: any = null;

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    // if (name === 'data' && value) {
    //   return JSON.parse(value);
    // }
  }

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
    if (this.parentElement?.tagName !== 'DEWS-DATASOURCE') {
      throw 'dews-datasource 태그가 존재하지 않습니다.';
    }
    this._createRead();
    this._createSave();
  }

  private _createRead(): void {
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
    super.connectedCallback();
    await this.updateComplete;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    return super.shouldUpdate(_changedProperties);
  }

  protected update(changedProperties: PropertyValues) {
    super.update(changedProperties);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
  }

  protected createRenderRoot(): Element | ShadowRoot {
    return this;
  }
}
