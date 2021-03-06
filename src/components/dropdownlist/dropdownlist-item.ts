import { DewsFormComponent } from '../base/DewsFormComponent.js';
import { property } from 'lit-element';
import { Dropdownlist } from './dropdownlist.js';
import template from './dropdownlist-item.html';
import scss from './dropdownlist-item.scss';

export class DropdownlistItem extends DewsFormComponent {
  static styles = scss;

  constructor() {
    super();
  }

  @property({ type: String })
  title = '';

  @property({ type: String, reflect: true })
  field: string | undefined;

  @property({ type: String, reflect: true })
  label: string | undefined;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  private multi = false;

  private $parent: Dropdownlist | undefined;

  connectedCallback() {
    super.connectedCallback();
    if (this.parentElement?.tagName === 'DEWS-DROPDOWNLIST') {
      this.$parent = this.parentElement as Dropdownlist;
      if (this.parentElement.hasAttribute('multi')) {
        this.multi = true;
      }
    }
    if (this.field === undefined) {
      if (this.label !== undefined && this.label !== '') {
        this.field = this.label;
      } else {
        this.field = this.title;
      }
    }
    if (this.title === '') {
      if (this.label !== undefined && this.label !== '') {
        this.title = this.label;
      } else {
        this.title = `${this.field}`;
      }
    }
  }

  private _singleItemSelectHandler(e: MouseEvent) {
    const $el: HTMLElement = e.currentTarget as HTMLElement;
    Array.from(this.$parent?.children!).forEach($el => {
      if ($el.hasAttribute('checked')) {
        $el.removeAttribute('checked');
      }
    });
    this.checked = true;
    this.$parent!.select[0] = $el.dataset.value as string;
    this.$parent!.value = this.value;
    this.$parent!._EVENT.emit('select', { target: this, type: 'select', item: this.$parent!.select[0] });
    this.$parent!._EVENT.emit('change', { target: this, type: 'change' });
    this.$parent!._singleClickHandler();
    this.$parent!.close();
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
        this.$parent!.value = this.value;
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
