import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';
import { Dropdownlist } from './dropdownlist.js';
import template from './dropdownlist-item.html';
import scss from './dropdownlist-item.scss';

export class DropDownListItem extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  private multi = false;

  private $parent: Dropdownlist | undefined;
  private once: undefined | boolean;
  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement?.tagName === 'DEWS-DROPDOWNLIST') {
      this.$parent = this.parentElement as Dropdownlist;
      console.log(this.$parent);
      if (this.parentElement.hasAttribute('multi')) {
        this.multi = true;
      }
      if (this.parentElement.hasAttribute('once')) {
        this.once = true;
      }
    }
  }

  private _singleItemSelectHandler(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    this.shadowRoot!.querySelector('.check')?.classList?.remove('check');
    $el.classList.add('check');
    this.$parent!.select[0] = $el.dataset.value as string;
    this.$parent!._EVENT.emit('select', { target: this, type: 'select', item: this.$parent!.select[0] });
    this.$parent!._EVENT.emit('change', { target: this, type: 'change' });
    if (this.once) {
      this.$parent!._close();
    }
  }

  private _multiItemSelectHandler(e: MouseEvent) {
    this.checked = !this.checked;
  }

  render() {
    return template.call(this);
  }
}
