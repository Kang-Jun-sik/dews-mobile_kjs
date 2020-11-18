import { expect } from '@open-wc/testing';
import { stub } from 'sinon';
import { EventArgs, EventEmitter } from '../../../../src/dews-mobile.js';

class SimpleEventArgs extends EventArgs {
  data: unknown;
}

describe('EventEmitter 이벤트 테스트', () => {
  it('기본 이벤트 발생', () => {
    // arrange
    const handler = stub();
    const event = new EventEmitter();
    const args = new SimpleEventArgs();
    args.data = { test: 'value' };

    // act
    event.on<SimpleEventArgs>('simple', handler);

    event.emit<SimpleEventArgs>('simple', args);

    // assert
    expect(handler.callCount).to.equal(1);
  });

  it('once 를 이용한 핸들러가 한 번만 실행되는 테스트', () => {
    // arrange
    const handler = stub();
    const event = new EventEmitter();
    const args = new SimpleEventArgs();

    // act
    event.once<SimpleEventArgs>('simple', handler);
    event.emit<SimpleEventArgs>('simple', args);
    event.emit<SimpleEventArgs>('simple', args);

    // assert
    expect(handler.callCount).to.not.equal(2);
    expect(handler.callCount).to.equal(1);
  });

  it('off 를 이용하여 on 으로 등록한 핸들러 지정 삭제', () => {
    // arrange
    const event = new EventEmitter();
    const handler1 = stub();
    const handler2 = stub();
    const args = new SimpleEventArgs();

    // act
    event.on('simple', handler1);
    event.on('simple', handler2);
    event.off('simple', handler1);
    event.emit('simple', args);

    // assert
    expect(handler1.callCount).to.equal(0);
    expect(handler2.callCount).to.equal(1);
  });

  it('off 를 이용하여 on 으로 등록한 핸들러 모두 삭제', () => {
    // arrange
    const event = new EventEmitter();
    const handler1 = stub();
    const handler2 = stub();
    const args = new SimpleEventArgs();

    // act
    event.on('simple', handler1);
    event.on('simple', handler2);
    event.off('simple');
    event.emit('simple', args);

    // assert
    expect(handler1.callCount).to.equal(0);
    expect(handler2.callCount).to.equal(0);
  });

  it('off 를 이용하여 once 로 등록한 핸들러 지정 삭제', () => {
    // arrange
    const event = new EventEmitter();
    const handler1 = stub();
    const handler2 = stub();
    const args = new SimpleEventArgs();

    // act
    event.once('simple', handler1);
    event.once('simple', handler2);
    event.off('simple', handler1);
    event.emit('simple', args);
    event.emit('simple', args);

    // assert
    expect(handler1.callCount).to.equal(0);
    expect(handler2.callCount).to.equal(1);
  });

  it('off 를 이용하여 once 로 등록한 핸들러 모두 삭제', () => {
    // arrange
    const event = new EventEmitter();
    const handler1 = stub();
    const handler2 = stub();
    const args = new SimpleEventArgs();

    // act
    event.once('simple', handler1);
    event.once('simple', handler2);
    event.off('simple');
    event.emit('simple', args);

    // assert
    expect(handler1.callCount).to.equal(0);
    expect(handler2.callCount).to.equal(0);
  });
});
