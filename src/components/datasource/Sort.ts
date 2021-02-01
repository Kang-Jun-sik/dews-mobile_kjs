import { ObservableObject } from '@dews/dews-mobile-core';

type DirectionType = 'asc' | 'desc';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type SortType<T> = {
  field: keyof T;
  dir?: DirectionType;
  compare?: (a: T, b: T) => number;
};

export class Sort<T extends object> {
  sort?: SortType<T>[];
  sortingData?: ObservableObject<T>[];
  comparer?: (a: T, b: T) => number;

  compare(field: keyof T): (a: T, b: T) => number {
    return (a: T, b: T): number => {
      const firstValue: any = a[field];
      const secondValue: any = b[field];

      if (firstValue === null && secondValue === null) {
        return 0;
      }
      if (firstValue === null) {
        return -1;
      }
      if (secondValue === null) {
        return 1;
      }
      if (firstValue.localeCompare) {
        return firstValue.localeCompare(secondValue);
      }
      return a > b ? 1 : a < b ? -1 : 0;
    };
  }

  comparerCreate(sort: SortType<T>): (a: T, b: T) => number {
    const compare = sort.compare || this.compare(sort.field);
    if (sort.dir === 'desc') {
      return function (a: T, b: T) {
        return compare(b, a);
      };
    }
    return compare;
  }
}
