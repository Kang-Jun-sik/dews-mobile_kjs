import { AreaType } from './base/AreaType.js';

export class ScrollAreaChangedEventArgs extends CustomEvent<unknown> {
  previous: AreaType | undefined;
  current: AreaType | undefined;
}
