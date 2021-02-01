import { expect } from '@open-wc/testing';
import { container } from '@dews/dews-mobile-core';
import { DefaultGlobalEnvironmentVariables } from '../../../../src/app/env/GlobalEnvironmentVariables.js';
import { StandaloneEnvironmentsProvider } from '../../../../src/app/env/standalone/StandaloneEnvironmentsProvider.js';

export const StandardEnvironmentsProviderTest = () => {
  describe('StandardEnvironmentsProvider', () => {
    it('DI 컨테이너를 통한 기본 인스턴스 획득 및 값 획득 테스트', async () => {
      // arrange
      const provider = container.resolve<StandaloneEnvironmentsProvider>(StandaloneEnvironmentsProvider);

      // act
      await provider.configure();

      // assert
      expect(provider.env.global).to.deep.eq(DefaultGlobalEnvironmentVariables);
    });
  });
};
