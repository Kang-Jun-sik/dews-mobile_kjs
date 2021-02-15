import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Slider'
};

export const Slider = () => html`<div>
  <p style="padding: 5px; background-color: bisque">범위 슬라이더 예시 (기본)</p>
  <dews-slider></dews-slider>
  <p style="padding: 5px; background-color: bisque">범위 슬라이더 예시 (disabled)</p>
  <dews-slider disabled></dews-slider>
  <p style="padding: 5px; background-color: bisque">범위 슬라이더 예시</p>
  <dews-slider slider-type="range" max="20" min="0" step="4"></dews-slider>
  <p style="padding: 5px; background-color: bisque">스텝퍼 슬라이더 예시</p>
  <dews-slider slider-type="stepper" max="20" min="0" step="4" value="4"></dews-slider>
  <p style="padding: 5px; background-color: bisque">스텝퍼 슬라이더 예시 (disabled)</p>
  <dews-slider slider-type="stepper" disabled max="20" min="0" step="4" value="4"></dews-slider>
  <p style="padding: 5px; background-color: bisque">스텝퍼 슬라이더 예시 (hideText)</p>
  <dews-slider slider-type="stepper" max="20" min="0" step="4" hideText></dews-slider>
</div>`;
