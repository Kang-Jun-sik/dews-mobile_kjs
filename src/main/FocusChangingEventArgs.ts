import { AreaType } from './AreaType.js';

export class FocusChangingEventArgs extends CustomEvent<any> {
  focusTarget: AreaType;
}
