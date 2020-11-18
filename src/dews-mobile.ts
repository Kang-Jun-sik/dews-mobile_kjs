import 'reflect-metadata';

export * from './app/exports.js';

import { app } from './app/ApplicationContext.js';
window.dews = {
  app
};

import {
  Checkbox,
  Checkboxgroup,
  Textbox,
  Button,
  Radiobutton,
  Radiobuttongroup,
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
  Datepicker
} from './components/exports.js';

window.customElements.define('dews-dropdownlist', Dropdownlist);
window.customElements.define('dews-datepicker', Datepicker);

window.customElements.define('dews-masktextbox', Masktextbox);
window.customElements.define('dews-numerictextbox', Numerictextbox);
window.customElements.define('dews-textbox', Textbox);
window.customElements.define('dews-button', Button);
window.customElements.define('dews-checkbox-group', Checkboxgroup);
window.customElements.define('dews-checkbox', Checkbox);
window.customElements.define('dews-radiobutton', Radiobutton);
window.customElements.define('dews-radiobutton-group', Radiobuttongroup);

window.customElements.define('dews-area-panel', AreaPanel);
window.customElements.define('area-item', AreaItem);
window.customElements.define('dews-box', Box);
window.customElements.define('dews-tabs', Tabs);
window.customElements.define('dews-tab', Tab);

window.customElements.define('dews-search-container', SearchContainer);
window.customElements.define('dews-form-container', FormContainer);
window.customElements.define('dews-list-container', ListContainer);
window.customElements.define('form-section', FormSection);
