import { AreaType } from './base/AreaType.js';

export class FocusChangedEventArgs extends CustomEvent<unknown> {
  focusTarget: AreaType | undefined;
}
