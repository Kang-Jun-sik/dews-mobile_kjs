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

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement?.tagName === 'DEWS-DROPDOWNLIST') {
      this.$parent = this.parentElement as Dropdownlist;
      console.log(this.$parent);
      if (this.parentElement.hasAttribute('multi')) {
        this.multi = true;
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
    this.$parent!._close();
  }

  private _multiItemSelectHandler(e: MouseEvent) {
    const $el: HTMLElement = (e.currentTarget as HTMLElement).querySelector('.multi-checkbox') as HTMLElement;
    this.checked = !this.checked;

    if ($el.hasAttribute('checked')) {
      if ((e.target as HTMLElement).localName !== 'dews-checkbox') {
        $el.removeAttribute('checked');
      }
    } else {
      if ((e.target as HTMLElement).localName !== 'dews-checkbox') {
        this.$parent?._EVENT.emit('checked', { target: this, type: 'checked' });
        $el.setAttribute('checked', 'true');
      }
    }
    this.$parent?._EVENT.emit('change', { target: this, type: 'change' });
  }

  render() {
    return template.call(this);
  }
}
