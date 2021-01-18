import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'Complex'
};

export const Complex = () => html`
  <div style="width: 360px">
    <dews-complex required title="1번 조합">
      <dews-dropdownlist title="항목명">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
        <dropdownlist-item title="DATA-3"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-button text="확인" title="항목"></dews-button>
    </dews-complex>

    <dews-complex title="2번 조합">
      <dews-dropdownlist title="항목명" width="100px">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
        <dropdownlist-item title="DATA-3"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-textbox title="항목"></dews-textbox>
    </dews-complex>

    <dews-complex title="3번조합">
      <dews-dropdownlist width="100px">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
        <dropdownlist-item title="DATA-3"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-numerictextbox value="100,000" suffix="만원" />
    </dews-complex>

    <dews-complex title="4번 조합">
      <dews-dropdownlist width="100px">
        <dropdownlist-item title="DATA-1"></dropdownlist-item>
        <dropdownlist-item title="DATA-2"></dropdownlist-item>
        <dropdownlist-item title="DATA-3"></dropdownlist-item>
      </dews-dropdownlist>
      <dews-numerictextbox required suffix="만원" decimals="10">
        <numericbox-button step="500"></numericbox-button>
      </dews-numerictextbox>
    </dews-complex>

    <dews-complex title="5번조합">
      <complex-line>
        <dews-dropdownlist>
          <dropdownlist-item title="DATA-1"></dropdownlist-item>
          <dropdownlist-item title="DATA-2"></dropdownlist-item>
          <dropdownlist-item title="DATA-3"></dropdownlist-item>
        </dews-dropdownlist>
      </complex-line>
      <complex-line>
        <dews-textbox></dews-textbox>
      </complex-line>
    </dews-complex>

    <dews-complex title="6번조합">
      <complex-line>
        <dews-datepicker value="20200801"></dews-datepicker>
        <dews-checkbox title="종일"> </dews-checkbox>
      </complex-line>
      <complex-line>
        <dews-datepicker value="20200801"></dews-datepicker>
        <span class="text">-</span>
        <dews-datepicker value="20201231"></dews-datepicker>
      </complex-line>
    </dews-complex>

    <dews-complex title="7번조합">
      <dews-textbox value="자격증"></dews-textbox>
      <dews-button type="icon" icon="ico-set"></dews-button>
    </dews-complex>

    <dews-complex title="8번조합">
      <dews-textbox></dews-textbox>
      <span class="text">-</span>
      <dews-textbox></dews-textbox>
      <span class="text">-</span>
      <dews-textbox></dews-textbox>
    </dews-complex>
  </div>
`;
