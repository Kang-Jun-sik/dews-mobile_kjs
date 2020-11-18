import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import { ObservableObject, ObservableObjectChangeEventArgs } from '../../../src/dews-mobile.js';

describe('ObservableObject 테스트', () => {
  it('onChange 이용 이벤트 핸들러 등록 및 매개변수 변경 내역 테스트', () => {
    // arrange
    const obj: { [name: string]: any } = { test: 200, value: 200 };
    let evtArg: ObservableObjectChangeEventArgs;
    const handler = (args: ObservableObjectChangeEventArgs) => (evtArg = args);

    // act
    const obj2 = ObservableObject.create(obj);
    obj2.onChange(handler);
    obj2.test = 300;

    // assert
    expect(obj.test).to.equal(300);
    expect(obj['tt']).to.be.undefined;
    // noinspection JSUnusedAssignment
    expect(evtArg!.oldValue).to.equal(200);
    // noinspection JSUnusedAssignment
    expect(evtArg!.newValue).to.equal(300);
  });

  it('removeChange 이용하여 등록된 이벤트 핸들러의 제거 기능 테스트', () => {
    // arrange
    const source: { [name: string]: any } = { test: 200, value: 200 };
    const handler = sinon.stub();

    // act
    const target = ObservableObject.create(source);
    target.onChange(handler);
    target.name = 300;
    target.removeChange(handler);
    target.value = 400;

    // assert
    expect(target.name).to.equal(300);
    expect(target.value).to.equal(400);
    expect(handler.callCount).to.equal(1);
  });

  it('Reset 테스트', () => {
    // arrange
    const source: { first: number; second: number; third: number } = { first: 100, second: 200, third: 300 };

    // act
    const target = ObservableObject.create(source);
    target.first = 10;
    target.third = 30;
    target.reset();

    // assert
    expect(target.first).to.equal(100);
    expect(target.third).to.equal(300);
    expect(target.dirty).is.false;
    expect(target.deleted).is.false;
  });

  it('삭제 상태에서의 Reset 테스트', () => {
    // arrange
    const source: { first: number; second: number; third: number } = { first: 100, second: 200, third: 300 };

    // act
    const target = ObservableObject.create(source);
    target.first = 10;
    target.third = 30;
    target.__state__.deleted = true;
    target.reset();

    // assert
    expect(target.first).to.equal(100);
    expect(target.third).to.equal(300);
    expect(target.dirty).is.false;
    expect(target.deleted).is.false;
  });

  it('변경된 값을 다시 원본 값으로 설정했을때 변경 내역 제거 기능 테스트', () => {
    // arrange
    const source: { first: number; second: number; third: number } = { first: 100, second: 200, third: 300 };

    // act
    const target = ObservableObject.create(source);
    target.first = 10;
    target.first = 100;

    // assert
    expect(target.dirty).is.false;
  });

  it('dirty 체크 테스트', () => {
    // arrange
    const source: { first: number } = { first: 100 };

    // act
    const target1 = ObservableObject.create({ ...source });
    const target2 = ObservableObject.create({ ...source });
    target1.first = 200;
    target2.first = 100;

    // assert
    expect(target1.dirty).is.true;
    expect(target2.dirty).is.false;
  });

  it('uid 를 이용한 유니크 키 접근 테스트', () => {
    // arrange
    type TestType = { first: number };
    const source: TestType = { first: 30 };

    // act
    const target1 = ObservableObject.create({ ...source });
    const target2 = ObservableObject.create({ ...source });
    // assert
    expect(target1.uid).is.not.empty;
    expect(target2.uid).is.not.empty;
    expect(target1.uid.length).is.equal(32, target1.uid);
    expect(target2.uid.length).is.equal(32, target2.uid);
    expect(target1.uid).is.not.equal(target2.uid);
    expect(target1.idFields).is.undefined;
  });

  it('idFields 를 이용한 데이터 기반 아이디 생성 테스트', () => {
    // arrange
    type TestType = { first: number; second?: string };
    const source1: TestType = { first: 100, second: 'hello' };
    const source2: TestType = { first: 200 };

    // act
    const target1 = ObservableObject.create<TestType>(source1);
    const target2 = ObservableObject.create<TestType>(source2);

    target1.__state__.idFields.add('first');
    target1.__state__.idFields.add('second');
    target2.__state__.idFields = target1.__state__.idFields;

    // assert
    expect(target1.id).to.equal('100_hello');
    expect(target2.id).to.equal('200_undefined');
    expect(target1.idFields).to.contain('first').and.contain('second');
  });

  it('isNew 필드 생성 여부 확인 테스트', () => {
    // arrange
    const source = { first: 200 };

    // act
    const target = ObservableObject.create(source);

    // assert
    expect(target.isNew).is.false;
  });

  it('getDirtyData 를 이용한 변경된 컬럼 정보만 가져오는 테스트', () => {
    // arrange
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const target = ObservableObject.create<TestType>(source);
    target.first = 20;
    target.third = '20';
    const dirty = target.getDirtyData();

    // assert
    expect(dirty).to.haveOwnProperty('first', 20);
    expect(dirty).to.not.haveOwnProperty('second');
    expect(dirty).to.haveOwnProperty('third', '20');
  });

  it('getDirtyData 를 이용시 isNew 가 true 라면 객체 전체를 가져오는 테스트', () => {
    // arrange
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const target = ObservableObject.create<TestType>(source);
    target.first = 20;
    target.third = '20';
    target.__state__.isNew = true;
    const dirty = target.getDirtyData();

    // assert
    expect(dirty).to.haveOwnProperty('first', 20);
    expect(dirty).to.haveOwnProperty('second', '10');
    expect(dirty).to.haveOwnProperty('third', '20');
  });

  it('toJSON 에 dirtyOnly 매개변수로 true 를 전달하여 변경된 필드만 포함하는 JSON 문자열 반환 테스트', () => {
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const target = ObservableObject.create<TestType>(source);
    target.first = 20;
    target.third = '20';
    const json = target.toJSON(true);

    // assert
    expect(json).to.haveOwnProperty('first', 20);
    expect(json).to.not.haveOwnProperty('second', '10');
    expect(json).to.haveOwnProperty('third', '20');
  });

  it('toJSON 으로 객체 전체에 대한 JSON 문자열 반환 테스트', () => {
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const target = ObservableObject.create<TestType>(source);
    target.first = 20;
    target.third = '20';
    const json = target.toJSON();

    // assert
    expect(json).to.haveOwnProperty('first', 20);
    expect(json).to.haveOwnProperty('second', '10');
    expect(json).to.haveOwnProperty('third', '20');
  });

  it('toJSON 이용 시 isNew 가 true 일 때는 객체 전체에 대한 JSON 문자열 반환 테스트', () => {
    // arrange
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const target = ObservableObject.create<TestType>(source);
    target.first = 20;
    target.third = '20';
    target.__state__.isNew = true;
    const json = target.toJSON(true);

    // assert
    expect(json).to.haveOwnProperty('first', 20);
    expect(json).to.haveOwnProperty('second', '10');
    expect(json).to.haveOwnProperty('third', '20');
  });

  it('deleted 필드 생성 여부 확인 테스트', () => {
    // arrange
    const source = { first: 200 };

    // act
    const target = ObservableObject.create(source);

    // assert
    expect(target.deleted).is.false;
  });

  it('삭제된 항목이면서 idFields 가 설정되어 있다면 getDirtyData 에서 아이디 필드 값들만 반환하는 테스트', () => {
    // arrange
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 10, second: '10' };

    // act
    const proxy = ObservableObject.create<TestType>(source);
    proxy.__state__.idFields.add('first');
    proxy.__state__.deleted = true;

    const dirty = proxy.getDirtyData();

    // assert
    expect(dirty).to.haveOwnProperty('first', 10);
    expect(dirty).to.not.haveOwnProperty('second');
  });

  it('삭제된 항목에 idFields 에 값이 하나라도 없는 경우 전체 객체를 반환하는 테스트', () => {
    // arrange
    type TestType = { first?: number; second?: string; third?: string };
    const source: TestType = { second: 'b', third: 'c' };

    // act
    const proxy = ObservableObject.create<TestType>(source);
    proxy.__state__.idFields.add('first');
    proxy.__state__.deleted = true;

    const dirty = proxy.getDirtyData();

    // assert
    expect(dirty).to.haveOwnProperty('second', 'b');
    expect(dirty).to.haveOwnProperty('third', 'c');
  });

  it('commit 함수를 이용하여 변경 내용 확정 테스트', () => {
    // arrange
    type TestType = { first: number; second: string; third?: string };
    const source: TestType = { first: 100, second: 'A' };

    // act
    const proxy = ObservableObject.create<TestType>(source);
    proxy.__state__.idFields.add('first');

    proxy.second = 'B';
    proxy.third = 'Changed';

    proxy.commit();

    // assert
    const dirty = proxy.getDirtyData();
    expect(proxy.third).to.be.equal('Changed');
    expect(proxy.dirty).is.false;
    expect(proxy.isNew).is.false;
    expect(proxy.deleted).is.false;
    expect(dirty).is.null;
  });
});
