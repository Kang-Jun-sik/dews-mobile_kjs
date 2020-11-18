import { DewsLayoutComponent } from '../base/DewsLayoutComponent.js';
import { internalProperty, property } from 'lit-element';

import template from './box.html';
import scss from './box.scss';
// import { MainButton, MainButtonSet } from '../../app/main/MainButtons.js';

// noinspection JSUnusedLocalSymbols
export class Box extends DewsLayoutComponent {
  static styles = scss;

  @property({ type: String, reflect: true })
  title = '';

  @property({ type: Boolean })
  collapsed = false;

  @property({ type: Boolean })
  hide = false;

  @internalProperty()
  height = 'auto';

  private slotHeight: string | undefined;

  // 하단 버튼
  @property({ type: String, attribute: 'button-set' })
  buttonSet = '';

  // public _mainButtonSet: MainButtonSet | undefined;

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    await this.setMainButtonSet();
    this.addEventListener('click', this._clickEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._clickEvent);
  }
  private async setMainButtonSet(): Promise<void> {
    if (this.buttonSet !== '') {
      // const mainButtonSet = new MainButtonSet();
      this.buttonSet.split(',').forEach(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const mainButton = mainButtonSet[item] as MainButton;
        if (mainButton) {
          mainButton.show();
          mainButton.onclick = () => {
            alert(`click: ${item}`);
          };
        } else {
          console.error(`Main Button Set Error: ${this.title} ${item}`);
        }
      });
      // this._mainButtonSet = mainButtonSet;
    }
    return;
  }

  public _blurEvent() {
    //블러이벤트
  }

  private _clickEvent(e: Event) {
    // 직접 일으킨 이벤트만 처리하기 위해 isTrusted 사용
    if (e.isTrusted) {
      this._focusChanging(e);
    }
  }

  private _onToggleClick(e: Event) {
    this._toggleOpened(e);
  }

  private _toggleOpened(e?: Event) {
    if (!this.collapsed) {
      this.collapsed = true;
      this.height = '0px';
      const close = new CustomEvent('close');
      this.dispatchEvent(close);
    } else {
      // this.open();
      const open = new CustomEvent('open');
      this.dispatchEvent(open);
      this.collapsed = false;
      this.height = this.slotHeight as string;
    }
  }

  protected enable: Function = (value: boolean) => {
    return (this.collapsed = value);
  };

  private async slotChange() {
    if (this.collapsed) {
      this.height = '0px';
    }
    const children = this.shadowRoot!.querySelectorAll('*');
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    await Promise.all(Array.from(children).map(c => c.updateComplete));
    this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content-wrap')?.clientHeight}px`;
    if (!this.collapsed) {
      this.height = this.slotHeight;
    } else {
      this.slotHeight = `${this.shadowRoot!.querySelector('.dews-box-content')?.clientHeight}px`;
    }
  }

  render() {
    console.log('render');
    return this.hide ? null : template.call(this);
  }
}
