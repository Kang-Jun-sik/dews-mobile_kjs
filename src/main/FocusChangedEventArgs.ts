import { Box } from '../components/box/box.js';
import { Tabs } from '../components/tabs/tabs.js';

export class FocusChangedEventArgs extends CustomEvent<any> {
  focusTarget: Box | Tabs;
}
