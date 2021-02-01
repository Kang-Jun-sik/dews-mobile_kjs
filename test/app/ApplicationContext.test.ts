import { expect } from '@open-wc/testing';
import { container } from '@dews/dews-mobile-core';
import { StandaloneEnvironmentsProvider } from '../../src/app/env/standalone/StandaloneEnvironmentsProvider.js';
import { SystemType, SystemEnvironmentsProvider, dependencySymbols } from '../../src/dews-mobile.js';

describe('ApplicationContext 테스트', () => {
  beforeEach(async () => {
    await dews.app.start();
  });

  it('appType 이 설정되었는지 여부를 테스트', () => {
    // assert
    expect(dews.app.systemType).to.equal(SystemType.Standalone);
  });

  it('conditional dependency 에 등록되는 인스턴스의 형식에 대한 테스트', () => {
    // arrange
    const expected = container.resolve(StandaloneEnvironmentsProvider);

    // act
    const target = container.resolve(dependencySymbols.SystemEnvironmentsProvider);

    // assert
    expect(expected).to.be.instanceOf(SystemEnvironmentsProvider);
    expect(target).to.be.instanceOf(SystemEnvironmentsProvider);
    expect(target).to.be.instanceOf(StandaloneEnvironmentsProvider);
    expect(target).to.equal(expected);
  });
});
