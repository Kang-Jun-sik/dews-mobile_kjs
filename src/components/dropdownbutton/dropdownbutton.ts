import { html, property, query, TemplateResult } from 'lit-element';
import { DewsFormComponent } from '../base/DewsFormComponent.js';
import template from './dropdownbutton.html';
import scss from './dropdownbutton.scss';

export enum SIZE_LIST {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large'
}

export enum UI_LIST {
  'solid' = 'solid',
  'emphasize' = 'emphasize'
}

export class Dropdownbutton extends DewsFormComponent {
  static styles = scss;

  @query('.dews-button.dropdown')
  private button: HTMLElement | undefined;

  @query('.button-list')
  private buttonList: HTMLElement | undefined;

  private childButtons: Array<TemplateResult> = [];

  // 드롭다운 버튼 내부 버튼
  public buttons: Element[] = [];

  @property({ type: String })
  text = '';

  @property({ type: String })
  ui = UI_LIST.solid;

  @property({ type: String })
  size: SIZE_LIST = SIZE_LIST.medium;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  group = ''; // 버튼그룹 내부

  @property({ type: Boolean, reflect: true })
  _selected = false;

  connectedCallback() {
    super.connectedCallback();

    this.querySelectorAll('dropdown-childbutton').forEach(btn => {
      this.buttons.push(btn);
      this.childButtons.push(html`${btn}`);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return template.call(this);
  }

  private _setListPosition() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const buttonX = this.getBoundingClientRect().x;
    const buttonY = this.getBoundingClientRect().y;
    const buttonHeight = this.button!.offsetHeight;
    const buttonRight = this.button!.getBoundingClientRect().right;
    const list = this.buttonList!;
    const listHeight = list.offsetHeight;
    const listWidth = list.offsetWidth;

    list.style.position = 'fixed';
    list.style.left = '';
    list.style.right = '';

    //위로 열릴때
    if (buttonY + listWidth >= windowHeight) {
      if (buttonX + listWidth >= windowWidth) {
        //오른쪽 기준으로 열릴 때
        list.classList.add('right');
        list.style.top = buttonY - listHeight + 'px';
        list.style.right = windowWidth - buttonRight + 'px';
      } else {
        // 왼쪽 기준으로 열릴 때
        list.classList.add('left');
        list.style.top = buttonY - listHeight + 'px';
        list.style.left = buttonX + 'px';
      }
    } else {
      // 아래로 열릴 때
      if (buttonX + listWidth >= windowWidth) {
        //오른쪽 기준으로 열릴 때
        list.classList.add('right');
        list.style.top = buttonY + buttonHeight + 'px';
        list.style.right = windowWidth - buttonRight + 'px';
      } else {
        list.classList.add('left');
        list.style.top = buttonY + buttonHeight + 'px';
        list.style.left = buttonX + 'px';
      }
    }
  }

  private _clickHandler(e: Event) {
    e.stopPropagation();

    if (!this.disabled) {
      if (this._selected) {
        // 닫기
        this._selected = false;
      } else {
        document.body.click();

        // List-Container
        const customButton = this.closest('.option-custom-button ul');

        if (customButton !== null) {
          this.buttonList!.classList.add('selected');
          this._setListPosition();
          customButton.addEventListener('scroll', this._documentWheel.bind(this));
        }

        // 열기
        this._selected = true;

        window.addEventListener('click', this._documentClick.bind(this));
        window.addEventListener('scroll', this._documentWheel.bind(this));
        window.addEventListener('resize', this._documentWheel.bind(this));
      }
    }
  }

  private _documentWheel() {
    this._selected = false;

    window.removeEventListener('click', this._documentClick);
    window.removeEventListener('scroll', this._documentWheel);
  }

  private _documentClick(e: Event) {
    if (this !== (e.target as HTMLElement).closest('dews-dropdownbutton')) {
      this._selected = false;
    }

    window.removeEventListener('click', this._documentClick);
    window.removeEventListener('scroll', this._documentWheel);
  }

  /**
   *  ID를 이용하여 내부 버튼을 가져옵니다.
   * @param id
   */
  public getById(id: string) {
    for (let i = 0; this.buttons.length; i++) {
      if (this.buttons[i].getAttribute('id') === id) {
        return this.buttons[i];
      }
    }
    return null;
  }
}
