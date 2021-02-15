import { DewsFormComponent } from '../base/DewsFormComponent.js';

import template from './slider.html';
import scss from './slider.scss';
import { property, PropertyValues } from 'lit-element';

type SLIDER_TYPE = 'range' | 'stepper';
type valueType = {
  startValue: number;
  endValue: number;
};

export class Slider extends DewsFormComponent {
  static styles = scss;

  @property({ type: Number, attribute: 'value' })
  _value: undefined | number;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 10;

  @property({ type: Number })
  step = 1;

  @property({ type: String, attribute: 'slider-type' })
  sliderType: SLIDER_TYPE = 'range';

  @property({ type: Boolean })
  hideText = false;

  @property({ type: Number })
  _endBtnLocation = 100;

  @property({ type: Number })
  _startBtnLocation = 0;

  @property({ type: Number })
  _tickBtnLocation = 0;

  @property({ type: Number })
  _tooltipLocation = 0;

  @property({ type: Number })
  _startValue: number | undefined;

  @property({ type: Number })
  _endValue: number | undefined;

  @property({ type: Number })
  _tickValue: number | undefined;

  @property({ type: String })
  _tickButtonClassName = 'slider-handle';

  private sliderWidth = 0;
  private pixelWidth = 0;

  render() {
    return template.call(this);
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this._startValue = this.min;
    this._endValue = this.max;
    this.sliderWidth = this.getBoundingClientRect().width;
    this.pixelWidth = this.sliderWidth / ((this.max - this.min) / this.step); // 전체에서 step 하나당 실제 거리
    const tooltip = this.shadowRoot!.querySelector<HTMLElement>('.slider-tooltip');
    if (tooltip !== null) {
      this._tooltipLocation = Math.round(tooltip.getBoundingClientRect().width / 2);
    }
    if (this.sliderType === 'stepper') {
      if (this.hideText) {
        const sliderQuantity = this.shadowRoot!.querySelector('.slider-quantity');
        sliderQuantity !== null ? sliderQuantity.remove() : '';
      }
      if (this._value !== undefined) {
        this._tickValue = this._value;
        this._tickBtnLocation = this._calculateLocation(this._value);
      }
    }
  }

  private _touchHandler(e: TouchEvent, buttonType: string) {
    if (this.disabled) {
      return;
    }
    this.sliderWidth = this.getBoundingClientRect().width;
    this.pixelWidth = this.sliderWidth / ((this.max - this.min) / this.step); // 전체에서 step 하나당 실제 거리
    const value = Math.round(e.changedTouches[0].clientX / this.pixelWidth) * this.step; // 실제 화면에 출력될 value 값
    if (value > -1 && value <= this.max) {
      if (buttonType === 'start' && this._startValue !== value && value < this._endValue!) {
        // 이전 값과 다르고 end 값보다 작을때 style 값이 변경되도록
        this._startValue = value;
        this._startBtnLocation = this._calculateLocation(value);
      } else if (buttonType === 'end' && this._endValue !== value && value > this._startValue!) {
        // 이전 값과 다르고 start 값보다 클때 style 값이 변경되도록
        this._endValue = value;
        this._endBtnLocation = this._calculateLocation(value);
      } else if (buttonType === 'tick' && this._tickValue !== value) {
        // 이전 값과 다를 때에만 style 값이 변경되도록
        this._tickValue = value;
        this._tickBtnLocation = this._calculateLocation(value);
      }
    }
  }

  private _calculateLocation(newValue: number) {
    const tooltip = this.shadowRoot!.querySelector<HTMLElement>('.slider-tooltip');
    if (tooltip !== null) {
      this._tooltipLocation = Math.round(tooltip.getBoundingClientRect().width / 2);
    }
    return Math.round((((newValue / this.step) * this.pixelWidth) / this.sliderWidth) * 100);
  }

  private _touchStartHandler(e: TouchEvent) {
    this._tickButtonClassName = 'slider-handle active';
  }

  private _touchEndHandler(e: TouchEvent) {
    this._tickButtonClassName = 'slider-handle';
  }

  private _minusBtnClick() {
    if (this.disabled) {
      return;
    }
    this._tickButtonClassName = 'slider-handle active';
    setTimeout(() => {
      this._tickButtonClassName = 'slider-handle';
    }, 500);
    if (this._tickValue !== undefined && this._tickValue > this.min) {
      this._tickValue -= this.step;
      this._tickBtnLocation = this._tickValue !== this.min ? this._calculateLocation(this._tickValue) : 0;
    }
  }

  private _plusBtnClick() {
    if (this.disabled) {
      return;
    }
    this._tickButtonClassName = 'slider-handle active';
    setTimeout(() => {
      this._tickButtonClassName = 'slider-handle';
    }, 500);
    if (this._tickValue === undefined) {
      this._tickValue = this.min;
    }
    if (this._tickValue !== undefined && this._tickValue < this.max) {
      this._tickValue += this.step;
      this._tickBtnLocation = this._calculateLocation(this._tickValue);
    }
  }

  public value(val?: number | valueType): number | object | undefined {
    if (val !== undefined) {
      if (typeof val === 'object' && this.sliderType === 'range') {
        if (val.startValue !== undefined) {
          this._startValue = val.startValue;
          this._startBtnLocation = this._calculateLocation(val.startValue);
        }
        if (val.endValue !== undefined) {
          this._endValue = val.endValue;
          this._endBtnLocation = this._calculateLocation(val.endValue);
        }
      } else if (typeof val === 'number' && this.sliderType === 'stepper') {
        this._tickValue = val;
        this._tickBtnLocation = this._calculateLocation(val);
      }
    } else {
      if (this.sliderType === 'range') {
        if (this._startValue === undefined) {
          this._startValue = this.min;
        }
        if (this._endValue === undefined) {
          this._endValue = this.max;
        }
        return { startValue: this._startValue, endValue: this._endValue };
      } else {
        if (this._tickValue === undefined) {
          this._tickValue = this._value === undefined ? this.min : this._value;
        }
        return this._tickValue;
      }
    }
  }
}
