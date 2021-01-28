import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './tooltip.html';
import scss from './tooltip.scss';
import { internalProperty, property, PropertyValues } from 'lit-element';

type TOOLTIP_TYPE = 'normal' | 'required' | 'title';
type TOOLTIP_POSITION = 'top' | 'bottom';
export type TOOLTIP_OPTIONS = {
  type?: TOOLTIP_TYPE;
  text?: string;
  position?: TOOLTIP_POSITION;
  durationTime?: number;
  fadeOutTime?: number;
  closeButton?: boolean;
  title?: string;
};

export class Tooltip extends DewsFormComponent {
  static styles = scss;

  @property({ type: Object })
  options: TOOLTIP_OPTIONS = {
    type: 'normal',
    text: '',
    position: 'bottom',
    durationTime: 0,
    fadeOutTime: 2000,
    closeButton: true,
    title: undefined
  };

  @property({ type: Object })
  _target: HTMLElement | null = null;

  @internalProperty()
  _className = 'tooltip-wrap';

  @internalProperty()
  _style = '';

  @internalProperty()
  _visibility = 'hidden';

  @internalProperty()
  _tooltipLeft = '0px';

  @internalProperty()
  _tooltipTop = '0px';

  private _type: TOOLTIP_TYPE | undefined = 'normal';
  private _closeButton: boolean | undefined = true;
  private _durationTime: number | undefined = 0;
  private _fadeOutTime: number | undefined = 2000;
  private _position: TOOLTIP_POSITION | undefined = 'bottom';
  private _text: string | undefined = '';
  private _title: string | undefined = undefined;
  private _showFlag = true;

  render() {
    return template.call(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.touchEvent);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.touchEvent);
  }

  private touchEvent: EventListener = this.touchOtherArea.bind(this) as EventListener;

  touchOtherArea(e: Event) {
    if ((e.target as HTMLElement).localName !== 'dews-tooltip' && this._showFlag) {
      this.remove();
    } else if (!this._showFlag) {
      this._showFlag = true;
    }
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    const tooltip = this.shadowRoot!.querySelector('.tooltip-wrap') as HTMLElement;
    if (tooltip !== null && this._target !== null) {
      const tooltipLeft =
        this._target?.getBoundingClientRect().x + this._target?.clientWidth / 2 - tooltip.clientWidth / 2;
      this._tooltipLeft = tooltipLeft + 'px';
      if (tooltipLeft + tooltip.clientWidth > window.innerWidth) {
        this._tooltipLeft = 'calc(100vw - (' + Number(tooltip.clientWidth + 20) + 'px))';
      } else if (tooltipLeft < 0) {
        this._tooltipLeft = '20px';
      }

      if (this._position === 'top') {
        this._tooltipTop = this._target?.getBoundingClientRect().y - tooltip.offsetHeight - 10 - 5 + 'px';
      } else {
        this._tooltipTop = this._target?.getBoundingClientRect().y + this._target?.offsetHeight + 10 + 5 + 'px';
      }

      this._className += ' active';

      if (this._fadeOutTime !== undefined && this._fadeOutTime > 0) {
        tooltip.addEventListener('transitionend', (e: TransitionEvent) => {
          if (this._durationTime === 0 && this._className.includes('active')) {
            this._className = this._className.replace('active', '');
            if (this._fadeOutTime !== undefined && this._fadeOutTime > 0)
              this._style += 'transition-duration: ' + this._fadeOutTime / 1000 + 's';
          } else if (!this._className.includes('active')) {
            this.remove();
          }
        });

        if (this._durationTime !== undefined && this._durationTime > 0) {
          setTimeout(() => {
            this._className = this._className.replace('active', '');
            if (this._fadeOutTime !== undefined && this._fadeOutTime > 0)
              this._style += 'transition-duration: ' + this._fadeOutTime / 1000 + 's';
          }, this._durationTime);
        }
      }
    }
  }

  protected updated(_changedProperties: PropertyValues) {
    super.updated(_changedProperties);
    if (this._visibility === 'hidden') {
      this._visibility = 'visible';
      this._showFlag = false;
    }
  }

  show() {
    if (this._target === null) {
      this.remove();
    } else {
      const body = document.querySelector('body');

      if (body !== null) {
        body.append(this);
      }

      for (const prop in this.options) {
        switch (prop) {
          case 'type':
            this._type = this.options[prop];
            break;
          case 'text':
            this._text = this.options[prop];
            break;
          case 'position':
            this._position = this.options[prop];
            break;
          case 'durationTime':
            this._durationTime = this.options[prop];
            break;
          case 'fadeOutTime':
            this._fadeOutTime = this.options[prop];
            break;
          case 'closeButton':
            this._closeButton = this.options[prop];
            break;
          case 'title':
            this._title = this.options[prop];
            break;
        }
      }

      if (this._position === 'top') {
        this._className += ' tooltip-top';
      }

      if (this._type === 'required') {
        this._className += ' require-tooltip';
        if (this._text === '') {
          this._text = '필수 입력 항목입니다.';
        }
      } else if (this._type === 'normal' && this._closeButton) {
        this._className += ' button-close';
      }

      if (this._type === 'title') {
        this._className += ' title-tooltip button-close';
      }
    }
  }

  private _closeTooltip() {
    this.remove();
  }
}
