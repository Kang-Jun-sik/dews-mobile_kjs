import { expect } from '@open-wc/testing';
import { utils } from '../../../src/dews-mobile.js';

describe('uuid 유틸리티 테스트', () => {
  it('uuid 생성 테스트', () => {
    // act
    const id1 = utils.uuid.create();
    const id2 = utils.uuid.create();

    // assert
    expect(id1).to.not.empty;
    expect(id1).to.has.length(32);
    expect(id1).to.not.equal(id2);
  });

  it('uuid 중복 생성 검증 테스트', () => {
    // arrange
    // Set 은 동일한 값이 들어갈 수 없으므로 유일성 체크가 가능
    const idSet: Set<string> = new Set<string>();

    // act, assert
    try {
      const genCount = 100; // 1000000;
      for (let i = 0; i < genCount; i += 1) {
        const newId = utils.uuid.create();
        expect(idSet.has(newId)).to.be.false;
        idSet.add(newId);
      }
      expect(idSet.size).to.equal(genCount);
    } catch {
      expect.fail();
    }
  }).timeout(50000);
});
