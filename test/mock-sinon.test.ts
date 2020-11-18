import { expect } from '@open-wc/testing';
import { stub } from 'sinon';

describe('test', () => {
  it('test-1', () => {
    const myStub = stub();

    expect(myStub.callCount).to.equal(0);
  });
});
