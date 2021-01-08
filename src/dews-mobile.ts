import 'reflect-metadata';

export * from './app/exports.js';
export * from './components/exports.js';
export { css, html } from 'lit-element';

import { DewsMobileInterface } from './app/DewsMobileInterface.js';

declare global {
  interface Window {
    dews: DewsMobileInterface;
  }

  const dews: DewsMobileInterface;
}

import { app } from './app/ApplicationContext.js';

window.dews = {
  app
};

import {
  Checkbox,
  CheckboxGroup,
  Textbox,
  Button,
  ButtonGroup,
  Radiobutton,
  RadiobuttonGroup,
  Numerictextbox,
  Masktextbox,
  Box,
  Dropdownlist,
  AreaPanel,
  AreaItem,
  FormContainer,
  FormSection,
  ListContainer,
  SearchContainer,
  Tabs,
  Tab,
  Datepicker,
  Periodpicker,
  Timepicker,
  Messagebox,
  Dropdownbutton,
  Childbutton,
  Snackbar,
  Loading,
  Slider,
  Customcontainer,
  Infobox,
  Complex,
  Tooltip,
  Togglebutton,
  Yearpicker,
  Monthpicker,
  Progressbar
} from './components/exports.js';

window.customElements.define('dews-dropdownlist', Dropdownlist);
window.customElements.define('dews-datepicker', Datepicker);
window.customElements.define('dews-periodpicker', Periodpicker);
window.customElements.define('dews-timepicker', Timepicker);
window.customElements.define('dews-yearpicker', Yearpicker);
window.customElements.define('dews-monthpicker', Monthpicker);

window.customElements.define('dews-masktextbox', Masktextbox);
window.customElements.define('dews-numerictextbox', Numerictextbox);
window.customElements.define('dews-textbox', Textbox);
window.customElements.define('dews-button', Button);
window.customElements.define('dews-dropdownbutton', Dropdownbutton);
window.customElements.define('dropdown-childbutton', Childbutton);
window.customElements.define('dews-button-group', ButtonGroup);
window.customElements.define('dews-checkbox-group', CheckboxGroup);
window.customElements.define('dews-checkbox', Checkbox);
window.customElements.define('dews-radiobutton', Radiobutton);
window.customElements.define('dews-radiobutton-group', RadiobuttonGroup);
window.customElements.define('dews-complex', Complex);
window.customElements.define('dews-togglebutton', Togglebutton);

window.customElements.define('dews-messagebox', Messagebox);
window.customElements.define('dews-snackbar', Snackbar);
window.customElements.define('dews-loading', Loading);
window.customElements.define('dews-slider', Slider);
window.customElements.define('dews-tooltip', Tooltip);
window.customElements.define('dews-progressbar', Progressbar);

window.customElements.define('dews-area-panel', AreaPanel);
window.customElements.define('area-item', AreaItem);
window.customElements.define('dews-box', Box);
window.customElements.define('dews-tabs', Tabs);
window.customElements.define('dews-tab', Tab);

window.customElements.define('dews-infobox-container', Infobox);
window.customElements.define('dews-search-container', SearchContainer);
window.customElements.define('dews-form-container', FormContainer);
window.customElements.define('dews-list-container', ListContainer);
window.customElements.define('dews-custom-container', Customcontainer);
window.customElements.define('form-section', FormSection);
