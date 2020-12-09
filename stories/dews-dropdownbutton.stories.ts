import { html } from 'lit-html';
import '../src/dews-mobile.js';

export default {
  title: 'DropdownButton'
};

export const DropdownButton = () => html` <div style="width: 360px">
  <dews-dropdownbutton text="드롭다운버튼"></dews-dropdownbutton>
</div>`;
