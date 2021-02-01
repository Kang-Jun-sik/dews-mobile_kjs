import { expect } from '@open-wc/testing';
import '../../src/dews-mobile.js';

describe('dews 글로벌 API 구조 확인 테스트', () => {
  it('dews.app 구조 확인', () => {
    expect(dews).to.has.own.property('app');
    expect(typeof dews.app.start).to.equal('function');
  });
});
