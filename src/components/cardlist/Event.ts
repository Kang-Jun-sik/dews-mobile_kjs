import { EventArgs } from '@dews/dews-mobile-core';
import { Cardlist } from './dews-cardlist.js';
import { Checkbox } from '../checkbox/checkbox.js';

export class CardListEventArgs<T extends object> extends EventArgs<Cardlist<T>> {
  private _defaultPrevented = false;

  constructor(init?: Partial<CardListEventArgs<T>>) {
    super();
    if (init) {
      Object.assign(this, init);
    }
  }

  preventDefault() {
    this._defaultPrevented = true;
  }

  isPreventDefault() {
    return this._defaultPrevented;
  }
}

export class CardListCheckedEventArgs<T extends object> extends CardListEventArgs<T> {
  event = 'checked';
  checked?: boolean;
  checkbox?: Checkbox;

  constructor(init?: Partial<CardListCheckedEventArgs<T>>) {
    super(init);
  }
}
