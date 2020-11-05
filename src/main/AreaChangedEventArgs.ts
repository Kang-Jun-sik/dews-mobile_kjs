import { AreaType } from './AreaType.js';

export class AreaChangedEventArgs extends CustomEvent<any> {
  previous: AreaType;
  current: AreaType;
}
