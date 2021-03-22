import scss from './qrcode.scss';
import template from './qrcode.html';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { PropertyValues, property } from 'lit-element';
import qrcode from 'qrcode-generator-es6';

export class Qrcode extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true })
  color = 'black';

  @property({ type: String, reflect: true })
  size = '';

  @property({ type: Boolean, reflect: true })
  reflect = false;

  @property({ type: Boolean, reflect: true })
  border = false;

  @property({ type: String, reflect: true, attribute: 'border-size' })
  border_size = '5px';

  @property({ type: String, reflect: true, attribute: 'border-color' })
  border_color = 'black';

  connectedCallback() {
    super.connectedCallback();
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const qr = new qrcode(0, 'H');
    const $el = this.shadowRoot?.getElementById('qrcode') as HTMLDivElement;
    qr.addData(this.value);
    qr.make();
    $el.innerHTML = qr.createSvgTag({
      cellColor: (c: number, r: number) => this.color,
      margin: 0
    });
    $el.style.borderWidth = this.border_size;
    $el.style.borderColor = this.border_color;
  }

  render() {
    return template.call(this);
  }
}
