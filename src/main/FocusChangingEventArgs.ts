import { Box } from '../components/box/box.js';
import { Tabs } from '../components/tabs/tabs.js';

export class FocusChangingEventArgs extends CustomEvent<any> {
  focusTarget: Box | Tabs;
}
