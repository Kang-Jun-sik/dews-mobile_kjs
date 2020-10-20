export { NavigationBar } from './main/components/NavigationBar.js';
export { ButtonTabBar } from './main/components/ButtonTabBar.js';

import './main/index.js';
export { Main } from './main/main.js';
export { DewsComponent } from './core/baseclass/DewsComponent.js';
export { DewsBizPage } from './core/baseclass/DewsBizPage.js';
export { DewsDialogPage } from './core/baseclass/DewsDialogPage.js';

export { css, html } from 'lit-element';
export { TemplateResult } from 'lit-html';
export { PageLoadedEventArgs } from './main/PageLoadedEventArgs.js';
export { PageLoadingEventArgs } from './main/PageLoadingEventArgs.js';

// layout 컴포넌트
import { Box } from './components/box/box.js';
import { Tab } from './components/tab/tab.js';
import { Tabs } from './components/tabs/tabs.js';
import { AreaPanel } from './components/areapanel/areapanel.js';
import { AreaItem } from './components/areaitem/areaitem.js';
import { Container } from './components/container/container.js';
import { Button } from './components/button/button.js';

export { Tabs, Tab, Box, AreaPanel };
window.customElements.define('dews-button', Button);
window.customElements.define('dews-area-panel', AreaPanel);
window.customElements.define('area-item', AreaItem);
window.customElements.define('dews-box', Box);
window.customElements.define('dews-tabs', Tabs);
window.customElements.define('dews-tab', Tab);
window.customElements.define('dews-container', Container);
