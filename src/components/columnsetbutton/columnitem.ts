import template from './columnitem.html';
import scss from './columnitem.scss';
import { internalProperty, property } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { Columnsetbutton } from './columnsetbutton.js';

export class Columnitem extends DewsFormComponent {
  static styles = scss;

  @property({ type: String })
  field: string | undefined;

  @property({ type: String })
  label: string | undefined;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @internalProperty()
  title = '';

  public $pel: Columnsetbutton | undefined;

  constructor() {
    super();
    if (this.parentElement?.tagName === 'COLUMNSET-BUTTON') {
      this.$pel = this.parentElement as Columnsetbutton;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.label !== undefined) {
      this.title = this.label;
    } else {
      if (this.field !== undefined) {
        this.title = this.field;
      }
    }
  }

  private _clickHandler(e: Event) {
    this.checked = !this.checked;
    (this.$pel as Columnsetbutton)._emit('change', { target: this, type: 'change' });
  }

  render() {
    return template.call(this);
  }
}
