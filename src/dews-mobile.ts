import 'reflect-metadata';

export * from './app/exports.js';
export * from './components/exports.js';
export { css, html } from 'lit-element';

import { DewsMobileInterface } from './app/DewsMobileInterface.js';
import { MobileAppBridgeInterface } from './app/env/mobileApp/MobileAppBridgeInterface.js';

declare global {
  interface Window {
    dews: DewsMobileInterface;
    DzMobileBridge: MobileAppBridgeInterface;
  }

  const dews: DewsMobileInterface;
}

import { app } from './app/ApplicationContext.js';
import { api, ajax } from '@dews/dews-mobile-core';
import { ui } from './app/GlobalComponentRegister.js';

window.dews = {
  app,
  api,
  ajax,
  ui
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
  CustomContainer,
  InfoboxContainer,
  Complex,
  Tooltip,
  Togglebutton,
  Yearpicker,
  Monthpicker,
  Progressbar,
  Cardlist,
  DataSource,
  Drawerlayout,
  DropdownlistItem,
  Containercontent,
  Containerbutton,
  Containersummary,
  Columnsetbutton,
  Columnitem,
  Codepicker,
  Monthperiodpicker,
  Weekperiodpicker,
  Codepickersearch,
  Zipcodepicker,
  Sortbutton,
  SortbuttonItem,
  Datetimepicker,
  Qrcode,
  Barcode
} from './components/exports.js';

window.customElements.define('columnset-button', Columnsetbutton);
window.customElements.define('column-item', Columnitem);

window.customElements.define('dews-dropdownlist', Dropdownlist);
window.customElements.define('dews-datepicker', Datepicker);
window.customElements.define('dews-periodpicker', Periodpicker);
window.customElements.define('dews-timepicker', Timepicker);
window.customElements.define('dews-yearpicker', Yearpicker);
window.customElements.define('dews-monthpicker', Monthpicker);
window.customElements.define('dews-weekperiodpicker', Weekperiodpicker);
window.customElements.define('dews-monthperiodpicker', Monthperiodpicker);
window.customElements.define('dews-codepicker', Codepicker);
window.customElements.define('codepicker-search', Codepickersearch);
window.customElements.define('dews-zipcodepicker', Zipcodepicker);

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
window.customElements.define('dews-cardlist', Cardlist);
window.customElements.define('dews-complex', Complex);
window.customElements.define('dews-togglebutton', Togglebutton);
window.customElements.define('dropdownlist-item', DropdownlistItem);
window.customElements.define('dews-datetimepicker', Datetimepicker);

window.customElements.define('dews-messagebox', Messagebox);
window.customElements.define('dews-snackbar', Snackbar);
window.customElements.define('dews-loading', Loading);
window.customElements.define('dews-slider', Slider);
window.customElements.define('dews-tooltip', Tooltip);
window.customElements.define('dews-progressbar', Progressbar);
window.customElements.define('dews-qrcode', Qrcode);
window.customElements.define('dews-barcode', Barcode);

window.customElements.define('dews-area-panel', AreaPanel);
window.customElements.define('area-item', AreaItem);
window.customElements.define('dews-box', Box);
window.customElements.define('dews-tabs', Tabs);
window.customElements.define('dews-tab', Tab);

window.customElements.define('dews-infobox-container', InfoboxContainer);
window.customElements.define('dews-search-container', SearchContainer);
window.customElements.define('dews-form-container', FormContainer);
window.customElements.define('dews-list-container', ListContainer);
window.customElements.define('dews-custom-container', CustomContainer);
window.customElements.define('form-section', FormSection);
window.customElements.define('dews-datasource', DataSource);
window.customElements.define('drawer-layout', Drawerlayout);
window.customElements.define('container-content', Containercontent);
window.customElements.define('container-button', Containerbutton);
window.customElements.define('container-summary', Containersummary);
window.customElements.define('sort-button', Sortbutton);
window.customElements.define('sort-item', SortbuttonItem);
