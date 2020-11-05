import { AreaType } from './AreaType.js';

export class FocusChangedEventArgs extends CustomEvent<any> {
  focusTarget: AreaType;
}
