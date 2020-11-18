/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@open-wc/testing';

describe('Proxy 기능 구현 테스트', () => {
  it('핸들러 내부 추가 속성 구현 및 사용 테스트', () => {
    // arrange
    type TestType = { field1: string; field2: () => string };
    const source: TestType = {
      field1: 'source',
      field2() {
        return `wrapped_${this.field1}`;
      }
    };
    // act
    // noinspection JSUnusedLocalSymbols
    const proxy = new Proxy<TestType>(source, {
      get(target: TestType, prop: PropertyKey, receiver: any): any {
        this.log(`GET: ${String(prop)}`, target);
        return Reflect.get(target, prop, receiver);
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
      log(...args: any[]): void {}
    } as ProxyHandler<TestType> & { log: (...args: any[]) => void });

    // assert
    expect(proxy.field2()).to.be.equal('wrapped_source');
  });

  it('상태 관리 필드 추가 테스트', () => {
    // arrange
    type TestType = { field1: string };
    type StateType = { changed?: string[] };
    const source: TestType = { field1: 'test' };

    // act
    const proxy = new Proxy<TestType>(source, {
      get(target: TestType, prop: PropertyKey, receiver: any): any {
        if (!Reflect.has(target, prop)) {
          switch (prop) {
            case '__state__':
              return this.state;
          }
        }
        return Reflect.get(target, prop, receiver);
      },

      state: { changed: [] }
    } as ProxyHandler<TestType> & { state: StateType }) as TestType & { __state__: StateType };

    // assert
    expect(proxy.__state__).is.not.undefined;
    expect(proxy.__state__.changed?.length).to.equal(0);
  });
});
