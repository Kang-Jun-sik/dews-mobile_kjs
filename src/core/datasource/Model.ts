import { ObservableObject } from './ObservableObject.js';
// as-is
// new Model<{ id: string; name: string; age: number }>({
//   id: '1',
//   name: 'test',
//   age: 20,
// });

// to-be
// const model = Model.define({
//   id: "personId",
//   fields: {
//     name: {
//       type: "string"
//     },
//     age: {
//       type: "number"
//     }
//   }
// });
// new model({name: 'test', age: 20});

export interface ModelBase {
  id: string;
  field: { [key: string]: { [key: string]: 'string' | 'number' | 'boolean' } };
}

interface Constructor<K> {
  new (...args: any[]): Model<K>;
}

export class Model<T> extends ObservableObject<T> {
  private id: string; // Model class id
  public dirty: boolean; // 변경 내역 감지
  // private idField: string; //

  constructor(initData: T | null) {
    super();
    if (initData) {
      this.init(initData);
    }
    this.dirty = false;

    // console.log(`base ${JSON.stringify(base)} // str ${data}`);
  }

  static define<K>(this: Constructor<K>): Constructor<K> {
    return this;
  }

  set(key: keyof T, value: T[typeof key]) {
    super.set(key, value);
    this.dirty = true;
  }

  //
  // public isNew(): boolean {
  //   if (this.isChanged) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
