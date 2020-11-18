import { expect } from '@open-wc/testing';
import { ObservableArray, ObservableArrayChangeEventArgs } from '../../../src/dews-mobile.js';

describe('ObservableArray', () => {
  it('ObservableArray 기본 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number };
    const source: TestType[] = [{ first: 100, second: 20 }, { first: 200 }];

    // act
    const target = ObservableArray.create<TestType>(source);

    // assert
    expect(target[0].uid).to.not.be.undefined;
  });

  it('push 를 통한 추가 시 ObservableObject 변환 여부 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number };
    const source: TestType[] = [];

    // act
    const target = ObservableArray.create<TestType>(source);
    target.push({ first: 100, second: 20 });

    // assert
    expect(target[0].uid).to.not.be.undefined;
    expect(target[0].uid).to.be.length(32);
  });

  it('idFields 설정을 통한 아이디 획득 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source: TestType[] = [{ first: 100, second: 10 }];

    // act
    const target = ObservableArray.create<TestType>(source);
    target.setIdFields('first', 'second');
    target.push({ first: 200, second: 20 });

    // assert
    expect(target.idFields).to.contain('first');
    expect(target.idFields).to.contain('second');
    expect(target.idFields).to.not.contain('third');
    expect(target[0].id).to.equal('100_10');
    expect(target[1].id).to.not.equal('200_20');
    expect(target[0].uid).length(32);
    expect(target[1].uid).length(32);
  });

  it('ObservableArray 생성 시 idFields 지정 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source: TestType[] = [{ first: 100, second: 10 }];

    // act
    const target = ObservableArray.create<TestType>(source, ['first']);

    // assert
    expect(target[0].id).to.equal('100');
  });

  it('getByUid 함수를 이용하여 Hashtable 에서 단일 항목 받아오기 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20, third: '20' }
    ];

    // act
    const target = ObservableArray.create<TestType>(source);
    const uid = target[0].uid!;
    const item = target.getByUid(uid);

    // assert
    expect(item).is.not.undefined;
    expect(item!.first).to.equal(100);
  });

  it('getIndexByUid 함수를 이용하여 항목의 인덱스 받아오기 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20, third: '20' }
    ];

    // act
    const target = ObservableArray.create<TestType>(source);
    const uid = target[1].uid;
    const index = target.getIndexByUid(uid!);

    // assert
    expect(index).is.equal(1);
  });

  it('생성자에서 추가된 요소와 push 함수를 통해 추가된 요소의 isNew 플래그 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20, third: '20' }
    ];

    // act
    const target = ObservableArray.create<TestType>(source);
    target.push({ first: 300, second: 30 });

    // assert
    expect(target[0].isNew).is.not.true;
    expect(target[2].isNew).is.true;
  });

  it('bulk 함수를 이용한 isNew 플래그 설정 없이 요소 추가 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20, third: '20' }
    ];

    // act
    const target = ObservableArray.create<TestType>([]);
    target.push({ first: 300 });
    target.bulk(() => {
      target.push(...source);
    });

    // assert
    expect(target[0].isNew).is.true;
    expect(target[1].isNew).is.false;
    expect(target[2].isNew).is.false;
  });

  it('getDirtyData 함수의 신규 항목 추가 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [{ first: 100, second: 10 }];

    // act
    const proxy = ObservableArray.create<TestType>(source);
    proxy.setIdFields('first');
    proxy[0].second = 11;
    proxy.push({ first: 200, second: 20 });

    const dirty = proxy.getDirtyData();

    // assert
    expect(dirty.added).to.lengthOf(1);
    expect(dirty.updated).to.lengthOf(1);
    const added = dirty.added[0];
    expect(added).to.haveOwnProperty('first', 200);
  });

  it('idFields 를 설정하였을 때 중복 아이디로 오류가 발생하는 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [{ first: 100, second: 10 }];

    // act
    const proxy = ObservableArray.create<TestType>(source);
    proxy.setIdFields('first');

    // assert
    expect(() => proxy.push({ first: 100, second: 20 })).to.throw();
  });

  it('런타임에 idFields 를 설정할때 아이디 중복에 의한 오류가 발생하는 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 100, second: 20 }
    ];

    // act
    const proxy = ObservableArray.create<TestType>(source);

    // assert
    expect(() => proxy.setIdFields('first')).to.throw();
  });

  it('unshift 함수를 이용해서 신규 항목을 시작점에 추가하는 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20 }
    ];

    // act
    const proxy = ObservableArray.create<TestType>(source, ['first']);
    proxy.unshift({ first: 300, second: 30 });

    // assert
    const firstItem = proxy[0];
    expect(firstItem).to.not.undefined;
    expect(firstItem.first).to.equal(300);
  });

  it('unshift 함수에서 idFields 에 의한 아이디 중복 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10 },
      { first: 200, second: 20 }
    ];

    // act
    const proxy = ObservableArray.create<TestType>(source, ['first']);

    // assert
    expect(() => proxy.unshift({ first: 100, second: 30 })).to.throw();
  });

  it('getById 함수를 이용한 아이디 기반 항목 가져오기 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const find = array.getById(100, 20);
    const notExists = array.getById(300, 10);

    // assert
    expect(find).is.not.undefined;
    expect(find!.third).to.be.equal('item 2');
    expect(notExists).is.undefined;
  });

  it('splice 함수를 이용한 단일 항목 삭제 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const deleted = array.splice(1, 1);
    const dirty = array.getDirtyData();

    // assert
    expect(array.length).to.equal(2);
    expect(deleted?.length).to.equal(1);
    expect(deleted[0].deleted).to.be.true;
    expect(deleted[0].second).to.be.equal(20);
    expect(dirty.deleted.length).to.be.equal(1);
    expect(dirty.deleted[0].third).to.be.undefined;
  });

  it('splice 함수를 이용한 다중 항목 삭제 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const deleted = array.splice(1, 2);
    const dirty = array.getDirtyData();

    // assert
    expect(array.length).to.equal(1);
    expect(deleted?.length).to.equal(2);
    expect(dirty.deleted.length).to.be.equal(2);
  });

  it('splice 함수를 이용하여 삭제 및 추가 동시 실행 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];
    const forAdd = [
      { first: 300, second: 10, third: 'item4' },
      { first: 300, second: 20, third: 'item5' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const deleted = array.splice(1, 1, ...forAdd);
    const dirty = array.getDirtyData();

    // assert
    expect(array.length).to.be.equal(3 - 1 + 2);
    expect(deleted.length).to.be.equal(1);
    expect(dirty.deleted.length).to.be.equal(1);
    expect(dirty.added.length).to.be.equal(2);
  });

  it('pop 함수를 이용하여 마지막 항목 삭제 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const deleted = array.pop();
    const dirty = array.getDirtyData();

    // assert
    expect(array.length).to.be.equal(2);
    expect(deleted).is.not.undefined;
    expect(dirty.deleted.length).to.be.equal(1);
    expect(dirty.deleted[0]?.first).to.be.equal(200);
  });

  it('shift 함수를 이용하여 첫번째 항목 삭제 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const deleted = array.shift();
    const dirty = array.getDirtyData();

    // assert
    expect(array.length).to.be.equal(2);
    expect(deleted).is.not.undefined;
    expect(dirty.deleted.length).to.be.equal(1);
    expect(dirty.deleted[0]?.first).to.be.equal(100);
    expect(dirty.deleted[0]?.second).to.be.equal(10);
  });

  it('새로 추가했던 항목을 삭제하는 테스트', () => {
    // arrange
    type TestType = { first: number; second?: number; third?: string };
    const source = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const addCount = array.unshift({ first: 300, second: 10, third: 'test4' });
    const deleted = array.shift();
    const dirty = array.getDirtyData();

    // assert
    expect(addCount).to.be.equal(4);
    expect(deleted).is.not.undefined;
    expect(dirty.deleted.length).to.be.equal(0);
  });

  it('reset 함수를 이용하여 모든 항목의 변경 내용을 취소하는 테스트', () => {
    // arrange
    type TestType = { first: string; second?: string; third?: string };
    const expected: TestType[] = [
      { first: 'A', second: '1' },
      { first: 'B', second: '2' },
      { first: 'C', second: '3' },
      { first: 'D', second: '4' },
      { first: 'E', second: '5' },
      { first: 'F', second: '6' }
    ];
    const source = JSON.parse(JSON.stringify(expected)) as TestType[];

    // act
    const array = ObservableArray.create<TestType>(source, ['first']);

    array[0].second = '11';
    array[2].third = 'CC';
    array[5].second = '66';

    array.splice(1, 1); // D:B:1
    array.unshift({ first: 'G', second: '7' }); // A:G:0
    array.splice(1, 1); // D:A:1
    array.splice(1, 1); // D:C:1
    array.splice(4, 0, { first: 'H', second: '8' }, { first: 'I', second: '9' }); // A:H:4, A:I:5
    array.shift(); // D:G:0
    array.splice(4, 1); // D:I:4

    array.reset();

    // assert
    expect(array.length).to.equal(expected.length);
    expected.forEach((item, index) => {
      expect(array[index].first).to.equal(item.first);
      expect(array[index].second).to.equal(item.second);
      expect(array[index].third).is.undefined;
    });
  });

  it('commit 함수를 이용하여 모든 항목의 변경 내용을 확정하는 테스트', () => {
    // arrange
    type TestType = { first: number; second: number; third?: string };
    const source: TestType[] = [
      { first: 100, second: 10 },
      { first: 100, second: 20 },
      { first: 200, second: 10 }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);

    array[0].third = 'Value1';
    array[2].third = 'Value3';

    array.commit();

    const dirty = array.getDirtyData();

    // assert
    expect(dirty.updated.length).to.be.equal(0);
    expect(array[0].third).to.be.equal('Value1');
    expect(array[2].third).to.be.equal('Value3');
    expect(array[0].dirty).is.false;
  });

  it('change 이벤트 핸들러의 등록과 실행 컨텍스트 확인 테스트', () => {
    // arrange
    let thisArg: unknown = undefined;
    const handler = function (this: unknown) {
      thisArg = this;
    };

    // act
    const array = ObservableArray.create<object>([]);
    array.onChange(handler);
    array.push({ field1: 'value' });

    // assert
    expect(thisArg).is.not.undefined;
    expect(thisArg).to.be.instanceOf(ObservableArray);
  });

  it('change 이벤트 핸들러 제거 테스트', () => {
    // arrange
    let callCount1 = 0,
      callCount2 = 0;
    const handler1 = () => callCount1++;
    const handler2 = () => callCount2++;

    // act
    const array = ObservableArray.create<object>([]);
    array.onChange(handler1);
    array.onChange(handler2);

    array.push({ field: 'value' });
    array.removeChange(handler2);
    array.push({ field: 'value2' });

    // assert
    expect(callCount1).to.be.equal(2);
    expect(callCount2).to.be.equal(1);
  });

  it('change 이벤트 핸들러 모두 제거 테스트', () => {
    // arrange
    let callCount1 = 0,
      callCount2 = 0;
    const handler1 = () => callCount1++;
    const handler2 = () => callCount2++;

    // act
    const array = ObservableArray.create<object>([]);
    array.onChange(handler1);
    array.onChange(handler2);

    array.push({ field: 'value' });
    array.removeChange();
    array.push({ field: 'value2' });

    // assert
    expect(callCount1).to.be.equal(1);
    expect(callCount2).to.be.equal(1);
  });

  it('change 이벤트 load 타입의 전달 매개변수 테스트', () => {
    // arrange
    type TestType = { field1: string };
    let called = false;
    const handler = (args: ObservableArrayChangeEventArgs<TestType>) => {
      // assert
      expect(args.type).to.be.equal('load');
      expect(args.items).to.be.length(2);
      expect(args.items[0].field1).to.be.equal('1');
      expect(args.items[1].field1).to.be.equal('2');
      called = true;
    };

    // act
    const array = ObservableArray.create<TestType>([]);
    array.onChange(handler);
    array.bulk(() => {
      array.push({ field1: '1' }, { field1: '2' });
    });

    // assert
    expect(called).is.true;
  });

  it('change 이벤트 중 add 타입의 전달 매개변수 테스트', () => {
    // arrange
    type TestType = { field1: string };
    let called = false;
    const handler = (args: ObservableArrayChangeEventArgs<TestType>) => {
      // assert
      expect(args.type).to.be.equal('add');
      expect(args.items).to.be.length(1);
      expect(args.items[0].field1).to.be.equal('1');
      called = true;
    };

    // act
    const array = ObservableArray.create<TestType>([]);
    array.onChange(handler);
    array.push({ field1: '1' });

    // assert
    expect(called).is.true;
  });

  it('change 이벤트 중 delete 타입의 전달 매개변수 테스트', () => {
    // arrange
    type TestType = { field1: string };
    let called = false;
    const handler = (args: ObservableArrayChangeEventArgs<TestType>) => {
      // assert
      expect(args.type).to.be.equal('delete');
      expect(args.items).to.lengthOf(1);
      expect(args.items[0].field1).to.be.equal('value1');
      expect(args.target).to.lengthOf(0);
      called = true;
    };

    // act
    const array = ObservableArray.create<TestType>([{ field1: 'value1' }]);
    array.onChange(handler);
    array.pop();

    // assert
    expect(called).is.true;
  });

  it('change 이벤트 중 update 타입의 전달 매개변수 테스트', () => {
    // arrange
    type TestType = { field1: string };
    let called = false;
    const handler = (args: ObservableArrayChangeEventArgs<TestType>) => {
      // assert
      expect(args.type).to.be.equal('update');
      expect(args.items).length(1);
      expect(args.items[0].field1).to.be.equal('newValue');
      expect(args.field).to.be.equal('field1');
      expect(args.oldValue).to.be.equal('value2');
      expect(args.newValue).to.be.equal('newValue');
      expect(args.originalValue).to.be.equal('value1');
      called = true;
    };

    // act
    const array = ObservableArray.create<TestType>([{ field1: 'value1' }]);
    array[0].field1 = 'value2';
    array.onChange(handler);
    array[0].field1 = 'newValue';

    // assert
    expect(called).is.true;
  });

  it('내부 항목의 아이디 필드의 업데이트가 일어났을 경우 아이디 맵의 인덱싱을 새로 수행하는 테스트', () => {
    // arrange
    type TestType = { first: number; second: number; third?: string };
    const source: TestType[] = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);

    const item = array.getById(100, 10);
    item!.first = 110;

    const reSearchedItem = array.getById(110, 10);

    // assert
    expect(item).to.be.equal(reSearchedItem);
    expect(item === reSearchedItem).is.true;
  });

  it('내부 항목의 아이디 필드의 업데이트로 중복 아이디 값이 발생하는 경우의 테스트', () => {
    // arrange
    type TestType = { first: number; second: number; third?: string };
    const source: TestType[] = [
      { first: 100, second: 10, third: 'item 1' },
      { first: 100, second: 20, third: 'item 2' },
      { first: 200, second: 10, third: 'item 3' }
    ];

    // act
    const array = ObservableArray.create<TestType>(source, ['first', 'second']);
    const item = array.getById(100, 10);

    // assert
    expect(() => (item!.second = 20)).to.throw(
      `중복되는 아이디 값이 존재하므로 'second' 필드의 값을 '20'(으)로 수정할 수 없습니다.`
    );
    expect(item!.second).to.be.equal(10); // 원본 값으로 롤백
  });
});
