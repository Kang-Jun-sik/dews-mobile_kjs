import { AreaType } from './base/AreaType.js';

export class FocusChangingEventArgs extends CustomEvent<unknown> {
  focusTarget: AreaType | undefined;
}
